import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import {
  ArrowRight,
  Maximize2,
  Sparkles,
  Layers,
  RotateCcw,
  ShieldCheck,
  Truck,
  RefreshCw,
  Compass,
  Camera,
  Scan,
  Activity,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { handleImageError } from '../utils/images';

interface Hero3DStageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onSelectProduct: (id: string) => void;
  onOpen3DModal: (product: Product) => void;
}

type ActiveLabFocus = 'model' | 'handbag' | 'shoe' | 'perfume' | null;
type CinematicMode = 'director' | 'exploded' | 'orbit';

export const Hero3DStage: React.FC<Hero3DStageProps> = ({
  onNavigate,
  onSelectProduct,
  onOpen3DModal
}) => {
  const { products, formatPrice } = useStore();

  // Active hover/lab inspection item & cinematic perspective modes
  const [activeFocus, setActiveFocus] = useState<ActiveLabFocus>(null);
  const [cinematicMode, setCinematicMode] = useState<CinematicMode>('director');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [telemetry, setTelemetry] = useState({ x: 0, y: 0, fov: 42 });

  // DOM references for GSAP timeline & interactive elements
  const heroRootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const handbagRef = useRef<HTMLDivElement>(null);
  const shoeRef = useRef<HTMLDivElement>(null);
  const perfumeRef = useRef<HTMLDivElement>(null);
  const typoPillarRef = useRef<HTMLDivElement>(null);
  const labBarRef = useRef<HTMLDivElement>(null);

  // Mouse physics coordinates for smooth inertia interpolation (lerp)
  const mousePos = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    // Local coordinates inside cards for specular light beam
    modelLocalX: 0,
    modelLocalY: 0,
    bagLocalX: 0,
    bagLocalY: 0,
    shoeLocalX: 0,
    shoeLocalY: 0,
    perfumeLocalX: 0,
    perfumeLocalY: 0
  });

  const rafId = useRef<number | null>(null);
  const startTime = useRef<number>(Date.now());

  // ---------------------------------------------------------------------------
  // AUTHENTIC, CLASSY, REAL LUXURY PRODUCTS (100% real high-fashion photography)
  // ---------------------------------------------------------------------------
  const showcaseItems = {
    model: {
      id: 'vl-w-01',
      name: 'Castleford Gabardine Trench',
      category: 'Haute Outerwear Look 01',
      price: 2450,
      provenance: 'West Yorkshire, England',
      materials: 'Double-faced pure cashmere & water-repellent gabardine',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=85&w=1200&auto=format&fit=crop',
      label: '01 / SILHOUETTE',
      lensInfo: '85mm ƒ/1.4 Studio Prime',
      opticalDepth: '1.2m',
      sublabel: 'Atelier Runway Look'
    },
    handbag: {
      id: 'vl-w-bag-01',
      name: 'Tuscan Saddle Leather Bag',
      category: 'Artisan Vegetable-Tanned Calfskin',
      price: 1250,
      provenance: 'Florence, Italy',
      materials: 'Full-grain Vachetta calfskin & hand-turned solid brass hardware',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=85&w=1000&auto=format&fit=crop',
      label: '02 / CUIR SADDLE',
      lensInfo: '50mm ƒ/1.8 Macro Planar',
      opticalDepth: '0.8m',
      sublabel: 'Artisan Leathercraft'
    },
    shoe: {
      id: 'vl-shoe-heel-01',
      name: 'Milano Sculpted Satin Pump',
      category: 'Master Cordwainer Evening Pump',
      price: 780,
      provenance: 'Civitanova Marche, Italy',
      materials: 'Italian duchesse silk satin & channelled leather sole',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=85&w=1000&auto=format&fit=crop',
      label: '03 / CORDWAINER',
      lensInfo: '35mm ƒ/2.0 Sculptural View',
      opticalDepth: '0.5m',
      sublabel: 'Hand-Lasted Footwear'
    },
    perfume: {
      id: 'vl-fragrance-elixir-01',
      name: "L'Élixir Velora Extrait de Parfum",
      category: 'Pure Extrait de Parfum (32% Oil)',
      price: 285,
      provenance: 'Grasse, France',
      materials: 'Florentine aged orris root, Atlas cedarwood & ambergris flacon',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=85&w=1000&auto=format&fit=crop',
      label: '04 / PARFUMERIE',
      lensInfo: '100mm ƒ/2.8 Crystal Macro',
      opticalDepth: '0.3m',
      sublabel: 'Crystal Flacon'
    }
  };

  // ---------------------------------------------------------------------------
  // 2-SECOND CINEMATIC CAMERA REVEAL (GSAP Stagger, zero bounce, pure optics)
  // ---------------------------------------------------------------------------
  const playEntranceSequence = useCallback(() => {
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    // Reset initial states for camera reveal
    gsap.set(bgRef.current, { opacity: 0, scale: 1.03 });
    gsap.set(
      [modelRef.current, handbagRef.current, shoeRef.current, perfumeRef.current],
      {
        opacity: 0,
        filter: 'blur(12px)',
        scale: 1.04,
        y: 20
      }
    );

    // 1. Background fades in smoothly (0.0s -> 0.45s)
    tl.fromTo(
      bgRef.current,
      { opacity: 0, scale: 1.03 },
      { opacity: 0.35, scale: 1, duration: 0.45, ease: 'power2.out' },
      0
    );

    // 2. Sequential camera reveal of [model, handbag, shoe, perfume] using GSAP stagger (0.35s step)
    // Model: 0.20s -> 0.95s
    // Handbag: 0.55s -> 1.30s
    // Shoe: 0.90s -> 1.65s
    // Perfume: 1.25s -> 2.00s
    // Duration: exactly 2.0s!
    tl.fromTo(
      [modelRef.current, handbagRef.current, shoeRef.current, perfumeRef.current],
      {
        opacity: 0,
        filter: 'blur(12px)',
        scale: 1.04,
        y: 20
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.35,
        ease: 'power2.out'
      },
      0.2
    );

    // 3. Editorial typography column smoothly slides into position
    if (typoPillarRef.current) {
      tl.fromTo(
        typoPillarRef.current.children,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
        0.4
      );
    }

    if (labBarRef.current) {
      tl.fromTo(
        labBarRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.2
      );
    }
  }, []);

  // Run on mount
  useEffect(() => {
    playEntranceSequence();
  }, [playEntranceSequence]);

  // ---------------------------------------------------------------------------
  // 2026 KINETIC ENGINE: CONTINUOUS 3D DEPTH, MOUSE INERTIA & HARMONIC BREATHING
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let currentX = 0;
    let currentY = 0;

    const tick = () => {
      const elapsed = (Date.now() - startTime.current) * 0.001;

      // Smooth lerp (inertia coefficient 0.075)
      currentX += (mousePos.current.targetX - currentX) * 0.075;
      currentY += (mousePos.current.targetY - currentY) * 0.075;

      // Subtle organic harmonic breathing (sinusoidal micro-oscillation)
      // Keeps the stage alive even when cursor is static
      const breath1 = Math.sin(elapsed * 1.4) * 2.5;
      const breath2 = Math.cos(elapsed * 1.1) * 3.0;
      const breath3 = Math.sin(elapsed * 1.7 + 1) * 2.0;

      // Mode-specific offsets
      let explodedFactorX = 0;
      let explodedFactorY = 0;
      let orbitAngle = 0;

      if (cinematicMode === 'exploded') {
        explodedFactorX = 18;
        explodedFactorY = 12;
      } else if (cinematicMode === 'orbit') {
        orbitAngle = Math.sin(elapsed * 0.7) * 4;
      }

      setTelemetry({
        x: Math.round(currentX * 30 * 10) / 10,
        y: Math.round(currentY * 24 * 10) / 10,
        fov: Math.round(42 - Math.abs(currentX) * 3)
      });

      // Background subtle drift (~5px)
      if (bgRef.current) {
        gsap.set(bgRef.current, {
          x: currentX * 6,
          y: currentY * 5,
          scale: 1 + Math.abs(currentX) * 0.015
        });
      }

      // 1. Model Look (Midground anchor)
      if (modelRef.current) {
        const isHovered = activeFocus === 'model';
        const zTranslate = isHovered ? 40 : activeFocus ? -15 : 0;
        const targetRotY = currentX * 2.5 + orbitAngle + (isHovered ? currentX * 2 : 0);
        const targetRotX = -currentY * 2.5 + (isHovered ? -currentY * 2 : 0);

        gsap.set(modelRef.current, {
          x: currentX * 14 - explodedFactorX + breath1 * 0.5,
          y: currentY * 11 + breath1,
          z: zTranslate,
          rotateY: targetRotY,
          rotateX: targetRotX,
          transformPerspective: 1200
        });
      }

      // 2. Handbag (Mid-foreground)
      if (handbagRef.current) {
        const isHovered = activeFocus === 'handbag';
        const zTranslate = isHovered ? 45 : activeFocus ? -12 : 5;
        const targetRotY = currentX * 3.2 + orbitAngle * 1.2;
        const targetRotX = -currentY * 3.2;

        gsap.set(handbagRef.current, {
          x: currentX * 22 + explodedFactorX * 1.2 + breath2 * 0.6,
          y: currentY * 16 - explodedFactorY + breath2,
          z: zTranslate,
          rotateY: targetRotY,
          rotateX: targetRotX,
          transformPerspective: 1000
        });
      }

      // 3. Shoe (Foreground artisan element)
      if (shoeRef.current) {
        const isHovered = activeFocus === 'shoe';
        const zTranslate = isHovered ? 50 : activeFocus ? -10 : 15;
        const targetRotY = currentX * 4.2 + orbitAngle * 1.4;
        const targetRotX = -currentY * 4.2;

        gsap.set(shoeRef.current, {
          x: currentX * 30 - explodedFactorX * 0.5 + breath3 * 0.7,
          y: currentY * 22 + explodedFactorY * 1.1 + breath3,
          z: zTranslate,
          rotateY: targetRotY,
          rotateX: targetRotX,
          rotateZ: currentX * 0.8,
          transformPerspective: 950
        });
      }

      // 4. Perfume (Foreground crystal flacon)
      if (perfumeRef.current) {
        const isHovered = activeFocus === 'perfume';
        const zTranslate = isHovered ? 55 : activeFocus ? -8 : 25;
        const targetRotY = currentX * 4.8 + orbitAngle * 1.6;
        const targetRotX = -currentY * 4.8;

        gsap.set(perfumeRef.current, {
          x: currentX * 38 + explodedFactorX * 1.4 + breath1 * 0.8,
          y: currentY * 28 + explodedFactorY * 1.4 + breath2 * 0.8,
          z: zTranslate,
          rotateY: targetRotY,
          rotateX: targetRotX,
          rotateZ: -currentX * 1.2,
          transformPerspective: 900
        });
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [activeFocus, cinematicMode]);

  // Stage Mouse Movement tracking
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    mousePos.current.targetX = normX;
    mousePos.current.targetY = normY;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mousePos.current.targetX = 0;
    mousePos.current.targetY = 0;
    setActiveFocus(null);
  }, []);

  // Card-specific hover movement for specular light beam tracking
  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    cardKey: 'model' | 'handbag' | 'shoe' | 'perfume'
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    if (cardKey === 'model') {
      mousePos.current.modelLocalX = localX;
      mousePos.current.modelLocalY = localY;
    } else if (cardKey === 'handbag') {
      mousePos.current.bagLocalX = localX;
      mousePos.current.bagLocalY = localY;
    } else if (cardKey === 'shoe') {
      mousePos.current.shoeLocalX = localX;
      mousePos.current.shoeLocalY = localY;
    } else if (cardKey === 'perfume') {
      mousePos.current.perfumeLocalX = localX;
      mousePos.current.perfumeLocalY = localY;
    }
  };

  // ---------------------------------------------------------------------------
  // SCROLL CONTINUITY (Camera dolly out as user scrolls down)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      if (scroll > 10 && scroll < 700) {
        const factor = Math.min(scroll / 600, 1);
        if (stageRef.current) {
          gsap.to(stageRef.current, {
            scale: 1 - factor * 0.04,
            y: factor * 24,
            opacity: 1 - factor * 0.25,
            duration: 0.1,
            overwrite: 'auto'
          });
        }
        if (typoPillarRef.current) {
          gsap.to(typoPillarRef.current, {
            opacity: 1 - factor * 0.5,
            y: -factor * 20,
            duration: 0.1,
            overwrite: 'auto'
          });
        }
      } else if (scroll <= 10) {
        if (stageRef.current) {
          gsap.to(stageRef.current, { scale: 1, y: 0, opacity: 1, duration: 0.4, overwrite: 'auto' });
        }
        if (typoPillarRef.current) {
          gsap.to(typoPillarRef.current, { opacity: 1, y: 0, duration: 0.4, overwrite: 'auto' });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Currently inspected item
  const currentInspectItem = activeFocus ? showcaseItems[activeFocus] : showcaseItems.model;

  return (
    <section
      id="velora-cinematic-hero"
      ref={heroRootRef}
      className="relative w-full pt-3 sm:pt-5 pb-12 sm:pb-16 bg-[#06110B] text-[#FAF9F5] overflow-hidden"
    >
      {/* 2026 Ambient Architectural Lighting & Radial Volumetric Glows */}
      <div className="absolute top-0 right-1/4 w-[850px] h-[850px] bg-[#D4AF37]/6 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-20 w-[650px] h-[650px] bg-[#143B28]/25 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ----------------------------------------------------------- */}
        {/* 2026 ATELIER LAB CONTROLS & CAMERA TELEMETRY BAR            */}
        {/* ----------------------------------------------------------- */}
        <div
          ref={labBarRef}
          className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-[#143324]"
        >
          {/* Brand Lab Indicator with Live Optical Status */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono-luxury tracking-[0.24em] text-[#D4AF37] uppercase flex items-center gap-2 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_8px_#D4AF37]" />
              <span>VELORA LAB // SPATIAL CINEMA 2026</span>
            </span>

            <span className="hidden sm:inline-block text-[10px] font-mono-luxury text-[#6B8577] border-l border-[#193F2B] pl-3">
              LENS: <span className="text-[#E5C583]">{activeFocus ? showcaseItems[activeFocus].lensInfo : '85mm ƒ/1.4 Master Prime'}</span>
            </span>
          </div>

          {/* Perspective Modes & Telemetry Controls */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* 3 Camera Modes: Director (Cinematic), Exploded (Layers), Orbit (Runway) */}
            <div className="flex items-center bg-[#071911] border border-[#173D2A] rounded-xs p-0.5 text-[9.5px] font-mono-luxury uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setCinematicMode('director')}
                className={`px-2.5 py-1 rounded-xs transition-all cursor-pointer ${
                  cinematicMode === 'director'
                    ? 'bg-[#153E2A] text-[#E5C583] font-semibold shadow-xs'
                    : 'text-[#7E998C] hover:text-white'
                }`}
                title="Cinematic Depth Mode: Natural focal perspective"
              >
                Director
              </button>
              <button
                type="button"
                onClick={() => setCinematicMode('exploded')}
                className={`px-2.5 py-1 rounded-xs transition-all cursor-pointer ${
                  cinematicMode === 'exploded'
                    ? 'bg-[#153E2A] text-[#E5C583] font-semibold shadow-xs'
                    : 'text-[#7E998C] hover:text-white'
                }`}
                title="Exploded View: Dispersed spatial inspection layers"
              >
                Exploded
              </button>
              <button
                type="button"
                onClick={() => setCinematicMode('orbit')}
                className={`px-2.5 py-1 rounded-xs transition-all cursor-pointer ${
                  cinematicMode === 'orbit'
                    ? 'bg-[#153E2A] text-[#E5C583] font-semibold shadow-xs'
                    : 'text-[#7E998C] hover:text-white'
                }`}
                title="Orbit Mode: Dynamic runway camera oscillation"
              >
                Orbit
              </button>
            </div>

            {/* Live Inertia Telemetry */}
            <div className="hidden md:flex items-center gap-2 text-[9.5px] font-mono-luxury text-[#7E998C] bg-[#081C13] px-2.5 py-1 border border-[#163B29] rounded-xs">
              <Activity size={11} className="text-[#D4AF37] animate-pulse" />
              <span>FOV {telemetry.fov}°</span>
              <span className="text-[#1E4E35]">/</span>
              <span className="text-white">{telemetry.x > 0 ? `+${telemetry.x}` : telemetry.x}px</span>
            </div>

            {/* Replay 2-Second Camera Reveal Sequence */}
            <button
              type="button"
              disabled={isAnimating}
              onClick={playEntranceSequence}
              className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono-luxury uppercase tracking-wider rounded-xs border transition-all cursor-pointer ${
                isAnimating
                  ? 'bg-[#153E2A] text-[#E5C583] border-[#D4AF37] opacity-80'
                  : 'bg-[#081B12] text-[#8BA496] border-[#183E2C] hover:text-[#FAF9F5] hover:border-[#D4AF37]/50'
              }`}
              title="Replay the 2-second staggered camera reveal"
            >
              <RotateCcw size={11} className={isAnimating ? 'animate-spin' : ''} />
              <span>{isAnimating ? 'Revealing...' : 'Replay Reveal ↺'}</span>
            </button>
          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* MAIN CINEMATIC GRID: EDITORIAL COLUMN + 3D KINETIC STAGE   */}
        {/* ----------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* LEFT COLUMN: HERO EDITORIAL TYPOGRAPHY & INTERACTIVE CTA */}
          <div
            id="hero-typography-pillar"
            ref={typoPillarRef}
            className="lg:col-span-5 space-y-6 lg:space-y-7 z-20"
          >
            {/* Brand Title Block */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono-luxury uppercase tracking-[0.28em] text-[#D4AF37] font-semibold block">
                HAUTE COUTURE ARCHIVE // 2026
              </span>
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.06] tracking-tight">
                VELORA
              </h1>
              <p className="font-editorial text-2xl sm:text-3xl text-[#E5C583] italic font-light leading-snug">
                THE NEW SEASON
              </p>
            </div>

            {/* Editorial Lead Paragraph */}
            <p className="text-xs sm:text-[13px] text-[#9DB4A7] leading-relaxed font-sans max-w-md">
              *Curated pieces designed to move with you.* Architectural cashmere, vegetable-tanned Tuscan leather, hand-lasted footwear, and artisanal extrait de parfum.
            </p>

            {/* Refined Luxury CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                id="hero-explore-collection-cta"
                type="button"
                onClick={() => onNavigate('shop', { group: 'Women' })}
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 bg-[#D4AF37] hover:bg-[#E5C583] text-[#06110B] text-xs font-sans uppercase tracking-[0.18em] font-bold rounded-xs transition-all duration-300 shadow-[0_6px_24px_rgba(212,175,55,0.28)] hover:shadow-[0_8px_32px_rgba(212,175,55,0.45)] cursor-pointer overflow-hidden"
              >
                <span className="relative z-10">EXPLORE COLLECTION</span>
                <ArrowRight
                  size={14}
                  className="relative z-10 transform group-hover:translate-x-1.5 transition-transform duration-300"
                />
                <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </button>
            </div>

            {/* Interactive Atelier Lab Specification Sheet (Dynamically updates with active focal) */}
            <div
              onClick={() => onSelectProduct(currentInspectItem.id)}
              className="p-4 bg-[#081C13]/95 border border-[#173E2B] hover:border-[#D4AF37]/70 rounded-xs transition-all cursor-pointer group/spec shadow-xl relative overflow-hidden"
            >
              {/* Subtle gold corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#D4AF37]/20 to-transparent pointer-events-none" />

              <div className="flex items-center justify-between text-[10.5px] font-mono-luxury uppercase tracking-wider text-[#D4AF37] mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37]" />
                  <span>{currentInspectItem.label}</span>
                </span>
                <span className="text-[#E5C583] font-semibold">{formatPrice(currentInspectItem.price)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-sans font-medium text-white group-hover/spec:text-[#E5C583] transition-colors">
                  {currentInspectItem.name}
                </span>
                <span className="text-[11px] font-mono-luxury text-[#7E998C] group-hover/spec:text-white transition-colors flex items-center gap-1">
                  <span>View Piece</span>
                  <ChevronRight size={12} />
                </span>
              </div>

              <p className="text-[11px] text-[#8BA496] font-sans mt-1 line-clamp-1">
                {currentInspectItem.provenance} • {currentInspectItem.materials}
              </p>

              {/* Optical Depth metadata tag */}
              <div className="mt-2.5 pt-2 border-t border-[#143525] flex items-center justify-between text-[9.5px] font-mono-luxury text-[#6B8577]">
                <span>OPTICAL FOCUS: {currentInspectItem.opticalDepth}</span>
                <span className="text-[#D4AF37] group-hover/spec:underline">ENTER LOOKBOOK →</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: 4-ITEM KINETIC 3D SHOWCASE STAGE */}
          <div className="lg:col-span-7">
            <div
              id="cinematic-showcase-stage"
              ref={stageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/12] max-h-[590px] bg-[#071911] border border-[#173D2A] rounded-xs overflow-hidden select-none p-3 sm:p-5 flex items-center justify-center shadow-2xl group"
              style={{
                perspective: '1300px',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* ----------------------------------------------------- */}
              {/* 0. BACKGROUND: Fades in first (0.0s -> 0.45s)         */}
              {/* ----------------------------------------------------- */}
              <div
                ref={bgRef}
                className="absolute inset-0 w-full h-full pointer-events-none will-change-transform opacity-35"
                style={{ transform: 'translate3d(0,0,0)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop"
                  alt="Atelier background fabric"
                  referrerPolicy="no-referrer"
                  onError={e => handleImageError(e, 'coat')}
                  className="w-full h-full object-cover filter grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#06110B] via-[#081F15]/85 to-[#0B2A1C]/90" />
                <span className="absolute bottom-6 right-6 font-editorial text-7xl sm:text-8xl text-white/[0.04] select-none font-normal">
                  VELORA
                </span>

                {/* Subtle 2026 Architectural Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
              </div>

              {/* ----------------------------------------------------- */}
              {/* 1. MODEL IMAGE (01 / SILHOUETTE)                      */}
              {/* Dominant vertical presence on left/center             */}
              {/* ----------------------------------------------------- */}
              <div
                ref={modelRef}
                onClick={() => onSelectProduct(showcaseItems.model.id)}
                onMouseEnter={() => setActiveFocus('model')}
                onMouseLeave={() => setActiveFocus(null)}
                onMouseMove={e => handleCardMouseMove(e, 'model')}
                className={`absolute left-4 sm:left-6 top-4 sm:top-5 bottom-4 sm:bottom-5 z-10 w-[55%] sm:w-[50%] rounded-xs overflow-hidden border bg-[#081C13] shadow-[0_18px_45px_rgba(0,0,0,0.85)] cursor-pointer will-change-transform transition-[border-color,box-shadow,filter] duration-500 group/card ${
                  activeFocus === 'model'
                    ? 'border-[#D4AF37] shadow-[0_25px_60px_rgba(212,175,55,0.3)] z-30'
                    : activeFocus && activeFocus !== 'model'
                    ? 'border-[#173827] filter blur-[1.6px] brightness-75'
                    : 'border-[#1F4A34] hover:border-[#D4AF37]/80'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
                title={`Inspect ${showcaseItems.model.name}`}
              >
                <img
                  src={showcaseItems.model.image}
                  alt={showcaseItems.model.name}
                  referrerPolicy="no-referrer"
                  onError={e => handleImageError(e, 'coat')}
                  className="w-full h-full object-cover object-top filter brightness-100 contrast-105 pointer-events-none transition-transform duration-700 group-hover/card:scale-[1.04]"
                />

                {/* 2026 Specular Light Beam on Hover */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle 220px at ${mousePos.current.modelLocalX || 120}px ${mousePos.current.modelLocalY || 160}px, rgba(255,255,255,0.18), transparent 70%)`
                  }}
                />

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06110B]/95 via-transparent to-black/20 pointer-events-none" />

                {/* Reticle Corner Brackets (Active on Hover) */}
                {activeFocus === 'model' && (
                  <div className="absolute inset-2 border border-[#D4AF37]/40 pointer-events-none flex flex-col justify-between p-1 animate-fadeIn">
                    <div className="flex justify-between text-[8px] font-mono-luxury text-[#D4AF37]">
                      <span>[+] 01_SILHOUETTE</span>
                      <span>85mm</span>
                    </div>
                    <div className="flex justify-between text-[8px] font-mono-luxury text-[#E5C583]">
                      <span>FOCAL: 1.2M</span>
                      <span>ƒ/1.4</span>
                    </div>
                  </div>
                )}

                {/* Label Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 bg-[#06110B]/90 backdrop-blur-md border border-[#1A4530] rounded-xs text-[10px] font-mono-luxury transition-all">
                  <div>
                    <span className="text-[8.5px] uppercase tracking-wider text-[#D4AF37] block font-semibold">01 / SILHOUETTE</span>
                    <span className="text-white font-medium truncate block max-w-[150px]">{showcaseItems.model.name}</span>
                  </div>
                  <span className="text-[#E5C583] font-semibold">{formatPrice(showcaseItems.model.price)}</span>
                </div>
              </div>

              {/* ----------------------------------------------------- */}
              {/* 2. HANDBAG (02 / CUIR SADDLE)                         */}
              {/* Positioned upper right                                */}
              {/* ----------------------------------------------------- */}
              <div
                ref={handbagRef}
                onClick={() => onSelectProduct(showcaseItems.handbag.id)}
                onMouseEnter={() => setActiveFocus('handbag')}
                onMouseLeave={() => setActiveFocus(null)}
                onMouseMove={e => handleCardMouseMove(e, 'handbag')}
                className={`absolute top-4 sm:top-5 right-4 sm:right-6 z-15 w-[38%] sm:w-[42%] h-[46%] rounded-xs overflow-hidden border bg-[#081B12] shadow-[0_14px_35px_rgba(0,0,0,0.85)] cursor-pointer will-change-transform transition-[border-color,box-shadow,filter] duration-500 group/bag ${
                  activeFocus === 'handbag'
                    ? 'border-[#D4AF37] shadow-[0_22px_50px_rgba(212,175,55,0.3)] z-30'
                    : activeFocus && activeFocus !== 'handbag'
                    ? 'border-[#173827] filter blur-[1.6px] brightness-75'
                    : 'border-[#19402C] hover:border-[#D4AF37]/80'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
                title={`Inspect ${showcaseItems.handbag.name}`}
              >
                <img
                  src={showcaseItems.handbag.image}
                  alt={showcaseItems.handbag.name}
                  referrerPolicy="no-referrer"
                  onError={e => handleImageError(e, 'bags')}
                  className="w-full h-full object-cover object-center filter brightness-100 contrast-105 pointer-events-none transition-transform duration-700 group-hover/bag:scale-[1.04]"
                />

                {/* 2026 Specular Light Beam on Hover */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover/bag:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle 180px at ${mousePos.current.bagLocalX || 80}px ${mousePos.current.bagLocalY || 80}px, rgba(255,255,255,0.2), transparent 70%)`
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#06110B]/90 via-transparent to-transparent pointer-events-none" />

                {/* Reticle Corner Brackets (Active on Hover) */}
                {activeFocus === 'handbag' && (
                  <div className="absolute inset-2 border border-[#D4AF37]/40 pointer-events-none flex flex-col justify-between p-1 animate-fadeIn">
                    <div className="flex justify-between text-[8px] font-mono-luxury text-[#D4AF37]">
                      <span>[+] 02_SADDLE</span>
                      <span>50mm</span>
                    </div>
                    <div className="flex justify-between text-[8px] font-mono-luxury text-[#E5C583]">
                      <span>VACHETTA</span>
                      <span>ƒ/1.8</span>
                    </div>
                  </div>
                )}

                {/* Handbag Tag */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between p-1.5 sm:p-2 bg-[#06110B]/85 backdrop-blur-xs border border-[#193F2B] rounded-xs text-[9px] font-mono-luxury">
                  <span className="text-white truncate max-w-[100px]">{showcaseItems.handbag.name}</span>
                  <span className="text-[#D4AF37] font-semibold">{formatPrice(showcaseItems.handbag.price)}</span>
                </div>
              </div>

              {/* ----------------------------------------------------- */}
              {/* 3. SHOE (03 / CORDWAINER)                             */}
              {/* Positioned lower center/right overlap                 */}
              {/* ----------------------------------------------------- */}
              <div
                ref={shoeRef}
                onClick={() => onSelectProduct(showcaseItems.shoe.id)}
                onMouseEnter={() => setActiveFocus('shoe')}
                onMouseLeave={() => setActiveFocus(null)}
                onMouseMove={e => handleCardMouseMove(e, 'shoe')}
                className={`absolute bottom-4 sm:bottom-5 left-[42%] sm:left-[45%] z-25 w-[28%] sm:w-[28%] aspect-square rounded-xs overflow-hidden border bg-[#091F14]/95 shadow-[0_18px_45px_rgba(0,0,0,0.92)] cursor-pointer will-change-transform transition-[border-color,box-shadow,filter] duration-500 group/shoe ${
                  activeFocus === 'shoe'
                    ? 'border-[#D4AF37] shadow-[0_24px_55px_rgba(212,175,55,0.35)] z-30'
                    : activeFocus && activeFocus !== 'shoe'
                    ? 'border-[#173827] filter blur-[1.6px] brightness-75'
                    : 'border-[#1E4D35] hover:border-[#D4AF37]/80'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
                title={`Inspect ${showcaseItems.shoe.name}`}
              >
                <img
                  src={showcaseItems.shoe.image}
                  alt={showcaseItems.shoe.name}
                  referrerPolicy="no-referrer"
                  onError={e => handleImageError(e, 'shoe')}
                  className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-700 group-hover/shoe:scale-[1.05]"
                />

                {/* 2026 Specular Light Beam on Hover */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover/shoe:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle 160px at ${mousePos.current.shoeLocalX || 60}px ${mousePos.current.shoeLocalY || 60}px, rgba(255,255,255,0.22), transparent 70%)`
                  }}
                />

                {/* Reticle Corner Brackets (Active on Hover) */}
                {activeFocus === 'shoe' && (
                  <div className="absolute inset-1.5 border border-[#D4AF37]/40 pointer-events-none flex flex-col justify-between p-1 animate-fadeIn">
                    <div className="flex justify-between text-[7.5px] font-mono-luxury text-[#D4AF37]">
                      <span>[+] CORDWAINER</span>
                      <span>35mm</span>
                    </div>
                    <div className="flex justify-between text-[7.5px] font-mono-luxury text-[#E5C583]">
                      <span>SATIN PUMP</span>
                      <span>ƒ/2.0</span>
                    </div>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 p-1.5 bg-[#06110B]/90 backdrop-blur-xs flex items-center justify-between text-[8.5px] font-mono-luxury border-t border-[#183E2A]">
                  <span className="text-white truncate max-w-[70px]">Pump</span>
                  <span className="text-[#E5C583]">{formatPrice(showcaseItems.shoe.price)}</span>
                </div>
              </div>

              {/* ----------------------------------------------------- */}
              {/* 4. PERFUME (04 / PARFUMERIE)                          */}
              {/* Positioned bottom right                               */}
              {/* ----------------------------------------------------- */}
              <div
                ref={perfumeRef}
                onClick={() => onSelectProduct(showcaseItems.perfume.id)}
                onMouseEnter={() => setActiveFocus('perfume')}
                onMouseLeave={() => setActiveFocus(null)}
                onMouseMove={e => handleCardMouseMove(e, 'perfume')}
                className={`absolute bottom-4 sm:bottom-5 right-4 sm:right-6 z-20 w-[26%] sm:w-[25%] aspect-[3/4] rounded-xs overflow-hidden border bg-[#07170F]/95 shadow-[0_18px_45px_rgba(0,0,0,0.92)] cursor-pointer will-change-transform transition-[border-color,box-shadow,filter] duration-500 group/perfume ${
                  activeFocus === 'perfume'
                    ? 'border-[#D4AF37] shadow-[0_24px_55px_rgba(212,175,55,0.35)] z-30'
                    : activeFocus && activeFocus !== 'perfume'
                    ? 'border-[#173827] filter blur-[1.6px] brightness-75'
                    : 'border-[#183F2B] hover:border-[#D4AF37]/80'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
                title={`Inspect ${showcaseItems.perfume.name}`}
              >
                <img
                  src={showcaseItems.perfume.image}
                  alt={showcaseItems.perfume.name}
                  referrerPolicy="no-referrer"
                  onError={e => handleImageError(e, 'jewelry')}
                  className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-700 group-hover/perfume:scale-[1.05] filter brightness-105"
                />

                {/* 2026 Specular Light Beam on Hover */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover/perfume:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle 140px at ${mousePos.current.perfumeLocalX || 50}px ${mousePos.current.perfumeLocalY || 70}px, rgba(255,255,255,0.25), transparent 70%)`
                  }}
                />

                {/* Reticle Corner Brackets (Active on Hover) */}
                {activeFocus === 'perfume' && (
                  <div className="absolute inset-1.5 border border-[#D4AF37]/40 pointer-events-none flex flex-col justify-between p-1 animate-fadeIn">
                    <div className="flex justify-between text-[7.5px] font-mono-luxury text-[#D4AF37]">
                      <span>[+] FLACON</span>
                      <span>100mm</span>
                    </div>
                    <div className="flex justify-between text-[7.5px] font-mono-luxury text-[#E5C583]">
                      <span>EXTRAIT</span>
                      <span>ƒ/2.8</span>
                    </div>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 p-1.5 bg-[#06110B]/90 backdrop-blur-xs flex items-center justify-between text-[8.5px] font-mono-luxury border-t border-[#183E2A]">
                  <span className="text-white truncate max-w-[65px]">Flacon</span>
                  <span className="text-[#E5C583]">{formatPrice(showcaseItems.perfume.price)}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ----------------------------------------------------------- */}
        {/* PRIVILEGES STRIP (Continuity with existing store)           */}
        {/* ----------------------------------------------------------- */}
        <div className="mt-12 pt-6 border-t border-[#153424] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#9DB4A7] font-mono-luxury">
          <div className="flex items-center gap-3">
            <Truck size={16} className="text-[#D4AF37] shrink-0" />
            <div>
              <span className="text-white block font-medium">Complimentary Global Courier</span>
              <span className="text-[11px] text-[#7E998C]">Insured air freight dispatched in 24h</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RefreshCw size={16} className="text-[#D4AF37] shrink-0" />
            <div>
              <span className="text-white block font-medium">30-Day Atelier Trial</span>
              <span className="text-[11px] text-[#7E998C]">Complimentary doorstep pickup</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck size={16} className="text-[#D4AF37] shrink-0" />
            <div>
              <span className="text-white block font-medium">Lifetime Craft Guarantee</span>
              <span className="text-[11px] text-[#7E998C]">Bespoke servicing & archival storage</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
