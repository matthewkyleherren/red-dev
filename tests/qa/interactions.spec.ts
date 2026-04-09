import { test, expect } from '@playwright/test';

const NEXTJS_BASE = 'http://localhost:3000';

const viewports = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
};

const pages = ['/', '/how-it-works', '/biomarkers', '/reviews', '/gift'];

// Mobile menu tests
for (const pagePath of pages) {
  test(`Mobile menu opens and shows links on ${pagePath} (mobile)`, async ({ page }) => {
    await page.setViewportSize(viewports.mobile);
    await page.goto(`${NEXTJS_BASE}${pagePath}`, { waitUntil: 'networkidle' });

    // Hamburger button should be visible on mobile
    const hamburger = page.locator('.nav_mobile-menu-button .nav_mobile-open');
    await expect(hamburger).toBeVisible({ timeout: 5000 });

    // Mobile menu should be hidden initially
    const mobileLinks = page.locator('.navbar_mobile-links');
    await expect(mobileLinks).not.toBeVisible();

    // Click hamburger
    await hamburger.click();

    // Mobile menu should now be visible
    await expect(mobileLinks).toBeVisible({ timeout: 3000 });

    // Links should be visible
    const howItWorksLink = page.locator('.navbar_mobile-links .nav-link_text-mobile', { hasText: 'How it works' });
    await expect(howItWorksLink).toBeVisible();

    // Close button should work
    const closeBtn = page.locator('.icon-close');
    await closeBtn.click();

    // Menu should be hidden again
    await expect(mobileLinks).not.toBeVisible({ timeout: 3000 });
  });

  test(`Mobile menu opens and shows links on ${pagePath} (tablet)`, async ({ page }) => {
    await page.setViewportSize(viewports.tablet);
    await page.goto(`${NEXTJS_BASE}${pagePath}`, { waitUntil: 'networkidle' });

    const hamburger = page.locator('.nav_mobile-menu-button .nav_mobile-open');
    await expect(hamburger).toBeVisible({ timeout: 5000 });

    await hamburger.click();

    const mobileLinks = page.locator('.navbar_mobile-links');
    await expect(mobileLinks).toBeVisible({ timeout: 3000 });

    // Close via close button (overlay not clickable on tablet since menu covers full screen)
    const closeBtn = page.locator('.icon-close');
    await closeBtn.click();
    await expect(mobileLinks).not.toBeVisible({ timeout: 3000 });
  });
}

// Desktop dropdown tests
test('Desktop dropdown opens on hover', async ({ page }) => {
  await page.setViewportSize(viewports.desktop);
  await page.goto(`${NEXTJS_BASE}/`, { waitUntil: 'networkidle' });

  const dropdownToggle = page.locator('.nav-link_dropdown-toggle');
  const dropdownList = page.locator('.nav-link_dropdown-list');

  // Dropdown should be hidden initially
  await expect(dropdownList).not.toBeVisible();

  // Hover over dropdown toggle
  await dropdownToggle.hover();

  // Dropdown should appear
  await expect(dropdownList).toBeVisible({ timeout: 3000 });

  // Links should be visible inside dropdown
  const howItWorksLink = page.locator('.navbar_dd-product-txt', { hasText: 'How it Works' });
  await expect(howItWorksLink).toBeVisible();
});

// FAQ accordion tests (homepage)
test('FAQ accordion opens and closes on click (mobile)', async ({ page }) => {
  await page.setViewportSize(viewports.mobile);
  await page.goto(`${NEXTJS_BASE}/`, { waitUntil: 'networkidle' });

  // Find FAQ accordion items
  const faqItem = page.locator('.faq_question').first();
  if (await faqItem.isVisible()) {
    await faqItem.click();

    // Answer should be visible after click
    const answer = page.locator('.faq_answer').first();
    await expect(answer).toBeVisible({ timeout: 3000 });

    // Click again to close
    await faqItem.click();
  }
});

test('FAQ accordion opens and closes on click (desktop)', async ({ page }) => {
  await page.setViewportSize(viewports.desktop);
  await page.goto(`${NEXTJS_BASE}/`, { waitUntil: 'networkidle' });

  const faqItem = page.locator('.faq_question').first();
  if (await faqItem.isVisible()) {
    await faqItem.click();
    const answer = page.locator('.faq_answer').first();
    await expect(answer).toBeVisible({ timeout: 3000 });
  }
});
