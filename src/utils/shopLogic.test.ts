import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCartTotals,
  filterAndSortProducts,
  toBengaliNumber,
  formatPrice,
  validateCheckoutForm,
  CartItem
} from './shopLogic';
import { sampleProducts } from '../data/products';

test('toBengaliNumber converts western digits to Bengali numerals correctly', () => {
  assert.equal(toBengaliNumber(12345), '১২৩৪৫');
  assert.equal(toBengaliNumber(0), '০');
  assert.equal(toBengaliNumber('2026'), '২০২৬');
});

test('formatPrice formats zero as free and positive numbers with Bengali numerals', () => {
  assert.equal(formatPrice(0), 'ফ্রি (৳০)');
  assert.equal(formatPrice(180), '৳ ১৮০');
});

test('calculateCartTotals computes subtotal and coupon percent discount accurately', () => {
  const p1 = sampleProducts[0]; // price 180
  const p2 = sampleProducts[1]; // price 190
  const items: CartItem[] = [
    { product: p1, quantity: 2 }, // 360
    { product: p2, quantity: 1 }  // 190
  ];
  // Subtotal = 550
  const coupons = {
    STUDENT20: { type: 'percent' as const, value: 20, label: '২০% ছাড়' },
    FREE50: { type: 'flat' as const, value: 50, label: '৫০ টাকা ছাড়' }
  };

  const res1 = calculateCartTotals(items, 'STUDENT20', coupons);
  assert.equal(res1.subtotal, 550);
  assert.equal(res1.discount, 110); // 20% of 550 = 110
  assert.equal(res1.total, 440);
  assert.equal(res1.isCouponApplied, true);
  assert.equal(res1.itemCount, 3);

  const res2 = calculateCartTotals(items, 'FREE50', coupons);
  assert.equal(res2.subtotal, 550);
  assert.equal(res2.discount, 50);
  assert.equal(res2.total, 500);
});

test('filterAndSortProducts filters by section, category and price', () => {
  const schoolNotes = filterAndSortProducts(sampleProducts, {
    section: 'school',
    category: 'notes'
  });
  assert.ok(schoolNotes.length > 0);
  schoolNotes.forEach(p => {
    assert.equal(p.section, 'school');
    assert.equal(p.category, 'notes');
  });

  const freeItems = filterAndSortProducts(sampleProducts, {
    priceType: 'free'
  });
  assert.ok(freeItems.length > 0);
  freeItems.forEach(p => {
    assert.equal(p.price, 0);
  });
});

test('validateCheckoutForm detects missing fields and invalid BD phone numbers', () => {
  const invalidForm = {
    fullName: '',
    phone: '12345',
    email: 'not-an-email',
    classLevel: 'class-10',
    paymentMethod: 'bkash' as const,
    transactionId: ''
  };
  const res = validateCheckoutForm(invalidForm, false);
  assert.equal(res.isValid, false);
  assert.ok(res.errors.fullName);
  assert.ok(res.errors.phone);
  assert.ok(res.errors.email);
  assert.ok(res.errors.transactionId);

  const validForm = {
    fullName: 'আসিফ ইকবাল',
    phone: '01712345678',
    email: 'asif@gmail.com',
    classLevel: 'hsc-1st-year',
    paymentMethod: 'bkash' as const,
    transactionId: 'TRX987654321'
  };
  const res2 = validateCheckoutForm(validForm, false);
  assert.equal(res2.isValid, true);
});
