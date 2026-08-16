import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, url, type = "website" }) {
  const fullTitle = title ? `${title} | Elite Eventure` : "Elite Eventure | Exhibition Stalls, Brand Activations & MICE";
  const metaDescription = description || "Elite Eventure designs and builds premium exhibition stalls, brand activations, corporate events, and MICE experiences. Elevate your brand showcase globally.";
  const canonicalUrl = url ? `https://www.eliteeventure.com${url}` : "https://www.eliteeventure.com/";

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      {/* Fallback image is assumed to be og-image.jpg at root */}
      <meta property="og:image" content="https://www.eliteeventure.com/og-image.jpg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:image" content="https://www.eliteeventure.com/og-image.jpg" />
    </Helmet>
  );
}
