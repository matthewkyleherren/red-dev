'use client';

import { useState, useRef, useCallback } from 'react';

const slides = [
  { src: "https://assets.superpower.com/website/checkout/protocol-mockup.webp", alt: "Protocol mockup" },
  { src: "https://assets.superpower.com/website/checkout/test-tube-mockup.webp", alt: "Test tube mockup" },
  { src: "https://assets.superpower.com/website/checkout/marketplace-mockup.webp", alt: "Marketplace mockup" },
  { src: "https://assets.superpower.com/website/checkout/data-mockup.webp", alt: "Data mockup" },
];

export default function OrderSummaryCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold && currentSlide < slides.length - 1) {
      setCurrentSlide((s) => s + 1);
    } else if (diff < -threshold && currentSlide > 0) {
      setCurrentSlide((s) => s - 1);
    }
  }, [currentSlide]);

  return (
    <div className="w-full bg-neutral-50 border border-border rounded-2xl overflow-hidden">
      <section
        className="relative overflow-hidden"
        data-slot="carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-full" data-slot="carousel-content">
          <div>
            <div className="flex cursor-grab active:cursor-grabbing">
              {slides.map((slide, index) => (
                <fieldset
                  key={index}
                  aria-roledescription="slide"
                  data-slot="carousel-item"
                  className="min-w-0 shrink-0 grow-0 basis-full"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                    transition: 'transform 300ms ease-out',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full h-auto"
                  />
                </fieldset>
              ))}
            </div>
          </div>
        </div>
        <div
          className="flex duration-150 ease-out-expo opacity-0 hover:opacity-100 justify-end absolute bottom-4 inset-x-4 z-10"
          data-slot="carousel-dots"
        >
          <div className="flex items-center rounded-full px-4 py-2 bg-black/50 backdrop-blur gap-1.5">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`size-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/40'
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
