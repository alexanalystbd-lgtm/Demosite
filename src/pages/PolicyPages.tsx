import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { siteConfig } from '../config';

const PolicyLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#626262] mb-6" aria-label="ব্রেডক্রাম্ব">
        <Link to="/" className="hover:text-[#e2136e]">হোম</Link>
        <span>/</span>
        <span className="text-[#0a0a0a] font-semibold">{title}</span>
      </nav>

      <div className="bg-white rounded-[10px] p-6 sm:p-10 border border-[#e5e5e5] shadow-xs">
        <div className="border-b border-gray-100 pb-4 mb-6">
          <span className="text-xs font-bold text-[#e2136e] uppercase tracking-wider bg-[#ffdeee] px-2.5 py-0.5 rounded-full inline-block mb-2">
            অফিশিয়াল পলিসি
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a0a0a]">{title}</h1>
          <p className="text-xs text-[#626262] mt-1">সর্বশেষ হালনাগাদ: ২০২৬</p>
        </div>

        <div className="prose prose-sm max-w-none text-[#0a0a0a]/90 text-xs sm:text-sm leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export const RefundPolicyPage: React.FC = () => {
  return (
    <PolicyLayout title="রিফান্ড পলিসি (Refund Policy)">
      <p>
        {siteConfig.siteName}-এ আপনার আস্থা আমাদের কাছে অত্যন্ত মূল্যবান। যেহেতু আমরা ডিজিটাল স্টাডি প্রোডাক্টস (PDF ই-বুক, ওয়ার্কবুক, স্টাডি প্ল্যানার) বিক্রি করি, তাই রিফান্ডের ক্ষেত্রে নিচের নীতিমালা প্রযোজ্য হবে:
      </p>

      <h3 className="font-bold text-sm text-[#0a0a0a]">১. ডিজিটাল পণ্যের প্রকৃতি</h3>
      <p>
        ডিজিটাল ফাইল পেমেন্ট সম্পন্ন হওয়ার সাথে সাথেই ডাউনলোডযোগ্য হয়ে যায়। একবার ফাইল ডাউনলোড লিঙ্ক সক্রিয় হয়ে গেলে বা ডাউনলোড সম্পন্ন হলে সাধারণত কোনো ক্যাশ রিফান্ড প্রদান করা হয় না।
      </p>

      <h3 className="font-bold text-sm text-[#0a0a0a]">২. যেসব ক্ষেত্রে রিফান্ড প্রযোজ্য</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>যদি একই অর্ডারে অসাবধানতাবশত একাধিকবার টাকা কেটে নেওয়া হয় (ডুপ্লিকেট পেমেন্ট)।</li>
        <li>যদি ডাউনলোডকৃত ফাইলে টেকনিক্যাল কোনো সমস্যা থাকে (যেমন: ফাইল অপেন না হওয়া বা অপাঠ্য হওয়া) এবং আমাদের সাপোর্ট টিম ২৪ ঘণ্টার মধ্যে সমাধান বা বিকল্প ফাইল সরবরাহ করতে ব্যর্থ হয়।</li>
      </ul>

      <h3 className="font-bold text-sm text-[#0a0a0a]">৩. রিফান্ডের আবেদন প্রক্রিয়া</h3>
      <p>
        রিফান্ডের জন্য ক্রয়ের ২৪ ঘণ্টার মধ্যে আপনার অর্ডার আইডি এবং লেনদেনের স্ক্রিনশটসহ আমাদের ইমেইল ({siteConfig.contact.email}) অথবা হোয়াটসঅ্যাপ হটলাইনে যোগাযোগ করুন। যাচাই শেষে ৩ থেকে ৫ কার্যদিবসের মধ্যে টাকা ফেরত দেওয়া হবে।
      </p>
    </PolicyLayout>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <PolicyLayout title="প্রাইভেসি পলিসি (Privacy Policy)">
      <p>
        {siteConfig.siteName} আপনার ব্যক্তিগত গোপনীয়তা রক্ষা করতে প্রতিশ্রুতিবদ্ধ। এই নীতিমালায় ব্যাখ্যা করা হয়েছে কীভাবে আমরা আপনার তথ্য সংগ্রহ, সংরক্ষণ ও ব্যবহার করি।
      </p>

      <h3 className="font-bold text-sm text-[#0a0a0a]">১. আমরা কী কী তথ্য সংগ্রহ করি?</h3>
      <p>
        অর্ডার সম্পন্ন করার সময় এবং একাউন্ট তৈরির সময় আমরা আপনার নাম, ইমেইল এড্রেস, মোবাইল নম্বর এবং অধ্যয়নরত শ্রেণি সংক্রান্ত তথ্য সংগ্রহ করি।
      </p>

      <h3 className="font-bold text-sm text-[#0a0a0a]">২. পেমেন্ট তথ্যের নিরাপত্তা</h3>
      <p>
        আমরা কোনো প্রকার ব্যাংক কার্ডের পিন বা মোবাইল ব্যাংকিং ওটিপি (OTP) সংরক্ষণ করি না। সকল আর্থিক লেনদেন সরাসরি নিরাপদ পেমেন্ট চ্যানেল ও এনক্রিপশনের মাধ্যমে পরিচালিত হয়।
      </p>

      <h3 className="font-bold text-sm text-[#0a0a0a]">৩. তথ্যের ব্যবহার</h3>
      <p>
        আপনার তথ্য শুধুমাত্র অর্ডার প্রসেসিং, ফাইল ডাউনলোডের লিঙ্ক প্রেরণ এবং গুরুত্বপূর্ণ স্টাডি আপডেট জানানোর কাজে ব্যবহৃত হয়। আমরা কোনো তৃতীয় পক্ষের কাছে আপনার তথ্য বিক্রি বা শেয়ার করি না।
      </p>
    </PolicyLayout>
  );
};

