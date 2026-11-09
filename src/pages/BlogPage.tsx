import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight, ArrowLeft, BookOpen, Share2 } from 'lucide-react';
import { blogPostsList } from '../data/siteContent';
import { useShop } from '../context/ShopContext';

export const BlogPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[#e2136e] font-bold text-xs uppercase tracking-wider bg-[#ffdeee] px-3 py-1 rounded-full">
          শিক্ষার্থীদের জন্য টিপস
        </span>
        <h1 className="text-3xl font-extrabold text-[#0a0a0a] mt-2 mb-2">স্টাডি ব্লগ ও গাইডলাইন</h1>
        <p className="text-xs text-[#626262]">
          পরীক্ষায় ভালো ফলাফল ও পড়াশোনার কার্যকারিতা বাড়ানোর বিশেষজ্ঞ পরামর্শ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogPostsList.map(post => (
          <article
            key={post.id}
            className="bg-white rounded-[10px] overflow-hidden border border-[#e5e5e5] hover:border-[#e2136e] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="p-6">
              <div className="flex items-center justify-between text-[11px] text-[#626262] mb-2">
                <span className="bg-[#ddf1f6] text-[#0084a2] px-2 py-0.5 rounded-full font-semibold">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <Link
                to={`/blog/${post.slug}`}
                className="text-base font-extrabold text-[#0a0a0a] hover:text-[#e2136e] transition-colors line-clamp-2 mb-3 block"
              >
                {post.title}
              </Link>

              <p className="text-xs text-[#626262] leading-relaxed line-clamp-3 mb-4">
                {post.summary}
              </p>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">{post.date}</span>
              <Link
                to={`/blog/${post.slug}`}
                className="font-bold text-[#e2136e] hover:underline flex items-center gap-1"
              >
                <span>সম্পূর্ণ পড়ুন</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export const BlogPostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { showToast } = useShop();

  const post = blogPostsList.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-[#0a0a0a] mb-2">পোস্টটি পাওয়া যায়নি</h2>
        <Link to="/blog" className="text-[#e2136e] font-bold text-xs hover:underline">
          ← সকল ব্লগ পোস্ট দেখুন
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('ব্লগ লিংক কপি করা হয়েছে!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <nav className="flex items-center gap-2 text-xs text-[#626262] mb-6">
        <Link to="/" className="hover:text-[#e2136e]">হোম</Link>
        <span>/</span>
        <Link to="/blog" className="hover:text-[#e2136e]">ব্লগ</Link>
        <span>/</span>
        <span className="text-[#0a0a0a] font-semibold line-clamp-1">{post.title}</span>
      </nav>

      <article className="bg-white rounded-[10px] p-6 sm:p-10 border border-[#e5e5e5] shadow-xs">
        <div className="border-b border-gray-100 pb-4 mb-6">
          <span className="bg-[#ffdeee] text-[#e2136e] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a0a0a] leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#626262]">
            <div className="flex items-center gap-4">
              <span>লেখক: <strong>{post.author}</strong></span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="text-[#e2136e] font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Share2 size={14} />
              <span>শেয়ার করুন</span>
            </button>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#0a0a0a] leading-relaxed">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
          <Link
            to="/blog"
            className="text-xs font-bold text-[#e2136e] hover:underline flex items-center gap-1"
          >
            <ArrowLeft size={14} />
            <span>ব্লগ লিস্টে ফিরে যান</span>
          </Link>

          <Link
            to="/shop"
            className="bg-[#e2136e] hover:bg-[#c2105f] text-white text-xs font-bold px-5 py-2.5 rounded-[8px]"
          >
            নোটস ও সাজেশন সংগ্রহ করুন
          </Link>
        </div>
      </article>
    </div>
  );
};
