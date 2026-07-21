import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform, animate } from 'framer-motion'
import './AboutStorySection.css'

/* ── Main component ─────────────────────────────────────── */
export default function AboutStorySection() {
  const storyRef = useRef(null)

  return (
    <>

      {/* ════════════════════════════════════════════════════
          3. STORY — two-column
      ════════════════════════════════════════════════════ */}
      <section className="aso-story-section" ref={storyRef}>
        {/* Ambient blobs */}
        <div className="aso-blob" style={{ width: 500, height: 500, top: '10%', left: '-8%', background: 'radial-gradient(circle, rgba(244,194,13,0.055) 0%, transparent 70%)' }} />
        <div className="aso-blob" style={{ width: 380, height: 380, bottom: '5%', right: '-5%', background: 'radial-gradient(circle, rgba(80,60,200,0.04) 0%, transparent 70%)' }} />

        <div className="aso-story-grid">

          {/* ── Left ── */}
          <motion.div
            className="aso-story-left"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="aso-quote-block">
              <span className="aso-quote-icon">"</span>
              <h3 className="aso-quote-heading">Every Event<br />Tells A Story</h3>
              <p className="aso-quote-para">
                At Elite Eventure, we believe every exhibition, corporate event,
                and brand activation is an opportunity to create unforgettable
                experiences. Our passion lies in transforming ideas into visually
                stunning spaces that strengthen brands and leave lasting impressions.
              </p>
            </div>

            <motion.div
              className="aso-story-img-wrap"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src="/images/stall2.png" alt="Exhibition Floor" className="aso-story-img" loading="lazy" />
              <div className="aso-story-img-overlay" />
            </motion.div>
          </motion.div>

          {/* ── Right: glass card ── */}
          <motion.div
            className="aso-story-right"
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="aso-glass-card">
              <div className="aso-card-label">
                <span className="aso-card-label-dot" />
                About Elite Eventure
              </div>

              <h3 className="aso-card-heading">
                Premier Destination For<br />Innovative Solutions
              </h3>

              <p className="aso-card-para">
                Welcome to Elite Eventure, your premier destination for innovative exhibition stall design solutions. With decades of expertise in event management and exhibition stand design, we bring your brand vision to life with exceptional creativity and craftsmanship.
              </p>
              <p className="aso-card-para">
                Our team of seasoned professionals at Elite Eventure combines artistic flair with strategic insight to deliver exhibition stall designs that exceed expectations.
              </p>
              <p className="aso-card-para" style={{ marginBottom: 0 }}>
                Whether you're aiming to make a bold statement at your next event or create a captivating experience for your audience, we customize our solutions to align with your unique brand identity and event objectives.
              </p>

              <div className="aso-card-divider" />

              <div className="aso-card-footer">
                <div className="aso-card-footer-icon">✦</div>
                <span className="aso-card-footer-text">
                  Trusted by leading brands across India.
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

    </>
  )
}
