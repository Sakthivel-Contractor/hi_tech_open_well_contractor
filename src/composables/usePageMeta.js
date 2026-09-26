import { useHead } from '@unhead/vue'
import { business } from '../data/business.js'
import { ogImage } from '../data/photos.js'

// Per-page title, description, canonical URL and Open Graph tags.
export function usePageMeta({ title, description, path = '/', extra = {} }) {
  const url = business.siteUrl + (path === '/' ? '/' : path)
  // og.jpg is cut from your hero photo; without one, the logo is shared instead.
  const image = business.siteUrl + (ogImage ?? '/logo.png')
  const [width, height] = ogImage ? ['1200', '630'] : ['256', '256']
  useHead({
    title,
    link: [{ rel: 'canonical', href: url }],
    meta: [
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: business.name },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: width },
      { property: 'og:image:height', content: height },
      { property: 'og:locale', content: 'ta_IN' },
      { property: 'og:locale:alternate', content: 'en_IN' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    ...extra,
  })
}
