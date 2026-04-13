'use client';

import { useEffect, useRef } from 'react';

/* ------------------------------------------------------------------ */
/*  Corner SVG component                                               */
/* ------------------------------------------------------------------ */
function CornerBorders() {
  return (
    <div className="testimonial-sticky_corner-wrapper">
      <div className="sticky_corner w-embed">
        <svg width="100%" height="100%" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 10V0H11" stroke="#DC2626" />
        </svg>
      </div>
      <div className="sticky_corner is-2 w-embed">
        <svg width="100%" height="100%" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10V0H2.98023e-07" stroke="#DC2626" />
        </svg>
      </div>
      <div className="sticky_corner is-3 w-embed">
        <svg width="100%" height="100%" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 -4.17233e-07V10H10" stroke="#DC2626" />
        </svg>
      </div>
      <div className="sticky_corner is-4 w-embed">
        <svg width="100%" height="100%" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 -4.17233e-07V10H2.98023e-07" stroke="#DC2626" />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sticky testimonial data                                            */
/* ------------------------------------------------------------------ */
interface StickyCard {
  image: string;
  alt: string;
  imageClass: string;
  itemClass: string;
  quote: string;
  attribution?: string;
  /** Whether to wrap attribution in <span class="text-style-muted"> */
  attributionMuted?: boolean;
}

const stickyCards: StickyCard[] = [
  {
    image: '/images/site/6817d7f1094f40b1eab5665b_image-4.avif',
    alt: '',
    imageClass: 'testimonial-sticky_image is-colored',
    itemClass: 'testimonial-sticky_item',
    quote: '\u201cIt took 7 years, 4 specialists, and 5 hospitalizations before I finally got answers',
    attribution: 'Samantha Reid, 28',
    attributionMuted: true,
  },
  {
    image: '/images/site/683a03d80f215aa9eefcdfc2_image.avif',
    alt: '',
    imageClass: 'testimonial-sticky_image is-colored',
    itemClass: 'testimonial-sticky_item is-2',
    quote: '\u201cIt shouldn\u2019t take a medical degree and a stockpile of cash just to understand what\u2019s going on inside your own body\u201d',
    attribution: 'Eurie Kim, 45',
    attributionMuted: true,
  },
  {
    image: '/images/site/6825a5ab04c55a80381e9436_cassandra-banskon.avif',
    alt: 'Smiling woman with long hair, looking directly at the camera.',
    imageClass: 'testimonial-sticky_image is-colored',
    itemClass: 'testimonial-sticky_item is-3',
    quote: '\u201cSuperpower enables me to understand my health and wellness concerns before they become big problems again.\u201d',
    attribution: 'Cassandra Banskon, 32',
    attributionMuted: true,
  },
  {
    image: '/images/site/683082cdc2e73f879645c10a_image-1.avif',
    alt: '',
    imageClass: 'testimonial-sticky_image',
    itemClass: 'testimonial-sticky_item is-12',
    quote: '\u201cThere are millions of people like me, who randomly developed anxiety, chronic low energy, brain fog, gut issues, with no answers from traditional medicine\u201d',
  },
  {
    image: '/images/site/683082cd6f5c06cd622d055f_image-9.avif',
    alt: '',
    imageClass: 'testimonial-sticky_image',
    itemClass: 'testimonial-sticky_item is-17',
    quote: '\u201cThere are millions of people like me, who randomly developed anxiety, chronic low energy, brain fog, gut issues, with no answers from traditional medicine\u201d',
  },
  {
    image: '/images/site/683082cebb666561431d2037_image-12.avif',
    alt: '',
    imageClass: 'testimonial-sticky_image',
    itemClass: 'testimonial-sticky_item is-18',
    quote: '\u201cThere are millions of people like me, who randomly developed anxiety, chronic low energy, brain fog, gut issues, with no answers from traditional medicine\u201d',
  },
  {
    image: '/images/site/6825a5ac1bfc884e3afcc43f_george-munguia.avif',
    alt: 'Three men stand in a kitchen, talking and smiling around a chessboard on a countertop.',
    imageClass: 'testimonial-sticky_image',
    itemClass: 'testimonial-sticky_item is-20',
    quote: '\u201cThere are millions of people like me, who randomly developed anxiety,',
    attribution: 'Lorem ipsum',
    attributionMuted: false,
  },
  {
    image: '/images/site/6817d7f0e56236e59c405eca_image-3.avif',
    alt: '',
    imageClass: 'testimonial-sticky_image',
    itemClass: 'testimonial-sticky_item is-14',
    quote: '\u201cThere are millions of people like me, who randomly developed anxiety, chronic low energy, brain fog, gut issues, with no answers from traditional medicine\u201d',
  },
  {
    image: '/images/site/6825a5ab04c55a80381e9436_cassandra-banskon.avif',
    alt: 'Smiling woman with long hair, looking directly at the camera.',
    imageClass: 'testimonial-sticky_image',
    itemClass: 'testimonial-sticky_item is-11',
    quote: '\u201cThere are millions of people like me, who randomly developed anxiety, chronic low energy, brain fog, gut issues, with no answers from traditional medicine\u201d',
  },
  {
    image: '/images/site/683082cebb666561431d2037_image-12.avif',
    alt: '',
    imageClass: 'testimonial-sticky_image',
    itemClass: 'testimonial-sticky_item is-16',
    quote: '\u201cThere are millions of people like me, who randomly developed anxiety, chronic low energy, brain fog, gut issues, with no answers from traditional medicine.\u201d',
    attribution: 'Elena Park, 42',
    attributionMuted: true,
  },
  {
    image: '/images/site/683082cdfa46664c5ce6f9e7_image-2.avif',
    alt: '',
    imageClass: 'testimonial-sticky_image',
    itemClass: 'testimonial-sticky_item is-10',
    quote: '\u201cThere are millions of people like me, who randomly developed anxiety, chronic low energy, brain fog, gut issues, with no answers from traditional medicine\u201d',
  },
  {
    image: '/images/site/6817d7f176ac54694028b970_image-11.avif',
    alt: 'Smiling person with a beard, wearing a dark blazer, against a blurred background.',
    imageClass: 'testimonial-sticky_image',
    itemClass: 'testimonial-sticky_item is-9',
    quote: '\u201cMy girlfriend was nearly kicked out of urgent care for bringing her own lab results. Doctors didn\u2019t want to see them.\u201d',
    attribution: 'Marcus Hall',
    attributionMuted: false,
  },
  {
    image: '/images/site/6817d7f18e783498a0ba7a0b_image-10.avif',
    alt: '',
    imageClass: 'testimonial-sticky_image',
    itemClass: 'testimonial-sticky_item is-8',
    quote: '\u201cOur system pieces together specialists, tests, and appointments \u2014 but no one looks at the whole person\u201d',
    attribution: 'Eurie Kim',
    attributionMuted: false,
  },
  {
    image: '/images/site/6817d7f076ac54694028b8bb_image-9.avif',
    alt: 'A person in a blue suit stands outside, looking into the distance, with buildings in the background.',
    imageClass: 'testimonial-sticky_image',
    itemClass: 'testimonial-sticky_item is-15',
    quote: '\u201cThere are millions like me \u2014 living with chronic fatigue, gut issues, and brain fog, without a single clear answer from traditional medicine.\u201d',
    attribution: 'Jason Patel',
    attributionMuted: false,
  },
  {
    image: '/images/site/6817d7f076ac54694028b8bb_image-9.avif',
    alt: 'A person in a blue suit stands outside, looking into the distance, with buildings in the background.',
    imageClass: 'testimonial-sticky_image',
    itemClass: 'testimonial-sticky_item is-7',
    quote: '\u201cThere are millions like me \u2014 living with chronic fatigue, gut issues, and brain fog, without a single clear answer from traditional medicine.\u201d',
    attribution: 'Jason Patel',
    attributionMuted: false,
  },
  {
    image: '/images/site/6817d7f1ed0aeea15c6d9479_image-12.avif',
    alt: '',
    imageClass: 'testimonial-sticky_image',
    itemClass: 'testimonial-sticky_item is-6',
    quote: '\u201cI\u2019ve lived through 17 years of chronic illness. Trial and error, not healthcare, is why I\u2019m alive today.\u201d',
    attribution: 'Emily Rhodes',
    attributionMuted: false,
  },
  {
    image: '/images/site/68308347cd0276cf402ccff2_frame%201597883171%201.avif',
    alt: 'Silhouette of a handgun facing left against a plain background.',
    imageClass: 'testimonial-sticky_image',
    itemClass: 'testimonial-sticky_item is-19',
    quote: '\u201cThe way we take care of our bodies is broken. The way we take care of each other is broken.\u201d',
    attribution: 'Jordan Avery',
    attributionMuted: true,
  },
  {
    image: '/images/site/6817d7f0d51c9aa75a56c69f_image-8.avif',
    alt: 'Young person with curly hair wearing a jacket and T-shirt, looking forward against a clear sky.',
    imageClass: 'testimonial-sticky_image',
    itemClass: 'testimonial-sticky_item is-5',
    quote: '\u201cThe way we take care of our bodies is broken. The way we take care of each other is broken.\u201d',
    attribution: 'Jordan Avery',
    attributionMuted: true,
  },
  {
    image: '/images/site/6817d7f01bbb86085911ee41_image-5.avif',
    alt: 'A man with short dark hair wearing a white shirt looking at the camera.',
    imageClass: 'testimonial-sticky_image is-colored',
    itemClass: 'testimonial-sticky_item is-4',
    quote: '\u201cIn traditional healthcare, data lives in siloes. No one connects the dots and patients pay the price.\u201d',
    attribution: 'Chad Byers, 38',
    attributionMuted: true,
  },
];

export default function StickyTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const imgs = sectionRef.current.querySelectorAll('.image_cover-absolute, .testimonial-sticky_image');
      imgs.forEach((img) => {
        (img as HTMLElement).style.visibility = 'visible';
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="section_testimonial-sticky-2">
      <div className="testimonial-sticky_component">
        {stickyCards.map((card, i) => (
          <div key={i} className={card.itemClass}>
            <CornerBorders />
            <img
              loading="lazy"
              src={card.image}
              alt={card.alt}
              className={card.imageClass}
            />
            <p>
              {card.quote}
              {card.attribution && (
                <>
                  <br /><br />
                  {card.attributionMuted ? (
                    <span className="text-style-muted">{card.attribution}</span>
                  ) : (
                    card.attribution
                  )}
                </>
              )}
            </p>
          </div>
        ))}

        {/* Tablet CTA */}
        <div className="show-tablet">
          <a href="#stories" className="testimonial-hero_button-story is-centered w-inline-block">
            <div>Hear more stories</div>
            <div className="icon-1x1-medium" />
          </a>
        </div>
      </div>

      <div className="page-padding">
        <div className="padding-vertical padding-large">
          <div className="container-large-11 z-index-1" />
        </div>
      </div>

      <div className="testimonial-sticky_top-gradient" />
    </section>
  );
}
