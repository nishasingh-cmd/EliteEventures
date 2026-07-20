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
            <img src="/images/EliteEventureLogo2.png" alt="Elite Eventure Logo" className="footer-logo-image" style={{ height: '60px', width: 'auto' }} />
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
            <Link to="/services" className="footer-minimal-nav-item">Services</Link>
            <Link to="/about" className="footer-minimal-nav-item">About Us</Link>
            <Link to="/contact" className="footer-minimal-nav-item">Contact Us</Link>
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer
