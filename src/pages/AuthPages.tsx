import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const LoginPage: React.FC = () => {
  const { loginUser } = useShop();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('ইমেইল ও পাসওয়ার্ড প্রদান করুন');
      return;
    }
    loginUser(email, password);
    navigate('/my-account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-[10px] p-8 border border-[#e5e5e5] shadow-xs">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#ffdeee] text-[#e2136e] flex items-center justify-center mx-auto mb-3">
            <Lock size={22} />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0a0a0a]">একাউন্টে লগইন করুন</h1>
          <p className="text-xs text-[#626262] mt-1">
            আপনার সংরক্ষিত ডিজিটাল ফাইলসমূহ অ্যাক্সেস করতে লগইন করুন
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-3 rounded-[8px] mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0a0a0a] mb-1">ইমেইল এড্রেস</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full bg-[#f5f5f5] text-xs p-3 pl-9 rounded-[8px] border border-[#e5e5e5] focus:outline-none focus:border-[#e2136e]"
              />
              <Mail size={15} className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-[#0a0a0a]">পাসওয়ার্ড</label>
              <Link to="/forgot-password" className="text-[11px] text-[#e2136e] hover:underline">
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#f5f5f5] text-xs p-3 pl-9 rounded-[8px] border border-[#e5e5e5] focus:outline-none focus:border-[#e2136e]"
              />
              <Lock size={15} className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#e2136e] hover:bg-[#c2105f] text-white font-bold text-xs py-3 rounded-[8px] transition-colors shadow-xs cursor-pointer"
          >
            লগইন করুন
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-[#626262]">
          একাউন্ট নেই?{' '}
          <Link to="/register" className="text-[#e2136e] font-bold hover:underline">
            নতুন একাউন্ট তৈরি করুন
          </Link>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const { registerUser } = useShop();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [classLevel, setClassLevel] = useState('hsc-1st-year');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      setError('সকল তথ্য পূরণ করুন');
      return;
    }
    registerUser({ name, email, phone, classLevel });
    navigate('/my-account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-[10px] p-8 border border-[#e5e5e5] shadow-xs">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#ffdeee] text-[#e2136e] flex items-center justify-center mx-auto mb-3">
            <User size={22} />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0a0a0a]">নতুন একাউন্ট নিবন্ধন</h1>
          <p className="text-xs text-[#626262] mt-1">
            ডিজিটাল বইয়ের আজীবন এক্সেস পেতে একাউন্ট খুলুন
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-3 rounded-[8px] mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-[#0a0a0a] mb-1">পূর্ণ নাম</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="যেমন: আসিফ ইকবাল"
              className="w-full bg-[#f5f5f5] text-xs p-2.5 rounded-[8px] border border-[#e5e5e5] focus:outline-none focus:border-[#e2136e]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0a0a0a] mb-1">ইমেইল এড্রেস</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="asif@gmail.com"
              className="w-full bg-[#f5f5f5] text-xs p-2.5 rounded-[8px] border border-[#e5e5e5] focus:outline-none focus:border-[#e2136e]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0a0a0a] mb-1">মোবাইল নম্বর</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="01700000000"
              className="w-full bg-[#f5f5f5] text-xs p-2.5 rounded-[8px] border border-[#e5e5e5] focus:outline-none focus:border-[#e2136e]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0a0a0a] mb-1">শ্রেণি / বিভাগ</label>
            <select
              value={classLevel}
              onChange={e => setClassLevel(e.target.value)}
              className="w-full bg-[#f5f5f5] text-xs p-2.5 rounded-[8px] border border-[#e5e5e5] focus:outline-none focus:border-[#e2136e]"
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

          <div>
            <label className="block text-xs font-bold text-[#0a0a0a] mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৬ অক্ষর"
              className="w-full bg-[#f5f5f5] text-xs p-2.5 rounded-[8px] border border-[#e5e5e5] focus:outline-none focus:border-[#e2136e]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#e2136e] hover:bg-[#c2105f] text-white font-bold text-xs py-3 rounded-[8px] transition-colors shadow-xs cursor-pointer mt-2"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-[#626262]">
          ইতিমধ্যে একাউন্ট আছে?{' '}
          <Link to="/login" className="text-[#e2136e] font-bold hover:underline">
            লগইন করুন
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ForgotPasswordPage: React.FC = () => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      showToast('পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে পাঠানো হয়েছে।');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-[10px] p-8 border border-[#e5e5e5] shadow-xs text-center">
        <div className="w-12 h-12 rounded-full bg-[#ffdeee] text-[#e2136e] flex items-center justify-center mx-auto mb-3">
          <Mail size={22} />
        </div>
        <h1 className="text-2xl font-extrabold text-[#0a0a0a]">পাসওয়ার্ড রিসেট</h1>
        <p className="text-xs text-[#626262] mt-1 mb-6">
          আপনার একাউন্টের ইমেইল ঠিকানা প্রদান করুন, আমরা একটি রিকভারি কোড পাঠাবো।
        </p>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-[8px] text-xs text-left space-y-2">
            <div className="font-bold flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-[#00a544]" />
              <span>ইমেইল পাঠানো সম্পন্ন!</span>
            </div>
            <p>
              <strong>{email}</strong> ঠিকানায় পাসওয়ার্ড পরিবর্তনের নির্দেশনা পাঠানো হয়েছে। ইনবক্স অথবা স্প্যাম ফোল্ডার চেক করুন।
            </p>
            <div className="pt-2">
              <Link to="/login" className="text-[#e2136e] font-bold hover:underline">
                লগইন পেজে ফিরে যান →
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-[#0a0a0a] mb-1">ইমেইল এড্রেস</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full bg-[#f5f5f5] text-xs p-3 rounded-[8px] border border-[#e5e5e5] focus:outline-none focus:border-[#e2136e]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#e2136e] hover:bg-[#c2105f] text-white font-bold text-xs py-3 rounded-[8px] transition-colors shadow-xs cursor-pointer"
            >
              রিসেট লিংক পাঠান
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-[#626262]">
          মনে পড়েছে?{' '}
          <Link to="/login" className="text-[#e2136e] font-bold hover:underline">
            লগইন করুন
          </Link>
        </div>
      </div>
    </div>
  );
};
