// Daily Sacred Affirmations for Prayers, Devotion, and Inner Stillness
// Supports English & Tamil (தமிழ்) with exact, devotional, and inspiring translations.

export interface PrayerAffirmation {
  id: string;
  text: string;
  textTa: string;
  theme: string;
  themeTa: string;
  focus: string; // Spiritual contemplation theme
  focusTa: string;
}

export const dailyAffirmations: PrayerAffirmation[] = [
  {
    id: 'aff-1',
    text: 'I surrender my worries to the Divine. With every breath, I am filled with peace, vitality, and sacred grace.',
    textTa: 'எனது கவலைகள் அனைத்தையும் இறைவனின் பாதங்களில் சமர்ப்பிக்கிறேன். ஒவ்வொரு மூச்சிலும் அமைதியும், புத்துணர்ச்சியும், தெய்வீக அருளும் என்னை நிரப்புகின்றன.',
    theme: 'Divine Peace',
    themeTa: 'தெய்வீக அமைதி',
    focus: 'Shanti (Inner Peace)',
    focusTa: 'சாந்தி (மன அமைதி)',
  },
  {
    id: 'aff-2',
    text: 'Lord, grant me strength in my body and stillness in my mind. May my thoughts, words, and actions bring light today.',
    textTa: 'இறைவா, என் உடலுக்கு நல்ல வலிமையையும், என் மனதிற்கு ஆழ்ந்த அமைதியையும் தந்தருள். இன்றைய நாளில் எனது எண்ணங்களும், சொற்களும், செயல்களும் நன்மையை மட்டுமே பரப்பட்டும்.',
    theme: 'Morning Prayer',
    themeTa: 'காலை பிரார்த்தனை',
    focus: 'Samarpana (Surrender)',
    focusTa: 'சமர்ப்பணம் (முழு சரணாகதி)',
  },
  {
    id: 'aff-3',
    text: 'I am blessed, guided, and protected. I offer my devotion with a pure heart and receive infinite calm.',
    textTa: 'நான் இறைவனின் அருளாலும் வழிகாட்டலாலும் எப்போதும் பாதுகாக்கப்படுகிறேன். தூய இதயத்துடன் எனது பக்தியைச் செலுத்தி, எல்லையற்ற அமைதியைப் பெறுகிறேன்.',
    theme: 'Faith & Protection',
    themeTa: 'நம்பிக்கையும் பாதுகாப்பும்',
    focus: 'Bhakti (Pure Devotion)',
    focusTa: 'பக்தி (தூய பக்தி)',
  },
  {
    id: 'aff-4',
    text: 'Divine light guides my every step. My body is a sacred temple of health, strength, and honorable purpose.',
    textTa: 'தெய்வீக ஒளி எனது ஒவ்வொரு அடியையும் வழிநடத்துகிறது. என் உடல் நல்ல ஆரோக்கியமும், வலிமையும், உயர்ந்த நோக்கமும் கொண்ட ஒரு புனித ஆலயம்.',
    theme: 'Spiritual Vitality',
    themeTa: 'ஆன்மீக புத்துணர்ச்சி',
    focus: 'Tejas (Divine Radiance)',
    focusTa: 'தேஜஸ் (தெய்வீக ஒளி)',
  },
  {
    id: 'aff-5',
    text: "In quiet prayer, I find unshakeable strength. God's grace flows freely through every cell of my body.",
    textTa: 'அமைதியான பிரார்த்தனையில் நான் அசைக்க முடியாத வலிமையைப் பெறுகிறேன். இறைவனின் அருள் என் உடலின் ஒவ்வொரு அணுவிலும் தடையின்றிப் பாய்கிறது.',
    theme: 'Healing & Grace',
    themeTa: 'குணப்படுத்துதலும் அருளும்',
    focus: 'Kripa (Blessings)',
    focusTa: 'கிருபை (இறையருள்)',
  },
  {
    id: 'aff-6',
    text: 'May peace prevail within me and around me. I walk through this day with humility, courage, and prayerful gratitude.',
    textTa: 'எனக்குள்ளும் என்னைச் சுற்றிலும் அமைதி நிலவட்டும். பணிவு, துணிவு மற்றும் மனமார்ந்த பிரார்த்தனையுடன் இன்றைய நாளை நான் கடக்கிறேன்.',
    theme: 'Universal Peace',
    themeTa: 'அனைவருக்குமான அமைதி',
    focus: 'Om Shanti (Peace To All)',
    focusTa: 'ஓம் சாந்தி (எங்கும் அமைதி)',
  },
  {
    id: 'aff-7',
    text: 'I release all impatience and tension, trusting with an open heart that divine timing unfolds perfectly.',
    textTa: 'பதற்றத்தையும் அவசரத்தையும் நான் கைவிடுகிறேன்; இறைவனின் நேரம் மிகச் சரியான நேரத்தில் நன்மையை அருளும் என்று முழு மனதுடன் நம்புகிறேன்.',
    theme: 'Trust & Faith',
    themeTa: 'நம்பிக்கையும் பொறுமையும்',
    focus: 'Shraddha (Steadfast Faith)',
    focusTa: 'ஷ்ரத்தா (உறுதியான நம்பிக்கை)',
  },
  {
    id: 'aff-8',
    text: 'Every breath is a sacred gift. I bow in gratitude for my life, my family, and the nourishment that strengthens me.',
    textTa: 'ஒவ்வொரு மூச்சும் ஒரு புனிதமான வரம். என் வாழ்க்கைக்காகவும், குடும்பத்திற்காகவும், என்னை வலிமைப்படுத்தும் உணவுக்காகவும் தலைவணங்கி நன்றி கூறுகிறேன்.',
    theme: 'Gratitude Prayer',
    themeTa: 'நன்றி செலுத்தும் பிரார்த்தனை',
    focus: 'Kritajnata (Gratitude)',
    focusTa: 'கிருதக்ஞதா (நன்றியுணர்வு)',
  },
  {
    id: 'aff-9',
    text: 'I choose patience over anger, peace over noise, and faith over fear. Divine wisdom guides my choices today.',
    textTa: 'கோபத்திற்குப் பதில் பொறுமையையும், இரைச்சலுக்குப் பதில் அமைதியையும், பயத்திற்குப் பதில் நம்பிக்கையையும் தேர்ந்தெடுக்கிறேன். இறை ஞானம் என்னை வழிநடத்துகிறது.',
    theme: 'Calm Wisdom',
    themeTa: 'தெளிவான ஞானம்',
    focus: 'Viveka (Clear Discernment)',
    focusTa: 'விவேகம் (நல்ஞானம்)',
  },
  {
    id: 'aff-10',
    text: 'Almighty presence, cleanse my mind of doubts and bless my hands to do honest, righteous, and uplifting work.',
    textTa: 'எல்லாம் வல்ல இறைவா, என் மனதில் உள்ள சந்தேகங்களை அகற்றி, நேர்மையான, தர்மநெறி தவறாத, உயர்ந்த செயல்களைச் செய்ய என் கைகளை ஆசீர்வதியும்.',
    theme: 'Righteous Action',
    themeTa: 'தர்ம நெறிச் செயல்',
    focus: 'Karma Yoga (Selfless Action)',
    focusTa: 'கர்ம யோகம் (சுயநலமற்ற செயல்)',
  },
  {
    id: 'aff-11',
    text: 'I am rooted like a tree in divine trust. Winds may blow, but my soul remains anchored in stillness.',
    textTa: 'இறை நம்பிக்கையில் நான் ஆழமாக வேரூன்றிய மரத்தைப் போல நிற்கிறேன். எத்தகைய புயல் வீசினாலும், என் ஆன்மா அசைக்க முடியாத அமைதியில் நிலைத்திருக்கும்.',
    theme: 'Stillness in Storms',
    themeTa: 'புயலிலும் பேரமைதி',
    focus: 'Sthirata (Steadfast Calm)',
    focusTa: 'ஸ்திரதா (நிலைத்த அமைதி)',
  },
  {
    id: 'aff-12',
    text: 'May my heart stay gentle, my mind stay clear, and my devotion stay unwavering through all circumstances.',
    textTa: 'எந்தச் சூழ்நிலையிலும் என் இதயம் கனிவுடனும், என் மனம் தெளிவுடனும், எனது பக்தி அசைக்க முடியாத உறுதியுடனும் நிலைத்திருக்கட்டும்.',
    theme: 'Gentle Heart',
    themeTa: 'கனிவான இதயம்',
    focus: 'Karuna (Compassion)',
    focusTa: 'கருணை (அன்பும் இரக்கமும்)',
  },
  {
    id: 'aff-13',
    text: 'With every prayer, my spirit is renewed. Divine energy heals my muscles and restores my peace of mind.',
    textTa: 'ஒவ்வொரு பிரார்த்தனையிலும் என் ஆன்மா புத்துயிர் பெறுகிறது. தெய்வீக ஆற்றல் என் உடலின் தசைகளைக் குணப்படுத்தி, என் மன அமைதியை மீட்டெடுக்கிறது.',
    theme: 'Restoration',
    themeTa: 'புத்துயிர் பெறுதல்',
    focus: 'Prana (Vital Life Energy)',
    focusTa: 'பிராணன் (உயிர் சக்தி)',
  },
  {
    id: 'aff-14',
    text: 'I ask for the courage to grow, the humility to learn, and the devotion to serve with love today.',
    textTa: 'வளர்வதற்கான தைரியத்தையும், கற்றுக்கொள்வதற்கான பணிவையும், அன்புடன் பிறருக்கு சேவை செய்யும் பக்தியையும் இன்று எனக்கு அருள வேண்டுகிறேன்.',
    theme: 'Courage & Humility',
    themeTa: 'துணிவும் பணிவும்',
    focus: 'Seva (Selfless Devotion)',
    focusTa: 'சேவை (அன்புப் பணி)',
  },
  {
    id: 'aff-15',
    text: 'God is my refuge and my strength. I do not walk alone; the divine hand is always resting upon my shoulder.',
    textTa: 'இறைவனே எனது அடைக்கலம் மற்றும் என் பெரும் வலிமை. நான் தனியாக நடக்கவில்லை; இறைவனின் ஆசிர்வதிக்கப்பட்ட கை எப்போதும் என் தோள் மீது உள்ளது.',
    theme: 'Divine Guidance',
    themeTa: 'இறை வழிகாட்டல்',
    focus: 'Raksha (Divine Shelter)',
    focusTa: 'ரக்ஷா (இறைப் பாதுகாப்பு)',
  },
  {
    id: 'aff-16',
    text: 'I begin this day in sacred gratitude. My past is forgiven, my present is blessed, and my future is safe in God’s hands.',
    textTa: 'புனிதமான நன்றியுணர்வுடன் இன்றைய நாளைத் தொடங்குகிறேன். எனது கடந்த காலம் மன்னிக்கப்பட்டது; நிகழ்காலம் ஆசீர்வதிக்கப்பட்டது; எதிர்காலம் இறைவனின் கைகளில் பாதுகாப்பாக உள்ளது.',
    theme: 'Sacred Rebirth',
    themeTa: 'புனிதமான விடியல்',
    focus: 'Pavitrata (Purity & Light)',
    focusTa: 'பவித்ரதா (தூய்மை)',
  },
  {
    id: 'aff-17',
    text: 'Lord, bless the food I eat to nourish my strength, and bless the quiet moments to deepen my prayer.',
    textTa: 'இறைவா, என் உடலை வலுப்படுத்தும் உணவை ஆசீர்வதியும்; என் பிரார்த்தனையை ஆழப்படுத்தும் அமைதியான தருணங்களையும் ஆசீர்வதித்தருளும்.',
    theme: 'Daily Blessing',
    themeTa: 'அன்றாட ஆசிர்வாதம்',
    focus: 'Anna Daata (Sacred Nourishment)',
    focusTa: 'அன்ன தாதா (உணவு ஆசி)',
  },
  {
    id: 'aff-18',
    text: 'Let no negativity take root in my heart today. I radiate kindness, quiet confidence, and prayerful peace.',
    textTa: 'எதிர்மறை எண்ணங்கள் எதுவும் இன்று என் இதயத்தில் நுழையாதிருக்கட்டும். நான் கனிவையும், தன்னம்பிக்கையையும், பிரார்த்தனை அமைதியையும் மட்டுமே வெளிப்படுத்துகிறேன்.',
    theme: 'Pure Heart',
    themeTa: 'தூய உள்ளம்',
    focus: 'Ahinsa (Loving Kindness)',
    focusTa: 'அஹிம்சை (அன்பும் அமைதியும்)',
  },
  {
    id: 'aff-19',
    text: 'The strength I seek is already gifted to me by the Divine. I only need to walk forward with discipline and faith.',
    textTa: 'நான் தேடும் வலிமை ஏற்கனவே இறைவனால் எனக்கு அருளப்பட்டுள்ளது. ஒழுக்கத்துடனும் அசைக்க முடியாத நம்பிக்கையுடனும் நான் முன்னேறி நடந்தால் போதும்.',
    theme: 'Inner Discipline',
    themeTa: 'சுய ஒழுக்கம்',
    focus: 'Tapas (Spiritual Discipline)',
    focusTa: 'தவசு (ஆன்மீக உறுதி)',
  },
  {
    id: 'aff-20',
    text: 'Quiet the restlessness within me, Lord. In stillness, I hear your whisper; in prayer, I find my true path.',
    textTa: 'இறைவா, என்னுள் எழும் அலைபாயும் எண்ணங்களை அமைதிப்படுத்தும். பேரமைதியில் உமது குரலைக் கேட்கிறேன்; பிரார்த்தனையில் என் உண்மையான நல்வழியைக் காண்கிறேன்.',
    theme: 'Deep Prayer',
    themeTa: 'ஆழ்ந்த தியானம்',
    focus: 'Dhyana (Silent Meditation)',
    focusTa: 'தியானம் (மௌன தியானம்)',
  },
  {
    id: 'aff-21',
    text: 'I am thankful for the discipline of my body and the sanctuary of my prayers. Both are gifts from the Almighty.',
    textTa: 'என் உடலின் நற்பயிற்சி ஒழுக்கத்திற்கும், என் பிரார்த்தனைகளின் அடைக்கலத்திற்கும் மனதார நன்றி கூறுகிறேன். இரண்டும் எல்லாம் வல்ல இறைவனின் வரங்கள்.',
    theme: 'Harmonious Life',
    themeTa: 'ஒத்திசைவான வாழ்வு',
    focus: 'Yoga (Union of Mind & Soul)',
    focusTa: 'யோகம் (உடலும் உள்ளமும் ஒன்றுதல்)',
  },
  {
    id: 'aff-22',
    text: 'May all beings be free from suffering. May peace reign across the world, beginning with my own heart.',
    textTa: 'எல்லா உயிர்களும் துன்பங்களின்றி இன்புற்று வாழட்டும். என் இதயத்தில் தொடங்கும் அமைதி அகிலமெங்கும் பரவி நிலைக்கட்டும்.',
    theme: 'Universal Prayer',
    themeTa: 'உலக நன்மைப் பிரார்த்தனை',
    focus: 'Sarve Bhavantu Sukhinah',
    focusTa: 'சர்வே பவந்து சுகினஹ் (அனைவருக்கும் நலம்)',
  },
  {
    id: 'aff-23',
    text: 'When tired, I do not quit; I rest in prayer. Divine stamina restores my spirit and strengthens my resolve.',
    textTa: 'சோர்வு ஏற்படும்போது நான் பின்வாங்குவதில்லை; பிரார்த்தனையில் இளைப்பாறுகிறேன். தெய்வீக ஆற்றல் என் மன உறுதியை மீட்டெடுத்து என்னை மீண்டும் பலப்படுத்துகிறது.',
    theme: 'Perseverance',
    themeTa: 'தளராத உறுதி',
    focus: 'Dhriti (Patience & Fortitude)',
    focusTa: 'திருதி (பொறுமையும் மனவலிமையும்)',
  },
  {
    id: 'aff-24',
    text: 'Lord, keep my ego small and my heart vast. Let my life be a humble prayer offered with every deed.',
    textTa: 'இறைவா, என் ஆணவத்தை அகற்றி, என் இதயத்தை பரந்ததாக மாற்றியருளும். எனது ஒவ்வொரு செயலும் உமக்குச் செய்யும் எளிய பிரார்த்தனையாக அமையட்டும்.',
    theme: 'Humility',
    themeTa: 'பணிவும் எளிமையும்',
    focus: 'Nirabhimana (Selfless Simplicity)',
    focusTa: 'நிரபிமானம் (ஆணவமற்ற எளிமை)',
  },
  {
    id: 'aff-25',
    text: 'I release what I cannot control and entrust all outcomes to the supreme wisdom of the Divine.',
    textTa: 'என் கட்டுப்பாட்டில் இல்லாதவற்றை நான் விடுவித்து விடுகிறேன்; அனைத்துச் செயல்களின் பலன்களையும் இறைவனின் எல்லையற்ற ஞானத்திடம் ஒப்படைக்கிறேன்.',
    theme: 'Surrender of Outcomes',
    themeTa: 'முழு சரணாகதி',
    focus: 'Ishvara Pranidhana',
    focusTa: 'ஈஸ்வர பிரணிதானம் (இறை சமர்ப்பணம்)',
  },
  {
    id: 'aff-26',
    text: 'My body gains power through wholesome meals; my soul gains clarity through daily prayer and remembrance.',
    textTa: 'சத்துணவின் மூலம் என் உடல் வலிமை பெறுகிறது; தினசரி பிரார்த்தனை மற்றும் தியானத்தின் மூலம் என் ஆன்மா தூய தெளிவு பெறுகிறது.',
    theme: 'Body & Soul Harmony',
    themeTa: 'உடலும் ஆன்மாவும் சமநிலை',
    focus: 'Santulana (Divine Balance)',
    focusTa: 'சந்துலனம் (சமநிலை)',
  },
  {
    id: 'aff-27',
    text: 'Thank you, Divine Father, for another sunrise. I step into this day protected by your grace and love.',
    textTa: 'இனியொரு புதிய விடியலைத் தந்தமைக்கு நன்றி இறைவா! உமது அளப்பரிய அன்பினாலும் கருணையினாலும் பாதுகாக்கப்பட்டு இன்றைய நாளில் அடியெடுத்து வைக்கிறேன்.',
    theme: 'Sunrise Gratitude',
    themeTa: 'விடியல் நன்றி',
    focus: 'Prabhat Smaranam (Morning Devotion)',
    focusTa: 'பிரபாத ஸ்மரணம் (காலை வழிபாடு)',
  },
  {
    id: 'aff-28',
    text: 'Grant me clarity of vision and quietness of breath. In prayer, every doubt dissolves into sacred certainty.',
    textTa: 'தெளிவான பார்வையும், அமைதியான மூச்சையும் எனக்குத் தந்தருளும். இறைவனின் பிரார்த்தனையில் எனது எல்லா சந்தேகங்களும் தீர்ந்து நிம்மதி பிறக்கிறது.',
    theme: 'Clarity & Faith',
    themeTa: 'தெளிவும் பக்தியும்',
    focus: 'Satya (Truth & Devotion)',
    focusTa: 'சத்தியம் (உண்மை & பக்தி)',
  },
  {
    id: 'aff-29',
    text: 'As night falls, I release all burdens into God’s care. I sleep peacefully under divine shelter and wake renewed.',
    textTa: 'இரவு நெருங்கும் வேளையில், எனது சுமைகள் அனைத்தையும் இறைவனிடம் ஒப்படைக்கிறேன். இறையருளின் நிழலில் நிம்மதியாக உறங்கி, புத்துணர்ச்சியுடன் விழிப்பேன்.',
    theme: 'Evening Prayer',
    themeTa: 'இரவுப் பிரார்த்தனை',
    focus: 'Vandana (Night Offering)',
    focusTa: 'வந்தனம் (இரவு வழிபாடு)',
  },
  {
    id: 'aff-30',
    text: 'Peace within my thoughts, peace on my tongue, peace in my home. Divine love surrounds me always.',
    textTa: 'என் எண்ணங்களில் அமைதி, என் நாவில் அமைதி, என் இல்லத்தில் அமைதி. இறைவனின் பேரன்பு என்னை எப்போதும் சூழ்ந்துள்ளது.',
    theme: 'Tranquil Heart',
    themeTa: 'அமைதியான உள்ளம்',
    focus: 'Shanti Mantra',
    focusTa: 'சாந்தி மந்திரம் (முழு அமைதி)',
  },
  {
    id: 'aff-31',
    text: 'I am a humble instrument of divine grace. May my life bring strength to myself and upliftment to others.',
    textTa: 'நான் இறைவனின் கருணைக் கருவியாக விளங்குகிறேன். எனது வாழ்க்கை எனக்கும் வலிமை தந்து, பிறருக்கும் நல்வழிகாட்டி உயர்த்தட்டும்.',
    theme: 'Living Prayer',
    themeTa: 'வாழும் பிரார்த்தனை',
    focus: 'Ananda (Divine Joy)',
    focusTa: 'ஆனந்தம் (பேரின்பம்)',
  },
];

/**
 * Returns a unique daily prayer affirmation based on the calendar date.
 * Guarantees a fresh, deterministic affirmation every day of the year.
 */
export function getDailyAffirmation(date: Date = new Date()): PrayerAffirmation {
  // Day of year calculation (1 to 366)
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const index = Math.abs(dayOfYear) % dailyAffirmations.length;
  return dailyAffirmations[index];
}
