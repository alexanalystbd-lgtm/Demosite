/**
 * Complete bilingual translations database for products, categories, subjects,
 * teachers corner, career exam guides, job circulars, and FAQs.
 */

export interface ItemTranslation {
  titleEn: string;
  titleBn: string;
  shortDescEn?: string;
  shortDescBn?: string;
  descEn?: string;
  descBn?: string;
  subjectEn?: string;
  subjectBn?: string;
  badgeEn?: string;
  badgeBn?: string;
  categoryLabelEn?: string;
  categoryLabelBn?: string;
  classLabelEn?: string;
  classLabelBn?: string;
  formatEn?: string;
  formatBn?: string;
  featuresEn?: string[];
  featuresBn?: string[];
  tableOfContentsEn?: string[];
  tableOfContentsBn?: string[];
}

// 1. Categories
export const categoryNames: Record<string, { bn: string; en: string }> = {
  all: { bn: 'সকল ক্যাটাগরি', en: 'All Categories' },
  planner: { bn: 'স্টাডি প্ল্যানার', en: 'Study Planner' },
  notes: { bn: 'সাবজেক্ট নোটস', en: 'Subject Notes' },
  'exam-guide': { bn: 'এক্সাম প্রেপারেশন গাইড', en: 'Exam Prep Guide' },
  workbook: { bn: 'ডিজিটাল ওয়ার্কবুক', en: 'Digital Workbook' },
  'model-test': { bn: 'মডেল টেস্ট ব্যাংক', en: 'Model Test Bank' },
  'e-book': { bn: 'ডিজিটাল ই-বুক', en: 'Digital E-Book' },
  ebook: { bn: 'ডিজিটাল ই-বুক', en: 'Digital E-Book' },
};

// 2. Class Levels
export const classNames: Record<string, { bn: string; en: string; shortEn: string; shortBn: string }> = {
  all: { bn: 'সকল শ্রেণি', en: 'All Classes', shortEn: 'All', shortBn: 'সকল' },
  'class-1': { bn: 'ক্লাস ১ (প্রথম শ্রেণি)', en: 'Class 1 (Primary)', shortEn: 'Class 1', shortBn: 'ক্লাস ১' },
  'class-2': { bn: 'ক্লাস ২ (দ্বিতীয় শ্রেণি)', en: 'Class 2 (Primary)', shortEn: 'Class 2', shortBn: 'ক্লাস ২' },
  'class-3': { bn: 'ক্লাস ৩ (তৃতীয় শ্রেণি)', en: 'Class 3 (Primary)', shortEn: 'Class 3', shortBn: 'ক্লাস ৩' },
  'class-4': { bn: 'ক্লাস ৪ (চতুর্থ শ্রেণি)', en: 'Class 4 (Primary)', shortEn: 'Class 4', shortBn: 'ক্লাস ৪' },
  'class-5': { bn: 'ক্লাস ৫ (বৃত্তি পরীক্ষা)', en: 'Class 5 (Scholarship)', shortEn: 'Class 5', shortBn: 'ক্লাস ৫' },
  'class-6': { bn: 'ক্লাস ৬ (ষষ্ঠ শ্রেণি)', en: 'Class 6 (High School)', shortEn: 'Class 6', shortBn: 'ক্লাস ৬' },
  'class-7': { bn: 'ক্লাস ৭ (সপ্তম শ্রেণি)', en: 'Class 7 (High School)', shortEn: 'Class 7', shortBn: 'ক্লাস ৭' },
  'class-8': { bn: 'ক্লাস ৮ (অষ্টম শ্রেণি)', en: 'Class 8 (High School)', shortEn: 'Class 8', shortBn: 'ক্লাস ৮' },
  'class-9': { bn: 'ক্লাস ৯ (নবম শ্রেণি)', en: 'Class 9 (High School)', shortEn: 'Class 9', shortBn: 'ক্লাস ৯' },
  'class-10': { bn: 'ক্লাস ১০ / এসএসসি', en: 'Class 10 / SSC', shortEn: 'Class 10', shortBn: 'ক্লাস ১০' },
  'hsc-1st-year': { bn: 'HSC ১ম বর্ষ (একাদশ শ্রেণি)', en: 'HSC 1st Year (Class 11)', shortEn: 'HSC 1st Yr', shortBn: 'HSC ১ম বর্ষ' },
  'hsc-2nd-year': { bn: 'HSC ২য় বর্ষ (দ্বাদশ শ্রেণি)', en: 'HSC 2nd Year (Class 12)', shortEn: 'HSC 2nd Yr', shortBn: 'HSC ২য় বর্ষ' },
};

