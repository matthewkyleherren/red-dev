'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import useDynamicPricing from '@/hooks/useDynamicPricing';

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

/** Generates the 36-bar update bar pattern: expanded every 9th bar */
function UpdateBars() {
  const bars = [];
  for (let i = 0; i < 36; i++) {
    const isExpanded = i % 9 === 0;
    bars.push(
      <div
        key={i}
        className={`holiday-gift_update-bar${isExpanded ? ' expanded' : ''}`}
      >
        <div className="holiday-gift_update-bar_bg" style={{ visibility: 'visible', opacity: 1 }} />
      </div>
    );
  }
  return <div className="holiday-gift_update-wrap">{bars}</div>;
}

/** Opacity Group 1: 4 images */
function OpacityGroup1() {
  return (
    <div data-group-1="" className="holiday-gift_perspective-wrap-1" style={{ visibility: 'visible' }}>
      <img
        src="/images/site/6919fc94c60a086055959e69_dts_the_intern_shauna_summers_photos_id11375%201.avif"
        alt=""
        data-opacity-group="1"
        className="holiday-gift_perspective-child is-1"
        style={{ opacity: 1, visibility: 'visible' }}
      />
      <img
        className="holiday-gift_perspective-child is-4"
        src="/images/site/6919fc94d0ff2cf4de81ee66_unsplash_hzujfzlxvqy.avif"
        alt=""
        sizes="(max-width: 1182px) 100vw, 1182px"
        data-opacity-group="1"
        srcSet="/images/site/6919fc94d0ff2cf4de81ee66_unsplash_hzujfzlxvqy-p-500.avif 500w, /images/site/6919fc94d0ff2cf4de81ee66_unsplash_hzujfzlxvqy.avif 1182w"
        style={{ opacity: 1, visibility: 'visible' }}
      />
      <img
        src="/images/site/6919fc9494378018ae9f1285_dts_the_leader__daniel_far%C3%B2_photos_id9601.avif"
        alt=""
        data-opacity-group="1"
        className="holiday-gift_perspective-child is-3"
        style={{ opacity: 1, visibility: 'visible' }}
      />
      <img
        src="/images/site/6919fc947341eb49e6b3fb44_dts_home_atelier_fanette_guilloud_photos_id7876.avif"
        alt=""
        data-opacity-group="1"
        className="holiday-gift_perspective-child is-2"
        style={{ opacity: 1, visibility: 'visible' }}
      />
    </div>
  );
}

/** Opacity Group 2: 3 images */
function OpacityGroup2() {
  return (
    <div className="holiday-gift_perspective-wrap-1" style={{ visibility: 'visible' }}>
      <img
        className="holiday-gift_perspective-child is-6"
        src="/images/site/6919fca44ab9bdca0633e564_image%203263.avif"
        alt=""
        sizes="(max-width: 1054px) 100vw, 1054px"
        data-opacity-group="2"
        srcSet="/images/site/6919fca44ab9bdca0633e564_image%203263-p-500.avif 500w, /images/site/6919fca44ab9bdca0633e564_image%203263.avif 1054w"
        style={{ opacity: 1, visibility: 'visible' }}
      />
      <img
        src="/images/site/691cac2e415ca4b179ecc85b_250613_superpower_00043.avif"
        alt=""
        data-opacity-group="2"
        className="holiday-gift_perspective-child is-7"
        style={{ opacity: 1, visibility: 'visible' }}
      />
      <img
        src="/images/site/6919fca333baf1069609760b_edu-bastidas-ed4qnaroioy-unsplash.avif"
        alt=""
        data-opacity-group="2"
        className="holiday-gift_perspective-child is-5"
        style={{ opacity: 1, visibility: 'visible' }}
      />
    </div>
  );
}

