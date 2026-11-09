import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  User,
  ShoppingBag,
  Download,
  Heart,
  LogOut,
  Edit2,
  CheckCircle2,
  Package,
  Calendar,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice, toBengaliNumber } from '../utils/shopLogic';
import { ProductCard } from '../components/ProductCard';

export const AccountPage: React.FC = () => {
  const {
    currentUser,
    orders,
    wishlist,
    products,
    logoutUser,
    updateUserProfile,
    showToast
  } = useShop();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = (searchParams.get('tab') as 'orders' | 'downloads' | 'wishlist' | 'profile') || 'orders';

  const setTab = (tab: 'orders' | 'downloads' | 'wishlist' | 'profile') => {
    setSearchParams({ tab });
  };

  // Edit Profile Form State
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [classLevel, setClassLevel] = useState(currentUser?.classLevel || 'hsc-1st-year');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, phone, classLevel });
    setIsEditing(false);
  };

  const handleDownloadFile = (fileName: string, title: string) => {
    const content = `=====================================================
${title}
ডিজিটাল সংস্করণ — কপিরাইট সংরক্ষিত
ডাউনলোড তারিখ: ${new Date().toLocaleDateString('bn-BD')}
=====================================================

ধন্যবাদ আমাদের ডিজিটাল স্টাডি প্রোডাক্ট নির্বাচন করার জন্য!
[PDF ফাইল ডাউনলোড সম্পন্ন হয়েছে]`;

    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(`"${fileName}" ডাউনলোড শুরু হয়েছে!`, 'success');
  };

  // If not logged in, show prompt to login or register
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-[#ffdeee] text-[#e2136e] flex items-center justify-center mx-auto mb-4">
          <User size={32} />
        </div>
        <h2 className="text-xl font-bold text-[#0a0a0a] mb-2">আপনি লগইন করেননি</h2>
        <p className="text-xs text-[#626262] mb-6">
          আপনার পূর্বে ক্রয়কৃত ফাইল ডাউনলোড ও অর্ডার ইতিহাস দেখতে অনুগ্রহ করে লগইন করুন।
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            to="/login"
            className="bg-[#e2136e] hover:bg-[#c2105f] text-white text-xs font-bold px-6 py-2.5 rounded-[10px] transition-colors"
          >
            লগইন করুন
          </Link>
          <Link
            to="/register"
            className="bg-white border border-[#e2136e] text-[#e2136e] text-xs font-bold px-6 py-2.5 rounded-[10px] hover:bg-pink-50 transition-colors"
          >
            নতুন একাউন্ট
          </Link>
        </div>
      </div>
    );
  }

  // Wishlisted products
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  // All purchased download files combined
  const allDownloads = orders.flatMap(o => o.downloadFiles);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#626262] mb-6" aria-label="ব্রেডক্রাম্ব">
        <Link to="/" className="hover:text-[#e2136e]">হোম</Link>
        <span>/</span>
        <span className="text-[#0a0a0a] font-semibold">আমার একাউন্ট</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Menu */}
        <aside className="lg:col-span-4 bg-white rounded-[10px] p-6 border border-[#e5e5e5] shadow-xs space-y-6">
          {/* User Profile Card Header */}
          <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
            <div className="w-14 h-14 rounded-full bg-[#ffdeee] text-[#e2136e] flex items-center justify-center font-black text-xl shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <h3 className="font-extrabold text-base text-[#0a0a0a] line-clamp-1">
                {currentUser.name}
              </h3>
              <p className="text-xs text-[#626262] line-clamp-1">{currentUser.email}</p>
              <span className="inline-block bg-[#ddf1f6] text-[#0084a2] text-[10px] font-bold px-2 py-0.5 rounded-full mt-1">
                {currentUser.classLevel}
              </span>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex flex-col gap-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setTab('orders')}
              className={`flex items-center justify-between p-3 rounded-[8px] transition-colors cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#ffdeee] text-[#e2136e] font-bold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={16} />
                <span>অর্ডার ইতিহাস</span>
              </div>
              <span className="bg-white/80 px-2 py-0.5 rounded-full text-[10px]">
                {toBengaliNumber(orders.length)}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setTab('downloads')}
              className={`flex items-center justify-between p-3 rounded-[8px] transition-colors cursor-pointer ${
                activeTab === 'downloads'
                  ? 'bg-[#ffdeee] text-[#e2136e] font-bold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Download size={16} />
                <span>আমার ডাউনলোডসমূহ</span>
              </div>
              <span className="bg-white/80 px-2 py-0.5 rounded-full text-[10px]">
                {toBengaliNumber(allDownloads.length)}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setTab('wishlist')}
              className={`flex items-center justify-between p-3 rounded-[8px] transition-colors cursor-pointer ${
                activeTab === 'wishlist'
                  ? 'bg-[#ffdeee] text-[#e2136e] font-bold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Heart size={16} />
                <span>উইশলিস্ট</span>
              </div>
              <span className="bg-white/80 px-2 py-0.5 rounded-full text-[10px]">
                {toBengaliNumber(wishlist.length)}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setTab('profile')}
              className={`flex items-center justify-between p-3 rounded-[8px] transition-colors cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-[#ffdeee] text-[#e2136e] font-bold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <User size={16} />
                <span>প্রোফাইল সেটিংস</span>
              </div>
            </button>

            <div className="pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={logoutUser}
                className="w-full flex items-center gap-2.5 p-3 rounded-[8px] text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                <span>লগআউট করুন</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Right Tab Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tab 1: Orders History */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="bg-white rounded-[10px] p-5 border border-[#e5e5e5] shadow-xs flex items-center justify-between">
                <h2 className="text-base font-extrabold text-[#0a0a0a]">
                  অর্ডার হিস্ট্রি ({toBengaliNumber(orders.length)} টি)
                </h2>
                <span className="text-xs text-[#626262]">সর্বশেষ আপডেট</span>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div
                      key={order.id}
                      className="bg-white rounded-[10px] p-5 border border-[#e5e5e5] shadow-xs space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                        <div className="flex items-center gap-3">
                          <Package size={18} className="text-[#e2136e]" />
                          <div>
                            <span className="text-xs font-bold text-[#0a0a0a]">
                              অর্ডার: <strong className="font-mono text-[#e2136e]">{order.id}</strong>
                            </span>
                            <span className="text-[11px] text-gray-400 block sm:inline sm:ml-2">
                              {order.date}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                            {order.status}
                          </span>
                          <span className="text-xs font-extrabold text-[#0a0a0a]">
                            {formatPrice(order.total)}
                          </span>
                        </div>
                      </div>

                      {/* Items & Working Download Buttons */}
                      <div className="space-y-2.5">
                        {order.downloadFiles.map((file, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-50 p-3 rounded-[8px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                          >
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-[#0a0a0a] line-clamp-1">
                                {file.productTitle}
                              </h4>
                              <span className="text-[11px] text-[#626262]">
                                ফাইল: {file.fileName} • সাইজ: {file.fileSize}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDownloadFile(file.fileName, file.productTitle)}
                              className="bg-[#00a544] hover:bg-[#028b3a] active:scale-95 text-white font-bold text-xs px-4 py-2 rounded-[6px] flex items-center gap-1.5 transition-all shadow-xs shrink-0 cursor-pointer"
                            >
                              <Download size={13} />
                              <span>ডাউনলোড</span>
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="text-[11px] text-[#626262] flex items-center justify-between pt-2">
                        <span>পেমেন্ট: {order.paymentMethod.toUpperCase()} (TrxID: {order.transactionId})</span>
                        <Link
                          to={`/order-success/${order.id}`}
                          className="text-[#e2136e] font-bold hover:underline"
                        >
                          রিসিট দেখুন →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[10px] p-12 text-center border border-[#e5e5e5]">
                  <p className="text-xs text-[#626262] mb-4">আপনার কোনো পূর্ববর্তী অর্ডার নেই।</p>
                  <Link
                    to="/shop"
                    className="bg-[#e2136e] text-white text-xs font-bold px-5 py-2.5 rounded-[8px]"
                  >
                    বই কিনুন
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Downloads */}
          {activeTab === 'downloads' && (
            <div className="bg-white rounded-[10px] p-6 border border-[#e5e5e5] shadow-xs space-y-4">
              <h2 className="text-base font-extrabold text-[#0a0a0a] border-b border-gray-100 pb-3">
                সকল ডাউনলোডযোগ্য ফাইল ({toBengaliNumber(allDownloads.length)} টি)
              </h2>

              {allDownloads.length > 0 ? (
                <div className="space-y-3">
                  {allDownloads.map((file, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 p-4 rounded-[12px] border border-slate-200 flex items-center justify-between gap-4"
                    >
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#0a0a0a]">
                          {file.productTitle}
                        </h4>
                        <span className="text-[11px] text-[#626262]">
                          ফরম্যাট: {file.format} • সাইজ: {file.fileSize}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDownloadFile(file.fileName, file.productTitle)}
                        className="bg-[#00a544] hover:bg-[#028b3a] text-white text-xs font-bold px-4 py-2 rounded-[8px] flex items-center gap-1.5 transition-colors shrink-0 shadow-xs cursor-pointer"
                      >
                        <Download size={14} />
                        <span>ডাউনলোড PDF</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 py-6 text-center">
                  কোনো ফাইল পাওয়া যায়নি। বই কেনার পর এখানে স্থায়ী লিংক যুক্ত হবে।
                </p>
              )}
            </div>
          )}

          {/* Tab 3: Wishlist */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <div className="bg-white rounded-[10px] p-5 border border-[#e5e5e5] shadow-xs flex items-center justify-between">
                <h2 className="text-base font-extrabold text-[#0a0a0a]">
                  আপনার উইশলিস্ট ({toBengaliNumber(wishlistedProducts.length)} টি)
                </h2>
                <Link to="/shop" className="text-xs font-bold text-[#e2136e] hover:underline">
                  আরও প্রোডাক্ট যোগ করুন
                </Link>
              </div>

              {wishlistedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {wishlistedProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[10px] p-12 text-center border border-[#e5e5e5]">
                  <Heart size={32} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-xs text-[#626262] mb-4">আপনার উইশলিস্ট বর্তমানে খালি।</p>
                  <Link
                    to="/shop"
                    className="bg-[#e2136e] text-white text-xs font-bold px-5 py-2.5 rounded-[8px]"
                  >
                    বই সংরক্ষণ করুন
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Profile Settings */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-[10px] p-6 border border-[#e5e5e5] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h2 className="text-base font-extrabold text-[#0a0a0a]">প্রোফাইল বিবরণী</h2>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs text-[#e2136e] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 size={13} />
                  <span>{isEditing ? 'বাতিল' : 'সম্পাদনা করুন'}</span>
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">পূর্ণ নাম</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-[#f5f5f5] text-xs p-2.5 rounded-[8px] border border-gray-300 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">মোবাইল নম্বর</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-[#f5f5f5] text-xs p-2.5 rounded-[8px] border border-gray-300 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">শ্রেণি / বিভাগ</label>
                    <select
                      value={classLevel}
                      onChange={e => setClassLevel(e.target.value)}
                      className="w-full bg-[#f5f5f5] text-xs p-2.5 rounded-[8px] border border-gray-300 focus:outline-none"
                    >
                      <option value="class-1">ক্লাস ১</option>
                      <option value="class-2">ক্লাস ২</option>
                      <option value="class-3">ক্লাস ৩</option>
                      <option value="class-4">ক্লাস ৪</option>
                      <option value="class-5">ক্লাস ৫ / বৃত্তি</option>
                      <option value="class-6">ক্লাস ৬</option>
                      <option value="class-7">ক্লাস ৭</option>
                      <option value="class-8">ক্লাস ৮</option>
                      <option value="class-9">ক্লাস ৯</option>
                      <option value="class-10">ক্লাস ১০ / এসএসসি</option>
                      <option value="hsc-1st-year">HSC ১ম বর্ষ</option>
                      <option value="hsc-2nd-year">HSC ২য় বর্ষ</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#e2136e] text-white text-xs font-bold px-6 py-2.5 rounded-[8px] shadow-xs cursor-pointer"
                  >
                    পরিবর্তন সংরক্ষণ করুন
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-gray-50 rounded-[8px]">
                    <span className="text-[#626262] block mb-0.5">নাম</span>
                    <span className="font-bold text-[#0a0a0a]">{currentUser.name}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-[8px]">
                    <span className="text-[#626262] block mb-0.5">ইমেইল</span>
                    <span className="font-bold text-[#0a0a0a]">{currentUser.email}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-[8px]">
                    <span className="text-[#626262] block mb-0.5">মোবাইল</span>
                    <span className="font-bold text-[#0a0a0a]">{currentUser.phone}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-[8px]">
                    <span className="text-[#626262] block mb-0.5">যোগদানের তারিখ</span>
                    <span className="font-bold text-[#0a0a0a]">{currentUser.joinedDate}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
