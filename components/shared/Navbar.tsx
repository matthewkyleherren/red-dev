'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface NavbarProps {
  currentPage?: string;
}

export default function Navbar({ currentPage = '' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 300);
  };

  const isActive = (page: string) => currentPage === page;

  return (
    <>
      <nav className="navbar">
        <div className="navbar_component">
          <div className="navbar_container">
            {/* Logo */}
            <Link
              href="/"
              aria-current={isActive('/') ? 'page' : undefined}
              className={`navbar_logo-link1 w-inline-block${isActive('/') ? ' w--current' : ''}`}
            >
              <div className="navbar_logo w-embed">
                <svg width="100%" height="100%" viewBox="0 0 222 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.03669 6.94685C1.03669 -0.956311 17.1038 -2.59711 18.1114 6.86481C18.1386 7.49378 17.8663 7.79459 17.4033 7.79459H13.4002C12.9372 7.79459 12.7194 7.57582 12.6104 7.08358C11.9841 3.36445 6.45594 4.21219 6.45594 6.94685C6.45594 11.2129 18.5199 8.06806 18.5199 16.108C18.5199 25.0229 0.927765 25.2417 0.0018645 15.7524C-0.0253679 15.1782 0.246956 14.932 0.737138 14.932H4.7403C5.17602 14.932 5.42111 15.1782 5.53004 15.6978C6.21084 19.4169 12.91 19.2528 12.91 16.108C12.91 12.1154 1.03669 14.932 1.03669 6.94685ZM34.478 1.69631C34.478 1.17673 34.6959 0.875909 35.295 0.875909H39.1075C39.6794 0.875909 39.9517 1.17673 39.9517 1.69631V12.3888C39.9517 17.6941 36.6566 22.5891 30.1209 22.5891C23.5851 22.5891 20.2627 17.6941 20.2627 12.3888L20.2355 1.69631C20.2355 1.17673 20.5351 0.875909 21.0797 0.875909H24.9467C25.573 0.875909 25.7909 1.17673 25.7909 1.69631L25.8181 12.3888C25.8181 16.4088 27.8606 17.6667 30.1209 17.6667C32.3811 17.6667 34.4508 16.4088 34.4508 12.3888L34.478 1.69631ZM81.9713 9.24396H71.623C71.623 7.08358 73.7198 4.5677 77.0694 4.5677C80.419 4.5677 81.9713 7.08358 81.9713 9.24396ZM87.4177 12.4435V11.6778C87.4177 5.52483 83.9047 0.219591 76.9333 0.219591C71.7591 0.219591 68.0555 3.66526 66.6939 8.17745C66.0948 10.1464 66.0131 12.2794 66.4488 14.3304C67.5381 19.3622 71.4323 23.1907 76.9333 23.1907C77.8047 23.1907 84.994 23.1907 87.1999 16.1353C87.336 15.6704 87.1454 15.5063 86.7642 15.5063H82.407C82.1347 15.5063 81.944 15.6431 81.8079 15.9165C81.3721 16.8463 80.2284 18.6785 76.9333 18.6785C74.0194 18.6785 71.623 16.0533 71.623 13.3186H86.5735C87.1182 13.3186 87.4177 12.9904 87.4177 12.4435ZM200.405 9.29866H190.819C190.819 7.19297 192.589 4.73178 195.884 4.73178C199.179 4.73178 200.405 7.19297 200.405 9.29866ZM206.26 12.4435V11.6778C206.26 5.52483 202.719 0.219591 195.748 0.219591C190.574 0.219591 186.87 3.63792 185.509 8.17745C184.882 10.1464 184.801 12.2794 185.264 14.3304C186.326 19.3622 190.247 23.1907 195.748 23.1907C196.619 23.1907 203.809 23.1907 206.042 16.1626C206.178 15.6704 205.987 15.5063 205.579 15.5063H201.249C200.949 15.5063 200.759 15.6431 200.623 15.9165C200.187 16.8463 199.043 18.7059 195.748 18.7059C192.834 18.7059 190.71 16.0806 190.71 13.3186H205.388C205.96 13.3186 206.26 12.9904 206.26 12.4435ZM220.856 0.875909C221.619 0.875909 222 1.31346 222 2.10651V5.30606C222 6.12646 221.564 6.48196 220.747 6.48196C215.982 6.48196 213.694 8.72438 213.694 14.4945V21.7413C213.694 22.2609 213.367 22.5344 212.904 22.5344H208.847C208.384 22.5344 208.111 22.2609 208.111 21.7413V14.4945C208.111 9.51743 209.5 0.875909 220.856 0.875909ZM170.531 0.875909H166.146C165.847 0.875909 165.738 0.985295 165.629 1.31346L161.217 14.4398L157.786 1.31346C157.704 0.985295 157.568 0.875909 157.269 0.875909H152.122C151.686 0.875909 151.741 1.14938 151.822 1.45019L157.105 21.9601C157.214 22.425 157.405 22.5344 157.922 22.5344H163.396C163.804 22.5344 164.05 22.3703 164.186 21.9328L168.352 9.13457L172.492 21.9328C172.628 22.3703 172.9 22.5344 173.281 22.5344H178.782C179.3 22.5344 179.49 22.425 179.599 21.9601L184.882 1.45019C184.964 1.14938 185.018 0.875909 184.556 0.875909H179.436C179.109 0.875909 178.973 0.985295 178.891 1.31346L175.46 14.4398L171.075 1.31346C170.967 0.985295 170.83 0.875909 170.531 0.875909ZM134.993 11.6778C134.993 7.82194 137.062 5.3334 140.357 5.3334C143.653 5.3334 146.022 7.82194 146.022 11.6778C146.022 15.5337 143.571 18.0769 140.357 18.0769C137.144 18.0769 134.993 15.561 134.993 11.6778ZM140.357 0.219591C133.931 0.219591 129.301 5.52483 129.301 11.6778C129.301 17.8308 133.931 23.1907 140.357 23.1907C146.784 23.1907 151.713 17.9949 151.713 11.6778C151.713 5.36075 146.539 0.219591 140.357 0.219591ZM102.178 0.875909C102.94 0.875909 103.321 1.31346 103.321 2.10651V5.30606C103.321 6.12646 102.886 6.48196 102.069 6.48196C97.3031 6.48196 95.0155 8.72438 95.0155 14.4945V21.7413C95.0155 22.2609 94.6888 22.5344 94.2258 22.5344H90.1682C89.7052 22.5344 89.4329 22.2609 89.4329 21.7413V14.4945C89.4329 9.51743 90.8218 0.875909 102.178 0.875909ZM110.783 11.2403C110.783 15.0414 112.826 17.53 116.066 17.53C119.307 17.53 121.594 15.0688 121.594 11.2403C121.594 7.41174 119.225 5.00525 116.066 5.00525C112.907 5.00525 110.783 7.46644 110.783 11.2403ZM111.083 20.3193V29.207C111.083 29.7265 110.783 30 110.32 30H106.235C105.772 30 105.5 29.7265 105.5 29.207V2.07916C105.5 1.28611 105.936 0.875909 106.725 0.875909H110.102C110.919 0.875909 111.083 1.28611 111.083 2.07916V4.04812H111.382C115.549 -3.82769 127.422 0.438365 127.422 11.2403C127.422 22.8352 115.358 24.9135 111.083 20.3193ZM47.604 11.2403C47.604 15.0414 49.6737 17.53 52.8871 17.53C56.1005 17.53 58.4153 15.0688 58.4153 11.2403C58.4153 7.41174 56.0733 5.00525 52.8871 5.00525C49.7009 5.00525 47.604 7.46644 47.604 11.2403ZM47.8491 20.3193V29.207C47.8491 29.7265 47.5223 30 47.0594 30H43.0018C42.5116 30 42.2665 29.7265 42.2665 29.207V2.07916C42.2665 1.28611 42.675 0.875909 43.4647 0.875909H46.8688C47.6857 0.875909 47.8491 1.28611 47.8491 2.07916V4.04812H48.1214C52.288 -3.82769 64.1613 0.438365 64.1613 11.2403C64.1613 22.8352 52.0974 24.9135 47.8491 20.3193Z" fill="currentColor" />
                </svg>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div
              className="navbar_menu"
              style={mobileMenuOpen ? { display: 'flex' } : undefined}
            >
              <div className="navbar_links-wrapper">
                {/* Mobile Top Bar (visible only on mobile) */}
                <div className="navbar_top-bar">
                  <div></div>
                  <Link href="#" className="navbar_logo-link-mobile w-inline-block">
                    <img
                      src="/images/site/68757c771559473effe80139_superpower-logo-black.svg"
                      loading="lazy"
                      alt='Logo displaying the text "yahoo finance" in lowercase letters.'
                      className="navbar_logo-mobile"
                    />
                  </Link>
                  <div
                    id="w-node-_5fc20419-2e02-0b89-7a7a-5663b279a0f6-b279a0ed"
                    className="icon-close"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Close
                  </div>
                </div>

                {/* Dropdown Menu */}
                <div
                  data-hover="true"
                  data-delay="300"
                  className="nav-link_dropdown-menu w-dropdown"
                  ref={dropdownRef}
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div
                    className={`nav-link_dropdown-toggle is-first w-dropdown-toggle${dropdownOpen ? ' w--open' : ''}`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <Link
                      href="/how-it-works"
                      className={`nav-link_text${isActive('/how-it-works') ? ' w--current' : ''}`}
                    >
                      How It Works
                    </Link>
                    <Link
                      href="/biomarkers"
                      className={`nav-link_text${isActive('/biomarkers') ? ' w--current' : ''}`}
                    >
                      What We Test
                    </Link>
                    <Link
                      href="/reviews"
                      className={`nav-link_text${isActive('/reviews') ? ' w--current' : ''}`}
                    >
                      Reviews
                    </Link>
                    <Link
                      href="/gift"
                      className={`nav-link_text${isActive('/gift') ? ' w--current' : ''}`}
                    >
                      Gift Health
                    </Link>
                    <div className="nav_divider"></div>
                    <Link
                      href="/faqs"
                      className={`nav-link_text${isActive('/faqs') ? ' w--current' : ''}`}
                    >
                      FAQs
                    </Link>
                    <Link
                      href="/organizations"
                      className={`nav-link_text${isActive('/organizations') ? ' w--current' : ''}`}
                    >
                      For Teams
                    </Link>
                  </div>

                  {/* Dropdown List */}
                  <nav className={`nav-link_dropdown-list w-dropdown-list${dropdownOpen ? ' w--open' : ''}`}>
                    <div className="navbar-dropdown_content">
                      {/* Featured Image Link */}
                      <Link href="/checkout" className="navbar_dropdown-featured w-inline-block">
                        <img
                          src="/images/site/68c1f9a7b645cb5c90faeb88_frame%201597885064%20(1).avif"
                          alt='A person stands outdoors, under the sky. Text reads "Early Detection" and "Track Your Health."'
                          sizes="100vw"
                          srcSet="/images/site/68c1f9a7b645cb5c90faeb88_frame%201597885064%20(1)-p-500.avif 500w, /images/site/68c1f9a7b645cb5c90faeb88_frame%201597885064%20(1).avif 1039w"
                          className="image_cover-absolute"
                        />
                        <div className="navbar-dropdown-featured_text-wrapper">
                          <div className="text-size-tiny">Learn more about your body</div>
                          <div className="heading-style-h5">
                            Unlock Your Biological <br />Age Today
                          </div>
                        </div>
                      </Link>

                      {/* Dropdown Left Content */}
                      <div className="navbar_dropdown-left">
                        <div className="navbar_dropdown-inner-grid">
                          {/* Product Column */}
                          <div className="navbar_dd-inner-col">
                            <div className="text-style-mono text-style-muted">product</div>
                            <div className="navbar-dd_links-wrapper">
                              <Link href="/how-it-works" className="navbar_dd-product-link w-inline-block">
                                <img
                                  src="/images/site/68c1f75e7646ecadd6d7367d_frame%201597885344.avif"
                                  alt='Cover image with abstract orange and red patterns, titled "Superpower member" by Max Marchione.'
                                  className="navbar-dd_product-img"
                                />
                                <div className="navbar_dd-product-txt">
                                  How it Works<br />
                                  <span className="text-size-small text-style-muted">
                                    Get the most from your first premium health membership
                                  </span>
                                </div>
                              </Link>
                              <Link href="/biomarkers" className="navbar_dd-product-link w-inline-block">
                                <img
                                  src="/images/site/68c1f75e8deef30e432a252d_frame%201597885345.avif"
                                  alt="A test tube with an orange cap filled with liquid is upright."
                                  className="navbar-dd_product-img"
                                />
                                <div className="navbar_dd-product-txt">
                                  What We Test<br />
                                  <span className="text-size-small text-style-muted">
                                    100+ biomarkers included in your annual superpower test panel
                                  </span>
                                </div>
                              </Link>
                              <Link href="/organizations" className="navbar_dd-product-link w-inline-block">
                                <img
                                  src="/images/site/68c1f75e344d02745c98b9eb_frame%201597885344-1.avif"
                                  alt="Two women sitting, one standing behind them, all looking intently in the same direction."
                                  className="navbar-dd_product-img"
                                />
                                <div className="navbar_dd-product-txt">
                                  Superpower for Organizations<br />
                                  <span className="text-size-small text-style-muted">
                                    All the benefits of Superpower tailored to your organization
                                  </span>
                                </div>
                              </Link>
                            </div>
                          </div>

                          {/* Learn More Column */}
                          <div className="navbar_dd-inner-col">
                            <div className="text-style-mono text-style-muted">learn more</div>
                            <div className="navbar-dd_links-wrapper is-slimmer">
                              <Link href="/reviews" className="navbar1_link">
                                Reviews
                              </Link>
                              <Link href="/gift" className="navbar1_link">
                                Gift Health<span className="footer-link-suffix">[limited time]</span>
                              </Link>
                              <Link href="/faqs" className="navbar1_link">
                                FAQs
                              </Link>
                              <Link href="/manifesto" className="navbar1_link">
                                Our Why
                              </Link>
                              <Link href="/blog" className="navbar1_link">
                                Blog
                              </Link>
                            </div>
                          </div>

                          {/* Other Column */}
                          <div className="navbar_dd-inner-col">
                            <div className="text-style-mono text-style-muted">other</div>
                            <div className="navbar-dd_links-wrapper is-slimmer">
                              <Link href="/legal/privacy" className="navbar1_link">
                                Privacy Policy
                              </Link>
                              <Link href="/legal/medical-consent" className="navbar1_link">
                                Informed Medical Consent
                              </Link>
                              <Link href="/legal/terms" className="navbar1_link">
                                Terms &amp; Conditions
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>

                {/* Mobile Menu Wrapper */}
                <div className="navbar_mobile-wrapper">
                  <div className="navbar_mobile-links">
                    <div className="mobile-links_top">
                      <Link href="/how-it-works" className="nav-link_wrapper w-inline-block">
                        <div className="navlink_left">
                          <img
                            src="/images/site/6875654d84062d9d74116458_navlink-icon-1.avif"
                            loading="lazy"
                            alt="Close-up of a person's eye, partially covered by hair, with a serious expression."
                            className="nav-link_icon"
                          />
                          <div className="nav-link_text-mobile">How it works</div>
                        </div>
                        <div className="nav-link_ticker"></div>
                      </Link>
                      <Link href="/biomarkers" className="nav-link_wrapper w-inline-block">
                        <div className="navlink_left">
                          <img
                            src="/images/site/6875654dc5b5026f0ac8afab_navlink-icon-3.avif"
                            loading="lazy"
                            alt=""
                            className="nav-link_icon"
                          />
                          <div className="nav-link_text-mobile">What we test</div>
                        </div>
                        <div className="nav-link_ticker"></div>
                      </Link>
                      <Link href="/organizations" className="nav-link_wrapper w-inline-block">
                        <div className="navlink_left">
                          <img
                            src="/images/site/6875654d500c1200a830f1b1_navlink-icon-2.avif"
                            loading="lazy"
                            alt=""
                            className="nav-link_icon"
                          />
                          <div className="nav-link_text-mobile">For businesses</div>
                        </div>
                        <div className="nav-link_ticker"></div>
                      </Link>
                      <Link href="/faqs" className="nav-link_wrapper w-inline-block">
                        <div className="navlink_left">
                          <img
                            src="/images/site/6875654d1264a94508e20578_navlink-icon-4.avif"
                            loading="lazy"
                            alt=""
                            className="nav-link_icon"
                          />
                          <div className="nav-link_text-mobile">FAQs</div>
                        </div>
                        <div className="nav-link_ticker"></div>
                      </Link>
                      <Link href="/reviews" className="nav-link_wrapper w-inline-block">
                        <div className="navlink_left">
                          <img
                            src="/images/site/6875654d1264a94508e20578_navlink-icon-4.avif"
                            loading="lazy"
                            alt=""
                            className="nav-link_icon"
                          />
                          <div className="nav-link_text-mobile">Reviews</div>
                        </div>
                        <div className="nav-link_ticker"></div>
                      </Link>
                      <Link href="/blog" className="nav-link_wrapper w-inline-block">
                        <div className="navlink_left">
                          <img
                            src="/images/site/6875654d1264a94508e20578_navlink-icon-4.avif"
                            loading="lazy"
                            alt=""
                            className="nav-link_icon"
                          />
                          <div className="nav-link_text-mobile">Blog</div>
                        </div>
                        <div className="nav-link_ticker"></div>
                      </Link>
                    </div>

                    <div className="mobile-links_bottom">
                      <div className="dropdown_links-group">
                        <Link href="/gift" className="button is-small is-link is-icon w-inline-block">
                          <div>Gift Health</div>
                        </Link>
                        <a
                          href="https://www.healthiesthoodie.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button is-small is-link is-icon w-inline-block"
                        >
                          <div>World&apos;s healthiest</div>
                          <div className="icon-embed-small w-embed">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path
                                d="M10 2H14M14 2V6M14 2L6.66667 9.33333M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333"
                                stroke="#71717A"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </a>
                        <a
                          href="https://founderhealth.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button is-small is-link is-icon w-inline-block"
                        >
                          <div>The Founder health coalition</div>
                          <div className="icon-embed-small w-embed">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path
                                d="M10 2H14M14 2V6M14 2L6.66667 9.33333M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333"
                                stroke="#71717A"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </a>
                        <Link href="/legal/privacy" className="button is-link is-small text-color-secondary w-button">
                          Privacy Policy
                        </Link>
                        <Link href="/legal/medical-consent" className="button is-link is-small text-color-secondary w-button">
                          Informed medical consent
                        </Link>
                        <Link href="/legal/terms" className="button is-link is-small text-color-secondary w-button">
                          Terms &amp; conditions
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="button-group is-flex-vertical">
                    <Link href="/checkout" className="button is-large flex-centre w-button">
                      Try Superpower
                    </Link>
                    <a href="https://app.superpower.com/signin" className="button is-large is-tertiary flex-centre w-button">
                      Login
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Login + CTA + Mobile Menu Button */}
            <div className="navbar_right">
              <a
                href="https://app.superpower.com/signin"
                className="button is-link is-alternate is-moblie-login w-button"
              >
                Login
              </a>
              <div className="navbar_cta hide-tablet">
                <a
                  href="https://app.superpower.com/signin"
                  className="button is-link is-alternate w-button"
                >
                  Login
                </a>
                <div className="div-block-266">
                  <Link href="/checkout" className="button w-button">
                    Try Superpower
                  </Link>
                </div>
              </div>
              <div className="nav_mobile-menu-button">
                <a
                  href="#"
                  className="nav_mobile-open w-inline-block"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(!mobileMenuOpen);
                  }}
                >
                  <div className="nav-mobile_cross w-embed">
                    <svg width="100%" height="100%" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="2.53247" cy="2.93777" r="2" fill="currentColor" />
                      <circle cx="13.5325" cy="2.93777" r="2" fill="currentColor" />
                      <circle cx="13.5325" cy="11.9378" r="2" fill="currentColor" />
                      <circle cx="2.53247" cy="11.9378" r="2" fill="currentColor" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            <div className="navbar_blur"></div>
          </div>
        </div>
      </nav>
      <div
        className="nav_bg-overlay"
        style={mobileMenuOpen ? { display: 'block', pointerEvents: 'auto', zIndex: 4 } : undefined}
        onClick={() => setMobileMenuOpen(false)}
      ></div>
    </>
  );
}
