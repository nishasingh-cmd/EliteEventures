import React from 'react'
import { motion } from 'framer-motion'
import './FeaturedWorks.css'

/* ── 9 curated project images ─────────────────────────────────── */
const works = [
  { id: 1,  src: '/images/vijay_mamra_stall.png',     label: 'Vijay Mamra Food Expo Stall',     cat: 'Exhibition'       },
  { id: 2,  src: '/images/pepe_jeans_stall.png',      label: 'Pepe Jeans London Fashion Booth', cat: 'Brand Activation' },
  { id: 3,  src: '/images/dr_rashel.jpeg',             label: 'Dr. Rashel Skincare Pavilion',    cat: 'Brand Activation' },
  { id: 4,  src: '/images/house_of_cavalli_stall.png',label: 'House of Cavalli Luxury Exhibit', cat: 'Experience Zone'  },
  { id: 5,  src: '/images/flexiworld_stall.png',      label: 'Flexiworld Tech Pavilion',        cat: 'Corporate Event'  },
  { id: 6,  src: '/images/deal_jeans_stall.png',      label: 'Deal Jeans Trade Show Stand',     cat: 'Trade Show'       },
  { id: 7,  src: '/images/smarr_realty_stall.png',    label: 'Smarr Realty Architectural Expo', cat: 'Exhibition'       },
  { id: 8,  src: '/images/lacoste_stall.png',         label: 'Lacoste Sportswear Booth',        cat: 'Trade Show'       },
  { id: 9,  src: '/images/landscape_1.jpeg',          label: 'Executive Corporate Summit Stage',cat: 'Corporate Event'  },
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
