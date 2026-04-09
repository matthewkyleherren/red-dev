/**
 * Compare the visible FAQ section specifically.
 */
import { chromium } from '@playwright/test';
import { PNG } from 'pngjs';
import pixelmatchModule from 'pixelmatch';
import fs from 'fs';
import path from 'path';

const pixelmatch = pixelmatchModule.default || pixelmatchModule;
const OUTPUT_DIR = '/Users/m/Documents/Code/superpower-nextjs/qa-output/biomarker-detail/sections';

function loadPNG(fp) { return PNG.sync.read(fs.readFileSync(fp)); }
function cropToSize(img, tw, th) {
  if (img.width === tw && img.height === th) return img;
  const c = new PNG({ width: tw, height: th });
  for (let i = 0; i < c.data.length; i += 4) { c.data[i] = 255; c.data[i+1] = 255; c.data[i+2] = 255; c.data[i+3] = 255; }
  for (let y = 0; y < Math.min(img.height, th); y++) {
    for (let x = 0; x < Math.min(img.width, tw); x++) {
      const s = (y * img.width + x) * 4, d = (y * tw + x) * 4;
      c.data[d] = img.data[s]; c.data[d+1] = img.data[s+1]; c.data[d+2] = img.data[s+2]; c.data[d+3] = img.data[s+3];
    }
  }
  return c;
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  const ctxO = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 1 });
  const ctxN = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 1 });

  const pO = await ctxO.newPage();
  const pN = await ctxN.newPage();

  await pO.goto('http://localhost:5503/biomarkers/albumin-test/', { waitUntil: 'networkidle', timeout: 30000 });
  await pO.evaluate(() => document.fonts.ready);
  await pO.waitForTimeout(1500);

  await pN.goto('http://localhost:3000/biomarkers/albumin-test', { waitUntil: 'networkidle', timeout: 30000 });
  await pN.evaluate(() => document.fonts.ready);
  await pN.waitForTimeout(1500);

  // Get the VISIBLE FAQ section (the one with a bounding box height > 0)
  const origFAQ = await pO.evaluate(() => {
    const els = document.querySelectorAll('.section_faqs-shorthand');
    for (const el of els) {
      const rect = el.getBoundingClientRect();
      if (rect.height > 0) return { found: true, index: Array.from(els).indexOf(el) };
    }
    return { found: false };
  });
  console.log('Original visible FAQ:', origFAQ);

  const origFAQEls = await pO.$$('.section_faqs-shorthand');
  const nextFAQEls = await pN.$$('.section_faqs-shorthand');

  // Find the visible one in original
  let origVisibleFAQ = null;
  for (const el of origFAQEls) {
    const box = await el.boundingBox();
    if (box && box.height > 0) { origVisibleFAQ = el; break; }
  }

  let nextVisibleFAQ = null;
  for (const el of nextFAQEls) {
    const box = await el.boundingBox();
    if (box && box.height > 0) { nextVisibleFAQ = el; break; }
  }

  if (!origVisibleFAQ || !nextVisibleFAQ) {
    console.log('Could not find visible FAQ in both sites');
    await browser.close();
    return;
  }

  const origBox = await origVisibleFAQ.boundingBox();
  const nextBox = await nextVisibleFAQ.boundingBox();
  console.log('Original FAQ box:', origBox);
  console.log('Next.js FAQ box:', nextBox);

  const origPath = path.join(OUTPUT_DIR, 'original-08-faqs-visible.png');
  const nextPath = path.join(OUTPUT_DIR, 'nextjs-08-faqs-visible.png');

  await origVisibleFAQ.screenshot({ path: origPath, animations: 'disabled' });
  await nextVisibleFAQ.screenshot({ path: nextPath, animations: 'disabled' });

  const imgO = loadPNG(origPath);
  const imgN = loadPNG(nextPath);

  const w = Math.min(imgO.width, imgN.width);
  const h = Math.min(imgO.height, imgN.height);
  const a = cropToSize(imgO, w, h);
  const b = cropToSize(imgN, w, h);
  const diff = new PNG({ width: w, height: h });
  const mismatch = pixelmatch(a.data, b.data, diff.data, w, h, { threshold: 0.15, includeAA: false });
  const total = w * h;
  const matchPct = ((1 - mismatch / total) * 100).toFixed(2);

  fs.writeFileSync(path.join(OUTPUT_DIR, 'diff-08-faqs-visible.png'), PNG.sync.write(diff));

  console.log(`FAQ Section: ${matchPct}% match (${mismatch} / ${total} pixels)`);
  console.log(`Original: ${imgO.width}x${imgO.height}, Next.js: ${imgN.width}x${imgN.height}`);
  if (imgO.height !== imgN.height) {
    console.log(`Height diff: ${imgO.height - imgN.height}px`);
  }

  // Also compare the FAQ content structure
  const origFAQContent = await pO.evaluate(() => {
    const els = document.querySelectorAll('.section_faqs-shorthand');
    for (const el of els) {
      if (el.getBoundingClientRect().height > 0) {
        const items = el.querySelectorAll('.accordion-item');
        const h2 = el.querySelector('h2');
        return {
          heading: h2?.textContent?.trim(),
          itemCount: items.length,
          items: Array.from(items).map(item => item.querySelector('.text-size-medium')?.textContent?.trim().substring(0, 60)),
        };
      }
    }
    return null;
  });

  const nextFAQContent = await pN.evaluate(() => {
    const el = document.querySelector('.section_faqs-shorthand');
    if (!el) return null;
    const items = el.querySelectorAll('.accordion-item');
    const h2 = el.querySelector('h2');
    return {
      heading: h2?.textContent?.trim(),
      itemCount: items.length,
      items: Array.from(items).map(item => item.querySelector('.text-size-medium')?.textContent?.trim().substring(0, 60)),
    };
  });

  console.log('\nOriginal FAQ content:', JSON.stringify(origFAQContent, null, 2));
  console.log('Next.js FAQ content:', JSON.stringify(nextFAQContent, null, 2));

  await browser.close();
}

main().catch(err => { console.error(err); process.exit(1); });
