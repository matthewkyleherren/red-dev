import Link from 'next/link';

/* SVG Icons */
const PlayIcon = () => (
  <div className="play-icon w-embed">
    <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 2L13 8L3 14V2Z" fill="currentColor" />
    </svg>
  </div>
);

const ChevronIcon = () => (
  <div className="chevron-icon w-embed">
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const XIcon = () => (
  <div className="icon-1x1-regular w-embed">
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
    </svg>
  </div>
);

const InstagramIcon = () => (
  <div className="icon-1x1-regular w-embed">
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="currentColor"/>
    </svg>
  </div>
);

const LinkedInIcon = () => (
  <div className="icon-1x1-regular w-embed">
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
    </svg>
  </div>
);

/* Link data */
const superpowerLinks = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'What we test', href: '/biomarkers' },
  { label: 'Member Login', href: 'https://app.superpower.com/signin?redirectTo=%2F' },
  { label: 'Gift Superpower', href: '/on-us' },
];

const companyLinks = [
  { label: 'Our Why', href: '/manifesto' },
  { label: 'Join the Team', href: 'https://superpower-health.webflow.io/careers', hiring: true },
  { label: 'Superpower Labs', href: 'https://healthiesthoodie.com/' },
  { label: 'Contact Us', href: 'mailto:hello@superpower.com' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQs', href: '/faqs' },
];

const partnershipLinks = [
  { label: 'For Creators', href: 'https://superpower-health.typeform.com/to/VQKeJvKr' },
  { label: 'For Partners', href: 'https://superpower-health.webflow.io/partner' },
  { label: 'For Business', href: 'https://superpower-health.webflow.io/organizations' },
];

const compareLinks = [
  { label: 'Function Health', href: '/superpower-vs-function-health' },
  { label: 'Mito Health', href: '/superpower-vs-mito-health' },
  { label: 'Marek Health', href: '/' },
  { label: 'InsideTracker', href: '/superpower-vs-insidetracker' },
];

const resourceLinks = [
  { label: 'Biomarker tests', href: '/biomarkers' },
  { label: 'Blood Tests', href: '/blood-test' },
  { label: 'Biomarker Guides', href: '/biomarker-guides' },
  { label: 'Blog', href: '/blog' },
  { label: 'Disease Blood Tests', href: '/disease-blood-test' },
  { label: 'Environmental Toxins', href: '/environmental-toxins' },
  { label: 'Disease Testing', href: '/diseases' },
  { label: 'Library', href: '/library' },
  { label: 'Gut Microbiome', href: '/gut-biomarkers' },
  { label: 'Cancer Biomarkers', href: '/cancer-biomarkers' },
  { label: 'Best Biomarkers', href: '/best-biomarkers' },
  { label: 'Heavy Metals', href: '/heavy-metals' },
];

const clinicalLinks = [
  { label: 'The Complete Guide to Biomarker Testing', href: '/library/guide-to-biomarker-testing' },
  { label: 'Immune System Biomarker', href: '/library/immune-system-biomarkers' },
  { label: 'Energy Biomarkers', href: '/library/energy-biomarkers' },
  { label: 'Liver Health Biomarkers', href: '/library/liver-health-biomarkers' },
  { label: 'Body Composition Biomarkers', href: '/library/body-composition-biomarkers' },
  { label: 'DNA Biomarkers', href: '/library/dna-biomarkers' },
  { label: 'Thyroid Biomarkers', href: '/library/thyroid-health-biomarkers' },
  { label: 'Metabolic Biomarker Testing', href: '/library/metabolic-health-biomarker-testing' },
  { label: '5 Biomarkers Everyone Should Test', href: '/library/5-biomarkers-everyone-should-test' },
];

const aiLinks = [
  { name: 'Claude', attr: 'data-ai-claude', img: '/images/site/69086d2f5f01b9446acb9069_Claude_AI_symbol.svg.avif', urlPrefix: 'https://claude.ai/new?q=tell+me+about+' },
  { name: 'Gemini', attr: 'data-ai-google', img: '/images/site/69086d2eaa31ec31adbc3068_Google_Bard_logo (1).svg', urlPrefix: 'https://www.google.com/search?q=tell+me+about+', urlSuffix: '&udm=50' },
  { name: 'Grok', attr: 'data-ai-grok', img: '/images/site/69086d2ead1bba9a3cbfe89b_grok-seeklogo-.svg', urlPrefix: 'https://x.com/i/grok?text=tell+me+about+' },
  { name: 'ChatGPT', attr: 'data-ai-chatgpt', img: '/images/site/69086d2e8abb39d214274f30_openai-svgrepo-com.svg', urlPrefix: 'https://chat.openai.com/?q=tell+me+about+' },
  { name: 'Perplexity', attr: 'data-ai-perplexity', img: '/images/site/6908c19b562e1c37ed6cd7c1_perplexity logo.svg', urlPrefix: 'https://www.perplexity.ai/search/new?q=tell+me+about+', extraClass: 'footer-42' },
];

function BadgesSection() {
  return (
    <div className="footer2_badges">
      <div className="badges_group">
        <div className="badge _1">
          <img className="footer2_qr" src="/images/site/69939f42f199d3cee202fbc1_Superpower_App_QR.svg" alt="QR Code" loading="lazy" />
        </div>
        <a className="link-block-6" href="https://ctrk.klclick.com/l/01KHP4QZR0ZYHK4RYTB2F86GVG_29" target="_blank" rel="noopener noreferrer">
          <img className="badge _2" src="/images/site/69cf8ab170df734f1e10f525_Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917 1.svg" alt="Download on the App Store" loading="lazy" />
        </a>
      </div>
      <div className="badge _3">
        <div className="footer2_video-wrap">
          <div className="footer2_ceo-video-card">
            <div className="video-card is-bg">
              <video className="vc-video" src="https://superpower-website.b-cdn.net/faq/2_howitworks-landscape%20(1).mp4" playsInline loop preload="metadata" muted />
              <div className="play-button is-small">
                <div className="play-icon-wrap gradient-border2">
                  <PlayIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="footer2_video-content">
            <div>Hear from our CEO</div>
            <a href="#"><div className="text-color-tertiary">Play video</div></a>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkGroup({ header, links, isChevron }: { header: string; links: { label: string; href: string; hiring?: boolean }[]; isChevron?: boolean }) {
  return (
    <div className="footer_link-group">
      <div className="footer_link-header">{header}</div>
      {links.map((link) => (
        isChevron ? (
          <div className="w-dyn-item" key={link.href}>
            <div className="chevron-link">
              <Link href={link.href} className="footer-link text-style-1lines">{link.label}</Link>
            </div>
          </div>
        ) : (
          <Link key={link.href + link.label} href={link.href} className="footer-link">
            {link.label}
            {link.hiring && (
              <>
                {' '}<span className="span_italic text-color-orange text-size-tiny">We&apos;re hiring</span>
              </>
            )}
          </Link>
        )
      ))}
    </div>
  );
}

export default function Footer2() {
  return (
    <footer className="section_footer2">
      <div className="page-padding">
        <div className="padding-section-large">
          {/* Main upper footer */}
          <div className="footer2_component">
            {/* Group 1: Newsletter + Badges (desktop) */}
            <div className="footer2_group1">
              <div className="footer2_newsletter">
                <Link href="/" aria-label="home">
                  <img
                    className="comparison_sp-logo is-footer"
                    src="/images/site/68757c771559473effe80139_superpower-logo-black.svg"
                    alt="Superpower"
                    loading="lazy"
                  />
                </Link>
                <div className="footer2_about">
                  <div className="text-color-secondary">
                    <span className="text-color-primary">Not sure where to start?</span> Sign up to receive the Superpower Code: a free guide to understanding your health and the systems that matter most.
                  </div>
                </div>
                <div className="newsletter_footer-block w-form">
                  <form className="newsletter_footer-form">
                    <input className="newsletter_input-field w-input" type="email" placeholder="Your email" required />
                    <input className="button has-rounded-corners is-black w-button" type="submit" value="Sign up" />
                  </form>
                  <div className="newsletter_footer-forms-success w-form-done" style={{ display: 'none' }}>
                    You&apos;re in! Thanks for subscribing.
                  </div>
                  <div className="w-form-fail" style={{ display: 'none' }}>
                    Oops! Something went wrong while submitting the form.
                  </div>
                </div>
              </div>
              {/* Desktop badges */}
              <div className="hide-tablet">
                <BadgesSection />
              </div>
            </div>

            {/* Group 2: Link columns */}
            <div className="footer2_group2">
              <div className="footer2_column">
                <LinkGroup header="Superpower" links={superpowerLinks} />
                <LinkGroup header="Company" links={companyLinks} />
                <LinkGroup header="Partnerships" links={partnershipLinks} />
              </div>
              <div className="footer2_column">
                <LinkGroup header="Compare" links={compareLinks} />
                <LinkGroup header="Resources" links={resourceLinks} />
              </div>
              <div className="footer2_column">
                <div className="w-dyn-list">
                  <LinkGroup header="Clinical &amp; Research" links={clinicalLinks} isChevron />
                </div>
                {/* Social links - mobile only */}
                <div className="show-mobile-landscape">
                  <div className="footer_link-group">
                    <div className="footer_link-header">Connect</div>
                    <a href="https://x.com/superpower" className="footer_social-link" target="_blank" rel="noopener noreferrer">
                      <XIcon />
                      <span>Twitter / X</span>
                    </a>
                    <a href="https://www.instagram.com/superpower" className="footer_social-link" target="_blank" rel="noopener noreferrer">
                      <InstagramIcon />
                      <span>Instagram</span>
                    </a>
                    <a href="https://www.linkedin.com/company/superpower" className="footer_social-link" target="_blank" rel="noopener noreferrer">
                      <LinkedInIcon />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Tablet/mobile badges */}
            <div className="show-tablet">
              <BadgesSection />
            </div>
          </div>

          {/* AI + LegitScript section */}
          <div className="footer2_component is-bottom">
            <div className="footer_bottom_ai footer-23">
              <div className="footer_bottom_ask footer-24">Ask AI about Superpower</div>
              <div className="footer_ai_logos footer-27" data-ai-query="">
                {aiLinks.map((ai) => (
                  <a
                    key={ai.name}
                    className="footer_ai_logo footer-40"
                    aria-label={`Ask ${ai.name}`}
                    href={`${ai.urlPrefix}superpower.com${ai.urlSuffix || ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className={`footer_ai_img footer-41${ai.extraClass ? ` ${ai.extraClass}` : ''}`}>
                      <img className="image_cover-absolute" src={ai.img} alt={ai.name} loading="lazy" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="badge _4 gradient-border2">
              <img className="badge-legitscr" src="/images/site/698519548e1da6a90398670d_image-legit-script.avif" alt="LegitScript Certified" loading="lazy" />
              <div className="text-color-secondary">We are LegitScript Certified</div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer2_bottom">
            <div className="footer2-gradient w-embed">
              <svg width="100%" height="100%" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <filter id="f2blur" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="80" />
                  </filter>
                </defs>
                <ellipse cx="400" cy="300" rx="300" ry="200" fill="#DC2626" opacity="0.15" filter="url(#f2blur)" />
                <ellipse cx="700" cy="350" rx="250" ry="180" fill="#f4a100" opacity="0.1" filter="url(#f2blur)" />
                <ellipse cx="600" cy="250" rx="400" ry="250" fill="white" opacity="0.3" filter="url(#f2blur)" />
              </svg>
            </div>
            <img
              className="footer2_bottom-logo"
              src="/images/site/6988fc947cab858de64d4940_Vector (2).svg"
              alt="Superpower"
              loading="lazy"
            />
            <div className="footer2_bottom_row">
              <div className="footer2_bottom-row-content">
                <div><span data-year="">2026</span> Superpower Health, Inc. All rights reserved</div>
                <div className="footer-link-col_last-wrapper">
                  <Link href="/legal/terms" className="footer-link">Terms</Link>
                  <Link href="/legal/privacy" className="footer-link">Privacy policy</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
