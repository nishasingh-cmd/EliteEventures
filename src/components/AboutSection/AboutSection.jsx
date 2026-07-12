import React from 'react'
import { motion } from 'framer-motion'
import './AboutSection.css'

function AboutSection() {
  return (
    <section className="about-section" id="about">
      <motion.div 
        className="about-container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Left Column: Copy, Grid & Button */}
        <div className="about-left-col">
          {/* Apple style sub-label */}
          <span className="section-mini-label">ABOUT US</span>

          <h2 className="about-headline">
            About <br />
            <span className="gold-italic">Elite Eventure</span>
          </h2>
          
          <p className="about-paragraph">
            Welcome to Elite Eventure, your trusted partner for innovative exhibition stall designs and event solutions. With years of expertise, we transform brand visions into engaging experiences through creative design, strategic planning, and flawless execution. Every stall is thoughtfully crafted to reflect your brand identity and leave a lasting impression.
          </p>

          {/* 2x2 Grid of Stats Cards */}
          <div className="about-stats-grid">
            <div className="about-stat-card">
              <span className="stat-number">500+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="about-stat-card">
              <span className="stat-number">120+</span>
              <span className="stat-label">Global Brands</span>
            </div>
            <div className="about-stat-card">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years of Craft</span>
            </div>
            <div className="about-stat-card">
              <span className="stat-number">98%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
          </div>

        </div>

        {/* Right Column: Layered Overlapping Collage */}
        <div className="about-right-col">
          <div className="about-collage">
            {/* Image 1: Top Left (Car launch) */}
            <div className="collage-img-wrapper img-pos-1">
              <img src="/images/collage1.png" alt="Automotive Event Launch" className="collage-img" loading="lazy" />
            </div>
            
            {/* Image 2: Top Right (Immersive pavilion) */}
            <div className="collage-img-wrapper img-pos-2">
              <img src="/images/collage2.png" alt="Interactive Experience Zone" className="collage-img" loading="lazy" />
            </div>
            
            {/* Image 3: Bottom Center (Exhibition stall) */}
            <div className="collage-img-wrapper img-pos-3">
              <img src="/images/collage3.png" alt="High-End Exhibition Stall Showcase" className="collage-img" loading="lazy" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default AboutSection
