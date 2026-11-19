import { useState, FormEvent } from 'react';
import { Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurant.js';
import { buildGeneralWhatsAppUrl, buildWhatsAppUrl } from '../utils/whatsapp';

export function ContactPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [preparedUrl, setPreparedUrl] = useState<string | null>(null);

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const fullText = `السلام عليكم، معكم ${name.trim()}.\nاستفسار بخصوص ${RESTAURANT_CONFIG.name}:\n${message.trim()}`;
    const url = buildWhatsAppUrl(fullText);
    setPreparedUrl(url);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="max-w-2xl mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1F140E]">
          تواصل معنا
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#5C4B41]">
          عندك استفسار أو طلب خاص لعزومة؟ كلمنا في أي وقت خلال ساعات العمل
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-[#1F140E]/8 p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-base font-bold text-[#1F140E]">
                  عنوان المطعم
                </h2>
                <p className="mt-1 text-sm text-[#5C4B41] leading-relaxed">
                  {RESTAURANT_CONFIG.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-base font-bold text-[#1F140E]">
                  رقم الهاتف والخط الساخن
                </h2>
                <div className="mt-1 flex flex-col gap-1 text-sm text-[#5C4B41]">
                  <a
                    href={`tel:${RESTAURANT_CONFIG.phone}`}
                    className="font-bold text-[#1F140E] hover:text-[#E85D04] tabular-nums w-fit"
                    dir="ltr"
                  >
                    {RESTAURANT_CONFIG.phone}
                  </a>
                  <span>الخط الساخن: <strong className="tabular-nums">{RESTAURANT_CONFIG.hotline}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-base font-bold text-[#1F140E]">
                  مواعيد العمل
                </h2>
                <p className="mt-1 text-sm text-[#5C4B41]">
                  {RESTAURANT_CONFIG.workingHours}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1F140E]/10">
              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm transition-colors"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>محادثة مباشرة عبر واتساب</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#1F140E]/8 p-6">
            <h2 className="font-display text-base font-bold text-[#1F140E] mb-3">
              مناطق التوصيل المتاحة
            </h2>
            <p className="text-sm text-[#5C4B41] leading-relaxed">
              {RESTAURANT_CONFIG.deliveryAreas.join(' · ')}
            </p>
          </div>
        </div>

        {/* Direct Inquiry Form via WhatsApp */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#1F140E]/8 p-6 sm:p-8">
          <h2 className="font-display text-xl font-extrabold text-[#1F140E] mb-2">
            ابعتلنا رسالتك على واتساب
          </h2>
          <p className="text-sm text-[#5C4B41] mb-6">
            اكتب استفسارك أو طلب العزومات وهنجهزلك الرسالة وتفتح معاك مباشرة في واتساب.
          </p>

          <form onSubmit={handleInquirySubmit} className="space-y-5">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-bold text-[#1F140E] mb-2"
              >
                الاسم
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اكتب اسمك"
                className="w-full h-12 px-4 rounded-xl bg-[#FAF7F2] border border-[#1F140E]/15 text-sm text-[#1F140E] focus:outline-none focus:border-[#E85D04]"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-bold text-[#1F140E] mb-2"
              >
                رسالتك أو استفسارك
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب تفاصيل استفسارك هنا..."
                className="w-full p-4 rounded-xl bg-[#FAF7F2] border border-[#1F140E]/15 text-sm text-[#1F140E] focus:outline-none focus:border-[#E85D04]"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E85D04] hover:bg-[#D04E00] text-white font-bold text-sm sm:text-base transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>إرسال عبر واتساب</span>
            </button>

            {preparedUrl && (
              <div className="p-4 rounded-xl bg-[#F3EDE3] text-sm text-[#1F140E] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span>تم تجهيز رسالتك. لو متفتحتش المحادثة تلقائياً:</span>
                <a
                  href={preparedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#16A34A] hover:underline whitespace-nowrap"
                >
                  افتح واتساب من هنا
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
