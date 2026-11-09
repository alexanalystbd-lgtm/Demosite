import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  Filter,
  SlidersHorizontal,
  Search,
  X,
  RotateCcw,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { categoriesList, classesList, subjectsList } from '../data/products';
import { categoryNames, classNames, subjectNames } from '../data/translationsData';
import { filterAndSortProducts, toBengaliNumber } from '../utils/shopLogic';

interface ListingPageProps {
  forcedSection?: 'school' | 'college';
  forcedClassLevel?: string;
  forcedFreeOnly?: boolean;
  forcedCategory?: string;
  pageTitle?: string;
  pageDescription?: string;
}

export const ProductListingPage: React.FC<ListingPageProps> = ({
  forcedSection,
  forcedClassLevel,
  forcedFreeOnly,
  forcedCategory,
  pageTitle,
  pageDescription
}) => {
  const { products } = useShop();
  const { lang, t, toLocalizedNumber } = useLanguage();
  const { classLevel: paramClassLevel, slug: paramSlug } = useParams<{ classLevel?: string; slug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Determine active initial filters
  const effectiveSection = forcedSection || (searchParams.get('section') as any) || 'all';
  const effectiveClass = forcedClassLevel || paramClassLevel || searchParams.get('class') || 'all';
  const effectiveCategory = forcedCategory || paramSlug || searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedSection, setSelectedSection] = useState<'all' | 'school' | 'college'>(effectiveSection);
  const [selectedClass, setSelectedClass] = useState<string>(effectiveClass);
  const [selectedCategory, setSelectedCategory] = useState<string>(effectiveCategory);
  const [selectedSubject, setSelectedSubject] = useState<string>('সকল বিষয়');
  const [priceType, setPriceType] = useState<'all' | 'free' | 'paid'>(forcedFreeOnly ? 'free' : 'all');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Sync state if URL query params change
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    if (paramClassLevel) setSelectedClass(paramClassLevel);
  }, [paramClassLevel]);

  useEffect(() => {
    if (paramSlug) setSelectedCategory(paramSlug);
  }, [paramSlug]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSection, selectedClass, selectedCategory, selectedSubject, priceType, sortBy]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(products, {
      query: searchQuery,
      section: selectedSection,
      classLevel: selectedClass,
      category: selectedCategory,
      subject: selectedSubject,
      priceType: forcedFreeOnly ? 'free' : priceType,
      sortBy
    });
  }, [products, searchQuery, selectedSection, selectedClass, selectedCategory, selectedSubject, priceType, forcedFreeOnly, sortBy]);

  // Pagination slice
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSection(forcedSection || 'all');
    setSelectedClass(forcedClassLevel || 'all');
    setSelectedCategory(forcedCategory || 'all');
    setSelectedSubject('সকল বিষয়');
    setPriceType(forcedFreeOnly ? 'free' : 'all');
    setSortBy('popular');
    setCurrentPage(1);
    setSearchParams({});
  };

  // Determine dynamic title
  const displayTitle = useMemo(() => {
    if (pageTitle) return pageTitle;
    if (forcedFreeOnly) {
      return lang === 'en' ? '100% Free Digital Study Products' : '১০০% ফ্রি ডিজিটাল স্টাডি প্রোডাক্টস';
    }
    if (selectedClass !== 'all') {
      const clsName = classNames[selectedClass]?.[lang] || selectedClass;
      return lang === 'en' ? `${clsName} Digital Books & Notes` : `${clsName} এর ডিজিটাল বই ও নোটস`;
    }
    if (selectedCategory !== 'all') {
      const catName = categoryNames[selectedCategory]?.[lang] || selectedCategory;
      return lang === 'en' ? `${catName} Collection` : `${catName} সংকলন`;
    }
    if (selectedSection === 'school') {
      return lang === 'en' ? 'School Section (Class 1–10)' : 'স্কুল সেকশন (১ম–১০ম শ্রেণি)';
    }
    if (selectedSection === 'college') {
      return lang === 'en' ? 'College Section (HSC)' : 'কলেজ সেকশন (HSC)';
    }
    return lang === 'en' ? 'All Digital Study Products' : 'সকল ডিজিটাল স্টাডি প্রোডাক্টস';
  }, [pageTitle, forcedFreeOnly, selectedClass, selectedCategory, selectedSection, lang]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#626262] mb-4" aria-label={lang === 'en' ? 'Breadcrumb' : 'ব্রেডক্রাম্ব'}>
        <Link to="/" className="hover:text-[#e2136e]">{t('navHome')}</Link>
        <span>/</span>
        <span className="text-[#0a0a0a] font-semibold">{displayTitle}</span>
      </nav>

      {/* Header Banner for Listing */}
      <div className="bg-white rounded-[10px] p-6 border border-[#e5e5e5] shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a0a0a] leading-tight">
            {displayTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#626262] mt-1">
            {pageDescription ||
              (lang === 'en'
                ? `Total ${toLocalizedNumber(filteredProducts.length)} digital resources found.`
                : `মোট ${toBengaliNumber(filteredProducts.length)} টি ডিজিটাল রিসোর্স পাওয়া গেছে।`)}
          </p>
        </div>

        {/* Search input in header */}
        <div className="w-full md:w-72 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={lang === 'en' ? 'Search products...' : 'প্রোডাক্ট খুঁজুন...'}
            className="w-full bg-[#f5f5f5] text-xs sm:text-sm pl-9 pr-8 py-2.5 rounded-[10px] border border-[#e5e5e5] focus:outline-none focus:border-[#e2136e]"
          />
          <Search size={15} className="absolute left-3 top-3 text-gray-400" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block bg-white rounded-[10px] p-5 border border-[#e5e5e5] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2 font-bold text-sm text-[#0a0a0a]">
              <SlidersHorizontal size={16} className="text-[#e2136e]" />
              <span>{lang === 'en' ? 'Filter Options' : 'ফিল্টার করুন'}</span>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-[#e2136e] hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <RotateCcw size={12} />
              <span>{lang === 'en' ? 'Reset' : 'রিসেট'}</span>
            </button>
          </div>

          {/* Section Filter (if not forced) */}
          {!forcedSection && (
            <div>
              <label className="block text-xs font-bold text-[#0a0a0a] uppercase tracking-wider mb-2">
                {lang === 'en' ? 'Section' : 'বিভাগ'}
              </label>
              <div className="flex flex-col gap-1.5 text-xs">
                {[
                  { id: 'all', label: lang === 'en' ? 'All Sections' : 'সকল বিভাগ' },
                  { id: 'school', label: lang === 'en' ? 'School (Class 1-10)' : 'স্কুল (ক্লাস ১-১০)' },
                  { id: 'college', label: lang === 'en' ? 'College (HSC)' : 'কলেজ (HSC)' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedSection(opt.id as any)}
                    className={`text-left px-2.5 py-1.5 rounded-md transition-colors ${
                      selectedSection === opt.id
                        ? 'bg-[#ffdeee] text-[#e2136e] font-bold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Class Level Filter */}
          {!forcedClassLevel && (
            <div>
              <label className="block text-xs font-bold text-[#0a0a0a] uppercase tracking-wider mb-2">
                {lang === 'en' ? 'Class / Grade' : 'শ্রেণি / ক্লাস'}
              </label>
              <div className="flex flex-col gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedClass('all')}
                  className={`text-left px-2.5 py-1.5 rounded-md transition-colors ${
                    selectedClass === 'all'
                      ? 'bg-[#ffdeee] text-[#e2136e] font-bold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {lang === 'en' ? 'All Classes' : 'সকল শ্রেণি'}
                </button>
                {classesList
                  .filter(c => selectedSection === 'all' || c.section === selectedSection)
                  .map(cls => (
                    <button
                      key={cls.slug}
                      type="button"
                      onClick={() => setSelectedClass(cls.slug)}
                      className={`text-left px-2.5 py-1.5 rounded-md transition-colors ${
                        selectedClass === cls.slug
                          ? 'bg-[#ffdeee] text-[#e2136e] font-bold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {lang === 'en' ? classNames[cls.slug]?.en || cls.name : cls.name}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold text-[#0a0a0a] uppercase tracking-wider mb-2">
              {lang === 'en' ? 'Category' : 'ক্যাটাগরি'}
            </label>
            <div className="flex flex-col gap-1 text-xs">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`text-left px-2.5 py-1.5 rounded-md transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#ffdeee] text-[#e2136e] font-bold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {lang === 'en' ? 'All Categories' : 'সকল ক্যাটাগরি'}
              </button>
              {categoriesList.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-left px-2.5 py-1.5 rounded-md transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-[#ffdeee] text-[#e2136e] font-bold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {lang === 'en' ? categoryNames[cat.id]?.en || cat.name : cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Filter */}
          <div>
            <label className="block text-xs font-bold text-[#0a0a0a] uppercase tracking-wider mb-2">
              {lang === 'en' ? 'Subject' : 'বিষয়'}
            </label>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full text-xs bg-[#f5f5f5] p-2 rounded-[8px] border border-gray-200 focus:outline-none focus:border-[#e2136e]"
            >
              {subjectsList.map(sub => (
                <option key={sub} value={sub}>
                  {lang === 'en' ? subjectNames[sub]?.en || sub : sub}
                </option>
              ))}
            </select>
          </div>

          {/* Price Type (Free / Paid) */}
          {!forcedFreeOnly && (
            <div>
              <label className="block text-xs font-bold text-[#0a0a0a] uppercase tracking-wider mb-2">
                {lang === 'en' ? 'Price Type' : 'মূল্য ধরণ'}
              </label>
              <div className="grid grid-cols-3 gap-1 text-xs">
                {[
                  { id: 'all', label: lang === 'en' ? 'All' : 'সকল' },
                  { id: 'free', label: lang === 'en' ? '100% Free' : '১০০% ফ্রি' },
                  { id: 'paid', label: lang === 'en' ? 'Paid' : 'পেইড' }
                ].map(pt => (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => setPriceType(pt.id as any)}
                    className={`py-1.5 px-1 rounded-md text-center transition-colors font-semibold ${
                      priceType === pt.id
                        ? 'bg-[#e2136e] text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {pt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {/* Top Sort & Mobile Filter Toggle Bar */}
          <div className="bg-white rounded-[10px] p-3 border border-[#e5e5e5] shadow-xs mb-6 flex items-center justify-between gap-4">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 bg-[#f5f5f5] hover:bg-gray-200 text-[#0a0a0a] px-3 py-1.5 rounded-[8px] text-xs font-bold"
            >
              <Filter size={14} className="text-[#e2136e]" />
              <span>{lang === 'en' ? 'Filters' : 'ফিল্টার'}</span>
            </button>

            {/* Result count */}
            <div className="text-xs text-[#626262]">
              {lang === 'en' ? (
                <>
                  Showing <span className="font-bold text-[#0a0a0a]">{toLocalizedNumber(filteredProducts.length)}</span> products
                </>
              ) : (
                <>
                  প্রদর্শিত হচ্ছে <span className="font-bold text-[#0a0a0a]">{toBengaliNumber(filteredProducts.length)}</span> টি প্রোডাক্ট
                </>
              )}
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-[#626262] hidden sm:inline">
                {lang === 'en' ? 'Sort by:' : 'সর্ট করুন:'}
              </label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-[#f5f5f5] text-xs font-semibold text-[#0a0a0a] px-2.5 py-1.5 rounded-[8px] border border-gray-200 focus:outline-none focus:border-[#e2136e] cursor-pointer"
              >
                <option value="popular">{lang === 'en' ? 'Most Popular' : 'সবচেয়ে জনপ্রিয়'}</option>
                <option value="newest">{lang === 'en' ? 'Newest Uploads' : 'নতুন আপলোড'}</option>
                <option value="price-asc">{lang === 'en' ? 'Price: Low to High' : 'দাম: কম থেকে বেশি'}</option>
                <option value="price-desc">{lang === 'en' ? 'Price: High to Low' : 'দাম: বেশি থেকে কম'}</option>
                <option value="rating">{lang === 'en' ? 'Highest Rating' : 'সর্বোচ্চ রেটিং'}</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid or Empty State */}
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[10px] p-12 text-center border border-[#e5e5e5] shadow-xs flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#ffdeee] text-[#e2136e] flex items-center justify-center mb-4">
                <BookOpen size={32} />
              </div>
              <h3 className="text-lg font-bold text-[#0a0a0a] mb-2">
                {lang === 'en' ? 'Sorry, no products found!' : 'দুঃখিত, কোনো প্রোডাক্ট পাওয়া যায়নি!'}
              </h3>
              <p className="text-xs text-[#626262] max-w-sm mb-6">
                {lang === 'en'
                  ? 'No study products matched your current filters. Please adjust your filters or reset.'
                  : 'আপনার দেওয়া ফিল্টারের সাথে কোনো স্টাডি প্রোডাক্ট মেলেনি। অনুগ্রহ করে ফিল্টার পরিবর্তন করুন অথবা রিসেট করুন।'}
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="bg-[#e2136e] hover:bg-[#c2105f] text-white text-xs font-bold px-6 py-2.5 rounded-[10px] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>{lang === 'en' ? 'Reset All Filters' : 'সকল ফিল্টার রিসেট করুন'}</span>
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                type="button"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-[8px] border border-[#e5e5e5] bg-white text-[#0a0a0a] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                aria-label={lang === 'en' ? 'Previous page' : 'পূর্ববর্তী পৃষ্ঠা'}
              >
                <ChevronLeft size={16} />
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-[8px] text-xs font-bold transition-all ${
                      currentPage === pageNum
                        ? 'bg-[#e2136e] text-white shadow-xs'
                        : 'bg-white text-gray-700 border border-[#e5e5e5] hover:bg-gray-50'
                    }`}
                  >
                    {toLocalizedNumber(pageNum)}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-[8px] border border-[#e5e5e5] bg-white text-[#0a0a0a] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                aria-label={lang === 'en' ? 'Next page' : 'পরবর্তী পৃষ্ঠা'}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <h3 className="font-bold text-base text-[#0a0a0a]">
                  {lang === 'en' ? 'Filter Options' : 'ফিল্টার অপশন'}
                </h3>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-md text-gray-500 hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Class selection */}
              <div className="mb-4">
                <span className="block text-xs font-bold text-gray-700 mb-2">
                  {lang === 'en' ? 'Class' : 'শ্রেণি'}
                </span>
                <select
                  value={selectedClass}
                  onChange={e => setSelectedClass(e.target.value)}
                  className="w-full text-xs p-2.5 bg-gray-50 border rounded-md"
                >
                  <option value="all">{lang === 'en' ? 'All Classes' : 'সকল শ্রেণি'}</option>
                  {classesList.map(c => (
                    <option key={c.slug} value={c.slug}>
                      {lang === 'en' ? classNames[c.slug]?.en || c.name : c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div className="mb-4">
                <span className="block text-xs font-bold text-gray-700 mb-2">
                  {lang === 'en' ? 'Category' : 'ক্যাটাগরি'}
                </span>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full text-xs p-2.5 bg-gray-50 border rounded-md"
                >
                  <option value="all">{lang === 'en' ? 'All Categories' : 'সকল ক্যাটাগরি'}</option>
                  {categoriesList.map(c => (
                    <option key={c.id} value={c.id}>
                      {lang === 'en' ? categoryNames[c.id]?.en || c.name : c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div className="mb-4">
                <span className="block text-xs font-bold text-gray-700 mb-2">
                  {lang === 'en' ? 'Subject' : 'বিষয়'}
                </span>
                <select
                  value={selectedSubject}
                  onChange={e => setSelectedSubject(e.target.value)}
                  className="w-full text-xs p-2.5 bg-gray-50 border rounded-md"
                >
                  {subjectsList.map(s => (
                    <option key={s} value={s}>
                      {lang === 'en' ? subjectNames[s]?.en || s : s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex gap-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-[8px]"
              >
                {lang === 'en' ? 'Reset' : 'রিসেট'}
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-[#e2136e] text-white text-xs font-bold rounded-[8px]"
              >
                {lang === 'en' ? 'Apply Filters' : 'প্রয়োগ করুন'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
