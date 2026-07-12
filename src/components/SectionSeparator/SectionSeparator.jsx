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
      <div className="separator-line-wrap">
        <div className="separator-diamond-node" />
      </div>
    </motion.div>
  )
}

export default SectionSeparator
