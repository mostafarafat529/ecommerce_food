import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface FoodImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function FoodImage({ src, alt, className = '' }: FoodImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F3EDE3] to-[#E9DFD0] text-[#5C4B41] p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <UtensilsCrossed className="w-8 h-8 mb-2 text-[#E85D04]" aria-hidden="true" />
        <span className="text-xs font-medium line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
