'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const StarIcon = () => (
  <div className="testimonial-star w-embed">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M13.5894 1.99755C12.9495 0.667485 11.0494 0.667485 10.4095 1.99755L8.23644 6.51389C8.19896 6.59179 8.12314 6.64774 8.03302 6.65952L3.03465 7.31296C1.56799 7.5047 0.968302 9.31183 2.05312 10.3331L5.70632 13.7724C5.77055 13.8329 5.79841 13.9201 5.78273 14.0041L4.86513 18.9186C4.59205 20.3812 6.14171 21.4835 7.43667 20.7865L11.8725 18.3989C11.9515 18.3563 12.0474 18.3563 12.1264 18.3989L16.5622 20.7865C17.8572 21.4835 19.4069 20.3812 19.1338 18.9186L18.2162 14.0041C18.2005 13.9201 18.2284 13.8329 18.2926 13.7724L21.9458 10.3331C23.0306 9.31183 22.4309 7.5047 20.9643 7.31296L15.9659 6.65952C15.8758 6.64774 15.8 6.59179 15.7625 6.51389L13.5894 1.99755Z"
        fill="#FC5F2B"
      />
    </svg>
  </div>
);

const FiveStars = () => (
  <div className="fct-testimonial_star-row">
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarIcon />
  </div>
);

const PlayIcon = () => (
  <div className="play-icon w-embed">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      className="iconify iconify--ic"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82"
      />
    </svg>
  </div>
);

const PlayButton = () => (
  <div className="play-button">
    <div className="play-icon-wrap gradient-border2">
      <PlayIcon />
    </div>
  </div>
);

const TrustpilotStar = () => (
  <div className="icon_trustpilot-star w-embed">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 26 24"
      fill="none"
    >
      <path
        d="M25.2466 9.17115H15.6012L12.6321 0.000160217L9.64535 9.17115L0 9.15358L7.80061 14.8284L4.81389 23.9993L12.6145 18.3246L20.4151 23.9993L17.446 14.8284L25.2466 9.17115Z"
        fill="#00B67A"
      />
      <path
        d="M18.1153 16.9004L17.4477 14.8273L12.6338 18.3235L18.1153 16.9004Z"
        fill="#005128"
      />
    </svg>
  </div>
);

interface TestimonialData {
  name: string;
  quote: string;
  posterImg: string;
  posterSrcSet?: string;
  videoSrc: string;
  videoPoster: string;
}

