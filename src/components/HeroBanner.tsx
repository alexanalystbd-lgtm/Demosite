import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../config';
import { useLanguage } from '../context/LanguageContext';

export const HeroBanner: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/shop');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#D4106A] to-[#B80F5E] text-white py-5 sm:py-7 md:py-8 border-t border-[#E0407F]/40 shadow-inner">
      {/* Soft, low-contrast architectural background scene (ultra subtle watermark: opacity-10) */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-10 select-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover object-bottom"
          preserveAspectRatio="xMidYMax slice"
        >
          {/* Subtle Drifting Clouds */}
          <g className="animate-drift opacity-40">
            <path
              d="M120 50c0-12 12-22 26-22 8 0 15 3 20 8 5-9 15-15 26-15 17 0 31 14 31 31 0 1 0 2 0 3 10 3 17 12 17 23 0 14-11 25-25 25h-78c-14 0-25-11-25-26 0-12 8-23 20-25z"
              fill="white"
            />
            <path
              d="M1120 60c0-12 12-22 26-22 8 0 15 3 20 8 5-9 15-15 26-15 17 0 31 14 31 31 0 1 0 2 0 3 10 3 17 12 17 23 0 14-11 25-25 25h-78c-14 0-25-11-25-26 0-12 8-23 20-25z"
              fill="white"
            />
          </g>

          {/* Twinkling Stars */}
          <g className="animate-twinkle">
            <circle cx="200" cy="40" r="2" fill="white" />
            <circle cx="480" cy="30" r="2" fill="white" />
            <circle cx="720" cy="25" r="2.5" fill="white" />
            <circle cx="960" cy="35" r="2" fill="white" />
            <circle cx="1260" cy="50" r="2" fill="white" />
          </g>

          {/* 1. School Clock Tower & Flag */}
          <g transform="translate(80, 140)">
            <rect x="0" y="100" width="160" height="140" fill="white" opacity="0.6" />
            <polygon points="80,40 0,100 160,100" fill="white" opacity="0.75" />
            <rect x="62" y="-10" width="36" height="50" fill="white" opacity="0.8" />
            <polygon points="80,-45 58,-10 102,-10" fill="white" opacity="0.8" />
            <line x1="80" y1="-45" x2="80" y2="-65" stroke="white" strokeWidth="2" />
            <g transform="translate(80, -65)" className="animate-flag">
              <polygon points="0,0 18,4 0,8" fill="white" />
            </g>
            {/* Clock */}
            <circle cx="80" cy="15" r="12" stroke="white" strokeWidth="2" fill="none" />
            <line x1="80" y1="15" x2="80" y2="8" stroke="white" strokeWidth="1.5" className="animate-clock-hour" />
            <line x1="80" y1="15" x2="86" y2="15" stroke="white" strokeWidth="1.2" className="animate-clock-minute" />
          </g>

          {/* 2. University Classical Dome & Columns */}
          <g transform="translate(580, 130)">
            <polygon points="140,50 0,110 280,110" fill="white" opacity="0.7" />
            <path d="M80 50 a60 60 0 0 1 120 0 z" fill="white" opacity="0.65" />
            <rect x="20" y="110" width="16" height="90" fill="white" opacity="0.6" />
            <rect x="60" y="110" width="16" height="90" fill="white" opacity="0.6" />
            <rect x="100" y="110" width="16" height="90" fill="white" opacity="0.6" />
            <rect x="160" y="110" width="16" height="90" fill="white" opacity="0.6" />
            <rect x="200" y="110" width="16" height="90" fill="white" opacity="0.6" />
            <rect x="240" y="110" width="16" height="90" fill="white" opacity="0.6" />
          </g>

          {/* 3. College Gothic Tower */}
          <g transform="translate(1140, 120)">
            <rect x="30" y="40" width="75" height="220" fill="white" opacity="0.6" />
            <polygon points="67,-15 22,40 112,40" fill="white" opacity="0.7" />
            <rect x="105" y="120" width="90" height="140" fill="white" opacity="0.5" />
          </g>

          {/* Floating Cap & Book */}
          <g className="animate-cap" style={{ transformOrigin: '320px 120px' }}>
            <polygon points="320,105 345,115 320,125 295,115" fill="white" opacity="0.6" />
          </g>
          <g className="animate-book" style={{ transformOrigin: '1200px 130px' }}>
            <path d="M1185 120c8-4 18-4 26 0v16c-8-4-18-4-26 0z" fill="white" opacity="0.5" />
            <path d="M1211 120c8-4 18-4 26 0v16c-8-4-18-4-26 0z" fill="white" opacity="0.65" />
          </g>
        </svg>
      </div>

      {/* Hero Foreground Content - Pristine, Clean & Focused */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold text-pink-100 mb-2 border border-white/15 shadow-xs">
          <Sparkles size={12} className="text-yellow-300 shrink-0" />
          <span>{t('heroPill')}</span>
        </div>

        {/* Two-line clean Heading */}
        <h1 className="flex flex-col items-center justify-center font-montserrat uppercase tracking-tight text-white mb-1.5">
          <span className="font-semibold text-xs sm:text-base md:text-lg leading-snug text-pink-100">
            {t('heroTitle1')}
          </span>
          <span className="font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-white tracking-tight drop-shadow-xs">
            {t('heroTitle2')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-pink-100/90 font-medium max-w-lg mx-auto mb-3.5 leading-relaxed font-bengali">
          {t('heroSubtitle')}
        </p>

        {/* Minimalist, Clean White Pill Search Bar */}
        <form
          onSubmit={handleSearch}
          className="max-w-[560px] mx-auto bg-white rounded-full p-1 sm:p-1.5 pl-3.5 sm:pl-4 shadow-md flex items-center justify-between gap-1.5 border border-white focus-within:ring-2 focus-within:ring-pink-300 transition-all duration-200"
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none font-medium truncate"
              aria-label="Search products"
            />
          </div>

          <button
            type="submit"
            className="shrink-0 bg-[#e2136e] hover:bg-[#c2105f] active:scale-95 text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-1.5 sm:py-2 rounded-full transition-all shadow-xs cursor-pointer flex items-center gap-1"
          >
            <span>{t('searchButton')}</span>
          </button>
        </form>

        {/* Clean Highlights below search */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-5 mt-3 text-[10px] sm:text-xs text-pink-100 font-medium">
          <div className="flex items-center gap-1">
            <CheckCircle2 size={12} className="text-yellow-300 shrink-0" />
            <span>{t('instantDownload')}</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 size={12} className="text-yellow-300 shrink-0" />
            <span>{t('printFriendly')}</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 size={12} className="text-yellow-300 shrink-0" />
            <span>{t('lifetimeAccess')}</span>
          </div>
        </div>
      </div>

      {/* Soft Fade at bottom merging into clean white page */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#f8fafc] to-transparent pointer-events-none" />
    </section>
  );
};
