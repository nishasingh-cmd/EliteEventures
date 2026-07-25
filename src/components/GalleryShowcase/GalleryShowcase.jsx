import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import "./GalleryShowcase.css"
import "../FeaturedWorks/FeaturedWorks.css"

/* ── 23 curated project images spread across rows ────────────────── */
const works = [
  { id: 1,  src: '/images/vijay_mamra_stall.png',       label: 'Vijay Mamra Food Expo Stall',            cat: 'Exhibition'       },
  { id: 2,  src: '/images/dr_rashel_glow_up_arcade.png',label: 'Dr. Rashel Glow Up Arcade Grand Arch',   cat: 'Brand Activation' },
  { id: 3,  src: '/images/pepe_jeans_stall.png',        label: 'Pepe Jeans London Fashion Booth',        cat: 'Brand Activation' },
  { id: 4,  src: '/images/dr_rashel.jpeg',               label: 'Dr. Rashel Skincare Pavilion',           cat: 'Brand Activation' },
  { id: 5,  src: '/images/dr_rashel_detan_booth.png',   label: 'Dr. Rashel De-Tan Scrub Beach Pavilion', cat: 'Brand Activation' },
  { id: 6,  src: '/images/dr_rashel_stage.jpeg',         label: 'Dr. Rashel Beauty Elixirs Stage',        cat: 'Stage & Events'   },
  { id: 7,  src: '/images/mufti_led_cube_1.jpeg',        label: 'Mufti 3D LED Experience Zone',           cat: 'Brand Activation' },
  { id: 8,  src: '/images/dr_rashel_kderma_glow.png',   label: 'Dr. Rashel K-Derma Flawless Glow Zone',  cat: 'Experience Zone'  },
  { id: 9,  src: '/images/house_of_cavalli_stall.png',  label: 'House of Cavalli Luxury Exhibit',         cat: 'Experience Zone'  },
  { id: 10, src: '/images/flexiworld_stall.png',        label: 'Flexiworld Tech Pavilion',               cat: 'Corporate Event'  },
  { id: 11, src: '/images/dr_rashel_charcoal_zone.png', label: 'Dr. Rashel Charcoal Gaming & Skincare',  cat: 'Brand Activation' },
  { id: 12, src: '/images/flexiworld_stall_2.jpeg',      label: 'Flexiworld Logistics Stand',             cat: 'Exhibition'       },
  { id: 13, src: '/images/deal_jeans_stall.png',        label: 'Deal Jeans Trade Show Stand',            cat: 'Trade Show'       },
  { id: 14, src: '/images/dr_rashel_3d_concept.png',    label: 'Dr. Rashel Multi-Zone Pavilion Concept', cat: 'Exhibition'       },
  { id: 15, src: '/images/hello_watch_stall.jpeg',      label: 'Hello EDC Luxury Watch Booth',           cat: 'Exhibition'       },
  { id: 16, src: '/images/smarr_realty_stall.png',      label: 'Smarr Realty Architectural Expo',        cat: 'Exhibition'       },
  { id: 17, src: '/images/dr_rashel_rumi_glow.png',     label: 'Dr. Rashel Rumi’s Glow Club Display',    cat: 'Brand Activation' },
  { id: 18, src: '/images/mufti_led_cube_2.jpeg',        label: 'Mufti Immersive Cube Display',          cat: 'Brand Activation' },
  { id: 19, src: '/images/lacoste_stall.png',           label: 'Lacoste Sportswear Booth',               cat: 'Trade Show'       },
  { id: 20, src: '/images/dr_rashel_detan_beach_zone.png',label: 'Dr. Rashel Sun & Beach Beauty Exhibit',cat: 'Experience Zone'  },
  { id: 21, src: '/images/vijay_mamra_stall_2.jpeg',     label: 'Vijay Mamra Premium Exhibition Booth',   cat: 'Exhibition'       },
  { id: 22, src: '/images/dr_rashel_pavilion_interior.png',label: 'Dr. Rashel Pavilion Walkthrough',     cat: 'Stage & Events'   },
  { id: 23, src: '/images/landscape_1.jpeg',            label: 'Executive Corporate Summit Stage',       cat: 'Corporate Event'  },
]

function getVariants(index) {
  const fromTop = index % 2 === 0
  return {
    hidden: { opacity: 0, y: fromTop ? -20 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: Math.min((index % 6) * 0.04, 0.2),
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }
}

export default function GalleryShowcase({
  titlePrefix = "Our",
  titleHighlight = "Showcase",
  badge = null,
  subtext = "Explore our portfolio of exhibition stalls, brand activations, corporate events, and immersive experiences—crafted with creativity, precision, and flawless execution.",
  id = "gallery-showcase"
}) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" })

  return (
    <section
      className="gsc-section"
      id={id}
      ref={sectionRef}
    >
      <div className="gsc-separator" />
      <div className="gsc-bg-glow" />

      {/* ── Our Showcase Header ── */}
      <div className="gsc-header">
        <div className="gsc-header-titles">
          {badge && <div className="gsc-badge">{badge}</div>}
          <motion.h2
            className="gsc-headline"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {titlePrefix && `${titlePrefix} `}<span className="gsc-headline-gold">{titleHighlight}</span>
          </motion.h2>
        </div>
        <motion.p
          className="gsc-subtext"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {subtext}
        </motion.p>
      </div>

      {/* ── Masonry Gallery Grid ── */}
      <div className="fw-grid">
        {works.map((work, i) => (
          <motion.div
            key={work.id}
            className={`fw-item fw-item--${(i % 3) + 1}`}
            variants={getVariants(i)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            whileHover={{ scale: 1.04, transition: { duration: 0.25, ease: 'easeOut' } }}
          >
            <div className="fw-img-wrap">
              <img
                src={work.src}
                alt={work.label}
                className="fw-img"
                loading="lazy"
              />
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
