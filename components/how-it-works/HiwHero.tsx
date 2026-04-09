export default function HiwHero() {
  return (
    <section className="section_hiw-hero">
      <div className="page-padding padding-section-large">
        <div className="container-large z-index-2">
          <div className="hiw_component">
            <h1 className="z-index-1" style={{ opacity: 1, visibility: 'visible' }}>How it works</h1>
            <div className="max-width-small">
              <p className="text-size-large" style={{ opacity: 1, visibility: 'visible' }}>
                Book your labs in 15 min, and test 100+ labs in 1 blood draw. Get your results within a week.
              </p>
            </div>
            <div
              style={{
                transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                filter: 'blur(0px)',
                opacity: 1,
                visibility: 'visible',
              }}
              className="hiw_right"
            >
              <img
                src="/images/site/68dc40167f31dd1a1cdae60f_sp-hiw-hero.avif"
                alt="A person in a black shirt looks upward, touching their chest with one hand."
                style={{ opacity: 1, visibility: 'visible' }}
              />
              <div className="hiw_dots-wrapper" style={{ opacity: 1, visibility: 'visible' }}>
                <div className="hiw-dots_item" style={{ opacity: 1, visibility: 'visible' }}>
                  <div className="hiw_dot">
                    <div className="clues_dot-circle is-cloth" />
                  </div>
                  <div>Reduce fatigue</div>
                </div>
                <div className="hiw-dots_item is-2" style={{ opacity: 1, visibility: 'visible' }}>
                  <div className="hiw_dot">
                    <div className="clues_dot-circle is-cloth" />
                  </div>
                  <div>Balance hormones</div>
                </div>
                <div className="hiw-dots_item is-3" style={{ opacity: 1, visibility: 'visible' }}>
                  <div className="hiw_dot">
                    <div className="clues_dot-circle is-cloth" />
                  </div>
                  <div>Slow Ageing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
