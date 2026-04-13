'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const slides = [
  {
    bgSrc: '/images/site/68b8b8b83d5c5f0ce059b2d0_bg-image%201.avif',
    unit: 'nm',
    value: '630',
    dataEnd: '630',
    label: 'Red light',
    uiBottom: '/images/site/68c2e2d78f46e6b64d06cb77_frame%201597885299%20(2).avif',
    uiBottomSrcSet: '/images/site/68c2e2d78f46e6b64d06cb77_frame%201597885299%20(2)-p-500.avif 500w, /images/site/68c2e2d78f46e6b64d06cb77_frame%201597885299%20(2).avif 1120w',
    uiBottomAlt: 'Text with "Goal: Reduce fatigue," suggesting oral bisglycinate 25-65 mg daily and increased vitamin C intake.',
  },
  {
    bgSrc: '/images/site/68b8b8b89e5bebda23242696_person%20sitting%20on%20rocks%202.avif',
    unit: 'nm',
    value: '660',
    dataEnd: '660',
    label: 'Deep red',
    uiBottom: '/images/site/68b8a31ebb1818f3df1c068d_frame%201597885298%20(1).avif',
    uiBottomSrcSet: '/images/site/68b8a31ebb1818f3df1c068d_frame%201597885298%20(1)-p-500.avif 500w, /images/site/68b8a31ebb1818f3df1c068d_frame%201597885298%20(1).avif 1401w',
    uiBottomAlt: 'Text showing a goal to reduce inflammation with two bullet points: cut refined carbs and seed oils, and take fish oil 2-3 g/day EPA+DHA.',
  },
  {
    bgSrc: '/images/site/68b8b8b806644768b9c3f8b6_middle%20aged%20picture%20(7)%201.avif',
    unit: 'nm',
    value: '850',
    dataEnd: '850',
    label: 'Near-infrared',
    uiBottom: '/images/site/68b8a31ef0aca94ee71424f2_frame%201597885298%20(2).avif',
    uiBottomSrcSet: '/images/site/68b8a31ef0aca94ee71424f2_frame%201597885298%20(2)-p-500.avif 500w, /images/site/68b8a31ef0aca94ee71424f2_frame%201597885298%20(2).avif 1401w',
    uiBottomAlt: 'Text stating goals to increase muscle: strength train 2-3 times a week, take 300-400 mg magnesium daily.',
  },
];

export default function ClearMobileSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Swiper && sliderRef.current) {
      const scope = sliderRef.current;
      const swiperEl = scope.querySelector('.swiper');
      if (swiperEl) {
        new (window as any).Swiper(swiperEl, {
          breakpoints: {
            992: { slidesPerView: 'auto' },
            421: { slidesPerView: 'auto' },
            0: { slidesPerView: 'auto' },
          },
          followFinger: true,
          freeMode: false,
          speed: 300,
          slideActiveClass: 'is-active',
        });
      }
    }
  }, []);

  return (
    <div className="section_clear-mobile">
      <div className="page-padding">
        <div className="slider_component">
          <div className="title_row">
            <h2 className="heading-style-h1">Light that works beneath the surface</h2>
            <p>Red and near-infrared wavelengths penetrate deep into your skin, muscles and tissue — stimulating cellular repair, reducing inflammation, and restoring balance from the inside out.</p>
            <div className="button_row">
              <Link href="/checkout" className="button is-large is-icon w-inline-block">
                <div>Book your experience</div>
                <div className="icon-embed-regular w-embed">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            </div>
            <div className="button-group is-right hide-mobile-landscape">
              <Link href="/how-it-works" className="button is-large w-button">Learn how it works</Link>
            </div>
          </div>
        </div>
        <div className="margin-top margin-medium"></div>
        <div
          ref={sliderRef}
          data-swiper-ss-gap="example"
          data-swiper-scope=""
          className="example-slider_component is-lab-testing"
        >
          <div data-align-last="left" className="example-slider_wrap swiper is-bf">
            <div className="example-slider_list swiper-wrapper">
              {slides.map((s, i) => (
                <div key={i} className="example-slider_item swiper-slide blood-friday">
                  <div className="card is-clear-mobile">
                    {/* Slide 0: bg image is position:absolute via class; slides 1-2: no class → static, contributes natural height */}
                    <img src={s.bgSrc} loading="lazy" alt="" className={i === 0 ? 'image_cover-absolute' : undefined} />
                    {i === 0 ? (
                      /* Slide 0: wrapped in div-block-240, uiBottom outside clues_text-wrapper */
                      <>
                        <div className="div-block-240">
                          <div className="clues_text-wrapper">
                            <div className="clues_text1">{s.unit}</div>
                            <div data-end={s.dataEnd} data-counter="" className="clues_text-middle">{s.value}</div>
                            <div className="clues_text2">{s.label}</div>
                          </div>
                        </div>
                        <img
                          src={s.uiBottom}
                          loading="lazy"
                          sizes="100vw"
                          srcSet={s.uiBottomSrcSet}
                          alt={s.uiBottomAlt}
                          className="welcome-frame_ui-bottom"
                        />
                      </>
                    ) : (
                      /* Slides 1-2: clues_text-wrapper directly in card, uiBottom inside it */
                      <div className="clues_text-wrapper">
                        <div className="clues_text1">{s.unit}</div>
                        <div data-end={s.dataEnd} data-counter="" className="clues_text-middle">{s.value}</div>
                        <div className="clues_text2">{s.label}</div>
                        <img
                          src={s.uiBottom}
                          loading="lazy"
                          sizes="100vw"
                          srcSet={s.uiBottomSrcSet}
                          alt={s.uiBottomAlt}
                          className="welcome-frame_ui-bottom"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
