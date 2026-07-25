import React from 'react'
import { motion } from 'framer-motion'
import './FeaturedWorks.css'

/* ── 15 curated project images ─────────────────────────────────── */
const works = [
  { id: 1,  src: '/images/vijay_mamra_stall.png',     label: 'Vijay Mamra Food Expo Stall',     cat: 'Exhibition'       },
  { id: 2,  src: '/images/pepe_jeans_stall.png',      label: 'Pepe Jeans London Fashion Booth', cat: 'Brand Activation' },
  { id: 3,  src: '/images/dr_rashel.jpeg',             label: 'Dr. Rashel Skincare Pavilion',    cat: 'Brand Activation' },
  { id: 4,  src: '/images/dr_rashel_stage.jpeg',       label: 'Dr. Rashel Beauty Elixirs Stage', cat: 'Stage & Events'   },
  { id: 5,  src: '/images/mufti_led_cube_1.jpeg',      label: 'Mufti 3D LED Experience Zone',    cat: 'Brand Activation' },
  { id: 6,  src: '/images/house_of_cavalli_stall.png',label: 'House of Cavalli Luxury Exhibit',  cat: 'Experience Zone'  },
  { id: 7,  src: '/images/flexiworld_stall.png',      label: 'Flexiworld Tech Pavilion',        cat: 'Corporate Event'  },
  { id: 8,  src: '/images/flexiworld_stall_2.jpeg',    label: 'Flexiworld Logistics Stand',      cat: 'Exhibition'       },
  { id: 9,  src: '/images/deal_jeans_stall.png',      label: 'Deal Jeans Trade Show Stand',     cat: 'Trade Show'       },
  { id: 10, src: '/images/hello_watch_stall.jpeg',    label: 'Hello EDC Luxury Watch Booth',    cat: 'Exhibition'       },
  { id: 11, src: '/images/smarr_realty_stall.png',    label: 'Smarr Realty Architectural Expo', cat: 'Exhibition'       },
  { id: 12, src: '/images/mufti_led_cube_2.jpeg',      label: 'Mufti Immersive Cube Display',   cat: 'Brand Activation' },
  { id: 13, src: '/images/lacoste_stall.png',         label: 'Lacoste Sportswear Booth',        cat: 'Trade Show'       },
  { id: 14, src: '/images/vijay_mamra_stall_2.jpeg',   label: 'Vijay Mamra Premium Exhibition Booth', cat: 'Exhibition'  },
  { id: 15, src: '/images/landscape_1.jpeg',          label: 'Executive Corporate Summit Stage',cat: 'Corporate Event'  },
]

/* Staggered quick pop-in for responsive fast loading */
function getVariants(index) {
  return {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: Math.min(index * 0.04, 0.3),
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
            viewport={{ once: true, amount: 0.1 }}
            whileHover={{ scale: 1.03, transition: { duration: 0.25, ease: 'easeOut' } }}
          >
            <div className="fw-img-wrap">
              <img
                src={work.src}
                alt={work.label}
                className="fw-img"
                loading="eager"
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
