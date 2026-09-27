// Service areas. Each district gets its own pre-rendered page at /:state/:district.
// Towns are listed as { en, ta } so they show in the page language.
const town = (en, ta) => ({ en, ta })

export const states = [
  {
    slug: 'tamil-nadu',
    name: { en: 'Tamil Nadu', ta: 'தமிழ்நாடு' },
    districts: [
      {
        slug: 'salem',
        name: { en: 'Salem', ta: 'சேலம்' },
        towns: [
          town('Attur', 'ஆத்தூர்'),
          town('Omalur', 'ஓமலூர்'),
          town('Mettur', 'மேட்டூர்'),
          town('Edappadi', 'எடப்பாடி'),
          town('Sankagiri', 'சங்ககிரி'),
          town('Vazhapadi', 'வாழப்பாடி'),
        ],
        note: {
          en: 'Salem has hard granite under much of its farmland. We plan the depth and width of every open well after checking the rock at your site.',
          ta: 'சேலம் பகுதியில் பல தோட்டங்களுக்கு அடியில் கடினமான கருங்கல் பாறை உள்ளது. உங்கள் இடத்தின் பாறையைப் பார்த்த பிறகே கிணற்றின் ஆழமும் அகலமும் முடிவு செய்கிறோம்.',
        },
      },
      {
        slug: 'namakkal',
        name: { en: 'Namakkal', ta: 'நாமக்கல்' },
        towns: [
          town('Tiruchengode', 'திருச்செங்கோடு'),
          town('Rasipuram', 'ராசிபுரம்'),
          town('Paramathi Velur', 'பரமத்தி வேலூர்'),
          town('Kumarapalayam', 'குமாரபாளையம்'),
          town('Mohanur', 'மோகனூர்'),
          town('Sendamangalam', 'சேந்தமங்கலம்'),
        ],
        note: {
          en: 'Namakkal is our home district. Our office is in Tiruchengode, so we can reach any village here quickly for a site visit.',
          ta: 'நாமக்கல் எங்கள் சொந்த மாவட்டம். எங்கள் அலுவலகம் திருச்செங்கோட்டில் உள்ளதால், இங்குள்ள எந்த ஊருக்கும் இட ஆய்வுக்கு விரைவாக வருகிறோம்.',
        },
      },
      {
        slug: 'karur',
        name: { en: 'Karur', ta: 'கரூர்' },
        towns: [
          town('Kulithalai', 'குளித்தலை'),
          town('Aravakurichi', 'அரவக்குறிச்சி'),
          town('Krishnarayapuram', 'கிருஷ்ணராயபுரம்'),
          town('Pugalur', 'புகழூர்'),
          town('Kadavur', 'கடவூர்'),
        ],
        note: {
          en: 'From the river belt near Kulithalai to the dry side around Aravakurichi, we dig new open wells and deepen old ones for farms across Karur.',
          ta: 'குளித்தலை ஆற்றுப் பகுதி முதல் அரவக்குறிச்சி வறண்ட பகுதி வரை, கரூர் மாவட்ட தோட்டங்களுக்கு புதிய கிணறு வெட்டுகிறோம், பழைய கிணறுகளை ஆழப்படுத்துகிறோம்.',
        },
      },
      {
        slug: 'dindigul',
        name: { en: 'Dindigul', ta: 'திண்டுக்கல்' },
        towns: [
          town('Palani', 'பழனி'),
          town('Oddanchatram', 'ஒட்டன்சத்திரம்'),
          town('Natham', 'நத்தம்'),
          town('Vedasandur', 'வேடசந்தூர்'),
          town('Nilakottai', 'நிலக்கோட்டை'),
          town('Batlagundu', 'வத்தலக்குண்டு'),
        ],
        note: {
          en: 'Vegetable and coconut farms around Palani and Oddanchatram need water all year. We help you choose the right spot and build a strong, lasting well.',
          ta: 'பழனி, ஒட்டன்சத்திரம் பகுதி காய்கறி மற்றும் தென்னந்தோப்புகளுக்கு ஆண்டு முழுவதும் தண்ணீர் தேவை. சரியான இடத்தைத் தேர்வு செய்து உறுதியான கிணறு அமைக்க உதவுகிறோம்.',
        },
      },
      {
        slug: 'madurai',
        name: { en: 'Madurai', ta: 'மதுரை' },
        towns: [
          town('Melur', 'மேலூர்'),
          town('Usilampatti', 'உசிலம்பட்டி'),
          town('Thirumangalam', 'திருமங்கலம்'),
          town('Vadipatti', 'வாடிப்பட்டி'),
          town('Peraiyur', 'பேரையூர்'),
        ],
        note: {
          en: 'In Madurai we dig open wells for farms and homes, and clean and deepen old wells that have gone dry.',
          ta: 'மதுரையில் தோட்டங்கள் மற்றும் வீடுகளுக்கு கிணறு வெட்டுகிறோம். வறண்டு போன பழைய கிணறுகளைச் சுத்தம் செய்து ஆழப்படுத்துகிறோம்.',
        },
      },
      {
        slug: 'tirunelveli',
        name: { en: 'Tirunelveli', ta: 'திருநெல்வேலி' },
        towns: [
          town('Palayamkottai', 'பாளையங்கோட்டை'),
          town('Ambasamudram', 'அம்பாசமுத்திரம்'),
          town('Cheranmahadevi', 'சேரன்மகாதேவி'),
          town('Nanguneri', 'நாங்குநேரி'),
          town('Valliyur', 'வள்ளியூர்'),
          town('Radhapuram', 'ராதாபுரம்'),
        ],
        note: {
          en: 'Rainfall and ground water change a lot across Tirunelveli district. We survey the land first, then dig at the point with the best chance of water.',
          ta: 'திருநெல்வேலி மாவட்டத்தில் இடத்துக்கு இடம் மழையும் நிலத்தடி நீரும் மாறுபடும். முதலில் நிலத்தை ஆய்வு செய்து, தண்ணீர் கிடைக்க அதிக வாய்ப்புள்ள இடத்தில் கிணறு வெட்டுகிறோம்.',
        },
      },
      {
        slug: 'virudhunagar',
        name: { en: 'Virudhunagar', ta: 'விருதுநகர்' },
        towns: [
          town('Sivakasi', 'சிவகாசி'),
          town('Aruppukottai', 'அருப்புக்கோட்டை'),
          town('Srivilliputhur', 'ஸ்ரீவில்லிபுத்தூர்'),
          town('Sattur', 'சாத்தூர்'),
          town('Tiruchuli', 'திருச்சுழி'),
        ],
        note: {
          en: 'Much of Virudhunagar is dry land. A well-placed open well, dug deep enough into the rock, gives a steady supply even in summer.',
          ta: 'விருதுநகரின் பெரும்பகுதி வறண்ட நிலம். சரியான இடத்தில், பாறைக்குள் போதுமான ஆழத்தில் வெட்டிய கிணறு கோடையிலும் தொடர்ந்து தண்ணீர் தரும்.',
        },
      },
      {
        slug: 'rajapalayam',
        name: { en: 'Rajapalayam', ta: 'ராஜபாளையம்' },
        towns: [
          town('Srivilliputhur', 'ஸ்ரீவில்லிபுத்தூர்'),
          town('Sethur', 'சேத்தூர்'),
          town('Sivagiri', 'சிவகிரி'),
          town('Watrap', 'வத்திராயிருப்பு'),
        ],
        note: {
          en: 'Near the Western Ghats foothills around Rajapalayam, we dig open wells for mango, coconut and vegetable farms.',
          ta: 'ராஜபாளையம் சுற்றியுள்ள மேற்குத் தொடர்ச்சி மலை அடிவாரத்தில், மா, தென்னை, காய்கறித் தோட்டங்களுக்கு கிணறு வெட்டுகிறோம்.',
        },
      },
      {
        slug: 'tenkasi',
        name: { en: 'Tenkasi', ta: 'தென்காசி' },
        towns: [
          town('Sankarankovil', 'சங்கரன்கோவில்'),
          town('Kadayanallur', 'கடையநல்லூர்'),
          town('Alangulam', 'ஆலங்குளம்'),
          town('Sengottai', 'செங்கோட்டை'),
          town('Puliyangudi', 'புளியங்குடி'),
          town('Surandai', 'சுரண்டை'),
        ],
        note: {
          en: 'From Sengottai to Sankarankovil, we take up new open wells, deepening and old well cleaning for farms across Tenkasi.',
          ta: 'செங்கோட்டை முதல் சங்கரன்கோவில் வரை, தென்காசி மாவட்ட தோட்டங்களுக்கு புதிய கிணறு, ஆழப்படுத்துதல், பழைய கிணறு சுத்தம் ஆகிய பணிகளைச் செய்கிறோம்.',
        },
      },
      {
        slug: 'chennai',
        name: { en: 'Chennai', ta: 'சென்னை' },
        towns: [
          town('Tambaram', 'தாம்பரம்'),
          town('Avadi', 'ஆவடி'),
          town('Poonamallee', 'பூந்தமல்லி'),
          town('Ambattur', 'அம்பத்தூர்'),
          town('Madhavaram', 'மாதவரம்'),
          town('Sholinganallur', 'சோழிங்கநல்லூர்'),
        ],
        note: {
          en: 'For homes, apartments and farmhouses in and around Chennai, we dig new wells and clean and deepen old ones.',
          ta: 'சென்னை மற்றும் சுற்றுப்புறங்களில் உள்ள வீடுகள், அடுக்குமாடி குடியிருப்புகள், பண்ணை வீடுகளுக்கு புதிய கிணறு வெட்டுகிறோம், பழைய கிணறுகளைச் சுத்தம் செய்து ஆழப்படுத்துகிறோம்.',
        },
      },
      {
        slug: 'dharmapuri',
        name: { en: 'Dharmapuri', ta: 'தர்மபுரி' },
        towns: [
          town('Harur', 'அரூர்'),
          town('Palacode', 'பாலக்கோடு'),
          town('Pennagaram', 'பென்னாகரம்'),
          town('Pappireddipatti', 'பாப்பிரெட்டிப்பட்டி'),
          town('Karimangalam', 'காரிமங்கலம்'),
          town('Nallampalli', 'நல்லம்பள்ளி'),
        ],
        note: {
          en: 'Dharmapuri has rocky, dry land in many places. Our crane and rock-cutting team can dig deep through hard rock safely.',
          ta: 'தர்மபுரியில் பல இடங்களில் பாறை நிறைந்த வறண்ட நிலம் உள்ளது. எங்கள் கிரேன் மற்றும் பாறை உடைக்கும் குழு கடினமான பாறையிலும் பாதுகாப்பாக ஆழமாக வெட்டும்.',
        },
      },
      {
        slug: 'krishnagiri',
        name: { en: 'Krishnagiri', ta: 'கிருஷ்ணகிரி' },
        towns: [
          town('Hosur', 'ஓசூர்'),
          town('Denkanikottai', 'தேன்கனிக்கோட்டை'),
          town('Uthangarai', 'ஊத்தங்கரை'),
          town('Pochampalli', 'போச்சம்பள்ளி'),
          town('Bargur', 'பர்கூர்'),
          town('Shoolagiri', 'சூளகிரி'),
        ],
        note: {
          en: 'From mango farms near Krishnagiri to plots around Hosur, we dig open wells that suit your land and water need.',
          ta: 'கிருஷ்ணகிரி மாந்தோப்புகள் முதல் ஓசூர் சுற்றியுள்ள மனைகள் வரை, உங்கள் நிலத்துக்கும் தண்ணீர் தேவைக்கும் ஏற்ற கிணறு வெட்டுகிறோம்.',
        },
      },
      {
        slug: 'theni',
        name: { en: 'Theni', ta: 'தேனி' },
        towns: [
          town('Periyakulam', 'பெரியகுளம்'),
          town('Bodinayakanur', 'போடிநாயக்கனூர்'),
          town('Cumbum', 'கம்பம்'),
          town('Andipatti', 'ஆண்டிபட்டி'),
          town('Uthamapalayam', 'உத்தமபாளையம்'),
          town('Chinnamanur', 'சின்னமனூர்'),
        ],
        note: {
          en: 'For farms in the Cumbum valley and around Andipatti, we dig new open wells and deepen old wells that no longer give enough water.',
          ta: 'கம்பம் பள்ளத்தாக்கு மற்றும் ஆண்டிபட்டி சுற்றுவட்டார தோட்டங்களுக்கு புதிய கிணறு வெட்டுகிறோம். போதிய தண்ணீர் தராத பழைய கிணறுகளை ஆழப்படுத்துகிறோம்.',
        },
      },
      {
        slug: 'sivaganga',
        name: { en: 'Sivaganga', ta: 'சிவகங்கை' },
        towns: [
          town('Karaikudi', 'காரைக்குடி'),
          town('Devakottai', 'தேவகோட்டை'),
          town('Manamadurai', 'மானாமதுரை'),
          town('Kalayarkoil', 'காளையார்கோவில்'),
          town('Tiruppattur', 'திருப்பத்தூர்'),
          town('Ilayangudi', 'இளையான்குடி'),
        ],
        note: {
          en: 'Sivaganga gets less rain than many districts. We check the ground first so your well is dug where water is most likely.',
          ta: 'பல மாவட்டங்களை விட சிவகங்கையில் மழை குறைவு. தண்ணீர் கிடைக்க அதிக வாய்ப்புள்ள இடத்தில் கிணறு வெட்ட, முதலில் நிலத்தை ஆய்வு செய்கிறோம்.',
        },
      },
      {
        slug: 'thoothukudi',
        name: { en: 'Thoothukudi', ta: 'தூத்துக்குடி' },
        towns: [
          town('Kovilpatti', 'கோவில்பட்டி'),
          town('Tiruchendur', 'திருச்செந்தூர்'),
          town('Srivaikuntam', 'ஸ்ரீவைகுண்டம்'),
          town('Ottapidaram', 'ஓட்டப்பிடாரம்'),
          town('Vilathikulam', 'விளாத்திகுளம்'),
          town('Sathankulam', 'சாத்தான்குளம்'),
        ],
        note: {
          en: 'From the dry belt around Kovilpatti to villages near the coast, we dig and clean open wells for farms and homes across Thoothukudi.',
          ta: 'கோவில்பட்டி வறண்ட பகுதி முதல் கடற்கரை ஊர்கள் வரை, தூத்துக்குடி மாவட்டம் முழுவதும் தோட்டங்கள் மற்றும் வீடுகளுக்கு கிணறு வெட்டி, சுத்தம் செய்கிறோம்.',
        },
      },
      {
        slug: 'erode',
        name: { en: 'Erode', ta: 'ஈரோடு' },
        towns: [
          town('Gobichettipalayam', 'கோபிசெட்டிபாளையம்'),
          town('Bhavani', 'பவானி'),
          town('Perundurai', 'பெருந்துறை'),
          town('Sathyamangalam', 'சத்தியமங்கலம்'),
          town('Anthiyur', 'அந்தியூர்'),
          town('Kodumudi', 'கொடுமுடி'),
        ],
        note: {
          en: 'We are close by from Tiruchengode, so we reach farms across Erode district quickly for site visits, well digging and well cleaning.',
          ta: 'திருச்செங்கோட்டிலிருந்து அருகில் இருப்பதால், ஈரோடு மாவட்டம் முழுவதும் இட ஆய்வு, கிணறு வெட்டுதல் மற்றும் தூர்வாருதலுக்கு விரைவாக வருகிறோம்.',
        },
      },
      {
        slug: 'coimbatore',
        name: { en: 'Coimbatore', ta: 'கோயம்புத்தூர்' },
        towns: [
          town('Mettupalayam', 'மேட்டுப்பாளையம்'),
          town('Annur', 'அன்னூர்'),
          town('Sulur', 'சூலூர்'),
          town('Karamadai', 'காரமடை'),
          town('Thondamuthur', 'தொண்டாமுத்தூர்'),
          town('Madukkarai', 'மதுக்கரை'),
        ],
        note: {
          en: 'From the foothills near Mettupalayam to the dry belts around Sulur, rock depth changes a lot from farm to farm, so we survey every site before we dig.',
          ta: 'மேட்டுப்பாளையம் அடிவாரம் முதல் சூலூர் சுற்றியுள்ள வறண்ட பகுதிகள் வரை, ஒவ்வொரு தோட்டத்திலும் பாறை ஆழம் மாறுபடும். அதனால் கிணறு வெட்டும் முன் ஒவ்வொரு இடத்தையும் ஆய்வு செய்கிறோம்.',
        },
      },
      {
        slug: 'pollachi',
        name: { en: 'Pollachi', ta: 'பொள்ளாச்சி' },
        towns: [
          town('Kinathukadavu', 'கிணத்துக்கடவு'),
          town('Anaimalai', 'ஆனைமலை'),
          town('Negamam', 'நெகமம்'),
          town('Kottur', 'கோட்டூர்'),
          town('Zamin Uthukuli', 'ஜமீன் ஊத்துக்குளி'),
        ],
        note: {
          en: 'Coconut farms around Pollachi need a steady water source all year. We help you pick the right point and depth for your open well.',
          ta: 'பொள்ளாச்சி தென்னந்தோப்புகளுக்கு ஆண்டு முழுவதும் நிலையான தண்ணீர் தேவை. உங்கள் கிணறுக்கு சரியான இடத்தையும் ஆழத்தையும் தேர்வு செய்ய உதவுகிறோம்.',
        },
      },
      {
        slug: 'tiruppur',
        name: { en: 'Tiruppur', ta: 'திருப்பூர்' },
        towns: [
          town('Avinashi', 'அவிநாசி'),
          town('Palladam', 'பல்லடம்'),
          town('Dharapuram', 'தாராபுரம்'),
          town('Kangeyam', 'காங்கேயம்'),
          town('Udumalaipettai', 'உடுமலைப்பேட்டை'),
          town('Uthukuli', 'ஊத்துக்குளி'),
        ],
        note: {
          en: 'In the dry blocks of Tiruppur, Kangeyam and Dharapuram, a proper water point survey saves you from digging a costly dry well.',
          ta: 'திருப்பூர், காங்கேயம், தாராபுரம் போன்ற வறண்ட பகுதிகளில், சரியான நீர் புள்ளி ஆய்வு செலவு மிகுந்த வறண்ட கிணறுகளைத் தவிர்க்க உதவும்.',
        },
      },
    ],
  },
  {
    slug: 'karnataka',
    name: { en: 'Karnataka', ta: 'கர்நாடகா' },
    districts: [
      {
        slug: 'bengaluru',
        name: { en: 'Bengaluru', ta: 'பெங்களூரு' },
        towns: [
          town('Hoskote', 'ஹொஸ்கோட்டே'),
          town('Devanahalli', 'தேவனஹள்ளி'),
          town('Anekal', 'ஆனேக்கல்'),
          town('Doddaballapur', 'தொட்டபள்ளாப்பூர்'),
          town('Nelamangala', 'நெலமங்களா'),
        ],
        note: {
          en: 'For farms, farmhouses and plots in and around Bengaluru, we dig open wells after a careful ground survey.',
          ta: 'பெங்களூரு மற்றும் சுற்றுப்புறங்களில் உள்ள தோட்டங்கள், பண்ணை வீடுகள், மனைகளுக்கு, கவனமான நில ஆய்வுக்குப் பிறகு கிணறு வெட்டுகிறோம்.',
        },
      },
    ],
  },
]

export const allDistricts = states.flatMap((s) =>
  s.districts.map((d) => ({ ...d, state: s, path: `/${s.slug}/${d.slug}` })),
)

export function findDistrict(stateSlug, districtSlug) {
  return allDistricts.find((d) => d.state.slug === stateSlug && d.slug === districtSlug)
}

export const districtPaths = allDistricts.map((d) => d.path)
