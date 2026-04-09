'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

declare global {
  interface Window {
    Swiper: any;
  }
}

const SLIDES = [
  {
    img: '/images/site/68db0c05e445f893e1bec67e_prescriptions.avif',
    alt: 'Four medical products: B12 injections, Enclomiphene, NAD+ intranasal, and Semaglutide, displayed in separate boxes.',
    title: 'Prescriptions',
    desc: 'Medication you can buy from us, at discounted prices.',
  },
  {
    img: '/images/site/691b435c24cfaf4a07d48f10_marketplace-orange-bg.avif',
    imgSrcSet:
      '/images/site/691b435c24cfaf4a07d48f10_marketplace-orange-bg-p-500.avif 500w, /images/site/691b435c24cfaf4a07d48f10_marketplace-orange-bg-p-800.avif 800w, /images/site/691b435c24cfaf4a07d48f10_marketplace-orange-bg.avif 1650w',
    alt: '',
    title: 'Supplements',
    desc: 'Curated supplements and medical products',
  },
  {
    img: '/images/site/68db0c4476b037b40ee2e998_img%20frame.avif',
    alt: 'Two white test kits: Environmental Toxins with a brown texture, Gut Microbiome Test with an orange pattern.',
    title: 'Add-on Testing',
    desc: 'Further advanced testing across gut health, cancer risk and toxins.',
  },
  {
    img: '/images/site/6909a982dbe21af11d0e9b06_img%20frame.avif',
    imgSrcSet:
      '/images/site/6909a982dbe21af11d0e9b06_img%20frame-p-500.avif 500w, /images/site/6909a982dbe21af11d0e9b06_img%20frame.avif 1074w',
    alt: '',
    title: 'Unlimited Concierge',
    desc: 'Use your 24/7 message access to ask questions, our care team will answer within 24 hours on weekdays',
  },
];

export default function WeGuideYouSwiper() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const swiperInstanceRef = useRef<any>(null);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 40;

    const tryInit = () => {
      if (typeof window !== 'undefined' && window.Swiper && scopeRef.current) {
        const scope = scopeRef.current;
        const swiperEl = scope.querySelector('.swiper');
        if (!swiperEl) return;

        swiperInstanceRef.current = new window.Swiper(swiperEl, {
          breakpoints: {
            992: { slidesPerView: 3, spaceBetween: 16 },
            470: { slidesPerView: 2, spaceBetween: 16 },
            0: { slidesPerView: 1, spaceBetween: 16 },
          },
          followFinger: true,
          freeMode: false,
          slideToClickedSlide: false,
          centeredSlides: false,
          autoHeight: false,
          speed: 300,
          slideActiveClass: 'is-active',
          slideDuplicateActiveClass: 'is-active',
          mousewheel: { forceToAxis: true },
          keyboard: { enabled: true, onlyInViewport: true },
          navigation: {
            nextEl: scope.querySelector('.example-slider_btn_element.is-next'),
            prevEl: scope.querySelector('.example-slider_btn_element.is-prev'),
          },
          pagination: {
            el: scope.querySelector('.example-slider_bullet_wrap'),
            bulletActiveClass: 'is-active',
            bulletClass: 'example-slider_bullet_item',
            bulletElement: 'button',
            clickable: true,
          },
          scrollbar: {
            el: scope.querySelector('.example-slider_draggable_wrap'),
            draggable: true,
            dragClass: 'example-slider_draggable_handle',
            snapOnRelease: true,
          },
        });
      } else {
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(tryInit, 100);
        }
      }
    };

    tryInit();

    return () => {
      if (swiperInstanceRef.current && swiperInstanceRef.current.destroy) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section className="section_how-it-works has-rounded-corners-mobile">
      <div className="page-padding">
        <div className="padding-vertical padding-xlarge">
          <div className="container-large">
            <div className="how-it-works_heading-wrapper" style={{ opacity: 1, visibility: 'visible' }}>
              <div className="page-padding-mobile heading-mobile">
                <div className="title_row is-2col">
                  <div>
                    <div className="text-style-muted">After your health plan</div>
                    <h2 className="heading-style-h1">We guide you to what you need</h2>
                  </div>
                </div>
              </div>
            </div>
            <div ref={scopeRef} data-swiper-ss-gap="example" data-swiper-scope="" className="example-slider_component is-how-it-wroks">
              <style
                dangerouslySetInnerHTML={{
                  __html: `:where([data-swiper-ss-gap="example"]) {
  --swiper-ss-gap: 0rem;
  @media (min-width: 470px) { --swiper-ss-gap: 0rem; }
  @media (min-width: 992px) { --swiper-ss-gap: 0rem; }
}`,
                }}
              />
              <div data-align-last="no" className="example-slider_wrap swiper how-it-works">
                <div className="example-slider_list swiper-wrapper how-it-works">
                  {SLIDES.map((slide, i) => (
                    <div className="example-slider_item swiper-slide how-it-works" key={i} style={{ opacity: 1, visibility: 'visible' }}>
                      <div className="whats-included_item_wrap" style={{ opacity: 1, visibility: 'visible' }}>
                        <img
                          src={slide.img}
                          loading="lazy"
                          alt={slide.alt}
                          sizes={slide.imgSrcSet ? '100vw' : undefined}
                          srcSet={slide.imgSrcSet}
                          className="whats-included_item_img"
                          style={{ opacity: 1, visibility: 'visible' }}
                        />
                        <div className="whats-included_item_bot">
                          <h3>{slide.title}</h3>
                          <p className="text-style-muted">{slide.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="example-slider_btn_layout is-how-it-works">
                <div className="example-slider_btn_element is-prev">
                  <a href="#" className="button-prev w-inline-block" onClick={(e) => e.preventDefault()}>
                    <div className="icon-embed-regular w-embed">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 17.9966L9 11.9966L15 5.99658" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </a>
                </div>
                <div className="example-slider_btn_element is-next">
                  <div className="button-next" style={{ cursor: 'pointer' }}>
                    <div className="icon-embed-regular w-embed">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 17.9983L15 11.9983L9 5.99829" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="margin-top margin-medium">
              <div className="button_row">
                <Link href="/checkout" className="button is-large is-icon w-inline-block">
                  <div>Book my blood test</div>
                  <div className="icon-embed-regular w-embed">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
