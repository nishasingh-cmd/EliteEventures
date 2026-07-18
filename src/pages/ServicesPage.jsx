import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Marquee from '../components/Marquee/Marquee'
import './ServicesPage.css'

const servicesList = [
  {
    title: 'Events',
    desc: 'Professional planning and execution of corporate and live events tailored to your brand objectives.',
    bullets: ['Venue sourcing & logistics', 'Conference & event production', 'Guest & attendee management'],
    images: ['/images/ex1.png', '/images/stall1.png', '/images/stall2.png', '/images/ex4.png', '/images/stall3.png'],
  },
  {
    title: 'Exhibitions',
    desc: 'Creative exhibition solutions designed to maximize brand visibility and audience engagement.',
    bullets: ['Stall design & fabrication', 'Exhibition management', 'Visitor engagement solutions'],
    images: ['/images/stall3.png', '/images/stall4.png', '/images/stall5.png', '/images/g1.png', '/images/g2.png'],
  },
  {
    title: 'MICE',
    desc: 'Customized meetings, incentives, conferences, and exhibitions with seamless coordination.',
    bullets: ['Conference planning', 'Travel & accommodation management', 'Delegate coordination'],
    images: ['/images/ex2.png', '/images/g3.png', '/images/g4.png', '/images/g5.png', '/images/g6.png'],
  },
  {
    title: 'Activation',
    desc: 'Innovative brand activation experiences that create meaningful audience connections.',
    bullets: ['Mall activations', 'Product promotions', 'Experiential marketing campaigns'],
    images: ['/images/g4.png', '/images/g7.png', '/images/g8.png', '/images/g9.png', '/images/ex3.png'],
  },
  {
    title: 'Virtual Events',
    desc: 'Engaging virtual and hybrid event experiences that connect audiences across the globe.',
    bullets: ['Virtual conference management', 'Live streaming solutions', 'Interactive audience engagement'],
    images: ['/images/ex3.png', '/images/collage1.png', '/images/collage2.png', '/images/collage3.png', '/images/ex1.png'],
  },
]

const whyChooseList = [
  { title: 'Experienced team', desc: 'of event specialists' },
  { title: 'Cutting-edge technology', desc: 'and event management tools' },
  { title: 'Client-centric approach', desc: 'with bespoke solutions' },
  { title: 'Global reach', desc: 'with local expertise' },
]

const googleReviews = [
  { name: 'Sahil Jobanputra', time: '7 months ago', text: 'Had a wonderful experience with the team at Elite Eventure for our recent company event. Navin & team helped a lot' },
  { name: 'Tejal Salian', time: '1 year ago', text: 'It has been a great experience working with Navin and his team. Looking forward to more of these' },
  { name: 'Sameer | Mehta-Mehta |', time: '1 year ago', text: 'Team of Great Organizers professionally executing events without any chances of complaints. Great work, Keep it up' },
  { name: 'sameer halai', time: '1 year ago', text: 'Wonderful services, Excellent Event organiser team. Great Services at reasonable budget' },
  { name: 'Mohini Mutal', time: '1 year ago', text: 'Just wanted to thank you guys for your wonderful planning, we have got alot of appreciation for the event from all our teams. Navin ensured everything in place and made the event more glorious 🥳' },
  { name: 'vasudha bhat', time: '1 year ago', text: 'Navin and his entire event team is amazing. Right from day 1 they over exceed expectations. The event was well managed without any hassle.' },
  { name: 'Sony Kapadia', time: '1 year ago', text: 'Amazing coordination and Best Event Management company I have ever come across.. Everything was managed and done smoothly with no hassle. Thank you for cherishable memories😊' },
  { name: 'Anurag Borde', time: '1 year ago', text: 'Excellent management, no last minute adjustments or panic situations. Event went on very smoothly. Superb attention to detail in stage decoration, entry passes, food and beverages and DJ.' }
]

