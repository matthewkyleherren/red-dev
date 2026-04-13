import Link from 'next/link';

const items = [
  {
    img: '/images/site/68b1f691b88697306e5afb7f_Img%20Frame-5.avif',
    title: 'Full-body red light therapy',
    desc: '630nm, 660nm and 850nm wavelengths in our full-body RLT beds.',
  },
  {
    img: '/images/site/68b1f69060c4ed1cad01cdf8_Img%20Frame-4.avif',
    title: 'The Mindfulness Menu',
    desc: 'Breathwork, body scans, visualisations, and sleep meditations paired with every session.',
  },
  {
    img: '/images/site/68c1dd999c9803fbaccaa20c_image%20(22).avif',
    title: 'Movement classes',
    desc: 'Kundalini Yoga, Dynamic Meditation, Lymphatic Drainage & more.',
  },
  {
    img: '/images/site/6909a982dbe21af11d0e9b06_img%20frame.avif',
    imgSrcSet: '/images/site/6909a982dbe21af11d0e9b06_img%20frame-p-500.avif 500w, /images/site/6909a982dbe21af11d0e9b06_img%20frame.avif 1074w',
    title: 'The Health Bar',
    desc: 'Curated drinks and nourishment to extend the benefits of your session.',
  },
  {
    img: '/images/site/68b1f6900c78d1ef26a18e34_Img%20Frame-1.avif',
    title: '11 or 22 minutes',
    desc: 'Choose the depth of your experience — signature or extended.',
  },
  {
    img: '/images/site/68d4254ea764c9f10aa50339_Img%20Frame.avif',
    title: 'Seefeldstrasse 152, Zurich',
    desc: 'Walk in, lie back, and let the light do the work.',
  },
];

export default function WhatsIncluded() {
  return (
    <section className="whats-included_section">
      <div className="page-padding padding-section-large">
        <div className="container-large z-index-2">
          <div className="whats-included_lay">
            <div id="w-node-f45cb9b5-41c4-99f1-c0df-a19c0598c130-0598c12c" className="whats-included_track">
              <div className="whats-included_sticky">
                <div className="whats-included_max">
                  <h2>What&apos;s included in your membership</h2>
                </div>
                <div className="div-block-239">
                  <div className="text-size-large">red. is more than a light therapy session.</div>
                  <div className="text-size-large">
                    A complete wellbeing experience combining red light, mindfulness, movement and community.
                  </div>
                </div>
                <Link href="/checkout" className="button is-large is-icon w-inline-block">
                  <div>Start your membership</div>
                  <div className="icon-embed-regular w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                      <path d="M9.5 18.5967L15.5 12.5967L9.5 6.59668" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
            {items.map((item, i) => (
              <div key={i} className="whats-included_item_wrap">
                <img
                  src={item.img}
                  loading="lazy"
                  alt=""
                  sizes={item.imgSrcSet ? '100vw' : undefined}
                  srcSet={item.imgSrcSet}
                  className="whats-included_item_img"
                />
                <div className="whats-included_item_bot">
                  <h4>{item.title}</h4>
                  <p className="text-size-large text-style-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
