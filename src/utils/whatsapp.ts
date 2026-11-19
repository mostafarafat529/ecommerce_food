import { RESTAURANT_CONFIG } from '../data/restaurant.js';
import { CartItem, CheckoutFormData } from '../types/menu';

export function formatPrice(amount: number): string {
  return `${amount.toLocaleString('en-US')} ${RESTAURANT_CONFIG.currency}`;
}

export function getUnitTotal(item: CartItem): number {
  const addonsSum = item.selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  return item.basePrice + addonsSum;
}

export function getItemLineTotal(item: CartItem): number {
  return getUnitTotal(item) * item.quantity;
}

export function normalizeArabicText(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[\u064B-\u065F]/g, '');
}

export function buildWhatsAppOrderMessage(
  items: CartItem[],
  form: CheckoutFormData,
  subtotal: number,
  deliveryFee: number,
  finalTotal: number
): string {
  const lines: string[] = [];

  lines.push(`السلام عليكم، عايز أطلب أوردر من ${RESTAURANT_CONFIG.name}.`);
  lines.push('');
  lines.push('بيانات العميل:');
  lines.push(`الاسم: ${form.customerName.trim()}`);
  lines.push(`رقم الهاتف: ${form.phone.trim()}`);
  lines.push('');

  const methodLabel =
    form.deliveryMethod === 'delivery' ? 'توصيل للمنزل' : 'استلام من المطعم';
  lines.push(`طريقة الاستلام: ${methodLabel}`);

  if (form.deliveryMethod === 'delivery') {
    const fullAddress = form.area
      ? `${form.area} - ${form.address.trim()}`
      : form.address.trim();
    lines.push(`العنوان: ${fullAddress}`);
  } else {
    lines.push(`فرع الاستلام: ${RESTAURANT_CONFIG.address}`);
  }

  lines.push('');
  lines.push('تفاصيل الطلب:');
  lines.push('');

  items.forEach((item, index) => {
    const itemBaseTotal = item.basePrice * item.quantity;
    lines.push(`${index + 1}- ${item.name}`);
    lines.push(`الكمية: ${item.quantity}`);
    lines.push(`السعر الأساسي: ${itemBaseTotal} ${RESTAURANT_CONFIG.currency}`);

    if (item.selectedAddons.length > 0) {
      const addonsText = item.selectedAddons
        .map((addon) => `${addon.name} (${addon.price * item.quantity} ${RESTAURANT_CONFIG.currency})`)
        .join('، ');
      lines.push(`الإضافات: ${addonsText}`);
    }

    lines.push(`إجمالي الصنف: ${getItemLineTotal(item)} ${RESTAURANT_CONFIG.currency}`);
    lines.push('');
  });

  if (form.notes.trim()) {
    lines.push(`ملاحظات العميل: ${form.notes.trim()}`);
    lines.push('');
  }

  lines.push(`المجموع: ${subtotal} ${RESTAURANT_CONFIG.currency}`);
  lines.push(`التوصيل: ${deliveryFee} ${RESTAURANT_CONFIG.currency}`);
  lines.push(`الإجمالي النهائي: ${finalTotal} ${RESTAURANT_CONFIG.currency}`);
  lines.push('');
  lines.push('برجاء تأكيد الطلب.');

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  const cleanPhone = RESTAURANT_CONFIG.whatsappNumber.replace(/[^\d]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppUrl(customText?: string): string {
  const text =
    customText ||
    `السلام عليكم، بتواصل معاكم بخصوص الطلب من ${RESTAURANT_CONFIG.name}.`;
  return buildWhatsAppUrl(text);
}
