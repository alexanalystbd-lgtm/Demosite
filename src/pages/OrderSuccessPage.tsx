import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Download,
  FileText,
  ArrowRight,
  ShieldCheck,
  Calendar,
  CreditCard,
  User,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { formatPrice, toBengaliNumber } from '../utils/shopLogic';

export const OrderSuccessPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders, showToast } = useShop();

  const order = orders.find(o => o.id === id);

  // Trigger celebratory confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, []);

  const handleDownloadFile = (fileName: string, title: string) => {
    // Generate real simulated downloadable text/PDF file blob
    const content = `=====================================================
${title}
ডিজিটাল সংস্করণ — কপিরাইট সংরক্ষিত
অর্ডার আইডি: ${order?.id || 'BD-ORDER'}
গ্রাহক: ${order?.customerName || 'সম্মানিত শিক্ষার্থী'}
তারিখ: ${new Date().toLocaleDateString('bn-BD')}
=====================================================

ধন্যবাদ আমাদের ডিজিটাল স্টাডি প্রোডাক্ট নির্বাচন করার জন্য!
আপনার ক্লাসের পড়াশোনা শুভ হোক।

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

    showToast(`"${fileName}" ডাউনলোড সফল হয়েছে!`, 'success');
  };

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-[#0a0a0a] mb-2">অর্ডারটি পাওয়া যায়নি</h2>
        <p className="text-xs text-[#626262] mb-6">আপনার অর্ডার হিস্ট্রি দেখতে একাউন্টে যান।</p>
        <Link
          to="/my-account"
          className="bg-[#e2136e] text-white text-xs font-bold px-6 py-2.5 rounded-[10px] inline-flex items-center gap-1.5"
        >
          <span>আমার একাউন্ট</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Success Celebration Header */}
      <div className="bg-white rounded-[10px] p-8 border border-[#e5e5e5] shadow-xs text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-green-100 text-[#00a544] flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckCircle2 size={36} />
        </div>
        <span className="text-xs font-bold text-[#00a544] uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full">
          পেমেন্ট সফল ও অনুমোদিত
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a0a0a] mt-3 mb-2">
          অভিনন্দন {order.customerName}! আপনার অর্ডার সম্পন্ন হয়েছে
        </h1>
        <p className="text-xs sm:text-sm text-[#626262] max-w-lg mx-auto">
          অর্ডার আইডি: <strong className="text-[#e2136e] font-mono">{order.id}</strong>। নিচের বাটনগুলোতে ক্লিক করে আপনার ক্রয়কৃত ডিজিটাল ফাইলগুলো এখনই সরাসরি ডাউনলোড করে নিন।
        </p>
      </div>

      {/* Instant Digital Downloads Section */}
      <div className="bg-white rounded-[10px] p-6 border-2 border-[#e2136e] shadow-md mb-8">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Download size={20} className="text-[#e2136e]" />
            <h2 className="font-extrabold text-base text-[#0a0a0a]">
              আপনার ডাউনলোডযোগ্য ডিজিটাল ফাইলসমূহ ({toBengaliNumber(order.downloadFiles.length)} টি)
            </h2>
          </div>
          <span className="text-[11px] font-bold bg-[#ffdeee] text-[#e2136e] px-2.5 py-0.5 rounded-full">
            আজীবন এক্সেস
          </span>
        </div>

        <div className="space-y-3">
          {order.downloadFiles.map((file, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-4 rounded-[12px] border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[8px] bg-[#e2136e] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  PDF
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#0a0a0a]">
                    {file.productTitle}
                  </h4>
                  <div className="text-[11px] text-[#626262] flex items-center gap-2 mt-0.5">
                    <span>ফাইল: {file.fileName}</span>
                    <span>•</span>
                    <span>সাইজ: {file.fileSize}</span>
                  </div>
                </div>
              </div>

              {/* Working Download Button */}
              <button
                type="button"
                onClick={() => handleDownloadFile(file.fileName, file.productTitle)}
                className="w-full sm:w-auto bg-[#00a544] hover:bg-[#028b3a] active:scale-95 text-white font-bold text-xs px-5 py-2.5 rounded-[8px] flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
              >
                <Download size={14} />
                <span>ডাউনলোড করুন</span>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-[#626262] flex items-center gap-2">
          <ShieldCheck size={14} className="text-[#00a544] shrink-0" />
          <span>
            ফাইলটি আপনার ডিভাইসের ডাউনলোড ফোল্ডারে সেভ হবে। পরবর্তীতে "My Account" সেকশনে লগইন করেও যেকোনো সময় পুনরায় ডাউনলোড করতে পারবেন।
          </span>
        </div>
      </div>

      {/* Order Details & Summary Box */}
      <div className="bg-white rounded-[10px] p-6 border border-[#e5e5e5] shadow-xs mb-8">
        <h3 className="font-bold text-sm text-[#0a0a0a] border-b border-gray-100 pb-3 mb-4">
          অর্ডার ও পেমেন্ট বিবরণী
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-6">
          <div className="bg-gray-50 p-3 rounded-[8px]">
            <span className="text-[#626262] block mb-0.5">অর্ডার আইডি</span>
            <span className="font-mono font-bold text-[#e2136e]">{order.id}</span>
          </div>

          <div className="bg-gray-50 p-3 rounded-[8px]">
            <span className="text-[#626262] block mb-0.5">অর্ডারের তারিখ</span>
            <span className="font-bold text-[#0a0a0a]">{order.date}</span>
          </div>

          <div className="bg-gray-50 p-3 rounded-[8px]">
            <span className="text-[#626262] block mb-0.5">পেমেন্ট মেথড</span>
            <span className="font-bold text-[#0a0a0a] uppercase">{order.paymentMethod}</span>
          </div>

          <div className="bg-gray-50 p-3 rounded-[8px]">
            <span className="text-[#626262] block mb-0.5">মোট পরিশোধিত</span>
            <span className="font-bold text-[#00a544] text-sm">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100">
          <Link
            to="/my-account"
            className="w-full sm:w-auto bg-[#ffdeee] hover:bg-[#f6b8d3] text-[#e2136e] font-bold text-xs px-5 py-2.5 rounded-[8px] text-center transition-colors"
          >
            আমার একাউন্ট ও অর্ডার ইতিহাস
          </Link>

          <Link
            to="/shop"
            className="w-full sm:w-auto bg-[#e2136e] hover:bg-[#c2105f] text-white font-bold text-xs px-6 py-2.5 rounded-[8px] text-center transition-colors"
          >
            আরও বই ব্রাউজ করুন
          </Link>
        </div>
      </div>
    </div>
  );
};
