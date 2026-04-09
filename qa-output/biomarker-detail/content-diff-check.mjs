/**
 * Detailed comparison of rich text content between original and Next.js.
 * Focuses on finding missing UL elements.
 */

import { chromium } from '@playwright/test';

const ORIGINAL_URL = 'http://localhost:5503/biomarkers/albumin-test/';
const NEXTJS_URL = 'http://localhost:3000/biomarkers/albumin-test';
const VIEWPORT = { width: 375, height: 812 };

async function main() {
  const browser = await chromium.launch({ headless: true });

  const ctxOrig = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  const ctxNext = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });

  const pageOrig = await ctxOrig.newPage();
  const pageNext = await ctxNext.newPage();

  await pageOrig.goto(ORIGINAL_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await pageNext.goto(NEXTJS_URL, { waitUntil: 'networkidle', timeout: 30000 });

  // Get all rich text blocks with their content summary
  console.log('=== RICH TEXT BLOCKS COMPARISON ===\n');

  const origBlocks = await pageOrig.evaluate(() => {
    return Array.from(document.querySelectorAll('.blog-rich-text.w-richtext')).map((block, idx) => {
      const h2 = block.querySelector('h2');
      const children = Array.from(block.children).map(child => ({
        tag: child.tagName,
        text: child.textContent?.trim().substring(0, 60),
        childCount: child.children.length,
      }));
      return {
        idx,
        h2: h2?.textContent?.trim() || 'no h2',
        childCount: block.children.length,
        children,
        ulCount: block.querySelectorAll('ul').length,
        pCount: block.querySelectorAll('p').length,
        h4Count: block.querySelectorAll('h4').length,
      };
    });
  });

  const nextBlocks = await pageNext.evaluate(() => {
    return Array.from(document.querySelectorAll('.blog-rich-text.w-richtext')).map((block, idx) => {
      const h2 = block.querySelector('h2');
      const children = Array.from(block.children).map(child => ({
        tag: child.tagName,
        text: child.textContent?.trim().substring(0, 60),
        childCount: child.children.length,
      }));
      return {
        idx,
        h2: h2?.textContent?.trim() || 'no h2',
        childCount: block.children.length,
        children,
        ulCount: block.querySelectorAll('ul').length,
        pCount: block.querySelectorAll('p').length,
        h4Count: block.querySelectorAll('h4').length,
      };
    });
  });

  console.log(`Original blocks: ${origBlocks.length}`);
  console.log(`Next.js blocks: ${nextBlocks.length}`);

  for (let i = 0; i < Math.max(origBlocks.length, nextBlocks.length); i++) {
    const o = origBlocks[i];
    const n = nextBlocks[i];
    console.log(`\n--- Block ${i}: "${o?.h2 || n?.h2}" ---`);
    if (o) console.log(`  Original: ${o.childCount} children, ${o.ulCount} UL, ${o.pCount} P, ${o.h4Count} H4`);
    if (n) console.log(`  Next.js:  ${n.childCount} children, ${n.ulCount} UL, ${n.pCount} P, ${n.h4Count} H4`);

    // Show differences in children
    if (o && n) {
      const maxChildren = Math.max(o.children.length, n.children.length);
      for (let j = 0; j < maxChildren; j++) {
        const oc = o.children[j];
        const nc = n.children[j];
        if (!oc) {
          console.log(`  [${j}] MISSING in original: ${nc?.tag} "${nc?.text}"`);
        } else if (!nc) {
          console.log(`  [${j}] MISSING in Next.js: ${oc?.tag} "${oc?.text}"`);
        } else if (oc.tag !== nc.tag) {
          console.log(`  [${j}] TAG DIFF: original=${oc.tag} "${oc.text}" vs nextjs=${nc.tag} "${nc.text}"`);
        }
      }
    }
  }

  // Look at the footer section to understand the 11px height difference
  console.log('\n=== FOOTER HEIGHT ANALYSIS ===');

  const origFooterSubs = await pageOrig.evaluate(() => {
    const footer = document.querySelector('footer') || document.querySelector('.section_footer');
    if (!footer) return 'NOT FOUND';
    return Array.from(footer.children).map(child => {
      const rect = child.getBoundingClientRect();
      return {
        class: child.className?.substring(0, 50),
        height: Math.round(rect.height),
      };
    });
  });

  const nextFooterSubs = await pageNext.evaluate(() => {
    const footer = document.querySelector('footer') || document.querySelector('.section_footer');
    if (!footer) return 'NOT FOUND';
    return Array.from(footer.children).map(child => {
      const rect = child.getBoundingClientRect();
      return {
        class: child.className?.substring(0, 50),
        height: Math.round(rect.height),
      };
    });
  });

  console.log('  Original footer children:', origFooterSubs);
  console.log('  Next.js footer children:', nextFooterSubs);

  // Check the "AI recommends" text wrapping
  const origAIText = await pageOrig.evaluate(() => {
    const el = document.querySelector('.footer_bottom_ask');
    if (!el) {
      // Try alternate selectors
      const parent = document.querySelector('.footer_bottom_ai');
      if (!parent) return 'NOT FOUND';
      const texts = parent.querySelectorAll('div');
      return Array.from(texts).map(t => ({
        class: t.className?.substring(0, 40),
        text: t.textContent?.trim().substring(0, 80),
        height: Math.round(t.getBoundingClientRect().height),
      }));
    }
    return {
      text: el.textContent?.trim().substring(0, 80),
      height: Math.round(el.getBoundingClientRect().height),
    };
  });

  const nextAIText = await pageNext.evaluate(() => {
    const el = document.querySelector('.footer_bottom_ask');
    if (!el) {
      const parent = document.querySelector('.footer_bottom_ai');
      if (!parent) return 'NOT FOUND';
      const texts = parent.querySelectorAll('div');
      return Array.from(texts).map(t => ({
        class: t.className?.substring(0, 40),
        text: t.textContent?.trim().substring(0, 80),
        height: Math.round(t.getBoundingClientRect().height),
      }));
    }
    return {
      text: el.textContent?.trim().substring(0, 80),
      height: Math.round(el.getBoundingClientRect().height),
    };
  });

  console.log('  Original AI text section:', JSON.stringify(origAIText, null, 2));
  console.log('  Next.js AI text section:', JSON.stringify(nextAIText, null, 2));

  // Check the bottom copyright area for the height diff
  const origCopyright = await pageOrig.evaluate(() => {
    const el = document.querySelector('.footer_copyright, .footer-copyright');
    if (!el) return 'NOT FOUND';
    const rect = el.getBoundingClientRect();
    return {
      text: el.textContent?.trim(),
      height: Math.round(rect.height),
      lineHeight: getComputedStyle(el).lineHeight,
      padding: getComputedStyle(el).padding,
    };
  });

  const nextCopyright = await pageNext.evaluate(() => {
    const el = document.querySelector('.footer_copyright, .footer-copyright');
    if (!el) return 'NOT FOUND';
    const rect = el.getBoundingClientRect();
    return {
      text: el.textContent?.trim(),
      height: Math.round(rect.height),
      lineHeight: getComputedStyle(el).lineHeight,
      padding: getComputedStyle(el).padding,
    };
  });

  console.log('  Original copyright:', origCopyright);
  console.log('  Next.js copyright:', nextCopyright);

  // Check the similar biomarkers heading font weight
  console.log('\n=== SIMILAR BIOMARKERS HEADING ===');
  const origSimilarH2 = await pageOrig.evaluate(() => {
    const el = document.querySelector('.section_home2-testimonials h2');
    if (!el) return 'NOT FOUND';
    const cs = getComputedStyle(el);
    return { fontWeight: cs.fontWeight, fontSize: cs.fontSize, lineHeight: cs.lineHeight, text: el.textContent?.trim() };
  });
  const nextSimilarH2 = await pageNext.evaluate(() => {
    const el = document.querySelector('.section_home2-testimonials h2');
    if (!el) return 'NOT FOUND';
    const cs = getComputedStyle(el);
    return { fontWeight: cs.fontWeight, fontSize: cs.fontSize, lineHeight: cs.lineHeight, text: el.textContent?.trim() };
  });
  console.log('  Original:', origSimilarH2);
  console.log('  Next.js:', nextSimilarH2);

  // Check the bottom CTA
  console.log('\n=== BOTTOM CTA ANALYSIS ===');
  const origCTAText = await pageOrig.evaluate(() => {
    const el = document.querySelector('.section_home-cta .scroll-highlight');
    if (!el) return 'NOT FOUND';
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return {
      fontWeight: cs.fontWeight,
      fontSize: cs.fontSize,
      lineHeight: cs.lineHeight,
      color: cs.color,
      height: Math.round(rect.height),
      text: el.textContent?.trim(),
    };
  });
  const nextCTAText = await pageNext.evaluate(() => {
    const el = document.querySelector('.section_home-cta .scroll-highlight');
    if (!el) return 'NOT FOUND';
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return {
      fontWeight: cs.fontWeight,
      fontSize: cs.fontSize,
      lineHeight: cs.lineHeight,
      color: cs.color,
      height: Math.round(rect.height),
      text: el.textContent?.trim(),
    };
  });
  console.log('  Original:', origCTAText);
  console.log('  Next.js:', nextCTAText);

  await browser.close();
  console.log('\nDone.');
}

main().catch(err => { console.error(err); process.exit(1); });
