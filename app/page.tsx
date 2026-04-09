import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MembershipPricing from '@/components/shared/MembershipPricing';
import MembershipCurrentSection from '@/components/homepage/MembershipCurrentSection';
import ExitIntentModal from '@/components/shared/ExitIntentModal';
import HeroSection from '@/components/homepage/HeroSection';
import QuickFeatures from '@/components/homepage/QuickFeatures';
import LabsSection from '@/components/homepage/LabsSection';
import TrustpilotStats from '@/components/homepage/TrustpilotStats';
import HowItWorks from '@/components/homepage/HowItWorks';
import TestimonialsSlider from '@/components/homepage/TestimonialsSlider';
import ClearMobileSection from '@/components/homepage/ClearMobileSection';
import WhatsIncluded from '@/components/homepage/WhatsIncluded';
import CliniciansSection from '@/components/homepage/CliniciansSection';
import FAQSection from '@/components/homepage/FAQSection';
import BiomarkersTestSection from '@/components/homepage/BiomarkersTestSection';
import CTASection from '@/components/homepage/CTASection';
import WebflowPageId from '@/components/shared/WebflowPageId';

/* ------------------------------------------------------------------ */
/*  Page-level CSS overrides                                           */
/*  Match the original Webflow homepage screenshot state:              */
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

export default function HomePage() {
  return (
    <div className="page-wrapper">
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <WebflowPageId pageId="68b17f4a7aae8a1c4f21e663" />
      <Navbar currentPage="/" />
      <HeroSection />
      <QuickFeatures />
      <LabsSection />
      <TrustpilotStats />
      <HowItWorks />
      <TestimonialsSlider />
      <ClearMobileSection />
      <WhatsIncluded />
      <CliniciansSection />
      {/* Outer wrapper matches original: <section class="section_home-membership"> */}
      <section id="pricing-1" data-wf--pricing-card-brand-499--variant="base" className="section_home-membership">
        <MembershipCurrentSection />
        <MembershipPricing />
      </section>
      <FAQSection />
      <BiomarkersTestSection />
      <CTASection />
      <Footer />
      <ExitIntentModal />
    </div>
  );
}
