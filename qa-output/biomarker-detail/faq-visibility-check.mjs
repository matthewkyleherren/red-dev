/**
 * Quick check on why the FAQ section has zero height in the original.
 */
import { chromium } from '@playwright/test';

const ORIGINAL_URL = 'http://localhost:5503/biomarkers/albumin-test/';
const VIEWPORT = { width: 375, height: 812 };

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(ORIGINAL_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);

  const faqInfo = await page.evaluate(() => {
    const el = document.querySelector('.section_faqs-shorthand');
    if (!el) return 'NOT FOUND';
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    // Check parents up to 3 levels
    const parents = [];
    let p = el.parentElement;
    for (let i = 0; i < 3 && p; i++) {
      const pcs = getComputedStyle(p);
      parents.push({
        tag: p.tagName,
        class: p.className?.substring(0, 50),
        display: pcs.display,
        visibility: pcs.visibility,
        overflow: pcs.overflow,
        height: pcs.height,
      });
      p = p.parentElement;
    }
    return {
      display: cs.display,
      visibility: cs.visibility,
      overflow: cs.overflow,
      height: cs.height,
      width: cs.width,
      maxHeight: cs.maxHeight,
      opacity: cs.opacity,
      position: cs.position,
      rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
      innerHTML: el.innerHTML.substring(0, 200),
      childCount: el.children.length,
      parents,
    };
  });

  console.log('FAQ section in original:', JSON.stringify(faqInfo, null, 2));

  // Check if it has any FAQ items
  const faqItems = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.section_faqs-shorthand .accordion-item')).map(item => {
      return {
        text: item.textContent?.trim().substring(0, 60),
        display: getComputedStyle(item).display,
      };
    });
  });
  console.log('FAQ items in original:', faqItems);

  // Check if there's a w-condition-invisible class
  const invisibleClasses = await page.evaluate(() => {
    const el = document.querySelector('.section_faqs-shorthand');
    if (!el) return 'NOT FOUND';
    return {
      classList: Array.from(el.classList),
      hasWCondInvis: el.classList.contains('w-condition-invisible'),
    };
  });
  console.log('FAQ classes:', invisibleClasses);

  await browser.close();
}

main().catch(err => { console.error(err); process.exit(1); });
