import React from 'react';

// Curated, 100% reliable high-definition luxury fashion editorial photography
export const LUXURY_FALLBACK_IMAGES = {
  outerwear: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=90&w=1200&auto=format&fit=crop',
  blazer: 'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?q=90&w=1200&auto=format&fit=crop',
  dress: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=90&w=1200&auto=format&fit=crop',
  knitwear: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=90&w=1200&auto=format&fit=crop',
  shirt: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=90&w=1200&auto=format&fit=crop',
  trouser: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=90&w=1200&auto=format&fit=crop',
  denim: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=90&w=1200&auto=format&fit=crop',
  bag: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=90&w=1200&auto=format&fit=crop',
  handbag: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=90&w=1200&auto=format&fit=crop',
  footwear: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=90&w=1200&auto=format&fit=crop',
  boot: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=90&w=1200&auto=format&fit=crop',
  eyewear: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=90&w=1200&auto=format&fit=crop',
  jewelry: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=90&w=1200&auto=format&fit=crop',
  watch: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=90&w=1200&auto=format&fit=crop',
  fragrance: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=90&w=1200&auto=format&fit=crop',
  scarf: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=90&w=1200&auto=format&fit=crop',
  model: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=90&w=1200&auto=format&fit=crop',
  menCoat: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=90&w=1200&auto=format&fit=crop',
  menJacket: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=90&w=1200&auto=format&fit=crop',
  menShirt: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=90&w=1200&auto=format&fit=crop',
  menTee: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=90&w=1200&auto=format&fit=crop'
};

/**
 * Handle image error and assign a safe high-definition fallback
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  categoryHint: string = 'model'
) => {
  const target = e.currentTarget;
  const hintLower = categoryHint.toLowerCase();
  
  if (hintLower.includes('bag') || hintLower.includes('tote')) {
    target.src = LUXURY_FALLBACK_IMAGES.bag;
  } else if (hintLower.includes('shoe') || hintLower.includes('sneaker') || hintLower.includes('loafer')) {
    target.src = LUXURY_FALLBACK_IMAGES.footwear;
  } else if (hintLower.includes('boot')) {
    target.src = LUXURY_FALLBACK_IMAGES.boot;
  } else if (hintLower.includes('coat') || hintLower.includes('trench') || hintLower.includes('outerwear')) {
    target.src = LUXURY_FALLBACK_IMAGES.outerwear;
  } else if (hintLower.includes('blazer') || hintLower.includes('jacket')) {
    target.src = LUXURY_FALLBACK_IMAGES.blazer;
  } else if (hintLower.includes('dress') || hintLower.includes('gown')) {
    target.src = LUXURY_FALLBACK_IMAGES.dress;
  } else if (hintLower.includes('knit') || hintLower.includes('cashmere') || hintLower.includes('sweater')) {
    target.src = LUXURY_FALLBACK_IMAGES.knitwear;
  } else if (hintLower.includes('watch') || hintLower.includes('time')) {
    target.src = LUXURY_FALLBACK_IMAGES.watch;
  } else if (hintLower.includes('jewel') || hintLower.includes('cuff')) {
    target.src = LUXURY_FALLBACK_IMAGES.jewelry;
  } else if (hintLower.includes('eye') || hintLower.includes('sunglass')) {
    target.src = LUXURY_FALLBACK_IMAGES.eyewear;
  } else if (hintLower.includes('perfume') || hintLower.includes('fragrance') || hintLower.includes('parfum')) {
    target.src = LUXURY_FALLBACK_IMAGES.fragrance;
  } else {
    target.src = LUXURY_FALLBACK_IMAGES.model;
  }
};
