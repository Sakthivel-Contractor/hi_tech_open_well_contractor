import { ref } from 'vue'

// The site opens in Tamil: pages are pre-rendered in Tamil and English is applied
// in the browser when the visitor picks it (the choice is remembered).
export const DEFAULT_LANG = 'ta'
export const lang = ref(DEFAULT_LANG)

const STORAGE_KEY = 'lang'

export function initLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'ta' || saved === 'en') setLang(saved)
  } catch {
    // storage blocked: stay on the default language
  }
}

export function setLang(value) {
  lang.value = value
  if (typeof document !== 'undefined') document.documentElement.lang = value
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // ignore
  }
}

export const messages = {
  en: {
    tagline: 'Digging deep for water you can count on, for 40 years',
    skipToContent: 'Skip to content',
    nav: { home: 'Home', services: 'Services', areas: 'Areas', contact: 'Contact' },
    langToggleLabel: 'Switch language',
    a11y: { keyFacts: 'Key facts', breadcrumb: 'Breadcrumb', mainNav: 'Main' },

    heroTitle: 'Open well digging you can trust',
    heroTamilLine: 'நம்பகமான கிணறு வெட்டும் சேவை',
    heroBadge: 'Free site visit & water point survey',
    heroText:
      'New open wells, well deepening, wall construction and old well cleaning for farms and homes across Tamil Nadu and Bengaluru.',
    heroCta: 'Book free site visit',
    callUs: 'Call us',

    stats: { years: 'Years in business', wells: 'Wells completed', states: 'States served' },

    servicesTitle: 'Our services',
    servicesIntro: 'One team for the full job, from finding water to fixing an old well.',
    services: {
      openwell: {
        name: 'New open well digging',
        desc: 'New open wells dug to the right size and depth for farms, homes and plots.',
      },
      deepening: {
        name: 'Well deepening',
        desc: 'Old wells dug deeper with an excavator to reach more water.',
      },
      wall: {
        name: 'Well wall construction',
        desc: 'Strong stone or concrete ring walls built around the well to stop it caving in.',
      },
      cleaning: {
        name: 'Old well cleaning & desilting',
        desc: 'Silt, stones and plants cleared from old wells so the water flows again.',
      },
      survey: {
        name: 'Water point survey',
        desc: 'Ground survey with a resistivity meter to choose the best point before you dig.',
      },
    },

    areasTitle: 'Where we work',
    areasIntro: 'Based in Tiruchengode. We travel to farms and homes in these districts.',
    areasMore: 'We also work in all other districts of Tamil Nadu.',

    galleryTitle: 'Work sites',
    lightbox: { close: 'Close', prev: 'Previous photo', next: 'Next photo' },

    enquiryTitle: 'Book a free site visit',
    enquiryIntro: 'Tell us where you are. We will call you back and fix a time to visit.',

    reviews: {
      title: 'What our customers say',
      comingSoon: 'Our customer reviews are coming soon',
      count: '{n} reviews',
      countOne: '1 review',
      starsLabel: '{n} out of 5 stars',
      rateUs: 'Rate us on Google',
      listLabel: 'Customer reviews',
      sample: 'Sample',
    },

    cta: {
      title: 'Planning a new well?',
      text: 'Call us today for a free site visit. We will check your land and tell you the best point and depth.',
      whatsapp: 'WhatsApp us',
    },

    form: {
      name: 'Name',
      namePlaceholder: 'Your name',
      phone: 'Mobile number',
      phonePlaceholder: '10-digit mobile number',
      district: 'District',
      districtPlaceholder: 'Select your district',
      otherDistrict: 'Other Tamil Nadu district',
      work: 'Type of work',
      message: 'Message (optional)',
      messagePlaceholder: 'Village, land size, depth of nearby wells, anything else',
      works: {
        openwell: 'New open well digging',
        deepening: 'Well deepening',
        wall: 'Well wall construction',
        cleaning: 'Old well cleaning & desilting',
        survey: 'Water point survey',
      },
      submit: 'Send enquiry',
      sending: 'Sending...',
      privacyLine: 'We use your number only to call you back.',
      errNameRequired: 'Please enter your name.',
      errPhone: 'Please enter a valid 10-digit mobile number.',
      errDistrict: 'Please select your district.',
      success: 'Thanks! We will call you today.',
      another: 'Send another enquiry',
      error: 'Sorry, the enquiry could not be sent. Please call us on {phone}.',
      notConfigured: 'The enquiry form is not set up yet. Please call us on {phone}.',
    },

    footer: {
      address: 'Address',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      email: 'Email',
      quickLinks: 'Quick links',
      services: 'Services',
      contact: 'Contact',
      privacy: 'Privacy policy',
      rights: 'All rights reserved.',
    },

    mobileBar: { call: 'Call now', whatsapp: 'WhatsApp' },
    whatsappFloat: 'Chat on WhatsApp',

    district: {
      title: 'Open well digging in {district}',
      tamilTitle: '{districtTa} பகுதியில் கிணறு வெட்டுதல்',
      intro:
        'HI Tech Open Well Contractor digs new open wells, deepens and cleans old wells and builds well walls in {district}, {state}. We have over 40 years of experience and more than 400 wells completed.',
      servicesHere: 'Services in {district}',
      nearby: 'Towns we cover near {district}',
      enquiry: 'Enquiry for {district}',
      otherAreas: 'Other areas',
    },

    contact: {
      title: 'Contact us',
      intro: 'Call or WhatsApp us for a free site visit. You can also send the form below.',
      map: 'Open in Google Maps',
      office: 'Office',
    },

    privacy: {
      title: 'Privacy policy',
      updated: 'Last updated: September 2026',
      body: [
        'This website has one enquiry form. When you send it, we receive your name, mobile number, district, the type of work you need, and any message you type.',
        'We use these details only to call you back about your enquiry. We do not sell, share or rent your details to anyone, and we do not send marketing messages.',
        'The form is delivered to our email through Web3Forms, a form delivery service. They process the details only to deliver the email to us.',
        'This website does not use tracking or advertising cookies. Your language choice (English or Tamil) is saved only in your own browser.',
        'To ask us to delete your details, call us or email us using the contact details below.',
      ],
    },

    notFound: { title: 'Page not found', back: 'Go to home page' },

    meta: {
      homeTitle: 'HI Tech Open Well Contractor | Open Well Digging, Tiruchengode',
      homeDesc:
        'Open well digging, well deepening, wall construction, old well cleaning and water point survey in Tamil Nadu and Bengaluru. 40+ years, 400+ wells. Free site visit. Call +91 95850 85036.',
      districtTitle: 'Open Well Digging in {district}, {state} | HI Tech Open Well Contractor',
      districtDesc:
        'Open well digging, well deepening and old well cleaning in {district} and nearby {towns}. Free site visit and water point survey. 40+ years experience. Call +91 95850 85036.',
      contactTitle: 'Contact | HI Tech Open Well Contractor',
      contactDesc:
        'Call or WhatsApp HI Tech Open Well Contractor, Tiruchengode, for open well work. Phone +91 95850 85036 or +91 63741 14224.',
      privacyTitle: 'Privacy Policy | HI Tech Open Well Contractor',
      privacyDesc:
        'How HI Tech Open Well Contractor uses the details you send through the enquiry form: only to call you back.',
      notFoundTitle: 'Page not found | HI Tech Open Well Contractor',
    },
  },

  ta: {
    tagline: '40 ஆண்டுகளாக நம்பிக்கையான தண்ணீருக்காக ஆழமாக தோண்டுகிறோம்',
    skipToContent: 'உள்ளடக்கத்துக்குச் செல்',
    nav: { home: 'முகப்பு', services: 'சேவைகள்', areas: 'பகுதிகள்', contact: 'தொடர்பு' },
    langToggleLabel: 'மொழியை மாற்று',
    a11y: { keyFacts: 'முக்கிய தகவல்கள்', breadcrumb: 'பக்க வழி', mainNav: 'முதன்மை மெனு' },

    heroTitle: 'நம்பகமான கிணறு வெட்டும் சேவை',
    heroTamilLine: 'Open well digging you can trust',
    heroBadge: 'இலவச இட ஆய்வு & நீர் புள்ளி கணிப்பு',
    heroText:
      'புதிய கிணறு வெட்டுதல், ஆழப்படுத்துதல், சுற்றுச்சுவர் கட்டுதல், பழைய கிணறு தூர்வாருதல் – தமிழ்நாடு மற்றும் பெங்களூரு முழுவதும்.',
    heroCta: 'இலவச இட ஆய்வுக்கு பதிவு செய்க',
    callUs: 'அழைக்கவும்',

    stats: { years: 'ஆண்டு அனுபவம்', wells: 'கிணறுகள் முடித்தவை', states: 'மாநிலங்களில் சேவை' },

    servicesTitle: 'எங்கள் சேவைகள்',
    servicesIntro: 'தண்ணீர் கண்டறிவது முதல் பழைய கிணற்றைச் சரிசெய்வது வரை, முழு வேலைக்கும் ஒரே குழு.',
    services: {
      openwell: {
        name: 'புதிய கிணறு வெட்டுதல்',
        desc: 'தோட்டம், வீடு, மனைகளுக்கு சரியான அளவு மற்றும் ஆழத்தில் புதிய கிணறு வெட்டுதல்.',
      },
      deepening: {
        name: 'கிணறு ஆழப்படுத்துதல்',
        desc: 'அதிக தண்ணீர் கிடைக்க, பழைய கிணற்றை பொக்லைன் மூலம் மேலும் ஆழப்படுத்துதல்.',
      },
      wall: {
        name: 'கிணறு சுற்றுச்சுவர் கட்டுதல்',
        desc: 'கிணறு இடிந்து விழாமல் இருக்க கல் அல்லது கான்கிரீட் வளையச் சுவர் கட்டுதல்.',
      },
      cleaning: {
        name: 'பழைய கிணறு தூர்வாருதல்',
        desc: 'பழைய கிணற்றில் உள்ள சேறு, கற்கள், செடிகளை அகற்றி மீண்டும் தண்ணீர் ஊற வைத்தல்.',
      },
      survey: {
        name: 'நிலத்தடி நீர் ஆய்வு',
        desc: 'கிணறு வெட்டும் முன் சிறந்த இடத்தைத் தேர்வு செய்ய ரெசிஸ்டிவிட்டி மீட்டர் மூலம் நில ஆய்வு.',
      },
    },

    areasTitle: 'நாங்கள் பணியாற்றும் பகுதிகள்',
    areasIntro: 'திருச்செங்கோட்டை மையமாகக் கொண்டு, இந்த மாவட்டங்களில் உள்ள தோட்டங்கள் மற்றும் வீடுகளுக்கு வருகிறோம்.',
    areasMore: 'தமிழ்நாட்டின் மற்ற எல்லா மாவட்டங்களிலும் பணிபுரிகிறோம்.',

    galleryTitle: 'பணி இடங்கள்',
    lightbox: { close: 'மூடு', prev: 'முந்தைய படம்', next: 'அடுத்த படம்' },

    enquiryTitle: 'இலவச இட ஆய்வுக்கு பதிவு செய்க',
    enquiryIntro: 'உங்கள் இடத்தைச் சொல்லுங்கள். நாங்கள் திரும்ப அழைத்து வருகை நேரத்தை முடிவு செய்வோம்.',

    reviews: {
      title: 'வாடிக்கையாளர் கருத்துகள்',
      comingSoon: 'எங்கள் வாடிக்கையாளர் கருத்துகள் விரைவில்',
      count: '{n} கருத்துகள்',
      countOne: '1 கருத்து',
      starsLabel: '5-க்கு {n} நட்சத்திரங்கள்',
      rateUs: 'Google-ல் எங்களை மதிப்பிடுங்கள்',
      listLabel: 'வாடிக்கையாளர் கருத்துகள்',
      sample: 'மாதிரி',
    },

    cta: {
      title: 'புதிய கிணறு வெட்ட திட்டமா?',
      text: 'இலவச இட ஆய்வுக்கு இன்றே அழையுங்கள். உங்கள் நிலத்தைப் பார்த்து, சிறந்த இடத்தையும் ஆழத்தையும் சொல்வோம்.',
      whatsapp: 'வாட்ஸ்அப் செய்ய',
    },

    form: {
      name: 'பெயர்',
      namePlaceholder: 'உங்கள் பெயர்',
      phone: 'கைபேசி எண்',
      phonePlaceholder: '10 இலக்க கைபேசி எண்',
      district: 'மாவட்டம்',
      districtPlaceholder: 'உங்கள் மாவட்டத்தைத் தேர்வு செய்க',
      otherDistrict: 'மற்ற தமிழ்நாடு மாவட்டம்',
      work: 'வேலை வகை',
      message: 'செய்தி (விருப்பம்)',
      messagePlaceholder: 'ஊர், நில அளவு, அருகிலுள்ள கிணறுகளின் ஆழம், மற்ற விவரங்கள்',
      works: {
        openwell: 'புதிய கிணறு வெட்டுதல்',
        deepening: 'கிணறு ஆழப்படுத்துதல்',
        wall: 'கிணறு சுற்றுச்சுவர் கட்டுதல்',
        cleaning: 'பழைய கிணறு தூர்வாருதல்',
        survey: 'நிலத்தடி நீர் ஆய்வு',
      },
      submit: 'அனுப்பு',
      sending: 'அனுப்புகிறது...',
      privacyLine: 'உங்கள் எண்ணை உங்களைத் திரும்ப அழைக்க மட்டுமே பயன்படுத்துவோம்.',
      errNameRequired: 'உங்கள் பெயரை உள்ளிடவும்.',
      errPhone: 'சரியான 10 இலக்க கைபேசி எண்ணை உள்ளிடவும்.',
      errDistrict: 'உங்கள் மாவட்டத்தைத் தேர்வு செய்யவும்.',
      success: 'நன்றி! இன்றே உங்களை அழைப்போம்.',
      another: 'மற்றொரு விசாரணை அனுப்ப',
      error: 'மன்னிக்கவும், அனுப்ப முடியவில்லை. தயவுசெய்து {phone} என்ற எண்ணில் அழைக்கவும்.',
      notConfigured: 'படிவம் இன்னும் அமைக்கப்படவில்லை. தயவுசெய்து {phone} என்ற எண்ணில் அழைக்கவும்.',
    },

    footer: {
      address: 'முகவரி',
      phone: 'தொலைபேசி',
      whatsapp: 'வாட்ஸ்அப்',
      email: 'மின்னஞ்சல்',
      quickLinks: 'விரைவு இணைப்புகள்',
      services: 'சேவைகள்',
      contact: 'தொடர்பு',
      privacy: 'தனியுரிமைக் கொள்கை',
      rights: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    },

    mobileBar: { call: 'இப்போது அழைக்க', whatsapp: 'வாட்ஸ்அப்' },
    whatsappFloat: 'வாட்ஸ்அப்பில் பேசுங்கள்',

    district: {
      title: '{districtTa} பகுதியில் கிணறு வெட்டுதல்',
      tamilTitle: 'Open well digging in {district}',
      intro:
        'HI Tech Open Well Contractor நிறுவனம் {stateTa}, {districtTa} பகுதியில் புதிய கிணறு வெட்டுதல், கிணறு ஆழப்படுத்துதல், சுற்றுச்சுவர் கட்டுதல், பழைய கிணறு தூர்வாருதல் ஆகிய பணிகளைச் செய்கிறது. 40 ஆண்டுகளுக்கு மேல் அனுபவம், 400-க்கும் மேற்பட்ட கிணறுகள் முடித்துள்ளோம்.',
      servicesHere: '{districtTa} பகுதியில் எங்கள் சேவைகள்',
      nearby: '{districtTa} அருகில் நாங்கள் வரும் ஊர்கள்',
      enquiry: '{districtTa} பகுதிக்கான விசாரணை',
      otherAreas: 'மற்ற பகுதிகள்',
    },

    contact: {
      title: 'தொடர்பு கொள்ள',
      intro: 'இலவச இட ஆய்வுக்கு அழைக்கவும் அல்லது வாட்ஸ்அப் செய்யவும். கீழே உள்ள படிவத்தையும் அனுப்பலாம்.',
      map: 'Google Maps-ல் திறக்க',
      office: 'அலுவலகம்',
    },

    privacy: {
      title: 'தனியுரிமைக் கொள்கை',
      updated: 'கடைசியாகப் புதுப்பித்தது: செப்டம்பர் 2026',
      body: [
        'இந்த இணையதளத்தில் ஒரே ஒரு விசாரணைப் படிவம் உள்ளது. நீங்கள் அனுப்பும்போது உங்கள் பெயர், கைபேசி எண், மாவட்டம், வேலை வகை, நீங்கள் எழுதும் செய்தி ஆகியவை எங்களுக்குக் கிடைக்கும்.',
        'இந்த விவரங்களை உங்கள் விசாரணை குறித்து உங்களைத் திரும்ப அழைக்க மட்டுமே பயன்படுத்துவோம். யாருக்கும் விற்கவோ பகிரவோ மாட்டோம். விளம்பரச் செய்திகள் அனுப்ப மாட்டோம்.',
        'படிவம் Web3Forms என்ற சேவை மூலம் எங்கள் மின்னஞ்சலுக்கு வருகிறது. அவர்கள் அந்த மின்னஞ்சலை எங்களுக்கு அனுப்ப மட்டுமே விவரங்களைப் பயன்படுத்துகிறார்கள்.',
        'இந்த இணையதளம் கண்காணிப்பு அல்லது விளம்பர குக்கீகளைப் பயன்படுத்துவதில்லை. உங்கள் மொழித் தேர்வு (ஆங்கிலம் அல்லது தமிழ்) உங்கள் உலாவியில் மட்டுமே சேமிக்கப்படும்.',
        'உங்கள் விவரங்களை நீக்கச் சொல்ல, கீழே உள்ள தொடர்பு விவரங்கள் மூலம் எங்களை அழைக்கவும் அல்லது மின்னஞ்சல் அனுப்பவும்.',
      ],
    },

    notFound: { title: 'பக்கம் கிடைக்கவில்லை', back: 'முகப்புப் பக்கத்துக்குச் செல்' },

    meta: {
      homeTitle: 'HI Tech Open Well Contractor | கிணறு வெட்டுதல், திருச்செங்கோடு',
      homeDesc:
        'தமிழ்நாடு மற்றும் பெங்களூருவில் புதிய கிணறு வெட்டுதல், ஆழப்படுத்துதல், சுற்றுச்சுவர் கட்டுதல், பழைய கிணறு தூர்வாருதல், நிலத்தடி நீர் ஆய்வு. 40+ ஆண்டு அனுபவம், 400+ கிணறுகள். இலவச இட ஆய்வு. அழைக்க +91 95850 85036.',
      districtTitle: '{districtTa} பகுதியில் கிணறு வெட்டுதல் | HI Tech Open Well Contractor',
      districtDesc:
        '{districtTa} மற்றும் அருகிலுள்ள {townsTa} பகுதிகளில் கிணறு வெட்டுதல், ஆழப்படுத்துதல், பழைய கிணறு தூர்வாருதல். இலவச இட ஆய்வு, நீர் புள்ளி ஆய்வு. 40+ ஆண்டு அனுபவம். அழைக்க +91 95850 85036.',
      contactTitle: 'தொடர்பு | HI Tech Open Well Contractor',
      contactDesc:
        'கிணறு வெட்டும் வேலைக்கு திருச்செங்கோடு HI Tech Open Well Contractor-ஐ அழைக்கவும் அல்லது வாட்ஸ்அப் செய்யவும். +91 95850 85036, +91 63741 14224.',
      privacyTitle: 'தனியுரிமைக் கொள்கை | HI Tech Open Well Contractor',
      privacyDesc:
        'விசாரணைப் படிவம் மூலம் நீங்கள் அனுப்பும் விவரங்களை HI Tech Open Well Contractor உங்களைத் திரும்ப அழைக்க மட்டுமே பயன்படுத்துகிறது.',
      notFoundTitle: 'பக்கம் கிடைக்கவில்லை | HI Tech Open Well Contractor',
    },
  },
}

function lookup(dict, key) {
  return key.split('.').reduce((obj, part) => (obj == null ? undefined : obj[part]), dict)
}

function fill(value, vars) {
  if (typeof value === 'string' && vars) {
    value = value.replace(/\{(\w+)\}/g, (_, name) => (vars[name] ?? `{${name}}`))
  }
  return value
}

// t('form.error', { phone }) -> string (or array/object for list entries)
export function t(key, vars) {
  let value = lookup(messages[lang.value], key)
  if (value === undefined) value = lookup(messages.en, key)
  if (value === undefined) return key
  return fill(value, vars)
}

// Fixed-language lookup for SEO meta, which must stay stable in the pre-rendered HTML.
// Page meta uses the default language (Tamil); JSON-LD uses English.
export function tIn(language, key, vars) {
  const value = lookup(messages[language], key) ?? lookup(messages.en, key)
  return fill(value, vars)
}
export const tMeta = (key, vars) => tIn(DEFAULT_LANG, key, vars)
export const tEn = (key, vars) => tIn('en', key, vars)

// Pick the right language from a { en, ta } object.
export function pick(obj) {
  return obj?.[lang.value] ?? obj?.en ?? ''
}
