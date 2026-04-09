'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answerItems: string[];
  isRichText?: boolean;
}

interface FAQGroup {
  title: string;
  items: FAQItem[];
}

const faqGroups: FAQGroup[] = [
  {
    title: 'How it works',
    items: [
      {
        question: 'What should I expect during a blood draw?',
        answerItems: [
          'A trained phlebotomist will guide you through the process.',
          'A tourniquet is placed on your arm, the site is cleaned, and a small needle is used to collect blood into one or more tubes.',
          'Results are usually ready in about a week.',
          'Most people feel only a quick pinch.',
          'The needle is removed, gentle pressure is applied, and a bandage is placed.',
        ],
      },
      {
        question: 'How do I prepare for a blood draw?',
        answerItems: [
          'Drink plenty of water beforehand \u2014 hydration makes veins easier to find.',
          'Wear loose sleeves so your arm is easy to access.',
          "Follow any fasting instructions you've been given.",
          "Let us know if you're on medications, have fainted before, or have needle anxiety.",
        ],
      },
      {
        question: 'What should I do after my blood draw?',
        answerItems: [
          'Press gently on the site for a few minutes.',
          'Keep the bandage on for 4-6 hours.',
          'Skip heavy lifting or strenuous exercise for the rest of the day.',
          'Drink extra water to rehydrate.',
          'Monitor the site for redness, swelling, or pain.',
        ],
      },
      {
        question: 'How do I book a blood draw with Superpower?',
        answerItems: [
          'Your membership includes:',
          'An annual full body test and report across 100+ biomarkers',
          'A personalized action plan to optimize your biomarkers and reach your health goals',
          'A dashboard to centralize your health data and track changes across a lifetime',
          'Access to a health concierge for questions on your plan and help scheduling',
          'Plus a marketplace of curated health products and services cheaper than amazon',
          'Superpower tests over 100 biomarkers through our partnership with Quest Labs (~60 core markers) and our own specialty testing capabilities.',
          'Many concierge clinics charge $10k \u2013 $100k for their services, we\u2019ve built technology to make the world\u2019s best healthcare as accessible as possible via an all-in-one membership.',
        ],
      },
      {
        question: 'Where can I take my blood test?',
        answerItems: [
          'Superpower is currently available in the following US states:',
          'Alabama, Arizona, California, Colorado, Connecticut, Delaware, District of Columbia, Florida, Georgia, Idaho, Illinois, Indiana, Kansas, Maine, Maryland, Massachusetts, Michigan, Minnesota, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, Ohio, Oklahoma, Oregon, Pennsylvania, South Carolina, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin',
        ],
        isRichText: true,
      },
    ],
  },
  {
    title: 'Our testing',
    items: [
      {
        question: 'Does Superpower replace my primary care provider?',
        answerItems: [
          'Superpower specializes in prevention-based testing and treatments and is not intended for emergency or immediate health issues.',
          'While you will have a Superpower care team, your annual membership is designed to complement a primary care doctor if you have one, not replace them.',
          'We are happy to help you share any test results with an outside provider to ensure you receive well-rounded medical care.',
        ],
      },
      {
        question: 'How fast are blood test results and how do I read them?',
        answerItems: [
          'Your annual lab test panel takes about a week to process. We will text you as soon as they become available in your dashboard. Other types of tests may have different testing windows. The Superpower concierge is your own health assistant who helps answer your questions on your results, ensure smooth scheduling, coordination of any office-based tests and navigating you to interface with your care team.',
        ],
      },
      {
        question: 'Does Superpower accept health insurance?',
        answerItems: [
          'Superpower membership and products are all eligible for HSA/FSA funding.',
          'We see Superpower like a gym membership for those committed to prevention and performance. Superpower is a bridge between wellness and healthcare. Health insurance traditionally focuses on reactive care whereas, at Superpower, we believe it\u2019s never too early to start looking out for your long-term health.',
        ],
      },
      {
        question: 'What if I want more than 1 blood test per year?',
        answerItems: [
          "Absolutely \u2014 you're not limited to just one. Your membership includes one comprehensive 100+ biomarker blood test each year, but if you'd like to track your progress more closely, you can add extra tests at any time. Each additional full-panel test come at an additional cost. You can order as many as you'd like throughout the year.",
        ],
      },
    ],
  },
];

function AccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Measure height when opened and keep it updated on resize
  useEffect(() => {
    if (!open || !contentRef.current) return;

    const el = contentRef.current;
    setContentHeight(el.scrollHeight);

    const ro = new ResizeObserver(() => {
      setContentHeight(el.scrollHeight);
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, [open]);

  return (
    <div className="c-accordion-item">
      <div className="accordion_item-inner">
        <div className="accordion_item-question" onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
          <div className="accordion_item-text">
            <div className="text-size-large">{item.question}</div>
          </div>
          <div className="accordion_item-icon">
            <div className="_w-accordion-item-q-icon-2">
              <div
                className="accordion-item-q-icon-stripe-1-2"
                style={{
                  transition: 'transform 0.3s ease',
                  transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
              ></div>
              <div
                className="accordion-item-q-icon-stripe-2-2"
                style={{
                  transition: 'transform 0.3s ease',
                  transform: open ? 'rotate(-45deg)' : 'rotate(0deg)',
                }}
              ></div>
            </div>
          </div>
        </div>
        <div
          ref={contentRef}
          className="accordion_item-answer"
          style={{
            maxHeight: open ? `${contentHeight}px` : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.4s ease',
          }}
        >
          <div className="accordion_divider">
            <div className="accordion-content-divider-2"></div>
          </div>
          <div className="accordion_item-answer-wrapper">
            <div className={`${item.isRichText ? 'rich-text-block' : 'text_rich-1'} w-richtext`}>
              <ul role="list">
                {item.answerItems.map((text, i) => (
                  <li key={i}>{text}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <div data-wf--faq---short--variant="base" className="section_faqs-shorthand">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-small mobile-wrap">
            <div className="title_row is-2col">
              <h2 className="heading-style-h2">Frequently Asked Questions</h2>
              <Link href="/faqs" id="w-node-_007613da-9ba9-131d-965e-5e049df52f89-9df52f80" className="button is-alternate is-outlined w-button">
                Read more
              </Link>
            </div>
            <div className="faq1_component">
              {faqGroups.map((group, gi) => (
                <div key={gi} id="documentation" className="faq1_group">
                  <div className="faq1_left">
                    <div className="heading-style-h3">{group.title}</div>
                  </div>
                  <div className="faq1_right">
                    {group.items.map((item, ii) => (
                      <AccordionItem key={ii} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
