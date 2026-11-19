import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurant.js';
import { CATEGORIES } from '../data/categories.js';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

export function Footer() {
  const quickCategories = CATEGORIES.slice(0, 6);

  return (
    <footer className="bg-[#1F140E] text-[#FAF7F2]/90 border-t border-[#1F140E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Summary */}
          <div>
            <Link
              to="/"
              className="font-display text-2xl font-extrabold text-[#FAF7F2] inline-block mb-3"
            >
              {RESTAURANT_CONFIG.name}
            </Link>
            <p className="text-sm font-medium text-[#E85D04] mb-3">
              {RESTAURANT_CONFIG.tagline}
            </p>
            <p className="text-sm text-[#FAF7F2]/70 leading-relaxed max-w-xs">
              أشهى الأكلات المصرية والوجبات السريعة محضرة يومياً بمكونات طازجة وتوصيل سريع لباب بيتك.
            </p>
          </div>

          {/* Site Navigation */}
          <div>
            <h3 className="font-display text-base font-bold text-[#FAF7F2] mb-4">
              روابط سريعة
            </h3>
            <ul className="space-y-2.5 text-sm text-[#FAF7F2]/75">
              <li>
                <Link to="/" className="hover:text-[#E85D04] transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#E85D04] transition-colors">
                  قائمة الطعام (المنيو)
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#E85D04] transition-colors">
                  عن المطعم
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#E85D04] transition-colors">
                  سلة المشتريات
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#E85D04] transition-colors">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="font-display text-base font-bold text-[#FAF7F2] mb-4">
              أقسام المنيو
            </h3>
            <ul className="grid grid-cols-2 gap-2.5 text-sm text-[#FAF7F2]/75">
              {quickCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/menu?category=${cat.id}`}
                    className="hover:text-[#E85D04] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Social */}
          <div>
            <h3 className="font-display text-base font-bold text-[#FAF7F2] mb-4">
              بيانات التواصل
            </h3>
            <ul className="space-y-3 text-sm text-[#FAF7F2]/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E85D04] shrink-0 mt-1" aria-hidden="true" />
                <span>{RESTAURANT_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E85D04] shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${RESTAURANT_CONFIG.phone}`}
                  className="tabular-nums hover:text-[#FAF7F2] transition-colors"
                  dir="ltr"
                >
                  {RESTAURANT_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#E85D04] shrink-0 mt-1" aria-hidden="true" />
                <span>{RESTAURANT_CONFIG.workingHours}</span>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-4 text-xs font-medium text-[#FAF7F2]/70">
              <a
                href={RESTAURANT_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E85D04] transition-colors"
              >
                فيسبوك
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={RESTAURANT_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E85D04] transition-colors"
              >
                إنستجرام
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>واتساب</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 pb-10 sm:pb-2 border-t border-[#FAF7F2]/10 flex flex-col items-center justify-center text-center gap-2.5 text-xs text-[#FAF7F2]/60">
          <p>
            © {new Date().getFullYear()} {RESTAURANT_CONFIG.name}. جميع الحقوق محفوظة.
          </p>
          <p dir="ltr" className="text-[#FAF7F2]/75">
            Designed &amp; Developed by{' '}
            <a
              href="https://portfolio-liart-delta-91.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#E85D04] hover:text-[#FAF7F2] underline underline-offset-4 transition-colors"
            >
              Mostafa Rafat
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
