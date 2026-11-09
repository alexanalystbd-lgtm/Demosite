import React, { createContext, useContext, useState, useEffect } from 'react';
import { DigitalProduct, sampleProducts } from '../data/products';
import { siteConfig } from '../config';
import {
  CartItem,
  CartCalculationResult,
  calculateCartTotals,
  generateOrderId
} from '../utils/shopLogic';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  classLevel: string;
  joinedDate: string;
}

export interface PurchasedFile {
  productId: string;
  productTitle: string;
  fileName: string;
  fileSize: string;
  format: string;
  downloadUrl: string;
}

export interface OrderRecord {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  classLevel: string;
  items: {
    productId: string;
    title: string;
    price: number;
    quantity: number;
    format: string;
    fileSize: string;
  }[];
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
  paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'card';
  transactionId: string;
  status: 'সফল (অনুমোদিত)' | 'প্রসেসিং' | 'যাচাই চলছে';
  downloadFiles: PurchasedFile[];
}

export interface ToastMessage {
  id: number;
  text: string;
  type: 'success' | 'error' | 'info';
}

interface ShopContextType {
  products: DigitalProduct[];
  cart: CartItem[];
  wishlist: string[];
  couponCode: string;
  cartTotals: CartCalculationResult;
  currentUser: UserProfile | null;
  orders: OrderRecord[];
  announcement: string;
  toasts: ToastMessage[];
  
  // Actions
  addToCart: (product: DigitalProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  placeOrder: (formData: {
    fullName: string;
    phone: string;
    email: string;
    classLevel: string;
    paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'card';
    transactionId: string;
  }) => OrderRecord;
  loginUser: (email: string, pass: string) => boolean;
  registerUser: (data: { name: string; email: string; phone: string; classLevel: string }) => boolean;
  logoutUser: () => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: number) => void;

