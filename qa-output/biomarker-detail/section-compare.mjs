/**
 * Section-level visual QA comparison for biomarker-detail page (mobile 375px).
 *
 * Takes section-level screenshots of both original Webflow and Next.js sites,
 * runs pixelmatch on each pair, and reports match percentages.
 */

import { chromium } from '@playwright/test';
import { PNG } from 'pngjs';
import pixelmatchModule from 'pixelmatch';
import fs from 'fs';
import path from 'path';

const pixelmatch = pixelmatchModule.default || pixelmatchModule;

const ORIGINAL_URL = 'http://localhost:5503/biomarkers/albumin-test/';
const NEXTJS_URL = 'http://localhost:3000/biomarkers/albumin-test';
const VIEWPORT = { width: 375, height: 812 };
const OUTPUT_DIR = '/Users/m/Documents/Code/superpower-nextjs/qa-output/biomarker-detail/sections';

// Sections to capture, defined by CSS selectors and friendly names.
// We capture each section independently so that vertical offsets in one section
// don't cascade mismatches into all subsequent sections.
const SECTIONS = [
  {
    name: '01-navbar',
    description: 'Top navigation bar',
    selector: '.navbar_component, nav',
  },
  {
    name: '02-hero',
    description: 'Hero / breadcrumb / h1 area',
    selector: '.blog-cms-hero_section',
  },
  {
    name: '03-content-top',
    description: 'First content section (intro + disclaimer + Book Test CTA)',
    // Capture the main content wrapper
    selector: '.blog-cms-content_section',
  },
  {
    name: '04-book-test-cta',
    description: 'Book your test now CTA card',
    selector: '.blog-cms-content_book-test_wrap',
  },
  {
    name: '05-ask-ai',
    description: 'Ask AI summary section',
    selector: '.library-article_ai',
  },
  {
    name: '06-newsletter-mobile',
    description: 'Mobile newsletter subscribe CTA',
    selector: '.hide-only-desktop',
  },
  {
    name: '07-similar-biomarkers',
    description: 'Similar biomarker tests carousel',
    selector: '.section_home2-testimonials, section.section_home2-testimonials',
  },
  {
    name: '08-faqs',
    description: 'FAQ accordion section',
    selector: '.section_faqs-shorthand',
  },
  {
    name: '09-bottom-cta',
    description: 'Bottom CTA (Finally, healthcare...)',
    selector: '.section_home-cta',
  },
  {
    name: '10-footer',
    description: 'Footer',
    selector: 'footer, .footer_component, .section_footer',
  },
];

async function waitForPageReady(page) {
  // Wait for network idle + fonts loaded + a small extra delay
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1500);
}

async function captureSection(page, section, prefix) {
  // Try to find the element; some sections may not exist on one version
  const el = await page.$(section.selector);
  if (!el) {
    console.log(`  [${prefix}] Section "${section.name}" not found (selector: ${section.selector})`);
    return null;
  }

  const box = await el.boundingBox();
  if (!box || box.height === 0) {
    console.log(`  [${prefix}] Section "${section.name}" has zero height`);
    return null;
  }

  const filePath = path.join(OUTPUT_DIR, `${prefix}-${section.name}.png`);
  await el.screenshot({ path: filePath, animations: 'disabled' });
  return { filePath, width: Math.round(box.width), height: Math.round(box.height) };
}

function loadPNG(filePath) {
  return PNG.sync.read(fs.readFileSync(filePath));
}

function comparePNGs(imgA, imgB) {
  const w = Math.min(imgA.width, imgB.width);
  const h = Math.min(imgA.height, imgB.height);

  // If dimensions differ, we need to crop/pad to matching size
  const a = cropToSize(imgA, w, h);
  const b = cropToSize(imgB, w, h);

  const diff = new PNG({ width: w, height: h });
  const mismatch = pixelmatch(a.data, b.data, diff.data, w, h, {
    threshold: 0.15,
    includeAA: false,
  });

  const totalPixels = w * h;
  const matchPercent = ((1 - mismatch / totalPixels) * 100).toFixed(2);

  return { mismatch, totalPixels, matchPercent, diff, w, h };
}

function cropToSize(img, targetW, targetH) {
  if (img.width === targetW && img.height === targetH) return img;

  const cropped = new PNG({ width: targetW, height: targetH });
  // Fill with white first (unmatched areas)
  for (let i = 0; i < cropped.data.length; i += 4) {
    cropped.data[i] = 255;
    cropped.data[i + 1] = 255;
    cropped.data[i + 2] = 255;
    cropped.data[i + 3] = 255;
  }

  const copyW = Math.min(img.width, targetW);
  const copyH = Math.min(img.height, targetH);

  for (let y = 0; y < copyH; y++) {
    for (let x = 0; x < copyW; x++) {
      const srcIdx = (y * img.width + x) * 4;
      const dstIdx = (y * targetW + x) * 4;
      cropped.data[dstIdx] = img.data[srcIdx];
      cropped.data[dstIdx + 1] = img.data[srcIdx + 1];
      cropped.data[dstIdx + 2] = img.data[srcIdx + 2];
      cropped.data[dstIdx + 3] = img.data[srcIdx + 3];
    }
  }

  return cropped;
}

