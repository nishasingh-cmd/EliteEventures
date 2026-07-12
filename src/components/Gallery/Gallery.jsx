import React, { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import './Gallery.css'

// Gallery items — 9 images split across 3 rows
const row1Images = [
  { id: 1, src: '/images/g1.png', label: 'Exhibition Stall' },
  { id: 2, src: '/images/g2.png', label: 'Brand Activation' },
  { id: 3, src: '/images/g3.png', label: 'Corporate Gala' },
  { id: 4, src: '/images/g1.png', label: 'Exhibition Stall' },  // duplicated for seamless loop
  { id: 5, src: '/images/g2.png', label: 'Brand Activation' },
  { id: 6, src: '/images/g3.png', label: 'Corporate Gala' },
]

const row2Images = [
  { id: 7, src: '/images/g4.png', label: 'Product Launch' },
  { id: 8, src: '/images/g5.png', label: 'Experience Zone' },
  { id: 9, src: '/images/g6.png', label: 'Festival Install' },
  { id: 10, src: '/images/g4.png', label: 'Product Launch' },  // duplicated for seamless loop
  { id: 11, src: '/images/g5.png', label: 'Experience Zone' },
  { id: 12, src: '/images/g6.png', label: 'Festival Install' },
]

const row3Images = [
  { id: 13, src: '/images/g7.png', label: 'Trade Show' },
  { id: 14, src: '/images/g8.png', label: 'Promo Booth' },
  { id: 15, src: '/images/g9.png', label: 'Conference' },
  { id: 16, src: '/images/g7.png', label: 'Trade Show' },  // duplicated for seamless loop
  { id: 17, src: '/images/g8.png', label: 'Promo Booth' },
  { id: 18, src: '/images/g9.png', label: 'Conference' },
]

function GalleryCard({ image }) {
  return (
    <div className="gallery-card">
      <div className="gallery-card-inner">
        <img src={image.src} alt={image.label} className="gallery-card-img" loading="lazy" />
        <div className="gallery-card-overlay">
          <span className="gallery-card-label">{image.label}</span>
        </div>
      </div>
    </div>
  )
}

function GalleryRow({ images, direction = 'left', speed = 40 }) {
  const trackRef = useRef(null)
  const containerRef = useRef(null)
  const isPaused = useRef(false)
  const posRef = useRef(0)
  const animRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let lastTime = null
    const px_per_sec = speed  // pixels per second

    function step(ts) {
      if (!lastTime) lastTime = ts
      const dt = (ts - lastTime) / 1000  // seconds
      lastTime = ts

      if (!isPaused.current) {
        if (direction === 'left') {
          posRef.current -= px_per_sec * dt
        } else {
          posRef.current += px_per_sec * dt
        }
      }

      const half = track.scrollWidth / 2

      // Reset seamlessly
      if (direction === 'left' && Math.abs(posRef.current) >= half) {
        posRef.current = 0
      }
      if (direction === 'right' && posRef.current >= 0) {
        posRef.current = -half
      }

      track.style.transform = `translateX(${posRef.current}px)`
      animRef.current = requestAnimationFrame(step)
    }

    // init right-direction offset
    if (direction === 'right') {
      posRef.current = -(trackRef.current.scrollWidth / 2)
    }

    animRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animRef.current)
  }, [direction, speed])

  const handleMouseEnter = () => { isPaused.current = true }
  const handleMouseLeave = () => { isPaused.current = false }

  return (
    <div
      className="gallery-row-container"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="gallery-row-track" ref={trackRef}>
        {images.map((img) => (
          <GalleryCard key={img.id} image={img} />
        ))}
      </div>
    </div>
  )
}

function Gallery() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) controls.start('visible')
  }, [isInView, controls])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section className="gallery-section" id="gallery" ref={sectionRef}>
      {/* Ambient background glow */}
      <div className="gallery-bg-glow" />

      <motion.div
        className="gallery-header"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Left — single-line headline */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span className="section-mini-label">PORTFOLIO</span>
          <motion.h2 className="gallery-headline" variants={itemVariants}>
            Moments We've <span className="gallery-headline-gold">Crafted</span>
          </motion.h2>
        </div>

        {/* Right — paragraph */}
        <motion.p className="gallery-subtext" variants={itemVariants}>
          A glimpse into our portfolio of exhibitions, brand activations,
          corporate events, and experience zones — where every detail is intentional.
        </motion.p>
      </motion.div>

      {/* Rows */}
      <motion.div
        className="gallery-rows"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <GalleryRow images={row1Images} direction="left" speed={38} />
        <GalleryRow images={row2Images} direction="right" speed={32} />
        <GalleryRow images={row3Images} direction="left" speed={42} />
      </motion.div>

      {/* Bottom fade mask handled via CSS */}
    </section>
  )
}

export default Gallery
