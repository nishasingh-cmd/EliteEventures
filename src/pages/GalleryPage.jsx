import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import GalleryHero from '../components/GalleryHero/GalleryHero13'
import Gallery from '../components/Gallery/Gallery'
import Footer from '../components/Footer/Footer'

export default function GalleryPage() {
  // Always open at the very top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />
      <GalleryHero />
      <main id="gallery-page-main">
        <Gallery />
      </main>
      <Footer />
    </>
  )
}