// 3. Subjects
export const subjectNames: Record<string, { bn: string; en: string }> = {
  'সকল বিষয়': { bn: 'সকল বিষয়', en: 'All Subjects' },
  'হস্তলিপি ও বর্ণমালা': { bn: 'হস্তলিপি ও বর্ণমালা', en: 'Handwriting & Alphabet' },
  'প্রাথমিক গণিত': { bn: 'প্রাথমিক গণিত', en: 'Elementary Mathematics' },
  'গণিত নামতা ও জ্যামিতি': { bn: 'গণিত নামতা ও জ্যামিতি', en: 'Math Tables & Geometry' },
  'প্রাথমিক বিজ্ঞান': { bn: 'প্রাথমিক বিজ্ঞান', en: 'Elementary Science' },
  'ইংরেজি ভোকাবুলারি': { bn: 'ইংরেজি ভোকাবুলারি', en: 'English Vocabulary' },
  'বৃত্তি সাধারণ গণিত': { bn: 'বৃত্তি সাধারণ গণিত', en: 'Scholarship Mathematics' },
  'বৃত্তি মডেল টেস্ট': { bn: 'বৃত্তি মডেল টেস্ট', en: 'Scholarship Model Tests' },
  'সাধারণ গণিত': { bn: 'সাধারণ গণিত', en: 'General Mathematics' },
  'উচ্চতর গণিত': { bn: 'উচ্চতর গণিত', en: 'Higher Mathematics' },
  'পদার্থবিজ্ঞান': { bn: 'পদার্থবিজ্ঞান', en: 'Physics' },
  'রসায়ন': { bn: 'রসায়ন', en: 'Chemistry' },
  'জীববিজ্ঞান': { bn: 'জীববিজ্ঞান', en: 'Biology' },
  'তথ্য ও যোগাযোগ প্রযুক্তি': { bn: 'তথ্য ও যোগাযোগ প্রযুক্তি', en: 'ICT' },
  'বিজ্ঞান': { bn: 'বিজ্ঞান', en: 'General Science' },
  'বাংলা সাহিত্য ও ব্যাকরণ': { bn: 'বাংলা সাহিত্য ও ব্যাকরণ', en: 'Bangla Literature & Grammar' },
  'ইংরেজি গ্রামার ও কম্পোজিশন': { bn: 'ইংরেজি গ্রামার ও কম্পোজিশন', en: 'English Grammar & Composition' },
  'স্টাডি প্ল্যানার': { bn: 'স্টাডি প্ল্যানার', en: 'Study Planner' },
  'পরীক্ষা প্রস্তুতি': { bn: 'পরীক্ষা প্রস্তুতি', en: 'Exam Preparation' },
  'মডেল টেস্ট': { bn: 'মডেল টেস্ট', en: 'Model Test Bank' },
  'গণিত': { bn: 'গণিত', en: 'Mathematics' },
  'পদার্থবিজ্ঞান ১ম পত্র': { bn: 'পদার্থবিজ্ঞান ১ম পত্র', en: 'Physics 1st Paper' },
  'পদার্থবিজ্ঞান ২য় পত্র': { bn: 'পদার্থবিজ্ঞান ২য় পত্র', en: 'Physics 2nd Paper' },
  'রসায়ন ১ম পত্র': { bn: 'রসায়ন ১ম পত্র', en: 'Chemistry 1st Paper' },
  'রসায়ন ২য় পত্র': { bn: 'রসায়ন ২য় পত্র', en: 'Chemistry 2nd Paper' },
  'উচ্চতর গণিত ১ম পত্র': { bn: 'উচ্চতর গণিত ১ম পত্র', en: 'Higher Math 1st Paper' },
  'উচ্চতর গণিত ২য় পত্র': { bn: 'উচ্চতর গণিত ২য় পত্র', en: 'Higher Math 2nd Paper' },
  'জীববিজ্ঞান ১ম পত্র': { bn: 'জীববিজ্ঞান ১ম পত্র', en: 'Biology 1st Paper' },
  'জীববিজ্ঞান ২য় পত্র': { bn: 'জীববিজ্ঞান ২য় পত্র', en: 'Biology 2nd Paper' },
  'ICT (তথ্য ও যোগাযোগ প্রযুক্তি)': { bn: 'ICT (তথ্য ও যোগাযোগ প্রযুক্তি)', en: 'Information & Communication Tech (ICT)' },
};

