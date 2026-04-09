'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { BiomarkerCategory } from './BiomarkersIndex';

interface CategorySidebarProps {
  categories: BiomarkerCategory[];
  activeCategory: string | null;
  onCategoryClick: (slug: string) => void;
  onActiveCategoryChange: (slug: string) => void;
  searchQuery: string;
}

export default function CategorySidebar({
  categories,
  activeCategory,
  onCategoryClick,
  onActiveCategoryChange,
  searchQuery,
}: CategorySidebarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navClickLockRef = useRef(false);

  // Scroll the active nav item into view
  const scrollNavIntoView = useCallback((navItem: HTMLElement | null) => {
    if (!navItem || !navRef.current) return;
    const nav = navRef.current;

    if (window.innerWidth <= 1024) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = navItem.getBoundingClientRect();
      const offset =
        itemRect.left +
        itemRect.width / 2 -
        (navRect.left + navRect.width / 2);
      nav.scrollBy({ left: offset, behavior: 'smooth' });
    } else {
      const navRect = nav.getBoundingClientRect();
      const itemRect = navItem.getBoundingClientRect();
      const pad = 16;
      if (itemRect.top < navRect.top + pad) {
        nav.scrollTo({
          top: nav.scrollTop + (itemRect.top - navRect.top) - pad,
          behavior: 'smooth',
        });
      } else if (itemRect.bottom > navRect.bottom - pad) {
        nav.scrollTo({
          top: nav.scrollTop + (itemRect.bottom - navRect.bottom) + pad,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  // IntersectionObserver for category spy
  useEffect(() => {
    if (searchQuery) return; // Disable spy during search

    const categoryEls = document.querySelectorAll('[data-bio-category]');
    if (!categoryEls.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = (entry.target as HTMLElement).dataset.bioCategory;
            if (slug) {
              onActiveCategoryChange(slug);
              // Scroll nav item into view
              const navItem = navRef.current?.querySelector(
                `[data-bio-nav="${slug}"]`
              ) as HTMLElement | null;
              if (navItem) scrollNavIntoView(navItem);
            }
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    categoryEls.forEach((el) => observerRef.current!.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [searchQuery, onActiveCategoryChange, scrollNavIntoView]);

  // Handle nav scroll indicator
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleScroll = () => {
      if (window.innerWidth <= 1024) {
        nav.classList.toggle('is-scrolled', nav.scrollLeft > 0);
      } else {
        nav.classList.toggle('is-scrolled', nav.scrollTop > 0);
      }
    };

    nav.addEventListener('scroll', handleScroll, { passive: true });
    return () => nav.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (slug: string) => {
      if (navClickLockRef.current) return;
      navClickLockRef.current = true;
      setTimeout(() => {
        navClickLockRef.current = false;
      }, 300);

      onActiveCategoryChange(slug);
      setTimeout(() => onCategoryClick(slug), 50);
    },
    [onCategoryClick, onActiveCategoryChange]
  );

  return (
    <div id="bio_nav" className="bio_nav" ref={navRef}>
      <div className="w-dyn-list">
        <div role="list" className="bio_nav-list w-dyn-items">
          {categories.map((cat) => (
            <div key={cat.slug} role="listitem" className="w-dyn-item">
              <div
                data-bio-nav={cat.slug}
                className={`bio_nav-item${activeCategory === cat.slug ? ' is-active' : ''}`}
                onClick={() => handleNavClick(cat.slug)}
                style={{ cursor: 'pointer' }}
              >
                {cat.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
