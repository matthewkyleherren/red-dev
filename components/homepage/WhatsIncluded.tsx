import Link from 'next/link';

const items = [
  {
    img: '/images/site/68b1f691b88697306e5afb7f_Img%20Frame-5.avif',
    title: 'All your data in one place',
    desc: '100+ labs, your biological age & health report.',
  },
  {
    img: '/images/site/68b1f69060c4ed1cad01cdf8_Img%20Frame-4.avif',
    title: 'Upload past lab data',
    desc: 'Visualize past Quest or Labcorp results.',
  },
  {
    img: '/images/site/68c1dd999c9803fbaccaa20c_image%20(22).avif',
    title: 'Your personalized health plan',
    desc: 'Lifestyle, diet, supplement & Rx recommendations.',
  },
  {
    img: '/images/site/6909a982dbe21af11d0e9b06_Img%20Frame.avif',
    imgSrcSet: '/images/site/6909a982dbe21af11d0e9b06_Img%20Frame-p-500.avif 500w, /images/site/6909a982dbe21af11d0e9b06_Img%20Frame.avif 1074w',
    title: 'Unlimited concierge messaging',
    desc: 'Ask unlimited questions and get answers within 24 hours on week days from our care team.',
  },
  {
    img: '/images/site/68b1f6900c78d1ef26a18e34_Img%20Frame-1.avif',
    title: 'Add-on testing anytime',
    desc: 'Advanced gut microbiome, toxins & cancer screens.',
  },
  {
    img: '/images/site/68d4254ea764c9f10aa50339_Img%20Frame.avif',
    title: 'Access to Superpower Clinic',
    desc: 'Curated solutions available after medical evaluation.',
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
                  <div className="text-size-large">Superpower is more than a blood test.</div>
                  <div className="text-size-large">
                    Access an ecosystem of diagnostics and doctor-trusted solutions personalized to you.
                  </div>
                </div>
                <Link href="/checkout" className="button is-large is-icon w-inline-block">
                  <div>Join Today</div>
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
