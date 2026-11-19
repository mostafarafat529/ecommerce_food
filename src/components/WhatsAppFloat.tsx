import { MessageCircle } from 'lucide-react';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

export function WhatsAppFloat() {
  return (
    <a
      href={buildGeneralWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="fixed bottom-5 left-5 z-30 inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] text-white shadow-lg shadow-[#16A34A]/25 transition-transform duration-150 hover:-translate-y-0.5 text-sm font-bold whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16A34A]"
    >
      <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline">تواصل معنا عبر واتساب</span>
      <span className="sm:hidden">واتساب</span>
    </a>
  );
}
