'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

interface FaqGroup {
  title: string;
  items: FaqItem[];
}

const FAQ_GROUPS: FaqGroup[] = [
  {
    title: 'How it works',
    items: [
      {
        question: 'What should I expect during a blood draw?',
        answer: (
          <div className="text_rich-1 w-richtext">
            <ul role="list">
              <li>A trained phlebotomist will guide you through the process.</li>
              <li>A tourniquet is placed on your arm, the site is cleaned, and a small needle is used to collect blood into one or more tubes.</li>
              <li>Results are usually ready in about a week.</li>
              <li>Most people feel only a quick pinch.</li>
              <li>The needle is removed, gentle pressure is applied, and a bandage is placed.</li>
            </ul>
          </div>
        ),
      },
      {
        question: 'How do I prepare for a blood draw?',
        answer: (
          <div className="text_rich-1 w-richtext">
            <ul role="list">
              <li>Drink plenty of water beforehand — hydration makes veins easier to find.</li>
              <li>Wear loose sleeves so your arm is easy to access.</li>
              <li>Follow any fasting instructions you&#39;ve been given.</li>
              <li>Let us know if you&#39;re on medications, have fainted before, or have needle anxiety.</li>
            </ul>
          </div>
        ),
      },
      {
        question: 'What should I do after my blood draw?',
        answer: (
          <div className="text_rich-1 w-richtext">
            <ul role="list">
              <li>Press gently on the site for a few minutes.</li>
              <li>Keep the bandage on for 4-6 hours.</li>
              <li>Skip heavy lifting or strenuous exercise for the rest of the day.</li>
              <li>Drink extra water to rehydrate.</li>
              <li>Monitor the site for redness, swelling, or pain.</li>
            </ul>
          </div>
        ),
      },
      {
        question: 'How do I book a blood draw with Superpower?',
        answer: (
          <div className="text_rich-1 w-richtext">
            <p>Your membership includes:</p>
            <ul role="list">
              <li>An annual full body test and report across 100+ biomarkers</li>
              <li>A personalized action plan to optimize your biomarkers and reach your health goals</li>
              <li>A dashboard to centralize your health data and track changes across a lifetime</li>
              <li>Access to a health concierge for questions on your plan and help scheduling</li>
              <li>Plus a marketplace of curated health products and services at member pricing</li>
            </ul>
            <p>Many concierge clinics charge $10k – $100k for their services, we&#39;ve built technology to make the world&#39;s best healthcare as accessible as possible via an all-in-one membership.</p>
          </div>
        ),
      },
      {
        question: 'Where can I take my blood test?',
        answer: (
          <div className="accordion-content">
            <div className="accordion-content has-fixed-width">
              <p className="text-color-secondary margin-top margin-xsmall">
                Superpower is currently available in the following US states:
              </p>
              <div className="rich-text-block w-richtext">
                <ul role="list">
                  <li>Alabama</li>
                  <li>Arizona</li>
                  <li>California</li>
                  <li>Colorado</li>
                  <li>Connecticut</li>
                  <li>Delaware</li>
                  <li>District of Columbia</li>
                  <li>Florida</li>
                  <li>Georgia</li>
                  <li>Idaho</li>
                  <li>Illinois</li>
                  <li>Indiana</li>
                  <li>Kansas</li>
                  <li>Maine</li>
                  <li>Maryland</li>
                  <li>Massachusetts</li>
                  <li>Michigan</li>
                  <li>Minnesota</li>
                  <li>Missouri</li>
                  <li>Montana</li>
                  <li>Nebraska</li>
                  <li>Nevada</li>
                  <li>New Hampshire</li>
                  <li>New Jersey</li>
                  <li>New Mexico</li>
                  <li>New York</li>
                  <li>North Carolina</li>
                  <li>Ohio</li>
                  <li>Oklahoma</li>
                  <li>Oregon</li>
                  <li>Pennsylvania</li>
                  <li>South Carolina</li>
                  <li>Tennessee</li>
                  <li>Texas</li>
                  <li>Utah</li>
                  <li>Vermont</li>
                  <li>Virginia</li>
                  <li>Washington</li>
                  <li>West Virginia</li>
                  <li>Wisconsin</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    title: 'Our testing',
    items: [
      {
        question: 'Does Superpower replace my primary care provider?',
        answer: (
          <div className="text_rich-1 w-richtext">
            <p>Superpower specializes in prevention-based testing and treatments and is not intended for emergency or immediate health issues.</p>
            <p>While you will have a Superpower care team, your annual membership is designed to complement a primary care doctor if you have one, not replace them.</p>
            <p>We are happy to help you share any test results with an outside provider to ensure you receive well-rounded medical care.</p>
          </div>
        ),
      },
      {
        question: 'How fast are blood test results and how do I read them?',
        answer: (
          <div className="text_rich-1 w-richtext">
            <p>Your annual lab test panel takes about a week to process. We will text you as soon as they become available in your dashboard. Other types of tests may have different testing windows. The Superpower concierge is your own health assistant who helps answer your questions on your results, ensure smooth scheduling, coordination of any office-based tests and navigating you to interface with your care team.</p>
          </div>
        ),
      },
      {
        question: 'Does Superpower accept health insurance?',
        answer: (
          <div className="text_rich-1 w-richtext">
            <p>Superpower membership and products are all eligible for HSA/FSA funding.</p>
            <p>We see Superpower like a gym membership for those committed to prevention and performance. Superpower is a bridge between wellness and healthcare. Health insurance traditionally focuses on reactive care whereas, at Superpower, we believe it&#39;s never too early to start looking out for your long-term health.</p>
          </div>
        ),
      },
      {
        question: 'What if I want more than 1 blood test per year?',
        answer: (
          <div className="text_rich-1 w-richtext">
            <p>Absolutely — you&#39;re not limited to just one. Your membership includes one comprehensive 100+ biomarker blood test each year, but if you&#39;d like to track your progress more closely, you can add extra tests at any time. Each additional full-panel test come at an additional cost. You can order as many as you&#39;d like throughout the year.</p>
          </div>
        ),
      },
    ],
  },
];

function AccordionItem({ question, answer }: FaqItem) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Measure height when opened and keep it updated on resize
  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const el = contentRef.current;
    setContentHeight(el.scrollHeight);

    const ro = new ResizeObserver(() => {
      setContentHeight(el.scrollHeight);
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, [isOpen]);

  return (
    <div className="c-accordion-item">
      <div className="accordion_item-inner">
        <div
          className="accordion_item-question"
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: 'pointer' }}
        >
          <div className="accordion_item-text">
            <div className="text-size-large">{question}</div>
          </div>
          <div className="accordion_item-icon">
            <div className="_w-accordion-item-q-icon-2">
              <div className="accordion-item-q-icon-stripe-1-2" />
              <div
                className="accordion-item-q-icon-stripe-2-2"
                style={{
                  transform: isOpen ? 'rotate(90deg)' : 'none',
                  transition: 'transform 0.3s ease',
                }}
              />
            </div>
          </div>
        </div>
        <div
          ref={contentRef}
          className="accordion_item-answer"
          style={{
            maxHeight: isOpen ? `${contentHeight}px` : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.4s ease',
          }}
        >
          <div className="accordion_divider">
            <div className="accordion-content-divider-2" />
          </div>
          <div className="accordion_item-answer-wrapper">{answer}</div>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  return (
    <div data-wf--faq---short--variant="base" className="section_faqs-shorthand">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-small mobile-wrap">
            <div className="title_row is-2col">
              <h2 className="heading-style-h2">Frequently Asked Questions</h2>
              <Link
                href="/faqs"
                id="w-node-_007613da-9ba9-131d-965e-5e049df52f89-9df52f80"
                className="button is-alternate is-outlined w-button"
              >
                Read more
              </Link>
            </div>
            <div className="faq1_component" style={{ opacity: 1, visibility: 'visible' }}>
              {FAQ_GROUPS.map((group, gi) => (
                <div id="documentation" className="faq1_group" key={gi}>
                  <div className="faq1_left">
                    <div className="heading-style-h3">{group.title}</div>
                  </div>
                  <div className="faq1_right">
                    {group.items.map((item, ii) => (
                      <AccordionItem key={ii} question={item.question} answer={item.answer} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="pricing-card_testimonial">
              <div className="testimonial-profile-item flex-vertical-centre pricing-card">
                <img
                  loading="lazy"
                  src="/images/site/66ea2665dfdd42209bc636d9_profile-1.webp"
                  alt=""
                  className="testimonial-profile-3"
                />
                <div>
                  <p className="text-size-large margin-bottom margin-xxxsmall text-align-center">
                    &ldquo;Best health check of my entire life.&rdquo;
                  </p>
                  <p className="text-size-medium text-align-center text-color-secondary">
                    Vinay Hiremath, Founder of Loom
                  </p>
                </div>
              </div>
              <div className="testimonial-profile-item flex-vertical-centre pricing-card">
                <img
                  loading="lazy"
                  src="/images/site/66ea2665673dc4d1fdc4c9ff_profile-2.webp"
                  alt=""
                  className="testimonial-profile-3"
                />
                <div>
                  <p className="text-size-large margin-bottom margin-xxxsmall text-align-center">
                    &ldquo;Life changing&rdquo;
                  </p>
                  <p className="text-size-medium text-align-center text-color-secondary">
                    Jordi Hayes, Founder of Capital.xyz
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="padding-global">
        <div className="container-large" />
      </div>
    </div>
  );
}
