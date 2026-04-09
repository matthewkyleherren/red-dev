'use client';

import { useEffect, useRef } from 'react';

const CheckmarkIcon = () => (
  <div className="icon-1x1-xxxsmall w-embed">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_306_4716)">
        <path
          d="M14.5341 6.66666C14.8385 8.16086 14.6215 9.71427 13.9193 11.0679C13.2171 12.4214 12.072 13.4934 10.6751 14.1049C9.27816 14.7164 7.71382 14.8305 6.24293 14.4282C4.77205 14.026 3.48353 13.1316 2.59225 11.8943C1.70097 10.657 1.26081 9.15148 1.34518 7.62892C1.42954 6.10635 2.03332 4.65872 3.05583 3.52744C4.07835 2.39616 5.45779 1.64961 6.96411 1.4123C8.47043 1.17498 10.0126 1.46123 11.3334 2.22333M6.00007 7.33333L8.00007 9.33333L14.6667 2.66666"
          stroke="#FC5F2B"
          strokeWidth="1.45833"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_306_4716">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </div>
);

interface TimelineStepProps {
  imageSrc: string;
  imageSrcSet: string;
  imageSizes?: string;
  label: string;
  heading: string;
  description: string;
  checks: string[];
  isLast?: boolean;
}

function TimelineStep({ imageSrc, imageSrcSet, imageSizes, label, heading, description, checks, isLast }: TimelineStepProps) {
  return (
    <div className={`hiw-timeline_item${isLast ? ' is-last' : ''}`}>
      <div className="hiw_item-wrapper">
        <img
          src={imageSrc}
          loading="lazy"
          sizes={imageSizes || '100vw'}
          srcSet={imageSrcSet}
          alt=""
          className="image_cover-absolute"
        />
      </div>
      <div className="hiw_item-label-wrapper">
        <div className="hiw_label">{label}</div>
      </div>
      <div className="hiw_item-text-wrapper">
        <h3 className="heading-style-h2">{heading}</h3>
        <p className="text-size-large">{description}</p>
        <div className="checkmark_wrapper">
          {checks.map((text, i) => (
            <div className="checkmark_item" key={i}>
              <CheckmarkIcon />
              <div>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HiwTimeline() {
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only apply scroll-based fading on desktop where items are position:sticky
    const mql = window.matchMedia('(min-width: 992px)');
    if (!mql.matches) return;

    const component = componentRef.current;
    if (!component) return;

    const items = component.querySelectorAll<HTMLElement>('.hiw-timeline_item');
    if (items.length === 0) return;

    function handleScroll() {
      const viewportTop = window.scrollY + window.innerHeight * 0.25; // sticky top position

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const itemTop = rect.top + window.scrollY;
        const itemBottom = itemTop + rect.height;

        if (index < items.length - 1) {
          // For non-last items: fade out as the next item scrolls into view
          const nextItem = items[index + 1];
          const nextRect = nextItem.getBoundingClientRect();
          const nextItemTop = nextRect.top + window.scrollY;

          // Start fading when next item begins entering (its top reaches viewport)
          // Fully faded when next item is fully stuck
          const fadeStart = nextItemTop - window.innerHeight;
          const fadeEnd = nextItemTop - window.innerHeight * 0.25;

          if (window.scrollY >= fadeEnd) {
            item.style.opacity = '0';
            item.style.pointerEvents = 'none';
          } else if (window.scrollY > fadeStart) {
            const progress = (window.scrollY - fadeStart) / (fadeEnd - fadeStart);
            item.style.opacity = String(1 - progress);
            item.style.pointerEvents = 'none';
          } else {
            item.style.opacity = '1';
            item.style.pointerEvents = '';
          }
        } else {
          // Last item always visible
          item.style.opacity = '1';
        }
      });
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="section_hiw-timeline">
      <div className="page-padding padding-section-large">
        <div className="container-large z-index-2">
          <div className="title_row is-centered2">
            <div className="text-size-medium text-style-muted">No more wait times for your health</div>
            <h2 className="heading-style-h1">Get clarity at every step</h2>
          </div>
          <div className="hiw-timeline_component" ref={componentRef}>
            <div className="hiw-timeline_line-wrapper">
              <div className="hiw-timeline_line-top" />
              <div className="hiw-timeline_line">
                <div className="hiw-timeline_line-inner" />
              </div>
            </div>

            <TimelineStep
              imageSrc="/images/site/68f1118730505995cc94b69e_frame%201597885600%20(1).avif"
              imageSrcSet="/images/site/68f1118730505995cc94b69e_frame%201597885600%20(1)-p-500.avif 500w, /images/site/68f1118730505995cc94b69e_frame%201597885600%20(1).avif 1542w"
              imageSizes="(max-width: 1542px) 100vw, 1542px"
              label="Today"
              heading="Book your lab test"
              description="Schedule your annual blood draw through the app. Take it in the comfort of your home or at one of 2,000 Quest Diagnostics lab locations."
              checks={[
                '100+ biomarkers in 1 blood draw',
                'Test completed in 15 min',
                'HSA/FSA eligible',
              ]}
            />

            <TimelineStep
              imageSrc="/images/site/68df1a0132ce434cf3c4c4a4_frame%201597885626.avif"
              imageSrcSet="/images/site/68df1a0132ce434cf3c4c4a4_frame%201597885626-p-500.avif 500w, /images/site/68df1a0132ce434cf3c4c4a4_frame%201597885626-p-800.avif 800w, /images/site/68df1a0132ce434cf3c4c4a4_frame%201597885626-p-1080.avif 1080w, /images/site/68df1a0132ce434cf3c4c4a4_frame%201597885626.avif 2056w"
              label="Day 5"
              heading="Understand your results"
              description="Your results in a clear, easy-to-read dashboard with each biomarker explained. Easily track your health across tests, to see the impact of your choices."
              checks={[
                'No medical jargon or PDFs',
                'Understand your results',
                'Upload past medical records',
              ]}
            />

            <TimelineStep
              imageSrc="/images/site/68df1a2cc8140ea958b0a37c_frame%201597885625.avif"
              imageSrcSet="/images/site/68df1a2cc8140ea958b0a37c_frame%201597885625-p-500.avif 500w, /images/site/68df1a2cc8140ea958b0a37c_frame%201597885625-p-800.avif 800w, /images/site/68df1a2cc8140ea958b0a37c_frame%201597885625.avif 2056w"
              label="Day 10"
              heading="Take action"
              description="Your personalized health plan gives you step-by-step how to improve your health, through changes in your diet, fitness and lifestyle."
              checks={[
                'Custom supplement plan',
                'Actionable recommendations',
                'Clear next steps',
              ]}
              isLast
            />
          </div>
        </div>
      </div>
    </section>
  );
}
