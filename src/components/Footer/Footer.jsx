import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="corporate-footer">
      {/* Matte black background with subtle luxury grid/noise overlay and subtle gold corners */}
      <div className="corp-footer-bg-overlay" />
      <div className="corp-footer-glow-left" />
      <div className="corp-footer-glow-right" />

      <div className="corp-footer-container">
        <div className="corp-footer-grid">
          
          {/* Left Column: Logo, Short Desc, Socials */}
          <div className="corp-footer-col corp-left-col">
            <Link to="/" className="corp-footer-logo-link">
              <img
                src="/images/EliteEventureLogo2.png"
                alt="Elite Eventure Logo"
                className="corp-footer-logo"
              />
            </Link>
            <p className="corp-footer-desc">
              We design and build brand experiences that get noticed — from exhibition stalls to full-scale brand activations, pan-India.
            </p>
            <div className="corp-footer-socials">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="corp-social-btn"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="corp-social-btn"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="corp-social-btn"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="corp-social-btn"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>

          {/* Center Column: Quick Links */}
          <div className="corp-footer-col corp-center-col">
            <h4 className="corp-footer-heading">Quick Links</h4>
            <ul className="corp-footer-links">
              <li>
                <Link to="/" className="corp-nav-link">Home</Link>
              </li>
              <li>
                <Link to="/about" className="corp-nav-link">About</Link>
              </li>
              <li>
                <Link to="/services" className="corp-nav-link">Services</Link>
              </li>
              <li>
                <Link to="/gallery" className="corp-nav-link">Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="corp-nav-link">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Right Column: Get In Touch */}
          <div className="corp-footer-col corp-right-col">
            <h4 className="corp-footer-heading">Get In Touch</h4>
            <div className="corp-footer-contact">
              <a href="tel:+917208939926" className="corp-contact-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="corp-contact-icon">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="corp-contact-text">+91 7208939926</span>
              </a>

              <a href="mailto:info@eliteeventure.com" className="corp-contact-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="corp-contact-icon">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span className="corp-contact-text">info@eliteeventure.com</span>
              </a>

              <div className="corp-contact-row static">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="corp-contact-icon">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="corp-contact-text">Mumbai, Delhi &amp; Bengaluru</span>
              </div>
            </div>
          </div>

        </div>

        {/* Thin Divider Line */}
        <div className="corp-footer-divider" />

        {/* Center Copyright Section */}
        <div className="corp-footer-bottom">
          <p>© 2026 Elite Eventure. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
