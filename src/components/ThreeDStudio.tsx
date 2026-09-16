import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { Compass, Sparkles, RotateCcw } from 'lucide-react';
import { StudioControls, StudioConfig } from './StudioControls';
import { ProductHotspot } from './ProductHotspot';
import { useStore } from '../context/StoreContext';

interface ThreeDStudioProps {
  onExploreLook?: (lookId: string) => void;
  className?: string;
}

export const ThreeDStudio: React.FC<ThreeDStudioProps> = ({
  onExploreLook,
  className = ''
}) => {
  const { formatPrice } = useStore();

  // Studio configuration state (Gender, Outfit 01-04, Shoes 01-03, Hair 01-03, Color)
  const [config, setConfig] = useState<StudioConfig>({
    gender: 'women',
    outfitIndex: 0,
    shoeIndex: 0,
    hairIndex: 0,
    color: 'emerald'
  });

  // Controlled horizontal rotation in degrees (0° to 360°)
  const [rotationDeg, setRotationDeg] = useState<number>(0);
  const targetAngleRef = useRef<number>(0);
  const currentAngleRef = useRef<number>(0);

  // Smooth clothing transition state
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Interaction refs
  const mountRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousPointerXRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Realistic professional fashion model curated photography for Womenswear & Menswear
  // Authenticated real human fashion photography with natural anatomy, realistic hands, feet, face, and drapery
  const modelLooks = {
    women: [
      {
        id: 'look-w-01',
        name: 'Castleford Storm Gabardine Trench',
        category: 'Womenswear Atelier',
        price: 2450,
        tag: 'Runway Look 01',
        angles: {
          front: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=95&w=1200&auto=format&fit=crop',
          threeQuarter: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=95&w=1200&auto=format&fit=crop',
          profile: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=95&w=1200&auto=format&fit=crop',
          threeQuarterBack: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=95&w=1200&auto=format&fit=crop',
          back: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=95&w=1200&auto=format&fit=crop'
        }
      },
      {
        id: 'look-w-02',
        name: 'Double-Faced Cashmere Blazer',
        category: 'Haute Tailoring',
        price: 2890,
        tag: 'Runway Look 02',
        angles: {
          front: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=95&w=1200&auto=format&fit=crop',
          threeQuarter: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=95&w=1200&auto=format&fit=crop',
          profile: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=95&w=1200&auto=format&fit=crop',
          threeQuarterBack: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=95&w=1200&auto=format&fit=crop',
          back: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=95&w=1200&auto=format&fit=crop'
        }
      },
      {
        id: 'look-w-03',
        name: 'Architectural Yorkshire Wool Cape',
        category: 'Outerwear Archive',
        price: 2150,
        tag: 'Runway Look 03',
        angles: {
          front: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=95&w=1200&auto=format&fit=crop',
          threeQuarter: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=95&w=1200&auto=format&fit=crop',
          profile: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=95&w=1200&auto=format&fit=crop',
          threeQuarterBack: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=95&w=1200&auto=format&fit=crop',
          back: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=95&w=1200&auto=format&fit=crop'
        }
      },
      {
        id: 'look-w-04',
        name: 'Fluid Mulberry Silk Evening Silhouette',
        category: 'Evening Atelier',
        price: 3400,
        tag: 'Runway Look 04',
        angles: {
          front: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=95&w=1200&auto=format&fit=crop',
          threeQuarter: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=95&w=1200&auto=format&fit=crop',
          profile: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=95&w=1200&auto=format&fit=crop',
          threeQuarterBack: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=95&w=1200&auto=format&fit=crop',
          back: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=95&w=1200&auto=format&fit=crop'
        }
      }
    ],
    men: [
      {
        id: 'look-m-01',
        name: 'Savile Row Structured Wool Overcoat',
        category: 'Menswear Sartorial',
        price: 2680,
        tag: 'Sartorial Look 01',
        angles: {
          front: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=90&w=1200&auto=format&fit=crop',
          threeQuarter: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=90&w=1200&auto=format&fit=crop',
          profile: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=90&w=1200&auto=format&fit=crop',
          threeQuarterBack: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=90&w=1200&auto=format&fit=crop',
          back: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=90&w=1200&auto=format&fit=crop'
        }
      },
      {
        id: 'look-m-02',
        name: 'Tuscan Merino Utility Field Jacket',
        category: 'Atelier Outerwear',
        price: 1980,
        tag: 'Sartorial Look 02',
        angles: {
          front: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=90&w=1200&auto=format&fit=crop',
          threeQuarter: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=90&w=1200&auto=format&fit=crop',
          profile: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=90&w=1200&auto=format&fit=crop',
          threeQuarterBack: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=90&w=1200&auto=format&fit=crop',
          back: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=90&w=1200&auto=format&fit=crop'
        }
      },
      {
        id: 'look-m-03',
        name: 'Double-Breasted Cashmere Lounge Suit',
        category: 'Bespoke Tailoring',
        price: 3250,
        tag: 'Sartorial Look 03',
        angles: {
          front: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=90&w=1200&auto=format&fit=crop',
          threeQuarter: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=90&w=1200&auto=format&fit=crop',
          profile: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=90&w=1200&auto=format&fit=crop',
          threeQuarterBack: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=90&w=1200&auto=format&fit=crop',
          back: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=90&w=1200&auto=format&fit=crop'
        }
      },
      {
        id: 'look-m-04',
        name: 'Midnight Mohair Peaked Tuxedo',
        category: 'Evening Formalwear',
        price: 3600,
        tag: 'Sartorial Look 04',
        angles: {
          front: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=90&w=1200&auto=format&fit=crop',
          threeQuarter: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=90&w=1200&auto=format&fit=crop',
          profile: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=90&w=1200&auto=format&fit=crop',
          threeQuarterBack: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=90&w=1200&auto=format&fit=crop',
          back: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=90&w=1200&auto=format&fit=crop'
        }
      }
    ]
  };

  const currentOutfitInfo = modelLooks[config.gender][config.outfitIndex];

  // Normalized rotation angle (0° to 360°)
  const normalizedDeg = ((rotationDeg % 360) + 360) % 360;

  // Calibrated viewpoint mapping: Front → 3/4 → Side Profile → 3/4 Rear → Back
  let currentAngleKey: 'front' | 'threeQuarter' | 'profile' | 'threeQuarterBack' | 'back' = 'front';
  let angleLabel = 'FRONT ATELIER';

  if (normalizedDeg >= 22.5 && normalizedDeg < 67.5) {
    currentAngleKey = 'threeQuarter';
    angleLabel = '3/4 ANGLE VIEW';
  } else if (normalizedDeg >= 67.5 && normalizedDeg < 112.5) {
    currentAngleKey = 'profile';
    angleLabel = 'SIDE PROFILE';
  } else if (normalizedDeg >= 112.5 && normalizedDeg < 157.5) {
    currentAngleKey = 'threeQuarterBack';
    angleLabel = '3/4 REAR DRAPE';
  } else if (normalizedDeg >= 157.5 && normalizedDeg < 202.5) {
    currentAngleKey = 'back';
    angleLabel = 'REAR ATELIER';
  } else if (normalizedDeg >= 202.5 && normalizedDeg < 247.5) {
    currentAngleKey = 'threeQuarterBack';
    angleLabel = '3/4 REAR DRAPE';
  } else if (normalizedDeg >= 247.5 && normalizedDeg < 292.5) {
    currentAngleKey = 'profile';
    angleLabel = 'SIDE PROFILE';
  } else if (normalizedDeg >= 292.5 && normalizedDeg < 337.5) {
    currentAngleKey = 'threeQuarter';
    angleLabel = '3/4 ANGLE VIEW';
  }

  const currentImage = currentOutfitInfo.angles[currentAngleKey];

  // Damped smooth interpolation loop for slow, controlled horizontal rotation
  useEffect(() => {
    let animationFrameId: number;

    const animateLoop = () => {
      const diff = targetAngleRef.current - currentAngleRef.current;
      currentAngleRef.current += diff * 0.08;

      setRotationDeg(currentAngleRef.current);
      animationFrameId = requestAnimationFrame(animateLoop);
    };

    animationFrameId = requestAnimationFrame(animateLoop);
    rafIdRef.current = animationFrameId;

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Pointer drag event handlers for horizontal orbit
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    previousPointerXRef.current = e.clientX;
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousPointerXRef.current;
    previousPointerXRef.current = e.clientX;

    // Slow, controlled rotation factor (0.42 degrees per pixel)
    targetAngleRef.current += deltaX * 0.42;
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      const target = e.currentTarget as HTMLElement;
      target.releasePointerCapture(e.pointerId);
    } catch {
      // ignore if already released
    }
  }, []);

  // Configuration change with subtle, premium crossfade
  const handleConfigChange = (newConfig: Partial<StudioConfig>) => {
    if (newConfig.outfitIndex !== undefined && newConfig.outfitIndex !== config.outfitIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setConfig(prev => ({ ...prev, ...newConfig }));
        setTimeout(() => setIsTransitioning(false), 260);
      }, 140);
    } else if (newConfig.gender !== undefined && newConfig.gender !== config.gender) {
      setIsTransitioning(true);
      setTimeout(() => {
        setConfig(prev => ({ ...prev, ...newConfig }));
        setTimeout(() => setIsTransitioning(false), 260);
      }, 140);
    } else {
      setConfig(prev => ({ ...prev, ...newConfig }));
    }
  };

  const handleSetRotation = (deg: number) => {
    targetAngleRef.current = deg;
  };

  const handleResetView = () => {
    targetAngleRef.current = 0;
  };

  // Subtle parallax tilt for the grounded display platform
  const pedestalTiltRad = (rotationDeg * Math.PI) / 180;
  const pedestalXParallax = Math.sin(pedestalTiltRad) * 6;

  return (
    <section
      id="3d-studio-section"
      className={`relative bg-[#06110B] text-white py-12 sm:py-16 border-b border-[#143323] overflow-hidden ${className}`}
    >
      {/* Cinematic ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-3xl opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(20,58,38,0.6) 0%, rgba(212,175,55,0.08) 45%, transparent 75%)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#163826] pb-5 mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-luxury uppercase tracking-[0.22em] text-[#D4AF37] mb-2">
              <Sparkles size={13} className="text-[#D4AF37]" />
              <span>Interactive Exhibition</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#FAF9F5] font-normal tracking-tight">
              The 3D Atelier Showroom
            </h2>
            <p className="text-sm text-[#9DB4A7] mt-1 max-w-xl font-sans">
              Experience the silhouette in full 360° rotation. Realistic fabric drape, tailored proportions, and handcrafted finishing.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-luxury text-[#7E998B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#358B5E]" />
            <span>Interactive 360° Orbit</span>
          </div>
        </div>

        {/* Main Stage Grid: 3D Viewport (Left/Center) + Minimal Controls (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* 3D Viewport Stage Container */}
          <div className="lg:col-span-7 xl:col-span-8 relative flex flex-col items-center justify-center">
            <div
              ref={mountRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative w-full aspect-[4/4.5] sm:aspect-[4/4.2] rounded-xs cursor-grab active:cursor-grabbing select-none overflow-hidden touch-none flex items-center justify-center"
              style={{
                background: 'radial-gradient(ellipse at 50% 55%, #0B2217 0%, #06110B 75%)'
              }}
            >
              {/* ------------------------------------------------------------- */}
              {/* 1. THE FASHION MODEL PRESENTATION */}
              {/* Isolated naturally into dark forest environment, realistic human proportions */}
              {/* ------------------------------------------------------------- */}
              <div
                className={`relative z-10 w-[270px] sm:w-[330px] md:w-[360px] h-[410px] sm:h-[490px] md:h-[530px] flex items-end justify-center transition-all duration-300 pointer-events-none select-none ${
                  isTransitioning ? 'opacity-70 filter blur-[1px]' : 'opacity-100'
                }`}
                style={{
                  transform: `translateX(${pedestalXParallax}px)`
                }}
              >
                {/* Natural studio vignette mask (no rectangular photo box, soft seamless integration) */}
                <div
                  className="relative w-full h-full flex items-end justify-center overflow-hidden"
                  style={{
                    maskImage: 'radial-gradient(ellipse 76% 85% at 50% 48%, black 65%, transparent 98%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 76% 85% at 50% 48%, black 65%, transparent 98%)'
                  }}
                >
                  <img
                    src={currentImage}
                    alt={`${currentOutfitInfo.name} - ${angleLabel}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter brightness-[1.03] contrast-[1.02] transition-opacity duration-300"
                  />

                  {/* Soft studio key light overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(229,197,131,0.08) 0%, transparent 50%, rgba(6,17,11,0.4) 100%)'
                    }}
                  />
                </div>

                {/* Clear contact shadow directly beneath the feet/shoes onto the platform surface */}
                <div
                  className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-48 sm:w-56 h-6 rounded-full bg-black/85 pointer-events-none"
                  style={{
                    filter: 'blur(4px)',
                    transform: 'translate(-50%, 0) scaleY(0.7)'
                  }}
                />

                {/* Interactive Hotspot pinned to coat/tailoring */}
                <div className="absolute top-[38%] left-[54%] pointer-events-auto">
                  <ProductHotspot
                    hotspot={{
                      id: 'hs-studio-outfit',
                      name: currentOutfitInfo.name,
                      category: currentOutfitInfo.category,
                      price: currentOutfitInfo.price,
                      productId: config.gender === 'women' ? 'vl-w-01' : 'vl-m-01',
                      tag: currentOutfitInfo.tag,
                      xPercent: 50,
                      yPercent: 50
                    }}
                    onSelectProduct={() => {
                      if (onExploreLook) {
                        onExploreLook(config.gender === 'women' ? 'look-01' : 'look-02');
                      }
                    }}
                  />
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* 2. THE SINGLE LUXURY EXHIBITION PLATFORM (Requirement 4) */}
              {/* Circular/elliptical, dark green/black, reflective, champagne-gold edge */}
              {/* ------------------------------------------------------------- */}
              <div
                className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-[310px] sm:w-[390px] md:w-[440px] pointer-events-none select-none z-5 flex flex-col items-center"
                aria-hidden="true"
              >
                {/* Floor contact shadow under the platform */}
                <div
                  className="w-[90%] h-6 rounded-full bg-black/80 blur-[6px] transition-all"
                  style={{ transform: 'scaleY(0.6)' }}
                />

                {/* Solid Luxury Museum Display Pedestal Disc */}
                <div
                  className="relative w-full h-12 sm:h-14 transition-transform duration-300"
                  style={{ perspective: '800px' }}
                >
                  <div
                    className="relative w-full h-full rounded-full transition-transform"
                    style={{
                      transform: `rotateX(68deg) rotateZ(${rotationDeg * 0.15}deg)`
                    }}
                  >
                    {/* Beveled Side Edge (gives subtle physical depth) */}
                    <div
                      className="absolute inset-x-0 rounded-full"
                      style={{
                        bottom: '-5px',
                        height: '8px',
                        background: 'linear-gradient(180deg, #122B1E 0%, #050E09 100%)',
                        boxShadow: '0 6px 14px rgba(0,0,0,0.9)'
                      }}
                    />

                    {/* Top Surface Disc: Dark green-black metallic with razor-thin champagne gold edge */}
                    <div
                      className="relative w-full h-full rounded-full overflow-hidden"
                      style={{
                        background: 'linear-gradient(145deg, #133423 0%, #0B1F15 50%, #05110B 100%)',
                        border: '1px solid rgba(212, 175, 55, 0.45)',
                        boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.12), inset 0 -2px 6px rgba(0,0,0,0.85)'
                      }}
                    >
                      {/* Subtle soft specular highlight on platform face */}
                      <div
                        className="absolute inset-0 rounded-full opacity-35"
                        style={{
                          background: 'radial-gradient(ellipse at 45% 35%, rgba(229,197,131,0.2) 0%, transparent 65%)'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Interaction Hint Overlay */}
              <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 bg-[#06110B]/85 backdrop-blur-md px-3 py-1.5 border border-[#173D29] rounded-xs text-[10.5px] font-mono-luxury text-[#9DB4A7]">
                <Compass size={12} className="text-[#D4AF37]" />
                <span>Drag to Rotate 360°</span>
              </div>

              {/* Current Angle Readout */}
              <div className="absolute top-4 right-4 pointer-events-none bg-[#06110B]/85 backdrop-blur-md px-3 py-1.5 border border-[#173D29] rounded-xs text-[10.5px] font-mono-luxury text-[#E5C583]">
                <span>{angleLabel} · {Math.round(normalizedDeg)}°</span>
              </div>
            </div>

            {/* Quick Helper Bar */}
            <div className="w-full mt-3 flex items-center justify-between text-[11px] text-[#7E998B] font-mono-luxury px-1">
              <span>STUDIO ILLUMINATION: <b className="text-white">Natural Key + Forest Rim</b></span>
              <span>DRAPE: <b className="text-[#E5C583]">Structured Natural Tailoring</b></span>
            </div>
          </div>

          {/* Minimal Fashion Studio Controls (Requirement 7) */}
          <div className="lg:col-span-5 xl:col-span-4 bg-[#091A12]/80 backdrop-blur-md border border-[#163826] p-5 sm:p-6 rounded-xs shadow-[0_16px_36px_rgba(0,0,0,0.6)]">
            <StudioControls
              config={config}
              onChangeConfig={handleConfigChange}
              rotationDeg={rotationDeg}
              onSetRotation={handleSetRotation}
              onResetView={handleResetView}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
