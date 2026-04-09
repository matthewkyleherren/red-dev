'use client';

import { useEffect, useRef } from 'react';

interface HeroImage {
  src: string;
  alt: string;
  classes: string;
  overlay?: boolean;
  overlayBefore?: boolean;
}

const heroImages: HeroImage[] = [
  { src: '/images/site/6817d7f1094f40b1eab5665b_image-4.avif', alt: '', classes: 'testimonial-hero_pic-wrapper' },
  { src: '/images/site/6817d7f099749f33de0b50ed_image-6.avif', alt: '', classes: 'testimonial-hero_pic-wrapper is-second', overlay: true },
  { src: '/images/site/6817d7f01bbb86085911ee41_image-5.avif', alt: 'A man with short dark hair wearing a white shirt looking at the camera.', classes: 'testimonial-hero_pic-wrapper move-mobile-4', overlay: true },
  { src: '/images/site/6817d7f1ed0aeea15c6d9479_image-12.avif', alt: '', classes: 'testimonial-hero_pic-wrapper' },
  { src: '/images/site/681a8746bc0858231755c9b2_vinay-hiremath-opt-128.webp', alt: '', classes: 'testimonial-hero_pic-wrapper is-second', overlay: true },
  { src: '/images/site/681546c36b2309b379555ff8_image-2.avif', alt: '', classes: 'testimonial-hero_pic-wrapper' },
  { src: '/images/site/6817d7f01bbb86085911ee41_image-5.avif', alt: 'A man with short dark hair wearing a white shirt looking at the camera.', classes: 'testimonial-hero_pic-wrapper is-2-1' },
  { src: '/images/site/6817d7f099749f33de0b50ed_image-6.avif', alt: '', classes: 'testimonial-hero_pic-wrapper' },
  { src: '/images/site/6837270d5216ab186edfd848_image.avif', alt: 'A person looking to the side, wearing a dark coat, set against a blurred background.', classes: 'testimonial-hero_pic-wrapper is-second', overlay: true },
  { src: '/images/site/6837270c961b9df8b86b30d4_image-7.avif', alt: '', classes: 'testimonial-hero_pic-wrapper is-first', overlay: true },
  { src: '/images/site/6837270c1c0c73acaadd4d4c_image-5.avif', alt: 'A close-up of a person\'s eye and eyebrow, with soft lighting highlighting facial features.', classes: 'testimonial-hero_pic-wrapper', overlay: true },
  { src: '/images/site/6817d7f0e56236e59c405eca_image-3.avif', alt: '', classes: 'testimonial-hero_pic-wrapper' },
  { src: '/images/site/6837270c5216ab186edfd827_image-4.avif', alt: 'A man looking over his shoulder, partially turned towards the camera with a neutral expression.', classes: 'testimonial-hero_pic-wrapper is-first', overlay: true },
  { src: '/images/site/6814d87f47a7f5bad4e2819e_image%20(18).avif', alt: 'A person smiling at the camera, wearing a light-colored hoodie indoors.', classes: 'testimonial-hero_pic-wrapper' },
  { src: '/images/site/681f86052e5b8c350cf60e0d_image-3.avif', alt: '', classes: 'testimonial-hero_pic-wrapper' },
  { src: '/images/site/683082cdfa46664c5ce6f9e7_image-2.avif', alt: '', classes: 'testimonial-hero_pic-wrapper', overlay: true, overlayBefore: true },
  { src: '/images/site/6817d7f1c8be0f9255dad6be_image.avif', alt: '', classes: 'testimonial-hero_pic-wrapper' },
  { src: '/images/site/6817d7f0e56236e59c405eca_image-3.avif', alt: '', classes: 'testimonial-hero_pic-wrapper' },
  { src: '/images/site/6817d7f1883fd209233fa702_image-13.avif', alt: 'Smiling person with long, dark hair wearing a black shirt against a plain background.', classes: 'testimonial-hero_pic-wrapper' },
  { src: '/images/site/6837270c8b620465cfa57871_image-1.avif', alt: '', classes: 'testimonial-hero_pic-wrapper is-first', overlay: true },
  { src: '/images/site/681a88cf59c3291ce533e43f_image-3.avif', alt: '', classes: 'testimonial-hero_pic-wrapper is-second', overlay: true },
  { src: '/images/site/6814ca795f03bc1917ace86b_image%20(17).avif', alt: '', classes: 'testimonial-hero_pic-wrapper' },
  { src: '/images/site/6837270e0c5637dfc31d2f36_image-3.avif', alt: 'A person is lying down with a relaxed expression, partially covered by a patterned blanket.', classes: 'testimonial-hero_pic-wrapper is-second' },
  { src: '/images/site/6837270cc16115faaaa08827_image-6.avif', alt: '', classes: 'testimonial-hero_pic-wrapper is-first', overlay: true },
  { src: '/images/site/6817d7f0d51c9aa75a56c69f_image-8.avif', alt: 'Young person with curly hair wearing a jacket and T-shirt, looking forward against a clear sky.', classes: 'testimonial-hero_pic-wrapper is-second' },
  { src: '/images/site/6837270d5907c1a8c30d0448_image-2.avif', alt: '', classes: 'testimonial-hero_pic-wrapper is-first', overlay: true },
  { src: '/images/site/681b724f45a86c955d8c95fd_image.avif', alt: 'A person smiling and standing in front of a large, textured circular object.', classes: 'testimonial-hero_pic-wrapper' },
  { src: '/images/site/6817d7f1b5d9b32e96a81dea_image-7.avif', alt: 'Man smiling outdoors, wearing a white shirt.', classes: 'testimonial-hero_pic-wrapper' },
  { src: '/images/site/6817d7f01c8686a5b36ace98_image-1.avif', alt: 'A person with long hair and glasses is smiling outdoors, wearing a light jacket.', classes: 'testimonial-hero_pic-wrapper' },
  { src: '/images/site/6837270d5907c1a8c30d0448_image-2.avif', alt: '', classes: 'testimonial-hero_pic-wrapper move-mobile-3' },
  { src: '/images/site/6837270d5907c1a8c30d0448_image-2.avif', alt: '', classes: 'testimonial-hero_pic-wrapper move-mobile-1' },
  { src: '/images/site/681546c3c8fd52cf04d656ce_image-3.avif', alt: 'A person with curly hair looks forward, standing outdoors with trees in the background.', classes: 'testimonial-hero_pic-wrapper move-mobile-2' },
  { src: '/images/site/6817d7f1ed0aeea15c6d9479_image-12.avif', alt: '', classes: 'testimonial-hero_pic-wrapper' },
  { src: '/images/site/6817d7f076ac54694028b8bb_image-9.avif', alt: 'A person in a blue suit stands outside, looking into the distance, with buildings in the background.', classes: 'testimonial-hero_pic-wrapper' },
  { src: '/images/site/6817d7f099749f33de0b50ed_image-6.avif', alt: '', classes: 'testimonial-hero_pic-wrapper' },
];

