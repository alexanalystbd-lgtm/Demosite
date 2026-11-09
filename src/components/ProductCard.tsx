import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Download, ArrowRight } from 'lucide-react';
import { DigitalProduct } from '../data/products';
import { ProductCover } from './ProductCover';
import { useLanguage } from '../context/LanguageContext';
import { localizeProduct } from '../data/translationsData';

interface ProductCardProps {
  product: DigitalProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { lang, t, toLocalizedNumber, formatPrice } = useLanguage();
  const localized = localizeProduct(product, lang);

  // Discount calculation
  const discountPercent =
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <div className="group bg-white rounded-[10px] border border-slate-200 hover:border-[#e2136e]/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden relative">
      {/* Clean Single Pill Badge */}
      <div className="absolute top-2.5 left-2.5 z-20">
        {product.isFree ? (
          <span className="bg-[#00a544] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
            {t('hundredPercentFree')}
          </span>
        ) : discountPercent > 0 ? (
          <span className="bg-[#e2136e] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            {toLocalizedNumber(discountPercent)}% {t('offLabel')}
          </span>
        ) : (
          <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
            {t('digitalPdf')}
          </span>
        )}
      </div>

      {/* Clickable Image / Cover Area */}
      <Link to={`/product/${product.slug}`} className="block relative overflow-hidden bg-slate-50">
        <ProductCover
          title={localized.title}
          subject={localized.subject}
          classLabel={localized.classLabel}
          categoryLabel={localized.categoryLabel}
          themeColor={product.themeColor}
          iconType={product.iconType}
          className="group-hover:scale-102 transition-transform duration-200"
        />
      </Link>

      {/* Card Body */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Class label & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-semibold text-[#0084a2] bg-slate-100 px-2 py-0.5 rounded-sm text-[11px]">
              {localized.classLabel}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-medium text-xs">
              <Star size={11} className="fill-current" />
              <span>{toLocalizedNumber(product.rating)}</span>
              <span className="text-slate-400">({toLocalizedNumber(product.reviewCount)})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.slug}`}
            className="block text-sm font-bold text-slate-900 hover:text-[#e2136e] transition-colors line-clamp-2 leading-snug mb-1.5"
            title={localized.title}
          >
            {localized.title}
          </Link>

          {/* Short specs */}
          <p className="text-xs text-slate-500 line-clamp-1 mb-3">
            {product.pageCount ? `${toLocalizedNumber(product.pageCount)} ${t('pagesCountSuffix')}` : ''} • {localized.format}
          </p>
        </div>

        {/* Price & Action Area */}
        <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-[#e2136e]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-500">
              {toLocalizedNumber(product.salesCount)}+ {t('studentsSuffix')}
            </span>
          </div>

          {/* Action Button: View Details & Order */}
          <Link
            to={`/product/${product.slug}`}
            className="w-full py-2 px-3 text-xs font-bold text-white bg-[#e2136e] hover:bg-[#c2105f] active:scale-98 rounded-[8px] text-center transition-all flex items-center justify-center gap-1.5 shadow-xs"
          >
            {product.isFree ? (
              <>
                <Download size={13} />
                <span>{lang === 'en' ? 'Free Read & Download' : 'ফ্রি পড়ুন ও ডাউনলোড'}</span>
              </>
            ) : (
              <>
                <span>{t('viewDetails')}</span>
                <ArrowRight size={13} />
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};
