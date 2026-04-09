import Link from 'next/link';

const bloodPanels = [
  { id: 'advanced-upgrade', name: 'Advanced Panel', bioCount: 33, price: '$189', img: '/images/panels/advanced.png' },
  { id: 'cardiovascular', name: 'Cardiovascular Panel', bioCount: 4, price: '$159', img: '/images/panels/cardiovascular.png' },
  { id: 'fertility', name: 'Female Fertility Panel', bioCount: 12, price: '$159', img: '/images/panels/fertility.png' },
  { id: 'metabolic', name: 'Metabolic Panel', bioCount: 4, price: '$129', img: '/images/panels/metabolic.png' },
  { id: 'autoimmunity', name: 'Autoimmunity & Celiac Panel', bioCount: 6, price: '$139', img: '/images/panels/autoimmunity.png' },
  { id: 'nutrients', name: 'Nutrient & Antioxidant Panel', bioCount: 5, price: '$159', img: '/images/panels/nutrients.png' },
  { id: 'methylation', name: 'Methylation Panel', bioCount: 5, price: '$169', img: '/images/panels/methylation.png' },
];

const diagnostics = [
  { id: 'environmental-toxins', name: 'Environmental Toxins Test', bioCount: 26, price: '$299', img: '/images/panels/environmental-toxins.png' },
  { id: 'heavy-metals', name: 'Heavy Metals Test', bioCount: 20, price: '$129', img: '/images/panels/heavy-metals.png' },
  { id: 'gut-microbiome', name: 'Gut Microbiome', bioCount: 97, price: '$239', img: '/images/panels/gut-microbiome.png' },
  { id: 'galleri', name: 'Grail Galleri Cancer', bioCount: 1, price: '$849', img: '/images/panels/galleri.png' },
  { id: 'baseline-retest', name: 'Baseline Retest', bioCount: 100, price: '$199', img: '/images/panels/baseline-retest.png' },
];

export default function WwtConfigurator() {
  return (
    <section className="section_wwt-configurator">
      <div className="page-padding">
        <div className="container-large z-index-2">
          <div>
            <div className="config_root">
              <div className="config_layout">
                <div className="config_main">
                  <div className="margin-bottom margin-large">
                    <h2 className="heading-style-h2 is-h1-mobile">Explore tests</h2>
                  </div>

                  {/* Baseline test section */}
                  <div className="config_section-header">
                    <span className="config_section-title">Baseline test.</span>
                    <span className="config_section-subtitle">&nbsp;Included in every membership.</span>
                  </div>
                  <div data-config-name="Baseline Panel" data-config-id="baseline" className="config_baseline">
                    <div className="config_baseline-img">
                      <img src="/images/panels/baseline.avif" alt="Baseline Panel" />
                    </div>
                    <div className="config_baseline-info">
                      <div className="config_baseline-name">Baseline Panel</div>
                      <div className="config_baseline-bio">
                        100+ biomarkers <span className="config-baseline_subtext-spacer">&middot; </span>
                        <span className="span-config_baseline-price">$199*</span>
                      </div>
                    </div>
                    <button className="config_card-learn-more is-baseline">Learn more</button>
                  </div>
                  <div className="config_baseline-note">
                    *$17/month membership, billed annually.
                  </div>

                  {/* Add-on panels section */}
                  <div className="config_section-header" style={{ marginTop: 0 }}>
                    <span className="config_section-title">Add-on panels.</span>
                    <span className="config_section-subtitle">&nbsp;Dive deeper with specialty blood panels.</span>
                  </div>
                  <div className="w-dyn-list">
                    <div role="list" className="config_grid w-dyn-items">
                      {bloodPanels.map((addon) => (
                        <div
                          key={addon.id}
                          role="listitem"
                          data-config-name={addon.name}
                          data-config-id={addon.id}
                          className="config_card w-dyn-item"
                        >
                          <div className="config_card-checkbox" />
                          <div className="config_card-image">
                            <img src={addon.img} alt={addon.name} loading="lazy" />
                          </div>
                          <div className="config_card-footer">
                            <div className="config_card-name">{addon.name}</div>
                            <div className="config_card-meta">
                              <div className="config_card-biomarkers">
                                <span>{addon.bioCount} biomarkers</span>
                              </div>
                              <div className="config_card-price">{addon.price}</div>
                            </div>
                            <button className="config_card-learn-more">Learn more</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add-on diagnostics section */}
                  <div className="config_section-header">
                    <span className="config_section-title">Add-on diagnostics.</span>
                    <span className="config_section-subtitle">&nbsp;Get insights beyond blood.</span>
                  </div>
                  <div className="w-dyn-list">
                    <div role="list" className="config_grid w-dyn-items">
                      {diagnostics.map((addon) => (
                        <div
                          key={addon.id}
                          role="listitem"
                          data-config-name={addon.name}
                          data-config-id={addon.id}
                          className="config_card w-dyn-item"
                        >
                          <div className="config_card-checkbox" />
                          <div className="config_card-image">
                            <img src={addon.img} alt={addon.name} loading="lazy" />
                          </div>
                          <div className="config_card-footer">
                            <div className="config_card-name">{addon.name}</div>
                            <div className="config_card-meta">
                              <div className="config_card-biomarkers">
                                <span>{addon.bioCount === 100 ? '100+' : addon.bioCount} biomarkers</span>
                              </div>
                              <div className="config_card-price">{addon.price}</div>
                            </div>
                            <button className="config_card-learn-more">Learn more</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="config_sidebar">
                  <div className="config_summary">
                    <div className="config_summary-title">Your membership</div>
                    <div className="config_summary-label">Baseline test</div>
                    <div className="config_summary-row">
                      <div className="config_summary-thumb">
                        <img src="/images/panels/baseline.avif" alt="Baseline Panel" />
                      </div>
                      <div className="config_summary-name">Baseline Panel</div>
                      <div className="config_summary-price">$199</div>
                    </div>
                    <div className="config_summary-label">Add-ons</div>
                    <div className="config_addons-empty-inner">
                      <span>+</span>
                    </div>
                    <div className="config_summary-divider" />
                    <div className="config_summary-total">
                      <div className="config_summary-total-label">Total*</div>
                      <div className="config_summary-total-value">$199</div>
                    </div>
                    <div className="config_summary-total-note">*Pricing may vary for members in NY/NJ.</div>
                    <Link href="/checkout" className="config_summary-cta config_summary-cta--primary">
                      Get Started
                    </Link>
                    <a href="#biomarkers" className="config_summary-cta config_summary-cta--secondary">
                      See Biomarkers
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
