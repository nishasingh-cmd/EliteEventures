import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Marquee from '../components/Marquee/Marquee'
import GoogleReviews from '../components/GoogleReviews/GoogleReviews'
import SEO from '../components/SEO/SEO'
import './ServicesPage.css'

const servicesList = [
  {
    title: 'Events',
    desc: 'Professional planning and execution of corporate and live events tailored to your brand objectives.',
    bullets: ['Venue sourcing & logistics', 'Conference & event production', 'Guest & attendee management'],
    images: [
      '/images/events_stage_wide.jpg',
      '/images/mufti_led_cube_portrait.jpg',
      '/images/lacoste_stall.png',
      '/images/pepe_jeans_stall.png',
    ],
  },
  {
    title: 'Exhibitions',
    desc: 'Creative exhibition solutions designed to maximize brand visibility and audience engagement.',
    bullets: ['Stall design & fabrication', 'Exhibition management', 'Visitor engagement solutions'],
    images: [
      '/images/dr_rashel_glow_up_arcade.png',
      '/images/vijay_mamra_stall.png',
      '/images/hello_watch_stall.jpeg',
      '/images/vijay_mamra_stall_2.jpeg',
    ],
  },
  {
    title: 'MICE',
    desc: 'Customized meetings, incentives, conferences, and exhibitions with seamless coordination.',
    bullets: ['Conference planning', 'Travel & accommodation management', 'Delegate coordination'],
    images: [
      '/images/flexiworld_stall.png',
      '/images/flexiworld_stall_2.jpeg',
      '/images/house_of_cavalli_stall.png',
    ],
  },
  {
    title: 'Activation',
    desc: 'Innovative brand activation experiences that create meaningful audience connections.',
    bullets: ['Mall activations', 'Product promotions', 'Experiential marketing campaigns'],
    images: [
      '/images/deal_jeans_stall.png',
      '/images/mufti_led_cube_wide.jpg',
      '/images/house_of_cavalli_stall.png',
      '/images/landscape_3.jpeg',
    ],
  },
  {
    title: 'Virtual Events',
    desc: 'Engaging virtual and hybrid event experiences that connect audiences across the globe.',
    bullets: ['Virtual conference management', 'Live streaming solutions', 'Interactive audience engagement'],
    images: [
      '/images/virtual_event_lobby.jpg',
      '/images/virtual_event_lobby_dark.jpg',
      '/images/virtual_event_stall_1.jpg',
    ],
  },
]

function ServiceGallery({ images, title }) {
  const [active, setActive] = useState(0)

  return (
    <div className="sp-service-gallery">
      <div className="sp-sg-main">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={`${title} - Elite Eventure Showcase ${active + 1}`}
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
            <img src={img} alt={`${title} Thumbnail ${i + 1}`} />
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

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: servicesList.map((srv, index) => ({
      '@type': 'Service',
      position: index + 1,
      name: srv.title,
      description: srv.desc,
      provider: {
        '@id': 'https://www.eliteeventure.com/#organization',
      },
    })),
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
  ]

  return (
    <div className="services-page">
      <SEO 
        title="Our Services | Exhibition Stalls, Brand Activation & MICE Solutions" 
        description="Explore Elite Eventure's core services: Custom Exhibition Stalls, Experiential Brand Activations, Corporate Events, MICE management, and Virtual Conferences." 
        url="/services"
        keywords="exhibition stall design services, brand activation agency, corporate event planning, MICE conference organizer, virtual event production, Elite Eventure services"
        schema={servicesSchema}
        breadcrumbs={breadcrumbs}
      />
      <Navbar />

      {/* ════════════════════════════════════
          HERO (Same layout as Contact/About)
      ════════════════════════════════════ */}
      <section className="services-hero">
        <img src="/images/contact-hero-bg.png" alt="Elite Eventure Services - Exhibition and Event Production" className="services-hero-img" />
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
          <div className="sp-gallery-card"><img src="/images/landscape_1.jpeg" alt="Elite Eventure Exhibition Pavilion Design" /></div>
          <div className="sp-gallery-card"><img src="/images/portrait_1.jpeg" alt="Elite Eventure Brand Activation Showcase" /></div>
          <div className="sp-gallery-card"><img src="/images/landscape_2.jpeg" alt="Elite Eventure Custom Trade Show Stand" /></div>
          <div className="sp-gallery-card"><img src="/images/portrait_2.jpeg" alt="Elite Eventure Corporate Event Setup" /></div>
          <div className="sp-gallery-card"><img src="/images/landscape_3.jpeg" alt="Elite Eventure Experiential Marketing Installation" /></div>
          <div className="sp-gallery-card"><img src="/images/landscape_5.jpeg" alt="Elite Eventure Premium Exhibition Booth" /></div>
          <div className="sp-gallery-card"><img src="/images/portrait_3.jpeg" alt="Elite Eventure Brand Experience Space" /></div>
          <div className="sp-gallery-card"><img src="/images/landscape_4.jpeg" alt="Elite Eventure Stage and Lighting Production" /></div>
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
                  initial={{ opacity: 0, x: isReverse ? 80 : -80, scale: 0.96 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ServiceGallery images={srv.images} title={srv.title} />
                </motion.div>

                <motion.div
                  className="sp-service-text-col"
                  initial={{ opacity: 0, x: isReverse ? -80 : 80, scale: 0.96 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.3, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
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
          GOOGLE REVIEWS
      ════════════════════════════════════ */}
      <GoogleReviews />

      <Footer />
    </div>
  )
}