// 4. Products Translations Map
export const productTranslations: Record<string, ItemTranslation> = {
  'prod-c1-1': {
    titleBn: '১ম শ্রেণি বাংলা বর্ণমালা ও ইংরেজি হস্তলিপি প্র্যাকটিস ওয়ার্কবুক',
    titleEn: 'Class 1 Bangla Alphabet & English Handwriting Practice Workbook',
    shortDescBn: 'স্বরবর্ণ, ব্যঞ্জনবর্ণ ও ইংরেজি বর্ণমালার ডটেড ট্রেসিং এবং সুন্দর হাতের লেখার রঙিন ডিজিটাল ওয়ার্কবুক।',
    shortDescEn: 'Color digital workbook for Bengali and English handwriting with dotted tracing lines.',
    subjectBn: 'হস্তলিপি ও বর্ণমালা',
    subjectEn: 'Handwriting & Alphabet',
    badgeBn: 'সেরা শিশুতোষ বই',
    badgeEn: 'Best for Kids'
  },
  'prod-c1-2': {
    titleBn: '১ম শ্রেণি প্রাথমিক গণিত ছবি দেখে গণনা ও সহজ যোগ-বিয়োগ শিট',
    titleEn: 'Class 1 Math Number Counting & Basic Addition-Subtraction Sheet',
    shortDescBn: '১ থেকে ৫০ পর্যন্ত গণনা, ছবি দেখে সংখ্যা মেলানো এবং এক অঙ্কের সহজ যোগ-বিয়োগের রঙিন অ্যাক্টিভিটি শিট।',
    shortDescEn: '1 to 50 counting, visual matching and single-digit arithmetic practice sheets.',
    subjectBn: 'প্রাথমিক গণিত',
    subjectEn: 'Elementary Math',
    badgeBn: '১০০% ফ্রি স্যাম্পল',
    badgeEn: '100% Free Sample'
  },
  'prod-c2-1': {
    titleBn: '২য় শ্রেণি গণিত নামতা চার্ট (১–১০) ও জ্যামিতিক আকৃতি বেসিক ওয়ার্কবুক',
    titleEn: 'Class 2 Math Multiplication Tables (1-10) & Geometric Shapes Workbook',
    shortDescBn: '১ থেকে ১০ এর নামতার ছড়া, গুণ করার শর্টকাট কৌশল ও ত্রিভুজ-বৃত্ত আঁকার রঙিন প্র্যাকটিস বুক।',
    shortDescEn: 'Multiplication tables, shortcut tricks and fun shape drawing worksheets for Class 2.',
    subjectBn: 'গণিত নামতা ও জ্যামিতি',
    subjectEn: 'Math Tables & Geometry',
    badgeBn: 'বেস্টসেলার',
    badgeEn: 'Bestseller'
  },
  'prod-c3-1': {
    titleBn: '৩য় শ্রেণি প্রাথমিক বিজ্ঞান রঙিন ডায়াগ্রাম ও প্রশ্নোত্তর হ্যান্ডনোট',
    titleEn: 'Class 3 Elementary Science Illustrated Diagrams & Question-Answer Note',
    shortDescBn: 'জীব ও জড়, পুষ্টি উপাদান এবং পরিবেশ দূষণ অধ্যায়ের চিত্রসহ সহজ রঙিন ডিজিটাল নোট।',
    shortDescEn: 'Living vs non-living, nutrition charts and easy illustrated answers for Class 3.',
    subjectBn: 'প্রাথমিক বিজ্ঞান',
    subjectEn: 'Elementary Science',
    badgeBn: 'রঙিন চিত্রসহ',
    badgeEn: 'Illustrated'
  },
  'prod-c3-2': {
    titleBn: '৩য় শ্রেণি ইংরেজি Vocabulary Flashcards ও Daily Sentence Maker',
    titleEn: 'Class 3 English Vocabulary Flashcards & Daily Sentence Maker',
    shortDescBn: '৩০০টি অতিপ্রয়োজনীয় শব্দার্থ, রঙিন ছবি এবং বাক্য তৈরির স্পেশাল প্র্যাকটিস শিট।',
    shortDescEn: '300 essential words with picture flashcards and sentence building templates.',
    subjectBn: 'ইংরেজি ভোকাবুলারি',
    subjectEn: 'English Vocabulary',
    badgeBn: '১০০% ফ্রি',
    badgeEn: '100% Free'
  },
  'prod-c4-1': {
    titleBn: '৪র্থ শ্রেণি গণিত ৪ প্রক্রিয়া, ভগ্নাংশ ও পরিমাপ সমাধান ডাইজেস্ট',
    titleEn: 'Class 4 Math 4 Operations, Fractions & Measurement Solution Digest',
    shortDescBn: 'ঐকিক নিয়ম, সাধারণ ভগ্নাংশ যোগ-বিয়োগ ও ওজন-পরিমাপের সম্পূর্ণ অনুশীলনীর চিত্রভিত্তিক হ্যান্ডনোট।',
    shortDescEn: 'Step-by-step unitary method, fractions and measurement handbook for Class 4.',
    subjectBn: 'প্রাথমিক গণিত',
    subjectEn: 'Elementary Math',
    badgeBn: 'বোর্ড কারিকুলাম',
    badgeEn: 'Board Curriculum'
  },
  'prod-c5-1': {
    titleBn: '৫ম শ্রেণি প্রাথমিক বৃত্তি পরীক্ষা স্পেশাল গণিত কাঠামাবদ্ধ প্রশ্ন ব্যাংক',
    titleEn: 'Class 5 Primary Scholarship Math Structured Question Bank',
    shortDescBn: 'শতকরা, লাভ-ক্ষতি, সরল মুনাফা ও জ্যামিতির কাঠামাবদ্ধ ১০০% কমন উপযোগী মডেল সমাধান বুক।',
    shortDescEn: '100% competency-based structured question bank for Class 5 Primary Scholarship.',
    subjectBn: 'বৃত্তি সাধারণ গণিত',
    subjectEn: 'Scholarship Math',
    badgeBn: 'ট্যালেন্টপুল স্পেশাল',
    badgeEn: 'Talentpool Special'
  },
  'prod-c5-2': {
    titleBn: '৫ম শ্রেণি বৃত্তি পরীক্ষা অল-ইন-ওয়ান ২০ সেট মেগা মডেল টেস্ট ও ওএমআর শিট',
    titleEn: 'Class 5 Scholarship 20 Sets Mega Model Test & Printable OMR Sheets',
    shortDescBn: 'বাংলা, ইংরেজি, গণিত ও বিজ্ঞানের ২০ সেট পূর্ণাঙ্গ ওএমআর স্ট্যান্ডার্ড প্রশ্ন ও নির্ভুল সলিউশন বুক।',
    shortDescEn: '20 complete sets of official board pattern model tests with printable OMR sheets.',
    subjectBn: 'বৃত্তি মডেল টেস্ট',
    subjectEn: 'Scholarship Model Test',
    badgeBn: 'সর্বাধিক জনপ্রিয়',
    badgeEn: 'Most Popular'
  },
  'prod-1': {
    titleBn: 'ক্লাস ৬ গণিত সম্পূর্ণ নতুন কারিকুলাম ডিজিটাল হ্যান্ডনোটস',
    titleEn: 'Class 6 Mathematics Complete Curriculum Digital Handnotes',
    shortDescBn: 'সংখ্যার গল্প, দ্বিমাত্রিক বস্তুর গল্প, সূত্র খুঁজি সূত্র বুঝি অধ্যায়ের সম্পূর্ণ সমাধান ও কালারফুল নোটস।',
    shortDescEn: 'Full chapter solutions and colorful visual concept notes for Class 6 Mathematics.',
    subjectBn: 'সাধারণ গণিত',
    subjectEn: 'General Math',
    badgeBn: 'নতুন কারিকুলাম',
    badgeEn: 'New Curriculum'
  },
  'prod-2': {
    titleBn: 'ক্লাস ৭ বিজ্ঞান অনুসন্ধানী ও অনুশীলন পাঠ রঙিন ফর্মুলা শিট',
    titleEn: 'Class 7 Science Inquiry & Practice Book Colorful Formula Sheet',
    shortDescBn: 'কোষ ও অণুজীব, পদার্থের গঠন এবং শক্তির রূপান্তর অধ্যায়ের চিত্রভিত্তিক সামারি ও প্রশ্নব্যাংক।',
    shortDescEn: 'Illustrated summary charts and inquiry question banks for Class 7 Science.',
    subjectBn: 'বিজ্ঞান',
    subjectEn: 'General Science',
    badgeBn: '১০০% ফ্রি',
    badgeEn: '100% Free'
  },
  'prod-3': {
    titleBn: 'ক্লাস ৮ জুনিয়র বৃত্তি পরীক্ষা স্পেশাল গণিত ও বিজ্ঞান কমপ্লিট বান্ডেল',
    titleEn: 'Class 8 Junior Scholarship Math & Science Complete Bundle',
    shortDescBn: 'প্যাটার্ন, মুনাফা, পরিমাপ এবং বিজ্ঞানের রাসায়নিক বিক্রিয়া ও অম্ল-ক্ষার অধ্যায়ের মেগা হ্যান্ডনোট।',
    shortDescEn: 'Mega handnotes for pattern, profit, mensuration and chemical reactions for Class 8.',
    subjectBn: 'সাধারণ গণিত',
    subjectEn: 'General Math',
    badgeBn: 'মেধাবৃত্তি স্পেশাল',
    badgeEn: 'Merit Scholarship'
  },
  'prod-4': {
    titleBn: 'ক্লাস ৯-১০ এসএসসি সাধারণ গণিত টাইপভিত্তিক অধ্যায়ওয়ারী হ্যান্ডনোট',
    titleEn: 'SSC Class 9-10 General Math Type-Wise Chapter Handnotes',
    shortDescBn: 'বাস্তব সংখ্যা, বীজগণিতীয় রাশি, ত্রিকোণমিতি ও বৃত্ত উপপাদ্যের ১৭টি অধ্যায়ের ১০০% সমাধান বুক।',
    shortDescEn: '100% type-based problem solving notebook covering all 17 General Math chapters.',
    subjectBn: 'সাধারণ গণিত',
    subjectEn: 'General Math',
    badgeBn: 'A+ নিশ্চিত',
    badgeEn: 'A+ Guaranteed'
  },
  'prod-5': {
    titleBn: 'এসএসসি উচ্চতর গণিত সকল সূত্রের মেগা চিটশিট ও ক্যালকুলেটর শর্টকাট',
    titleEn: 'SSC Higher Math All Formulas Mega Cheat Sheet & Calculator Hacks',
    shortDescBn: 'স্থানাঙ্ক জ্যামিতি, দ্বিপদী বিস্তৃতি, ত্রিকোণমিতি ও ক্যালকুলাস সূত্রের এক নজরে রিভিশন চার্ট।',
    shortDescEn: 'One-glance formula chart and calculator tricks for SSC Higher Mathematics.',
    subjectBn: 'উচ্চতর গণিত',
    subjectEn: 'Higher Math',
    badgeBn: 'বেস্টসেলার',
    badgeEn: 'Bestseller'
  },
  'prod-6': {
    titleBn: 'এসএসসি পদার্থবিজ্ঞান সৃজনশীল উদ্দীপক ডিকোডিং ও ম্যাথ মাস্টারবুক',
    titleEn: 'SSC Physics Creative Stimulus Decoding & Math Masterbook',
    shortDescBn: 'গতি, বল, কাজ-শক্তি ও চলতড়িৎ অধ্যায়ের সকল গাণিতিক সমস্যার শর্টকাট ও চিত্রভিত্তিক সমাধান।',
    shortDescEn: 'Kinematics, dynamics, work-energy and electrical circuits CQ master solution book.',
    subjectBn: 'পদার্থবিজ্ঞান',
    subjectEn: 'Physics',
    badgeBn: 'শীর্ষ রেটেড',
    badgeEn: 'Top Rated'
  },
  'prod-7': {
    titleBn: 'এসএসসি রসায়ন সমীকরণ ব্যালেন্সিং ও জৈব যৌগ রূপান্তর চার্ট',
    titleEn: 'SSC Chemistry Equation Balancing & Organic Reaction Chart',
    shortDescBn: 'পর্যায় সারণি ট্রিকস, রাসায়নিক গণনা (মোল) এবং হাইড্রোকার্বনের রূপান্তরের মেগা পোস্টার PDF।',
    shortDescEn: 'Periodic table tricks, mole stoichiometry, and hydrocarbon reaction roadmaps.',
    subjectBn: 'রসায়ন',
    subjectEn: 'Chemistry',
    badgeBn: 'প্রিন্ট রেডি',
    badgeEn: 'Print Ready'
  },
  'prod-8': {
    titleBn: 'এসএসসি জীববিজ্ঞান ১০০টি মোস্ট ইম্পর্ট্যান্ট লেবেলযুক্ত চিত্র সংকলন',
    titleEn: 'SSC Biology 100 Most Important Labeled Diagram Collection',
    shortDescBn: 'কোষের অঙ্গাণু, হৃৎপিণ্ড, বৃক্ক ও ফুল-পাতার হাই-রেজ্যুলিউশন হ্যান্ড-ড্রন চিত্র ও লেবেলিং।',
    shortDescEn: 'High-resolution hand-drawn biology diagrams for organ cells, heart, nephron & plants.',
    subjectBn: 'জীববিজ্ঞান',
    subjectEn: 'Biology',
    badgeBn: '১০০% ফ্রি',
    badgeEn: '100% Free'
  },
  'prod-9': {
    titleBn: 'এসএসসি বাংলা ২য় পত্র ১০০ তে ১০০ ব্যাকরণ ও নির্মিতি ডাইজেস্ট',
    titleEn: 'SSC Bangla 2nd Paper Grammar & Composition 100/100 Digest',
    shortDescBn: 'ধ্বনি পরিবর্তন, সমাস, প্রত্যয় ও সারাংশ-ভাবসম্প্রসারণের ১০০% কমন উপযোগী সাজেশন বুক।',
    shortDescEn: 'Comprehensive grammar rules, compound words, and writing templates for SSC Bangla.',
    subjectBn: 'বাংলা সাহিত্য ও ব্যাকরণ',
    subjectEn: 'Bangla Grammar',
    badgeBn: 'বোর্ড স্পেশাল',
    badgeEn: 'Board Special'
  },
  'prod-10': {
    titleBn: 'এসএসসি অল-ইন-ওয়ান ৯টি বিষয়ের ১৫ সেট মেগা মডেল টেস্ট পেপার',
    titleEn: 'SSC All-in-One 9 Subjects 15 Sets Mega Model Test Paper',
    shortDescBn: 'শীর্ষ ১০টি ক্যাডেট ও সরকারি স্কুলের টেস্ট পেপারের বাছাইকৃত প্রশ্ন ও বোর্ড স্ট্যান্ডার্ড সমাধান।',
    shortDescEn: '15 sets of official board standard test papers selected from top cadet colleges.',
    subjectBn: 'মডেল টেস্ট',
    subjectEn: 'Model Test Bank',
    badgeBn: 'মেগা বান্ডেল',
    badgeEn: 'Mega Bundle'
  },
  'prod-11': {
    titleBn: 'HSC ১ম বর্ষ পদার্থবিজ্ঞান ১ম পত্র পূর্ণাঙ্গ হ্যান্ডনোট ও ম্যাথ ব্যাংক',
    titleEn: 'HSC 1st Year Physics 1st Paper Complete Handnotes & Math Bank',
    shortDescBn: 'ভেক্টর, নিউটোনিয়ান বলবিদ্যা, কাজ-শক্তি ও পর্যাবৃত্ত গতির গভীর কনসেপ্ট ও ক্যালকুলেটর শর্টকাট।',
    shortDescEn: 'Vectors, Newtonian mechanics, work-power & periodic motion concepts and formulas.',
    subjectBn: 'পদার্থবিজ্ঞান ১ম পত্র',
    subjectEn: 'Physics 1st Paper',
    badgeBn: 'টপ সেলার',
    badgeEn: 'Top Seller'
  },
  'prod-12': {
    titleBn: 'HSC ২য় বর্ষ পদার্থবিজ্ঞান ২য় পত্র বিদ্যুৎ ও আধুনিক পদার্থবিজ্ঞান নোট',
    titleEn: 'HSC 2nd Year Physics 2nd Paper Electricity & Modern Physics Note',
    shortDescBn: 'স্থির তড়িৎ, চলতড়িৎ, আলো ও পরমাণু মডেল অধ্যায়ের সার্কিট শর্টকাট এবং বোর্ড সলিউশন।',
    shortDescEn: 'Electrostatics, current electricity, optics and atomic models with circuit shortcuts.',
    subjectBn: 'পদার্থবিজ্ঞান ২য় পত্র',
    subjectEn: 'Physics 2nd Paper',
    badgeBn: 'গোল্ডেন A+',
    badgeEn: 'Golden A+'
  },
  'prod-13': {
    titleBn: 'HSC রসায়ন ১ম পত্র গুণগত রসায়ন ও পর্যায়বৃত্ত ধর্ম মাস্টারনোট',
    titleEn: 'HSC Chemistry 1st Paper Qualitative Chemistry & Periodic Trends',
    shortDescBn: 'দ্রাব্যতা গুণফল (Ksp), বর্ণালী, হাইব্রিডাইজেশন ও জ্যামিতিক কাঠামোর রঙিন ডায়াগ্রাম বুক।',
    shortDescEn: 'Solubility products, spectroscopy, hybridization and chemical bond diagrams.',
    subjectBn: 'রসায়ন ১ম পত্র',
    subjectEn: 'Chemistry 1st Paper',
    badgeBn: 'রঙিন চার্ট',
    badgeEn: 'Color Charts'
  },
  'prod-14': {
    titleBn: 'HSC ২য় বর্ষ জৈব রসায়ন মেগা কনভার্সন রোডম্যাপ ও বিক্রিয়া চার্ট',
    titleEn: 'HSC 2nd Year Organic Chemistry Mega Reaction & Conversion Roadmap',
    shortDescBn: 'অ্যালকেন থেকে শুরু করে পলিমার পর্যন্ত সকল জৈব বিক্রিয়ার এক নজরে দেখার মেগা রিঅ্যাকশন চার্ট।',
    shortDescEn: 'Alkanes to aromatic polymers: complete visual reaction pathways on a single chart.',
    subjectBn: 'রসায়ন ২য় পত্র',
    subjectEn: 'Chemistry 2nd Paper',
    badgeBn: 'এডমিশন হ্যাকস',
    badgeEn: 'Admission Hacks'
  },
  'prod-15': {
    titleBn: 'HSC উচ্চতর গণিত ১ম পত্র ক্যালকুলাস (অন্তরীকরণ ও যোগজীকরণ) হ্যান্ডবুক',
    titleEn: 'HSC Higher Math 1st Paper Calculus (Differentiation & Integration)',
    shortDescBn: 'লিমিট, ইউভি ফর্মুলা, স্পর্শক-অভিলম্ব এবং ক্ষেত্রফল নির্ণয়ের সুপার শর্টকাট টেকনিক।',
    shortDescEn: 'Limits, product rule, tangent-normals and definite integral calculation hacks.',
    subjectBn: 'উচ্চতর গণিত ১ম পত্র',
    subjectEn: 'Higher Math 1st Paper',
    badgeBn: 'বুয়েট স্ট্যান্ডার্ড',
    badgeEn: 'BUET Standard'
  },
  'prod-16': {
    titleBn: 'HSC উচ্চতর গণিত ২য় পত্র কণিক, বিপরীত ত্রিকোণমিতি ও গতিবিদ্যা',
    titleEn: 'HSC Higher Math 2nd Paper Conics, Inverse Trig & Dynamics',
    shortDescBn: 'পরাবৃত্ত-উপবৃত্ত নির্ণয়, প্রজেক্টাইল মোশন এবং স্থিতিবিদ্যার লামির উপপাদ্য সমাধানের গাইড।',
    shortDescEn: 'Parabolas, ellipses, projectile motion and Lamis theorem step-by-step notes.',
    subjectBn: 'উচ্চতর গণিত ২য় পত্র',
    subjectEn: 'Higher Math 2nd Paper',
    badgeBn: 'শীর্ষ রেটেড',
    badgeEn: 'Top Rated'
  },
  'prod-17': {
    titleBn: 'HSC ICT ৩য়, ৪র্থ ও ৫ম অধ্যায় (HTML, C প্রোগ্রামিং ও লজিক গেট)',
    titleEn: 'HSC ICT Chapter 3, 4 & 5 (HTML, C Programming & Logic Gates)',
    shortDescBn: 'বাইনারি সংখ্যা রূপান্তর, বুলিয়ান অ্যালজেব্রা, টেবিল ট্যাগ এবং সি লুপের হুবহু সমাধান বুক।',
    shortDescEn: 'Binary systems, Boolean logic gates, HTML tables and C programming loops.',
    subjectBn: 'ICT (তথ্য ও যোগাযোগ প্রযুক্তি)',
    subjectEn: 'ICT',
    badgeBn: '১০০% কমন',
    badgeEn: '100% Common'
  },
  'prod-18': {
    titleBn: 'HSC বিজ্ঞান বিভাগ ৩০ সেট বোর্ড স্ট্যান্ডার্ড মেগা মডেল টেস্ট ও সলিউশন',
    titleEn: 'HSC Science 30 Sets Official Board Standard Mega Model Tests',
    shortDescBn: 'পদার্থ, রসায়ন, গণিত ও জীববিজ্ঞানের বিগত ১২ বছরের প্রশ্নের সমন্বয়ে তৈরি পূর্ণাঙ্গ টেস্ট।',
    shortDescEn: '30 complete sets of official board exam model questions with marking scheme.',
    subjectBn: 'মডেল টেস্ট',
    subjectEn: 'Model Test Bank',
    badgeBn: 'বোর্ড টপার বান্ডেল',
    badgeEn: 'Board Topper Bundle'
  },
  'prod-19': {
    titleBn: 'আলটিমেট স্টুডেন্ট স্টাডি ও গোল ট্র্যাকার ডিজিটাল প্ল্যানার ২০২৬',
    titleEn: 'Ultimate Student Study & Goal Tracker Digital Planner 2026',
    shortDescBn: 'দৈনিক পড়ার রুটিন, অধ্যায় সমাপ্তি চেকলিস্ট, পরীক্ষার কাউন্টডাউন ও রিভিশন ট্র্যাকার।',
    shortDescEn: 'Daily study routines, chapter progress checklists, countdowns & habit trackers.',
    subjectBn: 'স্টাডি প্ল্যানার',
    subjectEn: 'Study Planner',
    badgeBn: 'আনলিমিটেড প্রিন্ট',
    badgeEn: 'Unlimited Print'
  },
  'prod-20': {
    titleBn: 'এইচএসসি ও এসএসসি পরীক্ষার আগের রাতের ফাস্ট-রিভিশন চিটশিট',
    titleEn: 'HSC & SSC Night-Before-Exam Fast-Revision Formula Sheets',
    shortDescBn: 'সকল সূত্রের ডেরিভেশন ছাড়া ঝটপট রিভিশন দেওয়ার ৭ পাতার কমপ্যাক্ট ফর্মুলা শিট।',
    shortDescEn: '7-page compact formula sheet for quick memorization before exam hall entry.',
    subjectBn: 'পরীক্ষা প্রস্তুতি',
    subjectEn: 'Exam Preparation',
    badgeBn: '১০০% ফ্রি',
    badgeEn: '100% Free'
  }
};