async function main() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });

  // Create two pages
  const ctxOriginal = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
  });
  const ctxNextjs = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
  });

  const pageOriginal = await ctxOriginal.newPage();
  const pageNextjs = await ctxNextjs.newPage();

  console.log('Loading original (Webflow)...');
  await pageOriginal.goto(ORIGINAL_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await waitForPageReady(pageOriginal);

  console.log('Loading Next.js...');
  await pageNextjs.goto(NEXTJS_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await waitForPageReady(pageNextjs);

  // Also take full-page screenshots for reference
  await pageOriginal.screenshot({
    path: path.join(OUTPUT_DIR, 'full-original.png'),
    fullPage: true,
    animations: 'disabled',
  });
  await pageNextjs.screenshot({
    path: path.join(OUTPUT_DIR, 'full-nextjs.png'),
    fullPage: true,
    animations: 'disabled',
  });

  const results = [];

  for (const section of SECTIONS) {
    console.log(`\nCapturing section: ${section.name}`);

    const origResult = await captureSection(pageOriginal, section, 'original');
    const nextResult = await captureSection(pageNextjs, section, 'nextjs');

    if (!origResult && !nextResult) {
      results.push({
        name: section.name,
        description: section.description,
        status: 'MISSING_BOTH',
        matchPercent: 'N/A',
      });
      continue;
    }

    if (!origResult) {
      results.push({
        name: section.name,
        description: section.description,
        status: 'MISSING_ORIGINAL',
        nextjsSize: nextResult ? `${nextResult.width}x${nextResult.height}` : 'N/A',
        matchPercent: 'N/A',
      });
      continue;
    }

    if (!nextResult) {
      results.push({
        name: section.name,
        description: section.description,
        status: 'MISSING_NEXTJS',
        originalSize: `${origResult.width}x${origResult.height}`,
        matchPercent: 'N/A',
      });
      continue;
    }

    // Compare
    const imgOrig = loadPNG(origResult.filePath);
    const imgNext = loadPNG(nextResult.filePath);
    const comparison = comparePNGs(imgOrig, imgNext);

    // Save diff image
    const diffPath = path.join(OUTPUT_DIR, `diff-${section.name}.png`);
    fs.writeFileSync(diffPath, PNG.sync.write(comparison.diff));

    const heightDiff = origResult.height - nextResult.height;

    results.push({
      name: section.name,
      description: section.description,
      status: 'COMPARED',
      originalSize: `${origResult.width}x${origResult.height}`,
      nextjsSize: `${nextResult.width}x${nextResult.height}`,
      comparedSize: `${comparison.w}x${comparison.h}`,
      heightDiff: heightDiff !== 0 ? `${heightDiff}px (original ${heightDiff > 0 ? 'taller' : 'shorter'})` : 'same',
      matchPercent: comparison.matchPercent + '%',
      mismatchedPixels: comparison.mismatch,
      totalPixels: comparison.totalPixels,
      diffImage: diffPath,
    });
  }

  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('SECTION-LEVEL VISUAL QA REPORT — biomarker-detail (mobile 375px)');
  console.log('='.repeat(80));

  // Sort by worst match first
  const sorted = [...results].sort((a, b) => {
    const pctA = parseFloat(a.matchPercent) || 0;
    const pctB = parseFloat(b.matchPercent) || 0;
    return pctA - pctB;
  });

  for (const r of sorted) {
    console.log(`\n--- ${r.name}: ${r.description} ---`);
    console.log(`  Status:    ${r.status}`);
    if (r.status === 'COMPARED') {
      console.log(`  Original:  ${r.originalSize}`);
      console.log(`  Next.js:   ${r.nextjsSize}`);
      console.log(`  Match:     ${r.matchPercent}`);
      console.log(`  Mismatch:  ${r.mismatchedPixels} / ${r.totalPixels} pixels`);
      console.log(`  Height:    ${r.heightDiff}`);
    } else if (r.originalSize) {
      console.log(`  Original:  ${r.originalSize}`);
    } else if (r.nextjsSize) {
      console.log(`  Next.js:   ${r.nextjsSize}`);
    }
  }

  // Save JSON report
  const reportPath = path.join(OUTPUT_DIR, 'section-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nReport saved to ${reportPath}`);

  await browser.close();
  console.log('Done.');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
