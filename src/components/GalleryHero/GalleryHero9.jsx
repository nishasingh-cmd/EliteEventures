import React, { useState } from 'react';
import './GalleryHero9.css';

const PANELS = [
  { id: 1, title: 'Exhibition Stalls', img: '/images/landscape_1.jpeg', num: '01' },
  { id: 2, title: 'Brand Activations', img: '/images/portrait_1.jpeg', num: '02' },
  { id: 3, title: 'Corporate Events',  img: '/images/landscape_2.jpeg', num: '03' },
  { id: 4, title: 'Experience Zones',  img: '/images/portrait_2.jpeg', num: '04' },
  { id: 5, title: 'Product Launches',  img: '/images/landscape_3.jpeg', num: '05' }
];

export default function GalleryHero9() {
  const [active, setActive] = useState(3); // Start with middle one open

  return (
    <section className="gh9-section">
      
      {/* Absolute Header Overlay */}
      <div className="gh9-header-overlay pointer-events-none">
        <h1 className="gh9-main-title">
          Elite <span className="gh9-gold">Gallery</span>
        </h1>
        <p className="gh9-subtitle">Our Finest Works</p>
      </div>

      <div className="gh9-container">
        {PANELS.map((panel) => (
          <div
            key={panel.id}
            className={`gh9-panel ${active === panel.id ? 'active' : ''}`}
            onMouseEnter={() => setActive(panel.id)}
          >
            <div className="gh9-panel-bg">
              <img src={panel.img} alt={panel.title} />
              <div className="gh9-panel-overlay"></div>
            </div>
            
            <div className="gh9-panel-content">
              <div className="gh9-panel-num">{panel.num}</div>
              <h2 className="gh9-panel-title">{panel.title}</h2>
              <a href="#gallery" className="gh9-panel-btn">View More</a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="gh9-bottom-fade"></div>
    </section>
  );
}
