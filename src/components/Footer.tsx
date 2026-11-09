import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  BookOpen,
  ShieldCheck,
  Zap,
  Lock,
  ExternalLink
} from 'lucide-react';
import { siteConfig } from '../config';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#e2136e] text-white pt-12 pb-24 xl:pb-12 mt-16 border-t-4 border-[#AA0E53]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/20">
          {/* Column 1: Brand & Contact Info */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-[10px] bg-white text-[#e2136e] flex items-center justify-center font-black text-2xl shadow-md">
                <BookOpen size={24} />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                {siteConfig.siteName}
              </span>
            </Link>

            <p className="text-xs text-pink-100 leading-relaxed">
              {siteConfig.tagline}। ৬ষ্ঠ থেকে দ্বাদশ শ্রেণির শিক্ষার্থীদের জন্য পরীক্ষায় সেরা ফলাফল নিশ্চিত করার বিশ্বস্ত ডিজিটাল স্টাডি রিসোর্স প্ল্যাটফর্ম।
            </p>

            <div className="flex flex-col gap-2 text-xs text-pink-100 mt-2">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-yellow-300 shrink-0" />
                <span>হটলাইন: {siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-yellow-300 shrink-0" />
                <span>ইমেইল: {siteConfig.contact.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-yellow-300 shrink-0 mt-0.5" />
                <span>ঠিকানা: {siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-yellow-300 shrink-0" />
                <span>সাপোর্ট সময়: {siteConfig.contact.hours}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Policies */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm text-yellow-300 uppercase tracking-wider border-b border-white/20 pb-2">
              পলিসি ও নীতিমালা
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-pink-100">
              <li>
                <Link to="/refund-policy" className="hover:text-white hover:underline transition-colors">
                  রিফান্ড পলিসি (Refund Policy)
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white hover:underline transition-colors">
                  প্রাইভেসি পলিসি (Privacy Policy)
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-white hover:underline transition-colors">
                  টার্মস ও কন্ডিশন (Terms & Conditions)
                </Link>
              </li>
              <li>
                <Link to="/digital-delivery-policy" className="hover:text-white hover:underline transition-colors">
                  ডিজিটাল ডেলিভারি পলিসি (Delivery Policy)
                </Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="hover:text-white hover:underline transition-colors">
                  ক্যান্সেলেশন পলিসি (Cancellation Policy)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support & Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm text-yellow-300 uppercase tracking-wider border-b border-white/20 pb-2">
              গ্রাহক সহায়তা ও নির্দেশিকা
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-pink-100">
              <li>
                <Link to="/contact" className="hover:text-white hover:underline transition-colors">
                  যোগাযোগ ও কাস্টমার কেয়ার
                </Link>
              </li>
              <li>
                <Link to="/teachers-corner" className="hover:text-white hover:underline transition-colors text-yellow-200 font-semibold">
                  Teacher's Corner (টিচার্স কর্নার)
                </Link>
              </li>
              <li>
                <Link to="/career-and-exam" className="hover:text-white hover:underline transition-colors text-yellow-200 font-semibold">
                  Career & Exam (ক্যারিয়ার ও পরীক্ষা)
                </Link>
              </li>
              <li>
                <Link to="/job-circular" className="hover:text-white hover:underline transition-colors text-yellow-200 font-semibold">
                  Job Circular (জব সার্কুলার)
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:underline transition-colors">
                  আমাদের সম্পর্কে (About Us)
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white hover:underline transition-colors">
                  সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)
                </Link>
              </li>
              <li>
                <Link to="/free-sample" className="hover:text-white hover:underline transition-colors">
                  ফ্রি স্যাম্পল ডাউনলোড করুন
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white hover:underline transition-colors flex items-center gap-1 text-pink-200">
                  <Lock size={11} />
                  <span>এডমিন ড্যাশবোর্ড (পাসওয়ার্ড সুরক্ষিত)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social & Community */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm text-yellow-300 uppercase tracking-wider border-b border-white/20 pb-2">
              আমাদের সোশ্যাল কমিউনিটি
            </h4>
            <p className="text-xs text-pink-100">
              পরীক্ষার আপডেট, ফ্রি সাজেশন এবং লাইভ স্টাডি সেশনের জন্য আমাদের সোশ্যাল চ্যানেলে যুক্ত থাকুন।
            </p>

            <div className="flex flex-col gap-2 mt-2">
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-[8px] text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <span>ফেসবুক গ্রুপ ও পেইজ</span>
                <ExternalLink size={14} />
              </a>

              <a
                href={siteConfig.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-[8px] text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <span>ইউটিউব চ্যানেল (ফ্রি ক্লাস)</span>
                <ExternalLink size={14} />
              </a>

              <a
                href={siteConfig.socialLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="bg-[#00a544] hover:bg-[#028b3a] px-3 py-2 rounded-[8px] text-xs font-bold flex items-center justify-between text-white transition-colors shadow-xs"
              >
                <span>হোয়াটসঅ্যাপে সরাসরি চ্যাট</span>
                <ExternalLink size={14} />
              </a>

              <a
                href={siteConfig.socialLinks.tiktok}
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-[8px] text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <span>টিকটক স্টাডি শর্টস</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row: Copyright & Payment Badges */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-pink-100">
          <div>
            © {new Date().getFullYear()} {siteConfig.siteName}। সর্বস্বত্ব সংরক্ষিত। সমস্ত ডিজিটাল কনটেন্ট স্বত্বাধিকারী দ্বারা সংরক্ষিত।
          </div>

          {/* Payment Badges: bKash, Nagad, Rocket, Visa, Mastercard */}
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-[11px] text-pink-200 mr-1">নিরাপদ পেমেন্ট পার্টনার:</span>
            
            {/* bKash */}
            <div className="bg-[#e2136e] border border-white/40 px-2 py-1 rounded-[6px] font-bold text-[11px] text-white flex items-center gap-1 shadow-xs">
              <span className="text-white font-black">bKash</span>
            </div>

            {/* Nagad */}
            <div className="bg-[#f9902e] text-[#0a0a0a] px-2 py-1 rounded-[6px] font-bold text-[11px] flex items-center gap-1 shadow-xs">
              <span className="font-black">Nagad</span>
            </div>

            {/* Rocket */}
            <div className="bg-[#8b248a] text-white px-2 py-1 rounded-[6px] font-bold text-[11px] flex items-center gap-1 shadow-xs">
              <span>Rocket</span>
            </div>

            {/* Visa */}
            <div className="bg-white text-[#1a1f71] px-2 py-1 rounded-[6px] font-black text-[11px] shadow-xs">
              VISA
            </div>

            {/* Mastercard */}
            <div className="bg-white text-[#eb001b] px-2 py-1 rounded-[6px] font-bold text-[11px] shadow-xs flex items-center gap-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#eb001b] inline-block -mr-1"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#f79e1b] inline-block"></span>
              <span className="text-black font-semibold ml-1">Card</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
