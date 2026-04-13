'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure hero background video fades in after loading
    const video = heroVideoRef.current;
    if (!video) return;

    const show = () => {
      video.style.opacity = '1';
    };

    if (video.readyState >= 3) {
      show();
    } else {
      video.addEventListener('loadeddata', show);
      video.addEventListener('canplay', show);
    }

    // On mobile, autoplay may need an explicit play() call
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was blocked; the poster/background-image is the fallback.
        // Still show the video element in case it loads later.
      });
    }

    return () => {
      video.removeEventListener('loadeddata', show);
      video.removeEventListener('canplay', show);
    };
  }, []);

  return (
    <div className="main-wrapper">
      <div className="sticky_wrap">
        <div data-w-id="6e1c087f-8a2f-b858-8e2b-6741c8b0d219" className="sticky_trigger">
          <div className="sticky_track">
            <div className="sticky_element">
              <section className="section_home-hero flex-align-left">
                <div className="page-padding padding-section-medium">
                  <div className="container-large z-index-2">
                    <div className="home-hero_content max-width-medium home-hero_left-align">
                      <div className="home-hero_text-wrapper">
                        <h1 className="display-heading-style">Where red light meets mindfulness</h1>
                        <p className="text-size-large">
                          Switzerland&apos;s first elite red light therapy studio. In the heart of Zurich.
                        </p>
                      </div>
                      <div className="home-hero_checklist">
                        <div className="hero_checklist-row">
                          <div className="icon-embed-xsmall w-embed">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 15 15" fill="none">
                              <path d="M12.3342 4.12268L6.00824 10.4486L3.13281 7.5732" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <div className="text-size-small">Full-body red light therapy</div>
                        </div>
                        <div className="hero_checklist-row">
                          <div className="icon-embed-xsmall w-embed">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 15 15" fill="none">
                              <path d="M12.3342 4.12268L6.00824 10.4486L3.13281 7.5732" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <div className="text-size-small">Guided mindfulness meditation</div>
                        </div>
                        <div className="hero_checklist-row">
                          <div className="icon-embed-xsmall w-embed">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 15 15" fill="none">
                              <path d="M12.3342 4.12268L6.00824 10.4486L3.13281 7.5732" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <div className="text-size-small">Benefits that compound over time</div>
                        </div>
                      </div>
                      <div className="margin-top margin-medium">
                        <div className="button_row">
                          <Link href="/checkout" className="button is-large is-icon w-inline-block">
                            <div>Book your experience</div>
                            <div className="icon-embed-regular w-embed">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </Link>
                        </div>
                      </div>
                      {/* TODO: replace with red. Studio imagery */}
                      {/* Original: HSA/FSA badge — removed for red. Studio */}
                    </div>
                  </div>
                </div>
                <div
                  className="home-hero_bg-video-wrapper"
                  /* TODO: replace with red. Studio imagery */
                  style={{ backgroundImage: "url('/images/site/695c3e7cc0c9cb6396ba2a28_superpower-poster-hero1.webp')" }}
                >
                  <div className="image_cover-absolute w-embed">
                    <div className="bunny-vids" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
                      <video
                        ref={heroVideoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center center',
                          opacity: 0,
                          transition: 'opacity 0.6s',
                          willChange: 'opacity',
                          backfaceVisibility: 'hidden',
                          transform: 'translateZ(0)',
                        }}
                      >
                        <source src="/videos/superpower-100-year-potential-video-hero.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
                <div className="cta_shape-overlay is-bottom is-hero"></div>
                <div className="hero_scroll-arrow-wrapper">
                  <div className="hero_scroll-arrow w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5.8335 5L10.0002 9.16667L14.1668 5M5.8335 10.8333L10.0002 15L14.1668 10.8333" stroke="#A1A1AA" strokeWidth="1.45833" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="hero-gradient-overlay_wrapper">
                  <div className="hero-gradient-overlay"></div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
