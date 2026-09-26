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
          <Link to="/" className="logo-brand-container" aria-label="Elite Eventure Homepage">
            <img src="/images/EliteEventureLogoNew.png" alt="Elite Eventure - Exhibition Stalls and Brand Activations" className="logo-image" style={{ height: '40px', width: 'auto' }} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <Link to="/" className="nav-link active">Home</Link>
            <Link to="/gallery" className="nav-link">Gallery</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          {/* Right Action Menu */}
          <div className="nav-actions">
            <Link to="/contact" className="btn btn-talk">
              Contact Us
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
        <nav className="mobile-nav-links" aria-label="Mobile Navigation">
          <Link to="/" className="mobile-link" onClick={toggleMobileMenu}>Home</Link>
          <Link to="/gallery" className="mobile-link" onClick={toggleMobileMenu}>Gallery</Link>
          <Link to="/services" className="mobile-link" onClick={toggleMobileMenu}>Services</Link>
          <Link to="/about" className="mobile-link" onClick={toggleMobileMenu}>About Us</Link>
          <Link to="/contact" className="mobile-link" onClick={toggleMobileMenu}>Contact</Link>
          <Link to="/contact" className="btn btn-mobile-talk" onClick={toggleMobileMenu}>
            Contact Us ↗
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
            <span className="sr-only"> - Exhibition Stall Design, Fabrication & Brand Activations in Mumbai, Delhi & Pan-India</span>
          </h1>
        </div>

        {/* Right Column: Paragraph and Statistics */}
        <div className="hero-right-col">
          <p className="hero-split-paragraph text-small">
            We design exhibition stalls and immersive event experiences that bring brands to life and create meaningful connections.
          </p>

          <div className="hero-left-actions">
            <Link to="/gallery" className="btn btn-gold-pill">
              Explore Projects ↗
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
