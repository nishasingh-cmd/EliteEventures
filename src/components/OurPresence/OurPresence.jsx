import React from 'react'
import { motion } from 'framer-motion'
import './OurPresence.css'

const locations = [
  {
    num: 'HUB 01',
    name: 'Mumbai',
    desc: 'Western Headquarters & flagship warehouse for large-scale brand activations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="10" r="3" />
        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
      </svg>
    )
  },
  {
    num: 'HUB 02',
    name: 'Delhi NCR',
    desc: 'Capital operations powering government expos & premium corporate events.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l8-4v18M13 21V11l6 3v7" />
      </svg>
    )
  },
  {
    num: 'HUB 03',
    name: 'Bengaluru',
    desc: "Serving India's tech & startup ecosystem with digital brand experiences.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v8M12 18v4M4.93 4.93l5.66 5.66M13.41 13.41l5.66 5.66M2 12h8M14 12h8M4.93 19.07l5.66-5.66M13.41 10.59l5.66-5.66" />
      </svg>
    )
  },
  {
    num: 'HUB 04',
    name: 'Ahmedabad',
    desc: 'Driving industrial expos & trade fairs across Gujarat.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7-5-7 5v12z" />
      </svg>
    )
  },
  {
    num: 'HUB 05',
    name: 'Hyderabad',
    desc: 'Managing pharma expos & tech summits across the Deccan corridor.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    )
  },
  {
    num: 'HUB 06',
    name: 'Kolkata',
    desc: "Covering Eastern India's vibrant cultural expos & trade events.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  },
  {
    num: 'HUB 07',
    name: 'Chennai',
    desc: "Serving South India's automotive & manufacturing expo circuit.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    )
  }
]

export default function OurPresence() {
  return (
    <section className="presence-section" id="our-presence" aria-label="Our Warehouses & Presence Across India">
      {/* Top Hairline Separator */}
      <div className="presence-top-hairline" />

      <div className="presence-container">
        
        {/* ── HEADER ── */}
        <motion.div
          className="presence-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="presence-headline">
            <span className="presence-yellow">Warehouses Across India.</span><br />
            Execution Without Limits.
          </h2>
          <p className="presence-sub">
            Our state-of-the-art warehouses and local teams ensure seamless on-ground support across major industrial and business hubs.
          </p>
        </motion.div>

        {/* ── HORIZONTAL TIMELINE FLOW ── */}
        <div className="timeline-horizontal-container">
          
          {/* Central Horizontal Glowing Line */}
          <div className="timeline-main-line">
            <div className="timeline-line-glow" />
          </div>

          <div className="timeline-track">
            {locations.map((loc, idx) => {
              const isEven = idx % 2 === 1 // alternate top and bottom
              return (
                <motion.div
                  key={loc.num}
                  className={`timeline-item ${isEven ? 'timeline-item--bottom' : 'timeline-item--top'}`}
                  initial={{ opacity: 0, y: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Card Content */}
                  <div className="timeline-card">
                    <div className="timeline-card-header">
                      <span className="timeline-icon-circle">
                        {loc.icon}
                      </span>
                      <span className="timeline-step-tag">{loc.num}</span>
                    </div>
                    <h3 className="timeline-card-title">{loc.name}</h3>
                    <p className="timeline-card-desc">{loc.desc}</p>
                  </div>

                  {/* Vertical Connector Line & Node */}
                  <div className="timeline-connector">
                    <div className="timeline-node">
                      <span className="timeline-node-pulse" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
