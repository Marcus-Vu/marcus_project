export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": "HairsalonX",
    "description": "Bij HairsalonX in Roermond draait alles om jou. Krullen specialist, extensions expert, persoonlijke aandacht.",
    "url": "https://hairsalonx.nl",
    "telephone": "+31627020236",
    "email": "info@hairsalonx.nl",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Roermond",
      "addressRegion": "Limburg",
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.1917,
      "longitude": 5.9861
    },
    "image": "https://hairsalonx.nl/og-image.jpg",
    "priceRange": "€€",
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday", "opens": "09:00", "closes": "17:30" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "09:00", "closes": "17:30" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "09:00", "closes": "20:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "09:00", "closes": "17:30" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "16:00" }
    ],
    "sameAs": [
      "https://instagram.com/hairsalonx.remunj"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
