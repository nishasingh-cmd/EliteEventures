import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Reuses the same navbar styles defined in Hero.css (already globally loaded via Hero)
import '../Hero/Hero.css';

/**
 * Shared Navbar — extracted from Hero so it can be used on
 * pages that don't render a full Hero section (e.g. GalleryPage).
 * Styling is identical to the Hero embedded navbar.
 */
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Start as scrolled so the pill style appears immediately on gallery page
    setScrolled(window.scrollY > 40);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu  = () => setMobileMenuOpen(false);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <a href="/" className="logo-brand-container">
            <div className="logo-main">
              <span className="logo-big-e">E</span>
              <div className="logo-rows">
                <div className="logo-row-top">LITE</div>
                <div className="logo-row-bottom">
                  <svg className="logo-v-arrow" viewBox="0 0 24 30" fill="none" stroke="var(--color-gold-brand)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 2 6 L 10 24 L 20 6" />
                    <path d="M 13 6 L 20 6 L 20 13" />
                  </svg>
                  ENTURE
                </div>
              </div>
            </div>
            <div className="logo-divider"></div>
            <div className="logo-tagline">
              <span className="tagline-left">Exhibition</span>
              <span className="tagline-right">Events | Visual events | Activation | Mice</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <a href="/" className="nav-link">Home</a>
            <Link to="/gallery" className="nav-link active">Gallery</Link>
            <a href="/#services" className="nav-link">Services</a>
            <Link to="/about" className="nav-link">About Us</Link>
            <a href="/#contact" className="nav-link">Contact</a>
          </nav>

          {/* Right Action Menu */}
          <div className="nav-actions">
            <button className="theme-toggle" aria-label="Toggle Theme">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
              </svg>
            </button>

            <a href="/#contact" className="btn btn-talk">
              Let's Talk ↗
            </a>

            {/* Hamburger Button for Mobile */}
            <button
              className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle Mobile Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      <div className={`mobile-nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          <a href="/" className="mobile-link" onClick={closeMobileMenu}>Home</a>
          <Link to="/gallery" className="mobile-link active" onClick={closeMobileMenu}>Gallery</Link>
          <a href="/#services" className="mobile-link" onClick={closeMobileMenu}>Services</a>
          <Link to="/about" className="mobile-link" onClick={closeMobileMenu}>About Us</Link>
          <a href="/#contact" className="mobile-link" onClick={closeMobileMenu}>Contact</a>
          <a href="/#contact" className="btn btn-mobile-talk" onClick={closeMobileMenu}>
            Let's Talk ↗
          </a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