  // Admin Actions
  addProduct: (product: DigitalProduct) => void;
  updateProduct: (product: DigitalProduct) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;
  updateAnnouncement: (text: string) => void;
  updateOrderStatus: (orderId: string, status: OrderRecord['status']) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'bd_study_cart_v1',
  WISHLIST: 'bd_study_wishlist_v1',
  USER: 'bd_study_user_v1',
  ORDERS: 'bd_study_orders_v1',
  PRODUCTS: 'bd_study_products_v1',
  COUPON: 'bd_study_coupon_v1',
  ANNOUNCEMENT: 'bd_study_announcement_v1',
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Products state (persisted to localStorage so admin can manage)
  const [products, setProducts] = useState<DigitalProduct[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return sampleProducts;
  });

  // 2. Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 3. Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 4. Coupon state
  const [couponCode, setCouponCode] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.COUPON) || '';
    } catch {
      return '';
    }
  });

  // 5. User state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      return stored ? JSON.parse(stored) : {
        id: 'usr-demo-1',
        name: 'সাকিব আল হাসান',
        email: 'student@example.com',
        phone: '01711223344',
        classLevel: 'hsc-1st-year',
        joinedDate: '২০২৬-০১-১৫'
      };
    } catch {
      return null;
    }
  });

  // 6. Orders state
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    // Seed initial demo orders so order history & downloads are immediately testable
    return [
      {
        id: 'BD-847291',
        date: '২০২৬-১১-০২',
        customerName: 'সাকিব আল হাসান',
        customerPhone: '01711223344',
        customerEmail: 'student@example.com',
        classLevel: 'HSC ১ম বর্ষ',
        items: [
          {
            productId: 'prod-8',
            title: 'এসএসসি সকল সূত্রের আলটিমেট পকেট কার্ড (ফ্রি ডাইজেস্ট)',
            price: 0,
            quantity: 1,
            format: 'ডিজিটাল PDF',
            fileSize: '4.2 MB'
          },
          {
            productId: 'prod-11',
            title: 'HSC ICT সম্পূর্ণ হ্যান্ডনোটস, HTML কোডিং ও C-প্রোগ্রামিং হ্যান্ডবুক',
            price: 200,
            quantity: 1,
            format: 'ডিজিটাল কালার কোডেড PDF',
            fileSize: '24.0 MB'
          }
        ],
        subtotal: 200,
        discount: 40,
        total: 160,
        couponCode: 'STUDENT20',
        paymentMethod: 'bkash',
        transactionId: 'BKASH92847120',
        status: 'সফল (অনুমোদিত)',
        downloadFiles: [
          {
            productId: 'prod-8',
            productTitle: 'এসএসসি সকল সূত্রের আলটিমেট পকেট কার্ড (ফ্রি ডাইজেস্ট)',
            fileName: 'SSC_Formula_Pocket_Card.pdf',
            fileSize: '4.2 MB',
            format: 'PDF',
            downloadUrl: '#'
          },
          {
            productId: 'prod-11',
            productTitle: 'HSC ICT সম্পূর্ণ হ্যান্ডনোটস ও C-প্রোগ্রামিং',
            fileName: 'HSC_ICT_Complete_Handnotes.pdf',
            fileSize: '24.0 MB',
            format: 'PDF',
            downloadUrl: '#'
          }
        ]
      }
    ];
  });

  // 7. Announcement state
  const [announcement, setAnnouncement] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENT);
      return stored || siteConfig.announcementText;
    } catch {
      return siteConfig.announcementText;
    }
  });

  // 8. Toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COUPON, couponCode);
    } catch (e) {
      console.error(e);
    }
  }, [couponCode]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, announcement);
    } catch (e) {
      console.error(e);
    }
  }, [announcement]);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart actions
  const addToCart = (product: DigitalProduct, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        // Digital product: quantity 1 is usually enough, but let's allow or keep at 1
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`"${product.title}" সফলভাবে কার্টে যোগ হয়েছে!`);
  };

  const removeFromCart = (productId: string) => {
    const target = cart.find(i => i.product.id === productId);
    setCart(prev => prev.filter(item => item.product.id !== productId));
    if (target) {
      showToast(`"${target.product.title}" কার্ট থেকে সরানো হয়েছে।`, 'info');
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    const isSaved = wishlist.includes(productId);
    if (isSaved) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast('উইশলিস্ট থেকে সরানো হয়েছে', 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast('উইশলিস্টে যুক্ত করা হয়েছে ❤️', 'success');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Coupon
  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (!normalized) {
      return { success: false, message: 'একটি কুপন কোড প্রবেশ করান' };
    }
    if (siteConfig.demoCoupons[normalized]) {
      setCouponCode(normalized);
      const rule = siteConfig.demoCoupons[normalized];
      const msg = `কুপন "${normalized}" সফল হয়েছে! (${rule.label})`;
      showToast(msg, 'success');
      return { success: true, message: msg };
    }
    showToast('ভুল কুপন কোড!', 'error');
    return { success: false, message: 'দুঃখিত, কুপনটি সঠিক নয় বা মেয়াদোত্তীর্ণ।' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    showToast('কুপন কোড মুছে ফেলা হয়েছে।', 'info');
  };

  const cartTotals = calculateCartTotals(cart, couponCode, siteConfig.demoCoupons);

  // Place order
  const placeOrder = (formData: {
    fullName: string;
    phone: string;
    email: string;
    classLevel: string;
    paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'card';
    transactionId: string;
  }): OrderRecord => {
    const orderId = generateOrderId();
    const downloadFiles: PurchasedFile[] = cart.map(item => ({
      productId: item.product.id,
      productTitle: item.product.title,
      fileName: `${item.product.slug}.pdf`,
      fileSize: item.product.fileSize || '15 MB',
      format: 'PDF',
      downloadUrl: '#'
    }));

    const newOrder: OrderRecord = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      customerName: formData.fullName,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      classLevel: formData.classLevel || 'এইচএসসি / স্কুল',
      items: cart.map(i => ({
        productId: i.product.id,
        title: i.product.title,
        price: i.product.price,
        quantity: i.quantity,
        format: i.product.format,
        fileSize: i.product.fileSize
      })),
      subtotal: cartTotals.subtotal,
      discount: cartTotals.discount,
      total: cartTotals.total,
      couponCode: couponCode || undefined,
      paymentMethod: formData.paymentMethod,
      transactionId: formData.transactionId || 'FREE-ORDER',
      status: 'সফল (অনুমোদিত)',
      downloadFiles
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setCouponCode('');
    showToast('অভিনন্দন! আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে।', 'success');
    return newOrder;
  };

  // Auth actions
  const loginUser = (email: string, _pass: string): boolean => {
    // Mock login
    const user: UserProfile = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0] || 'শিক্ষার্থী',
      email,
      phone: '01700000000',
      classLevel: 'hsc-1st-year',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(user);
    showToast(`স্বাগতম, ${user.name}! আপনি সফলভাবে লগইন করেছেন।`);
    return true;
  };

  const registerUser = (data: { name: string; email: string; phone: string; classLevel: string }): boolean => {
    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      classLevel: data.classLevel,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(newUser);
    showToast(`অভিনন্দন ${data.name}! আপনার অ্যাকাউন্ট তৈরি সম্পন্ন হয়েছে।`);
    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('আপনি লগআউট করেছেন।', 'info');
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...data });
      showToast('প্রোফাইল সফলভাবে আপডেট করা হয়েছে!');
    }
  };

  // Admin Actions
  const addProduct = (product: DigitalProduct) => {
    setProducts(prev => [product, ...prev]);
    showToast(`নতুন প্রোডাক্ট "${product.title}" যোগ করা হয়েছে!`);
  };

  const updateProduct = (product: DigitalProduct) => {
    setProducts(prev => prev.map(p => (p.id === product.id ? product : p)));
    showToast(`প্রোডাক্ট "${product.title}" আপডেট করা হয়েছে!`);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('প্রোডাক্ট মুছে ফেলা হয়েছে।', 'info');
  };

  const resetProductsToDefault = () => {
    setProducts(sampleProducts);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    showToast('সকল প্রোডাক্ট ডিফল্ট অবস্থায় রিসেট করা হয়েছে।', 'success');
  };

  const updateAnnouncement = (text: string) => {
    setAnnouncement(text);
    showToast('অ্যানাউন্সমেন্ট টেক্সট আপডেট করা হয়েছে!');
  };

  const updateOrderStatus = (orderId: string, status: OrderRecord['status']) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`অর্ডার #${orderId} এর স্ট্যাটাস আপডেট করা হয়েছে!`);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        couponCode,
        cartTotals,
        currentUser,
        orders,
        announcement,
        toasts,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        placeOrder,
        loginUser,
        registerUser,
        logoutUser,
        updateUserProfile,
        showToast,
        dismissToast,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        updateAnnouncement,
        updateOrderStatus
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
