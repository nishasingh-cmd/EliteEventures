import React, { useRef, useState, useEffect, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import "./GalleryShowcase.css"
import "../FeaturedWorks/FeaturedWorks.css"

/* ── 3 Column Distribution: Real brand installations strictly on TOP, Renders at BOTTOM (Zero repeats) ──── */
const columnsData = [
  // Column 1
  [
    { id: 'c1-vn-tech', src: '/images/vn_technology_stall.png', label: 'V. N. Technology Exhibition Stall', cat: 'Exhibition Stall', ratioClass: 'fw-item--16-9' },
    { id: 'c1-1', src: '/images/pepe_jeans_stall.png', label: 'Pepe Jeans London Fashion Booth', cat: 'Brand Activation', ratioClass: 'fw-item--1' },
    { id: 'c1-morix-vista', src: '/images/morix_stall_corner_vista.png', label: 'MORIX Interactive Totem & Exhibit Zone', cat: 'Exhibition Stall', ratioClass: 'fw-item--16-9' },
    { id: 'c1-stall-new', src: '/images/dr_rashel_beauty_elixirs.png', label: 'Dr. Rashel Beauty Elixirs', cat: 'Brand Activation', ratioClass: 'fw-item--16-9' },
    { id: 'c1-2', src: '/images/dr_rashel.jpeg', label: 'Dr. Rashel Skincare Pavilion', cat: 'Brand Activation', ratioClass: 'fw-item--2' },
    { id: 'c2-1', src: '/images/deal_jeans_stall.png', label: 'Deal Jeans Trade Show Stand', cat: 'Trade Show', ratioClass: 'fw-item--1' },
    { id: 'c1-4', src: '/images/mufti_led_cube_portrait.jpg', label: '3D LED Experience Zone', cat: 'Brand Activation', ratioClass: 'fw-item--1' },
    { id: 'c1-5', src: '/images/dr_rashel_charcoal_zone.png', label: 'Dr. Rashel Charcoal Gaming & Skincare', cat: 'Brand Activation', ratioClass: 'fw-item--2' },
    { id: 'c1-6', src: '/images/dr_rashel_3d_concept.png', label: 'Dr. Rashel Multi-Zone 3D Concept Model', cat: '3D Render', ratioClass: 'fw-item--3' },
  ],
  // Column 2
  [
    { id: 'c2-morix-front', src: '/images/morix_stall_front.png', label: 'MORIX Motion Meets Innovation Stall', cat: 'Exhibition Stall', ratioClass: 'fw-item--16-9' },
    { id: 'c1-3', src: '/images/vijay_mamra_stall.png', label: 'Vijay Mamra Food Expo Stall', cat: 'Exhibition', ratioClass: 'fw-item--3' },
    { id: 'c2-stall-new', src: '/images/mary_jo_k_cult_makeup.png', label: 'Mary Jo K Cult Makeup', cat: 'Brand Activation', ratioClass: 'fw-item--16-9' },
    { id: 'c2-2', src: '/images/dr_rashel_detan_booth.png', label: 'Dr. Rashel De-Tan Scrub Beach Pavilion', cat: 'Brand Activation', ratioClass: 'fw-item--2' },
    { id: 'c2-3', src: '/images/hello_watch_stall.jpeg', label: 'Hello EDC Luxury Watch Booth', cat: 'Exhibition', ratioClass: 'fw-item--3' },
    { id: 'c2-4', src: '/images/dr_rashel_glow_up_arcade.png', label: 'Dr. Rashel Glow Up Arcade Grand Arch', cat: 'Brand Activation', ratioClass: 'fw-item--1' },
    { id: 'c2-5', src: '/images/lacoste_stall.png', label: 'Lacoste Sportswear Booth', cat: 'Trade Show', ratioClass: 'fw-item--2' },
    { id: 'c2-6', src: '/images/dr_rashel_pavilion_interior.png', label: 'Dr. Rashel Pavilion Walkthrough', cat: 'Stage & Events', ratioClass: 'fw-item--3' },
  ],
  // Column 3
  [
    { id: 'c3-lumora', src: '/images/lumora_advertising_stall.png', label: 'Lumora Advertising Exhibition Stall', cat: 'Exhibition Stall', ratioClass: 'fw-item--16-9' },
    { id: 'c3-1', src: '/images/dr_rashel_rumi_glow.png', label: 'Dr. Rashel Rumi’s Glow Club Display', cat: 'Brand Activation', ratioClass: 'fw-item--1' },
    { id: 'c3-morix-eazee', src: '/images/morix_stall_corner_eazee.png', label: 'MORIX Modern Pavilion & Digital Display', cat: 'Exhibition Stall', ratioClass: 'fw-item--16-9' },
    { id: 'c3-stall-new', src: '/images/sponsor_nail_artistry.png', label: 'Sponsor Nail Artistry', cat: 'Exhibition', ratioClass: 'fw-item--16-9' },
    { id: 'c3-2', src: '/images/flexiworld_stall.png', label: 'Flexiworld Tech Pavilion', cat: 'Corporate Event', ratioClass: 'fw-item--2' },
    { id: 'c3-3', src: '/images/dr_rashel_stage.jpeg', label: 'Dr. Rashel Beauty Elixirs Stage', cat: 'Stage & Events', ratioClass: 'fw-item--3' },
    { id: 'c3-4', src: '/images/dr_rashel_kderma_glow.png', label: 'Dr. Rashel K-Derma Flawless Glow Zone', cat: 'Experience Zone', ratioClass: 'fw-item--1' },
    { id: 'c3-5', src: '/images/dr_rashel_detan_beach_zone.png', label: 'Dr. Rashel Sun & Beach Beauty Exhibit', cat: 'Experience Zone', ratioClass: 'fw-item--2' },
    { id: 'c3-6', src: '/images/house_of_cavalli_stall.png', label: 'House of Cavalli Luxury Exhibit', cat: 'Experience Zone', ratioClass: 'fw-item--3' },
  ]
]

// Flatten all items across columns in row-by-row reading order for seamless prev/next navigation
const allItems = []
const maxColLen = Math.max(...columnsData.map((col) => col.length))
for (let i = 0; i < maxColLen; i++) {
  for (let c = 0; c < columnsData.length; c++) {
    if (columnsData[c][i]) {
      allItems.push(columnsData[c][i])
    }
  }
}

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
  const [activeModalItem, setActiveModalItem] = useState(null)
  const [direction, setDirection] = useState(0)
  const touchStartX = useRef(null)

  const currentIndex = activeModalItem
    ? allItems.findIndex((item) => item.id === activeModalItem.id)
    : -1

  const handlePrev = useCallback(() => {
    if (!activeModalItem) return
    setDirection(-1)
    setActiveModalItem((prev) => {
      const idx = allItems.findIndex((item) => item.id === prev.id)
      const prevIdx = (idx - 1 + allItems.length) % allItems.length
      return allItems[prevIdx]
    })
  }, [activeModalItem])

  const handleNext = useCallback(() => {
    if (!activeModalItem) return
    setDirection(1)
    setActiveModalItem((prev) => {
      const idx = allItems.findIndex((item) => item.id === prev.id)
      const nextIdx = (idx + 1) % allItems.length
      return allItems[nextIdx]
    })
  }, [activeModalItem])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setActiveModalItem(null)
      } else if (e.key === "ArrowLeft") {
        handlePrev()
      } else if (e.key === "ArrowRight") {
        handleNext()
      }
    }
    if (activeModalItem) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
      setTimeout(() => {
        const activeThumb = document.querySelector(".gsc-lb-thumb-item.active")
        if (activeThumb) {
          activeThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
        }
      }, 50)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [activeModalItem, handlePrev, handleNext])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 45) {
      handleNext()
    } else if (diff < -45) {
      handlePrev()
    }
    touchStartX.current = null
  }

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
                whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
                onClick={() => setActiveModalItem(work)}
              >
                <div className="fw-img-wrap">
                  <img
                    src={work.src}
                    alt={`${work.label} - Elite Eventure ${work.cat} Design & Fabrication`}
                    className="fw-img"
                    loading="lazy"
                    decoding="async"
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

      {/* ── Fullscreen Lightbox Modal (Zero crop, 100% full view) ── */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div
            className="gsc-lb-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveModalItem(null)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar with Meta, Counter and Close */}
            <div className="gsc-lb-topbar" onClick={(e) => e.stopPropagation()}>
              <div className="gsc-lb-meta">
                <span className="gsc-lb-category">{activeModalItem.cat}</span>
                <span className="gsc-lb-dot">•</span>
                <span className="gsc-lb-title">{activeModalItem.label}</span>
              </div>
              <div className="gsc-lb-top-right">
                {currentIndex !== -1 && (
                  <div className="gsc-lb-counter">
                    <span>{currentIndex + 1}</span> / {allItems.length}
                  </div>
                )}
                <button
                  className="gsc-lb-close"
                  onClick={() => setActiveModalItem(null)}
                  aria-label="Close Lightbox"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Previous Arrow Button (Slide Left / Previous) */}
            <button
              className="gsc-lb-arrow gsc-lb-arrow--left"
              onClick={(e) => {
                e.stopPropagation()
                handlePrev()
              }}
              aria-label="Previous Image"
              title="Previous (Left Arrow Key)"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Next Arrow Button (Slide Right / Next) */}
            <button
              className="gsc-lb-arrow gsc-lb-arrow--right"
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              aria-label="Next Image"
              title="Next (Right Arrow Key)"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Center Main Stage with Directional Slide Transition */}
            <div className="gsc-lb-stage" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={activeModalItem.id}
                  src={activeModalItem.src}
                  alt={`${activeModalItem.label} - Elite Eventure ${activeModalItem.cat}`}
                  className="gsc-lb-main-img"
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 45 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -45 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  decoding="async"
                />
              </AnimatePresence>
            </div>

            {/* Bottom Scrollable Thumbnail Strip */}
            <div className="gsc-lb-thumbs-container" onClick={(e) => e.stopPropagation()}>
              <div className="gsc-lb-thumbs">
                {allItems.map((item, idx) => (
                  <button
                    key={item.id}
                    className={`gsc-lb-thumb-item ${item.id === activeModalItem.id ? "active" : ""}`}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1)
                      setActiveModalItem(item)
                    }}
                    aria-label={`View ${item.label}`}
                  >
                    <img
                      src={item.src}
                      alt={item.label}
                      className="gsc-lb-thumb-img"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
