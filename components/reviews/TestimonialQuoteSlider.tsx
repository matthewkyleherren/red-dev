'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface QuoteSlide {
  quote: string;
  image: string;
  alt: string;
  name: string;
  detail: string;
}

const quoteSlides: QuoteSlide[] = [
  {
    quote: '\u201cSuperpower uncovered a gene variant missed by years of bloodwork and diagnostics.\u201d',
    image: '/images/site/681b724f45a86c955d8c95fd_image.avif',
    alt: 'A person smiling and standing in front of a large, textured circular object.',
    name: 'Stephen Cole',
    detail: '39, Miami',
  },
  {
    quote: '\u201cMy Superpower test helped me find out I was pre-diabetic. Without Superpower, it would have totally flown under the radar.\u201d',
    image: '/images/site/681a87f4d60ddcc88a1374fd_alice-coleman.avif',
    alt: 'A person with a top bun hairstyle looks directly at the camera, wearing a dark jacket.',
    name: 'Alice Coleman',
    detail: '36, Palo Alto',
  },
  {
    quote: '\u201cAs a physician, I thought I had a handle on my health but I was in the dark. Superpower uncovered real gaps, like elevated toxin levels I\u2019d never tested for.\u201d',
    image: '/images/site/681b724f42c0fde914960f0b_image-2.avif',
    alt: 'A person with glasses is smiling outdoors, wearing a suit jacket and shirt.',
    name: 'Dr. Derick En\'wezoh, MD',
    detail: 'Harvard MD Stanford MBA',
  },
  {
    quote: '\u201cThe $20,000 executive physical program you get at Mayo Clinic is in many ways vastly inferior to the product at Superpower.\u201d',
    image: '/images/site/681b724f3446649640e6e926_image-3.avif',
    alt: '',
    name: 'Dr. Anant Vinjamoori, MD',
    detail: 'Harvard MD & MBA',
  },
];

export default function TestimonialQuoteSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % quoteSlides.length) + quoteSlides.length) % quoteSlides.length);
  }, []);

  // Autoplay — initial delay matches Webflow slider behaviour
  // (waits for page ready + data-delay before first advance)
  useEffect(() => {
    const startId = setTimeout(() => {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % quoteSlides.length);
      }, 4000);
    }, 4000);
    return () => {
      clearTimeout(startId);
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, []);

  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % quoteSlides.length);
    }, 4000);
  }, []);

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
      goTo(activeIndex + 1);
      resetAutoplay();
    } else if (diff < -threshold) {
      goTo(activeIndex - 1);
      resetAutoplay();
    }
  }, [activeIndex, goTo, resetAutoplay]);

  return (
    <section className="section_testimonial-slider">
      <img
        src="/images/site/68149c0a83da84c76a4611c4_cleanshot%202025-04-26%20at%2022.42.45@2x%201.avif"
        loading="lazy"
        alt=""
        className="testimonials_image-stretch"
      />
      <div className="testimonial_lines-component">
        <div className="testimonial_lines-vertical" />
        <div className="testimonial_lines-horizontal" />
      </div>
      <div className="padding-vertical padding-large">
        <div className="testimonial_slider-component">
          <div className="testimonial-slider_side">
            <div className="testimonial-slider_line" />
            <div className="testimonial-slider_line-vertical" />
          </div>

          {/* Slider content — all slides rendered in a CSS grid (all in same cell)
              so the mask height equals the tallest slide, matching Webflow w-slider */}
          <div
            className="testimonial_slider"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="testimonial_slider-mask" style={{ display: 'grid', overflow: 'hidden' }}>
              {quoteSlides.map((s, i) => (
                <div
                  key={i}
                  className="testimonial_slide w-slide"
                  style={{
                    gridArea: '1 / 1',
                    opacity: i === activeIndex ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: i === activeIndex ? 'auto' : 'none',
                  }}
                >
                  <div className="testimonial_slide-content">
                    <p>{s.quote}</p>
                    <div className="testimonial_slide-bottom">
                      <img
                        src={s.image}
                        loading="lazy"
                        alt={s.alt}
                        className="testimonial_slide-image"
                      />
                      <div>
                        {s.name}<br />
                        <span className="text-style-muted">{s.detail}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dot navigation */}
            <div className="testimonial-slider_nav">
              {quoteSlides.map((_, i) => (
                <div
                  key={i}
                  className={`w-slider-dot${i === activeIndex ? ' w-active' : ''}`}
                  onClick={() => goTo(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

          </div>

          <div className="testimonial-slider_side">
            <div className="testimonial-slider_line-vertical" />
            <div className="testimonial-slider_line" />
          </div>

          {/* This style embed matches the original Webflow .w-embed child
              that sits as a sibling of .testimonial_slider inside the
              flex-column component.  The zero-height element adds one
              flex gap (16px), keeping the total section height identical. */}
          <div className="w-embed">
            <style dangerouslySetInnerHTML={{ __html: `
              .testimonial-slider_nav .w-slider-dot {
                width: 10px !important;
                height: 10px !important;
                border-radius: 0 !important;
                background-color: white !important;
                border: 1px solid #ccc !important;
                margin: 0 5px !important;
                cursor: pointer;
                display: inline-block;
              }
              .testimonial-slider_nav .w-slider-dot.w-active {
                background-color: #EA5B2F !important;
                border: none !important;
              }
            `}} />
          </div>
        </div>
      </div>
      <div className="testimonial_lines-component is-bottom">
        <div className="testimonial_lines-horizontal" />
        <div className="testimonial_lines-vertical is-longer" />
      </div>
    </section>
  );
}
