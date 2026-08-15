import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './GalleryGrid.css'

const CATEGORIES = ['All', 'Exhibition', 'MICE', 'Activation']

/* Alternating entrance direction vectors */
const ENTRANCE_DIRECTIONS = [
  { x: -120, y: 0 },    // 1: Left
  { x: 0, y: -120 },    // 2: Top
  { x: 120, y: 0 },     // 3: Right
  { x: 0, y: 120 },     // 4: Bottom
  { x: -100, y: -100 }, // 5: Top-Left
  { x: 100, y: 100 },   // 6: Bottom-Right
  { x: 100, y: -100 },  // 7: Top-Right
  { x: -100, y: 100 },  // 8: Bottom-Left
]

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Pepe Jeans London',
    subtitle: 'FASHION BOOTH',
    category: 'Activation',
    image: '/images/pepe_jeans_stall.png',
    aspectRatio: '4 / 5',
  },
  {
    id: 2,
    title: 'Deal Jeans',
    subtitle: 'TRADE SHOW STAND',
    category: 'Exhibition',
    image: '/images/deal_jeans_stall.png',
    aspectRatio: '4 / 5',
  },
  {
    id: 3,
    title: 'Dr. Rashel',
    subtitle: 'SKINCARE PAVILION',
    category: 'Exhibition',
    image: '/images/dr_rashel.jpeg',
    aspectRatio: '16 / 10',
  },
  {
    id: 4,
    title: 'House of Cavalli',
    subtitle: 'LUXURY EXHIBIT',
    category: 'Exhibition',
    image: '/images/house_of_cavalli_stall.png',
    aspectRatio: '1 / 1',
  },
  {
    id: 5,
    title: 'Vijay Mamra',
    subtitle: 'FOOD EXPO STALL',
    category: 'Exhibition',
    image: '/images/vijay_mamra_stall.png',
    aspectRatio: '1 / 1',
  },
  {
    id: 6,
    title: 'Flexiworld',
    subtitle: 'TECH PAVILION',
    category: 'MICE',
    image: '/images/flexiworld_stall.png',
    aspectRatio: '16 / 10',
  },
  {
    id: 7,
    title: 'Hello EDC',
    subtitle: 'LUXURY WATCH BOOTH',
    category: 'Exhibition',
    image: '/images/hello_watch_stall.jpeg',
    aspectRatio: '1 / 1',
  },
  {
    id: 8,
    title: 'Smarr Realty',
    subtitle: 'ARCHITECTURAL EXPO',
    category: 'Exhibition',
    image: '/images/smarr_realty_stall.png',
    aspectRatio: '4 / 5',
  },
  {
    id: 9,
    title: 'Dr. Rashel Rumi’s Glow Club',
    subtitle: 'INTERACTIVE DISPLAY',
    category: 'Activation',
    image: '/images/dr_rashel_rumi_glow.png',
    aspectRatio: '4 / 5',
  },
  {
    id: 10,
    title: 'Dr. Rashel Stage',
    subtitle: 'BEAUTY ELIXIRS LAUNCH',
    category: 'MICE',
    image: '/images/dr_rashel_stage.jpeg',
    aspectRatio: '1 / 1',
  },
  {
    id: 11,
    title: 'Dr. Rashel Glow Up Arcade',
    subtitle: 'GRAND ENTRANCE ARCH',
    category: 'Activation',
    image: '/images/dr_rashel_glow_up_arcade.png',
    aspectRatio: '4 / 5',
  },
  {
    id: 12,
    title: 'Dr. Rashel De-Tan Scrub',
    subtitle: 'BEACH THEME PAVILION',
    category: 'Activation',
    image: '/images/dr_rashel_detan_booth.png',
    aspectRatio: '16 / 10',
  },
  {
    id: 13,
    title: 'Dr. Rashel K-Derma',
    subtitle: 'FLAWLESS GLOW ZONE',
    category: 'Activation',
    image: '/images/dr_rashel_kderma_glow.png',
    aspectRatio: '4 / 5',
  },
  {
    id: 14,
    title: 'Dr. Rashel Charcoal Zone',
    subtitle: 'GAMING & SKINCARE BOOTH',
    category: 'Activation',
    image: '/images/dr_rashel_charcoal_zone.png',
    aspectRatio: '16 / 10',
  },
  {
    id: 15,
    title: 'Lacoste',
    subtitle: 'SPORTSWEAR BOOTH',
    category: 'Exhibition',
    image: '/images/lacoste_stall.png',
    aspectRatio: '16 / 10',
  },
  {
    id: 16,
    title: 'Dr. Rashel Sun & Beach',
    subtitle: 'BEAUTY EXHIBIT',
    category: 'Activation',
    image: '/images/dr_rashel_detan_beach_zone.png',
    aspectRatio: '16 / 10',
  },
  {
    id: 17,
    title: 'Dr. Rashel Pavilion Walkthrough',
    subtitle: 'PAVILION INTERIOR',
    category: 'MICE',
    image: '/images/dr_rashel_pavilion_interior.png',
    aspectRatio: '1 / 1',
  },
  {
    id: 18,
    title: 'Dr. Rashel 3D Concept',
    subtitle: 'EXHIBITION PAVILION MODEL',
    category: 'Exhibition',
    image: '/images/dr_rashel_3d_concept.png',
    aspectRatio: '1 / 1',
  },
]

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory)

  return (
    <section className="gg-section">
      {/* Background Diamond Pattern Overlay */}
      <div className="gg-pattern-overlay" />
      <div className="gg-ambient-glow" />

      <div className="gg-container">
        {/* Top Filter Category Pills */}
        <div className="gg-filter-bar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`gg-filter-btn ${isActive ? 'active' : ''}`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Staggered Masonry Grid */}
        <motion.div className="gg-masonry-grid" layout>
          <AnimatePresence>
            {filteredItems.map((item, idx) => {
              const dir = ENTRANCE_DIRECTIONS[idx % ENTRANCE_DIRECTIONS.length]
              return (
                <motion.div
                  key={item.id}
                  className="gg-card"
                  style={{ aspectRatio: item.aspectRatio }}
                  layout
                  initial={{
                    opacity: 0,
                    scale: 0.92,
                    x: dir.x,
                    y: dir.y,
                    filter: 'blur(6px)',
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    y: 0,
                    filter: 'blur(0px)',
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 1.0,
                    delay: idx * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                    transition: { duration: 0.35, ease: 'easeOut' },
                  }}
                >
                  <div className="gg-card-inner">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="gg-card-img"
                      loading="lazy"
                    />
                    <div className="gg-card-overlay">
                      <span className="gg-card-subtitle">{item.subtitle}</span>
                      <h3 className="gg-card-title">{item.title}</h3>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