// 5. Why Choose Us Items
export const chooseUsList = [
  {
    num: '1',
    titleBn: 'বিশেষজ্ঞ শিক্ষকদের দ্বারা প্রস্তুতকৃত',
    titleEn: 'Prepared by Expert Educators',
    descBn: 'শীর্ষস্থানীয় নটর ডেম, বুয়েট ও ঢাকা বিশ্ববিদ্যালয়ের সাবেক মেধাবী শিক্ষার্থীদের গভীর গবেষণায় তৈরি।',
    descEn: 'Meticulously crafted by top alumni and faculty from Notre Dame, BUET and Dhaka University.'
  },
  {
    num: '2',
    titleBn: 'সর্বোচ্চ প্রিন্ট ও রিডিং কোয়ালিটি',
    titleEn: 'Uncompromising Print & Reading Quality',
    descBn: 'স্পষ্ট বাংলা ফন্ট, রঙিন চিত্র ও আধুনিক লেআউটে তৈরি—যা পড়ালেখা আনন্দদায়ক করে তোলে।',
    descEn: 'Crisp typography, colorful vector graphics and distraction-free layouts designed for joyful learning.'
  },
  {
    num: '3',
    titleBn: 'আজীবন এক্সেস ও ফ্রি আপডেট',
    titleEn: 'Lifetime Access & Free Updates',
    descBn: 'একবার ক্রয়ে আজীবন ফাইল সংরক্ষণ এবং সিলেবাসে পরিবর্তন এলে বিনামূল্যে হালনাগাদ ভার্সন।',
    descEn: 'One-time purchase gives you permanent file storage with complimentary syllabus updates.'
  },
  {
    num: '4',
    titleBn: 'সময় ও অর্থ বাঁচানোর স্মার্ট উপায়',
    titleEn: 'Smart Way to Save Time & Money',
    descBn: 'মোটা মোটা বইয়ের অপ্রয়োজনীয় পাতার ভিড়ে হারিয়ে না গিয়ে মূল কনসেপ্টে দ্রুত দক্ষতা অর্জন।',
    descEn: 'Skip bulky textbooks and master core concepts faster with targeted high-yield summaries.'
  }
];

