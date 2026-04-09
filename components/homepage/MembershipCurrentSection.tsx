'use client';

import { useState } from 'react';
import Link from 'next/link';

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="13" viewBox="0 0 17 13" fill="none">
    <path d="M1 6.11887L6.19766 11.5967L16 1.59668" stroke="#FC5F2B" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GrayCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path d="M13.8334 4.09668L6.50002 11.43L3.16669 8.09668" stroke="#71717A" strokeWidth="1.45833" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HSAIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
    <g clipPath="url(#clip0_mc_1)">
      <path d="M15.034 6.76334C15.3385 8.25754 15.1215 9.81095 14.4192 11.1645C13.717 12.5181 12.5719 13.59 11.175 14.2016C9.7781 14.8131 8.21376 14.9272 6.74287 14.5249C5.27199 14.1226 3.98347 13.2283 3.09219 11.991C2.20091 10.7536 1.76075 9.24816 1.84511 7.7256C1.92948 6.20303 2.53326 4.7554 3.55577 3.62412C4.57829 2.49284 5.95773 1.74629 7.46405 1.50897C8.97037 1.27166 10.5125 1.55791 11.8333 2.32001M6.50001 7.43001L8.5 9.43001L15.1667 2.76334" stroke="#71717A" strokeWidth="1.45833" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_mc_1">
        <rect width="16" height="16" fill="white" transform="translate(0.5 0.0966797)" />
      </clipPath>
    </defs>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
    <g clipPath="url(#clip0_mc_2)">
      <path d="M5.83333 1.42969V4.09635M11.1667 1.42969V4.09635M14.5 9.42969V4.09635C14.5 3.74273 14.3595 3.40359 14.1095 3.15355C13.8594 2.9035 13.5203 2.76302 13.1667 2.76302H3.83333C3.47971 2.76302 3.14057 2.9035 2.89052 3.15355C2.64048 3.40359 2.5 3.74273 2.5 4.09635V13.4297C2.5 13.7833 2.64048 14.1224 2.89052 14.3725C3.14057 14.6225 3.47971 14.763 3.83333 14.763H9.16667M2.5 6.76302H14.5M11.1667 13.4297L12.5 14.763L15.1667 12.0964" stroke="#71717A" strokeWidth="1.45833" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_mc_2">
        <rect width="16" height="16" fill="white" transform="translate(0.5 0.0966797)" />
      </clipPath>
    </defs>
  </svg>
);

const tabs = [
  {
    id: 'Tab 1',
    type: 'card' as const,
  },
  {
    id: 'Tab 2',
    type: 'image' as const,
    src: '/images/site/68735de708e980d387732463_membership-sku-2.avif',
    srcSet: '/images/site/68735de708e980d387732463_membership-sku-2-p-500.avif 500w, /images/site/68735de708e980d387732463_membership-sku-2.avif 789w',
  },
  {
    id: 'Tab 3',
    type: 'image' as const,
    src: '/images/site/688a8c0fd46fba51230bdfcc_image%20(6).avif',
    srcSet: '/images/site/688a8c0fd46fba51230bdfcc_image%20(6)-p-500.avif 500w, /images/site/688a8c0fd46fba51230bdfcc_image%20(6)-p-800.avif 800w, /images/site/688a8c0fd46fba51230bdfcc_image%20(6).avif 1052w',
  },
  {
    id: 'Tab 4',
    type: 'image' as const,
    src: '/images/site/68a4d57ea732f68822a4d11e_image%20(13).avif',
    srcSet: '/images/site/68a4d57ea732f68822a4d11e_image%20(13)-p-500.avif 500w, /images/site/68a4d57ea732f68822a4d11e_image%20(13)-p-800.avif 800w, /images/site/68a4d57ea732f68822a4d11e_image%20(13).avif 1044w',
    alt: 'A smartphone displays health app results, showing biomarker summary, superpower score, and biological age details.',
  },
  {
    id: 'Tab 5',
    type: 'image' as const,
    src: '/images/site/691b435b09ee408729527dd3_marketplace-white-bg.avif',
    srcSet: '/images/site/691b435b09ee408729527dd3_marketplace-white-bg-p-500.avif 500w, /images/site/691b435b09ee408729527dd3_marketplace-white-bg-p-800.avif 800w, /images/site/691b435b09ee408729527dd3_marketplace-white-bg.avif 1578w',
  },
];

