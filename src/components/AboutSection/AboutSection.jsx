import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
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
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Left Column: Copy, Grid & Button */}
        <div className="about-left-col">

          <h2 className="about-headline">
            About <br />
            <span className="gold-italic">Elite Eventure</span>
          </h2>

          <p className="about-paragraph">
            Welcome to Elite Eventure, your trusted partner for innovative exhibition stall designs and event solutions. With years of expertise, we transform brand visions into engaging experiences through creative design, strategic planning, and flawless execution. Every stall is thoughtfully crafted to reflect your brand identity and leave a lasting impression.
          </p>

          {/* 2x2 Grid of Stats Cards */}
          <div className="about-stats-grid">
            {[
              { value: 500, suffix: '+', label: 'Projects Delivered', delay: 0 },
              { value: 120, suffix: '+', label: 'Global Brands', delay: 0.15 },
              { value: 15, suffix: '+', label: 'Years of Craft', delay: 0.3 },
              { value: 98, suffix: '%', label: 'Client Satisfaction', delay: 0.45 },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="about-stat-card"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -4, borderColor: 'rgba(234, 179, 8, 0.4)' }}
                transition={{ type: 'spring', stiffness: 350, damping: 20, delay: stat.delay }}
              >
                <span className="stat-number">
                  <AnimatedCounter endValue={stat.value} suffix={stat.suffix} duration={2.2} delay={stat.delay} />
                </span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Right Column: Layered Overlapping Collage */}
        <div className="about-right-col">
          <div className="about-collage">
            {/* Image 1: Top Left */}
            <motion.div
              className="collage-img-wrapper img-pos-1"
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, rotate: -2, zIndex: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 }}
            >
              <img src="/images/collage1.png" alt="Automotive Event Launch" className="collage-img" loading="lazy" />
            </motion.div>

            {/* Image 2: Top Right */}
            <motion.div
              className="collage-img-wrapper img-pos-2"
              initial={{ opacity: 0, scale: 0.85, rotate: 4 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, rotate: 2, zIndex: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.35 }}
            >
              <img src="/images/collage2.png" alt="Interactive Experience Zone" className="collage-img" loading="lazy" />
            </motion.div>

            {/* Image 3: Bottom Center */}
            <motion.div
              className="collage-img-wrapper img-pos-3"
              initial={{ opacity: 0, y: 40, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, y: -5, zIndex: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.5 }}
            >
              <img src="/images/collage3.png" alt="High-End Exhibition Stall Showcase" className="collage-img" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default AboutSection
