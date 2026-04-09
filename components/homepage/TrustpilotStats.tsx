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
              &ldquo;Superpower gave me what no doctor, supplement, or app ever could: clarity. If you&apos;re tired of vague advice and want real insight into your body, it&apos;s worth it.&rdquo;
            </h2>
            <Link href="/reviews" className="trustpilot_reviews_wrap w-inline-block">
              <div className="text-size-large">Read reviews</div>
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
                <div data-end="63" data-counter="" className="trustpilot_bottom_number kpi1">63</div>
                <div className="trustpilot_bottom_percent">%</div>
              </div>
              <div className="trustpilot_bottom_par">
                <div className="trustpilot_bottom_text1">
                  <span className="text-style-muted">of members find</span><br />early risk factors for diabetes
                </div>
                <div className="trustpilot_bottom_text2">
                  <span className="text-style-muted">of members find</span> early risk factors for diabetes
                </div>
              </div>
            </div>
            <div className="trustpilot_bottom_separator"></div>
            <div className="trustpilot_bottom_card is-middle">
              <div className="trustpilot_bottom_number_wrap">
                <div data-end="44" data-counter="" className="trustpilot_bottom_number kpi2">44</div>
                <div className="trustpilot_bottom_percent">%</div>
              </div>
              <div className="trustpilot_bottom_par">
                <div className="trustpilot_bottom_text1">
                  <span className="text-style-muted">of members find</span><br />elevated heart disease risk
                </div>
                <div className="trustpilot_bottom_text2">
                  <span className="text-style-muted">of members find</span> elevated heart disease risk
                </div>
              </div>
            </div>
            <div className="trustpilot_bottom_separator"></div>
            <div className="trustpilot_bottom_card">
              <div className="trustpilot_bottom_number_wrap">
                <div data-end="70" data-counter="" className="trustpilot_bottom_number kpi3">70</div>
                <div className="trustpilot_bottom_percent">%</div>
              </div>
              <div className="trustpilot_bottom_par">
                <div className="trustpilot_bottom_text1">
                  <span className="text-style-muted">of members slow</span><br />their speed of ageing
                </div>
                <div className="trustpilot_bottom_text2">
                  <span className="text-style-muted">of members</span> slow their speed of aging
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
