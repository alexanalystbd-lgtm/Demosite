export interface JobCircular {
  id: string;
  organization: string;
  title: string;
  category: 'govt' | 'bank' | 'teacher' | 'defense' | 'corporate';
  categoryLabel: string;
  vacancies: number;
  salaryGrade: string;
  educationReq: string;
  publishDate: string;
  deadlineDate: string;
  daysRemaining: number;
  status: 'ongoing' | 'expiring-soon' | 'new';
  applyUrl: string;
  officialCircularPdf: string;
  details: string;
  requirements: string[];
  ageLimit: string;
  feeAmount: number;
  districtNotice: string;
}

export const sampleJobCirculars: JobCircular[] = [
  {
    id: 'job-1',
    organization: 'বাংলাদেশ রেলওয়ে (Bangladesh Railway)',
    title: 'সহকারী স্টেশন মাস্টার (Assistant Station Master) ও গার্ড গ্রেড-২ নিয়োগ',
    category: 'govt',
    categoryLabel: 'সরকারি চাকরি',
    vacancies: 560,
    salaryGrade: 'গ্রেড-১৫ (৳ ৯,৭০০ - ২৩,৪৯০/-)',
    educationReq: 'যেকোনো স্বীকৃত বিশ্ববিদ্যালয় হতে ন্যূনতম স্নাতক বা সমমানের ডিগ্রি।',
    publishDate: '১ নভেম্বর, ২০২৬',
    deadlineDate: '৩০ নভেম্বর, ২০২৬',
    daysRemaining: 21,
    status: 'ongoing',
    applyUrl: 'http://br.teletalk.com.bd',
    officialCircularPdf: 'railway-station-master-circular.pdf',
    details: 'বাংলাদেশ রেলওয়ের পূর্বাঞ্চল ও পশ্চিমাঞ্চলের শূন্য পদসমূহে স্থায়ী রাজস্ব খাতে জনবল নিয়োগের নিমিত্তে প্রকৃত বাংলাদেশি নাগরিকদের নিকট হতে অনলাইনে দরখাস্ত আহ্বান করা যাচ্ছে।',
    requirements: [
      'স্বীকৃত বিশ্ববিদ্যালয় হতে যেকোনো বিষয়ে ন্যূনতম দ্বিতীয় শ্রেণি বা সিজিপিএ সহ স্নাতক ডিগ্রি',
      'কম্পিউটার চালনায় সাধারণ জ্ঞান সম্পন্ন',
      'সুস্বাস্থ্যের অধিকারী ও চোখের দৃষ্টি স্বাভাবিক হতে হবে'
    ],
    ageLimit: '১৮ থেকে ৩০ বছর (মুক্তিযোদ্ধা কোটায় ৩২ বছর)',
    feeAmount: 223,
    districtNotice: 'সকল জেলার প্রার্থীরা আবেদন করতে পারবেন।'
  },
  {
    id: 'job-2',
    organization: 'ব্যাংকার্স সিলেকশন কমিটি (বাংলাদেশ ব্যাংক)',
    title: '১০টি সমন্বিত সরকারি ব্যাংকে ‘অফিসার (সাধারণ)’ পদে মেগা নিয়োগ বিজ্ঞপ্তি',
    category: 'bank',
    categoryLabel: 'ব্যাংক জব',
    vacancies: 2475,
    salaryGrade: 'জাতীয় বেতন স্কেল ২০১৫-এর ১০ম গ্রেড (৳ ১৬,০০০ - ৩৮,৬৪০/-)',
    educationReq: 'যেকোনো বিষয়ে স্নাতকোত্তর অথবা ৪ বছর মেয়াদি স্নাতক ডিগ্রি।',
    publishDate: '২৮ অক্টোবর, ২০২৬',
    deadlineDate: '২৪ নভেম্বর, ২০২৬',
    daysRemaining: 15,
    status: 'ongoing',
    applyUrl: 'https://erecruitment.bb.org.bd',
    officialCircularPdf: 'combined-bank-officer-circular.pdf',
    details: 'সোনালী, জনতা, অগ্রণী, রূপালী, বাংলাদেশ ডেভেলপমেন্ট ব্যাংক, বাংলাদেশ কৃষি ব্যাংক ও রাজশাহী কৃষি উন্নয়ন ব্যাংকসহ সমন্বিত ১০টি ব্যাংকে অফিসার (সাধারণ) পদে নিয়োগ বিজ্ঞপ্তি।',
    requirements: [
      'ন্যূনতম ১টি প্রথম বিভাগ বা সমমানের সিজিপিএ থাকতে হবে',
      'কোনো পর্যায়ে ৩য় বিভাগ গ্রহণযোগ্য নয়',
      'বাংলা ও ইংরেজি ভাষায় দক্ষতা এবং কম্পিউটার চালনায় পারদর্শিতা'
    ],
    ageLimit: '২১ থেকে ৩০ বছর',
    feeAmount: 200,
    districtNotice: 'বাংলাদেশের সকল জেলার নাগরিক আবেদন করতে পারবেন।'
  },
  {
    id: 'job-3',
    organization: 'বেসরকারি শিক্ষক নিবন্ধন ও প্রত্যয়ন কর্তৃপক্ষ (NTRCA)',
    title: '১৯তম শিক্ষক নিবন্ধন পরীক্ষা — স্কুল, স্কুল-২ ও কলেজ পর্যায়',
    category: 'teacher',
    categoryLabel: 'শিক্ষক নিয়োগ',
    vacancies: 68500,
    salaryGrade: 'বেসরকারি এমপিওভুক্ত শিক্ষাপ্রতিষ্ঠানের স্কেল অনুযায়ী',
    educationReq: 'সংশ্লিষ্ট বিষয়ে স্নাতক / স্নাতকোত্তর ডিগ্রি (ন্যূনতম ২য় শ্রেণি)।',
    publishDate: '৫ নভেম্বর, ২০২৬',
    deadlineDate: '১৫ ডিসেম্বর, ২০২৬',
    daysRemaining: 36,
    status: 'new',
    applyUrl: 'http://ntrca.teletalk.com.bd',
    officialCircularPdf: '19th-ntrca-official-circular.pdf',
    details: 'দেশের বেসরকারি মাধ্যমিক, উচ্চ মাধ্যমিক বিদ্যালয়, মাদ্রাসা ও কারিগরি শিক্ষাপ্রতিষ্ঠানে শূন্য পদে সহকারী শিক্ষক ও প্রভাষক পদে নিয়োগের লক্ষ্যে ১৯তম শিক্ষক নিবন্ধন পরীক্ষা অনুষ্ঠিত হবে।',
    requirements: [
      'সংশ্লিষ্ট বিষয়ে স্বীকৃত বিশ্ববিদ্যালয় হতে স্নাতক বা বিএড ডিগ্রি',
      'বাংলা, ইংরেজি, গণিত ও সাধারণ জ্ঞানের প্রিলিমিনারি পরীক্ষায় ১০০ নম্বরে অংশগ্রহণ বাধ্যতামূলক',
      'প্রিলি উত্তীর্ণদের জন্য লিখিত ও মৌখিক পরীক্ষা অনুষ্ঠিত হবে'
    ],
    ageLimit: 'সর্বোচ্চ ৩৫ বছর',
    feeAmount: 350,
    districtNotice: 'সারাদেশের সকল জেলার প্রার্থীরা আবেদন করতে পারবেন।'
  },
  {
    id: 'job-4',
    organization: 'খাদ্য অধিদপ্তর (Directorate General of Food)',
    title: 'উপ-খাদ্য পরিদর্শক ও সহকারী উপ-খাদ্য পরিদর্শক পদে নিয়োগ',
    category: 'govt',
    categoryLabel: 'সরকারি চাকরি',
    vacancies: 730,
    salaryGrade: 'গ্রেড-১৪ ও গ্রেড-১৬',
    educationReq: 'এইচএসসি (HSC) অথবা স্নাতক পাস।',
    publishDate: '২৪ অক্টোবর, ২০২৬',
    deadlineDate: '১৪ নভেম্বর, ২০২৬',
    daysRemaining: 5,
    status: 'expiring-soon',
    applyUrl: 'http://dgfood.teletalk.com.bd',
    officialCircularPdf: 'dgfood-inspector-circular.pdf',
    details: 'খাদ্য মন্ত্রণালয়ের অধীন খাদ্য অধিদপ্তরের মাঠ পর্যায়ের গুরুত্বপূর্ণ পদে সরাসরি জনবল নিয়োগের নিমিত্তে দরখাস্ত আহ্বান করা হচ্ছে। আবেদনের মেয়াদ আর মাত্র কয়েকদিন বাকি।',
    requirements: [
      'উপ-খাদ্য পরিদর্শক: এইচএসসি পাস এবং কম্পিউটারে টাইপিং গতি',
      'সহকারী উপ-খাদ্য পরিদর্শক: এসএসসি/এইচএসসি সমমান'
    ],
    ageLimit: '১৮ থেকে ৩০ বছর',
    feeAmount: 112,
    districtNotice: 'বিজ্ঞপ্তিতে উল্লিখিত জেলার প্রার্থীরা আবেদন করতে পারবেন।'
  },
  {
    id: 'job-5',
    organization: 'বাংলাদেশ সেনাবাহিনী (Bangladesh Army)',
    title: '৯৩তম বিএমএ দীর্ঘমেয়াদি কোর্স (BMA Long Course) অফিসার ক্যাডেট',
    category: 'defense',
    categoryLabel: 'প্রতিরক্ষা বাহিনী',
    vacancies: 350,
    salaryGrade: 'প্রশিক্ষণকালীন বিশেষ ভাতা এবং কমিশনপ্রাপ্তির পর লেফটেনেন্ট পদমর্যাদা',
    educationReq: 'এইচএসসি বা সমমানের পরীক্ষায় ন্যূনতম জিপিএ ৪.৫০।',
    publishDate: '১০ অক্টোবর, ২০২৬',
    deadlineDate: '২৮ নভেম্বর, ২০২৬',
    daysRemaining: 19,
    status: 'ongoing',
    applyUrl: 'https://joinbangladesharmy.army.mil.bd',
    officialCircularPdf: 'bma-93-long-course-circular.pdf',
    details: 'বাংলাদেশ মিলিটারি একাডেমি ভাটিয়ারি, চট্টগ্রামে তিন বছর মেয়াদি প্রশিক্ষণের জন্য ৯৩তম বিএমএ দীর্ঘমেয়াদি কোর্সে অফিসার ক্যাডেট পদে অবিবাহিত পুরুষ ও মহিলা প্রার্থীদের নিকট হতে দরখাস্ত আহ্বান করা যাচ্ছে।',
    requirements: [
      'উচ্চতা: পুরুষ নূন্যতম ৫ ফুট ৪ ইঞ্চি, মহিলা নূন্যতম ৫ ফুট ২ ইঞ্চি',
      'ওজন ও বুকের মাপ বিএমএ মান অনুযায়ী',
      'দৃষ্টিশক্তি: ৬/৬ (চশমাসহ অনুমোদিত সীমা)'
    ],
    ageLimit: '১৭ থেকে ২১ বছর (অবিবাহিত)',
    feeAmount: 1000,
    districtNotice: 'বাংলাদেশের সকল জেলার অবিবাহিত নাগরিক।'
  },
  {
    id: 'job-6',
    organization: 'ডাচ-বাংলা ব্যাংক লিমিটেড (Dutch-Bangla Bank)',
    title: 'প্রবেশনারি অফিসার (Probationary Officer) ও ক্যাশ অফিসার নিয়োগ',
    category: 'corporate',
    categoryLabel: 'করপোরেট / প্রাইভেট ব্যাংক',
    vacancies: 280,
    salaryGrade: 'প্রবেশনকালীন ৳ ৪৫,০০০/-, স্থায়ী হলে ৳ ৫৫,০০০/- ও অন্যান্য সুবিধা',
    educationReq: 'স্বীকৃত বিশ্ববিদ্যালয় হতে যেকোনো বিষয়ে ৪ বছর মেয়াদি স্নাতক ডিগ্রি।',
    publishDate: '৩ নভেম্বর, ২০২৬',
    deadlineDate: '১০ ডিসেম্বর, ২০২৬',
    daysRemaining: 31,
    status: 'new',
    applyUrl: 'https://app.dutchbanglabank.com/Online_Job',
    officialCircularPdf: 'dbbl-probationary-officer-circular.pdf',
    details: 'ডাচ-বাংলা ব্যাংকের রিটেল ও কর্পোরেট ব্যাংকিং কার্যক্রমকে আরো গতিশীল করতে উদ্যমী ও মেধাবী ফ্রেশ গ্র্যাজুয়েটদের নিকট হতে অনলাইনে আবেদন আহ্বান করা হচ্ছে।',
    requirements: [
      'ন্যূনতম সিজিপিএ ৩.০০ (৪.০০ এর মধ্যে)',
      'চমৎকার ইন্টারপার্সোনাল ও যোগাযোগ দক্ষতা',
      'দেশের যেকোনো শাখায় কাজ করার মানসিকতা'
    ],
    ageLimit: 'সর্বোচ্চ ৩০ বছর',
    feeAmount: 0,
    districtNotice: 'সকল জেলার প্রার্থীরা আবেদন করতে পারবেন (কোনো আবেদন ফি নেই)।'
  }
];
