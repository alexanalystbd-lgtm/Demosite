import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  Headphones,
  CheckCircle2,
  Calendar,
  FileText,
  Target,
  Layers,
  ChevronDown,
  ChevronUp,
  Star,
  Quote,
  Flame,
  Award,
  Users,
  Send,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { HeroBanner } from '../components/HeroBanner';
import { AnnouncementTicker } from '../components/AnnouncementTicker';
import { ProductCard } from '../components/ProductCard';
import { siteConfig } from '../config';
import { useShop } from '../context/ShopContext';
import { classesList, DigitalProduct } from '../data/products';
import { faqsList, testimonialsList, trustBadges, chooseUsPoints } from '../data/siteContent';
import { toBengaliNumber } from '../utils/shopLogic';

export const HomePage: React.FC = () => {
  const { products, showToast } = useShop();

  // Active filter tab for Popular Products
  const [activeTab, setActiveTab] = useState<'for-you' | 'school' | 'college' | 'planner' | 'notes'>('for-you');

  // FAQ Accordion active id
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Testimonials active index
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Email CTA state
  const [ctaEmail, setCtaEmail] = useState('');

  // Filter popular products according to activeTab
  const filteredPopularProducts: DigitalProduct[] = React.useMemo(() => {
    let list = [...products];
    if (activeTab === 'primary') {
      list = list.filter(p => ['class-1', 'class-2', 'class-3', 'class-4', 'class-5'].includes(p.classLevel));
    } else if (activeTab === 'school') {
      list = list.filter(p => ['class-6', 'class-7', 'class-8', 'class-9', 'class-10'].includes(p.classLevel));
    } else if (activeTab === 'college') {
      list = list.filter(p => p.section === 'college');
    } else if (activeTab === 'planner') {
      list = list.filter(p => p.category === 'planner');
    } else if (activeTab === 'notes') {
      list = list.filter(p => p.category === 'notes');
    }
    // Return top 8
    return list.slice(0, 8);
  }, [products, activeTab]);

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ctaEmail) {
      showToast('ধন্যবাদ! ফ্রি স্টাডি প্যাকের ডাউনলোড লিংক আপনার ইমেইলে পাঠানো হয়েছে।');
      setCtaEmail('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Announcement Ticker */}
      <AnnouncementTicker />

      {/* 2. Hero Banner */}
      <HeroBanner />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-6 sm:py-10 space-y-10 sm:space-y-14">
        {/* 3. "তোমার শ্রেণি নির্বাচন করো": ১ম শ্রেণি থেকে HSC পর্যন্ত ১২টি ক্লাস */}
        <section aria-label="শ্রেণি নির্বাচন">
          <div className="text-center max-w-xl mx-auto mb-5 sm:mb-7">
            <span className="text-slate-600 font-bold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              সহজে শুরু করুন
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
              তোমার শ্রেণি নির্বাচন করো
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              ১ম শ্রেণি থেকে দ্বাদশ শ্রেণির হ্যান্ডনোটস, ওয়ার্কবুক ও মডেল টেস্ট এক ক্লিকে
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 sm:gap-2.5">
            {classesList.map(item => {
              const isCollege = item.section === 'college';
              return (
                <Link
                  key={item.slug}
                  to={isCollege ? `/college/${item.slug}` : `/school/${item.slug}`}
                  className="group bg-white rounded-[10px] p-2 sm:p-2.5 border border-slate-200 hover:border-[#e2136e] hover:shadow-sm transition-all duration-150 flex flex-col items-center text-center relative overflow-hidden"
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm mb-1.5 transition-all duration-150 ${
                      isCollege
                        ? 'bg-orange-50 text-[#f9902e] group-hover:bg-[#f9902e] group-hover:text-white'
                        : 'bg-pink-50 text-[#e2136e] group-hover:bg-[#e2136e] group-hover:text-white'
                    }`}
                  >
                    <GraduationCap size={18} />
                  </div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-[#e2136e] transition-colors line-clamp-1">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 leading-tight">
                    {item.desc}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 4. Two Major Academic Divisions: School & College (Clean & Modern) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6" aria-label="স্কুল ও কলেজ সেকশন">
          {/* School Section Banner */}
          <div className="bg-white rounded-[12px] p-5 sm:p-7 border border-slate-200 border-t-4 border-t-[#e2136e] shadow-xs flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10 max-w-md">
              <span className="bg-pink-50 text-[#e2136e] text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-2 border border-pink-100">
                ক্লাস ১ – ১০ (প্রাথমিক ও মাধ্যমিক)
              </span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 leading-tight mb-2">
                স্কুল সেকশন — ১ম থেকে ১০ম শ্রেণির গণিত, বিজ্ঞান, বাংলা ও অল-ইন-ওয়ান প্ল্যানার
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                প্রাথমিক স্তর (১ম-৫ম) ও মাধ্যমিক স্তরে (৬ষ্ঠ-১০ম) সেরা ফলাফলের জন্য চিত্রভিত্তিক রঙিন হ্যান্ডনোটস, বৃত্তি প্রস্তুতি ও বোর্ড সাজেশন।
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  to="/school"
                  className="bg-[#e2136e] hover:bg-[#c2105f] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 rounded-[8px] transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <span>স্কুল প্রোডাক্টস দেখুন</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/school/class-5"
                  className="bg-slate-50 hover:bg-pink-50 text-slate-800 hover:text-[#e2136e] border border-slate-200 text-xs sm:text-sm font-bold px-3.5 py-2 rounded-[8px] transition-all"
                >
                  <span>৫ম শ্রেণি বৃত্তি স্পেশাল</span>
                </Link>
                <Link
                  to="/school/class-10"
                  className="bg-slate-50 hover:bg-pink-50 text-slate-800 hover:text-[#e2136e] border border-slate-200 text-xs sm:text-sm font-bold px-3.5 py-2 rounded-[8px] transition-all"
                >
                  <span>এসএসসি স্পেশাল</span>
                </Link>
              </div>
            </div>

            {/* Subtle clean watermark */}
            <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full bg-pink-50/70 pointer-events-none flex items-center justify-center text-4xl select-none opacity-60 group-hover:scale-105 transition-transform">
              🏫
            </div>
          </div>

          {/* College Section Banner */}
          <div className="bg-white rounded-[12px] p-6 sm:p-8 border border-slate-200 border-t-4 border-t-[#f9902e] shadow-xs flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10 max-w-md">
              <span className="bg-[#fef4ea] text-[#f9902e] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
                HSC ১ম ও ২য় বর্ষ (বিজ্ঞান বিভাগ)
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight mb-2">
                কলেজ সেকশন — HSC পদার্থ, রসায়ন, ICT ও এডমিশন হ্যাকস
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                বোর্ড পরীক্ষায় টপ রেজাল্ট ও এডমিশন বুস্টিংয়ের জন্য ক্যালকুলেটর ট্রিকস, জৈব রসায়ন রোডম্যাপ ও মডেল টেস্ট ব্যাংক।
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/college"
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-[8px] transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <span>কলেজ প্রোডাক্টস দেখুন</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to="/college/hsc-2nd-year"
                  className="bg-slate-50 hover:bg-orange-50 text-slate-800 hover:text-[#f9902e] border border-slate-200 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-[8px] transition-all"
                >
                  <span>HSC ২য় বর্ষ স্পেশাল</span>
                </Link>
              </div>
            </div>

            {/* Subtle clean watermark */}
            <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full bg-orange-50/70 pointer-events-none flex items-center justify-center text-4xl select-none opacity-60 group-hover:scale-105 transition-transform">
              🎓
            </div>
          </div>
        </section>

        {/* 4.5. Specialized Educational Hubs (Clean Unified White Cards) */}
        <section aria-label="স্পেশাল হাবস" className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Teacher's Corner */}
          <Link
            to="/teachers-corner"
            className="bg-white rounded-[12px] p-5 border border-slate-200 hover:border-[#0084a2] hover:shadow-sm transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-[8px] bg-cyan-50 text-[#0084a2] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <GraduationCap size={20} />
                </div>
                <span className="text-[10px] font-bold text-[#0084a2] bg-[#ddf1f6] px-2.5 py-0.5 rounded-full">
                  শিক্ষক রিসোর্স
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-[#0084a2] transition-colors mb-1.5">
                Teacher's Corner (টিচার্স কর্নার)
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                নতুন কারিকুলামের পাঠ পরিকল্পনা (Lesson Plans), সৃজনশীল প্রশ্ন ব্যাংক ও ধারাবাহিক মূল্যায়ন শিট।
              </p>
            </div>
            <span className="text-xs font-bold text-[#0084a2] flex items-center gap-1">
              <span>রিসোর্স দেখুন</span>
              <ArrowRight size={13} />
            </span>
          </Link>

          {/* Career & Exam */}
          <Link
            to="/career-and-exam"
            className="bg-white rounded-[12px] p-5 border border-slate-200 hover:border-[#e2136e] hover:shadow-sm transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-[8px] bg-pink-50 text-[#e2136e] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Target size={20} />
                </div>
                <span className="text-[10px] font-bold text-[#e2136e] bg-[#ffdeee] px-2.5 py-0.5 rounded-full">
                  বিসিএস ও ব্যাংক
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-[#e2136e] transition-colors mb-1.5">
                Career & Exam (ক্যারিয়ার ও পরীক্ষা)
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                বিসিএস প্রিলি শর্টকাট, ব্যাংক জবস ম্যাথ, ঢাবি-বুয়েট ভর্তি হ্যাকস ও প্রাইমারি শিক্ষক ডাইজেস্ট।
              </p>
            </div>
            <span className="text-xs font-bold text-[#e2136e] flex items-center gap-1">
              <span>প্রস্তুতি গাইড দেখুন</span>
              <ArrowRight size={13} />
            </span>
          </Link>

          {/* Job Circular */}
          <Link
            to="/job-circular"
            className="bg-white rounded-[12px] p-5 border border-slate-200 hover:border-[#f9902e] hover:shadow-sm transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-[8px] bg-orange-50 text-[#f9902e] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Briefcase size={20} />
                </div>
                <span className="text-[10px] font-bold text-slate-800 bg-[#fef4ea] px-2.5 py-0.5 rounded-full">
                  হালনাগাদ সার্কুলার
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-[#f9902e] transition-colors mb-1.5">
                Job Circular (জব সার্কুলার)
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                চলমান সকল সরকারি ও বেসরকারি নিয়োগ বিজ্ঞপ্তি, পদসংখ্যা, আবেদনের শেষ তারিখ ও সার্কুলার PDF।
              </p>
            </div>
            <span className="text-xs font-bold text-[#f9902e] flex items-center gap-1">
              <span>সার্কুলার দেখুন</span>
              <ArrowRight size={13} />
            </span>
          </Link>
        </section>

        {/* 5. Trust Strip: ইনস্ট্যান্ট ডাউনলোড, নিরাপদ পেমেন্ট, ফ্রি স্যাম্পল, সাপোর্ট */}
        <section
          className="bg-white rounded-[12px] p-6 sm:p-7 border border-slate-200 shadow-xs"
          aria-label="নিরাপত্তা ও সেবা"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className={`flex items-start gap-3.5 ${idx !== 0 ? 'sm:pl-6 pt-4 sm:pt-0' : ''}`}>
                <div className="w-11 h-11 rounded-[10px] bg-pink-50 text-[#e2136e] flex items-center justify-center shrink-0 border border-pink-100">
                  {badge.icon === 'zap' && <Zap size={22} />}
                  {badge.icon === 'shield-check' && <ShieldCheck size={22} />}
                  {badge.icon === 'book-open' && <BookOpen size={22} />}
                  {badge.icon === 'headphones' && <Headphones size={22} />}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-0.5">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Product Categories (4 clean cards) */}
        <section aria-label="প্রোডাক্ট ক্যাটাগরি">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <span className="text-slate-600 font-bold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                বিষয়ভিত্তিক সংকলন
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                জনপ্রিয় স্টাডি ক্যাটাগরি
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs font-bold text-[#e2136e] hover:underline flex items-center gap-1"
            >
              <span>সকল ক্যাটাগরি দেখুন</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. স্টাডি প্ল্যানার */}
            <Link
              to="/category/planner"
              className="bg-white rounded-[12px] p-5 border border-slate-200 hover:border-[#e2136e] hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-[10px] bg-pink-50 text-[#e2136e] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Calendar size={22} />
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-[#e2136e] transition-colors mb-1.5">
                  স্টাডি প্ল্যানার
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  দৈনিক রুটিন, সাপ্তাহিক গোল ট্র্যাকার, অধ্যায় সমাপ্তি চেকলিস্ট ও পরীক্ষার কাউন্টডাউন।
                </p>
              </div>
              <span className="text-xs font-bold text-[#e2136e] flex items-center gap-1">
                <span>প্ল্যানার দেখুন</span>
                <ArrowRight size={13} />
              </span>
            </Link>

            {/* 2. সাবজেক্ট নোটস */}
            <Link
              to="/category/notes"
              className="bg-white rounded-[12px] p-5 border border-slate-200 hover:border-[#0084a2] hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-[10px] bg-sky-50 text-[#0084a2] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <FileText size={22} />
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-[#0084a2] transition-colors mb-1.5">
                  সাবজেক্ট নোটস
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  অধ্যায়ভিত্তিক রঙিন থিওরি, হ্যান্ডরিটেন ফর্মুলা শিট ও সহজে বোঝার স্পেশাল ডায়াগ্রাম।
                </p>
              </div>
              <span className="text-xs font-bold text-[#0084a2] flex items-center gap-1">
                <span>নোটস দেখুন</span>
                <ArrowRight size={13} />
              </span>
            </Link>

            {/* 3. এক্সাম প্রেপারেশন গাইড */}
            <Link
              to="/category/exam-guide"
              className="bg-white rounded-[12px] p-5 border border-slate-200 hover:border-[#f9902e] hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-[10px] bg-amber-50 text-[#f9902e] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Target size={22} />
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-[#f9902e] transition-colors mb-1.5">
                  এক্সাম প্রেপারেশন গাইড
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  পরীক্ষার হলে সময় বণ্টন, উদ্দীপক ডিকোডিং ট্যাকটিকস এবং A+ পাওয়ার নিশ্চিত কৌশল।
                </p>
              </div>
              <span className="text-xs font-bold text-[#f9902e] flex items-center gap-1">
                <span>গাইড দেখুন</span>
                <ArrowRight size={13} />
              </span>
            </Link>

            {/* 4. ডিজিটাল ওয়ার্কবুক */}
            <Link
              to="/category/workbook"
              className="bg-white rounded-[12px] p-5 border border-slate-200 hover:border-purple-600 hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-[10px] bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Layers size={22} />
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-purple-600 transition-colors mb-1.5">
                  ডিজিটাল ওয়ার্কবুক
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  হাতে-কলমে প্র্যাকটিস শিট, অঙ্ক ও ডায়াগ্রামের খালি টেমপ্লেট এবং সেলফ-অ্যাসেসমেন্ট।
                </p>
              </div>
              <span className="text-xs font-bold text-purple-600 flex items-center gap-1">
                <span>ওয়ার্কবুক দেখুন</span>
                <ArrowRight size={13} />
              </span>
            </Link>
          </div>
        </section>

        {/* 7. Popular Products with Working Filter Tabs */}
        <section aria-label="জনপ্রিয় প্রোডাক্ট">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Flame size={18} className="text-[#e2136e]" />
                <span className="text-[#e2136e] font-bold text-xs uppercase tracking-wider">
                  শিক্ষার্থীদের প্রথম পছন্দ
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a0a0a] mt-1">
                জনপ্রিয় স্টাডি মেটেরিয়ালস
              </h2>
            </div>

            {/* Filter Tabs: আপনার জন্য / প্রাথমিক / মাধ্যমিক / কলেজ / প্ল্যানার / নোটস */}
            <div className="flex flex-wrap gap-1 bg-white p-1 rounded-[10px] border border-slate-200 shadow-xs">
              <button
                type="button"
                onClick={() => setActiveTab('for-you')}
                className={`px-3 py-1.5 rounded-[8px] text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'for-you'
                    ? 'bg-[#e2136e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                আপনার জন্য
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('primary')}
                className={`px-3 py-1.5 rounded-[8px] text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'primary'
                    ? 'bg-[#e2136e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                প্রাথমিক (১–৫)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('school')}
                className={`px-3 py-1.5 rounded-[8px] text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'school'
                    ? 'bg-[#e2136e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                মাধ্যমিক (৬–১০)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('college')}
                className={`px-3 py-1.5 rounded-[8px] text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'college'
                    ? 'bg-[#e2136e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                কলেজ (HSC)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('planner')}
                className={`px-3 py-1.5 rounded-[8px] text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'planner'
                    ? 'bg-[#e2136e] text-white shadow-xs'
                    : 'text-[#626262] hover:text-[#0a0a0a] hover:bg-gray-100'
                }`}
              >
                প্ল্যানার
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('notes')}
                className={`px-3 py-1.5 rounded-[8px] text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'notes'
                    ? 'bg-[#e2136e] text-white shadow-xs'
                    : 'text-[#626262] hover:text-[#0a0a0a] hover:bg-gray-100'
                }`}
              >
                নোটস
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredPopularProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-white hover:bg-pink-50 text-[#e2136e] border-2 border-[#e2136e] font-bold text-sm px-8 py-3 rounded-[10px] transition-all shadow-xs"
            >
              <span>সকল {toBengaliNumber(products.length)}+ প্রোডাক্ট দেখুন</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* 8. Student Count Highlight (Editable Config) */}
        <section
          className="bg-gradient-to-r from-[#e2136e] via-[#c2105f] to-[#aa0e53] text-white rounded-[10px] p-8 sm:p-12 shadow-lg relative overflow-hidden text-center"
          aria-label="শিক্ষার্থী পরিসংখ্যান"
        >
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-4">
              <Users size={28} className="text-yellow-300" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-pink-200">
              আমাদের সফল কমিউনিটি
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mt-2 mb-4 drop-shadow-sm">
              দেশজুড়ে {siteConfig.studentCount} এর বেশি শিক্ষার্থীর আস্থা
            </h2>
            <p className="text-sm sm:text-base text-pink-100 max-w-xl mb-8 leading-relaxed">
              ঢাকা, চট্টগ্রাম, রাজশাহীসহ সারা দেশের স্বনামধন্য স্কুল ও কলেজের শিক্ষার্থীরা পড়ালেখা সহজ করতে বেছে নিয়েছে আমাদের ডিজিটাল রিসোর্স।
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full max-w-xl text-center border-t border-white/20 pt-6">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-yellow-300">
                  {siteConfig.studentCount}
                </div>
                <div className="text-xs text-pink-100 mt-0.5">সন্তুষ্ট শিক্ষার্থী</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-yellow-300">
                  {siteConfig.resourceCount}
                </div>
                <div className="text-xs text-pink-100 mt-0.5">ডিজিটাল নোটস ও বই</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-2xl sm:text-3xl font-black text-yellow-300">
                  {siteConfig.satisfactionRate}
                </div>
                <div className="text-xs text-pink-100 mt-0.5">পজিটিভ রিভিউ</div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. "কেন আমাদের বেছে নেবেন": 4 Feature Cards */}
        <section aria-label="আমাদের বৈশিষ্ট্য">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-slate-600 font-bold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              কেন আমরা সেরা
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              কেন আমাদের বেছে নেবেন?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              শিক্ষার্থীদের সময় ও পড়ালেখার মান বৃদ্ধি নিশ্চিত করতে আমাদের প্রতিটি বই অনন্য
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {chooseUsPoints.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[12px] p-5 border border-slate-200 hover:border-[#e2136e] hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-full bg-pink-50 text-[#e2136e] font-bold text-xs flex items-center justify-center mb-3 border border-pink-100">
                    {toBengaliNumber(idx + 1)}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                  <CheckCircle2 size={13} />
                  <span>যাচাইকৃত মান</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. E-book Section (3 features & button to /ebooks) */}
        <section
          className="bg-white rounded-[12px] p-6 sm:p-10 border border-slate-200 shadow-xs flex flex-col lg:flex-row items-center gap-8 justify-between"
          aria-label="ই-বুক সুবিধা"
        >
          <div className="max-w-xl">
            <span className="bg-pink-50 text-[#e2136e] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3 border border-pink-100">
              স্মার্ট রিডিং অভিজ্ঞতা
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              যেকোনো ডিভাইসে পড়ুন, প্রিন্ট করুন বা হাইলাইট করুন
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              মোবাইলের স্ক্রিনে চোখ আটকে না রেখে অথবা ভারি বইয়ের বোঝা না টেনে, ট্যাবলেটে বা প্রিন্ট করে খুব সহজেই স্বাচ্ছন্দ্যে পড়াশোনা করুন।
            </p>

            <div className="flex flex-col gap-2.5 mb-7">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-800">
                  ১০০% আনলকড ও পাসওয়ার্ডমুক্ত প্রিন্ট ফ্রেন্ডলি PDF ফাইল
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-800">
                  ক্লিকযোগ্য আধুনিক সূচিপত্র — এক ক্লিকে যেকোনো অধ্যায়ে জাম্প
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-800">
                  হাই কোয়ালিটি ভেক্টর গ্রাফিক্স — জুম করলেও একটুও ফাটবে না
                </span>
              </div>
            </div>

            <Link
              to="/ebooks"
              className="bg-[#e2136e] hover:bg-[#c2105f] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-[10px] transition-all inline-flex items-center gap-2 shadow-xs"
            >
              <span>সকল ই-বুক এক্সপ্লোর করুন</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="w-full max-w-sm bg-slate-50 p-6 rounded-[12px] border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-full bg-pink-50 text-[#e2136e] flex items-center justify-center mx-auto mb-3 border border-pink-100">
              <BookOpen size={24} />
            </div>
            <h4 className="font-bold text-base text-slate-900 mb-1">
              তাত্ক্ষণিক ফ্রি স্যাম্পল দেখে নিন
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              যেকোনো বই কেনার আগে কোয়ালিটি যাচাই করতে আমাদের ফ্রি স্যাম্পল সংগ্রহ করুন।
            </p>
            <Link
              to="/free-sample"
              className="block bg-[#f9902e] hover:bg-[#f88114] text-slate-900 font-bold text-xs py-2.5 px-4 rounded-[8px] transition-all shadow-xs"
            >
              ফ্রি স্যাম্পল ডাউনলোড
            </Link>
          </div>
        </section>

        {/* 11. Two Promo Banners: Annual Exam Bundle (School) & HSC Bundle (College) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-label="প্রমোশনাল বান্ডেল">
          {/* Annual Exam Model Test Bundle (School) */}
          <div className="bg-white rounded-[12px] p-6 border border-slate-200 hover:border-[#e2136e] transition-all shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="bg-pink-50 text-[#e2136e] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-pink-100">
                  স্কুল স্পেশাল
                </span>
                <span className="text-[11px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                  ৫০% ছাড়
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                বার্ষিক পরীক্ষা অল-ইন-ওয়ান মডেল টেস্ট বান্ডেল (ক্লাস ৬–১০)
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                গণিত, বিজ্ঞান, ইংরেজি ও বাংলার জন্য ২০ সেট শীর্ষ স্কুলের প্রশ্ন এবং শতভাগ নির্ভরযোগ্য সমাধান ম্যানুয়াল।
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-lg font-black text-[#e2136e]">৳ ২২০</span>
                <span className="text-xs text-slate-400 line-through ml-2">৳ ৪৫০</span>
              </div>
              <Link
                to="/product/class-8-annual-exam-model-test-bundle"
                className="bg-[#e2136e] hover:bg-[#c2105f] text-white text-xs font-bold px-4 py-2 rounded-[8px] transition-all"
              >
                বান্ডেল সংগ্রহ করুন
              </Link>
            </div>
          </div>

          {/* HSC Model Test Bundle (College) */}
          <div className="bg-white rounded-[12px] p-6 border border-slate-200 hover:border-[#f9902e] transition-all shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="bg-orange-50 text-[#f9902e] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-orange-100">
                  কলেজ স্পেশাল
                </span>
                <span className="text-[11px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                  ৫০% ছাড়
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                HSC বোর্ড স্ট্যান্ডার্ড মেগা মডেল টেস্ট ও ওএমআর বান্ডেল
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                পদার্থ, রসায়ন, উচ্চতর গণিত ও জীববিজ্ঞান বিষয়ের ৩০ সেট কমপ্লিট বোর্ড স্ট্যান্ডার্ড টেস্ট ও নম্বর বণ্টন।
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-lg font-black text-[#e2136e]">৳ ২৮০</span>
                <span className="text-xs text-slate-400 line-through ml-2">৳ ৫৬০</span>
              </div>
              <Link
                to="/product/hsc-mega-model-test-exam-bundle"
                className="bg-[#f9902e] hover:bg-[#f88114] text-slate-900 text-xs font-bold px-4 py-2 rounded-[8px] transition-all"
              >
                বান্ডেল সংগ্রহ করুন
              </Link>
            </div>
          </div>
        </section>

        {/* 12. FAQ Accordion */}
        <section aria-label="সাধারণ জিজ্ঞাসা" className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-slate-600 font-bold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              প্রশ্ন ও উত্তর
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              ডিজিটাল প্রোডাক্ট কেনা ও ডাউনলোড সম্পর্কিত সাধারণ প্রশ্নসমূহ
            </p>
          </div>

          <div className="space-y-3">
            {faqsList.map(faq => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-[12px] border border-slate-200 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-3 hover:text-[#e2136e] transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span className="text-[#e2136e] shrink-0">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-6">
            <Link to="/faq" className="text-xs font-bold text-[#e2136e] hover:underline">
              আরও কোনো প্রশ্ন আছে? সম্পূর্ণ FAQ পেজ দেখুন →
            </Link>
          </div>
        </section>

        {/* 13. Testimonials Slider */}
        <section aria-label="শিক্ষার্থী ও অভিভাবকদের মতামত">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-slate-600 font-bold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              অভিজ্ঞতা ও রিভিউ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              শিক্ষার্থী ও অভিভাবকরা কী বলছেন
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              আমাদের নিয়মিত পাঠকদের অভিজ্ঞতা (নমুনা কন্টেন্ট, যা আপনি সহজে পরিবর্তন করতে পারেন)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonialsList.map(t => (
              <div
                key={t.id}
                className="bg-white rounded-[12px] p-5 border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                      {t.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed mb-4 italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-pink-50 text-[#e2136e] font-bold text-xs flex items-center justify-center shrink-0 border border-pink-100">
                    {t.avatarText}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{t.name}</h4>
                    <p className="text-[11px] text-slate-500">{t.role}</p>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{t.institution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 14. Contact Call-to-Action */}
        <section
          className="bg-gradient-to-r from-[#AA0E53] to-[#e2136e] text-white rounded-[10px] p-8 sm:p-12 shadow-lg"
          aria-label="যোগাযোগ ও সহায়তা"
        >
          <div className="max-w-3xl mx-auto text-center">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
              সরাসরি যোগাযোগ
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
              যেকোনো প্রশ্ন বা সহযোগিতায় আমরা আপনার পাশে আছি
            </h2>
            <p className="text-xs sm:text-sm text-pink-100 max-w-xl mx-auto mb-6 leading-relaxed">
              ফাইল ডাউনলোড সংক্রান্ত জটিলতা, পেমেন্ট ভেরিফিকেশন বা কোনো বিষয় বুঝতে অসুবিধা হলে আমাদের সাপোর্ট টিমের সাথে সরাসরি যোগাযোগ করুন।
            </p>

            <form
              onSubmit={handleCtaSubmit}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 mb-6"
            >
              <input
                type="email"
                required
                value={ctaEmail}
                onChange={e => setCtaEmail(e.target.value)}
                placeholder="আপনার ইমেইল ঠিকানা দিন..."
                className="bg-white text-xs sm:text-sm text-[#0a0a0a] px-4 py-3 rounded-[10px] flex-1 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#f9902e] hover:bg-[#f88114] text-[#0a0a0a] font-extrabold text-xs sm:text-sm px-5 py-3 rounded-[10px] transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>ফ্রি গাইড পান</span>
                <Send size={14} />
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-pink-100 font-medium">
              <Link to="/contact" className="hover:underline flex items-center gap-1">
                <span>যোগাযোগ পেজ</span>
                <ArrowRight size={13} />
              </Link>
              <span>•</span>
              <a href={siteConfig.contact.whatsapp} target="_blank" rel="noreferrer" className="hover:underline">
                হোয়াটসঅ্যাপ: {siteConfig.contact.phone}
              </a>
              <span>•</span>
              <span>ইমেইল: {siteConfig.contact.email}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
