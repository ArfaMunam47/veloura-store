import React, { useState, useRef } from 'react';
import { Heart, ShoppingBag, Maximize2, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { handleImageError } from '../utils/images';

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
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const isWished = isInWishlist(product.id);
  const hasSecondaryImage = product.images.length > 1;

  // Ultra-smooth 3D Tilt calculation directly on DOM without triggering virtual DOM re-renders
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / (rect.height / 2)) * 5;
    const rotY = (x / (rect.width / 2)) * 5;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-3px)`;
      }
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if user didn't click on an interactive button
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      onSelect(product.id);
    }
  };

  return (
    <div
      ref={cardRef}
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      className="group relative flex flex-col bg-[#0A1B13] border border-[#183C2A] rounded-xs overflow-hidden transition-transform duration-200 ease-out hover:shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:border-[#D4AF37]/60 preserve-3d cursor-pointer will-change-transform"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#07150E]">
        {/* Main Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          onError={e => handleImageError(e, product.category)}
          className={`h-full w-full object-cover object-top transition-transform duration-700 ease-out filter brightness-[1.03] contrast-[1.02] ${
            isHovered && hasSecondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Image on Hover */}
        {hasSecondaryImage && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            referrerPolicy="no-referrer"
            onError={e => handleImageError(e, product.category)}
            className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-700 ease-out filter brightness-[1.03] contrast-[1.02] ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-95'
            }`}
          />
        )}

        {/* Badges Stack */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="bg-[#0E291C] text-[#E5C583] border border-[#D4AF37]/50 text-[9px] font-mono-luxury px-2 py-0.5 uppercase tracking-wider font-semibold shadow-xs">
              New Drop
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#07130D] text-[#FAF9F5] border border-[#1A3F2E] text-[9px] font-mono-luxury px-2 py-0.5 uppercase tracking-wider font-medium shadow-xs">
              Atelier Icon
            </span>
          )}
        </div>

        {/* 4K Resolution Stamp */}
        <div className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-[#E5C583] text-[8px] font-mono-luxury px-1.5 py-0.5 tracking-wider uppercase border border-[#D4AF37]/30 opacity-0 group-hover:opacity-100 transition-opacity">
          4K STUDIO
        </div>

        {/* Action Buttons Floating Overlay */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
          {/* Wishlist Button */}
          <button
            onClick={e => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs ${
              isWished
                ? 'bg-[#D4AF37] text-[#0A1811] shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                : 'bg-[#081710]/80 backdrop-blur-xs text-[#FAF9F5] hover:bg-[#D4AF37] hover:text-[#08150F] border border-[#1D4732]'
            }`}
            aria-label={isWished ? 'Saved to wishlist' : 'Save to wishlist'}
          >
            <Heart
              size={14}
              strokeWidth={1.8}
              className={isWished ? 'fill-current' : ''}
            />
          </button>

          {/* 3D Inspect Button */}
          <button
            onClick={e => {
              e.stopPropagation();
              setThreeDModalProduct(product);
            }}
            className="w-8 h-8 rounded-full bg-[#0E241A]/95 text-[#D4AF37] border border-[#D4AF37]/60 flex items-center justify-center transition-all shadow-xs hover:scale-110 opacity-0 group-hover:opacity-100 hover:bg-[#163C2A]"
            title="Inspect in 3D Virtual Studio"
            aria-label="Inspect in 3D"
          >
            <Maximize2 size={13} />
          </button>

          {/* Quick View Button */}
          <button
            onClick={e => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-8 h-8 rounded-full bg-[#081710]/80 backdrop-blur-xs text-[#FAF9F5] hover:bg-white hover:text-[#08150F] border border-[#1D4732] flex items-center justify-center transition-all shadow-xs opacity-0 group-hover:opacity-100"
            title="Quick View"
            aria-label="Quick View"
          >
            <Eye size={13} />
          </button>
        </div>
      </div>

      {/* Product Details Info Card */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2 bg-[#0A1B13]">
        <div>
          <div className="flex items-center justify-between text-[10px] text-[#7E998C] uppercase tracking-wider font-mono-luxury mb-1">
            <span>{product.group} • {product.category.replace('women-', '').replace('men-', '').replace('acc-', '')}</span>
            <span className="text-[#D4AF37]">★ {product.rating}</span>
          </div>

          <h3 className="text-[13.5px] font-sans font-medium text-[#FAF9F5] line-clamp-1 group-hover:text-[#E5C583] transition-colors">
            {product.name}
          </h3>

          <p className="text-[11px] text-[#8EA698] line-clamp-1 mt-0.5 font-sans">
            {product.subtitle || `Atelier craft from ${product.origin}`}
          </p>
        </div>

        {/* Color swatches preview */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 pt-1">
            {product.colors.map((c, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full border border-white/20"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[9.5px] text-[#7E998C] font-mono-luxury ml-1">
              +{product.colors.length} hues
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-[#163626]">
          <span className="text-base font-mono-luxury font-semibold text-[#E5C583]">
            {formatPrice(product.price)}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={e => {
                e.stopPropagation();
                setThreeDModalProduct(product);
              }}
              className="px-2 py-1.5 bg-[#0F281B] hover:bg-[#163E2A] text-[#D4AF37] text-[10px] font-mono-luxury uppercase tracking-wider flex items-center gap-1 transition-colors rounded-xs border border-[#D4AF37]/40"
              title="Launch 3D Turntable"
            >
              <Maximize2 size={10} />
              <span>3D</span>
            </button>

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
              className="px-3 py-1.5 bg-[#143B27] hover:bg-[#1E5438] text-white text-[11px] font-sans uppercase tracking-wider flex items-center gap-1.5 transition-colors rounded-xs border border-[#215437] shadow-xs"
            >
              <ShoppingBag size={12} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
