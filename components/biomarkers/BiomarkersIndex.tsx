'use client';

import { useState, useCallback, useRef } from 'react';
import biomarkersData from '@/data/biomarkers.json';
import ConfigBar from './ConfigBar';
import CategorySidebar from './CategorySidebar';
import BiomarkerSearch from './BiomarkerSearch';
import PanelLegend from './PanelLegend';
import BiomarkerAccordion from './BiomarkerAccordion';
import BiomarkerDefinition from './BiomarkerDefinition';
import LabTesting from './LabTesting';
import BiomarkerFAQs from './BiomarkerFAQs';
import BiomarkersStyles from './BiomarkersStyles';
import WwtConfigurator from './WwtConfigurator';

export interface BiomarkerPanel {
  color: string;
  name: string;
}

export interface Biomarker {
  name: string;
  slug: string;
  description: string;
  panels: BiomarkerPanel[];
}

export interface BiomarkerCategory {
  name: string;
  slug: string;
  biomarkers: Biomarker[];
}

export interface PanelDef {
  id: string;
  name: string;
  label: string;
}

const panels = biomarkersData.panels as PanelDef[];
const categories = biomarkersData.categories as BiomarkerCategory[];

export default function BiomarkersIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePanelFilter, setActivePanelFilter] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Filter logic
  const getFilteredData = useCallback(() => {
    const query = searchQuery.toLowerCase().trim();

    return categories.map((cat) => {
      const filteredBiomarkers = cat.biomarkers.filter((bio) => {
        const nameMatch = !query || bio.name.toLowerCase().includes(query);
        const descMatch = !query || bio.description.toLowerCase().includes(query);
        const matchSearch = !query || nameMatch || descMatch;

        const matchPanel =
          !activePanelFilter ||
          bio.panels.some((p) => p.color === activePanelFilter) ||
          (bio.panels.length === 0 && activePanelFilter === 'orange');

        return matchSearch && matchPanel;
      });

      return {
        ...cat,
        biomarkers: filteredBiomarkers,
        visible: filteredBiomarkers.length > 0,
      };
    });
  }, [searchQuery, activePanelFilter]);

  const filteredCategories = getFilteredData();
  const totalVisible = filteredCategories.reduce(
    (sum, cat) => sum + cat.biomarkers.length,
    0
  );

  const handlePanelFilter = useCallback((color: string | null) => {
    setActivePanelFilter((prev) => (prev === color ? null : color));
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategoryClick = useCallback((slug: string) => {
    const el = document.querySelector(`[data-bio-category="${slug}"]`);
    if (!el) return;
    const top =
      el.getBoundingClientRect().top + window.scrollY - 144;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  return (
    <>
      <BiomarkersStyles />
      <ConfigBar />
      <WwtConfigurator />

      <section id="all" className="section_wwt-biomarkers">
        <div className="page-padding">
          <div className="container-large z-index-2">
            <div className="title_row">
              <h2 className="heading-style-h2">All biomarkers</h2>
            </div>
            <div>
              <section id="bio_root" className="bio_root">
                <div className="bio_layout">
                  <nav id="bio_sidebar" className="bio_sidebar">
                    <CategorySidebar
                      categories={categories}
                      activeCategory={activeCategory}
                      onCategoryClick={handleCategoryClick}
                      onActiveCategoryChange={setActiveCategory}
                      searchQuery={searchQuery}
                    />
                  </nav>
                  <PanelLegend
                    panels={panels}
                    activePanelFilter={activePanelFilter}
                    onPanelFilter={handlePanelFilter}
                  />

                  <div
                    id="bio_content"
                    className={`bio_content${activePanelFilter ? ' is-panel-filter' : ''}`}
                    ref={contentRef}
                  >
                    <BiomarkerSearch
                      searchQuery={searchQuery}
                      onSearch={handleSearch}
                    />

                    {searchQuery && totalVisible > 0 && (
                      <div
                        id="bio_search-count"
                        className="bio_search-count is-show"
                      >
                        Showing {totalVisible} result
                        {totalVisible !== 1 ? 's' : ''}
                      </div>
                    )}

                    {totalVisible === 0 && (
                      <div id="bio_empty" className="bio_empty is-show">
                        <div id="bio_empty-title" className="bio_empty-title">
                          {searchQuery
                            ? `No results for \u2018${searchQuery}\u2019`
                            : activePanelFilter
                              ? 'No biomarkers found for this panel'
                              : ''}
                        </div>
                        <div className="bio_empty-sub">
                          Try a different search term
                        </div>
                      </div>
                    )}

                    <div className="w-dyn-list">
                      <div
                        role="list"
                        className="bio-category_list w-dyn-items"
                      >
                        {filteredCategories.map((cat) => (
                          <div
                            key={cat.slug}
                            role="listitem"
                            className={`w-dyn-item${!cat.visible ? ' is-hidden-wrap' : ''}`}
                            style={!cat.visible ? { display: 'none' } : undefined}
                          >
                            <BiomarkerAccordion
                              category={cat}
                              searchQuery={searchQuery}
                              activePanelFilter={activePanelFilter}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <LabTesting />
      <BiomarkerDefinition />
      <BiomarkerFAQs />
    </>
  );
}
