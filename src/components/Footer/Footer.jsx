import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer-minimal-wrapper">
      <div className="footer-minimal-container">
        
        {/* LEFT COLUMN - Brand Logo & Solid White Social Circles */}
        <div className="footer-minimal-left">
          
          {/* Transparent brand logo */}
          <a href="#" className="footer-logo-brand-container">
            <div className="footer-logo-main">
              <span className="footer-logo-big-e">E</span>
              <div className="footer-logo-rows">
                <div className="footer-logo-row-top">LITE</div>
                <div className="footer-logo-row-bottom">
                  <svg className="footer-logo-v-arrow" viewBox="0 0 24 30" fill="none" stroke="#eab308" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 2 6 L 10 24 L 20 6" />
                    <path d="M 13 6 L 20 6 L 20 13" />
                  </svg>
                  ENTURE
                </div>
              </div>
            </div>
            <div className="footer-logo-divider" />
            <div className="footer-logo-tagline">
              <span className="f-tagline-left">Exhibition</span>
              <span className="f-tagline-right">Events | Visual events | Activation | Mice</span>
            </div>
          </a>

          {/* Socials - Instagram & LinkedIn solid white circles */}
          <div className="footer-minimal-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-minimal-social-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-minimal-social-btn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>

        </div>

        {/* RIGHT COLUMN - Gold Divider & Navigation Links */}
        <div className="footer-minimal-right">
          
          {/* Gold divider line */}
          <div className="footer-minimal-divider-line" />

          {/* Navigation Menu */}
          <div className="footer-minimal-nav-links">
            <a href="/" className="footer-minimal-nav-item">Home</a>
            <Link to="/gallery" className="footer-minimal-nav-item">Gallery</Link>
            <a href="#services" className="footer-minimal-nav-item">Services</a>
            <Link to="/about" className="footer-minimal-nav-item">About Us</Link>
            <a href="#contact" className="footer-minimal-nav-item">Contact Us</a>
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer
