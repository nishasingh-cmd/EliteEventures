import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll state to toggle between full-width transparent and floating pill navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="hero-container">
      {/* Background Video with Dark Overlay */}
      <div className="video-background">
        <div className="video-overlay"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="bg-video"
        >
          <source src="/eliteEventureVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Header / Navbar */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <a href="#" className="logo-brand-container">
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
            <a href="/" className="nav-link active">Home</a>
            <Link to="/gallery" className="nav-link">Gallery</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          {/* Right Action Menu */}
          <div className="nav-actions">
            <button className="theme-toggle" aria-label="Toggle Theme">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
              </svg>
            </button>

            <Link to="/contact" className="btn btn-talk">
              Let's Talk ↗
            </Link>

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
          <a href="/" className="mobile-link" onClick={toggleMobileMenu}>Home</a>
          <Link to="/gallery" className="mobile-link" onClick={toggleMobileMenu}>Gallery</Link>
          <Link to="/services" className="mobile-link" onClick={toggleMobileMenu}>Services</Link>
          <Link to="/about" className="mobile-link" onClick={toggleMobileMenu}>About Us</Link>
          <Link to="/contact" className="mobile-link" onClick={toggleMobileMenu}>Contact</Link>
          <Link to="/contact" className="btn btn-mobile-talk" onClick={toggleMobileMenu}>
            Let's Talk ↗
          </Link>
        </nav>
      </div>

      {/* Split Bottom Hero Layout */}
      <div className="hero-content split-layout">
        {/* Left Column: Headline and CTA */}
        <div className="hero-left-col">
          <h1 className="hero-split-headline">
            Your Brand.<br />
            Our Stage.
          </h1>
        </div>

        {/* Right Column: Paragraph and Statistics */}
        <div className="hero-right-col">
          <p className="hero-split-paragraph text-small">
            We design exhibition stalls and immersive event experiences that bring brands to life and create meaningful connections.
          </p>

          <div className="hero-left-actions">
            <a href="#projects" className="btn btn-gold-pill">
              Explore Projects ↗
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
