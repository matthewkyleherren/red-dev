'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import type { BiomarkerCategory, Biomarker } from './BiomarkersIndex';

interface BiomarkerAccordionProps {
  category: BiomarkerCategory & { visible?: boolean };
  searchQuery: string;
  activePanelFilter: string | null;
}

function escHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function highlightText(text: string, query: string): string {
  if (!query) return escHtml(text);
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return escHtml(text);
  return (
    escHtml(text.substring(0, idx)) +
    '<mark class="bio_highlight">' +
    escHtml(text.substring(idx, idx + query.length)) +
    '</mark>' +
    escHtml(text.substring(idx + query.length))
  );
}

function BiomarkerDots({ panels }: { panels: Biomarker['panels'] }) {
  const effectivePanels =
    panels.length > 0
      ? panels
      : [{ color: 'orange', name: 'Baseline Panel' }];

  return (
    <div
      className={`config_biomarker-dots${effectivePanels.length > 1 ? ' is-stacked' : ''}`}
    >
      {effectivePanels.map((p, i) => (
        <span
          key={`${p.color}-${i}`}
          className={`bio_item-dot config_color-${p.color}`}
          title={p.name}
        />
      ))}
    </div>
  );
}

function BiomarkerItem({
  biomarker,
  searchQuery,
  isOpen,
  onToggle,
}: {
  biomarker: Biomarker;
  searchQuery: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const query = searchQuery.toLowerCase().trim();
  const nameMatched = query && biomarker.name.toLowerCase().includes(query);
  const descMatched =
    query && biomarker.description.toLowerCase().includes(query);

  // Auto-open on description match
  const shouldAutoOpen = descMatched && !nameMatched && !isOpen;

  useEffect(() => {
    if (shouldAutoOpen) {
      onToggle();
    }
    // Only trigger on query change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Animate open/close
  useEffect(() => {
    const panel = panelRef.current;
    const inner = innerRef.current;
    if (!panel || !inner) return;

    if (isOpen) {
      // Opening
      panel.style.transition = 'none';
      panel.style.paddingTop = '';
      panel.style.paddingBottom = '';
      // Force reflow
      void panel.offsetHeight;
      const targetH = panel.scrollHeight;
      panel.style.transition =
        'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      panel.style.maxHeight = `${targetH}px`;

      const onEnd = (ev: TransitionEvent) => {
        if (ev.propertyName !== 'max-height') return;
        panel.removeEventListener('transitionend', onEnd);
        panel.style.transition = 'none';
        panel.style.maxHeight = 'none';
        void panel.offsetHeight;
        panel.style.transition = '';
      };
      panel.addEventListener('transitionend', onEnd);

      setTimeout(() => {
        inner.classList.remove('acc-hidden');
        inner.classList.add('acc-visible');
      }, 100);
    } else {
      // Closing
      panel.style.transition = 'none';
      panel.style.maxHeight = `${panel.scrollHeight}px`;
      void panel.offsetHeight;
      panel.style.transition = '';
      panel.style.maxHeight = '0px';
      panel.style.paddingTop = '0';
      panel.style.paddingBottom = '0';

      inner.classList.remove('acc-visible');
      inner.classList.add('acc-hidden');
    }
  }, [isOpen]);

  return (
    <div
      data-bio-name={biomarker.name}
      className={`bio_item${isOpen ? ' is-open' : ''}`}
    >
      <div
        className="bio_item-header"
        onClick={onToggle}
        style={{
          cursor: 'pointer',
          paddingBottom: isOpen ? '0.5rem' : '1rem',
          transition:
            'padding-bottom 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <BiomarkerDots panels={biomarker.panels} />
        <div className="bio_item-name-wrap">
          <div
            className="bio_item-name text-style-2lines"
            dangerouslySetInnerHTML={{
              __html: highlightText(biomarker.name, query),
            }}
          />
        </div>
        <span
          className={`accordion__icon${isOpen ? ' accordion__icon--active' : ''}`}
        />
      </div>
      <div
        className="bio_item-accordion"
        ref={panelRef}
        style={{
          overflow: 'hidden',
          maxHeight: '0px',
          transition:
            'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          className="bio_item-accordion-inner acc-hidden"
          ref={innerRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <p
            className="text-style-muted"
            dangerouslySetInnerHTML={{
              __html: highlightText(biomarker.description, query),
            }}
          />
          <Link
            href={`/biomarkers/${biomarker.slug}`}
            className="text-style-link1"
          >
            Learn more
          </Link>
          <div className="margin-top margin-xxsmall">
            <p className="text-style-disclaimer">
              Method: FDA-cleared clinical laboratory assay performed in
              CLIA-certified, CAP-accredited laboratories. Used to aid
              clinician-directed evaluation and monitoring. Not a stand-alone
              diagnosis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BiomarkerAccordion({
  category,
  searchQuery,
  activePanelFilter,
}: BiomarkerAccordionProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  // Stagger animation on filter change
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const items = categoryRef.current?.querySelectorAll('.bio_item');
    if (items) {
      items.forEach((item, i) => {
        (item as HTMLElement).classList.add('is-stagger');
        timeouts.push(
          setTimeout(() => {
            (item as HTMLElement).classList.remove('is-stagger');
          }, 40 * i)
        );
      });
    }
    return () => timeouts.forEach(clearTimeout);
  }, [searchQuery, activePanelFilter]);

  const handleToggle = useCallback((bioName: string) => {
    setOpenItem((prev) => (prev === bioName ? null : bioName));
  }, []);

  if (!category.visible && category.visible !== undefined) {
    return null;
  }

  return (
    <div
      data-bio-category={category.slug}
      className="bio_category"
      ref={categoryRef}
    >
      <div className="bio_category-header">
        <div className="bio_category-name">{category.name}</div>
        <div data-bio-count="" className="bio_category-count">
          {category.biomarkers.length}
        </div>
      </div>
      <div className="w-dyn-list">
        <div role="list" className="bio_list w-dyn-items">
          {category.biomarkers.map((bio) => (
            <div key={bio.slug} role="listitem" className="w-dyn-item">
              <BiomarkerItem
                biomarker={bio}
                searchQuery={searchQuery}
                isOpen={openItem === bio.name}
                onToggle={() => handleToggle(bio.name)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
