import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="section_home-cta w-variant-c6f357b0-32b9-1991-d64f-91b90e1a8a62">
      <div className="page-padding padding-section-large">
        <div className="container-large z-index-2">
          <div className="home-cta_component w-variant-c6f357b0-32b9-1991-d64f-91b90e1a8a62">
            <div className="home-cta_text-wrapper w-variant-c6f357b0-32b9-1991-d64f-91b90e1a8a62">
              <div className="text-highlight_wrapper w-variant-c6f357b0-32b9-1991-d64f-91b90e1a8a62">
                <h1 className="scroll-highlight">
                  Health is your greatest superpower. It&apos;s time to unlock it.
                </h1>
              </div>
              <div className="button-group">
                <Link href="/checkout" className="button is-icon w-variant-094685dc-02e8-34f8-a0c0-8167f0653428 w-inline-block">
                  <div>Start testing</div>
                  <div className="icon-embed-regular w-embed">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        src="/images/site/68b1cbe29d53c5bccc5988c8_bg%20image.avif"
        loading="lazy"
        alt="A person dances gracefully with raised arms, illuminated by warm, dramatic light from above."
        className="image_cover-absolute"
      />
      <div className="cta_shape-overlay is-top"></div>
      <div className="cta_shape-overlay is-bottom"></div>
    </section>
  );
}
