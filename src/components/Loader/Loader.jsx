import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Loader.css'

function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1200 // 1.2s total loader time
    const interval = 15
    const step = 100 / (duration / interval)

    const timer = setInterval(() => {
      start += step
      if (start >= 100) {
        setProgress(100)
        clearInterval(timer)
      } else {
        setProgress(Math.floor(start))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div 
      className="loader-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="loader-content">
        
        {/* Animated logo symbol with circle and letter E */}
        <div className="loader-circle-wrap">
          <svg className="loader-circle-svg" viewBox="0 0 100 100">
            {/* Animating outer ring path with a gap */}
            <motion.path
              d="M 80 50 A 30 30 0 1 1 80 49.9"
              stroke="#D4AF37"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, rotate: -90 }}
              animate={{ pathLength: 0.85, rotate: 270 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            {/* Animating Letter E inside */}
            <motion.path
              d="M 40 37 H 60 M 40 50 H 55 M 40 63 H 60 M 40 37 V 63"
              stroke="#D4AF37"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.0, delay: 0.2, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Brand Text styled like screenshot */}
        <div className="loader-brand-title">
          ELITE EVENTURE
        </div>

        {/* Grow Line and Percent wrapper */}
        <div className="loader-divider-container">
          <div className="loader-divider-line" style={{ width: `${progress}%` }} />
        </div>

        <div className="loader-percent-text">
          {progress}%
        </div>

      </div>
    </motion.div>
  )
}

export default Loader
