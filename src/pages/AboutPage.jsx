import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import AboutStorySection from '../components/AboutStorySection/AboutStorySection'
import './AboutPage.css'

/* ── Scroll-to-top on mount ─────────────────────────────── */

/* ── Feature row ─────────────────────────────────────────── */
function FeatureRow({ icon, title, desc, delay }) {
  return (
    <motion.div
      className="ap-feature-row"
      initial={{ opacity: 0, x: 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="ap-feat-icon">{icon}</div>
      <div className="ap-feat-body">
        <span className="ap-feat-title">{title}</span>
        <span className="ap-feat-desc">{desc}</span>
      </div>
    </motion.div>
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
          src="/images/collage3.png"
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
            About{' '}
            <span className="about-hero-gold">Elite Eventure</span>
          </h1>
          <p className="about-hero-sub">
            Designing extraordinary exhibitions, immersive brand activations,
            corporate events, and unforgettable experiences that bring brands to life.
          </p>
        </motion.div>
      </section>

      {/* ════════════════════════════════════
          STORY / JOURNEY SECTION
      ════════════════════════════════════ */}
      <AboutStorySection />

      {/* ════════════════════════════════════
          MAIN ABOUT — two-column
      ════════════════════════════════════ */}
      <section className="about-main-section" ref={mainRef}>
        <div className="ap-separator" />
        {/* Ambient blobs */}
        <div className="ap-blob" style={{ width: 560, height: 560, top: '-10%', left: '-8%', background: 'radial-gradient(circle, rgba(244,194,13,0.06) 0%, transparent 70%)' }} />
        <div className="ap-blob" style={{ width: 400, height: 400, bottom: '0', right: '5%', background: 'radial-gradient(circle, rgba(100,80,220,0.04) 0%, transparent 70%)' }} />

        <div className="about-main-grid">

          {/* ── Left: Collage ── */}
          <motion.div
            className="about-collage-col"
            style={{ y: parallaxY }}
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about-collage-canvas">

              <motion.div
                className="ac-card ac-card--portrait"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src="/images/collage1.png" alt="Corporate Event" loading="lazy" />
              </motion.div>

              <motion.div
                className="ac-card ac-card--landscape"
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src="/images/stall3.png" alt="Exhibition Stall" loading="lazy" />
              </motion.div>

              <motion.div
                className="ac-card ac-card--small"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src="/images/g4.png" alt="Brand Activation" loading="lazy" />
              </motion.div>

              {/* Floating glass badge */}
              <div className="ac-badge">
                <span className="ac-badge-icon">🏆</span>
                <div>
                  <span className="ac-badge-num">500+</span>
                  <span className="ac-badge-lbl">Successful Projects</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* ── Right: Content ── */}
          <motion.div
            className="about-content-col"
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="ap-section-badge-text">✦ THE ELITE STANDARD ✦</span>

            <h2 className="ap-heading">
              Crafting Premium<br />
              <span className="ap-heading-gold">Exhibition Experiences</span>
            </h2>

            <p className="ap-para">
              Elite Eventure specializes in creating premium exhibition stalls, immersive
              brand activations, corporate events, MICE experiences, and product launches
              that elevate brands and leave lasting impressions. From concept and design to
              flawless execution, we transform ideas into exceptional experiences that
              connect businesses with their audiences.
            </p>

            <div className="ap-features">
              <FeatureRow
                icon="✦"
                title="Exhibition Excellence"
                desc="Custom-built exhibition stalls designed to maximize brand visibility and visitor engagement."
                delay={0.18}
              />
              <FeatureRow
                icon="✦"
                title="Brand Activations"
                desc="Interactive experiences that strengthen customer connections and create memorable brand moments."
                delay={0.30}
              />
              <FeatureRow
                icon="✦"
                title="End-to-End Execution"
                desc="Complete planning, production, logistics, installation, and on-site management under one expert team."
                delay={0.42}
              />
            </div>

          </motion.div>
        </div>
      </section>



      {/* ════════════════════════════════════
          CTA
      ════════════════════════════════════ */}
      <section className="ap-cta-section" id="ap-cta">
        <div className="ap-separator" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="ap-cta-label">Ready to Begin?</span>
          <h2 className="ap-cta-heading">
            Let's Build Your Next<br />
            <span>Extraordinary Experience</span>
          </h2>
          <p className="ap-cta-sub">
            Whether it's an exhibition stall, product launch, corporate event, or
            immersive brand activation, our team is ready to bring your vision to life.
          </p>
          <div className="ap-cta-btns">
            <Link to="/contact" className="btn-ap-primary">
              Let's Talk <span className="btn-ap-arrow">→</span>
            </Link>
            <a href="/gallery" className="btn-ap-secondary">
              Explore Our Portfolio
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
