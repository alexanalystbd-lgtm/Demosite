import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Briefcase,
  Download,
  BookOpen,
  Search,
  CheckCircle,
  Sparkles,
  Award,
  ChevronRight,
  TrendingUp,
  Target,
  FileCheck
} from 'lucide-react';
import { sampleCareerExamItems, CareerExamItem } from '../data/careerExam';
import { siteConfig } from '../config';
import { toBengaliNumber } from '../utils/shopLogic';
import { useShop } from '../context/ShopContext';

export const CareerExamPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewItem, setPreviewItem] = useState<CareerExamItem | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const { showToast } = useShop();

  const filters = [
    { id: 'all', label: 'সকল ক্যারিয়ার ও এক্সাম রিসোর্স' },
    { id: 'bcs', label: 'বিসিএস (BCS) প্রস্তুতি' },
    { id: 'bank', label: 'ব্যাংক নিয়োগ (Bank Job)' },
    { id: 'admission', label: 'বিশ্ববিদ্যালয় ভর্তি (Admission)' },
    { id: 'primary-ntrca', label: 'প্রাইমারি ও NTRCA নিবন্ধন' },
  ];

  const filteredItems = sampleCareerExamItems.filter(item => {
    const matchesCategory = selectedFilter === 'all' || item.examType === selectedFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetAudience.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (item: CareerExamItem) => {
    const content = `%PDF-1.4
% Career & Exam Guide: ${item.title}
% Category: ${item.examTypeLabel} | Target: ${item.targetAudience}
% Published by ${siteConfig.siteName}
1 0 obj << /Title (${item.title}) /Author (${siteConfig.siteName}) >> endobj
trailer << /Root 1 0 R >>
%%EOF`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.id}-${item.examType}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(item.id);
    showToast(`"${item.title}" ডাউনলোড শুরু হয়েছে!`, 'success');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      <Helmet>
        <title>ক্যারিয়ার ও পরীক্ষা (Career & Exam) — {siteConfig.siteName}</title>
        <meta
          name="description"
          content="বিসিএস প্রিলিমিনারি, ব্যাংক নিয়োগ, বিশ্ববিদ্যালয় ও মেডিকেল ভর্তি পরীক্ষা, প্রাইমারি শিক্ষক এবং NTRCA নিবন্ধন পরীক্ষার সেরা শর্টকাট গাইড ও প্রশ্নব্যাংক।"
        />
      </Helmet>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#0084a2] via-[#e2136e] to-[#f9902e] text-white rounded-[16px] p-6 sm:p-10 shadow-lg mb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-yellow-200 mb-3 border border-white/25">
            <Target size={14} />
            <span>প্রতিযোগিতামূলক পরীক্ষায় সাফল্যের ডিজিটাল ডাইজেস্ট</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            ক্যারিয়ার ও প্রতিযোগিতামূলক পরীক্ষা প্রস্তুতি
          </h1>
          <p className="text-white/95 text-sm sm:text-base leading-relaxed mb-6">
            বিসিএস, বাংলাদেশ ব্যাংক ও সমন্বিত সরকারি ব্যাংক, বিশ্ববিদ্যালয় ভর্তি পরীক্ষা,
            প্রাইমারি সহকারী শিক্ষক এবং শিক্ষক নিবন্ধন পরীক্ষার জন্য সময়োপযোগী শর্টকাট টেকনিক ও পূর্ণাঙ্গ সলভড নোটস।
          </p>

          <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
              <TrendingUp size={15} className="text-yellow-300" />
              <span>বিগত ১০-১৫ বছরের প্রশ্নভিত্তিক অ্যানালাইসিস</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
              <FileCheck size={15} className="text-yellow-300" />
              <span>ক্যালকুলেটর ছাড়া দ্রুত ম্যাথ সলভিং টেকনিক</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
              <Download size={15} className="text-yellow-300" />
              <span>ইনস্ট্যান্ট হাই কোয়ালিটি PDF এক্সেস</span>
            </div>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-4 -bottom-6 text-white/10 hidden md:block pointer-events-none">
          <Briefcase size={220} />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-[10px] p-4 sm:p-5 border border-[#e5e5e5] shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="পরীক্ষা, বিষয় বা পদবি দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#f5f5f5] text-sm pl-9 pr-4 py-2.5 rounded-[10px] border border-[#e5e5e5] focus:outline-none focus:border-[#e2136e]"
            />
            <Search size={16} className="absolute left-3 top-3.5 text-gray-400" />
          </div>

          <div className="text-xs text-[#626262] font-medium">
            <span>মোট {toBengaliNumber(filteredItems.length)} টি পরীক্ষা গাইড সংকলন</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                selectedFilter === filter.id
                  ? 'bg-[#e2136e] text-white shadow-xs'
                  : 'bg-gray-100 text-[#0a0a0a] hover:bg-pink-100 hover:text-[#e2136e]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-[10px] border border-[#e5e5e5] hover:border-[#f6b8d3] hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-[#e2136e] bg-[#ffdeee] px-2.5 py-0.5 rounded-full">
                  {item.examTypeLabel}
                </span>
                {item.badge && (
                  <span className="text-[11px] font-bold text-[#0a0a0a] bg-[#f9902e] px-2 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-[#0a0a0a] leading-snug mb-2 line-clamp-2">
                {item.title}
              </h3>

              <div className="text-xs font-semibold text-[#0084a2] bg-[#ddf1f6] px-2 py-1 rounded-sm mb-3">
                উপযোগী: {item.targetAudience}
              </div>

              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                {item.shortDesc}
              </p>

              {/* Highlights */}
              <div className="bg-[#fef4ea] p-3 rounded-[8px] mb-4 space-y-1.5 border border-orange-100">
                {item.highlights.slice(0, 3).map((hl, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#0a0a0a]">
                    <CheckCircle size={13} className="text-[#00a544] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#626262] pt-2 border-t border-gray-100">
                <span>{toBengaliNumber(item.pageCount)} পৃষ্ঠা • {item.fileSize}</span>
                <span>{toBengaliNumber(item.downloadCount)}+ পরীক্ষার্থী</span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPreviewItem(item)}
                className="flex-1 py-2 px-3 text-xs font-semibold text-[#e2136e] bg-white border border-[#e2136e] hover:bg-[#ffdeee] rounded-[8px] text-center transition-colors cursor-pointer"
              >
                টপিক সূচি
              </button>

              <button
                type="button"
                onClick={() => handleDownload(item)}
                className="flex-1 py-2 px-3 text-xs font-bold text-white bg-[#e2136e] hover:bg-[#c2105f] active:scale-98 rounded-[8px] text-center transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                {downloadSuccess === item.id ? (
                  <span>ডাউনলোড শুরু...</span>
                ) : (
                  <>
                    <Download size={14} />
                    <span>ফ্রি PDF নিন</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Strategic Preparation Advice Box */}
      <div className="mt-12 bg-white rounded-[12px] p-6 sm:p-8 border border-[#e5e5e5] shadow-xs">
        <h3 className="text-xl font-bold text-[#0a0a0a] mb-4 flex items-center gap-2">
          <Award className="text-[#e2136e]" />
          <span>প্রতিযোগিতামূলক পরীক্ষায় ফার্স্ট-ট্র্যাক সাফল্যের ৩টি মূল নীতি</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-50 p-5 rounded-[12px] border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-pink-50 text-[#e2136e] border border-pink-200 flex items-center justify-center font-bold text-sm mb-3">
              ১
            </div>
            <h4 className="font-bold text-sm text-slate-900 mb-1">বিগত প্রশ্নের গভীর প্যাটার্ন বিশ্লেষণ</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              অযথা মোটা মোটা বই না পড়ে প্রতিটি বিষয়ের বারবার আসা টপিক চিহ্নিত করে শর্টকাট ফর্মুলা আয়ত্ত করুন।
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-[12px] border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-orange-50 text-[#f9902e] border border-orange-200 flex items-center justify-center font-bold text-sm mb-3">
              ২
            </div>
            <h4 className="font-bold text-sm text-slate-900 mb-1">টাইমড ওএমআর প্র্যাকটিস</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              ঘড়ি ধরে ৬০ বা ৯০ মিনিটে নেগেটিভ মার্কিং হিসাব করে নিয়মিত ওএমআর শিটে দাগানোর অভ্যাস গড়ে তুলুন।
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-[12px] border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-sky-50 text-[#0084a2] border border-sky-200 flex items-center justify-center font-bold text-sm mb-3">
              ৩
            </div>
            <h4 className="font-bold text-sm text-slate-900 mb-1">হ্যান্ডরিটেন রিভিশন শিট</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              পরীক্ষার আগের ৪৮ ঘণ্টায় রিভিশন দেওয়ার মতো এক নজরে পড়ার উপযোগী বুলেটিন নোটস সংরক্ষণ করুন।
            </p>
          </div>
        </div>
      </div>

      {/* Modal for topic preview */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[14px] max-w-lg w-full p-6 shadow-2xl relative border border-pink-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-[#e2136e] bg-[#ffdeee] px-2 py-0.5 rounded-sm">
                  {previewItem.examTypeLabel}
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

            <div className="bg-[#fef4ea] p-4 rounded-[10px] text-xs text-gray-700 space-y-2 mb-4 border border-orange-200">
              <p className="font-semibold text-[#0a0a0a]">গাইডের অন্তর্ভুক্ত গুরুত্বপূর্ণ অধ্যায়সমূহ:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-800 font-medium">
                {previewItem.sampleTopics.map((topic, i) => (
                  <li key={i}>{topic}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-5">
              <span>পৃষ্ঠা: <strong>{toBengaliNumber(previewItem.pageCount)}</strong></span>
              <span>সাইজ: <strong>{previewItem.fileSize}</strong></span>
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
                <span>সম্পূর্ণ গাইড ডাউনলোড</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
