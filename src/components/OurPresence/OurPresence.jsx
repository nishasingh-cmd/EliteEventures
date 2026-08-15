import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './OurPresence.css'

const hubList = [
  {
    id: 'mumbai',
    num: '01',
    name: 'Mumbai',
    img: '/images/dr_rashel.jpeg',
  },
  {
    id: 'delhi',
    num: '02',
    name: 'Delhi NCR',
    img: '/images/deal_jeans_stall.png',
  },
  {
    id: 'bengaluru',
    num: '03',
    name: 'Bengaluru',
    img: '/images/flexiworld_stall.png',
  },
  {
    id: 'ahmedabad',
    num: '04',
    name: 'Ahmedabad',
    img: '/images/vijay_mamra_stall.png',
  },
  {
    id: 'hyderabad',
    num: '05',
    name: 'Hyderabad',
    img: '/images/dr_rashel_detan_booth.png',
  },
  {
    id: 'kolkata',
    num: '06',
    name: 'Kolkata',
    img: '/images/house_of_cavalli_stall.png',
  },
  {
    id: 'chennai',
    num: '07',
    name: 'Chennai',
    img: '/images/lacoste_stall.png',
  },
]

export default function OurPresence() {
  // Default opened location is Mumbai (index 0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef(null)

  // Smooth auto-slide every 4 seconds, pauses on hover
  useEffect(() => {
    if (isPaused) return
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % hubList.length)
    }, 4000)

    return () => clearInterval(timerRef.current)
  }, [isPaused])

  return (
    <section className="hub-presence-section" id="our-presence">
      {/* Ambient background glows */}
      <div className="hub-glow-orb hub-glow-top" />
      <div className="hub-glow-orb hub-glow-bottom" />
      
      {/* Background Starry Mesh */}
      <div className="hub-mesh-grid" />

      <div className="hub-presence-container">
        
        {/* ── HEADER ── */}
        <div className="hub-header">
          <motion.h2 
            className="hub-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Warehouses Across India. <span className="hub-title-gold">Execution Without Limits.</span>
          </motion.h2>

          <motion.p 
            className="hub-subtitle"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            7 strategic warehouse depots & fabrication workshops powering rapid 24/7 on-ground deployment.
          </motion.p>
        </div>

        {/* ── CINEMATIC EXPANDING INTERACTIVE SHOWCASE ── */}
        <div 
          className="hub-showcase-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* ── NAVIGATION CONTROLS & CITY SELECTOR (ON TOP) ── */}
          <div className="hub-nav-strip">
            <div className="hub-dots-wrap">
              {hubList.map((hub, idx) => (
                <button
                  key={hub.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`hub-dot-btn ${activeIndex === idx ? 'active' : ''}`}
                  aria-label={`Select ${hub.name}`}
                >
                  <span className="dot-text">{hub.name}</span>
                </button>
              ))}
            </div>

            <div className="hub-arrows-wrap">
              <button 
                className="hub-arrow-btn"
                onClick={() => setActiveIndex((prev) => (prev === 0 ? hubList.length - 1 : prev - 1))}
                aria-label="Previous Hub"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button 
                className="hub-arrow-btn"
                onClick={() => setActiveIndex((prev) => (prev + 1) % hubList.length)}
                aria-label="Next Hub"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="hub-cards-deck">
            {hubList.map((hub, idx) => {
              const isActive = activeIndex === idx

              return (
                <motion.div
                  key={hub.id}
                  className={`hub-exp-card ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                  layout
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                >
                  {/* Background Stall Imagery */}
                  <div 
                    className="hub-card-bg"
                    style={{ backgroundImage: `url(${hub.img})` }}
                  />
                  <div className="hub-card-overlay" />
                  <div className="hub-card-border-glow" />

                  {/* Collapsed State (Vertical City Label) */}
                  {!isActive && (
                    <div className="hub-collapsed-content">
                      <div className="hub-collapsed-num">{hub.num}</div>
                      <div className="hub-collapsed-name">{hub.name}</div>
                      <div className="hub-collapsed-dot" />
                    </div>
                  )}

                  {/* Expanded Active State: ONLY the clean prominent City Name */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        className="hub-expanded-content"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, delay: 0.1 }}
                      >
                        <div className="hub-active-city-wrap">
                          <h3 className="hub-city-heading">{hub.name}</h3>
                        </div>

                        {/* Subtle bottom progress bar */}
                        <div className="hub-progress-line">
                          <motion.div 
                            className="hub-progress-bar-fill"
                            initial={{ width: '0%' }}
                            animate={{ width: isPaused ? '100%' : '100%' }}
                            transition={{ duration: 4.0, ease: 'linear' }}
                            key={activeIndex}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
