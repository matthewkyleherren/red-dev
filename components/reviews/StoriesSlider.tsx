'use client';

import { useState, useCallback, useRef, useEffect, MouseEvent } from 'react';

/* ------------------------------------------------------------------ */
/*  Play Button SVG                                                    */
/* ------------------------------------------------------------------ */
function PlayButton() {
  return (
    <div className="play-btn-content-wrapper z-index-2">
      <div className="icon-1x1-medium member-stories_video-play-btn">
        <div className="icon-1x1-xsmall play-btn w-embed">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path
              d="M5.57129 5.4032C5.57129 4.61203 6.44654 4.13419 7.11205 4.56202L18.2628 11.7304C18.8751 12.124 18.8751 13.0191 18.2628 13.4127L7.11205 20.581C6.44654 21.0089 5.57129 20.531 5.57129 19.7399V5.4032Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Slide data                                                         */
/* ------------------------------------------------------------------ */
interface StorySlide {
  quote: string;
  image: string;
  alt: string;
  name: string;
  memberSince: string;
  hasVideo: boolean;
  vimeoId?: string;
  videoPoster?: string;
  videoMp4?: string;
  videoWebm?: string;
  tabletName?: string;
  tabletMemberSince?: string;
}

const stories: StorySlide[] = [
  {
    quote: '"After a health scare and years of piecing together care alone, Chad found more than just data - he found clarity. In this story, he shares how Superpower changed his health journey and helped a loved one uncover a life-altering condition just in time."',
    image: '/images/site/6817d7f01bbb86085911ee41_image-5.avif',
    alt: 'A man with short dark hair wearing a white shirt looking at the camera.',
    name: 'Chad Byers, 38',
    memberSince: 'Member since Aug 2024',
    hasVideo: true,
    vimeoId: '1082693790',
    videoPoster: '/images/site/682252e3eb19a615a7992384_chad-img-poster-00001.jpg',
    videoMp4: 'https://cdn.prod.website-files.com/63792ff4f3d6aa3d62071b61%2F682252e3eb19a615a7992384_chad-img-transcode.mp4',
    videoWebm: 'https://cdn.prod.website-files.com/63792ff4f3d6aa3d62071b61%2F682252e3eb19a615a7992384_chad-img-transcode.webm',
    tabletName: 'Chad Bayers, 38',
    tabletMemberSince: 'Member since Aug 2024',
  },
  {
    quote: '"I joined Superpower expecting it to confirm what I already knew...cutting out nightshades and switching B vitamins made a world of difference...When I\'m with my daughter, I\'m actually there. That shift means the world to me."',
    image: '/images/site/681f8604ebd29d59024c2811_image-2.avif',
    alt: 'Man standing against a textured wall, smiling with arms crossed.',
    name: 'Stephen Cole, 39',
    memberSince: 'Member since Dec 2024',
    hasVideo: false,
  },
  {
    quote: 'After struggling with unexplained fatigue and a frustrating search for answers, Matt discovered how foundational health is to his role as a founder. In this story, he shares how Superpower helps him cut through the noise, stay grounded in data, and show up at his best.',
    image: '/images/site/681f87d204d6af08356f2a20_image.avif',
    alt: 'A person in a suit is smiling in a portrait.',
    name: 'Matt Wan, 26',
    memberSince: 'Member since Jul 2024',
    hasVideo: true,
    vimeoId: '1082695438',
    videoPoster: '/images/site/68308825129866ee2d3f90e6_cleanshot%202025-05-23%20at%20173403%20(1)-poster-00001.jpg',
    videoMp4: 'https://cdn.prod.website-files.com/63792ff4f3d6aa3d62071b61%2F68308825129866ee2d3f90e6_CleanShot%202025-05-23%20at%20173403%20%281%29-transcode.mp4',
    videoWebm: 'https://cdn.prod.website-files.com/63792ff4f3d6aa3d62071b61%2F68308825129866ee2d3f90e6_CleanShot%202025-05-23%20at%20173403%20%281%29-transcode.webm',
    tabletName: 'Matt Wan, 26',
    tabletMemberSince: 'Member since Jul 2024',
  },
  {
    quote: 'Cassandra went from runways to burnout - hair loss, 24 cavities, and months unable to get out of bed. But she didn\'t see the red flags until it was too late. In this raw story, she shares how tracking her health gave her control, clarity, and the strength to keep showing up.',
    image: '/images/site/681f87d2348847d2346d72b3_image-1.avif',
    alt: 'Smiling person with long brown hair and bright eyes, looking directly at the camera.',
    name: 'Cassandra Bankson, 32',
    memberSince: 'Member since Dec 2024',
    hasVideo: true,
    vimeoId: '1082359237',
    videoPoster: '/images/site/681bf0bc11997aac25afc8dd_cassandra-compressed-poster-00001.jpg',
    videoMp4: 'https://cdn.prod.website-files.com/65f921fa1b48de4de78f7eab%2F681bf0bc11997aac25afc8dd_Cassandra-Compressed-transcode.mp4',
    videoWebm: 'https://cdn.prod.website-files.com/65f921fa1b48de4de78f7eab%2F681bf0bc11997aac25afc8dd_Cassandra-Compressed-transcode.webm',
    tabletName: 'Cassandra Bankson, 32',
    tabletMemberSince: 'Member since Dec 2024',
  },
];

export default function StoriesSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const slideCount = stories.length;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Reset play state when slide changes
  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
    }
  }, [activeIndex]);

  // Un-hide .image_cover-absolute elements that are hidden by the global anti-flicker rule
  useEffect(() => {
    if (sectionRef.current) {
      const imgs = sectionRef.current.querySelectorAll('.image_cover-absolute');
      imgs.forEach((img) => {
        (img as HTMLElement).style.visibility = 'visible';
      });
    }
  }, [activeIndex]);

  const handlePlayClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.muted = false;
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy may block unmuted playback; try muted
        video.muted = true;
        video.play().then(() => setIsPlaying(true));
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((p) => (p - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const next = useCallback(() => {
    setActiveIndex((p) => (p + 1) % slideCount);
  }, [slideCount]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold) next();
    else if (diff < -threshold) prev();
  }, [next, prev]);

  const story = stories[activeIndex];

  return (
    <section ref={sectionRef} id="stories" className="section-testimonial-story">
      <div className="page-padding">
        <div className="padding-vertical padding-large">
          <div className="container-large z-index-1">
            <div className="testimonial-moving_title-row">
              <h2 className="heading-style-h1">How Superpower is changing lives</h2>
            </div>

            {/* Slider */}
            <div className="testimonial-story_slider">
              <div
                className="testimonial-story_slider-mask"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="testimonial-story_slide" style={{ display: 'block' }}>
                  <div className="testimonial-story_slide-content">
                    <div className="testimonial-story_left">
                      <p>{story.quote}</p>
                      <div className="testimonial-story_bottom">
                        <img
                          src={story.image}
                          loading="lazy"
                          alt={story.alt}
                          className="testimonial_slide-image is-bigger"
                        />
                        <div>
                          {story.name}<br />
                          <span className="text-style-muted">{story.memberSince}</span>
                        </div>
                      </div>
                    </div>
                    <div className="testimonial-story_right">
                      {story.hasVideo ? (
                        <a
                          href="#"
                          className="member-stories_link-btn is-full-screen w-inline-block"
                          onClick={handlePlayClick}
                          style={{ cursor: 'pointer' }}
                        >
                          <div style={{ opacity: isPlaying ? 0 : 1, transition: 'opacity 0.2s ease' }}>
                            <PlayButton />
                          </div>
                          {story.videoPoster && (
                            <div className="image_cover-absolute z-index-1 w-background-video w-background-video-atom">
                              <video
                                ref={videoRef}
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{
                                  backgroundImage: `url(${story.videoPoster})`,
                                  objectFit: 'cover',
                                  width: '100%',
                                  height: '100%',
                                }}
                              >
                                {story.videoMp4 && <source src={story.videoMp4} type="video/mp4" />}
                                {story.videoWebm && <source src={story.videoWebm} type="video/webm" />}
                              </video>
                            </div>
                          )}
                          <div className="testimonial-story_right-tablet-text">
                            <div>
                              {story.tabletName || story.name}<br />
                              <span className="text-style-muted">{story.tabletMemberSince || story.memberSince}</span>
                            </div>
                          </div>
                        </a>
                      ) : (
                        <>
                          <img
                            src={story.image}
                            loading="lazy"
                            alt={story.alt}
                            className="image_cover-absolute"
                          />
                          <a href="#" className="testimonial-story_button" onClick={(e) => e.preventDefault()}>
                            Read story
                          </a>
                          <div className="testimonial-story_right-tablet-text is-static">
                            <div>
                              {story.name}<br />
                              <span className="text-style-muted">{story.memberSince}</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrows */}
              <div className="testimonial-story_arrow w-slider-arrow-left" onClick={prev}>
                <div className="testimonial-story_arrow-icon w-icon-slider-left" />
              </div>
              <div className="testimonial-story_arrow is-right w-slider-arrow-right" onClick={next}>
                <div className="testimonial-story_arrow-icon w-icon-slider-right" />
              </div>

              {/* Dots */}
              <div className="testimonial-story_nav w-slider-nav w-slider-nav-invert w-round">
                {stories.map((_, i) => (
                  <div
                    key={i}
                    className={`w-slider-dot${i === activeIndex ? ' w-active' : ''}`}
                    onClick={() => setActiveIndex(i)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Go to story ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
              .w-slider-dot {
                background-color: #d3d3d3 !important;
                cursor: pointer;
              }
              .w-slider-dot.w-active {
                background-color: #EA5B2F !important;
              }
            `}} />
          </div>
        </div>
      </div>
    </section>
  );
}
