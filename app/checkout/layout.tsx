import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - Superpower",
  robots: "noindex",
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Checkout design system CSS (Tailwind v4) — separate from Webflow */}
      <link rel="stylesheet" href="/css/checkout-styles.css" />

      {/* Preload NB International Pro fonts for checkout */}
      <link
        rel="preload"
        href="/fonts/nbinternationalproreg-webfont.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/nbinternationalpromono-webfont.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/nbinternationalpromed-webfont.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {/*
        Override Webflow CSS conflicts with Tailwind utilities.
        The root layout loads Webflow CSS (unlayered) which defines
        .grid { width:1.5rem; height:1.5rem; position:absolute }
        These extra properties break Tailwind's .grid { display:grid }
        because both rule sets apply (different properties, no cascade
        conflict — Webflow adds width/height/position that Tailwind
        doesn't reset).
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        /*
          The root layout sets a responsive html { font-size } that scales
          with viewport width (e.g. ~15px at 1440px). The original checkout
          SPA loads independently without Webflow globals, so it uses the
          browser-default 16px root. Override to 16px so all rem-based
          values in checkout-styles.css match the original.
        */
        html { font-size: 16px; }
        /* Reset Webflow .grid { width:1.5rem; height:1.5rem; position:absolute } */
        .theme-web .grid {
          width: auto;
          height: auto;
          position: static;
        }
        /*
          Webflow's unlayered .hidden { display:none } beats Tailwind's
          @layer utilities responsive overrides (md:flex, md:block, etc.)
          because unlayered CSS always wins over layered CSS.
          Re-declare responsive display utilities as unlayered so they
          can properly override .hidden at their breakpoints.
        */
        @media (min-width: 768px) {
          .theme-web .md\\:flex { display: flex; }
          .theme-web .md\\:block { display: block; }
          .theme-web .md\\:hidden { display: none; }
          .theme-web .md\\:grid { display: grid; }
        }
        /*
          Webflow's unlayered heading tag rules (h1 { font-size:4rem },
          h3 { font-size:1.5rem }, etc.) beat the checkout CSS's layered
          type-heading-* utilities (@layer utilities) because unlayered
          CSS always wins over layered CSS.

          Fix: re-declare the type-heading-* and type-body-* utilities
          as unlayered rules scoped under .theme-web so they can override
          Webflow's tag-level heading/body styles.
        */
        .theme-web h1,
        .theme-web h2,
        .theme-web h3,
        .theme-web h4,
        .theme-web h5,
        .theme-web h6 {
          font-size: inherit;
          font-weight: inherit;
          line-height: inherit;
          letter-spacing: inherit;
          font-family: inherit;
          margin: 0;
        }
        /* Re-declare margin utilities used on headings so they beat the
           heading margin:0 reset above (both are unlayered, so last wins) */
        .theme-web .mb-2 { margin-bottom: calc(.25rem * 2); }
        .theme-web .mb-4 { margin-bottom: calc(.25rem * 4); }
        .theme-web .mb-6 { margin-bottom: calc(.25rem * 6); }
        .theme-web .type-heading-lg {
          font-size: var(--heading-lg-size);
          line-height: var(--heading-lg-lh);
          letter-spacing: var(--heading-lg-ls);
        }
        .theme-web .type-heading-md {
          font-size: var(--heading-base-size);
          line-height: var(--heading-base-lh);
          letter-spacing: var(--heading-base-ls);
        }
        .theme-web .type-heading-sm {
          font-size: var(--heading-sm-size);
          line-height: var(--heading-sm-lh);
          letter-spacing: var(--heading-sm-ls);
        }
        .theme-web .type-heading-xs {
          font-size: var(--heading-xs-size);
          line-height: var(--heading-xs-lh);
          letter-spacing: var(--heading-xs-ls);
        }
        .theme-web .type-body-lg {
          font-size: var(--text-lg-size);
          line-height: var(--text-lg-lh);
          letter-spacing: var(--text-lg-ls);
        }
        .theme-web .type-body-md {
          font-size: var(--text-base-size);
          line-height: var(--text-base-lh);
          letter-spacing: var(--text-base-ls);
        }
        .theme-web .type-body-sm {
          font-size: var(--text-sm-size);
          line-height: var(--text-sm-lh);
          letter-spacing: var(--text-sm-ls);
        }
        /*
          Webflow's unlayered label { font-weight:700; margin-bottom:5px }
          and p { line-height:1.5; letter-spacing:-.2px; margin-bottom:0 }
          override checkout CSS (layered). Reset them.
        */
        .theme-web label {
          font-weight: inherit;
          margin-bottom: 0;
        }
        .theme-web p {
          line-height: inherit;
          letter-spacing: inherit;
          margin: 0;
        }
        /*
          Webflow's unlayered input { line-height:normal } and
          a { display:inline-flex } override layered checkout utilities.
          Re-declare typography utilities for inputs/buttons so they
          apply correctly.
        */
        .theme-web .typography-largebody {
          letter-spacing: -.01rem;
          font-size: 1rem;
          line-height: 1.375rem;
        }
        .theme-web .typography-body {
          letter-spacing: 0;
          font-size: .875rem;
          line-height: 1.25rem;
        }
      `}} />

      <div className="font-sans antialiased theme-web type-body-md">
        {children}
      </div>
    </>
  );
}