const thumbnails = [
  {
    id: 'Tab 1',
    src: '/images/site/68735de71136bc431f931f0a_membership-sku-1.avif',
    srcSet: '/images/site/68735de71136bc431f931f0a_membership-sku-1-p-500.avif 500w, /images/site/68735de71136bc431f931f0a_membership-sku-1.avif 798w',
    sizes: '(max-width: 479px) 100vw, (max-width: 867px) 92vw, 798px',
  },
  {
    id: 'Tab 2',
    src: '/images/site/688046649437614ee5ce9828_sku%20frame%202.avif',
    srcSet: '/images/site/688046649437614ee5ce9828_sku%20frame%202-p-500.avif 500w, /images/site/688046649437614ee5ce9828_sku%20frame%202.avif 1052w',
    sizes: '(max-width: 479px) 100vw, (max-width: 767px) 92vw, (max-width: 1119px) 94vw, 1052px',
  },
  {
    id: 'Tab 3',
    src: '/images/site/688a8c0fd46fba51230bdfcc_image%20(6).avif',
    srcSet: '/images/site/688a8c0fd46fba51230bdfcc_image%20(6)-p-500.avif 500w, /images/site/688a8c0fd46fba51230bdfcc_image%20(6)-p-800.avif 800w, /images/site/688a8c0fd46fba51230bdfcc_image%20(6).avif 1052w',
    sizes: '(max-width: 479px) 100vw, (max-width: 857px) 92vw, 789px',
  },
  {
    id: 'Tab 4',
    src: '/images/site/68a4d57ea732f68822a4d11e_image%20(13).avif',
    srcSet: '/images/site/68a4d57ea732f68822a4d11e_image%20(13)-p-500.avif 500w, /images/site/68a4d57ea732f68822a4d11e_image%20(13)-p-800.avif 800w, /images/site/68a4d57ea732f68822a4d11e_image%20(13).avif 1044w',
    sizes: '(max-width: 479px) 100vw, (max-width: 857px) 92vw, 789px',
    alt: 'A smartphone displays health app results, showing biomarker summary, superpower score, and biological age details.',
  },
  {
    id: 'Tab 5',
    src: '/images/site/691b435b09ee408729527dd3_marketplace-white-bg.avif',
    srcSet: '/images/site/691b435b09ee408729527dd3_marketplace-white-bg-p-500.avif 500w, /images/site/691b435b09ee408729527dd3_marketplace-white-bg-p-800.avif 800w, /images/site/691b435b09ee408729527dd3_marketplace-white-bg.avif 1578w',
    sizes: '(max-width: 479px) 100vw, (max-width: 767px) 92vw, (max-width: 991px) 94vw, (max-width: 1643px) 96vw, 1578px',
  },
];

