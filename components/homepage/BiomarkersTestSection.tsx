'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import biomarkersData from '@/data/homepage-biomarkers.json';

const CATEGORIES = [
  { name: 'Heart & Vascular Health', icon: '/images/site/68cc80e8c251ccfb9ff86caf_biomarker-icon-10.avif' },
  { name: 'Liver Health', icon: '/images/site/68cc80e810c084dec3c3e0a9_biomarker-icon-9.avif' },
  { name: 'Kidney Health', icon: '/images/site/68cc80e8f42199371336529c_biomarker-icon-8.avif' },
  { name: 'Sex Hormones', icon: '/images/site/68cc80e8ff3bda7273a724de_biomarker-icon-7.avif' },
  { name: 'Metabolic Health', icon: '/images/site/68cc80e8027f56988febd223_biomarker-icon-6.avif' },
  { name: 'Nutrients', icon: '/images/site/68cc80e811fc78929ad40748_image%203115.avif' },
  { name: 'Inflammation', icon: '/images/site/68cc80e8027f56988febd223_biomarker-icon-6.avif' },
  { name: 'Thyroid Health', icon: '/images/site/68cc80e804fb0a90db2056e7_biomarker-icon-4.avif' },
  { name: 'Energy', icon: '/images/site/68cc80e8df0724cd25c70a6e_biomarker-icon-3.avif' },
  { name: 'Immune System', icon: '/images/site/68cc80e8b84908e0d4886ffb_biomarker-icon-2.avif' },
  { name: 'Body Composition', icon: '/images/site/68cc80e805dbfdb91710e985_biomarker-icon-1.avif' },
  { name: 'DNA Health', icon: '/images/site/68cc80e8eb35a203b2de6e81_biomarker-icon.avif' },
];

interface BiomarkerItem {
  name: string;
  slug: string;
  category: string;
  panelName: string;
  panelColor: string;
  isAdvanced: boolean;
  isDerived: boolean;
  isPanelVisible: boolean;
}

const allBiomarkers = biomarkersData.biomarkers as BiomarkerItem[];

export default function BiomarkersTestSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = useCallback((catName: string) => {
    setActiveCategory((prev) => (prev === catName ? null : catName));
  }, []);

  const filteredBiomarkers = activeCategory
    ? allBiomarkers.filter((b) => b.category === activeCategory)
    : allBiomarkers;

  return (
    <section className="section_biomarkers-test">
      <div className="page-padding padding-section-large">
        <div className="container-large z-index-2">
          <style
            dangerouslySetInnerHTML={{
              __html: `[data-truncate-this]{display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;word-break:break-all;}
.bio-test_categ-btn{opacity:0.5;transition:opacity 0.25s ease;}
.bio-test_categ-btn .w--redirected-checked{opacity:1;}
.bio-test_categ-btn:has(.w--redirected-checked){opacity:1 !important;}`,
            }}
          />
          <div className="w-form">
          <div className="biomarkers-test_component">
            <div className="bio-test_left home">
              <div className="title_row">
                <h2>See everything we test</h2>
                <p className="text-size-large text-style-muted">
                  The following 100+ biomarkers are included with your annual Superpower membership.
                </p>
              </div>
              <div className="bio-test_category-wrapper">
                {CATEGORIES.map((cat) => (
                  <label
                    key={cat.name}
                    className={`bio-test_categ-btn w-radio${activeCategory === cat.name ? ' is-active' : ''}`}
                    onClick={() => handleCategoryClick(cat.name)}
                    style={activeCategory === cat.name ? { opacity: 1, borderColor: 'rgba(0,0,0,0.15)', borderRadius: '0.5rem' } : undefined}
                  >
                    <img
                      src={cat.icon}
                      loading="lazy"
                      alt=""
                      className="biomarkers-test_item_image"
                    />
                    <span className="w-form-label">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div
              role="list"
              className="biomarkers_test_cms_list w-dyn-items"
            >
              {filteredBiomarkers.map((bio) => (
                <div
                  key={bio.slug}
                  role="listitem"
                  className="biomarkers_test_cms_item w-dyn-item"
                >
                  <div>
                    <Link
                      href={`/biomarkers/${bio.slug}`}
                      className="biomarkers_test_cms_flex w-inline-block"
                    >
                      <div data-truncate-this="">{bio.name}</div>
                      {bio.isDerived && (
                        <div className="tooltip-wrapper-2 is-biomarker">
                          <img
                            src="/images/site/698b4da1c31ef79d767bfcf9_frame%201321315848.svg"
                            loading="lazy"
                            alt=""
                            className="icon_bio-derived"
                          />
                          <div className="tooltip-text">Derived biomarker</div>
                        </div>
                      )}
                      {bio.isAdvanced ? (
                        <div className="biomarkers_test_cms_advanced">Advanced panel</div>
                      ) : (
                        <div className="biomarkers_test_cms_advanced w-condition-invisible" style={{display:'none'}}>Advanced panel</div>
                      )}
                      {bio.isPanelVisible ? (
                        <div className="biomarkers_test_cms_panel">
                          <div
                            style={{ color: bio.panelColor }}
                            className="biomarkers_test_cms_text"
                          >
                            {bio.panelName}
                          </div>
                          <div
                            style={{ backgroundColor: bio.panelColor }}
                            className="biomarkers_test_cms_bg"
                          ></div>
                        </div>
                      ) : (
                        <div className="biomarkers_test_cms_panel w-condition-invisible" style={{display:'none'}}>
                          <div className="biomarkers_test_cms_text">{bio.panelName || ''}</div>
                          <div className="biomarkers_test_cms_bg"></div>
                        </div>
                      )}
                    </Link>
                    <div className="hide">{bio.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>{/* close w-form */}
        </div>
      </div>
    </section>
  );
}
