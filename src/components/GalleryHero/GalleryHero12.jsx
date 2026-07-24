import React from 'react';
import './GalleryHero12.css';

// 3 rows of images for the river
const row1 = [
  '/images/landscape_1.jpeg', '/images/portrait_1.jpeg', '/images/landscape_2.jpeg', '/images/portrait_2.jpeg', 
  '/images/landscape_3.jpeg', '/images/landscape_1.jpeg', '/images/portrait_1.jpeg', '/images/landscape_2.jpeg'
];
const row2 = [
  '/images/portrait_3.jpeg', '/images/landscape_4.jpeg', '/images/portrait_4.jpeg', '/images/landscape_5.jpeg', 
  '/images/portrait_5.jpeg', '/images/portrait_3.jpeg', '/images/landscape_4.jpeg', '/images/portrait_4.jpeg'
];
const row3 = [
  '/images/landscape_6.jpeg', '/images/portrait_6.jpeg', '/images/landscape_7.jpeg', '/images/dr_rashel.jpeg', 
  '/images/portrait_7.jpeg', '/images/landscape_6.jpeg', '/images/portrait_6.jpeg', '/images/landscape_7.jpeg'
];

export default function GalleryHero12() {
  return (
    <section className="gh12-section">
      
      {/* Background River */}
      <div className="gh12-river-container">
        <div className="gh12-row">
          <div className="gh12-track gh12-track-left">
            {row1.map((src, i) => (
              <div key={i} className="gh12-river-item">
                <img src={src} alt="" />
              </div>
            ))}
          </div>
        </div>

        <div className="gh12-row">
          <div className="gh12-track gh12-track-right">
            {row2.map((src, i) => (
              <div key={i} className="gh12-river-item">
                <img src={src} alt="" />
              </div>
            ))}
          </div>
        </div>

        <div className="gh12-row">
          <div className="gh12-track gh12-track-left" style={{ animationDuration: '45s' }}>
            {row3.map((src, i) => (
              <div key={i} className="gh12-river-item">
                <img src={src} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="gh12-overlay-vignette"></div>

      {/* Center Glass Plaque */}
      <div className="gh12-glass-plaque">
        <h1 className="gh12-title">
          Elite <span className="gh12-gold">Gallery</span>
        </h1>
        <p className="gh12-subtitle">
          Explore our extensive portfolio of world-class events, exhibitions, and brand activations.
        </p>
        <a href="#gallery" className="gh12-btn">Discover More</a>
      </div>

    </section>
  );
}
