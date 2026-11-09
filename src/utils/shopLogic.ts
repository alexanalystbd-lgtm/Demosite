import { DigitalProduct } from '../data/products';

export interface CartItem {
  product: DigitalProduct;
  quantity: number;
}

export interface CouponRule {
  type: 'percent' | 'flat';
  value: number;
  label: string;
}

export interface CartCalculationResult {
  subtotal: number;
  discount: number;
  total: number;
  savings: number;
  isCouponApplied: boolean;
  couponMessage: string;
  itemCount: number;
}

export function calculateCartTotals(
  items: CartItem[],
  couponCode: string = '',
  coupons: Record<string, CouponRule> = {}
): CartCalculationResult {
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Total original price savings
  const originalSubtotal = items.reduce(
    (acc, item) => acc + (item.product.originalPrice || item.product.price) * item.quantity,
    0
  );
  let baseSavings = Math.max(0, originalSubtotal - subtotal);

  let discount = 0;
  let isCouponApplied = false;
  let couponMessage = '';

  const normalizedCode = couponCode.trim().toUpperCase();
  if (normalizedCode && coupons[normalizedCode]) {
    const coupon = coupons[normalizedCode];
    if (coupon.type === 'percent') {
      discount = Math.round((subtotal * coupon.value) / 100);
      couponMessage = `কুপন "${normalizedCode}" সফলভাবে প্রয়োগ করা হয়েছে (${coupon.label})!`;
    } else if (coupon.type === 'flat') {
      discount = Math.min(subtotal, coupon.value);
      couponMessage = `কুপন "${normalizedCode}" সফলভাবে প্রয়োগ করা হয়েছে (${coupon.label})!`;
    }
    isCouponApplied = true;
  } else if (normalizedCode) {
    couponMessage = 'দুঃখিত, কুপন কোডটি সঠিক নয় বা মেয়াদ শেষ হয়েছে।';
  }

  const total = Math.max(0, subtotal - discount);
  const savings = baseSavings + discount;

  return {
    subtotal,
    discount,
    total,
    savings,
    isCouponApplied,
    couponMessage,
    itemCount
  };
}

export interface FilterOptions {
  query?: string;
  section?: 'all' | 'school' | 'college';
  classLevel?: string;
  category?: string;
  subject?: string;
  priceType?: 'all' | 'free' | 'paid';
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'popular' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
}

export function filterAndSortProducts(
  products: DigitalProduct[],
  options: FilterOptions
): DigitalProduct[] {
  let result = [...products];

  // 1. Text Search
  if (options.query && options.query.trim()) {
    const q = options.query.trim().toLowerCase();
    result = result.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.subject.toLowerCase().includes(q) ||
        p.classLabel.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
    );
  }

  // 2. Section (school / college)
  if (options.section && options.section !== 'all') {
    result = result.filter(p => p.section === options.section);
  }

  // 3. Class Level (class-6 ... hsc-2nd-year)
  if (options.classLevel && options.classLevel !== 'all') {
    result = result.filter(p => p.classLevel === options.classLevel);
  }

  // 4. Category (planner, notes, etc.)
  if (options.category && options.category !== 'all') {
    result = result.filter(p => p.category === options.category);
  }

  // 5. Subject
  if (options.subject && options.subject !== 'all' && options.subject !== 'সকল বিষয়') {
    result = result.filter(p => p.subject === options.subject || p.subject === 'সকল বিষয়' || p.subject === 'সকল বিষয়');
  }

  // 6. Price Type
  if (options.priceType === 'free') {
    result = result.filter(p => p.isFree || p.price === 0);
  } else if (options.priceType === 'paid') {
    result = result.filter(p => !p.isFree && p.price > 0);
  }

  // 7. Price range
  if (typeof options.minPrice === 'number') {
    result = result.filter(p => p.price >= (options.minPrice ?? 0));
  }
  if (typeof options.maxPrice === 'number') {
    result = result.filter(p => p.price <= (options.maxPrice ?? 10000));
  }

  // 8. Sorting
  const sortBy = options.sortBy || 'popular';
  if (sortBy === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  } else if (sortBy === 'rating') {
    result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  } else {
    // popular default
    result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.salesCount - a.salesCount);
  }

  return result;
}

export function toBengaliNumber(n: number | string): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return n
    .toString()
    .replace(/[0-9]/g, digit => bengaliDigits[parseInt(digit, 10)]);
}

export function formatPrice(amount: number): string {
  if (amount === 0) return 'ফ্রি (৳০)';
  return `৳ ${toBengaliNumber(amount)}`;
}

export function generateOrderId(): string {
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `BD-${randomPart}`;
}

export interface CheckoutFormState {
  fullName: string;
  phone: string;
  email: string;
  classLevel: string;
  paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'card';
  transactionId: string;
  notes?: string;
}

export function validateCheckoutForm(form: CheckoutFormState, isTotalZero: boolean = false): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!form.fullName || form.fullName.trim().length < 2) {
    errors.fullName = 'আপনার পূর্ণ নাম লিখুন';
  }

  const bdPhoneRegex = /^(?:\+88|88)?01[3-9]\d{8}$/;
  const cleanPhone = form.phone.replace(/[\s-]/g, '');
  if (!cleanPhone || !bdPhoneRegex.test(cleanPhone)) {
    errors.phone = 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 01711223344)';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email || !emailRegex.test(form.email)) {
    errors.email = 'সঠিক ইমেইল এড্রেস লিখুন (ফাইল ডাউনলোডের লিংক এতেও পাঠানো হবে)';
  }

  // If order is not 0 taka, transaction ID is required for mobile wallet
  if (!isTotalZero && ['bkash', 'nagad', 'rocket'].includes(form.paymentMethod)) {
    if (!form.transactionId || form.transactionId.trim().length < 6) {
      errors.transactionId = 'সঠিক ট্রানজেকশন আইডি (TrxID) লিখুন (কমপক্ষে ৬ অক্ষর)';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
