import type { Metadata } from 'next';
import Script from 'next/script';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import ExitIntentModal from '@/components/shared/ExitIntentModal';
import GiftHero from '@/components/gift/GiftHero';
import GiftScrollAnimation from '@/components/gift/GiftScrollAnimation';
import GiftWhatsIncluded from '@/components/gift/GiftWhatsIncluded';
import GiftTestimonials from '@/components/gift/GiftTestimonials';
import GiftFinalCTA from '@/components/gift/GiftFinalCTA';
import WebflowPageId from '@/components/shared/WebflowPageId';

export const metadata: Metadata = {
  title: 'Give the Gift of Health | Superpower',
  description:
    "This year, skip the sweaters and scented candles. Give your loved ones the greatest gift of all: better health, and more time with you.",
  openGraph: {
    title: 'Give the Gift of Health | Superpower',
    description:
      "This year, skip the sweaters and scented candles. Give your loved ones the greatest gift of all: better health, and more time with you.",
    images: [
      'https://cdn.prod.website-files.com/63792ff4f3d6aa3d62071b61/6882d2a1e98ea2242638f03e_OG%20Image%401x.jpg',
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Give the Gift of Health | Superpower',
    description:
      "This year, skip the sweaters and scented candles. Give your loved ones the greatest gift of all: better health, and more time with you.",
  },
};

export default function GiftPage() {
  return (
    <div className="page-wrapper">
      {/* Swiper CSS for carousels */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"
      />
      {/* Plyr CSS for video player */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/plyr@3/dist/plyr.css"
      />

      <WebflowPageId pageId="6917c4b6bdbc147ae9d4f585" />
      <Navbar currentPage="gift" />

      <GiftPageStyles />

      <div className="main-wrapper">
        <GiftHero />
        <GiftScrollAnimation />
        <GiftWhatsIncluded />
        <GiftTestimonials />
        <GiftFinalCTA />
      </div>

      <Footer />
      <ExitIntentModal />

      {/* Swiper CSS + JS (required for carousels) */}
      <Script
        src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"
        strategy="beforeInteractive"
      />

      {/* GSAP + ScrollTrigger for scroll animations */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
        strategy="afterInteractive"
      />

      {/* Plyr video player for testimonials */}
      <Script
        src="https://cdn.jsdelivr.net/npm/hls.js@1/dist/hls.min.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/plyr@3/dist/plyr.min.js"
        strategy="lazyOnload"
      />
    </div>
  );
}

/** Page-specific inline styles matching the Webflow output */
function GiftPageStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
/* Holiday gift text/image blur-to-sharp based on opacity */
/* Note: opacity for [data-opacity-group] is managed by inline styles + GSAP */

.holiday-gift_perspective-child {
  filter: blur(8px);
  transition: filter 0.15s ease-out;
  will-change: filter;
}

.holiday-gift_perspective-child[style*="opacity: 0.1"],
.holiday-gift_text_button[style*="opacity: 0.1"] {
  filter: blur(7px);
}
.holiday-gift_perspective-child[style*="opacity: 0.2"],
.holiday-gift_text_button[style*="opacity: 0.2"] {
  filter: blur(6px);
}
.holiday-gift_perspective-child[style*="opacity: 0.3"],
.holiday-gift_text_button[style*="opacity: 0.3"] {
  filter: blur(5.5px);
}
.holiday-gift_perspective-child[style*="opacity: 0.4"],
.holiday-gift_text_button[style*="opacity: 0.4"] {
  filter: blur(5px);
}
.holiday-gift_perspective-child[style*="opacity: 0.5"],
.holiday-gift_text_button[style*="opacity: 0.5"] {
  filter: blur(4px);
}
.holiday-gift_perspective-child[style*="opacity: 0.6"],
.holiday-gift_text_button[style*="opacity: 0.6"] {
  filter: blur(3px);
}
.holiday-gift_perspective-child[style*="opacity: 0.7"],
.holiday-gift_text_button[style*="opacity: 0.7"] {
  filter: blur(2px);
}
.holiday-gift_perspective-child[style*="opacity: 0.8"],
.holiday-gift_perspective-child[style*="opacity: 0.9"],
.holiday-gift_perspective-child[style*="opacity: 1"],
.holiday-gift_text_button[style*="opacity: 0.8"],
.holiday-gift_text_button[style*="opacity: 0.9"],
.holiday-gift_text_button[style*="opacity: 1"] {
  filter: blur(0px);
}

/* Swiper custom gap for testimonial section */
:where([data-swiper-ss-gap="testimonial"]) {
  --swiper-ss-gap: 1rem;
}
@media (min-width: 479px) {
  :where([data-swiper-ss-gap="testimonial"]) {
    --swiper-ss-gap: 1rem;
  }
}
@media (min-width: 992px) {
  :where([data-swiper-ss-gap="testimonial"]) {
    --swiper-ss-gap: 1rem;
  }
}
`,
      }}
    />
  );
}
