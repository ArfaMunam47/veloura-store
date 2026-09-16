import React from 'react';

/**
 * Verified luxury fallbacks by category to guarantee no broken or empty pictures
 */
export const CATEGORY_FALLBACKS: Record<string, string> = {
  footwear: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1200&auto=format&fit=crop',
  jewelry: 'https://images.unsplash.com/photo-1611591475887-f81d898a335a?q=80&w=1200&auto=format&fit=crop',
  watches: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop',
  clothing: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
  women: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
  men: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
  bags: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
  default: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop'
};

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  category?: string
) => {
  const target = e.currentTarget;
  const cat = (category || '').toLowerCase();
  
  let fallback = CATEGORY_FALLBACKS.default;
  if (cat.includes('shoe') || cat.includes('boot') || cat.includes('footwear') || cat.includes('loafer')) {
    fallback = CATEGORY_FALLBACKS.footwear;
  } else if (cat.includes('jewel') || cat.includes('ring') || cat.includes('cuff') || cat.includes('chain')) {
    fallback = CATEGORY_FALLBACKS.jewelry;
  } else if (cat.includes('watch') || cat.includes('timepiece')) {
    fallback = CATEGORY_FALLBACKS.watches;
  } else if (cat.includes('bag') || cat.includes('tote') || cat.includes('leather')) {
    fallback = CATEGORY_FALLBACKS.bags;
  } else if (cat.includes('men')) {
    fallback = CATEGORY_FALLBACKS.men;
  } else if (cat.includes('women')) {
    fallback = CATEGORY_FALLBACKS.women;
  }

  if (target.src !== fallback) {
    target.src = fallback;
  }
};
