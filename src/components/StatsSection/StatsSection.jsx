import React from 'react';
import './StatsSection.css';

const StatsSection = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-divider"></div>
        <div className="stats-content-wrapper">
          <div className="scroll-hint-bar">
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
          
          <div className="stats-items-grid">
            <div className="stat-box">
              <span className="stat-num-val">15+</span>
              <span className="stat-label-text">Years</span>
            </div>
            <div className="stat-box">
              <span className="stat-num-val">500+</span>
              <span className="stat-label-text">Events</span>
            </div>
            <div className="stat-box">
              <span className="stat-num-val">120+</span>
              <span className="stat-label-text">Brands</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
