import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG } from '../data/restaurant.js';
import { formatPrice, getItemLineTotal } from '../utils/whatsapp';
import { FoodImage } from './FoodImage';

export function CartDrawer() {
  const {
    items,
    totalItems,
    subtotal,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
  } = useCart();

  useEffect(() => {
    if (!isDrawerOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1F140E]/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="سلة المشتريات"
      onClick={closeDrawer}
    >
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full flex flex-col shadow-2xl border-r border-[#1F140E]/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-[#1F140E]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#E85D04]" aria-hidden="true" />
            <h2 className="font-display text-lg font-extrabold text-[#1F140E]">
              سلة المشتريات ({totalItems})
            </h2>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="إغلاق السلة"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#5C4B41] hover:bg-[#F3EDE3] hover:text-[#1F140E] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-[#F3EDE3] flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-[#E85D04]" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#1F140E] mb-2">
                سلتك فاضية دلوقتي
              </h3>
              <p className="text-sm text-[#5C4B41] max-w-xs mb-6 leading-relaxed">
                اختار أكلتك المفضلة من المنيو وأضفها للسلة عشان نجهزلك طلبك عبر واتساب.
              </p>
              <Link
                to="/menu"
                onClick={closeDrawer}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E85D04] hover:bg-[#D04E00] text-white text-sm font-bold transition-colors"
              >
                <span>تصفح المنيو</span>
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.cartItemId}
                  className="bg-white rounded-2xl border border-[#1F140E]/8 p-3.5 flex gap-3.5"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F3EDE3] shrink-0">
                    <FoodImage
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display text-sm font-bold text-[#1F140E] leading-snug">
                          {item.name}
                        </h3>
                        {item.selectedAddons.length > 0 && (
                          <p className="mt-1 text-xs text-[#5C4B41] leading-relaxed">
                            +{' '}
                            {item.selectedAddons
                              .map((a) => `${a.name} (${a.price} ${RESTAURANT_CONFIG.currency})`)
                              .join('، ')}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.cartItemId)}
                        aria-label={`حذف ${item.name}`}
                        className="p-1.5 rounded-lg text-[#5C4B41] hover:text-[#C83228] hover:bg-[#C83228]/8 transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-1 bg-[#FAF7F2] border border-[#1F140E]/10 rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          aria-label="تقليل الكمية"
                          className="w-7 h-7 rounded-md flex items-center justify-center text-[#1F140E] hover:bg-white transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          aria-label="زيادة الكمية"
                          className="w-7 h-7 rounded-md flex items-center justify-center text-[#1F140E] hover:bg-white transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      <span className="font-bold text-sm text-[#1F140E] tabular-nums">
                        {formatPrice(getItemLineTotal(item))}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-[#1F140E]/10 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-[#5C4B41]">
                <span>إجمالي المنتجات</span>
                <span className="font-bold text-[#1F140E] tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#5C4B41]">
                <span>تكلفة التوصيل (تُحسب عند الدفع)</span>
                <span className="tabular-nums">
                  {formatPrice(RESTAURANT_CONFIG.deliveryFee)} أو مجاناً للاستلام
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/cart"
                onClick={closeDrawer}
                className="py-3 px-4 rounded-xl border border-[#1F140E]/15 text-[#1F140E] hover:bg-[#F3EDE3] text-sm font-bold text-center transition-colors"
              >
                عرض السلة
              </Link>
              <Link
                to="/checkout"
                onClick={closeDrawer}
                className="py-3 px-4 rounded-xl bg-[#E85D04] hover:bg-[#D04E00] text-white text-sm font-bold text-center transition-colors"
              >
                إتمام الطلب
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
