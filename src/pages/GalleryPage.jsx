import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import GalleryHero from '../components/GalleryHero/GalleryHero'
import GalleryShowcase from '../components/GalleryShowcase/GalleryShowcase'
import Footer from '../components/Footer/Footer'

// Dedicated image sets per service category
const EVENTS_IMAGES = [
  { id: 1, src: "/images/flexiworld_stall.png", label: "Flexiworld Corporate Summit", category: "Events" },
  { id: 2, src: "/images/smarr_realty_stall.png", label: "Smarr Realty Leadership Gala", category: "Events" },
  { id: 3, src: "/images/pepe_jeans_stall.png", label: "Pepe Jeans London Gala", category: "Events" },
  { id: 4, src: "/images/house_of_cavalli_stall.png", label: "House of Cavalli Award Ceremony", category: "Events" },
  { id: 5, src: "/images/deal_jeans_stall.png", label: "Deal Jeans Fashion Event", category: "Events" },
  { id: 6, src: "/images/lacoste_stall.png", label: "Lacoste Executive Pavilion", category: "Events" },
]

const EXHIBITIONS_IMAGES = [
  { id: 1, src: "/images/dr_rashel.jpeg", label: "Dr. Rashel Skincare Exhibition Stand", category: "Exhibitions" },
  { id: 2, src: "/images/landscape_1.jpeg", label: "Dr. Rashel 3D Spatial Pavilion", category: "Exhibitions" },
  { id: 3, src: "/images/landscape_4.jpeg", label: "Dr. Rashel Expo Main Stage", category: "Exhibitions" },
  { id: 4, src: "/images/landscape_6.jpeg", label: "Dr. Rashel Brand Activation Stand", category: "Exhibitions" },
  { id: 5, src: "/images/portrait_1.jpeg", label: "Dr. Rashel Beauty Display Counter", category: "Exhibitions" },
  { id: 6, src: "/images/portrait_2.jpeg", label: "Dr. Rashel Interactive Lounge", category: "Exhibitions" },
  { id: 7, src: "/images/portrait_3.jpeg", label: "Dr. Rashel Luxury Expo Booth", category: "Exhibitions" },
  { id: 8, src: "/images/portrait_6.jpeg", label: "Dr. Rashel VIP Delegate Showcase", category: "Exhibitions" },
]

const MICE_IMAGES = [
  { id: 1, src: "/images/flexiworld_stall.png", label: "Flexiworld MICE Conference", category: "MICE" },
  { id: 2, src: "/images/smarr_realty_stall.png", label: "Smarr Realty Executive Lounge", category: "MICE" },
  { id: 3, src: "/images/vijay_mamra_stall.png", label: "Vijay Mamra Corporate Zone", category: "MICE" },
  { id: 4, src: "/images/house_of_cavalli_stall.png", label: "House of Cavalli Delegate Pavilion", category: "MICE" },
  { id: 5, src: "/images/pepe_jeans_stall.png", label: "Pepe Jeans Meeting Lounge", category: "MICE" },
  { id: 6, src: "/images/lacoste_stall.png", label: "Lacoste Corporate Showcase", category: "MICE" },
]

const ACTIVATIONS_IMAGES = [
  { id: 1, src: "/images/pepe_jeans_stall.png", label: "Pepe Jeans Brand Activation", category: "Activations" },
  { id: 2, src: "/images/portrait_10.jpeg", label: "Experiential Promo Booth", category: "Activations" },
  { id: 3, src: "/images/vijay_mamra_stall.png", label: "Vijay Mamra Interactive Sampling", category: "Activations" },
  { id: 4, src: "/images/deal_jeans_stall.png", label: "Deal Jeans Product Launch", category: "Activations" },
  { id: 5, src: "/images/house_of_cavalli_stall.png", label: "House of Cavalli Experiential Pavilion", category: "Activations" },
  { id: 6, src: "/images/flexiworld_stall.png", label: "Flexiworld Tech Activation", category: "Activations" },
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
