'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import TableOfContents, { generateSlug } from './TableOfContents';
import type { TOCItem } from './TableOfContents';
import type { BiomarkerDetail } from '@/data/biomarker-details';

interface BiomarkerDetailContentProps {
  biomarker: BiomarkerDetail;
}

export default function BiomarkerDetailContent({ biomarker }: BiomarkerDetailContentProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Generate TOC items from h2 headings in sections
  const tocItems: TOCItem[] = biomarker.sections.map((section) => ({
    id: generateSlug(section.heading),
    text: section.heading,
  }));

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="main-wrapper">
      {/* Hero Section */}
      <section className="blog-cms-hero_section">
        <div className="page-padding padding-section-medium">
          <div className="container-large z-index-2">
            <div className="blog-cms-hero_layout is-library">
              <div className="hide-tablet" />
              <div className="blog-cms-hero_right is-article">
                <div className="library-article_component">
                  <div className="library-article_top">
                    {/* Breadcrumb */}
                    <div className="library-article_breadcrumb">
                      <Link href="/biomarkers" className="text-style-muted">
                        Library
                      </Link>
                      <div className="text-style-muted">/</div>
                      <Link href={`/category/${biomarker.categorySlug}`}>
                        {biomarker.category}
                      </Link>
                      <div className="text-style-muted">/</div>
                      <Link
                        href={`/biomarkers/${biomarker.slug}`}
                        aria-current="page"
                        className="text-color-orange w--current"
                      >
                        {biomarker.h1}
                      </Link>
                    </div>
                    <h1>{biomarker.h1}</h1>
                    <div className="text-style-muted">{biomarker.date}</div>
                  </div>
                  <div className="library-article_mid" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="blog-cms-content_section">
        {/* Rich text editorial style embed */}
        <div className="w-embed">
          <style
            dangerouslySetInnerHTML={{
              __html: `.blog-cms-content_main > .rich-text_editorial img,
.blog-cms-content_main > .rich-text_editorial blockquote {
  max-width: none !important;
  margin-left: -2rem;
  margin-right: -2rem;
  width: calc(100% + 4rem);
}`,
            }}
          />
        </div>
        <div className="page-padding">
          <div className="container-large z-index-2">
            <div className="blog-cms-hero_layout is-library">
              {/* Left Sidebar: TOC + Newsletter + Social */}
              <div className="blog-cms-content_left">
                <TableOfContents headings={tocItems} />

                {/* Newsletter CTA (desktop) */}
                <div className="blog-cms-content_cta hide-tablet">
                  <div>Subscribe for updates</div>
                  <div className="library-hero_form-block is-article w-form">
                    {!submitted ? (
                      <form
                        onSubmit={handleSubscribe}
                        className="library-hero_form"
                      >
                        <div className="blog-newsletter_input-wrapper is-article">
                          <input
                            className="form_input is-blog-newsletter w-input"
                            maxLength={256}
                            name="email"
                            placeholder="Enter email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <input
                            type="submit"
                            className="button is-small w-button"
                            value="Subscribe"
                          />
                        </div>
                        <div className="text-size-small text-style-muted">
                          By clicking &quot;Subscribe&quot; you agree to our{' '}
                          <Link
                            href="/legal/terms"
                            className="text-style-link is-dark"
                          >
                            Terms
                          </Link>{' '}
                          and{' '}
                          <Link
                            href="/legal/privacy"
                            className="text-style-link is-dark"
                          >
                            Privacy Policy
                          </Link>
                          .
                        </div>
                      </form>
                    ) : (
                      <div className="blog-newsletter_success w-form-done" style={{ display: 'block' }}>
                        <div className="blog-newsletter_form success">
                          <div className="form_input is-blog-newsletter success">
                            <div className="text-style-muted">
                              Your content is on its way!
                            </div>
                            <div className="is-blog-newsletter_icon w-embed">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                role="img"
                                className="iconify iconify--ic"
                                width="100%"
                                height="100%"
                                preserveAspectRatio="xMidYMid meet"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Social Share (desktop) */}
                  <div className="hide-tablet">
                    <div className="blog-cms-content_social">
                      <ShareLinkButton />
                      <ShareFacebookButton />
                      <ShareLinkedInButton />
                      <ShareXButton />
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="div-block-236">
                <div className="blog-cms-content_main is-biomarker">
                  {/* Render sections matching original Webflow structure:
                      - Section 0 (intro): rich-text + disclaimer + BookTestCTA as direct children
                      - Section 1: its own blog-rich-text div
                      - Sections 2+: combined into a single blog-rich-text div */}
                  {(() => {
                    const intro = biomarker.sections[0];
                    const second = biomarker.sections[1];
                    const rest = biomarker.sections.slice(2);
                    return (
                      <>
                        {/* Intro section with no-margin-bottom */}
                        {intro && (
                          <>
                            <div className="blog-rich-text has-no-margin-bottom w-richtext">
                              <h2 id={generateSlug(intro.heading)}>{intro.heading}</h2>
                              <RichTextContent items={intro.content} />
                            </div>
                            {/* Disclaimer */}
                            <div className="blog-cms_disclaimer-wrapper">
                              <div className="margin-top margin-xsmall">
                                <div className="disc_biomarker-component w-variant-e66ffd86-2b16-cb65-5ef0-cbd82ab373fc">
                                  <p className="paragraph-3">
                                    {biomarker.methodNote}
                                  </p>
                                </div>
                                {/* Hidden derived biomarker tag — present in original HTML with w-condition-invisible (display:none) */}
                                <div className="biomarker-tag is-derived w-condition-invisible">
                                  <div className="biomarker-tag_title-row">
                                    <img src="/images/site/698b4da1c31ef79d767bfcf9_Frame%201321315848.svg" loading="lazy" alt="" className="icon_bio-derived" />
                                    <div className="text-size-regular">This is a Derived Biomarker</div>
                                  </div>
                                  <div className="text-style-muted">
                                    Like all comprehensive health platforms, Superpower provides derived biomarkers. Derived biomarkers are standard clinical tools used by healthcare providers worldwide.<br /><br />A derived biomarker is a value that is calculated from other directly measured biomarkers rather than being measured directly in the lab.
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Book Test CTA */}
                            <BookTestCTA biomarkerName={biomarker.h1} />
                          </>
                        )}
                        {/* Second section: its own rich-text block */}
                        {second && (
                          <div className="blog-rich-text w-richtext">
                            <h2 id={generateSlug(second.heading)}>{second.heading}</h2>
                            <RichTextContent items={second.content} />
                          </div>
                        )}
                        {/* Remaining sections: combined into a single rich-text block (matches original) */}
                        {rest.length > 0 && (
                          <div className="blog-rich-text w-richtext">
                            {rest.map((section) => {
                              const sectionId = generateSlug(section.heading);
                              return (
                                <div key={sectionId}>
                                  <h2 id={sectionId}>{section.heading}</h2>
                                  <RichTextContent items={section.content} />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </>
                    );
                  })()}

                  {/* Ask AI Summary Section */}
                  <div className="library-article_ai">
                    <AskAISummary />
                  </div>

                  {/* Divider */}
                  <div className="line-divider-horizontal" />

                  {/* Mobile Newsletter CTA */}
                  <div className="hide-only-desktop">
                    <div className="margin-top margin-medium">
                      <div className="blog-cms-content_cta">
                        <div>Subscribe for updates</div>
                        <div className="library-hero_form-block is-article w-form">
                          {!submitted ? (
                            <form
                              onSubmit={handleSubscribe}
                              className="library-hero_form"
                            >
                              <div className="blog-newsletter_input-wrapper is-article">
                                <input
                                  className="form_input is-blog-newsletter w-input"
                                  maxLength={256}
                                  name="email"
                                  placeholder="Enter email"
                                  type="email"
                                  required
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                  type="submit"
                                  className="button is-small w-button"
                                  value="Subscribe"
                                />
                              </div>
                              <div className="text-size-small text-style-muted">
                                By clicking &quot;Subscribe&quot; you agree to our{' '}
                                <Link
                                  href="/legal/terms"
                                  className="text-style-link is-dark"
                                >
                                  Terms
                                </Link>{' '}
                                and{' '}
                                <Link
                                  href="/legal/privacy"
                                  className="text-style-link is-dark"
                                >
                                  Privacy Policy
                                </Link>
                                .
                              </div>
                            </form>
                          ) : (
                            <div className="blog-newsletter_success w-form-done" style={{ display: 'block' }}>
                              <div className="blog-newsletter_form success">
                                <div className="form_input is-blog-newsletter success">
                                  <div className="text-style-muted">
                                    Your content is on its way!
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Biomarker Tests Section */}
      {biomarker.similarBiomarkers && biomarker.similarBiomarkers.length > 0 && (
        <SimilarBiomarkersSection
          biomarkers={biomarker.similarBiomarkers}
        />
      )}

      {/* FAQ Sections */}
      {biomarker.faqs && biomarker.faqs.length > 0 && (
        <BiomarkerFAQSection
          biomarkerName={biomarker.h1}
          faqs={biomarker.faqs}
        />
      )}

      {/* Bottom CTA Section */}
      <section data-wf--home-what-we-believe--variant="base" data-w-id="8b9d5dcd-bdce-11cc-bab6-c1736d8f554b" className="section_home-cta">
        <div className="page-padding padding-section-large">
          <div className="container-large z-index-2">
            <div className="home-cta_component">
              <div className="home-cta_text-wrapper">
                <div className="text-highlight_wrapper">
                  <h1 className="scroll-highlight">Finally, healthcare that looks at the whole you</h1>
                </div>
                <div className="button-group">
                  <Link
                    href="/checkout"
                    className="button is-icon w-variant-094685dc-02e8-34f8-a0c0-8167f0653428 w-inline-block"
                  >
                    <div>Start testing</div>
                    <div className="icon-embed-regular w-embed">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <img
            src="/images/site/68737a1dbef9bc8014252acc_superpower-home-cta.avif"
            loading="lazy"
            alt=""
            className="image_cover-absolute"
            style={{ visibility: 'visible' }}
          />
          <div className="cta_shape-overlay is-top" />
          <div className="cta_shape-overlay is-bottom" />
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Rich text content renderer                                         */
/* ------------------------------------------------------------------ */

function RichTextContent({
  items,
}: {
  items: { type: string; text?: string; html?: string; items?: string[] }[];
}) {
  return (
    <>
      {items.map((item, i) => {
        if (item.type === 'h4') {
          return item.html
            ? <h4 key={i} dangerouslySetInnerHTML={{ __html: item.html }} />
            : <h4 key={i}>{item.text}</h4>;
        }
        if (item.type === 'p') {
          return item.html
            ? <p key={i} dangerouslySetInnerHTML={{ __html: item.html }} />
            : <p key={i}>{item.text}</p>;
        }
        if (item.type === 'ul' && item.items) {
          return (
            <ul key={i}>
              {item.items.map((li, j) => (
                <li key={j}>{li}</li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Book Test CTA                                                      */
/* ------------------------------------------------------------------ */

function BookTestCTA({ biomarkerName }: { biomarkerName: string }) {
  return (
    <div className="blog-cms-content_book-test_wrap">
      <div className="blog-cms-content_book-test_top">
        <div className="heading-style-h3">Book your test now</div>
      </div>
      <Link
        href="/checkout"
        className="button is-icon outline---dark w-inline-block"
      >
        <div className="w-embed">Book a {biomarkerName} Test</div>
      </Link>
      <div>
        With Superpower, you have access to a comprehensive range of biomarker
        tests
      </div>
      {/* Gradient background (CSS fallback for canvas-based gradient) */}
      <div
        className="image_cover-absolute z-index-minus-2 w-embed"
        style={{
          visibility: 'visible',
          background: 'linear-gradient(135deg, #B73A00, #F79732, #EF751B, #E05302)',
        }}
      />
      <div className="blog-cms-content_book-test_bot">
        <div className="blog-cms-content_book-test_item">
          <div className="icon-embed-small w-embed">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip-physician)">
                <path
                  d="M9.60039 16.0002L8.91239 15.3122C7.96839 14.3682 7.97639 12.8322 8.92839 11.9042L9.60039 11.2482C9.28839 11.2162 9.05639 11.2002 8.80039 11.2002C6.66439 11.2002 2.40039 12.2722 2.40039 14.4002V16.0002H9.60039ZM8.80039 9.6002C10.5684 9.6002 12.0004 8.1682 12.0004 6.4002C12.0004 4.6322 10.5684 3.2002 8.80039 3.2002C7.03239 3.2002 5.60039 4.6322 5.60039 6.4002C5.60039 8.1682 7.03239 9.6002 8.80039 9.6002Z"
                  fill="white"
                />
                <path
                  d="M12.9438 15.8242C12.6318 16.1362 12.1198 16.1362 11.8078 15.8242L10.1518 14.1522C9.84783 13.8402 9.84783 13.3442 10.1518 13.0402L10.1598 13.0322C10.4718 12.7202 10.9758 12.7202 11.2798 13.0322L12.3758 14.1282L15.9198 10.5602C16.2318 10.2482 16.7358 10.2482 17.0478 10.5602L17.0558 10.5682C17.3598 10.8802 17.3598 11.3762 17.0558 11.6802L12.9438 15.8242Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip-physician">
                  <rect width="19.2" height="19.2" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="text-size-small">Physician reviewed</div>
        </div>
        <div className="blog-cms-content_book-test_item">
          <div className="icon-embed-small w-embed">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.4 0.799805H1.6C0.72 0.799805 0 1.5198 0 2.3998V13.5998C0 14.4798 0.72 15.1998 1.6 15.1998H14.4C15.28 15.1998 16 14.4798 16 13.5998V2.3998C16 1.5198 15.28 0.799805 14.4 0.799805ZM5.6 11.9998H3.2C2.76 11.9998 2.4 11.6398 2.4 11.1998C2.4 10.7598 2.76 10.3998 3.2 10.3998H5.6C6.04 10.3998 6.4 10.7598 6.4 11.1998C6.4 11.6398 6.04 11.9998 5.6 11.9998ZM5.6 8.7998H3.2C2.76 8.7998 2.4 8.4398 2.4 7.9998C2.4 7.5598 2.76 7.1998 3.2 7.1998H5.6C6.04 7.1998 6.4 7.5598 6.4 7.9998C6.4 8.4398 6.04 8.7998 5.6 8.7998ZM5.6 5.5998H3.2C2.76 5.5998 2.4 5.2398 2.4 4.7998C2.4 4.3598 2.76 3.9998 3.2 3.9998H5.6C6.04 3.9998 6.4 4.3598 6.4 4.7998C6.4 5.2398 6.04 5.5998 5.6 5.5998ZM13.36 7.2958L10.824 9.8318C10.512 10.1438 10 10.1438 9.688 9.8318L8.56 8.6958C8.248 8.3838 8.248 7.8798 8.56 7.5678C8.872 7.2558 9.376 7.2558 9.688 7.5678L10.256 8.1358L12.232 6.1598C12.544 5.8478 13.048 5.8478 13.36 6.1598L13.368 6.1678C13.672 6.4798 13.672 6.9918 13.36 7.2958Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-size-small">CLIA-certified labs</div>
        </div>
        <div className="blog-cms-content_book-test_item">
          <div className="icon-embed-small w-embed">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip-hipaa)">
                <path
                  d="M1.33268 13.9993H7.99935C8.36602 13.9993 8.66602 14.2993 8.66602 14.666C8.66602 15.0326 8.36602 15.3326 7.99935 15.3326H1.33268C0.966016 15.3326 0.666016 15.0326 0.666016 14.666C0.666016 14.2993 0.966016 13.9993 1.33268 13.9993ZM3.49268 5.3793L5.37935 3.49263L13.866 11.9793C14.386 12.4993 14.386 13.346 13.866 13.866C13.346 14.386 12.4993 14.386 11.9793 13.866L3.49268 5.3793ZM9.15268 1.60597L11.0393 3.49263C11.5593 4.01263 11.5593 4.8593 11.0393 5.3793L10.0927 6.32597L6.32602 2.55263L7.26602 1.61263C7.78602 1.08597 8.63268 1.08597 9.15268 1.60597ZM2.55268 6.3193L6.32602 10.0926L5.38602 11.0326C4.86602 11.5526 4.01935 11.5526 3.49935 11.0326L1.61268 9.14597C1.09268 8.62597 1.09268 7.7793 1.61268 7.2593L2.55268 6.3193Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip-hipaa">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="text-size-small">HIPAA compliant</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Ask AI Summary                                                     */
/* ------------------------------------------------------------------ */

function AskAISummary() {
  return (
    <div className="footer_bottom_ai w-variant-a6cc5c5d-5148-0349-4e78-ea8e151fcbde">
      <div className="footer_bottom_ask w-variant-a6cc5c5d-5148-0349-4e78-ea8e151fcbde">
        <div className="icon-embed-small is-ai-icon w-embed">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.75 2.75C12.75 2.33579 12.4142 2 12 2C11.5858 2 11.25 2.33579 11.25 2.75C11.25 5.87025 10.5613 7.94571 9.25352 9.25352C7.94571 10.5613 5.87025 11.25 2.75 11.25C2.33579 11.25 2 11.5858 2 12C2 12.4142 2.33579 12.75 2.75 12.75C5.87025 12.75 7.94571 13.4387 9.25352 14.7465C10.5613 16.0543 11.25 18.1297 11.25 21.25C11.25 21.6642 11.5858 22 12 22C12.4142 22 12.75 21.6642 12.75 21.25C12.75 18.1297 13.4387 16.0543 14.7465 14.7465C16.0543 13.4387 18.1297 12.75 21.25 12.75C21.6642 12.75 22 12.4142 22 12C22 11.5858 21.6642 11.25 21.25 11.25C18.1297 11.25 16.0543 10.5613 14.7465 9.25352C13.4387 7.94571 12.75 5.87025 12.75 2.75Z" fill="#FC5F2B" />
          </svg>
        </div>
        <div className="text-style-muted">Ask AI for a summary</div>
      </div>
      <div data-ai-query="" className="footer_ai_logos">
        <a data-ai-claude="" className="footer_ai_logo w-inline-block" href="#" aria-label="Ask Claude" target="_blank" rel="noopener noreferrer">
          <div className="footer_ai_img">
            <img
              sizes="(max-width: 1200px) 100vw, 1200px, 100vw"
              srcSet="/images/site/69086d2f5f01b9446acb9069_Claude_AI_symbol.svg-p-500.png 500w, /images/site/69086d2f5f01b9446acb9069_Claude_AI_symbol.svg.avif 1200w"
              alt=""
              src="/images/site/69086d2f5f01b9446acb9069_Claude_AI_symbol.svg.avif"
              loading="lazy"
              className="image_cover-absolute"
              style={{ visibility: 'visible' }}
            />
          </div>
        </a>
        <a className="footer_ai_logo w-inline-block" href="#" aria-label="Ask Gemini" target="_blank" rel="noopener noreferrer" data-ai-google="">
          <div className="footer_ai_img">
            <img
              loading="lazy"
              src="/images/site/69086d2eaa31ec31adbc3068_Google_Bard_logo%20(1).svg"
              alt=""
              className="image_cover-absolute"
              style={{ visibility: 'visible' }}
            />
          </div>
        </a>
        <a className="footer_ai_logo w-inline-block" data-ai-grok="" href="#" aria-label="Ask Grok" target="_blank" rel="noopener noreferrer">
          <div className="footer_ai_img">
            <img
              loading="lazy"
              src="/images/site/69086d2ead1bba9a3cbfe89b_grok-seeklogo-.svg"
              alt=""
              className="image_cover-absolute"
              style={{ visibility: 'visible' }}
            />
          </div>
        </a>
        <a className="footer_ai_logo w-inline-block" href="#" aria-label="Ask ChatGPT" target="_blank" rel="noopener noreferrer" data-ai-chatgpt="">
          <div className="footer_ai_img">
            <img
              loading="lazy"
              src="/images/site/69086d2e8abb39d214274f30_openai-svgrepo-com.svg"
              alt=""
              className="image_cover-absolute"
              style={{ visibility: 'visible' }}
            />
          </div>
        </a>
        <a className="footer_ai_logo w-inline-block" data-ai-perplexity="" href="#" aria-label="Ask Perplexity" target="_blank" rel="noopener noreferrer">
          <div className="footer_ai_img">
            <img
              loading="lazy"
              src="/images/site/6908c19b562e1c37ed6cd7c1_perplexity%20logo.svg"
              alt=""
              className="image_cover-absolute"
              style={{ visibility: 'visible' }}
            />
          </div>
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Similar Biomarkers Section                                         */
/* ------------------------------------------------------------------ */

interface SimilarBiomarkersSectionProps {
  biomarkers: { name: string; category: string; slug: string }[];
}

function SimilarBiomarkersSection({ biomarkers }: SimilarBiomarkersSectionProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const bulletRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let swiperInstance: any = null;
    let attempts = 0;
    const maxAttempts = 40;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const tryInit = () => {
      if (typeof window !== 'undefined' && (window as any).Swiper && sliderRef.current) {
        swiperInstance = new (window as any).Swiper(sliderRef.current, {
          slidesPerView: 'auto',
          speed: 300,
          breakpoints: {
            0: { slidesPerView: 'auto', centeredSlides: true },
            768: { slidesPerView: 'auto', centeredSlides: false },
            992: { slidesPerView: 3, centeredSlides: false },
          },
          navigation: {
            nextEl: nextRef.current,
            prevEl: prevRef.current,
          },
          pagination: {
            el: bulletRef.current,
            clickable: true,
            bulletClass: 'slider_bullet_item',
            bulletActiveClass: 'is-active',
            bulletElement: 'button',
          },
        });
      } else if (attempts < maxAttempts) {
        attempts++;
        timeoutId = setTimeout(tryInit, 100);
      }
    };

    tryInit();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (swiperInstance && swiperInstance.destroy) {
        swiperInstance.destroy(true, true);
      }
    };
  }, []);

  return (
    <section className="section_home2-testimonials is-biomarker">
      <div className="page-padding">
        <div className="padding-vertical padding-xlarge">
          <div className="container-large">
            <div className="slider_component">
              <div className="how-it-works_heading-wrapper">
                <div className="title_row is-blog">
                  <h2>Similar biomarker tests from Superpower</h2>
                </div>
                <Link
                  href="/biomarkers"
                  className="button is-icon w-variant-87793521-3a76-1f89-27c6-baf9af390b1f w-inline-block"
                >
                  <div>See more biomarkers</div>
                </Link>
              </div>
              <div ref={sliderRef} className="slider_wrap swiper w-dyn-list">
                <div role="list" className="slider_list swiper-wrapper is-teams w-dyn-items">
                  {biomarkers.map((bm) => (
                    <div key={bm.slug} role="listitem" className="slider_item swiper-slide is-recommended w-dyn-item">
                      <div className="bm-recommended_card">
                        <div className="bm-recommended_tube-wrapper">
                          <img
                            src="/images/site/68b7611425f27a0585d7e513_Rectangle%2040803.png"
                            loading="lazy"
                            width="auto"
                            alt=""
                            className="bm-recommended_tube w-dyn-bind-empty"
                          />
                        </div>
                        <div className="bm-recommended_text-wrapper">
                          <div className="w-dyn-list">
                            <div role="list" className="collection_references-list w-dyn-items">
                              <div role="listitem" className="collection_references-item w-dyn-item">
                                <div>{bm.category}</div>
                              </div>
                            </div>
                          </div>
                          <h3 className="text-size-large">{bm.name}</h3>
                          <div className="push_auto-top">
                            <div className="margin-top margin-small">
                              <Link
                                href={`/biomarkers/${bm.slug}`}
                                className="button is-black text-align-center is-small w-inline-block"
                              >
                                <div>Learn more</div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Slider navigation — visible on desktop, hidden on tablet & mobile */}
              <div className="slider_layout is-margin">
                <div className="slider_btn_layout hide-tablet">
                  <div ref={prevRef} className="slider_btn_element swiper-button-disabled is-prev">
                    <a href="#" className="button-prev w-inline-block" onClick={(e) => e.preventDefault()}>
                      <div className="icon-embed-regular w-embed">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M15 17.9966L9 11.9966L15 5.99658" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </a>
                  </div>
                  <div ref={bulletRef} className="slider_bullet_wrap">
                    <div className="slider_bullet_item is-active" />
                    <div className="slider_bullet_item" />
                  </div>
                  <div ref={nextRef} className="slider_btn_element is-next">
                    <div className="button-next">
                      <div className="icon-embed-regular w-embed">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M9 17.9983L15 11.9983L9 5.99829" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Biomarker FAQ Section                                              */
/* ------------------------------------------------------------------ */

interface BiomarkerFAQSectionProps {
  biomarkerName: string;
  faqs: { question: string; answer: string }[];
}

function BiomarkerFAQItem({ faq, idx, isOpen, onToggle }: {
  faq: { question: string; answer: string };
  idx: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

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

  const bgClass = (idx === 1 || idx === 2) ? 'background-color-clear' : 'background-color-white';
  const lineClass = idx === 0 ? 'open-close-line---brix' : 'open-close-line---brix-2';

  return (
    <div className={`accordion-item tabs-accordion ${bgClass} smaller`}>
      <div
        className="accordion-trigger"
        onClick={onToggle}
        style={{ cursor: 'pointer' }}
      >
        <div className="text-size-medium">{faq.question}</div>
        <div className="open-close-icon-wrapper---brix">
          <div style={{ backgroundColor: 'rgb(23,15,73)' }} className={lineClass} />
          <div
            style={{
              backgroundColor: 'rgb(23,15,73)',
              transform: isOpen
                ? 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)'
                : 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(90deg) skew(0, 0)',
              transition: 'transform 0.3s ease',
            }}
            className={`${lineClass} second-line---brix`}
          />
        </div>
      </div>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <div className="accordion-content has-fixed-width">
          <div className="margin-top margin-small">
            <div className="text-rich-text w-richtext">
              <p>{faq.answer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BiomarkerFAQSection({ biomarkerName, faqs }: BiomarkerFAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="section_faqs-shorthand">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-small mobile-wrap">
            <div className="margin-bottom margin-medium">
              <div>
                <div className="margin-bottom">
                  <div className="w-embed">
                    <h2>Frequently Asked Questions about {biomarkerName}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item-wrapper tabs-accordion bottom-faq margin-top margin-medium mobile-diff-margin">
              {faqs.map((faq, idx) => (
                <BiomarkerFAQItem
                  key={idx}
                  faq={faq}
                  idx={idx}
                  isOpen={openIndex === idx}
                  onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Social share buttons                                               */
/* ------------------------------------------------------------------ */

function ShareLinkButton() {
  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <button onClick={handleCopy} className="fs-copyclip_color_button w-inline-block" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
      <div className="blog-cms-content_icon w-embed">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.64113 9.29847C8.49612 7.44348 11.5037 7.44348 13.3586 9.29847L13.7018 9.64161C14.4774 10.4172 14.9294 11.3963 15.056 12.4071C15.1075 12.8181 14.8161 13.1931 14.4051 13.2445C13.9941 13.296 13.6192 13.0046 13.5677 12.5936C13.481 11.9019 13.1728 11.2339 12.6411 10.7023L12.298 10.3591C11.0288 9.08993 8.97099 9.08992 7.70179 10.3591L4.35864 13.7023C3.08944 14.9715 3.08944 17.0293 4.35864 18.2985L4.70179 18.6416C5.97099 19.9108 8.02876 19.9108 9.29796 18.6416L9.46953 18.4701C9.76241 18.1772 10.2373 18.1771 10.5302 18.47C10.8231 18.7629 10.8231 19.2378 10.5302 19.5307L10.3587 19.7023C8.50367 21.5572 5.49612 21.5573 3.64113 19.7023L3.29798 19.3591C1.44299 17.5041 1.44299 14.4966 3.29798 12.6416L6.64113 9.29847Z" fill="#18181B" />
          <path fillRule="evenodd" clipRule="evenodd" d="M13.6411 5.29847C15.4961 3.44348 18.5036 3.44348 20.3586 5.29847L20.7017 5.64161C22.5567 7.4966 22.5567 10.5041 20.7017 12.3591L17.3586 15.7023C15.5036 17.5573 12.4961 17.5573 10.6411 15.7023L10.2979 15.3591C9.52231 14.5835 9.07031 13.6044 8.94368 12.5936C8.8922 12.1826 9.18364 11.8077 9.59464 11.7562C10.0056 11.7047 10.3806 11.9961 10.432 12.4071C10.5187 13.0988 10.827 13.7668 11.3586 14.2985L11.7017 14.6416C12.9709 15.9108 15.0287 15.9108 16.2979 14.6416L19.6411 11.2985C20.9103 10.0293 20.9103 7.97148 19.6411 6.70228L19.2979 6.35913C18.0287 5.08993 15.9709 5.08993 14.7017 6.35913L14.5303 6.53063C14.2374 6.82356 13.7625 6.82362 13.4696 6.53077C13.1767 6.23791 13.1766 5.76304 13.4695 5.47011L13.6411 5.29847Z" fill="#18181B" />
        </svg>
      </div>
    </button>
  );
}

function ShareFacebookButton() {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button onClick={handleClick} className="blog-cms-content_icon w-embed" style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.58404 21.706V15.0561H7.52015V12H9.58404V10.6833C9.58404 7.27944 11.124 5.70333 14.464 5.70333C15.0963 5.70333 16.1879 5.82722 16.6363 5.95111V8.71944C16.4001 8.69556 15.9879 8.68333 15.4801 8.68333C13.8401 8.68333 13.2079 9.30333 13.2079 10.9194V12H16.4763L15.9163 15.0556H13.2124V21.9277C18.1637 21.3279 22 17.112 22 12C22 6.47722 17.5228 2 12 2C6.47722 2 2 6.47722 2 12C2 16.6899 5.22813 20.6253 9.58404 21.706Z" fill="#18181B" />
      </svg>
    </button>
  );
}

function ShareLinkedInButton() {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button onClick={handleClick} className="blog-cms-content_icon w-embed" style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.65 3H4.35C3.99196 3 3.64858 3.14223 3.39541 3.39541C3.14223 3.64858 3 3.99196 3 4.35V19.65C3 20.008 3.14223 20.3514 3.39541 20.6046C3.64858 20.8578 3.99196 21 4.35 21H19.65C20.008 21 20.3514 20.8578 20.6046 20.6046C20.8578 20.3514 21 20.008 21 19.65V4.35C21 3.99196 20.8578 3.64858 20.6046 3.39541C20.3514 3.14223 20.008 3 19.65 3ZM8.4 18.3H5.7V10.2H8.4V18.3ZM7.05 8.625C6.74056 8.61616 6.4406 8.51632 6.18758 8.33797C5.93456 8.15962 5.7397 7.91066 5.62737 7.6222C5.51503 7.33374 5.49019 7.01857 5.55595 6.71607C5.6217 6.41358 5.77515 6.13716 5.9971 5.92138C6.21906 5.70559 6.49968 5.55999 6.80391 5.50278C7.10814 5.44556 7.42248 5.47927 7.70766 5.59969C7.99284 5.7201 8.23622 5.92189 8.40737 6.17983C8.57853 6.43778 8.66987 6.74044 8.67 7.05C8.66289 7.47331 8.4885 7.8766 8.18495 8.17173C7.88139 8.46685 7.47335 8.62982 7.05 8.625ZM18.3 18.3H15.6V14.034C15.6 12.756 15.06 12.297 14.358 12.297C14.1522 12.3107 13.9511 12.3649 13.7663 12.4566C13.5815 12.5482 13.4166 12.6755 13.2811 12.831C13.1457 12.9866 13.0422 13.1674 12.9768 13.363C12.9114 13.5586 12.8853 13.7652 12.9 13.971C12.8955 14.0129 12.8955 14.0551 12.9 14.097V18.3H10.2V10.2H12.81V11.37C13.0733 10.9695 13.435 10.6433 13.8605 10.4227C14.286 10.2021 14.761 10.0944 15.24 10.11C16.635 10.11 18.264 10.884 18.264 13.404L18.3 18.3Z" fill="#18181B" />
      </svg>
    </button>
  );
}

function ShareXButton() {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button onClick={handleClick} className="blog-cms-content_icon w-embed" style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.4033 3.5H20.2852L13.989 10.701L21.396 20.5H15.5964L11.054 14.557L5.85637 20.5H2.97269L9.70709 12.7977L2.60156 3.5H8.54839L12.6544 8.93215L17.4033 3.5ZM16.3918 18.7738H17.9887L7.68067 5.13549H5.96702L16.3918 18.7738Z" fill="#18181B" />
      </svg>
    </button>
  );
}
