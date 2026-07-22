import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import './AboutSection.css'

// Reusable AnimatedCounter component
function AnimatedCounter({ endValue, suffix = '', duration = 2.2, delay = 0 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, endValue, {
        duration,
        delay,
        ease: 'easeOut',
        onUpdate: (value) => setCount(Math.floor(value)),
      })
      return () => controls.stop()
    }
  }, [isInView, endValue, duration, delay])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

function AboutSection() {
  return (
    <section className="about-section" id="about">
      <motion.div
        className="about-container"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Left Side: Large Rounded Exhibition Showcase Image */}
        <motion.div 
          className="about-img-frame-col"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about-single-card">
            <img 
              src="/images/stall1.png" 
              alt="Elite Eventure 3D Exhibition Stand Showcase" 
              className="about-card-img" 
              loading="lazy" 
            />
            {/* Subtle luxury glass accent badge on image */}
            <div className="about-card-badge">
              <span className="badge-pulse-dot" />
              <span>3D Spatial Design</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Copy, Geometric Accent & Action Buttons */}
        <motion.div 
          className="about-content-col"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top Geometric Logo Accent (Matching Reference) */}
          <div className="about-geo-accent">
            <svg width="50" height="50" viewBox="0 0 60 60" fill="none">
              <polygon points="30,5 55,20 55,50 30,35" fill="url(#goldGrad1)" opacity="0.85" />
              <polygon points="5,20 30,5 30,35 5,50" fill="url(#redGrad1)" opacity="0.9" />
              <defs>
                <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#eab308" />
                </linearGradient>
                <linearGradient id="redGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Main Headline */}
          <h2 className="about-ref-headline">
            India's Most Trusted <br />
            <span className="gold-text">Exhibition Stand Design</span> Company
          </h2>

          {/* Body Paragraph */}
          <p className="about-ref-paragraph">
            Elite Eventure is a top-notch exhibition stand design company in India. Over the last 15+ years, as industry experts, we have created and built massive exhibit spaces as per the brands' needs and companies' preferences. We oversee concept development, 3D design, construction, installation, and dismantling, and work on projects in major exhibition venues across the country, Europe, the USA, and the Middle East.
          </p>

          {/* Quick Counter Pills */}
          <div className="about-stats-row">
            <div className="stat-pill">
              <span className="stat-pill-num">
                <AnimatedCounter endValue={500} suffix="+" duration={2} />
              </span>
              <span className="stat-pill-lbl">Projects Delivered</span>
            </div>
            <div className="stat-pill">
              <span className="stat-pill-num">
                <AnimatedCounter endValue={120} suffix="+" duration={2} delay={0.1} />
              </span>
              <span className="stat-pill-lbl">Global Brands</span>
            </div>
            <div className="stat-pill">
              <span className="stat-pill-num">
                <AnimatedCounter endValue={15} suffix="+" duration={2} delay={0.2} />
              </span>
              <span className="stat-pill-lbl">Years Experience</span>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="about-btn-group">
            <NavLink to="/contact" className="ref-pill-btn btn-red">
              <span className="btn-icon"></span> LOCATION
            </NavLink>
            <NavLink to="/about" className="ref-pill-btn btn-yellow">
              <span className="btn-icon"></span> READ MORE
            </NavLink>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default AboutSection
