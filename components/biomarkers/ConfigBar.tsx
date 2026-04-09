'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ConfigBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="config_stickybar"
      className={`config_stickybar${isVisible ? ' is-visible' : ''}${isExpanded ? ' is-expanded' : ''}`}
      ref={barRef}
    >
      <div className="config_stickybar-inner">
        <div className="config_stickybar-top-row">
          <div
            id="config_stickybar-info"
            className="config_stickybar-info"
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ cursor: 'pointer' }}
          >
            <div className="config_stickybar-top">
              <img
                src="/images/site/6939cef41197aa2d67720546_test-tube.avif"
                loading="lazy"
                alt=""
                className="config_stickybar-img"
              />
              <div>
                <div className="config_stickybar-title-wrapper">
                  <span className="config_stickybar-title">
                    Superpower Membership
                  </span>
                  <svg
                    id="config_stickybar-chevron"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="config_stickybar-chevron"
                    style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <path
                      d="M5 8l5 5 5-5"
                      stroke="#1a1a1a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div
                  id="config_stickybar-selections"
                  className="config_stickybar-selections"
                />
              </div>
            </div>
          </div>
          <Link
            id="config_stickybar-cta"
            href="/checkout"
            className="config_stickybar-cta"
          >
            Get Started &mdash; $199
          </Link>
        </div>
        <div
          id="config_stickybar-drawer"
          className="config_stickybar-drawer"
          style={{
            maxHeight: isExpanded ? '500px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div
            id="config_stickybar-drawer-content"
            className="config_stickybar-drawer-inner"
          />
        </div>
      </div>
    </div>
  );
}
