// Single source of truth for business details. Edit here, everything else updates.
export const business = {
  name: 'HI Tech Open Well Contractor',
  // Change this to your real domain before deploying (used for sitemap, canonical URLs, Open Graph).
  siteUrl: 'https://sktechwelldigging.in',
  phones: ['9585085036', '6374114224'],
  whatsapp: ['9585085036', '6374114224'],
  email: 'velanraja002@gmail.com',
  address: {
    en: 'Tiruchengode, Namakkal District, Tamil Nadu',
    ta: 'திருச்செங்கோடு, நாமக்கல் மாவட்டம், தமிழ்நாடு',
    locality: 'Tiruchengode',
    region: 'Tamil Nadu',
    country: 'IN',
  },
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Tiruchengode%2C+Tamil+Nadu',
  // "Rate us on Google" button. Paste your Google Business Profile review link here
  // (Google Business Profile > Ask for reviews > copy link, e.g. https://g.page/r/XXXX/review).
  // The button stays hidden until this is a real https:// link.
  googleReviewUrl: '[GOOGLE REVIEW LINK]',
  years: '40+',
  wells: '400+',
  states: '2',
}

export const primaryPhone = business.phones[0]
export const telLink = (num = primaryPhone) => `tel:+91${num}`
const waMessage = encodeURIComponent(
  `Hi ${business.name}, I need details about open well / borewell work`,
)
export const waLink = (num = business.whatsapp[0]) => `https://wa.me/91${num}?text=${waMessage}`
export const formatPhone = (num) => `+91 ${num.slice(0, 5)} ${num.slice(5)}`
