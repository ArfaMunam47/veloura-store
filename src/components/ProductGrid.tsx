import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  emptyMessage?: string;
  onClearFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  emptyMessage = 'No matching creations found in this archive.',
  onClearFilters
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-[#0A1C14] border border-[#183C2A] p-8 rounded-xs my-6">
        <p className="font-editorial text-lg text-[#FAF9F5] mb-2 font-normal">
          No Creations Found
        </p>
        <p className="text-xs text-[#8BA496] mb-5 max-w-md mx-auto">
          {emptyMessage}
        </p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#E5C583] text-[#06110B] text-xs uppercase tracking-[0.16em] font-sans font-bold transition-all rounded-xs shadow-md"
          >
            Reset Selection
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      id="product-grid"
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 w-full"
    >
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelectProduct}
        />
      ))}
    </div>
  );
};
