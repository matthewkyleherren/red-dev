const { chromium } = require('@playwright/test');
const pixelmatch = require('pixelmatch').default || require('pixelmatch');
const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'sections');

// Sections to compare, defined by their CSS selectors and readable names
// Using class-based selectors from the original site
const SECTIONS = [
  { name: 'navbar', selector: 'nav.navbar', label: 'Navbar' },
  { name: 'hero', selector: 'section.section_home-hero', label: 'Hero' },
  { name: 'quick-features', selector: 'section.section_quick-features', label: 'Quick Features' },
  { name: 'labs', selector: 'section.section_100-labs2', label: '100+ Labs' },
  { name: 'trustpilot', selector: 'section.trustpilot_section', label: 'Trustpilot' },
  { name: 'days10', selector: 'section.days10_section', label: '10 Days Process' },
  { name: 'testimonials', selector: 'section.section_testimonials-slider', label: 'Testimonials' },
  { name: 'whats-included', selector: 'section.whats-included_section', label: "What's Included" },
  { name: 'clinicians', selector: 'section.section_home-clinicians', label: 'Clinicians' },
  { name: 'membership', selector: 'section.section_home-membership', label: 'Membership' },
  { name: 'biomarkers', selector: 'section.section_biomarkers-test', label: 'Biomarkers Test' },
  { name: 'cta', selector: 'section.section_home-cta', label: 'CTA' },
  { name: 'footer', selector: 'div.section_footer', label: 'Footer' },
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
];

async function captureSection(page, section, viewport, site) {
  const el = await page.$(section.selector);
  if (!el) {
    console.log(`  [SKIP] ${section.label} not found on ${site}`);
    return null;
  }

  // Scroll element into view first
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500); // let any scroll-triggered animations settle

  const filename = `${section.name}-${site}-${viewport.name}.png`;
  const filepath = path.join(OUTPUT_DIR, filename);

  await el.screenshot({ path: filepath, animations: 'disabled' });
  return filepath;
}

function comparePNGs(pathA, pathB, diffPath) {
  const imgA = PNG.sync.read(fs.readFileSync(pathA));
  const imgB = PNG.sync.read(fs.readFileSync(pathB));

  // If dimensions differ, we need to handle it
  const width = Math.max(imgA.width, imgB.width);
  const height = Math.max(imgA.height, imgB.height);

  // Pad images to same size if needed
  const padded = (img, w, h) => {
    if (img.width === w && img.height === h) return img;
    const padImg = new PNG({ width: w, height: h });
    // Fill with white
    for (let i = 0; i < padImg.data.length; i += 4) {
      padImg.data[i] = 255;
      padImg.data[i + 1] = 255;
      padImg.data[i + 2] = 255;
      padImg.data[i + 3] = 255;
    }
    PNG.bitblt(img, padImg, 0, 0, img.width, img.height, 0, 0);
    return padImg;
  };

  const a = padded(imgA, width, height);
  const b = padded(imgB, width, height);

  const diff = new PNG({ width, height });
  const mismatchCount = pixelmatch(a.data, b.data, diff.data, width, height, {
    threshold: 0.1,
    alpha: 0.3,
  });

  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const totalPixels = width * height;
  const matchPct = ((1 - mismatchCount / totalPixels) * 100).toFixed(2);

  return {
    width,
    height,
    widthA: imgA.width,
    heightA: imgA.height,
    widthB: imgB.width,
    heightB: imgB.height,
    totalPixels,
    mismatchCount,
    matchPct: parseFloat(matchPct),
    diffPath,
  };
}