export default function PhotoGridHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Images inside the hero are hidden by the anti-flicker rule on .image_cover-absolute.
    // Once the component mounts we make them visible.
    if (sectionRef.current) {
      const imgs = sectionRef.current.querySelectorAll('.image_cover-absolute');
      imgs.forEach((img) => {
        (img as HTMLElement).style.visibility = 'visible';
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="section_testimonial-hero">
      <div className="testimonial-hero_overlay is-inner" />
      <div className="testimonial-hero_overlay is-initial-screen" />
      <div className="page-padding z-index-2">
        <div className="padding-vertical padding-large z-index-1">
          <div className="container-large z-index-1">
            <div className="testimonial-hero_component">
              <div className="testimonial-hero_top pointer-events-none">
                <img
                  src="/images/site/681b85977d68bc64cf2c7cd1_group%201410123151.avif"
                  loading="lazy"
                  alt="Three people are shown in individual circular frames, all looking at the camera, smiling slightly."
                  className="testimonial-hero_top-image"
                />
                <div>Join thousands on the path to peak health</div>
              </div>
              <div className="show-tablet">
                <h1 className="text-color-white pointer-events-none">
                  Before Superpower, <br />healthcare left us in the dark.
                </h1>
              </div>
              <div className="hide-tablet">
                <h1 className="text-color-white pointer-events-none">
                  Before Superpower,<br />standard healthcare left our members in the dark.
                </h1>
              </div>
              <div className="margin-top margin-small">
                <div className="button-group has-more-space">
                  <a
                    href="https://superpower-health.typeform.com/to/yq3ZXRv2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button background-color-orange w-button"
                  >
                    Share your story
                  </a>
                  <a href="#stories" className="testimonial-hero_button-story w-inline-block">
                    <div>Real lives. Real failures.</div>
                    <div className="icon-1x1-medium" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo grid bar */}
      <div className="testimonial-hero_bar">
        {heroImages.map((img, i) => (
          <div key={i} className={img.classes}>
            {img.overlay && img.overlayBefore && (
              <div className="testimonial-hero_image-overlay" />
            )}
            <img
              src={img.src}
              loading="lazy"
              alt={img.alt}
              className="image_cover-absolute"
            />
            {img.overlay && !img.overlayBefore && (
              <div className="testimonial-hero_image-overlay" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
