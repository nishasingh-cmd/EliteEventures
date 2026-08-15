import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './InteriorDesign.css'

function InteriorDesign() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const customEase = [0.22, 1, 0.36, 1]

  const handleExploreClick = (e) => {
    e.preventDefault()
    const target = document.getElementById('gallery-showcase')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/gallery'
    }
  }

  return (
    <section className="interior-section" id="interior-design" ref={sectionRef}>
      {/* Background architectural ambient glow */}
      <div className="interior-bg-glow" />
      <div className="interior-ambient-spotlight" />

      <div className="interior-container">
        {/* ── Left Column: Editorial Typography & Call to Action ── */}
        <motion.div
          className="interior-content-col"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: customEase }}
        >
          {/* Top Gold Label */}
          <motion.div
            className="interior-label-wrap"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: customEase }}
          >
            <span className="interior-gold-label">INTERIOR DESIGN</span>
            <div className="interior-label-line" />
          </motion.div>

          {/* Large Architectural Headline */}
          <motion.h2
            className="interior-headline"
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
          >
            We Design Spaces <br />
            <span className="interior-gold-text">That Make an Impression</span>
          </motion.h2>

          {/* Supporting Copy */}
          <motion.p
            className="interior-description"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.32, ease: customEase }}
          >
            From sophisticated corporate spaces to immersive event environments, we transform
            ideas into beautifully designed interiors that reflect your brand, vision, and identity.
          </motion.p>

          {/* Subtle Feature Badges / Highlights */}
          <motion.div
            className="interior-features-row"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.44, ease: customEase }}
          >
            <div className="interior-feature-pill">
              <span className="feature-dot" />
              <span>Corporate & Executive Lounges</span>
            </div>
            <div className="interior-feature-pill">
              <span className="feature-dot" />
              <span>Luxury Hospitality & Brand Pavilions</span>
            </div>
          </motion.div>

          {/* Primary Call to Action */}
          <motion.div
            className="interior-cta-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55, ease: customEase }}
          >
            <a
              href="#gallery-showcase"
              onClick={handleExploreClick}
              className="interior-cta-btn"
              aria-label="Explore our interior design works"
            >
              <span className="cta-btn-text">EXPLORE OUR DESIGNS</span>
              <span className="cta-btn-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right Column: Editorial Overlapping Architectural Showcase ── */}
        <motion.div
          className="interior-visual-col"
          initial={{ opacity: 0, x: 50, scale: 0.96 }}
          animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: customEase }}
        >
          <div className="interior-composition-wrapper">
            {/* Primary Dominant Frame (Image 1 - Corporate Interior) */}
            <motion.div
              className="interior-frame-primary"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="interior-corner corner-tl" />
              <div className="interior-corner corner-br" />
              <img
                src="/images/interior-design-1.webp"
                onError={(e) => {
                  e.currentTarget.src = '/images/interior-design-1.jpg'
                }}
                alt="Modern corporate office interior design"
                className="interior-img"
                loading="lazy"
              />
              <div className="interior-img-overlay" />
              <div className="interior-floating-tag tag-primary">
                <span className="tag-indicator" />
                <span>Corporate Workspaces</span>
              </div>
            </motion.div>

            {/* Secondary Overlapping Frame (Image 2 - Event / Hospitality Interior) */}
            <motion.div
              className="interior-frame-secondary"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.45, ease: customEase }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div className="interior-corner corner-tr" />
              <div className="interior-corner corner-bl" />
              <img
                src="/images/interior-design-2.webp"
                onError={(e) => {
                  e.currentTarget.src = '/images/interior-design-2.jpg'
                }}
                alt="Elegant modern interior with warm lighting and wood paneling"
                className="interior-img"
                loading="lazy"
              />
              <div className="interior-img-overlay" />
              <div className="interior-floating-tag tag-secondary">
                <span className="tag-indicator" />
                <span>Architectural Detailing</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Smooth Bottom Transition Line directly leading to Gallery */}
      <div className="interior-bottom-transition" />
    </section>
  )
}

export default InteriorDesign
