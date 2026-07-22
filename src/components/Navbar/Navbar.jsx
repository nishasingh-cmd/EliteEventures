import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// Reuses the same navbar styles defined in Hero.css (already globally loaded via Hero)
import '../Hero/Hero.css';

/**
 * Shared Navbar — extracted from Hero so it can be used on
 * pages that don't render a full Hero section (e.g. GalleryPage).
 * Styling is identical to the Hero embedded navbar.
 * Active tab is driven entirely by the current URL via useLocation.
 */
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Start as scrolled so the pill style appears immediately on gallery page
    setScrolled(window.scrollY > 40);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Returns 'nav-link active' when the given path matches the current URL,
  // otherwise returns 'nav-link'. Hash-based routes (Services, Contact)
  // are considered active when the pathname is '/'.
  const navClass = (path) =>
    location.pathname === path ? 'nav-link active' : 'nav-link';

  const mobileClass = (path) =>
    location.pathname === path ? 'mobile-link active' : 'mobile-link';

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <a href="/" className="logo-brand-container">
            <img src="/images/EliteEventureLogo2.png" alt="Elite Eventure Logo" className="logo-image" style={{ height: '40px', width: 'auto' }} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
            <NavLink to="/gallery" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Gallery</NavLink>
            <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Services</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About Us</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
          </nav>

          {/* Right Action Menu */}
          <div className="nav-actions">
            <button className="theme-toggle" aria-label="Toggle Theme">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
              </svg>
            </button>

            <NavLink to="/contact" className="btn btn-talk">
              Let's Talk ↗
            </NavLink>

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
          <NavLink to="/" end className={({ isActive }) => isActive ? 'mobile-link active' : 'mobile-link'} onClick={closeMobileMenu}>Home</NavLink>
          <NavLink to="/gallery" className={({ isActive }) => isActive ? 'mobile-link active' : 'mobile-link'} onClick={closeMobileMenu}>Gallery</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? 'mobile-link active' : 'mobile-link'} onClick={closeMobileMenu}>Services</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'mobile-link active' : 'mobile-link'} onClick={closeMobileMenu}>About Us</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'mobile-link active' : 'mobile-link'} onClick={closeMobileMenu}>Contact</NavLink>
          <NavLink to="/contact" className="btn btn-mobile-talk" onClick={closeMobileMenu}>
            Let's Talk ↗
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

