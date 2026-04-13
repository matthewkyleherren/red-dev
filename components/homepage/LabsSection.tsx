'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function LabsSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const show = () => { video.style.opacity = '1'; };
    if (video.readyState >= 3) show();
    else {
      video.addEventListener('loadeddata', show);
      video.addEventListener('canplay', show);
    }
    return () => {
      video.removeEventListener('loadeddata', show);
      video.removeEventListener('canplay', show);
    };
  }, []);

  return (
    <div className="labs-screens_wrapper">
      <section className="section_100-labs2">
        <div className="page-padding is-padding-0-mobile">
          <div className="padding-vertical padding-xlarge">
            <div className="container-large">
              <div className="title_row is-centered2">
                <h2 className="heading-style-h1">It starts with the light</h2>
                <p className="text-size-large">
                  From skin rejuvenation to hormonal balance, red and near-infrared light at 630nm, 660nm and 850nm stimulates your mitochondria — the energy centres of your cells — triggering over 1,000 healing processes from a single session.
                </p>
                <Link href="/how-it-works" className="button is-tertiary is-icon w-inline-block">
                  <div>Learn how it works</div>
                  <div className="icon-embed-small w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                      <path d="M7 7H17M17 7V17M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Desktop visual */}
        {/* TODO: replace with red. Studio imagery */}
        <div className="labs2_visual-wrapper">
          <div className="labs2_visual-image-wrapper">
            <img
              src="/images/site/68a7a9565b28afd609739daa_Superpower%20Score.avif"
              loading="lazy"
              sizes="100vw"
              srcSet="/images/site/68a7a9565b28afd609739daa_Superpower%20Score-p-500.avif 500w, /images/site/68a7a9565b28afd609739daa_Superpower%20Score.avif 912w"
              alt="Cellular energy boost visualization"
              className="image_cover-absolute is-right-heavy"
            />
          </div>
          <div className="labs2_visual-image-wrapper is-middle">
            <div className="image_cover-absolute w-embed">
              <div
                className="bunny-vids"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: "url('/images/site/68daedbbb8ee5ec72970f065_Data%20_%C2%A0Summary.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/images/site/68daedbbb8ee5ec72970f065_Data%20_%C2%A0Summary.jpg"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    opacity: 0,
                    transition: 'opacity .6s ease',
                    willChange: 'opacity',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                  aria-hidden="true"
                >
                  <source src="/videos/sp-labs-dashboard-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <img
              src="/images/site/68a7a98ca28b2a7760e72cd0_Group%201321315829.avif"
              loading="lazy"
              alt=""
              className="labs2_visual-image-tube"
            />
            <div className="labs2_visual-border"></div>
          </div>
          <div className="labs2_visual-image-wrapper">
            <img
              src="/images/site/68a7a91e594b8d4029a38fb8_Group%201410124615.avif"
              loading="lazy"
              sizes="100vw"
              srcSet="/images/site/68a7a91e594b8d4029a38fb8_Group%201410124615-p-500.avif 500w, /images/site/68a7a91e594b8d4029a38fb8_Group%201410124615.avif 888w"
              alt="Wavelength and cellular process visualization"
              className="image_cover-absolute is-left-heavy"
            />
          </div>
          <div className="labs2_gradient"></div>
        </div>
        {/* Mobile visual */}
        {/* TODO: replace with red. Studio imagery */}
        <div className="labs2_visual-wrapper is-mobile">
          <div className="labs2_visual-image-wrapper">
            <img
              src="/images/site/68a8fbd1251843351bf65078_Frame.avif"
              alt="The image shows a liver health report with an 'A' grade, indicating efficient liver function."
              className="image_cover-absolute is-right-heavy"
            />
          </div>
          <div className="labs2_visual-image-wrapper is-middle">
            <img
              src="/images/site/68a8fbb1ba9665c2cd71afd8_Group%201321315830.avif"
              loading="lazy"
              alt=""
              className="image_cover-absolute"
            />
            <img
              src="/images/site/68a7a98ca28b2a7760e72cd0_Group%201321315829.avif"
              loading="lazy"
              alt=""
              className="labs2_visual-image-tube"
            />
          </div>
          <div className="labs2_visual-image-wrapper">
            <img
              src="/images/site/68a8fbc6e6414b46e4e861fd_MobileModal.avif"
              alt="Line graph illustrating changes in a health score over three years, with marked optimal score range."
              className="image_cover-absolute is-left-heavy"
            />
          </div>
          <div className="labs2_gradient"></div>
        </div>
      </section>
    </div>
  );
}
