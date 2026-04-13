'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

/* ------------------------------------------------------------------ */
/*  Corner SVG component (repeated in every testimonial card)          */
/* ------------------------------------------------------------------ */
function CornerBorders() {
  return (
    <div className="testimonial-sticky_corner-wrapper">
      <div className="sticky_corner w-embed">
        <svg width="100%" height="100%" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 10V0H11" stroke="#DC2626" />
        </svg>
      </div>
      <div className="sticky_corner is-2 w-embed">
        <svg width="100%" height="100%" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10V0H2.98023e-07" stroke="#DC2626" />
        </svg>
      </div>
      <div className="sticky_corner is-3 w-embed">
        <svg width="100%" height="100%" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 -4.17233e-07V10H10" stroke="#DC2626" />
        </svg>
      </div>
      <div className="sticky_corner is-4 w-embed">
        <svg width="100%" height="100%" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 -4.17233e-07V10H2.98023e-07" stroke="#DC2626" />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Slide data                                                         */
/* ------------------------------------------------------------------ */
interface SlideData {
  image: string;
  alt: string;
  imageClass: string;
  itemClass: string;
  quote: string;
  attribution: string;
}

const slides: SlideData[] = [
  {
    image: '/images/site/6817d7f1094f40b1eab5665b_image-4.avif',
    alt: '',
    imageClass: 'testimonial-sticky_image is-colored',
    itemClass: 'testimonial-sticky_item',
    quote: '\u201cDoctors dismissed my symptoms for years. It took 7 years, 9 specialists, and 11 hospitalizations before I finally got answers\u201d',
    attribution: 'Samantha Reid, 28',
  },
  {
    image: '/images/site/6817d7f01bbb86085911ee41_image-5.avif',
    alt: 'A man with short dark hair wearing a white shirt looking at the camera.',
    imageClass: 'testimonial-sticky_image is-colored',
    itemClass: 'testimonial-sticky_item is-2',
    quote: '\u201cIn traditional healthcare, data lives in siloes. No one connects the dots and patients pay the price\u201d',
    attribution: 'Chad Byers, 38',
  },
  {
    image: '/images/site/683a03d80f215aa9eefcdfc2_image.avif',
    alt: '',
    imageClass: 'testimonial-sticky_image is-colored',
    itemClass: 'testimonial-sticky_item is-3',
    quote: '\u201cIt shouldn\u2019t take a medical degree and a stockpile of cash just to understand what\u2019s going on inside your own body\u201d',
    attribution: 'Eurie Kim, 45',
  },
  {
    image: '/images/site/683a06ff5dc7fdcc675b918b_image.avif',
    alt: 'Close-up of a seashell\'s ribbed texture, displaying curving lines and ridges in soft green hues.',
    imageClass: 'testimonial-sticky_image',
    itemClass: 'testimonial-sticky_item is-12',
    quote: '\u201cThere are millions of people like me, who randomly developed anxiety, chronic low energy, brain fog, gut issues, with no answers from traditional medicine.\u201d',
    attribution: 'Elena Park, 42',
  },
  {
    image: '/images/site/683a03d8352bcddf5da212fe_image-1.avif',
    alt: '',
    imageClass: 'testimonial-sticky_image',
    itemClass: 'testimonial-sticky_item is-17',
    quote: '\u201cMy wife\u2019s chest pain was brushed off as \u2018seasonal allergies\u2019 until an X-ray revealed tumors in her lungs, hip, and liver.\u201d',
    attribution: 'Ravi D\'Souza, 46',
  },
  {
    image: '/images/site/683a06ffa4448581c2d7731f_image-1.avif',
    alt: '',
    imageClass: 'testimonial-sticky_image',
    itemClass: 'testimonial-sticky_item is-17',
    quote: '\u201cMy girlfriend was nearly kicked out of urgent care for bringing her own lab results. Doctors didn\u2019t want to see them.\u201d',
    attribution: 'Julian Marlowe, 31',
  },
];

/* ------------------------------------------------------------------ */
/*  Main slider component                                              */
/* ------------------------------------------------------------------ */
export default function CenteredTestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(2); // Match original: starts at slide index 2
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const AUTOPLAY_DURATION = 4000;

  // Compute translateX to center the active slide within the row
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const slideEls = list.querySelectorAll<HTMLElement>('.centered-slider-slide');
    if (!slideEls.length) return;

    const updateTranslate = () => {
      const row = list.parentElement;
      if (!row) return;
      const containerWidth = row.getBoundingClientRect().width;
      const slide = slideEls[activeIndex];
      if (!slide) return;
      const slideLeft = slide.offsetLeft;
      const slideWidth = slide.offsetWidth;
      const centerOffset = containerWidth / 2 - (slideLeft + slideWidth / 2);
      setTranslateX(centerOffset);
    };

    updateTranslate();
    window.addEventListener('resize', updateTranslate);
    return () => window.removeEventListener('resize', updateTranslate);
  }, [activeIndex]);

  const goTo = useCallback((index: number) => {
    const wrapped = ((index % slides.length) + slides.length) % slides.length;
    setActiveIndex(wrapped);
  }, []);

  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_DURATION);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, []);

  // Reset autoplay on manual navigation
  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_DURATION);
  }, []);

  // Touch/swipe handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold) {
      next();
      resetAutoplay();
    } else if (diff < -threshold) {
      prev();
      resetAutoplay();
    }
  }, [next, prev, resetAutoplay]);

  return (
    <div className="section_slider-testimonials is-testimonials-lp">
      <div
        data-slider-autoplay-duration="4"
        aria-label="Testimonial Slider"
        data-centered-slider="wrapper"
        data-slider-autoplay="true"
        className="centered-slider-group"
      >
        {/* Inline styles for the slider */}
        <style dangerouslySetInnerHTML={{ __html: `
          .centered-slider-bullet::after {
            content: '';
            position: absolute;
            inset: 2px;
            border-radius: 100em;
            z-index: -1;
            border: 1px solid #FF4C24;
            transition: all 0.5s cubic-bezier(0.65, 0.05, 0, 1);
            pointer-events: none;
          }
          .centered-slider-bullet:hover::after,
          .centered-slider-bullet.active::after,
          .centered-slider-bullet:focus::after {
            inset: -5px;
          }
          .centered-slider-row:has(.centered-slider-slide.active) .centered-slider-slide:not(.active) {
            opacity: 0.45;
          }
          .centered-slider-slide::after {
            --size: 1rem;
            --width: 1px;
            --gap: 0.5em;
            --color: #FF4C24;
            content: '';
            position: absolute;
            inset: calc(var(--gap) * -1);
            z-index: 1;
            opacity: 0;
            padding: calc(var(--gap) + var(--width));
            outline: var(--width) solid var(--color);
            outline-offset: calc(var(--gap)/-1);
            mask:
              conic-gradient(at var(--size) var(--size), #0000 75%, #000 0)
              0 0 / calc(100% - var(--size)) calc(100% - var(--size)),
              linear-gradient(#000 0 0) content-box;
            transition: all 0.4s cubic-bezier(0.65, 0.05, 0, 1);
            pointer-events: none;
          }
          .centered-slider-slide.active::after {
            outline-offset: calc(-1 * var(--width));
            opacity: 1;
          }
        `}} />

        <div className="container" />

        <div
          className="centered-slider-row"
          style={{ overflow: 'hidden' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            aria-label="slides"
            data-centered-slider="list"
            role="group"
            className="centered-slider-list"
            ref={listRef}
            style={{
              overflow: 'visible',
              transform: `translateX(${translateX}px)`,
              transition: 'transform 0.725s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                data-centered-slider="slide"
                className={`centered-slider-slide is-testimonial-lp${i === activeIndex ? ' active' : ''}`}
                onClick={() => {
                  goTo(i);
                  resetAutoplay();
                }}
              >
                <div className={slide.itemClass}>
                  <CornerBorders />
                  <img
                    loading="lazy"
                    src={slide.image}
                    alt={slide.alt}
                    className={slide.imageClass}
                  />
                  <p>
                    {slide.quote}
                    <br /><br />
                    <span className="text-style-muted">{slide.attribution}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nav buttons */}
        <div className="container">
          <div className="centered-slider-content">
            <div className="centered-slider-buttons">
              <button
                aria-label="previous slide"
                data-centered-slider="prev-button"
                className="centered-slider-button is--prev"
                onClick={() => { prev(); resetAutoplay(); }}
              >
                <div className="slider-arrow-icon_default lhs w-embed">
                  <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.31066 8.75001L9.03033 14.4697L7.96967 15.5303L0.439339 8.00001L7.96967 0.469676L9.03033 1.53034L3.31066 7.25001L15.5 7.25L15.5 8.75L3.31066 8.75001Z" fill="currentColor" />
                  </svg>
                </div>
              </button>
              <button
                aria-label="next slide"
                data-centered-slider="next-button"
                className="centered-slider-button"
                onClick={() => { next(); resetAutoplay(); }}
              >
                <div className="slider-arrow-icon_default w-embed">
                  <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.6893 7.25L6.96967 1.53033L8.03033 0.469666L15.5607 8L8.03033 15.5303L6.96967 14.4697L12.6893 8.75H0.5V7.25H12.6893Z" fill="currentColor" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
