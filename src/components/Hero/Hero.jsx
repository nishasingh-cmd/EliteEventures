import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
      {/* Background Video */}
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
      <motion.header
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="navbar-container">
          <Link to="/" className="logo-brand-container">
            <motion.img
              src="/images/EliteEventureLogo2.png"
              alt="Elite Eventure Logo"
              className="logo-image"
              style={{ height: '40px', width: 'auto' }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <Link to="/" className="nav-link active">Home</Link>
            <Link to="/gallery" className="nav-link">Gallery</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          {/* Right Action Menu */}
          <div className="nav-actions">
            <motion.button
              className="theme-toggle"
              aria-label="Toggle Theme"
              whileHover={{ scale: 1.15, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
              </svg>
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link to="/contact" className="btn btn-talk">
                Let's Talk ↗
              </Link>
            </motion.div>

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
      </motion.header>

      {/* Mobile Navigation Dropdown */}
      <div className={`mobile-nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          <Link to="/" className="mobile-link" onClick={toggleMobileMenu}>Home</Link>
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
        <motion.div
          className="hero-left-col"
          initial={{ opacity: 0, x: -60, filter: 'blur(12px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="hero-split-headline">
            Your Brand.<br />
            Our Stage.
          </h1>
        </motion.div>

        {/* Right Column: Paragraph and Statistics */}
        <motion.div
          className="hero-right-col"
          initial={{ opacity: 0, x: 60, filter: 'blur(12px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero-split-paragraph text-small">
            We design exhibition stalls and immersive event experiences that bring brands to life and create meaningful connections.
          </p>

          <motion.div
            className="hero-left-actions"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <Link to="/gallery" className="btn btn-gold-pill">
              Explore Projects ↗
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
