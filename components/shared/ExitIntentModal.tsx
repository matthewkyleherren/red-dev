'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

// Configuration
const SCROLL_PCT = 0.65;
const EXIT_Y = 10;
const FALLBACK_MS = 40000;
const LS_KEY = 'modal_consult_last_shown';
const COOLDOWN_DAYS = 21;
const ANIM_DURATION = 400; // ms

function daysToMs(d: number): number {
  return d * 86400000;
}

function canShow(): boolean {
  try {
    const last = parseInt(localStorage.getItem(LS_KEY) || '0', 10);
    return !last || (Date.now() - last) >= daysToMs(COOLDOWN_DAYS);
  } catch {
    return true;
  }
}

function stampShown(): void {
  try {
    localStorage.setItem(LS_KEY, String(Date.now()));
  } catch {
    // ignore
  }
}

interface ExitIntentModalProps {
  /** The heading text displayed in the modal */
  heading?: string;
  /** The description text displayed in the modal */
  description?: string;
  /** The CTA button text */
  ctaText?: string;
  /** The CTA button link */
  ctaHref?: string;
  /** Optional image src for the modal */
  imageSrc?: string;
  /** Optional image alt text */
  imageAlt?: string;
}

export default function ExitIntentModal({
  heading = 'Get a free consultation',
  description = 'Book a free 15-minute call with our health team to learn how Superpower can help you take control of your health.',
  ctaText = 'Book a free call',
  ctaHref = '/checkout',
  imageSrc,
  imageAlt = '',
}: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const openedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openModal = useCallback(() => {
    if (openedRef.current || !canShow()) return;
    openedRef.current = true;
    stampShown();
    setIsOpen(true);
    // Trigger animation after mount
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    });
  }, []);

  const closeModal = useCallback(() => {
    if (!isOpen) return;
    setIsAnimating(false);
    // Wait for animation to finish, then unmount
    setTimeout(() => {
      setIsOpen(false);
    }, ANIM_DURATION);
  }, [isOpen]);

  // Exit intent listener (mouseleave near top)
  useEffect(() => {
    function onExitIntent(e: MouseEvent) {
      if (e.clientY <= EXIT_Y) {
        openModal();
      }
    }

    document.addEventListener('mouseleave', onExitIntent, { passive: true } as AddEventListenerOptions);
    return () => {
      document.removeEventListener('mouseleave', onExitIntent);
    };
  }, [openModal]);

  // Scroll listener (65% threshold)
  useEffect(() => {
    let scrollTick = false;

    function onScroll() {
      if (scrollTick) return;
      scrollTick = true;
      requestAnimationFrame(() => {
        scrollTick = false;
        const doc = document.documentElement;
        const max = (doc.scrollHeight || 0) - doc.clientHeight;
        if (max <= 0) return;
        const top = doc.scrollTop || document.body.scrollTop || 0;
        if (top / max >= SCROLL_PCT) {
          openModal();
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [openModal]);

  // Fallback timer
  useEffect(() => {
    timerRef.current = setTimeout(openModal, FALLBACK_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [openModal]);

  // ESC key handler
  useEffect(() => {
    if (!isOpen) return;

    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal();
    }

    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [isOpen, closeModal]);

  // Prevent body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      data-modal-consult=""
      className="modal-consult_component"
      style={{ display: 'flex' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      {/* Background overlay */}
      <div
        data-modal-consult-bg=""
        className="modal-consult_bg"
        style={{
          opacity: isAnimating ? 1 : 0,
          transition: `opacity ${ANIM_DURATION}ms ease`,
        }}
        onClick={closeModal}
      />

      {/* Modal content */}
      <div
        data-modal-consult-content=""
        className="modal-consult_content"
        style={{
          transform: isAnimating ? 'translateY(0)' : 'translateY(5rem)',
          filter: isAnimating ? 'blur(0px)' : 'blur(5px)',
          opacity: isAnimating ? 1 : 0,
          transition: `transform ${ANIM_DURATION}ms ease, filter ${ANIM_DURATION}ms ease, opacity ${ANIM_DURATION}ms ease`,
        }}
      >
        {/* Close button */}
        <button
          data-modal-consult-close=""
          className="modal-consult_close w-inline-block"
          onClick={(e) => {
            e.preventDefault();
            closeModal();
          }}
          aria-label="Close modal"
        >
          <div className="icon-1x1-xsmall w-embed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>

        <div className="modal-consult_inner">
          {imageSrc && (
            <div className="modal-consult_image-wrapper">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="modal-consult_image"
                loading="lazy"
              />
            </div>
          )}

          <div className="modal-consult_text-wrapper">
            <h3 className="heading-style-h3">{heading}</h3>
            <p className="text-size-large text-color-secondary">
              {description}
            </p>
          </div>

          <div className="modal-consult_cta-wrapper">
            <Link
              href={ctaHref}
              className="button is-large is-icon w-inline-block"
            >
              <div>{ctaText}</div>
              <div className="icon-embed-regular hide-mobile-portrait w-embed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <path
                    d="M9.5 18.5967L15.5 12.5967L9.5 6.59668"
                    stroke="#FAFAFA"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