export const TermsPolicyPage: React.FC = () => {
  return (
    <PolicyLayout title="টার্মস ও কন্ডিশন (Terms & Conditions)">
      <p>
        আমাদের প্ল্যাটফর্ম ব্যবহার করে যেকোনো স্টাডি রিসোর্স অর্ডার করার মাধ্যমে আপনি নিম্নোক্ত শর্তাবলি মেনে নিচ্ছেন:
      </p>

      <h3 className="font-bold text-sm text-[#0a0a0a]">১. ব্যক্তিগত ব্যবহার ও কপিরাইট</h3>
      <p>
        {siteConfig.siteName}-এর সকল পিডিএফ, প্ল্যানার, হ্যান্ডনোটস এবং মডেল টেস্টের সর্বস্বত্ব সংরক্ষিত। ক্রয়কৃত প্রতিটি ডিজিটাল ফাইল কেবলমাত্র সংশ্লিষ্ট শিক্ষার্থীর একক ব্যক্তিগত পড়াশোনার জন্য।
      </p>

      <h3 className="font-bold text-sm text-[#0a0a0a]">২. বাণিজ্যিক ব্যবহার ও শেয়ারিং নিষিদ্ধ</h3>
      <p>
        আমাদের কোনো ডিজিটাল ফাইল বাণিজ্যিক উদ্দেশ্যে বিক্রয়, ফটোকপি করে বিতরণ, ফেসবুক/টেলিগ্রাম গ্রুপে বিনামূল্যে শেয়ার করা বা অন্য কোনো মাধ্যমে পুনরুৎপাদন করা আইনত দণ্ডনীয় অপরাধ। কপিরাইট লঙ্ঘিত হলে সংশ্লিষ্ট ব্যক্তির বিরুদ্ধে আইনি ব্যবস্থা গ্রহণ করা হবে।
      </p>

      <h3 className="font-bold text-sm text-[#0a0a0a]">৩. কনটেন্ট সংশোধন ও আপডেট</h3>
      <p>
        জাতীয় শিক্ষাক্রমের পরিবর্তন অনুযায়ী প্ল্যাটফর্ম কর্তৃপক্ষ যেকোনো সময় রিসোর্সের বিষয়বস্তু বা মূল্য সংশোধন করার অধিকার সংরক্ষণ করে।
      </p>
    </PolicyLayout>
  );
};

export const DigitalDeliveryPolicyPage: React.FC = () => {
  return (
    <PolicyLayout title="ডিজিটাল ডেলিভারি পলিসি (Digital Delivery)">
      <p>
        যেহেতু আমাদের সকল পণ্য সম্পূর্ণ ডিজিটাল, তাই কোনো প্রকার শারীরিক বা কুরিয়ার ডেলিভারি প্রয়োজন হয় না:
      </p>

      <h3 className="font-bold text-sm text-[#0a0a0a]">১. তাৎক্ষণিক ডেলিভারি</h3>
      <p>
        সফলভাবে পেমেন্ট করার সাথে সাথেই ওয়েবসাইট আপনাকে সরাসরি অর্ডার সাকসেস পেজে নিয়ে যাবে, যেখানে প্রতিটি ফাইলের পাশে "ডাউনলোড" বাটন উপস্থিত থাকবে।
      </p>

      <h3 className="font-bold text-sm text-[#0a0a0a]">২. ব্যাকআপ ডেলিভারি ও আজীবন এক্সেস</h3>
      <p>
        অর্ডারের সময় দেওয়া ইমেইলেও ডাউনলোড কনফার্মেশন পাঠানো হয়। এছাড়া আপনার একাউন্টে লগইন করে "Downloads" ট্যাবে আপনি যেকোনো সময় ফাইলসমূহ সংরক্ষণ ও পুনরায় ডাউনলোড করতে পারবেন।
      </p>
    </PolicyLayout>
  );
};

export const CancellationPolicyPage: React.FC = () => {
  return (
    <PolicyLayout title="ক্যান্সেলেশন পলিসি (Cancellation Policy)">
      <p>
        অর্ডার বাতিল ও সংশোধনের নিয়মাবলি নিম্নরূপ:
      </p>

      <h3 className="font-bold text-sm text-[#0a0a0a]">১. পেমেন্ট সম্পন্ন হওয়ার পূর্বে</h3>
      <p>
        চেকআউট পেজে পেমেন্ট কনফার্ম করার পূর্বে আপনি যেকোনো সময় কার্ট থেকে আইটেম মুছে বা সম্পূর্ণ অর্ডার বাতিল করতে পারবেন।
      </p>

      <h3 className="font-bold text-sm text-[#0a0a0a]">২. পেমেন্ট সম্পন্ন হওয়ার পর</h3>
      <p>
        ডিজিটাল পণ্য স্বয়ংক্রিয়ভাবে সেকেন্ডের মধ্যে ডেলিভারি হয়ে যাওয়ায় একবার পেমেন্ট ট্রানজেকশন সফল হলে তা সাধারণ নিয়মে বাতিল করা সম্ভব নয়। ভুল প্রোডাক্ট অর্ডার করে থাকলে ডাউনলোড করার পূর্বে অবিলম্বে সাপোর্টে যোগাযোগ করুন।
      </p>
    </PolicyLayout>
  );
};
