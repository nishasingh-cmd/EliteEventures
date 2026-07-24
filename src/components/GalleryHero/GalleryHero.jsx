import React from 'react'
import { motion } from 'framer-motion'
import './GalleryHero.css'

export default function GalleryHero() {
  return (
    <section className="gallery-hero">
      <img
        src="/images/contact-hero-bg.png"
        alt="Elite Eventure Gallery"
        className="gallery-hero-img"
      />
      <div className="gallery-hero-overlay" />
      <div className="gallery-hero-line" />

      <motion.div
        className="gallery-hero-content"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="gallery-hero-heading">
          Our <span className="gallery-hero-gold">Gallery</span>
        </h1>
        <p className="gallery-hero-sub">
          Explore our portfolio of premium exhibition stalls, brand activations, and exceptional corporate events.
        </p>
      </motion.div>
    </section>
  )
}
