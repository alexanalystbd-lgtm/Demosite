import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Award,
  BookOpen,
  GraduationCap,
  Sparkles,
  CheckCircle,
  Calendar,
  Clock,
  Video,
  FileText,
  Users,
  Download,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import { specialCoursesList, SpecialCourse } from '../data/specialCourses';
import { useLanguage } from '../context/LanguageContext';
import { useShop } from '../context/ShopContext';
import { siteConfig } from '../config';

export const SpecialCoursesPage: React.FC = () => {
  const { courseSlug } = useParams<{ courseSlug?: string }>();
  const { lang, t, toLocalizedNumber, formatPrice } = useLanguage();
  const { showToast } = useShop();

  const [enrollingCourse, setEnrollingCourse] = useState<SpecialCourse | null>(null);
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  // If a specific course is selected via slug
  const activeCourse = courseSlug
    ? specialCoursesList.find(c => c.slug === courseSlug)
    : null;

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentPhone) return;

    setEnrollSuccess(true);
    const successMsg =
      lang === 'en'
        ? `Congratulations ${studentName}! Your enrollment request for "${activeCourse ? activeCourse.titleEn : enrollingCourse?.titleEn}" has been received. Our team will contact you shortly.`
        : `অভিনন্দন ${studentName}! "${activeCourse ? activeCourse.titleBn : enrollingCourse?.titleBn}" কোর্সে আপনার ভর্তির আবেদন সফল হয়েছে। কিছুক্ষণের মধ্যে আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।`;

    showToast(successMsg, 'success');

    setTimeout(() => {
      setEnrollingCourse(null);
      setEnrollSuccess(false);
      setStudentName('');
      setStudentPhone('');
      setStudentEmail('');
    }, 2500);
  };

  const handleDownloadSample = (course: SpecialCourse) => {
    const title = lang === 'en' ? course.titleEn : course.titleBn;
    const content = `=====================================================
${title} - FREE DEMO STUDY PACK
Platform: ${siteConfig.siteName}
Website: ${window.location.origin}
Hotline: ${siteConfig.contact.phone}
=====================================================

Welcome to the Special Preparation Course Demo Pack!
Target: ${lang === 'en' ? course.targetEn : course.targetBn}
Schedule: ${lang === 'en' ? course.scheduleEn : course.scheduleBn}
Duration: ${lang === 'en' ? course.durationEn : course.durationBn}

Included Demo Materials:
1. Key Formula & Conceptual Mindmap (Color PDF)
2. 5 Sets of High-Yield Creative Model Questions
3. Answer Explanations with Examiner Marking Scheme
4. Time Allocation & OMR Scoring Tactics

To access full live classes, recordings & regular mock tests, enroll in the full course.
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${course.slug}-demo-pack.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(
      lang === 'en'
        ? `Free demo pack for "${course.titleEn}" downloaded!`
        : `"${course.titleBn}"-এর ফ্রি ডেমো প্যাক ডাউনলোড শুরু হয়েছে!`,
      'success'
    );
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 max-w-7xl mx-auto w-full">
      <Helmet>
        <title>
          {activeCourse
            ? `${lang === 'en' ? activeCourse.titleEn : activeCourse.titleBn} — ${siteConfig.siteName}`
            : `${lang === 'en' ? 'Special Preparation Courses' : 'বিশেষ প্রস্তুতি কোর্সসমূহ'} — ${siteConfig.siteName}`}
        </title>
        <meta
          name="description"
          content={
            lang === 'en'
              ? 'Primary Scholarship, Junior Scholarship, SSC and HSC Special Preparation Courses with live mentorship, model tests and digital study resources.'
              : 'প্রাথমিক বৃত্তি পরীক্ষা, জুনিয়র বৃত্তি পরীক্ষা, এসএসসি ও এইচএসসি বিশেষ প্রস্তুতি কোর্সসমূহ। পূর্ণাঙ্গ সিলেবাস, মডেল টেস্ট ও এক্সক্লুসিভ নোটস।'
          }
        />
      </Helmet>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
        <Link to="/" className="hover:text-[#e2136e]">
          {t('navHome')}
        </Link>
        <span>/</span>
        <Link to="/special-courses" className={`hover:text-[#e2136e] ${!activeCourse ? 'font-bold text-slate-800' : ''}`}>
          {t('navSpecialCourses')}
        </Link>
        {activeCourse && (
          <>
            <span>/</span>
            <span className="font-bold text-[#e2136e] truncate max-w-xs sm:max-w-md">
              {lang === 'en' ? activeCourse.titleEn : activeCourse.titleBn}
            </span>
          </>
        )}
      </nav>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#AA0E53] via-[#e2136e] to-[#B80F5E] text-white rounded-[16px] p-6 sm:p-10 shadow-lg mb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide text-yellow-200 mb-3 border border-white/25">
            <Sparkles size={14} className="shrink-0" />
            <span>
              {lang === 'en'
                ? 'Targeted Academic Excellence & Scholarship Programs'
                : 'মেধা বৃত্তি ও বোর্ড পরীক্ষায় সর্বোচ্চ ফলাফলের বিশেষায়িত একাডেমি'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            {activeCourse
              ? lang === 'en'
                ? activeCourse.titleEn
                : activeCourse.titleBn
              : lang === 'en'
              ? 'Special Preparation Courses'
              : 'বিশেষ প্রস্তুতি কোর্সসমূহ'}
          </h1>
          <p className="text-pink-100 text-xs sm:text-sm md:text-base leading-relaxed mb-6">
            {activeCourse
              ? lang === 'en'
                ? activeCourse.subtitleEn
                : activeCourse.subtitleBn
              : lang === 'en'
              ? 'Specialized programs designed for Primary Scholarship, Junior Scholarship, SSC and HSC candidates with comprehensive syllabus coverage, formula cheat sheets, and board-standard OMR model test series.'
              : 'প্রাথমিক বৃত্তি, জুনিয়র বৃত্তি, এসএসসি ও এইচএসসি পরীক্ষার্থীদের জন্য বিশেষভাবে ডিজাইনকৃত কোর্সসমূহ। অধ্যায়ভিত্তিক কনসেপ্ট, দ্রুত সমাধান হ্যাকস ও বোর্ড স্ট্যান্ডার্ড ওএমআর মডেল টেস্ট।'}
          </p>

          <div className="flex flex-wrap gap-2.5 sm:gap-4 text-xs">
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
              <CheckCircle size={14} className="text-yellow-300" />
              <span>{lang === 'en' ? 'Experienced Examiners & Mentors' : 'অভিজ্ঞ প্রধান পরীক্ষক ও মেন্টর প্যানেল'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
              <FileText size={14} className="text-yellow-300" />
              <span>{lang === 'en' ? 'Full Digital Notes & Formula Packs' : 'প্রিন্টযোগ্য ডিজিটাল নোটস ও ফর্মুলা প্যাক'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
              <Award size={14} className="text-yellow-300" />
              <span>{lang === 'en' ? 'Real Board Standard Model Tests' : '১০০% রিয়াল বোর্ড স্ট্যান্ডার্ড টেস্ট পেপার্স'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {activeCourse ? (
        /* SINGLE COURSE DETAIL VIEW */
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Details & Modules */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview Box */}
              <div className="bg-white rounded-[14px] p-6 sm:p-8 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-pink-50 text-[#e2136e] text-xs font-bold px-3 py-1 rounded-full border border-pink-100">
                    {lang === 'en' ? activeCourse.badgeEn : activeCourse.badgeBn}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {lang === 'en' ? activeCourse.targetEn : activeCourse.targetBn}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                  {lang === 'en' ? 'Course Details & Overview' : 'কোর্সের বিবরণ ও লক্ষ্য'}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {lang === 'en' ? activeCourse.descriptionEn : activeCourse.descriptionBn}
                </p>

                {/* Key Features */}
                <h3 className="text-base font-bold text-slate-900 mb-3">
                  {lang === 'en' ? 'What You Will Get:' : 'এই কোর্সে যা যা থাকছে:'}
                </h3>
                <div className="space-y-2.5">
                  {(lang === 'en' ? activeCourse.featuresEn : activeCourse.featuresBn).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle size={14} />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-800 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Curriculum & Modules */}
              <div className="bg-white rounded-[14px] p-6 sm:p-8 border border-slate-200 shadow-xs">
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  {lang === 'en' ? 'Detailed Syllabus & Study Modules' : 'পূর্ণাঙ্গ সিলেবাস ও মডিউলসমূহ'}
                </h2>
                <p className="text-xs text-slate-500 mb-6">
                  {lang === 'en'
                    ? 'Structured week-by-week curriculum with comprehensive topic breakdown.'
                    : 'পর্যায়ক্রমিক ক্লাস ও অধ্যায়ভিত্তিক পাঠ্যসূচির সম্পূর্ণ বিন্যাস।'}
                </p>

                <div className="space-y-4">
                  {activeCourse.modules.map((mod, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 rounded-[12px] p-4 sm:p-5 border border-slate-200"
                    >
                      <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-pink-100 text-[#e2136e] flex items-center justify-center text-xs font-bold">
                          {toLocalizedNumber(idx + 1)}
                        </span>
                        <span>{lang === 'en' ? mod.moduleTitleEn : mod.moduleTitleBn}</span>
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-200">
                        {(lang === 'en' ? mod.topicsEn : mod.topicsBn).map((top, tIdx) => (
                          <span
                            key={tIdx}
                            className="bg-white text-slate-700 text-xs px-2.5 py-1 rounded-md border border-slate-200"
                          >
                            ✓ {top}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentors Card */}
              <div className="bg-white rounded-[14px] p-6 border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-pink-50 text-[#e2136e] flex items-center justify-center font-bold text-xl shrink-0 border border-pink-200">
                  <GraduationCap size={28} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#e2136e] uppercase tracking-wider">
                    {lang === 'en' ? 'Course Mentor' : 'কোর্স মেন্টর প্যানেল'}
                  </span>
                  <h4 className="font-bold text-base text-slate-900 mt-0.5">
                    {lang === 'en' ? activeCourse.mentorNameEn : activeCourse.mentorNameBn}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {lang === 'en' ? activeCourse.mentorTitleEn : activeCourse.mentorTitleBn}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Col: Price Card & Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-[14px] p-6 border border-slate-200 shadow-sm sticky top-24">
                <div className="pb-4 border-b border-slate-100 mb-4">
                  <span className="text-xs text-slate-500 block mb-1">
                    {lang === 'en' ? 'Course Enrollment Fee:' : 'কোর্স ফি:'}
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-[#e2136e]">
                      {formatPrice(activeCourse.price)}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      {formatPrice(activeCourse.originalPrice)}
                    </span>
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                      {toLocalizedNumber(Math.round(((activeCourse.originalPrice - activeCourse.price) / activeCourse.originalPrice) * 100))}% {lang === 'en' ? 'OFF' : 'ছাড়'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-700 mb-6">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Clock size={14} />
                      {lang === 'en' ? 'Duration:' : 'মেয়াদকাল:'}
                    </span>
                    <span className="font-bold text-slate-800">
                      {lang === 'en' ? activeCourse.durationEn : activeCourse.durationBn}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Video size={14} />
                      {lang === 'en' ? 'Total Classes:' : 'মোট ক্লাস:'}
                    </span>
                    <span className="font-bold text-slate-800">
                      {toLocalizedNumber(activeCourse.totalLectures)} {lang === 'en' ? 'Lectures' : 'টি ক্লাস'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Award size={14} />
                      {lang === 'en' ? 'Mock Tests:' : 'মডেল টেস্ট:'}
                    </span>
                    <span className="font-bold text-slate-800">
                      {toLocalizedNumber(activeCourse.totalMockTests)} {lang === 'en' ? 'Sets' : 'সেট'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Calendar size={14} />
                      {lang === 'en' ? 'Schedule:' : 'ক্লাসের সময়:'}
                    </span>
                    <span className="font-bold text-slate-800 text-right">
                      {lang === 'en' ? activeCourse.scheduleEn : activeCourse.scheduleBn}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setEnrollingCourse(activeCourse)}
                    className="w-full bg-[#e2136e] hover:bg-[#c2105f] text-white font-bold text-sm py-3 px-4 rounded-[10px] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Zap size={16} />
                    <span>{t('enrollNow')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadSample(activeCourse)}
                    className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold text-xs py-2.5 px-4 rounded-[10px] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>{lang === 'en' ? 'Download Free Demo Pack' : 'ফ্রি ডেমো ম্যাটেরিয়াল ডাউনলোড'}</span>
                  </button>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                  <span>{lang === 'en' ? '100% Quality Assurance & Lifetime Resources' : '১০০% মানসম্পন্ন নোটস ও আজীবন ফাইল এক্সেস'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ALL 4 COURSES CATALOG GRID */
        <div className="space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-slate-600 font-bold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              {lang === 'en' ? 'All 4 Featured Programs' : '৪টি বিশেষায়িত কোর্স'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {lang === 'en' ? 'Select Your Preparation Course' : 'আপনার প্রয়োজনীয় প্রস্তুতি কোর্সটি বেছে নিন'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === 'en'
                ? 'Structured curriculum, syllabus analysis, and dedicated mentorship for scholarship and board exams.'
                : 'প্রতিটি কোর্সে রয়েছে স্বনামধন্য শিক্ষকদের ক্লাস, অধ্যায়ভিত্তিক রঙিন হ্যান্ডনোট ও পূর্ণাঙ্গ মডেল টেস্ট।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialCoursesList.map((course, idx) => (
              <div
                key={course.id}
                className="bg-white rounded-[14px] p-6 sm:p-7 border border-slate-200 hover:border-[#e2136e] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-[#e2136e] bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                      {lang === 'en' ? course.badgeEn : course.badgeBn}
                    </span>
                    <span className="text-xs font-black text-[#e2136e]">
                      {formatPrice(course.price)}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#e2136e] transition-colors mb-2">
                    {lang === 'en' ? course.titleEn : course.titleBn}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {lang === 'en' ? course.subtitleEn : course.subtitleBn}
                  </p>

                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-[10px] border border-slate-100 text-center mb-5 text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{toLocalizedNumber(course.totalLectures)}</span>
                      <span className="text-[10px] text-slate-500">{lang === 'en' ? 'Classes' : 'ক্লাস'}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">{toLocalizedNumber(course.totalMockTests)}</span>
                      <span className="text-[10px] text-slate-500">{lang === 'en' ? 'Tests' : 'টেস্ট'}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">{toLocalizedNumber(course.totalNotes)}</span>
                      <span className="text-[10px] text-slate-500">{lang === 'en' ? 'Notes' : 'নোটস'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleDownloadSample(course)}
                    className="text-xs font-bold text-slate-600 hover:text-[#e2136e] flex items-center gap-1 cursor-pointer"
                  >
                    <Download size={13} />
                    <span>{lang === 'en' ? 'Free Demo' : 'ফ্রি ডেমো'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/special-courses/${course.slug}`}
                      className="bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold px-3 py-2 rounded-[8px] border border-slate-200 transition-colors"
                    >
                      {lang === 'en' ? 'Details' : 'বিস্তারিত'}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setEnrollingCourse(course)}
                      className="bg-[#e2136e] hover:bg-[#c2105f] text-white text-xs font-bold px-4 py-2 rounded-[8px] transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                    >
                      <span>{t('enrollNow')}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ENROLLMENT MODAL */}
      {enrollingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-[16px] max-w-md w-full p-6 sm:p-7 shadow-2xl relative border border-slate-200">
            <button
              type="button"
              onClick={() => setEnrollingCourse(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 font-bold text-lg cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-5">
              <span className="text-[10px] font-bold text-[#e2136e] bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                {lang === 'en' ? 'Quick Enrollment' : 'দ্রুত কোর্স ভর্তি'}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                {lang === 'en' ? enrollingCourse.titleEn : enrollingCourse.titleBn}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'en' ? 'Course Fee:' : 'কোর্স ফি:'} <strong>{formatPrice(enrollingCourse.price)}</strong>
              </p>
            </div>

            {enrollSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-[12px] text-center space-y-2">
                <CheckCircle size={36} className="text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm text-slate-900">
                  {lang === 'en' ? 'Application Submitted Successfully!' : 'ভর্তির আবেদন সফলভাবে গৃহীত হয়েছে!'}
                </h4>
                <p className="text-xs text-slate-600">
                  {lang === 'en'
                    ? 'Our counselor will contact you via phone/WhatsApp with your class access details.'
                    : 'আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে ক্লাসের লিংক ও এক্সেস নিয়ে যোগাযোগ করবেন।'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnrollSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'en' ? 'Student Name *' : 'শিক্ষার্থীর নাম *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    placeholder={lang === 'en' ? 'e.g. Tanvir Ahmed' : 'যেমন: তানভীর আহমেদ'}
                    className="w-full text-xs sm:text-sm p-2.5 rounded-[8px] border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#e2136e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'en' ? 'Mobile / WhatsApp Number *' : 'মোবাইল বা হোয়াটসঅ্যাপ নম্বর *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={studentPhone}
                    onChange={e => setStudentPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full text-xs sm:text-sm p-2.5 rounded-[8px] border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#e2136e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'en' ? 'Email Address (Optional)' : 'ইমেইল ঠিকানা (ঐচ্ছিক)'}
                  </label>
                  <input
                    type="email"
                    value={studentEmail}
                    onChange={e => setStudentEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full text-xs sm:text-sm p-2.5 rounded-[8px] border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#e2136e]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#e2136e] hover:bg-[#c2105f] text-white font-bold text-xs sm:text-sm py-3 rounded-[10px] transition-all shadow-sm cursor-pointer mt-2"
                >
                  {lang === 'en' ? 'Confirm Course Admission' : 'ভর্তি নিশ্চিত করুন'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
