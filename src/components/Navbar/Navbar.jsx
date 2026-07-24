import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import '../Hero/Hero.css';

/**
 * Shared Navbar:
 * - Home (/): transparent over hero, shrinks + glassmorphism on scroll.
 * - All other pages: solid sticky black navbar from page load, no shrink.
 */
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLight, toggleTheme } = useTheme();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    if (isHome) {
      // On home: start transparent, go scrolled after 40px
      setScrolled(window.scrollY > 40);
      const handleScroll = () => setScrolled(window.scrollY > 40);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      // On other pages: always in "scrolled" (solid) state
      setScrolled(true);
    }
  }, [isHome]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // On non-home pages, add 'navbar--solid' class for constant solid styling
  const navbarClass = [
    'navbar',
    scrolled ? 'scrolled' : '',
    !isHome ? 'navbar--solid' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <header className={navbarClass}>
        <div className="navbar-container">
          <a href="/" className="logo-brand-container">
            <img src="/images/EliteEventureLogoNew.png" alt="Elite Eventure Logo" className="logo-image" style={{ height: '40px', width: 'auto' }} />
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
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
              {isLight ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
                </svg>
              )}
            </button>

            <NavLink to="/contact" className="btn btn-talk">
              ContactUs
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
