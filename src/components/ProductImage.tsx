import React, { useState, useEffect, useRef } from 'react';
import { Shirt, Gem, Footprints, Watch, ShoppingBag } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  category?: string;
  group?: string;
  priority?: boolean;
  onClick?: () => void;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  category = '',
  group = '',
  priority = false,
  onClick
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isFailed, setIsFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setIsFailed(false);
  }, [src]);

  const getReliableFallback = () => {
    const grp = (group || '').toLowerCase();
    const cat = (category || '').toLowerCase();

    if (grp.includes('kid') || cat.includes('kid') || cat.includes('toy')) {
      return 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=85&w=1200&auto=format&fit=crop';
    }
    if (grp.includes('women') || cat.includes('women')) {
      return 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=85&w=1200&auto=format&fit=crop';
    }
    if (grp.includes('men') || cat.includes('men')) {
      return 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=85&w=1200&auto=format&fit=crop';
    }
    if (grp.includes('footwear') || cat.includes('footwear') || cat.includes('shoe') || cat.includes('boot')) {
      return 'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=85&w=1200&auto=format&fit=crop';
    }
    if (grp.includes('jewel') || cat.includes('jewel') || cat.includes('watch')) {
      return 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=85&w=1200&auto=format&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1544441893-675973e31985?q=85&w=1200&auto=format&fit=crop';
  };

  const handleError = () => {
    if (!isFailed) {
      setIsFailed(true);
      const fallback = getReliableFallback();
      if (currentSrc !== fallback) {
        setCurrentSrc(fallback);
      }
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative w-full h-full overflow-hidden bg-[#08170F] ${onClick ? 'cursor-pointer' : ''}`}
    >
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={handleError}
        className={`w-full h-full object-cover object-center block ${className}`}
      />
    </div>
  );
};
