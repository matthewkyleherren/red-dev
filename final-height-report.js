const { chromium } = require('@playwright/test');

async function finalHeightReport() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }
  });

  // Load original site
  const originalPage = await context.newPage();
  await originalPage.goto('http://localhost:5503/reviews/', { waitUntil: 'networkidle' });
  await originalPage.waitForTimeout(3000);

  // Load Next.js site
  const nextPage = await context.newPage();
  await nextPage.goto('http://localhost:3000/reviews', { waitUntil: 'networkidle' });
  await nextPage.waitForTimeout(3000);

  // Get comprehensive height measurements
  const originalData = await originalPage.evaluate(() => {
    return {
      scrollHeight: document.documentElement.scrollHeight,
      bodyScrollHeight: document.body.scrollHeight,
      bodyOffsetHeight: document.body.offsetHeight,
      bodyClientHeight: document.body.clientHeight,
      documentHeight: document.documentElement.offsetHeight,
      viewportHeight: window.innerHeight,
      bodyComputedHeight: parseFloat(window.getComputedStyle(document.body).height) || 0
    };
  });

  const nextData = await nextPage.evaluate(() => {
    return {
      scrollHeight: document.documentElement.scrollHeight,
      bodyScrollHeight: document.body.scrollHeight,
      bodyOffsetHeight: document.body.offsetHeight,
      bodyClientHeight: document.body.clientHeight,
      documentHeight: document.documentElement.offsetHeight,
      viewportHeight: window.innerHeight,
      bodyComputedHeight: parseFloat(window.getComputedStyle(document.body).height) || 0
    };
  });

  // Get all visible sections
  const originalSections = await originalPage.evaluate(() => {
    const selectors = [
      '[class*="section_"]',
      '[class*="section-"]',
      'section',
      '.footer',
      'footer'
    ];

    const elements = new Map();

    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (!elements.has(el)) {
          const computed = window.getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          const inFlow = computed.position !== 'fixed' && computed.position !== 'absolute';

          if (rect.height > 0 && inFlow) {
            elements.set(el, {
              tag: el.tagName.toLowerCase(),
              className: el.className,
              height: rect.height,
              offsetTop: el.offsetTop
            });
          }
        }
      });
    });

    return Array.from(elements.values()).sort((a, b) => a.offsetTop - b.offsetTop);
  });

  const nextSections = await nextPage.evaluate(() => {
    const selectors = [
      '[class*="section_"]',
      '[class*="section-"]',
      'section',
      '.footer',
      'footer'
    ];

    const elements = new Map();

    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (!elements.has(el)) {
          const computed = window.getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          const inFlow = computed.position !== 'fixed' && computed.position !== 'absolute';

          if (rect.height > 0 && inFlow) {
            elements.set(el, {
              tag: el.tagName.toLowerCase(),
              className: el.className,
              height: rect.height,
              offsetTop: el.offsetTop
            });
          }
        }
      });
    });

    return Array.from(elements.values()).sort((a, b) => a.offsetTop - b.offsetTop);
  });

  await browser.close();

  // Generate report
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║         REVIEWS PAGE HEIGHT COMPARISON (375px mobile)         ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  console.log('PAGE HEIGHT MEASUREMENTS:');
  console.log('─────────────────────────────────────────────────────────────────');
  console.log(`                              Original    Next.js     Difference`);
  console.log('─────────────────────────────────────────────────────────────────');
  console.log(`scrollHeight:                 ${originalData.scrollHeight.toString().padStart(7)}    ${nextData.scrollHeight.toString().padStart(7)}    ${(nextData.scrollHeight - originalData.scrollHeight > 0 ? '+' : '') + (nextData.scrollHeight - originalData.scrollHeight).toString().padStart(6)}px`);
  console.log(`body.scrollHeight:            ${originalData.bodyScrollHeight.toString().padStart(7)}    ${nextData.bodyScrollHeight.toString().padStart(7)}    ${(nextData.bodyScrollHeight - originalData.bodyScrollHeight > 0 ? '+' : '') + (nextData.bodyScrollHeight - originalData.bodyScrollHeight).toString().padStart(6)}px`);
  console.log(`body.offsetHeight:            ${originalData.bodyOffsetHeight.toString().padStart(7)}    ${nextData.bodyOffsetHeight.toString().padStart(7)}    ${(nextData.bodyOffsetHeight - originalData.bodyOffsetHeight > 0 ? '+' : '') + (nextData.bodyOffsetHeight - originalData.bodyOffsetHeight).toString().padStart(6)}px`);
  console.log('─────────────────────────────────────────────────────────────────\n');

  console.log('MAIN HEIGHT DIFFERENCE: ' +
    (nextData.scrollHeight - originalData.scrollHeight > 0 ? '+' : '') +
    (nextData.scrollHeight - originalData.scrollHeight) + 'px\n');

  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║                  SECTION-BY-SECTION BREAKDOWN                  ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  // Match sections and show differences
  const differences = [];
  const matched = new Set();

  originalSections.forEach((orig) => {
    const origClass = orig.className.split(' ').filter(c => c.includes('section')).join(' ');

    nextSections.forEach((next, nextIndex) => {
      if (matched.has(nextIndex)) return;

      const nextClass = next.className.split(' ').filter(c => c.includes('section')).join(' ');

      if (origClass && nextClass && origClass === nextClass) {
        matched.add(nextIndex);

        const heightDiff = next.height - orig.height;
        differences.push({
          identifier: origClass || orig.className.substring(0, 30),
          originalHeight: orig.height,
          nextHeight: next.height,
          diff: heightDiff
        });
      }
    });
  });

  // Sort by absolute difference
  differences.sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));

  console.log('Sections with Height Differences:');
  console.log('─────────────────────────────────────────────────────────────────\n');

  let cumulativeDiff = 0;
  differences.forEach((d, i) => {
    if (Math.abs(d.diff) > 0.5) {
      cumulativeDiff += d.diff;
      console.log(`${(i + 1).toString().padStart(2)}. ${d.identifier}`);
      console.log(`    Original: ${d.originalHeight.toFixed(2)}px`);
      console.log(`    Next.js:  ${d.nextHeight.toFixed(2)}px`);
      console.log(`    Diff:     ${d.diff > 0 ? '+' : ''}${d.diff.toFixed(2)}px`);
      console.log('');
    }
  });

  console.log('─────────────────────────────────────────────────────────────────');
  console.log(`CUMULATIVE MATCHED SECTION DIFFERENCE: ${cumulativeDiff > 0 ? '+' : ''}${cumulativeDiff.toFixed(2)}px`);
  console.log('─────────────────────────────────────────────────────────────────\n');

  // Show unmatched sections
  const unmatchedNext = nextSections.filter((_, idx) => !matched.has(idx));
  const matchedOrigIndexes = new Set();
  originalSections.forEach((orig, origIdx) => {
    nextSections.forEach((next, nextIdx) => {
      if (matched.has(nextIdx)) {
        const origClass = orig.className.split(' ').filter(c => c.includes('section')).join(' ');
        const nextClass = next.className.split(' ').filter(c => c.includes('section')).join(' ');
        if (origClass && nextClass && origClass === nextClass) {
          matchedOrigIndexes.add(origIdx);
        }
      }
    });
  });
  const unmatchedOrig = originalSections.filter((_, idx) => !matchedOrigIndexes.has(idx));

  if (unmatchedOrig.length > 0 || unmatchedNext.length > 0) {
    console.log('Unmatched Sections:');
    console.log('─────────────────────────────────────────────────────────────────\n');

    if (unmatchedOrig.length > 0) {
      console.log('In ORIGINAL but missing in Next.js:');
      let missingTotal = 0;
      unmatchedOrig.forEach(s => {
        const className = s.className.split(' ').filter(c => c.includes('section')).join(' ') || s.className.substring(0, 30);
        console.log(`  - ${className} (${s.height.toFixed(2)}px)`);
        missingTotal += s.height;
      });
      console.log(`  TOTAL MISSING: ${missingTotal.toFixed(2)}px\n`);
    }

    if (unmatchedNext.length > 0) {
      console.log('In NEXT.JS but not in original:');
      let extraTotal = 0;
      unmatchedNext.forEach(s => {
        const className = s.className.split(' ').filter(c => c.includes('section')).join(' ') || s.className.substring(0, 30);
        console.log(`  + ${className} (${s.height.toFixed(2)}px)`);
        extraTotal += s.height;
      });
      console.log(`  TOTAL EXTRA: ${extraTotal.toFixed(2)}px\n`);
    }
  }

  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║                            SUMMARY                             ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  console.log(`Page Height: Original ${originalData.scrollHeight}px → Next.js ${nextData.scrollHeight}px`);
  console.log(`Overall Difference: ${nextData.scrollHeight - originalData.scrollHeight > 0 ? '+' : ''}${nextData.scrollHeight - originalData.scrollHeight}px`);
  console.log(`Match Accuracy: ${((matched.size / Math.max(originalSections.length, nextSections.length)) * 100).toFixed(1)}%`);
  console.log('');
}

finalHeightReport().catch(console.error);
