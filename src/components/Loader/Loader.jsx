import React from 'react'
import { motion } from 'framer-motion'
import './Loader.css'

function Loader() {
  return (
    <motion.div 
      className="loader-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="loader-content">
        
        {/* Brand logo container */}
        <div className="loader-logo">
          <span className="loader-logo-big-e">E</span>
          <div className="loader-logo-rows">
            <div className="loader-logo-row-top">LITE</div>
            <div className="loader-logo-row-bottom">
              <svg className="loader-logo-v-arrow" viewBox="0 0 24 30" fill="none" stroke="#eab308" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 2 6 L 10 24 L 20 6" />
                <path d="M 13 6 L 20 6 L 20 13" />
              </svg>
              ENTURE
            </div>
          </div>
        </div>

        {/* Brand Tagline */}
        <div className="loader-tagline">
          Crafting <span className="gold-italic">Extraordinary</span> Experiences
        </div>

        {/* Loading progress bar */}
        <div className="loader-bar-outer">
          <motion.div 
            className="loader-bar-inner"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
          />
        </div>

      </div>
    </motion.div>
  )
}

export default Loader