// 6. Promotional Bundles
export const promoBundles = [
  {
    badgeBn: 'স্কুল স্পেশাল',
    badgeEn: 'School Special',
    discountBn: '৫০% ছাড়',
    discountEn: '50% OFF',
    titleBn: 'বার্ষিক পরীক্ষা অল-ইন-ওয়ান মডেল টেস্ট বান্ডেল (ক্লাস ৬–১০)',
    titleEn: 'Annual Exam All-in-One Model Test Bundle (Class 6-10)',
    descBn: 'গণিত, বিজ্ঞান, ইংরেজি ও বাংলার জন্য ২০ সেট শীর্ষ স্কুলের প্রশ্ন এবং শতভাগ নির্ভরযোগ্য সমাধান ম্যানুয়াল।',
    descEn: '20 sets of top school exam questions and official solution manuals for Math, Science, English & Bangla.',
    priceBn: '৳ ২২০',
    priceEn: 'BDT 220',
    originalPriceBn: '৳ ৪৫০',
    originalPriceEn: 'BDT 450',
    url: '/product/class-8-annual-exam-model-test-bundle',
    btnTextBn: 'বান্ডেল সংগ্রহ করুন',
    btnTextEn: 'Get Bundle Now'
  },
  {
    badgeBn: 'কলেজ স্পেশাল',
    badgeEn: 'College Special',
    discountBn: '৫০% ছাড়',
    discountEn: '50% OFF',
    titleBn: 'HSC বোর্ড স্ট্যান্ডার্ড মেগা মডেল টেস্ট ও ওএমআর বান্ডেল',
    titleEn: 'HSC Board Standard Mega Model Test & OMR Bundle',
    descBn: 'পদার্থ, রসায়ন, উচ্চতর গণিত ও জীববিজ্ঞান বিষয়ের ৩০ সেট কমপ্লিট বোর্ড স্ট্যান্ডার্ড টেস্ট ও নম্বর বণ্টন।',
    descEn: '30 complete sets of board-pattern model tests with OMR evaluation for Physics, Chemistry, Math & Biology.',
    priceBn: '৳ ২৮০',
    priceEn: 'BDT 280',
    originalPriceBn: '৳ ৫৬০',
    originalPriceEn: 'BDT 560',
    url: '/product/hsc-mega-model-test-exam-bundle',
    btnTextBn: 'বান্ডেল সংগ্রহ করুন',
    btnTextEn: 'Get Bundle Now'
  }
];

