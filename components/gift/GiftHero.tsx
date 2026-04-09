'use client';

import Link from 'next/link';
import useDynamicPricing from '@/hooks/useDynamicPricing';

export default function GiftHero() {
  const { annualPriceFormatted } = useDynamicPricing();

  return (
    <section className="section_holiday-hero">
      <div className="holiday-hero_card-wrap">
        <div className="holiday-hero_card is-right">
          <img
            src="/images/site/691904d9a88cf51982ad8a69_mask%20(2).avif"
            loading="lazy"
            sizes="(max-width: 1320px) 100vw, 1320px"
            srcSet="/images/site/691904d9a88cf51982ad8a69_mask%20(2)-p-500.avif 500w, /images/site/691904d9a88cf51982ad8a69_mask%20(2).avif 1320w"
            alt=""
            className="image_cover-absolute"
            style={{ visibility: 'visible' }}
          />
        </div>
        <div className="holiday-hero_card is-left">
          <img
            src="/images/site/691904d9ad7c2be839a5e7d5_mask%20(1).avif"
            loading="lazy"
            sizes="(max-width: 1320px) 100vw, 1320px"
            srcSet="/images/site/691904d9ad7c2be839a5e7d5_mask%20(1)-p-500.avif 500w, /images/site/691904d9ad7c2be839a5e7d5_mask%20(1).avif 1320w"
            alt=""
            className="image_cover-absolute"
            style={{ visibility: 'visible' }}
          />
        </div>
        <div
          className="holiday-hero_card"
          style={{
            transform:
              'translate3d(0, 10rem, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
          }}
        >
          <img
            src="/images/site/691904dab1cec84d8822b3c6_mask.avif"
            loading="lazy"
            sizes="(max-width: 1385px) 100vw, 1385px"
            srcSet="/images/site/691904dab1cec84d8822b3c6_mask-p-500.avif 500w, /images/site/691904dab1cec84d8822b3c6_mask.avif 1385w"
            alt=""
            className="image_cover-absolute"
            style={{ visibility: 'visible' }}
          />
          <div className="holiday-hero_blur w-embed">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 848 422"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_f_81_34071)">
                <ellipse
                  cx="423.75"
                  cy="374.136"
                  rx="285.508"
                  ry="235.894"
                  fill="url(#paint0_linear_81_34071)"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_81_34071"
                  x="-9.15527e-05"
                  y="-9.15527e-05"
                  width="847.5"
                  height="748.27"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="69.1211"
                    result="effect1_foregroundBlur_81_34071"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_81_34071"
                  x1="435.625"
                  y1="242.219"
                  x2="455.463"
                  y2="618.466"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FC5F2B" />
                  <stop offset="1" stopColor="#FC5F2B" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="page-padding padding-section-large z-index-2">
        <div className="container-large">
          <div className="holiday-hero_component">
            <h1 className="heading-xlarge">Give the Gift of Health</h1>
            <p className="text-size-large">
              You want your loved ones to feel their best. A Superpower
              membership gives them the insight and support to take control of
              their health.
            </p>
            <div className="holiday-package_cta">
              <Link
                href="/checkout/gift"
                className="button is-large is-icon w-inline-block"
              >
                <div className="text-size-large">
                  Gift Superpower for {annualPriceFormatted}
                </div>
              </Link>
              <p className="text-size-small text-style-muted">
                <em>Digital gift membership delivered instantly.</em>
                {'\u200D'}
                <br />
                {'\u200D'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <img
        src="/images/site/691907f569525a5a125d47c0_frame%201739334436.avif"
        alt=""
        className="image_cover-absolute"
        style={{ visibility: 'visible' }}
      />
    </section>
  );
}
