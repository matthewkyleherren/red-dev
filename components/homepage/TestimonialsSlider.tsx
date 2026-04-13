'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const VERIFIED_BADGE = (
  <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.96702 0.650391L11.1675 2.50889L13.3795 2.61739L13.4915 4.82939L15.35 6.02989L14.342 8.00039L15.35 9.96739L13.4915 11.1679L13.383 13.3799L11.171 13.4919L9.97052 15.3504L8.00002 14.3424L6.03302 15.3504L4.83252 13.4919L2.62052 13.3834L2.50852 11.1714L0.650024 9.97089L1.65802 8.00039L0.650024 6.03339L2.50852 4.83289L2.61702 2.62089L4.82902 2.50889L6.02952 0.650391L8.00002 1.65839L9.96702 0.650391Z" fill="#42A5F5" />
    <path d="M7.0865 10.5378L4.815 8.26632L5.557 7.52432L7.1005 9.06432L10.4465 5.81982L11.178 6.57232L7.0865 10.5378Z" fill="white" />
  </svg>
);

interface Testimonial {
  href: string;
  poster: string;
  videoSrc: string;
  avatarSrc: string;
  name: string;
  subtitle: string;
}

const testimonials: Testimonial[] = [
  {
    href: 'https://www.instagram.com/reel/DMIJhpPiktZ/',
    poster: '/superpower-website.b-cdn.net/thumbnails/testimonial-thumbnail-4.jpg',
    videoSrc: '/videos/superpower-video-testimonial1.mp4',
    avatarSrc: '/images/site/6879e389339c62b26de7b1c5_superpower-thumbnail-testimonialsimage-4.avif',
    name: '@mytechceo',
    subtitle: '254k followers',
  },
  {
    href: 'https://www.instagram.com/p/DMJHkvfhBfh/',
    poster: '/superpower-website.b-cdn.net/thumbnails/testimonial-thumbnail-3.jpg',
    videoSrc: '/videos/superpower-video-testimonial22.mp4',
    avatarSrc: '/images/site/6879e3897a18f8fa77088f85_superpower-thumbnail-testimonialsimage-5.avif',
    name: '@emmyxtech',
    subtitle: '368k followers',
  },
  {
    href: 'https://www.instagram.com/reel/DMsqGnWxI2T/',
    poster: '/superpower-website.b-cdn.net/thumbnails/testimonial-thumbnail-5.jpg',
    videoSrc: '/videos/Instagram%20Video%20Download%20(2).mp4',
    avatarSrc: '/images/site/68a7ab87e7345b0e3f9ef689_image%20(21).avif',
    name: '@stefarmstead',
    subtitle: '90.2k, Alo wellness club trainer',
  },
  {
    href: 'https://www.instagram.com/p/DMInR8-Rjrl/',
    poster: '/superpower-website.b-cdn.net/thumbnails/testimonial-thumbnail-1.jpg',
    videoSrc: '/videos/superpower-video-testimonial4.mp4',
    avatarSrc: '/images/site/6879e389c3c2c0000da81800_superpower-thumbnail-testimonialsimage-3.avif',
    name: '@avnibarman_',
    subtitle: '228k followers',
  },
  {
    href: 'https://www.instagram.com/p/DMMT5m6NZEC/',
    poster: '/superpower-website.b-cdn.net/thumbnails/testimonial-thumbnail-2.jpg',
    videoSrc: '/videos/superpower-video-testimonial3.mp4',
    avatarSrc: '/images/site/6879e38974b970e954b903e6_superpower-thumbnail-testimonialsimage-6.avif',
    name: 'Quentin Johnston',
    subtitle: 'NFL player',
  },
  {
    href: 'https://www.instagram.com/reel/DMIJhpPiktZ/',
    poster: '/superpower-website.b-cdn.net/thumbnails/CleanShot%202025-11-07%20at%2013.15.03%402x%20(1).jpg',
    videoSrc: '/videos/Soulcycle%20Instructor%20MEGMALLOY%20Superpower%20Reel_1_1.mp4',
    avatarSrc: '/images/site/690dceae8c5c98c8e9d9858a_497240168_18505882885025224_3714902704868204735_n.avif',
    name: '@ themegmalloy',
    subtitle: 'Instructor @soulcycle',
  },
  {
    href: 'https://www.instagram.com/reel/DMIJhpPiktZ/',
    poster: '/superpower-website.b-cdn.net/thumbnails/CleanShot%202025-11-07%20at%2013.15.12%402x%20(1).jpg',
    videoSrc: '/videos/Soulcycle%20Instructor%20Julie%20D%20Superpower%20Reel_1_1.mp4',
    avatarSrc: '/images/site/690e25b657a957d4d32e085f_11848922_877430115645637_1102787095_a.avif',
    name: '@juliedsoul',
    subtitle: 'Master Instructor @soulcycle',
  },
  {
    href: 'https://www.instagram.com/reel/DMIJhpPiktZ/',
    poster: '/superpower-website.b-cdn.net/thumbnails/testimonial-thumbnail-4.jpg',
    videoSrc: '/videos/Soulcycle%20Instructor%20Jacq%20Superpower%20Reel_1_1.mp4',
    avatarSrc: '/images/site/690dceae01ebf9bcd625b8a0_474715125_1300623757913216_1504683844840803439_n.avif',
    name: '@jacqmoves',
    subtitle: 'Instructor + Talent Development @soulcycle',
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
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
    <div className="slider_item swiper-slide is-testimonial-card">
      <a href={t.href} target="_blank" rel="noopener noreferrer" className="testimonial_image-wrapper w-inline-block">
        <div className="image_cover-absolute w-embed">
          <div
            className="bunny-vids"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              ...(t.poster ? {
                backgroundImage: `url('${t.poster}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              } : {
                backgroundColor: '#1a1a1a',
              }),
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={t.poster || undefined}
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
              <source src={t.videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="testimonial_gradient-overlay"></div>
        <div className="testimonial_text-overlay">
          <img src={t.avatarSrc} loading="lazy" alt="" className="testimonial_slide-image" />
          <div className="testimonial_text-inner">
            <div className="testimonial-name_wrapper">
              <div>{t.name}<br /></div>
              <div className="icon-1x1-xxsmall w-embed">{VERIFIED_BADGE}</div>
            </div>
            <div className="text-size-tiny">{t.subtitle}</div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default function TestimonialsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const swiperInstanceRef = useRef<any>(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(false);

  useEffect(() => {
    // Only initialize Swiper on desktop (>=992px).
    // On tablet/mobile the CSS switches to a grid layout (display:grid on the
    // .swiper wrapper and display:contents!important on the .swiper-wrapper).
    // Swiper's inline styles would override that, so we must not init it.
    const isDesktop = () => window.innerWidth >= 992;

    let attempts = 0;
    const maxAttempts = 40;

    const initSwiper = () => {
      if (!sliderRef.current) return;
      const scope = sliderRef.current;
      const swiperEl = scope.querySelector('.swiper');
      if (!swiperEl) return;

      swiperInstanceRef.current = new (window as any).Swiper(swiperEl, {
        breakpoints: {
          992: { slidesPerView: 'auto' },
          421: { slidesPerView: 'auto' },
          0: { slidesPerView: 'auto' },
        },
        followFinger: true,
        freeMode: false,
        speed: 300,
        slideActiveClass: 'is-active',
        navigation: {
          nextEl: scope.querySelector('.example-slider_btn_element.is-next'),
          prevEl: scope.querySelector('.example-slider_btn_element.is-prev'),
        },
        pagination: {
          el: scope.querySelector('.example-slider_bullet_wrap'),
          bulletActiveClass: 'is-active',
          bulletClass: 'example-slider_bullet_item',
          bulletElement: 'button',
          clickable: true,
        },
      });
      setSwiperReady(true);
    };

    const destroySwiper = () => {
      if (swiperInstanceRef.current && swiperInstanceRef.current.destroy) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
        setSwiperReady(false);
      }
    };

    const tryInit = () => {
      if (typeof window !== 'undefined' && (window as any).Swiper && sliderRef.current) {
        if (isDesktop()) {
          initSwiper();
        }
        // else: leave it as CSS grid on tablet/mobile
      } else {
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(tryInit, 100);
        }
      }
    };

    tryInit();
    setIsDesktopView(isDesktop());

    // Handle resize: init/destroy Swiper when crossing the 992px breakpoint
    const handleResize = () => {
      const desktop = isDesktop();
      setIsDesktopView(desktop);
      if (desktop && !swiperInstanceRef.current) {
        if ((window as any).Swiper && sliderRef.current) {
          initSwiper();
        }
      } else if (!desktop && swiperInstanceRef.current) {
        destroySwiper();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      destroySwiper();
    };
  }, []);

  return (
    <section data-wf--sts---section-testimonial-slider--variant="base" className="section_testimonials-slider">
      <div className="page-padding">
        <div className="padding-vertical padding-xlarge">
          <div className="container-large">
            <div className="slider_component disable-on-mobile offset-before">
              <div className="how-it-works_heading-wrapper">
                <div className="page-padding-mobile">
                  <div className="title_row is-2col">
                    <div>
                      <h2>red. is transforming wellbeing in Zurich</h2>
                    </div>
                    <Link href="/how-it-works" id="w-node-_028fa369-a833-b98d-3682-9b4554be0a64-54be0a5a" className="button is-tertiary w-inline-block">
                      <div>Learn more</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              ref={sliderRef}
              data-swiper-ss-gap="example-1"
              data-swiper-scope=""
              className="example-slider_component is-testimonials-main"
            >
              <style dangerouslySetInnerHTML={{ __html: `
                :where([data-swiper-ss-gap="example-1"]) {
                  --swiper-ss-gap: 1.5rem;
                }
                @media (min-width: 479px) {
                  :where([data-swiper-ss-gap="example-1"]) { --swiper-ss-gap: 1.5rem; }
                }
                @media (min-width: 992px) {
                  :where([data-swiper-ss-gap="example-1"]) { --swiper-ss-gap: 1.5rem; }
                }
              `}} />
              <div
                data-align-last="left"
                className="example-slider_wrap swiper is-testimonials-main"
                style={!swiperReady && isDesktopView ? { overflow: 'auto', WebkitOverflowScrolling: 'touch' } : undefined}
              >
                <div className="example-slider_list swiper-wrapper is-testimonials-main">
                  {testimonials.map((t, i) => (
                    <TestimonialCard key={i} t={t} />
                  ))}
                </div>
              </div>
              <div className="example-slider_layout is-align-center hide-tablet">
                <div className="example-slider_btn_layout">
                  <div className="example-slider_btn_element is-prev">
                    <a href="#" className="button-prev w-inline-block" onClick={(e) => e.preventDefault()}>
                      <div className="icon-embed-regular w-embed">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M15 17.9966L9 11.9966L15 5.99658" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </a>
                  </div>
                  <div className="example-slider_bullet_wrap">
                    <div className="example-slider_bullet_item is-active"></div>
                    <div className="example-slider_bullet_item"></div>
                  </div>
                  <div className="example-slider_btn_element is-next">
                    <div className="button-next">
                      <div className="icon-embed-regular w-embed">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M9 17.9983L15 11.9983L9 5.99829" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