// 7. FAQs bilingual
export const bilingualFaqs = [
  {
    id: 'faq-1',
    qBn: 'ডিজিটাল প্রোডাক্ট কীভাবে কিনবো?',
    qEn: 'How do I purchase a digital product?',
    aBn: 'প্রথমে আপনার পছন্দের প্রোডাক্টটি বেছে নিয়ে "কার্টে যোগ করুন" অথবা সরাসরি "এখনই কিনুন" বাটনে ক্লিক করুন। চেকআউট পেজে নাম, ইমেইল ও মোবাইল নম্বর দিয়ে পেমেন্ট মেথড (bKash/Nagad/Rocket) নির্বাচন করুন। মোবাইল ওয়ালেট থেকে সেন্ড মানি বা পেমেন্ট করে TrxID লিখে সাবমিট করলেই অর্ডার সম্পন্ন হবে।',
    aEn: 'Select your desired product and click "Buy Now" or "Add to Cart". Enter your name, email, and mobile number at checkout, choose your preferred payment method (bKash, Nagad, Rocket, or Card), complete the transaction, and submit the TrxID.'
  },
  {
    id: 'faq-2',
    qBn: 'পেমেন্ট সম্পন্ন হওয়ার পর ফাইল কীভাবে ডাউনলোড করবো?',
    qEn: 'How do I download files after completing payment?',
    aBn: 'অর্ডার সফল হওয়ার সাথে সাথেই "Order Success" পেজে আপনি ফাইল ডাউনলোডের সরাসরি লিংক পেয়ে যাবেন। এছাড়া আপনার "My Account" এর Downloads সেকশনে সবসময় ফাইল সংরক্ষিত থাকবে। আপনি যেকোনো সময় যতবার ইচ্ছা ডাউনলোড করতে পারবেন।',
    aEn: 'Immediately after successful payment, a direct download link will appear on the Order Confirmation page. The file also remains permanently stored in your My Account Downloads tab.'
  },
  {
    id: 'faq-3',
    qBn: 'কী কী মাধ্যমে পেমেন্ট করা যায়?',
    qEn: 'What payment methods are supported?',
    aBn: 'আমরা বাংলাদেশের সকল জনপ্রিয় ডিজিটাল পেমেন্ট মেথড গ্রহণ করি: bKash, Nagad, Rocket এবং দেশি-বিদেশি যেকোনো ভিসা বা মাস্টারকার্ড। বিকাশ ও নগদে সরাসরি সেন্ড মানি বা মার্চেন্ট পেমেন্ট সুবিধা রয়েছে।',
    aEn: 'We support all major Bangladeshi payment channels: bKash, Nagad, Rocket, as well as Visa and Mastercard credit/debit cards.'
  },
  {
    id: 'faq-4',
    qBn: 'ডিজিটাল ফাইলে কোনো পাসওয়ার্ড থাকবে কি?',
    qEn: 'Are the digital PDF files password-protected?',
    aBn: 'না, আমাদের সকল PDF ফাইল সম্পূর্ণ আনলকড ও পাসওয়ার্ড মুক্ত। আপনি যেকোনো ডিভাইসে (মোবাইল, ল্যাপটপ, ট্যাবলেট) সহজে পড়তে পারবেন এবং চাইলে নিজের সুবিধার্থে প্রিন্ট করে নিতে পারবেন।',
    aEn: 'No, all our PDF files are completely unlocked and password-free. You can comfortably read them on mobile, tablet, or laptop, and print them freely.'
  },
  {
    id: 'faq-5',
    qBn: 'ফাইল অ্যাক্সেসের মেয়াদ কতদিন?',
    qEn: 'How long do I have access to the purchased files?',
    aBn: 'একবার ক্রয় করলে আপনার ডাউনলোড এক্সেস আজীবন (Lifetime Access) থাকবে। ভবিষ্যতে যদি উক্ত ফাইলে কোনো আপডেট বা নতুন সংস্করণ আসে, আপনি বিনামূল্যে আপডেটেড ফাইল ডাউনলোড করতে পারবেন।',
    aEn: 'You get permanent Lifetime Access with a single purchase. Whenever a syllabus update or revised edition is released, you receive the updated files for free.'
  },
  {
    id: 'faq-6',
    qBn: 'ডিজিটাল প্রোডাক্টের ক্ষেত্রে কি রিফান্ড পাওয়া যায়?',
    qEn: 'Is there a refund policy for digital products?',
    aBn: 'ডিজিটাল ফাইল ডাউনলোডের লিঙ্ক সক্রিয় হওয়ার পর সাধারণত রিফান্ড দেওয়া হয় না। তবে ফাইলে কোনো ত্রুটি বা পাঠযোগ্যতা সমস্যা থাকলে এবং আমাদের সাপোর্ট টিম সমাধান দিতে না পারলে ২৪ ঘণ্টার মধ্যে সম্পূর্ণ টাকা ফেরত দেওয়া হবে।',
    aEn: 'Digital goods are non-refundable once downloaded. However, if there is any file corruption or defect that our support team cannot resolve, we issue a 100% refund within 24 hours.'
  },
  {
    id: 'faq-7',
    qBn: 'কেনার আগে ফ্রি স্যাম্পল দেখা যাবে কি?',
    qEn: 'Can I preview a free sample before purchasing?',
    aBn: 'হ্যাঁ! আমাদের প্রতিটি প্রিমিয়াম বই ও নোটসের জন্য রয়েছে "ফ্রি স্যাম্পল প্রিভিউ"। এছাড়া আমাদের "ফ্রি প্রোডাক্ট" মেনু থেকে শতভাগ বিনামূল্যে স্টাডি শিট ও প্ল্যানার ডাউনলোড করতে পারবেন।',
    aEn: 'Yes! Every premium book features a Free Demo Sample pack. You can also download 100% free study sheets and planners from our Free Products section.'
  }
];

