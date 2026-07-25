import React from 'react'
import { motion } from 'framer-motion'
import './OurPresence.css'

const mainHubs = [
  {
    id: 'mumbai',
    name: 'Mumbai',
    tag: 'Primary Hub',
    role: 'Western Headquarters & Commercial Center',
    pos: { top: '56%', left: '22%' },
    mobileOrder: 1
  },
  {
    id: 'delhi',
    name: 'Delhi',
    tag: 'Major Hub',
    role: 'Northern Division & Capital Operations',
    pos: { top: '20%', left: '46%' },
    mobileOrder: 2
  }
]

const operationalCities = [
  { id: 'bengaluru', name: 'Bengaluru', pos: { top: '82%', left: '30%' } },
  { id: 'ahmedabad', name: 'Ahmedabad', pos: { top: '36%', left: '14%' } },
  { id: 'hyderabad', name: 'Hyderabad', pos: { top: '65%', left: '68%' } },
  { id: 'kolkata', name: 'Kolkata', pos: { top: '38%', left: '84%' } },
  { id: 'chennai', name: 'Chennai', pos: { top: '84%', left: '64%' } }
]

// SVG Network lines connecting cities in 100x100 coordinate space
const networkLines = [
  { from: [46, 20], to: [22, 56] }, // Delhi -> Mumbai
  { from: [46, 20], to: [14, 36] }, // Delhi -> Ahmedabad
  { from: [46, 20], to: [84, 38] }, // Delhi -> Kolkata
  { from: [22, 56], to: [14, 36] }, // Mumbai -> Ahmedabad
  { from: [22, 56], to: [30, 82] }, // Mumbai -> Bengaluru
  { from: [22, 56], to: [68, 65] }, // Mumbai -> Hyderabad
  { from: [68, 65], to: [64, 84] }, // Hyderabad -> Chennai
  { from: [30, 82], to: [64, 84] }, // Bengaluru -> Chennai
  { from: [68, 65], to: [84, 38] }  // Hyderabad -> Kolkata
]

export default function OurPresence() {
  return (
    <section className="presence-section" id="our-presence" aria-label="Our Presence Across India">
      {/* Top Hairline Separator */}
      <div className="presence-hairline" />

      {/* Subtle Ambient Radial Glows */}
      <div className="presence-glow-left" />
      <div className="presence-glow-right" />

      <div className="presence-container">
        {/* ── LEFT COLUMN — Text Content ── */}
        <motion.div
          className="presence-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >

          <h2 className="presence-headline">
            Delivering Experiences <span className="presence-gold">Across India</span>
          </h2>

          <p className="presence-desc">
            From large-scale exhibitions to premium brand activations, our teams operate across India's major business hubs, ensuring seamless execution wherever your brand needs us.
          </p>

          {/* Quick Metrics */}
          <div className="presence-stats">
            <div className="presence-stat-item">
              <span className="presence-stat-num">7+</span>
              <span className="presence-stat-label">Major Metro Hubs</span>
            </div>
            <div className="presence-stat-divider" />
            <div className="presence-stat-item">
              <span className="presence-stat-num">100%</span>
              <span className="presence-stat-label">Pan-India Reach</span>
            </div>
            <div className="presence-stat-divider" />
            <div className="presence-stat-item">
              <span className="presence-stat-num">24/7</span>
              <span className="presence-stat-label">On-Ground Support</span>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN — Premium Presence Map & Node Visualization ── */}
        <motion.div
          className="presence-right"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Abstract Map Box with Grid Pattern */}
          <div className="presence-map-box">
            {/* Background Grid Pattern & Map Outline Effect */}
            <div className="presence-map-grid" />
            <div className="presence-map-bg-glow" />

            {/* SVG Constellation Network Lines (Desktop view) */}
            <svg className="presence-svg-network" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#FFC72C" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {networkLines.map((line, idx) => (
                <line
                  key={idx}
                  x1={`${line.from[0]}%`}
                  y1={`${line.from[1]}%`}
                  x2={`${line.to[0]}%`}
                  y2={`${line.to[1]}%`}
                  stroke="url(#lineGrad)"
                  strokeWidth="0.5"
                  strokeDasharray="1.5 1.5"
                  className="network-line"
                />
              ))}
            </svg>

            {/* Main Hubs (Mumbai & Delhi - Prominent Cards) */}
            {mainHubs.map((hub, i) => (
              <motion.div
                key={hub.id}
                className={`presence-node main-node main-node--${hub.id}`}
                style={{ top: hub.pos.top, left: hub.pos.left }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <div className="presence-card main-card">
                  <div className="main-card-header">
                    <span className="presence-pin-outer">
                      <span className="presence-pin-pulse" />
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="presence-pin-icon">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    <span className="main-card-title">{hub.name}</span>
                    <span className="main-card-tag">{hub.tag}</span>
                  </div>
                  <span className="main-card-role">{hub.role}</span>
                </div>
              </motion.div>
            ))}

            {/* Operational Cities (Pills) */}
            {operationalCities.map((city, i) => (
              <motion.div
                key={city.id}
                className={`presence-node city-node city-node--${city.id}`}
                style={{ top: city.pos.top, left: city.pos.left }}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                whileHover={{ scale: 1.06, y: -3 }}
              >
                <div className="presence-pill">
                  <span className="presence-pill-dot" />
                  <span className="presence-pill-name">{city.name}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Fallback Grid (Stacked nicely on small screens) */}
          <div className="presence-mobile-layout">
            <div className="mobile-group-title">Key Operation Hubs</div>
            <div className="mobile-main-hubs">
              {mainHubs.map(hub => (
                <div key={hub.id} className="mobile-main-card">
                  <span className="presence-pin-outer">
                    <span className="presence-pin-pulse" />
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="presence-pin-icon">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <div className="mobile-main-info">
                    <div className="mobile-main-header">
                      <span className="mobile-main-name">{hub.name}</span>
                      <span className="mobile-main-tag">{hub.tag}</span>
                    </div>
                    <span className="mobile-main-role">{hub.role}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mobile-group-title">Operational Cities</div>
            <div className="mobile-cities-pills">
              {operationalCities.map(city => (
                <div key={city.id} className="mobile-city-pill">
                  <span className="presence-pill-dot" />
                  <span>{city.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
