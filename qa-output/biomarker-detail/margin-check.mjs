/**
 * Count UL elements and check their margins to confirm the 96px drift theory.
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
  await pageOrig.evaluate(() => document.fonts.ready);
  await pageOrig.waitForTimeout(1500);

  await pageNext.goto(NEXTJS_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await pageNext.evaluate(() => document.fonts.ready);
  await pageNext.waitForTimeout(1500);

  // Check all UL elements in the content area
  console.log('=== UL MARGIN ANALYSIS ===');

  const origULs = await pageOrig.evaluate(() => {
    return Array.from(document.querySelectorAll('.blog-cms-content_main ul')).map((ul, i) => {
      const cs = getComputedStyle(ul);
      const rect = ul.getBoundingClientRect();
      return {
        index: i,
        top: Math.round(rect.top),
        marginTop: cs.marginTop,
        marginBottom: cs.marginBottom,
        itemCount: ul.children.length,
        parentClass: ul.parentElement?.className || 'none',
      };
    });
  });

  const nextULs = await pageNext.evaluate(() => {
    return Array.from(document.querySelectorAll('.blog-cms-content_main ul')).map((ul, i) => {
      const cs = getComputedStyle(ul);
      const rect = ul.getBoundingClientRect();
      return {
        index: i,
        top: Math.round(rect.top),
        marginTop: cs.marginTop,
        marginBottom: cs.marginBottom,
        itemCount: ul.children.length,
        parentClass: ul.parentElement?.className || 'none',
      };
    });
  });

  console.log(`  Original ULs (${origULs.length}):`);
  origULs.forEach(u => console.log(`    #${u.index}: mt=${u.marginTop}, mb=${u.marginBottom}, top=${u.top}, items=${u.itemCount}, parent="${u.parentClass}"`));
  console.log(`  Next.js ULs (${nextULs.length}):`);
  nextULs.forEach(u => console.log(`    #${u.index}: mt=${u.marginTop}, mb=${u.marginBottom}, top=${u.top}, items=${u.itemCount}, parent="${u.parentClass}"`));

  // Check w-richtext default ul/ol styles
  console.log('\n=== W-RICHTEXT CSS RULES FOR UL ===');

  const origRichTextULRules = await pageOrig.evaluate(() => {
    const results = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          const text = rule.selectorText || '';
          if (text.includes('w-richtext') && (text.includes('ul') || text.includes('ol') || text.includes('li'))) {
            results.push({ selector: text, css: rule.cssText.substring(0, 200) });
          }
        }
      } catch (e) {
        // cross-origin
      }
    }
    return results;
  });

  const nextRichTextULRules = await pageNext.evaluate(() => {
    const results = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          const text = rule.selectorText || '';
          if (text.includes('w-richtext') && (text.includes('ul') || text.includes('ol') || text.includes('li'))) {
            results.push({ selector: text, css: rule.cssText.substring(0, 200) });
          }
        }
      } catch (e) {
        // cross-origin
      }
    }
    return results;
  });

  console.log('  Original rules:');
  origRichTextULRules.forEach(r => console.log(`    ${r.selector}: ${r.css}`));
  console.log('  Next.js rules:');
  nextRichTextULRules.forEach(r => console.log(`    ${r.selector}: ${r.css}`));

  // Check all .w-richtext elements and their last child margin rules
  console.log('\n=== CHECKING LAST-CHILD MARGIN RULE ===');

  const origLastChildRule = await pageOrig.evaluate(() => {
    const results = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          const text = rule.cssText || '';
          if (text.includes('w-richtext') && text.includes('last-child')) {
            results.push(text.substring(0, 300));
          }
        }
      } catch (e) {}
    }
    return results;
  });

  const nextLastChildRule = await pageNext.evaluate(() => {
    const results = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          const text = rule.cssText || '';
          if (text.includes('w-richtext') && text.includes('last-child')) {
            results.push(text.substring(0, 300));
          }
        }
      } catch (e) {}
    }
    return results;
  });

  console.log('  Original last-child rules:');
  origLastChildRule.forEach(r => console.log(`    ${r}`));
  console.log('  Next.js last-child rules:');
  nextLastChildRule.forEach(r => console.log(`    ${r}`));

  // Count total <ul> within .w-richtext to get the exact margin loss
  const origAllULs = await pageOrig.evaluate(() => {
    return Array.from(document.querySelectorAll('.w-richtext ul')).map(ul => {
      const cs = getComputedStyle(ul);
      return { mb: cs.marginBottom, isLast: ul === ul.parentElement?.lastElementChild };
    });
  });

  const nextAllULs = await pageNext.evaluate(() => {
    return Array.from(document.querySelectorAll('.w-richtext ul')).map(ul => {
      const cs = getComputedStyle(ul);
      return { mb: cs.marginBottom, isLast: ul === ul.parentElement?.lastElementChild };
    });
  });

  console.log('\n=== ALL UL IN .w-richtext ===');
  console.log(`  Original (${origAllULs.length}):`, origAllULs);
  console.log(`  Next.js (${nextAllULs.length}):`, nextAllULs);

  // Calculate total margin difference
  let totalDiff = 0;
  for (let i = 0; i < Math.min(origAllULs.length, nextAllULs.length); i++) {
    const origMb = parseFloat(origAllULs[i].mb);
    const nextMb = parseFloat(nextAllULs[i].mb);
    totalDiff += origMb - nextMb;
  }
  console.log(`\n  Total UL margin-bottom difference: ${totalDiff}px`);

  // Check the Book Test CTA background rendering
  console.log('\n=== BOOK TEST CTA BACKGROUND ===');

  // In the original Webflow, is there a canvas element for the gradient?
  const origCanvas = await pageOrig.evaluate(() => {
    const wrap = document.querySelector('.blog-cms-content_book-test_wrap');
    if (!wrap) return 'NO WRAP';
    const canvas = wrap.querySelector('canvas');
    const bgEls = wrap.querySelectorAll('.image_cover-absolute');
    return {
      hasCanvas: !!canvas,
      bgElementCount: bgEls.length,
      bgElements: Array.from(bgEls).map(el => ({
        tag: el.tagName,
        bg: getComputedStyle(el).background.substring(0, 200),
        bgImage: getComputedStyle(el).backgroundImage.substring(0, 200),
      })),
    };
  });

  const nextCanvas = await pageNext.evaluate(() => {
    const wrap = document.querySelector('.blog-cms-content_book-test_wrap');
    if (!wrap) return 'NO WRAP';
    const canvas = wrap.querySelector('canvas');
    const bgEls = wrap.querySelectorAll('.image_cover-absolute');
    return {
      hasCanvas: !!canvas,
      bgElementCount: bgEls.length,
      bgElements: Array.from(bgEls).map(el => ({
        tag: el.tagName,
        bg: getComputedStyle(el).background.substring(0, 200),
        bgImage: getComputedStyle(el).backgroundImage.substring(0, 200),
      })),
    };
  });

  console.log('  Original:', JSON.stringify(origCanvas, null, 2));
  console.log('  Next.js:', JSON.stringify(nextCanvas, null, 2));

  // Check the chat widget differences (the "Hey there! Got any questions?" popup)
  console.log('\n=== CHAT WIDGET CHECK ===');
  const origChat = await pageOrig.$('#hubspot-messages-iframe-container, [class*="intercom"], [class*="drift"], [class*="chat"], #SmartSupp');
  const nextChat = await pageNext.$('#hubspot-messages-iframe-container, [class*="intercom"], [class*="drift"], [class*="chat"], #SmartSupp');
  console.log(`  Original chat widget found: ${!!origChat}`);
  console.log(`  Next.js chat widget found: ${!!nextChat}`);

  // Check if there's a smartsupp or similar
  const origChatAll = await pageOrig.evaluate(() => {
    const iframes = document.querySelectorAll('iframe');
    return Array.from(iframes).map(f => ({ src: f.src?.substring(0, 100), id: f.id, name: f.name }));
  });
  console.log('  Original iframes:', origChatAll);

  await browser.close();
  console.log('\nDone.');
}

main().catch(err => { console.error(err); process.exit(1); });