const testimonials: TestimonialData[] = [
  {
    name: 'John A.',
    quote:
      'He wasn\'t "just aging." His doctor missed low testosterone.',
    posterImg:
      '/images/site/6992e868bf7e07286d1b0e32_e94aa160d9798357880d04d275606479f1ae2ad5.avif',
    posterSrcSet:
      '/images/site/6992e868bf7e07286d1b0e32_e94aa160d9798357880d04d275606479f1ae2ad5-p-500.avif 500w, /images/site/6992e868bf7e07286d1b0e32_e94aa160d9798357880d04d275606479f1ae2ad5.avif 1090w',
    videoSrc: '/videos/testimonials/john%20a%20testimonial.mp4',
    videoPoster: '/videos/testimonials/john%20a%20testimonial.png',
  },
  {
    name: 'Alexandra N.',
    quote:
      'She found plaque build-up and elevated heart risk. Now she can get ahead.',
    posterImg:
      '/images/site/6992e8692fcea144aeec832f_alexandra-mom%20of%20three%20boys.avif',
    posterSrcSet:
      '/images/site/6992e8692fcea144aeec832f_alexandra-mom%20of%20three%20boys-p-500.avif 500w, /images/site/6992e8692fcea144aeec832f_alexandra-mom%20of%20three%20boys.avif 1187w',
    videoSrc:
      '/videos/testimonials/alexandra-mom%20of%20three%20boys.mp4',
    videoPoster:
      '/videos/testimonials/alexandra-mom%20of%20three%20boys.png',
  },
  {
    name: 'David L.',
    quote:
      'Elevated inflammation revealed the cause of his persistent brain fog and fatigue.',
    posterImg:
      '/images/site/6992e868d15bc8ed54c2677a_david-i%20looked%20healthy%20on%20paper.avif',
    videoSrc:
      '/videos/testimonials/david-i%20looked%20healthy%20on%20paper.mp4',
    videoPoster:
      '/videos/testimonials/david-i%20looked%20healthy%20on%20paper.png',
  },
  {
    name: 'Carissa K.',
    quote:
      'Discovered the hormone imbalance driving her bloating and weight gain.',
    posterImg:
      '/images/site/6992ec09a0bf48dd73278f78_sp-test-carissa.avif',
    posterSrcSet:
      '/images/site/6992ec09a0bf48dd73278f78_sp-test-carissa-p-500.avif 500w, /images/site/6992ec09a0bf48dd73278f78_sp-test-carissa.avif 1077w',
    videoSrc: '/videos/carissa%20k%20testimonial.mp4',
    videoPoster: '/videos/sp-test-carissa.jpg',
  },
  {
    name: 'Dan S.',
    quote:
      "He's been waiting years for a way to measure and track his health over time.",
    posterImg:
      '/images/site/6992e86890cf6ffecbb368ca_dan-before%20superpower%20i%20felt%20aimless.avif',
    videoSrc:
      '/videos/testimonials/dan-before%20superpower,%20i%20felt%20aimless.mp4',
    videoPoster:
      '/videos/testimonials/dan-before%20superpower,%20i%20felt%20aimless.png',
  },
  {
    name: 'Cecilia H.',
    quote:
      'Harmful toxins were silently driving a major hormone imbalance.',
    posterImg:
      '/images/site/6992ebe69c37e0af91775f88_sp-test-cecilla.avif',
    posterSrcSet:
      '/images/site/6992ebe69c37e0af91775f88_sp-test-cecilla-p-500.avif 500w, /images/site/6992ebe69c37e0af91775f88_sp-test-cecilla.avif 1080w',
    videoSrc: '/videos/cecilia%20h%20testimonial.mp4',
    videoPoster: '/videos/sp-test-cecilla.jpg',
  },
  {
    name: 'Greg W.',
    quote:
      'He found peace of mind after fearing his genetic risk of diabetes and cancer.',
    posterImg:
      '/images/site/6992e868e7fe68129c982eb3_greg-men%20don_t%20go%20to%20the%20doctor.avif',
    videoSrc:
      "/videos/testimonials/greg-men%20don_t%20go%20to%20the%20doctor.mp4",
    videoPoster:
      "/videos/testimonials/greg-men%20don_t%20go%20to%20the%20doctor.png",
  },
  {
    name: 'Daniel O.',
    quote:
      'Liver and hormone imbalances finally explained years of insomnia.',
    posterImg:
      "/images/site/6992e868b996aa07a33d5578_daniel-i%20couldn_t%20fall%20asleep.%20then%20i%20couldn_t%20wake%20up-.avif",
    posterSrcSet:
      "/images/site/6992e868b996aa07a33d5578_daniel-i%20couldn_t%20fall%20asleep.%20then%20i%20couldn_t%20wake%20up--p-500.avif 500w, /images/site/6992e868b996aa07a33d5578_daniel-i%20couldn_t%20fall%20asleep.%20then%20i%20couldn_t%20wake%20up-.avif 1178w",
    videoSrc:
      "/videos/testimonials/daniel-i%20couldn_t%20fall%20asleep.%20then%20i%20couldn_t%20wake%20up-.mp4",
    videoPoster:
      "/videos/testimonials/daniel-i%20couldn_t%20fall%20asleep.%20then%20i%20couldn_t%20wake%20up-.png",
  },
  {
    name: 'Jonathan C.',
    quote:
      'A vitamin D deficiency finally explained why he was so tired.',
    posterImg:
      "/images/site/6992e86822ba817bd4e5691c_jonathan-everyone_s%20always%20tired.%20i%20thought%20that%20was%20normal-.avif",
    posterSrcSet:
      "/images/site/6992e86822ba817bd4e5691c_jonathan-everyone_s%20always%20tired.%20i%20thought%20that%20was%20normal--p-500.avif 500w, /images/site/6992e86822ba817bd4e5691c_jonathan-everyone_s%20always%20tired.%20i%20thought%20that%20was%20normal-.avif 1176w",
    videoSrc:
      "/videos/testimonials/jonathan-everyone_s%20always%20tired.%20i%20thought%20that%20was%20normal-.mp4",
    videoPoster:
      "/videos/testimonials/jonathan-everyone_s%20always%20tired.%20i%20thought%20that%20was%20normal-.png",
  },
];

