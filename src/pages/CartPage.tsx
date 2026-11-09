import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  ShieldCheck,
  CheckCircle,
  X,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice, toBengaliNumber } from '../utils/shopLogic';
import { siteConfig } from '../config';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    couponCode,
    applyCoupon,
    removeCoupon,
    cartTotals
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ text: string; isError: boolean } | null>(null);
  const navigate = useNavigate();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback({
      text: res.message,
      isError: !res.success
    });
    if (res.success) {
      setInputCoupon('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-[#ffdeee] text-[#e2136e] rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag size={36} />
        </div>
        <h1 className="text-2xl font-extrabold text-[#0a0a0a] mb-2">আপনার কার্ট খালি রয়েছে!</h1>
        <p className="text-sm text-[#626262] max-w-sm mx-auto mb-8">
          আপনি এখনো কোনো ডিজিটাল স্টাডি বই কার্টে যোগ করেননি। আপনার ক্লাসের সেরা নোটস ও মডেল টেস্ট এখনই খুঁজে নিন।
        </p>
        <Link
          to="/shop"
          className="bg-[#e2136e] hover:bg-[#c2105f] text-white text-sm font-bold px-8 py-3 rounded-[10px] inline-flex items-center gap-2 transition-all shadow-md"
        >
          <span>স্টাডি প্রোডাক্টস ব্রাউজ করুন</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#626262] mb-6" aria-label="ব্রেডক্রাম্ব">
        <Link to="/" className="hover:text-[#e2136e]">হোম</Link>
        <span>/</span>
        <span className="text-[#0a0a0a] font-semibold">শপিং কার্ট</span>
      </nav>

      <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
        {/* Left Column: Cart Items List */}
        <div className="w-full lg:w-2/3 space-y-4">
          <div className="bg-white rounded-[10px] p-5 border border-[#e5e5e5] shadow-xs flex items-center justify-between">
            <h1 className="text-xl font-extrabold text-[#0a0a0a]">
              আপনার নির্বাচিত বইসমূহ ({toBengaliNumber(cartTotals.itemCount)} টি)
            </h1>
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-red-500 hover:text-red-700 font-semibold cursor-pointer"
            >
              সব খালি করুন
            </button>
          </div>

          <div className="space-y-3">
            {cart.map(item => {
              const { product, quantity } = item;
              const itemTotal = product.price * quantity;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-[10px] p-4 sm:p-5 border border-[#e5e5e5] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Mini Icon / Theme Box */}
                    <div
                      className="w-14 h-16 rounded-[8px] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-inner p-1 text-center"
                      style={{
                        backgroundColor: product.themeColor || '#e2136e'
                      }}
                    >
                      <span className="text-[10px] leading-tight line-clamp-2">
                        {product.subject}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-[11px] text-[#626262] mb-0.5">
                        <span className="bg-[#ddf1f6] text-[#0084a2] px-2 py-0.5 rounded-sm font-semibold">
                          {product.classLabel}
                        </span>
                        <span>{product.format}</span>
                      </div>

                      <Link
                        to={`/product/${product.slug}`}
                        className="text-sm font-bold text-[#0a0a0a] hover:text-[#e2136e] line-clamp-1 block transition-colors"
                      >
                        {product.title}
                      </Link>

                      <div className="text-xs text-[#e2136e] font-extrabold mt-1">
                        একক মূল্য: {formatPrice(product.price)}
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Delete Controls */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-200 rounded-[8px] overflow-hidden bg-gray-50">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-1.5 hover:bg-gray-200 text-gray-700 transition-colors"
                        aria-label="কমান"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-[#0a0a0a]">
                        {toBengaliNumber(quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-1.5 hover:bg-gray-200 text-gray-700 transition-colors"
                        aria-label="বাড়ান"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Total Price for item */}
                    <div className="text-right min-w-[70px]">
                      <div className="text-sm font-extrabold text-[#0a0a0a]">
                        {formatPrice(itemTotal)}
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1"
                      title="আইটেমটি মুছুন"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              to="/shop"
              className="text-xs font-bold text-[#e2136e] hover:underline inline-flex items-center gap-1"
            >
              ← আরও স্টাডি প্রোডাক্টস যোগ করুন
            </Link>
          </div>
        </div>

        {/* Right Column: Coupon Input & Order Summary */}
        <div className="w-full lg:w-1/3 space-y-4">
          {/* Coupon Code Card */}
          <div className="bg-white rounded-[10px] p-5 border border-[#e5e5e5] shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0a0a0a] uppercase tracking-wider mb-2">
              <Tag size={15} className="text-[#e2136e]" />
              <span>ডিসকাউন্ট কুপন কোড</span>
            </div>

            {couponCode ? (
              <div className="bg-[#ffdeee] p-3 rounded-[8px] border border-[#f6b8d3] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#e2136e] block">
                    কুপন: {couponCode}
                  </span>
                  <span className="text-[11px] text-gray-700">ছাড় সফলভাবে প্রযুক্ত হয়েছে</span>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-xs text-red-600 font-bold hover:underline p-1"
                >
                  বাতিল
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={e => setInputCoupon(e.target.value)}
                  placeholder="যেমন: STUDENT20 বা FREE50"
                  className="flex-1 bg-[#f5f5f5] text-xs px-3 py-2.5 rounded-[8px] border border-[#e5e5e5] focus:outline-none uppercase"
                />
                <button
                  type="submit"
                  className="bg-[#0a0a0a] hover:bg-gray-800 text-white text-xs font-bold px-4 py-2.5 rounded-[8px] transition-colors"
                >
                  প্রয়োগ
                </button>
              </form>
            )}

            {/* Hint for demo codes */}
            <div className="mt-2.5 text-[11px] text-[#626262] bg-[#fef4ea] p-2 rounded border border-[#f9902e]/30">
              💡 <span className="font-semibold">ডেমো কুপন কোড:</span> ২০% ছাড়ের জন্য{' '}
              <strong className="text-[#e2136e] cursor-pointer" onClick={() => setInputCoupon('STUDENT20')}>
                STUDENT20
              </strong>{' '}
              অথবা ৫০ টাকা ছাড়ের জন্য{' '}
              <strong className="text-[#e2136e] cursor-pointer" onClick={() => setInputCoupon('FREE50')}>
                FREE50
              </strong>{' '}
              ব্যবহার করুন।
            </div>

            {couponFeedback && (
              <div
                className={`mt-2 text-xs p-2 rounded ${
                  couponFeedback.isError
                    ? 'bg-red-50 text-red-600'
                    : 'bg-green-50 text-green-700'
                }`}
              >
                {couponFeedback.text}
              </div>
            )}
          </div>

          {/* Order Summary Box */}
          <div className="bg-white rounded-[10px] p-6 border border-[#e5e5e5] shadow-xs space-y-4">
            <h2 className="text-base font-bold text-[#0a0a0a] border-b border-gray-100 pb-3">
              অর্ডার সারাংশ (Order Summary)
            </h2>

            <div className="space-y-2.5 text-xs text-[#626262]">
              <div className="flex items-center justify-between">
                <span>মোট বইয়ের মূল্য (Subtotal):</span>
                <span className="font-bold text-[#0a0a0a]">
                  ৳ {toBengaliNumber(cartTotals.subtotal)}
                </span>
              </div>

              {cartTotals.discount > 0 && (
                <div className="flex items-center justify-between text-[#00a544] font-semibold">
                  <span>কুপন ছাড় (Discount):</span>
                  <span>- ৳ {toBengaliNumber(cartTotals.discount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>ডিজিটাল ডেলিভারি ফি:</span>
                <span className="text-[#00a544] font-bold">ফ্রি (ইনস্ট্যান্ট)</span>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-baseline justify-between text-base font-extrabold text-[#0a0a0a]">
                <span>সর্বমোট প্রদেয়:</span>
                <span className="text-2xl text-[#e2136e]">
                  {formatPrice(cartTotals.total)}
                </span>
              </div>
            </div>

            {/* Savings Notice */}
            {cartTotals.savings > 0 && (
              <div className="bg-green-50 border border-green-200 text-green-800 text-xs p-2.5 rounded-[8px] flex items-center gap-1.5 font-medium">
                <Sparkles size={14} className="text-green-600 shrink-0" />
                <span>
                  আপনি এই অর্ডারে মোট ৳ {toBengaliNumber(cartTotals.savings)} সাশ্রয় করছেন!
                </span>
              </div>
            )}

            {/* Proceed to Checkout Button */}
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full bg-[#e2136e] hover:bg-[#c2105f] active:scale-98 text-white font-extrabold text-sm py-3.5 rounded-[10px] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>চেকআউট সম্পন্ন করুন</span>
              <ArrowRight size={16} />
            </button>

            {/* Guarantee badge */}
            <div className="text-center pt-2">
              <span className="text-[11px] text-[#626262] flex items-center justify-center gap-1">
                <ShieldCheck size={13} className="text-[#00a544]" />
                <span>নিরাপদ এনক্রিপ্টেড ডিজিটাল পেমেন্ট</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
