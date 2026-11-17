// How a job runs, shown on the About page and the cost guide.
// Drafted from what the site already states (free site visit, water point survey with a
// resistivity meter, poclain digging, stone or concrete ring walls). The owner should read it
// and correct any step that does not match how they actually work. Do not add timelines,
// payment terms or promises here unless the owner has confirmed them.
const both = (ta, en) => ({ ta, en })

export const processSteps = [
  {
    title: both('அழைக்கவும் அல்லது படிவம் அனுப்பவும்', 'Call, WhatsApp or send the form'),
    text: both(
      'உங்கள் ஊர், நிலம் எங்கே உள்ளது, என்ன வேலை வேண்டும் என்று சொல்லுங்கள். நாங்கள் திரும்ப அழைத்து வருகை நேரத்தை முடிவு செய்வோம்.',
      'Tell us your village, where the land is and what work you need. We call you back to fix a visit time.',
    ),
  },
  {
    title: both('இலவச இட ஆய்வு', 'Free site visit'),
    text: both(
      'உங்கள் நிலத்துக்கு வந்து மண், பாறை, பழைய கிணறு இருந்தால் அதன் நிலை, இயந்திரங்கள் வந்து சேர வழி ஆகியவற்றைப் பார்க்கிறோம்.',
      'We come to your land and look at the soil, the rock, any existing well, and how the machines can reach the spot.',
    ),
  },
  {
    title: both('நீர் புள்ளி ஆய்வு', 'Water point survey'),
    text: both(
      'புதிய கிணற்றுக்கு, ரெசிஸ்டிவிட்டி மீட்டர் மூலம் நிலத்தை ஆய்வு செய்து தண்ணீர் கிடைக்க அதிக வாய்ப்புள்ள இடத்தைத் தேர்வு செய்கிறோம்.',
      'For a new well, we survey the land with a resistivity meter and choose the point with the best chance of water.',
    ),
  },
  {
    title: both('திட்டம் பேசி முடிவு செய்தல்', 'Agree the plan'),
    text: both(
      'எந்த இடம், எவ்வளவு அகலம், சுற்றுச்சுவர் தேவையா என்பதை உங்களுடன் பேசி முடிவு செய்கிறோம்.',
      'We agree with you on the point, the width of the well and whether a ring wall is needed.',
    ),
  },
  {
    title: both('வெட்டுதல் / ஆழப்படுத்துதல்', 'Digging or deepening'),
    text: both(
      'பொக்லைன் இயந்திரம் மூலம் கிணற்றை வெட்டுகிறோம் அல்லது பழைய கிணற்றை ஆழப்படுத்துகிறோம்; தூர்வாரும் வேலையில் சேறு, கற்கள், செடிகளை அகற்றுகிறோம்.',
      'We dig the well, or deepen the old one, with an excavator (poclain). For desilting we clear out the silt, stones and plants.',
    ),
  },
  {
    title: both('சுற்றுச்சுவர்', 'Ring wall'),
    text: both(
      'பக்கங்கள் தளர்ந்த மண்ணாக இருந்தால், கிணறு இடிந்து விழாமல் இருக்க கல் அல்லது கான்கிரீட் சுற்றுச்சுவர் கட்டுகிறோம்.',
      'Where the sides are loose soil, we build a stone or concrete ring wall so the well does not cave in.',
    ),
  },
]
