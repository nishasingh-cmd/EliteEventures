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
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 })

  // Easing curve specified in user prompt
  const customEase = [0.22, 1, 0.36, 1]

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-container">
        {/* Left Column: Image Card with Cinematic Blur, Scale, Rotation & Ambient Floating */}
        <motion.div 
          className="about-img-frame-col"
          initial={{ opacity: 0, x: -100, y: 20, scale: 0.94, rotate: -2 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1.2, ease: customEase }}
        >
          <motion.div 
            className="about-single-card"
            animate={isInView ? { y: [0, -4, 0] } : {}}
            transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1.2 }}
          >
            <img 
              src="/images/dr_rashel.jpeg" 
              alt="Elite Eventure 3D Exhibition Stand Showcase" 
              className="about-card-img" 
              loading="lazy" 
            />
          </motion.div>
        </motion.div>

        {/* Right Column: Staggered Cinematic Assembly */}
        <div className="about-content-col">
          {/* 1. Top Geometric Logo Accent */}
          <motion.div 
            className="about-geo-accent"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: customEase }}
          >
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
          </motion.div>

          {/* 2. Main Headline */}
          <motion.h2 
            className="about-ref-headline"
            initial={{ opacity: 0, x: 80, y: 20, scale: 0.96 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease: customEase }}
          >
            India's Most Trusted <br />
            <span className="gold-text">Exhibition Stand Design</span> Company
          </motion.h2>

          {/* 3. Body Paragraph */}
          <motion.p 
            className="about-ref-paragraph"
            initial={{ opacity: 0, x: 80, y: 20, scale: 0.96 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.38, ease: customEase }}
          >
            Elite Eventure is a top-notch exhibition stand design company in India. Over the last 15+ years, as industry experts, we have created and built massive exhibit spaces as per the brands' needs and companies' preferences. We oversee concept development, 3D design, construction, installation, and dismantling, and work on projects in major exhibition venues across the country, Europe, the USA, and the Middle East.
          </motion.p>

          {/* 4. Statistics Cards Row */}
          <motion.div 
            className="about-stats-row"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.50, ease: customEase }}
          >
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
          </motion.div>

          {/* 5. Action Buttons Row */}
          <motion.div 
            className="about-btn-group"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.62, ease: customEase }}
          >
            <NavLink to="/contact" className="ref-pill-btn btn-red">
              <span className="btn-icon"></span> LOCATION
            </NavLink>
            <NavLink to="/about" className="ref-pill-btn btn-yellow">
              <span className="btn-icon"></span> READ MORE
            </NavLink>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
