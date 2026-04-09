import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Script from 'next/script';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import WebflowPageId from '@/components/shared/WebflowPageId';
import BiomarkerDetailContent from '@/components/biomarkers/BiomarkerDetailContent';
import {
  getBiomarkerBySlug,
  getAllBiomarkerSlugs,
} from '@/data/biomarker-details';

/* ------------------------------------------------------------------ */
/*  Static generation                                                  */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return getAllBiomarkerSlugs().map((slug) => ({ slug }));
}

/* ------------------------------------------------------------------ */
/*  Dynamic metadata                                                   */
/* ------------------------------------------------------------------ */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const biomarker = getBiomarkerBySlug(slug);
  if (!biomarker) return {};

  return {
    title: biomarker.title,
    description: biomarker.metaDescription,
    openGraph: {
      title: biomarker.title,
      description: biomarker.metaDescription,
      url: `https://www.superpower.com/biomarkers/${biomarker.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: biomarker.title,
      description: biomarker.metaDescription,
    },
    alternates: {
      canonical: `https://www.superpower.com/biomarkers/${biomarker.slug}`,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  JSON-LD structured data                                            */
/* ------------------------------------------------------------------ */

function generateJsonLd(biomarker: NonNullable<ReturnType<typeof getBiomarkerBySlug>>) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.superpower.com/#organization',
        name: 'Superpower',
        url: 'https://www.superpower.com',
        brand: 'Superpower',
        logo: {
          '@type': 'ImageObject',
          url: 'https://cdn.prod.website-files.com/63792ff4f3d6aa3d62071b61/68757c771559473effe80139_superpower-logo-black.svg',
        },
        sameAs: [
          'https://x.com/superpower',
          'https://www.instagram.com/superpower',
          'https://www.linkedin.com/company/superpower',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.superpower.com/#website',
        url: 'https://www.superpower.com',
        name: 'Superpower',
        publisher: {
          '@id': 'https://www.superpower.com/#organization',
        },
      },
      {
        '@type': 'MedicalWebPage',
        '@id': `https://www.superpower.com/biomarkers/${biomarker.slug}/#webpage`,
        url: `https://www.superpower.com/biomarkers/${biomarker.slug}`,
        name: `${biomarker.h1} — Test Guide`,
        description: biomarker.medicalWebPageDescription,
        isPartOf: {
          '@id': 'https://www.superpower.com/#website',
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://www.superpower.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Biomarkers',
              item: 'https://www.superpower.com/biomarkers',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: biomarker.h1,
              item: `https://www.superpower.com/biomarkers/${biomarker.slug}`,
            },
          ],
        },
        mainEntity: {
          '@id': `https://www.superpower.com/biomarkers/${biomarker.slug}/#medicaltest`,
        },
      },
      {
        '@type': 'MedicalTest',
        '@id': `https://www.superpower.com/biomarkers/${biomarker.slug}/#medicaltest`,
        name: biomarker.h1,
        alternateName: biomarker.h1,
        description: biomarker.medicalTestDescription,
        url: `https://www.superpower.com/biomarkers/${biomarker.slug}`,
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/*  Page-level CSS overrides                                           */
/*  Match the original Webflow biomarker-detail screenshot state.      */
/* ------------------------------------------------------------------ */
const pageStyles = `
  /* Override Intellimize membership toggling to match original baseline.
     The attribute [data-intellimize-var-617155151] on <html> normally
     hides .section_membership-current and shows .section-membership-new.
     The original screenshot was taken before Intellimize JS ran, so the
     OLD section is visible and the NEW section is hidden.
     Although this page doesn't render membership sections itself, global
     components or future additions may include them, so we apply the
     same override used on homepage and reviews. */
  .section_membership-current {
    display: block !important;
  }
  .section-membership-new {
    display: none !important;
  }
`;

/* ------------------------------------------------------------------ */
/*  Swiper initialisation script                                       */
/*  The original Webflow page inits Swiper on .slider_component with   */
/*  slidesPerView:"auto" and centeredSlides on mobile. Replicate this  */
/*  so the "Similar biomarker tests" carousel matches the original.    */
/* ------------------------------------------------------------------ */
const swiperInitScript = `
(function(){
  if (typeof Swiper === 'undefined') return;
  var isMobile = window.matchMedia("(max-width: 991px)").matches;
  document.querySelectorAll(".slider_component").forEach(function(component) {
    var wrap = component.querySelector(".swiper");
    if (!wrap) return;
    new Swiper(wrap, {
      slidesPerView: "auto",
      speed: 300,
      cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
      centeredSlides: isMobile,
      mousewheel: { forceToAxis: true },
      keyboard: { enabled: true, onlyInViewport: true },
      navigation: {
        nextEl: component.querySelector(".slider_btn_element.is-next"),
        prevEl: component.querySelector(".slider_btn_element.is-prev")
      },
      pagination: {
        clickable: true,
        el: component.querySelector(".slider_bullet_wrap"),
        bulletClass: "slider_bullet_item",
        bulletActiveClass: "is-active",
        bulletElement: "button"
      },
      scrollbar: {
        draggable: true,
        snapOnRelease: true,
        el: component.querySelector(".slider_draggable_wrap"),
        dragClass: "slider_draggable_handle"
      }
    });
  });
})();
`;

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default async function BiomarkerDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const biomarker = getBiomarkerBySlug(slug);
  if (!biomarker) notFound();

  const jsonLd = generateJsonLd(biomarker);

  return (
    <div className="page-wrapper">
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <WebflowPageId pageId="662de62e7a966fa325943823" />

      {/* Global styles embed */}
      <div className="hide w-embed">
        <style
          dangerouslySetInnerHTML={{
            __html: `.collection_references-item:last-child .reference-separator { display: none; }`,
          }}
        />
      </div>
      <div className="global-styles w-embed">
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html { font-size: 1rem; }
              @media screen and (max-width:1920px) { html { font-size: calc(0.7478991596638656rem + 0.21008403361344538vw); } }
              @media screen and (max-width:968px) { html { font-size: 1rem; } }
              .w-richtext > :not(div):first-child, .w-richtext > div:first-child > :first-child { margin-top: 0 !important; }
              .w-richtext>:last-child, .w-richtext ol li:last-child, .w-richtext ul li:last-child { margin-bottom: 0 !important; }
              a, .w-input, .w-select, .w-tab-link, .w-nav-link, .w-dropdown-btn, .w-dropdown-toggle, .w-dropdown-link { color: inherit; text-decoration: inherit; font-size: inherit; }
              .pointer-events-off { pointer-events: none; }
              .pointer-events-on { pointer-events: auto; }
              .container-medium, .container-small, .container-large { margin-right: auto !important; margin-left: auto !important; }
              .w-input, .w-select, a { color: inherit; text-decoration: inherit; font-size: inherit; }
              .text-style-3lines { display: -webkit-box; overflow: hidden; -webkit-line-clamp: 3; -webkit-box-orient: vertical; }
              .text-style-2lines { display: -webkit-box; overflow: hidden; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
              .text-style-1lines { display: -webkit-box; overflow: hidden; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
              .hide { display: none !important; }
              @media screen and (max-width: 991px) { .hide, .hide-tablet { display: none !important; } }
              @media screen and (max-width: 767px) { .hide-mobile-landscape { display: none !important; } }
              @media screen and (max-width: 479px) { .hide-mobile { display: none !important; } }
              .margin-0 { margin: 0rem !important; }
              .padding-0 { padding: 0rem !important; }
              .text_rich-1 ul li::marker { color: #fc5f2b; }
              .text-rich_sp2 ul li::marker { color: #fc5f2b; }
              .biomarker-featured_item:hover .blog-cms-hero_chevron { transform: translateX(0.25rem); opacity: 1; }
              .blog-cms-content_main > .rich-text_editorial blockquote { max-width: none !important; margin-left: -2rem; margin-right: -2rem; width: calc(100% + 4rem); }
              .toc-link.w--current .included-toc_bullet { width: 1rem; opacity: 1; }
              .included_toc-link.w--current, .content_link.is-h2.w--current { color: #333; }
              .included_toc-link.w--current .included-toc_line, .content_link.is-h2.w--current .included-toc_line { background-color: #fc5f2b; width: 1.25rem; transition: width 0.3s ease, background-color 0.3s ease; }
              .included_toc-link:hover, .content_link.is-h2:hover { color: #333; }
              .included_toc-link:hover .included-toc_line, .content_link.is-h2:hover .included-toc_line { background-color: #fc5f2b; width: 1.25rem; transition: width 0.3s ease, background-color 0.3s ease; }
            `,
          }}
        />
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar currentPage="biomarkers" />
      <BiomarkerDetailContent biomarker={biomarker} />
      <Footer />

      {/* Swiper init for the "Similar biomarker tests" carousel */}
      <Script
        id="biomarker-swiper-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: swiperInitScript }}
      />
    </div>
  );
}
