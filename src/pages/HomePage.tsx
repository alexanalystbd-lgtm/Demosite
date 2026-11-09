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
import { useLanguage } from '../context/LanguageContext';
import { classesList, DigitalProduct } from '../data/products';
import { specialCoursesList } from '../data/specialCourses';
import {
  chooseUsList,
  promoBundles,
  bilingualFaqs,
  bilingualTestimonials
} from '../data/translationsData';
import { toBengaliNumber } from '../utils/shopLogic';

export const HomePage: React.FC = () => {
  const { products, showToast } = useShop();
  const { lang, t, toLocalizedNumber } = useLanguage();

  // Active filter tab for Popular Products
  const [activeTab, setActiveTab] = useState<'for-you' | 'primary' | 'school' | 'college' | 'planner' | 'notes'>('for-you');

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
              {lang === 'en' ? 'Get Started' : 'সহজে শুরু করুন'}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
              {t('selectClassTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('selectClassSub')}
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
                    {lang === 'en'
                      ? item.slug.startsWith('class-')
                        ? `Class ${item.slug.replace('class-', '')}`
                        : item.slug === 'hsc-1st-year'
                        ? 'HSC 1st Yr'
                        : 'HSC 2nd Yr'
                      : item.name}
                  </span>
                  <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 leading-tight">
                    {lang === 'en'
                      ? item.slug.startsWith('class-') && Number(item.slug.replace('class-', '')) <= 5
                        ? 'Primary'
                        : item.slug.startsWith('class-')
                        ? 'High School'
                        : 'College'
                      : item.desc}
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
                {t('schoolSectionBadge')}
              </span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 leading-tight mb-2">
                {t('schoolSectionTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                {t('schoolSectionDesc')}
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  to="/school"
                  className="bg-[#e2136e] hover:bg-[#c2105f] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 rounded-[8px] transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <span>{t('viewSchoolProducts')}</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/school/class-5"
                  className="bg-slate-50 hover:bg-pink-50 text-slate-800 hover:text-[#e2136e] border border-slate-200 text-xs sm:text-sm font-bold px-3.5 py-2 rounded-[8px] transition-all"
                >
                  <span>{t('specialClass5')}</span>
                </Link>
                <Link
                  to="/school/class-10"
                  className="bg-slate-50 hover:bg-pink-50 text-slate-800 hover:text-[#e2136e] border border-slate-200 text-xs sm:text-sm font-bold px-3.5 py-2 rounded-[8px] transition-all"
                >
                  <span>{t('specialSSC')}</span>
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
                {t('collegeSectionBadge')}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight mb-2">
                {t('collegeSectionTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                {t('collegeSectionDesc')}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/college"
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-[8px] transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <span>{t('viewCollegeProducts')}</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to="/college/hsc-2nd-year"
                  className="bg-slate-50 hover:bg-orange-50 text-slate-800 hover:text-[#f9902e] border border-slate-200 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-[8px] transition-all"
                >
                  <span>{t('specialHSC2nd')}</span>
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
                  {lang === 'en' ? 'Teacher Resources' : 'শিক্ষক রিসোর্স'}
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-[#0084a2] transition-colors mb-1.5">
                {t('navTeachersCorner')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                {lang === 'en'
                  ? 'New curriculum lesson plans, creative question banks and continuous assessment sheets.'
                  : 'নতুন কারিকুলামের পাঠ পরিকল্পনা (Lesson Plans), সৃজনশীল প্রশ্ন ব্যাংক ও ধারাবাহিক মূল্যায়ন শিট।'}
              </p>
            </div>
            <span className="text-xs font-bold text-[#0084a2] flex items-center gap-1">
              <span>{lang === 'en' ? 'Explore Resources' : 'রিসোর্স দেখুন'}</span>
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
                  {lang === 'en' ? 'BCS & Bank Jobs' : 'বিসিএস ও ব্যাংক'}
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-[#e2136e] transition-colors mb-1.5">
                {t('navCareerExam')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                {lang === 'en'
                  ? 'BCS shortcuts, bank math solutions, university admission hacks and primary digest.'
                  : 'বিসিএস প্রিলি শর্টকাট, ব্যাংক জবস ম্যাথ, ঢাবি-বুয়েট ভর্তি হ্যাকস ও প্রাইমারি শিক্ষক ডাইজেস্ট।'}
              </p>
            </div>
            <span className="text-xs font-bold text-[#e2136e] flex items-center gap-1">
              <span>{lang === 'en' ? 'View Exam Guides' : 'প্রস্তুতি গাইড দেখুন'}</span>
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
                  {lang === 'en' ? 'Live Circulars' : 'হালনাগাদ সার্কুলার'}
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-[#f9902e] transition-colors mb-1.5">
                {t('navJobCircular')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                {lang === 'en'
                  ? 'All active government and bank job notices, vacancy counts, deadlines and circular PDFs.'
                  : 'চলমান সকল সরকারি ও বেসরকারি নিয়োগ বিজ্ঞপ্তি, পদসংখ্যা, আবেদনের শেষ তারিখ ও সার্কুলার PDF।'}
              </p>
            </div>
            <span className="text-xs font-bold text-[#f9902e] flex items-center gap-1">
              <span>{t('seeCircular')}</span>
              <ArrowRight size={13} />
            </span>
          </Link>
        </section>

        {/* 4.8. বিশেষ প্রস্তুতি কোর্সসমূহ Featured Grid (All 4 Courses) */}
        <section aria-label="বিশেষ প্রস্তুতি কোর্সসমূহ" className="bg-gradient-to-br from-pink-50/70 via-white to-pink-50/40 rounded-[16px] p-6 sm:p-8 border border-pink-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Award size={18} className="text-[#e2136e]" />
                <span className="text-[#e2136e] font-bold text-xs uppercase tracking-wider">
                  {lang === 'en' ? 'Targeted Scholarship & Board Batches' : 'মেধা বৃত্তি ও বোর্ড চ্যালেঞ্জ'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
                {t('navSpecialCourses')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                {lang === 'en'
                  ? 'Comprehensive preparation programs with live mentorship, model tests and digital study resources'
                  : 'বৃত্তি পরীক্ষা ও বোর্ড পরীক্ষায় শতভাগ A+ নিশ্চিত করার বিশেষায়িত একাডেমি'}
              </p>
            </div>
            <Link
              to="/special-courses"
              className="text-xs font-bold text-[#e2136e] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>{t('viewAllCourses')}</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {specialCoursesList.map(course => (
              <div
                key={course.id}
                className="bg-white rounded-[12px] p-4 sm:p-5 border border-slate-200 hover:border-[#e2136e] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[#e2136e] bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
                      {lang === 'en' ? course.badgeEn : course.badgeBn}
                    </span>
                    <span className="text-xs font-black text-[#e2136e]">
                      {lang === 'en' ? `BDT ${course.price}` : `৳ ${toLocalizedNumber(course.price)}`}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#e2136e] transition-colors mb-1.5 leading-snug">
                    {lang === 'en' ? course.titleEn : course.titleBn}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3">
                    {lang === 'en' ? course.subtitleEn : course.subtitleBn}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] text-slate-600 bg-slate-50 py-1.5 px-2 rounded-md mb-3">
                    <span className="font-bold text-slate-900">{toLocalizedNumber(course.totalLectures)} {lang === 'en' ? 'Classes' : 'ক্লাস'}</span>
                    <span>•</span>
                    <span className="font-bold text-slate-900">{toLocalizedNumber(course.totalMockTests)} {lang === 'en' ? 'Tests' : 'টেস্ট'}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/special-courses/${course.slug}`}
                    className="text-xs font-bold text-slate-700 hover:text-[#e2136e] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>{lang === 'en' ? 'Enroll / Details' : 'ভর্তি ও বিস্তারিত'}</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Trust Strip: Instant Download, Secure Payment, Free Sample, Support */}
        <section
          className="bg-white rounded-[12px] p-6 sm:p-7 border border-slate-200 shadow-xs"
          aria-label={lang === 'en' ? 'Security & Services' : 'নিরাপত্তা ও সেবা'}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-[10px] bg-pink-50 text-[#e2136e] flex items-center justify-center shrink-0 border border-pink-100">
                <Zap size={22} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-0.5">
                  {t('instantDownloadTitle')}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('instantDownloadSub')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 sm:pl-6 pt-4 sm:pt-0">
              <div className="w-11 h-11 rounded-[10px] bg-pink-50 text-[#e2136e] flex items-center justify-center shrink-0 border border-pink-100">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-0.5">
                  {t('securePaymentTitle')}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('securePaymentSub')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 sm:pl-6 pt-4 sm:pt-0">
              <div className="w-11 h-11 rounded-[10px] bg-pink-50 text-[#e2136e] flex items-center justify-center shrink-0 border border-pink-100">
                <BookOpen size={22} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-0.5">
                  {t('freeSampleTitle')}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('freeSampleSub')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 sm:pl-6 pt-4 sm:pt-0">
              <div className="w-11 h-11 rounded-[10px] bg-pink-50 text-[#e2136e] flex items-center justify-center shrink-0 border border-pink-100">
                <Headphones size={22} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-0.5">
                  {t('helplineTitle')}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('helplineSub')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Product Categories (4 clean cards) */}
        <section aria-label="প্রোডাক্ট ক্যাটাগরি">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <span className="text-slate-600 font-bold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                {lang === 'en' ? 'Curated Study Materials' : 'বিষয়ভিত্তিক সংকলন'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                {t('popularCategoriesTitle')}
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs font-bold text-[#e2136e] hover:underline flex items-center gap-1"
            >
              <span>{lang === 'en' ? 'View All Categories' : 'সকল ক্যাটাগরি দেখুন'}</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Study Planner */}
            <Link
              to="/category/planner"
              className="bg-white rounded-[12px] p-5 border border-slate-200 hover:border-[#e2136e] hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-[10px] bg-pink-50 text-[#e2136e] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Calendar size={22} />
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-[#e2136e] transition-colors mb-1.5">
                  {t('catPlanner')}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {lang === 'en'
                    ? 'Daily routines, weekly goal trackers, chapter checklists and exam countdowns.'
                    : 'দৈনিক রুটিন, সাপ্তাহিক গোল ট্র্যাকার, অধ্যায় সমাপ্তি চেকলিস্ট ও পরীক্ষার কাউন্টডাউন।'}
                </p>
              </div>
              <span className="text-xs font-bold text-[#e2136e] flex items-center gap-1">
                <span>{lang === 'en' ? 'View Planners' : 'প্ল্যানার দেখুন'}</span>
                <ArrowRight size={13} />
              </span>
            </Link>

            {/* 2. Subject Notes */}
            <Link
              to="/category/notes"
              className="bg-white rounded-[12px] p-5 border border-slate-200 hover:border-[#0084a2] hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-[10px] bg-sky-50 text-[#0084a2] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <FileText size={22} />
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-[#0084a2] transition-colors mb-1.5">
                  {t('catNotes')}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {lang === 'en'
                    ? 'Chapter-wise colorful theory, handwritten formula sheets and easy visual diagrams.'
                    : 'অধ্যায়ভিত্তিক রঙিন থিওরি, হ্যান্ডরিটেন ফর্মুলা শিট ও সহজে বোঝার স্পেশাল ডায়াগ্রাম।'}
                </p>
              </div>
              <span className="text-xs font-bold text-[#0084a2] flex items-center gap-1">
                <span>{lang === 'en' ? 'View Notes' : 'নোটস দেখুন'}</span>
                <ArrowRight size={13} />
              </span>
            </Link>

            {/* 3. Exam Preparation Guide */}
            <Link
              to="/category/exam-guide"
              className="bg-white rounded-[12px] p-5 border border-slate-200 hover:border-[#f9902e] hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-[10px] bg-amber-50 text-[#f9902e] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Target size={22} />
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-[#f9902e] transition-colors mb-1.5">
                  {t('catExamGuide')}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {lang === 'en'
                    ? 'Exam hall time management, stimulus decoding tactics and guaranteed A+ strategies.'
                    : 'পরীক্ষার হলে সময় বণ্টন, উদ্দীপক ডিকোডিং ট্যাকটিকস এবং A+ পাওয়ার নিশ্চিত কৌশল।'}
                </p>
              </div>
              <span className="text-xs font-bold text-[#f9902e] flex items-center gap-1">
                <span>{lang === 'en' ? 'View Guides' : 'গাইড দেখুন'}</span>
                <ArrowRight size={13} />
              </span>
            </Link>

            {/* 4. Digital Workbook */}
            <Link
              to="/category/workbook"
              className="bg-white rounded-[12px] p-5 border border-slate-200 hover:border-purple-600 hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-[10px] bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Layers size={22} />
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-purple-600 transition-colors mb-1.5">
                  {t('catWorkbook')}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {lang === 'en'
                    ? 'Hands-on practice sheets, blank math templates, diagrams and self-assessment drills.'
                    : 'হাতে-কলমে প্র্যাকটিস শিট, অঙ্ক ও ডায়াগ্রামের খালি টেমপ্লেট এবং সেলফ-অ্যাসেসমেন্ট।'}
                </p>
              </div>
              <span className="text-xs font-bold text-purple-600 flex items-center gap-1">
                <span>{lang === 'en' ? 'View Workbooks' : 'ওয়ার্কবুক দেখুন'}</span>
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
                  {t('studentsFirstChoice')}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a0a0a] mt-1">
                {t('popularProductsTitle')}
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
                {t('tabForYou')}
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
                {t('tabPrimary')}
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
                {t('tabSchool')}
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
                {t('tabCollege')}
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
                {t('tabPlanner')}
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
                {t('tabNotes')}
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
              <span>{lang === 'en' ? `View All ${products.length}+ Products` : `সকল ${toBengaliNumber(products.length)}+ প্রোডাক্ট দেখুন`}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* 8. Student Count Highlight (Editable Config) */}
        <section
          className="bg-gradient-to-r from-[#e2136e] via-[#c2105f] to-[#aa0e53] text-white rounded-[10px] p-8 sm:p-12 shadow-lg relative overflow-hidden text-center"
          aria-label={lang === 'en' ? 'Student Statistics' : 'শিক্ষার্থী পরিসংখ্যান'}
        >
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-4">
              <Users size={28} className="text-yellow-300" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-pink-200">
              {lang === 'en' ? 'Our Trusted Community' : 'আমাদের সফল কমিউনিটি'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mt-2 mb-4 drop-shadow-sm">
              {lang === 'en'
                ? `Trusted by Over ${toLocalizedNumber(50000)}+ Students Nationwide`
                : `দেশজুড়ে ${siteConfig.studentCount} এর বেশি শিক্ষার্থীর আস্থা`}
            </h2>
            <p className="text-sm sm:text-base text-pink-100 max-w-xl mb-8 leading-relaxed">
              {lang === 'en'
                ? 'Students from reputed schools and colleges across Dhaka, Chattogram, Rajshahi and nationwide choose our digital resources to excel in their studies.'
                : 'ঢাকা, চট্টগ্রাম, রাজশাহীসহ সারা দেশের স্বনামধন্য স্কুল ও কলেজের শিক্ষার্থীরা পড়ালেখা সহজ করতে বেছে নিয়েছে আমাদের ডিজিটাল রিসোর্স।'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full max-w-xl text-center border-t border-white/20 pt-6">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-yellow-300">
                  {toLocalizedNumber(50000)}+
                </div>
                <div className="text-xs text-pink-100 mt-0.5">
                  {lang === 'en' ? 'Satisfied Students' : 'সন্তুষ্ট শিক্ষার্থী'}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-yellow-300">
                  {toLocalizedNumber(120)}+
                </div>
                <div className="text-xs text-pink-100 mt-0.5">
                  {lang === 'en' ? 'Digital Notes & Books' : 'ডিজিটাল নোটস ও বই'}
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-2xl sm:text-3xl font-black text-yellow-300">
                  {toLocalizedNumber(99)}%
                </div>
                <div className="text-xs text-pink-100 mt-0.5">
                  {lang === 'en' ? 'Positive Reviews' : 'পজিটিভ রিভিউ'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. "কেন আমাদের বেছে নেবেন": 4 Feature Cards */}
        <section aria-label={lang === 'en' ? 'Our Features' : 'আমাদের বৈশিষ্ট্য'}>
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-slate-600 font-bold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              {t('whyBestBadge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {t('whyChooseUsTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('whyChooseUsSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {chooseUsList[lang].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[12px] p-5 border border-slate-200 hover:border-[#e2136e] hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-full bg-pink-50 text-[#e2136e] font-bold text-xs flex items-center justify-center mb-3 border border-pink-100">
                    {toLocalizedNumber(idx + 1)}
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
                  <span>{lang === 'en' ? 'Verified Quality' : 'যাচাইকৃত মান'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. E-book Section (3 features & button to /ebooks) */}
        <section
          className="bg-white rounded-[12px] p-6 sm:p-10 border border-slate-200 shadow-xs flex flex-col lg:flex-row items-center gap-8 justify-between"
          aria-label={lang === 'en' ? 'E-book Benefits' : 'ই-বুক সুবিধা'}
        >
          <div className="max-w-xl">
            <span className="bg-pink-50 text-[#e2136e] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3 border border-pink-100">
              {lang === 'en' ? 'Smart Reading Experience' : 'স্মার্ট রিডিং অভিজ্ঞতা'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              {lang === 'en' ? 'Read on Any Device, Print or Highlight with Ease' : 'যেকোনো ডিভাইসে পড়ুন, প্রিন্ট করুন বা হাইলাইট করুন'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              {lang === 'en'
                ? 'Study comfortably on your tablet, laptop or phone without carrying heavy textbooks, or print easily with crystal clear formatting.'
                : 'মোবাইলের স্ক্রিনে চোখ আটকে না রেখে অথবা ভারি বইয়ের বোঝা না টেনে, ট্যাবলেটে বা প্রিন্ট করে খুব সহজেই স্বাচ্ছন্দ্যে পড়াশোনা করুন।'}
            </p>

            <div className="flex flex-col gap-2.5 mb-7">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-800">
                  {lang === 'en' ? '100% unlocked and password-free print-friendly PDF files' : '১০০% আনলকড ও পাসওয়ার্ডমুক্ত প্রিন্ট ফ্রেন্ডলি PDF ফাইল'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-800">
                  {lang === 'en' ? 'Interactive clickable table of contents — jump to any chapter instantly' : 'ক্লিকযোগ্য আধুনিক সূচিপত্র — এক ক্লিকে যেকোনো অধ্যায়ে জাম্প'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-800">
                  {lang === 'en' ? 'High quality vector typography and formulas — crystal clear at any zoom level' : 'হাই কোয়ালিটি ভেক্টর গ্রাফিক্স — জুম করলেও একটুও ফাটবে না'}
                </span>
              </div>
            </div>

            <Link
              to="/ebooks"
              className="bg-[#e2136e] hover:bg-[#c2105f] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-[10px] transition-all inline-flex items-center gap-2 shadow-xs"
            >
              <span>{lang === 'en' ? 'Explore All E-Books' : 'সকল ই-বুক এক্সপ্লোর করুন'}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="w-full max-w-sm bg-slate-50 p-6 rounded-[12px] border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-full bg-pink-50 text-[#e2136e] flex items-center justify-center mx-auto mb-3 border border-pink-100">
              <BookOpen size={24} />
            </div>
            <h4 className="font-bold text-base text-slate-900 mb-1">
              {lang === 'en' ? 'Get Instant Free Sample' : 'তাত্ক্ষণিক ফ্রি স্যাম্পল দেখে নিন'}
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              {lang === 'en'
                ? 'Download our free sample packs to check layout quality and depth before purchasing.'
                : 'যেকোনো বই কেনার আগে কোয়ালিটি যাচাই করতে আমাদের ফ্রি স্যাম্পল সংগ্রহ করুন।'}
            </p>
            <Link
              to="/free-sample"
              className="block bg-[#f9902e] hover:bg-[#f88114] text-slate-900 font-bold text-xs py-2.5 px-4 rounded-[8px] transition-all shadow-xs"
            >
              {t('freeSampleDownload')}
            </Link>
          </div>
        </section>

        {/* 11. Two Promo Banners: Annual Exam Bundle (School) & HSC Bundle (College) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-label={lang === 'en' ? 'Promotional Bundles' : 'প্রমোশনাল বান্ডেল'}>
          {promoBundles[lang].map((bundle) => (
            <div
              key={bundle.id}
              className={`bg-white rounded-[12px] p-6 border border-slate-200 hover:border-[${bundle.id === 'promo-school' ? '#e2136e' : '#f9902e'}] transition-all shadow-xs flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    bundle.id === 'promo-school'
                      ? 'bg-pink-50 text-[#e2136e] border-pink-100'
                      : 'bg-orange-50 text-[#f9902e] border-orange-100'
                  }`}>
                    {bundle.badge}
                  </span>
                  <span className="text-[11px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                    {bundle.discount}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                  {bundle.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {bundle.desc}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-lg font-black text-[#e2136e]">
                    {lang === 'en' ? `BDT ${bundle.price}` : `৳ ${toLocalizedNumber(bundle.price)}`}
                  </span>
                  <span className="text-xs text-slate-400 line-through ml-2">
                    {lang === 'en' ? `BDT ${bundle.originalPrice}` : `৳ ${toLocalizedNumber(bundle.originalPrice)}`}
                  </span>
                </div>
                <Link
                  to={bundle.link}
                  className={`text-xs font-bold px-4 py-2 rounded-[8px] transition-all ${
                    bundle.id === 'promo-school'
                      ? 'bg-[#e2136e] hover:bg-[#c2105f] text-white'
                      : 'bg-[#f9902e] hover:bg-[#f88114] text-slate-900'
                  }`}
                >
                  {lang === 'en' ? 'Get Bundle' : 'বান্ডেল সংগ্রহ করুন'}
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* 12. FAQ Accordion */}
        <section aria-label={lang === 'en' ? 'Frequently Asked Questions' : 'সাধারণ জিজ্ঞাসা'} className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-slate-600 font-bold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              {lang === 'en' ? 'Q & A' : 'প্রশ্ন ও উত্তর'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {t('faqTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === 'en' ? 'Frequently asked questions about digital notes and downloads' : 'ডিজিটাল প্রোডাক্ট কেনা ও ডাউনলোড সম্পর্কিত সাধারণ প্রশ্নসমূহ'}
            </p>
          </div>

          <div className="space-y-3">
            {bilingualFaqs[lang].map(faq => {
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
              {lang === 'en' ? 'Have more questions? View the complete FAQ page →' : 'আরও কোনো প্রশ্ন আছে? সম্পূর্ণ FAQ পেজ দেখুন →'}
            </Link>
          </div>
        </section>

        {/* 13. Testimonials Slider */}
        <section aria-label={lang === 'en' ? 'Testimonials' : 'শিক্ষার্থী ও অভিভাবকদের মতামত'}>
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-slate-600 font-bold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              {lang === 'en' ? 'Reviews & Feedback' : 'অভিজ্ঞতা ও রিভিউ'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {lang === 'en' ? 'What Students & Parents Say' : 'শিক্ষার্থী ও অভিভাবকরা কী বলছেন'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === 'en' ? 'Real experiences from our regular readers and students' : 'আমাদের নিয়মিত পাঠকদের অভিজ্ঞতা (নমুনা কন্টেন্ট, যা আপনি সহজে পরিবর্তন করতে পারেন)'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {bilingualTestimonials[lang].map(item => (
              <div
                key={item.id}
                className="bg-white rounded-[12px] p-5 border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                      {item.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed mb-4 italic">
                    "{item.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-pink-50 text-[#e2136e] font-bold text-xs flex items-center justify-center shrink-0 border border-pink-100">
                    {item.avatarText}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{item.name}</h4>
                    <p className="text-[11px] text-slate-500">{item.role}</p>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{item.institution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 14. Contact Call-to-Action */}
        <section
          className="bg-gradient-to-r from-[#AA0E53] to-[#e2136e] text-white rounded-[10px] p-8 sm:p-12 shadow-lg"
          aria-label={lang === 'en' ? 'Assistance & Contact' : 'যোগাযোগ ও সহায়তা'}
        >
          <div className="max-w-3xl mx-auto text-center">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
              {lang === 'en' ? 'Direct Assistance' : 'সরাসরি যোগাযোগ'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
              {lang === 'en' ? 'We Are Here to Assist Your Learning Journey' : 'যেকোনো প্রশ্ন বা সহযোগিতায় আমরা আপনার পাশে আছি'}
            </h2>
            <p className="text-xs sm:text-sm text-pink-100 max-w-xl mx-auto mb-6 leading-relaxed">
              {lang === 'en'
                ? 'If you have questions regarding file downloads, payment verification or study materials, our support team is available 24/7.'
                : 'ফাইল ডাউনলোড সংক্রান্ত জটিলতা, পেমেন্ট ভেরিফিকেশন বা কোনো বিষয় বুঝতে অসুবিধা হলে আমাদের সাপোর্ট টিমের সাথে সরাসরি যোগাযোগ করুন।'}
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
                placeholder={lang === 'en' ? 'Enter your email address...' : 'আপনার ইমেইল ঠিকানা দিন...'}
                className="bg-white text-xs sm:text-sm text-[#0a0a0a] px-4 py-3 rounded-[10px] flex-1 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#f9902e] hover:bg-[#f88114] text-[#0a0a0a] font-extrabold text-xs sm:text-sm px-5 py-3 rounded-[10px] transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>{lang === 'en' ? 'Get Free Guide' : 'ফ্রি গাইড পান'}</span>
                <Send size={14} />
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-pink-100 font-medium">
              <Link to="/contact" className="hover:underline flex items-center gap-1">
                <span>{lang === 'en' ? 'Contact Page' : 'যোগাযোগ পেজ'}</span>
                <ArrowRight size={13} />
              </Link>
              <span>•</span>
              <a href={siteConfig.contact.whatsapp} target="_blank" rel="noreferrer" className="hover:underline">
                {lang === 'en' ? 'WhatsApp:' : 'হোয়াটসঅ্যাপ:'} {siteConfig.contact.phone}
              </a>
              <span>•</span>
              <span>{lang === 'en' ? 'Email:' : 'ইমেইল:'} {siteConfig.contact.email}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
