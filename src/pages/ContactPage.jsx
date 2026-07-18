import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import ContactSection from '../components/ContactSection/ContactSection'
import './ContactPage.css'

export default function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="contact-page">
      <Navbar />

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section className="contact-hero">
        <img
          src="/images/stall1.png"
          alt="Contact Elite Eventure"
          className="contact-hero-img"
        />
        <div className="contact-hero-overlay" />
        <div className="contact-hero-line" />

        <motion.div
          className="contact-hero-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="contact-hero-heading">
            Get In{' '}
            <span className="contact-hero-gold">Touch</span>
          </h1>
          <p className="contact-hero-sub">
            Let's collaborate to build extraordinary experiences and bring your vision to life.
          </p>
        </motion.div>
      </section>

      {/* Main Contact Section */}
      <main className="contact-main">
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}
