import React from 'react';
import './GalleryHero10.css';

export default function GalleryHero10() {
  return (
    <section className="gh10-section">
      {/* Subtle Background Image with slow pan */}
      <div className="gh10-bg-wrapper">
        <img 
          src="/images/landscape_1.jpeg" 
          alt="Gallery Background" 
          className="gh10-bg-image" 
        />
        <div className="gh10-overlay"></div>
      </div>

      {/* Content */}
      <div className="gh10-content">
        <p className="gh10-eyebrow">Visual Archives</p>
        <h1 className="gh10-title">
          Our <span className="gh10-gold italic">Portfolio</span>
        </h1>
        <p className="gh10-subtitle">
          A curated collection of unforgettable spaces and experiences.
        </p>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="gh10-scroll-indicator">
        <div className="gh10-mouse">
          <div className="gh10-wheel"></div>
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
