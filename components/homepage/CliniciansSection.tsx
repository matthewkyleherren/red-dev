export default function CliniciansSection() {
  const clinicians = [
    {
      img: '/images/site/688286f9a0d5aaa42ec70b82_MD%20Profiles%201.avif',
      name: 'Dr Anant Vinjamoori',
      title: 'Longevity researcher, Harvard MD & MBA',
    },
    {
      img: '/images/site/68828720c595517f8c1a5690_MD%20Profiles%202.avif',
      name: 'Dr Leigh Erin Connealy',
      title: 'Clinician & Founder of The Centre for New Medicine',
      alt: 'A smiling woman wearing a white coat and stethoscope poses for a portrait.',
    },
    {
      img: '/images/site/6882877758e3701f62f9c02f_MD%20Profiles%204.avif',
      name: 'Dr Abe Malkin',
      title: 'Founder & Medical Director of Concierge MD',
      alt: 'Man in a black medical scrub top smiling at the camera.',
    },
    {
      img: '/images/site/688286f934288c010f3a589a_MD%20Profiles%205.avif',
      name: 'Dr Robert Lufkin',
      title: 'UCLA Medical Professor, NYT Bestselling Author',
    },
  ];

  return (
    <section className="section_home-clinicians">
      <div className="page-padding">
        <div className="container-large z-index-1">
          <div className="clinicians_component">
            <div className="clinicians_header">
              <div className="clinicians_header-left">
                <div className="margin-bottom margin-xsmall">
                  <h2>Backed by science. Guided by experts.</h2>
                </div>
                <p className="text-size-large text-color-secondary">
                  Our protocols are informed by leading researchers in photobiomodulation and integrative health.
                </p>
              </div>
              <div className="clinicians_header-right">
                <div className="clinicians_logo-row">
                  <img
                    src="/images/site/6872bd59573993b99def2932_logo-stanford.svg"
                    loading="lazy"
                    alt=""
                    className="clinicians-logo"
                  />
                  <img
                    src="/images/site/6872bd59e1c1fed237f2b998_logo-harvard.svg"
                    loading="lazy"
                    alt=""
                    className="clinicians-logo"
                  />
                  <img
                    src="/images/site/6872bd59fd93859e177910bc_logo-ucla.svg"
                    loading="lazy"
                    alt=""
                    className="clinicians-logo"
                  />
                </div>
              </div>
            </div>
            <div className="clinicians_grid">
              {clinicians.map((c, i) => (
                <div key={i} className="clinicians_item">
                  <div className="clinicians_image-wrapper">
                    <img src={c.img} alt={c.alt || ''} className="clinicians_image" />
                  </div>
                  <div className="clinicians_info">
                    <h1 className="text-size-large">{c.name}</h1>
                    <p className="text-color-secondary">{c.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
