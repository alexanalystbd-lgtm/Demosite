import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  User,
  Menu,
  X,
  ChevronDown,
  Gift,
  HelpCircle,
  PhoneCall,
  Search,
  BookOpen,
  GraduationCap,
  Briefcase,
  FileText,
  Globe,
  Award,
  Sparkles,
  Layers
} from 'lucide-react';
import { siteConfig } from '../config';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';

export const Header: React.FC = () => {
  const { currentUser } = useShop();
  const { lang, setLang, toggleLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [schoolDropdownOpen, setSchoolDropdownOpen] = useState(false);
  const [collegeDropdownOpen, setCollegeDropdownOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const navigate = useNavigate();

  const schoolTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const collegeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const coursesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSchoolMouseEnter = () => {
    if (schoolTimeoutRef.current) clearTimeout(schoolTimeoutRef.current);
    setSchoolDropdownOpen(true);
  };
  const handleSchoolMouseLeave = () => {
    schoolTimeoutRef.current = setTimeout(() => {
      setSchoolDropdownOpen(false);
    }, 180);
  };

  const handleCollegeMouseEnter = () => {
    if (collegeTimeoutRef.current) clearTimeout(collegeTimeoutRef.current);
    setCollegeDropdownOpen(true);
  };
  const handleCollegeMouseLeave = () => {
    collegeTimeoutRef.current = setTimeout(() => {
      setCollegeDropdownOpen(false);
    }, 180);
  };

  const handleCoursesMouseEnter = () => {
    if (coursesTimeoutRef.current) clearTimeout(coursesTimeoutRef.current);
    setCoursesDropdownOpen(true);
  };
  const handleCoursesMouseLeave = () => {
    coursesTimeoutRef.current = setTimeout(() => {
      setCoursesDropdownOpen(false);
    }, 180);
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(mobileSearchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  // Close dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSchoolDropdownOpen(false);
    setCollegeDropdownOpen(false);
    setCoursesDropdownOpen(false);
  }, [navigate]);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* 1. Thin Top Strip (#AA0E53) - Sample buying text REMOVED, Language switcher on far right corner */}
      <div className="bg-[#AA0E53] text-white text-xs py-1.5 px-4 sm:px-6 border-b border-pink-900/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Contact & Support info */}
          <div className="flex items-center gap-3 sm:gap-4 text-pink-100 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5 font-medium">
              <PhoneCall size={12} className="text-yellow-300" />
              <span>{lang === 'en' ? 'Support:' : 'সাপোর্ট:'} {siteConfig.contact.phone}</span>
            </div>
            <span className="text-pink-300/40 hidden sm:inline">|</span>
            <Link to="/how-to-buy" className="hover:text-white hidden sm:flex items-center gap-1">
              <HelpCircle size={12} />
              <span>{t('howToBuy')}</span>
            </Link>
            <span className="text-pink-300/40 hidden md:inline">|</span>
            <span className="hidden md:inline text-pink-200/90 text-[11px]">
              {lang === 'en' ? 'Instant Digital Download & 24/7 Assistance' : 'ইনস্ট্যান্ট ডিজিটাল ডাউনলোড ও সার্বক্ষণিক সহায়তা'}
            </span>
          </div>

          {/* Far Right Corner: Language Selector Button (বাংলা | English) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-black/25 rounded-md p-0.5 border border-white/20 text-[11px]">
              <div className="flex items-center px-1.5 text-pink-200">
                <Globe size={11} className="mr-1" />
                <span className="hidden sm:inline font-medium text-[10px] mr-1 uppercase">
                  {lang === 'en' ? 'Lang:' : 'ভাষা:'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLang('bn')}
                className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                  lang === 'bn'
                    ? 'bg-white text-[#AA0E53] shadow-xs'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                title="বাংলায় দেখুন"
              >
                বাংলা
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-white text-[#AA0E53] shadow-xs'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                title="View in English"
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Bar (#e2136e), One line */}
      <div className="bg-[#e2136e] text-white py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 lg:gap-4">
          {/* Logo on the left */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 rounded-[10px] bg-white text-[#e2136e] flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              <BookOpen size={20} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight leading-none text-white drop-shadow-xs">
                {siteConfig.logoText}
              </span>
              <span className="text-[10px] text-pink-100 tracking-wider font-medium">
                {lang === 'en' ? 'Digital Study Platform' : 'ডিজিটাল স্টাডি প্ল্যাটফর্ম'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Menu in the middle (Exact requested pages: Home, School, College, Teacher's Corner, Career & Exam, Job Circular, About Us) */}
          <nav className="hidden xl:flex items-center gap-1 text-[13px] font-semibold">
            {/* 1. Home */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-md transition-colors ${
                  isActive ? 'bg-[#c2105f] text-white' : 'text-pink-50 hover:bg-white/15'
                }`
              }
            >
              {t('navHome')}
            </NavLink>

            {/* 2. School Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleSchoolMouseEnter}
              onMouseLeave={handleSchoolMouseLeave}
            >
              <NavLink
                to="/school"
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                    isActive ? 'bg-[#c2105f] text-white' : 'text-pink-50 hover:bg-white/15'
                  }`
                }
              >
                <span>{t('navSchool')}</span>
                <ChevronDown size={14} />
              </NavLink>

              {schoolDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-[380px] bg-white text-[#0a0a0a] rounded-[12px] shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="grid grid-cols-2 gap-3 pb-2 border-b border-slate-100">
                    <div>
                      <div className="px-2 py-1 text-[11px] font-bold text-[#e2136e] uppercase tracking-wider">
                        {lang === 'en' ? 'Primary (Class 1-5)' : 'প্রাথমিক স্তর (১ম-৫ম)'}
                      </div>
                      <Link
                        to="/school/class-1"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors"
                      >
                        {lang === 'en' ? 'Class 1 (Grade 1)' : 'ক্লাস ১ (প্রথম শ্রেণি)'}
                      </Link>
                      <Link
                        to="/school/class-2"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors"
                      >
                        {lang === 'en' ? 'Class 2 (Grade 2)' : 'ক্লাস ২ (দ্বিতীয় শ্রেণি)'}
                      </Link>
                      <Link
                        to="/school/class-3"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors"
                      >
                        {lang === 'en' ? 'Class 3 (Grade 3)' : 'ক্লাস ৩ (তৃতীয় শ্রেণি)'}
                      </Link>
                      <Link
                        to="/school/class-4"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors"
                      >
                        {lang === 'en' ? 'Class 4 (Grade 4)' : 'ক্লাস ৪ (চতুর্থ শ্রেণি)'}
                      </Link>
                      <Link
                        to="/school/class-5"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors"
                      >
                        {lang === 'en' ? 'Class 5 (Scholarship)' : 'ক্লাস ৫ (বৃত্তি পরীক্ষা)'}
                      </Link>
                    </div>

                    <div>
                      <div className="px-2 py-1 text-[11px] font-bold text-[#0084a2] uppercase tracking-wider">
                        {lang === 'en' ? 'Secondary (Class 6-10)' : 'মাধ্যমিক স্তর (৬ষ্ঠ-১০ম)'}
                      </div>
                      <Link
                        to="/school/class-6"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-[#0084a2] rounded-md transition-colors"
                      >
                        {lang === 'en' ? 'Class 6 (Grade 6)' : 'ক্লাস ৬ (ষষ্ঠ শ্রেণি)'}
                      </Link>
                      <Link
                        to="/school/class-7"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-[#0084a2] rounded-md transition-colors"
                      >
                        {lang === 'en' ? 'Class 7 (Grade 7)' : 'ক্লাস ৭ (সপ্তম শ্রেণি)'}
                      </Link>
                      <Link
                        to="/school/class-8"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-[#0084a2] rounded-md transition-colors"
                      >
                        {lang === 'en' ? 'Class 8 (Grade 8)' : 'ক্লাস ৮ (অষ্টম শ্রেণি)'}
                      </Link>
                      <Link
                        to="/school/class-9"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-[#0084a2] rounded-md transition-colors"
                      >
                        {lang === 'en' ? 'Class 9 (Grade 9)' : 'ক্লাস ৯ (নবম শ্রেণি)'}
                      </Link>
                      <Link
                        to="/school/class-10"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-[#0084a2] rounded-md transition-colors"
                      >
                        {lang === 'en' ? 'Class 10 / SSC' : 'ক্লাস ১০ / এসএসসি'}
                      </Link>
                    </div>
                  </div>

                  <div className="mt-2 pt-1 text-center">
                    <Link
                      to="/school"
                      className="block py-1 text-xs font-bold text-[#e2136e] hover:underline"
                    >
                      {lang === 'en' ? 'View All School Classes & Resources →' : 'স্কুলের সকল শ্রেণির বই ও রিসোর্স দেখুন →'}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. College Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleCollegeMouseEnter}
              onMouseLeave={handleCollegeMouseLeave}
            >
              <NavLink
                to="/college"
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                    isActive ? 'bg-[#c2105f] text-white' : 'text-pink-50 hover:bg-white/15'
                  }`
                }
              >
                <span>{t('navCollege')}</span>
                <ChevronDown size={14} />
              </NavLink>

              {collegeDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white text-[#0a0a0a] rounded-[10px] shadow-xl border border-pink-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1 text-[11px] font-bold text-[#e2136e] uppercase tracking-wider border-b border-gray-100">
                    {lang === 'en' ? 'By Year' : 'বর্ষ অনুযায়ী'}
                  </div>
                  <Link
                    to="/college/hsc-1st-year"
                    className="block px-3 py-1.5 text-xs font-medium hover:bg-[#ffdeee] hover:text-[#e2136e] transition-colors"
                  >
                    {lang === 'en' ? 'HSC 1st Year (Class 11)' : 'HSC ১ম বর্ষ (একাদশ শ্রেণি)'}
                  </Link>
                  <Link
                    to="/college/hsc-2nd-year"
                    className="block px-3 py-1.5 text-xs font-medium hover:bg-[#ffdeee] hover:text-[#e2136e] transition-colors"
                  >
                    {lang === 'en' ? 'HSC 2nd Year (Class 12)' : 'HSC ২য় বর্ষ (দ্বাদশ শ্রেণি)'}
                  </Link>
                  <div className="mt-1 pt-1 border-t border-gray-100">
                    <Link
                      to="/college"
                      className="block px-3 py-1.5 text-xs font-bold text-[#e2136e] hover:bg-[#ffdeee]"
                    >
                      {lang === 'en' ? 'View All College Books →' : 'কলেজের সকল বই দেখুন →'}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 4. বিশেষ প্রস্তুতি কোর্সসমূহ Dropdown (Special Preparation Courses) */}
            <div
              className="relative"
              onMouseEnter={handleCoursesMouseEnter}
              onMouseLeave={handleCoursesMouseLeave}
            >
              <NavLink
                to="/special-courses"
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1.5 font-bold ${
                    isActive ? 'bg-[#c2105f] text-white shadow-xs' : 'text-pink-50 hover:bg-white/15'
                  }`
                }
              >
                <Award size={14} className="text-yellow-300" />
                <span>{t('navSpecialCourses')}</span>
                <ChevronDown size={14} />
              </NavLink>

              {coursesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white text-[#0a0a0a] rounded-[12px] shadow-2xl border border-pink-100 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1 text-[11px] font-bold text-[#e2136e] uppercase tracking-wider border-b border-gray-100 flex items-center justify-between">
                    <span>{lang === 'en' ? 'Scholarship & Exam Batches' : 'বৃত্তি ও বোর্ড প্রস্তুতি ব্যাচ'}</span>
                    <Sparkles size={12} className="text-[#f9902e]" />
                  </div>

                  <div className="mt-1 space-y-0.5">
                    {/* Submenu 1: প্রাথমিক বৃত্তি পরীক্ষা */}
                    <Link
                      to="/special-courses/primary-scholarship"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-pink-50 hover:text-[#e2136e] rounded-lg transition-colors group"
                    >
                      <span className="w-2 h-2 rounded-full bg-pink-500 group-hover:scale-125 transition-transform" />
                      <div className="flex flex-col">
                        <span>{t('coursePrimary')}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {lang === 'en' ? 'Class 5 Talentpool Prep' : '৫ম শ্রেণি ট্যালেন্টপুল ব্যাচ'}
                        </span>
                      </div>
                    </Link>

                    {/* Submenu 2: জুনিয়র বৃত্তি পরীক্ষা */}
                    <Link
                      to="/special-courses/junior-scholarship"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-pink-50 hover:text-[#e2136e] rounded-lg transition-colors group"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#0084a2] group-hover:scale-125 transition-transform" />
                      <div className="flex flex-col">
                        <span>{t('courseJunior')}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {lang === 'en' ? 'Class 8 Merit Scholarship' : '৮ম শ্রেণি মেধাবৃত্তি প্রস্তুতি'}
                        </span>
                      </div>
                    </Link>

                    {/* Submenu 3: SSC প্রস্তুতি কোর্স */}
                    <Link
                      to="/special-courses/ssc-prep"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-pink-50 hover:text-[#e2136e] rounded-lg transition-colors group"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#e2136e] group-hover:scale-125 transition-transform" />
                      <div className="flex flex-col">
                        <span>{t('courseSSC')}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {lang === 'en' ? 'SSC Complete Board A+ Batch' : 'এসএসসি বোর্ড স্পেশাল রিভিশন'}
                        </span>
                      </div>
                    </Link>

                    {/* Submenu 4: HSC প্রস্তুতি কোর্স */}
                    <Link
                      to="/special-courses/hsc-prep"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-pink-50 hover:text-[#e2136e] rounded-lg transition-colors group"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#f9902e] group-hover:scale-125 transition-transform" />
                      <div className="flex flex-col">
                        <span>{t('courseHSC')}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {lang === 'en' ? 'HSC Science & Admission Base' : 'বিজ্ঞান বিভাগ ও এডমিশন বুস্টিং'}
                        </span>
                      </div>
                    </Link>
                  </div>

                  <div className="mt-2 pt-2 border-t border-gray-100 text-center">
                    <Link
                      to="/special-courses"
                      className="block py-1 text-xs font-bold text-[#e2136e] hover:underline"
                    >
                      {t('viewAllCourses')}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Teacher's Corner */}
            <NavLink
              to="/teachers-corner"
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                  isActive ? 'bg-[#c2105f] text-white' : 'text-pink-50 hover:bg-white/15'
                }`
              }
            >
              <GraduationCap size={14} />
              <span>{t('navTeachersCorner')}</span>
            </NavLink>

            {/* 6. Career & Exam */}
            <NavLink
              to="/career-and-exam"
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                  isActive ? 'bg-[#c2105f] text-white' : 'text-pink-50 hover:bg-white/15'
                }`
              }
            >
              <Briefcase size={14} />
              <span>{t('navCareerExam')}</span>
            </NavLink>

            {/* 7. Job Circular */}
            <NavLink
              to="/job-circular"
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                  isActive ? 'bg-[#c2105f] text-white' : 'text-pink-50 hover:bg-white/15'
                }`
              }
            >
              <FileText size={14} />
              <span>{t('navJobCircular')}</span>
            </NavLink>

            {/* 8. About Us */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-md transition-colors ${
                  isActive ? 'bg-[#c2105f] text-white' : 'text-pink-50 hover:bg-white/15'
                }`
              }
            >
              {t('navAboutUs')}
            </NavLink>
          </nav>

          {/* Right Action: Free Sample Button & Account (Wishlist & Cart REMOVED as requested) */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Free sample button */}
            <Link
              to="/free-sample"
              className="hidden md:flex items-center gap-1 bg-[#f9902e] hover:bg-[#f88114] text-[#0a0a0a] text-xs font-bold px-3 py-1.5 rounded-[10px] transition-all shadow-xs mr-1"
            >
              <Gift size={14} />
              <span>{t('freeSample')}</span>
            </Link>

            <div className="hidden sm:block h-6 w-px bg-white/20 mx-1" />

            {/* Account / Login */}
            <Link
              to="/my-account"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-medium"
              title={lang === 'en' ? 'My Account' : 'আমার একাউন্ট'}
            >
              <User size={16} />
              <span>{currentUser ? (lang === 'en' ? 'Account' : 'একাউন্ট') : (lang === 'en' ? 'Login' : 'লগইন')}</span>
            </Link>

            {/* Mobile Hamburger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden ml-1 p-2 rounded-md hover:bg-white/15 text-white transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? (lang === 'en' ? 'Close menu' : 'মেনু বন্ধ করুন') : (lang === 'en' ? 'Open menu' : 'মেনু খুলুন')}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay & Nav */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white text-[#0a0a0a] border-b border-[#e5e5e5] px-4 py-4 shadow-2xl animate-in slide-in-from-top duration-200">
          {/* Mobile Search Bar */}
          <form onSubmit={handleMobileSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder={lang === 'en' ? 'Search products or subjects...' : 'প্রোডাক্ট বা বিষয় খুঁজুন...'}
                value={mobileSearchQuery}
                onChange={e => setMobileSearchQuery(e.target.value)}
                className="w-full bg-[#f5f5f5] text-sm pl-9 pr-20 py-2.5 rounded-[10px] border border-[#e5e5e5] focus:outline-none focus:border-[#e2136e]"
              />
              <Search size={16} className="absolute left-3 top-3 text-gray-400" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bg-[#e2136e] text-white text-xs font-bold px-3 py-1.5 rounded-[8px]"
              >
                {lang === 'en' ? 'Search' : 'খুঁজুন'}
              </button>
            </div>
          </form>

          {/* Mobile Links */}
          <div className="flex flex-col gap-1 text-sm font-semibold divide-y divide-gray-100">
            {/* 1. Home */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-[#ffdeee] hover:text-[#e2136e] rounded-md"
            >
              {t('navHome')}
            </Link>

            {/* 2. School */}
            <div className="py-2">
              <div className="flex items-center justify-between px-2 text-xs text-gray-500 font-bold uppercase">
                <span>{lang === 'en' ? 'School (Class 1–10)' : 'স্কুল (১ম–১০ম শ্রেণি)'}</span>
                <Link
                  to="/school"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#e2136e] font-bold"
                >
                  {lang === 'en' ? 'All Books →' : 'সকল বই →'}
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mt-1.5">
                <Link
                  to="/school/class-1"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center"
                >
                  {lang === 'en' ? 'Class 1' : 'ক্লাস ১'}
                </Link>
                <Link
                  to="/school/class-2"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center"
                >
                  {lang === 'en' ? 'Class 2' : 'ক্লাস ২'}
                </Link>
                <Link
                  to="/school/class-3"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center"
                >
                  {lang === 'en' ? 'Class 3' : 'ক্লাস ৩'}
                </Link>
                <Link
                  to="/school/class-4"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center"
                >
                  {lang === 'en' ? 'Class 4' : 'ক্লাস ৪'}
                </Link>
                <Link
                  to="/school/class-5"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center font-medium"
                >
                  {lang === 'en' ? 'Class 5 (Scholarship)' : 'ক্লাস ৫ (বৃত্তি)'}
                </Link>
                <Link
                  to="/school/class-6"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center"
                >
                  {lang === 'en' ? 'Class 6' : 'ক্লাস ৬'}
                </Link>
                <Link
                  to="/school/class-7"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center"
                >
                  {lang === 'en' ? 'Class 7' : 'ক্লাস ৭'}
                </Link>
                <Link
                  to="/school/class-8"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center"
                >
                  {lang === 'en' ? 'Class 8' : 'ক্লাস ৮'}
                </Link>
                <Link
                  to="/school/class-9"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center"
                >
                  {lang === 'en' ? 'Class 9' : 'ক্লাস ৯'}
                </Link>
                <Link
                  to="/school/class-10"
                  onClick={() => setMobileMenuOpen(false)}
                  className="col-span-2 sm:col-span-3 py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center font-bold"
                >
                  {lang === 'en' ? 'Class 10 / SSC' : 'ক্লাস ১০ / এসএসসি'}
                </Link>
              </div>
            </div>

            {/* 3. College */}
            <div className="py-2">
              <div className="flex items-center justify-between px-2 text-xs text-gray-500 font-bold uppercase">
                <span>{lang === 'en' ? 'College (HSC)' : 'কলেজ (HSC)'}</span>
                <Link
                  to="/college"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#e2136e] font-bold"
                >
                  {lang === 'en' ? 'All Books →' : 'সকল বই →'}
                </Link>
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <Link
                  to="/college/hsc-1st-year"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 px-3 text-xs text-gray-700 hover:text-[#e2136e]"
                >
                  {lang === 'en' ? 'HSC 1st Year (Class 11)' : 'HSC ১ম বর্ষ (একাদশ শ্রেণি)'}
                </Link>
                <Link
                  to="/college/hsc-2nd-year"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 px-3 text-xs text-gray-700 hover:text-[#e2136e]"
                >
                  {lang === 'en' ? 'HSC 2nd Year (Class 12)' : 'HSC ২য় বর্ষ (দ্বাদশ শ্রেণি)'}
                </Link>
              </div>
            </div>

            {/* 4. বিশেষ প্রস্তুতি কোর্সসমূহ (Special Preparation Courses) */}
            <div className="py-2 bg-pink-50/60 rounded-[10px] p-2 border border-pink-100">
              <div className="flex items-center justify-between px-1 text-xs font-bold text-[#e2136e]">
                <div className="flex items-center gap-1.5">
                  <Award size={14} className="text-[#e2136e]" />
                  <span>{t('navSpecialCourses')}</span>
                </div>
                <Link
                  to="/special-courses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[11px] font-bold text-[#e2136e] underline"
                >
                  {lang === 'en' ? 'All Courses →' : 'সকল কোর্স →'}
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-2">
                <Link
                  to="/special-courses/primary-scholarship"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-800 bg-white hover:bg-pink-100 hover:text-[#e2136e] rounded-md transition-colors border border-pink-100 font-medium flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                  <span>{t('coursePrimary')}</span>
                </Link>

                <Link
                  to="/special-courses/junior-scholarship"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-800 bg-white hover:bg-sky-50 hover:text-[#0084a2] rounded-md transition-colors border border-pink-100 font-medium flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0084a2]" />
                  <span>{t('courseJunior')}</span>
                </Link>

                <Link
                  to="/special-courses/ssc-prep"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-800 bg-white hover:bg-pink-100 hover:text-[#e2136e] rounded-md transition-colors border border-pink-100 font-medium flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e2136e]" />
                  <span>{t('courseSSC')}</span>
                </Link>

                <Link
                  to="/special-courses/hsc-prep"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-800 bg-white hover:bg-amber-50 hover:text-[#f9902e] rounded-md transition-colors border border-pink-100 font-medium flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f9902e]" />
                  <span>{t('courseHSC')}</span>
                </Link>
              </div>
            </div>

            {/* 5. Teacher's Corner */}
            <Link
              to="/teachers-corner"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-[#ffdeee] hover:text-[#e2136e] rounded-md flex items-center gap-2"
            >
              <GraduationCap size={16} className="text-[#0084a2]" />
              <span>{t('navTeachersCorner')}</span>
            </Link>

            {/* 6. Career & Exam */}
            <Link
              to="/career-and-exam"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-[#ffdeee] hover:text-[#e2136e] rounded-md flex items-center gap-2"
            >
              <Briefcase size={16} className="text-[#f9902e]" />
              <span>{t('navCareerExam')}</span>
            </Link>

            {/* 7. Job Circular */}
            <Link
              to="/job-circular"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-[#ffdeee] hover:text-[#e2136e] rounded-md flex items-center gap-2"
            >
              <FileText size={16} className="text-[#00a544]" />
              <span>{t('navJobCircular')}</span>
            </Link>

            {/* 8. About Us */}
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-[#ffdeee] hover:text-[#e2136e] rounded-md"
            >
              {t('navAboutUs')}
            </Link>

            {/* Mobile Language Switcher Row */}
            <div className="py-2.5 px-2 flex items-center justify-between bg-slate-50 rounded-lg border border-slate-200 mt-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Globe size={14} className="text-[#e2136e]" />
                <span>{lang === 'en' ? 'Select Language:' : 'ভাষা নির্বাচন করুন:'}</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setLang('bn')}
                  className={`text-xs font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    lang === 'bn'
                      ? 'bg-[#e2136e] text-white'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  বাংলা
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`text-xs font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    lang === 'en'
                      ? 'bg-[#e2136e] text-white'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            {/* Additional helpful links */}
            <Link
              to="/free-sample"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 text-[#f9902e] font-bold hover:bg-[#fef4ea] rounded-md flex items-center gap-2"
            >
              <Gift size={16} />
              <span>{t('downloadFreeSample')}</span>
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 text-gray-600 hover:text-[#e2136e] rounded-md text-xs"
            >
              {lang === 'en' ? 'Support & Contact' : 'সাপোর্ট ও যোগাযোগ'}
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Fixed Bottom Navigation Bar (No Cart, No Wishlist) */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e5e5e5] px-2 py-2 flex items-center justify-around shadow-lg">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
              isActive ? 'text-[#e2136e]' : 'text-[#626262]'
            }`
          }
        >
          <BookOpen size={18} />
          <span>{t('navHome')}</span>
        </NavLink>

        <NavLink
          to="/school"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
              isActive ? 'text-[#e2136e]' : 'text-[#626262]'
            }`
          }
        >
          <BookOpen size={18} />
          <span>{t('navSchool')}</span>
        </NavLink>

        <NavLink
          to="/college"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
              isActive ? 'text-[#e2136e]' : 'text-[#626262]'
            }`
          }
        >
          <GraduationCap size={18} />
          <span>{t('navCollege')}</span>
        </NavLink>

        <NavLink
          to="/special-courses"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
              isActive ? 'text-[#e2136e]' : 'text-[#626262]'
            }`
          }
        >
          <Award size={18} />
          <span>{lang === 'en' ? 'Courses' : 'কোর্সসমূহ'}</span>
        </NavLink>

        <NavLink
          to="/teachers-corner"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
              isActive ? 'text-[#e2136e]' : 'text-[#626262]'
            }`
          }
        >
          <FileText size={18} />
          <span>{lang === 'en' ? 'Teachers' : 'টিচার্স কর্নার'}</span>
        </NavLink>
      </div>
    </header>
  );
};
