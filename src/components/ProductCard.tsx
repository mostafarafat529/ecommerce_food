import { Plus } from 'lucide-react';
import { Product } from '../types/menu';
import { CATEGORIES } from '../data/categories.js';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/whatsapp';
import { FoodImage } from './FoodImage';

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
}

export function ProductCard({ product, showCategory = true }: ProductCardProps) {
  const { openProductModal, addToCart } = useCart();

  const categoryName =
    CATEGORIES.find((cat) => cat.id === product.categoryId)?.name || 'أصناف المطعم';

  return (
    <article className="group bg-white rounded-2xl border border-[#1F140E]/8 overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#1F140E]/6">
      {/* Image trigger for Product Details Modal */}
      <button
        type="button"
        onClick={() => openProductModal(product)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3EDE3] text-right cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D04]"
      >
        <FoodImage
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-[#1F140E]/60 flex items-center justify-center">
            <span className="text-white text-sm font-bold">غير متوفر حالياً</span>
          </div>
        )}
      </button>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Unboxed metadata (zero-pill discipline) */}
          <div className="flex items-center gap-2 text-xs text-[#5C4B41] mb-1.5">
            {showCategory && <span>{categoryName}</span>}
            {showCategory && <span aria-hidden="true">·</span>}
            <span className={product.available ? 'text-[#2D6A4F] font-medium' : 'text-[#C83228] font-medium'}>
              {product.available ? 'متوفر' : 'نفذت الكمية'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => openProductModal(product)}
            className="text-right w-full cursor-pointer group/title"
          >
            <h3 className="font-display text-lg font-bold text-[#1F140E] group-hover/title:text-[#E85D04] transition-colors leading-snug">
              {product.name}
            </h3>
          </button>

          <p className="mt-1.5 text-sm text-[#5C4B41] leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-[#1F140E]/8 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-[#1F140E] tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#5C4B41]/70 line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {product.addons && product.addons.length > 0 && (
              <button
                type="button"
                onClick={() => openProductModal(product)}
                className="px-3 py-2 min-h-[40px] rounded-xl text-xs font-semibold text-[#5C4B41] hover:text-[#1F140E] hover:bg-[#F3EDE3] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                تفاصيل
              </button>
            )}
            <button
              type="button"
              disabled={!product.available}
              onClick={() => addToCart(product, 1, [])}
              aria-label={`أضف ${product.name} إلى السلة`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-xl bg-[#E85D04] hover:bg-[#D04E00] disabled:bg-[#1F140E]/20 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D04]"
            >
              <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>أضف للسلة</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
