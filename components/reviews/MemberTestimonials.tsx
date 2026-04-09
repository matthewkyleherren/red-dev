'use client';

import React, { useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Small icon SVGs                                                    */
/* ------------------------------------------------------------------ */
function ExternalLinkIcon() {
  return (
    <div className="icon-1x1-xxxsmall w-embed">
      <svg width="100%" height="100%" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.6665 1.6665H8.33317M8.33317 1.6665V8.33317M8.33317 1.6665L1.6665 8.33317" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function XIcon() {
  return (
    <div className="icon-1x1-xsmall w-embed">
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.2" d="M13.9762 10.1621L22.7184 0H20.6467L13.056 8.82384L6.99312 0H0L9.168 13.343L0 24H2.07168L10.0877 14.6813L16.4909 24H23.484L13.9752 10.1621H13.9762ZM11.1384 13.4606L10.2096 12.132L2.81808 1.55952H6.00048L11.9654 10.0915L12.8942 11.4202L20.6477 22.511H17.4653L11.1384 13.4606Z" fill="#1A1A1A" />
      </svg>
    </div>
  );
}

function LinkedInIcon() {
  return (
    <div className="icon-1x1-xsmall w-embed">
      <svg width="100%" height="100%" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.2">
          <path d="M21.1156 20.4495H17.5596V14.8805C17.5596 13.5525 17.5359 11.843 15.7101 11.843C13.858 11.843 13.5746 13.2899 13.5746 14.7838V20.4492H10.0185V8.99694H13.4324V10.562H13.4801C14.1762 9.3718 15.4705 8.66093 16.8484 8.71208C20.4526 8.71208 21.1171 11.0828 21.1171 14.167L21.1156 20.4495ZM6.00613 7.4315C4.86643 7.43171 3.94235 6.50794 3.94214 5.36821C3.94194 4.22848 4.86569 3.30438 6.00539 3.30417C7.1451 3.30397 8.06918 4.22774 8.06938 5.36747C8.06948 5.91478 7.85216 6.43973 7.46523 6.82681C7.07829 7.21389 6.55344 7.4314 6.00613 7.4315ZM7.78416 20.4495H4.22441V8.99694H7.78416V20.4495ZM22.8885 0.00178957H2.43749C1.47093 -0.00911825 0.6783 0.765131 0.666504 1.7317V22.268C0.677896 23.235 1.47047 24.01 2.43749 23.9999H22.8885C23.8574 24.0119 24.6531 23.2369 24.6665 22.268V1.73022C24.6527 0.761739 23.8569 -0.0124652 22.8885 0.000152051" fill="#1A1A1A" />
        </g>
      </svg>
    </div>
  );
}

function InstagramIcon() {
  return (
    <div className="icon-1x1-small w-embed">
      <svg opacity="0.2" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
        <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248a4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008a3.004 3.004 0 0 1 0 6.008z" fill="#1A1A1A" />
        <circle cx="16.806" cy="7.207" r="1.078" fill="#1A1A1A" />
        <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42a4.6 4.6 0 0 0-2.633 2.632a6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71c0 2.442 0 2.753.056 3.71c.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632a6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419a4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186c.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688a2.987 2.987 0 0 1-1.712 1.711a4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055c-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311a2.985 2.985 0 0 1-1.719-1.711a5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654c0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311a2.991 2.991 0 0 1 1.712 1.712a5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655c0 2.436 0 2.698-.043 3.654h-.011z" fill="#1A1A1A" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonial card data                                              */
/* ------------------------------------------------------------------ */
interface MemberCard {
  quote: string;
  actionLabel: string;
  actionDate: string;
  href: string;
  external: boolean;
  image: string;
  alt: string;
  name: string;
  title: string;
  socialIcon?: 'x' | 'linkedin' | 'instagram' | null;
}

const row1: MemberCard[] = [
  {
    quote: '"\u003Cspan class="text-orange"\u003E@superpower\u003C/span\u003E wasn\'t a false alarm. Second retest of CK still at critical levels of 11,000. Wow thanks for helping me catch this. The past 2-3 years of struggling with fatigue mentally and physically might be explained by what we find as we go down this rabbit hole. Thankful to catch this now."',
    actionLabel: 'View post',
    actionDate: '9:52 AM \u00b7 May 9, 2025',
    href: 'https://x.com/aaronluannguyen/status/1920627996748362133',
    external: true,
    image: '/images/site/6825a5aded3caf874899b216_aaron-nguyen.avif',
    alt: 'Woman in white workout clothes jogging on a paved surface.',
    name: 'Aaron Nguyen',
    title: 'Software Engineer',
    socialIcon: 'x',
  },
  {
    quote: '"As a working mom I was constantly running on empty. Superpower pinpointed a vitamin deficiency I\'d never known about. Now I feel sharper, calmer, and more present with my kids."',
    actionLabel: 'Shared story',
    actionDate: 'Apr 03, 2025',
    href: '#',
    external: false,
    image: '/images/site/683082cdc2e73f879645c10a_image-1.avif',
    alt: '',
    name: 'Maya Patel, 34',
    title: 'Marketing Director, Mom of two',
    socialIcon: null,
  },
  {
    quote: '"Superpower\'s service was seriously impressive. Seamless testing, quick results, and a detailed follow-up consult left me with actionable insights and a tailored plan to start nudging this number down by nudging other sub-optimal scores up."',
    actionLabel: 'View post',
    actionDate: '12:20 PM \u00b7 Dec 06, 2024',
    href: 'https://www.linkedin.com/posts/jason-severiano-lampkin_longevity-health-wellness-activity-7270774112405356544-HL04',
    external: true,
    image: '/images/site/6825a5ac705fbb225ee494d4_jason-lampkin.avif',
    alt: 'A person with long hair poses gracefully, eyes closed, and hand raised near their head.',
    name: 'Jason Lampkin, 33',
    title: 'Former Professional Athlete',
    socialIcon: 'linkedin',
  },
  {
    quote: '"Been going through \u003Cspan class="text-orange"\u003E@superpower\u003C/span\u003E beta group and I\'m blown away. This is what healthcare should look like. I also have never had a doctor breakdown lab results as well as the Superpower clinician did. Clear, actionable stuff about how to optimize biomarkers."',
    actionLabel: 'View post',
    actionDate: '1:26 AM \u00b7 Feb 19, 2025',
    href: 'https://x.com/JakeHeyen/status/1891856701961404893',
    external: true,
    image: '/images/site/6825a5ac04c55a80381e9487_jake-heyen.avif',
    alt: 'Smiling man in a suit stands in front of a window.',
    name: 'Jake Heyen',
    title: 'Owner, Active Lab',
    socialIcon: 'x',
  },
  {
    quote: '"I\'ve been using \u003Cspan class="text-orange"\u003E@superpower\u003C/span\u003E for the last two months. Very impressed with the user experience and customer service from the team. The only thing I\'m not impressed with is with my biological age being 3.5 years above my actual age."',
    actionLabel: 'View post',
    actionDate: '2:51 pm \u00b7 14 Nov 2024',
    href: 'https://x.com/_alexbrogan/status/1856907844928282763',
    external: true,
    image: '/images/site/6825a5ab8f732a046047b3d1_alex-brogan.avif',
    alt: 'Smiling man wearing a black shirt against a plain white background.',
    name: 'Alex Brogan',
    title: 'Founder, FasterThanNormal',
    socialIcon: 'x',
  },
  {
    quote: '"alright pretty proud of this courtesy of \u003Cspan class="text-orange"\u003E@superpower\u003C/span\u003E\nhow\'d i survive a startup, kid, and get here."',
    actionLabel: 'View post',
    actionDate: '4:23 PM \u00b7 Dec 13, 2024',
    href: 'https://x.com/gauravvohra1/status/1867440268301283837',
    external: true,
    image: '/images/site/6825a5aa02abb1fcdd21eea7_gaurav-vohra.avif',
    alt: 'A man with long hair and glasses smiles warmly at the camera.',
    name: 'Gaurav Vohra',
    title: 'Founding Team, Superhuman',
    socialIcon: 'x',
  },
  {
    quote: '"What sets Superpower apart is that they don\'t just hand you results, they make them actionable."',
    actionLabel: 'Shared story',
    actionDate: 'Dec 08, 2024',
    href: '#',
    external: false,
    image: '/images/site/6825a5ab8f732a046047b3a6_derek-en-wezoh.avif',
    alt: 'A man with glasses smiles warmly, wearing a brown blazer and white shirt.',
    name: 'Derek En\'Wezoh',
    title: 'Partner, Susa Ventures',
    socialIcon: null,
  },
  {
    quote: '"Superpower is raising the standard for what we should expect from our healthcare. From ourselves. And from the systems that are meant to keep us well."',
    actionLabel: 'View post',
    actionDate: '3:14 PM \u00b7 Apr 22, 2025',
    href: 'https://www.linkedin.com/posts/joshwandforcebrands_the-world-got-quite-a-bit-healthier-today-activity-7320524627670110208-x5bT',
    external: true,
    image: '/images/site/6825a5aa43b4255961e35f0e_josh-wand.avif',
    alt: 'A person with short gray hair is smiling while wearing a brown jacket against a dark background.',
    name: 'Josh Wand',
    title: 'Founder and CEO, ForceBrands',
    socialIcon: 'linkedin',
  },
];

const row2: MemberCard[] = [
  {
    quote: '"My Superpower advisor goes, are you like, really low energy? And I was like, yes. Turns out I\'m deficient in five areas that contribute to my overall energy. I felt so validated...it\'s not just like, oh, I burnt out. I\'m feeling like I got answers and I\'m hopeful."',
    actionLabel: 'View post',
    actionDate: '3:13 PM \u00b7 May 22, 2025',
    href: 'https://www.instagram.com/victoriagarrickbrowne/',
    external: true,
    image: '/images/site/683083a0c8e0799d5ca7aefa_image%2037%20(1).avif',
    alt: 'A person in a low-light setting holds their hand near their chest, with a deep red background.',
    name: 'Victoria Brown, 28',
    title: 'Former Athlete & Founder, The Hidden Opponent',
    socialIcon: 'instagram',
  },
  {
    quote: '"Wow... never realized i check all the risk factors for poor microbiome health. Super informative onboarding \u003Cspan class="text-orange"\u003E@superpower\u003C/span\u003E"',
    actionLabel: 'View post',
    actionDate: '4:01 PM \u00b7 Apr 10, 2025',
    href: 'https://x.com/adamvnovak/status/1910211481666285626',
    external: true,
    image: '/images/site/6825a5ab26a8526bd6e7bf55_adam-novak.avif',
    alt: '',
    name: 'Adam Novak',
    title: 'Co-founder & CEO, GoodHome',
    socialIcon: 'x',
  },
  {
    quote: '"You can\'t change what you can\'t measure. For me, Superpower was a no-brainer. The transparency has really given me what I need to take action. I\'ve never felt this excited."',
    actionLabel: 'Shared story',
    actionDate: 'Feb 27, 2025',
    href: '#',
    external: false,
    image: '/images/site/6825a5acd4263226f7fa11c1_jason-yeager.avif',
    alt: 'Man with short hair giving a thumbs-up, looking directly at the camera with a neutral expression.',
    name: 'Jason Yeager',
    title: 'Founder, MyTechCEO',
    socialIcon: null,
  },
  {
    quote: '"For the last 18 months, I\'ve used \u003Cspan class="text-orange"\u003E@superpower\u003C/span\u003E to save time. I click a button, a lab technician shows up at my house, they pull 4 viles of blood and run 50+ tests. I get results in my App within 48 hours with recommended next steps."',
    actionLabel: 'View post',
    actionDate: '3:58 AM \u00b7 Apr 23, 2025',
    href: 'https://x.com/NathanLatka/status/1914740590362714572',
    external: true,
    image: '/images/site/6825a5ab17801b8932ed658c_nathan-lutka.avif',
    alt: 'A smiling man in a suit and tie looks slightly to the side against a plain background.',
    name: 'Nathan Lutka',
    title: 'Founder, Founderpathhq',
    socialIcon: 'x',
  },
  {
    quote: '"I thought feeling bloated and exhausted was just part of life. Superpower revealed hidden food sensitivities and within weeks, my digestion, mood, and workouts transformed."',
    actionLabel: 'Shared story',
    actionDate: 'Nov 15, 2024',
    href: '#',
    external: false,
    image: '/images/site/683082cd7a0d7990d5731b34_image-8.avif',
    alt: 'A woman with curly hair smiles while sitting outside.',
    name: 'Natalie Robinson, 35',
    title: 'Pediatric Nurse',
    socialIcon: null,
  },
  {
    quote: '"Woke up to a winning bio age score on \u003Cspan class="text-orange"\u003E@superpower\u003C/span\u003E. On my way to beat \u003Cspan class="text-orange"\u003E@bryan_johnson\u003C/span\u003E one day"',
    actionLabel: 'View post',
    actionDate: '3:58 AM \u00b7 Jan 3, 2025',
    href: 'https://x.com/MitchBernstein/status/1874862891142386068',
    external: true,
    image: '/images/site/6825a5aa4c3cc235f54eba8a_mitchell-bernstein.avif',
    alt: 'Man smiling at the camera against a plain background.',
    name: 'Mitchell Bernstein',
    title: 'Product Designer, Ramp',
    socialIcon: 'x',
  },
  {
    quote: '"What is the highest grade creatine available in the world today? Found the best one. Of course, it was inside \u003Cspan class="text-orange"\u003E@superpower\u003C/span\u003E"',
    actionLabel: 'View post',
    actionDate: '5:50 AM \u00b7 Jan 24, 2025',
    href: 'https://x.com/pedrosorren/status/1882501219165594101',
    external: true,
    image: '/images/site/6825a5aa705fbb225ee49427_pedro-sorrentino.avif',
    alt: 'Smiling man with short dark hair wearing a dark shirt against a plain black background.',
    name: 'Pedro Sorrentino, 36',
    title: 'Managing Partner, Atman Capital',
    socialIcon: 'x',
  },
  {
    quote: '"My Superpower test helped me find out I was pre-diabetic. Without Superpower, it would have totally flown under the radar"',
    actionLabel: 'Shared story',
    actionDate: 'Apr 03, 2025',
    href: '#',
    external: false,
    image: '/images/site/6825a5aaeae39ce91d6bc107_alice-coleman.avif',
    alt: '',
    name: 'Alice Coleman, 41',
    title: 'High School Teacher, Wellness Enthusiast',
    socialIcon: null,
  },
];

const row3: MemberCard[] = [
  {
    quote: '"Living a long and happy life with my family is really important to me. With Superpower, I finally know how healthy I am, and where to take my next step."',
    actionLabel: 'Shared story',
    actionDate: 'Feb 23, 2025',
    href: '#',
    external: false,
    image: '/images/site/6825a5ac1bfc884e3afcc43f_george-munguia.avif',
    alt: 'Three men stand in a kitchen, talking and smiling around a chessboard on a countertop.',
    name: 'George Munguia',
    title: 'Founder, Coconut VA',
    socialIcon: null,
  },
  {
    quote: '"Superpower has transformed my health. My inflammation is down, energy and focus are way up, and I\'m training harder running 5+ miles daily and lifting 3x a week. Today, I hit a personal best: 46 BPM resting heart rate. It means a lot, especially after losing my dad to heart disease."',
    actionLabel: 'Shared story',
    actionDate: 'May 02, 2025',
    href: '#',
    external: false,
    image: '/images/site/683082ce868ee4b9faa82e6c_image-11.avif',
    alt: 'Black and white wavy lines vertically aligned on a plain white background.',
    name: 'Amara Collins, 40',
    title: 'Entrepreneur, Movement Coach',
    socialIcon: null,
  },
  {
    quote: '"Superpower enables me to understand my health and wellness concerns before they become big problems again."',
    actionLabel: 'Shared story',
    actionDate: 'Mar 03, 2025',
    href: '#',
    external: false,
    image: '/images/site/6825a5ab04c55a80381e9436_cassandra-banskon.avif',
    alt: 'Smiling woman with long hair, looking directly at the camera.',
    name: 'Cassandra Banskon, 32',
    title: 'Medical Aesthetician, Social Media Influencer',
    socialIcon: null,
  },
  {
    quote: '"I have tried a lot of wellness products and coaching, but nothing compares to Superpower. Testing revealed insights I would\'ve have found out otherwise regarding my hormone health and PCOS."',
    actionLabel: 'Shared story',
    actionDate: 'Jul 06, 2024',
    href: '#',
    external: false,
    image: '/images/site/68308347cd0276cf402ccff2_frame%201597883171%201.avif',
    alt: 'Silhouette of a handgun facing left against a plain background.',
    name: 'Lisa Chan, 30',
    title: 'Creative Professional',
    socialIcon: null,
  },
  {
    quote: '"My \u003Cspan class="text-orange"\u003E@superpower\u003C/span\u003E clinician said I had the best labs she\'s ever seen, so I figure I\'d share what I\'m doing to stay healthy. BLUF: pescatarian diet, daily exercise, consistent sleep."',
    actionLabel: 'View post',
    actionDate: '4:24 AM \u00b7 Feb 7, 2025',
    href: 'https://x.com/mpetegorsky/status/1887552966707548634',
    external: true,
    image: '/images/site/6825a5ab2ac5f0e70cbbaaeb_mike-petegorsky.avif',
    alt: 'Man smiling in front of a wooden wall.',
    name: 'Mike Petegorsky',
    title: 'Co-founder, Proxima Health',
    socialIcon: 'x',
  },
  {
    quote: '"Superpower caught what others missed for years. My action plan is more thorough than anything I\'ve ever gotten at a checkup"',
    actionLabel: 'Shared story',
    actionDate: 'Apr 04, 2025',
    href: '#',
    external: false,
    image: '/images/site/681b724fea256523c56ba51c_image-1.avif',
    alt: 'A person with long hair adjusts their hair while looking at the camera.',
    name: 'Linda Salito, 32',
    title: 'CEO, Alaris',
    socialIcon: null,
  },
  {
    quote: '"As a marathoner, I was hitting a wall I couldn\'t explain. Superpower showed me I had low iron and B12, and then made it clear what I needed to do to become a healthier me. 1 month in and my endurance is back and I\'m running stronger than ever."',
    actionLabel: 'Shared story',
    actionDate: 'Feb 07, 2025',
    href: '#',
    external: false,
    image: '/images/site/683082ceb09655683d30ac4d_image-13.avif',
    alt: '',
    name: 'Aisha Lopez, 32',
    title: 'Nonprofit Leader, Endurance Athlete',
    socialIcon: null,
  },
  {
    quote: '"I\'ve done MRIs, calcium scoring, regular labs \u2014 thought I knew my body inside out. But Superpower still found things I missed. After a few small changes, I feel like I unlocked a whole new level of day-to-day performance."',
    actionLabel: 'Shared story',
    actionDate: 'Apr 18, 2025',
    href: '#',
    external: false,
    image: '/images/site/6825a5aaeae39ce91d6bc113_stephen-cole.avif',
    alt: 'A person in a black shirt smiling while standing against a textured wall.',
    name: 'Stephen Cole, 39',
    title: 'Founder, Orqestra',
    socialIcon: null,
  },
];

/* ------------------------------------------------------------------ */
/*  Card component                                                     */
/* ------------------------------------------------------------------ */
function MemberCard({ card }: { card: MemberCard }) {
  const socialIconEl = card.socialIcon === 'x' ? <XIcon /> :
    card.socialIcon === 'linkedin' ? <LinkedInIcon /> :
    card.socialIcon === 'instagram' ? <InstagramIcon /> : null;

  return (
    <a
      href={card.href}
      {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="testimonial-members_item w-inline-block"
    >
      <p dangerouslySetInnerHTML={{ __html: card.quote }} />
      <div className="testimonial-members_item-row">
        <div>{card.actionLabel}</div>
        {card.external && <ExternalLinkIcon />}
        <div>&middot;</div>
        {card.actionDate.includes('\u00b7') ? (
          /* Split "9:52 AM · May 9, 2025" into separate divs like the original */
          <>
            {card.actionDate.split('\u00b7').map((part, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <div>&middot;</div>}
                <div>{part.trim()}</div>
              </React.Fragment>
            ))}
          </>
        ) : (
          <div>{card.actionDate}</div>
        )}
      </div>
      <div className="testimonial-members_profile-wrapper">
        <img
          src={card.image}
          loading="lazy"
          alt={card.alt}
          className="testimonial_slide-image"
        />
        <div>
          {card.name}<br />
          <span className="text-style-muted text-size-small">{card.title}</span>
        </div>
        <div className="push_auto-left">
          {socialIconEl}
        </div>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function MemberTestimonials() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="section_testimonial-members">
      <div className="page-padding">
        <div className="padding-vertical padding-xhuge">
          <div className="container-large z-index-1">
            <div className="testimonial-moving_title-row">
              <h2 className="heading-style-h1">Hear it from our members</h2>
              <div className="margin-top margin-xsmall">
                <div className="button-group has-more-space">
                  <a
                    href="https://superpower-health.typeform.com/to/yq3ZXRv2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button background-color-orange w-button"
                  >
                    Share your story
                  </a>
                </div>
              </div>
            </div>

            <div className="testimonial-members_component">
              {/* Row 1 */}
              <div className="testimonial-members_row">
                {row1.map((card, i) => (
                  <MemberCard key={`r1-${i}`} card={card} />
                ))}
              </div>

              {/* Row 2 */}
              <div className="testimonial-members_row">
                {row2.map((card, i) => (
                  <MemberCard key={`r2-${i}`} card={card} />
                ))}
              </div>

              {/* Row 3 - initially hidden */}
              {showAll && (
                <div className="testimonial-members_row">
                  {row3.map((card, i) => (
                    <MemberCard key={`r3-${i}`} card={card} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* See more button */}
      {!showAll && (
        <div className="testimonial-members_see-more-wrapper">
          <a
            href="#"
            className="testimonial_see-more-btn w-button"
            onClick={(e) => { e.preventDefault(); setShowAll(true); }}
          >
            See more stories
          </a>
        </div>
      )}
    </section>
  );
}
