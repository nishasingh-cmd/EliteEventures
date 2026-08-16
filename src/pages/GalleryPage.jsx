import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import GalleryHero from '../components/GalleryHero/GalleryHero'
import GalleryGrid from '../components/Gallery/GalleryGrid'
import Footer from '../components/Footer/Footer'
import SEO from '../components/SEO/SEO'

export default function GalleryPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="gallery-page-container" style={{ background: '#08080a' }}>
      <SEO title="Gallery" description="Explore our portfolio of exceptional exhibition stalls, corporate events, and brand activations." url="/gallery" />
      <Navbar />
      <GalleryHero />
      <GalleryGrid />
      <Footer />
    </div>
  )
}
