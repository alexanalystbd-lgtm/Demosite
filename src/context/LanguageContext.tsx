import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'bn' | 'en';

interface Translations {
  [key: string]: {
    bn: string;
    en: string;
  };
}

export const translations: Translations = {
  // Brand & Taglines
  siteName: { bn: '[আপনার সাইটের নাম]', en: '[Your Site Name]' },
  siteTagline: { bn: 'ডিজিটাল স্টাডি প্ল্যাটফর্ম', en: 'Digital Study Platform' },
  topNotice: {
    bn: 'নতুন শিক্ষাবর্ষের সকল ক্লাসের আপডেটেড হ্যান্ডনোটস ও মডেল টেস্ট উন্মুক্ত! কুপন STUDENT20 ব্যবহারে ২০% ছাড়!',
    en: 'Updated handnotes & model tests for the new academic year are live! Use coupon STUDENT20 for 20% off!'
  },
  specialDiscount: { bn: 'সীমিত সময়ের জন্য সকল বান্ডেলে বিশেষ ছাড়!', en: 'Special discount on all bundles for a limited time!' },
  supportHotline: { bn: 'সাপোর্ট', en: 'Support' },
  howToBuy: { bn: 'কীভাবে কিনবেন', en: 'How to Buy' },

  // Navigation
  navHome: { bn: 'হোম', en: 'Home' },
  navSchool: { bn: 'স্কুল', en: 'School' },
  navCollege: { bn: 'কলেজ', en: 'College' },
  navSpecialCourses: { bn: 'বিশেষ প্রস্তুতি কোর্সসমূহ', en: 'Special Prep Courses' },
  navTeachersCorner: { bn: "Teacher's Corner", en: "Teacher's Corner" },
  navCareerExam: { bn: 'Career & Exam', en: 'Career & Exam' },
  navJobCircular: { bn: 'Job Circular', en: 'Job Circular' },
  navAboutUs: { bn: 'আমাদের সম্পর্কে', en: 'About Us' },
  navFreeSample: { bn: 'ফ্রি স্যাম্পল', en: 'Free Sample' },
  navAccount: { bn: 'একাউন্ট', en: 'Account' },
  navAllProducts: { bn: 'সব প্রোডাক্ট', en: 'All Products' },
  navAllBooks: { bn: 'সকল বই দেখুন →', en: 'View All Books →' },

  // Submenus for Special Prep Courses
  coursePrimary: { bn: 'প্রাথমিক বৃত্তি পরীক্ষা', en: 'Primary Scholarship Exam' },
  courseJunior: { bn: 'জুনিয়র বৃত্তি পরীক্ষা', en: 'Junior Scholarship Exam' },
  courseSSC: { bn: 'SSC প্রস্তুতি কোর্স', en: 'SSC Preparation Course' },
  courseHSC: { bn: 'HSC প্রস্তুতি কোর্স', en: 'HSC Preparation Course' },
  viewAllCourses: { bn: 'সকল কোর্স দেখুন →', en: 'View All Courses →' },

  // Hero Banner
  heroPill: { bn: '১ম শ্রেণি থেকে HSC পর্যন্ত আপডেটেড স্টাডি রিসোর্স', en: 'Updated Study Resources from Class 1 to HSC' },
  heroTitle1: { bn: "Bangladesh's Favorite Online", en: "Bangladesh's Favorite Online" },
  heroTitle2: { bn: 'EDUCATION PLATFORM', en: 'EDUCATION PLATFORM' },
  heroSubtitle: {
    bn: '১ম থেকে দ্বাদশ শ্রেণির পূর্ণাঙ্গ হ্যান্ডনোটস, স্মার্ট প্ল্যানার ও এক্সক্লুসিভ মডেল টেস্ট বান্ডেল',
    en: 'Comprehensive handnotes, smart planners and exclusive model test bundles for Class 1 to 12'
  },
  searchPlaceholder: {
    bn: 'Search products... (গণিত, বিজ্ঞান, প্ল্যানার, মডেল টেস্ট)',
    en: 'Search products... (Math, Science, Planner, Model Test)'
  },
  searchButton: { bn: 'Search', en: 'Search' },
  instantDownload: { bn: 'ইনস্ট্যান্ট ডাউনলোড', en: 'Instant Download' },
  printFriendly: { bn: 'প্রিন্ট ফ্রেন্ডলি PDF', en: 'Print-friendly PDF' },
  lifetimeAccess: { bn: 'আজীবন ফাইল এক্সেস', en: 'Lifetime Access' },

  // Section Headings
  selectClassTitle: { bn: 'তোমার শ্রেণি নির্বাচন করো', en: 'Select Your Class' },
  selectClassSub: {
    bn: '১ম শ্রেণি থেকে দ্বাদশ শ্রেণির হ্যান্ডনোটস, ওয়ার্কবুক ও মডেল টেস্ট এক ক্লিকে',
    en: 'Handnotes, workbooks and model tests for Class 1 to 12 in one click'
  },
  schoolSectionBadge: { bn: 'ক্লাস ১ – ১০ (প্রাথমিক ও মাধ্যমিক)', en: 'Class 1 – 10 (Primary & Secondary)' },
  schoolSectionTitle: {
    bn: 'স্কুল সেকশন — ১ম থেকে ১০ম শ্রেণির গণিত, বিজ্ঞান, বাংলা ও অল-ইন-ওয়ান প্ল্যানার',
    en: 'School Section — Math, Science, Bangla & All-in-One Planners for Class 1 to 10'
  },
  schoolSectionDesc: {
    bn: 'প্রাথমিক স্তর (১ম-৫ম) ও মাধ্যমিক স্তরে (৬ষ্ঠ-১০ম) সেরা ফলাফলের জন্য চিত্রভিত্তিক রঙিন হ্যান্ডনোটস, বৃত্তি প্রস্তুতি ও বোর্ড সাজেশন।',
    en: 'Illustrated colorful handnotes, scholarship preparation & board suggestions for top results in primary & high school.'
  },
  viewSchoolProducts: { bn: 'স্কুল প্রোডাক্টস দেখুন', en: 'View School Products' },
  specialClass5: { bn: '৫ম শ্রেণি বৃত্তি স্পেশাল', en: 'Class 5 Scholarship' },
  specialSSC: { bn: 'এসএসসি স্পেশাল', en: 'SSC Special' },

  collegeSectionBadge: { bn: 'HSC ১ম ও ২য় বর্ষ (বিজ্ঞান বিভাগ)', en: 'HSC 1st & 2nd Year (Science)' },
  collegeSectionTitle: {
    bn: 'কলেজ সেকশন — HSC পদার্থ, রসায়ন, ICT ও এডমিশন হ্যাকস',
    en: 'College Section — HSC Physics, Chemistry, ICT & Admission Hacks'
  },
  collegeSectionDesc: {
    bn: 'বোর্ড পরীক্ষায় টপ রেজাল্ট ও এডমিশন বুস্টিংয়ের জন্য ক্যালকুলেটর ট্রিকস, জৈব রসায়ন রোডম্যাপ ও মডেল টেস্ট ব্যাংক।',
    en: 'Calculator tricks, organic chemistry roadmaps & model test banks for board exam excellence & admission boosting.'
  },
  viewCollegeProducts: { bn: 'কলেজ প্রোডাক্টস দেখুন', en: 'View College Products' },
  specialHSC2nd: { bn: 'HSC ২য় বর্ষ স্পেশাল', en: 'HSC 2nd Year Special' },

  // Popular Products Filter Tabs
  tabForYou: { bn: 'আপনার জন্য', en: 'For You' },
  tabPrimary: { bn: 'প্রাথমিক (১–৫)', en: 'Primary (1–5)' },
  tabSchool: { bn: 'মাধ্যমিক (৬–১০)', en: 'Secondary (6–10)' },
  tabCollege: { bn: 'কলেজ (HSC)', en: 'College (HSC)' },
  tabPlanner: { bn: 'প্ল্যানার', en: 'Planners' },
  tabNotes: { bn: 'নোটস', en: 'Notes' },
  popularProductsTitle: { bn: 'জনপ্রিয় স্টাডি মেটেরিয়ালস', en: 'Popular Study Materials' },
  studentsFirstChoice: { bn: 'শিক্ষার্থীদের প্রথম পছন্দ', en: 'Students Top Choice' },
  viewAllProductsBtn: { bn: 'সকল প্রোডাক্ট দেখুন', en: 'View All Products' },

  // Actions
  viewDetails: { bn: 'বিস্তারিত ও সংগ্রহ করুন', en: 'View Details & Buy' },
  downloadFreeSample: { bn: 'ফ্রি স্যাম্পল ও ডাউনলোড', en: 'Free Sample & Download' },
  enrollNow: { bn: 'কোর্সে ভর্তি হোন', en: 'Enroll in Course' },
  freeSampleDownload: { bn: 'ফ্রি স্যাম্পল ডাউনলোড', en: 'Download Free Sample' },
  seeCircular: { bn: 'সার্কুলার দেখুন', en: 'View Circular' },
  seeResource: { bn: 'রিসোর্স দেখুন', en: 'View Resources' },
  seeGuide: { bn: 'প্রস্তুতি গাইড দেখুন', en: 'View Prep Guide' },

  // Trust Badges
  instantDownloadTitle: { bn: 'ইনস্ট্যান্ট ডাউনলোড', en: 'Instant Download' },
  instantDownloadSub: { bn: 'পেমেন্ট শেষ হওয়া মাত্রই সরাসরি PDF ফাইল পাওয়ার নিশ্চয়তা', en: 'Guaranteed instant PDF access right after payment' },
  securePaymentTitle: { bn: 'নিরাপদ পেমেন্ট', en: 'Secure Payment' },
  securePaymentSub: { bn: 'bKash, Nagad, Rocket ও কার্ডে শতভাগ সুরক্ষিত লেনদেন', en: '100% secure payments via bKash, Nagad, Rocket & Cards' },
  freeSampleTitle: { bn: 'ফ্রি স্যাম্পল', en: 'Free Sample' },
  freeSampleSub: { bn: 'কেনার আগে মান যাচাইয়ের জন্য রয়েছে ১০০% ফ্রি নমুনা ও ডেমো', en: '100% free samples & demo previews before purchasing' },
  support247Title: { bn: '২৪/৭ সাপোর্ট', en: '24/7 Support' },
  support247Sub: { bn: 'ফাইল এক্সেস বা যেকোনো প্রয়োজনে সরাসরি ফোন ও হোয়াটসঅ্যাপ সাপোর্ট', en: 'Direct phone & WhatsApp assistance for any download inquiry' },

  // Categories
  categoryCollection: { bn: 'বিষয়ভিত্তিক সংকলন', en: 'Subject Collections' },
  studyPlanner: { bn: 'স্টাডি প্ল্যানার', en: 'Study Planner' },
  studyPlannerDesc: { bn: 'দৈনিক রুটিন, সাপ্তাহিক গোল ট্র্যাকার, অধ্যায় সমাপ্তি চেকলিস্ট ও পরীক্ষার কাউন্টডাউন।', en: 'Daily routines, weekly goal trackers, chapter completion checklists & exam countdowns.' },
  subjectNotes: { bn: 'সাবজেক্ট নোটস', en: 'Subject Notes' },
  subjectNotesDesc: { bn: 'অধ্যায়ভিত্তিক রঙিন থিওরি, হ্যান্ডরিটেন ফর্মুলা শিট ও সহজে বোঝার স্পেশাল ডায়াগ্রাম।', en: 'Chapter-wise colorful theory, handwritten formula sheets & easy diagrams.' },
  examGuide: { bn: 'এক্সাম প্রেপারেশন গাইড', en: 'Exam Preparation Guide' },
  examGuideDesc: { bn: 'পরীক্ষার হলে সময় বণ্টন, উদ্দীপক ডিকোডিং ট্যাকটিকস এবং A+ পাওয়ার নিশ্চিত কৌশল।', en: 'Hall time management, stimulus decoding tactics & proven A+ strategies.' },
  digitalWorkbook: { bn: 'ডিজিটাল ওয়ার্কবুক', en: 'Digital Workbook' },
  digitalWorkbookDesc: { bn: 'হাতে-কলমে প্র্যাকটিস শিট, অঙ্ক ও ডায়াগ্রামের খালি টেমপ্লেট এবং সেলফ-অ্যাসেসমেন্ট।', en: 'Hands-on practice sheets, math & diagram blank templates & self-assessments.' },

  // FAQ & Community
  faqHeading: { bn: 'সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)', en: 'Frequently Asked Questions (FAQ)' },
  faqSub: { bn: 'ডিজিটাল প্রোডাক্ট কেনা ও ডাউনলোড সম্পর্কিত সাধারণ প্রশ্নসমূহ', en: 'Common queries regarding digital product purchase & downloads' },
  testimonialsHeading: { bn: 'শিক্ষার্থী ও অভিভাবকরা কী বলছেন', en: 'What Students & Parents Say' },
  ctaTitle: { bn: 'যেকোনো প্রশ্ন বা সহযোগিতায় আমরা আপনার পাশে আছি', en: 'We Are Here to Assist with Any Questions' },
  ctaDesc: {
    bn: 'ফাইল ডাউনলোড সংক্রান্ত জটিলতা, পেমেন্ট ভেরিফিকেশন বা কোনো বিষয় বুঝতে অসুবিধা হলে আমাদের সাপোর্ট টিমের সাথে সরাসরি যোগাযোগ করুন।',
    en: 'Contact our support team directly for download assistance, payment verification or any academic query.'
  },
  emailPlaceholder: { bn: 'আপনার ইমেইল ঠিকানা দিন...', en: 'Enter your email address...' },
  getFreeGuide: { bn: 'ফ্রি গাইড পান', en: 'Get Free Guide' },

  // Footer
  footerAbout: {
    bn: 'স্কুল ও কলেজ শিক্ষার্থীদের জন্য সেরা ডিজিটাল স্টাডি রিসোর্স। ১ম থেকে দ্বাদশ শ্রেণির শিক্ষার্থীদের পরীক্ষায় সেরা ফলাফল নিশ্চিত করার বিশ্বস্ত ডিজিটাল স্টাডি রিসোর্স প্ল্যাটফর্ম।',
    en: 'Premier digital study resources for school & college students in Bangladesh. Supporting students from Class 1 to 12 for exam success.'
  },
  footerPolicies: { bn: 'পলিসি ও নীতিমালা', en: 'Policies & Terms' },
  footerSupport: { bn: 'গ্রাহক সহায়তা ও নির্দেশিকা', en: 'Support & Guidance' },
  footerSocial: { bn: 'আমাদের সোশ্যাল কমিউনিটি', en: 'Our Social Community' },
  footerCopyright: { bn: 'সর্বস্বত্ব সংরক্ষিত। সমস্ত ডিজিটাল কনটেন্ট স্বত্বাধিকারী দ্বারা সংরক্ষিত।', en: 'All rights reserved. All digital content copyrighted.' },
  paymentPartners: { bn: 'নিরাপদ পেমেন্ট পার্টনার:', en: 'Secure Payment Partners:' },

  // Language Labels
  languageName: { bn: 'বাংলা', en: 'English' },
  switchLanguage: { bn: 'English', en: 'বাংলা' }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string, fallback?: string) => string;
  toLocalizedNumber: (num: number | string) => string;
  formatPrice: (amount: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('app_lang');
      return saved === 'en' ? 'en' : 'bn';
    } catch {
      return 'bn';
    }
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('app_lang', newLang);
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === 'bn' ? 'en' : 'bn');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string, fallback?: string): string => {
    if (translations[key] && translations[key][lang]) {
      return translations[key][lang];
    }
    return fallback || key;
  };

  const toLocalizedNumber = (num: number | string): string => {
    const numStr = String(num);
    if (lang === 'en') return numStr;
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return numStr.replace(/[0-9]/g, w => bengaliDigits[+w]);
  };

  const formatPrice = (amount: number): string => {
    if (amount === 0) {
      return lang === 'en' ? 'Free' : 'ফ্রি';
    }
    const localized = toLocalizedNumber(amount);
    return lang === 'en' ? `BDT ${amount}` : `৳ ${localized}`;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, toLocalizedNumber, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
