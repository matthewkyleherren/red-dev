import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

const PAGES = [
  { name: 'homepage', path: '/' },
  { name: 'how-it-works', path: '/how-it-works' },
  { name: 'biomarkers', path: '/biomarkers' },
  { name: 'biomarker-albumin', path: '/biomarkers/albumin-test' },
  { name: 'biomarker-testosterone', path: '/biomarkers/testosterone-total-test' },
  { name: 'biomarker-vitamin-d', path: '/biomarkers/vitamin-d-25-hydroxy-test' },
  { name: 'reviews', path: '/reviews' },
  { name: 'gift', path: '/gift' },
  { name: 'checkout', path: '/checkout' },
  { name: 'checkout-gift', path: '/checkout/gift' },
  { name: 'checkout-tiers', path: '/checkout/tiers' },
];

for (const pageInfo of PAGES) {
  test(`${pageInfo.name}: no broken images`, async ({ page }) => {
    const failedImages: string[] = [];

    // Track failed image network requests
    page.on('response', (response) => {
      const url = response.url();
      const status = response.status();
      if (status >= 400 && url.match(/\.(png|jpg|jpeg|gif|webp|avif|svg|ico)(\?.*)?$/i)) {
        failedImages.push(`[${status}] ${url}`);
      }
    });

    page.on('requestfailed', (request) => {
      const url = request.url();
      if (url.match(/\.(png|jpg|jpeg|gif|webp|avif|svg|ico)(\?.*)?$/i)) {
        failedImages.push(`[FAILED] ${url}`);
      }
    });

    await page.goto(`${BASE_URL}${pageInfo.path}`, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    // Wait for initial images
    await page.waitForTimeout(1000);

    // Scroll through the page to trigger lazy-loaded images
    await page.evaluate(async () => {
      const scrollStep = 800;
      const delay = 150;
      const maxScroll = document.body.scrollHeight;
      for (let pos = 0; pos < maxScroll; pos += scrollStep) {
        window.scrollTo(0, pos);
        await new Promise((r) => setTimeout(r, delay));
      }
    });

    // Wait for lazy-loaded images to finish
    await page.waitForTimeout(2000);

    // Check all img elements on the page for broken naturalWidth
    const brokenDomImages = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      const broken: string[] = [];
      imgs.forEach((img) => {
        const src = img.src || img.getAttribute('src') || '';
        if (src && !src.startsWith('data:') && !src.includes('placeholder')) {
          if (img.complete && img.naturalWidth === 0 && img.naturalHeight === 0) {
            broken.push(src);
          }
        }
      });
      return broken;
    });

    for (const src of brokenDomImages) {
      if (!failedImages.some((f) => f.includes(src))) {
        failedImages.push(`[DOM-broken] ${src}`);
      }
    }

    if (failedImages.length > 0) {
      console.log(`\n=== BROKEN IMAGES on ${pageInfo.name} (${pageInfo.path}) ===`);
      for (const img of failedImages) {
        console.log(`  ${img}`);
      }
    } else {
      console.log(`\n✓ ${pageInfo.name}: All images OK`);
    }

    expect(
      failedImages,
      `Broken images on ${pageInfo.name}:\n${failedImages.join('\n')}`
    ).toHaveLength(0);
  });
}
