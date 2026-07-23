import React from 'react'
import { motion } from 'framer-motion'
import './FeaturedWorks.css'

/* ── 9 curated project images ─────────────────────────────────── */
const works = [
  { id: 1,  src: '/images/stall1.png',   label: 'Architectural Exhibition Stall',    cat: 'Exhibition'       },
  { id: 2,  src: '/images/ex1.png',      label: 'Corporate Summit Stage',            cat: 'Corporate Event'  },
  { id: 3,  src: '/images/g1.png',       label: 'Dr. Rashel Brand Activation',       cat: 'Brand Activation' },
  { id: 4,  src: '/images/stall3.png',   label: 'Modular Pavilion Setup',            cat: 'Exhibition'       },
  { id: 5,  src: '/images/g4.png',       label: 'Walkaroo Experience Zone',          cat: 'Product Launch'   },
  { id: 6,  src: '/images/collage1.png', label: 'Automotive Launch Event',           cat: 'Live Event'       },
  { id: 7,  src: '/images/g7.png',       label: 'Hello EDC Brand Experience',        cat: 'Activation'       },
  { id: 8,  src: '/images/stall5.png',   label: 'Premium Promo Booth',               cat: 'Trade Show'       },
  { id: 9,  src: '/images/ex4.png',      label: 'Corporate Award Ceremony',          cat: 'Corporate Event'  },
]

/* Alternate: even indices slide from top, odd from bottom */
function getVariants(index) {
  const fromTop = index % 2 === 0
  return {
    hidden: { opacity: 0, y: fromTop ? -80 : 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        delay: index * 0.13,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }
}

export default function FeaturedWorks() {
  return (
    <section className="fw-section" id="featured-works" aria-label="Featured Works">
      {/* Background accent glow */}
      <div className="fw-bg-glow" aria-hidden="true" />

      {/* ── Header ── */}
      <div className="fw-header">
        <motion.h2
          className="fw-headline"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Featured <span className="fw-gold">Projects</span>
        </motion.h2>
      </div>

      {/* ── Masonry Grid ── */}
      <div className="fw-grid">
        {works.map((work, i) => (
          <motion.div
            key={work.id}
            className={`fw-item fw-item--${(i % 3) + 1}`}
            variants={getVariants(i)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ scale: 1.04, transition: { duration: 0.35, ease: 'easeOut' } }}
          >
            <div className="fw-img-wrap">
              <img
                src={work.src}
                alt={work.label}
                className="fw-img"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="fw-overlay">
                <span className="fw-overlay-cat">{work.cat}</span>
                <p className="fw-overlay-label">{work.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
