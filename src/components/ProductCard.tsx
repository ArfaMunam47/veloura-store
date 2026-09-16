import React, { useState } from 'react';
import { Heart, ShoppingBag, Maximize2, Eye } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const {
    formatPrice,
    toggleWishlist,
    isInWishlist,
    addToCart,
    setThreeDModalProduct,
    setQuickViewProduct
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const isWished = isInWishlist(product.id);
  const hasSecondaryImage = product.images.length > 1;

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      onSelect(product.id);
    }
  };

  // Formatted category display name
  const formattedCategory = product.category
    .replace('women-', '')
    .replace('men-', '')
    .replace('acc-', '')
    .replace('-', ' ');

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-[#0A1B13] border border-[#163625] hover:border-[#D4AF37]/50 rounded-xs overflow-hidden transition-all duration-300 ease-out hover:shadow-[0_12px_28px_rgba(0,0,0,0.6)] cursor-pointer select-none"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#07150E]">
        {/* Primary Product Image with Subtle Scale */}
        <div
          className={`w-full h-full transition-transform duration-700 ease-out ${
            isHovered ? 'scale-104' : 'scale-100'
          }`}
        >
          {isHovered && hasSecondaryImage ? (
            <ProductImage
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              category={product.category}
              group={product.group}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <ProductImage
              src={product.images[0]}
              alt={product.name}
              category={product.category}
              group={product.group}
              className="w-full h-full object-cover object-top"
            />
          )}
        </div>

        {/* Badges Stack */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isNew && (
            <span className="bg-[#0A1D13]/90 backdrop-blur-xs text-[#E5C583] border border-[#D4AF37]/40 text-[8.5px] font-mono-luxury px-2 py-0.5 uppercase tracking-wider font-semibold rounded-xs">
              New Drop
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#07130D]/90 backdrop-blur-xs text-[#E2E8F0] border border-[#1E4834] text-[8.5px] font-mono-luxury px-2 py-0.5 uppercase tracking-wider font-medium rounded-xs">
              Iconic
            </span>
          )}
        </div>

        {/* Floating Quick Action Buttons - Elegant Fade on Desktop */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
          {/* Wishlist Button */}
          <button
            onClick={e => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all shadow-md ${
              isWished
                ? 'bg-[#D4AF37] text-[#0A1811] shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                : 'bg-[#07150E]/80 backdrop-blur-xs text-[#C8D9D0] hover:bg-[#D4AF37] hover:text-[#08150F] border border-[#1D4732]'
            }`}
            aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={13}
              strokeWidth={1.8}
              className={isWished ? 'fill-current' : ''}
            />
          </button>

          {/* Quick View */}
          <button
            onClick={e => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#07150E]/80 backdrop-blur-xs text-[#C8D9D0] hover:bg-white hover:text-[#08150F] border border-[#1D4732] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md"
            title="Quick View"
            aria-label="Quick View"
          >
            <Eye size={13} strokeWidth={1.8} />
          </button>

          {/* 3D Inspect Trigger */}
          <button
            onClick={e => {
              e.stopPropagation();
              setThreeDModalProduct(product);
            }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0E241A]/90 backdrop-blur-xs text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:bg-[#163C2A] shadow-md"
            title="Inspect in 3D Turntable"
            aria-label="Inspect in 3D"
          >
            <Maximize2 size={12} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Product Details Info */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2.5 bg-[#0A1B13]">
        <div>
          <div className="flex items-center justify-between text-[10px] text-[#7E998C] uppercase tracking-[0.14em] font-mono-luxury mb-1.5">
            <span className="truncate max-w-[140px]">{product.group} • {formattedCategory}</span>
            <span className="text-[#D4AF37] shrink-0 ml-1 font-sans flex items-center gap-0.5">
              <span>★</span>
              <span className="font-semibold">{product.rating}</span>
              <span className="text-[#688273] text-[9.5px]">({product.reviewsCount || 28})</span>
            </span>
          </div>

          {/* Product Name (Clear, readable, with 2-line headroom so titles are never clipped) */}
          <h3 className="text-[13px] sm:text-[14px] font-sans font-medium text-[#FAF9F5] leading-snug line-clamp-2 min-h-[36px] sm:min-h-[40px] group-hover:text-[#E5C583] transition-colors">
            {product.name}
          </h3>

          <p className="text-[11px] text-[#8EA698] line-clamp-1 mt-1 font-sans">
            {product.subtitle || `Atelier craft from ${product.origin}`}
          </p>
        </div>

        {/* Pricing & Add to Bag Row */}
        <div className="flex items-center justify-between pt-2.5 border-t border-[#143323] mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-mono-luxury font-semibold text-[#E5C583]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="line-through text-[11px] font-mono-luxury text-[#688273]">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={e => {
              e.stopPropagation();
              addToCart(
                product.id,
                product.sizes[0] || 'Standard',
                product.colors[0]?.hex || '#111111',
                product.colors[0]?.name || 'Standard',
                1
              );
            }}
            className="px-2.5 sm:px-3 py-1.5 bg-[#123624] hover:bg-[#1B4B32] text-white text-[10px] sm:text-[11px] font-sans uppercase tracking-wider flex items-center gap-1.5 transition-colors rounded-xs border border-[#1E4D34] shadow-xs"
            aria-label={`Add ${product.name} to shopping bag`}
          >
            <ShoppingBag size={12} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
