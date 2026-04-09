'use client';

import { useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Accordion FAQ items from the original reviews page's old pricing  */
/*  section (section_membership-current).  These appear below the     */
/*  membership info/CTA and above the separate FAQ section.           */
/* ------------------------------------------------------------------ */

interface AccordionItem {
  question: string;
  answer: React.ReactNode;
  borderBottom?: boolean;
}

const items: AccordionItem[] = [
  {
    question: "What's included exactly?",
    answer: (
      <div className="margin-top margin-xsmall">
        <p className="text-color-secondary">Your membership includes:</p>
        <ul role="list" className="faq_list-wrapper">
          <li className="faq-list">Annual full body testing across 100+ biomarkers</li>
          <li className="faq-list">A custom action plan built on your biology and goals</li>
          <li className="faq-list">17 health scores and your biological age</li>
          <li className="faq-list">Al Chat to dig deeper into your data</li>
        </ul>
        <p className="text-color-secondary">
          Many concierge clinics charge $10k &ndash; $100k for their services, we&apos;ve built
          technology to make the world&apos;s best healthcare as accessible as possible.
        </p>
      </div>
    ),
  },
  {
    question: 'Where do I go for testing?',
    answer: (
      <div className="margin-top margin-xsmall">
        <p className="text-size-regular text-color-secondary">
          You will be able to schedule a 15 minute appointment (blocked out just for you) at one of
          our partner clinics. At home visits can also be scheduled for an additional fee.
        </p>
      </div>
    ),
  },
  {
    question: 'Why is Superpower different?',
    answer: (
      <div className="margin-top margin-xsmall">
        <ul role="list" className="faq_list-wrapper">
          <li className="faq-list">Understand your results in a beautiful dashboard</li>
          <li className="faq-list">
            24/7 message access to a concierge care team, with answers within 24 hours on weekdays
          </li>
          <li className="faq-list">Lab draw at-home option (extra charge)</li>
          <li className="faq-list">
            Only one draw needed rather than two thanks to our partnership with Quest
          </li>
          <li className="faq-list">
            Discounted access to our supplement marketplace. Highly curated brands at big savings for
            the lifetime of your membership
          </li>
          <li className="faq-list">Personalized action plan</li>
          <li className="faq-list">AI chat with all of your data</li>
        </ul>
      </div>
    ),
  },
  {
    question: 'Do I need insurance?',
    answer: (
      <div className="margin-top margin-xsmall">
        <p className="text-size-regular text-color-secondary">
          No insurance needed. One flat fee, no co-pays or surprise charges. HSA/FSA cards accepted.
        </p>
      </div>
    ),
  },
  {
    question: 'Does Superpower replace my primary care provider?',
    answer: (
      <div className="margin-top margin-xsmall">
        <p className="text-size-regular text-color-secondary">
          Superpower specializes in prevention-based testing and treatments and is not intended for
          emergency or immediate health issues.
          <br />
          While you will have a Superpower concierge, your annual membership is designed to
          complement a primary care doctor if you have one, not replace them.
          <br />
          We are happy to help you share any test results with an outside provider to ensure you
          receive well-rounded medical care.
        </p>
      </div>
    ),
  },
  {
    question: "Why can't I order these tests with my doctor?",
    answer: (
      <div className="margin-top margin-xsmall">
        <p className="text-size-regular text-color-secondary">
          Most primary care doctors aren&apos;t trained to run this kind of advanced testing. We&apos;ve
          negotiated special lab rates so we can offer 100+ tests at a fraction of the usual cost
          &mdash; often 1/4th the price.
        </p>
      </div>
    ),
    borderBottom: true,
  },
];

export default function PricingAccordionFaqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="accordion-item-wrapper tabs-accordion bottom-faq faq">
      {items.map((item, i) => (
        <div
          key={i}
          className={`accordion-item is-home${item.borderBottom ? ' is-border-bottom' : ''}`}
        >
          <div
            className="accordion-trigger"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            style={{ cursor: 'pointer' }}
          >
            <div className="text-size-regular">{item.question}</div>
            <div className="open-close-icon-wrapper---brix">
              <div className="open-close-line---brix-2" />
              <div
                className="open-close-line---brix-2 second-line---brix"
                style={{
                  transform: openIndex === i ? 'rotate(0deg)' : 'rotate(90deg)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </div>
          </div>
          <div
            className="accordion-content is-padding max-width-large"
            style={{
              overflow: 'hidden',
              maxHeight: openIndex === i ? '600px' : '0px',
              opacity: openIndex === i ? 1 : 0,
              transition: 'max-height 0.3s ease, opacity 0.3s ease',
            }}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  );
}