const ChevronLeftNav = () => (
  <div className="icon-embed-regular w-embed">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M15 17.9966L9 11.9966L15 5.99658"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const ChevronRightNav = () => (
  <div className="icon-embed-regular w-embed">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M9 17.9983L15 11.9983L9 5.99829"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export default function GiftTestimonials() {
  const swiperRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const bulletRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let instance: any = null;
    let attempts = 0;
    const maxAttempts = 40;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const tryInit = () => {
      const Swiper = (window as any).Swiper;
      if (Swiper && swiperRef.current) {
        instance = new Swiper(swiperRef.current, {
          slidesPerView: 'auto',
          speed: 300,
          mousewheel: { forceToAxis: true },
          keyboard: { enabled: true, onlyInViewport: true },
          observer: true,
          observeParents: true,
          watchSlidesProgress: true,
          breakpoints: {
            0: { centeredSlides: false },
            768: { centeredSlides: false },
            992: { centeredSlides: false },
          },
          navigation: {
            nextEl: nextRef.current,
            prevEl: prevRef.current,
          },
          pagination: {
            el: bulletRef.current,
            clickable: true,
            bulletClass: 'example-slider_bullet_item',
            bulletActiveClass: 'is-active',
            bulletElement: 'button',
          },
        });
      } else if (attempts < maxAttempts) {
        attempts++;
        timeoutId = setTimeout(tryInit, 100);
      }
    };

    tryInit();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (instance && instance.destroy) {
        instance.destroy(true, true);
      }
    };
  }, []);

  return (
    <section className="section_fct-testimonials-video">
      <div className="page-padding padding-section-large">
        <div className="container-large z-index-2">
          <div className="fct-testimonial-video_component">
            <div className="title_row is-centered2">
              <a
                rel="nofollow"
                href="https://www.trustpilot.com/review/superpower.com"
                target="_blank"
                className="title-row_badge w-inline-block"
              >
                <div className="text-style-muted">4.6 out of 5</div>
                <TrustpilotStar />
                <div>Trustpilot</div>
              </a>
              <div>
                <h1 className="heading-style-h2">
                  What members say after getting their results
                </h1>
              </div>
              <div className="button-group is-full-width-mobile">
                <Link
                  href="/checkout"
                  className="sp2_btn w-inline-block"
                >
                  <div className="sp2_btn-content">Start testing</div>
                  <span className="sp2_btn-loading">
                    <span className="sp2_btn-spinner" />
                    <span className="sp2_btn-loading-text">Loading...</span>
                  </span>
                  <img
                    src="/images/site/69ae99d9ac8d93ebfd3f6bc4_icon-download.svg"
                    alt=""
                    className="button-icon"
                  />
                </Link>
              </div>
            </div>

            <div className="example-slider_component" data-swiper-ss-gap="testimonial" data-swiper-scope="">
              <div
                ref={swiperRef}
                data-align-last="left"
                className="example-slider_wrap swiper"
              >
                <div className="example-slider_list swiper-wrapper">
                  {testimonials.map((t, i) => (
                    <div key={i} className="example-slider_item swiper-slide">
                      <div className="fct-testimonial_card">
                        <div className="fct-testimonial_video-wrap">
                          <img
                            className="image_cover-absolute _w-editor"
                            src={t.posterImg}
                            alt=""
                            sizes={t.posterSrcSet ? '100vw' : undefined}
                            srcSet={t.posterSrcSet}
                            loading={i > 1 ? 'lazy' : undefined}
                            style={{ visibility: 'visible' }}
                          />
                          <div
                            data-src={t.videoSrc}
                            data-poster={t.videoPoster}
                            aria-label="Open Video"
                            data-type="mp4"
                            data-plyr-card="1"
                            className="video-card"
                          >
                            <PlayButton />
                            <div className="fct-testimonial_info">
                              <div className="fct-testimonial_info-content">
                                <div className="text-size-large">
                                  {t.name}
                                </div>
                                <div className="fct-testimonial_quote">
                                  <FiveStars />
                                  <div className="text-style-muted">
                                    {t.quote}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="example-slider_layout is-function">
                <div className="example-slider_btn_layout is-testimonial">
                  <div
                    ref={prevRef}
                    className="example-slider_btn_element swiper-button-disabled is-prev"
                  >
                    <a href="#" className="button-prev w-inline-block">
                      <ChevronLeftNav />
                    </a>
                  </div>
                  <div
                    ref={bulletRef}
                    className="example-slider_bullet_wrap is-testimonial"
                  >
                    <div className="example-slider_bullet_item is-active" />
                    <div className="example-slider_bullet_item" />
                  </div>
                  <div
                    ref={nextRef}
                    className="example-slider_btn_element is-next"
                  >
                    <div className="button-next">
                      <ChevronRightNav />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
