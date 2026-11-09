export interface SiteConfig {
  siteName: string;
  logoText: string;
  tagline: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  studentCount: string;
  satisfactionRate: string;
  resourceCount: string;
  contact: {
    phone: string;
    email: string;
    address: string;
    hours: string;
    whatsapp: string;
  };
  socialLinks: {
    facebook: string;
    youtube: string;
    whatsapp: string;
    tiktok: string;
  };
  adminPassword: string;
  demoCoupons: Record<string, { type: 'percent' | 'flat'; value: number; label: string }>;
  paymentNumbers: {
    bkash: string;
    nagad: string;
    rocket: string;
  };
  announcementText: string;
}

export const siteConfig: SiteConfig = {
  // Site name placeholder as requested: "[আপনার সাইটের নাম]"
  siteName: "[আপনার সাইটের নাম]",
  logoText: "[আপনার সাইটের নাম]",
  tagline: "স্কুল ও কলেজ শিক্ষার্থীদের জন্য সেরা ডিজিটাল স্টাডি রিসোর্স",
  
  heroTitleLine1: "Bangladesh's Favorite Online",
  heroTitleLine2: "Education Platform",
  heroSubtitle: "৬ষ্ঠ থেকে দ্বাদশ শ্রেণির পূর্ণাঙ্গ হ্যান্ডনোটস, স্মার্ট প্ল্যানার ও এক্সক্লুসিভ মডেল টেস্ট বান্ডেল",

  studentCount: "১০,০০০+ শিক্ষার্থী",
  satisfactionRate: "৯৯.৪% সন্তোষজনক রিভিউ",
  resourceCount: "১২০+ এক্সক্লুসিভ ই-বুক ও নোটস",

  contact: {
    phone: "০১৭০০-০০০০০০",
    email: "support@example.com",
    address: "ধানমন্ডি ৪/এ, ঢাকা - ১২০৯, বাংলাদেশ",
    hours: "প্রতিদিন সকাল ৯:০০ টা - রাত ১০:০০ টা",
    whatsapp: "https://wa.me/8801700000000",
  },

  socialLinks: {
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    whatsapp: "https://wa.me/8801700000000",
    tiktok: "https://tiktok.com",
  },

  adminPassword: "admin123",

  demoCoupons: {
    STUDENT20: { type: 'percent', value: 20, label: '২০% ছাড়' },
    FREE50: { type: 'flat', value: 50, label: '৫০ টাকা ছাড়' },
    EXAM25: { type: 'percent', value: 25, label: '২৫% বিশেষ ছাড়' },
  },

  paymentNumbers: {
    bkash: "০১৭১১-২২৩৩৪৪ (মার্চেন্ট / সেন্ড মানি)",
    nagad: "০১৮১১-২২৩৩৪৪ (পার্সোনাল)",
    rocket: "০১৯১১-২২৩৩৪৪ (পার্সোনাল)",
  },

  announcementText: "📢 নতুন শিক্ষাবর্ষের সকল ক্লাসের আপডেটেড ডিজিটাল হ্যান্ডনোটস, মডেল টেস্ট ও স্টাডি প্ল্যানার উন্মুক্ত! কুপন STUDENT20 ব্যবহারে ২০% ছাড়!",
};

export default siteConfig;