/** Opacity Group 3: 3 images */
function OpacityGroup3() {
  return (
    <div className="holiday-gift_perspective-wrap-1" style={{ visibility: 'visible' }}>
      <img
        className="holiday-gift_perspective-child is-10"
        src="/images/site/6919fca4ea07fc48ac3c8a73_dts_irl_escapism_daniel_far%C3%B2_photos_id8794%201.avif"
        alt=""
        sizes="(max-width: 1170px) 100vw, 1170px"
        data-opacity-group="3"
        srcSet="/images/site/6919fca4ea07fc48ac3c8a73_dts_irl_escapism_daniel_far%C3%B2_photos_id8794%201-p-500.avif 500w, /images/site/6919fca4ea07fc48ac3c8a73_dts_irl_escapism_daniel_far%C3%B2_photos_id8794%201.avif 1170w"
        style={{ opacity: 1, visibility: 'visible' }}
      />
      <img
        className="holiday-gift_perspective-child is-9"
        src="/images/site/6919fca4d8fd5f34a2e3a082_screenshot%202025-07-07%20at%203.49.03%E2%80%AFpm%201.avif"
        alt=""
        sizes="(max-width: 1120px) 100vw, 1120px"
        data-opacity-group="3"
        srcSet="/images/site/6919fca4d8fd5f34a2e3a082_screenshot%202025-07-07%20at%203.49.03%E2%80%AFpm%201-p-500.avif 500w, /images/site/6919fca4d8fd5f34a2e3a082_screenshot%202025-07-07%20at%203.49.03%E2%80%AFpm%201.avif 1120w"
        style={{ opacity: 1, visibility: 'visible' }}
      />
      <img
        className="holiday-gift_perspective-child is-8"
        src="/images/site/6919fca37c1ee38a95c0724f_250613_superpower_01091.avif"
        alt=""
        sizes="(max-width: 1054px) 100vw, 1054px"
        data-opacity-group="3"
        srcSet="/images/site/6919fca37c1ee38a95c0724f_250613_superpower_01091-p-500.avif 500w, /images/site/6919fca37c1ee38a95c0724f_250613_superpower_01091.avif 1054w"
        style={{ opacity: 1, visibility: 'visible' }}
      />
    </div>
  );
}

/** Opacity Group 4: 5 images */
function OpacityGroup4() {
  return (
    <div className="holiday-gift_perspective-wrap-1" style={{ visibility: 'visible' }}>
      <img
        className="holiday-gift_perspective-child is-13 hide-mobile-landscape"
        src="/images/site/691c8c5494b573ff13e8c80f_img%20frame%20(4).avif"
        alt=""
        sizes="(max-width: 1949px) 100vw, 1949px"
        data-opacity-group="4"
        srcSet="/images/site/691c8c5494b573ff13e8c80f_img%20frame%20(4)-p-500.avif 500w, /images/site/691c8c5494b573ff13e8c80f_img%20frame%20(4)-p-800.avif 800w, /images/site/691c8c5494b573ff13e8c80f_img%20frame%20(4).avif 1949w"
        style={{ opacity: 1, visibility: 'visible' }}
      />
      <img
        src="/images/site/6919fca39d2898c0a563dd9f_frame%201739334413.avif"
        alt=""
        data-opacity-group="4"
        className="holiday-gift_perspective-child is-14"
        style={{ opacity: 1, visibility: 'visible' }}
      />
      <img
        src="/images/site/6919fca3ef0cfc8821317d8f_frame%201739334427.avif"
        alt=""
        data-opacity-group="4"
        className="holiday-gift_perspective-child is-12"
        style={{ opacity: 1, visibility: 'visible' }}
      />
      <img
        className="holiday-gift_perspective-child is-11"
        src="/images/site/691b435c24cfaf4a07d48f10_marketplace-orange-bg.avif"
        alt=""
        sizes="(max-width: 1650px) 100vw, 1650px"
        data-opacity-group="4"
        srcSet="/images/site/691b435c24cfaf4a07d48f10_marketplace-orange-bg-p-500.avif 500w, /images/site/691b435c24cfaf4a07d48f10_marketplace-orange-bg-p-800.avif 800w, /images/site/691b435c24cfaf4a07d48f10_marketplace-orange-bg.avif 1650w"
        style={{ opacity: 1, visibility: 'visible' }}
      />
      <img
        src="/images/site/6919fca38fde4561a8551b2e_img%20frame-1.avif"
        alt=""
        data-opacity-group="4"
        className="holiday-gift_perspective-child is-15"
        style={{ opacity: 1, visibility: 'visible' }}
      />
    </div>
  );
}

