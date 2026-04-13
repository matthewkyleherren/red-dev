'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

function animateCount(el: HTMLElement) {
  if ((el as any)._counting) return;
  (el as any)._counting = true;

  const end = parseFloat(el.getAttribute('data-end') || '0') || 0;
  const start = 0;
  const duration = 1200;
  const ease = (t: number) => 1 - (1 - t) * (1 - t); // quadOut

  if (start === end) {
    el.textContent = String(end);
    return;
  }

  const startTime = performance.now();
  function tick(now: number) {
    const t = Math.min(1, (now - startTime) / duration);
    const eased = ease(t);
    const current = start + (end - start) * eased;
    el.textContent = String(Math.round(current));
    if (t < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = String(end);
      (el as any)._counting = false;
    }
  }
  requestAnimationFrame(tick);
}

export default function TrustpilotStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const observedRef = useRef(false);

  const initCounters = useCallback(() => {
    if (!sectionRef.current || observedRef.current) return;
    observedRef.current = true;

    const counters = sectionRef.current.querySelectorAll<HTMLElement>('[data-counter]');

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCount);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.2 }
    );

    counters.forEach((el) => {
      // Start with final value (matches original SSR markup); animation replays from 0
      observer.observe(el);
    });
  }, []);

  useEffect(() => {
    initCounters();
  }, [initCounters]);

  return (
    <section data-wf--trustpilot-section--variant="base" className="trustpilot_section" ref={sectionRef}>
      <div className="page-padding padding-section-large">
        <div className="container-large z-index-2">
          <div className="trustpilot_layout">
            <h2>
              &ldquo;I come every week. The combination of the light and the meditation is unlike anything else I&apos;ve tried. I sleep better, look better, and feel more like myself.&rdquo;
            </h2>
            <Link href="/how-it-works" className="trustpilot_reviews_wrap w-inline-block">
              <div className="text-size-large">Learn more</div>
              <div className="trustpilot_reviews_icon w-embed">
                <svg width="100%" height="100%" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.01221 12.4424H19.0122M19.0122 12.4424L12.0122 5.44238M19.0122 12.4424L12.0122 19.4424" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          </div>
          <div className="trustpilot_bottom_layout">
            <div className="trustpilot_bottom_card">
              <div className="trustpilot_bottom_number_wrap">
                <div data-end="122" data-counter="" className="trustpilot_bottom_number kpi1">122</div>
                <div className="trustpilot_bottom_percent">%</div>
              </div>
              <div className="trustpilot_bottom_par">
                <div className="trustpilot_bottom_text1">
                  increase in HRV observed<br />after consistent RLT sessions
                </div>
                <div className="trustpilot_bottom_text2">
                  increase in HRV observed after consistent RLT sessions
                </div>
              </div>
            </div>
            <div className="trustpilot_bottom_separator"></div>
            <div className="trustpilot_bottom_card is-middle">
              <div className="trustpilot_bottom_number_wrap">
                <div data-end="3" data-counter="" className="trustpilot_bottom_number kpi2">3</div>
                <div className="trustpilot_bottom_percent">–8 weeks</div>
              </div>
              <div className="trustpilot_bottom_par">
                <div className="trustpilot_bottom_text1">
                  for visible improvements<br />with 2–4 sessions per week
                </div>
                <div className="trustpilot_bottom_text2">
                  for visible improvements with 2–4 sessions per week
                </div>
              </div>
            </div>
            <div className="trustpilot_bottom_separator"></div>
            <div className="trustpilot_bottom_card">
              <div className="trustpilot_bottom_number_wrap">
                <div data-end="8000" data-counter="" className="trustpilot_bottom_number kpi3">8000</div>
                <div className="trustpilot_bottom_percent">+</div>
              </div>
              <div className="trustpilot_bottom_par">
                <div className="trustpilot_bottom_text1">
                  peer-reviewed studies<br />supporting photobiomodulation
                </div>
                <div className="trustpilot_bottom_text2">
                  peer-reviewed studies supporting photobiomodulation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
