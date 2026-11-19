import { Link } from 'react-router-dom';
import { ArrowLeft, Flame, Leaf, Utensils, Smartphone, Bike } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurant.js';
import { FoodImage } from '../components/FoodImage';

const FEATURE_ICONS: Record<string, typeof Flame> = {
  taste: Flame,
  fresh: Leaf,
  variety: Utensils,
  'easy-order': Smartphone,
  delivery: Bike,
};

export function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
      {/* Intro Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        <div className="lg:col-span-6 flex flex-col justify-center">
          <p className="text-sm font-bold text-[#E85D04] mb-2">
            عن مطعم {RESTAURANT_CONFIG.name}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1F140E] leading-tight text-balance">
            {RESTAURANT_CONFIG.about.title}
          </h1>
          <p className="mt-5 text-base sm:text-lg font-medium text-[#1F140E] leading-relaxed">
            {RESTAURANT_CONFIG.about.lead}
          </p>
          <p className="mt-4 text-sm sm:text-base text-[#5C4B41] leading-relaxed">
            {RESTAURANT_CONFIG.about.story}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#E85D04] hover:bg-[#D04E00] text-white font-bold text-sm sm:text-base transition-colors"
            >
              <span>تصفح المنيو واطلب الآن</span>
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white hover:bg-[#F3EDE3] text-[#1F140E] border border-[#1F140E]/15 font-bold text-sm sm:text-base transition-colors"
            >
              تواصل معنا
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="h-full min-h-[280px] sm:min-h-[360px] rounded-3xl overflow-hidden bg-[#F3EDE3] border border-[#1F140E]/8">
            <FoodImage
              src={RESTAURANT_CONFIG.about.image}
              alt={`أكلات ${RESTAURANT_CONFIG.name}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="bg-white rounded-3xl border border-[#1F140E]/8 p-8 sm:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-right">
          {RESTAURANT_CONFIG.about.stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#E85D04] tabular-nums">
                {stat.value}
              </div>
              <div className="mt-1.5 text-sm sm:text-base font-medium text-[#5C4B41]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Grid */}
      <section>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1F140E] mb-8">
          معايير الجودة في مطبخنا
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESTAURANT_CONFIG.features.map((feature) => {
            const Icon = FEATURE_ICONS[feature.id] || Utensils;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-2xl border border-[#1F140E]/8 p-6 space-y-3"
              >
                <div className="w-11 h-11 rounded-xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#1F140E]">
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
    </div>
  );
}
