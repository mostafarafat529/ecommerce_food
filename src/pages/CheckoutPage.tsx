import { useState, FormEvent, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  Bike,
  Store,
  ShoppingBag,
  ArrowLeft,
  Copy,
  Check,
  AlertCircle,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG } from '../data/restaurant.js';
import { CheckoutFormData, DeliveryMethod } from '../types/menu';
import {
  buildWhatsAppOrderMessage,
  buildWhatsAppUrl,
  formatPrice,
  getItemLineTotal,
} from '../utils/whatsapp';

interface FormErrors {
  customerName?: string;
  phone?: string;
  area?: string;
  address?: string;
}

export function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();

  const [form, setForm] = useState<CheckoutFormData>({
    customerName: '',
    phone: '',
    deliveryMethod: 'delivery',
    area: RESTAURANT_CONFIG.deliveryAreas[0] || '',
    address: '',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [preparedOrder, setPreparedOrder] = useState<{
    message: string;
    waUrl: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const deliveryFee =
    form.deliveryMethod === 'delivery' ? RESTAURANT_CONFIG.deliveryFee : 0;
  const finalTotal = subtotal + deliveryFee;

  const currentOrderSummaryMessage = useMemo(() => {
    if (items.length === 0) return '';
    return buildWhatsAppOrderMessage(items, form, subtotal, deliveryFee, finalTotal);
  }, [items, form, subtotal, deliveryFee, finalTotal]);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!form.customerName.trim() || form.customerName.trim().length < 2) {
      nextErrors.customerName = 'من فضلك اكتب اسمك الكامل';
    }

    const cleanPhone = form.phone.replace(/[\s-]/g, '');
    if (!/^01[0125][0-9]{8}$/.test(cleanPhone) && !/^[0-9]{10,13}$/.test(cleanPhone)) {
      nextErrors.phone = 'من فضلك ادخل رقم هاتف مصري صحيح (مثال: 01012345678)';
    }

    if (form.deliveryMethod === 'delivery') {
      if (!form.area.trim()) {
        nextErrors.area = 'من فضلك اختر المنطقة';
      }
      if (!form.address.trim() || form.address.trim().length < 8) {
        nextErrors.address = 'من فضلك اكتب العنوان بالتفصيل (الشارع، رقم العمارة، الدور)';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleMethodChange = (method: DeliveryMethod) => {
    setForm((prev) => ({ ...prev, deliveryMethod: method }));
    setErrors((prev) => ({ ...prev, area: undefined, address: undefined }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = currentOrderSummaryMessage;
    const waUrl = buildWhatsAppUrl(message);
    setPreparedOrder({ message, waUrl });

    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  const handleCopyMessage = async () => {
    if (!preparedOrder) return;
    try {
      await navigator.clipboard.writeText(preparedOrder.message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback ignored cleanly
    }
  };

  if (items.length === 0 && !preparedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-3xl border border-[#1F140E]/8 p-10 sm:p-14 flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-[#F3EDE3] flex items-center justify-center mb-5">
            <ShoppingBag className="w-10 h-10 text-[#E85D04]" aria-hidden="true" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1F140E] mb-3">
            مفيش منتجات لإتمام الطلب
          </h1>
          <p className="text-sm sm:text-base text-[#5C4B41] max-w-md mb-8">
            أضف الأكلات اللي حابب تطلبها إلى السلة الأول وبعدين ارجع هنا لإرسال الطلب عبر واتساب.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E85D04] hover:bg-[#D04E00] text-white font-bold text-base transition-colors"
          >
            <span>تصفح المنيو</span>
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-[#1F140E]">
          إتمام الطلب عبر واتساب
        </h1>
        <p className="mt-1.5 text-sm sm:text-base text-[#5C4B41]">
          اكتب بياناتك وراجع ملخص الأوردر وهنفتحلك محادثة واتساب برسالة الطلب جاهزة
        </p>
      </div>

      {preparedOrder ? (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#1F140E]/10 p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#1F140E]">
                طلبك جاهز للإرسال على واتساب
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#5C4B41] leading-relaxed">
                تم تجهيز رسالة الطلب وفتح محادثة واتساب الخاصة بمطعم {RESTAURANT_CONFIG.name}.
                من فضلك اضغط زر <strong className="text-[#1F140E]">الإرسال (Send)</strong> داخل واتساب لإتمام التأكيد مع الكاشير.
              </p>
            </div>
          </div>

          <div className="bg-[#FAF7F2] rounded-2xl border border-[#1F140E]/10 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#5C4B41]">معاينة رسالة الطلب</span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E85D04] hover:underline cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>نسخ نص الطلب</span>
                  </>
                )}
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-[#1F140E] leading-relaxed">
              {preparedOrder.message}
            </pre>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={preparedOrder.waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-base transition-colors"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              <span>فتح محادثة واتساب لإرسال الطلب</span>
            </a>
            <button
              type="button"
              onClick={() => setPreparedOrder(null)}
              className="py-3.5 px-5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EDE3] text-[#1F140E] border border-[#1F140E]/15 font-bold text-sm transition-colors cursor-pointer"
            >
              تعديل البيانات
            </button>
          </div>

          <div className="pt-4 border-t border-[#1F140E]/10 flex items-center justify-between text-xs sm:text-sm text-[#5C4B41]">
            <span>لو أرسلت الطلب بالفعل داخل واتساب:</span>
            <Link
              to="/menu"
              onClick={() => clearCart()}
              className="font-bold text-[#E85D04] hover:underline"
            >
              تفريغ السلة والعودة للمنيو
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Customer Details Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-7 bg-white rounded-3xl border border-[#1F140E]/8 p-6 sm:p-8 space-y-6"
          >
            {/* Delivery Method Toggle */}
            <div>
              <span className="block text-sm font-bold text-[#1F140E] mb-3">
                طريقة الاستلام
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleMethodChange('delivery')}
                  aria-pressed={form.deliveryMethod === 'delivery'}
                  className={`flex items-center gap-3 p-4 rounded-2xl border text-right transition-colors cursor-pointer ${
                    form.deliveryMethod === 'delivery'
                      ? 'bg-[#E85D04]/10 border-[#E85D04] text-[#1F140E]'
                      : 'bg-[#FAF7F2] border-[#1F140E]/10 text-[#5C4B41] hover:border-[#1F140E]/25'
                  }`}
                >
                  <Bike
                    className={`w-5 h-5 shrink-0 ${
                      form.deliveryMethod === 'delivery' ? 'text-[#E85D04]' : ''
                    }`}
                    aria-hidden="true"
                  />
                  <div>
                    <div className="font-bold text-sm text-[#1F140E]">
                      توصيل للمنزل
                    </div>
                    <div className="text-xs text-[#5C4B41] tabular-nums">
                      تكلفة التوصيل: {formatPrice(RESTAURANT_CONFIG.deliveryFee)}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleMethodChange('pickup')}
                  aria-pressed={form.deliveryMethod === 'pickup'}
                  className={`flex items-center gap-3 p-4 rounded-2xl border text-right transition-colors cursor-pointer ${
                    form.deliveryMethod === 'pickup'
                      ? 'bg-[#E85D04]/10 border-[#E85D04] text-[#1F140E]'
                      : 'bg-[#FAF7F2] border-[#1F140E]/10 text-[#5C4B41] hover:border-[#1F140E]/25'
                  }`}
                >
                  <Store
                    className={`w-5 h-5 shrink-0 ${
                      form.deliveryMethod === 'pickup' ? 'text-[#E85D04]' : ''
                    }`}
                    aria-hidden="true"
                  />
                  <div>
                    <div className="font-bold text-sm text-[#1F140E]">
                      استلام من المطعم
                    </div>
                    <div className="text-xs text-[#2D6A4F] font-medium">
                      بدون تكلفة توصيل (٠ جنيه)
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="customerName"
                  className="block text-sm font-bold text-[#1F140E] mb-2"
                >
                  الاسم الكامل *
                </label>
                <input
                  id="customerName"
                  type="text"
                  value={form.customerName}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, customerName: e.target.value }));
                    if (errors.customerName) {
                      setErrors((prev) => ({ ...prev, customerName: undefined }));
                    }
                  }}
                  placeholder="مثال: أحمد محمد"
                  className="w-full h-12 px-4 rounded-xl bg-[#FAF7F2] border border-[#1F140E]/15 text-sm text-[#1F140E] focus:outline-none focus:border-[#E85D04]"
                />
                {errors.customerName && (
                  <p className="mt-1.5 text-xs text-[#C83228] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.customerName}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-bold text-[#1F140E] mb-2"
                >
                  رقم الهاتف (موبايل) *
                </label>
                <input
                  id="phone"
                  type="tel"
                  dir="ltr"
                  value={form.phone}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, phone: e.target.value }));
                    if (errors.phone) {
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                    }
                  }}
                  placeholder="01012345678"
                  className="w-full h-12 px-4 rounded-xl bg-[#FAF7F2] border border-[#1F140E]/15 text-sm text-[#1F140E] text-right tabular-nums focus:outline-none focus:border-[#E85D04]"
                />
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-[#C83228] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Area & Detailed Address (shown when delivery selected) */}
            {form.deliveryMethod === 'delivery' ? (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="area"
                    className="block text-sm font-bold text-[#1F140E] mb-2"
                  >
                    المحافظة / المنطقة *
                  </label>
                  <select
                    id="area"
                    value={form.area}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, area: e.target.value }));
                      if (errors.area) {
                        setErrors((prev) => ({ ...prev, area: undefined }));
                      }
                    }}
                    className="w-full h-12 px-4 rounded-xl bg-[#FAF7F2] border border-[#1F140E]/15 text-sm text-[#1F140E] focus:outline-none focus:border-[#E85D04]"
                  >
                    {RESTAURANT_CONFIG.deliveryAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                  {errors.area && (
                    <p className="mt-1.5 text-xs text-[#C83228] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.area}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-bold text-[#1F140E] mb-2"
                  >
                    العنوان بالتفصيل *
                  </label>
                  <textarea
                    id="address"
                    rows={3}
                    value={form.address}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, address: e.target.value }));
                      if (errors.address) {
                        setErrors((prev) => ({ ...prev, address: undefined }));
                      }
                    }}
                    placeholder="اسم الشارع، رقم العمارة، الدور، الشقة، وأقرب علامة مميزة"
                    className="w-full p-4 rounded-xl bg-[#FAF7F2] border border-[#1F140E]/15 text-sm text-[#1F140E] focus:outline-none focus:border-[#E85D04]"
                  />
                  {errors.address && (
                    <p className="mt-1.5 text-xs text-[#C83228] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.address}</span>
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#1F140E]/10 text-sm text-[#5C4B41]">
                <strong className="text-[#1F140E] block mb-1">
                  عنوان الاستلام من المطعم:
                </strong>
                <span>{RESTAURANT_CONFIG.address}</span>
              </div>
            )}

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-bold text-[#1F140E] mb-2"
              >
                ملاحظات إضافية (اختياري)
              </label>
              <textarea
                id="notes"
                rows={2}
                value={form.notes}
                onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="مثال: بدون بصل، صوص زيادة، رن الجرس عند الوصول..."
                className="w-full p-4 rounded-xl bg-[#FAF7F2] border border-[#1F140E]/15 text-sm text-[#1F140E] focus:outline-none focus:border-[#E85D04]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-base flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              <span>إرسال الطلب عبر واتساب</span>
            </button>
          </form>

          {/* Order Summary Sidebar */}
          <aside className="lg:col-span-5 bg-white rounded-3xl border border-[#1F140E]/8 p-6 sm:p-8 space-y-5 sticky top-24">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-extrabold text-[#1F140E]">
                ملخص الطلب
              </h2>
              <Link
                to="/cart"
                className="text-xs font-bold text-[#E85D04] hover:underline"
              >
                تعديل السلة
              </Link>
            </div>

            <ul className="divide-y divide-[#1F140E]/8 max-h-96 overflow-y-auto pl-1">
              {items.map((item) => (
                <li key={item.cartItemId} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-sm text-[#1F140E]">
                        <span className="tabular-nums text-[#E85D04] ml-1.5">
                          {item.quantity}×
                        </span>
                        {item.name}
                      </p>
                      <p className="text-xs text-[#5C4B41] mt-0.5 tabular-nums">
                        الأساسي: {formatPrice(item.basePrice * item.quantity)}
                      </p>
                      {item.selectedAddons.length > 0 && (
                        <p className="text-xs text-[#5C4B41] mt-1 leading-relaxed">
                          إضافات:{' '}
                          {item.selectedAddons
                            .map((a) => `${a.name} (${formatPrice(a.price * item.quantity)})`)
                            .join('، ')}
                        </p>
                      )}
                    </div>
                    <span className="font-bold text-sm text-[#1F140E] tabular-nums whitespace-nowrap">
                      {formatPrice(getItemLineTotal(item))}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-[#1F140E]/10 space-y-2.5 text-sm">
              <div className="flex items-center justify-between text-[#5C4B41]">
                <span>المجموع</span>
                <span className="font-bold text-[#1F140E] tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#5C4B41]">
                <span>التوصيل</span>
                <span className="font-bold text-[#1F140E] tabular-nums">
                  {deliveryFee === 0 ? 'مجاناً (استلام من المطعم)' : formatPrice(deliveryFee)}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1F140E]/10 flex items-center justify-between">
              <span className="font-display text-lg font-extrabold text-[#1F140E]">
                الإجمالي النهائي
              </span>
              <span className="font-display text-2xl font-extrabold text-[#E85D04] tabular-nums">
                {formatPrice(finalTotal)}
              </span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