// 8. Testimonials bilingual
export const bilingualTestimonials = [
  {
    id: 't-1',
    nameBn: 'তানভীর আহমেদ',
    nameEn: 'Tanvir Ahmed',
    roleBn: 'HSC পরীক্ষার্থী',
    roleEn: 'HSC Candidate',
    institutionBn: 'নটর ডেম কলেজ, ঢাকা',
    institutionEn: 'Notre Dame College, Dhaka',
    avatarText: 'TA',
    badgeBn: 'HSC ব্যাচ',
    badgeEn: 'HSC Batch',
    rating: 5,
    commentBn: 'HSC পদার্থবিজ্ঞান ১ম ও ২য় পত্রের কনসেপ্ট বুকটি অসাধারণ! বিশেষ করে ক্যালকুলেটর শর্টকাট এবং সার্কিট রিডাকশনের টেকনিকগুলো আমার কলেজের টেস্ট পরীক্ষায় প্রচুর সময় বাঁচিয়েছে।',
    commentEn: 'The HSC Physics 1st & 2nd Paper Concept Book is outstanding! The calculator tricks and circuit shortcuts saved immense time during my college test exams.'
  },
  {
    id: 't-2',
    nameBn: 'ফারজানা ইয়াসমিন',
    nameEn: 'Farzana Yasmin',
    roleBn: 'অভিভাবক (দশম শ্রেণি)',
    roleEn: 'Guardian (Class 10)',
    institutionBn: 'ভিকারুননিসা নূন স্কুল অ্যান্ড কলেজ',
    institutionEn: 'Viqarunnisa Noon School & College',
    avatarText: 'FY',
    badgeBn: 'সন্তুষ্ট অভিভাবক',
    badgeEn: 'Satisfied Parent',
    rating: 5,
    commentBn: 'আমার মেয়ের এসএসসি গণিত নিয়ে অনেক ভীতি ছিল। এখানকার সাধারণ গণিত হ্যান্ডনোট আর অল-ইন-ওয়ান প্ল্যানার প্রিন্ট করে দেওয়ার পর থেকে ওর পড়ার রুটিনে দারুণ শৃঙ্খলা এসেছে।',
    commentEn: 'My daughter was anxious about SSC Math. Printing the handwritten formula sheets and study planners brought remarkable discipline to her study schedule.'
  },
  {
    id: 't-3',
    nameBn: 'মাহমুদুল হাসান',
    nameEn: 'Mahmudul Hasan',
    roleBn: 'এসএসসি পরীক্ষার্থী',
    roleEn: 'SSC Candidate',
    institutionBn: 'রাজশাহী কলেজিয়েট স্কুল',
    institutionEn: 'Rajshahi Collegiate School',
    avatarText: 'MH',
    badgeBn: 'এসএসসি ব্যাচ',
    badgeEn: 'SSC Batch',
    rating: 5,
    commentBn: 'মডেল টেস্ট বান্ডেলের সমাধানগুলো এতো স্পষ্ট ও নির্ভুল যে নিজে নিজেই ভুলগুলো শুধরে নেওয়া যায়। ফ্রি স্যাম্পল দেখে অর্ডার করেছিলাম, হতাশ হতে হয়নি!',
    commentEn: 'The model test answer explanations are so clear and accurate that I can identify and rectify errors on my own. Excellent quality.'
  },
  {
    id: 't-4',
    nameBn: 'সুমাইয়া তাসনিম',
    nameEn: 'Sumaiya Tasnim',
    roleBn: 'HSC শিক্ষার্থী',
    roleEn: 'HSC Student',
    institutionBn: 'হলিক্রস কলেজ, ঢাকা',
    institutionEn: 'Holy Cross College, Dhaka',
    avatarText: 'ST',
    badgeBn: 'HSC রসায়ন',
    badgeEn: 'HSC Chemistry',
    rating: 5,
    commentBn: 'জৈব রসায়নের রূপান্তর চার্টটা আমার পড়ার টেবিলে প্রিন্ট করে সাঁটিয়ে রেখেছি। আগে বিক্রিয়া মনে থাকত না, এখন চোখের সামনে এক নজরে সব স্পষ্ট।',
    commentEn: 'I printed the organic chemistry reaction roadmap chart beside my desk. All multi-step synthesis reactions are now crystal clear at a glance.'
  }
];

