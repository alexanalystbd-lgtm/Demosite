import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Zap,
  Star,
  CheckCircle2,
  FileText,
  Download,
  Eye,
  ShieldCheck,
  Share2,
  Clock,
  ArrowLeft,
  X,
  Send,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { ProductCover } from '../components/ProductCover';
import { ProductCard } from '../components/ProductCard';
import { localizeProduct } from '../data/translationsData';
import { siteConfig } from '../config';

interface UserReview {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist, showToast } = useShop();
  const { lang, t, toLocalizedNumber, formatPrice } = useLanguage();

  const product = products.find(p => p.slug === slug);
  const localized = product ? localizeProduct(product, lang) : null;

  const [activeTab, setActiveTab] = useState<'description' | 'inside' | 'reviews'>('description');
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);

  // New review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState<UserReview[]>([
    {
      id: 'r-1',
      name: 'আবরার ফাহিম',
      rating: 5,
      date: '৩ নভেম্বর, ২০২৬',
      comment: 'পিডিএফের কোয়ালিটি এবং হ্যান্ডরিটেন সূত্রের স্পষ্টতা অসাধারণ। পরীক্ষায় সময় বাঁচাতে অনেক সাহায্য করেছে!'
    },
    {
      id: 'r-2',
      name: 'সাদিয়া ইসলাম',
      rating: 5,
      date: '২৮ অক্টোবর, ২০২৬',
      comment: 'খুব সহজেই ফোনে ডাউনলোড করতে পেরেছি। ফন্ট অনেক বড় ও ক্লিয়ার, পড়ার সময় চোখে কোনো চাপ পড়ে না।'
    }
  ]);

  if (!product || !localized) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-[#0a0a0a] mb-3">
          {lang === 'en' ? 'Product Not Found!' : 'প্রোডাক্টটি পাওয়া যায়নি!'}
        </h2>
        <p className="text-sm text-[#626262] mb-6">
          {lang === 'en'
            ? 'The requested study product might have been moved or the URL is incorrect.'
            : 'আপনার অনুরোধ করা স্টাডি বইটি মুছে ফেলা হতে পারে বা ঠিকানাটি ভুল।'}
        </p>
        <Link
          to="/shop"
          className="bg-[#e2136e] text-white px-6 py-2.5 rounded-[10px] text-sm font-bold inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          <span>{lang === 'en' ? 'View All Products' : 'সব প্রোডাক্ট দেখুন'}</span>
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const discountPercent =
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  // Related products from the same class or category
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.classLevel === product.classLevel || p.category === product.category))
    .slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigate('/checkout');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName.trim() && reviewComment.trim()) {
      const newRev: UserReview = {
        id: 'rev-' + Date.now(),
        name: reviewName.trim(),
        rating: reviewRating,
        date: lang === 'en' ? 'Today' : 'আজ',
        comment: reviewComment.trim()
      };
      setReviewsList([newRev, ...reviewsList]);
      setReviewName('');
      setReviewComment('');
      showToast(lang === 'en' ? 'Thank you! Your review has been added.' : 'ধন্যবাদ! আপনার মূল্যবান রিভিউটি যুক্ত করা হয়েছে।');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: localized.title,
        text: localized.shortDescription,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast(lang === 'en' ? 'Link copied to clipboard!' : 'লিংক কপি করা হয়েছে!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#626262] mb-6" aria-label={lang === 'en' ? 'Breadcrumb' : 'ব্রেডক্রাম্ব'}>
        <Link to="/" className="hover:text-[#e2136e]">{t('navHome')}</Link>
        <span>/</span>
        <Link to={product.section === 'college' ? '/college' : '/school'} className="hover:text-[#e2136e]">
          {product.section === 'college' ? t('navCollege') : t('navSchool')}
        </Link>
        <span>/</span>
        <span className="text-[#0a0a0a] font-semibold line-clamp-1">{localized.title}</span>
      </nav>

      {/* Main Top Section: Gallery + Details */}
      <div className="bg-white rounded-[10px] border border-[#e5e5e5] p-6 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* Left Column: Image Gallery & Cover Preview */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative rounded-[10px] overflow-hidden border border-pink-100 shadow-md">
            <ProductCover
              title={localized.title}
              subject={localized.subject}
              classLabel={localized.classLabel}
              categoryLabel={localized.categoryLabel}
              themeColor={product.themeColor}
              iconType={product.iconType}
            />

            {/* Free sample floating badge */}
            <button
              type="button"
              onClick={() => setSampleModalOpen(true)}
              className="absolute bottom-3 right-3 z-30 bg-[#f9902e] hover:bg-[#f88114] text-[#0a0a0a] text-xs font-black px-3 py-1.5 rounded-[8px] shadow-lg flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Eye size={14} />
              <span>{lang === 'en' ? 'Free Sample Preview' : 'ফ্রি স্যাম্পল প্রিভিউ'}</span>
            </button>
          </div>

          {/* Gallery Thumbnails */}
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map(idx => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedGalleryIndex(idx)}
                className={`p-2 rounded-[8px] border text-center transition-all cursor-pointer ${
                  selectedGalleryIndex === idx
                    ? 'border-[#e2136e] bg-[#ffdeee] font-bold text-[#e2136e]'
                    : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="text-[11px] font-bold">
                  {idx === 0
                    ? lang === 'en' ? 'Cover Page' : 'কভার পেজ'
                    : idx === 1
                    ? lang === 'en' ? 'Contents' : 'সূচিপত্র'
                    : lang === 'en' ? 'Sample Page' : 'নমুনা পাতা'}
                </div>
                <div className="text-[9px] text-gray-500">
                  {lang === 'en' ? 'HD Preview' : 'HD প্রিভিউ'}
                </div>
              </button>
            ))}
          </div>

          {/* Trust points under gallery */}
          <div className="bg-[#fef4ea] p-4 rounded-[10px] border border-[#f9902e]/30 text-xs text-[#0a0a0a] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#0a0a0a]">
              <ShieldCheck size={16} className="text-[#00a544]" />
              <span>{lang === 'en' ? '100% Secure Download Guarantee' : '১০০% নিরাপদ ডাউনলোড গ্যারান্টি'}</span>
            </div>
            <p className="text-[11px] text-[#626262]">
              {lang === 'en'
                ? 'Instant direct access to the PDF file right after payment. No hidden fees or extra charges.'
                : 'পেমেন্টের সাথে সাথে সরাসরি PDF ফাইল পাবেন। কোনো অতিরিক্ত রেজিস্ট্রেশন ফি বা গোপন চার্জ নেই।'}
            </p>
          </div>
        </div>

        {/* Right Column: Title, Metadata, Pricing, Actions */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* Top Tag & Rating */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="bg-[#ffdeee] text-[#e2136e] text-xs font-bold px-3 py-1 rounded-full">
                  {localized.classLabel}
                </span>
                <span className="bg-[#ddf1f6] text-[#0084a2] text-xs font-semibold px-2.5 py-1 rounded-full">
                  {localized.categoryLabel}
                </span>
              </div>

              {/* Share button */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-2 rounded-full border border-gray-200 text-gray-600 hover:text-[#e2136e] hover:border-[#e2136e] transition-colors"
                  title={lang === 'en' ? 'Share' : 'শেয়ার করুন'}
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a0a0a] leading-snug mb-3">
              {localized.title}
            </h1>

            {/* Rating & Sales */}
            <div className="flex items-center gap-4 text-xs text-[#626262] mb-4 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star size={14} className="fill-current" />
                <span className="text-sm">{toLocalizedNumber(product.rating)}</span>
                <span className="text-gray-400">
                  {lang === 'en' ? `(${toLocalizedNumber(product.reviewCount)} reviews)` : `(${toLocalizedNumber(product.reviewCount)} রিভিউ)`}
                </span>
              </div>
              <span>•</span>
              <span className="text-[#0084a2] font-semibold">
                {lang === 'en'
                  ? `${toLocalizedNumber(product.salesCount)}+ students enrolled`
                  : `${toLocalizedNumber(product.salesCount)}+ জন শিক্ষার্থী সংগ্রহ করেছেন`}
              </span>
            </div>

            {/* Price section */}
            <div className="bg-slate-50 p-4 rounded-[12px] border border-slate-200 mb-6 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#626262] block mb-0.5">
                  {lang === 'en' ? 'Current Price:' : 'বর্তমান মূল্য:'}
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-[#e2136e]">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-base text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {discountPercent > 0 && !product.isFree && (
                <div className="text-right">
                  <span className="bg-[#f9902e] text-[#0a0a0a] font-black text-xs px-2.5 py-1 rounded-[6px] shadow-xs">
                    {toLocalizedNumber(discountPercent)}% {lang === 'en' ? 'OFF' : 'সাশ্রয়'}
                  </span>
                </div>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-[#0a0a0a]/80 leading-relaxed mb-6">
              {localized.shortDescription}
            </p>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 text-xs">
              <div className="bg-[#f5f5f5] p-2.5 rounded-[8px]">
                <span className="text-[#626262] block text-[10px]">
                  {lang === 'en' ? 'File Format' : 'ফাইল ফরম্যাট'}
                </span>
                <span className="font-bold text-[#0a0a0a]">{localized.format}</span>
              </div>
              <div className="bg-[#f5f5f5] p-2.5 rounded-[8px]">
                <span className="text-[#626262] block text-[10px]">
                  {lang === 'en' ? 'Total Pages' : 'পৃষ্ঠা সংখ্যা'}
                </span>
                <span className="font-bold text-[#0a0a0a]">
                  {toLocalizedNumber(product.pageCount)} {t('pagesCountSuffix')}
                </span>
              </div>
              <div className="bg-[#f5f5f5] p-2.5 rounded-[8px] col-span-2 sm:col-span-1">
                <span className="text-[#626262] block text-[10px]">
                  {lang === 'en' ? 'Download Size' : 'ডাউনলোড সাইজ'}
                </span>
                <span className="font-bold text-[#0a0a0a]">{product.fileSize}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Direct Order & Free Sample (Cart removed as requested) */}
          <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
            {product.isFree ? (
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3.5 px-4 rounded-[10px] bg-[#00a544] hover:bg-[#008f3a] text-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Download size={18} />
                <span>{lang === 'en' ? 'Download Free PDF Directly' : 'সরাসরি ফ্রি PDF ডাউনলোড করুন'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3.5 px-4 rounded-[10px] bg-[#e2136e] hover:bg-[#c2105f] text-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Zap size={18} />
                <span>{lang === 'en' ? 'Buy Now — Instant File Access' : 'এখনই অর্ডার করুন — সরাসরি ফাইল এক্সেস'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setSampleModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-[10px] bg-white border border-[#f9902e] text-[#0a0a0a] hover:bg-[#fef4ea] font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye size={15} className="text-[#f9902e]" />
              <span>{lang === 'en' ? 'Preview Free Sample (Free Download)' : 'ফ্রি স্যাম্পল দেখে নিন (বিনামূল্যে ডাউনলোড)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, What's Inside, Reviews */}
      <div className="bg-white rounded-[10px] border border-[#e5e5e5] shadow-xs overflow-hidden mb-12">
        {/* Tab Headers */}
        <div className="flex border-b border-gray-200 bg-gray-50/50">
          <button
            type="button"
            onClick={() => setActiveTab('description')}
            className={`py-3.5 px-6 font-bold text-sm border-b-2 transition-all cursor-pointer ${
              activeTab === 'description'
                ? 'border-[#e2136e] text-[#e2136e] bg-white'
                : 'border-transparent text-[#626262] hover:text-[#0a0a0a]'
            }`}
          >
            {lang === 'en' ? 'Detailed Overview' : 'বিস্তারিত বিবরণ'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('inside')}
            className={`py-3.5 px-6 font-bold text-sm border-b-2 transition-all cursor-pointer ${
              activeTab === 'inside'
                ? 'border-[#e2136e] text-[#e2136e] bg-white'
                : 'border-transparent text-[#626262] hover:text-[#0a0a0a]'
            }`}
          >
            {lang === 'en' ? "What's Inside" : 'কী কী রয়েছে'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`py-3.5 px-6 font-bold text-sm border-b-2 transition-all cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-[#e2136e] text-[#e2136e] bg-white'
                : 'border-transparent text-[#626262] hover:text-[#0a0a0a]'
            }`}
          >
            {lang === 'en' ? `Reviews (${toLocalizedNumber(reviewsList.length)})` : `রিভিউ (${toBengaliNumber(reviewsList.length)})`}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {/* Tab 1: Description */}
          {activeTab === 'description' && (
            <div className="space-y-6 text-sm text-[#0a0a0a] leading-relaxed">
              <div>
                <h3 className="text-lg font-bold text-[#0a0a0a] mb-2">
                  {lang === 'en' ? 'About this study material' : 'এই বই সম্পর্কে'}
                </h3>
                <p>{localized.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-base text-[#0a0a0a] mb-3">
                  {lang === 'en' ? 'Key Features & Highlights' : 'প্রধান বৈশিষ্ট্যসমূহ'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {localized.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-50 p-3 rounded-[8px] border border-slate-200">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-slate-800">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: What's Inside */}
          {activeTab === 'inside' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#0a0a0a]">
                {lang === 'en' ? 'Table of Contents & Chapters' : 'সূচিপত্র ও অধ্যায়সমূহ'}
              </h3>
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-[10px]">
                {localized.tableOfContents.map((ch, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center font-bold text-xs">
                        {toLocalizedNumber(idx + 1)}
                      </span>
                      <span className="font-medium text-[#0a0a0a]">{ch}</span>
                    </div>
                    <span className="text-[11px] text-[#0084a2] bg-[#ddf1f6] px-2 py-0.5 rounded-full font-semibold">
                      {lang === 'en' ? 'Complete Solution' : 'পূর্ণাঙ্গ সমাধান'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Reviews & Review Form */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Existing Reviews */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#0a0a0a]">
                  {lang === 'en' ? 'Student Reviews' : 'শিক্ষার্থীদের মূল্যায়ন'}
                </h3>
                <div className="space-y-3">
                  {reviewsList.map(rev => (
                    <div key={rev.id} className="p-4 rounded-[8px] bg-gray-50 border border-gray-100">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="font-bold text-xs text-[#0a0a0a]">{rev.name}</div>
                        <span className="text-[11px] text-gray-400">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400 mb-2">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={13} className="fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-[#626262] leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add a Review Form */}
              <div className="bg-slate-50 p-6 rounded-[12px] border border-slate-200">
                <h4 className="font-bold text-sm text-[#0a0a0a] mb-3">
                  {lang === 'en' ? 'Write a Review' : 'একটি রিভিউ লিখুন'}
                </h4>
                <form onSubmit={handleAddReview} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {lang === 'en' ? 'Rating' : 'রেটিং'}
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className={`p-1 text-lg cursor-pointer ${
                            star <= reviewRating ? 'text-amber-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        {lang === 'en' ? 'Your Name' : 'আপনার নাম'}
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewName}
                        onChange={e => setReviewName(e.target.value)}
                        placeholder={lang === 'en' ? 'e.g. Sakib Hasan' : 'যেমন: সাকিব হাসান'}
                        className="w-full bg-white text-xs p-2.5 rounded-[8px] border border-gray-200 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {lang === 'en' ? 'Your Comment' : 'আপনার মন্তব্য'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={reviewComment}
                      onChange={e => setReviewComment(e.target.value)}
                      placeholder={lang === 'en' ? 'Share your experience with this study book...' : 'বইটি আপনার কেমন লেগেছে লিখুন...'}
                      className="w-full bg-white text-xs p-2.5 rounded-[8px] border border-gray-200 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#e2136e] hover:bg-[#c2105f] text-white text-xs font-bold px-5 py-2 rounded-[8px] flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Send size={13} />
                    <span>{lang === 'en' ? 'Post Review' : 'রিভিউ পোস্ট করুন'}</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section aria-label={lang === 'en' ? 'Related study materials' : 'সম্পর্কিত বইসমূহ'} className="mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a0a0a] mb-6">
            {lang === 'en' ? 'More Popular Resources from this Class' : 'একই শ্রেণির আরও জনপ্রিয় রিসোর্স'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Free Sample Preview Modal */}
      {sampleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] max-w-xl w-full p-6 shadow-2xl border border-gray-200 relative animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSampleModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-[#0a0a0a] rounded-full hover:bg-gray-100"
              aria-label={lang === 'en' ? 'Close' : 'বন্ধ করুন'}
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#ffdeee] text-[#e2136e] text-xs font-bold px-2.5 py-0.5 rounded-full">
                {lang === 'en' ? 'Free Sample Demo' : 'ফ্রি স্যাম্পল ডেমো'}
              </span>
              <span className="text-xs text-[#626262]">{localized.classLabel}</span>
            </div>

            <h3 className="text-lg font-bold text-[#0a0a0a] mb-2">
              {localized.title}
            </h3>

            <p className="text-xs text-[#626262] mb-4">
              {lang === 'en'
                ? 'Preview sample chapter pages, formulas and diagram clarity before making a purchase.'
                : product.samplePreviewText}
            </p>

            {/* Mock Reader Preview Box */}
            <div className="bg-gray-100 border border-gray-200 rounded-[8px] p-4 text-xs font-mono text-gray-700 space-y-2 mb-6">
              <div className="flex items-center justify-between border-b pb-1 text-[11px] font-sans font-bold text-[#e2136e]">
                <span>{lang === 'en' ? 'Sample Reader View (Pages 1-4)' : 'নমুনা রিডার ভিউ (পৃষ্ঠা ১-৪)'}</span>
                <span>PDF Watermark Preview</span>
              </div>
              <p className="text-gray-800 font-sans">
                ✦ {lang === 'en' ? 'Chapter:' : 'অধ্যায়:'} {localized.subject} {lang === 'en' ? 'Concept Notes' : 'কনসেপ্ট হ্যান্ডনোটস'}
              </p>
              <p className="text-gray-600 font-sans">
                • {lang === 'en'
                    ? 'Practical applications of core formulas and solved MCQ illustrations from past board exams.'
                    : 'গুরুত্বপূর্ণ সূত্রের প্রয়োগ এবং বিগত সালের বোর্ড পরীক্ষার এমসিকিউ সমাধানের বাস্তব উদাহরণ।'}
              </p>
              <div className="p-3 bg-white rounded border text-center font-sans font-semibold text-[#0084a2]">
                {lang === 'en'
                  ? `[Free Demo Sample: Order full ${toLocalizedNumber(product.pageCount)}+ pages for complete unlocked access]`
                  : `[ফ্রি ডেমো ওয়াটারমার্ক: পুরো ${product.pageCount}+ পৃষ্ঠা পেতে প্রিমিয়াম সংস্করণ অর্ডার করুন]`}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => {
                  showToast(lang === 'en' ? 'Sample PDF download started!' : 'স্যাম্পল ফাইলটি ডাউনলোড শুরু হয়েছে!', 'success');
                  setSampleModalOpen(false);
                }}
                className="flex-1 bg-[#00a544] hover:bg-[#028b3a] text-white font-bold text-xs py-2.5 rounded-[8px] flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Download size={15} />
                <span>{lang === 'en' ? 'Download Sample PDF' : 'ফ্রি স্যাম্পল ডাউনলোড (PDF)'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSampleModalOpen(false);
                  handleBuyNow();
                }}
                className="flex-1 bg-[#e2136e] hover:bg-[#c2105f] text-white font-bold text-xs py-2.5 rounded-[8px] flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Zap size={15} />
                <span>{lang === 'en' ? 'Order Full Book Now' : 'সম্পূর্ণ বইটি এখনই অর্ডার'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
