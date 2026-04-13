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
    title: 'About red light therapy',
    items: [
      {
        question: 'What is red light therapy?',
        answer: (
          <div className="text_rich-1 w-richtext">
            <p>Red light therapy (RLT) is a non-invasive therapy that uses specific wavelengths of visible red light (630–660nm) and near-infrared light (810–850nm) to penetrate the skin and stimulate cellular function.</p>
            <p>Applications include pain management, skin rejuvenation, muscle recovery, hormonal support, and cognitive health.</p>
          </div>
        ),
      },
      {
        question: 'How does it work scientifically?',
        answer: (
          <div className="text_rich-1 w-richtext">
            <p>Red and near-infrared light is absorbed by the mitochondria — the energy centres of your cells. This stimulates cytochrome c oxidase, boosting ATP (adenosine triphosphate) production, which drives more efficient cellular function, reduced inflammation, and faster tissue repair.</p>
          </div>
        ),
      },
      {
        question: 'How often should I come, and how quickly will I see results?',
        answer: (
          <div className="text_rich-1 w-richtext">
            <p>For best results, 2–4 sessions per week is recommended.</p>
            <p>Many members notice immediate effects — calm, reduced tension, improved mood — after their first session. Visible improvements to skin, sleep, and inflammation typically reveal themselves over 3–8 weeks of consistent use.</p>
          </div>
        ),
      },
      {
        question: 'What should I wear? Do I need to prepare?',
        answer: (
          <div className="text_rich-1 w-richtext">
            <p>The more skin you expose, the more light your body can absorb — but wear whatever makes you most comfortable.</p>
            <p>The light produces no thermal heat, so there&#39;s no need to shower afterwards. Remove makeup for maximum skin penetration, though the wavelengths will still penetrate through it.</p>
            <p>You don&#39;t need to bring anything except yourself.</p>
          </div>
        ),
      },
    ],
  },
  {
    title: 'Your experience',
    items: [
      {
        question: "What's the difference between the 11 and 22 minute experiences?",
        answer: (
          <div className="text_rich-1 w-richtext">
            <p>The 11-minute signature experience delivers our core full-body RLT session with a guided meditation.</p>
            <p>The 22-minute extended experience offers deeper relaxation, more light exposure, and a longer meditation — ideal for recovery, stress relief, or simply treating yourself.</p>
          </div>
        ),
      },
      {
        question: 'Can red light therapy improve my skin?',
        answer: (
          <div className="text_rich-1 w-richtext">
            <p>Yes. RLT stimulates fibroblasts — the skin cells responsible for producing collagen and elastin — while improving blood circulation and reducing oxidative stress.</p>
            <p>Consistent use leads to smoother texture, reduced fine lines, more even skin tone, and faster wound healing.</p>
          </div>
        ),
      },
      {
        question: 'Does it help with sleep?',
        answer: (
          <div className="text_rich-1 w-richtext">
            <p>Red light helps regulate circadian rhythms and supports melatonin production — unlike blue light, which disrupts it.</p>
            <p>The combination of RLT and guided meditation also calms the nervous system, making evening sessions particularly effective for winding down.</p>
          </div>
        ),
      },
      {
        question: 'Is it safe during pregnancy?',
        answer: (
          <div className="text_rich-1 w-richtext">
            <p>RLT is generally considered safe and non-invasive, but we recommend avoiding direct exposure over the abdomen or lower back during pregnancy.</p>
            <p>Please consult your healthcare provider before booking.</p>
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
                    &ldquo;The combination of the light and the meditation is unlike anything else.&rdquo;
                  </p>
                  <p className="text-size-medium text-align-center text-color-secondary">
                    Studio member, Zurich
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
                    &ldquo;I sleep better, look better, and feel more like myself.&rdquo;
                  </p>
                  <p className="text-size-medium text-align-center text-color-secondary">
                    Studio member, Zurich
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
