'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  Reusable SVG icons                                                 */
/* ------------------------------------------------------------------ */

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    className="iconify iconify--ic"
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6z" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.75 2.75C12.75 2.33579 12.4142 2 12 2C11.5858 2 11.25 2.33579 11.25 2.75C11.25 5.87025 10.5613 7.94571 9.25352 9.25352C7.94571 10.5613 5.87025 11.25 2.75 11.25C2.33579 11.25 2 11.5858 2 12C2 12.4142 2.33579 12.75 2.75 12.75C5.87025 12.75 7.94571 13.4387 9.25352 14.7465C10.5613 16.0543 11.25 18.1297 11.25 21.25C11.25 21.6642 11.5858 22 12 22C12.4142 22 12.75 21.6642 12.75 21.25C12.75 18.1297 13.4387 16.0543 14.7465 14.7465C16.0543 13.4387 18.1297 12.75 21.25 12.75C21.6642 12.75 22 12.4142 22 12C22 11.5858 21.6642 11.25 21.25 11.25C18.1297 11.25 16.0543 10.5613 14.7465 9.25352C13.4387 7.94571 12.75 5.87025 12.75 2.75Z"
      fill="#DC2626"
    />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Chevron link helper                                                */
/* ------------------------------------------------------------------ */

interface ChevronLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  suffix?: string;
  truncate?: boolean;
}

