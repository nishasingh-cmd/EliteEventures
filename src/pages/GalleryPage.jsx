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

  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://www.eliteeventure.com/gallery#gallerypage',
    url: 'https://www.eliteeventure.com/gallery',
    name: 'Exhibition Stall & Event Design Portfolio | Elite Eventure Gallery',
    description: 'Explore our portfolio of custom exhibition stalls, interactive brand activations, corporate stage designs, and trade show booths across India.',
    isPartOf: {
      '@id': 'https://www.eliteeventure.com/#website',
    },
    about: {
      '@id': 'https://www.eliteeventure.com/#organization',
    },
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Gallery', url: '/gallery' },
  ]

  return (
    <div className="gallery-page-container" style={{ background: '#08080a' }}>
      <SEO 
        title="Portfolio & Gallery | Custom Exhibition Stalls & Brand Activations" 
        description="Explore Elite Eventure's design portfolio featuring award-winning exhibition stalls, brand activations, corporate pavilions, and trade show booths across Mumbai, Delhi, and global venues." 
        url="/gallery"
        keywords="exhibition stall portfolio, trade show booth gallery, event setup designs, stall design photos, brand activation showcase, Elite Eventure gallery"
        schema={gallerySchema}
        breadcrumbs={breadcrumbs}
      />
      <Navbar />
      <GalleryHero />
      <GalleryGrid />
      <Footer />
    </div>
  )
}
