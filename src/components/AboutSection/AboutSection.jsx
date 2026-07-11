import React from 'react'
import './AboutSection.css'

function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {/* Left Column: Copy, Grid & Button */}
        <div className="about-left-col">
          {/* Capsule Badge */}

          <h2 className="about-headline">
            Welcome To <br />
            <span className="gold-italic">Elite Eventure</span>
          </h2>
          
          <p className="about-paragraph">
            At Elite Eventure, we specialise in delivering exceptional corporate events, conferences, exhibitions, MICE, product launches, and virtual events. With a blend of creativity and precision, we bring your vision to life, ensuring that every detail is perfect.
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
              <img src="/images/collage1.png" alt="Automotive Event Launch" className="collage-img" />
            </div>
            
            {/* Image 2: Top Right (Immersive pavilion) */}
            <div className="collage-img-wrapper img-pos-2">
              <img src="/images/collage2.png" alt="Interactive Experience Zone" className="collage-img" />
            </div>
            
            {/* Image 3: Bottom Center (Exhibition stall) */}
            <div className="collage-img-wrapper img-pos-3">
              <img src="/images/collage3.png" alt="High-End Exhibition Stall Showcase" className="collage-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
