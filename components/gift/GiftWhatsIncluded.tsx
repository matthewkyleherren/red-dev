'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import useDynamicPricing from '@/hooks/useDynamicPricing';

const ChevronLeft = () => (
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
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const ChevronRight = () => (
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
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const ChevronRightCurrent = () => (
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

interface SlideItem {
  img: string;
  imgAlt: string;
  srcSet?: string;
  title: string;
  description: string;
}

const slides: SlideItem[] = [
  {
    img: '/images/site/68b8c1a0dfd638cc6576f100_img%20frame-3.avif',
    imgAlt:
      'A test tube with an orange cap labeled "Superpower Blood Panel."',
    srcSet:
      '/images/site/68b8c1a0dfd638cc6576f100_img%20frame-3-p-500.avif 500w, /images/site/68b8c1a0dfd638cc6576f100_img%20frame-3.avif 717w',
    title: 'Test 100+ biomarkers',
    description:
      'One blood draw to detect early signs of 1,000+ conditions',
  },
  {
    img: '/images/site/68b8c1a0101daa0c00de7f0f_img%20frame-4.avif',
    imgAlt:
      'Smartphone screen displaying health app data, including biomarkers, a superpower score of 70, and biological age of 25.',
    srcSet:
      '/images/site/68b8c1a0101daa0c00de7f0f_img%20frame-4-p-500.avif 500w, /images/site/68b8c1a0101daa0c00de7f0f_img%20frame-4.avif 717w',
    title: 'See the full picture',
    description:
      '17 health scores, personalized insights, and a clear breakdown of what matters most.',
  },
  {
    img: '/images/site/68df1a2cc8140ea958b0a37c_frame%201597885625.avif',
    imgAlt: '',
    srcSet:
      '/images/site/68df1a2cc8140ea958b0a37c_frame%201597885625-p-500.avif 500w, /images/site/68df1a2cc8140ea958b0a37c_frame%201597885625-p-800.avif 800w, /images/site/68df1a2cc8140ea958b0a37c_frame%201597885625-p-1080.avif 1080w, /images/site/68df1a2cc8140ea958b0a37c_frame%201597885625-p-1600.avif 1600w, /images/site/68df1a2cc8140ea958b0a37c_frame%201597885625-p-2000.avif 2000w, /images/site/68df1a2cc8140ea958b0a37c_frame%201597885625.avif 2056w',
    title: 'Personalized plan',
    description:
      'A custom protocol with targeted diet, supplement, and lifesytle recommendations.',
  },
  {
    img: '/images/site/6909a982dbe21af11d0e9b06_img%20frame.avif',
    imgAlt: '',
    srcSet:
      '/images/site/6909a982dbe21af11d0e9b06_img%20frame-p-500.avif 500w, /images/site/6909a982dbe21af11d0e9b06_img%20frame-p-800.avif 800w, /images/site/6909a982dbe21af11d0e9b06_img%20frame.avif 1074w',
    title: 'On-demand care team',
    description:
      'Message clinical experts whenever questions come up. No appointments, no waiting.',
  },
  {
    img: '/images/site/68b8c1a04aeed150f41dc638_img%20frame-1.avif',
    imgAlt:
      'Boxes labeled "Environmental Toxins," "Gut Microbiome Test," and "Multi-Cancer" with abstract images and orange accents.',
    srcSet:
      '/images/site/68b8c1a04aeed150f41dc638_img%20frame-1-p-500.avif 500w, /images/site/68b8c1a04aeed150f41dc638_img%20frame-1.avif 717w',
    title: 'Ecosystem access',
    description:
      'Book advanced tests and access curated supplements with members-only pricing.',
  },
];

export default function GiftWhatsIncluded() {
  const swiperRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const { annualPriceFormatted } = useDynamicPricing();

  useEffect(() => {
    const Swiper = (window as any).Swiper;
    if (!Swiper || !swiperRef.current) return;

    const instance = new Swiper(swiperRef.current, {
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
    });

    return () => {
      if (instance && instance.destroy) {
        instance.destroy(true, true);
      }
    };
  }, []);

  return (
    <section className="section_how-it-works has-rounded-corners-mobile">
      <div className="page-padding">
        <div className="padding-vertical padding-xlarge">
          <div className="container-large">
            <div className="slider_component disable-on-mobile offset-before">
              <div className="how-it-works_heading-wrapper">
                <div className="page-padding-mobile heading-mobile">
                  <div className="title_row is-2col">
                    <h2 className="heading-style-h1">
                      What they&apos;ll get with Superpower
                    </h2>
                    <div className="slider_layout is-margin">
                      <div className="slider_btn_layout is-positioned-top">
                        <div
                          ref={prevRef}
                          className="slider_btn_element swiper-button-disabled is-prev"
                        >
                          <a href="#" className="button-prev w-inline-block">
                            <ChevronLeft />
                          </a>
                        </div>
                        <div ref={nextRef} className="slider_btn_element is-next">
                          <div className="button-next">
                            <ChevronRight />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                ref={swiperRef}
                className="slider_wrap swiper is-how-it-works"
              >
                <div className="slider_list swiper-wrapper is-testimonials is-horizontal-mobile is-shiw">
                  {slides.map((slide, i) => (
                    <div key={i} className="slider_item swiper-slide is-hiw">
                      <div className="whats-included_item_wrap">
                        <img
                          src={slide.img}
                          loading="lazy"
                          alt={slide.imgAlt}
                          sizes="(max-width: 479px) 100vw, 716px, 100vw"
                          srcSet={slide.srcSet}
                          className="whats-included_item_img"
                        />
                        <div className="whats-included_item_bot">
                          <h3>{slide.title}</h3>
                          <p className="text-style-muted">
                            {slide.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="margin-top margin-medium">
              <div className="button_row">
                <Link
                  href="/checkout/gift"
                  className="button is-icon w-variant-094685dc-02e8-34f8-a0c0-8167f0653428 w-inline-block"
                >
                  <div>Gift Superpower for {annualPriceFormatted}</div>
                  <ChevronRightCurrent />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