export default function GiftScrollAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const { annualPriceFormatted } = useDynamicPricing();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Wait for GSAP + ScrollTrigger to be available (loaded globally)
    const initAnimation = () => {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      if (!gsap || !ScrollTrigger) return;

      gsap.registerPlugin(ScrollTrigger);

      // Make the section visible
      gsap.set(section, { visibility: 'visible' });

      const track = section.querySelector('.holiday-gift_track');
      const screen = section.querySelector('.holiday-gift_screen');
      if (!track || !screen) return;

      // Text animation elements
      const textAnims = section.querySelectorAll('[data-text-anim]');
      const textButton = section.querySelector('.holiday-gift_text_button');

      // Opacity group elements
      const opacityGroups = [1, 2, 3, 4].map((g) =>
        section.querySelectorAll(`[data-opacity-group="${g}"]`)
      );

      // Perspective wrap
      const perspectiveWrap = section.querySelector(
        '.holiday-gift_perspective-wrap-1'
      );

      // Main scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: screen,
        },
      });

      // Text transitions: fade each text-anim in and out sequentially
      const totalSteps = textAnims.length;
      const stepDuration = 1 / totalSteps;

      textAnims.forEach((el, i) => {
        const position = i * stepDuration;
        const isLast = i === totalSteps - 1;

        // Fade in
        tl.fromTo(
          el,
          { opacity: 0 },
          { opacity: 1, duration: stepDuration * 0.3 },
          position
        );

        // Fade out (except last)
        if (!isLast) {
          tl.to(
            el,
            { opacity: 0, duration: stepDuration * 0.3 },
            position + stepDuration * 0.7
          );
        }
      });

      // Text button appears with last text
      if (textButton) {
        tl.fromTo(
          textButton,
          { opacity: 0 },
          { opacity: 1, duration: stepDuration * 0.3 },
          (totalSteps - 1) * stepDuration + stepDuration * 0.3
        );
      }

      // Opacity groups: each group fades in during its text step
      opacityGroups.forEach((group, i) => {
        const position = i * stepDuration;
        group.forEach((el) => {
          tl.fromTo(
            el,
            { opacity: 0 },
            { opacity: 1, duration: stepDuration * 0.5 },
            position + stepDuration * 0.1
          );
        });
      });

      // Perspective wrap animation
      if (perspectiveWrap) {
        gsap.set(perspectiveWrap, { visibility: 'visible' });
      }

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((st: any) => st.kill());
      };
    };

    // Poll for GSAP availability
    const checkInterval = setInterval(() => {
      if ((window as any).gsap && (window as any).ScrollTrigger) {
        clearInterval(checkInterval);
        initAnimation();
      }
    }, 100);

    return () => {
      clearInterval(checkInterval);
      const ScrollTrigger = (window as any).ScrollTrigger;
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((st: any) => st.kill());
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="section_holiday-gift" style={{ visibility: 'visible' }}>
      <div className="holiday-gift_track">
        <div className="holiday-gift_screen">
          <div className="holiday-gift_main">
            <div className="page-padding padding-section-large">
              <div className="container-large z-index-2">
                <div className="holiday-gift_text">
                  <div className="holiday-gift_text_wrap">
                    <div data-text-anim="1" className="heading-style-h2" style={{ opacity: 0 }}>
                      Good gifts show you care
                    </div>
                  </div>
                  <div className="holiday-gift_text_wrap">
                    <div data-text-anim="2" className="heading-style-h2" style={{ opacity: 0 }}>
                      Great gifts have lasting impact
                    </div>
                  </div>
                  <div className="holiday-gift_text_wrap">
                    <div data-text-anim="3" className="heading-style-h2" style={{ opacity: 0 }}>
                      Help someone feel their best
                    </div>
                  </div>
                  <div className="holiday-gift_text_wrap">
                    <div data-text-anim="4" className="heading-style-h2" style={{ opacity: 1 }}>
                      Superpower makes better health simple and accessible
                    </div>
                    <div className="holiday-gift_text_button" style={{ opacity: 1 }}>
                      <div className="margin-top margin-medium">
                        <Link
                          href="/checkout/gift"
                          className="button is-icon w-variant-094685dc-02e8-34f8-a0c0-8167f0653428 w-inline-block"
                        >
                          <div>
                            Gift Superpower for {annualPriceFormatted}
                          </div>
                          <ChevronRight />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <UpdateBars />

            <OpacityGroup1 />
            <OpacityGroup2 />
            <OpacityGroup3 />
            <OpacityGroup4 />
          </div>
        </div>
      </div>
    </section>
  );
}
