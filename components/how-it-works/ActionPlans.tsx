import Link from 'next/link';

const DownloadIcon = () => (
  <div className="icon-1x1-xxsmall w-embed">
    <svg width="100%" height="100%" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.5 11.1355V14.4688C16.5 14.9109 16.3244 15.3348 16.0118 15.6473C15.6993 15.9599 15.2754 16.1355 14.8333 16.1355H3.16667C2.72464 16.1355 2.30072 15.9599 1.98816 15.6473C1.67559 15.3348 1.5 14.9109 1.5 14.4688V11.1355M4.83333 6.96883L9 11.1355M9 11.1355L13.1667 6.96883M9 11.1355V1.1355"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export default function ActionPlans() {
  return (
    <section className="section_action-plans">
      <div className="page-padding padding-section-large">
        <div className="container-large z-index-2">
          <div className="title_row" style={{ opacity: 1, visibility: 'visible' }}>
            <h2>Compare our Action Plans</h2>
            <p className="text-style-muted text-size-medium">
              Testing is step one. Superpower helps you actually get healthier.
            </p>
          </div>
          <div className="action-plans_component" style={{ opacity: 1, visibility: 'visible' }}>
            {/* Superpower Action Plan */}
            <div className="action-plans_item" style={{ opacity: 1, visibility: 'visible' }}>
              <div id="w-node-_044d7065-fa78-2adc-534e-d410c221ea76-c221ea6c" className="action-plans_left">
                <div className="action-plans_logo-wrapper">
                  <img
                    src="/images/site/68756d60749a9d4add4303c6_superpower-logo.svg"
                    loading="lazy"
                    alt="The image shows a sign with the words &quot;Financial Review&quot; in bold, black letters."
                    className="comparison1_logo is-bigger filter_inverted"
                  />
                  <div className="text-size-tiny">Action Plan</div>
                </div>
                <div className="button-group is-action-plans">
                  <a
                    href="/videos/marketing%20assets/ads%20export%20compressed.pdf"
                    target="_blank"
                    className="button is-icon background-color-black w-inline-block"
                    rel="noopener noreferrer"
                  >
                    <div>View sample</div>
                    <DownloadIcon />
                  </a>
                </div>
              </div>
              <div id="w-node-_044d7065-fa78-2adc-534e-d410c221ea80-c221ea6c" className="action-plans_right">
                <img
                  src="/images/site/68ddb5146c331cb64685a697_frame%2016.avif"
                  alt="Two healthcare reports showing biomarker results and a personalized action plan with health recommendations."
                  sizes="(max-width: 1925px) 100vw, 1925px"
                  srcSet="/images/site/68ddb5146c331cb64685a697_frame%2016-p-500.avif 500w, /images/site/68ddb5146c331cb64685a697_frame%2016-p-800.avif 800w, /images/site/68ddb5146c331cb64685a697_frame%2016-p-1080.avif 1080w, /images/site/68ddb5146c331cb64685a697_frame%2016.avif 1925w"
                  className="action-plans_img-documents"
                  style={{ opacity: 1, visibility: 'visible' }}
                />
                <img
                  src="/images/site/68bf490357c25d2fac6cc61f_nature%20superpower%201.avif"
                  loading="lazy"
                  sizes="100vw"
                  srcSet="/images/site/68bf490357c25d2fac6cc61f_nature%20superpower%201-p-500.avif 500w, /images/site/68bf490357c25d2fac6cc61f_nature%20superpower%201.avif 900w"
                  alt="Cells connected by branching lines, with three large circular structures around them, under a microscope."
                  className="image_cover-absolute is-action-plans"
                  style={{ visibility: 'visible' }}
                />
              </div>
            </div>

            {/* General Check Up */}
            <div className="action-plans_item is-general" style={{ opacity: 1, visibility: 'visible' }}>
              <div id="w-node-_044d7065-fa78-2adc-534e-d410c221ea84-c221ea6c" className="action-plans_left">
                <div className="action-plans_logo-wrapper">
                  <div className="text-size-large">General check up</div>
                </div>
                <div className="button-group is-action-plans">
                  <a
                    href="https://cdn.prod.website-files.com/63792ff4f3d6aa3d62071b61/68b138d8864d1300cd7cd04f_vitamin%20and%20nutrition%20panel.pdf"
                    target="_blank"
                    className="button is-icon background-color-white w-inline-block"
                    rel="noopener noreferrer"
                  >
                    <div>View sample</div>
                    <DownloadIcon />
                  </a>
                </div>
              </div>
              <div id="w-node-_044d7065-fa78-2adc-534e-d410c221ea8d-c221ea6c" className="action-plans_right">
                <img
                  src="/images/site/68bf49e24405bd4261bb8306_group%201321315803.avif"
                  alt=""
                  sizes="(max-width: 1855px) 100vw, 1855px"
                  srcSet="/images/site/68bf49e24405bd4261bb8306_group%201321315803-p-500.avif 500w, /images/site/68bf49e24405bd4261bb8306_group%201321315803-p-800.avif 800w, /images/site/68bf49e24405bd4261bb8306_group%201321315803-p-1080.avif 1080w, /images/site/68bf49e24405bd4261bb8306_group%201321315803.avif 1855w"
                  className="action-plans_img-documents"
                  style={{ opacity: 1, visibility: 'visible' }}
                />
                <img
                  src="/images/site/68bf490357c25d2fac6cc61f_nature%20superpower%201.avif"
                  loading="lazy"
                  sizes="100vw"
                  srcSet="/images/site/68bf490357c25d2fac6cc61f_nature%20superpower%201-p-500.avif 500w, /images/site/68bf490357c25d2fac6cc61f_nature%20superpower%201.avif 900w"
                  alt="Cells connected by branching lines, with three large circular structures around them, under a microscope."
                  className="image_cover-absolute is-action-plans"
                  style={{ visibility: 'visible' }}
                />
              </div>
            </div>
          </div>
          <div className="button-group is-center">
            <Link href="/checkout" className="button is-large is-icon w-inline-block">
              <div>Start testing</div>
              <div className="icon-embed-regular hide-mobile-portrait w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 25 25" fill="none">
                  <path d="M9.5 18.5967L15.5 12.5967L9.5 6.59668" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
