import React, { useState, useRef, useEffect } from 'react';
import { X, RotateCcw, ZoomIn, ZoomOut, Sun, Moon, Sparkles, Check, ShoppingBag, Heart, ShieldCheck, Compass, Ruler, Share2 } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { handleImageError } from '../utils/images';

interface Product3DShowcaseModalProps {
  product: Product | null;
  onClose: () => void;
  onNavigateToProduct: (productId: string) => void;
}

export const Product3DShowcaseModal: React.FC<Product3DShowcaseModalProps> = ({
  product,
  onClose,
  onNavigateToProduct
}) => {
  const { addToCart, formatPrice, toggleWishlist, isInWishlist, showToast } = useStore();

  const [angleIndex, setAngleIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [macroZoom, setMacroZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [lightingPreset, setLightingPreset] = useState<'daylight' | 'noir' | 'gold'>('gold');
  const [showWireframeSpecs, setShowWireframeSpecs] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedColorName, setSelectedColorName] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  // Rotation angles simulating 360-degree views with perspective and rotation transforms
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];

  const dragStartX = useRef<number | null>(null);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'Standard');
      setSelectedColor(product.colors[0]?.hex || '#111111');
      setSelectedColorName(product.colors[0]?.name || 'Standard');
      setAngleIndex(0);
      setMacroZoom(false);
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const isWished = isInWishlist(product.id);

  // Drag to rotate 360
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 35) {
      if (delta > 0) {
        setAngleIndex(prev => (prev + 1) % angles.length);
      } else {
        setAngleIndex(prev => (prev - 1 + angles.length) % angles.length);
      }
      dragStartX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    dragStartX.current = null;
  };

  // Macro lens tracking
  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!macroZoom) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product.id, selectedSize, selectedColor, selectedColorName, quantity);
    onClose();
  };

  // Auto 360 rotation loop
  useEffect(() => {
    if (!isRotating) return;
    const timer = setInterval(() => {
      setAngleIndex(prev => (prev + 1) % angles.length);
    }, 450);
    return () => clearInterval(timer);
  }, [isRotating, angles.length]);

  const currentAngle = angles[angleIndex];

  // Dynamic 3D transformation values
  const getPerspectiveTransform = () => {
    const isMirrored = currentAngle > 90 && currentAngle < 270;
    const skew = Math.sin((currentAngle * Math.PI) / 180) * 8;
    const scale = 1 - Math.abs(Math.sin((currentAngle * Math.PI) / 180)) * 0.08;
    return `rotateY(${currentAngle}deg) skewY(${skew}deg) scale(${scale})`;
  };

  const currentImage = product.images[angleIndex % product.images.length] || product.images[0];

  return (
    <div
      id="product-3d-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in"
      onMouseUp={handleMouseUp}
    >
      <div
        className="relative w-full max-w-5xl bg-[#091510] border border-[#23533D] rounded-xs shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden my-auto flex flex-col lg:flex-row text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-[#0E241A] text-white hover:text-[#D4AF37] border border-[#23533D] flex items-center justify-center transition-colors shadow-md"
          aria-label="Close 3D Studio"
        >
          <X size={18} />
        </button>

        {/* LEFT COLUMN: 3D Studio Stage */}
        <div className="w-full lg:w-3/5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#0C1F17] via-[#08150F] to-[#050D0A] border-b lg:border-b-0 lg:border-r border-[#1D4734] relative select-none">
          {/* Studio HUD Header */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
              <span className="text-[11px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37] font-medium">
                Velora 3D Virtual Turntable
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Studio Lighting Controls */}
              <div className="flex items-center bg-[#07130D] p-1 border border-[#1D4734] rounded-xs text-[10px] font-mono-luxury">
                <button
                  onClick={() => setLightingPreset('gold')}
                  className={`px-2 py-0.5 uppercase transition-colors ${
                    lightingPreset === 'gold' ? 'bg-[#D4AF37] text-[#0A1811] font-bold' : 'text-[#8AA194] hover:text-white'
                  }`}
                >
                  Warm Gold
                </button>
                <button
                  onClick={() => setLightingPreset('daylight')}
                  className={`px-2 py-0.5 uppercase transition-colors ${
                    lightingPreset === 'daylight' ? 'bg-[#D4AF37] text-[#0A1811] font-bold' : 'text-[#8AA194] hover:text-white'
                  }`}
                >
                  Daylight
                </button>
              </div>

              {/* Wireframe Specs Toggle */}
              <button
                onClick={() => setShowWireframeSpecs(!showWireframeSpecs)}
                className={`p-1.5 border text-xs transition-colors rounded-xs ${
                  showWireframeSpecs ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10' : 'border-[#1D4734] text-[#8AA194]'
                }`}
                title="Toggle Craftsmanship Pins"
              >
                <Compass size={14} />
              </button>
            </div>
          </div>

          {/* 3D Canvas Stage */}
          <div
            className="relative my-4 aspect-[4/3] w-full flex items-center justify-center cursor-grab active:cursor-grabbing perspective-1000"
            onMouseDown={handleMouseDown}
            onMouseMove={e => {
              handleMouseMove(e);
              handleImageMouseMove(e);
            }}
          >
            {/* Background 3D Rim Ring */}
            <div
              className={`absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full border border-dashed transition-all duration-500 pointer-events-none ${
                lightingPreset === 'gold'
                  ? 'border-[#D4AF37]/40 shadow-[0_0_80px_rgba(212,175,55,0.25)]'
                  : 'border-white/30 shadow-[0_0_80px_rgba(255,255,255,0.15)]'
              }`}
            />

            {/* Stepped Pedestal Floor */}
            <div
              className="absolute bottom-4 w-64 sm:w-80 h-16 rounded-full bg-gradient-to-r from-[#123627] via-[#0E281E] to-[#123627] border-t border-[#D4AF37]/60 shadow-[0_15px_40px_rgba(0,0,0,0.85)]"
              style={{ transform: 'rotateX(65deg)' }}
            />

            {/* Product Centerpiece */}
            <div
              className="relative w-64 sm:w-80 aspect-square preserve-3d transition-all duration-300 flex items-center justify-center"
              style={{ transform: getPerspectiveTransform() }}
            >
              {macroZoom ? (
                /* 4K Macro Zoom Lens Mode */
                <div
                  className="relative w-full h-full overflow-hidden border-2 border-[#D4AF37] rounded-xs shadow-2xl bg-black"
                  style={{
                    backgroundImage: `url(${currentImage})`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundSize: '350%',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <div className="absolute top-2 left-2 bg-[#091510]/90 px-2 py-0.5 text-[9px] font-mono-luxury text-[#D4AF37] border border-[#D4AF37]/50">
                    4K ULTRA-MACRO (350%)
                  </div>
                  <div
                    className="absolute w-8 h-8 rounded-full border border-white pointer-events-none -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${zoomPos.x}%`, top: `${zoomPos.y}%` }}
                  />
                </div>
              ) : (
                /* Regular 360 View */
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={currentImage}
                    alt={`${product.name} 3D rotation ${currentAngle}deg`}
                    referrerPolicy="no-referrer"
                    onError={e => handleImageError(e, product.category)}
                    className="w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)] filter brightness-105 contrast-105"
                  />

                  {/* Craftsmanship 3D Wireframe Pins */}
                  {showWireframeSpecs && (
                    <>
                      <div className="absolute top-1/4 left-1/4 bg-[#0A1610]/90 backdrop-blur-xs border border-[#D4AF37] px-2 py-0.5 rounded-xs text-[9px] font-mono-luxury text-[#E5C583] flex items-center gap-1 shadow-lg pointer-events-none animate-radar">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        <span>{product.origin.split(',')[0]}</span>
                      </div>
                      <div className="absolute bottom-1/4 right-1/4 bg-[#0A1610]/90 backdrop-blur-xs border border-[#D4AF37] px-2 py-0.5 rounded-xs text-[9px] font-mono-luxury text-[#E5C583] flex items-center gap-1 shadow-lg pointer-events-none animate-radar">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        <span>Artisan Hand-Lasted</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 360 Controls Toolbar */}
          <div className="flex items-center justify-between pt-3 border-t border-[#1D4734] z-10">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAngleIndex(prev => (prev - 1 + angles.length) % angles.length)}
                className="px-2.5 py-1 bg-[#0E241A] hover:bg-[#183E2D] border border-[#23533D] text-[11px] font-mono-luxury text-[#B4C9BE] transition-colors rounded-xs"
              >
                ◀ 45°
              </button>
              <button
                onClick={() => setIsRotating(!isRotating)}
                className={`px-3 py-1 text-[11px] font-mono-luxury uppercase flex items-center gap-1.5 border transition-colors rounded-xs ${
                  isRotating ? 'bg-[#D4AF37] text-[#091510] font-bold border-[#D4AF37]' : 'bg-[#0E241A] text-white border-[#23533D]'
                }`}
              >
                <RotateCcw size={12} className={isRotating ? 'animate-spin' : ''} />
                <span>{isRotating ? 'Pause Spin' : 'Auto 360°'}</span>
              </button>
              <button
                onClick={() => setAngleIndex(prev => (prev + 1) % angles.length)}
                className="px-2.5 py-1 bg-[#0E241A] hover:bg-[#183E2D] border border-[#23533D] text-[11px] font-mono-luxury text-[#B4C9BE] transition-colors rounded-xs"
              >
                45° ▶
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMacroZoom(!macroZoom)}
                className={`px-3 py-1 text-[11px] font-mono-luxury uppercase flex items-center gap-1.5 border transition-colors rounded-xs ${
                  macroZoom ? 'bg-[#D4AF37] text-[#091510] font-bold border-[#D4AF37]' : 'bg-[#0E241A] text-white border-[#23533D]'
                }`}
              >
                {macroZoom ? <ZoomOut size={12} /> : <ZoomIn size={12} />}
                <span>{macroZoom ? 'Reset View' : '4K Macro Zoom'}</span>
              </button>

              <span className="text-[10.5px] font-mono-luxury text-[#7E998B] hidden sm:inline">
                Angle: {currentAngle}°
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Specifications & Commercial Checkout */}
        <div className="w-full lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-[#0B1812] overflow-y-auto max-h-[85vh] lg:max-h-none">
          <div className="space-y-5">
            {/* Category & Status */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-luxury uppercase tracking-[0.24em] text-[#D4AF37]">
                {product.group} • {product.category}
              </span>
              <span className="text-[10px] font-mono-luxury text-[#7E998B] uppercase">
                SKU: {product.sku}
              </span>
            </div>

            {/* Product Title & Subtitle */}
            <div>
              <h2 className="text-xl sm:text-2xl font-editorial font-normal text-white leading-tight">
                {product.name}
              </h2>
              <p className="text-xs text-[#8AA194] mt-1 font-sans">
                {product.subtitle}
              </p>
            </div>

            {/* Price & Rating */}
            <div className="flex items-baseline justify-between py-2 border-y border-[#1D4734]">
              <span className="text-2xl font-mono-luxury font-bold text-[#E5C583]">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-[#8AA194] font-mono-luxury">
                ★ {product.rating} ({product.reviewsCount} atelier reviews)
              </span>
            </div>

            {/* Color Swatches */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#B4C9BE] uppercase font-mono-luxury text-[10px]">
                  Color: <strong className="text-white">{selectedColorName}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color.hex);
                      setSelectedColorName(color.name);
                    }}
                    className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center border-2 ${
                      selectedColor === color.hex
                        ? 'border-[#D4AF37] scale-110'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor === color.hex && (
                      <Check size={12} className={color.hex === '#F9F9F9' || color.hex === '#FFFFFF' ? 'text-black' : 'text-white'} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#B4C9BE] uppercase font-mono-luxury text-[10px]">
                  Select Size
                </span>
                <span className="text-[10px] text-[#D4AF37] underline cursor-pointer">
                  Size Guide
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-xs font-sans uppercase transition-all rounded-xs border ${
                      selectedSize === size
                        ? 'bg-[#D4AF37] text-[#0A1811] font-bold border-[#D4AF37]'
                        : 'bg-[#0E241A] text-[#B4C9BE] border-[#23533D] hover:border-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Atelier Craftsmanship Highlights */}
            <div className="bg-[#07130D] p-3.5 border border-[#1D4734] rounded-xs space-y-2">
              <div className="text-[10px] font-mono-luxury uppercase text-[#D4AF37] tracking-wider">
                Materials & Origin
              </div>
              <div className="text-xs text-[#8AA194] leading-relaxed">
                {product.materials}
              </div>
              <div className="text-[11px] text-[#B4C9BE] font-mono-luxury pt-1 border-t border-[#143224]">
                📍 {product.origin}
              </div>
            </div>
          </div>

          {/* Action CTA Bar */}
          <div className="pt-6 border-t border-[#1D4734] space-y-3 mt-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[#07130D] border border-[#23533D] rounded-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-[#8AA194] hover:text-white"
                >
                  -
                </button>
                <span className="px-2 text-xs font-mono-luxury text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-[#8AA194] hover:text-white"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-[#D4AF37] hover:bg-[#E5C583] text-[#0A1811] text-xs uppercase tracking-[0.16em] font-sans font-bold transition-all flex items-center justify-center gap-2 rounded-xs shadow-[0_10px_20px_rgba(212,175,55,0.25)]"
              >
                <ShoppingBag size={14} />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 border rounded-xs transition-colors ${
                  isWished
                    ? 'border-[#D4AF37] bg-[#D4AF37] text-[#0A1811]'
                    : 'border-[#23533D] text-white hover:text-[#D4AF37] bg-[#0E241A]'
                }`}
                aria-label="Save to Wishlist"
              >
                <Heart size={16} className={isWished ? 'fill-current' : ''} />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10.5px] text-[#7E998B] pt-1">
              <span>✓ Complimentary Express Shipping Included</span>
              <button
                onClick={() => {
                  onClose();
                  onNavigateToProduct(product.id);
                }}
                className="text-[#D4AF37] hover:underline"
              >
                Full Product Specifications →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
