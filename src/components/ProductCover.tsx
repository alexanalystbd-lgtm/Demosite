import React from 'react';

interface ProductCoverProps {
  title: string;
  subject: string;
  classLabel: string;
  themeColor?: string;
  categoryLabel?: string;
  iconType?: string;
  className?: string;
}

export const ProductCover: React.FC<ProductCoverProps> = ({
  title,
  subject,
  classLabel,
  themeColor = '#e2136e',
  categoryLabel = 'ডিজিটাল ই-বুক',
  iconType = 'book',
  className = ''
}) => {
  // Generate consistent subtle accent colors
  const isDarkPink = themeColor === '#e2136e';
  const bgGrad = isDarkPink
    ? 'linear-gradient(135deg, #e2136e 0%, #a20a4c 100%)'
    : themeColor === '#0084a2'
    ? 'linear-gradient(135deg, #0084a2 0%, #005a70 100%)'
    : themeColor === '#f9902e'
    ? 'linear-gradient(135deg, #f9902e 0%, #c46812 100%)'
    : themeColor === '#00a544'
    ? 'linear-gradient(135deg, #00a544 0%, #016b2d 100%)'
    : 'linear-gradient(135deg, #6b21a8 0%, #4c127a 100%)';

  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-t-[10px] overflow-hidden flex flex-col justify-between p-4 text-white shadow-inner select-none ${className}`}
      style={{ background: bgGrad }}
    >
      {/* Background geometric decorative watermark */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern id={`pattern-${subject}`} width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="1.5" fill="white" />
          <path d="M0 15h30M15 0v30" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#pattern-${subject})`} />
      </svg>

      {/* Book spine simulation on the left */}
      <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/20 border-r border-white/20" />

      {/* Top row: Category & Class Pill */}
      <div className="relative z-10 flex items-center justify-between gap-1 pl-2">
        <span className="bg-white/25 backdrop-blur-xs text-[11px] font-medium px-2 py-0.5 rounded-full tracking-wide">
          {categoryLabel}
        </span>
        <span className="bg-black/30 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-white/20 text-yellow-200">
          {classLabel}
        </span>
      </div>

      {/* Center: Dynamic Subject Graphic */}
      <div className="relative z-10 my-auto text-center flex flex-col items-center justify-center py-1">
        {iconType === 'math' && (
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-1 text-2xl font-bold shadow-sm">
            ∫dx
          </div>
        )}
        {iconType === 'physics' && (
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-1 text-2xl font-bold shadow-sm">
            ⚡
          </div>
        )}
        {iconType === 'chemistry' && (
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-1 text-2xl font-bold shadow-sm">
            ⬡
          </div>
        )}
        {iconType === 'planner' && (
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-1 text-2xl font-bold shadow-sm">
            📅
          </div>
        )}
        {iconType === 'exam' && (
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-1 text-2xl font-bold shadow-sm">
            🎯
          </div>
        )}
        {iconType === 'biology' && (
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-1 text-2xl font-bold shadow-sm">
            🧬
          </div>
        )}
        {iconType === 'ict' && (
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-1 text-2xl font-bold shadow-sm">
            &lt;/&gt;
          </div>
        )}
        {iconType === 'grammar' && (
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-1 text-2xl font-bold shadow-sm">
            Aa
          </div>
        )}
        {iconType === 'book' && (
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-1 text-2xl font-bold shadow-sm">
            📖
          </div>
        )}

        <div className="text-xs uppercase tracking-wider text-pink-100 font-semibold">
          {subject}
        </div>
      </div>

      {/* Bottom Title Bar on Cover */}
      <div className="relative z-10 pl-2 bg-black/35 backdrop-blur-xs rounded-md p-1.5 border-t border-white/15">
        <h4 className="text-[13px] font-bold leading-tight line-clamp-1 text-white">
          {title}
        </h4>
        <div className="flex items-center justify-between text-[10px] text-pink-100 mt-0.5">
          <span>ডিজিটাল সংস্করণ</span>
          <span className="text-yellow-300 font-medium">প্রিন্টযোগ্য PDF</span>
        </div>
      </div>
    </div>
  );
};
