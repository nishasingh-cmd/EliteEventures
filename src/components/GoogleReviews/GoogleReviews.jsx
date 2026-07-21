import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './GoogleReviews.css'

const googleReviews = [
  { name: 'Sahil Jobanputra', time: '7 months ago', rating: 5, text: 'Had a wonderful experience with the team at Elite Eventure for our recent company event. Navin & team helped a lot' },
  { name: 'Tejal Salian', time: '1 year ago', rating: 5, text: 'It has been a great experience working with Navin and his team. Looking forward to more of these' },
  { name: 'Sameer | Mehta-Mehta |', time: '1 year ago', rating: 5, text: 'Team of Great Organizers professionally executing events without any chances of complaints. Great work, Keep it up' },
  { name: 'sameer halai', time: '1 year ago', rating: 5, text: 'Wonderful services, Excellent Event organiser team. Great Services at reasonable budget', avatar: 'https://ui-avatars.com/api/?name=Sameer+Halai&background=random' },
  { name: 'Mohini Mutal', time: '1 year ago', rating: 5, text: 'Just wanted to thank you guys for your wonderful planning, we have got alot of appreciation for the event from all our teams....', avatar: 'https://ui-avatars.com/api/?name=Mohini+Mutal&background=random' },
  { name: 'vasudha bhat', time: '1 year ago', rating: 5, text: 'Navin and his entire event team is amazing. Right from day 1 they over exceed expectations. The event was well managed without any hassle.', avatar: 'https://ui-avatars.com/api/?name=Vasudha+Bhat&background=random' },
  { name: 'Sony Kapadia', time: '1 year ago', rating: 5, text: 'Amazing coordination and Best Event Management company I have ever come across.. Everything was managed and done...', avatar: 'https://ui-avatars.com/api/?name=Sony+Kapadia&background=random' },
  { name: 'Anurag Borde', time: '1 year ago', rating: 5, text: 'Excellent management, no last minute adjustments or panic situations. Event went on very smoothly. Superb attention to detail in stage decoration, entry passes, food and beverages and DJ.' }
]

function StarRating({ count = 5 }) {
  return (
    <div className="sp-review-stars">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="sp-star-icon" viewBox="0 0 24 24" fill="#FFC107">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <svg className="sp-verified-icon" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#1877F2" />
        <path d="M9.5 15.5l-4-4 1.5-1.5 2.5 2.5 7-7 1.5 1.5-8.5 8.5z" fill="#fff" />
      </svg>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg className="sp-google-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.7 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.7 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.4 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.3C9.7 35.6 16.3 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.5l6.2 5.2C41.1 35.3 44 30 44 24c0-1.3-.1-2.6-.4-3.9z"/>
    </svg>
  )
}

function LocalGuideBadge() {
  return (
    <svg className="sp-local-guide-badge" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#FF5722"/>
      <path d="M12 5.5l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6L12 5.5z" fill="#fff"/>
    </svg>
  )
}

export default function GoogleReviews() {
  const [activeReview, setActiveReview] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setItemsPerView(1)
      else if (window.innerWidth <= 1024) setItemsPerView(2)
      else setItemsPerView(4)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextReview = () => {
    setActiveReview((prev) => (prev >= googleReviews.length - itemsPerView ? 0 : prev + 1))
  }
  const prevReview = () => {
    setActiveReview((prev) => (prev === 0 ? googleReviews.length - itemsPerView : prev - 1))
  }

  return (
    <section className="sp-reviews-section">

      <div className="sp-reviews-carousel-wrapper">
        <button className="sp-carousel-btn sp-carousel-btn-left" onClick={prevReview} aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        
        <div className="sp-reviews-track">
          <motion.div 
            className="sp-reviews-slider"
            animate={{ x: `calc(-${activeReview * (100 / itemsPerView)}% - ${activeReview * (20 / itemsPerView)}px)` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {googleReviews.map((r, i) => (
              <motion.div 
                className="sp-review-card" 
                key={i} 
                style={{ flex: `0 0 calc((100% - ${(itemsPerView - 1) * 20}px) / ${itemsPerView})` }}
                whileHover={{ scale: 1.03, y: -4, borderColor: 'rgba(234, 179, 8, 0.4)', boxShadow: '0 12px 30px rgba(234, 179, 8, 0.12)' }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              >
                <div className="sp-review-top">
                  <div className="sp-review-author-wrap">
                    <div className="sp-review-avatar-wrap">
                      {r.avatar ? (
                        <img src={r.avatar} alt={r.name} className="sp-review-avatar-img" />
                      ) : (
                        <div className="sp-review-avatar">{r.name[0]}</div>
                      )}
                      <LocalGuideBadge />
                    </div>
                    <div className="sp-review-meta">
                      <span className="sp-review-name">{r.name}</span>
                      <span className="sp-review-time">{r.time}</span>
                    </div>
                  </div>
                  <GoogleIcon />
                </div>
                <StarRating count={r.rating} />
                <p className="sp-review-text">
                  {r.text}
                  {r.text.length >= 80 && <span className="sp-read-more">Read more</span>}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <button className="sp-carousel-btn sp-carousel-btn-right" onClick={nextReview} aria-label="Next">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>

      <div className="sp-reviews-footer">
        <a href="https://www.google.com/maps/search/Elite+Eventure" target="_blank" rel="noopener noreferrer" className="sp-btn-outline">
          View More Reviews
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '10px' }}>
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      </div>
    </section>
  )
}

