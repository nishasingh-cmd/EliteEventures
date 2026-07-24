import React, { useRef, useEffect } from 'react';
import './GalleryHero11.css';

const IMAGES = [
  { src: '/images/landscape_1.jpeg', x: -450, y: -200, z: -800, s: 1.2 },
  { src: '/images/portrait_1.jpeg', x: 450, y: -250, z: -600, s: 1 },
  { src: '/images/landscape_2.jpeg', x: -550, y: 150, z: -400, s: 0.8 },
  { src: '/images/portrait_2.jpeg', x: 550, y: 250, z: -300, s: 1.1 },
  { src: '/images/landscape_3.jpeg', x: -350, y: -100, z: 150, s: 0.9 },
  { src: '/images/portrait_3.jpeg', x: 350, y: 100, z: 250, s: 1 },
  { src: '/images/landscape_4.jpeg', x: -650, y: -50, z: -100, s: 1.3 },
  { src: '/images/portrait_4.jpeg', x: 650, y: -100, z: -200, s: 0.9 },
  { src: '/images/dr_rashel.jpeg', x: -250, y: 300, z: -500, s: 1 },
  { src: '/images/landscape_5.jpeg', x: 250, y: -350, z: -700, s: 1.2 },
];

const RINGS = [
  { x: -200, y: -100, z: 300, r: 200, speed: 10 },
  { x: 400, y: 200, z: -100, r: 300, speed: 15 },
  { x: -500, y: -300, z: -600, r: 400, speed: 20 },
  { x: 300, y: -250, z: 100, r: 150, speed: 12 },
];

export default function GalleryHero11() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let raf;

    const onMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      
      // Calculate rotation based on mouse position
      targetX = ((e.clientY - cy) / cy) * -18; // Pitch (up/down)
      targetY = ((e.clientX - cx) / cx) * 18;  // Yaw (left/right)
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.08; // easing
      currentY += (targetY - currentY) * 0.08;
      
      scene.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    loop();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="gh11-section">
      <div className="gh11-perspective-container">
        <div className="gh11-scene" ref={sceneRef}>
          
          {/* Images placed in 3D Space */}
          {IMAGES.map((img, i) => (
            <div 
              key={i} 
              className="gh11-3d-card"
              style={{
                transform: `translate3d(${img.x}px, ${img.y}px, ${img.z}px) scale(${img.s})`,
              }}
            >
              <img src={img.src} alt="" />
              <div className="gh11-card-overlay"></div>
            </div>
          ))}

          {/* Floating Gold Rings */}
          {RINGS.map((ring, i) => (
            <div 
              key={`ring-${i}`}
              className="gh11-gold-ring"
              style={{
                width: ring.r,
                height: ring.r,
                marginLeft: -(ring.r / 2),
                marginTop: -(ring.r / 2),
                transform: `translate3d(${ring.x}px, ${ring.y}px, ${ring.z}px)`,
                animationDuration: `${ring.speed}s`
              }}
            >
              <div className="gh11-ring-inner"></div>
            </div>
          ))}

          {/* Center Typography (Z=0) */}
          <div className="gh11-center-content">
            <h1 className="gh11-title">IMMERSIVE<br/><span className="gh11-gold">GALLERY.</span></h1>
            <p className="gh11-subtitle">EXPLORE THE 3D SPACE</p>
            <a href="#gallery" className="gh11-btn">ENTER EXHIBITION</a>
          </div>

        </div>
      </div>

      <div className="gh11-hint">
        [ MOVE CURSOR TO NAVIGATE ]
      </div>

      <div className="gh11-bottom-fade"></div>
    </section>
  );
}
