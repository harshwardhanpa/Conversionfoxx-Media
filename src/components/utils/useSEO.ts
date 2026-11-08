import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
}

/**
 * A custom hook to dynamically update document title and SEO meta tags.
 * This guarantees Googlebot and social share crawlers parse optimized metadata.
 */
export function useSEO({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = 'https://conversionfoxx.com/logo.png',
  noindex = false
}: SEOProps) {
  useEffect(() => {
    // 1. Title setting
    const fullTitle = title.includes('ConversionFoxx') 
      ? title 
      : `${title} | ConversionFoxx`;
    document.title = fullTitle;

    // Helper to find or create Meta property/name tags
    const updateOrCreateMeta = (attrName: string, attrVal: string, contentVal: string) => {
      let element = document.head.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentVal);
    };

    // Helper to find or create Link tags (like canonical)
    const updateOrCreateLink = (rel: string, hrefVal: string) => {
      let element = document.head.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', hrefVal);
    };

    // 2. Fallback meta description
    updateOrCreateMeta('name', 'description', description);

    // 3. Robots meta tag
    const robotsValue = noindex ? 'noindex, nofollow' : 'index, follow';
    updateOrCreateMeta('name', 'robots', robotsValue);

    // 4. Canonical URL link tag
    const canonicalUrl = canonical 
      ? (canonical.startsWith('http') ? canonical : `https://conversionfoxx.com${canonical}`)
      : window.location.href;
    updateOrCreateLink('canonical', canonicalUrl);

    // 5. Open Graph Meta Tags for Social Media previews (FB, LinkedIn, Slack etc.)
    updateOrCreateMeta('property', 'og:title', fullTitle);
    updateOrCreateMeta('property', 'og:description', description);
    updateOrCreateMeta('property', 'og:url', canonicalUrl);
    updateOrCreateMeta('property', 'og:type', ogType);
    updateOrCreateMeta('property', 'og:image', ogImage);

    // 6. Twitter Meta Tags
    updateOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    updateOrCreateMeta('name', 'twitter:title', fullTitle);
    updateOrCreateMeta('name', 'twitter:description', description);
    updateOrCreateMeta('name', 'twitter:image', ogImage);

  }, [title, description, canonical, ogType, ogImage, noindex]);
}
