import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ShopProvider } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { siteConfig } from './config';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { AccountPage } from './pages/AccountPage';
import { WishlistPage } from './pages/WishlistPage';
import { LoginPage, RegisterPage, ForgotPasswordPage } from './pages/AuthPages';
import {
  AboutPage,
  ContactPage,
  FAQPage,
  HowToBuyPage,
  FreeSamplePage
} from './pages/InfoPages';
import {
  RefundPolicyPage,
  PrivacyPolicyPage,
  TermsPolicyPage,
  DigitalDeliveryPolicyPage,
  CancellationPolicyPage
} from './pages/PolicyPages';
import { TeachersCornerPage } from './pages/TeachersCornerPage';
import { CareerExamPage } from './pages/CareerExamPage';
import { JobCircularPage } from './pages/JobCircularPage';
import { BlogPage, BlogPostDetailPage } from './pages/BlogPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top automatically on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <ShopProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Helmet>
            <title>{siteConfig.siteName} — স্কুল ও কলেজ ডিজিটাল স্টাডি প্রোডাক্টস</title>
            <meta name="description" content={siteConfig.tagline} />
          </Helmet>

          <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#0a0a0a] antialiased">
            <Header />

            <div className="flex-1">
              <Routes>
                {/* Home */}
                <Route path="/" element={<HomePage />} />

                {/* School Routes */}
                <Route
                  path="/school"
                  element={
                    <ProductListingPage
                      forcedSection="school"
                      pageTitle="স্কুল সেকশন — ক্লাস ৬ থেকে ১০ (এসএসসি)"
                      pageDescription="সকল ক্লাসের সাধারণ ও উচ্চতর গণিত, বিজ্ঞান নোটস ও মডেল টেস্ট"
                    />
                  }
                />
                <Route
                  path="/school/:classLevel"
                  element={
                    <ProductListingPage
                      forcedSection="school"
                    />
                  }
                />

                {/* College Routes */}
                <Route
                  path="/college"
                  element={
                    <ProductListingPage
                      forcedSection="college"
                      pageTitle="কলেজ সেকশন — HSC ১ম ও ২য় বর্ষ (বিজ্ঞান বিভাগ)"
                      pageDescription="HSC পদার্থবিজ্ঞান, রসায়ন, উচ্চতর গণিত, জীববিজ্ঞান ও ICT ডিজিটাল হ্যান্ডনোটস"
                    />
                  }
                />
                <Route
                  path="/college/:classLevel"
                  element={
                    <ProductListingPage
                      forcedSection="college"
                    />
                  }
                />

                {/* Teacher's Corner */}
                <Route path="/teachers-corner" element={<TeachersCornerPage />} />

                {/* Career & Exam */}
                <Route path="/career-and-exam" element={<CareerExamPage />} />

                {/* Job Circular */}
                <Route path="/job-circular" element={<JobCircularPage />} />

                {/* General Shop & Categories */}
                <Route
                  path="/shop"
                  element={
                    <ProductListingPage
                      pageTitle="সকল ডিজিটাল স্টাডি প্রোডাক্টস"
                      pageDescription="স্কুল ও কলেজ পর্যায়ের সকল শ্রেণির হ্যান্ডনোটস, প্ল্যানার ও মডেল টেস্ট"
                    />
                  }
                />
                <Route
                  path="/free"
                  element={
                    <ProductListingPage
                      forcedFreeOnly={true}
                      pageTitle="১০০% ফ্রি ডিজিটাল প্রোডাক্টস"
                      pageDescription="বিনামূল্যে সরাসরি ডাউনলোড করুন প্রয়োজনীয় সূত্র শিট, পকেট কার্ড ও স্টাডি জার্নাল"
                    />
                  }
                />
                <Route
                  path="/ebooks"
                  element={
                    <ProductListingPage
                      pageTitle="সকল ডিজিটাল ই-বুক ও স্টাডি গাইড"
                      pageDescription="হাই রেজোলিউশন প্রিন্ট ফ্রেন্ডলি এবং মোবাইল রিডিং উপযোগী পূর্ণাঙ্গ ই-বুক সংকলন"
                    />
                  }
                />
                <Route
                  path="/category/:slug"
                  element={<ProductListingPage />}
                />

                {/* Product Detail */}
                <Route path="/product/:slug" element={<ProductDetailPage />} />

                {/* Cart & Checkout */}
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success/:id" element={<OrderSuccessPage />} />

                {/* Account & Wishlist */}
                <Route path="/my-account" element={<AccountPage />} />
                <Route path="/my-account/orders" element={<AccountPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />

                {/* Auth */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                {/* Info & Support */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/how-to-buy" element={<HowToBuyPage />} />
                <Route path="/free-sample" element={<FreeSamplePage />} />

                {/* Blog */}
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostDetailPage />} />

                {/* Policies */}
                <Route path="/refund-policy" element={<RefundPolicyPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-and-conditions" element={<TermsPolicyPage />} />
                <Route path="/digital-delivery-policy" element={<DigitalDeliveryPolicyPage />} />
                <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />

                {/* Admin */}
                <Route path="/admin" element={<AdminPage />} />

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>

            <Footer />
            <ToastContainer />
          </div>
        </BrowserRouter>
      </ShopProvider>
    </HelmetProvider>
  );
}
