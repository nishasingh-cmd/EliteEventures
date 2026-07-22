import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './WhyChooseSection.css'

/* ── PROJECT CARDS data ── */
const projects = [
  {
    id: 1,
    brand: 'Dr. Rashel',
    img: '/images/stall4.png',
    caption: 'Designed a premium beauty exhibition stall that showcased luxury skincare products through immersive customer experience.',
    tag: 'Beauty & Skincare',
  },
  {
    id: 2,
    brand: 'Vijay Mamra',
    img: '/images/stall5.png',
    caption: 'Executed a sophisticated corporate event setup with seamless planning, premium stage design, and flawless event management.',
    tag: 'Corporate Event',
  },
  {
    id: 3,
    brand: 'Baker Hughes',
    img: '/images/stall1.png',
    caption: 'Delivered a world-class exhibition experience that reflected innovation, engineering excellence, and strong global brand identity.',
    tag: 'Energy & Tech',
  },
]

/* ── REVIEWS data ── */
const reviews = [
  {
    id: 1,
    name: 'Rohan Mehta',
    role: 'Marketing Head, Baker Hughes India',
    text: 'Elite Eventure delivered an exceptional exhibition stall that perfectly embodied our brand values. The attention to detail and flawless execution truly set them apart.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Brand Manager, MUFTI',
    text: 'Working with Elite Eventure was a fantastic experience. They transformed our vision into a stunning, immersive brand space that resonated with every visitor.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Arjun Nair',
    role: 'Sales Director, Walkaroo',
    text: 'The booth they created for us generated incredible footfall and engagement. Their team is professional, creative, and always on time. Highly recommended!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Sneha Kapoor',
    role: 'CEO, Dr. Rashel India',
    text: 'A premium, elegant execution that captured our brand essence beautifully. Our stall was consistently the most visited at the expo. Truly world-class work.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Vikram Rao',
    role: 'Event Head, Hello EDC',
    text: 'Elite Eventure handled everything end-to-end with zero hassle. From design to on-ground execution, they made the entire event a memorable success.',
    rating: 5,
  },
]

function StarRating({ count = 5 }) {
  return (
    <div className="review-stars">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="star-icon" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

/* Google G icon */
function GoogleIcon() {
  return (
    <svg className="google-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.7 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.7 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.4 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.3C9.7 35.6 16.3 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.5l6.2 5.2C41.1 35.3 44 30 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  )
}

function ProjectCard({ project, index }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <div className="project-card-img-wrap">
        <img
          src={project.img}
          alt={project.brand}
          className={`project-card-img ${loaded ? 'loaded' : 'loading'}`}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
        <div className="project-card-img-overlay" />
        <span className="project-tag">{project.tag}</span>
      </div>
      <div className="project-card-body">
        <h3 className="project-brand">{project.brand}</h3>
        <p className="project-caption">{project.caption}</p>
      </div>
    </motion.div>
  )
}

function WhyChooseSection({ hideReviews = false }) {
  const [activeReview, setActiveReview] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(2)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerView(1)
      } else if (window.innerWidth <= 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(2)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const prevReview = () => {
    setActiveReview((prev) => (prev === 0 ? reviews.length - itemsPerView : prev - 1))
  }
  const nextReview = () => {
    setActiveReview((prev) => (prev >= reviews.length - itemsPerView ? 0 : prev + 1))
  }

  return (
    <section className="why-section" id="why-us" style={hideReviews ? { paddingBottom: '20px' } : {}}>
      <div className="why-bg-glow" />

      <div className="why-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <motion.h2
          className="why-headline"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          Why Choose <span className="why-gold">Elite Eventure?</span>
        </motion.h2>
        <motion.p
          className="why-subtext"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          Trusted by leading brands to design and execute premium exhibition stalls, immersive
          brand activations, and unforgettable event experiences.
        </motion.p>
      </div>

      {/* ── PROJECT CARDS ── */}
      <div className="project-grid" style={hideReviews ? { marginBottom: 0 } : {}}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      {/* ── REVIEWS WITH FADE ── */}
      {!hideReviews && (
        <motion.div
          className="reviews-block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >

          {/* Review carousel */}
          <div className="reviews-carousel">
            <button className="carousel-btn carousel-btn--prev" onClick={prevReview} aria-label="Previous review">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="reviews-track">
              <motion.div
                className="reviews-slider"
                animate={{
                  x: `calc(-${activeReview * (100 / itemsPerView)}% - ${activeReview * (24 / itemsPerView)}px)`,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'flex',
                  gap: '24px',
                  width: '100%',
                }}
              >
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="review-card"
                    style={{
                      flex: `0 0 calc((100% - ${(itemsPerView - 1) * 24}px) / ${itemsPerView})`,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <span className="review-quote-bg">"</span>
                    <div className="review-card-top" style={{ position: 'relative', zIndex: 1 }}>
                      <GoogleIcon />
                      <StarRating count={r.rating} />
                    </div>
                    <p className="review-text" style={{ position: 'relative', zIndex: 1 }}>"{r.text}"</p>
                    <div className="review-author" style={{ position: 'relative', zIndex: 1 }}>
                      <div className="review-avatar">{r.name[0]}</div>
                      <div>
                        <p className="review-name">{r.name}</p>
                        <p className="review-role">{r.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <button className="carousel-btn carousel-btn--next" onClick={nextReview} aria-label="Next review">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* View More Reviews */}
          <motion.a
            href="https://www.google.com/maps/search/Elite+Eventure"
            target="_blank"
            rel="noopener noreferrer"
            className="reviews-cta"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            View More Reviews
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cta-arrow">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.a>
        </motion.div>
      )}
    </section>
  )
}

export default WhyChooseSection
