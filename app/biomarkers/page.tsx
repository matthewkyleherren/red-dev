import type { Metadata } from 'next';
import Navbar from '@/components/shared/Navbar';
import Footer2 from '@/components/shared/Footer2';
import BiomarkersIndex from '@/components/biomarkers/BiomarkersIndex';
import WebflowPageId from '@/components/shared/WebflowPageId';

export const metadata: Metadata = {
  title: 'What we test - Superpower',
  description: 'Explore the range of testing options at Superpower',
  openGraph: {
    title: 'What we test - Superpower',
    description: 'Explore the range of testing options at Superpower',
    images: ['/images/site/68a46596a7cc1743771ce6f3_image%20(10).avif'],
  },
  twitter: {
    title: 'What we test - Superpower',
    description: 'Explore the range of testing options at Superpower',
    images: ['/images/site/68a46596a7cc1743771ce6f3_image%20(10).avif'],
    card: 'summary_large_image',
  },
};

export default function BiomarkersPage() {
  return (
    <div className="page-wrapper">
      <WebflowPageId pageId="699e03fd9fc07c3f97fa6ff6" />
      <Navbar currentPage="biomarkers" />
      <div className="main-wrapper">
        <BiomarkersIndex />
      </div>
      <Footer2 />
    </div>
  );
}
