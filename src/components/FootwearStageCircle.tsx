import React, { useState, useRef } from 'react';
import { Maximize2, Sparkles, Layers } from 'lucide-react';
import { Product } from '../types';

interface FootwearStageCircleProps {
  products: Product[];
  onOpen3DModal: (product: Product) => void;
}

export const FootwearStageCircle: React.FC<FootwearStageCircleProps> = ({
  products,
  onOpen3DModal
}) => {
  const [activeType, setActiveType] = useState<'loafer' | 'heel'>('loafer');
  const [isHovered, setIsHovered] = useState(false);
  const circleRef = useRef<HTMLDivElement>(null);
  const shoeRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number | null>(null);

  // Smooth mouse move tracking for dynamic 3D perspective
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!circleRef.current || !shoeRef.current) return;
    const rect = circleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 14;
    const rotY = (x / (rect.width / 2)) * 18;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (shoeRef.current) {
        shoeRef.current.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.08) translateY(-6px)`;
      }
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (shoeRef.current) {
      shoeRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0px)';
    }
  };

  const handleClick = () => {
    const targetProduct =
      activeType === 'loafer'
        ? products.find(p => p.id === 'vl-shoe-loafer-01') || products.find(p => p.group === 'Footwear') || products[0]
        : products.find(p => p.id === 'vl-shoe-mule-01' || p.id === 'vl-shoe-pump-01') || products[0];

    if (targetProduct) {
      onOpen3DModal(targetProduct);
    }
  };

  const currentImage =
    activeType === 'loafer'
      ? '/assets/luxury_shoe_cutout.png'
      : '/assets/luxury_heel_cutout.png';

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Silhouette Selection Pills */}
      <div className="flex items-center gap-2 mb-4 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveType('loafer');
          }}
          className={`px-3 py-1 text-[10px] font-mono-luxury uppercase tracking-[0.16em] rounded-xs border transition-all ${
            activeType === 'loafer'
              ? 'bg-[#143B28] text-[#E5C583] border-[#D4AF37]'
              : 'bg-[#081710] text-[#7E998C] border-[#183C2A] hover:text-white'
          }`}
        >
          Sloane Loafer
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveType('heel');
          }}
          className={`px-3 py-1 text-[10px] font-mono-luxury uppercase tracking-[0.16em] rounded-xs border transition-all ${
            activeType === 'heel'
              ? 'bg-[#143B28] text-[#E5C583] border-[#D4AF37]'
              : 'bg-[#081710] text-[#7E998C] border-[#183C2A] hover:text-white'
          }`}
        >
          Vendôme Heel
        </button>
      </div>

      {/* Main Luxury Emerald 3D Stage Circle */}
      <div
        ref={circleRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-72 sm:w-80 aspect-square rounded-full flex items-center justify-center cursor-pointer group will-change-transform"
        style={{ perspective: '1000px' }}
      >
        {/* Ambient Outer Halo */}
        <div className="absolute inset-0 rounded-full bg-[#185337]/35 blur-2xl group-hover:bg-[#206A46]/50 transition-all duration-700 pointer-events-none" />

        {/* Outer Solid Architectural Bezel */}
        <div className="absolute inset-0 rounded-full border border-[#2A6546] ring-1 ring-[#D4AF37]/40 shadow-[0_15px_45px_rgba(0,0,0,0.85)]" />

        {/* Precision Degree Gauge Markers on Ring */}
        <div className="absolute inset-2 rounded-full border border-[#1B4832]/60 pointer-events-none">
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[8px] font-mono-luxury text-[#E5C583]/70">0°</span>
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 text-[8px] font-mono-luxury text-[#E5C583]/70">90°</span>
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-[8px] font-mono-luxury text-[#E5C583]/70">180°</span>
          <span className="absolute top-1/2 -left-1 -translate-y-1/2 text-[8px] font-mono-luxury text-[#E5C583]/70">270°</span>
        </div>

        {/* Interior Deep Emerald Velvet Radial Disc */}
        <div className="absolute inset-3 rounded-full bg-[radial-gradient(ellipse_at_center,_#1A4F35_0%,_#0E2C1D_45%,_#05130C_100%)] shadow-inner flex items-center justify-center overflow-hidden border border-[#1E4B33]">
          {/* Subtle Radial Pedestal Light */}
          <div className="absolute w-44 h-44 rounded-full bg-[#358B5E]/15 blur-xl pointer-events-none" />

          {/* Contact Pedestal Reflection Oval */}
          <div className="absolute bottom-12 w-48 h-8 rounded-full bg-black/70 blur-md scale-90 group-hover:scale-110 transition-transform duration-500 pointer-events-none" />

          {/* Pure Isolated Shoe Silhouette with NO background */}
          <img
            ref={shoeRef}
            src={currentImage}
            alt="Handcrafted Luxury Footwear Silhouette"
            className="relative z-10 w-52 h-52 object-contain filter drop-shadow-[0_22px_28px_rgba(0,0,0,0.92)] transition-transform duration-200 ease-out pointer-events-none"
          />

          {/* Luxury Interactive HUD Badge */}
          <div className="absolute bottom-4 z-20 bg-[#07150E]/90 border border-[#D4AF37]/70 px-3 py-1 text-[9.5px] font-mono-luxury text-[#E5C583] rounded-xs flex items-center gap-1.5 shadow-lg group-hover:bg-[#143B28] group-hover:text-white transition-all">
            <Maximize2 size={11} className="text-[#D4AF37]" />
            <span className="tracking-[0.14em]">360° BESPOKE TURNTABLE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
