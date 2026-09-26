// Customer reviews. Only add real feedback, with the customer's permission.
//
// A review shows on the site once both `name` and `text` are filled; empty entries are ignored.
//   name      customer name, e.g. 'Ravi Kumar' or 'ரவி குமார்'
//   village   village or town
//   district  district, in English or Tamil (e.g. 'Salem' or 'சேலம்'). The review also shows
//             on that district's page.
//   work      type of work: 'openwell', 'borewell', 'repair', 'survey' (shown in the page
//             language), or any other text
//   rating    1 to 5 stars
//   text      what the customer said
//   date      when it was given, e.g. '2026-09' (kept for your records, not shown)
//   photo     optional customer photo, e.g. '/images/reviews/ravi.jpg' (small square photo).
//             Without one, a circle with the first letter of the name is shown.
//   isSample  true = demo review for showing the design, NOT a real customer. It gets a
//             "மாதிரி / Sample" badge, is never counted in the rating or review count, and is
//             hidden when VITE_SHOW_SAMPLE_REVIEWS=false. Delete the sample entries before going live.
//
// Any text field can be a plain string, or { ta: '...', en: '...' } to show a different text
// on the Tamil and English site.
const both = (ta, en) => ({ ta, en })

// Sample reviews show unless the build sets VITE_SHOW_SAMPLE_REVIEWS=false. When false,
// the build leaves the sample entries out of the site entirely.
export const showSampleReviews = import.meta.env.VITE_SHOW_SAMPLE_REVIEWS !== 'false'

// ---- SAMPLE reviews for the client demo (not real customers) ----
// (A function, so the build can drop it completely when samples are switched off.)
const samples = () => [
  {
    name: both('முருகன்', 'Murugan'),
    village: both('பொள்ளாச்சி', 'Pollachi'),
    district: '',
    work: both('புதிய கிணறு வெட்டுதல்', 'New open well'),
    rating: 5,
    text: both(
      'சொன்ன நாளில் வேலை ஆரம்பித்து, சொன்ன நேரத்தில் முடித்தார்கள். நல்ல தண்ணீர் கிடைத்தது.',
      'They started on the promised day and finished on time. We got good water.',
    ),
    date: '',
    photo: '',
    isSample: true,
  },
  {
    name: both('செல்வம்', 'Selvam'),
    village: both('சேலம்', 'Salem'),
    district: '',
    work: both('கிணறு ஆழப்படுத்துதல்', 'Well deepening'),
    rating: 5,
    text: both(
      'பழைய கிணறு வறண்டு போயிருந்தது. ஆழப்படுத்திய பிறகு கோடையிலும் தண்ணீர் இருக்கிறது.',
      'Our old well had gone dry. After deepening, it has water even in summer.',
    ),
    date: '',
    photo: '',
    isSample: true,
  },
  {
    name: both('ராமசாமி', 'Ramasamy'),
    village: both('மதுரை', 'Madurai'),
    district: '',
    work: both('சுற்றுச்சுவர் கட்டுதல்', 'Well wall construction'),
    rating: 5,
    text: both(
      'சுவர் உறுதியாக, சுத்தமாக கட்டித் தந்தார்கள். விலையும் நியாயமாக இருந்தது.',
      'They built a strong, neat wall. The price was fair.',
    ),
    date: '',
    photo: '',
    isSample: true,
  },
  {
    name: both('லட்சுமி', 'Lakshmi'),
    village: both('திருப்பூர்', 'Tiruppur'),
    district: '',
    work: both('பழைய கிணறு தூர்வாருதல்', 'Well desilting'),
    rating: 5,
    text: both(
      'ஒரே நாளில் சேறு எல்லாம் எடுத்து சுத்தம் செய்தார்கள். வேலை ஆட்கள் மரியாதையாக நடந்துகொண்டார்கள்.',
      'They cleaned out all the silt in one day. The workers were polite.',
    ),
    date: '',
    photo: '',
    isSample: true,
  },
  {
    name: both('கிருஷ்ணன்', 'Krishnan'),
    village: both('பெங்களூரு', 'Bengaluru'),
    district: '',
    work: both('நிலத்தடி நீர் ஆய்வு', 'Groundwater survey'),
    rating: 5,
    text: both(
      'இலவசமாக வந்து இடம் பார்த்து, எங்கே வெட்டலாம் என்று தெளிவாக சொன்னார்கள்.',
      'They came for a free visit and clearly told us where to dig.',
    ),
    date: '',
    photo: '',
    isSample: true,
  },
]

export const reviews = [
  ...(showSampleReviews ? samples() : []),

  // ---- Real customer reviews: fill these in ----
  { name: '', village: '', district: '', work: '', rating: 5, text: '', date: '', photo: '' },
  { name: '', village: '', district: '', work: '', rating: 5, text: '', date: '', photo: '' },
  { name: '', village: '', district: '', work: '', rating: 5, text: '', date: '', photo: '' },
  { name: '', village: '', district: '', work: '', rating: 5, text: '', date: '', photo: '' },
  { name: '', village: '', district: '', work: '', rating: 5, text: '', date: '', photo: '' },
]

// A field in the given language: plain strings are the same in both.
export function fieldIn(value, language) {
  if (value == null) return ''
  if (typeof value === 'string') return value.trim()
  return String(value[language] || value.en || value.ta || '').trim()
}
const filled = (r) => fieldIn(r.name, 'ta') && fieldIn(r.text, 'ta')

// Reviews that are ready to show: name and text filled in. Real ones first, then samples.
export const filledReviews = [
  ...reviews.filter((r) => !r.isSample && filled(r)),
  ...reviews.filter((r) => r.isSample && filled(r)),
]

const norm = (s) => String(s ?? '').trim().toLowerCase()

// Filled reviews for one district from areas.js (matches its slug, English or Tamil name).
export function reviewsForDistrict(district) {
  const names = [district.slug, district.name.en, district.name.ta].map(norm)
  const matches = (r) => ['ta', 'en'].some((l) => names.includes(norm(fieldIn(r.district, l))))
  return filledReviews.filter(matches)
}

// A valid 1-5 star rating, or null when the entry has none.
export function ratingOf(review) {
  const n = Number(review.rating)
  return review.rating !== '' && Number.isFinite(n) && n >= 1 ? Math.min(n, 5) : null
}

// { average, count } over the REAL reviews in the list (samples never count);
// average is null when none has a rating.
export function ratingSummary(list) {
  const real = list.filter((r) => !r.isSample)
  const ratings = real.map(ratingOf).filter((n) => n !== null)
  const average = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null
  return { average, count: real.length }
}
