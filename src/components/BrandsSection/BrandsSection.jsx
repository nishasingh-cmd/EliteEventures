import React, { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import './BrandsSection.css'

// Brand logos pointing to real downloaded logo files in public/images
const brands = [
  {
    id: 1,
    name: 'Dr. Rashel',
    logo: <img src="/images/logo1.png" alt="Dr. Rashel" loading="lazy" />,
  },
  {
    id: 2,
    name: 'Walkaroo',
    logo: <img src="/images/logo2.png" alt="Walkaroo" loading="lazy" />,
  },
  {
    id: 3,
    name: 'Baker Hughes',
    logo: <img src="/images/logo3.png" alt="Baker Hughes" loading="lazy" />,
  },
  {
    id: 4,
    name: 'Mufti',
    logo: <img src="/images/logo4.png" alt="Mufti" loading="lazy" />,
  },
  {
    id: 5,
    name: 'ATC Chains India',
    logo: <img src="/images/logo5.png" alt="ATC Chains India" loading="lazy" />,
  },
  {
    id: 6,
    name: 'Hello EDC',
    logo: <img src="/images/logo6.png" alt="Hello EDC" loading="lazy" />,
  },
  {
    id: 7,
    name: 'Flexiworld',
    logo: <img src="/images/logo7.png" alt="Flexiworld" loading="lazy" />,
  },
  {
    id: 8,
    name: 'Vijay Mallya',
    logo: <img src="/images/logo8.png" alt="Vijay Mallya" loading="lazy" />,
  },
]

// Duplicate list for seamless loop
const duplicatedBrands = [...brands, ...brands]

function BrandCard({ brand }) {
  return (
    <div className="brand-card">
      <div className="brand-logo">{brand.logo}</div>
    </div>
  )
}

function BrandsMarquee({ items, speed = 38 }) {
  const trackRef = useRef(null)
  const isPaused = useRef(false)
  const posRef = useRef(0)
  const animRef = useRef(null)
  let lastTime = null

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    function step(ts) {
      if (!lastTime) lastTime = ts
      const dt = (ts - lastTime) / 1000
      lastTime = ts

      if (!isPaused.current) {
        posRef.current -= speed * dt
        const half = track.scrollWidth / 2
        if (Math.abs(posRef.current) >= half) posRef.current = 0
      }

      track.style.transform = `translateX(${posRef.current}px)`
      animRef.current = requestAnimationFrame(step)
    }

    animRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animRef.current)
  }, [speed])

  return (
    <div
      className="brands-marquee-container"
      onMouseEnter={() => { isPaused.current = true }}
      onMouseLeave={() => { isPaused.current = false }}
    >
      <div className="brands-track" ref={trackRef}>
        {items.map((brand, i) => (
          <BrandCard key={`${brand.id}-${i}`} brand={brand} />
        ))}
      </div>
    </div>
  )
}

function BrandsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) controls.start('visible')
  }, [isInView, controls])

  const headingVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="brands-section" id="clients" ref={sectionRef}>
      <div className="brands-bg-glow" />

      {/* Heading */}
      <motion.div
        className="brands-header"
        initial="hidden"
        animate={controls}
        variants={headingVariants}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
      >
        <span className="section-mini-label">OUR PARTNERS</span>
        <motion.h2 className="brands-headline" variants={itemVariants}>
          Brands We've <span className="brands-gold">Worked With</span>
        </motion.h2>
      </motion.div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.5 }}
      >
        <BrandsMarquee items={duplicatedBrands} speed={38} />
      </motion.div>
    </section>
  )
}

export default BrandsSection
