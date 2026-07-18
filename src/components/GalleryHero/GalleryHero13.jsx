import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './GalleryHero13.css';

const IMAGES = [
  { id: 1, src: '/images/g1.png', w: 350, h: 450, x: 100, y: -200 },
  { id: 2, src: '/images/stall1.png', w: 450, h: 300, x: -400, y: -400 },
  { id: 3, src: '/images/g3.png', w: 300, h: 400, x: -600, y: 100 },
  { id: 4, src: '/images/g5.png', w: 500, h: 350, x: 200, y: 300 },
  { id: 5, src: '/images/stall2.png', w: 350, h: 350, x: 600, y: -100 },
  { id: 6, src: '/images/stall3.png', w: 400, h: 500, x: -200, y: 150 },
  { id: 7, src: '/images/g7.png', w: 300, h: 400, x: -800, y: -200 },
  { id: 8, src: '/images/g9.png', w: 450, h: 300, x: 750, y: 200 },
  { id: 9, src: '/images/g2.png', w: 350, h: 450, x: -100, y: 550 },
  { id: 10, src: '/images/g4.png', w: 400, h: 300, x: 500, y: -500 },
  { id: 11, src: '/images/g6.png', w: 300, h: 400, x: 900, y: -300 },
  { id: 12, src: '/images/g8.png', w: 500, h: 350, x: -900, y: 300 },
  { id: 13, src: '/images/stall4.png', w: 350, h: 350, x: 300, y: 650 },
  { id: 14, src: '/images/stall5.png', w: 400, h: 500, x: -500, y: 600 },
];

export default function GalleryHero13() {
  const constraintsRef = useRef(null);
  
  return (
    <section className="gh13-section" ref={constraintsRef}>
      
      {/* The Draggable Canvas */}
      <motion.div 
        className="gh13-canvas"
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
        whileTap={{ cursor: "grabbing" }}
      >
        <div className="gh13-bg-grid"></div>

        {IMAGES.map((img) => (
          <div 
            key={img.id} 
            className="gh13-card"
            style={{
              width: img.w,
              height: img.h,
              left: `calc(50% + ${img.x}px)`,
              top: `calc(50% + ${img.y}px)`,
            }}
          >
            <img src={img.src} alt="" draggable="false" />
            <div className="gh13-card-overlay"></div>
          </div>
        ))}
      </motion.div>

      {/* Fixed UI Overlay */}
      <div className="gh13-ui pointer-events-none">
        <h1 className="gh13-title">
          Interactive <span className="gh13-gold italic">Canvas</span>
        </h1>
        <p className="gh13-subtitle">Click and drag anywhere to explore the archives.</p>
      </div>
      
      {/* Instructions pill */}
      <div className="gh13-pill">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="5 9 2 12 5 15"></polyline>
          <polyline points="9 5 12 2 15 5"></polyline>
          <polyline points="19 9 22 12 19 15"></polyline>
          <polyline points="9 19 12 22 15 19"></polyline>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <line x1="12" y1="2" x2="12" y2="22"></line>
        </svg>
        <span>Drag to pan</span>
      </div>

      <div className="gh13-fade-bottom"></div>

    </section>
  );
}
