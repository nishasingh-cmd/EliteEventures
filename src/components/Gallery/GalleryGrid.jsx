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
    title: 'Dr. Rachel',
    subtitle: 'FLIPKART GLAMOUR FEST',
    category: 'Exhibition',
    image: '/images/dr_rashel.jpeg',
    aspectRatio: '4 / 5',
  },
  {
    id: 2,
    title: 'Sunburn',
    subtitle: 'GOA MUSIC FEST',
    category: 'Activation',
    image: '/images/g1.png',
    aspectRatio: '1 / 1.1',
  },
  {
    id: 3,
    title: 'Nykaa',
    subtitle: 'BEAUTY BASH',
    category: 'Exhibition',
    image: '/images/pepe_jeans_stall.png',
    aspectRatio: '16 / 10',
  },
  {
    id: 4,
    title: 'Vega',
    subtitle: 'LAKMÉ FASHION WEEK',
    category: 'Exhibition',
    image: '/images/portrait_1.jpeg',
    aspectRatio: '16 / 10',
  },
  {
    id: 5,
    title: 'Boiler Room',
    subtitle: 'BANGALORE SESSIONS',
    category: 'Activation',
    image: '/images/g3.png',
    aspectRatio: '16 / 10',
  },
  {
    id: 6,
    title: 'TechExpo',
    subtitle: 'DELHI 2025',
    category: 'MICE',
    image: '/images/flexiworld_stall.png',
    aspectRatio: '1 / 1',
  },
  {
    id: 7,
    title: 'Lolla India',
    subtitle: 'MUMBAI 2025',
    category: 'Activation',
    image: '/images/g2.png',
    aspectRatio: '16 / 10',
  },
  {
    id: 8,
    title: 'Nova Tech',
    subtitle: 'INDIAJOY EXPO',
    category: 'MICE',
    image: '/images/smarr_realty_stall.png',
    aspectRatio: '4 / 5',
  },
  {
    id: 9,
    title: 'Puma',
    subtitle: 'STREETWEAR POPUP',
    category: 'Activation',
    image: '/images/deal_jeans_stall.png',
    aspectRatio: '1 / 1',
  },
  {
    id: 10,
    title: 'House of Cavalli',
    subtitle: 'LUXURY EXHIBIT',
    category: 'Exhibition',
    image: '/images/house_of_cavalli_stall.png',
    aspectRatio: '4 / 5',
  },
  {
    id: 11,
    title: 'Lacoste',
    subtitle: 'SPORTSWEAR BOOTH',
    category: 'MICE',
    image: '/images/lacoste_stall.png',
    aspectRatio: '16 / 10',
  },
  {
    id: 12,
    title: 'Vijay Mamra',
    subtitle: 'FOOD EXPO 2025',
    category: 'Exhibition',
    image: '/images/vijay_mamra_stall.png',
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
