import { useEffect } from 'react';
import { SITE_NAME, getSiteUrl, HTML_LANG } from '../config/seo';

/** One-time Organization + WebSite JSON-LD for UK-focused local entity signals. */
export default function GlobalJsonLd() {
  useEffect(() => {
    const siteUrl = getSiteUrl();
    const graph = [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: SITE_NAME,
        url: siteUrl,
        logo: `${siteUrl}/LC.svg`,
        areaServed: {
          '@type': 'Country',
          name: 'United Kingdom',
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'GB',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: SITE_NAME,
        url: siteUrl,
        inLanguage: HTML_LANG,
        publisher: { '@id': `${siteUrl}/#organization` },
      },
    ];

    let script = document.getElementById('seo-jsonld-global');
    if (!script) {
      script = document.createElement('script');
      script.id = 'seo-jsonld-global';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  }, []);

  return null;
}
