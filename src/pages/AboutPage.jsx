import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Marquee from '../components/Marquee/Marquee'
import WhyChooseSection from '../components/WhyChooseSection/WhyChooseSection'
import GoogleReviews from '../components/GoogleReviews/GoogleReviews'
import BrandsSection from '../components/BrandsSection/BrandsSection'
import FAQ from '../components/FAQ/FAQ'
import './AboutPage.css'

/* ── Count-up number ─────────────────────────────────────── */
function CountUp({ to, suffix = '' }) {
  const ref = useRef(null)
  const inViewRef = useRef(null)
  const isInView = useInView(inViewRef, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, to, {
      duration: 2,
      ease: 'easeOut',
      onUpdate(value) {
        if (ref.current) ref.current.textContent = Math.round(value) + suffix
      },
    })
    return () => controls.stop()
  }, [isInView, to, suffix])

  return (
    <span ref={inViewRef} style={{ position: 'relative' }}>
      <span ref={ref}>0{suffix}</span>
    </span>
  )
}

/* ── Main page ───────────────────────────────────────────── */
export default function AboutPage() {
  const mainRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40])

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="about-page">
      <Navbar />

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section className="about-hero">
        <img
          src="/images/g7.png"
          alt="Elite Eventure Exhibition"
          className="about-hero-img"
        />
        <div className="about-hero-overlay" />
        <div className="about-hero-line" />

        <motion.div
          className="about-hero-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="about-hero-heading">
            About <span className="about-hero-gold">Elite Eventure</span>
          </h1>
          <p className="about-hero-sub">
            Designing extraordinary exhibitions, immersive brand activations,
            corporate events, and unforgettable experiences that bring brands to life.
          </p>
        </motion.div>
      </section>

      {/* ════════════════════════════════════
          NEW LAYOUT STRUCTURE
      ════════════════════════════════════ */}
      <section className="ap-new-layout-section" ref={mainRef} style={{ padding: '100px 5%', background: '#070707', display: 'flex', flexDirection: 'column', gap: '80px', alignItems: 'center' }}>

        {/* TOP ROW: Quote & About Us Card */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', width: '100%', maxWidth: '1200px' }}>

          {/* Left Column: Quote and Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
          >
            <div>
              <span style={{ fontSize: '4rem', color: 'rgba(255,255,255,0.2)', lineHeight: 1, fontFamily: 'serif' }}>“</span>
              <p style={{ fontSize: '1.4rem', fontWeight: 300, color: '#fff', lineHeight: 1.6, marginTop: '-1rem' }}>
                We are architects of extraordinary experiences, transforming concepts into immersive realities that leave lasting impressions.
              </p>
            </div>
            <div style={{ width: '100%', height: '220px', borderRadius: '24px', overflow: 'hidden', background: '#222' }}>
              <img src="/images/stall2.png" alt="Architecture" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.div>

          {/* Right Column: About Us Yellow Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ background: 'var(--color-gold-brand)', border: '1px solid var(--color-gold-brand)', borderRadius: '24px', padding: '3.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}
          >
            <div style={{ position: 'absolute', top: '2rem', right: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#000' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em' }}>ABOUT US</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </div>

            <p style={{ fontSize: '0.95rem', color: 'rgba(0,0,0,0.85)', fontWeight: 500, lineHeight: 1.7, marginTop: '2rem' }}>
              Elite Eventure was founded with a singular vision: to redefine excellence in event management and exhibition solutions. What began as a passion for creating memorable experiences has evolved into a premier event production house serving the world's leading brands.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'rgba(0,0,0,0.85)', fontWeight: 500, lineHeight: 1.7 }}>
              Over the years, we've built a reputation for delivering flawless execution combined with creative brilliance. From intimate corporate gatherings to large-scale international exhibitions, we approach every project with the same commitment to perfection.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'rgba(0,0,0,0.85)', fontWeight: 500, lineHeight: 1.7 }}>
              Our philosophy is simple yet profound — every event is an opportunity to create something extraordinary. We don't just manage events; we craft experiences that resonate, inspire, and endure.
            </p>
          </motion.div>
        </div>

        {/* MIDDLE ROW: Stats Pill */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ width: '100%', maxWidth: '1200px', padding: '2rem', border: '2px solid rgba(244,194,13,0.45)', borderRadius: '100px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', background: 'rgba(244,194,13,0.03)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 500, color: 'var(--color-gold-brand)' }}>
              <CountUp to={200} suffix="+" />
            </span>
            <span style={{ fontSize: '0.85rem', color: '#fff', lineHeight: 1.2, opacity: 0.7 }}>Projects<br />Completed</span>
          </div>
          <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.15)' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 500, color: 'var(--color-gold-brand)' }}>
              <CountUp to={150} suffix="+" />
            </span>
            <span style={{ fontSize: '0.85rem', color: '#fff', lineHeight: 1.2, opacity: 0.7 }}>Satisfied<br />Clients</span>
          </div>
          <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.15)' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 500, color: 'var(--color-gold-brand)' }}>
              <CountUp to={50} suffix="+" />
            </span>
            <span style={{ fontSize: '0.85rem', color: '#fff', lineHeight: 1.2, opacity: 0.7 }}>Industry<br />Awards</span>
          </div>
        </motion.div>

        {/* BOTTOM ROW: Vision, Mission, Image Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', width: '100%', maxWidth: '1200px' }}>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ border: '1px solid rgba(244,194,13,0.2)', borderRadius: '24px', padding: '2.5rem', position: 'relative', background: 'rgba(255,255,255,0.02)' }}
          >
            <div style={{ position: 'absolute', top: '-12px', right: '-12px', background: '#070707', borderRadius: '50%', padding: '4px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-gold-brand)" stroke="none">
                <path d="M12 2l2.4 7.6H22l-6 4.8 2.4 7.6-6-4.8-6 4.8 2.4-7.6-6-4.8h7.6z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 400, color: '#fff', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>VISION</h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
              To be the global benchmark for premium event management and exhibition solutions, recognized for our unwavering commitment to excellence, innovation, and the art of creating truly extraordinary experiences.
            </p>
          </motion.div>

          {/* Image Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
            style={{ borderRadius: '24px', overflow: 'hidden', height: '100%', minHeight: '200px' }}
          >
            <img src="/images/stall3.png" alt="Office" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
            style={{ border: '1px solid rgba(244,194,13,0.2)', borderRadius: '24px', padding: '2.5rem', position: 'relative', background: 'rgba(255,255,255,0.02)' }}
          >
            <div style={{ position: 'absolute', top: '-12px', right: '-12px', background: '#070707', borderRadius: '50%', padding: '4px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-gold-brand)" stroke="none">
                <path d="M12 2l2.4 7.6H22l-6 4.8 2.4 7.6-6-4.8-6 4.8 2.4-7.6-6-4.8h7.6z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 400, color: '#fff', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>MISSION</h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
              To transform visions into unforgettable experiences through innovative design, meticulous planning, and flawless execution — creating moments that inspire, engage, and leave a lasting impact.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Brands We Have Worked With */}
      <BrandsSection />




      <WhyChooseSection hideReviews={true} />
      <GoogleReviews />
      <FAQ />
      <Footer />
    </div>
  )
}
