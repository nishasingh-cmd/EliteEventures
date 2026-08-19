import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({
  title,
  description,
  url = '',
  type = 'website',
  keywords,
  image = 'https://www.eliteeventure.com/images/contact-hero-bg.png',
  schema,
  breadcrumbs,
}) {
  const siteName = 'Elite Eventure';
  const defaultTitle = 'Elite Eventure | Exhibition Stalls, Brand Activations & Corporate Events';
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const metaDescription =
    description ||
    'Elite Eventure is a premier exhibition stall design, fabrication, and brand activation agency in Mumbai, Delhi, Bengaluru, and across India.';
  const defaultKeywords =
    'exhibition stall design, custom exhibition stands, exhibition booth fabricators Mumbai, brand activations, MICE events, corporate event management, stall designer India, Elite Eventure';
  const metaKeywords = keywords || defaultKeywords;
  const canonicalUrl = url ? `https://www.eliteeventure.com${url.startsWith('/') ? url : `/${url}`}` : 'https://www.eliteeventure.com/';

  // Construct BreadcrumbList schema if breadcrumbs are passed
  const breadcrumbsSchema = breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url.startsWith('http')
            ? crumb.url
            : `https://www.eliteeventure.com${crumb.url.startsWith('/') ? crumb.url : `/${crumb.url}`}`,
        })),
      }
    : null;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={siteName} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={fullTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {/* Page Specific Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}

      {/* Breadcrumb Structured Data */}
      {breadcrumbsSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbsSchema)}
        </script>
      )}
    </Helmet>
  );
}

