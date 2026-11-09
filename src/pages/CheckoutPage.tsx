import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Phone,
  BookOpen
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import {
  validateCheckoutForm,
  CheckoutFormState,
  formatPrice,
  toBengaliNumber
} from '../utils/shopLogic';
import { siteConfig } from '../config';

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotals, currentUser, placeOrder, showToast } = useShop();
  const navigate = useNavigate();

  const isTotalZero = cartTotals.total === 0;

  const [formData, setFormData] = useState<CheckoutFormState>({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    classLevel: currentUser?.classLevel || 'hsc-1st-year',
    paymentMethod: 'bkash',
    transactionId: isTotalZero ? 'FREE-ORDER' : '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect to shop
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-[#0a0a0a] mb-2">আপনার কার্ট বর্তমানে খালি!</h2>
        <p className="text-xs text-[#626262] mb-6">চেকআউট করতে প্রথমে অন্তত একটি বই বা নোটস কার্টে যোগ করুন।</p>
        <Link
          to="/shop"
          className="bg-[#e2136e] text-white text-xs font-bold px-6 py-2.5 rounded-[10px] inline-flex items-center gap-1.5"
        >
          <span>স্টোর ব্রাউজ করুন</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateCheckoutForm(formData, isTotalZero);
    if (!validation.isValid) {
      setErrors(validation.errors);
      showToast('অনুগ্রহ করে সঠিক তথ্য দিন।', 'error');
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const order = placeOrder({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        classLevel: formData.classLevel,
        paymentMethod: formData.paymentMethod,
        transactionId: isTotalZero ? 'FREE-ORDER' : formData.transactionId
      });

      // Navigate to Order Success
      navigate(`/order-success/${order.id}`);
    } catch (err) {
      console.error(err);
      showToast('অর্ডারে ত্রুটি হয়েছে, পুনরায় চেষ্টা করুন।', 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#626262] mb-6" aria-label="ব্রেডক্রাম্ব">
        <Link to="/" className="hover:text-[#e2136e]">হোম</Link>
        <span>/</span>
        <Link to="/cart" className="hover:text-[#e2136e]">কার্ট</Link>
        <span>/</span>
        <span className="text-[#0a0a0a] font-semibold">চেকআউট ও পেমেন্ট</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Billing Details & Payment Method */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Billing & Student Info */}
          <div className="bg-white rounded-[10px] p-6 border border-[#e5e5e5] shadow-xs">
            <h2 className="text-base font-bold text-[#0a0a0a] border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#ffdeee] text-[#e2136e] flex items-center justify-center text-xs font-bold">
                ১
              </span>
              <span>শিক্ষার্থীর তথ্য ও যোগাযোগের ঠিকানা</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0a0a0a] mb-1">
                  পূর্ণ নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="যেমন: তানভীর আহমেদ"
                  className={`w-full bg-[#f5f5f5] text-xs sm:text-sm p-3 rounded-[8px] border ${
                    errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-[#e5e5e5]'
                  } focus:outline-none focus:border-[#e2136e]`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0a0a0a] mb-1">
                    মোবাইল নম্বর <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="01711223344"
                    className={`w-full bg-[#f5f5f5] text-xs sm:text-sm p-3 rounded-[8px] border ${
                      errors.phone ? 'border-red-500 bg-red-50/30' : 'border-[#e5e5e5]'
                    } focus:outline-none focus:border-[#e2136e]`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0a0a0a] mb-1">
                    ইমেইল এড্রেস <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className={`w-full bg-[#f5f5f5] text-xs sm:text-sm p-3 rounded-[8px] border ${
                      errors.email ? 'border-red-500 bg-red-50/30' : 'border-[#e5e5e5]'
                    } focus:outline-none focus:border-[#e2136e]`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                  )}
                  <span className="text-[10px] text-[#626262]">
                    ফাইল ডাউনলোড ব্যাকআপ লিংক এই ইমেইলে যাবে।
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0a0a0a] mb-1">
                  শ্রেণি / বর্ষ
                </label>
                <select
                  value={formData.classLevel}
                  onChange={e => setFormData({ ...formData, classLevel: e.target.value })}
                  className="w-full bg-[#f5f5f5] text-xs sm:text-sm p-3 rounded-[8px] border border-[#e5e5e5] focus:outline-none focus:border-[#e2136e]"
                >
                  <option value="class-1">ক্লাস ১ (প্রথম শ্রেণি)</option>
                  <option value="class-2">ক্লাস ২ (দ্বিতীয় শ্রেণি)</option>
                  <option value="class-3">ক্লাস ৩ (তৃতীয় শ্রেণি)</option>
                  <option value="class-4">ক্লাস ৪ (চতুর্থ শ্রেণি)</option>
                  <option value="class-5">ক্লাস ৫ (পঞ্চম শ্রেণি / বৃত্তি)</option>
                  <option value="class-6">ক্লাস ৬ (ষষ্ঠ শ্রেণি)</option>
                  <option value="class-7">ক্লাস ৭ (সপ্তম শ্রেণি)</option>
                  <option value="class-8">ক্লাস ৮ (অষ্টম শ্রেণি)</option>
                  <option value="class-9">ক্লাস ৯ (নবম শ্রেণি)</option>
                  <option value="class-10">ক্লাস ১০ / এসএসসি</option>
                  <option value="hsc-1st-year">HSC ১ম বর্ষ (একাদশ)</option>
                  <option value="hsc-2nd-year">HSC ২য় বর্ষ (দ্বাদশ)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Payment Method Selection */}
          <div className="bg-white rounded-[10px] p-6 border border-[#e5e5e5] shadow-xs">
            <h2 className="text-base font-bold text-[#0a0a0a] border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#ffdeee] text-[#e2136e] flex items-center justify-center text-xs font-bold">
                ২
              </span>
              <span>পেমেন্ট মেথড নির্বাচন করুন</span>
            </h2>

            {isTotalZero ? (
              <div className="bg-green-50 border border-green-200 p-4 rounded-[10px] text-xs text-green-800 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#00a544] shrink-0" />
                <span>
                  আপনার অর্ডারের মূল্য ৳০ (সম্পূর্ণ ফ্রি)। কোনো পেমেন্ট প্রয়োজন নেই! সরাসরি সাবমিট করে ডাউনলোড করুন।
                </span>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Payment Option Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* bKash */}
                  <label
                    className={`cursor-pointer rounded-[8px] p-3 border-2 flex flex-col items-center justify-center text-center transition-all ${
                      formData.paymentMethod === 'bkash'
                        ? 'border-[#e2136e] bg-[#ffdeee]/30 font-bold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bkash"
                      checked={formData.paymentMethod === 'bkash'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'bkash' })}
                      className="sr-only"
                    />
                    <span className="text-[#e2136e] font-black text-sm">bKash</span>
                    <span className="text-[10px] text-gray-500">বিকাশ ওয়ালেট</span>
                  </label>

                  {/* Nagad */}
                  <label
                    className={`cursor-pointer rounded-[8px] p-3 border-2 flex flex-col items-center justify-center text-center transition-all ${
                      formData.paymentMethod === 'nagad'
                        ? 'border-[#f9902e] bg-[#fef4ea] font-bold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="nagad"
                      checked={formData.paymentMethod === 'nagad'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'nagad' })}
                      className="sr-only"
                    />
                    <span className="text-[#f9902e] font-black text-sm">Nagad</span>
                    <span className="text-[10px] text-gray-500">নগদ ওয়ালেট</span>
                  </label>

                  {/* Rocket */}
                  <label
                    className={`cursor-pointer rounded-[8px] p-3 border-2 flex flex-col items-center justify-center text-center transition-all ${
                      formData.paymentMethod === 'rocket'
                        ? 'border-[#8b248a] bg-purple-50 font-bold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="rocket"
                      checked={formData.paymentMethod === 'rocket'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'rocket' })}
                      className="sr-only"
                    />
                    <span className="text-[#8b248a] font-black text-sm">Rocket</span>
                    <span className="text-[10px] text-gray-500">রকেট ওয়ালেট</span>
                  </label>

                  {/* Card */}
                  <label
                    className={`cursor-pointer rounded-[8px] p-3 border-2 flex flex-col items-center justify-center text-center transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-[#0084a2] bg-[#ddf1f6] font-bold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="sr-only"
                    />
                    <span className="text-[#0084a2] font-black text-sm">Card</span>
                    <span className="text-[10px] text-gray-500">ভিসা / মাস্টারকার্ড</span>
                  </label>
                </div>

                {/* Instructions & TrxID Input Box */}
                <div className="bg-[#f5f5f5] p-4 rounded-[10px] border border-gray-200 text-xs space-y-3">
                  <div className="font-bold text-[#0a0a0a] flex items-center justify-between">
                    <span>পেমেন্ট নির্দেশনা ({formData.paymentMethod.toUpperCase()}):</span>
                    <span className="text-[#e2136e] font-extrabold text-sm">
                      মোট প্রদেয়: {formatPrice(cartTotals.total)}
                    </span>
                  </div>

                  {formData.paymentMethod === 'bkash' && (
                    <div className="space-y-1.5 text-gray-700">
                      <p>১. আপনার বিকাশ অ্যাপ থেকে "Send Money" বা "Make Payment" অপশনে যান।</p>
                      <p>
                        ২. প্রাপক নম্বর লিখুন:{' '}
                        <strong className="text-[#e2136e] font-mono text-sm bg-white px-2 py-0.5 rounded border">
                          {siteConfig.paymentNumbers.bkash}
                        </strong>
                      </p>
                      <p>৩. টাকার পরিমাণ: <strong>৳ {toBengaliNumber(cartTotals.total)}</strong></p>
                      <p>৪. পেমেন্ট শেষে প্রাপ্ত ৮-১০ অক্ষরের ট্রানজেকশন আইডি (TrxID) নিচের বক্সে লিখুন।</p>
                    </div>
                  )}

                  {formData.paymentMethod === 'nagad' && (
                    <div className="space-y-1.5 text-gray-700">
                      <p>১. নগদ অ্যাপে লগইন করে "Send Money" নির্বাচন করুন।</p>
                      <p>
                        ২. নগদ নম্বর:{' '}
                        <strong className="text-[#f9902e] font-mono text-sm bg-white px-2 py-0.5 rounded border">
                          {siteConfig.paymentNumbers.nagad}
                        </strong>
                      </p>
                      <p>৩. টাকার পরিমাণ: <strong>৳ {toBengaliNumber(cartTotals.total)}</strong></p>
                      <p>৪. সফল লেনদেনের পর TrxID নিচে লিখুন।</p>
                    </div>
                  )}

                  {formData.paymentMethod === 'rocket' && (
                    <div className="space-y-1.5 text-gray-700">
                      <p>১. রকেট একাউন্ট থেকে সেন্ড মানি করুন।</p>
                      <p>
                        ২. রকেট নম্বর:{' '}
                        <strong className="text-purple-700 font-mono text-sm bg-white px-2 py-0.5 rounded border">
                          {siteConfig.paymentNumbers.rocket}
                        </strong>
                      </p>
                      <p>৩. টাকার পরিমাণ: <strong>৳ {toBengaliNumber(cartTotals.total)}</strong></p>
                      <p>৪. ফিরতি এসএমএসের TrxID নিচে লিখুন।</p>
                    </div>
                  )}

                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-1.5 text-gray-700">
                      <p>ভিসা বা মাস্টারকার্ড গেটওয়ে অটো-ভেরিফাইড। আপনার রেফারেন্স কোড নিচে প্রদান করা হয়েছে।</p>
                      <p className="text-[11px] text-gray-500">SSL Encrypted 256-bit Secure Gateway</p>
                    </div>
                  )}

                  {/* TrxID Input Field */}
                  {formData.paymentMethod !== 'card' ? (
                    <div className="pt-2">
                      <label className="block text-xs font-bold text-[#0a0a0a] mb-1">
                        ট্রানজেকশন আইডি (TrxID) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.transactionId}
                        onChange={e => setFormData({ ...formData, transactionId: e.target.value })}
                        placeholder="যেমন: BK9876543210 বা NG82716"
                        className={`w-full bg-white text-xs sm:text-sm p-2.5 rounded-[8px] border font-mono uppercase ${
                          errors.transactionId ? 'border-red-500 bg-red-50/20' : 'border-gray-300'
                        } focus:outline-none focus:border-[#e2136e]`}
                      />
                      {errors.transactionId && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.transactionId}</p>
                      )}
                    </div>
                  ) : (
                    <div className="pt-2">
                      <label className="block text-xs font-bold text-[#0a0a0a] mb-1">
                        কার্ড রেফারেন্স আইডি
                      </label>
                      <input
                        type="text"
                        readOnly
                        value="CARD-REF-OK-2026"
                        className="w-full bg-gray-100 text-xs p-2.5 rounded-[8px] border border-gray-300 text-gray-600"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Confirmation Button */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-[10px] p-6 border border-[#e5e5e5] shadow-xs space-y-4">
            <h2 className="text-base font-bold text-[#0a0a0a] border-b border-gray-100 pb-3">
              অর্ডারের আইটেমসমূহ
            </h2>

            {/* Item list */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map(item => (
                <div key={item.product.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-[#0a0a0a] line-clamp-1">{item.product.title}</h4>
                    <span className="text-[11px] text-[#626262]">
                      পরিমাণ: {toBengaliNumber(item.quantity)} × {formatPrice(item.product.price)}
                    </span>
                  </div>
                  <span className="font-extrabold text-[#0a0a0a] shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="pt-3 border-t border-gray-100 space-y-2 text-xs text-[#626262]">
              <div className="flex items-center justify-between">
                <span>উপমোট (Subtotal):</span>
                <span className="font-bold text-[#0a0a0a]">
                  ৳ {toBengaliNumber(cartTotals.subtotal)}
                </span>
              </div>

              {cartTotals.discount > 0 && (
                <div className="flex items-center justify-between text-[#00a544] font-semibold">
                  <span>কুপন ছাড়:</span>
                  <span>- ৳ {toBengaliNumber(cartTotals.discount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>ডেলিভারি ফি:</span>
                <span className="text-[#00a544] font-bold">ফ্রি (ইনস্ট্যান্ট ডিজিটাল ডাউনলোড)</span>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-baseline justify-between text-base font-extrabold text-[#0a0a0a]">
                <span>মোট প্রদেয়:</span>
                <span className="text-2xl text-[#e2136e]">
                  {formatPrice(cartTotals.total)}
                </span>
              </div>
            </div>

            {/* Submit / Place Order Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-[#e2136e] hover:bg-[#c2105f] active:scale-98 text-white font-extrabold text-sm py-3.5 rounded-[10px] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>অর্ডার প্রসেস হচ্ছে...</span>
              ) : (
                <>
                  <Lock size={15} />
                  <span>অর্ডার কনফার্ম করুন ({formatPrice(cartTotals.total)})</span>
                </>
              )}
            </button>

            <div className="text-[11px] text-[#626262] text-center pt-1 leading-snug">
              অর্ডার কনফার্ম করার সাথে সাথেই ডাউনলোড পেজ উন্মুক্ত হবে এবং ফাইল সেভ করার অপশন পাবেন।
            </div>
          </div>

          {/* Help Box */}
          <div className="bg-[#fef4ea] p-4 rounded-[10px] border border-[#f9902e]/30 text-xs text-[#0a0a0a] flex items-start gap-3">
            <Phone size={18} className="text-[#f9902e] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">পেমেন্টে কোনো সমস্যা হচ্ছে?</span>
              <p className="text-[11px] text-[#626262]">
                আমাদের কাস্টমার কেয়ারে কল করুন: <strong>{siteConfig.contact.phone}</strong> অথবা হোয়াটসঅ্যাপে মেসেজ দিন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
