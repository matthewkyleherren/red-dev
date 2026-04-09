import type { Metadata } from 'next';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import ExitIntentModal from '@/components/shared/ExitIntentModal';
import MembershipPricing from '@/components/shared/MembershipPricing';
import MembershipCurrentSection from '@/components/homepage/MembershipCurrentSection';
import PricingAccordionFaqs from '@/components/reviews/PricingAccordionFaqs';
import PhotoGridHero from '@/components/reviews/PhotoGridHero';
import CenteredTestimonialSlider from '@/components/reviews/CenteredTestimonialSlider';
import StickyTestimonials from '@/components/reviews/StickyTestimonials';
import HealthDeservesMore from '@/components/reviews/HealthDeservesMore';
import TestimonialQuoteSlider from '@/components/reviews/TestimonialQuoteSlider';
import StoriesSlider from '@/components/reviews/StoriesSlider';
import MemberTestimonials from '@/components/reviews/MemberTestimonials';
import FaqSection from '@/components/how-it-works/FaqSection';
import WebflowPageId from '@/components/shared/WebflowPageId';

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */
export const metadata: Metadata = {
  title: 'Member Stories',
  description:
    'How members are becoming the best version of themselves with Superpower. Join and unlock 100+ lab tests, a medical team in your pocket, and a health plan that evolves with you.',
  openGraph: {
    title: 'Member Stories',
    description:
      'How members are becoming the best version of themselves with Superpower. Join and unlock 100+ lab tests, a medical team in your pocket, and a health plan that evolves with you.',
    images: [
      {
        url: 'https://cdn.prod.website-files.com/63792ff4f3d6aa3d62071b61/6882d935ad8aa759cfd0de99_Stories%20%40%201x.jpg',
      },
    ],
    type: 'website',
  },
  twitter: {
    title: 'Member Stories',
    description:
      'How members are becoming the best version of themselves with Superpower. Join and unlock 100+ lab tests, a medical team in your pocket, and a health plan that evolves with you.',
    card: 'summary_large_image',
  },
};

