import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  Pause, 
  Play, 
  Maximize2, 
  Compass, 
  Sparkles,
  Layers,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { ProductImage } from './ProductImage';

interface VeloraGalleryShowcaseProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onSelectProduct: (productId: string) => void;
}

type GalleryCategoryKey = 'MEN' | 'WOMEN' | 'JEWELRY' | 'FOOTWEAR' | 'OVERVIEW';

interface GalleryInstallation {
  key: GalleryCategoryKey;
  wingNumber: string;
  categoryLabel: string;
  discipline: string;
  themeTitle: string;
  themeSubtitle: string;
  productId: string;
  productName: string;
  productPrice: number;
  productMaterials: string;
  provenance: string;
  curatorNote: string;
  productImage: string;
  defaultSize: string;
  defaultColor: string;
  defaultColorName: string;
  environment: {
    accentColor: string;
    lightTint: string;
    pedestalMaterial: string;
    spatialAtmosphere: string;
  };
}

const GALLERY_INSTALLATIONS: GalleryInstallation[] = [
  {
    key: 'MEN',
    wingNumber: 'WING 01',
    categoryLabel: 'MEN',
    discipline: 'Sartorial Architecture',
    themeTitle: 'The Monolith Pavilion',
    themeSubtitle: 'Dark basalt structures & brutalist vertical illumination',
    productId: 'vl-m-01',
    productName: 'Savile Row Wool-Cashmere Greatcoat',
    productPrice: 680,
    productMaterials: '90% Virgin Yorkshire Wool, 10% Cashmere, Bemberg Cupro lining',
    provenance: 'West Yorkshire Mill & Savile Row Workshop',
    curatorNote: 'Structured peaked lapels engineered with floating horsehair canvas that moulds permanently to the wearer.',
    productImage: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=90&w=1200&auto=format&fit=crop',
    defaultSize: 'US 40R',
    defaultColor: '#1A231F',
    defaultColorName: 'Charcoal Black',
    environment: {
      accentColor: '#1F4A34',
      lightTint: 'rgba(212,175,55,0.18)',
      pedestalMaterial: 'Honed Basalt Monolith',
      spatialAtmosphere: 'Brutalist Sartorial Chamber'
    }
  },
  {
    key: 'WOMEN',
    wingNumber: 'WING 02',
    categoryLabel: 'WOMEN',
    discipline: 'Sculptural Tailoring',
    themeTitle: 'The Fluid Silk Sanctuary',
    themeSubtitle: 'Suspended drape geometries & warm diffused caustic ambient light',
    productId: 'vl-w-01',
    productName: 'Castleford Double-Faced Cashmere Coat',
    productPrice: 720,
    productMaterials: '100% Double-Faced Cashmere, Hand-Finished Natural Horn Closures',
    provenance: 'Atelier Sartoria, Biella & Lyon Silk Weavers',
    curatorNote: 'Fluid full-length architectural cashmere trench cut with raglan sleeves and sweeping storm flap.',
    productImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
    defaultSize: 'US 6',
    defaultColor: '#F3E5DC',
    defaultColorName: 'Camel Melange',
    environment: {
      accentColor: '#E5C583',
      lightTint: 'rgba(243,229,220,0.22)',
      pedestalMaterial: 'Sculpted Warm Alabaster',
      spatialAtmosphere: 'Fluid Silk Sanctuary'
    }
  },
  {
    key: 'JEWELRY',
    wingNumber: 'WING 03',
    categoryLabel: 'JEWELRY',
    discipline: 'Haute Horlogerie',
    themeTitle: 'The Obsidian Specular Vault',
    themeSubtitle: 'Pitch-dark chamber with high-precision pin-spot reflection pools',
    productId: 'vl-jewel-ring-02',
    productName: 'Atelier Tourbillon Skeleton Chronograph',
    productPrice: 2450,
    productMaterials: 'Solid 18k Rose Gold Case, Emerald Guilloché Dial, Alligator Strap',
    provenance: 'Le Brassus, Vallée de Joux, Switzerland',
    curatorNote: 'Hand-chamfered anglage bridges oscillating with 21,600 vph tourbillon escapement visible through sapphire crystal.',
    productImage: '/images/showcase_watch.jpg',
    defaultSize: '41mm Case',
    defaultColor: '#B76E79',
    defaultColorName: '18k Rose Gold',
    environment: {
      accentColor: '#D4AF37',
      lightTint: 'rgba(212,175,55,0.3)',
      pedestalMaterial: 'Polished Mirror Obsidian',
      spatialAtmosphere: 'Controlled Specular Chamber'
    }
  },
  {
    key: 'FOOTWEAR',
    wingNumber: 'WING 04',
    categoryLabel: 'FOOTWEAR',
    discipline: 'Haute Cordwaining',
    themeTitle: 'The Venetian Atelier Vitrine',
    themeSubtitle: 'Low-rake specular lighting & levitated sculptural footwear presentation',
    productId: 'vl-shoe-heel-01',
    productName: 'Vittoria Sculpted Evening Stiletto Pump',
    productPrice: 480,
    productMaterials: 'Italian Emerald Duchesse Satin, 18k Gold Plated Heel Cap, Buffed Sole',
    provenance: 'Riviera del Brenta, Venice, Italy',
    curatorNote: 'Architectural 85mm stiletto with hand-burnished sole, resting upon a floating brutalist plinth.',
    productImage: '/images/showcase_heel.jpg',
    defaultSize: '38 IT',
    defaultColor: '#0E261B',
    defaultColorName: 'Emerald Duchesse',
    environment: {
      accentColor: '#D4AF37',
      lightTint: 'rgba(212,175,55,0.25)',
      pedestalMaterial: 'Polished Obsidian & 18k Gold Vitrine',
      spatialAtmosphere: 'Fine Cordwaining Pavilion'
    }
  }
];

