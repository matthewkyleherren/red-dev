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
    title: 'About red light therapy',
    items: [
      {
        question: 'What is red light therapy?',
        answerItems: [
          'Red light therapy (RLT) is a non-invasive therapy that uses specific wavelengths of visible red light (630\u2013660nm) and near-infrared light (810\u2013850nm) to penetrate the skin and stimulate cellular function.',
          'Applications include pain management, skin rejuvenation, muscle recovery, hormonal support, and cognitive health.',
        ],
      },
      {
        question: 'How does it work scientifically?',
        answerItems: [
          'Red and near-infrared light is absorbed by the mitochondria \u2014 the energy centres of your cells.',
          'This stimulates cytochrome c oxidase, boosting ATP (adenosine triphosphate) production, which drives more efficient cellular function, reduced inflammation, and faster tissue repair.',
        ],
      },
      {
        question: 'How often should I come, and how quickly will I see results?',
        answerItems: [
          'For best results, 2\u20134 sessions per week is recommended.',
          'Many members notice immediate effects \u2014 calm, reduced tension, improved mood \u2014 after their first session.',
          'Visible improvements to skin, sleep, and inflammation typically reveal themselves over 3\u20138 weeks of consistent use.',
        ],
      },
      {
        question: 'What should I wear? Do I need to prepare?',
        answerItems: [
          'The more skin you expose, the more light your body can absorb \u2014 but wear whatever makes you most comfortable.',
          'The light produces no thermal heat, so there\u2019s no need to shower afterwards.',
          'Remove makeup for maximum skin penetration, though the wavelengths will still penetrate through it.',
          'You don\u2019t need to bring anything except yourself.',
        ],
      },
    ],
  },
  {
    title: 'Your experience',
    items: [
      {
        question: "What's the difference between the 11 and 22 minute experiences?",
        answerItems: [
          'The 11-minute signature experience delivers our core full-body RLT session with a guided meditation.',
          'The 22-minute extended experience offers deeper relaxation, more light exposure, and a longer meditation \u2014 ideal for recovery, stress relief, or simply treating yourself.',
        ],
      },
      {
        question: 'Can red light therapy improve my skin?',
        answerItems: [
          'Yes. RLT stimulates fibroblasts \u2014 the skin cells responsible for producing collagen and elastin \u2014 while improving blood circulation and reducing oxidative stress.',
          'Consistent use leads to smoother texture, reduced fine lines, more even skin tone, and faster wound healing.',
        ],
      },
      {
        question: 'Does it help with sleep?',
        answerItems: [
          'Red light helps regulate circadian rhythms and supports melatonin production \u2014 unlike blue light, which disrupts it.',
          'The combination of RLT and guided meditation also calms the nervous system, making evening sessions particularly effective for winding down.',
        ],
      },
      {
        question: 'Is it safe during pregnancy?',
        answerItems: [
          'RLT is generally considered safe and non-invasive, but we recommend avoiding direct exposure over the abdomen or lower back during pregnancy.',
          'Please consult your healthcare provider before booking.',
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
