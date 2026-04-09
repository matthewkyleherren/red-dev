'use client';

import { useState, useEffect, useCallback } from 'react';

interface TOCItem {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  headings: TOCItem[];
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleScroll = useCallback(() => {
    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    let currentId = '';
    for (const el of headingElements) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 100) {
        currentId = el.id;
      }
    }
    setActiveId(currentId);
  }, [headings]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 50;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="fs-toc_sidebar-2">
      {/* @ts-expect-error Webflow custom attribute used by Finsweet TOC */}
      <div sidebar="toc" className="content_sidebar">
        <div
          className="content_sidebar-heading"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ cursor: 'pointer' }}
        >
          <h2 className="text-size-small-5 text-weight-medium">Contents</h2>
          <div className="content_accordion-icon w-embed">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: sidebarOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                transition: 'transform 0.3s ease',
              }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.55806 6.29544C2.46043 6.19781 2.46043 6.03952 2.55806 5.94189L3.44195 5.058C3.53958 4.96037 3.69787 4.96037 3.7955 5.058L8.00001 9.26251L12.2045 5.058C12.3021 4.96037 12.4604 4.96037 12.5581 5.058L13.4419 5.94189C13.5396 6.03952 13.5396 6.19781 13.4419 6.29544L8.17678 11.5606C8.07915 11.6582 7.92086 11.6582 7.82323 11.5606L2.55806 6.29544Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        {sidebarOpen && (
          <div data-lenis-prevent="" className="content_link-content">
            {headings.map((heading) => (
              <div
                key={heading.id}
                id={`w-node-toc-${heading.id}`}
                className="content_link-wrapper is-h2"
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={`content_link is-h2 w-inline-block${
                    activeId === heading.id ? ' w--current' : ''
                  }`}
                >
                  <div
                    className="included-toc_line"
                    style={
                      activeId === heading.id
                        ? { backgroundColor: '#fc5f2b', width: '1.25rem' }
                        : {}
                    }
                  />
                  <div>{heading.text}</div>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { generateSlug };
export type { TOCItem };