export default function MembershipCurrentSection({ children }: { children?: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('Tab 1');

  return (
    <div id="gruns-control" className="section_membership-current">
      <div className="page-padding">
        <div className="container-large">
          <div className="home-membership_component">
            {/* Left: image tabs */}
            <div className="membership_left">
              <div
                data-current="Tab 1"
                data-easing="ease"
                data-duration-in="300"
                data-duration-out="100"
                className="membership_tab-component w-tabs"
              >
                <div className="membership_tabs-conent w-tab-content">
                  {tabs.map((tab) => (
                    <div
                      key={tab.id}
                      data-w-tab={tab.id}
                      className={`membership_tab-pane w-tab-pane${activeTab === tab.id ? ' w--tab-active' : ''}`}
                    >
                      {tab.type === 'card' ? (
                        <div className="membership_tab-conten is-card">
                          <div className="image-wrap_outer is-scale-down">
                            <div className="image-wrap funding welcome">
                              <div className="members-card small">
                                <div>
                                  <img
                                    width="162"
                                    loading="lazy"
                                    alt=""
                                    src="/images/site/65b8e9361ddcca5331c27b74_sp-logo.svg"
                                  />
                                  <h3 className="heading-style-h4 text-color-white small">membership</h3>
                                </div>
                                <div className="div-block-209">
                                  <div className="div-block-208">
                                    <h1 className="text-color-white pricing">$17</h1>
                                    <div className="text-size-medium text-color-white pricing-mo">/month</div>
                                  </div>
                                  <div className="text-color-white text-size-medium">Billed annually at $199</div>
                                </div>
                              </div>
                              <div className="shine vertical"></div>
                              <div className="shine small"></div>
                              <div className="image-wrap_overlay1"></div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="membership_tab-conten">
                          <img
                            sizes="100vw"
                            srcSet={tab.srcSet}
                            alt={tab.alt || ''}
                            src={tab.src}
                            className="membership_main-image"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="membership_tab-menu w-tab-menu">
                  {thumbnails.map((thumb) => (
                    <a
                      key={thumb.id}
                      data-w-tab={thumb.id}
                      className={`membership_tab-link w-inline-block w-tab-link${activeTab === thumb.id ? ' w--current' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab(thumb.id);
                      }}
                      href="#"
                    >
                      <img
                        sizes={thumb.sizes}
                        srcSet={thumb.srcSet}
                        alt={thumb.alt || ''}
                        src={thumb.src}
                        className="membership_thumbnail"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: pricing details */}
            <div className="membership-right">
              <div className="membership_header">
                <div className="text-size-large text-color-secondary">
                  What could cost you $15,000 is <span className="text_price-display-annual">$199</span>
                </div>
                <h2 className="heading-style-h1">
                  Superpower<br />Membership
                </h2>
              </div>
              <div className="text-size-large">
                Your membership includes one comprehensive blood draw each year, covering 100+ biomarkers in a single collection
              </div>
              <div className="membership_checklist">
                {[
                  'One appointment, one draw for your annual panel.',
                  '100+ biomarkers per year',
                  'A personalized plan that evolves with you',
                  'Get your biological age and track your health over a lifetime',
                ].map((text, i) => (
                  <div key={i} className="membershp_checklist-row">
                    <div className="icon-embed-small w-embed">
                      <CheckIcon />
                    </div>
                    <div className="text-size-large text-color-secondary">{text}</div>
                  </div>
                ))}
              </div>
              <div className="membership_price">
                <div className="div-block-243">
                  <div className="text-size-large dollar-sign">$</div>
                </div>
                <div className="membership_price-number text_price-display-annual">17</div>
                <div className="div-block-242">
                  <div className="text-size-large text-color-secondary">/month</div>
                  <div className="circle-dot"></div>
                  <div className="text-size-large text-color-secondary">billed annually</div>
                </div>
              </div>
              <div className="membership_nj-row">
                <div className="text-size-small text-color-secondary text-align-center">
                  Pricing for members in NY &amp; NJ is $399 with 90+ biomarkers tested.
                </div>
              </div>
              <div className="membership_flexible-payments">
                <div className="text-style-muted">Flexible payment options</div>
                <img
                  src="/images/site/68bf5ab8ebd836a9d9b6398d_frame%20(1).avif"
                  loading="lazy"
                  alt="Four credit card logos: HSA/FSA Eligible, American Express, Visa, and Mastercard."
                  className="membership_flexible-img"
                />
              </div>
              <Link href="/checkout" className="button is-large is-icon w-inline-block">
                <div>Start testing</div>
                <div className="icon-embed-regular hide-mobile-portrait w-embed">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 25 25" fill="none">
                    <path d="M9.5 18.5967L15.5 12.5967L9.5 6.59668" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
              <div className="membership_info">
                <div className="membership_info-item">
                  <div className="icon-embed-small w-embed">
                    <GrayCheckIcon />
                  </div>
                  <div className="text-size-small text-color-secondary">Cancel anytime</div>
                </div>
                <div className="membership_info-item">
                  <div className="icon-embed-small w-embed">
                    <HSAIcon />
                  </div>
                  <div className="text-size-small text-color-secondary">HSA/FSA eligible</div>
                </div>
                <div className="membership_info-item">
                  <div className="icon-embed-small w-embed">
                    <CalendarIcon />
                  </div>
                  <div className="text-size-small text-color-secondary">Results within a week</div>
                </div>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
