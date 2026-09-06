import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw, Headphones, Eye, ShoppingBag, Maximize2, Layers, Sun, Moon } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { handleImageError } from '../utils/images';

interface Hero3DStageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onSelectProduct: (id: string) => void;
  onOpen3DModal: (product: Product) => void;
}

interface HotspotItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  sku: string;
  xPercent: number; // position on stage
  yPercent: number;
  productId: string;
  tag: string;
}

export const Hero3DStage: React.FC<Hero3DStageProps> = ({
  onNavigate,
  onSelectProduct,
  onOpen3DModal
}) => {
  const { products, formatPrice, addToCart, showToast } = useStore();

  // 3D Stage Refs & State (Zero JS re-render loop for ultra-smooth scrolling)
  const [activeHotspot, setActiveHotspot] = useState<HotspotItem | null>(null);
  const [lightingMode, setLightingMode] = useState<'emerald' | 'gold' | 'daylight'>('emerald');
  const [isAutoOrbit, setIsAutoOrbit] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const stageCanvasRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // High-def products mapped to stage
  const sneakerProduct = products.find(p => p.id === 'vl-men-sneaker-01') || products[0];
  const bagProduct = products.find(p => p.category === 'bags' || p.category === 'acc-bags') || products[1];
  const coatProduct = products.find(p => p.id === 'vl-w-coat-01' || p.category.includes('outerwear')) || products[0];
  const jewelryProduct = products.find(p => p.category === 'acc-jewelry' || p.category.includes('jewelry')) || products[3];

  const hotspots: HotspotItem[] = [
    {
      id: 'hs-model',
      name: 'Double-Faced Cashmere Atelier Blazer',
      category: 'Haute Tailoring',
      price: 1850,
      sku: 'VL-HAUTE-01',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=90&w=1200&auto=format&fit=crop',
      xPercent: 54,
      yPercent: 24,
      productId: coatProduct.id,
      tag: 'Runway Look'
    },
    {
      id: 'hs-bag',
      name: 'Florentine Quilted Leather Shoulder Bag',
      category: 'Artisan Leatherwork',
      price: 1250,
      sku: 'VL-BAG-001',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=90&w=1200&auto=format&fit=crop',
      xPercent: 36,
      yPercent: 62,
      productId: bagProduct.id,
      tag: 'Iconic Calfskin'
    },
    {
      id: 'hs-sneaker',
      name: 'Artisan Low-Top Nappa Court Sneaker',
      category: 'Footwear Atelier',
      price: 320,
      sku: 'VL-M-SNK-001',
      image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=90&w=1200&auto=format&fit=crop',
      xPercent: 20,
      yPercent: 78,
      productId: sneakerProduct.id,
      tag: 'Margom Sole'
    },
    {
      id: 'hs-parfum',
      name: 'Velora Santal & Amber Eau De Parfum',
      category: 'Haute Parfumerie',
      price: 210,
      sku: 'VL-PARF-01',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=90&w=1200&auto=format&fit=crop',
      xPercent: 78,
      yPercent: 66,
      productId: jewelryProduct.id,
      tag: 'Grasse Extract'
    },
    {
      id: 'hs-watch',
      name: 'Heritage Chronograph & Acetate Eyewear',
      category: 'Swiss Horology',
      price: 890,
      sku: 'VL-TIME-01',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=90&w=1200&auto=format&fit=crop',
      xPercent: 60,
      yPercent: 74,
      productId: jewelryProduct.id,
      tag: 'Solid Steel'
    }
  ];

  // Hardware-accelerated mouse tilt (avoids React re-renders completely)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !stageCanvasRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotY = (x / (rect.width / 2)) * 12;
    const rotX = -(y / (rect.height / 2)) * 10;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (stageCanvasRef.current) {
        stageCanvasRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        stageCanvasRef.current.classList.remove('animate-stage-float');
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (stageCanvasRef.current) {
      stageCanvasRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
      if (isAutoOrbit) {
        stageCanvasRef.current.classList.add('animate-stage-float');
      }
    }
  };

  const getLightingStyles = () => {
    switch (lightingMode) {
      case 'gold':
        return {
          glow: 'from-[#D4AF37]/25 via-[#1A2E24]/60 to-[#0A140F]',
          ring: 'border-[#D4AF37]/50 shadow-[0_0_80px_rgba(212,175,55,0.35)]',
          spotlight: 'radial-gradient(circle at 65% 35%, rgba(243,229,171,0.28) 0%, rgba(212,175,55,0.12) 40%, rgba(10,20,15,0) 75%)'
        };
      case 'daylight':
        return {
          glow: 'from-[#FFFFFF]/20 via-[#18362B]/50 to-[#0B1511]',
          ring: 'border-white/40 shadow-[0_0_80px_rgba(255,255,255,0.25)]',
          spotlight: 'radial-gradient(circle at 65% 35%, rgba(255,255,255,0.3) 0%, rgba(200,220,210,0.1) 45%, rgba(10,20,15,0) 75%)'
        };
      case 'emerald':
      default:
        return {
          glow: 'from-[#144230]/50 via-[#0E281E]/80 to-[#07130E]',
          ring: 'border-[#1E5640]/60 shadow-[0_0_90px_rgba(20,66,48,0.45)]',
          spotlight: 'radial-gradient(circle at 65% 35%, rgba(212,175,55,0.2) 0%, rgba(20,66,48,0.25) 45%, rgba(7,19,14,0) 75%)'
        };
    }
  };

  const currentLighting = getLightingStyles();

  return (
    <section
      id="hero-3d-experience"
      className="relative w-full bg-[#08120D] text-white overflow-hidden pt-4 sm:pt-6 pb-12 sm:pb-16 border-b border-[#183325]"
    >
      {/* Background Ambience Layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-90 transition-all duration-700"
        style={{ background: currentLighting.spotlight }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Studio Meta Bar */}
        <div className="flex items-center justify-between py-2 mb-4 border-b border-[#1A382A]/70 text-[11px] font-mono-luxury tracking-widest text-[#9BB3A6]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-white uppercase tracking-[0.2em] font-medium">
              4K Studio Render
            </span>
            <span className="hidden md:inline text-[#648070]">• Autumn / Winter 2026</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-[#0E2218] px-2 py-0.5 border border-[#1C4432] rounded-xs">
              <span className="text-[10px] text-[#7E998B] uppercase">Light:</span>
              <button
                onClick={() => setLightingMode('emerald')}
                className={`px-1.5 py-0.5 text-[10px] uppercase transition-colors ${
                  lightingMode === 'emerald' ? 'text-[#D4AF37] font-bold' : 'text-[#8AA194] hover:text-white'
                }`}
                title="Emerald Noir Studio"
              >
                Emerald
              </button>
              <span className="text-[#355344]">|</span>
              <button
                onClick={() => setLightingMode('gold')}
                className={`px-1.5 py-0.5 text-[10px] uppercase transition-colors ${
                  lightingMode === 'gold' ? 'text-[#D4AF37] font-bold' : 'text-[#8AA194] hover:text-white'
                }`}
                title="Champagne Golden Hour"
              >
                Gold
              </button>
              <span className="text-[#355344]">|</span>
              <button
                onClick={() => setLightingMode('daylight')}
                className={`px-1.5 py-0.5 text-[10px] uppercase transition-colors ${
                  lightingMode === 'daylight' ? 'text-[#D4AF37] font-bold' : 'text-[#8AA194] hover:text-white'
                }`}
                title="Pure Studio Daylight"
              >
                Day
              </button>
            </div>

            <button
              onClick={() => setIsAutoOrbit(!isAutoOrbit)}
              className={`hidden sm:flex items-center gap-1.5 px-2 py-0.5 text-[10px] uppercase border transition-colors ${
                isAutoOrbit
                  ? 'border-[#D4AF37]/60 text-[#D4AF37] bg-[#D4AF37]/10'
                  : 'border-[#1C4432] text-[#8AA194] hover:text-white'
              }`}
            >
              <RefreshCw size={10} className={isAutoOrbit ? 'animate-spin' : ''} />
              <span>3D Orbit</span>
            </button>
          </div>
        </div>

        {/* HERO MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[580px] sm:min-h-[640px]">
          {/* LEFT COLUMN: Haute Editorial Copy */}
          <div className="lg:col-span-5 z-20 flex flex-col justify-center space-y-5">
            {/* Eyebrow Label with Accent Line */}
            <div className="inline-flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="text-[11px] font-mono-luxury uppercase tracking-[0.24em] text-[#D4AF37] font-medium">
                NEW ATELIER CAPSULE ✨
              </span>
            </div>

            {/* Giant Architectural Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-[4.75rem] font-bold tracking-tight text-white leading-[0.98]">
                ELEVATE
              </h1>
              <span className="block font-editorial italic font-normal text-3xl sm:text-5xl lg:text-[4.2rem] text-[#E5C583] tracking-tight leading-[1.02]">
                YOUR EVERYDAY
              </span>
            </div>

            {/* Refined Subtitle */}
            <p className="text-xs sm:text-sm text-[#B4C9BE] leading-relaxed max-w-md font-sans">
              Discover timeless silhouettes hand-lasted in Tuscany, double-faced Scottish cashmere, and vegetable-tanned full-grain calfskin engineered for effortless distinction.
            </p>

            {/* Dual CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                id="hero-shop-now-btn"
                onClick={() => onNavigate('shop')}
                className="group relative px-7 py-3.5 bg-[#D4AF37] hover:bg-[#E5C583] text-[#0A1811] text-xs uppercase tracking-[0.18em] font-sans font-semibold transition-all shadow-[0_10px_25px_rgba(212,175,55,0.3)] flex items-center gap-2.5 rounded-xs"
              >
                <span>Shop Collection</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-3d-btn"
                onClick={() => onOpen3DModal(sneakerProduct)}
                className="px-6 py-3.5 bg-[#0E241A]/90 hover:bg-[#153829] text-white text-xs uppercase tracking-[0.18em] font-sans font-medium border border-[#2D6049] transition-all flex items-center gap-2 rounded-xs shadow-xs"
              >
                <Maximize2 size={13} className="text-[#D4AF37]" />
                <span>Explore 3D Studio</span>
              </button>
            </div>

            {/* Hotspot Guide Note */}
            <div className="pt-3 flex items-center gap-2 text-[11px] text-[#7E998B] font-mono-luxury">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] ring-4 ring-[#D4AF37]/20" />
              <span>Click glowing golden pins to inspect garments in 4K resolution</span>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D STAGE & PEDESTALS */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] sm:min-h-[560px] cursor-grab active:cursor-grabbing perspective-1200 preserve-3d select-none"
          >
            {/* 3D Rotational Canvas Container (Hardware Accelerated) */}
            <div
              ref={stageCanvasRef}
              className={`relative w-full max-w-[620px] aspect-[4/3] sm:aspect-[1.15/1] flex items-center justify-center transition-transform duration-300 ease-out preserve-3d ${
                isAutoOrbit ? 'animate-stage-float' : ''
              }`}
            >
              {/* Back Circular Luminous Halo Portal Disc */}
              <div
                className={`absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full border border-dashed transition-all duration-700 pointer-events-none ${currentLighting.ring}`}
                style={{
                  transform: 'translateZ(-140px)',
                  background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(18,52,38,0.4) 50%, rgba(8,18,13,0) 75%)'
                }}
              />

              {/* Pedestal Base Floor Shadow */}
              <div
                className="absolute bottom-6 w-[85%] h-24 rounded-full bg-black/80 blur-2xl pointer-events-none"
                style={{ transform: 'translateZ(-90px) rotateX(75deg)' }}
              />

              {/* TIER 1: Center High-Fashion Runway Model Look */}
              <div
                className="absolute z-10 bottom-12 left-1/2 -translate-x-1/2 w-[300px] sm:w-[380px] h-[400px] sm:h-[480px] preserve-3d transition-transform duration-300"
                style={{ transform: 'translateZ(10px)' }}
              >
                {/* Elevated Circular Model Pedestal */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] sm:w-[340px] h-20 rounded-full border border-[#D4AF37]/40 pedestal-emerald-rim preserve-3d"
                  style={{ transform: 'translateZ(-20px) rotateX(65deg)' }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#D4AF37]/20 to-transparent" />
                </div>

                {/* Model High-Resolution Image */}
                <div className="relative w-full h-full overflow-hidden rounded-t-full drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]">
                  <img
                    src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=95&w=1200&auto=format&fit=crop"
                    alt="Haute Couture Atelier Look"
                    referrerPolicy="no-referrer"
                    onError={e => handleImageError(e, 'blazer')}
                    className="w-full h-full object-cover object-top filter brightness-105 contrast-105"
                  />
                  {/* Subtle rim light overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08120D] via-transparent to-transparent opacity-80" />
                </div>
              </div>

              {/* TIER 2 (Front Left): Quilted Leather Handbag on Floating Riser */}
              <div
                className="absolute z-20 bottom-10 left-2 sm:left-6 w-36 sm:w-48 aspect-square preserve-3d transition-transform duration-300 hover:scale-105"
                style={{ transform: 'translateZ(90px) translateY(-10px)' }}
              >
                {/* Step Riser Pedestal */}
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 sm:w-40 h-10 rounded-full border border-[#D4AF37]/50 bg-[#0E241A] shadow-[0_12px_30px_rgba(0,0,0,0.7)]"
                  style={{ transform: 'rotateX(65deg)' }}
                />
                {/* Handbag Image with High Dynamic Range Clarity */}
                <div
                  onClick={() => onSelectProduct(bagProduct.id)}
                  className="relative w-full h-full cursor-pointer group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=95&w=800&auto=format&fit=crop"
                    alt="Artisan Leather Bag"
                    referrerPolicy="no-referrer"
                    onError={e => handleImageError(e, 'bag')}
                    className="w-full h-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-[#091610]/90 backdrop-blur-md px-2 py-0.5 border border-[#D4AF37]/50 text-[9px] font-mono-luxury text-[#E5C583] uppercase whitespace-nowrap shadow-md">
                    Calfskin Bag
                  </div>
                </div>
              </div>

              {/* TIER 3 (Front Center-Left): Artisan Court Sneaker on High Riser */}
              <div
                className="absolute z-30 -bottom-2 left-[30%] sm:left-[32%] w-40 sm:w-52 aspect-[4/3] preserve-3d transition-transform duration-300 hover:scale-105"
                style={{ transform: 'translateZ(130px) translateY(-25px)' }}
              >
                {/* Stepped Pedestal with Gold Ring */}
                <div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-36 sm:w-48 h-12 rounded-full border-2 border-[#D4AF37]/60 bg-gradient-to-r from-[#123627] via-[#0E281E] to-[#123627] shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
                  style={{ transform: 'rotateX(65deg)' }}
                >
                  <div className="absolute inset-0 rounded-full ring-2 ring-[#D4AF37]/40 animate-pulse" />
                </div>
                {/* Sneaker 4K Image */}
                <div
                  onClick={() => onOpen3DModal(sneakerProduct)}
                  className="relative w-full h-full cursor-pointer group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1560343090-f0409e92791a?q=95&w=800&auto=format&fit=crop"
                    alt="Artisan Nappa Court Sneaker"
                    referrerPolicy="no-referrer"
                    onError={e => handleImageError(e, 'sneaker')}
                    className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.95)] -rotate-6 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#08120D]/95 backdrop-blur-md px-2.5 py-0.5 border border-[#D4AF37] text-[9.5px] font-mono-luxury text-white uppercase whitespace-nowrap flex items-center gap-1 shadow-lg">
                    <Maximize2 size={9} className="text-[#D4AF37]" />
                    <span>Margom Sneaker • 3D</span>
                  </div>
                </div>
              </div>

              {/* TIER 4 (Front Right): Haute Parfumerie Flacon */}
              <div
                className="absolute z-20 bottom-8 right-2 sm:right-6 w-32 sm:w-44 aspect-square preserve-3d transition-transform duration-300 hover:scale-105"
                style={{ transform: 'translateZ(90px) translateY(-5px)' }}
              >
                {/* Pedestal Glass Base */}
                <div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 sm:w-36 h-9 rounded-full border border-[#D4AF37]/50 bg-[#0E241A] shadow-[0_12px_28px_rgba(0,0,0,0.75)]"
                  style={{ transform: 'rotateX(65deg)' }}
                />
                {/* Fragrance Bottle */}
                <div
                  onClick={() => onSelectProduct(jewelryProduct.id)}
                  className="relative w-full h-full cursor-pointer group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=95&w=800&auto=format&fit=crop"
                    alt="Velora Amber Fragrance"
                    referrerPolicy="no-referrer"
                    onError={e => handleImageError(e, 'perfume')}
                    className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-[#091610]/90 backdrop-blur-md px-2 py-0.5 border border-[#D4AF37]/50 text-[9px] font-mono-luxury text-[#E5C583] uppercase whitespace-nowrap shadow-md">
                    Haute Parfum
                  </div>
                </div>
              </div>

              {/* TIER 5 (Front Center-Right Accent): Timepiece & Eyewear */}
              <div
                className="absolute z-25 -bottom-2 right-[24%] sm:right-[26%] w-24 sm:w-32 aspect-square preserve-3d transition-transform duration-300 hover:scale-110"
                style={{ transform: 'translateZ(140px) translateY(-10px)' }}
              >
                <div
                  onClick={() => onSelectProduct(jewelryProduct.id)}
                  className="relative w-full h-full cursor-pointer group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=95&w=600&auto=format&fit=crop"
                    alt="Swiss Chronograph & Eyewear"
                    referrerPolicy="no-referrer"
                    onError={e => handleImageError(e, 'jewelry')}
                    className="w-full h-full object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* INTERACTIVE 3D HOTSPOT RADAR PINS */}
              {hotspots.map(hs => (
                <div
                  key={hs.id}
                  className="absolute z-40 transition-transform duration-200"
                  style={{
                    left: `${hs.xPercent}%`,
                    top: `${hs.yPercent}%`,
                    transform: 'translateZ(160px) translate(-50%, -50%)'
                  }}
                >
                  {/* Radar Pin Button */}
                  <button
                    onClick={() => setActiveHotspot(activeHotspot?.id === hs.id ? null : hs)}
                    className="relative group flex items-center justify-center w-7 h-7 rounded-full bg-[#0A1610] text-[#D4AF37] border-2 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.6)] hover:scale-125 transition-transform animate-radar focus:outline-none"
                    aria-label={`Inspect ${hs.name}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  </button>

                  {/* Popover Card on Hotspot Click */}
                  {activeHotspot?.id === hs.id && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 bottom-9 w-64 p-3.5 bg-[#091610]/95 backdrop-blur-md border border-[#D4AF37]/80 rounded-xs shadow-[0_20px_40px_rgba(0,0,0,0.9)] z-50 text-left animate-fade-in"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex gap-3">
                        <img
                          src={hs.image}
                          alt={hs.name}
                          referrerPolicy="no-referrer"
                          onError={e => handleImageError(e, hs.category)}
                          className="w-16 h-16 object-cover bg-black/40 border border-[#1C4432] rounded-xs shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-mono-luxury uppercase text-[#D4AF37] block">
                            {hs.tag}
                          </span>
                          <h4 className="text-xs font-sans font-medium text-white line-clamp-1 mt-0.5">
                            {hs.name}
                          </h4>
                          <div className="text-sm font-mono-luxury font-bold text-[#E5C583] mt-1">
                            {formatPrice(hs.price)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-[#1C4432] flex items-center gap-2">
                        <button
                          onClick={() => {
                            addToCart(hs.productId, 'Standard', '#111111', 'Standard', 1);
                            setActiveHotspot(null);
                          }}
                          className="flex-1 py-1.5 bg-[#D4AF37] hover:bg-[#E5C583] text-[#0A1811] text-[10px] font-sans font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 rounded-xs"
                        >
                          <ShoppingBag size={11} />
                          <span>Quick Bag</span>
                        </button>
                        <button
                          onClick={() => {
                            const p = products.find(prod => prod.id === hs.productId) || products[0];
                            onOpen3DModal(p);
                            setActiveHotspot(null);
                          }}
                          className="px-2.5 py-1.5 bg-[#143224] hover:bg-[#1E4D37] text-white text-[10px] font-sans uppercase tracking-wider border border-[#2D6049] transition-colors flex items-center gap-1 rounded-xs"
                        >
                          <Maximize2 size={10} className="text-[#D4AF37]" />
                          <span>3D View</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FLOATING TRUST PILLARS BAR (Identical structure to reference image, styled in luxury emerald/gold) */}
        <div
          id="hero-trust-bar"
          className="mt-8 sm:mt-12 bg-[#0A1711]/90 backdrop-blur-md border border-[#1D4A35] rounded-xs p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-[#1D4A35]">
            {/* 1. Free Shipping */}
            <div className="flex items-center gap-3.5 pt-2 lg:pt-0 lg:px-4">
              <div className="w-10 h-10 rounded-full bg-[#112F22] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                <Truck size={18} strokeWidth={1.8} />
              </div>
              <div>
                <span className="text-xs sm:text-[13px] font-sans font-semibold text-white uppercase tracking-wider block">
                  Free Shipping
                </span>
                <span className="text-[11px] text-[#8AA194] font-sans block">
                  On orders over $99
                </span>
              </div>
            </div>

            {/* 2. Easy Returns */}
            <div className="flex items-center gap-3.5 pt-2 lg:pt-0 lg:px-4">
              <div className="w-10 h-10 rounded-full bg-[#112F22] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                <RefreshCw size={18} strokeWidth={1.8} />
              </div>
              <div>
                <span className="text-xs sm:text-[13px] font-sans font-semibold text-white uppercase tracking-wider block">
                  Easy Returns
                </span>
                <span className="text-[11px] text-[#8AA194] font-sans block">
                  30-day effortless policy
                </span>
              </div>
            </div>

            {/* 3. Secure Payment */}
            <div className="flex items-center gap-3.5 pt-2 lg:pt-0 lg:px-4">
              <div className="w-10 h-10 rounded-full bg-[#112F22] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                <ShieldCheck size={18} strokeWidth={1.8} />
              </div>
              <div>
                <span className="text-xs sm:text-[13px] font-sans font-semibold text-white uppercase tracking-wider block">
                  Secure Payment
                </span>
                <span className="text-[11px] text-[#8AA194] font-sans block">
                  100% 256-bit encrypted
                </span>
              </div>
            </div>

            {/* 4. Customer Support */}
            <div className="flex items-center gap-3.5 pt-2 lg:pt-0 lg:px-4">
              <div className="w-10 h-10 rounded-full bg-[#112F22] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                <Headphones size={18} strokeWidth={1.8} />
              </div>
              <div>
                <span className="text-xs sm:text-[13px] font-sans font-semibold text-white uppercase tracking-wider block">
                  Concierge Support
                </span>
                <span className="text-[11px] text-[#8AA194] font-sans block">
                  24/7 dedicated personal styling
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
