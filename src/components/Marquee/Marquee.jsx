import React from 'react'
import './Marquee.css'

const marqueeItems = [
  'Exhibitions',
  'Brand Activations',
  'Product Launches',
  'Corporate Events',
  'MICE',
  'Experiential',
  'Trade Shows',
  'Visual Events'
]

function Marquee() {
  // We duplicate the list to ensure a seamless infinite scroll loop
  const doubleItems = [...marqueeItems, ...marqueeItems]

  return (
    <div className="marquee-container">
      <div className="marquee-track">
        {/* First content block */}
        <div className="marquee-content">
          {marqueeItems.map((item, idx) => (
            <span key={`block1-${idx}`} className="marquee-item">
              <span className="marquee-text">{item}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="marquee-star-icon"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </span>
          ))}
        </div>
        
        {/* Second identical content block for seamless looping */}
        <div className="marquee-content" aria-hidden="true">
          {marqueeItems.map((item, idx) => (
            <span key={`block2-${idx}`} className="marquee-item">
              <span className="marquee-text">{item}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="marquee-star-icon"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Marquee
