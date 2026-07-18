import React from 'react';
import './GalleryHero12.css';

// 3 rows of images for the river
const row1 = [
  '/images/g1.png', '/images/stall1.png', '/images/g2.png', '/images/stall2.png', 
  '/images/g3.png', '/images/g1.png', '/images/stall1.png', '/images/g2.png'
];
const row2 = [
  '/images/g4.png', '/images/stall3.png', '/images/g5.png', '/images/stall4.png', 
  '/images/g6.png', '/images/g4.png', '/images/stall3.png', '/images/g5.png'
];
const row3 = [
  '/images/g7.png', '/images/stall5.png', '/images/g8.png', '/images/g9.png', 
  '/images/stall2.png', '/images/g7.png', '/images/stall5.png', '/images/g8.png'
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
          Elite <span className="gh12-gold italic">Gallery</span>
        </h1>
        <p className="gh12-subtitle">
          Explore our extensive portfolio of world-class events, exhibitions, and brand activations.
        </p>
        <a href="#gallery" className="gh12-btn">Discover More</a>
      </div>

    </section>
  );
}
