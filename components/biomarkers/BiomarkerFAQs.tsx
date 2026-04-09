'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: 'What Is biomarker testing?',
    answer: (
      <p>
        Biomarker testing is a laboratory analysis of genes, proteins, hormones,
        or other molecules in your blood or tissues to help assess your health,
        identify risk factors, or guide personalized care decisions. To learn
        more, read our{' '}
        <Link href="/biomarker-guides">guides on biomarker testing</Link>.
      </p>
    ),
  },
  {
    question: 'Why should I consider testing?',
    answer: (
      <p>
        Biomarker testing can identify hidden health risks, nutritional
        deficiencies, hormone levels, or early signs of disease &mdash; allowing
        for targeted lifestyle or medical interventions before symptoms develop.
        To learn more, read our guides on specific{' '}
        <Link href="/diseases">illnesses and diseases</Link> that biomarker
        testing can assist with.
      </p>
    ),
  },
  {
    question: 'Who can benefit from this?',
    answer: (
      <p>
        People interested in optimizing health, longevity, or athletic
        performance, men and women monitoring hormone status (including
        testosterone), or those with specific health concerns (like heart,
        thyroid, or metabolic health) all benefit from biomarker testing.
      </p>
    ),
  },
  {
    question: 'How Is a test performed wIth Superpower?',
    answer: (
      <p>
        Our biomarker tests at Superpower require a simple blood draw &mdash;
        either at home or in a clinic. Some other tests use additional samples
        like urine or saliva, depending on what is being measured.
      </p>
    ),
  },
  {
    question: 'Can biomarker testing assess my risk for specific diseases?',
    answer: (
      <p>
        Yes, certain biomarkers are linked to risks for cardiovascular disease,
        diabetes, hormone imbalances, metabolic syndrome, and even some cancers,
        enabling early and personalized prevention strategies.
      </p>
    ),
  },
  {
    question: 'How often should I repeat my test?',
    answer: (
      <p>
        For most people, testing every 6&ndash;12 months is recommended for
        ongoing monitoring and tracking changes in health or the effectiveness of
        interventions, though frequency can vary based on goals and medical
        advice.
      </p>
    ),
  },
];

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <article className="accordion__item">
      <button
        type="button"
        aria-expanded={isOpen ? 'true' : 'false'}
        className={`accordion__header${isOpen ? ' accordion__header--active' : ''}`}
        onClick={onToggle}
        style={{
          paddingBottom: isOpen ? '0.5rem' : '1rem',
          transition:
            'padding-bottom 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <span className="accordion__title">{item.question}</span>
        <span
          className={`accordion__icon${isOpen ? ' accordion__icon--active' : ''}`}
        />
      </button>
      <div
        className={`accordion__panel${isOpen ? ' accordion__panel--open' : ''}`}
        ref={panelRef}
        style={{
          maxHeight: isOpen ? `${panelRef.current?.scrollHeight || 500}px` : '0px',
          overflow: 'hidden',
          transition:
            'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          className={`accordion__content${isOpen ? ' accordion__content--visible' : ' accordion__content--hidden'}`}
        >
          <div className="accordion__text w-richtext">{item.answer}</div>
          <div className="accordion__slot" />
        </div>
      </div>
    </article>
  );
}

export default function BiomarkerFAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="section_faq2">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-small mobile-wrap vertical-5">
            <div className="faq_component-wrapper">
              <h2 className="heading-style-h2 is-h1-mobile">FAQs</h2>
              <div className="faq-new_component">
                <div className="accordion">
                  {faqs.map((faq, i) => (
                    <FAQAccordionItem
                      key={i}
                      item={faq}
                      isOpen={openIndex === i}
                      onToggle={() => handleToggle(i)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
