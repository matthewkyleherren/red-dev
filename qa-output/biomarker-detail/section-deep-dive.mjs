/**
 * Deep dive into the content section to isolate exactly which sub-sections
 * contribute the most mismatches within the 89.53% match area.
 *
 * We slice the content section screenshots horizontally into bands
 * and compare each band independently.
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

// Sub-sections within the content area to isolate
const CONTENT_SUBSECTIONS = [
  { name: 'disclaimer', selector: '.blog-cms_disclaimer-wrapper', description: 'Disclaimer / method note' },
  { name: 'book-test-cta', selector: '.blog-cms-content_book-test_wrap', description: 'Book Test CTA card' },
  { name: 'richtext-all', selector: '.blog-cms-content_main.is-biomarker', description: 'Full main content column' },
  { name: 'line-divider', selector: '.line-divider-horizontal', description: 'Horizontal line divider' },
];

// We'll also do a vertical band analysis of the full content section
async function waitForPageReady(page) {
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1500);
}

function loadPNG(filePath) {
  return PNG.sync.read(fs.readFileSync(filePath));
}

function comparePNGs(imgA, imgB) {
  const w = Math.min(imgA.width, imgB.width);
  const h = Math.min(imgA.height, imgB.height);
  const a = cropToSize(imgA, w, h);
  const b = cropToSize(imgB, w, h);
  const diff = new PNG({ width: w, height: h });
  const mismatch = pixelmatch(a.data, b.data, diff.data, w, h, { threshold: 0.15, includeAA: false });
  const totalPixels = w * h;
  const matchPercent = ((1 - mismatch / totalPixels) * 100).toFixed(2);
  return { mismatch, totalPixels, matchPercent, diff, w, h };
}

function cropToSize(img, targetW, targetH) {
  if (img.width === targetW && img.height === targetH) return img;
  const cropped = new PNG({ width: targetW, height: targetH });
  for (let i = 0; i < cropped.data.length; i += 4) {
    cropped.data[i] = 255; cropped.data[i + 1] = 255; cropped.data[i + 2] = 255; cropped.data[i + 3] = 255;
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

/**
 * Extract a horizontal band from a PNG
 */
function extractBand(img, startY, endY) {
  const h = endY - startY;
  const w = img.width;
  const band = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const srcIdx = ((startY + y) * w + x) * 4;
      const dstIdx = (y * w + x) * 4;
      band.data[dstIdx] = img.data[srcIdx];
      band.data[dstIdx + 1] = img.data[srcIdx + 1];
      band.data[dstIdx + 2] = img.data[srcIdx + 2];
      band.data[dstIdx + 3] = img.data[srcIdx + 3];
    }
  }
  return band;
}

