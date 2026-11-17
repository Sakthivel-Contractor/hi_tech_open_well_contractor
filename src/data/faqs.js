// Questions and answers shown as normal page text (no FAQPage structured data: Google stopped
// showing FAQ rich results in May 2026, so it adds nothing). `pages` says where each one shows:
// 'home', 'cost', or a service key from services.js.
//
// Answers stay within what the site already states. Do not add numbers (price, depth, days)
// or promises unless the owner has confirmed them.
const both = (ta, en) => ({ ta, en })

export const faqs = [
  {
    pages: ['home', 'survey'],
    q: both('இட ஆய்வுக்குக் கட்டணம் உண்டா?', 'Do you charge for the site visit?'),
    a: both(
      'இல்லை. இட ஆய்வும் நீர் புள்ளி கணிப்பும் இலவசம். அழைக்கவும் அல்லது படிவம் அனுப்பவும்; வருகை நேரத்தை முடிவு செய்வோம்.',
      'No. The site visit and water point survey are free. Call us or send the form and we will fix a visit time.',
    ),
  },
  {
    pages: ['home', 'survey', 'openwell'],
    q: both('கிணறு எங்கே வெட்ட வேண்டும் என்று எப்படி முடிவு செய்கிறீர்கள்?', 'How do you decide where to dig?'),
    a: both(
      'நிலத்தை நேரில் பார்த்து, ரெசிஸ்டிவிட்டி மீட்டர் மூலம் வெவ்வேறு இடங்களில் அளவீடு எடுத்து, தண்ணீர் கிடைக்க அதிக வாய்ப்புள்ள இடத்தைத் தேர்வு செய்கிறோம்.',
      'We look at the land and take resistivity meter readings at different points, then choose the point with the best chance of water.',
    ),
  },
  {
    pages: ['home', 'survey', 'openwell'],
    q: both('தண்ணீர் கிடைக்கும் என்று உறுதி தர முடியுமா?', 'Can you guarantee water?'),
    a: both(
      'நிலத்தடி நீருக்கு யாராலும் உறுதி தர முடியாது. ஆய்வு வறண்ட கிணறு வெட்டும் அபாயத்தைக் குறைக்கும்; அளவீடுகள் என்ன காட்டுகின்றன என்று தெளிவாகச் சொல்கிறோம்.',
      'Nobody can guarantee groundwater. A survey lowers the risk of a dry well, and we tell you plainly what the readings show.',
    ),
  },
  {
    pages: ['openwell', 'cost'],
    q: both('கிணறு எவ்வளவு ஆழம் வெட்ட வேண்டும்?', 'How deep will my well be?'),
    a: both(
      'உங்கள் இடத்தின் நீர்மட்டமும் பாறையும்தான் ஆழத்தை முடிவு செய்யும். இட ஆய்வுக்குப் பிறகு உங்கள் இடத்துக்கு ஏற்ற ஆழத்தைப் பற்றிப் பேசுவோம்.',
      'The water level and the rock at your site decide the depth. After the site visit we talk through the depth that suits your land.',
    ),
  },
  {
    pages: ['home', 'cost'],
    q: both('கிணறு வெட்ட எவ்வளவு செலவாகும்?', 'How much does an open well cost?'),
    a: both(
      'மண்ணா பாறையா, ஆழம், அகலம், சுற்றுச்சுவர், இயந்திரம் வந்து சேர வழி ஆகியவற்றைப் பொறுத்து செலவு மாறும். அதனால் ஒரே விலை சொல்ல முடியாது. இலவச இட ஆய்வுக்குப் பிறகு உங்கள் இடத்துக்கான செலவைப் பேசலாம்.',
      'It depends on soil or rock, depth, width, the ring wall and access for the machines, so there is no single price. After the free site visit we can talk about the cost for your site.',
    ),
  },
  {
    pages: ['deepening', 'openwell'],
    q: both('பழைய கிணற்றை ஆழப்படுத்தலாமா, புதிய கிணறு வெட்டலாமா?', 'Should I deepen my old well or dig a new one?'),
    a: both(
      'அது பழைய கிணற்றின் சுவர், அடியில் உள்ள பாறை, அந்த இடத்தின் நீர்மட்டம் ஆகியவற்றைப் பொறுத்தது. கிணற்றைப் பார்த்த பிறகு எது பயன் தரும் என்று சொல்கிறோம்.',
      'It depends on the old wall, the rock at the bottom and the water level at that spot. We look at the well and tell you which is likely to work.',
    ),
  },
  {
    pages: ['wall', 'openwell'],
    q: both('சுற்றுச்சுவர் ஏன் தேவை?', 'Why build a ring wall?'),
    a: both(
      'தளர்ந்த மண் அல்லது சரளை உள்ள இடங்களில், சுவர் கிணற்றின் பக்கங்கள் இடிந்து விழாமல் தடுக்கிறது; மழையில் மண் தண்ணீரில் கலக்காமலும் காக்கிறது.',
      'Where the sides are loose soil or gravel, the wall stops them caving in and keeps soil from washing into the water when it rains.',
    ),
  },
  {
    pages: ['deepening', 'cleaning', 'cost'],
    q: both('ஆழப்படுத்த, தூர்வார எந்தக் காலம் நல்லது?', 'When is the best time to deepen or desilt a well?'),
    a: both(
      'கிணற்றில் நீர்மட்டம் குறைவாக உள்ள வறண்ட மாதங்களில் வேலை எளிது. உங்கள் கிணற்றின் நிலையைப் பொறுத்து நேரத்தைப் பேசி முடிவு செய்யலாம்.',
      'The work is easier in the dry months when the water in the well is low. We can agree a time based on your well.',
    ),
  },
  {
    pages: ['cleaning'],
    q: both('தூர்வாரும்போது சுவரையும் பார்ப்பீர்களா?', 'Do you check the wall while desilting?'),
    a: both(
      'ஆம். கிணறு காலியாக இருக்கும்போதே சுவரின் நிலையைப் பார்த்து, சரிசெய்ய வேண்டியிருந்தால் சொல்கிறோம்.',
      'Yes. While the well is empty we look at the wall and tell you if it needs repair.',
    ),
  },
  {
    pages: ['home'],
    q: both('எந்தப் பகுதிகளுக்கு வருகிறீர்கள்?', 'Which areas do you cover?'),
    a: both(
      'திருச்செங்கோட்டை மையமாகக் கொண்டு தமிழ்நாட்டின் பல மாவட்டங்களுக்கும் பெங்களூருவுக்கும் வருகிறோம். பகுதிகள் பட்டியலில் உங்கள் மாவட்டத்தைப் பாருங்கள், அல்லது அழைத்துக் கேளுங்கள்.',
      'We are based in Tiruchengode and travel to many Tamil Nadu districts and to Bengaluru. Look for your district in the areas list, or call and ask.',
    ),
  },
]

export const faqsFor = (page) => faqs.filter((f) => f.pages.includes(page))
