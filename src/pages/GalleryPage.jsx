import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import GalleryHero from '../components/GalleryHero/GalleryHero'
import GalleryGrid from '../components/Gallery/GalleryGrid'
import Footer from '../components/Footer/Footer'

export default function GalleryPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="gallery-page-container" style={{ background: '#08080a' }}>
      <Navbar />
      <GalleryHero />
      <GalleryGrid />
      <Footer />
    </div>
  )
}
