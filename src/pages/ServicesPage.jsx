import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Marquee from '../components/Marquee/Marquee'
import WhyChooseSection from '../components/WhyChooseSection/WhyChooseSection'
import GoogleReviews from '../components/GoogleReviews/GoogleReviews'
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

export default function ServicesPage() {
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
                            <path d="M10 8L15 12L10 16" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
      <WhyChooseSection hideReviews={true} />

      {/* ════════════════════════════════════
          GOOGLE REVIEWS
      ════════════════════════════════════ */}
      <GoogleReviews />

      <Footer />
    </div>
  )
}