/* ------------------------------------------------------------------ */
/*  JSON-LD structured data                                            */
/* ------------------------------------------------------------------ */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalOrganization',
      '@id': 'https://www.superpower.com#organization',
      name: 'Superpower Health, Inc.',
      alternateName: ['Superpower', 'Superpower Health'],
      legalName: 'Superpower Health, Inc.',
      url: 'https://www.superpower.com',
      logo: 'https://cdn.prod.website-files.com/63792ff4f3d6aa3d62071b61/67aa49b6833ceef9f4b77dc1_sp-lgo.svg',
      image:
        'https://cdn.prod.website-files.com/63792ff4f3d6aa3d62071b61/6882d2a2b8d80e8abdda449a_OG%20Image.jpg',
      description:
        'A new era of personal health. The world\'s most advanced digital clinic to help you live longer, prevent disease, and feel your best.',
      slogan: 'Join the new standard in Healthcare.',
      foundingDate: '2021-01-01',
      founders: [
        { '@type': 'Person', name: 'Kevin Unkrich' },
        { '@type': 'Person', name: 'Max Marchione' },
        { '@type': 'Person', name: 'Jacob Peters' },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '11209 National Boulevard Unit Number 1016',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        postalCode: '90064',
        addressCountry: 'US',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'superpower@superpower.com',
        contactType: 'customer service',
      },
      sameAs: [
        'https://x.com/superpower',
        'https://www.instagram.com/superpower',
        'https://www.linkedin.com/company/superpower',
      ],
      department: {
        '@type': 'Organization',
        name: 'Superpower Health Digital Clinic',
      },
      medicalSpecialty: ['Preventive', 'Diagnostic', 'Wellness'],
    },
    {
      '@type': 'Product',
      '@id': 'https://www.superpower.com#product',
      name: 'Superpower Health Testing & Concierge Care',
      description:
        'At-home and in-clinic biomarker testing combined with 24/7 clinical support, personalized health protocols, and access to longevity-focused care.',
      brand: {
        '@type': 'Organization',
        name: 'Superpower Health, Inc.',
        '@id': 'https://www.superpower.com#organization',
      },
      image:
        'https://cdn.prod.website-files.com/63792ff4f3d6aa3d62071b61/6882d2a2b8d80e8abdda449a_OG%20Image.jpg',
      url: 'https://www.superpower.com',
      sku: 'SP-CARE-001',
      category: 'Health and Wellness',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '38',
        bestRating: '5',
        worstRating: '1',
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Nathan Singer' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody:
            'This was the wake up call I needed. The reports helped motivate me to get healthier.',
          datePublished: '2025-06-09',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Alice' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody:
            'Great insights and longevity protocol! Clear recommendations, simple to follow, and super helpful team.',
          datePublished: '2025-07-19',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Alyssa' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody:
            "I've never had a doctor explain my bloodwork in such detail. Superpower made it simple and actionable.",
          datePublished: '2025-07-15',
        },
      ],
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: '199',
        url: 'https://www.superpower.com',
        availability: 'https://schema.org/InStock',
      },
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Page-level inline styles (from Webflow)                            */
/* ------------------------------------------------------------------ */
const pageStyles = `
  /*
   * IX2 overrides — match the Webflow IX2 inline states at scroll=0 on
   * the original page.  IX2 in the Next.js context fires the same CSS-
   * selector-targeted scroll animations, but sometimes settles on
   * different initial values.  We force the correct initial states here.
   */

  /* Hero section text/UI — IX2 sets inline opacity:0 and translateY(5rem)
     on hero_top and button-group.  In the original at scroll=0 these are
     opacity:1 and translateY(0). Override both opacity AND transform. */
  .section_testimonial-hero .testimonial-hero_top,
  .section_testimonial-hero .testimonial-hero_component,
  .section_testimonial-hero .button-group,
  .section_testimonial-hero .margin-top {
    opacity: 1 !important;
    transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg) !important;
  }

  /* Sticky testimonial section — IX2 sets opacity:0 at scroll=0 in the
     original.  Match that so the invisible section doesn't paint over
     the hero during full-page screenshot capture. */
  .section_testimonial-sticky-2 {
    opacity: 0 !important;
  }

  /* The sticky bar indicator line starts at scaleX(0) in the original
     (IX2 grows it on scroll).  Match that initial state. */
  .section_testimonial-sticky-bar {
    transform: scaleX(0) !important;
  }

  /* Ensure sections after the sticky hero stack above it.
     The original uses class="z-index-2" on the pricing section wrapper;
     we replicate this for sections that don't already have z-index. */
  .section_testimonial-members {
    z-index: 2;
    position: relative;
  }
  /* Override the Intellimize variant CSS rules so the reviews page
     shows the control (old card pricing) — matching the original
     Webflow page which defaults to the control group. */
  .section_membership-current {
    display: block !important;
  }
  .section-membership-new {
    display: none !important;
    z-index: 2;
    position: relative;
    background-color: var(--_base-color-zinc--white);
  }

  /* Pricing accordion FAQs are now inside membership-right via children prop */
  .section_faqs-shorthand {
    z-index: 2;
    position: relative;
    background-color: var(--_base-color-zinc--white);
  }

  /* These sections are display:none at desktop in the shared Webflow CSS.
     On tablet and below they become visible (matching original behaviour). */
  @media screen and (max-width: 991px) {
    .section_slider-testimonials.is-testimonials-lp {
      display: block !important;
      background-color: var(--_base-color-zinc--black);
      color: #fff;
      margin-top: -3rem;
    }
    /* NOTE: .section-testimonial-story is display:none at ALL viewports
       in the shared Webflow CSS.  Do NOT force it to display:block here.
       The original page keeps it hidden at tablet/mobile. */

    /* IX2 sets height:83rem on the members section at tablet and below
       to constrain the visible card area (combined with overflow:hidden
       from the shared CSS).  Without this, the full card grid renders
       and adds ~600-800 px of extra page height. */
    .section_testimonial-members {
      height: 83rem;
    }

    /* The sticky progress bar is display:none at tablet in the shared CSS;
       reinforce that here so nothing overrides it. */
    .section_testimonial-sticky-bar {
      display: none !important;
    }

    /* The "Your health deserves more" section needs z-index to stack
       above the sticky section (which is display:none at tablet but
       might still affect stacking). */
    .section_testimonial-more {
      z-index: 3;
      margin-top: -1px;
    }

    /* In the original, the Webflow slider JS sets inline widths on the
       w-slider element, making the grid's 1.75fr middle column resolve
       much wider (~85% of width).  Without the runtime JS the CSS
       1fr/1.75fr/1fr ratio resolves to only ~46% for the middle column.
       Override the grid to match the original proportions. */
    .section_testimonial-slider .testimonial_slider-component {
      grid-template-columns: 42px 1fr 42px !important;
    }

    /* The original's .w-slider-nav is positioned absolutely at the
       bottom of the slider.  Our nav is in normal flow; match the
       original's behaviour so the slider mask drives the height. */
    .section_testimonial-slider .testimonial-slider_nav {
      position: absolute;
      inset: auto 0 0;
      z-index: 2;
      height: 40px;
      padding-top: 10px;
      text-align: center;
    }
    .section_testimonial-slider .testimonial_slider {
      position: relative;
    }
    /* At tablet the original mask exactly equals slide-content height,
       so no extra padding needed here. */
  }

  @media screen and (max-width: 479px) {

    /* ---------------------------------------------------------- */
    /*  Mobile-specific overrides (<=479px)                       */
    /* ---------------------------------------------------------- */

    /* Hero: at mobile the overlays are display:none in the shared
       CSS (tablet rule).  The photo-grid bar fades to 0.3 opacity.
       Ensure the hero has the correct min-height and padding. */
    .section_testimonial-hero {
      min-height: 40rem;
      padding-top: 6rem;
    }

    /* The testimonial-hero_top at mobile switches to a column
       layout with overflow:clip and full-white text colour.
       Match the shared CSS mobile rules exactly. */
    .section_testimonial-hero .testimonial-hero_top {
      z-index: 5;
      color: #fff;
      flex-flow: column;
      overflow: clip;
    }

    /* Hero photo bar fades on mobile */
    .testimonial-hero_bar {
      opacity: 0.3;
    }

    /* At mobile the quote slider nav dots sit above the slide
       (top:-2.3rem) rather than at the bottom.  Override the
       tablet rule that positions them at the bottom.
       Use position:absolute so the nav doesn't add extra height
       below the slide content (matching original Webflow). */
    .section_testimonial-slider .testimonial-slider_nav {
      position: absolute;
      inset: auto 0 auto 0;
      top: -2.3rem;
      height: 2.5rem;
      padding-top: 0.625rem;
      text-align: center;
    }

    /* The slider side panels (decorative lines) are hidden at
       mobile in the shared CSS.  Enforce that. */
    .section_testimonial-slider .testimonial-slider_side {
      display: none;
    }

    /* At mobile the slider component becomes a flex column */
    .section_testimonial-slider .testimonial_slider-component {
      flex-flow: column;
      display: flex;
      grid-template-columns: unset !important;
    }

    /* Full-width slider at mobile */
    .section_testimonial-slider .testimonial_slider {
      width: 100%;
    }

    /* Slide content at mobile has smaller font and no max-width */
    .section_testimonial-slider .testimonial_slide-content {
      max-width: none;
      padding-left: 2.2rem;
      padding-right: 2.2rem;
      font-size: 1.5rem;
    }

    /* The "Your health deserves more" section needs less top
       padding at mobile */
    .section_testimonial-more {
      padding-top: 3rem;
    }

    /* Centered testimonial slider slides should be wider at mobile */
    .centered-slider-slide {
      width: 85vw;
    }

    /* Members cards — profile wrapper stacks vertically at mobile */
    .testimonial-members_profile-wrapper {
      grid-column-gap: 0.5rem;
      grid-row-gap: 0.5rem;
      flex-flow: column;
      justify-content: flex-start;
      align-items: flex-start;
    }

    /* Members cards — action row wraps at mobile */
    .testimonial-members_item-row {
      grid-column-gap: 0.25rem;
      grid-row-gap: 0.25rem;
      flex-flow: wrap;
    }

    /* Slide image size at mobile */
    .testimonial_slide-image {
      width: 2rem;
      height: 2rem;
    }

    /* The image-stretch background at mobile is shorter */
    .testimonials_image-stretch {
      height: 15rem;
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */
export default function ReviewsPage() {
  return (
    <div className="page">
      <WebflowPageId pageId="6813f540acc9d7fefd8155a9" />
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page-specific styles */}
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      <Navbar currentPage="reviews" />

      <div className="main-wrapper">
        <div className="section_testimonial-sticky-bar" />

        {/* 1. Hero with photo grid */}
        <PhotoGridHero />

        {/* 2. Centered testimonial slider */}
        <CenteredTestimonialSlider />

        {/* 3. Sticky testimonials (second section) */}
        <StickyTestimonials />

        {/* 4. "Your health deserves more" transition */}
        <HealthDeservesMore />

        {/* 5. Testimonial quote slider */}
        <TestimonialQuoteSlider />

        {/* 6. Stories slider (video testimonials) */}
        <StoriesSlider />

        {/* 7. Member social proof cards */}
        <MemberTestimonials />

        {/* 8. Membership pricing + 9. FAQ (both inside section_pricing-card, matching original) */}
        <section className="section_pricing-card background-color-white z-index-2">
          <section id="pricing-1" data-wf--pricing-card-brand-499--variant="base" className="section_home-membership">
            <MembershipCurrentSection>
              <PricingAccordionFaqs />
            </MembershipCurrentSection>
            <MembershipPricing />
          </section>
          <FaqSection />
        </section>
      </div>

      <Footer />
      <ExitIntentModal />
    </div>
  );
}
