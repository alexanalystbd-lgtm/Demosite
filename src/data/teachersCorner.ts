export interface TeacherResource {
  id: string;
  title: string;
  category: 'lesson-plan' | 'question-bank' | 'assessment' | 'slides' | 'guideline';
  categoryLabel: string;
  classLevel: string;
  subject: string;
  fileFormat: string;
  fileSize: string;
  pageCount: number;
  downloadCount: number;
  rating: number;
  badge?: string;
  description: string;
  features: string[];
  themeColor: string;
}

export const sampleTeacherResources: TeacherResource[] = [
  {
    id: 'tr-1',
    title: 'নতুন শিক্ষাক্রম অনুযায়ী ষষ্ঠ ও সপ্তম শ্রেণির বাৎসরিক পাঠ পরিকল্পনা (Lesson Plan)',
    category: 'lesson-plan',
    categoryLabel: 'পাঠ পরিকল্পনা',
    classLevel: 'ক্লাস ৬ ও ৭',
    subject: 'সকল বিষয়',
    fileFormat: 'PDF + Editable Word (DOCX)',
    fileSize: '14.2 MB',
    pageCount: 112,
    downloadCount: 3840,
    rating: 4.9,
    badge: 'সেরা শিক্ষক রিসোর্স',
    description: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) প্রণীত নতুন মূল্যায়ন ও শিখন প্রক্রিয়ার আলোকে সম্পূর্ণ এক বছরের ৫০ মিনিটের ক্লাস উপযোগী দৈনিক ও সাপ্তাহিক লেসন প্ল্যান টেমপ্লেট।',
    features: [
      'শিখনফল ও যোগ্যতাভিত্তিক সেশন বিন্যাস',
      'দলগত ও একক কাজের সময় বণ্টন নির্দেশিকা',
      'প্রিন্ট ও এডিটেবল ওয়ার্ড ফাইল (নিজ স্কুলের নামে এডিটযোগ্য)',
      'মূল্যায়ন নির্দেশক (PI/BI) ট্র্যাকিং ছক সংবলিত'
    ],
    themeColor: '#0084a2'
  },
  {
    id: 'tr-2',
    title: 'এসএসসি সাধারণ ও উচ্চতর গণিত সৃজনশীল প্রশ্ন ব্যাংক ও ব্লু-প্রিন্ট টেমপ্লেট',
    category: 'question-bank',
    categoryLabel: 'প্রশ্ন ব্যাংক',
    classLevel: 'ক্লাস ৯ ও ১০ / এসএসসি',
    subject: 'গণিত',
    fileFormat: 'প্রিন্টযোগ্য PDF ও DOCX',
    fileSize: '18.6 MB',
    pageCount: 160,
    downloadCount: 4520,
    rating: 5.0,
    badge: 'শীর্ষ ডাউনলোড',
    description: 'টার্ম ও প্রি-টেস্ট পরীক্ষার জন্য শতভাগ স্ট্যান্ডার্ড সৃজনশীল প্রশ্ন তৈরির পূর্ণাঙ্গ প্রশ্ন ব্যাংক। প্রতিটি প্রশ্নের সাথে রয়েছে জ্ঞান, অনুধাবন, প্রয়োগ ও উচ্চতর দক্ষতার মার্কিং স্কিম।',
    features: [
      'বিগত ১০ বছরের বোর্ড প্রশ্নের আলোকে শ্রেণিবদ্ধ প্রশ্নাবলি',
      'প্রতিটি উদ্দীপকের নির্ভুল চিত্র ও গ্রাফের ভেক্টর ফাইল',
      'শিক্ষকদের জন্য নম্বর বণ্টন ও সঠিক উত্তরের মূল্যায়ন নির্দেশিকা',
      'MCQ ২৫ সেট প্রশ্ন ও উত্তরপত্র (OMR শিটসহ)'
    ],
    themeColor: '#e2136e'
  },
  {
    id: 'tr-3',
    title: 'ডিজিটাল ক্লাসরুম মাল্টিমিডিয়া প্রেজেন্টেশন স্লাইডস — বিজ্ঞান ও পদার্থবিজ্ঞান',
    category: 'slides',
    categoryLabel: 'মাল্টিমিডিয়া স্লাইডস',
    classLevel: 'ক্লাস ৮, ৯ ও ১০',
    subject: 'বিজ্ঞান ও পদার্থবিজ্ঞান',
    fileFormat: 'Microsoft PowerPoint (.pptx) + PDF',
    fileSize: '42.8 MB',
    pageCount: 94,
    downloadCount: 2980,
    rating: 4.8,
    badge: 'অ্যানিমেটেড স্লাইড',
    description: 'প্রজেক্টর ও স্মার্ট টিভিতে পাঠদানের জন্য তৈরি আধুনিক অ্যানিমেটেড স্লাইডস। আলোর প্রতিফলন, গতি, কাজ শক্তি ও বিদ্যুতের জটিল কনসেপ্টগুলো সহজে বোঝানোর রঙিন ভিজ্যুয়াল।',
    features: [
      'উচ্চমানের ডায়াগ্রাম ও অ্যানিমেশন',
      'সহজে পাঠদানে উপযোগী প্রতিটি স্লাইডে টিচার্স নোট',
      'ক্লাসের শেষে ৫ মিনিটের কুইজ স্লাইড যুক্ত',
      'অফলাইনে যেকোনো কম্পিউটারে সহজে ব্যবহারযোগ্য'
    ],
    themeColor: '#f9902e'
  },
  {
    id: 'tr-4',
    title: 'ধারাবাহিক শিখনকালীন ও সামষ্টিক মূল্যায়ন রেকর্ড শিট ও রুব্রিক্স (Excel + PDF)',
    category: 'assessment',
    categoryLabel: 'মূল্যায়ন শিট',
    classLevel: 'ক্লাস ৬ থেকে ১০',
    subject: 'সাধারণ নির্দেশনা',
    fileFormat: 'Automated Excel (.xlsx) + Printable PDF',
    fileSize: '6.4 MB',
    pageCount: 45,
    downloadCount: 5120,
    rating: 4.9,
    badge: 'অটো ক্যালকুলেশন',
    description: 'শিক্ষার্থীদের রোল অনুযায়ী ত্রিভুজ, বৃত্ত ও চতুর্ভুজ অথবা নম্বর ইনপুট দিলেই স্বয়ংক্রিয়ভাবে গ্রেড ও সামগ্রিক ফলাফল প্রস্তুত করার এক্সেল সফটওয়্যার টেমপ্লেট।',
    features: [
      'স্বয়ংক্রিয় সামষ্টিক ফলাফল শিট তৈরি',
      'প্রিন্ট উপযোগী ক্লাসের উপস্থিতি ও আচরণগত মূল্যায়ন ফর্ম',
      'অভিভাবক স্বাক্ষরযোগ্য রিপোর্ট কার্ড ফরম্যাট',
      'সহজ ব্যবহার নির্দেশিকা ও ভিডিও ডেমো'
    ],
    themeColor: '#00a544'
  },
  {
    id: 'tr-5',
    title: 'HSC রসায়ন ও জীববিজ্ঞান ল্যাবরেটরি প্র্যাকটিক্যাল শিক্ষক সহায়ক হ্যান্ডবুক',
    category: 'guideline',
    categoryLabel: 'শিক্ষক সহায়ক গাইড',
    classLevel: 'HSC ১ম ও ২য় বর্ষ',
    subject: 'রসায়ন ও জীববিজ্ঞান',
    fileFormat: 'PDF',
    fileSize: '15.9 MB',
    pageCount: 88,
    downloadCount: 1950,
    rating: 4.8,
    badge: 'ল্যাব গাইড',
    description: 'কলেজ ল্যাবরেটরিতে নিরাপদ রাসায়নিক পরিচালনা, টাইট্রেশন, লবণ শনাক্তকরণ ও ব্যবচ্ছেদ করানোর জন্য পরীক্ষক ও শিক্ষকদের পূর্ণাঙ্গ হ্যান্ডবুক।',
    features: [
      'ল্যাবরেটরি সেফটি প্রোটোকল ও ফার্স্ট এইড গাইডলাইন',
      'পরীক্ষার খাতায় নম্বর প্রদানের প্রমিত নিয়মাবলী',
      'ভাইভা পরীক্ষার সম্ভাব্য প্রশ্নোত্তর তালিকা',
      'রিএজেন্ট প্রস্তুতকরণের পরিমাপ ছক'
    ],
    themeColor: '#AA0E53'
  },
  {
    id: 'tr-6',
    title: 'শ্রেণিকক্ষ ব্যবস্থাপনা ও আধুনিক পাঠদান কৌশল — শিক্ষক প্রশিক্ষণ নির্দেশিকা',
    category: 'guideline',
    categoryLabel: 'শিক্ষক সহায়ক গাইড',
    classLevel: 'সকল শ্রেণি',
    subject: 'শিক্ষাবিজ্ঞান (Pedagogy)',
    fileFormat: 'PDF ই-বুক',
    fileSize: '9.8 MB',
    pageCount: 76,
    downloadCount: 2210,
    rating: 4.9,
    badge: 'প্রশিক্ষণ গাইড',
    description: 'অনলাইন ও অফলাইন ক্লাসে শিক্ষার্থীদের মনোযোগ ধরে রাখা, পিছিয়ে পড়া শিক্ষার্থীদের উন্নয়ন এবং সক্রিয় শিখন পদ্ধতির ব্যবহারিক কৌশল।',
    features: [
      'ইন্টারঅ্যাকটিভ ক্লাসরুম ম্যানেজমেন্ট টিপস',
      'পরীক্ষাভীতি দূর করার সাইকোলজিক্যাল কৌশল',
      'অভিভাবক সমাবেশ পরিচালনার এজেন্ডা ও চেকলিস্ট',
      'শিক্ষকদের পেশাগত দক্ষতা বৃদ্ধির রোডম্যাপ'
    ],
    themeColor: '#0084a2'
  }
];
