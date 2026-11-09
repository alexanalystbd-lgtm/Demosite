import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Briefcase,
  Calendar,
  Users,
  Download,
  ExternalLink,
  Search,
  Filter,
  Clock,
  Sparkles,
  Building,
  CheckCircle,
  AlertCircle,
  FileText
} from 'lucide-react';
import { sampleJobCirculars, JobCircular } from '../data/jobCirculars';
import { siteConfig } from '../config';
import { toBengaliNumber } from '../utils/shopLogic';
import { useShop } from '../context/ShopContext';

export const JobCircularPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalJob, setActiveModalJob] = useState<JobCircular | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const { showToast } = useShop();

  const categories = [
    { id: 'all', label: 'সকল চাকরির বিজ্ঞপ্তি' },
    { id: 'govt', label: 'সরকারি চাকরি (Govt Jobs)' },
    { id: 'bank', label: 'ব্যাংক জবস (Bank Jobs)' },
    { id: 'teacher', label: 'শিক্ষক নিয়োগ (NTRCA / DPE)' },
    { id: 'defense', label: 'প্রতিরক্ষা ও অন্যান্য' },
  ];

  const filteredCirculars = sampleJobCirculars.filter(job => {
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.educationReq.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownloadCircularPdf = (job: JobCircular) => {
    const content = `%PDF-1.4
% Official Job Circular Document: ${job.organization}
% Post: ${job.title}
% Total Vacancies: ${job.vacancies} | Deadline: ${job.deadlineDate}
% Published via ${siteConfig.siteName}
1 0 obj << /Title (${job.title}) /Author (${job.organization}) >> endobj
trailer << /Root 1 0 R >>
%%EOF`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${job.id}-official-circular.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(job.id);
    showToast(`"${job.organization}"-এর অফিশিয়াল সার্কুলার PDF ডাউনলোড শুরু হয়েছে!`, 'success');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      <Helmet>
        <title>জব সার্কুলার (Job Circular) — {siteConfig.siteName}</title>
        <meta
          name="description"
          content="চলমান সকল সরকারি চাকরি, ব্যাংক জব, শিক্ষক নিয়োগ ও ডিফেন্সের আপডেট নিয়োগ বিজ্ঞপ্তি, পদসংখ্যা, আবেদনের নিয়ম ও অফিশিয়াল সার্কুলার PDF ডাউনলোড।"
        />
      </Helmet>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#AA0E53] via-[#e2136e] to-[#f9902e] text-white rounded-[16px] p-6 sm:p-10 shadow-lg mb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-yellow-200 mb-3 border border-white/25">
            <Sparkles size={14} />
            <span>সরাসরি যাচাইকৃত ও হালনাগাদ সার্কুলার হাব</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            চলমান সরকারি ও বেসরকারি নিয়োগ বিজ্ঞপ্তি
          </h1>
          <p className="text-pink-50 text-sm sm:text-base leading-relaxed mb-6">
            মন্ত্রণালয়, রেলওয়ে, খাদ্য অধিদপ্তর, ব্যাংকার্স সিলেকশন কমিটি এবং বেসরকারি শিক্ষক
            নিবন্ধনসহ সকল বিশ্বস্ত চাকরির অফিসিয়াল সার্কুলার ও সরাসরি আবেদন লিংক।
          </p>

          <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
              <CheckCircle size={15} className="text-yellow-300" />
              <span>১০০% প্রামাণ্য গ্যাজেট ও অফিশিয়াল নোটিশ</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
              <Clock size={15} className="text-yellow-300" />
              <span>আবেদনের শেষ তারিখ ও কাউন্টডাউন অ্যালার্ট</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
              <FileText size={15} className="text-yellow-300" />
              <span>এক ক্লিকে মূল সার্কুলার PDF ডাউনলোড</span>
            </div>
          </div>
        </div>

        <div className="absolute right-4 -bottom-6 text-white/10 hidden md:block pointer-events-none">
          <Briefcase size={220} />
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="bg-white rounded-[10px] p-4 sm:p-5 border border-[#e5e5e5] shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="প্রতিষ্ঠান, পদের নাম বা যোগ্যতা দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#f5f5f5] text-sm pl-9 pr-4 py-2.5 rounded-[10px] border border-[#e5e5e5] focus:outline-none focus:border-[#e2136e]"
            />
            <Search size={16} className="absolute left-3 top-3.5 text-gray-400" />
          </div>

          <div className="text-xs text-[#626262] font-medium flex items-center gap-2">
            <Filter size={14} className="text-[#e2136e]" />
            <span>মোট {toBengaliNumber(filteredCirculars.length)} টি নিয়োগ বিজ্ঞপ্তি প্রকাশিত</span>
          </div>
        </div>

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

      {/* Circular Cards List */}
      <div className="space-y-4">
        {filteredCirculars.map(job => (
          <div
            key={job.id}
            className="bg-white rounded-[10px] border border-[#e5e5e5] hover:border-[#f6b8d3] hover:shadow-md transition-all p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          >
            {/* Left: Organization & Details */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold text-[#0084a2] bg-[#ddf1f6] px-2.5 py-0.5 rounded-full">
                  {job.categoryLabel}
                </span>

                {job.status === 'expiring-soon' ? (
                  <span className="text-[11px] font-bold text-white bg-[#e40014] px-2 py-0.5 rounded-md flex items-center gap-1 animate-pulse">
                    <Clock size={11} />
                    <span>আর মাত্র {toBengaliNumber(job.daysRemaining)} দিন বাকি!</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-[#0a0a0a] bg-[#f9902e] px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock size={11} />
                    <span>মেয়াদ: {toBengaliNumber(job.daysRemaining)} দিন বাকি</span>
                  </span>
                )}

                <span className="text-xs text-gray-500 font-medium">
                  প্রকাশ: {job.publishDate}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-[#0a0a0a] leading-snug mb-1.5">
                {job.title}
              </h3>

              {/* Organization name */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#e2136e] mb-3">
                <Building size={14} className="shrink-0" />
                <span>{job.organization}</span>
              </div>

              {/* Quick specs grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-700 bg-gray-50 p-2.5 rounded-[8px] border border-gray-100">
                <div>
                  <span className="text-gray-500 block text-[10px]">মোট পদসংখ্যা</span>
                  <span className="font-bold text-[#e2136e] text-sm">
                    {toBengaliNumber(job.vacancies)} টি পদ
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">বেতন স্কেল</span>
                  <span className="font-medium text-gray-900 truncate block">{job.salaryGrade}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">আবেদনের শেষ তারিখ</span>
                  <span className="font-bold text-[#00a544]">{job.deadlineDate}</span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveModalJob(job)}
                className="py-2.5 px-4 text-xs font-semibold text-[#0a0a0a] bg-gray-100 hover:bg-gray-200 rounded-[8px] text-center transition-colors cursor-pointer"
              >
                বিস্তারিত শর্তাবলি
              </button>

              <button
                type="button"
                onClick={() => handleDownloadCircularPdf(job)}
                className="py-2.5 px-4 text-xs font-bold text-white bg-[#0084a2] hover:bg-[#00708a] rounded-[8px] text-center transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                {downloadSuccess === job.id ? (
                  <span>ডাউনলোড হচ্ছে...</span>
                ) : (
                  <>
                    <Download size={14} />
                    <span>সার্কুলার PDF</span>
                  </>
                )}
              </button>

              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 text-xs font-bold text-white bg-[#e2136e] hover:bg-[#c2105f] active:scale-98 rounded-[8px] text-center transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>অনলাইনে আবেদন</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredCirculars.length === 0 && (
        <div className="bg-white rounded-[10px] p-12 text-center border border-gray-200 my-8">
          <Briefcase size={48} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-bold text-gray-800 mb-1">কোনো সার্কুলার পাওয়া যায়নি</h3>
          <p className="text-sm text-gray-500 mb-4">অনুগ্রহ করে ভিন্ন কোনো শব্দ বা ক্যাটাগরি বেছে নিন।</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-white bg-[#e2136e] px-4 py-2 rounded-[8px]"
          >
            সব সার্কুলার দেখুন
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {activeModalJob && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[14px] max-w-xl w-full p-6 shadow-2xl relative border border-pink-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4 border-b pb-3">
              <div>
                <span className="text-xs font-bold text-[#0084a2] bg-[#ddf1f6] px-2 py-0.5 rounded-sm">
                  {activeModalJob.categoryLabel}
                </span>
                <h3 className="text-lg font-bold text-[#0a0a0a] mt-1">{activeModalJob.title}</h3>
                <p className="text-xs text-[#e2136e] font-semibold">{activeModalJob.organization}</p>
              </div>
              <button
                onClick={() => setActiveModalJob(null)}
                className="text-gray-400 hover:text-gray-700 p-1 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-gray-700">
              <div className="bg-slate-50 p-3 rounded-[8px] border border-slate-200">
                <span className="font-bold text-[#e2136e] block mb-1">সংক্ষিপ্ত বিবরণ:</span>
                <p className="leading-relaxed text-slate-700">{activeModalJob.details}</p>
              </div>

              <div>
                <span className="font-bold text-[#0a0a0a] block mb-1.5">যোগ্যতা ও শর্তাবলি:</span>
                <ul className="list-disc list-inside space-y-1 bg-gray-50 p-3 rounded-[8px] text-gray-800">
                  {activeModalJob.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-[8px]">
                <div>
                  <span className="text-gray-500 block text-[10px]">বয়সসীমা</span>
                  <span className="font-semibold text-gray-900">{activeModalJob.ageLimit}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">আবেদন ফি</span>
                  <span className="font-semibold text-gray-900">
                    {activeModalJob.feeAmount > 0
                      ? `৳ ${toBengaliNumber(activeModalJob.feeAmount)}/-`
                      : 'বিনামূল্যে (কোনো ফি নেই)'}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500 block text-[10px]">আবেদনের জেলাভিত্তিক নোটিশ</span>
                  <span className="font-semibold text-gray-900">{activeModalJob.districtNotice}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6 pt-4 border-t">
              <button
                type="button"
                onClick={() => setActiveModalJob(null)}
                className="flex-1 py-2.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-[8px]"
              >
                বন্ধ করুন
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownloadCircularPdf(activeModalJob);
                  setActiveModalJob(null);
                }}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-[#0084a2] hover:bg-[#00708a] rounded-[8px] flex items-center justify-center gap-1.5"
              >
                <Download size={14} />
                <span>সার্কুলার PDF</span>
              </button>
              <a
                href={activeModalJob.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 text-xs font-bold text-white bg-[#e2136e] hover:bg-[#c2105f] rounded-[8px] flex items-center justify-center gap-1.5"
              >
                <span>আবেদন লিংক</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
