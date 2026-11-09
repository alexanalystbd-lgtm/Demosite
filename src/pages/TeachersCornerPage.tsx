import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  GraduationCap,
  Download,
  FileText,
  Search,
  CheckCircle,
  Filter,
  Sparkles,
  BookOpen,
  Award,
  Users,
  Presentation,
  Check
} from 'lucide-react';
import { sampleTeacherResources, TeacherResource } from '../data/teachersCorner';
import { siteConfig } from '../config';
import { toBengaliNumber } from '../utils/shopLogic';
import { useShop } from '../context/ShopContext';

export const TeachersCornerPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewItem, setPreviewItem] = useState<TeacherResource | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const { showToast } = useShop();

  const categories = [
    { id: 'all', label: 'সকল শিক্ষক রিসোর্স' },
    { id: 'lesson-plan', label: 'পাঠ পরিকল্পনা (Lesson Plan)' },
    { id: 'question-bank', label: 'সৃজনশীল প্রশ্ন ব্যাংক' },
    { id: 'assessment', label: 'ধারাবাহিক মূল্যায়ন শিট' },
    { id: 'slides', label: 'মাল্টিমিডিয়া স্লাইডস' },
    { id: 'guideline', label: 'শিক্ষক সহায়ক গাইড' },
  ];

  const filteredResources = sampleTeacherResources.filter(res => {
    const matchesCategory = selectedCategory === 'all' || res.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.classLevel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (res: TeacherResource) => {
    // Generate sample PDF document download
    const content = `%PDF-1.4
% Teacher's Corner Resource: ${res.title}
% Category: ${res.categoryLabel} | Class: ${res.classLevel}
% Provided by ${siteConfig.siteName}
1 0 obj << /Title (${res.title}) /Author (${siteConfig.siteName}) >> endobj
trailer << /Root 1 0 R >>
%%EOF`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${res.id}-${res.category}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(res.id);
    showToast(`"${res.title}" ডাউনলোড শুরু হয়েছে!`, 'success');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      <Helmet>
        <title>শিক্ষক কর্নার (Teacher's Corner) — {siteConfig.siteName}</title>
        <meta
          name="description"
          content="বাংলাদেশি শিক্ষকদের জন্য পূর্ণাঙ্গ পাঠ পরিকল্পনা (Lesson Plans), সৃজনশীল প্রশ্ন ব্যাংক, ধারাবাহিক মূল্যায়ন শিট ও মাল্টিমিডিয়া ক্লাসরুম প্রেজেন্টেশন।"
        />
      </Helmet>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#AA0E53] via-[#e2136e] to-[#B80F5E] text-white rounded-[16px] p-6 sm:p-10 shadow-lg mb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-yellow-200 mb-3 border border-white/25">
            <Sparkles size={14} />
            <span>শিক্ষকদের জন্য বিশেষায়িত ডিজিটাল রিসোর্স হাব</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            টিচার্স কর্নার (Teacher's Corner)
          </h1>
          <p className="text-pink-100 text-sm sm:text-base leading-relaxed mb-6">
            শ্রেণিকক্ষে পাঠদানকে আরও সহজ, আকর্ষণীয় ও আধুনিক করতে শিক্ষকদের জন্য প্রস্তুতকৃত
            পাঠ পরিকল্পনা, প্রমিত প্রশ্ন ব্যাংক, ধারাবাহিক মূল্যায়ন ছক ও পাওয়ারপয়েন্ট স্লাইডস।
          </p>

          <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
              <CheckCircle size={15} className="text-yellow-300" />
              <span>NCTB কারিকুলাম ও মূল্যায়ন নির্দেশিকা ভিত্তিক</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
              <FileText size={15} className="text-yellow-300" />
              <span>এডিটেবল ওয়ার্ড (DOCX) ও প্রিন্ট ফ্রেন্ডলি PDF</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
              <Download size={15} className="text-yellow-300" />
              <span>১০০% সরাসরি ডাউনলোডযোগ্য ফাইল</span>
            </div>
          </div>
        </div>

        {/* Decorative corner icon */}
        <div className="absolute right-4 -bottom-6 text-white/10 hidden md:block pointer-events-none">
          <GraduationCap size={220} />
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="bg-white rounded-[10px] p-4 sm:p-5 border border-[#e5e5e5] shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="বিষয়, শ্রেণি বা টপিক দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#f5f5f5] text-sm pl-9 pr-4 py-2.5 rounded-[10px] border border-[#e5e5e5] focus:outline-none focus:border-[#e2136e]"
            />
            <Search size={16} className="absolute left-3 top-3.5 text-gray-400" />
          </div>

          {/* Quick stats indicator */}
          <div className="text-xs text-[#626262] font-medium flex items-center gap-2">
            <Filter size={14} className="text-[#e2136e]" />
            <span>মোট {toBengaliNumber(filteredResources.length)} টি শিক্ষক রিসোর্স প্রদর্শিত</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#e2136e] text-white shadow-xs'
                  : 'bg-gray-100 text-[#0a0a0a] hover:bg-pink-100 hover:text-[#e2136e]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(res => (
          <div
            key={res.id}
            className="bg-white rounded-[10px] border border-[#e5e5e5] hover:border-[#f6b8d3] hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
          >
            <div className="p-5">
              {/* Top row */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-[#0084a2] bg-[#ddf1f6] px-2.5 py-0.5 rounded-full">
                  {res.categoryLabel}
                </span>
                {res.badge && (
                  <span className="text-[11px] font-bold text-[#0a0a0a] bg-[#f9902e] px-2 py-0.5 rounded-md">
                    {res.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-[#0a0a0a] leading-snug mb-2 line-clamp-2">
                {res.title}
              </h3>

              {/* Meta tags */}
              <div className="flex items-center gap-3 text-xs text-[#626262] mb-3">
                <span className="font-semibold text-gray-800">{res.classLevel}</span>
                <span>•</span>
                <span>{res.subject}</span>
              </div>

              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                {res.description}
              </p>

              {/* Key Features Bullet points */}
              <div className="bg-slate-50 p-3 rounded-[8px] mb-4 space-y-1.5 border border-slate-200">
                {res.features.slice(0, 3).map((f, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-800">
                    <Check size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* File Specs */}
              <div className="flex items-center justify-between text-[11px] text-[#626262] pt-2 border-t border-gray-100">
                <span>ফরম্যাট: <strong>{res.fileFormat}</strong></span>
                <span>{toBengaliNumber(res.downloadCount)}+ ডাউনলোড</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPreviewItem(res)}
                className="flex-1 py-2 px-3 text-xs font-semibold text-[#e2136e] bg-white border border-[#e2136e] hover:bg-[#ffdeee] rounded-[8px] text-center transition-colors cursor-pointer"
              >
                নমুনা দেখুন
              </button>

              <button
                type="button"
                onClick={() => handleDownload(res)}
                className="flex-1 py-2 px-3 text-xs font-bold text-white bg-[#e2136e] hover:bg-[#c2105f] active:scale-98 rounded-[8px] text-center transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                {downloadSuccess === res.id ? (
                  <>
                    <Check size={14} className="text-green-300" />
                    <span>ডাউনলোড হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Download size={14} />
                    <span>ডাউনলোড PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="bg-white rounded-[10px] p-12 text-center border border-gray-200 my-8">
          <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-bold text-gray-800 mb-1">কোনো রিসোর্স পাওয়া যায়নি</h3>
          <p className="text-sm text-gray-500 mb-4">অনুগ্রহ করে অন্য কোনো বিষয় বা কি-ওয়ার্ড দিয়ে খুঁজুন।</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-white bg-[#e2136e] px-4 py-2 rounded-[8px]"
          >
            সব রিসোর্স রিসেট করুন
          </button>
        </div>
      )}

      {/* Teacher's Request Box */}
      <div className="mt-12 bg-white rounded-[12px] p-6 sm:p-8 border-2 border-dashed border-[#e2136e]/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-[#e2136e] uppercase tracking-wider">শিক্ষক সেবা</span>
          <h3 className="text-xl font-bold text-[#0a0a0a] mt-1 mb-2">
            আপনার স্কুলের জন্য কাস্টম প্রশ্নপত্র বা লেসন প্ল্যান দরকার?
          </h3>
          <p className="text-sm text-[#626262] max-w-xl">
            আমরা যেকোনো বিষয় বা ক্লাসের জন্য প্রতিষ্ঠানের নাম ও লোগো সম্বলিত কাস্টম মূল্যায়ন
            শিট এবং প্রশ্ন ব্যাংক প্রস্তুত করে থাকি। সরাসরি আমাদের সাপোর্ট টিমে বার্তা দিন।
          </p>
        </div>
        <a
          href={siteConfig.contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-[#00a544] hover:bg-[#008f3a] text-white font-bold text-sm px-6 py-3 rounded-[10px] shadow-sm transition-all flex items-center gap-2"
        >
          <span>হোয়াটসঅ্যাপে রিকোয়েস্ট পাঠান</span>
        </a>
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[14px] max-w-lg w-full p-6 shadow-2xl relative border border-pink-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-[#0084a2] bg-[#ddf1f6] px-2 py-0.5 rounded-sm">
                  {previewItem.categoryLabel}
                </span>
                <h3 className="text-lg font-bold text-[#0a0a0a] mt-1">{previewItem.title}</h3>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="text-gray-400 hover:text-gray-700 p-1 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-[10px] text-xs text-slate-700 space-y-2 mb-4 border border-slate-200">
              <p className="font-semibold text-[#e2136e]">নমুনা প্রিভিউ সারাংশ:</p>
              <p>{previewItem.description}</p>
              <div className="pt-2 border-t border-slate-200">
                <span className="font-bold">অন্তর্ভুক্ত বিষয়াবলি:</span>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
                  {previewItem.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-5">
              <span>পৃষ্ঠা সংখ্যা: <strong>{toBengaliNumber(previewItem.pageCount)}</strong></span>
              <span>ফাইল সাইজ: <strong>{previewItem.fileSize}</strong></span>
              <span>ফরম্যাট: <strong>{previewItem.fileFormat}</strong></span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="flex-1 py-2.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-[8px]"
              >
                বন্ধ করুন
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownload(previewItem);
                  setPreviewItem(null);
                }}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-[#e2136e] hover:bg-[#c2105f] rounded-[8px] flex items-center justify-center gap-1.5"
              >
                <Download size={14} />
                <span>সম্পূর্ণ ফাইল ডাউনলোড</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
