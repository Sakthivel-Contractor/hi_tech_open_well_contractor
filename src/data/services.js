// The five services. Each gets a pre-rendered page at /services/<slug>.
// `key` matches the service keys in i18n.js (name and short description) and the enquiry
// form's work types. Text is { ta, en }; lists are arrays of { ta, en }.
//
// Keep this text to what is true for every job. Do not add prices, depths, durations or
// promises here unless the business owner has confirmed them.
const both = (ta, en) => ({ ta, en })

export const services = [
  {
    key: 'openwell',
    slug: 'open-well-digging',
    metaDesc: both(
      'தமிழ்நாடு மற்றும் பெங்களூருவில் தோட்டங்கள், வீடுகள், மனைகளுக்கு புதிய கிணறு வெட்டுதல். வெட்டும் முன் இலவச இட ஆய்வு மற்றும் நீர் புள்ளி கணிப்பு.',
      'New open well digging for farms, homes and plots across Tamil Nadu and in Bengaluru, with a free site visit and water point survey before digging.',
    ),
    intro: [
      both(
        'தமிழ்நாடு முழுவதும் மற்றும் பெங்களூருவில் தோட்டங்கள், வீடுகள், மனைகளுக்கு புதிய கிணறு வெட்டுகிறோம். வேலை தொடங்கும் முன் உங்கள் நிலத்துக்கு வந்து, மண்ணையும் பாறையையும் பார்த்து, நீர் புள்ளி ஆய்வு செய்து எங்கே வெட்டலாம் என்று முடிவு செய்கிறோம்.',
        'We dig new open wells for farms, homes and plots across Tamil Nadu and in Bengaluru. Before any digging starts, we visit your land, look at the soil and rock, and run a water point survey to choose where to dig.',
      ),
      both(
        'கிணற்றின் அகலமும் ஆழமும் உங்கள் தண்ணீர் தேவை மற்றும் நிலத்தின் தன்மையைப் பொறுத்து இடத்திலேயே முடிவு செய்யப்படும். பக்கங்கள் தாங்க வேண்டிய இடங்களில் கல் அல்லது கான்கிரீட் சுற்றுச்சுவர் கட்டுகிறோம்.',
        'The width and depth of the well are decided at your site, based on how much water you need and what the ground is like. Where the sides need support, we build a stone or concrete ring wall.',
      ),
    ],
    when: [
      both('பயிர், தென்னை அல்லது காய்கறித் தோட்டத்துக்கு நிலையான தண்ணீர் வேண்டும்.', 'You need a steady water source for crops, coconut or vegetable farms.'),
      both('புதிய வீடு அல்லது பண்ணை வீடு கட்டுகிறீர்கள், சொந்தத் தண்ணீர் வேண்டும்.', 'You are building a house or farmhouse and want your own water.'),
      both('பழைய கிணற்றை சரிசெய்யவோ மேலும் ஆழப்படுத்தவோ முடியாது.', 'An old well cannot be repaired or deepened any further.'),
    ],
    factors: [
      both('மண்ணா, பாறையா: கடினமான பாறையில் வெட்ட மண்ணை விட அதிக நேரம் ஆகும்.', 'Soil or rock: digging through hard rock takes longer than soil.'),
      both('ஆழம்: உங்கள் இடத்தின் நீர்மட்டத்தைப் பொறுத்தது.', 'Depth: depends on the water level at your site.'),
      both('அகலம்: உங்கள் தண்ணீர் தேவை மற்றும் இட வசதியைப் பொறுத்தது.', 'Width: depends on the water you need and the space you have.'),
      both('வழி: பொக்லைன் இயந்திரம் அந்த இடத்துக்கு வந்து சேர பாதை வேண்டும்.', 'Access: the excavator needs a path to reach the spot.'),
      both('சுற்றுச்சுவர்: பக்கங்கள் தளர்ந்த மண்ணாக இருந்தால் தேவைப்படும்.', 'Ring wall: needed where the sides are loose soil.'),
    ],
  },
  {
    key: 'deepening',
    slug: 'well-deepening',
    metaDesc: both(
      'வறண்ட அல்லது தண்ணீர் குறைந்த பழைய கிணற்றை பொக்லைன் மூலம் ஆழப்படுத்துதல். ஆழப்படுத்துவது பயன் தருமா என்று முதலில் பார்த்துச் சொல்கிறோம்.',
      'Deepening dry or low-yield open wells with an excavator. We check the well and the rock first and tell you whether deepening is likely to help.',
    ),
    intro: [
      both(
        'பழைய கிணறு வறண்டு போனாலோ, தண்ணீர் குறைந்தாலோ, புதிய கிணறு வெட்டாமலேயே அதை ஆழப்படுத்தி மீண்டும் தண்ணீர் பெற முடியலாம். பொக்லைன் இயந்திரம் மூலம் உள்ள கிணற்றை மேலும் ஆழமாக்குகிறோம்.',
        'When an old well goes dry or gives less water, deepening it may bring the water back without digging a new well. We use an excavator (poclain) to take the existing well deeper.',
      ),
      both(
        'முதலில் கிணற்றையும் அடியில் உள்ள பாறையையும் பார்த்து, ஆழப்படுத்துவது பயன் தருமா என்று தெளிவாகச் சொல்கிறோம்.',
        'We look at the well and the rock at the bottom first, and tell you plainly whether deepening is likely to help.',
      ),
    ],
    when: [
      both('கோடையில் கிணறு வறண்டு போகிறது.', 'The well dries up in summer.'),
      both('ஆண்டுகளாக நீர்மட்டம் குறைந்துவிட்டது.', 'The water level has dropped over the years.'),
      both('மோட்டார் ஓட்டிய பிறகு தண்ணீர் மெதுவாகவே ஊறுகிறது.', 'Water seeps back slowly after pumping.'),
    ],
    factors: [
      both('கிணற்றின் தற்போதைய ஆழமும் அகலமும்.', 'The current depth and width of the well.'),
      both('அடியில் உள்ள பாறை.', 'The rock at the bottom.'),
      both('பழைய சுவரின் நிலை: பலவீனமான சுவரை முதலில் சரிசெய்ய வேண்டும்.', 'The condition of the wall: a weak wall has to be repaired first.'),
      both('பொக்லைன் வந்து சேர வழி.', 'Access for the excavator.'),
    ],
  },
  {
    key: 'wall',
    slug: 'well-ring-wall-construction',
    metaDesc: both(
      'கிணறு இடிந்து விழாமல் இருக்க கல் அல்லது கான்கிரீட் சுற்றுச்சுவர் கட்டுதல் மற்றும் பழைய கிணற்றுச் சுவர் சரிசெய்தல்.',
      'Stone or concrete ring walls for open wells, and repairs to old well walls, to stop the sides caving in and keep soil out of the water.',
    ),
    intro: [
      both(
        'சுற்றுச்சுவர் கிணற்றின் பக்கங்கள் இடிந்து விழாமல் தடுக்கிறது; மண்ணும் அழுக்கும் தண்ணீரில் கலக்காமல் காக்கிறது. புதிய கிணறுகளுக்கு கல் அல்லது கான்கிரீட் வளையச் சுவர் கட்டுகிறோம்; பழைய கிணறுகளின் சுவரைச் சரிசெய்கிறோம்.',
        'A ring wall stops the sides of an open well from caving in and keeps soil and dirt out of the water. We build stone or concrete ring walls for new wells and repair the walls of old ones.',
      ),
    ],
    when: [
      both('கிணற்றின் பக்கங்கள் தளர்ந்த மண் அல்லது சரளையாக உள்ளன.', 'The sides of the well are loose soil or gravel.'),
      both('பழைய சுவரின் சில பகுதிகள் உள்ளே விழுந்துவிட்டன.', 'Parts of an old wall have fallen in.'),
      both('மழை பெய்யும்போது மண் கிணற்றுக்குள் அடித்து வருகிறது.', 'Soil washes into the well when it rains.'),
    ],
    factors: [
      both('கல்லா, கான்கிரீட்டா.', 'Stone or concrete.'),
      both('கிணற்றின் விட்டமும் தேவையான சுவர் உயரமும்.', 'The diameter of the well and the height of wall needed.'),
      both('பழைய சுவர் இருந்தால் அதன் நிலை.', 'The condition of any old wall.'),
      both('பொருட்களும் இயந்திரங்களும் வந்து சேர வழி.', 'Access for materials and machines.'),
    ],
  },
  {
    key: 'cleaning',
    slug: 'well-desilting',
    metaDesc: both(
      'பழைய கிணற்றில் உள்ள சேறு, கற்கள், செடிகளை அகற்றி மீண்டும் தண்ணீர் ஊற வைக்கும் தூர்வாரும் பணி.',
      'Old well cleaning and desilting: silt, stones and plants cleared out so water can seep into the well again.',
    ),
    intro: [
      both(
        'ஆண்டுகள் செல்லச் செல்ல சேறு, கற்கள், இலைகள், செடிகள் பழைய கிணற்றை நிரப்பி தண்ணீர் ஊறுவதைத் தடுக்கின்றன. அவற்றை அகற்றி மீண்டும் தண்ணீர் ஊற வைக்கிறோம்; கிணறு காலியாக இருக்கும்போதே சுவரின் நிலையையும் பார்க்கிறோம்.',
        'Over the years, silt, stones, leaves and plants fill an old well and stop the water seeping in. We clear them out so the water can come back, and check the wall while the well is empty.',
      ),
    ],
    when: [
      both('சேறு நிரம்பி கிணற்றின் ஆழம் குறைந்துவிட்டது.', 'Silt has made the well shallow.'),
      both('சுவர்களில் செடிகளும் வேர்களும் வளர்ந்துள்ளன.', 'Plants and roots are growing on the walls.'),
      both('தண்ணீர் கலங்கலாக அல்லது துர்நாற்றத்துடன் உள்ளது.', 'The water looks muddy or smells bad.'),
    ],
    factors: [
      both('உள்ளே உள்ள சேறு மற்றும் கற்களின் அளவு.', 'How much silt and stone is inside.'),
      both('வேலை நேரத்தில் கிணற்றில் உள்ள தண்ணீரின் அளவு.', 'How much water is in the well at the time of work.'),
      both('கிணற்றின் ஆழமும் வந்து சேர வழியும்.', 'The depth of the well and access to it.'),
    ],
  },
  {
    key: 'survey',
    slug: 'water-point-survey',
    metaDesc: both(
      'கிணறு வெட்டும் முன் ரெசிஸ்டிவிட்டி மீட்டர் மூலம் நிலத்தடி நீர் ஆய்வு செய்து, தண்ணீர் கிடைக்க அதிக வாய்ப்புள்ள இடத்தைத் தேர்வு செய்தல்.',
      'Groundwater survey with a resistivity meter before you dig, to choose the point on your land with the best chance of water.',
    ),
    intro: [
      both(
        'கிணறு வெட்டும் முன் சரியான இடத்தைத் தேர்வு செய்வதுதான் மிக முக்கியமான படி. வெவ்வேறு ஆழங்களில் நிலம் மின்சாரத்தை எவ்வளவு தடுக்கிறது என்பதை அளக்கும் ரெசிஸ்டிவிட்டி மீட்டர் மூலம் உங்கள் நிலத்தை ஆய்வு செய்து, தண்ணீர் கிடைக்க அதிக வாய்ப்புள்ள இடத்தைக் கண்டறிகிறோம்.',
        'Choosing the right point is the most important step before digging. We survey your land with a resistivity meter, which measures how strongly the ground resists an electric current at different depths, to find the point with the best chance of water.',
      ),
      both(
        'ஆய்வு வறண்ட கிணறு வெட்டும் அபாயத்தைக் குறைக்கும்; ஆனால் தண்ணீர் கிடைக்கும் என்று உறுதி தர முடியாது. அளவீடுகள் என்ன காட்டுகின்றன என்று உங்களுக்குத் தெளிவாக விளக்குகிறோம்.',
        'A survey lowers the risk of digging a dry well, but it cannot promise water. We explain clearly what the readings show.',
      ),
    ],
    when: [
      both('எந்தப் புதிய கிணறும் வெட்டும் முன்.', 'Before digging any new well.'),
      both('நிலத்தில் முன்பு வெட்டிய கிணறு வறண்டு போயிருந்தால்.', 'When an earlier well on the land went dry.'),
      both('இரண்டு மூன்று இடங்களில் எதைத் தேர்வு செய்வது என்று தெரியாதபோது.', 'When you are choosing between two or three possible spots.'),
    ],
    // For the survey this list is "what we check" rather than what changes the work.
    factorsTitle: both('ஆய்வில் நாங்கள் பார்ப்பவை', 'What we check'),
    factors: [
      both('நிலம் முழுவதும் மண் மற்றும் பாறையின் தன்மை.', 'The soil and rock across your land.'),
      both('தேர்வு செய்த இடங்களில் ரெசிஸ்டிவிட்டி அளவீடுகள்.', 'Resistivity readings at the shortlisted points.'),
      both('வெட்டும் இயந்திரங்கள் வந்து சேர வழி.', 'Access for the digging machines.'),
    ],
  },
]

export const servicePath = (service) => `/services/${service.slug}`
export const servicePaths = services.map(servicePath)
export const findService = (slug) => services.find((s) => s.slug === slug)
export const serviceByKey = (key) => services.find((s) => s.key === key)