async function run() {
  const browser = await chromium.launch();
  const results = {};

  for (const viewport of VIEWPORTS) {
    console.log(`\n=== ${viewport.name.toUpperCase()} (${viewport.width}x${viewport.height}) ===`);
    results[viewport.name] = {};

    // Create pages for both sites
    const origPage = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
    const nextPage = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });

    // Load both pages
    console.log('Loading original...');
    await origPage.goto('http://localhost:5503/', { waitUntil: 'load', timeout: 20000 });
    await origPage.waitForTimeout(4000); // settle fonts, animations, images

    console.log('Loading Next.js...');
    await nextPage.goto('http://localhost:3000/', { waitUntil: 'load', timeout: 20000 });
    await nextPage.waitForTimeout(4000);

    // Disable animations on both
    await origPage.addStyleTag({ content: '*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; transition-delay: 0s !important; }' });
    await nextPage.addStyleTag({ content: '*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; transition-delay: 0s !important; }' });
    await origPage.waitForTimeout(500);
    await nextPage.waitForTimeout(500);

    for (const section of SECTIONS) {
      console.log(`\nCapturing: ${section.label}`);

      const origPath = await captureSection(origPage, section, viewport, 'orig');
      const nextPath = await captureSection(nextPage, section, viewport, 'next');

      if (!origPath || !nextPath) {
        results[viewport.name][section.name] = { label: section.label, status: 'skipped' };
        continue;
      }

      const diffPath = path.join(OUTPUT_DIR, `${section.name}-diff-${viewport.name}.png`);
      const comparison = comparePNGs(origPath, nextPath, diffPath);

      results[viewport.name][section.name] = {
        label: section.label,
        ...comparison,
      };

      const flag = comparison.matchPct < 95 ? ' *** NEEDS ATTENTION ***' : '';
      console.log(`  Match: ${comparison.matchPct}% (${comparison.mismatchCount} mismatched pixels)${flag}`);
      if (comparison.widthA !== comparison.widthB || comparison.heightA !== comparison.heightB) {
        console.log(`  Size diff: orig=${comparison.widthA}x${comparison.heightA} vs next=${comparison.widthB}x${comparison.heightB}`);
      }
    }

    await origPage.close();
    await nextPage.close();
  }

  await browser.close();

  // Summary report
  console.log('\n\n==========================================');
  console.log('         SECTION COMPARISON REPORT        ');
  console.log('==========================================\n');

  for (const viewport of VIEWPORTS) {
    console.log(`--- ${viewport.name.toUpperCase()} (${viewport.width}px) ---`);
    console.log(`${'Section'.padEnd(25)} ${'Match %'.padStart(8)}  ${'Mismatched'.padStart(10)}  Size Diff`);
    console.log('-'.repeat(75));

    const data = results[viewport.name];
    let totalMismatch = 0;
    let totalPixels = 0;

    for (const section of SECTIONS) {
      const r = data[section.name];
      if (!r || r.status === 'skipped') {
        console.log(`${section.label.padEnd(25)} ${'SKIPPED'.padStart(8)}`);
        continue;
      }
      const sizeDiff = (r.widthA !== r.widthB || r.heightA !== r.heightB)
        ? `${r.widthA}x${r.heightA} vs ${r.widthB}x${r.heightB}`
        : 'same';
      const flag = r.matchPct < 95 ? ' <<' : '';
      console.log(`${r.label.padEnd(25)} ${(r.matchPct + '%').padStart(8)}  ${String(r.mismatchCount).padStart(10)}  ${sizeDiff}${flag}`);
      totalMismatch += r.mismatchCount;
      totalPixels += r.totalPixels;
    }

    const overallMatch = ((1 - totalMismatch / totalPixels) * 100).toFixed(2);
    console.log('-'.repeat(75));
    console.log(`${'OVERALL'.padEnd(25)} ${(overallMatch + '%').padStart(8)}  ${String(totalMismatch).padStart(10)}`);
    console.log('');
  }

  // Save JSON report
  const reportPath = path.join(OUTPUT_DIR, 'section-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nDetailed report saved to: ${reportPath}`);
  console.log(`Diff images saved to: ${OUTPUT_DIR}/`);
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
