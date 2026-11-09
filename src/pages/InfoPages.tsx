import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  Download,
  BookOpen,
  Award,
  Users,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { siteConfig } from '../config';
import { faqsList } from '../data/siteContent';
import { useShop } from '../context/ShopContext';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-[#e2136e] font-bold text-xs uppercase tracking-wider bg-[#ffdeee] px-3 py-1 rounded-full">
          আমাদের গল্প
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a0a0a] mt-2 mb-3">
          {siteConfig.siteName} — পড়াশোনা হোক সহজ ও আনন্দদায়ক
        </h1>
        <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
          বাংলাদেশের স্কুল ও কলেজ শিক্ষার্থীদের জন্য মানসম্মত, নির্ভুল এবং সময় সাশ্রয়ী ডিজিটাল স্টাডি মেটেরিয়ালস পৌঁছে দেওয়ার দৃঢ় প্রত্যয়ে আমাদের যাত্রা।
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[10px] border border-[#e5e5e5] shadow-xs">
          <div className="w-12 h-12 rounded-[10px] bg-[#ffdeee] text-[#e2136e] flex items-center justify-center mb-4 font-bold">
            <BookOpen size={24} />
          </div>
          <h3 className="font-extrabold text-base text-[#0a0a0a] mb-2">আমাদের লক্ষ্য</h3>
          <p className="text-xs text-[#626262] leading-relaxed">
            মুখস্থ বিদ্যার গণ্ডি পেরিয়ে প্রতিটি সূত্রের বাস্তব প্রয়োগ ও ভিজ্যুয়াল ব্যাখ্যার মাধ্যমে শিক্ষার্থীদের আত্মবিশ্বাসী করে তোলা।
          </p>
        </div>

        <div className="bg-white p-6 rounded-[10px] border border-[#e5e5e5] shadow-xs">
          <div className="w-12 h-12 rounded-[10px] bg-[#ddf1f6] text-[#0084a2] flex items-center justify-center mb-4 font-bold">
            <Award size={24} />
          </div>
          <h3 className="font-extrabold text-base text-[#0a0a0a] mb-2">মান নিয়ন্ত্রণ</h3>
          <p className="text-xs text-[#626262] leading-relaxed">
            শীর্ষ শিক্ষা প্রতিষ্ঠানের প্রাক্তন ও অভিজ্ঞ শিক্ষকদের যাচাই-বাছাইয়ের পর প্রতিটি নোটস ও মডেল টেস্ট প্রস্তুত করা হয়।
          </p>
        </div>

        <div className="bg-white p-6 rounded-[10px] border border-[#e5e5e5] shadow-xs">
          <div className="w-12 h-12 rounded-[10px] bg-[#fef4ea] text-[#f9902e] flex items-center justify-center mb-4 font-bold">
            <Users size={24} />
          </div>
          <h3 className="font-extrabold text-base text-[#0a0a0a] mb-2">ডিজিটাল স্বাচ্ছন্দ্য</h3>
          <p className="text-xs text-[#626262] leading-relaxed">
            কোনো প্রকার কুরিয়ার ঝামেলা ছাড়া পেমেন্টের সেকেন্ডের মধ্যেই যেকোনো ডিভাইসে সরাসরি ফাইল ডাউনলোড সুবিধা।
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="bg-white rounded-[10px] p-8 border border-[#e5e5e5] shadow-xs grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <div className="text-2xl sm:text-3xl font-black text-[#e2136e]">{siteConfig.studentCount}</div>
          <div className="text-xs text-[#626262] mt-1">সক্রিয় শিক্ষার্থী</div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-[#0084a2]">{siteConfig.resourceCount}</div>
          <div className="text-xs text-[#626262] mt-1">ডিজিটাল নোটস ও শিট</div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-[#f9902e]">৬৪ জেলা</div>
          <div className="text-xs text-[#626262] mt-1">দেশজুড়ে শিক্ষার্থী বিস্তার</div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-[#00a544]">{siteConfig.satisfactionRate}</div>
          <div className="text-xs text-[#626262] mt-1">পজিটিভ সন্তুষ্টি</div>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast('আপনার বার্তা সফলভাবে পাঠানো হয়েছে! খুব দ্রুত আমাদের প্রতিনিধি যোগাযোগ করবেন।');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[#e2136e] font-bold text-xs uppercase tracking-wider bg-[#ffdeee] px-3 py-1 rounded-full">
          সরাসরি সাহায্য
        </span>
        <h1 className="text-3xl font-extrabold text-[#0a0a0a] mt-2 mb-2">যোগাযোগ ও কাস্টমার কেয়ার</h1>
        <p className="text-xs text-[#626262]">
          যে কোনো জিজ্ঞাসা, মতামত বা বই সংক্রান্ত প্রয়োজনে আমাদের সাথে সরাসরি যোগাযোগ করুন
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Contact Info & Map placeholder */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[10px] p-6 border border-[#e5e5e5] shadow-xs space-y-4">
            <h3 className="font-bold text-base text-[#0a0a0a] border-b pb-3">আমাদের যোগাযোগের ঠিকানা</h3>

            <div className="space-y-3 text-xs text-[#0a0a0a]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ffdeee] text-[#e2136e] flex items-center justify-center shrink-0">
                  <Phone size={15} />
                </div>
                <div>
                  <span className="text-[#626262] block">হটলাইন / হোয়াটসঅ্যাপ:</span>
                  <a href={`tel:${siteConfig.contact.phone}`} className="font-bold hover:text-[#e2136e]">
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ffdeee] text-[#e2136e] flex items-center justify-center shrink-0">
                  <Mail size={15} />
                </div>
                <div>
                  <span className="text-[#626262] block">ইমেইল:</span>
                  <a href={`mailto:${siteConfig.contact.email}`} className="font-bold hover:text-[#e2136e]">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ffdeee] text-[#e2136e] flex items-center justify-center shrink-0">
                  <MapPin size={15} />
                </div>
                <div>
                  <span className="text-[#626262] block">অফিস ঠিকানা:</span>
                  <span className="font-bold">{siteConfig.contact.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ffdeee] text-[#e2136e] flex items-center justify-center shrink-0">
                  <Clock size={15} />
                </div>
                <div>
                  <span className="text-[#626262] block">সাপোর্ট সময়:</span>
                  <span className="font-bold">{siteConfig.contact.hours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual Placeholder */}
          <div className="bg-white rounded-[10px] p-4 border border-[#e5e5e5] shadow-xs overflow-hidden">
            <div className="text-xs font-bold text-[#0a0a0a] mb-2 flex items-center gap-1.5">
              <MapPin size={14} className="text-[#e2136e]" />
              <span>লোকেশন ম্যাপ (ধানমন্ডি, ঢাকা)</span>
            </div>
            <div className="w-full h-44 bg-[#ddf1f6] rounded-[8px] flex flex-col items-center justify-center text-center p-4 border border-[#0084a2]/20">
              <div className="w-10 h-10 rounded-full bg-[#0084a2] text-white flex items-center justify-center mb-2 animate-bounce">
                <MapPin size={20} />
              </div>
              <span className="text-xs font-bold text-[#0084a2]">
                {siteConfig.siteName} ডিজিটাল হেডকোয়ার্টার
              </span>
              <span className="text-[11px] text-gray-600 mt-1">
                ধানমন্ডি, ঢাকা - ১২০৫, বাংলাদেশ
              </span>
            </div>
          </div>
        </div>

        {/* Right: Working Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-[10px] p-6 sm:p-8 border border-[#e5e5e5] shadow-xs">
            <h3 className="font-extrabold text-base text-[#0a0a0a] mb-2">আমাদের বার্তা পাঠান</h3>
            <p className="text-xs text-[#626262] mb-6">
              যেকোনো বিষয়ে আপনার প্রশ্ন বা মন্তব্য লিখে সাবমিট করুন। আমরা ২৪ ঘণ্টার মধ্যে উত্তর দেব।
            </p>

            {sent ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-[10px] text-center space-y-2">
                <CheckCircle2 size={36} className="text-[#00a544] mx-auto" />
                <h4 className="font-bold text-sm">বার্তাটি সফলভাবে গৃহীত হয়েছে!</h4>
                <p className="text-xs text-green-700">
                  ধন্যবাদ {name}! আমাদের সাপোর্ট টিম খুব দ্রুত আপনার সাথে যোগাযোগ করবে।
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setName('');
                    setPhone('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="mt-2 text-xs font-bold text-[#e2136e] hover:underline"
                >
                  আরেকটি বার্তা পাঠান
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0a0a0a] mb-1">আপনার নাম *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="নাম লিখুন"
                      className="w-full bg-[#f5f5f5] text-xs p-3 rounded-[8px] border border-gray-200 focus:outline-none focus:border-[#e2136e]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0a0a0a] mb-1">মোবাইল নম্বর *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="01711223344"
                      className="w-full bg-[#f5f5f5] text-xs p-3 rounded-[8px] border border-gray-200 focus:outline-none focus:border-[#e2136e]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0a0a0a] mb-1">ইমেইল এড্রেস *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full bg-[#f5f5f5] text-xs p-3 rounded-[8px] border border-gray-200 focus:outline-none focus:border-[#e2136e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0a0a0a] mb-1">আপনার বার্তা / প্রশ্ন *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="কীভাবে আমরা আপনাকে সাহায্য করতে পারি?"
                    className="w-full bg-[#f5f5f5] text-xs p-3 rounded-[8px] border border-gray-200 focus:outline-none focus:border-[#e2136e]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#e2136e] hover:bg-[#c2105f] text-white font-bold text-xs px-8 py-3 rounded-[8px] transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Send size={14} />
                  <span>বার্তা পাঠিয়ে দিন</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FAQPage: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[#e2136e] font-bold text-xs uppercase tracking-wider bg-[#ffdeee] px-3 py-1 rounded-full">
          সহায়তা কেন্দ্র
        </span>
        <h1 className="text-3xl font-extrabold text-[#0a0a0a] mt-2 mb-2">
          সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
        </h1>
        <p className="text-xs text-[#626262]">
          ডিজিটাল প্রোডাক্ট অর্ডার, ডাউনলোড ও ফাইল ফরম্যাট সম্পর্কিত সকল তথ্য
        </p>
      </div>

      <div className="space-y-3">
        {faqsList.map(faq => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white rounded-[10px] border border-[#e5e5e5] overflow-hidden shadow-xs transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full p-4 sm:p-5 text-left font-bold text-sm text-[#0a0a0a] flex items-center justify-between gap-4 hover:text-[#e2136e] transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <span className="text-[#e2136e] shrink-0">
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-[#626262] leading-relaxed border-t border-gray-100 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 p-6 bg-[#ffdeee] rounded-[10px] border border-[#f6b8d3] text-center max-w-xl mx-auto">
        <h4 className="font-bold text-sm text-[#0a0a0a] mb-1">আপনার উত্তরটি খুঁজে পাননি?</h4>
        <p className="text-xs text-[#626262] mb-4">আমাদের সাপোর্ট টিম সর্বদা আপনার সহযোগিতায় নিয়োজিত রয়েছে।</p>
        <Link
          to="/contact"
          className="bg-[#e2136e] hover:bg-[#c2105f] text-white text-xs font-bold px-6 py-2.5 rounded-[8px] inline-flex items-center gap-1.5"
        >
          <span>যোগাযোগ করুন</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export const HowToBuyPage: React.FC = () => {
  const steps = [
    {
      num: '১',
      title: 'প্রোডাক্ট নির্বাচন করুন',
      desc: 'হোম বা শপ পেজ থেকে আপনার ক্লাসের নোটস, প্ল্যানার বা মডেল টেস্ট বেছে নিয়ে "কার্টে যোগ করুন" অথবা সরাসরি "এখনই কিনুন" বাটনে ক্লিক করুন।'
    },
    {
      num: '২',
      title: 'চেকআউটে তথ্য পূরণ করুন',
      desc: 'চেকআউট পেজে আপনার নাম, মোবাইল নম্বর এবং সঠিক ইমেইল এড্রেস লিখুন। ডিসকাউন্ট কুপন থাকলে তা প্রয়োগ করুন।'
    },
    {
      num: '৩',
      title: 'পেমেন্ট সম্পন্ন করুন',
      desc: 'বিকাশ, নগদ বা রকেটের মাধ্যমে প্রদর্শিত নম্বরে সেন্ড মানি/পেমেন্ট করুন এবং প্রাপ্ত ট্রানজেকশন আইডি (TrxID) টি বক্সে লিখে সাবমিট করুন।'
    },
    {
      num: '৪',
      title: 'তাত্ক্ষণিক ফাইল ডাউনলোড',
      desc: 'সাবমিট করার সাথে সাথেই আপনি সরাসরি ডাউনলোড পেজে যাবেন। যেকোনো সময় My Account সেকশনেও আপনার ক্রয়কৃত ফাইল সংরক্ষিত থাকবে।'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-[#0084a2] font-bold text-xs uppercase tracking-wider bg-[#ddf1f6] px-3 py-1 rounded-full">
          সহজ গাইড
        </span>
        <h1 className="text-3xl font-extrabold text-[#0a0a0a] mt-2 mb-2">কীভাবে কিনবেন ও ডাউনলোড করবেন?</h1>
        <p className="text-xs text-[#626262]">
          মাত্র ৪টি সহজ ধাপে আপনার কাঙ্ক্ষিত ডিজিটাল স্টাডি মেটেরিয়াল সংগ্রহ করার নির্দেশিকা
        </p>
      </div>

      <div className="space-y-4">
        {steps.map(step => (
          <div
            key={step.num}
            className="bg-white rounded-[10px] p-6 border border-[#e5e5e5] shadow-xs flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-[#ffdeee] text-[#e2136e] font-black text-lg flex items-center justify-center shrink-0">
              {step.num}
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#0a0a0a] mb-1">{step.title}</h3>
              <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <Link
          to="/shop"
          className="bg-[#e2136e] hover:bg-[#c2105f] text-white text-xs sm:text-sm font-bold px-8 py-3 rounded-[10px] inline-flex items-center gap-2 shadow-md"
        >
          <span>এখনই বই কেনা শুরু করুন</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export const FreeSamplePage: React.FC = () => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [classChoice, setClassChoice] = useState('class-10');
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setUnlocked(true);
      showToast('স্যাম্পল প্যাক আনলক হয়েছে! নিচের বাটন থেকে ডাউনলোড করুন।', 'success');
    }
  };

  const handleDownload = () => {
    const content = `=====================================================
ডিজিটাল ফ্রি স্টাডি স্যাম্পল প্যাক
শ্রেণি: ${classChoice}
ইমেইল: ${email}
=====================================================

এতে অন্তর্ভুক্ত:
১. গণিতের ১০টি গোল্ডেন শর্টকাট সূত্র
২. পদার্থবিজ্ঞানের রঙিন ডায়াগ্রাম নমুনা
৩. সাপ্তাহিক রিভিশন প্ল্যানার শীট

সম্পূর্ণ বই ও নোটস পেতে ভিজিট করুন আমাদের ওয়েবসাইট!`;

    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Free_Study_Sample_${classChoice}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('ফ্রি স্যাম্পল ডাউনলোড সম্পন্ন হয়েছে!', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-[10px] p-8 sm:p-10 border border-[#e5e5e5] shadow-xs text-center">
        <div className="w-16 h-16 rounded-full bg-[#fef4ea] text-[#f9902e] flex items-center justify-center mx-auto mb-4">
          <Download size={32} />
        </div>
        <span className="bg-[#ffdeee] text-[#e2136e] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          ১০০% ফ্রি স্যাম্পল
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a0a0a] mt-3 mb-2">
          কেনার আগে আমাদের নোটসের মান পরখ করে নিন
        </h1>
        <p className="text-xs sm:text-sm text-[#626262] max-w-lg mx-auto mb-8">
          আপনার ইমেইল দিয়ে যেকোনো শ্রেণির ফ্রি স্যাম্পল ও শর্টকাট গাইড আনলক করুন সম্পূর্ণ বিনামূল্যে।
        </p>

        {unlocked ? (
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-[12px] space-y-4 animate-in zoom-in-95 duration-200">
            <CheckCircle2 size={36} className="text-[#00a544] mx-auto" />
            <h3 className="font-extrabold text-base text-[#0a0a0a]">
              আপনার ফ্রি স্যাম্পল প্যাক প্রস্তুত!
            </h3>
            <p className="text-xs text-[#626262]">
              নির্বাচিত শ্রেণি: <strong>{classChoice}</strong> • ইমেইল: {email}
            </p>
            <button
              type="button"
              onClick={handleDownload}
              className="bg-[#00a544] hover:bg-[#028b3a] text-white font-extrabold text-xs sm:text-sm px-8 py-3 rounded-[8px] inline-flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Download size={16} />
              <span>সরাসরি ডাউনলোড করুন (PDF)</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleUnlock} className="max-w-md mx-auto space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-[#0a0a0a] mb-1">আপনার ইমেইল এড্রেস</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full bg-[#f5f5f5] text-xs p-3 rounded-[8px] border border-gray-200 focus:outline-none focus:border-[#e2136e]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0a0a0a] mb-1">আপনার শ্রেণি নির্বাচন করুন</label>
              <select
                value={classChoice}
                onChange={e => setClassChoice(e.target.value)}
                className="w-full bg-[#f5f5f5] text-xs p-3 rounded-[8px] border border-gray-200 focus:outline-none focus:border-[#e2136e]"
              >
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
              className="w-full bg-[#f9902e] hover:bg-[#f88114] text-[#0a0a0a] font-black text-xs sm:text-sm py-3.5 rounded-[8px] shadow-sm cursor-pointer"
            >
              ফ্রি স্যাম্পল আনলক করুন
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
