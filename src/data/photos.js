// Your photos, as optimised by scripts/optimize-images.mjs from public/images/.
// photos.json is generated: do not edit it, just add/replace files in public/images/.
import photos from '../generated/photos.json'

export const heroPhoto = photos.hero // { src, width, height } or null
export const ogImage = photos.og // '/optimized/og.<hash>.jpg' or null
export const workPhotos = photos.work // [{ name, src, tile, width, height }], sorted by number

// Service card photo by position in the services list (0 -> service-1.jpg), or null.
export const servicePhoto = (index) => photos.services[index + 1] ?? null

// Alt text per photo file name. A new work-N.jpg without an entry gets the default,
// so add a line here when you want a better description.
const alts = {
  hero: {
    ta: 'HI Tech – தோட்டத்தில் பழைய கல் கிணற்றை பொக்லைன் மூலம் ஆழப்படுத்தும் பணி',
    en: 'HI Tech – excavator deepening an old stone-lined well on a farm',
  },
  'service-1': {
    ta: 'HI Tech – நீண்ட கை பொக்லைன் மூலம் ஆழமான குழி தோண்டும் பணி',
    en: 'HI Tech – long-reach excavator digging a deep pit',
  },
  'service-2': {
    ta: 'HI Tech – புதிய கிணற்றுக்கு கல் வளையம் அமைக்கும் பணி',
    en: 'HI Tech – building the stone ring of a new open well',
  },
  'service-3': {
    ta: 'HI Tech – செடிகள் வளர்ந்த பழைய கிணற்றைச் சுத்தம் செய்யும் பணி',
    en: 'HI Tech – cleaning an old overgrown farm well',
  },
  'service-4': {
    ta: 'HI Tech – பணி இடத்தில் நீண்ட கை பொக்லைன் இயந்திரம்',
    en: 'HI Tech – long-reach excavator at a work site',
  },
  'work-1': {
    ta: 'HI Tech – தோட்டத்தில் சதுரப் பண்ணைக் குட்டை வெட்டும் பணி',
    en: 'HI Tech – digging a rectangular farm pond',
  },
  'work-2': {
    ta: 'HI Tech – தண்ணீர் வந்த புதிய கிணற்றில் பொக்லைன் பணி',
    en: 'HI Tech – excavator at a new well with water',
  },
  'work-3': {
    ta: 'HI Tech – கற்கள் நிறைந்த நிலத்தில் கிணறு வெட்டும் பணி',
    en: 'HI Tech – digging a well through rocky ground',
  },
  'work-4': {
    ta: 'HI Tech – கல் கிணற்றுக்குள் இறங்கி ஆழப்படுத்தும் பொக்லைன்',
    en: 'HI Tech – excavator inside a stone-lined well, deepening it',
  },
  'work-5': {
    ta: 'HI Tech – படிக்கட்டு வடிவில் சதுரக் கிணறு தோண்டும் பணி',
    en: 'HI Tech – digging a stepped square well',
  },
  'work-6': {
    ta: 'HI Tech – ஆழமான குழியில் நீண்ட கை பொக்லைன் பணி',
    en: 'HI Tech – long-reach excavator working in a deep pit',
  },
  'work-7': {
    ta: 'HI Tech – வயலில் நீண்ட கை பொக்லைன் மூலம் தோண்டும் பணி',
    en: 'HI Tech – long-reach excavator digging in a field',
  },
}
const defaultAlt = { ta: 'HI Tech – கிணறு வெட்டும் பணி', en: 'HI Tech – well digging work' }

// { ta, en } alt text for a photo file name (use with pick()).
export const photoAlt = (name) => alts[name] ?? defaultAlt
