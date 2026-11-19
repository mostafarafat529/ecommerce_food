import { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/categories.js';
import { Addon } from '../types/menu';
import { formatPrice } from '../utils/whatsapp';
import { FoodImage } from './FoodImage';

export function ProductModal() {
  const { activeProduct, closeProductModal, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);

  useEffect(() => {
    if (activeProduct) {
      setQuantity(1);
      setSelectedAddons([]);
    }
  }, [activeProduct]);

  useEffect(() => {
    if (!activeProduct) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeProductModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProduct, closeProductModal]);

  if (!activeProduct) return null;

  const categoryName =
    CATEGORIES.find((c) => c.id === activeProduct.categoryId)?.name || 'المنيو';

  const toggleAddon = (addon: Addon) => {
    setSelectedAddons((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const addonsSum = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const totalPrice = (activeProduct.price + addonsSum) * quantity;

  const handleAdd = () => {
    addToCart(activeProduct, quantity, selectedAddons);
    closeProductModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#1F140E]/60 backdrop-blur-xs p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={closeProductModal}
    >
      <div
        className="bg-[#FAF7F2] w-full sm:max-w-xl max-h-[92vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-[#1F140E]/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Image Area */}
        <div className="relative aspect-[16/10] w-full bg-[#F3EDE3] shrink-0">
          <FoodImage
            src={activeProduct.image}
            alt={activeProduct.name}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={closeProductModal}
            aria-label="إغلاق تفاصيل المنتج"
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[#FAF7F2]/95 text-[#1F140E] hover:bg-white flex items-center justify-center shadow-md cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Details Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5C4B41] mb-1.5">
              <span>{categoryName}</span>
              <span aria-hidden="true">·</span>
              <span className={activeProduct.available ? 'text-[#2D6A4F] font-semibold' : 'text-[#C83228] font-semibold'}>
                {activeProduct.available ? 'متوفر للطلب الآن' : 'غير متوفر حالياً'}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <h2
                id="product-modal-title"
                className="font-display text-2xl font-extrabold text-[#1F140E]"
              >
                {activeProduct.name}
              </h2>
              <span className="font-display text-xl font-extrabold text-[#E85D04] tabular-nums whitespace-nowrap">
                {formatPrice(activeProduct.price)}
              </span>
            </div>

            <p className="mt-2.5 text-sm sm:text-base text-[#5C4B41] leading-relaxed">
              {activeProduct.description}
            </p>
          </div>

          {/* Optional Add-ons */}
          {activeProduct.addons && activeProduct.addons.length > 0 && (
            <div className="pt-4 border-t border-[#1F140E]/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-base font-bold text-[#1F140E]">
                  إضافات اختيارية
                </h3>
                <span className="text-xs text-[#5C4B41]">اختار اللي تحبه</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeProduct.addons.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon)}
                      aria-pressed={isChecked}
                      className={`flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl border text-right transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-[#E85D04]/10 border-[#E85D04] text-[#1F140E]'
                          : 'bg-white border-[#1F140E]/10 text-[#1F140E] hover:border-[#1F140E]/25'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 text-sm font-medium">
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                            isChecked
                              ? 'bg-[#E85D04] border-[#E85D04] text-white'
                              : 'border-[#1F140E]/25 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                        </span>
                        <span>{addon.name}</span>
                      </span>
                      <span className="text-xs font-bold text-[#E85D04] tabular-nums whitespace-nowrap">
                        +{formatPrice(addon.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Stepper */}
          <div className="pt-4 border-t border-[#1F140E]/10 flex items-center justify-between">
            <span className="font-display text-base font-bold text-[#1F140E]">
              الكمية
            </span>
            <div className="inline-flex items-center gap-3 bg-white border border-[#1F140E]/12 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="تقليل الكمية"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[#1F140E] hover:bg-[#F3EDE3] transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" aria-hidden="true" />
              </button>
              <span className="w-8 text-center font-bold text-base tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="زيادة الكمية"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[#1F140E] hover:bg-[#F3EDE3] transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Footer CTA */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#1F140E]/10 shrink-0">
          <button
            type="button"
            disabled={!activeProduct.available}
            onClick={handleAdd}
            className="w-full py-3.5 px-6 rounded-xl bg-[#E85D04] hover:bg-[#D04E00] disabled:bg-[#1F140E]/20 disabled:cursor-not-allowed text-white font-bold text-base flex items-center justify-between gap-4 transition-colors cursor-pointer"
          >
            <span className="inline-flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              <span>أضف إلى السلة</span>
            </span>
            <span className="tabular-nums font-extrabold">
              {formatPrice(totalPrice)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
