import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurant.js';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { to: '/', label: 'الرئيسية' },
  { to: '/menu', label: 'المنيو' },
  { to: '/about', label: 'عن المطعم' },
  { to: '/contact', label: 'تواصل معنا' },
];

export function Navbar() {
  const { totalItems, openDrawer } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#1F140E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          to="/"
          className="font-display text-xl sm:text-2xl font-extrabold text-[#1F140E] tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E85D04]"
        >
          {RESTAURANT_CONFIG.name}
        </Link>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-8 text-[15px] font-medium"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `whitespace-nowrap shrink-0 py-1 transition-colors duration-150 border-b-2 ${
                  isActive
                    ? 'text-[#E85D04] border-[#E85D04] font-bold'
                    : 'text-[#5C4B41] border-transparent hover:text-[#1F140E] hover:border-[#1F140E]/25'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Primary Cart Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={openDrawer}
            aria-label={`فتح سلة المشتريات (${totalItems} منتجات)`}
            className="inline-flex items-center gap-2.5 px-4 py-2 min-h-[42px] rounded-xl bg-[#1F140E] text-[#FAF7F2] hover:bg-[#342218] transition-colors duration-150 text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D04]"
          >
            <ShoppingBag className="w-4 h-4 text-[#E85D04]" aria-hidden="true" />
            <span>السلة</span>
            <span className="tabular-nums font-bold text-[#FAF7F2]/90">
              ({totalItems})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[#1F140E]/15 text-[#1F140E] hover:bg-[#F3EDE3] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1F140E]/10 bg-[#FAF7F2] px-4 py-4">
          <nav aria-label="قائمة الموبايل" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E85D04]/10 text-[#E85D04] font-bold'
                      : 'text-[#1F140E] hover:bg-[#F3EDE3]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/cart"
              className="mt-2 px-4 py-3 rounded-xl text-base font-medium text-[#5C4B41] hover:bg-[#F3EDE3] border border-[#1F140E]/10 text-center"
            >
              صفحة السلة الكاملة ({totalItems})
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
