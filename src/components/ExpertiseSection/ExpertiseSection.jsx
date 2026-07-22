import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './ExpertiseSection.css'

const expertiseItems = [
  {
    id: 1,
    title: 'Corporate Events',
    description: 'End-to-end conference planning, from venue selection to logistics, for seamless execution.',
    offset: false,
  },
  {
    id: 2,
    title: 'MICE',
    description: 'Tailor-made solutions for meetings, incentives, conferences, and exhibitions that leave a lasting impression.',
    offset: false,
  },
  {
    id: 3,
    title: 'Exhibitions',
    description: 'Designing and managing large-scale exhibitions, ensuring effective brand engagement.',
    offset: false,
  },
  {
    id: 4,
    title: 'Product Launches',
    description: 'From concept to execution, we create impactful product launch events that captivate your audience.',
    offset: false,
  },
  {
    id: 5,
    title: 'Virtual Events',
    description: 'Innovative virtual event experiences that connect and engage participants globally.',
    offset: false,
  },
]

const CheckIcon = () => (
  <span className="check-icon-outer">
    <svg className="check-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
)

function ExpertiseSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12 // -6px to 6px
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12
    setMousePos({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <section className="expertise-section" id="services">
      {/* Subtle top divider line */}
      <div className="expertise-top-divider" />

      {/* Background spotlights & radial glow */}
      <div className="expertise-bg-glow" />
      <div className="expertise-title-spotlight" />

      <div className="expertise-container">
        {/* ── LEFT SIDE — Layered Image Collage with Slide & Parallax ── */}
        <motion.div
          className="expertise-left"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="collage-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: mousePos.x, y: mousePos.y }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
          >
            {/* Floating background particles */}
            <div className="particle particle-1" />
            <div className="particle particle-2" />
            <div className="particle particle-3" />
            <div className="particle particle-4" />

            {/* Overlapping Image 1 (Top Left) */}
            <motion.div
              className="collage-frame collage-frame-secondary-1"
              initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img src="/images/ex1.png" alt="Exhibition Booth Detail" className="collage-img" loading="lazy" />
              <div className="collage-glass-overlay" />
            </motion.div>

            {/* Large Primary Image (Center) */}
            <motion.div
              className="collage-frame collage-frame-primary"
              initial={{ opacity: 0, y: 40, rotate: 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src="/images/expertise_main.png" alt="Corporate Event Stage Design" className="collage-img" loading="lazy" />
              <div className="collage-glass-overlay" />
            </motion.div>

            {/* Overlapping Image 2 (Bottom Right) */}
            <motion.div
              className="collage-frame collage-frame-secondary-2"
              initial={{ opacity: 0, scale: 0.85, rotate: 6 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img src="/images/ex3.png" alt="Corporate Gala setup" className="collage-img" loading="lazy" />
              <div className="collage-glass-overlay" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT SIDE — Vertically Centered List with Slide Entrance ── */}
        <motion.div
          className="expertise-right"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="expertise-header">
            <h2 className="expertise-headline">
              Our <span className="expertise-gold">Expertise</span>
            </h2>
          </div>

          <div className="expertise-list">
            {expertiseItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={`expertise-row-item ${item.offset ? 'offset-right' : ''}`}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={itemVariants}
              >
                <div className="expertise-item-content">
                  <CheckIcon />
                  <div className="expertise-item-text">
                    <h3 className="expertise-item-title">{item.title}</h3>
                    <p className="expertise-item-desc">{item.description}</p>
                  </div>
                </div>
                <div className="expertise-item-divider">
                  <div className="expertise-item-divider-fill" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Subtle bottom divider line */}
      <div className="expertise-bottom-divider" />
    </section>
  )
}

export default ExpertiseSection