function ChevronLink({ href, children, external, suffix, truncate }: ChevronLinkProps) {
  const isExternal = external || href.startsWith('http') || href.startsWith('mailto:');
  const linkContent = suffix ? (
    <>
      {children}&nbsp;<span className="footer-link-suffix">{suffix}</span>
    </>
  ) : (
    children
  );

  const linkClassName = truncate ? 'footer-link text-style-1lines' : 'footer-link';

  return (
    <div className="chevron-link">
      <img
        loading="lazy"
        src="/images/site/66668bc209003e2545cbca73_chevron-orange.svg"
        alt=""
        className="chevron-img"
      />
      {isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          {linkContent}
        </a>
      ) : (
        <Link href={href} className={linkClassName}>
          {linkContent}
        </Link>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Accordion column wrapper (mobile-expandable)                       */
/* ------------------------------------------------------------------ */

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
}

function FooterColumn({ title, children }: FooterColumnProps) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleToggle = useCallback(() => {
    if (!isMobile) return;
    setOpen((prev) => {
      const next = !prev;
      const el = bottomRef.current;
      if (!el) return next;

      if (next) {
        // Opening: set display, then animate in via rAF
        el.style.display = 'flex';
        el.style.overflow = 'hidden';
        el.style.height = '0px';
        el.style.opacity = '0';
        el.style.transform = 'scale(0.95)';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.transition = 'height 0.75s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.75s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.75s cubic-bezier(0.165, 0.84, 0.44, 1)';
            el.style.height = el.scrollHeight + 'px';
            el.style.opacity = '1';
            el.style.transform = 'scale(1)';
          });
        });
        const onEnd = () => {
          el.style.height = 'auto';
          el.style.overflow = '';
          el.removeEventListener('transitionend', onEnd);
        };
        el.addEventListener('transitionend', onEnd);
      } else {
        // Closing: animate out then hide
        el.style.overflow = 'hidden';
        el.style.height = el.scrollHeight + 'px';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.transition = 'height 0.75s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.75s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.75s cubic-bezier(0.165, 0.84, 0.44, 1)';
            el.style.height = '0px';
            el.style.opacity = '0';
            el.style.transform = 'scale(0.95)';
          });
        });
        const onEnd = () => {
          el.style.display = 'none';
          el.style.overflow = '';
          el.removeEventListener('transitionend', onEnd);
        };
        el.addEventListener('transitionend', onEnd);
      }
      return next;
    });
  }, [isMobile]);

  // Footer columns start collapsed on mobile (matching original Webflow site).
  // Users can tap to expand on mobile.
  const initialMobileStyle: React.CSSProperties | undefined = isMobile && !open
    ? { display: 'none' }
    : undefined;

  return (
    <div className="footer_col">
      <div
        className="footer_accordion-top"
        onClick={handleToggle}
        style={isMobile ? { cursor: 'pointer' } : undefined}
      >
        <div className="text-style-muted">{title}</div>
        <div
          className="icon-1x1-xxsmall show-mobile-landscape w-embed"
          style={isMobile ? {
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          } : undefined}
        >
          <ChevronDownIcon />
        </div>
      </div>
      <div
        className="footer_accordion-bottom"
        ref={bottomRef}
        style={initialMobileStyle}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Logo mask styles (injected via <style> tag in the original)        */
/* ------------------------------------------------------------------ */

const footerFixCSS = `
@media screen and (min-width:768px) and (max-width:991px) {
  .footer_bottom_ai.footer-23 {
    margin-top: 0;
    margin-bottom: -5rem;
  }
}
`;

const logoMaskCSS = `
.logo-mask {
  position: relative;
  overflow: hidden;
  display: block;
  width: 100%;
  -webkit-mask-image: url("/images/site/65b8f55bef05d8426623a612_sp-logo-black.svg");
          mask-image: url("/images/site/65b8f55bef05d8426623a612_sp-logo-black.svg");
  -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
  -webkit-mask-position: center;
          mask-position: center;
  -webkit-mask-size: contain;
          mask-size: contain;
}
.logo-mask > .logo-sizer {
  display: block;
  width: 100%;
  height: auto;
  visibility: hidden;
}
.logo-mask > .masked-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
}
.logo-mask > .logo-fallback {
  display: none;
  width: 100%;
  height: auto;
}
@supports not (mask-image: url("")) {
  .logo-mask > .masked-video { display: none; }
  .logo-mask > .logo-sizer { visibility: visible; }
  .logo-fallback { display: block; }
}
@media (prefers-reduced-motion: reduce) {
  .logo-mask > .masked-video { animation: none !important; }
}
`;

/* ------------------------------------------------------------------ */
/*  Footer component                                                   */
/* ------------------------------------------------------------------ */

export default function Footer() {
  // Dynamic year update (replaces inline Webflow script)
  useEffect(() => {
    document.querySelectorAll('[data-year]').forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }, []);

  return (
    <div className="section_footer background-color-primary">
      <style dangerouslySetInnerHTML={{ __html: logoMaskCSS + footerFixCSS }} />

      <div className="footer-items">
        <div className="footer-bottom new-footer">

          {/* ============================================= */}
          {/*  Logo mask with video background               */}
          {/* ============================================= */}
          <div className="logo-mask">
            {/* Hidden SVG sets the natural aspect ratio */}
            <img
              className="logo-sizer"
              src="/images/site/65b8f55bef05d8426623a612_sp-logo-black.svg"
              alt=""
              aria-hidden="true"
            />

            {/* Video fills the masked area */}
            <video
              className="masked-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/site/68dfd7d87857d2aa8e2cb7a2_sp-still-bg-mask.jpg"
            >
              <source src="/videos/sp-logo-footer-bg.mp4" type="video/mp4" />
            </video>

            {/* Fallback logo for browsers without mask support */}
            <img
              className="logo-fallback"
              src="/images/site/65b8f55bef05d8426623a612_sp-logo-black.svg"
              alt="Superpower"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* ============================================= */}
          {/*  Footer link columns                           */}
          {/* ============================================= */}
          <div id="w-node-_06fd21b5-4a2c-8473-5b84-830cee613ba0-ee613b9b" className="footer-row-wrapper">
            <div className="footer_component">

              {/* ---------- Superpower column ---------- */}
              <div className="footer_col-wrapper">
                <FooterColumn title="Superpower">
                  <ChevronLink href="/how-it-works">How it Works</ChevronLink>
                  <ChevronLink href="/biomarkers">What&apos;s Included</ChevronLink>
                  <ChevronLink href="https://app.superpower.com" external>Membership Login</ChevronLink>
                  <ChevronLink href="/gift">Gift Superpower</ChevronLink>

                  {/* Hidden overflow links (visible via CSS on desktop) */}
                  <div className="hide">
                    <ChevronLink href="/blood-test-for-biomarkers">Blood test for biomarkers</ChevronLink>
                    <ChevronLink href="/disease-blood-test">Disease Blood Testing</ChevronLink>
                    <ChevronLink href="/marketplace/products/grail-galleri-multi-cancer-test" suffix="[New]">
                      Cancer Biomarker Testing&nbsp;
                    </ChevronLink>
                    <ChevronLink href="/supplements" suffix="[New]">Supplements&nbsp;</ChevronLink>
                    <ChevronLink href="/heavy-metals" suffix="[New]">Heavy Metals </ChevronLink>
                    <ChevronLink href="/gut-biomarkers" suffix="[New]">Gut Biomarkers </ChevronLink>
                    <ChevronLink href="/cancer-biomarkers" suffix="[New]">Cancer Biomarkers </ChevronLink>
                    <ChevronLink href="/diseases" suffix="[New]">Disease testing </ChevronLink>
                    <ChevronLink href="https://superpower.com/peptides" suffix="[New]">Peptides </ChevronLink>
                    <ChevronLink href="/biomarker-guides" suffix="[New]">Biomarker guides </ChevronLink>
                    <ChevronLink href="/supplements">Supplements</ChevronLink>
                    <ChevronLink href="/best-biomarkers" suffix="[New]">Best biomarkers </ChevronLink>
                    <ChevronLink href="/environmental-toxins" suffix="[New]">Environmental toxins </ChevronLink>

                    {/* Calculators */}
                    <ChevronLink href="/calculator/a1c-to-eag">
                      A1C to Estimated Average Glucose (eAG) Calculator [New]
                    </ChevronLink>
                    <ChevronLink href="/calculator/egfr-mdrd">
                      eGFR Calculator: Kidney Function Estimate (MDRD)
                    </ChevronLink>
                    <ChevronLink href="/calculator/corrected-calcium-payne">
                      Corrected Calcium Calculator (Payne Formula)
                    </ChevronLink>
                    <ChevronLink href="/calculator/basal-insulin">
                      Basal Insulin Calculator for Type 1 &amp; Type 2 Diabetes
                    </ChevronLink>
                    <ChevronLink href="/calculator/gmi-to-a1c">
                      GMI to A1c Calculator &ndash; Fast Estimate from CGM Data
                    </ChevronLink>
                    <ChevronLink href="/calculator/de-ritis-ast-alt-ratio">
                      AST/ALT De Ritis Ratio Calculator for Liver Health
                    </ChevronLink>
                    <ChevronLink href="/calculator/glucose-to-a1c">
                      Glucose to A1c Calculator &ndash; ADAG-Based Estimate
                    </ChevronLink>
                    <ChevronLink href="/calculator/bun-creatinine-ratio">
                      BUN to Creatinine Ratio Calculator for Kidney Function
                    </ChevronLink>
                    <ChevronLink href="/calculator/24h-urinary-sodium-salt-intake">
                      24-Hour Urinary Sodium &amp; Salt Intake Calculator
                    </ChevronLink>
                    <ChevronLink href="/calculator/fena-fractional-excretion-sodium">
                      FENa (Fractional Excretion of Sodium) Calculator
                    </ChevronLink>
                    <ChevronLink href="/calculator/water-intake">Water Intake Calculator</ChevronLink>

                    {/* Weight Loss */}
                    <ChevronLink href="/weight-loss">Weight Loss</ChevronLink>
                    <ChevronLink href="/supplement-guides">Weight Loss</ChevronLink>
                    <ChevronLink href="/guides">Weight Loss</ChevronLink>
                  </div>
                </FooterColumn>
              </div>

              {/* ---------- Company column ---------- */}
              <div className="footer_col-wrapper">
                <FooterColumn title="Company">
                  <ChevronLink href="/manifesto">Our Why</ChevronLink>
                  <ChevronLink href="https://superpower.com/careers" suffix="[We're hiring!]">
                    Join the Team
                  </ChevronLink>
                  <ChevronLink href="https://healthiesthoodie.com" external>Superpower Labs</ChevronLink>
                  <ChevronLink href="mailto:hello@superpower.com">Contact Us</ChevronLink>
                  <ChevronLink href="/faqs">FAQs</ChevronLink>
                </FooterColumn>
              </div>

              {/* ---------- Compare column ---------- */}
              <div className="footer_col-wrapper">
                <FooterColumn title="Compare">
                  <ChevronLink href="/superpower-vs-function-health">Function Health</ChevronLink>
                  <ChevronLink href="/superpower-vs-mito-health">Mito Health</ChevronLink>
                  <ChevronLink href="/superpower-vs-insidetracker">InsideTracker</ChevronLink>
                  <ChevronLink href="/superpower-vs-others">Others</ChevronLink>
                </FooterColumn>
              </div>

              {/* ---------- Library + Resources columns (shared wrapper) ---------- */}
              <div className="footer_col-wrapper">
                <FooterColumn title="Library">
                  {/* Dynamic library items (from Webflow CMS) */}
                  <div className="footer_col w-dyn-items">
                    <ChevronLink href="/library/guide-to-biomarker-testing" truncate>
                      The Complete Guide to Biomarker Testing
                    </ChevronLink>
                    <ChevronLink href="/library/immune-system-biomarkers" truncate>
                      Immune System Biomarker
                    </ChevronLink>
                    <ChevronLink href="/library/energy-biomarkers" truncate>Energy Biomarkers</ChevronLink>
                    <ChevronLink href="/library/liver-health-biomarkers" truncate>
                      Liver Health Biomarkers
                    </ChevronLink>
                    <ChevronLink href="/library/body-composition-biomarkers" truncate>
                      Body Composition Biomarkers
                    </ChevronLink>
                    <ChevronLink href="/library/dna-biomarkers" truncate>DNA Biomarkers</ChevronLink>
                    <ChevronLink href="/library/thyroid-health-biomarkers" truncate>
                      Thyroid Biomarkers
                    </ChevronLink>
                    <ChevronLink href="/library/metabolic-health-biomarker-testing" truncate>
                      Metabolic Biomarker Testing
                    </ChevronLink>
                    <ChevronLink href="/library/5-biomarkers-everyone-should-test" truncate>
                      5 Biomarkers Everyone Should Test
                    </ChevronLink>
                  </div>

                  {/* Resources — inside FooterColumn so it collapses with
                      the accordion on mobile (matches original structure where
                      .is-second-col lives inside .footer_accordion-bottom) */}
                  <div className="footer_col is-second-col">
                    <div className="text-style-muted">Resources</div>
                    <ChevronLink href="/biomarkers">Biomarker tests</ChevronLink>
                    <ChevronLink href="/blood-test">Blood Tests</ChevronLink>
                    <ChevronLink href="/biomarker-guides">Biomarker Guides</ChevronLink>
                    <ChevronLink href="/blog">Blog</ChevronLink>
                    <ChevronLink href="/disease-blood-test">Disease Blood Tests</ChevronLink>
                    <ChevronLink href="/environmental-toxins">Environmental Toxins</ChevronLink>
                    <ChevronLink href="/diseases">Disease Testing</ChevronLink>
                    <ChevronLink href="/library">Library</ChevronLink>
                    <ChevronLink href="/gut-biomarkers">Gut Microbiome</ChevronLink>
                    <ChevronLink href="/cancer-biomarkers">Cancer Biomarkers</ChevronLink>
                    <ChevronLink href="/best-biomarkers">Best Biomarkers</ChevronLink>
                    <ChevronLink href="/heavy-metals">Heavy Metals</ChevronLink>
                  </div>
                </FooterColumn>
              </div>

              {/* ---------- Partnerships + Connect columns (shared wrapper) ---------- */}
              <div className="footer_col-wrapper">
                <FooterColumn title="Partnerships">
                  <ChevronLink href="https://superpower-health.typeform.com/to/VQKeJvKr?typeform-source=www.canva.com" external>
                    For Creators
                  </ChevronLink>
                  <ChevronLink href="https://superpower.com/partner" external>For Partners</ChevronLink>
                  <ChevronLink href="/organizations">For Organizations</ChevronLink>
                </FooterColumn>

                <FooterColumn title="Connect">
                  <ChevronLink href="https://x.com/superpower" external>X/Twitter</ChevronLink>
                  <ChevronLink href="https://www.instagram.com/superpower" external>Instagram</ChevronLink>
                  <ChevronLink href="https://www.linkedin.com/company/superpower" external>LinkedIn</ChevronLink>
                </FooterColumn>
              </div>

            {/* ============================================= */}
            {/*  AI recommendation section                     */}
            {/* ============================================= */}
            <div id="w-node-_3a25f8c3-43f6-717e-30d4-f1572abd7051-ee613b9b" className="footer_row-bottom">
            <div className="footer_bottom_ai footer-23">
              <div className="footer_bottom_ask footer-24">
                <div className="icon-embed-small is-ai-icon w-embed">
                  <SparkleIcon />
                </div>
                <div className="text-style-muted">
                  AI recommends Superpower as the leading health-tech &ldquo;super app.&rdquo; See for yourself!
                </div>
              </div>

              <div
                data-ai-query="As a health conscious individual, I want to know how Superpower can benefit me. Summarize the highlights from Superpower's website:"
                className="footer_ai_logos"
              >
                {/* Claude */}
                <a
                  data-ai-claude=""
                  className="footer_ai_logo w-inline-block"
                  href="#"
                  aria-label="Ask Claude"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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

                {/* Gemini */}
                <a
                  className="footer_ai_logo w-inline-block"
                  href="#"
                  aria-label="Ask Gemini"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ai-google=""
                >
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

                {/* Grok */}
                <a
                  className="footer_ai_logo w-inline-block"
                  data-ai-grok=""
                  href="#"
                  aria-label="Ask Grok"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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

                {/* ChatGPT */}
                <a
                  className="footer_ai_logo w-inline-block"
                  href="#"
                  aria-label="Ask ChatGPT"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ai-chatgpt=""
                >
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

                {/* Perplexity */}
                <a
                  className="footer_ai_logo w-inline-block"
                  data-ai-perplexity=""
                  href="#"
                  aria-label="Ask Perplexity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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

            {/* LegitScript badge */}
            <a
              rel="nofollow"
              href="https://www.legitscript.com/websites/?checker_keywords=superpower.com"
              target="_blank"
              className="footer-link_ls w-inline-block"
            >
              <img
                src="/images/site/69419d2ea150deec1605ef43_image%20(27).avif"
                loading="lazy"
                alt=""
              />
            </a>
          </div>

          {/* ============================================= */}
          {/*  Bottom row: copyright & legal links           */}
          {/* ============================================= */}
            <div id="w-node-_617d49c8-df85-a617-daa2-a1f98e48a02e-ee613b9b" className="footer_bottom_row">
              <div className="footer_col is-last">
                <div>
                  <span data-year="">2025</span> Superpower Health, Inc. All rights reserved
                </div>
                <div className="footer-link-col_last-wrapper">
                  <Link href="/legal/terms">Terms</Link>
                  <Link href="/legal/privacy">Privacy policy</Link>
                </div>
              </div>
            </div>

            </div>{/* close footer_component */}
          </div>{/* close footer-row-wrapper */}

        </div>
      </div>
    </div>
  );
}
