import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export interface HotspotData {
  id: string;
  name: string;
  category: string;
  price: number;
  productId: string;
  tag?: string;
  xPercent: number; // 0 - 100 relative to parent container
  yPercent: number; // 0 - 100 relative to parent container
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

interface ProductHotspotProps {
  hotspot: HotspotData;
  onSelectProduct: (productId: string) => void;
  isActive?: boolean;
  onToggleActive?: (id: string) => void;
  containerWidth?: number;
}

export const ProductHotspot: React.FC<ProductHotspotProps> = ({
  hotspot,
  onSelectProduct,
  isActive = false,
  onToggleActive
}) => {
  const { formatPrice } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const tagRef = useRef<HTMLDivElement>(null);

  // Show panel on hover or active (click/tap)
  const isPanelVisible = isHovered || isActive;

  // Determine optimal panel orientation so it stays within stage bounds
  const isNearRight = hotspot.xPercent > 65;
  const isNearLeft = hotspot.xPercent < 35;
  const isNearTop = hotspot.yPercent < 30;

  return (
    <div
      className="absolute z-30"
      style={{
        left: `${hotspot.xPercent}%`,
        top: `${hotspot.yPercent}%`,
        transform: 'translate(-50%, -50%)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. INTERACTIVE HOTSPOT PIN */}
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          if (onToggleActive) onToggleActive(hotspot.id);
        }}
        aria-label={`Inspect ${hotspot.name}`}
        aria-expanded={isPanelVisible}
        className={`relative group flex items-center justify-center w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full transition-all duration-300 focus:outline-hidden cursor-pointer ${
          isHovered || isActive
            ? 'scale-115 shadow-[0_0_10px_rgba(212,175,55,0.4)]'
            : 'hover:scale-110 shadow-[0_0_4px_rgba(0,0,0,0.5)]'
        }`}
      >
        {/* Outer Champagne Ring with Thin Border */}
        <span
          className={`absolute inset-0 rounded-full border transition-colors duration-300 ${
            isHovered || isActive
              ? 'border-[#E5C583] bg-[#07160F]'
              : 'border-[#D4AF37]/70 bg-[#07160F]/90'
          }`}
        />

        {/* Dark Forest Green Core Disc */}
        <span className="relative w-2 h-2 rounded-full bg-[#0E281C] flex items-center justify-center border border-[#D4AF37]/30">
          {/* Tiny Warm Gold Center Point */}
          <span
            className={`w-1 h-1 rounded-full transition-all duration-300 ${
              isHovered || isActive ? 'bg-[#FFFFFF]' : 'bg-[#E5C583]'
            }`}
          />
        </span>
      </button>

      {/* 2. LUXURY FASHION PRODUCT TAG PANEL */}
      <div
        ref={tagRef}
        role="tooltip"
        className={`absolute pointer-events-auto transition-all duration-300 ease-out z-50 ${
          isPanelVisible
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
        } ${
          isNearTop
            ? 'top-8'
            : 'bottom-8'
        } ${
          isNearRight
            ? 'right-0 origin-bottom-right'
            : isNearLeft
            ? 'left-0 origin-bottom-left'
            : 'left-1/2 -translate-x-1/2 origin-bottom'
        }`}
        style={{ width: '220px' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Luxury Tag Container with Frosted Glass, Hairline Gold Edge, and Clean Spacing */}
        <div className="bg-[#07150E]/95 backdrop-blur-md border border-[#D4AF37]/35 p-3 rounded-xs shadow-[0_16px_32px_rgba(0,0,0,0.85)] flex flex-col gap-2">
          {/* Tag Header Row: Category & Tag Badge */}
          <div className="flex items-center justify-between text-[8.5px] font-mono-luxury tracking-[0.2em] uppercase text-[#7E998B] border-b border-[#143323] pb-1.5">
            <span className="truncate max-w-[130px]">{hotspot.category}</span>
            {hotspot.tag && (
              <span className="text-[#D4AF37] font-medium shrink-0 ml-1">
                {hotspot.tag}
              </span>
            )}
          </div>

          {/* Product Name */}
          <div>
            <h4 className="font-editorial text-[13.5px] leading-snug text-white font-normal line-clamp-2">
              {hotspot.name}
            </h4>
          </div>

          {/* Price & Action Row */}
          <div className="flex items-center justify-between pt-1 border-t border-[#143323]/60 mt-0.5">
            <span className="font-mono-luxury text-xs text-[#E5C583] font-semibold">
              {formatPrice(hotspot.price)}
            </span>

            <button
              type="button"
              onClick={() => onSelectProduct(hotspot.productId)}
              className="group/btn inline-flex items-center gap-1 text-[9.5px] font-mono-luxury uppercase tracking-[0.14em] text-[#D4AF37] hover:text-white transition-colors cursor-pointer"
            >
              <span>View Piece</span>
              <ArrowRight
                size={11}
                className="transform group-hover/btn:translate-x-0.5 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Small subtle connecting pip point */}
        <div
          className={`absolute w-1.5 h-1.5 bg-[#07150E] border-r border-b border-[#D4AF37]/40 rotate-45 ${
            isNearTop
              ? '-top-1 border-t border-l border-r-0 border-b-0'
              : '-bottom-1'
          } ${
            isNearRight
              ? 'right-3'
              : isNearLeft
              ? 'left-3'
              : 'left-1/2 -translate-x-1/2'
          }`}
        />
      </div>
    </div>
  );
};
