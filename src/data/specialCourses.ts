export interface CourseModule {
  moduleTitleBn: string;
  moduleTitleEn: string;
  topicsBn: string[];
  topicsEn: string[];
}

export interface SpecialCourse {
  id: string;
  slug: string;
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  targetBn: string;
  targetEn: string;
  badgeBn: string;
  badgeEn: string;
  price: number;
  originalPrice: number;
  durationBn: string;
  durationEn: string;
  totalLectures: number;
  totalMockTests: number;
  totalNotes: number;
  descriptionBn: string;
  descriptionEn: string;
  featuresBn: string[];
  featuresEn: string[];
  modules: CourseModule[];
  scheduleBn: string;
  scheduleEn: string;
  mentorNameBn: string;
  mentorNameEn: string;
  mentorTitleBn: string;
  mentorTitleEn: string;
  iconName: 'award' | 'book-open' | 'graduation-cap' | 'sparkles';
  accentColor: string;
}

export const specialCoursesList: SpecialCourse[] = [
  {
    id: 'course-1',
    slug: 'primary-scholarship',
    titleBn: 'প্রাথমিক বৃত্তি পরীক্ষা স্পেশাল প্রস্তুতি কোর্স',
    titleEn: 'Primary Scholarship Exam Special Preparation Course',
    subtitleBn: '৫ম শ্রেণির শিক্ষার্থীদের জন্য ট্যালেন্টপুল বৃত্তি নিশ্চিত করার সর্বাধুনিক কমপ্লিট প্রস্তুতি',
    subtitleEn: 'Comprehensive preparation program for Class 5 students targeting Talentpool scholarship',
    targetBn: '৫ম শ্রেণি / প্রাথমিক বৃত্তি পরীক্ষার্থী',
    targetEn: 'Class 5 / Primary Scholarship Candidates',
    badgeBn: 'ট্যালেন্টপুল গ্যারান্টি ব্যাচ',
    badgeEn: 'Talentpool Guarantee Batch',
    price: 499,
    originalPrice: 1200,
    durationBn: '৪ মাস ব্যাপী নিবিড় মেন্টরশিপ',
    durationEn: '4 Months Intensive Mentorship',
    totalLectures: 48,
    totalMockTests: 25,
    totalNotes: 32,
    descriptionBn: 'প্রাথমিক বৃত্তি পরীক্ষায় ১০০% যোগ্যতাভিত্তিক কাঠামাবদ্ধ প্রশ্নের নির্ভুল সমাধান, গণিত ঐকিক নিয়ম ও শতকরার বিশেষ শর্টকাট, বাংলা অনুচ্ছেদ লেখনী ও বিজ্ঞানের চিত্রভিত্তিক ব্যাখ্যার কমপ্লিট ডিজিটাল কোর্স। সাথে রয়েছে ২৫ সেট হুবহু বোর্ড ওএমআর স্ট্যান্ডার্ড মডেল টেস্ট এবং শীর্ষ প্রাথমিক বিদ্যালয়ের প্রধান শিক্ষকদের নিবিড় পর্যালোচনা।',
    descriptionEn: 'Complete digital preparation program covering 100% competency-based structured questions, math unitary method & percentage shortcut formulas, Bangla creative comprehension, and illustrated science answers. Includes 25 sets of genuine board-pattern OMR model tests reviewed by top primary head teachers.',
    featuresBn: [
      'বাংলা, ইংরেজি, গণিত ও প্রাথমিক বিজ্ঞানের পূর্ণাঙ্গ সিলেবাস কভারেজ',
      'প্রতিটি অধ্যায়ের রঙিন হ্যান্ডনোট ও প্রিন্টযোগ্য ফর্মুলা শিট',
      '২৫ সেট পূর্ণাঙ্গ ওএমআর (OMR) শিটভিত্তিক মডেল টেস্ট ও স্বয়ংক্রিয় রেজাল্ট',
      'দুর্বল শিক্ষার্থীদের জন্য সাপ্তাহিক স্পেশাল প্রবলেম সলভিং সেশন',
      'অভিভাবকদের সাথে অগ্রগতি শেয়ারিং ও সেলফ-অ্যাসেসমেন্ট রিপোর্ট'
    ],
    featuresEn: [
      'Complete syllabus coverage for Bangla, English, Math and Elementary Science',
      'Full-color downloadable handnotes and printable formula sheets per chapter',
      '25 sets of full-length OMR based model tests with automated result analysis',
      'Weekly personalized problem solving sessions for student care',
      'Detailed progress sharing and self-assessment reports for parents'
    ],
    modules: [
      {
        moduleTitleBn: 'মডিউল ১: প্রাথমিক গণিত কাঠামাবদ্ধ স্পেশাল হ্যাকস',
        moduleTitleEn: 'Module 1: Primary Math Structured Mastery',
        topicsBn: ['চার প্রক্রিয়া সম্পর্কিত সমস্যা', 'লসাগু ও গসাগুর দ্রুত নির্ণয়', 'ঐকিক নিয়ম ও বয়সের অঙ্ক', 'শতকরা ও লাভ-ক্ষতির টেবিল মেথড', 'জ্যামিতি চিত্র ও বৈশিষ্ট্য'],
        topicsEn: ['Four Fundamental Operations', 'Quick LCM & HCF Methods', 'Unitary System & Age Problems', 'Percentage & Profit-Loss Table Method', 'Geometry Figures & Attributes']
      },
      {
        moduleTitleBn: 'মডিউল ২: বাংলা অনুচ্ছেদ ও ব্যাকরণ দক্ষতা',
        moduleTitleEn: 'Module 2: Bangla Comprehension & Grammar',
        topicsBn: ['পাঠ্যবইয়ের গল্প-কবিতা বিশ্লেষণ', 'অদেখা অনুচ্ছেদ থেকে প্রশ্ন তৈরি', 'যুক্তবর্ণ বিভাজন ও বাক্য গঠন', 'বিরামচিহ্ন বসানোর কৌশল', 'চিঠি ও দরখাস্ত লিখন'],
        topicsEn: ['Textbook Story & Poem Analysis', 'Unseen Passage Questions', 'Conjunct Letters & Sentences', 'Punctuation Placement Rules', 'Letter & Application Writing']
      },
      {
        moduleTitleBn: 'মডিউল ৩: ইংরেজি সিন ও আনসিন মাস্টারক্লাস',
        moduleTitleEn: 'Module 3: English Seen & Unseen Masterclass',
        topicsBn: ['EFT বইয়ের গুরুত্বপূর্ণ প্যাসেজ', 'Question Answering Techniques', 'Short Composition Writing', 'WH Questions গঠন নিয়ম', 'Form Fill-up হ্যাকস'],
        topicsEn: ['Key EFT Textbook Passages', 'Question Answering Techniques', 'Short Composition Writing', 'WH Question Formation Rules', 'Form Fill-up Hacks']
      },
      {
        moduleTitleBn: 'মডিউল ৪: প্রাথমিক বিজ্ঞান ও পরিবেশ সচেতনতা',
        moduleTitleEn: 'Module 4: Science & Environmental Studies',
        topicsBn: ['জীব ও জড় জগতের মিথস্ক্রিয়া', 'সুষম খাদ্য ও পুষ্টিমান তালিকা', 'শক্তি ও পদার্থ রূপান্তর', 'আবহাওয়া ও জলবায়ুর পূর্বাভাস', 'জনসংখ্যা ও প্রাকৃতিক পরিবেশ'],
        topicsEn: ['Living and Non-living Interactions', 'Balanced Diet & Nutrition Chart', 'Energy & Matter Conversions', 'Weather & Climate Forecasting', 'Population & Natural Ecosystems']
      }
    ],
    scheduleBn: 'প্রতি রবি, মঙ্গল ও বৃহস্পতিবার সন্ধ্যা ৬:৩০ টা',
    scheduleEn: 'Every Sun, Tue & Thu at 6:30 PM',
    mentorNameBn: 'মাস্টার ট্রেইনার টিম (NCTB সার্টিফাইড)',
    mentorNameEn: 'Master Trainer Panel (NCTB Certified)',
    mentorTitleBn: 'সাবেক প্রধান পরীক্ষক ও ঢাকা টিচার্স ট্রেনিং কলেজ ফেলো',
    mentorTitleEn: 'Former Chief Examiner & Dhaka TTC Academic Fellow',
    iconName: 'award',
    accentColor: '#e2136e'
  },
  {
    id: 'course-2',
    slug: 'junior-scholarship',
    titleBn: 'জুনিয়র বৃত্তি পরীক্ষা স্পেশাল প্রস্তুতি কোর্স',
    titleEn: 'Junior Scholarship Exam Special Preparation Course',
    subtitleBn: '৮ম শ্রেণির মেধাবী শিক্ষার্থীদের মেধা ও সাধারণ বৃত্তি নিশ্চিত করার কমপ্লিট কোর্স',
    subtitleEn: 'Complete preparatory curriculum for Class 8 students aiming for General & Talentpool scholarships',
    targetBn: '৮ম শ্রেণি / জুনিয়র বৃত্তি পরীক্ষার্থী',
    targetEn: 'Class 8 / Junior Scholarship Candidates',
    badgeBn: 'মেধাবৃত্তি স্পেশাল ব্যাচ',
    badgeEn: 'Merit Scholarship Batch',
    price: 550,
    originalPrice: 1400,
    durationBn: '৪ মাস মেয়াদী এক্সক্লুসিভ কোর্স',
    durationEn: '4 Months Exclusive Program',
    totalLectures: 52,
    totalMockTests: 28,
    totalNotes: 36,
    descriptionBn: 'অষ্টম শ্রেণির গণিত (বীজগণিতীয় সূত্রাবলি, প্যাটার্ন, মুনাফা ও পরিমাপ), বিজ্ঞান (রাসায়নিক বিক্রিয়া, অম্ল-ক্ষার ও আলো) এবং বাংলা-ইংরেজি বিষয়ের গভীর কনসেপ্ট ও বিগত ১০ বছরের জেলাভিত্তিক বৃত্তি পরীক্ষার প্রশ্নের পুঙ্খানুপুঙ্খ সমাধান।',
    descriptionEn: 'Deep-dive conceptual mastery in Class 8 Mathematics (Algebraic formulas, Patterns, Profit, Mensuration), Science (Chemical reactions, Acids-Bases, Optics), and Bangla-English with 10 years of district-level scholarship papers analyzed.',
    featuresBn: [
      'প্যাটার্ন ও বীজগণিতীয় সূত্রের সুপার শর্টকাট কৌশল',
      'বিজ্ঞান বিষয়ের সৃজনশীল উদ্দীপক ডিকোডিং ট্যাকটিকস',
      '২৮ সেট পূর্ণাঙ্গ মডেল টেস্ট পেপার ও বিস্তারিত সলিউশন বুক',
      'প্রিন্ট উপযোগী হাই-রেজ্যুলিউশন হ্যান্ডনোটস ও সাজেশন প্যাক',
      'লাইভ ডাউট ক্লিয়ারিং ও মেন্টর চ্যাট সাপোর্ট'
    ],
    featuresEn: [
      'Pattern & Algebraic formulas super shortcut techniques',
      'Science creative stimulus decoding tactics and diagrams',
      '28 sets of full-length model test papers with detailed solutions',
      'Print-friendly high-resolution handnotes and suggestion packs',
      'Live doubt clearing & 24/7 dedicated mentor chat support'
    ],
    modules: [
      {
        moduleTitleBn: 'মডিউল ১: ৮ম শ্রেণির গণিত অল-রাউন্ডার',
        moduleTitleEn: 'Module 1: Class 8 Math All-Rounder',
        topicsBn: ['প্যাটার্ন ও সংখ্যা ম্যাজিক', 'মুনাফা ও চক্রবৃদ্ধি মুনাফার ট্রিকস', 'পরিমাপ ও ক্ষেত্রফল নির্ণয়', 'বীজগণিতীয় সূত্রাবলি ও উৎপাদক', 'বৃত্ত ও চতুর্ভুজ অঙ্কন জ্যামিতি'],
        topicsEn: ['Pattern & Number Series', 'Simple & Compound Interest Tricks', 'Mensuration & Area Calculation', 'Algebraic Formulas & Factoring', 'Circle & Quadrilateral Construction']
      },
      {
        moduleTitleBn: 'মডিউল ২: বিজ্ঞান অনুসন্ধানী রিভিশন',
        moduleTitleEn: 'Module 2: Inquiry Science Revision',
        topicsBn: ['প্রাণিজগতের শ্রেণিবিন্যাস', 'ব্যাপন, অভিস্রবণ ও প্রস্বেদন', 'রাসায়নিক বিক্রিয়া ও সমতাকরণ', 'অম্ল, ক্ষারক ও লবণ শনাক্তকরণ', 'আলোর প্রতিফলন ও প্রতিসরণ'],
        topicsEn: ['Animal Kingdom Classification', 'Diffusion, Osmosis & Transpiration', 'Chemical Equations & Balancing', 'Acids, Bases & Salts Identification', 'Light Reflection & Refraction']
      },
      {
        moduleTitleBn: 'মডিউল ৩: ইংরেজি রাইটিং ও গ্রামার বুস্ট',
        moduleTitleEn: 'Module 3: English Writing & Grammar Boost',
        topicsBn: ['Right Forms of Verbs', 'Changing Sentences (Voice & Degree)', 'Dialogue & Informal Letter', 'Paragraph Writing Secrets', 'Vocabulary Enrichment'],
        topicsEn: ['Right Forms of Verbs', 'Sentence Transformations', 'Dialogue & Informal Letters', 'Paragraph Writing Secrets', 'Vocabulary Enrichment']
      }
    ],
    scheduleBn: 'প্রতি শনি, সোম ও বুধবার রাত ৭:৩০ টা',
    scheduleEn: 'Every Sat, Mon & Wed at 7:30 PM',
    mentorNameBn: 'নটর ডেম ও রাজউক ক্যাডেট শিক্ষক মেন্টরশিপ',
    mentorNameEn: 'Notre Dame & Rajuk College Academic Mentors',
    mentorTitleBn: 'গণিত ও বিজ্ঞান অলিম্পিয়াড ট্রেইনার',
    mentorTitleEn: 'Math & Science Olympiad National Trainers',
    iconName: 'book-open',
    accentColor: '#0084a2'
  },
  {
    id: 'course-3',
    slug: 'ssc-prep',
    titleBn: 'SSC চূড়ান্ত প্রস্তুতি ও সুপার রিভিশন কোর্স',
    titleEn: 'SSC Final Preparation & Super Revision Course',
    subtitleBn: 'এসএসসি সাধারণ গণিত, উচ্চতর গণিত, পদার্থ ও রসায়নে ১০০% A+ নিশ্চিত করার মেগা কোর্স',
    subtitleEn: 'Mega course designed to secure 100% GPA 5 / A+ in SSC General Math, Higher Math, Physics & Chemistry',
    targetBn: '১০ম শ্রেণি ও এসএসসি ২০২৬ / ২০২৭ ব্যাচ',
    targetEn: 'Class 10 & SSC 2026 / 2027 Batches',
    badgeBn: 'বোর্ড টপার ব্যাচ',
    badgeEn: 'Board Topper Batch',
    price: 699,
    originalPrice: 1800,
    durationBn: '৫ মাস মেয়াদী সম্পূর্ণ সিলেবাস রিভিশন',
    durationEn: '5 Months Complete Syllabus Revision',
    totalLectures: 64,
    totalMockTests: 35,
    totalNotes: 45,
    descriptionBn: 'এসএসসি পরীক্ষার হলে প্রতিটি সেকেন্ড বাঁচিয়ে সর্বোচ্চ নম্বর তোলার কৌশল নিয়ে তৈরি। প্রতিটি অধ্যায়ের প্রমিত সৃজনশীল প্রশ্নের জ্ঞান, অনুধাবন, প্রয়োগ ও উচ্চতর দক্ষতার নিখুঁত খাতা উপস্থাপনা, ক্যালকুলেটর শর্টকাট (Casio 991EX/CW) এবং শীর্ষ স্কুলের প্রি-টেস্ট ও টেস্ট পেপার সমাধান।',
    descriptionEn: 'Formulated to optimize exam hall time and maximize scores. Covers textbook CQ structuring (knowledge, comprehension, application & higher order analysis), Casio 991EX/CW calculator shortcuts, and exhaustive test paper analysis from top schools.',
    featuresBn: [
      'সাধারণ ও উচ্চতর গণিতের ১৭+১৪ অধ্যায়ের শতভাগ টাইপভিত্তিক সমাধান',
      'পদার্থ ও রসায়নের জটিল গাণিতিক সূত্রের ক্যালকুলেটর শর্টকাট হ্যাকস',
      '৩৫ সেট বোর্ড স্ট্যান্ডার্ড মেগা মডেল টেস্ট ও ওএমআর ওভাল স্ক্রীনিং',
      'বিগত ১০ বছরের সকল শিক্ষা বোর্ডের কমন প্রশ্নের স্পেশাল এনালাইসিস',
      'পরীক্ষার আগের রাতের জন্য ৭ পাতার ফাস্ট-ট্র্যাক রিভিশন শিট'
    ],
    featuresEn: [
      '100% type-based problem solving for General Math & Higher Math',
      'Physics and Chemistry formula calculator hacks for instantaneous solving',
      '35 sets of official board-standard mega model tests with OMR evaluation',
      '10-year question trend analysis across all 9 General Education Boards',
      'Exclusive 7-page fast-track cheat sheets for night-before-exam revision'
    ],
    modules: [
      {
        moduleTitleBn: 'মডিউল ১: সাধারণ গণিত বোর্ড স্পেশাল',
        moduleTitleEn: 'Module 1: General Math Board Mastery',
        topicsBn: ['বাস্তব সংখ্যা ও সেট-ফাংশন', 'বীজগণিতীয় রাশি ও লগারিদম', 'ব্যবহারিক জ্যামিতি ও বৃত্ত সংক্রান্ত উপপাদ্য', 'ত্রিকোণমিতিক অনুপাত ও দূরত্ব-উচ্চতা', 'পরিমিতি ও পরিসংখ্যান শর্টকাট'],
        topicsEn: ['Real Numbers & Sets', 'Algebraic Expressions & Logarithms', 'Practical Geometry & Circle Theorems', 'Trigonometry & Heights/Distances', 'Mensuration & Statistics Shortcuts']
      },
      {
        moduleTitleBn: 'মডিউল ২: উচ্চতর গণিত A+ ট্যাকটিকস',
        moduleTitleEn: 'Module 2: Higher Math A+ Tactics',
        topicsBn: ['দ্বিপদী বিস্তৃতি ও প্যাসকেলের ত্রিভুজ', 'স্থানাঙ্ক জ্যামিতি ও গ্রাফ আঁকার নিয়ম', 'অসীম ধারা ও বিশেষ রূপান্তর', 'ত্রিকোণমিতিক কোণ ও রেডিয়ান হিসাব', 'সম্ভাবনা ও ভেক্টর জ্যামিতি'],
        topicsEn: ['Binomial Expansion & Pascals Triangle', 'Coordinate Geometry & Graphing Rules', 'Infinite Series & Summation', 'Radian Measurement & Trig Angles', 'Probability & Vector Operations']
      },
      {
        moduleTitleBn: 'মডিউল ৩: পদার্থবিজ্ঞান ম্যাথ ও ডায়াগ্রাম',
        moduleTitleEn: 'Module 3: Physics Math & Diagrams',
        topicsBn: ['গতি ও বলের সমীকরণ বিশ্লেষণ', 'কাজ, ক্ষমতা ও শক্তির রূপান্তর', 'পদার্থের অবস্থা ও চাপের গাণিতিক সমস্যা', 'আলোর প্রতিফলন ও লেন্স প্রতিসরণ', 'চলতড়িৎ, বর্তনী রোধ ও তড়িৎ ক্ষমতা'],
        topicsEn: ['Kinematics & Dynamics Calculations', 'Work, Energy & Power Transformations', 'State of Matter & Hydrostatic Pressure', 'Optics, Mirrors & Lens Refraction', 'Current Electricity, Circuits & Resistance']
      },
      {
        moduleTitleBn: 'মডিউল ৪: রসায়ন বিক্রিয়া ও রোডম্যাপ',
        moduleTitleEn: 'Module 4: Chemistry Reactions & Roadmap',
        topicsBn: ['পরমাণুর গঠন ও ইলেকট্রন বিন্যাস', 'পর্যায় সারণির মৌল ধর্ম ও ব্যতিক্রম', 'রাসায়নিক বন্ধন ও আয়ন গঠন', 'মোলের ধারণা ও রাসায়নিক গণনা (স্টয়কিওমেট্রি)', 'জীবাশ্ম ও হাইড্রোকার্বনের রূপান্তর চার্ট'],
        topicsEn: ['Atomic Structure & Electron Configuration', 'Periodic Table Periodic Trends', 'Chemical Bonds & Molecular Shapes', 'Mole Concept & Stoichiometry', 'Hydrocarbons & Organic Reaction Pathways']
      }
    ],
    scheduleBn: 'প্রতি রবি, মঙ্গল ও বৃহস্পতিবার রাত ৮:৩০ টা',
    scheduleEn: 'Every Sun, Tue & Thu at 8:30 PM',
    mentorNameBn: 'বুয়েট ও ঢাকা বিশ্ববিদ্যালয় ফ্যাকাল্টি প্যানেল',
    mentorNameEn: 'BUET & Dhaka University Faculty Mentors',
    mentorTitleBn: 'সাবেক বোর্ড বৃত্তিপ্রাপ্ত ও অভিজ্ঞ প্রশ্নপ্রণেতা',
    mentorTitleEn: 'Former Board Scholarship Holders & Academic Authors',
    iconName: 'graduation-cap',
    accentColor: '#e2136e'
  },
  {
    id: 'course-4',
    slug: 'hsc-prep',
    titleBn: 'HSC বোর্ড চ্যালেঞ্জ ও এডমিশন ফাউন্ডেশন কোর্স',
    titleEn: 'HSC Board Challenge & Admission Foundation Course',
    subtitleBn: 'HSC পরীক্ষায় গোল্ডেন A+ এবং বুয়েট, মেডিকেল ও ঢাবি ভর্তি পরীক্ষার শক্তিশালী ভিত্তি',
    subtitleEn: 'Aiming for Golden GPA 5 in HSC alongside rock-solid foundation for BUET, Medical & DU admissions',
    targetBn: 'HSC ১ম ও ২য় বর্ষ (বিজ্ঞান বিভাগ)',
    targetEn: 'HSC 1st & 2nd Year (Science Group)',
    badgeBn: 'এডমিশন প্রি-ফাউন্ডেশন',
    badgeEn: 'Admission Pre-Foundation',
    price: 799,
    originalPrice: 2200,
    durationBn: '৬ মাস মেয়াদী কমপ্লিট মেগা প্রোগ্রাম',
    durationEn: '6 Months Complete Mega Program',
    totalLectures: 75,
    totalMockTests: 40,
    totalNotes: 55,
    descriptionBn: 'HSC বিজ্ঞান বিভাগের সবচেয়ে ভয় পাওয়া ৪টি বিষয়—পদার্থবিজ্ঞান (১ম ও ২য়), রসায়ন (১ম ও ২য়), উচ্চতর গণিত এবং ICT। প্রতিটি অধ্যায়ের গভীর কনসেপ্ট, জটিল ক্যালকুলাস ও ভেক্টর, জৈব রসায়নের রূপান্তর চার্ট এবং বিগত ১২ বছরের বোর্ড পরীক্ষার সাথে এডমিশন কনসেপ্টের সমন্বিত মাস্টার কোর্স।',
    descriptionEn: 'Tackles the 4 most challenging subjects in HSC Science: Physics (1st & 2nd), Chemistry (1st & 2nd), Higher Math, and ICT. Integrates comprehensive calculus, vector mechanics, organic reaction mechanism maps, and 12 years of board & admission questions.',
    featuresBn: [
      'পদার্থবিজ্ঞান ১ম ও ২য় পত্রের সকল সূত্রের ডেরিভেশন ও ক্যালকুলেটর শর্টকাট',
      'জৈব রসায়নের মেগা রূপান্তর রোডম্যাপ চার্ট (এক নজরে সব বিক্রিয়া)',
      'উচ্চতর গণিতের ক্যালকুলাস (অন্তরীকরণ ও যোগজীকরণ) স্পেশাল হ্যাকস',
      '৪০ সেট কমপ্লিট বোর্ড স্ট্যান্ডার্ড টেস্ট পেপার মডেল ও ওএমআর এনালাইসিস',
      'বুয়েট, ডিএমসি ও ঢাবির টপ ১০০ শিক্ষার্থীদের সাথে মেন্টরিং'
    ],
    featuresEn: [
      'Physics 1st & 2nd Paper complete derivations & calculator shortcuts',
      'Organic Chemistry Mega Conversion Roadmap Chart covering all reaction types',
      'Higher Math Calculus (Differentiation & Integration) mastery hacks',
      '40 sets of complete board-standard model tests with OMR scoring analytics',
      'Direct peer mentoring sessions with BUET, DMC & DU top rankers'
    ],
    modules: [
      {
        moduleTitleBn: 'মডিউল ১: HSC পদার্থবিজ্ঞান মাস্টারক্লাস',
        moduleTitleEn: 'Module 1: HSC Physics Masterclass',
        topicsBn: ['ভেক্টর গুণন ও ডট-ক্রস অ্যাপ্লিকেশন', 'নিউটনিয়ান বলবিদ্যা ও জড়তার ভ্রামক', 'কাজ, শক্তি ও ক্ষমতা', 'মহাকর্ষ ও অভিকর্ষীয় ক্ষেত্র', 'স্থির তড়িৎ ও কুলম্বের সূত্র', 'চলতড়িৎ ও কার্শফের সূত্রাবলী'],
        topicsEn: ['Vectors & Dot-Cross Operations', 'Newtonian Mechanics & Moment of Inertia', 'Work, Energy & Power Dynamics', 'Gravitational Fields', 'Electrostatics & Coulombs Law', 'Current Electricity & Kirchhoffs Rules']
      },
      {
        moduleTitleBn: 'মডিউল ২: HSC রসায়ন ও জৈব রসায়ন রোডম্যাপ',
        moduleTitleEn: 'Module 2: Chemistry & Organic Roadmap',
        topicsBn: ['গুণগত রসায়ন ও দ্রাব্যতা গুণফল (Ksp)', 'পর্যাবৃত্ত ধর্ম ও জটিল যৌগ', 'রাসায়নিক পরিবর্তন ও বাফার দ্রবণ (pH)', 'জৈব রসায়ন: এলিফ্যাটিক ও অ্যারোমেটিক রূপান্তর', 'তড়িৎ রসায়ন ও ন্যার্নস্ট সমীকরণ'],
        topicsEn: ['Qualitative Analysis & Solubility (Ksp)', 'Periodic Trends & Complex Compounds', 'Equilibrium & Buffer Solutions (pH)', 'Organic Chemistry Aliphatic & Aromatic Pathways', 'Electrochemistry & Nernst Equations']
      },
      {
        moduleTitleBn: 'মডিউল ৩: উচ্চতর গণিত ও ক্যালকুলাস হ্যাকস',
        moduleTitleEn: 'Module 3: Higher Math & Calculus Hacks',
        topicsBn: ['ম্যাট্রিক্স ও নির্ণায়ক সমাধান', 'সরলরেখা ও বৃত্তের সমীকরণ', 'ত্রিকোণমিতিক রূপান্তর সূত্রাবলি', 'অন্তরীকরণ ও স্পর্শক-অভিলম্ব', 'নির্দিষ্ট ও অনির্দিষ্ট যোগজীকরণ', 'কণিক (পরাবৃত্ত, উপবৃত্ত, অধিবৃত্ত)'],
        topicsEn: ['Matrices & Determinants', 'Straight Lines & Circle Equations', 'Trigonometric Transformations', 'Differentiation & Tangent/Normals', 'Definite & Indefinite Integration', 'Conics (Parabola, Ellipse, Hyperbola)']
      },
      {
        moduleTitleBn: 'মডিউল ৪: তথ্য ও যোগাযোগ প্রযুক্তি (ICT)',
        moduleTitleEn: 'Module 4: Information & Communication Tech (ICT)',
        topicsBn: ['সংখ্যা পদ্ধতি ও বাইনারি যোগ-বিয়োগ', 'বুলিয়ান অ্যালজেব্রা ও লজিক গেট', 'HTML ওয়েব ডিজাইন ও টেবিল ট্যাগ', 'C প্রোগ্রামিং লুপ ও অ্যারে', 'ডাটাবেজ ম্যানেজমেন্ট সিস্টেম (DBMS)'],
        topicsEn: ['Number Systems & Binary Operations', 'Boolean Algebra & Logic Gates', 'HTML Web Page Structure & Tables', 'C Programming Loops & Arrays', 'Database Management System (SQL)']
      }
    ],
    scheduleBn: 'প্রতি শুক্র ও শনিবার সকাল ১০:০০ টা এবং সোম ও বুধবার রাত ৯:০০ টা',
    scheduleEn: 'Every Fri & Sat at 10:00 AM and Mon & Wed at 9:00 PM',
    mentorNameBn: 'বুয়েট এসিএম প্রোগ্রামার ও ডিএমসি স্কলার প্যানেল',
    mentorNameEn: 'BUET ACM Rankers & DMC Scholars Panel',
    mentorTitleBn: 'জাতীয় শিক্ষা পদকপ্রাপ্ত এডুকেশন মেন্টরবৃন্দ',
    mentorTitleEn: 'National Education Award Winning Mentors',
    iconName: 'sparkles',
    accentColor: '#f9902e'
  }
];
