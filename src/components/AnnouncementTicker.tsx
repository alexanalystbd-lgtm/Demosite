import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export const AnnouncementTicker: React.FC = () => {
  const { announcement } = useShop();

  return (
    <div className="bg-white border-b border-pink-100/80 text-[#0a0a0a] text-xs py-2 px-4 overflow-hidden relative shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        {/* Sleek Label Badge */}
        <div className="shrink-0 flex items-center gap-1.5 bg-[#ffdeee] text-[#e2136e] font-bold px-2.5 py-0.5 rounded-full text-[11px]">
          <Sparkles size={12} className="text-[#e2136e]" />
          <span>বিশেষ নোটিশ</span>
        </div>

        {/* Marquee Ticker */}
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-12 font-medium text-slate-700 text-xs">
            <span>{announcement}</span>
            <span className="text-[#e2136e] font-bold">★ সীমিত সময়ের জন্য সকল বান্ডেলে বিশেষ ছাড়!</span>
            <span>{announcement}</span>
            <span className="text-[#0084a2] font-semibold">★ ফ্রি স্যাম্পল দেখে অর্ডার করুন।</span>
          </div>
        </div>

        {/* Action Link */}
        <Link
          to="/shop"
          className="shrink-0 hidden sm:flex items-center gap-1 text-xs font-bold text-[#e2136e] hover:underline"
        >
          <span>অফার দেখুন</span>
          <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
};
