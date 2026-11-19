import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { CATEGORIES } from '../data/categories.js';
import { PRODUCTS, SPECIAL_OFFERS } from '../data/products.js';
import { ProductCard } from '../components/ProductCard';
import { normalizeArabicText } from '../utils/whatsapp';
import { Product } from '../types/menu';

export function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('q') || '';

  const allItems = useMemo<Product[]>(
    () => [...(PRODUCTS as Product[]), ...(SPECIAL_OFFERS as Product[])],
    []
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalizeArabicText(searchQuery);

    return allItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' ||
        (activeCategory === 'offers'
          ? Boolean(item.isSpecialOffer)
          : item.categoryId === activeCategory && !item.isSpecialOffer);

      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;

      const nameNorm = normalizeArabicText(item.name);
      const descNorm = normalizeArabicText(item.description);
      return nameNorm.includes(normalizedQuery) || descNorm.includes(normalizedQuery);
    });
  }, [allItems, activeCategory, searchQuery]);

  const setCategory = (categoryId: string) => {
    const next = new URLSearchParams(searchParams);
    if (categoryId === 'all') {
      next.delete('category');
    } else {
      next.set('category', categoryId);
    }
    setSearchParams(next, { replace: true });
  };

  const setQuery = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value) {
      next.delete('q');
    } else {
      next.set('q', value);
    }
    setSearchParams(next, { replace: true });
  };

  const resetFilters = () => {
    setSearchParams({}, { replace: true });
  };

  const activeCategoryLabel =
    activeCategory === 'all'
      ? 'جميع الأصناف'
      : activeCategory === 'offers'
      ? 'العروض الخاصة'
      : CATEGORIES.find((c) => c.id === activeCategory)?.name || 'جميع الأصناف';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Page Title & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1F140E]">
            منيو لقمة مزاج
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#5C4B41]">
            تصفح {CATEGORIES.length} قسم متنوع، اختار أكلتك وإضافاتك وأضفها للسلة
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-96">
          <Search
            className="w-5 h-5 text-[#5C4B41] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن أكلة.. برجر، بيتزا، حواوشي، كريب"
            aria-label="ابحث في المنيو"
            className="w-full h-12 pr-11 pl-10 rounded-xl bg-white border border-[#1F140E]/15 text-sm text-[#1F140E] placeholder:text-[#5C4B41]/60 focus:outline-none focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/15"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="مسح البحث"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center text-[#5C4B41] hover:bg-[#F3EDE3] cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div
        role="tablist"
        aria-label="تصفية حسب القسم"
        className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-[#1F140E]/10"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === 'all'}
          onClick={() => setCategory('all')}
          className={`px-4 py-2.5 min-h-[42px] rounded-xl text-sm font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-[#E85D04] text-white'
              : 'bg-white text-[#5C4B41] border border-[#1F140E]/10 hover:bg-[#F3EDE3] hover:text-[#1F140E]'
          }`}
        >
          الكل
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === 'offers'}
          onClick={() => setCategory('offers')}
          className={`px-4 py-2.5 min-h-[42px] rounded-xl text-sm font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
            activeCategory === 'offers'
              ? 'bg-[#C83228] text-white'
              : 'bg-white text-[#C83228] border border-[#C83228]/25 hover:bg-[#C83228]/8'
          }`}
        >
          العروض الخاصة
        </button>

        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={activeCategory === category.id}
            onClick={() => setCategory(category.id)}
            className={`px-4 py-2.5 min-h-[42px] rounded-xl text-sm font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeCategory === category.id
                ? 'bg-[#E85D04] text-white'
                : 'bg-white text-[#5C4B41] border border-[#1F140E]/10 hover:bg-[#F3EDE3] hover:text-[#1F140E]'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Results Header (Unboxed metadata) */}
      <div className="flex items-center justify-between gap-4 mb-6 text-sm text-[#5C4B41]">
        <div>
          <span>القسم: <strong className="text-[#1F140E]">{activeCategoryLabel}</strong></span>
          <span className="mx-2" aria-hidden="true">·</span>
          <span className="tabular-nums">{filteredProducts.length} صنف</span>
        </div>

        {(activeCategory !== 'all' || searchQuery) && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-bold text-[#E85D04] hover:underline cursor-pointer"
          >
            إعادة ضبط التصفية
          </button>
        )}
      </div>

      {/* Products Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#1F140E]/8 p-12 text-center max-w-lg mx-auto my-8">
          <h2 className="font-display text-xl font-bold text-[#1F140E] mb-2">
            مفيش أصناف مطابقة لبحثك
          </h2>
          <p className="text-sm text-[#5C4B41] mb-6">
            جرب تبحث بكلمة تانية أو استعرض كل أقسام المنيو.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-6 py-3 rounded-xl bg-[#E85D04] hover:bg-[#D04E00] text-white text-sm font-bold transition-colors cursor-pointer"
          >
            عرض كل المنيو
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showCategory={activeCategory === 'all'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
