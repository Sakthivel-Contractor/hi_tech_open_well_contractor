// What changes the cost of open well work, shown on /cost-guide.
// Only physical factors that are true for every job are listed here. No rupee figures are
// published until the owner provides real ones: fill `priceRanges` below to show them.
const both = (ta, en) => ({ ta, en })

export const costFactors = [
  {
    title: both('மண்ணா, பாறையா', 'Soil or rock'),
    text: both(
      'மண்ணில் வெட்டுவதை விட கடினமான பாறையில் வெட்ட அதிக நேரமும் இயந்திர வேலையும் தேவை.',
      'Digging through hard rock takes more time and machine work than digging through soil.',
    ),
  },
  {
    title: both('ஆழம்', 'Depth'),
    text: both(
      'உங்கள் இடத்தின் நீர்மட்டத்தைப் பொறுத்து எவ்வளவு ஆழம் வெட்ட வேண்டும் என்பது மாறும். ஆழம் கூடக் கூட வேலையும் கூடும்.',
      'How deep the well must go depends on the water level at your site. The deeper it goes, the more work it takes.',
    ),
  },
  {
    title: both('அகலம் (விட்டம்)', 'Width (diameter)'),
    text: both(
      'அகலமான கிணற்றுக்கு அதிக மண் மற்றும் பாறையை அகற்ற வேண்டும்; சுற்றுச்சுவரும் நீளமாகும்.',
      'A wider well means more soil and rock to remove, and a longer ring wall.',
    ),
  },
  {
    title: both('சுற்றுச்சுவர்', 'Ring wall'),
    text: both(
      'சுவர் தேவையா, கல்லா கான்கிரீட்டா, எவ்வளவு உயரம் என்பதைப் பொறுத்து செலவு மாறும்.',
      'Whether a wall is needed, whether it is stone or concrete, and how high it must be all change the cost.',
    ),
  },
  {
    title: both('பழைய கிணற்றின் நிலை', 'Condition of an old well'),
    text: both(
      'ஆழப்படுத்துதல் அல்லது தூர்வாருதலில், உள்ளே உள்ள சேறு, கற்களின் அளவும் பழைய சுவரின் நிலையும் வேலையை மாற்றும்.',
      'For deepening or desilting, the amount of silt and stone inside and the state of the old wall change the work.',
    ),
  },
  {
    title: both('இயந்திரம் வந்து சேர வழி', 'Access for machines'),
    text: both(
      'பொக்லைன் கிணறு இருக்கும் இடம் வரை வர பாதை இல்லையென்றால் கூடுதல் வேலை தேவைப்படும்.',
      'If the excavator cannot drive up to the well, extra work is needed to reach it.',
    ),
  },
  {
    title: both('கிணற்றில் உள்ள தண்ணீர்', 'Water in the well'),
    text: both(
      'கிணற்றில் தண்ணீர் அதிகமாக இருக்கும்போது ஆழப்படுத்துவதும் தூர்வாருவதும் கடினம்; நீர்மட்டம் குறைவாக உள்ள காலத்தில் வேலை எளிது.',
      'Deepening and desilting are harder when the well is full of water, and easier when the water level is low.',
    ),
  },
]

// Real price ranges from the owner, e.g.
//   { work: 'openwell', text: { ta: 'மண்ணில் ஒரு அடிக்கு ₹… முதல் ₹… வரை', en: 'Soil: ₹… to ₹… per foot' }, updated: '2026-11' }
// Leave empty until the owner confirms the figures; the section is hidden while it is empty.
export const priceRanges = []
