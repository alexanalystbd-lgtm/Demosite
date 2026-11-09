import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Search, ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="text-7xl font-black text-[#e2136e] tracking-tight mb-2">৪০৪</div>
      <h1 className="text-2xl font-extrabold text-[#0a0a0a] mb-2">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!</h1>
      <p className="text-xs sm:text-sm text-[#626262] mb-8 leading-relaxed">
        আপনি যে লিংকটিতে প্রবেশ করার চেষ্টা করছেন তা হয়তো স্থানান্তরিত হয়েছে অথবা ঠিকানাটি ভুল লেখা হয়েছে।
      </p>

      {/* Quick Search */}
      <form onSubmit={handleSearch} className="max-w-sm mx-auto flex gap-2 mb-8">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="কোনো বই বা ক্লাস খুঁজছেন?"
          className="flex-1 bg-white text-xs p-3 rounded-[8px] border border-gray-300 focus:outline-none focus:border-[#e2136e]"
        />
        <button
          type="submit"
          className="bg-[#e2136e] hover:bg-[#c2105f] text-white text-xs font-bold px-5 py-3 rounded-[8px] shadow-xs cursor-pointer"
        >
          খুঁজুন
        </button>
      </form>

      {/* Quick Links */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="bg-white border border-[#e5e5e5] hover:border-[#e2136e] text-[#0a0a0a] text-xs font-bold px-4 py-2.5 rounded-[8px] inline-flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <Home size={14} />
          <span>হোমপেজ</span>
        </Link>
        <Link
          to="/shop"
          className="bg-[#e2136e] hover:bg-[#c2105f] text-white text-xs font-bold px-5 py-2.5 rounded-[8px] inline-flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <BookOpen size={14} />
          <span>সকল প্রোডাক্টস</span>
        </Link>
      </div>
    </div>
  );
};
