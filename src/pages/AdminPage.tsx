import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Lock,
  Plus,
  Trash2,
  Edit2,
  Package,
  ShoppingBag,
  Bell,
  RotateCcw,
  CheckCircle2,
  Eye,
  LogOut,
  Save,
  X,
  ExternalLink
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { DigitalProduct, classesList, categoriesList } from '../data/products';
import { siteConfig } from '../config';
import { formatPrice, toBengaliNumber } from '../utils/shopLogic';

export const AdminPage: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    orders,
    updateOrderStatus,
    announcement,
    updateAnnouncement,
    showToast
  } = useShop();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('bd_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'banner'>('products');

  // Edit / Add Product Modal State
  const [editingProduct, setEditingProduct] = useState<DigitalProduct | null>(null);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

  // Announcement edit state
  const [tickerText, setTickerText] = useState(announcement);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === siteConfig.adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('bd_admin_auth', 'true');
      setAuthError('');
      showToast('এডমিন প্যানেলে সফলভাবে লগইন করেছেন!');
    } else {
      setAuthError('ভুল পাসওয়ার্ড! ডেমো পাসওয়ার্ড: admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('bd_admin_auth');
  };

  // Save product (Add or Edit)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (isNewProductModalOpen) {
      addProduct(editingProduct);
      setIsNewProductModalOpen(false);
    } else {
      updateProduct(editingProduct);
    }
    setEditingProduct(null);
  };

  const openNewProductModal = () => {
    const newProd: DigitalProduct = {
      id: 'prod-' + Date.now(),
      slug: 'new-study-product-' + Date.now(),
      title: 'নতুন ডিজিটাল স্টাডি নোটস',
      classLevel: 'class-10',
      classLabel: 'ক্লাস ১০',
      section: 'school',
      category: 'notes',
      categoryLabel: 'সাবজেক্ট নোটস',
      subject: 'সাধারণ গণিত',
      price: 150,
      originalPrice: 300,
      isFree: false,
      isPopular: false,
      isNew: true,
      rating: 5.0,
      reviewCount: 1,
      salesCount: 10,
      badge: 'নতুন',
      shortDescription: 'নতুন বিষয়ের অধ্যায়ভিত্তিক কনসেপ্ট ও হ্যান্ডনোটস।',
      description: 'সম্পূর্ণ রঙিন ডিজিটাল ফাইল যা পরীক্ষার প্রস্তুতিতে শতভাগ সহায়ক।',
      format: 'ডিজিটাল PDF',
      pageCount: 120,
      fileSize: '15.0 MB',
      features: ['রঙিন ডায়াগ্রাম', 'বোর্ড প্রশ্ন সমাধান'],
      tableOfContents: ['অধ্যায় ১: সূচনা ও সূত্রাবলি', 'অধ্যায় ২: মূল অনুশীলন'],
      samplePreviewText: 'নমুনা প্রিভিউ পৃষ্ঠা।',
      themeColor: '#e2136e',
      iconType: 'math'
    };
    setEditingProduct(newProd);
    setIsNewProductModalOpen(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white rounded-[10px] p-8 border border-[#e5e5e5] shadow-xs text-center">
          <div className="w-14 h-14 rounded-full bg-[#ffdeee] text-[#e2136e] flex items-center justify-center mx-auto mb-4">
            <Lock size={26} />
          </div>
          <h1 className="text-xl font-extrabold text-[#0a0a0a]">এডমিন কন্ট্রোল প্যানেল</h1>
          <p className="text-xs text-[#626262] mt-1 mb-6">
            পাসওয়ার্ড সুরক্ষিত এডমিন ড্যাশবোর্ড (পাসওয়ার্ড কনফিগে সংরক্ষিত)
          </p>

          {authError && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-[8px] mb-4">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">এডমিন পাসওয়ার্ড</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="ডিফল্ট পাসওয়ার্ড: admin123"
                className="w-full bg-[#f5f5f5] text-xs p-3 rounded-[8px] border border-gray-200 focus:outline-none focus:border-[#e2136e]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#e2136e] hover:bg-[#c2105f] text-white font-bold text-xs py-3 rounded-[8px] shadow-xs cursor-pointer"
            >
              প্রবেশ করুন
            </button>
          </form>

          <div className="mt-4 pt-3 border-t text-[11px] text-gray-500">
            ডেমো পাসওয়ার্ড: <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">admin123</code>
          </div>
        </div>
      </div>
    );
  }

  // Calculate quick stats
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Admin Header */}
      <div className="bg-white rounded-[10px] p-6 border border-[#e5e5e5] shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#AA0E53] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Super Admin
            </span>
            <span className="text-xs text-[#626262] font-mono">localStorage sync active</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0a0a0a] mt-1">এডমিন ড্যাশবোর্ড</h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            target="_blank"
            className="bg-[#f5f5f5] hover:bg-gray-200 text-[#0a0a0a] text-xs font-bold px-4 py-2 rounded-[8px] flex items-center gap-1.5"
          >
            <span>লাইভ সাইট দেখুন</span>
            <ExternalLink size={13} />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-4 py-2 rounded-[8px] flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut size={13} />
            <span>লগআউট</span>
          </button>
        </div>
      </div>

      {/* Admin Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-[10px] border border-[#e5e5e5] shadow-xs">
          <span className="text-xs text-[#626262]">মোট ডিজিটাল প্রোডাক্টস</span>
          <div className="text-2xl font-black text-[#e2136e] mt-1">
            {toBengaliNumber(products.length)} টি
          </div>
        </div>

        <div className="bg-white p-5 rounded-[10px] border border-[#e5e5e5] shadow-xs">
          <span className="text-xs text-[#626262]">মোট প্রাপ্ত অর্ডার</span>
          <div className="text-2xl font-black text-[#0084a2] mt-1">
            {toBengaliNumber(orders.length)} টি
          </div>
        </div>

        <div className="bg-white p-5 rounded-[10px] border border-[#e5e5e5] shadow-xs">
          <span className="text-xs text-[#626262]">মোট আদায়কৃত রাজস্ব</span>
          <div className="text-2xl font-black text-[#00a544] mt-1">
            ৳ {toBengaliNumber(totalRevenue)}
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-gray-200 mb-6 bg-white rounded-t-[10px] px-4 pt-2">
        <button
          type="button"
          onClick={() => setActiveTab('products')}
          className={`py-3 px-5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'products'
              ? 'border-[#e2136e] text-[#e2136e]'
              : 'border-transparent text-gray-600 hover:text-black'
          }`}
        >
          প্রোডাক্ট তালিকা ({toBengaliNumber(products.length)})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'border-[#e2136e] text-[#e2136e]'
              : 'border-transparent text-gray-600 hover:text-black'
          }`}
        >
          অর্ডারসমূহ ({toBengaliNumber(orders.length)})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('banner')}
          className={`py-3 px-5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'banner'
              ? 'border-[#e2136e] text-[#e2136e]'
              : 'border-transparent text-gray-600 hover:text-black'
          }`}
        >
          ব্যানার ও নোটিস এডিট
        </button>
      </div>

      {/* Tab 1: Product Management */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-[10px] p-6 border border-[#e5e5e5] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="text-base font-extrabold text-[#0a0a0a]">সকল ডিজিটাল স্টাডি প্রোডাক্টস</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetProductsToDefault}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-2 rounded-[8px] flex items-center gap-1.5 cursor-pointer"
                title="ডিফল্ট ২৬টি প্রোডাক্টে রিসেট করুন"
              >
                <RotateCcw size={13} />
                <span>ডিফল্ট রিসেট</span>
              </button>
              <button
                type="button"
                onClick={openNewProductModal}
                className="bg-[#e2136e] hover:bg-[#c2105f] text-white text-xs font-bold px-4 py-2 rounded-[8px] flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus size={14} />
                <span>নতুন প্রোডাক্ট যোগ করুন</span>
              </button>
            </div>
          </div>

          {/* Product Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-gray-100 divide-y divide-gray-100">
              <thead className="bg-gray-50 text-gray-600 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">প্রোডাক্ট নাম</th>
                  <th className="p-3">শ্রেণি</th>
                  <th className="p-3">ক্যাটাগরি</th>
                  <th className="p-3">মূল্য</th>
                  <th className="p-3">বিক্রয়</th>
                  <th className="p-3 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-pink-50/30 transition-colors">
                    <td className="p-3 font-semibold text-[#0a0a0a] max-w-xs truncate">
                      {p.title}
                    </td>
                    <td className="p-3 text-gray-600">{p.classLabel}</td>
                    <td className="p-3 text-gray-600">{p.categoryLabel}</td>
                    <td className="p-3 font-bold text-[#e2136e]">
                      {p.isFree ? '১০০% ফ্রি' : `৳ ${toBengaliNumber(p.price)}`}
                    </td>
                    <td className="p-3 text-gray-500">{toBengaliNumber(p.salesCount)}</td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProduct({ ...p });
                          setIsNewProductModalOpen(false);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="এডিট"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Orders List */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-[10px] p-6 border border-[#e5e5e5] shadow-xs space-y-4">
          <h2 className="text-base font-extrabold text-[#0a0a0a] border-b pb-3">
            সকল অর্ডার ও ট্রানজেকশন ({toBengaliNumber(orders.length)} টি)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-gray-100 divide-y divide-gray-100">
              <thead className="bg-gray-50 text-gray-600 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">অর্ডার আইডি</th>
                  <th className="p-3">গ্রাহক</th>
                  <th className="p-3">তারিখ</th>
                  <th className="p-3">পেমেন্ট মেথড ও TrxID</th>
                  <th className="p-3">মোট টাকা</th>
                  <th className="p-3">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono font-bold text-[#e2136e]">{order.id}</td>
                    <td className="p-3">
                      <div className="font-bold text-[#0a0a0a]">{order.customerName}</div>
                      <div className="text-[10px] text-gray-500">{order.customerPhone}</div>
                    </td>
                    <td className="p-3 text-gray-500">{order.date}</td>
                    <td className="p-3">
                      <span className="font-bold uppercase">{order.paymentMethod}</span>
                      <span className="block font-mono text-[11px] text-gray-600">
                        {order.transactionId}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-[#00a544]">
                      {formatPrice(order.total)}
                    </td>
                    <td className="p-3">
                      <select
                        value={order.status}
                        onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                        className="bg-white border rounded p-1 text-[11px] font-semibold"
                      >
                        <option value="সফল (অনুমোদিত)">সফল (অনুমোদিত)</option>
                        <option value="প্রসেসিং">প্রসেসিং</option>
                        <option value="যাচাই চলছে">যাচাই চলছে</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Announcement & Banner Text */}
      {activeTab === 'banner' && (
        <div className="bg-white rounded-[10px] p-6 border border-[#e5e5e5] shadow-xs space-y-6 max-w-2xl">
          <h2 className="text-base font-extrabold text-[#0a0a0a] border-b pb-3">
            হোমপেজ স্ক্রোলিং অ্যানাউন্সমেন্ট টেক্সট
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                চলমান নোটিস টেক্সট (Ticker Message)
              </label>
              <textarea
                rows={3}
                value={tickerText}
                onChange={e => setTickerText(e.target.value)}
                className="w-full bg-[#f5f5f5] text-xs p-3 rounded-[8px] border border-gray-300 focus:outline-none focus:border-[#e2136e]"
              />
            </div>

            <button
              type="button"
              onClick={() => updateAnnouncement(tickerText)}
              className="bg-[#e2136e] hover:bg-[#c2105f] text-white text-xs font-bold px-6 py-2.5 rounded-[8px] flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Save size={14} />
              <span>পরিবর্তন সংরক্ষণ করুন</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal: Edit / Add Product */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 p-1 rounded hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            <h3 className="font-extrabold text-lg text-[#0a0a0a] mb-4">
              {isNewProductModalOpen ? 'নতুন স্টাডি প্রোডাক্ট যোগ করুন' : 'প্রোডাক্ট সম্পাদনা করুন'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">প্রোডাক্টের নাম *</label>
                <input
                  type="text"
                  required
                  value={editingProduct.title}
                  onChange={e => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border rounded-[6px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">বিক্রয় মূল্য (টাকা) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-gray-50 border rounded-[6px]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">আগের মূল্য (মূল্য ছাড় প্রদর্শনে)</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice}
                    onChange={e => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                    className="w-full p-2.5 bg-gray-50 border rounded-[6px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">শ্রেণি</label>
                  <select
                    value={editingProduct.classLevel}
                    onChange={e => {
                      const selected = classesList.find(c => c.slug === e.target.value);
                      setEditingProduct({
                        ...editingProduct,
                        classLevel: e.target.value as any,
                        classLabel: selected?.name || e.target.value,
                        section: (selected?.section || 'school') as 'school' | 'college'
                      });
                    }}
                    className="w-full p-2.5 bg-gray-50 border rounded-[6px]"
                  >
                    {classesList.map(c => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={editingProduct.category}
                    onChange={e => {
                      const cat = categoriesList.find(c => c.id === e.target.value);
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value as any,
                        categoryLabel: cat?.name || e.target.value
                      });
                    }}
                    className="w-full p-2.5 bg-gray-50 border rounded-[6px]"
                  >
                    {categoriesList.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">সংক্ষিপ্ত বিবরণ</label>
                <textarea
                  rows={2}
                  value={editingProduct.shortDescription}
                  onChange={e => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border rounded-[6px]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border rounded-[8px] font-bold text-gray-600"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#e2136e] text-white font-bold rounded-[8px] shadow-xs"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
