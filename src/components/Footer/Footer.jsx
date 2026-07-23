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

        {/* RIGHT COLUMN - Gold Divider, Contact Info & Navigation Links */}
        <div className="footer-minimal-right">

          {/* Gold divider line */}
          <div className="footer-minimal-divider-line" />

          {/* Contact Details Row in Footer */}
          <div className="footer-contact-row">
            <div className="footer-contact-item">
              <span className="footer-contact-label">Email:</span>
              <a href="mailto:info@eliteeventure.com" className="footer-contact-link">info@eliteeventure.com</a>
              <span className="footer-link-dot">•</span>
              <a href="mailto:sales@eliteeventure.com" className="footer-contact-link">sales@eliteeventure.com</a>
            </div>

            <div className="footer-contact-item">
              <span className="footer-contact-label">Phone / WhatsApp:</span>
              <a href="https://wa.me/917208939926" target="_blank" rel="noopener noreferrer" className="footer-contact-link footer-wa-link">
                <svg className="footer-wa-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" opacity="1" />
                </svg>
                +91 7208939926
              </a>
              <span className="footer-link-dot">•</span>
              <a href="https://wa.me/917208939929" target="_blank" rel="noopener noreferrer" className="footer-contact-link footer-wa-link">
                <svg className="footer-wa-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" opacity="1" />
                </svg>
                +91 7208939929
              </a>
            </div>
          </div>

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
