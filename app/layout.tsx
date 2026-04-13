import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Superpower | Unlock your new health intelligence | Biomarker Testing",
  description:
    "Decode, track and take control of your health with Superpower. Get 100+ biomarker lab tests at the start of each year — no hidden fees, HSA/FSA eligible — a medical team in your pocket, and a health plan that evolves with you.",
  icons: {
    icon: "/images/site/655e22b6e154247f07cdb8f9_sp.png",
    apple: "/images/site/655e22ddea1ce803df04bcae_sp-.png",
  },
  verification: {
    google: "ekLRpPg4ltyqM3TPZEsr0Gdd7xCvatrf2rp-t0qHGHo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-mod-js" data-wf-site="63792ff4f3d6aa3d62071b61" data-intellimize-var-617155151="">
      <head>
        {/* Webflow CSS — loaded as static file, NOT processed by Next.js */}
        <link
          rel="stylesheet"
          href="/css/superpower-health.shared.d8d9f18d0.min.css"
          type="text/css"
        />
        {/* Swiper 8 CSS — carousel/slider component */}
        <link
          rel="stylesheet"
          href="/cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"
          type="text/css"
        />
        {/* Custom font declarations */}
        <link rel="stylesheet" href="/css/fonts.css" />

        {/* Anti-flicker for IX2 animations — scoped to only elements that IX2 actually
            reveals. In the React context many of these classes are used on static images
            (e.g. .image_cover-absolute) so hiding them causes red-block / blank-image
            regressions. We keep only the narrowly-scoped selectors that IX2 animates on
            the original Webflow site and that are NOT used for static content. */}
        <style
          dangerouslySetInnerHTML={{
            __html: `html.w-mod-js:not(.w-mod-ix3) :is(.blog_scroll-up_wrap, .bundle-membership-nav, .biomarker_link-item, .row-indicator, .sp2_sticky-cta-wrap) {visibility: hidden !important;}`,
          }}
        />

        {/* Font smoothing */}
        <style
          dangerouslySetInnerHTML={{
            __html: `* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }`,
          }}
        />

        {/* Select reset */}
        <style
          dangerouslySetInnerHTML={{
            __html: `select { -webkit-appearance: none; -moz-appearance: none; -ms-appearance: none; appearance: none; }`,
          }}
        />

        {/* Global styles from Webflow embed — responsive font sizing + utility overrides */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
html { font-size: 1rem; }
@media screen and (max-width:1920px) { html { font-size: calc(0.7478991596638656rem + 0.21008403361344538vw); } }
@media screen and (max-width:968px) { html { font-size: 1rem; } }

.w-richtext > :not(div):first-child, .w-richtext > div:first-child > :first-child { margin-top: 0 !important; }
.w-richtext>:last-child, .w-richtext ol li:last-child, .w-richtext ul li:last-child { margin-bottom: 0 !important; }

.pointer-events-off { pointer-events: none; }
.pointer-events-on { pointer-events: auto; }

.div-square::after { content: ""; display: block; padding-bottom: 100%; }

main:focus-visible { outline: -webkit-focus-ring-color auto 0px; }

.container-medium, .container-small, .container-large { margin-right: auto !important; margin-left: auto !important; }

.w-input, .w-select, a { color: inherit; text-decoration: inherit; font-size: inherit; }

.text-style-3lines { display: -webkit-box; overflow: hidden; -webkit-line-clamp: 3; -webkit-box-orient: vertical; }
.text-style-2lines { display: -webkit-box; overflow: hidden; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.text-style-1lines { display: -webkit-box; overflow: hidden; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
.truncate-width { width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.hide { display: none !important; }
@media screen and (max-width: 991px) { .hide, .hide-tablet { display: none !important; } }
@media screen and (max-width: 767px) { .hide-mobile-landscape { display: none !important; } }
@media screen and (max-width: 479px) { .hide-mobile { display: none !important; } }

.margin-0 { margin: 0rem !important; }
.padding-0 { padding: 0rem !important; }
.spacing-clean { padding: 0rem !important; margin: 0rem !important; }
.margin-top { margin-right: 0rem !important; margin-bottom: 0rem !important; margin-left: 0rem !important; }
.padding-top { padding-right: 0rem !important; padding-bottom: 0rem !important; padding-left: 0rem !important; }
.margin-right { margin-top: 0rem !important; margin-bottom: 0rem !important; margin-left: 0rem !important; }
.padding-right { padding-top: 0rem !important; padding-bottom: 0rem !important; padding-left: 0rem !important; }
.margin-bottom { margin-top: 0rem !important; margin-right: 0rem !important; margin-left: 0rem !important; }
.padding-bottom { padding-top: 0rem !important; padding-right: 0rem !important; padding-left: 0rem !important; }
.margin-left { margin-top: 0rem !important; margin-right: 0rem !important; margin-bottom: 0rem !important; }
.padding-left { padding-top: 0rem !important; padding-right: 0rem !important; padding-bottom: 0rem !important; }
.margin-horizontal { margin-top: 0rem !important; margin-bottom: 0rem !important; }
.padding-horizontal { padding-top: 0rem !important; padding-bottom: 0rem !important; }
.margin-vertical { margin-right: 0rem !important; margin-left: 0rem !important; }
.padding-vertical { padding-right: 0rem !important; padding-left: 0rem !important; }

@media (min-width: 992px) {
  body:has(.navbar_links-wrapper:hover) .nav_bg-overlay { display: block; }
  .navbar_links-wrapper:hover .nav-link_text:not(:hover) { opacity: 0.5; }
  .navbar-dropdown_grid:hover .navbar-dropdown_grid-item:not(:hover) { opacity: 0.5; }
  .navbar-dropdown_links-row:hover .button:not(:hover) { opacity: 0.5; }
}

.navbar-dd_links-wrapper:hover .navbar_dd-product-link { opacity: 0.5; transform: scale(0.97); }
.navbar-dd_links-wrapper:hover .navbar_dd-product-link:hover { opacity: 1; transform: scale(1); }
.biomarker-featured_item:hover .blog-cms-hero_chevron { transform: translateX(0.25rem); opacity: 1; }

[data-paralax-img] { transform: scale(1.2); }
[data-paralax-img-s] { transform: scale(1.2); }

.show-only-webflow { display: none; }
.text-rich_sp2 ul li::marker { color: #dc2626; }

/* Plyr video-card styles — the original site loads a plyr-video-card CSS file from CDN
   that sets border-radius: inherit. We replicate the essential rules here. */
.video-card { border-radius: inherit; }

@media screen and (min-width: 992px) and (max-width: 1439px) {
  .display-heading-style { font-size: 3.5rem !important; line-height: 1.142 !important; letter-spacing: -0.025em !important; }
  .heading-style-h1 { font-size: 3rem !important; line-height: 1.166 !important; letter-spacing: -0.0225em !important; }
  .heading-style-h2 { font-size: 2.5rem !important; line-height: 1.2 !important; letter-spacing: -0.02em !important; }
  .heading-style-h3 { font-size: 1.75rem !important; line-height: 1.214 !important; letter-spacing: -0.015em !important; }
  .heading-style-h4 { font-size: 1.375rem !important; line-height: 1.18 !important; letter-spacing: -0.015em !important; }
  .text-size-large { font-size: 1.125rem !important; line-height: 1.33 !important; letter-spacing: -0.09px !important; }
  .text-size-regular { font-size: 1rem !important; line-height: 1.5 !important; letter-spacing: 0px !important; }
  .text-size-small { font-size: 0.75rem !important; line-height: 1.5 !important; letter-spacing: 0px !important; }
  .text-size-tiny { font-size: 0.625rem !important; line-height: 1.6 !important; letter-spacing: 0px !important; }
  .text-size-mono { font-size: 0.75rem !important; line-height: 1.5 !important; letter-spacing: -0.24px !important; }
}

.decode_row.is-active .row-indicator { width: 14px; background-color: #DC2626; margin-right: 8px; }
.home-hero_bg-video-wrapper { background-size: cover; background-position: center; background-repeat: no-repeat; }
`,
          }}
        />

        {/* Webflow JS class detection */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`,
          }}
        />
      </head>
      <body className="background-color-white">
        {children}

        {/* Typekit fonts */}
        <Script
          src="https://use.typekit.net/xjx4hdo.js"
          strategy="beforeInteractive"
        />
        <Script
          id="typekit-load"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try{Typekit.load();}catch(e){}`,
          }}
        />

        {/* jQuery (required by Webflow runtime) */}
        <Script
          src="/js/webflow/jquery-3.5.1.min.dc5e7f18c8_site=63792ff4f3d6aa3d62071b61.js"
          strategy="beforeInteractive"
        />

        {/* Swiper 8 (carousel/slider library) */}
        <Script
          src="/cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"
          strategy="beforeInteractive"
        />

        {/* GSAP + plugins (loaded before Webflow IX2 runtime) */}
        <Script
          src="/cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/cdn.prod.website-files.com/gsap/3.14.2/gsap.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/cdn.prod.website-files.com/gsap/3.14.2/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/cdn.prod.website-files.com/gsap/3.14.2/Flip.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/cdn.prod.website-files.com/gsap/3.14.2/CustomEase.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/cdn.prod.website-files.com/gsap/3.14.2/EasePack.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/cdn.prod.website-files.com/gsap/3.14.2/Observer.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/cdn.prod.website-files.com/gsap/3.14.2/ScrollToPlugin.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/cdn.prod.website-files.com/gsap/3.14.2/TextPlugin.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/cdn.prod.website-files.com/gsap/3.14.2/SplitText.min.js"
          strategy="beforeInteractive"
        />

        {/* Webflow runtime + IX2 */}
        <Script
          src="/js/webflow/superpower-health.schunk.d9b4a6b3163aaa5e.js"
          strategy="afterInteractive"
        />
        <Script
          src="/js/webflow/superpower-health.schunk.f3f37927936844a6.js"
          strategy="afterInteractive"
        />
        <Script
          src="/js/webflow/superpower-health.schunk.1249ebd2372ba5c0.js"
          strategy="afterInteractive"
        />
        {/* Page-specific IX2 interaction data */}
        <Script
          src="/js/webflow/superpower-health.28158e07.67204377afcafd24.js"
          strategy="afterInteractive"
        />
        <Script
          src="/js/webflow/superpower-health.f370bcab.0b406ec48f250b71.js"
          strategy="afterInteractive"
        />

        {/* Analytics placeholders — uncomment/configure for production */}
        {/* PostHog */}
        <Script id="posthog-placeholder" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          window.posthog = window.posthog || { capture: function(){}, people: { set: function(){} }, identify: function(){} };
        `}} />

        {/* Segment */}
        <Script id="segment-placeholder" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          window.analytics = window.analytics || { track: function(){}, page: function(){}, identify: function(){}, load: function(){} };
          window.analytics.page();
        `}} />

        {/* GTM placeholder */}
        <Script id="gtm-placeholder" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BT53JGR46J');
        `}} />

        {/* Facebook Pixel placeholder */}
        <Script id="fbpixel-placeholder" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          window.fbq = window.fbq || function(){};
        `}} />

        {/* Global video reveal — mirrors the original Webflow inline script that
            fades in all .bunny-vids videos once they start playing or become ready */}
        <Script id="bunny-vids-reveal" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          (function(){
            function init(){
              var wraps=document.querySelectorAll('.bunny-vids');
              if(!wraps.length)return;
              wraps.forEach(function(wrap){
                var video=wrap.querySelector('video');
                if(!video)return;
                video.muted=true;
                video.playsInline=true;
                var reveal=function(){video.style.opacity='1';};
                video.addEventListener('playing',reveal,{once:true});
                video.addEventListener('canplay',function(){
                  video.play().then(reveal).catch(function(){});
                },{once:true});
                video.play().then(reveal).catch(function(){});
                setTimeout(function(){
                  if((video.readyState>=3||video.currentTime>0)&&video.style.opacity!=='1'){
                    video.play().then(reveal).catch(function(){});
                  }
                },3000);
              });
            }
            if(document.readyState==='loading'){
              document.addEventListener('DOMContentLoaded',init);
            }else{
              init();
            }
          })();
        `}} />
      </body>
    </html>
  );
}