function StarRating({ count = 5 }) {
  return (
    <div className="sp-review-stars">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="sp-star-icon" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

function ServiceGallery({ images }) {
  const [active, setActive] = useState(0)

  return (
    <div className="sp-service-gallery">
      <div className="sp-sg-main">
        <AnimatePresence mode="wait">
          <motion.img 
            key={active}
            src={images[active]} 
            alt="Main display" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      </div>
      <div className="sp-sg-thumbs">
        {images.map((img, i) => (
          <div 
            key={i} 
            className={`sp-sg-thumb ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
          >
            <img src={img} alt={`Thumbnail ${i}`} />
          </div>
        ))}
      </div>
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

export default function ServicesPage() {
  const [activeReview, setActiveReview] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setItemsPerView(1)
      else if (window.innerWidth <= 1024) setItemsPerView(2)
      else setItemsPerView(3)
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

  const marqueeText = "• Elite Eventure is known for its Precision, Project Management skills and exceptional client outcomes. "

  // Parallax scroll for the gallery above marquee
  const introRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start end", "end start"]
  })
  
  // Smooth the scroll to prevent jitter/lag
  const smoothScroll = useSpring(scrollYProgress, { damping: 20, stiffness: 100, mass: 0.2 })

  // Scroll down -> smoothScroll goes from 0 to 1.
  // We want to move left, so x starts at 0% (flush left) and goes negative.
  const galleryX = useTransform(smoothScroll, [0, 1], ["0%", "-30%"])

  return (
    <div className="services-page">
      <Navbar />

      {/* ════════════════════════════════════
          HERO (Same layout as Contact/About)
      ════════════════════════════════════ */}
      <section className="services-hero">
        <img src="/images/ex3.png" alt="Services Hero" className="services-hero-img" />
        <div className="services-hero-overlay" />
        <div className="services-hero-line" />

        <motion.div
          className="services-hero-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="services-hero-heading">
            Our <span className="services-hero-gold">Services</span>
          </h1>
          <p className="services-hero-sub">
            Bringing Exceptional Experiences to Life. From Exhibitions to Virtual Events.
          </p>
        </motion.div>
      </section>

      {/* ════════════════════════════════════
          INTRO SECTION (Gallery Parallax)
      ════════════════════════════════════ */}
      <section className="sp-intro" ref={introRef}>
        <motion.div className="sp-intro-gallery" style={{ x: galleryX }}>
          <div className="sp-gallery-card"><img src="/images/ex1.png" alt="Gallery 1" /></div>
          <div className="sp-gallery-card"><img src="/images/stall1.png" alt="Gallery 2" /></div>
          <div className="sp-gallery-card"><img src="/images/stall2.png" alt="Gallery 3" /></div>
          <div className="sp-gallery-card"><img src="/images/ex4.png" alt="Gallery 4" /></div>
          <div className="sp-gallery-card"><img src="/images/stall3.png" alt="Gallery 5" /></div>
          <div className="sp-gallery-card"><img src="/images/g1.png" alt="Gallery 6" /></div>
          <div className="sp-gallery-card"><img src="/images/stall4.png" alt="Gallery 7" /></div>
          <div className="sp-gallery-card"><img src="/images/g2.png" alt="Gallery 8" /></div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════
          MARQUEE
      ════════════════════════════════════ */}
      <div className="sp-marquee-wrapper">
        <Marquee items={[marqueeText, marqueeText, marqueeText, marqueeText]} />
      </div>

      {/* ════════════════════════════════════
          SERVICES LIST
      ════════════════════════════════════ */}
      <section className="sp-services-list">
        {servicesList.map((srv, idx) => {
          const isReverse = idx % 2 !== 0;
          return (
            <div className="sp-service-block" key={idx}>
              <div className={`sp-service-inner ${isReverse ? 'reverse' : ''}`}>
                <motion.div 
                  className="sp-service-image-col"
                  initial={{ opacity: 0, x: isReverse ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ServiceGallery images={srv.images} />
                </motion.div>
                
                <motion.div 
                  className="sp-service-text-col"
                  initial={{ opacity: 0, x: isReverse ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="sp-service-title">{srv.title}</h3>
                  <p className="sp-service-desc">{srv.desc}</p>
                  <ul className="sp-service-bullets">
                    {srv.bullets.map((b, i) => (
                      <li key={i}>
                        <span className="bullet-icon-wrapper">
                          <svg viewBox="0 0 24 24" fill="var(--color-gold-brand)" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M10 8L15 12L10 16" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="sp-service-btn">
                    Get Started 
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  </Link>
                </motion.div>
              </div>
              {idx !== servicesList.length - 1 && <div className="sp-service-divider" />}
            </div>
          )
        })}
      </section>

      {/* ════════════════════════════════════
          WHY CHOOSE US
      ════════════════════════════════════ */}
      <section className="sp-why-choose">
        <h2 className="sp-why-title">Why Choose <span className="sp-gold-text">Elite Eventure?</span></h2>
        
        <div className="sp-why-grid">
          {whyChooseList.map((item, idx) => (
            <motion.div 
              className="sp-why-card" 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="sp-why-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h4 className="sp-why-card-title">{item.title}</h4>
              <p className="sp-why-card-desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          GOOGLE REVIEWS
      ════════════════════════════════════ */}
      <section className="sp-reviews-section">
        <div className="sp-reviews-header">
          <h2 className="sp-reviews-title">Google Reviews</h2>
          <p className="sp-reviews-subtitle">See what our clients have to say about us.</p>
        </div>

        <div className="sp-reviews-carousel">
          <button className="sp-carousel-btn" onClick={prevReview} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          
          <div className="sp-reviews-track">
            <motion.div 
              className="sp-reviews-slider"
              animate={{ x: `calc(-${activeReview * (100 / itemsPerView)}% - ${activeReview * (24 / itemsPerView)}px)` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {googleReviews.map((r, i) => (
                <div 
                  className="sp-review-card" 
                  key={i} 
                  style={{ flex: `0 0 calc((100% - ${(itemsPerView - 1) * 24}px) / ${itemsPerView})` }}
                >
                  <div className="sp-review-top">
                    <div className="sp-review-author-wrap">
                      <div className="sp-review-avatar">{r.name[0]}</div>
                      <div className="sp-review-meta">
                        <span className="sp-review-name">{r.name}</span>
                        <span className="sp-review-time">{r.time}</span>
                      </div>
                    </div>
                    <GoogleIcon />
                  </div>
                  <StarRating count={r.rating} />
                  <p className="sp-review-text">"{r.text}"</p>
                </div>
              ))}
            </motion.div>
          </div>

          <button className="sp-carousel-btn" onClick={nextReview} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>

        <div className="sp-reviews-footer">
          <a href="https://www.google.com/maps/search/Elite+Eventure" target="_blank" rel="noopener noreferrer" className="sp-btn-outline">
            View More Reviews
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
