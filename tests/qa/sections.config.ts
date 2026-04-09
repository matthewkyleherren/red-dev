export interface PageConfig {
  name: string;
  nextjsPath: string;
  originalPath: string;
  viewports: { width: number; height: number; name: string }[];
}

export const VIEWPORTS = [
  { width: 1440, height: 900, name: 'desktop' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 375, height: 812, name: 'mobile' },
];

export const PAGES: PageConfig[] = [
  {
    name: 'homepage',
    nextjsPath: '/',
    originalPath: '/index.html',
    viewports: VIEWPORTS,
  },
  {
    name: 'how-it-works',
    nextjsPath: '/how-it-works',
    originalPath: '/how-it-works/index.html',
    viewports: VIEWPORTS,
  },
  {
    name: 'biomarkers',
    nextjsPath: '/biomarkers',
    originalPath: '/biomarkers/index.html',
    viewports: VIEWPORTS,
  },
  {
    name: 'biomarker-detail',
    nextjsPath: '/biomarkers/albumin-test',
    originalPath: '/biomarkers/albumin-test/index.html',
    viewports: VIEWPORTS,
  },
  {
    name: 'reviews',
    nextjsPath: '/reviews',
    originalPath: '/reviews/index.html',
    viewports: VIEWPORTS,
  },
  {
    name: 'gift',
    nextjsPath: '/gift',
    originalPath: '/gift/index.html',
    viewports: VIEWPORTS,
  },
  {
    name: 'checkout',
    nextjsPath: '/checkout',
    originalPath: '/checkout/index.html',
    viewports: [VIEWPORTS[0]], // Desktop only for checkout SPA
  },
  {
    name: 'checkout-gift',
    nextjsPath: '/checkout/gift',
    originalPath: '/checkout/gift/index.html',
    viewports: [VIEWPORTS[0]],
  },
  {
    name: 'checkout-tiers',
    nextjsPath: '/checkout/tiers',
    originalPath: '/checkout/tiers/index_tier=baseline.html',
    viewports: [VIEWPORTS[0]],
  },
];

export const ORIGINAL_BASE = 'http://localhost:5503';
export const NEXTJS_BASE = 'http://localhost:3000';
