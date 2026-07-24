import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../Hero/Hero.css';

/**
 * Shared Navbar:
 * - Home (/): transparent over hero, shrinks + glassmorphism on scroll.
 * - All other pages: solid sticky black navbar from page load, no shrink.
 */
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
