import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import GalleryHero from '../components/GalleryHero/GalleryHero'
import GalleryShowcase from '../components/GalleryShowcase/GalleryShowcase'
import Footer from '../components/Footer/Footer'

// Dedicated image sets per service category
const EVENTS_IMAGES = [
  { id: 1, src: "/images/ex1.png", label: "Corporate Summit & Stage", category: "Events" },
  { id: 2, src: "/images/ex2.png", label: "Global Leadership Gala", category: "Events" },
  { id: 3, src: "/images/g2.png", label: "Baker Hughes Corporate Event", category: "Events" },
  { id: 4, src: "/images/ex4.png", label: "Corporate Award Ceremony", category: "Events" },
  { id: 5, src: "/images/collage1.png", label: "Automotive Launch Event", category: "Events" },
  { id: 6, src: "/images/stall1.png", label: "Executive Conference Pavilion", category: "Events" },
]

const EXHIBITIONS_IMAGES = [
  { id: 1, src: "/images/stall1.png", label: "Architectural 3D Exhibition Stall", category: "Exhibitions" },
  { id: 2, src: "/images/stall2.png", label: "Custom Trade Show Stand", category: "Exhibitions" },
  { id: 3, src: "/images/stall3.png", label: "Exhibition Pavilion Setup", category: "Exhibitions" },
  { id: 4, src: "/images/stall4.png", label: "Modular Exhibition Booth", category: "Exhibitions" },
  { id: 5, src: "/images/stall5.png", label: "Promo Exhibition Stand", category: "Exhibitions" },
  { id: 6, src: "/images/g1.png", label: "Dr. Rashel Exhibition Stand", category: "Exhibitions" },
  { id: 7, src: "/images/g3.png", label: "Vijay Mamra Exhibition Stall", category: "Exhibitions" },
  { id: 8, src: "/images/g6.png", label: "ATC Chains Trade Show Stall", category: "Exhibitions" },
]

const MICE_IMAGES = [
  { id: 1, src: "/images/g3.png", label: "MICE Conference Pavilion", category: "MICE" },
  { id: 2, src: "/images/g4.png", label: "Walkaroo Executive Zone", category: "MICE" },
  { id: 3, src: "/images/g5.png", label: "Mufti Corporate Lounge", category: "MICE" },
  { id: 4, src: "/images/ex2.png", label: "International Delegate Conference", category: "MICE" },
  { id: 5, src: "/images/g6.png", label: "Delegate Meeting Stage", category: "MICE" },
  { id: 6, src: "/images/collage2.png", label: "Corporate MICE Showcase", category: "MICE" },
]

const ACTIVATIONS_IMAGES = [
  { id: 1, src: "/images/g7.png", label: "Hello EDC Brand Activation", category: "Activations" },
  { id: 2, src: "/images/g8.png", label: "Experiential Promo Booth", category: "Activations" },
  { id: 3, src: "/images/g9.png", label: "Interactive Mall Activation", category: "Activations" },
  { id: 4, src: "/images/ex3.png", label: "Product Launch Activation", category: "Activations" },
  { id: 5, src: "/images/collage3.png", label: "Experiential Brand Activation", category: "Activations" },
  { id: 6, src: "/images/stall4.png", label: "Promo Booth Activation", category: "Activations" },
]

export default function GalleryPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="gallery-page-container" style={{ background: '#0F0F12' }}>
      <Navbar />
      <GalleryHero />

      <main id="gallery-page-main" style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingBottom: '70px' }}>
        {/* Section 1: Events */}
        <GalleryShowcase
          id="events-gallery"
          titlePrefix=""
          titleHighlight="Events"
          subtext="A collection of our corporate events, conferences, award galas, and live brand experiences."
          images={EVENTS_IMAGES}
        />

        {/* Section 2: Exhibitions */}
        <GalleryShowcase
          id="exhibitions-gallery"
          titlePrefix=""
          titleHighlight="Exhibitions"
          subtext="Custom exhibition stalls, trade show booths, and architectural pavilion setups designed for maximum brand impact."
          images={EXHIBITIONS_IMAGES}
        />

        {/* Section 3: MICE */}
        <GalleryShowcase
          id="mice-gallery"
          titlePrefix=""
          titleHighlight="MICE"
          subtext="Meetings, Incentives, Conferences, and Exhibitions executed with corporate finesse and seamless logistics."
          images={MICE_IMAGES}
        />

        {/* Section 4: Activations */}
        <GalleryShowcase
          id="activations-gallery"
          titlePrefix=""
          titleHighlight="Activations"
          subtext="Immersive brand activations, product promotions, and experiential marketing campaigns that captivate audiences."
          images={ACTIVATIONS_IMAGES}
        />
      </main>

      <Footer />
    </div>
  )
}
