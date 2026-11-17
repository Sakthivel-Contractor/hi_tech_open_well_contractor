// Customer reviews. Only add real feedback, with the customer's permission.
//
// A review shows on the site once both `name` and `text` are filled; empty entries are ignored.
//   name      customer name, e.g. 'Ravi Kumar' or 'ரவி குமார்'
//   village   village or town
//   district  district, in English or Tamil (e.g. 'Salem' or 'சேலம்'). The review also shows
//             on that district's page.
//   work      type of work: 'openwell', 'deepening', 'wall', 'cleaning', 'survey' (shown in the page
//             language), or any other text
//   rating    1 to 5 stars
//   text      what the customer said
//   date      when it was given, e.g. '2026-09' (kept for your records, not shown)
//   photo     optional customer photo, e.g. '/images/reviews/ravi.jpg' (small square photo).
//             Without one, a circle with the first letter of the name is shown.
//
// Any text field can be a plain string, or { ta: '...', en: '...' } to show a different text
// on the Tamil and English site; both('தமிழ்', 'English') is a shorthand for that.
const both = (ta, en) => ({ ta, en })

export const reviews = [
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

// Reviews that are ready to show: name and text filled in.
export const filledReviews = reviews.filter(filled)

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

// { average, count } over the reviews in the list; average is null when none has a rating.
export function ratingSummary(list) {
  const ratings = list.map(ratingOf).filter((n) => n !== null)
  const average = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null
  return { average, count: list.length }
}
