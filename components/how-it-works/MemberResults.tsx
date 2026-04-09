export default function MemberResults() {
  return (
    <section className="section_member-result">
      <div className="page-padding padding-section-large">
        <div className="container-large z-index-2">
          <div className="title_row" style={{ opacity: 1, visibility: 'visible' }}>
            <h2 className="heading-style-h1">
              <span className="text-color-zinc400">Members see results</span> <br />in just 6 months
            </h2>
          </div>
          <div className="member-result_component" style={{ opacity: 1, visibility: 'visible' }}>
            {/* Stat 1 — Biological Age */}
            <div id="w-node-_062b38f9-ce27-6b57-9463-0249043d8cc9-1873d0c3" className="member-result_item" style={{ opacity: 1, visibility: 'visible' }}>
              <div className="stats-number">
                <span className="span_stats-number is-2-digit is-big">70</span> <span>%</span>
              </div>
              <div className="text-size-large text-style-muted">slow their speed of ageing</div>
              <img
                src="/images/site/68df249ea8fe836663ddfddf_bio-age%20graph.avif"
                alt=""
                sizes="(max-width: 2280px) 100vw, 2280px"
                srcSet="/images/site/68df249ea8fe836663ddfddf_bio-age%20graph-p-500.png 500w, /images/site/68df249ea8fe836663ddfddf_bio-age%20graph-p-800.png 800w, /images/site/68df249ea8fe836663ddfddf_bio-age%20graph-p-1080.png 1080w, /images/site/68df249ea8fe836663ddfddf_bio-age%20graph.avif 2280w"
                className="member-result_graph-img"
              />
            </div>

            {/* Stat 2 — Diabetes Risk */}
            <div className="member-result_item" style={{ opacity: 1, visibility: 'visible' }}>
              <div className="stats-number">
                <span className="span_stats-number is-2-digit is-big">63</span> <span>%</span>
              </div>
              <div className="text-size-large text-style-muted">find early risk factors for diabetes</div>
              <div className="member-result_bar">
                <div className="visual1_bar-wrapper">
                  <div className="visual1_bar-inner1 is-65">
                    <div className="visual1_bar-fill is-purple" />
                  </div>
                  <div className="visual1_bar-inner1 is-35" />
                </div>
                <div className="visual1_ticker-wrapper is-65">
                  <div className="visual1_ticker w-embed">
                    <svg width="100%" height="100%" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.40775 1.27461C5.79191 0.207943 4.25231 0.207942 3.63647 1.27461L0.865184 6.07461C0.249343 7.14128 1.01914 8.47461 2.25082 8.47461L7.79339 8.47461C9.02507 8.47461 9.79487 7.14128 9.17903 6.07461L6.40775 1.27461Z" fill="#FF68DE" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="member-result_bottom-row">
                <img src="/images/site/68def0679cbb818651dd2a13_frame%201597885470.avif" loading="lazy" alt="" className="member-result_img" />
                <div>Diabetes Risk</div>
              </div>
            </div>

            {/* Stat 3 — Heart Disease */}
            <div className="member-result_item" style={{ opacity: 1, visibility: 'visible' }}>
              <div className="stats-number">
                <span className="span_stats-number is-2-digit is-big">44</span> <span>%</span>
              </div>
              <div className="text-size-large text-style-muted">find elevated heart disease risk</div>
              <div className="member-result_bar">
                <div className="visual1_bar-wrapper">
                  <div className="visual1_bar-inner1 is-45">
                    <div className="visual1_bar-fill is-purple" />
                  </div>
                  <div className="visual1_bar-inner1 is-55" />
                </div>
                <div className="visual1_ticker-wrapper is-45">
                  <div className="visual1_ticker w-embed">
                    <svg width="100%" height="100%" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.40775 1.27461C5.79191 0.207943 4.25231 0.207942 3.63647 1.27461L0.865184 6.07461C0.249343 7.14128 1.01914 8.47461 2.25082 8.47461L7.79339 8.47461C9.02507 8.47461 9.79487 7.14128 9.17903 6.07461L6.40775 1.27461Z" fill="#FF68DE" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="member-result_bottom-row">
                <img src="/images/site/68def8182c785a6de4f745c9_frame%201597885470%20(1).avif" loading="lazy" alt="" className="member-result_img" />
                <div>Heart Disease Risk</div>
              </div>
            </div>
          </div>
          <p id="w-node-_34f131cd-ec7b-ca8a-7299-edda533ddc7c-1873d0c3" className="text-size-small text-style-muted">
            * Study conducted over 3,000 Superpower members, aggregated population health data over one year
          </p>
        </div>
      </div>
    </section>
  );
}
