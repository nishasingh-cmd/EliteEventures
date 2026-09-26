import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import GalleryHero from '../components/GalleryHero/GalleryHero'
import GalleryShowcase from '../components/GalleryShowcase/GalleryShowcase'
import Footer from '../components/Footer/Footer'
import SEO from '../components/SEO/SEO'

export default function GalleryPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const gallerySchema = [
    {
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
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://www.eliteeventure.com/images/dr_rashel_3d_concept.png',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: 'Elite Eventure Exhibition Stall & Booth Design Showcase',
      description: 'Award-winning bespoke exhibition stand designs, 3D renders, and brand activation installations across India.',
      image: [
        'https://www.eliteeventure.com/images/dr_rashel_3d_concept.png',
        'https://www.eliteeventure.com/images/morix_stall_front.png',
        'https://www.eliteeventure.com/images/pepe_jeans_stall.png',
        'https://www.eliteeventure.com/images/vn_technology_stall.png',
        'https://www.eliteeventure.com/images/flexiworld_stall.png',
        'https://www.eliteeventure.com/images/vijay_mamra_stall.png',
        'https://www.eliteeventure.com/images/lacoste_stall.png'
      ]
    }
  ]

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
      <GalleryShowcase />
      <Footer />
    </div>
  )
}

