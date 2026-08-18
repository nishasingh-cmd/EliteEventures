import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import "./GalleryShowcase.css"
import "../FeaturedWorks/FeaturedWorks.css"

/* ── 3 Column Distribution: Real brand installations strictly on TOP, Renders at BOTTOM (Zero repeats) ──── */
const columnsData = [
  // Column 1
  [
    { id: 'c1-1', src: '/images/pepe_jeans_stall.png',        label: 'Pepe Jeans London Fashion Booth',        cat: 'Brand Activation', ratioClass: 'fw-item--1' },
    { id: 'c1-2', src: '/images/dr_rashel.jpeg',               label: 'Dr. Rashel Skincare Pavilion',           cat: 'Brand Activation', ratioClass: 'fw-item--2' },
    { id: 'c2-1', src: '/images/deal_jeans_stall.png',        label: 'Deal Jeans Trade Show Stand',            cat: 'Trade Show',       ratioClass: 'fw-item--1' },
    { id: 'c1-4', src: '/images/mufti_led_cube_portrait.jpg', label: '3D LED Experience Zone',        cat: 'Brand Activation', ratioClass: 'fw-item--1' },
    { id: 'c1-5', src: '/images/dr_rashel_charcoal_zone.png', label: 'Dr. Rashel Charcoal Gaming & Skincare',  cat: 'Brand Activation', ratioClass: 'fw-item--2' },
    { id: 'c1-6', src: '/images/dr_rashel_3d_concept.png',    label: 'Dr. Rashel Multi-Zone 3D Concept Model', cat: '3D Render',        ratioClass: 'fw-item--3' },
  ],
  // Column 2
  [
    { id: 'c1-3', src: '/images/vijay_mamra_stall.png',       label: 'Vijay Mamra Food Expo Stall',            cat: 'Exhibition',       ratioClass: 'fw-item--3' },
    { id: 'c2-2', src: '/images/dr_rashel_detan_booth.png',   label: 'Dr. Rashel De-Tan Scrub Beach Pavilion', cat: 'Brand Activation', ratioClass: 'fw-item--2' },
    { id: 'c2-3', src: '/images/hello_watch_stall.jpeg',      label: 'Hello EDC Luxury Watch Booth',           cat: 'Exhibition',       ratioClass: 'fw-item--3' },
    { id: 'c2-4', src: '/images/dr_rashel_glow_up_arcade.png',label: 'Dr. Rashel Glow Up Arcade Grand Arch',   cat: 'Brand Activation', ratioClass: 'fw-item--1' },
    { id: 'c2-5', src: '/images/lacoste_stall.png',           label: 'Lacoste Sportswear Booth',               cat: 'Trade Show',       ratioClass: 'fw-item--2' },
    { id: 'c2-6', src: '/images/dr_rashel_pavilion_interior.png', label: 'Dr. Rashel Pavilion Walkthrough',   cat: 'Stage & Events',   ratioClass: 'fw-item--3' },
  ],
  // Column 3
  [
    { id: 'c3-1', src: '/images/dr_rashel_rumi_glow.png',     label: 'Dr. Rashel Rumi’s Glow Club Display',    cat: 'Brand Activation', ratioClass: 'fw-item--1' },
    { id: 'c3-2', src: '/images/flexiworld_stall.png',        label: 'Flexiworld Tech Pavilion',               cat: 'Corporate Event',  ratioClass: 'fw-item--2' },
    { id: 'c3-3', src: '/images/dr_rashel_stage.jpeg',         label: 'Dr. Rashel Beauty Elixirs Stage',        cat: 'Stage & Events',   ratioClass: 'fw-item--3' },
    { id: 'c3-4', src: '/images/dr_rashel_kderma_glow.png',   label: 'Dr. Rashel K-Derma Flawless Glow Zone',  cat: 'Experience Zone',  ratioClass: 'fw-item--1' },
    { id: 'c3-5', src: '/images/dr_rashel_detan_beach_zone.png',label: 'Dr. Rashel Sun & Beach Beauty Exhibit',cat: 'Experience Zone',  ratioClass: 'fw-item--2' },
    { id: 'c3-6', src: '/images/house_of_cavalli_stall.png',  label: 'House of Cavalli Luxury Exhibit',         cat: 'Experience Zone',  ratioClass: 'fw-item--3' },
  ]
]

function getVariants(colIndex, itemIndex) {
  const fromTop = (colIndex + itemIndex) % 2 === 0
  return {
    hidden: { opacity: 0, y: fromTop ? -20 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: Math.min((colIndex * 2 + itemIndex) * 0.04, 0.25),
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

      {/* ── Masonry Columns Container ── */}
      <div className="fw-grid-columns">
        {columnsData.map((column, colIdx) => (
          <div key={`col-${colIdx}`} className="fw-column">
            {column.map((work, itemIdx) => (
              <motion.div
                key={work.id}
                className={`fw-item ${work.ratioClass}`}
                variants={getVariants(colIdx, itemIdx)}
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
        ))}
      </div>
    </section>
  )
}