export const VeloraGalleryShowcase: React.FC<VeloraGalleryShowcaseProps> = ({
  onNavigate,
  onSelectProduct
}) => {
  const { addToCart, formatPrice, setQuickViewProduct, getProductById } = useStore();

  // Active Category State
  const [activeTab, setActiveTab] = useState<GalleryCategoryKey>('MEN');
  const [isPlayingSequence, setIsPlayingSequence] = useState(true);
  const [hasAcquired, setHasAcquired] = useState(false);

  // Smooth Cursor Reactivity with Inertia (RAF Lerp)
  const containerRef = useRef<HTMLDivElement>(null);
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const [smoothCoords, setSmoothCoords] = useState({ x: 0, y: 0 });
  const [isMouseOver, setIsMouseOver] = useState(false);

  // RAF loop for physical inertia and buttery damping
  useEffect(() => {
    let animId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const tick = () => {
      // Damping factor: 0.065 gives weight and cinematic inertia
      currentMouse.current.x = lerp(currentMouse.current.x, targetMouse.current.x, 0.065);
      currentMouse.current.y = lerp(currentMouse.current.y, targetMouse.current.y, 0.065);

      setSmoothCoords({
        x: currentMouse.current.x,
        y: currentMouse.current.y
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Mouse move handler relative to container center (-1 to +1)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    targetMouse.current = {
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y))
    };
  };

  // Touch move handler for mobile/tablets
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((touch.clientY - rect.top) / rect.height) * 2 - 1;
    targetMouse.current = {
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y))
    };
  };

  // Touch gesture tracking for smooth mobile swiping
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.changedTouches.length > 0) {
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      // Trigger sequence transition on distinct horizontal swipe
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }
  };

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
    targetMouse.current = { x: 0, y: 0 };
  };

  // Cinematic Sequence Progression: strictly MEN -> WOMEN -> JEWELRY -> FOOTWEAR with 3.0s duration
  const STEP_DURATION = 3000; // ms (exactly 3 seconds per installation)
  const sequenceOrder: GalleryCategoryKey[] = useMemo(() => ['MEN', 'WOMEN', 'JEWELRY', 'FOOTWEAR'], []);
  const sequenceIndex = sequenceOrder.indexOf(activeTab);

  const handleNext = () => {
    setActiveTab(prevTab => {
      const currentIdx = sequenceOrder.indexOf(prevTab);
      const nextIdx = currentIdx === -1 ? 0 : (currentIdx + 1) % sequenceOrder.length;
      return sequenceOrder[nextIdx];
    });
  };

  const handlePrev = () => {
    setActiveTab(prevTab => {
      const currentIdx = sequenceOrder.indexOf(prevTab);
      const prevIdx = currentIdx === -1 ? 0 : (currentIdx - 1 + sequenceOrder.length) % sequenceOrder.length;
      return sequenceOrder[prevIdx];
    });
  };

  const handleSelectTab = (key: GalleryCategoryKey) => {
    setActiveTab(key);
  };

  const handleTogglePlay = () => {
    setIsPlayingSequence(p => !p);
  };

  // Auto-advance loop: guarantees 1-by-1 sequence without skipping or race conditions
  useEffect(() => {
    if (!isPlayingSequence || activeTab === 'OVERVIEW') return;

    const timer = setTimeout(() => {
      setActiveTab(prevTab => {
        const currentIdx = sequenceOrder.indexOf(prevTab);
        const nextIdx = currentIdx === -1 ? 0 : (currentIdx + 1) % sequenceOrder.length;
        return sequenceOrder[nextIdx];
      });
    }, STEP_DURATION);

    return () => clearTimeout(timer);
  }, [isPlayingSequence, activeTab, sequenceOrder]);

  const currentInstallation = useMemo(() => {
    return GALLERY_INSTALLATIONS.find(item => item.key === activeTab) || GALLERY_INSTALLATIONS[0];
  }, [activeTab]);

  const handleAcquire = () => {
    if (!currentInstallation) return;
    addToCart(
      currentInstallation.productId,
      currentInstallation.defaultSize,
      currentInstallation.defaultColor,
      currentInstallation.defaultColorName,
      1
    );
    setHasAcquired(true);
    setTimeout(() => setHasAcquired(false), 2400);
  };

  const handleInspect = () => {
    if (currentInstallation) {
      const fullProduct = getProductById(currentInstallation.productId);
      if (fullProduct) {
        setQuickViewProduct(fullProduct);
      } else {
        onSelectProduct(currentInstallation.productId);
      }
    }
  };

  // Spatial Parallax Calculations driven by smoothCoords
  const tiltX = -smoothCoords.y * 12; // deg
  const tiltY = smoothCoords.x * 16;  // deg
  const lightX = 50 + smoothCoords.x * 24; // %
  const lightY = 40 + smoothCoords.y * 22; // %
  const shadowOffsetX = -smoothCoords.x * 28; // px
  const shadowOffsetY = -smoothCoords.y * 18; // px

  return (
    <section 
      id="velora-gallery-showcase" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[690px] sm:min-h-[640px] lg:h-[690px] xl:h-[730px] bg-[#030805] text-[#FAF9F5] select-none overflow-hidden border-y border-[#D4AF37]/35 flex flex-col justify-between"
      style={{ 
        perspective: '1200px',
        boxShadow: 'inset 0 0 80px rgba(0,0,0,0.95), inset 0 0 24px rgba(212,175,55,0.08), 0 25px 60px rgba(0,0,0,0.9)'
      }}
      aria-label="The Velora Gallery Interactive Fashion Exhibition"
    >
      {/* 1. DYNAMIC GALLERY SPOTLIGHT & ATMOSPHERIC LIGHT SHAFTS */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(ellipse 65% 55% at ${lightX}% ${lightY}%, rgba(212,175,55,0.14) 0%, rgba(10,34,22,0.3) 45%, rgba(3,8,5,0.96) 80%, #030805 100%)`
        }}
      />

      {/* Volumetric Overhead Cone Beam */}
      <div 
        className="pointer-events-none absolute top-[-10%] left-1/2 w-[700px] h-[900px] -translate-x-1/2 opacity-25 mix-blend-screen transition-transform duration-700 ease-out hidden sm:block"
        style={{
          background: 'conic-gradient(from 180deg at 50% 0%, rgba(229,197,131,0.2) 0deg, rgba(16,46,31,0.02) 40deg, transparent 60deg, rgba(229,197,131,0.2) 80deg)',
          transform: `translateX(calc(-50% + ${smoothCoords.x * 35}px)) rotate(${smoothCoords.x * 4}deg)`
        }}
      />

      {/* High-Precision Architectural Laser Grid Floor Lines */}
      <div 
        className="pointer-events-none absolute bottom-0 inset-x-0 h-[48%] opacity-30"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(212,175,55,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          transform: `perspective(600px) rotateX(72deg) translateY(${smoothCoords.y * 10}px) scale(1.4)`,
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, black 20%, transparent 95%)'
        }}
      />

      {/* 2. GALLERY CURATION TOP BAR (Brand HUD - Fully Responsive) */}
      <header className="relative z-30 w-full px-4 sm:px-8 pt-3 sm:pt-3.5 pb-2.5 sm:pb-3 border-b border-[#183B2B]/40 bg-gradient-to-b from-[#030805]/98 via-[#030805]/85 to-transparent backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 max-w-7xl mx-auto">
          {/* Top Row on Mobile: Brand Identifier on Left + Controls on Right */}
          <div className="w-full sm:w-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_8px_#D4AF37] shrink-0" />
              <div className="flex items-center gap-2">
                <span className="font-editorial text-sm sm:text-base tracking-[0.24em] uppercase font-medium text-white">
                  VELORA
                </span>
                <span className="text-[#D4AF37] text-[11px] font-mono-luxury font-light">/</span>
                <span className="text-[10.5px] sm:text-[11px] font-mono-luxury tracking-[0.2em] text-[#D4AF37] uppercase font-semibold">
                  THE GALLERY
                </span>
              </div>
            </div>

            {/* Mobile Controls (Visible only on < sm) */}
            <div className="flex sm:hidden items-center gap-1.5">
              <div className="text-[9px] font-mono-luxury text-[#8FA89C] uppercase tracking-wider mr-1">
                <span className="text-[#D4AF37] font-semibold">
                  {isPlayingSequence ? '3s Loop' : 'Paused'}
                </span>
              </div>
              <button
                onClick={handlePrev}
                className="w-7 h-7 rounded-xs border border-[#1E4834] bg-[#07170F] text-[#C8D9D0] active:text-[#E5C583] flex items-center justify-center transition-colors"
                title="Previous wing"
                aria-label="Previous wing"
              >
                <ChevronLeft size={13} />
              </button>
              <button
                onClick={handleTogglePlay}
                className="w-7 h-7 rounded-xs border border-[#1E4834] bg-[#07170F] text-[#E5C583] flex items-center justify-center transition-colors"
                title={isPlayingSequence ? 'Pause sequence' : 'Play sequence'}
                aria-label={isPlayingSequence ? 'Pause sequence' : 'Play sequence'}
              >
                {isPlayingSequence ? <Pause size={11} /> : <Play size={11} className="ml-0.5" />}
              </button>
              <button
                onClick={handleNext}
                className="w-7 h-7 rounded-xs border border-[#1E4834] bg-[#07170F] text-[#C8D9D0] active:text-[#E5C583] flex items-center justify-center transition-colors"
                title="Next wing"
                aria-label="Next wing"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* Center: Wing Category Navigation in Strict Sequence (MEN -> WOMEN -> JEWELRY -> FOOTWEAR) */}
          <nav className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 p-1 bg-[#06120B]/90 border border-[#183B2B] rounded-xs shadow-inner overflow-x-auto no-scrollbar">
            {sequenceOrder.map((key, i) => {
              const isCurrent = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => handleSelectTab(key)}
                  className={`relative px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-mono-luxury tracking-[0.16em] uppercase transition-all duration-300 rounded-xs flex items-center gap-1.5 whitespace-nowrap ${
                    isCurrent
                      ? 'text-[#06110B] bg-[#E5C583] font-semibold shadow-[0_0_14px_rgba(229,197,131,0.4)]'
                      : 'text-[#8FA89C] hover:text-white hover:bg-[#0E261B]'
                  }`}
                  aria-current={isCurrent ? 'true' : undefined}
                >
                  <span className={`text-[8.5px] font-semibold ${isCurrent ? 'text-[#06110B]' : 'text-[#D4AF37]/80'}`}>
                    0{i + 1}
                  </span>
                  <span>{key}</span>
                </button>
              );
            })}

            {/* Subtle 5th option for Overview Salon */}
            <button
              onClick={() => handleSelectTab('OVERVIEW')}
              className={`relative px-2 sm:px-2.5 py-1 text-[9.5px] sm:text-[10.5px] font-mono-luxury tracking-[0.14em] uppercase transition-all duration-300 rounded-xs flex items-center gap-1 whitespace-nowrap ${
                activeTab === 'OVERVIEW'
                  ? 'text-[#06110B] bg-[#E5C583] font-semibold shadow-[0_0_14px_rgba(229,197,131,0.4)]'
                  : 'text-[#6C877A] hover:text-[#C8D9D0] hover:bg-[#0E261B]'
              }`}
              title="View Quad Grand Salon Overview"
            >
              <Layers size={10} />
              <span>SALON</span>
            </button>
          </nav>

          {/* Desktop/Tablet Controls & 3s Countdown Bar */}
          <div className="hidden sm:flex items-center gap-2.5">
            <div className="flex flex-col items-end gap-0.5">
              <div className="flex items-center gap-1.5 text-[9px] font-mono-luxury text-[#8FA89C] uppercase tracking-wider">
                <span>Seq 0{sequenceIndex + 1}/0{sequenceOrder.length}</span>
                <span className="text-[#D4AF37] font-semibold">
                  {isPlayingSequence && activeTab !== 'OVERVIEW' ? '3.0s Auto' : 'Paused'}
                </span>
              </div>
              <div className="w-24 h-1 bg-[#0D2217] border border-[#183B2B] rounded-full overflow-hidden">
                <div 
                  key={`${activeTab}-${isPlayingSequence}`}
                  className={`h-full bg-gradient-to-r from-[#D4AF37] to-[#F5E2B0] ${
                    isPlayingSequence && activeTab !== 'OVERVIEW' ? 'animate-gallery-progress' : 'w-full'
                  }`}
                />
              </div>
            </div>

            <button
              onClick={handlePrev}
              className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-xs border border-[#1E4834] bg-[#07170F] hover:bg-[#123624] hover:border-[#D4AF37] text-[#C8D9D0] hover:text-white flex items-center justify-center transition-colors shadow-sm"
              title="Previous installation (Left Arrow)"
              aria-label="Previous installation"
            >
              <ChevronLeft size={12} />
            </button>

            <button
              onClick={handleTogglePlay}
              className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-xs border border-[#1E4834] bg-[#07170F] hover:bg-[#123624] hover:border-[#D4AF37] text-[#E5C583] flex items-center justify-center transition-colors shadow-sm"
              title={isPlayingSequence ? 'Pause sequence' : 'Play sequence'}
              aria-label={isPlayingSequence ? 'Pause sequence' : 'Play sequence'}
            >
              {isPlayingSequence ? <Pause size={11} /> : <Play size={11} className="ml-0.5" />}
            </button>

            <button
              onClick={handleNext}
              className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-xs border border-[#1E4834] bg-[#07170F] hover:bg-[#123624] hover:border-[#D4AF37] text-[#C8D9D0] hover:text-white flex items-center justify-center transition-colors shadow-sm"
              title="Next installation (Right Arrow)"
              aria-label="Next installation"
            >
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </header>

      {/* 3. CENTRAL INTERACTIVE EXHIBITION STAGE */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-8 py-3 sm:py-4 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'OVERVIEW' ? (
            /* =========================================================================
               INSTALLATION 05: THE GRAND SALON (COMPLETE QUAD-GALLERY COMPOSITION)
               ========================================================================= */
            <motion.div
              key="overview-composition"
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(3px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(3px)' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-6xl h-full flex flex-col items-center justify-center text-center relative py-2"
            >
              {/* Grand Salon Monolith Backdrop */}
              <div 
                className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10"
                style={{
                  transform: `translate(${smoothCoords.x * 20}px, ${smoothCoords.y * 15}px)`
                }}
              >
                <span className="font-editorial text-[7rem] sm:text-[12rem] tracking-[0.25em] font-light text-[#D4AF37] select-none">
                  VELORA
                </span>
              </div>

              <div className="relative z-10 max-w-2xl px-4">
                <span className="text-[10px] font-mono-luxury tracking-[0.3em] uppercase text-[#D4AF37] block mb-1.5">
                  THE ARCHITECTURAL ENSEMBLE
                </span>
                <h2 className="font-editorial text-2xl sm:text-4xl text-white font-normal leading-tight tracking-wide">
                  Curated for the Bold.
                </h2>
                <p className="text-xs sm:text-sm text-[#9DB4A7] font-sans mt-2 leading-relaxed">
                  Four autonomous wings unified under radical sartorial discipline. Touch any installation to step inside its dedicated chamber.
                </p>
              </div>

              {/* Four Museum Pedestals in Spatial Perspective */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 w-full mt-5 sm:mt-6 max-w-5xl">
                {GALLERY_INSTALLATIONS.map((inst, i) => (
                  <div
                    key={inst.key}
                    onClick={() => handleSelectTab(inst.key)}
                    className="group relative bg-[#07160E]/80 hover:bg-[#0C2217] border border-[#183C2A] hover:border-[#D4AF37] p-2.5 sm:p-3 rounded-xs cursor-pointer transition-all duration-500 shadow-xl flex flex-col items-center"
                    style={{
                      transform: `translateY(${(i % 2 === 0 ? 0 : 6) + smoothCoords.y * 6}px)`
                    }}
                  >
                    <span className="text-[8.5px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37] block mb-1.5">
                      0{i + 1} // {inst.categoryLabel}
                    </span>
                    
                    {/* Small Pedestal Miniature */}
                    <div className="w-full aspect-[3/4] max-h-36 sm:max-h-40 overflow-hidden relative bg-[#040D07] rounded-xs border border-[#183B2B]/70">
                      <img
                        src={inst.productImage}
                        alt={inst.productName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-95 group-hover:brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#040D07] via-transparent to-transparent opacity-60" />
                    </div>

                    <h4 className="font-editorial text-xs text-white font-normal mt-2 line-clamp-1 group-hover:text-[#E5C583] transition-colors">
                      {inst.productName}
                    </h4>
                    <span className="text-[9.5px] font-mono-luxury text-[#8FA89C] mt-0.5">
                      {formatPrice(inst.productPrice)}
                    </span>

                    <div className="mt-2 flex items-center gap-1 text-[8.5px] font-mono-luxury tracking-widest text-[#D4AF37] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Enter Wing</span>
                      <ChevronRight size={9} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* =========================================================================
               INDIVIDUAL INSTALLATION CHAMBERS (MEN -> WOMEN -> JEWELRY -> FOOTWEAR)
               Strict Category Integrity with Cinematic Architectural Presentation
               ========================================================================= */
            <motion.div
              key={currentInstallation.key}
              initial={{ opacity: 0, y: 18, scale: 0.95, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -18, scale: 1.03, filter: 'blur(4px)' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-5 sm:gap-6 lg:gap-12 relative max-w-7xl"
            >
              {/* TYPOGRAPHIC ART PLACARD (Left on desktop, bottom on mobile) */}
              <div 
                className="w-full lg:w-5/12 flex flex-col justify-center order-2 lg:order-1 z-20 pointer-events-auto text-center sm:text-left items-center sm:items-start"
                style={{
                  transform: `translate(${-smoothCoords.x * 8}px, ${-smoothCoords.y * 5}px)`
                }}
              >
                <div className="space-y-3 sm:space-y-4 max-w-md">
                  {/* Wing & Discipline Indicator */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#081810]/80 border border-[#1D4A32] shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37] animate-pulse shrink-0" />
                    <span className="text-[9.5px] sm:text-[10px] font-mono-luxury uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
                      {currentInstallation.wingNumber} // {currentInstallation.discipline}
                    </span>
                  </div>

                  {/* Artwork Headline in Sculptural Editorial Serif */}
                  <div>
                    <h3 className="font-editorial text-2xl sm:text-3xl lg:text-[34px] text-white font-light tracking-wide leading-tight">
                      {currentInstallation.productName}
                    </h3>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3 mt-2">
                      <span className="font-editorial text-xl sm:text-2xl text-[#E5C583] font-medium">
                        {formatPrice(currentInstallation.productPrice)}
                      </span>
                      <span className="text-[#1D4A32] text-xs">•</span>
                      <span className="text-[10.5px] font-mono-luxury uppercase tracking-[0.14em] text-[#A6BFB2]">
                        {currentInstallation.defaultColorName}
                      </span>
                      <span className="text-[#1D4A32] text-xs hidden sm:inline">•</span>
                      <span className="text-[10px] font-mono-luxury uppercase tracking-[0.12em] text-[#789687] hidden sm:inline">
                        {currentInstallation.provenance}
                      </span>
                    </div>
                  </div>

                  {/* Direct Acquisition & Inspection Action CTAs */}
                  <div className="flex items-center justify-center sm:justify-start gap-2.5 pt-1">
                    <button
                      onClick={handleAcquire}
                      className={`h-10 sm:h-11 px-4 sm:px-5 text-[10.5px] sm:text-[11px] font-mono-luxury uppercase tracking-[0.18em] font-semibold transition-all duration-300 rounded-xs flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] ${
                        hasAcquired
                          ? 'bg-[#185338] text-white border border-[#2E8B57]'
                          : 'bg-[#E5C583] hover:bg-[#F5DA9C] text-[#06110B] border border-[#D4AF37] hover:shadow-[0_0_18px_rgba(229,197,131,0.45)]'
                      }`}
                    >
                      {hasAcquired ? (
                        <>
                          <Check size={13} strokeWidth={2.5} />
                          <span>Acquired to Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={13} />
                          <span>Acquire Piece</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleInspect}
                      className="h-10 sm:h-11 px-3.5 sm:px-4 text-[10.5px] sm:text-[11px] font-mono-luxury uppercase tracking-[0.16em] text-[#C8D9D0] bg-[#07170F]/90 hover:bg-[#123624] border border-[#1E4834] hover:border-[#D4AF37]/60 hover:text-white transition-all duration-300 rounded-xs flex items-center gap-1.5 shadow-sm active:scale-[0.98]"
                      title="Inspect full architectural details"
                    >
                      <Maximize2 size={12} />
                      <span>Inspect Piece</span>
                    </button>
                  </div>

                  {/* Wing Sequence Pips with Smooth 3s Progress Fill */}
                  <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                    {sequenceOrder.map((key, i) => {
                      const isCurrent = key === currentInstallation.key;
                      return (
                        <button
                          key={key}
                          onClick={() => handleSelectTab(key)}
                          className="py-1 flex items-center"
                          title={`Switch to 0${i + 1} ${key}`}
                          aria-label={`Switch to 0${i + 1} ${key}`}
                        >
                          <div className={`h-1 rounded-full transition-all duration-300 overflow-hidden ${
                            isCurrent ? 'w-10 bg-[#183B2B]' : 'w-3 bg-[#11291C] hover:bg-[#1C4630]'
                          }`}>
                            {isCurrent && (
                              <div 
                                key={`${activeTab}-${isPlayingSequence}`}
                                className={`h-full bg-gradient-to-r from-[#D4AF37] to-[#F5E2B0] ${
                                  isPlayingSequence ? 'animate-gallery-progress' : 'w-full'
                                }`}
                              />
                            )}
                          </div>
                        </button>
                      );
                    })}
                    <span className="text-[9px] font-mono-luxury text-[#6C877A] ml-2 uppercase tracking-wider">
                      0{sequenceIndex + 1} / 0{sequenceOrder.length} • 3s
                    </span>
                  </div>
                </div>
              </div>

              {/* CENTER 3D ARCHITECTURAL HERO VITRINE (Right on desktop, top on mobile) */}
              <div 
                className="w-full lg:w-7/12 h-[260px] sm:h-[330px] md:h-[370px] lg:h-[430px] xl:h-[460px] flex items-center justify-center relative order-1 lg:order-2"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                  transition: isMouseOver ? 'none' : 'transform 0.8s ease-out'
                }}
              >
                {/* CATEGORY-SPECIFIC ARCHITECTURAL ENVIRONMENT BACKDROP */}
                
                {/* MEN: Brutalist Basalt Monolith Columns */}
                {currentInstallation.key === 'MEN' && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div 
                      className="absolute left-[14%] top-[-10%] w-16 sm:w-24 h-[120%] bg-gradient-to-r from-[#07130D] to-[#0D2619] border-r border-[#1B402D]/40 opacity-70"
                      style={{ transform: `translateZ(-60px) translateX(${smoothCoords.x * -18}px)` }}
                    />
                    <div 
                      className="absolute right-[14%] top-[-5%] w-20 sm:w-28 h-[115%] bg-gradient-to-l from-[#06110B] to-[#0A2015] border-l border-[#1B402D]/40 opacity-80"
                      style={{ transform: `translateZ(-80px) translateX(${smoothCoords.x * -24}px)` }}
                    />
                    {/* Razor-sharp vertical tungsten beam */}
                    <div 
                      className="absolute top-0 right-[35%] w-[1px] h-full bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/30 to-transparent opacity-60"
                      style={{ transform: `translateX(${smoothCoords.x * 12}px)` }}
                    />
                  </div>
                )}

                {/* WOMEN: Flowing Curved Silk Backdrops */}
                {currentInstallation.key === 'WOMEN' && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div 
                      className="absolute inset-x-[15%] -top-10 h-[120%] rounded-full opacity-20 border border-[#E5C583]/40 mix-blend-screen"
                      style={{
                        background: 'radial-gradient(ellipse at 50% 30%, rgba(229,197,131,0.25), transparent 70%)',
                        transform: `translateZ(-50px) scale(${1 + smoothCoords.y * 0.05}) rotate(${smoothCoords.x * 6}deg)`
                      }}
                    />
                    {/* Floating fluid curved drapery fin */}
                    <svg 
                      className="absolute inset-0 w-full h-full opacity-25"
                      viewBox="0 0 600 600"
                      style={{ transform: `translateX(${smoothCoords.x * 20}px) translateY(${smoothCoords.y * 15}px)` }}
                    >
                      <path 
                        d="M 100,50 Q 250,300 450,150 T 550,550" 
                        fill="none" 
                        stroke="#D4AF37" 
                        strokeWidth="1.2" 
                        strokeDasharray="6 4"
                      />
                    </svg>
                  </div>
                )}

                {/* JEWELRY: Pitch-Dark Specular Vault with Obsidian Mirror Basin */}
                {currentInstallation.key === 'JEWELRY' && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                    {/* Concentric gold caustic rings */}
                    <div 
                      className="w-[260px] sm:w-[360px] h-[260px] sm:h-[360px] rounded-full border border-[#D4AF37]/30 opacity-40 animate-spin-slow"
                      style={{
                        transform: `translateZ(-80px) rotateX(75deg) rotate(${smoothCoords.x * 20}deg)`
                      }}
                    />
                    <div 
                      className="absolute w-[180px] sm:w-[240px] h-[180px] sm:h-[240px] rounded-full border border-[#E5C583]/50 opacity-60"
                      style={{
                        transform: `translateZ(-50px) rotateX(75deg)`
                      }}
                    />
                  </div>
                )}

                {/* FOOTWEAR: Italian Cordwaining Gold Halo (No green borders or shelves) */}
                {currentInstallation.key === 'FOOTWEAR' && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                    {/* Concentric Golden Caustic Aura */}
                    <div 
                      className="w-[260px] sm:w-[350px] h-[260px] sm:h-[350px] rounded-full border border-[#D4AF37]/30 opacity-40 animate-pulse"
                      style={{
                        transform: `translateZ(-60px) rotateX(70deg) scale(${1 + smoothCoords.y * 0.05})`
                      }}
                    />
                    <div 
                      className="absolute w-[180px] sm:w-[240px] h-[180px] sm:h-[240px] rounded-full bg-radial from-[#D4AF37]/15 to-transparent blur-xl pointer-events-none"
                      style={{
                        transform: `translateZ(-40px)`
                      }}
                    />
                  </div>
                )}

                {/* FLOATING ARTWORK VITRINE CONTAINER (Enlarged & Sculptural) */}
                <div 
                  className="relative z-20 w-[185px] sm:w-[235px] md:w-[265px] lg:w-[305px] xl:w-[330px] aspect-[3/4] group cursor-pointer"
                  onClick={handleInspect}
                  style={{
                    transform: `translateZ(40px)`,
                    filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.88))'
                  }}
                >
                  {/* Museum Display Glass Chamber Frame with Luxury Inner Shadow & Double Border */}
                  <div 
                    className="absolute -inset-2.5 rounded-xs border-2 border-[#D4AF37]/50 pointer-events-none transition-all duration-500 group-hover:border-[#E5C583] ring-1 ring-inset ring-[#D4AF37]/30"
                    style={{
                      boxShadow: 'inset 0 0 35px rgba(0,0,0,0.85), inset 0 0 16px rgba(212,175,55,0.22), 0 20px 40px rgba(0,0,0,0.9)'
                    }}
                  >
                    {/* Vitrine Corner Markers */}
                    <span className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#E5C583]" />
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#E5C583]" />
                    <span className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#E5C583]" />
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#E5C583]" />
                  </div>

                  {/* High-Resolution Product Artwork with Inner Vignette */}
                  <div 
                    className="w-full h-full overflow-hidden rounded-xs bg-[#020503] relative border border-[#D4AF37]/35"
                    style={{
                      boxShadow: 'inset 0 0 28px rgba(0,0,0,0.95)'
                    }}
                  >
                    <ProductImage
                      src={currentInstallation.productImage}
                      alt={currentInstallation.productName}
                      category={currentInstallation.key.toLowerCase()}
                      group={currentInstallation.key}
                      priority={true}
                      className={`w-full h-full transition-transform duration-700 ease-out filter brightness-100 group-hover:brightness-110 group-hover:scale-105 ${
                        currentInstallation.key === 'FOOTWEAR'
                          ? 'object-contain p-3 sm:p-4 bg-gradient-to-b from-[#010402] via-[#040A06] to-[#010302]'
                          : currentInstallation.key === 'JEWELRY'
                          ? 'object-cover object-center'
                          : 'object-cover object-top'
                      }`}
                    />

                    {/* Specular Traveling Light Glare Over Vitrine */}
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-transform duration-300"
                      style={{
                        background: `linear-gradient(${115 + smoothCoords.x * 20}deg, transparent 20%, rgba(255,255,255,0.4) 50%, transparent 80%)`,
                        transform: `translateX(${smoothCoords.x * 60}px)`
                      }}
                    />

                    {/* Floating Inspection Prompt Pill */}
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-[#06110B]/90 backdrop-blur-xs border border-[#D4AF37]/60 rounded-full text-[8px] sm:text-[8.5px] font-mono-luxury uppercase tracking-widest text-[#E5C583] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1 shadow-lg whitespace-nowrap">
                      <span>Click to Inspect</span>
                      <ChevronRight size={10} />
                    </div>
                  </div>

                  {/* Subtle Ground Ambient Soft Glow (Clean & un-cluttered) */}
                  <div 
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-black/60 rounded-full blur-lg pointer-events-none"
                    style={{
                      transform: `translateX(calc(-50% + ${shadowOffsetX * 0.4}px))`
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. BOTTOM CINEMATIC STATUS BAR & INTERACTIVE GUIDE */}
      <footer className="relative z-30 w-full px-4 sm:px-8 py-2 sm:py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#183B2B]/40 bg-gradient-to-t from-[#030805]/98 via-[#030805]/80 to-transparent backdrop-blur-xs text-[9.5px] font-mono-luxury text-[#7E998C]">
        {/* Left: Spatial Reactivity Notice */}
        <div className="flex items-center gap-2">
          <Compass size={12} className="text-[#D4AF37] animate-spin-slow shrink-0" />
          <span className="tracking-[0.14em] uppercase text-center sm:text-left">
            3D Spatial Inertia: Move cursor or swipe to navigate installations
          </span>
        </div>

        {/* Right: Curated Statement & Deep Link */}
        <div className="flex items-center gap-3">
          <span className="text-[#9DB4A7] uppercase tracking-[0.2em] hidden md:inline">
            CURATED FOR THE BOLD.
          </span>
          <button
            onClick={() => onNavigate('shop', { group: currentInstallation.key === 'OVERVIEW' ? '' : currentInstallation.key })}
            className="text-[#E5C583] hover:text-white uppercase tracking-[0.16em] flex items-center gap-1.5 transition-colors font-medium group"
          >
            <span>Explore {currentInstallation.key === 'OVERVIEW' ? 'Archive' : `${currentInstallation.categoryLabel} Collection`}</span>
            <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </footer>
    </section>
  );
};
