import React from 'react'
import { motion } from 'framer-motion'
import './SectionSeparator.css'

function SectionSeparator() {
  return (
    <motion.div
      className="section-separator-container"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      {/* Background glow shadow */}
      <div className="separator-glow-bg" />

      {/* Gold fade gradient line & central diamond element */}
      <div className="separator-line-outer">
        <motion.div 
          className="separator-line-wrap"
          initial={{ width: '0%', opacity: 0 }}
          whileInView={{ width: '100%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="separator-diamond-node" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SectionSeparator
