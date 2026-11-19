import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CartToast } from './components/CartToast';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1F140E]" dir="rtl">
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />

          <ProductModal />
          <CartDrawer />
          <CartToast />
          <WhatsAppFloat />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
