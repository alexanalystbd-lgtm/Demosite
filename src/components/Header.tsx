import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  User,
  Menu,
  X,
  ChevronDown,
  Gift,
  HelpCircle,
  PhoneCall,
  Search,
  BookOpen,
  GraduationCap,
  Briefcase,
  FileText
} from 'lucide-react';
import { siteConfig } from '../config';
import { useShop } from '../context/ShopContext';

export const Header: React.FC = () => {
  const { currentUser } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [schoolDropdownOpen, setSchoolDropdownOpen] = useState(false);
  const [collegeDropdownOpen, setCollegeDropdownOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const navigate = useNavigate();

  const schoolTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const collegeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSchoolMouseEnter = () => {
    if (schoolTimeoutRef.current) clearTimeout(schoolTimeoutRef.current);
    setSchoolDropdownOpen(true);
  };
  const handleSchoolMouseLeave = () => {
    schoolTimeoutRef.current = setTimeout(() => {
      setSchoolDropdownOpen(false);
    }, 180);
  };

  const handleCollegeMouseEnter = () => {
    if (collegeTimeoutRef.current) clearTimeout(collegeTimeoutRef.current);
    setCollegeDropdownOpen(true);
  };
  const handleCollegeMouseLeave = () => {
    collegeTimeoutRef.current = setTimeout(() => {
      setCollegeDropdownOpen(false);
    }, 180);
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(mobileSearchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  // Close dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSchoolDropdownOpen(false);
    setCollegeDropdownOpen(false);
  }, [navigate]);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* 1. Thin Top Strip (#AA0E53) */}
      <div className="bg-[#AA0E53] text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift size={13} className="text-yellow-300 animate-pulse" />
            <Link
              to="/free-sample"
              className="hover:underline font-medium tracking-wide flex items-center gap-1"
            >
              <span>ফ্রি স্যাম্পল ডাউনলোড করুন — কেনার আগে দেখে নিন</span>
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-pink-100">
            <Link to="/contact" className="hover:text-white flex items-center gap-1">
              <PhoneCall size={12} />
              <span>সাপোর্ট: {siteConfig.contact.phone}</span>
            </Link>
            <span className="text-pink-300/40">|</span>
            <Link to="/how-to-buy" className="hover:text-white flex items-center gap-1">
              <HelpCircle size={12} />
              <span>কীভাবে কিনবেন</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Bar (#e2136e), One line */}
      <div className="bg-[#e2136e] text-white py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 lg:gap-4">
          {/* Logo on the left */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 rounded-[10px] bg-white text-[#e2136e] flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              <BookOpen size={20} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight leading-none text-white drop-shadow-xs">
                {siteConfig.logoText}
              </span>
              <span className="text-[10px] text-pink-100 tracking-wider font-medium">
                ডিজিটাল স্টাডি প্ল্যাটফর্ম
              </span>
            </div>
          </Link>

          {/* Desktop Nav Menu in the middle (Exact requested pages: Home, School, College, Teacher's Corner, Career & Exam, Job Circular, About Us) */}
          <nav className="hidden xl:flex items-center gap-1 text-[13px] font-semibold">
            {/* 1. Home */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-md transition-colors ${
                  isActive ? 'bg-[#c2105f] text-white' : 'text-pink-50 hover:bg-white/15'
                }`
              }
            >
              হোম
            </NavLink>

            {/* 2. School Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleSchoolMouseEnter}
              onMouseLeave={handleSchoolMouseLeave}
            >
              <NavLink
                to="/school"
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                    isActive ? 'bg-[#c2105f] text-white' : 'text-pink-50 hover:bg-white/15'
                  }`
                }
              >
                <span>স্কুল</span>
                <ChevronDown size={14} />
              </NavLink>

              {schoolDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-[380px] bg-white text-[#0a0a0a] rounded-[12px] shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="grid grid-cols-2 gap-3 pb-2 border-b border-slate-100">
                    <div>
                      <div className="px-2 py-1 text-[11px] font-bold text-[#e2136e] uppercase tracking-wider">
                        প্রাথমিক স্তর (১ম-৫ম)
                      </div>
                      <Link
                        to="/school/class-1"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors"
                      >
                        ক্লাস ১ (প্রথম শ্রেণি)
                      </Link>
                      <Link
                        to="/school/class-2"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors"
                      >
                        ক্লাস ২ (দ্বিতীয় শ্রেণি)
                      </Link>
                      <Link
                        to="/school/class-3"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors"
                      >
                        ক্লাস ৩ (তৃতীয় শ্রেণি)
                      </Link>
                      <Link
                        to="/school/class-4"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors"
                      >
                        ক্লাস ৪ (চতুর্থ শ্রেণি)
                      </Link>
                      <Link
                        to="/school/class-5"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors"
                      >
                        ক্লাস ৫ (বৃত্তি পরীক্ষা)
                      </Link>
                    </div>

                    <div>
                      <div className="px-2 py-1 text-[11px] font-bold text-[#0084a2] uppercase tracking-wider">
                        মাধ্যমিক স্তর (৬ষ্ঠ-১০ম)
                      </div>
                      <Link
                        to="/school/class-6"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-[#0084a2] rounded-md transition-colors"
                      >
                        ক্লাস ৬ (ষষ্ঠ শ্রেণি)
                      </Link>
                      <Link
                        to="/school/class-7"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-[#0084a2] rounded-md transition-colors"
                      >
                        ক্লাস ৭ (সপ্তম শ্রেণি)
                      </Link>
                      <Link
                        to="/school/class-8"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-[#0084a2] rounded-md transition-colors"
                      >
                        ক্লাস ৮ (অষ্টম শ্রেণি)
                      </Link>
                      <Link
                        to="/school/class-9"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-[#0084a2] rounded-md transition-colors"
                      >
                        ক্লাস ৯ (নবম শ্রেণি)
                      </Link>
                      <Link
                        to="/school/class-10"
                        className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-[#0084a2] rounded-md transition-colors"
                      >
                        ক্লাস ১০ / এসএসসি
                      </Link>
                    </div>
                  </div>

                  <div className="mt-2 pt-1 text-center">
                    <Link
                      to="/school"
                      className="block py-1 text-xs font-bold text-[#e2136e] hover:underline"
                    >
                      স্কুলের সকল শ্রেণির বই ও রিসোর্স দেখুন →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. College Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleCollegeMouseEnter}
              onMouseLeave={handleCollegeMouseLeave}
            >
              <NavLink
                to="/college"
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                    isActive ? 'bg-[#c2105f] text-white' : 'text-pink-50 hover:bg-white/15'
                  }`
                }
              >
                <span>কলেজ</span>
                <ChevronDown size={14} />
              </NavLink>

              {collegeDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white text-[#0a0a0a] rounded-[10px] shadow-xl border border-pink-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1 text-[11px] font-bold text-[#e2136e] uppercase tracking-wider border-b border-gray-100">
                    বর্ষ অনুযায়ী
                  </div>
                  <Link
                    to="/college/hsc-1st-year"
                    className="block px-3 py-1.5 text-xs font-medium hover:bg-[#ffdeee] hover:text-[#e2136e] transition-colors"
                  >
                    HSC ১ম বর্ষ (একাদশ শ্রেণি)
                  </Link>
                  <Link
                    to="/college/hsc-2nd-year"
                    className="block px-3 py-1.5 text-xs font-medium hover:bg-[#ffdeee] hover:text-[#e2136e] transition-colors"
                  >
                    HSC ২য় বর্ষ (দ্বাদশ শ্রেণি)
                  </Link>
                  <div className="mt-1 pt-1 border-t border-gray-100">
                    <Link
                      to="/college"
                      className="block px-3 py-1.5 text-xs font-bold text-[#e2136e] hover:bg-[#ffdeee]"
                    >
                      কলেজের সকল বই দেখুন →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Teacher's Corner */}
            <NavLink
              to="/teachers-corner"
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                  isActive ? 'bg-[#c2105f] text-white' : 'text-pink-50 hover:bg-white/15'
                }`
              }
            >
              <GraduationCap size={14} />
              <span>Teacher's Corner</span>
            </NavLink>

            {/* 5. Career & Exam */}
            <NavLink
              to="/career-and-exam"
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                  isActive ? 'bg-[#c2105f] text-white' : 'text-pink-50 hover:bg-white/15'
                }`
              }
            >
              <Briefcase size={14} />
              <span>Career & Exam</span>
            </NavLink>

            {/* 6. Job Circular */}
            <NavLink
              to="/job-circular"
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                  isActive ? 'bg-[#c2105f] text-white' : 'text-pink-50 hover:bg-white/15'
                }`
              }
            >
              <FileText size={14} />
              <span>Job Circular</span>
            </NavLink>

            {/* 7. About Us */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-md transition-colors ${
                  isActive ? 'bg-[#c2105f] text-white' : 'text-pink-50 hover:bg-white/15'
                }`
              }
            >
              About Us
            </NavLink>
          </nav>

          {/* Right Action: Free Sample Button & Account (Wishlist & Cart REMOVED as requested) */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* ফ্রি স্যাম্পল button */}
            <Link
              to="/free-sample"
              className="hidden md:flex items-center gap-1 bg-[#f9902e] hover:bg-[#f88114] text-[#0a0a0a] text-xs font-bold px-3 py-1.5 rounded-[10px] transition-all shadow-xs mr-1"
            >
              <Gift size={14} />
              <span>ফ্রি স্যাম্পল</span>
            </Link>

            <div className="hidden sm:block h-6 w-px bg-white/20 mx-1" />

            {/* Account / Login */}
            <Link
              to="/my-account"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-medium"
              title="আমার একাউন্ট"
            >
              <User size={16} />
              <span>{currentUser ? 'একাউন্ট' : 'লগইন'}</span>
            </Link>

            {/* Mobile Hamburger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden ml-1 p-2 rounded-md hover:bg-white/15 text-white transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay & Nav */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white text-[#0a0a0a] border-b border-[#e5e5e5] px-4 py-4 shadow-2xl animate-in slide-in-from-top duration-200">
          {/* Mobile Search Bar */}
          <form onSubmit={handleMobileSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="প্রোডাক্ট বা বিষয় খুঁজুন..."
                value={mobileSearchQuery}
                onChange={e => setMobileSearchQuery(e.target.value)}
                className="w-full bg-[#f5f5f5] text-sm pl-9 pr-20 py-2.5 rounded-[10px] border border-[#e5e5e5] focus:outline-none focus:border-[#e2136e]"
              />
              <Search size={16} className="absolute left-3 top-3 text-gray-400" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bg-[#e2136e] text-white text-xs font-bold px-3 py-1.5 rounded-[8px]"
              >
                খুঁজুন
              </button>
            </div>
          </form>

          {/* Mobile Links */}
          <div className="flex flex-col gap-1 text-sm font-semibold divide-y divide-gray-100">
            {/* 1. Home */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-[#ffdeee] hover:text-[#e2136e] rounded-md"
            >
              হোম (Home)
            </Link>

            {/* 2. School */}
            <div className="py-2">
              <div className="flex items-center justify-between px-2 text-xs text-gray-500 font-bold uppercase">
                <span>স্কুল (১ম–১০ম শ্রেণি)</span>
                <Link
                  to="/school"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#e2136e] font-bold"
                >
                  সকল বই →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mt-1.5">
                <Link
                  to="/school/class-1"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center"
                >
                  ক্লাস ১
                </Link>
                <Link
                  to="/school/class-2"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center"
                >
                  ক্লাস ২
                </Link>
                <Link
                  to="/school/class-3"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center"
                >
                  ক্লাস ৩
                </Link>
                <Link
                  to="/school/class-4"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center"
                >
                  ক্লাস ৪
                </Link>
                <Link
                  to="/school/class-5"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center font-medium"
                >
                  ক্লাস ৫ (বৃত্তি)
                </Link>
                <Link
                  to="/school/class-6"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center"
                >
                  ক্লাস ৬
                </Link>
                <Link
                  to="/school/class-7"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center"
                >
                  ক্লাস ৭
                </Link>
                <Link
                  to="/school/class-8"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center"
                >
                  ক্লাস ৮
                </Link>
                <Link
                  to="/school/class-9"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center"
                >
                  ক্লাস ৯
                </Link>
                <Link
                  to="/school/class-10"
                  onClick={() => setMobileMenuOpen(false)}
                  className="col-span-2 sm:col-span-3 py-1.5 px-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-pink-50 hover:text-[#e2136e] rounded-md transition-colors text-center font-bold"
                >
                  ক্লাস ১০ / এসএসসি
                </Link>
              </div>
            </div>

            {/* 3. College */}
            <div className="py-2">
              <div className="flex items-center justify-between px-2 text-xs text-gray-500 font-bold uppercase">
                <span>কলেজ (College)</span>
                <Link
                  to="/college"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#e2136e] font-bold"
                >
                  সকল বই →
                </Link>
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <Link
                  to="/college/hsc-1st-year"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 px-3 text-xs text-gray-700 hover:text-[#e2136e]"
                >
                  HSC ১ম বর্ষ (একাদশ শ্রেণি)
                </Link>
                <Link
                  to="/college/hsc-2nd-year"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 px-3 text-xs text-gray-700 hover:text-[#e2136e]"
                >
                  HSC ২য় বর্ষ (দ্বাদশ শ্রেণি)
                </Link>
              </div>
            </div>

            {/* 4. Teacher's Corner */}
            <Link
              to="/teachers-corner"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-[#ffdeee] hover:text-[#e2136e] rounded-md flex items-center gap-2"
            >
              <GraduationCap size={16} className="text-[#0084a2]" />
              <span>Teacher's Corner</span>
            </Link>

            {/* 5. Career & Exam */}
            <Link
              to="/career-and-exam"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-[#ffdeee] hover:text-[#e2136e] rounded-md flex items-center gap-2"
            >
              <Briefcase size={16} className="text-[#f9902e]" />
              <span>Career & Exam</span>
            </Link>

            {/* 6. Job Circular */}
            <Link
              to="/job-circular"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-[#ffdeee] hover:text-[#e2136e] rounded-md flex items-center gap-2"
            >
              <FileText size={16} className="text-[#00a544]" />
              <span>Job Circular</span>
            </Link>

            {/* 7. About Us */}
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-[#ffdeee] hover:text-[#e2136e] rounded-md"
            >
              About Us (আমাদের সম্পর্কে)
            </Link>

            {/* Additional helpful links */}
            <Link
              to="/free-sample"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 text-[#f9902e] font-bold hover:bg-[#fef4ea] rounded-md flex items-center gap-2"
            >
              <Gift size={16} />
              <span>ফ্রি স্যাম্পল ডাউনলোড</span>
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 text-gray-600 hover:text-[#e2136e] rounded-md text-xs"
            >
              সাপোর্ট ও যোগাযোগ
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Fixed Bottom Navigation Bar (No Cart, No Wishlist) */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e5e5e5] px-2 py-2 flex items-center justify-around shadow-lg">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
              isActive ? 'text-[#e2136e]' : 'text-[#626262]'
            }`
          }
        >
          <BookOpen size={18} />
          <span>হোম</span>
        </NavLink>

        <NavLink
          to="/school"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
              isActive ? 'text-[#e2136e]' : 'text-[#626262]'
            }`
          }
        >
          <BookOpen size={18} />
          <span>স্কুল</span>
        </NavLink>

        <NavLink
          to="/college"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
              isActive ? 'text-[#e2136e]' : 'text-[#626262]'
            }`
          }
        >
          <GraduationCap size={18} />
          <span>কলেজ</span>
        </NavLink>

        <NavLink
          to="/teachers-corner"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
              isActive ? 'text-[#e2136e]' : 'text-[#626262]'
            }`
          }
        >
          <FileText size={18} />
          <span>টিচার্স কর্নার</span>
        </NavLink>

        <NavLink
          to="/job-circular"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
              isActive ? 'text-[#e2136e]' : 'text-[#626262]'
            }`
          }
        >
          <Briefcase size={18} />
          <span>সার্কুলার</span>
        </NavLink>
      </div>
    </header>
  );
};
