/**
 * Check font loading and rendering differences between original and Next.js.
 */

import { chromium } from '@playwright/test';

const ORIGINAL_URL = 'http://localhost:5503/biomarkers/albumin-test/';
const NEXTJS_URL = 'http://localhost:3000/biomarkers/albumin-test';
const VIEWPORT = { width: 375, height: 812 };

async function waitForPageReady(page) {
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1500);
}

async function getFontInfo(page, label) {
  const fontsLoaded = await page.evaluate(() => {
    const fonts = [];
    document.fonts.forEach(f => {
      fonts.push({
        family: f.family,
        style: f.style,
        weight: f.weight,
        status: f.status,
      });
    });
    return fonts;
  });

  const bodyFont = await page.evaluate(() => {
    const cs = getComputedStyle(document.body);
    return {
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
    };
  });

  const h1Font = await page.evaluate(() => {
    const el = document.querySelector('h1');
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
    };
  });

  const h2Font = await page.evaluate(() => {
    const el = document.querySelector('.blog-rich-text h2');
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
      marginTop: cs.marginTop,
      marginBottom: cs.marginBottom,
    };
  });

  const pFont = await page.evaluate(() => {
    const el = document.querySelector('.blog-rich-text p');
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
      marginTop: cs.marginTop,
      marginBottom: cs.marginBottom,
    };
  });

  const h4Font = await page.evaluate(() => {
    const el = document.querySelector('.blog-rich-text h4');
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
      marginTop: cs.marginTop,
      marginBottom: cs.marginBottom,
    };
  });

  // Check ul/li styling
  const ulStyle = await page.evaluate(() => {
    const el = document.querySelector('.blog-rich-text ul');
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      marginTop: cs.marginTop,
      marginBottom: cs.marginBottom,
      paddingLeft: cs.paddingLeft,
      listStyleType: cs.listStyleType,
    };
  });

  const liStyle = await page.evaluate(() => {
    const el = document.querySelector('.blog-rich-text li');
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      marginBottom: cs.marginBottom,
      lineHeight: cs.lineHeight,
      fontSize: cs.fontSize,
    };
  });

  // Check the global html font-size
  const htmlFontSize = await page.evaluate(() => {
    return getComputedStyle(document.documentElement).fontSize;
  });

  console.log(`\n=== ${label} ===`);
  console.log(`  HTML font-size: ${htmlFontSize}`);
  console.log(`  Fonts loaded: ${fontsLoaded.length}`);
  fontsLoaded.forEach(f => console.log(`    ${f.family} (${f.weight} ${f.style}): ${f.status}`));
  console.log(`  body:`, JSON.stringify(bodyFont));
  console.log(`  h1:`, JSON.stringify(h1Font));
  console.log(`  h2 (.blog-rich-text):`, JSON.stringify(h2Font));
  console.log(`  h4 (.blog-rich-text):`, JSON.stringify(h4Font));
  console.log(`  p (.blog-rich-text):`, JSON.stringify(pFont));
  console.log(`  ul (.blog-rich-text):`, JSON.stringify(ulStyle));
  console.log(`  li (.blog-rich-text):`, JSON.stringify(liStyle));
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  const ctxOrig = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  const ctxNext = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });

  const pageOrig = await ctxOrig.newPage();
  const pageNext = await ctxNext.newPage();

  await pageOrig.goto(ORIGINAL_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await waitForPageReady(pageOrig);
  await pageNext.goto(NEXTJS_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await waitForPageReady(pageNext);

  await getFontInfo(pageOrig, 'ORIGINAL (Webflow)');
  await getFontInfo(pageNext, 'NEXT.JS');

  // Also compare the w-richtext default styles for margin/spacing
  console.log('\n=== W-RICHTEXT MARGIN COMPARISON ===');

  // Get all h2 element positions in the content to find offset drift
  const origH2Positions = await pageOrig.evaluate(() => {
    return Array.from(document.querySelectorAll('.blog-rich-text h2')).map(el => {
      const rect = el.getBoundingClientRect();
      return { text: el.textContent?.trim().substring(0, 40), top: rect.top, height: rect.height };
    });
  });

  const nextH2Positions = await pageNext.evaluate(() => {
    return Array.from(document.querySelectorAll('.blog-rich-text h2')).map(el => {
      const rect = el.getBoundingClientRect();
      return { text: el.textContent?.trim().substring(0, 40), top: rect.top, height: rect.height };
    });
  });

  console.log('\n  H2 positions (Original vs Next.js):');
  for (let i = 0; i < Math.max(origH2Positions.length, nextH2Positions.length); i++) {
    const o = origH2Positions[i];
    const n = nextH2Positions[i];
    if (o && n) {
      const drift = Math.round(n.top - o.top);
      console.log(`  "${o.text}": orig top=${Math.round(o.top)}, next top=${Math.round(n.top)}, drift=${drift}px, height orig=${Math.round(o.height)} next=${Math.round(n.height)}`);
    }
  }

  // Check if the FAQ section is being hidden in original via display:none or visibility:hidden
  console.log('\n=== FAQ VISIBILITY CHECK ===');
  const faqOrigDisplay = await pageOrig.evaluate(() => {
    const el = document.querySelector('.section_faqs-shorthand');
    if (!el) return 'NOT FOUND';
    const cs = getComputedStyle(el);
    return { display: cs.display, visibility: cs.visibility, height: cs.height, overflow: cs.overflow };
  });
  const faqNextDisplay = await pageNext.evaluate(() => {
    const el = document.querySelector('.section_faqs-shorthand');
    if (!el) return 'NOT FOUND';
    const cs = getComputedStyle(el);
    return { display: cs.display, visibility: cs.visibility, height: cs.height, overflow: cs.overflow };
  });
  console.log(`  Original FAQ display:`, faqOrigDisplay);
  console.log(`  Next.js FAQ display:`, faqNextDisplay);

  await browser.close();
  console.log('\nDone.');
}

main().catch(err => { console.error(err); process.exit(1); });
