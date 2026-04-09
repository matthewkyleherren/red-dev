export default function HowItWorks() {
  return (
    <section className="days10_section">
      <div className="days10_track">
        <div className="page-padding padding-section-large">
          <div className="container-large">
            <div className="days10_layout">
              <div className="days10_item_line"></div>
              <div className="title_row is-sticky-scroll">
                <h2 className="heading-style-h1">How it works</h2>
              </div>
              <div>
                <div className="days10_flex _1st">
                  {/* Step 1 */}
                  <div data-10days-0="" className="days10_item_wrap">
                    <img
                      src="/images/site/68bf3ed15e90d22210f8cc53_Img%20Frame.avif"
                      loading="lazy"
                      alt=""
                      sizes="(max-width: 321px) 100vw, 321px"
                      srcSet="/images/site/68bf3ed15e90d22210f8cc53_Img%20Frame-p-500.avif 500w, /images/site/68bf3ed15e90d22210f8cc53_Img%20Frame-p-800.avif 800w, /images/site/68bf3ed15e90d22210f8cc53_Img%20Frame-p-1080.avif 1080w, /images/site/68bf3ed15e90d22210f8cc53_Img%20Frame.avif 1600w"
                      className="days10_item_image is-1"
                    />
                    <div id="w-node-fc5ff206-e51b-d604-93ae-94ae990e4762-990e4755" className="days10_item_rectangle is-1">
                      <div className="days10_item_mask"></div>
                      <div className="z-index-2 text-style-mono">1</div>
                    </div>
                    <div className="days10_item_bot is-1">
                      <h3>Test your whole body</h3>
                      <div className="days10_item_par">
                        <p>Get a comprehensive blood draw at one of our 2,000+ partner labs or from the comfort of your own home.</p>
                      </div>
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div data-10days-1="" className="days10_item_wrap">
                    <img
                      src="/images/site/68bf3ed15e90d22210f8cc56_Img%20Frame-1.avif"
                      loading="lazy"
                      alt=""
                      sizes="(max-width: 321px) 100vw, 321px"
                      srcSet="/images/site/68bf3ed15e90d22210f8cc56_Img%20Frame-1-p-500.avif 500w, /images/site/68bf3ed15e90d22210f8cc56_Img%20Frame-1-p-800.avif 800w, /images/site/68bf3ed15e90d22210f8cc56_Img%20Frame-1-p-1080.avif 1080w, /images/site/68bf3ed15e90d22210f8cc56_Img%20Frame-1.avif 1600w"
                      className="days10_item_image is-2"
                    />
                    <div id="w-node-fc5ff206-e51b-d604-93ae-94ae990e476e-990e4755" className="days10_item_rectangle is-2">
                      <div className="text-style-mono">2</div>
                    </div>
                    <div className="days10_item_bot is-2">
                      <h3>An actionable plan</h3>
                      <div className="days10_item_par">
                        <p>Easy to understand results and a clear health plan with tailored recommendations on diet, lifestyle changes &amp; supplements.</p>
                      </div>
                    </div>
                  </div>
                  {/* Step 3 */}
                  <div data-10days-2="" className="days10_item_wrap">
                    <img
                      src="/images/site/68bf3ed1b9ed1cceda29fecc_Img%20Frame-2.avif"
                      loading="lazy"
                      alt=""
                      sizes="(max-width: 321px) 100vw, 321px"
                      srcSet="/images/site/68bf3ed1b9ed1cceda29fecc_Img%20Frame-2-p-500.avif 500w, /images/site/68bf3ed1b9ed1cceda29fecc_Img%20Frame-2-p-800.avif 800w, /images/site/68bf3ed1b9ed1cceda29fecc_Img%20Frame-2-p-1080.avif 1080w, /images/site/68bf3ed1b9ed1cceda29fecc_Img%20Frame-2-p-1600.avif 1600w, /images/site/68bf3ed1b9ed1cceda29fecc_Img%20Frame-2.avif 1601w"
                      className="days10_item_image is-3"
                    />
                    <div id="w-node-fc5ff206-e51b-d604-93ae-94ae990e4779-990e4755" className="days10_item_rectangle is-3">
                      <div className="text-style-mono">3</div>
                    </div>
                    <div className="days10_item_bot is-3">
                      <h3>A connected ecosystem</h3>
                      <div className="days10_item_par">
                        <p>You can book additional diagnostics, buy curated supplements with members-only discounts in your Superpower dashboard.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Responsive line positioning — matches original Webflow embed */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1215px) and (min-width: 992px) {
          .days10_item_line {
            position: absolute;
            top: 36.5rem;
            transition: top 0.2s ease;
          }
        }
      `}} />
      <div id="how-it-works" className="hiw-trigger"></div>
    </section>
  );
}
