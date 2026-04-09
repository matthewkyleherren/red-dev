'use client';

import Link from 'next/link';
import useDynamicPricing from '@/hooks/useDynamicPricing';

const CheckIcon = () => (
  <div className="icon_check w-embed">
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 17 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.833313 5.35557L6.03098 10.8334L15.8333 0.833374"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const ChevronRight = () => (
  <div className="icon-embed-regular w-embed">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const benefits = [
  '100+ biomarkers',
  'Personalized protocol',
  'On-demand care team in their pocket',
  'Up to 20% off supplements',
  'Results in 5\u201310 business days',
];

export default function GiftFinalCTA() {
  const { annualPriceFormatted } = useDynamicPricing();

  return (
    <section className="section_home-cta align-left-smaller-holiday-gift-57 is-gift">
      <div className="page-padding padding-section-large align-left-smaller-holiday-gift-58">
        <div className="container-large z-index-2 align-left-smaller-holiday-gift-59">
          <div className="home-cta_component align-left-smaller-holiday-gift-60 is-gift">
            <div className="home-cta_text-wrapper align-left-smaller-holiday-gift-61">
              <div className="text-highlight_wrapper align-left-smaller-holiday-gift-63">
                <h1 className="scroll-highlight align-left-smaller-holiday-gift-64 is-gift">
                  The most meaningful gift you&apos;ll give
                </h1>
              </div>
            </div>
            <div className="image-wrap_outer is-scale-down is-gift align-left-smaller-holiday-gift-70 is-holiday-gift">
              <div className="text-size-large">
                Health is the foundation of the memories we make together.
                Give your loved ones the insights and support to protect it.
              </div>
              <div className="checklist_list is-gap-medium">
                {benefits.map((benefit, i) => (
                  <div key={i} className="checklist_item">
                    <CheckIcon />
                    <div className="checklist_text-wrapper">
                      <div className="text-size-large">{benefit}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/checkout/gift"
                className="button is-icon w-variant-094685dc-02e8-34f8-a0c0-8167f0653428 w-inline-block"
              >
                <div>Gift Superpower for {annualPriceFormatted}</div>
                <ChevronRight />
              </Link>
              <div className="button-group">
                <div className="home-cta_disclaimer_wrapper align-left-smaller-holiday-gift-68 is-gift" />
              </div>
            </div>
          </div>
        </div>
        <img
          sizes="100vw"
          srcSet="/images/site/6918914197df824a8229294f_section%20-%20pdp%20(1)-p-500.avif 500w, /images/site/6918914197df824a8229294f_section%20-%20pdp%20(1)-p-800.avif 800w, /images/site/6918914197df824a8229294f_section%20-%20pdp%20(1).avif 1512w"
          alt=""
          loading="lazy"
          src="/images/site/6918914197df824a8229294f_section%20-%20pdp%20(1).avif"
          className="image_cover-absolute align-left-smaller-holiday-gift-82"
          style={{ visibility: 'visible' }}
        />
        <div className="home-cta_bg-overlay" />
        <div className="cta_shape-overlay is-top align-left-smaller-holiday-gift-83" />
        <div className="cta_shape-overlay is-bottom align-left-smaller-holiday-gift-84" />
      </div>
    </section>
  );
}
