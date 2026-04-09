import { test } from '@playwright/test';
import { PAGES, ORIGINAL_BASE, NEXTJS_BASE } from './sections.config';
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const QA_OUTPUT = path.join(process.cwd(), 'qa-output');

// Ensure output directory exists
fs.mkdirSync(QA_OUTPUT, { recursive: true });

for (const pageConfig of PAGES) {
  for (const viewport of pageConfig.viewports) {
    test(`Visual compare: ${pageConfig.name} @ ${viewport.name} (${viewport.width}x${viewport.height})`, async ({
      browser,
    }) => {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
      });

      const pageDir = path.join(QA_OUTPUT, pageConfig.name);
      fs.mkdirSync(pageDir, { recursive: true });

      // Screenshot original
      const originalPage = await context.newPage();
      try {
        await originalPage.goto(`${ORIGINAL_BASE}${pageConfig.originalPath}`, {
          waitUntil: 'networkidle',
          timeout: 30000,
        });
      } catch {
        // networkidle may timeout on heavy pages, that's ok
      }
      await originalPage.waitForTimeout(2000); // Wait for animations to settle
      // Pause all videos at frame 0 to eliminate frame-timing diffs
      // Also hide Intercom/chat widgets and floating CTAs for fair comparison
      await originalPage.evaluate(async () => {
        const videos = document.querySelectorAll('video');
        await Promise.all(Array.from(videos).map(v => {
          v.pause();
          v.currentTime = 0;
          return v.readyState >= 2
            ? Promise.resolve()
            : new Promise(r => { v.addEventListener('seeked', r, { once: true }); setTimeout(r, 1000); });
        }));
        // Hide Intercom/chat widgets
        document.querySelectorAll('#intercom-container, .intercom-lightweight-app, [class*=intercom], iframe[name*=intercom]').forEach(el => {
          (el as HTMLElement).style.display = 'none';
        });
        // Hide any fixed-position chat widget at bottom
        document.querySelectorAll('[data-modal-consult], [data-modal-consult-bg]').forEach(el => {
          (el as HTMLElement).style.display = 'none';
        });
      });
      await originalPage.waitForTimeout(300);

      const originalPath = path.join(
        pageDir,
        `original-${viewport.name}.png`
      );
      await originalPage.screenshot({ path: originalPath, fullPage: true });
      await originalPage.close();

      // Screenshot Next.js
      const nextjsPage = await context.newPage();
      try {
        await nextjsPage.goto(`${NEXTJS_BASE}${pageConfig.nextjsPath}`, {
          waitUntil: 'load',
          timeout: 45000,
        });
      } catch {
        // may timeout on heavy pages, that's ok
      }
      await nextjsPage.waitForTimeout(3000); // time for animations to settle
      // Pause all videos at frame 0 to eliminate frame-timing diffs
      // Also hide Next.js dev overlay and any modals
      await nextjsPage.evaluate(async () => {
        const videos = document.querySelectorAll('video');
        await Promise.all(Array.from(videos).map(v => {
          v.pause();
          v.currentTime = 0;
          return v.readyState >= 2
            ? Promise.resolve()
            : new Promise(r => { v.addEventListener('seeked', r, { once: true }); setTimeout(r, 1000); });
        }));
        // Hide Next.js error overlay / dev indicators
        document.querySelectorAll('nextjs-portal, [data-nextjs-toast]').forEach(el => {
          (el as HTMLElement).style.display = 'none';
        });
        // Hide any element that looks like the dev error badge
        document.querySelectorAll('body > div').forEach(el => {
          const div = el as HTMLElement;
          if (div.shadowRoot || div.id === '__next-build-watcher' || div.id === '__next-prerender-indicator') {
            div.style.display = 'none';
          }
        });
      });
      await nextjsPage.waitForTimeout(300);

      const nextjsPath = path.join(pageDir, `nextjs-${viewport.name}.png`);
      await nextjsPage.screenshot({ path: nextjsPath, fullPage: true });
      await nextjsPage.close();

      await context.close();

      // Pixel diff comparison
      const originalImg = PNG.sync.read(fs.readFileSync(originalPath));
      const nextjsImg = PNG.sync.read(fs.readFileSync(nextjsPath));

      // Use the smaller dimensions to avoid out-of-bounds
      const width = Math.min(originalImg.width, nextjsImg.width);
      const height = Math.min(originalImg.height, nextjsImg.height);

      // If dimensions differ significantly, note it
      const dimensionsDiffer =
        Math.abs(originalImg.width - nextjsImg.width) > 10 ||
        Math.abs(originalImg.height - nextjsImg.height) > 50;

      if (dimensionsDiffer) {
        const report = {
          page: pageConfig.name,
          viewport: viewport.name,
          originalSize: `${originalImg.width}x${originalImg.height}`,
          nextjsSize: `${nextjsImg.width}x${nextjsImg.height}`,
          note: 'Dimensions differ significantly',
        };
        fs.writeFileSync(
          path.join(pageDir, `report-${viewport.name}.json`),
          JSON.stringify(report, null, 2)
        );
      }

      // Create cropped buffers for comparison
      const croppedOriginal = new PNG({ width, height });
      const croppedNextjs = new PNG({ width, height });

      PNG.bitblt(originalImg, croppedOriginal, 0, 0, width, height, 0, 0);
      PNG.bitblt(nextjsImg, croppedNextjs, 0, 0, width, height, 0, 0);

      const diff = new PNG({ width, height });
      const mismatchedPixels = pixelmatch(
        croppedOriginal.data,
        croppedNextjs.data,
        diff.data,
        width,
        height,
        { threshold: 0.15 }
      );

      const totalPixels = width * height;
      const matchPercent = (
        (1 - mismatchedPixels / totalPixels) *
        100
      ).toFixed(2);

      // Save diff image
      const diffPath = path.join(pageDir, `diff-${viewport.name}.png`);
      fs.writeFileSync(diffPath, PNG.sync.write(diff));

      // Save report
      const report = {
        page: pageConfig.name,
        viewport: viewport.name,
        originalSize: `${originalImg.width}x${originalImg.height}`,
        nextjsSize: `${nextjsImg.width}x${nextjsImg.height}`,
        comparedSize: `${width}x${height}`,
        matchPercent: `${matchPercent}%`,
        mismatchedPixels,
        totalPixels,
        dimensionsDiffer,
      };

      fs.writeFileSync(
        path.join(pageDir, `report-${viewport.name}.json`),
        JSON.stringify(report, null, 2)
      );

      console.log(
        `[${pageConfig.name}] ${viewport.name}: ${matchPercent}% match (${mismatchedPixels}/${totalPixels} mismatched pixels)`
      );
    });
  }
}
