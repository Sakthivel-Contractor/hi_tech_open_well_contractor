// Single source of truth for business details. Edit here, everything else updates.
export const business = {
  name: 'HI Tech Open Well Contractor',
  // Used for sitemap, canonical URLs, and Open Graph metadata.
  siteUrl: 'https://hitechopen-wellcontractor.in',
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

  // ---- Verified details for Google and the structured data ----
  // Fill these only with details the owner has confirmed. Anything left empty is simply not
  // published (no placeholders reach the site). See OWNER-CHECKLIST.md in the audit folder.
  //   streetAddress  e.g. '12, Salem Road'   (leave empty to keep the address at town level)
  //   postalCode     6-digit PIN, e.g. '637211'
  //   geo            { lat: 11.38, lng: 77.89 } of the office/yard, or null
  //   openingHours   e.g. [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '19:00' }]
  //   gbpUrl         the Google Business Profile / Maps link of the verified listing
  //   sameAs         other official profiles: Facebook page, YouTube channel, JustDial, IndiaMART ...
  //   founder        owner's name as it should appear publicly
  //   foundingYear   year the business started, e.g. '1985'
  streetAddress: '',
  postalCode: '',
  geo: null,
  openingHours: [],
  gbpUrl: '',
  sameAs: [],
  founder: '',
  foundingYear: '',
}

export const primaryPhone = business.phones[0]
export const telLink = (num = primaryPhone) => `tel:+91${num}`
// Prefilled WhatsApp text. `about` (a district or service name, in any language) is added
// so the enquiry says what it is for, e.g. waLink(undefined, 'சேலம்').
const waMessage = (about) =>
  encodeURIComponent(
    `வணக்கம் ${business.name}, ${about ? `${about} – ` : ''}கிணறு வேலை பற்றி விவரம் வேண்டும். ` +
      `(Hi, I need details about open well work${about ? ` – ${about}` : ''}.)`,
  )
export const waLink = (num = business.whatsapp[0], about = '') =>
  `https://wa.me/91${num}?text=${waMessage(about)}`
export const formatPhone = (num) => `+91 ${num.slice(0, 5)} ${num.slice(5)}`
