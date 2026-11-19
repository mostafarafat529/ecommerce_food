import { CheckCircle2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function CartToast() {
  const { toastMessage, dismissToast, openDrawer } = useCart();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 max-w-sm bg-[#1F140E] text-[#FAF7F2] rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-[#FAF7F2]/10"
    >
      <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0" aria-hidden="true" />
      <p className="text-xs sm:text-sm font-medium flex-1">{toastMessage}</p>
      <button
        type="button"
        onClick={() => {
          dismissToast();
          openDrawer();
        }}
        className="text-xs font-bold text-[#E85D04] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
      >
        عرض السلة
      </button>
      <button
        type="button"
        onClick={dismissToast}
        aria-label="إغلاق الإشعار"
        className="text-[#FAF7F2]/60 hover:text-white cursor-pointer"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
