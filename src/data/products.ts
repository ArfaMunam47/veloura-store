import { Product } from '../types';
import { WOMEN_PRODUCTS } from './womenProducts';
import { MEN_PRODUCTS } from './menProducts';
import { FOOTWEAR_PRODUCTS } from './footwearProducts';
import { JEWELRY_PRODUCTS } from './jewelryProducts';
import { KIDS_PRODUCTS } from './kidsProducts';

const normalizedKids: Product[] = KIDS_PRODUCTS.map(p => ({
  ...p,
  gender: 'kids' as const,
  department: (p.category.includes('footwear') ? 'footwear' : 'clothing') as ('clothing' | 'footwear' | 'accessories'),
  subcategory: p.category.replace('kids-', ''),
  availability: p.stock
}));

const normalizedWomen: Product[] = WOMEN_PRODUCTS.map(p => ({
  ...p,
  gender: 'women' as const,
  department: (p.category.includes('bag') ? 'accessories' : 'clothing') as ('clothing' | 'accessories'),
  subcategory: p.category.replace('women-', ''),
  availability: p.stock
}));

const normalizedMen: Product[] = MEN_PRODUCTS.map(p => ({
  ...p,
  gender: 'men' as const,
  department: (p.category.includes('bag') ? 'accessories' : 'clothing') as ('clothing' | 'accessories'),
  subcategory: p.category.replace('men-', ''),
  availability: p.stock
}));

const normalizedFootwear: Product[] = FOOTWEAR_PRODUCTS.map(p => {
  const nameLower = p.name.toLowerCase();
  const isWomenSpecific = nameLower.includes('heel') || nameLower.includes('pump') || nameLower.includes('court') || nameLower.includes('mary jane') || p.id.includes('w-boot');
  const isMenSpecific = nameLower.includes('oxford') || nameLower.includes('derby') || nameLower.includes('monk') || p.id.includes('m-shoe') || nameLower.includes('chelsea boot');
  const gender: 'women' | 'men' | 'unisex' = isWomenSpecific ? 'women' : isMenSpecific ? 'men' : 'unisex';
  
  let subcat = 'shoes';
  if (nameLower.includes('boot') || p.category.includes('boot')) subcat = 'boots';
  else if (nameLower.includes('loafer')) subcat = 'loafers';
  else if (nameLower.includes('heel') || nameLower.includes('pump') || nameLower.includes('court')) subcat = 'heels';
  else if (nameLower.includes('sneaker')) subcat = 'sneakers';
  else if (nameLower.includes('sandal')) subcat = 'sandals';
  else subcat = 'formal';

  return {
    ...p,
    gender,
    department: 'footwear' as const,
    subcategory: subcat,
    availability: p.stock
  };
});

const normalizedJewelry: Product[] = JEWELRY_PRODUCTS.map(p => {
  const nameLower = p.name.toLowerCase();
  let subcat = 'jewelry';
  if (nameLower.includes('ring')) subcat = 'rings';
  else if (nameLower.includes('necklace') || nameLower.includes('pendant')) subcat = 'necklaces';
  else if (nameLower.includes('cuff') || nameLower.includes('bracelet') || nameLower.includes('bangle')) subcat = 'bracelets';
  else if (nameLower.includes('earring')) subcat = 'earrings';
  else if (nameLower.includes('watch') || nameLower.includes('horology') || nameLower.includes('chronometer')) subcat = 'watches';
  else if (nameLower.includes('fragrance') || nameLower.includes('parfum') || nameLower.includes('elixir')) subcat = 'fragrance';

  let gender: 'men' | 'women' | 'unisex' = 'unisex';
  if (nameLower.includes('signet') || p.id.includes('vl-m-watch') || nameLower.includes('titanium')) gender = 'men';
  else if (nameLower.includes('earring') || nameLower.includes('tennis') || nameLower.includes('pearl')) gender = 'women';

  return {
    ...p,
    gender,
    department: 'jewelry' as const,
    subcategory: subcat,
    availability: p.stock
  };
});

export const PRODUCTS: Product[] = [
  ...normalizedWomen,
  ...normalizedMen,
  ...normalizedKids,
  ...normalizedFootwear,
  ...normalizedJewelry
];

