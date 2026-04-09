const { chromium } = require('@playwright/test');
const pixelmatch = require('pixelmatch').default;
const { PNG } = require('pngjs');

const viewports = [
  { name: 'Desktop', width: 1440, height: 900 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Mobile', width: 375, height: 812 }
];

const originalUrl = 'http://localhost:5503/gift/';
const nextjsUrl = 'http://localhost:3000/gift';

async function compareSection(page1, page2, selector, viewportName) {
  try {
    const element1 = await page1.$(selector);
    const element2 = await page2.$(selector);

    if (!element1 || !element2) {
      return null;
    }

    const box1 = await element1.boundingBox();
    const box2 = await element2.boundingBox();

    if (!box1 || !box2) {
      return null;
    }

    const heightDiff = Math.abs(box1.height - box2.height);
    const heightDiffPercent = ((heightDiff / box1.height) * 100).toFixed(2);

    // Get element class/id for identification
    const className = await element1.getAttribute('class') || '';
    const id = await element1.getAttribute('id') || '';
    const identifier = id || className.split(' ')[0] || 'unknown';

    // Take screenshots if there's any height difference (>1px)
    if (heightDiff > 1) {
      const screenshot1 = await element1.screenshot();
      const screenshot2 = await element2.screenshot();

      const img1 = PNG.sync.read(screenshot1);
      const img2 = PNG.sync.read(screenshot2);

      // Resize to match dimensions for pixelmatch
      const width = Math.max(img1.width, img2.width);
      const height = Math.max(img1.height, img2.height);

      // Create padded images if sizes don't match
      const padded1 = new PNG({ width, height });
      const padded2 = new PNG({ width, height });

      // Fill with white background
      padded1.data.fill(255);
      padded2.data.fill(255);

      // Copy original images
      PNG.bitblt(img1, padded1, 0, 0, img1.width, img1.height, 0, 0);
      PNG.bitblt(img2, padded2, 0, 0, img2.width, img2.height, 0, 0);

      const diff = new PNG({ width, height });

      const numDiffPixels = pixelmatch(
        padded1.data,
        padded2.data,
        diff.data,
        width,
        height,
        { threshold: 0.1 }
      );

      const totalPixels = width * height;
      const matchPercent = ((1 - numDiffPixels / totalPixels) * 100).toFixed(2);

      return {
        selector,
        identifier,
        viewport: viewportName,
        heightDiff: heightDiff.toFixed(2),
        heightDiffPercent,
        originalHeight: box1.height.toFixed(2),
        nextjsHeight: box2.height.toFixed(2),
        matchPercent,
        diffPixels: numDiffPixels
      };
    }

    return null;
  } catch (error) {
    console.error(`Error comparing ${selector} at ${viewportName}:`, error.message);
    return null;
  }
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  for (const viewport of viewports) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`${viewport.name} (${viewport.width}x${viewport.height})`);
    console.log(`${'='.repeat(60)}\n`);

    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height }
    });

    const page1 = await context.newPage();
    const page2 = await context.newPage();

    // Load both pages
    await Promise.all([
      page1.goto(originalUrl, { waitUntil: 'networkidle' }),
      page2.goto(nextjsUrl, { waitUntil: 'networkidle' })
    ]);

    // Wait for animations
    await Promise.all([
      page1.waitForTimeout(3000),
      page2.waitForTimeout(3000)
    ]);

    // Get all sections
    const selectors = await page1.$$eval(
      'section, [class*="section_"], .footer',
      elements => elements.map((el, idx) => {
        const id = el.id;
        const className = el.className;
        if (id) return `#${id}`;
        if (className) {
          const firstClass = className.split(' ')[0];
          if (firstClass) return `.${firstClass}`;
        }
        return `section:nth-of-type(${idx + 1})`;
      })
    );

    console.log(`Found ${selectors.length} sections to compare\n`);

    const results = [];

    for (const selector of selectors) {
      const result = await compareSection(page1, page2, selector, viewport.name);
      if (result) {
        results.push(result);
      }
    }

    // Sort by match percentage (lowest first)
    results.sort((a, b) => parseFloat(a.matchPercent) - parseFloat(b.matchPercent));

    if (results.length === 0) {
      console.log('All sections match within tolerance (height diff < 5px)\n');
    } else {
      console.log(`Sections with differences (${results.length}):\n`);

      for (const result of results) {
        console.log(`Section: ${result.identifier}`);
        console.log(`  Selector: ${result.selector}`);
        console.log(`  Match: ${result.matchPercent}%`);
        console.log(`  Height Diff: ${result.heightDiff}px (${result.heightDiffPercent}%)`);
        console.log(`    Original: ${result.originalHeight}px`);
        console.log(`    Next.js:  ${result.nextjsHeight}px`);
        console.log(`  Diff Pixels: ${result.diffPixels.toLocaleString()}`);
        console.log('');
      }
    }

    await context.close();
  }

  await browser.close();
  console.log('Comparison complete!');
}

run().catch(console.error);
