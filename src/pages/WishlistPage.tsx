import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { toBengaliNumber } from '../utils/shopLogic';

export const WishlistPage: React.FC = () => {
  const { wishlist, products } = useShop();
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#626262] mb-6" aria-label="ব্রেডক্রাম্ব">
        <Link to="/" className="hover:text-[#e2136e]">হোম</Link>
        <span>/</span>
        <span className="text-[#0a0a0a] font-semibold">আমার পছন্দের তালিকা (উইশলিস্ট)</span>
      </nav>

      <div className="bg-white rounded-[10px] p-6 border border-[#e5e5e5] shadow-xs mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0a0a0a]">
            আমার সংরক্ষিত বইসমূহ ({toBengaliNumber(wishlistedProducts.length)} টি)
          </h1>
          <p className="text-xs text-[#626262] mt-1">
            ভবিষ্যতে কেনার জন্য আপনার বুকমার্ক করা স্টাডি প্রোডাক্টস
          </p>
        </div>

        <Link
          to="/shop"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#e2136e] hover:underline"
        >
          <span>আরও বই খুঁজুন</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {wishlistedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[10px] p-16 text-center border border-[#e5e5e5] shadow-xs max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#ffdeee] text-[#e2136e] flex items-center justify-center mx-auto mb-4">
            <Heart size={32} />
          </div>
          <h2 className="text-lg font-bold text-[#0a0a0a] mb-2">
            আপনার পছন্দের তালিকা খালি রয়েছে!
          </h2>
          <p className="text-xs text-[#626262] mb-6 leading-relaxed">
            যেকোনো প্রোডাক্টের ওপর থাকা হার্ট (❤️) আইকনে ক্লিক করে পছন্দের বই বা নোটস সংরক্ষণ করতে পারেন।
          </p>
          <Link
            to="/shop"
            className="bg-[#e2136e] hover:bg-[#c2105f] text-white text-xs font-bold px-6 py-2.5 rounded-[10px] inline-flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>প্রোডাক্ট ব্রাউজ করুন</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
};