// Helper to localize a product based on language
export function localizeProduct(product: any, lang: 'bn' | 'en') {
  if (!product) return product;
  const trans = productTranslations[product.id];
  const cat = categoryNames[product.category];
  const cls = classNames[product.classLevel];
  const sub = subjectNames[product.subject];

  const title = lang === 'en' ? (trans?.titleEn || product.title) : (trans?.titleBn || product.title);
  const shortDescription = lang === 'en' ? (trans?.shortDescEn || product.shortDescription) : (trans?.shortDescBn || product.shortDescription);
  const description = lang === 'en' ? (trans?.descEn || product.description) : (trans?.descBn || product.description);
  const subject = lang === 'en' ? (trans?.subjectEn || sub?.en || product.subject) : (trans?.subjectBn || sub?.bn || product.subject);
  const badge = lang === 'en' ? (trans?.badgeEn || (product.badge === '১০০% ফ্রি' ? '100% Free' : product.badge)) : (trans?.badgeBn || product.badge);
  const classLabel = lang === 'en' ? (cls?.shortEn || product.classLabel) : (cls?.shortBn || product.classLabel);
  const categoryLabel = lang === 'en' ? (cat?.en || product.categoryLabel) : (cat?.bn || product.categoryLabel);
  const format = lang === 'en' ? 'Printable Vector PDF (Unlocked)' : (product.format || 'প্রিন্ট ফ্রেন্ডলি PDF (আনলকড)');
  const features: string[] = lang === 'en' ? (trans?.featuresEn || product.features || []) : (trans?.featuresBn || product.features || []);
  const tableOfContents: string[] = lang === 'en' ? (trans?.tableOfContentsEn || product.tableOfContents || []) : (trans?.tableOfContentsBn || product.tableOfContents || []);

  return {
    ...product,
    title,
    shortDescription,
    description,
    features,
    tableOfContents,
    subject,
    badge,
    classLabel,
    categoryLabel,
    format
  };
}
