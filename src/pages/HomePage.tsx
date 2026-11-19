import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Flame,
  Leaf,
  Utensils,
  Smartphone,
  Bike,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
} from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurant.js';
import { CATEGORIES } from '../data/categories.js';
import { PRODUCTS, SPECIAL_OFFERS } from '../data/products.js';
import { ProductCard } from '../components/ProductCard';
import { FoodImage } from '../components/FoodImage';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

const FEATURE_ICONS: Record<string, typeof Flame> = {
  taste: Flame,
  fresh: Leaf,
  variety: Utensils,
  'easy-order': Smartphone,
  delivery: Bike,
};

export function HomePage() {
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 6);

  return (
    <div>
      {/* A. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 lg:pt-12 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-6 flex flex-col justify-center py-2"
          >
            <p className="text-sm font-bold text-[#E85D04] mb-3">
              {RESTAURANT_CONFIG.name} · {RESTAURANT_CONFIG.tagline}
            </p>

            <h1 className="font-display text-[clamp(2.15rem,4vw,3.4rem)] font-extrabold text-[#1F140E] leading-[1.2] text-balance">
              {RESTAURANT_CONFIG.hero.headline}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#5C4B41] leading-relaxed max-w-xl">
              {RESTAURANT_CONFIG.hero.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#E85D04] hover:bg-[#D04E00] text-white font-bold text-base transition-colors whitespace-nowrap shrink-0"
              >
                <span>{RESTAURANT_CONFIG.hero.primaryCta}</span>
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </Link>

              <a
                href="#categories"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F3EDE3] text-[#1F140E] border border-[#1F140E]/15 font-bold text-base transition-colors whitespace-nowrap shrink-0"
              >
                <span>{RESTAURANT_CONFIG.hero.secondaryCta}</span>
              </a>
            </div>

            <div className="mt-10 pt-6 border-t border-[#1F140E]/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#5C4B41]">
              <span>توصيل خلال <strong className="text-[#1F140E] tabular-nums">{RESTAURANT_CONFIG.estimatedDeliveryTime}</strong></span>
              <span aria-hidden="true">·</span>
              <span>طلب مباشر عبر واتساب</span>
              <span aria-hidden="true">·</span>
              <span>تحضير طازج يومياً</span>
            </div>
          </motion.div>

          {/* Media Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-6"
          >
            <div className="h-full min-h-[280px] sm:min-h-[380px] lg:min-h-[440px] rounded-3xl overflow-hidden bg-[#F3EDE3] border border-[#1F140E]/8 shadow-sm">
              <FoodImage
                src={RESTAURANT_CONFIG.hero.image}
                alt={`سفرة أكلات ${RESTAURANT_CONFIG.name}`}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* B. Categories Section */}
      <section id="categories" className="bg-white border-y border-[#1F140E]/8 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1F140E]">
                أقسام المنيو
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#5C4B41]">
                اختار القسم اللي بتحبه واستكشف كل الأصناف المتاحة
              </p>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E85D04] hover:text-[#D04E00] whitespace-nowrap"
            >
              <span>كل المنيو</span>
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
            {CATEGORIES.map((category) => {
              const count = PRODUCTS.filter((p) => p.categoryId === category.id).length;
              return (
                <Link
                  key={category.id}
                  to={`/menu?category=${category.id}`}
                  className="group bg-[#FAF7F2] hover:bg-[#F3EDE3] rounded-2xl border border-[#1F140E]/8 overflow-hidden flex flex-col transition-all duration-150 hover:-translate-y-0.5"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#F3EDE3]">
                    <FoodImage
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3.5 text-center">
                    <h3 className="font-display text-sm sm:text-base font-bold text-[#1F140E] group-hover:text-[#E85D04] transition-colors">
                      {category.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#5C4B41] tabular-nums">
                      {count} أصناف
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* C. Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1F140E]">
              الأكثر طلباً
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5C4B41]">
              أشهر الأصناف اللي عملاؤنا بيطلبوها كل يوم
            </p>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E85D04] hover:text-[#D04E00] whitespace-nowrap"
          >
            <span>تصفح باقي الأصناف</span>
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* D. Special Offers Section */}
      <section className="bg-[#F3EDE3]/70 border-y border-[#1F140E]/8 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-bold text-[#C83228] mb-1.5">
              توفير على مزاجك
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1F140E]">
              عروض ووجبات التوفير
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5C4B41]">
              بوكسات وعروض جاهزة للمة الصحاب والعائلة بأفضل سعر
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIAL_OFFERS.map((offer) => (
              <ProductCard key={offer.id} product={offer} showCategory={false} />
            ))}
          </div>
        </div>
      </section>

      {/* E. Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="max-w-2xl mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1F140E]">
            ليه تطلب من {RESTAURANT_CONFIG.name}؟
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5C4B41]">
            بنشتغل على كل تفصيلة من أول اختيار المكونات لحد وصول الأوردر لباب بيتك
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {RESTAURANT_CONFIG.features.map((feature) => {
            const Icon = FEATURE_ICONS[feature.id] || Utensils;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-2xl border border-[#1F140E]/8 p-6 flex flex-col gap-3"
              >
                <div className="w-11 h-11 rounded-xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-base font-bold text-[#1F140E]">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#5C4B41] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* F & G. About + Contact Preview */}
      <section className="bg-white border-t border-[#1F140E]/8 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* About Story */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-8">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1F140E]">
                  {RESTAURANT_CONFIG.about.title}
                </h2>
                <p className="mt-4 text-base text-[#1F140E] font-medium leading-relaxed">
                  {RESTAURANT_CONFIG.about.lead}
                </p>
                <p className="mt-3 text-sm sm:text-base text-[#5C4B41] leading-relaxed">
                  {RESTAURANT_CONFIG.about.story}
                </p>
                <div className="mt-6">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#E85D04] hover:text-[#D04E00]"
                  >
                    <span>اقرأ أكتر عن مطبخنا</span>
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#1F140E]/10">
                {RESTAURANT_CONFIG.about.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#E85D04] tabular-nums">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs sm:text-sm text-[#5C4B41]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="lg:col-span-5 bg-[#FAF7F2] rounded-3xl border border-[#1F140E]/10 p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div>
                <h3 className="font-display text-xl font-extrabold text-[#1F140E] mb-5">
                  تواصل معانا أو شرفنا
                </h3>

                <ul className="space-y-4 text-sm sm:text-base text-[#5C4B41]">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#E85D04] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{RESTAURANT_CONFIG.address}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#E85D04] shrink-0" aria-hidden="true" />
                    <a
                      href={`tel:${RESTAURANT_CONFIG.phone}`}
                      className="font-bold text-[#1F140E] tabular-nums hover:text-[#E85D04]"
                      dir="ltr"
                    >
                      {RESTAURANT_CONFIG.phone}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#E85D04] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{RESTAURANT_CONFIG.workingHours}</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#1F140E]/10">
                <a
                  href={buildGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-sm font-bold transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>كلمنا واتساب</span>
                </a>
                <Link
                  to="/contact"
                  className="flex-1 inline-flex items-center justify-center py-3 px-4 rounded-xl bg-white hover:bg-[#F3EDE3] text-[#1F140E] border border-[#1F140E]/15 text-sm font-bold transition-colors whitespace-nowrap"
                >
                  صفحة التواصل
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
