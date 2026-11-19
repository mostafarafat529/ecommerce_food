import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG } from '../data/restaurant.js';
import { formatPrice, getItemLineTotal, getUnitTotal } from '../utils/whatsapp';
import { FoodImage } from '../components/FoodImage';

export function CartPage() {
  const { items, totalItems, subtotal, updateQuantity, removeItem, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-3xl border border-[#1F140E]/8 p-10 sm:p-14 flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-[#F3EDE3] flex items-center justify-center mb-5">
            <ShoppingBag className="w-10 h-10 text-[#E85D04]" aria-hidden="true" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1F140E] mb-3">
            سلة المشتريات فارغة
          </h1>
          <p className="text-sm sm:text-base text-[#5C4B41] max-w-md mb-8 leading-relaxed">
            لسه مخترتش حاجة تطلبها! تصفح المنيو واختار البرجر أو البيتزا أو الحواوشي اللي نفسك فيه.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E85D04] hover:bg-[#D04E00] text-white font-bold text-base transition-colors"
          >
            <span>العودة إلى المنيو</span>
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-[#1F140E]">
            سلة المشتريات
          </h1>
          <p className="mt-1 text-sm text-[#5C4B41] tabular-nums">
            لديك {totalItems} {totalItems === 1 ? 'منتج' : 'منتجات'} في السلة
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#C83228] hover:underline self-start sm:self-auto cursor-pointer"
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
          <span>تفريغ السلة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <article
              key={item.cartItemId}
              className="bg-white rounded-2xl border border-[#1F140E]/8 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center"
            >
              <div className="w-full sm:w-28 aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden bg-[#F3EDE3] shrink-0">
                <FoodImage
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-display text-lg font-bold text-[#1F140E]">
                    {item.name}
                  </h2>
                  <button
                    type="button"
                    onClick={() => removeItem(item.cartItemId)}
                    aria-label={`حذف ${item.name} من السلة`}
                    className="p-2 rounded-lg text-[#5C4B41] hover:text-[#C83228] hover:bg-[#C83228]/8 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                <p className="mt-1 text-xs text-[#5C4B41] tabular-nums">
                  السعر الأساسي للقطعة: {formatPrice(item.basePrice)}
                </p>

                {item.selectedAddons.length > 0 && (
                  <p className="mt-1.5 text-xs sm:text-sm text-[#5C4B41]">
                    الإضافات:{' '}
                    {item.selectedAddons
                      .map((a) => `${a.name} (+${formatPrice(a.price)})`)
                      .join('، ')}
                  </p>
                )}

                <div className="mt-4 pt-3 border-t border-[#1F140E]/8 flex items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2 bg-[#FAF7F2] border border-[#1F140E]/10 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartItemId, -1)}
                      aria-label="تقليل الكمية"
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-[#1F140E] hover:bg-white transition-colors cursor-pointer"
                    >
                      <Minus className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <span className="w-8 text-center font-bold text-sm tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartItemId, 1)}
                      aria-label="زيادة الكمية"
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-[#1F140E] hover:bg-white transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="text-left">
                    <div className="font-display text-lg font-extrabold text-[#1F140E] tabular-nums">
                      {formatPrice(getItemLineTotal(item))}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-xs text-[#5C4B41] tabular-nums">
                        ({formatPrice(getUnitTotal(item))} للقطعة)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Summary Card */}
        <aside className="lg:col-span-4 bg-white rounded-3xl border border-[#1F140E]/8 p-6 space-y-5 sticky top-24">
          <h2 className="font-display text-xl font-extrabold text-[#1F140E]">
            ملخص السلة
          </h2>

          <div className="space-y-3 text-sm border-b border-[#1F140E]/10 pb-4">
            <div className="flex items-center justify-between text-[#5C4B41]">
              <span>إجمالي المنتجات</span>
              <span className="font-bold text-[#1F140E] tabular-nums">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-[#5C4B41]">
              <span>تكلفة التوصيل</span>
              <span className="font-medium text-[#1F140E] tabular-nums">
                {formatPrice(RESTAURANT_CONFIG.deliveryFee)}
              </span>
            </div>
            <p className="text-xs text-[#5C4B41]">
              * التوصيل مجاني عند اختيار الاستلام من المطعم في الخطوة القادمة.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-display text-base font-bold text-[#1F140E]">
              الإجمالي المتوقع بالتوصيل
            </span>
            <span className="font-display text-xl font-extrabold text-[#E85D04] tabular-nums">
              {formatPrice(subtotal + RESTAURANT_CONFIG.deliveryFee)}
            </span>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              to="/checkout"
              className="w-full py-3.5 px-5 rounded-xl bg-[#E85D04] hover:bg-[#D04E00] text-white font-bold text-base flex items-center justify-center gap-2 transition-colors"
            >
              <span>متابعة إتمام الطلب</span>
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            </Link>

            <Link
              to="/menu"
              className="w-full py-3 px-5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EDE3] text-[#1F140E] border border-[#1F140E]/10 font-bold text-sm flex items-center justify-center transition-colors"
            >
              إضافة أصناف أخرى
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
