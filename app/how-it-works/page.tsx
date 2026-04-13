import type { Metadata } from 'next';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MembershipPricing from '@/components/shared/MembershipPricing';
import MembershipCurrentSection from '@/components/homepage/MembershipCurrentSection';
import ExitIntentModal from '@/components/shared/ExitIntentModal';
import HiwHero from '@/components/how-it-works/HiwHero';
import HiwTimeline from '@/components/how-it-works/HiwTimeline';
import WeGuideYouSwiper from '@/components/how-it-works/WeGuideYouSwiper';
import MemberResults from '@/components/how-it-works/MemberResults';
import ActionPlans from '@/components/how-it-works/ActionPlans';
import FaqSection from '@/components/how-it-works/FaqSection';
import WebflowPageId from '@/components/shared/WebflowPageId';

/* ------------------------------------------------------------------ */
/*  Page-level CSS overrides                                           */
/*  Match the original Webflow how-it-works screenshot state:          */
/*  - The Intellimize attribute is present in layout.tsx but the       */
/*    original Playwright baseline captures the page WITHOUT it        */
/*    (Intellimize JS adds it dynamically). Override its CSS effects   */
/*    so the old membership section shows and the new one hides,       */
/*    matching the original visual output.                             */
/* ------------------------------------------------------------------ */
const pageStyles = `
  /* Override Intellimize membership toggling to match original baseline.
     The attribute [data-intellimize-var-617155151] on <html> normally
     hides .section_membership-current and shows .section-membership-new.
     The original screenshot was taken before Intellimize JS ran, so the
     OLD section is visible and the NEW section is hidden. */
  [data-intellimize-var-617155151] .section_membership-current {
    display: block !important;
  }
  [data-intellimize-var-617155151] .section-membership-new {
    display: none !important;
  }
`;

export const metadata: Metadata = {
  title: 'How the red. experience works',
  description:
    '11 minutes of red light therapy and guided mindfulness. Discover how the red. experience works and what to expect from your first session.',
  openGraph: {
    title: 'How the red. experience works',
    description:
      '11 minutes of red light therapy and guided mindfulness. Discover how the red. experience works and what to expect from your first session.',
    images: [
      {
        url: '/images/site/68a46596a7cc1743771ce6f3_image%20(10).avif',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How the red. experience works',
    description:
      '11 minutes of red light therapy and guided mindfulness. Discover how the red. experience works and what to expect from your first session.',
    images: ['/images/site/68a46596a7cc1743771ce6f3_image%20(10).avif'],
  },
};

export default function HowItWorksPage() {
  return (
    <div className="page-wrapper">
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <WebflowPageId pageId="68db035fea31ed641873d0c3" />
      <Navbar currentPage="how-it-works" />
      <div className="main-wrapper">
        <HiwHero />
        <HiwTimeline />
        <WeGuideYouSwiper />
        <MemberResults />
        <ActionPlans />
        <div className="spacer-huge" />
        {/* Outer wrapper matches original: <section class="section_home-membership"> */}
        <section id="pricing-1" data-wf--pricing-card-brand-499--variant="base" className="section_home-membership">
          <MembershipCurrentSection />
          <MembershipPricing />
        </section>
        <FaqSection />
      </div>
      <Footer />
      <ExitIntentModal />
    </div>
  );
}