async function main() {
  console.log('Launching browser for deep dive...');
  const browser = await chromium.launch({ headless: true });

  const ctxOrig = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  const ctxNext = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });

  const pageOrig = await ctxOrig.newPage();
  const pageNext = await ctxNext.newPage();

  await pageOrig.goto(ORIGINAL_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await waitForPageReady(pageOrig);
  await pageNext.goto(NEXTJS_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await waitForPageReady(pageNext);

  // Part 1: Capture specific sub-elements
  console.log('\n=== SUB-ELEMENT COMPARISON ===');
  for (const sub of CONTENT_SUBSECTIONS) {
    const elOrig = await pageOrig.$(sub.selector);
    const elNext = await pageNext.$(sub.selector);

    if (!elOrig || !elNext) {
      console.log(`\n${sub.name}: ${!elOrig ? 'MISSING in original' : ''} ${!elNext ? 'MISSING in Next.js' : ''}`);
      continue;
    }

    const boxOrig = await elOrig.boundingBox();
    const boxNext = await elNext.boundingBox();

    const pathOrig = path.join(OUTPUT_DIR, `deep-original-${sub.name}.png`);
    const pathNext = path.join(OUTPUT_DIR, `deep-nextjs-${sub.name}.png`);

    await elOrig.screenshot({ path: pathOrig, animations: 'disabled' });
    await elNext.screenshot({ path: pathNext, animations: 'disabled' });

    const imgOrig = loadPNG(pathOrig);
    const imgNext = loadPNG(pathNext);
    const result = comparePNGs(imgOrig, imgNext);

    const diffPath = path.join(OUTPUT_DIR, `deep-diff-${sub.name}.png`);
    fs.writeFileSync(diffPath, PNG.sync.write(result.diff));

    console.log(`\n${sub.name} (${sub.description}):`);
    console.log(`  Original: ${Math.round(boxOrig.width)}x${Math.round(boxOrig.height)}`);
    console.log(`  Next.js:  ${Math.round(boxNext.width)}x${Math.round(boxNext.height)}`);
    console.log(`  Match:    ${result.matchPercent}%`);
    console.log(`  Mismatch: ${result.mismatch} pixels`);
    if (Math.round(boxOrig.height) !== Math.round(boxNext.height)) {
      console.log(`  HEIGHT DIFF: ${Math.round(boxOrig.height - boxNext.height)}px`);
    }
  }

  // Part 2: Band analysis of the full content section
  console.log('\n=== VERTICAL BAND ANALYSIS (content section) ===');

  const origFullPath = path.join(OUTPUT_DIR, 'original-03-content-top.png');
  const nextFullPath = path.join(OUTPUT_DIR, 'nextjs-03-content-top.png');
  const imgOrig = loadPNG(origFullPath);
  const imgNext = loadPNG(nextFullPath);

  const bandHeight = 500; // pixels per band
  const minHeight = Math.min(imgOrig.height, imgNext.height);
  const numBands = Math.ceil(minHeight / bandHeight);

  for (let i = 0; i < numBands; i++) {
    const startY = i * bandHeight;
    const endY = Math.min((i + 1) * bandHeight, minHeight);
    const bandOrig = extractBand(imgOrig, startY, endY);
    const bandNext = extractBand(imgNext, startY, endY);
    const result = comparePNGs(bandOrig, bandNext);

    const diffPath = path.join(OUTPUT_DIR, `band-diff-${String(i).padStart(2, '0')}-${startY}-${endY}.png`);
    fs.writeFileSync(diffPath, PNG.sync.write(result.diff));

    console.log(`  Band ${i} (y=${startY}-${endY}): ${result.matchPercent}% match, ${result.mismatch} mismatched pixels`);
  }

  // Part 3: Get computed styles for the book-test CTA gradient to identify differences
  console.log('\n=== STYLE COMPARISON: Book Test CTA ===');

  const ctaStylesOrig = await pageOrig.evaluate(() => {
    const el = document.querySelector('.blog-cms-content_book-test_wrap');
    if (!el) return null;
    const cs = getComputedStyle(el);
    const bgEl = el.querySelector('.image_cover-absolute');
    const bgCs = bgEl ? getComputedStyle(bgEl) : null;
    return {
      bg: cs.background,
      bgImage: cs.backgroundImage,
      bgColor: cs.backgroundColor,
      borderRadius: cs.borderRadius,
      padding: cs.padding,
      bgElBg: bgCs?.background,
      bgElBgImage: bgCs?.backgroundImage,
    };
  });

  const ctaStylesNext = await pageNext.evaluate(() => {
    const el = document.querySelector('.blog-cms-content_book-test_wrap');
    if (!el) return null;
    const cs = getComputedStyle(el);
    const bgEl = el.querySelector('.image_cover-absolute');
    const bgCs = bgEl ? getComputedStyle(bgEl) : null;
    return {
      bg: cs.background,
      bgImage: cs.backgroundImage,
      bgColor: cs.backgroundColor,
      borderRadius: cs.borderRadius,
      padding: cs.padding,
      bgElBg: bgCs?.background,
      bgElBgImage: bgCs?.backgroundImage,
    };
  });

  console.log('  Original CTA styles:', JSON.stringify(ctaStylesOrig, null, 2));
  console.log('  Next.js CTA styles:', JSON.stringify(ctaStylesNext, null, 2));

  // Part 4: Check FAQs presence
  console.log('\n=== FAQ SECTION CHECK ===');
  const faqOrigExists = await pageOrig.$('.section_faqs-shorthand');
  const faqOrigBox = faqOrigExists ? await faqOrigExists.boundingBox() : null;
  const faqNextExists = await pageNext.$('.section_faqs-shorthand');
  const faqNextBox = faqNextExists ? await faqNextExists.boundingBox() : null;
  console.log(`  Original FAQ: ${faqOrigExists ? `exists, box=${JSON.stringify(faqOrigBox)}` : 'NOT FOUND'}`);
  console.log(`  Next.js FAQ: ${faqNextExists ? `exists, box=${JSON.stringify(faqNextBox)}` : 'NOT FOUND'}`);

  // Part 5: Check bottom CTA differences
  console.log('\n=== BOTTOM CTA STYLE CHECK ===');
  const origBottomCTAImg = await pageOrig.$('.section_home-cta .image_cover-absolute');
  const nextBottomCTAImg = await pageNext.$('.section_home-cta .image_cover-absolute');
  if (origBottomCTAImg && nextBottomCTAImg) {
    const origSrc = await origBottomCTAImg.getAttribute('src');
    const nextSrc = await nextBottomCTAImg.getAttribute('src');
    const origNatural = await pageOrig.evaluate(el => ({ w: el.naturalWidth, h: el.naturalHeight, loaded: el.complete }), origBottomCTAImg);
    const nextNatural = await pageNext.evaluate(el => ({ w: el.naturalWidth, h: el.naturalHeight, loaded: el.complete }), nextBottomCTAImg);
    console.log(`  Original src: ${origSrc}, natural: ${JSON.stringify(origNatural)}`);
    console.log(`  Next.js src: ${nextSrc}, natural: ${JSON.stringify(nextNatural)}`);
  }

  // Part 6: Footer line-break difference
  console.log('\n=== FOOTER AI TEXT CHECK ===');
  const origFooterAIText = await pageOrig.evaluate(() => {
    const el = document.querySelector('.footer_bottom_ai');
    if (!el) return 'NOT FOUND';
    return el.textContent?.trim();
  });
  const nextFooterAIText = await pageNext.evaluate(() => {
    const el = document.querySelector('.footer_bottom_ai');
    if (!el) return 'NOT FOUND';
    return el.textContent?.trim();
  });
  console.log(`  Original: "${origFooterAIText?.substring(0, 100)}"`);
  console.log(`  Next.js: "${nextFooterAIText?.substring(0, 100)}"`);

  // Part 7: Content section - check for rich text rendering differences (e.g., h4 vs bold, list styling)
  console.log('\n=== RICH TEXT CONTENT CHECK ===');
  const origH2Count = await pageOrig.evaluate(() => document.querySelectorAll('.blog-rich-text h2').length);
  const nextH2Count = await pageNext.evaluate(() => document.querySelectorAll('.blog-rich-text h2').length);
  const origH4Count = await pageOrig.evaluate(() => document.querySelectorAll('.blog-rich-text h4').length);
  const nextH4Count = await pageNext.evaluate(() => document.querySelectorAll('.blog-rich-text h4').length);
  const origUlCount = await pageOrig.evaluate(() => document.querySelectorAll('.blog-rich-text ul').length);
  const nextUlCount = await pageNext.evaluate(() => document.querySelectorAll('.blog-rich-text ul').length);
  const origPCount = await pageOrig.evaluate(() => document.querySelectorAll('.blog-rich-text p').length);
  const nextPCount = await pageNext.evaluate(() => document.querySelectorAll('.blog-rich-text p').length);

  console.log(`  H2: original=${origH2Count}, nextjs=${nextH2Count}`);
  console.log(`  H4: original=${origH4Count}, nextjs=${nextH4Count}`);
  console.log(`  UL: original=${origUlCount}, nextjs=${nextUlCount}`);
  console.log(`  P:  original=${origPCount}, nextjs=${nextPCount}`);

  // Check the rich text content's inner HTML size to detect missing content
  const origContentLen = await pageOrig.evaluate(() => {
    const el = document.querySelector('.blog-cms-content_main');
    return el ? el.innerHTML.length : 0;
  });
  const nextContentLen = await pageNext.evaluate(() => {
    const el = document.querySelector('.blog-cms-content_main');
    return el ? el.innerHTML.length : 0;
  });
  console.log(`  Main content innerHTML length: original=${origContentLen}, nextjs=${nextContentLen}`);

  // Check the bottom 3 feature icons in book test CTA
  console.log('\n=== BOOK TEST CTA BOTTOM ITEMS ===');
  const origCTAItems = await pageOrig.evaluate(() => {
    const items = document.querySelectorAll('.blog-cms-content_book-test_item');
    return Array.from(items).map(el => ({
      text: el.textContent?.trim(),
      display: getComputedStyle(el).display,
    }));
  });
  const nextCTAItems = await pageNext.evaluate(() => {
    const items = document.querySelectorAll('.blog-cms-content_book-test_item');
    return Array.from(items).map(el => ({
      text: el.textContent?.trim(),
      display: getComputedStyle(el).display,
    }));
  });
  console.log(`  Original items (${origCTAItems.length}):`, origCTAItems);
  console.log(`  Next.js items (${nextCTAItems.length}):`, nextCTAItems);

  // Check CTA bottom section layout
  const origCTABot = await pageOrig.$('.blog-cms-content_book-test_bot');
  const nextCTABot = await pageNext.$('.blog-cms-content_book-test_bot');
  if (origCTABot && nextCTABot) {
    const origBox = await origCTABot.boundingBox();
    const nextBox = await nextCTABot.boundingBox();
    console.log(`  Original bot box: ${JSON.stringify(origBox)}`);
    console.log(`  Next.js bot box: ${JSON.stringify(nextBox)}`);
    const origLayout = await pageOrig.evaluate(el => {
      const cs = getComputedStyle(el);
      return { display: cs.display, flexDirection: cs.flexDirection, flexWrap: cs.flexWrap, gap: cs.gap };
    }, origCTABot);
    const nextLayout = await pageNext.evaluate(el => {
      const cs = getComputedStyle(el);
      return { display: cs.display, flexDirection: cs.flexDirection, flexWrap: cs.flexWrap, gap: cs.gap };
    }, nextCTABot);
    console.log(`  Original layout:`, origLayout);
    console.log(`  Next.js layout:`, nextLayout);
  }

  await browser.close();
  console.log('\nDone.');
}

main().catch(err => { console.error(err); process.exit(1); });
