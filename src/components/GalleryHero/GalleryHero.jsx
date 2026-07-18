import React, { useEffect, useRef } from 'react'
import './GalleryHero.css'

const TILES = [
  { src: '/images/g1.png',  cls: 'tile tile-1' },
  { src: '/images/g3.png',  cls: 'tile tile-2' },
  { src: '/images/g5.png',  cls: 'tile tile-3' },
  { src: '/images/g7.png',  cls: 'tile tile-4' },
  { src: '/images/g9.png',  cls: 'tile tile-5' },
  { src: '/images/g2.png',  cls: 'tile tile-6' },
  { src: '/images/stall1.png', cls: 'tile tile-7' },
  { src: '/images/stall2.png', cls: 'tile tile-8' },
  { src: '/images/stall3.png', cls: 'tile tile-9' },
  { src: '/images/g4.png',  cls: 'tile tile-10' },
  { src: '/images/g6.png',  cls: 'tile tile-11' },
  { src: '/images/g8.png',  cls: 'tile tile-12' },
  { src: '/images/stall4.png', cls: 'tile tile-13' },
  { src: '/images/stall5.png', cls: 'tile tile-14' },
]

const MARQUEE_WORDS = [
  'Exhibition', '✦', 'Brand Activation', '✦', 'Corporate Events',
  '✦', 'Experience Zones', '✦', 'Trade Shows', '✦', 'Product Launches', '✦',
]

export default function GalleryHero() {
  const canvasRef = useRef(null)

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    const particles = []

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.3,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        a: Math.random() * 0.6 + 0.15,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(234, 179, 8, ${p.a})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="gh-section">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="gh-canvas" />

      {/* Background gradient orbs */}
      <div className="gh-orb gh-orb-1" />
      <div className="gh-orb gh-orb-2" />
      <div className="gh-orb gh-orb-3" />

      {/* Floating image tiles */}
      <div className="gh-tiles" aria-hidden="true">
        {TILES.map((t, i) => (
          <div key={i} className={t.cls}>
            <img src={t.src} alt="" loading="eager" />
            <div className="tile-shine" />
          </div>
        ))}
      </div>

      {/* Central content */}
      <div className="gh-content">
        <p className="gh-eyebrow">
          <span className="gh-eyebrow-dot" />
          Our Portfolio
        </p>

        <h1 className="gh-headline">
          <span className="gh-line gh-line-1">Every Frame</span>
          <span className="gh-line gh-line-2">
            Tells A <em className="gh-italic-gold">Story</em>
          </span>
        </h1>

        <p className="gh-sub">
          From iconic exhibition stalls to immersive brand worlds —<br />
          explore the spaces we've built that stopped people in their tracks.
        </p>

        <a href="#gallery" className="gh-cta">
          <span>Explore the Work</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </a>

        {/* Stats row */}
        <div className="gh-stats">
          {[
            { n: '250+', l: 'Projects' },
            { n: '18+', l: 'Cities' },
            { n: '100%', l: 'Client Satisfaction' },
          ].map(s => (
            <div key={s.l} className="gh-stat">
              <span className="gh-stat-num">{s.n}</span>
              <span className="gh-stat-label">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Diagonal marquee strip */}
      <div className="gh-marquee-wrap" aria-hidden="true">
        <div className="gh-marquee-track">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span key={i} className={w === '✦' ? 'gh-marquee-dot' : 'gh-marquee-word'}>
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="gh-bottom-fade" />
    </section>
  )
}
