import React, { useState, useEffect, useMemo } from 'react';
import {
  Heart,
  Star,
  Check,
  ShieldCheck,
  Truck,
  RefreshCw,
  Ruler,
  ArrowRight,
  Share2,
  Maximize2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { ProductImage } from '../components/ProductImage';
import { CATEGORIES } from '../data/categories';
import { useStore } from '../context/StoreContext';
import { handleImageError } from '../utils/images';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onSelectProduct: (id: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onNavigate,
  onSelectProduct
}) => {
  const {
    products,
    getProductById,
    addToCart,
    formatPrice,
    toggleWishlist,
    isInWishlist,
    showToast,
    setThreeDModalProduct
  } = useStore();

  const product = getProductById(productId) || products[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[0] || 'One Size');
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0]?.hex || '#111111');
  const [selectedColorName, setSelectedColorName] = useState<string>(product?.colors?.[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'delivery' | 'care'>('details');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedSize(product.sizes?.[0] || 'One Size');
      setSelectedColor(product.colors?.[0]?.hex || '#111111');
      setSelectedColorName(product.colors?.[0]?.name || 'Standard');
      setQuantity(1);
      setIsAdded(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [productId, product]);

  // Genuine product gallery images strictly for this product (its images + distinct color variant photos)
  const productGalleryImages = useMemo(() => {
    if (!product) return [];
    const imgs: string[] = [];

    if (product.images && product.images.length > 0) {
      product.images.forEach(img => {
        if (img && !imgs.includes(img)) imgs.push(img);
      });
    }

    if (product.colors && product.colors.length > 0) {
      product.colors.forEach(c => {
        if (c.image && !imgs.includes(c.image)) imgs.push(c.image);
      });
    }

    if (imgs.length === 0 && product.images?.[0]) {
      imgs.push(product.images[0]);
    }

    return imgs;
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-[#FAF9F5]">
        <h2 className="text-2xl font-editorial mb-4">Product Not Found</h2>
        <button
          onClick={() => onNavigate('shop')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#06110B] text-xs uppercase tracking-widest font-bold rounded-xs cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Return to Shop</span>
        </button>
      </div>
    );
  }

  const isWished = isInWishlist(product.id);
  const category = CATEGORIES.find(c => c.id === product.category);

  // Similar Products in the same category or department
  const similarProducts = products
    .filter(p => (p.category === product.category || p.group === product.group) && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    setIsAdded(true);
    addToCart(product.id, selectedSize, selectedColor, selectedColorName, quantity);
    setTimeout(() => {
      setIsAdded(false);
    }, 2200);
  };

  const handleBuyNow = () => {
    addToCart(product.id, selectedSize, selectedColor, selectedColorName, quantity);
    onNavigate('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Atelier product link copied to clipboard');
    }
  };

  const handlePrevImage = () => {
    setActiveImageIndex(prev => (prev === 0 ? productGalleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex(prev => (prev === productGalleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div id="pdp-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 text-[#FAF9F5]">

      {/* ------------------------------------------------------------- */}
      {/* 1. TOP NAVIGATION: PROMINENT BACK BUTTON & BREADCRUMBS          */}
      {/* ------------------------------------------------------------- */}
      <header className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#183B2B]/60">
        <div className="flex items-center gap-2.5">
          <button
            id="pdp-back-button"
            onClick={() => onNavigate('shop', { group: product.group })}
            className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#071911] hover:bg-[#0E2F20] text-[#E5C583] hover:text-[#D4AF37] border border-[#1E4833] rounded-xs text-xs font-mono-luxury uppercase tracking-wider transition-all shadow-xs cursor-pointer group"
            title={`Back to ${product.group} Collection`}
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1 text-[#D4AF37]" />
            <span>Back to {product.group || 'Collection'}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#091D13] hover:bg-[#123825] text-[#9DB4A7] hover:text-[#E5C583] border border-[#1A422F] rounded-xs text-xs font-mono-luxury uppercase tracking-wider transition-all cursor-pointer"
          >
            <span>Main Website</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-[#091D13] hover:bg-[#123825] text-[#9DB4A7] hover:text-[#E5C583] border border-[#1A422F] rounded-xs text-xs font-mono-luxury uppercase tracking-wider transition-all cursor-pointer"
          >
            <span>Dashboard</span>
          </button>
        </div>

        <nav className="text-[11px] font-mono-luxury uppercase tracking-wider text-[#7E998C] flex items-center gap-2">
          <button onClick={() => onNavigate('home')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
            Atelier Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate('shop', { group: product.group })}
            className="hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            {product.group}
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate('shop', { cat: product.category })}
            className="hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            {category?.name || 'Archive'}
          </button>
          <span>/</span>
          <span className="text-[#D4AF37] font-medium truncate max-w-[180px] sm:max-w-xs">{product.name}</span>
        </nav>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN SECTION: LEFT = PRODUCT PICTURE, RIGHT = PRODUCT DETAIL*/}
      {/* ------------------------------------------------------------- */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

        {/* ============================================================= */}
        {/* LEFT SIDE: PRODUCT PICTURE & GALLERY (lg:col-span-7)          */}
        {/* ============================================================= */}
        <div id="pdp-left-image-gallery" className="lg:col-span-7 space-y-4 lg:sticky lg:top-24">

          {/* Primary Main Product Picture Stage */}
          <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] bg-[#05130D] border border-[#18422F] rounded-xs overflow-hidden group shadow-2xl">
            <ProductImage
              src={productGalleryImages[activeImageIndex] || productGalleryImages[0]}
              alt={product.name}
              category={product.category}
              group={product.group}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103 cursor-zoom-in"
              onClick={() => setLightboxOpen(true)}
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.isNew && (
                <span className="bg-[#05130D]/90 backdrop-blur-xs text-[#E5C583] text-[10px] font-mono-luxury uppercase px-3 py-1 tracking-wider border border-[#D4AF37]/40 shadow-xs">
                  New Season
                </span>
              )}
              {product.isBestSeller && (
                <span className="bg-[#071911]/90 backdrop-blur-xs text-white text-[10px] font-mono-luxury uppercase px-3 py-1 tracking-wider border border-[#1F4A34] shadow-xs">
                  Atelier Bestseller
                </span>
              )}
            </div>

            {/* Prev/Next arrows if multiple genuine images */}
            {productGalleryImages.length > 1 && (
              <>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#05130D]/80 hover:bg-[#071911] text-white border border-[#18422F] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#05130D]/80 hover:bg-[#071911] text-white border border-[#18422F] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {/* Bottom Right Controls (Expand & 3D) */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
              <button
                id="pdp-expand-button"
                onClick={() => setLightboxOpen(true)}
                className="px-3 py-1.5 bg-[#06140D]/90 hover:bg-[#06140D] text-white border border-[#1F4A34] backdrop-blur-xs text-[11px] font-mono-luxury uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
              >
                <Eye size={13} />
                <span>Expand Photo</span>
              </button>

              <button
                id="pdp-3d-button"
                onClick={() => setThreeDModalProduct(product)}
                className="px-3 py-1.5 bg-[#0C2A1B]/95 hover:bg-[#15422B] text-[#D4AF37] border border-[#D4AF37]/60 backdrop-blur-xs text-[11px] font-mono-luxury uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all cursor-pointer"
              >
                <Maximize2 size={13} />
                <span>3D View</span>
              </button>
            </div>
          </div>

          {/* Genuine Thumbnails Bar (only shown if multiple images exist for this product) */}
          {productGalleryImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {productGalleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-24 shrink-0 rounded-xs overflow-hidden border transition-all cursor-pointer bg-[#071911] ${
                    activeImageIndex === idx
                      ? 'border-[#D4AF37] ring-1 ring-[#D4AF37] shadow-[0_2px_10px_rgba(212,175,55,0.3)]'
                      : 'border-[#18422F] opacity-70 hover:opacity-100'
                  }`}
                >
                  <ProductImage
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    category={product.category}
                    group={product.group}
                    className="w-full h-full object-cover object-center"
                  />
                  {activeImageIndex === idx && (
                    <div className="absolute inset-0 border-2 border-[#D4AF37] pointer-events-none" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Value Props & Assurance Badges */}
          <div className="grid grid-cols-3 gap-2.5 pt-2">
            <div className="bg-[#071911] border border-[#18422F] p-3 rounded-xs text-center flex flex-col items-center justify-center space-y-1">
              <ShieldCheck size={16} className="text-[#D4AF37]" />
              <span className="text-[10px] font-mono-luxury uppercase tracking-wider text-[#FAF9F5]">Guaranteed Authentic</span>
              <span className="text-[9.5px] text-[#7E998C]">Verified Atelier Certificate</span>
            </div>
            <div className="bg-[#071911] border border-[#18422F] p-3 rounded-xs text-center flex flex-col items-center justify-center space-y-1">
              <Truck size={16} className="text-[#D4AF37]" />
              <span className="text-[10px] font-mono-luxury uppercase tracking-wider text-[#FAF9F5]">Express Courier</span>
              <span className="text-[9.5px] text-[#7E998C]">Door-to-door insured</span>
            </div>
            <div className="bg-[#071911] border border-[#18422F] p-3 rounded-xs text-center flex flex-col items-center justify-center space-y-1">
              <RefreshCw size={16} className="text-[#D4AF37]" />
              <span className="text-[10px] font-mono-luxury uppercase tracking-wider text-[#FAF9F5]">30-Day Returns</span>
              <span className="text-[9.5px] text-[#7E998C]">Complimentary courier pickup</span>
            </div>
          </div>

        </div>

        {/* ============================================================= */}
        {/* RIGHT SIDE: PRODUCT DETAILS & ACQUISITION (lg:col-span-5)     */}
        {/* ============================================================= */}
        <div id="pdp-right-product-details" className="lg:col-span-5 space-y-6">

          {/* Header info: Brand, SKU, Rating */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3 text-[11px] font-mono-luxury uppercase tracking-[0.16em]">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span className="font-semibold">{product.brand}</span>
                <span className="text-[#7E998C]">• {product.sku}</span>
              </div>

              <div className="flex items-center gap-1.5 text-[#D4AF37] bg-[#0A2217] px-2.5 py-1 border border-[#1B4B34] rounded-xs">
                <Star size={12} className="fill-current text-[#D4AF37]" />
                <span className="font-semibold text-white">{product.rating}</span>
                <span className="text-[#7E998C]">({product.reviewsCount})</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#FAF9F5] font-normal leading-tight">
              {product.name}
            </h1>

            {/* Subtitle */}
            <p className="text-sm text-[#E5C583] font-sans">
              {product.subtitle || `Handcrafted in ${product.origin}`}
            </p>
          </div>

          {/* Pricing & Stock Card */}
          <div className="bg-[#071911] border border-[#18422F] p-4 sm:p-5 rounded-xs space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-semibold text-[#E5C583] font-mono-luxury">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="ml-3 text-sm text-[#6C8577] line-through font-mono-luxury">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="text-[11px] font-mono-luxury text-[#E5C583] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>{product.stock ? 'In Stock — Ships Today' : 'Waitlist Only'}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#7E998C] font-mono-luxury uppercase tracking-wider">
              All import tariffs, taxes & luxury duties included
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-[#9DB4A7] leading-relaxed font-sans">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2 pt-1 border-t border-[#183B2B]/60">
              <div className="flex items-center justify-between text-[11px] font-mono-luxury uppercase tracking-wider text-white">
                <span>Color: <span className="text-[#E5C583] font-normal">{selectedColorName}</span></span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map(c => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setSelectedColor(c.hex);
                      setSelectedColorName(c.name);
                      if (c.image) {
                        const idx = productGalleryImages.indexOf(c.image);
                        if (idx !== -1) setActiveImageIndex(idx);
                      }
                    }}
                    className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                      selectedColor === c.hex
                        ? 'ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-[#05130D] scale-110'
                        : 'border-white/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.hex && (
                      <Check size={12} className={c.hex === '#111111' || c.hex === '#181818' ? 'text-white' : 'text-black'} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2 pt-1 border-t border-[#183B2B]/60">
              <div className="flex items-center justify-between text-[11px] font-mono-luxury uppercase tracking-wider text-white">
                <span>Select Size: <span className="text-[#E5C583] font-normal">{selectedSize}</span></span>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="flex items-center gap-1 text-[#D4AF37] hover:underline normal-case font-sans cursor-pointer text-xs"
                >
                  <Ruler size={12} strokeWidth={1.5} />
                  <span>Size & Conversion Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 px-1 text-xs font-sans tracking-wide border transition-all text-center rounded-xs cursor-pointer ${
                      selectedSize === s
                        ? 'bg-[#153E2B] text-[#E5C583] border-[#D4AF37] font-semibold shadow-xs'
                        : 'bg-[#091D13] text-[#9DB4A7] border-[#183F2C] hover:border-[#D4AF37]/50 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTAs */}
          <div className="space-y-3 pt-2 border-t border-[#183B2B]/60">
            <div className="flex gap-2.5">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#1B4230] bg-[#091D13] h-12 px-3 rounded-xs shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-5 h-full text-sm font-medium text-[#7E998C] hover:text-[#D4AF37] cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-7 text-center text-xs font-mono-luxury font-medium text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-5 h-full text-sm font-medium text-[#7E998C] hover:text-[#D4AF37] cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Primary Add to Shopping Bag */}
              <button
                id="pdp-add-to-bag"
                onClick={handleAddToCart}
                disabled={!product.stock}
                className={`flex-1 h-12 text-xs uppercase tracking-[0.16em] font-sans font-bold flex items-center justify-center gap-2 transition-all rounded-xs cursor-pointer disabled:opacity-40 ${
                  isAdded
                    ? 'bg-[#10B981] text-white shadow-[0_4px_20px_rgba(16,185,129,0.35)] scale-[1.01]'
                    : 'bg-[#D4AF37] hover:bg-[#E5C583] text-[#06110B] shadow-[0_4px_20px_rgba(212,175,55,0.25)]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={16} strokeWidth={2.5} />
                    <span>Added to Shopping Bag</span>
                  </>
                ) : (
                  <span>Add to Shopping Bag</span>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 h-12 border border-[#1B4230] flex items-center justify-center transition-colors rounded-xs cursor-pointer shrink-0 ${
                  isWished ? 'bg-[#D4AF37] text-[#06110B]' : 'bg-[#091D13] text-white hover:border-[#D4AF37]'
                }`}
                aria-label="Wishlist"
                title="Save to Wishlist"
              >
                <Heart size={16} className={isWished ? 'fill-current' : ''} />
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="w-12 h-12 border border-[#1B4230] bg-[#091D13] hover:border-[#D4AF37] flex items-center justify-center transition-colors text-[#7E998C] hover:text-white rounded-xs cursor-pointer shrink-0"
                aria-label="Share"
                title="Share link"
              >
                <Share2 size={16} />
              </button>
            </div>

            {/* Instant Checkout Button */}
            <button
              id="pdp-instant-checkout"
              onClick={handleBuyNow}
              disabled={!product.stock}
              className="w-full py-3 bg-transparent hover:bg-[#0E291C] text-[#E5C583] text-xs uppercase tracking-[0.16em] font-sans font-medium border border-[#D4AF37]/60 transition-colors rounded-xs cursor-pointer text-center"
            >
              Instant Checkout
            </button>
          </div>

          {/* Product Specifications & Details Tabs */}
          <div className="bg-[#071911] border border-[#18422F] p-5 rounded-xs space-y-4">
            <div className="flex border-b border-[#183C2A] gap-4 text-xs uppercase font-mono-luxury tracking-wider overflow-x-auto pb-2.5">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-1.5 transition-colors relative whitespace-nowrap cursor-pointer ${
                  activeTab === 'details' ? 'font-semibold text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-[#7E998C] hover:text-white'
                }`}
              >
                Details & Cut
              </button>
              <button
                onClick={() => setActiveTab('materials')}
                className={`pb-1.5 transition-colors relative whitespace-nowrap cursor-pointer ${
                  activeTab === 'materials' ? 'font-semibold text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-[#7E998C] hover:text-white'
                }`}
              >
                Materials & Origin
              </button>
              <button
                onClick={() => setActiveTab('delivery')}
                className={`pb-1.5 transition-colors relative whitespace-nowrap cursor-pointer ${
                  activeTab === 'delivery' ? 'font-semibold text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-[#7E998C] hover:text-white'
                }`}
              >
                Delivery & Concierge
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-1.5 transition-colors relative whitespace-nowrap cursor-pointer ${
                  activeTab === 'care' ? 'font-semibold text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-[#7E998C] hover:text-white'
                }`}
              >
                Care Guide
              </button>
            </div>

            <div className="pt-2 text-xs sm:text-sm text-[#9DB4A7] font-sans leading-relaxed">
              {activeTab === 'details' && (
                <div className="space-y-3">
                  <p className="text-[#FAF9F5] text-xs sm:text-sm leading-relaxed">{product.description}</p>
                  {product.details && (
                    <ul className="space-y-2 mt-3 text-xs font-mono-luxury text-[#E5C583]">
                      {product.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shrink-0 mt-1.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {product.modelInfo && (
                    <p className="text-[11px] text-[#7E998C] italic pt-1 border-t border-[#183C2A]/40">
                      Fitting: {product.modelInfo}
                    </p>
                  )}
                </div>
              )}

              {activeTab === 'materials' && (
                <div className="space-y-3">
                  <div>
                    <b className="text-white block mb-0.5 text-xs font-mono-luxury uppercase">Composition:</b>
                    <p className="text-xs text-[#E5C583]">{product.materials}</p>
                  </div>
                  <div>
                    <b className="text-white block mb-0.5 text-xs font-mono-luxury uppercase">Atelier Origin & Mill:</b>
                    <p className="text-xs text-[#FAF9F5]">{product.origin}</p>
                  </div>
                  <div>
                    <b className="text-white block mb-0.5 text-xs font-mono-luxury uppercase">Environmental Standard:</b>
                    <p className="text-xs text-[#9DB4A7]">Crafted in small batches with certified natural sustainable fibers and minimal carbon impact.</p>
                  </div>
                </div>
              )}

              {activeTab === 'delivery' && (
                <div className="space-y-2.5 text-xs">
                  <p>• <b className="text-white">Complimentary Express Courier:</b> 2–4 business days worldwide with door-to-door tracking.</p>
                  <p>• <b className="text-white">Same-Day London & Milan Atelier Dispatch:</b> Orders before 2pm CET ship today.</p>
                  <p>• <b className="text-white">Complimentary 30-Day Returns:</b> Pre-paid return labels and packaging included with all orders.</p>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="space-y-2 text-xs">
                  <p><b className="text-white">Recommended Care:</b> {product.careGuide}</p>
                  <p className="text-[11px] text-[#7E998C]">Store inside the complimentary Velora archival cotton dust sleeve on a shaped wooden hanger.</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </main>

      {/* ------------------------------------------------------------- */}
      {/* 3. SIMILAR PIECES GALLERY                                     */}
      {/* ------------------------------------------------------------- */}
      {similarProducts.length > 0 && (
        <section id="similar-products-gallery" className="pt-8 border-t border-[#183B2B] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono-luxury uppercase tracking-[0.24em] text-[#D4AF37] block">
                Related Creations
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl text-white font-normal">
                Similar Atelier Pieces
              </h2>
            </div>
            <button
              onClick={() => onNavigate('shop', { group: product.group })}
              className="text-xs font-sans uppercase font-medium text-[#E5C583] hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore All {product.group} Collection</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {similarProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. SIZE GUIDE MODAL                                           */}
      {/* ------------------------------------------------------------- */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
            onClick={() => setSizeGuideOpen(false)}
          />
          <div className="relative bg-[#071911] p-6 sm:p-8 max-w-lg w-full border border-[#214D37] shadow-2xl z-10 text-white rounded-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-editorial text-2xl text-white">Size & Fit Guide</h3>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="p-1 text-[#7E998C] hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-xs text-[#7E998C] mb-4">Measured flat in centimeters (cm) with international size standards.</p>
            <table className="w-full text-xs text-left border border-[#183B2B]">
              <thead className="bg-[#05130D] font-mono-luxury uppercase text-[#D4AF37]">
                <tr>
                  <th className="p-2 border border-[#183B2B]">Velora Size</th>
                  <th className="p-2 border border-[#183B2B]">US / UK</th>
                  <th className="p-2 border border-[#183B2B]">EU</th>
                  <th className="p-2 border border-[#183B2B]">Chest / Bust</th>
                </tr>
              </thead>
              <tbody className="font-mono-luxury text-[#9DB4A7]">
                <tr>
                  <td className="p-2 border border-[#183B2B] font-medium text-white">XS</td>
                  <td className="p-2 border border-[#183B2B]">US 2 / UK 6</td>
                  <td className="p-2 border border-[#183B2B]">34</td>
                  <td className="p-2 border border-[#183B2B]">82–84 cm</td>
                </tr>
                <tr>
                  <td className="p-2 border border-[#183B2B] font-medium text-white">S</td>
                  <td className="p-2 border border-[#183B2B]">US 4 / UK 8</td>
                  <td className="p-2 border border-[#183B2B]">36</td>
                  <td className="p-2 border border-[#183B2B]">86–88 cm</td>
                </tr>
                <tr>
                  <td className="p-2 border border-[#183B2B] font-medium text-white">M</td>
                  <td className="p-2 border border-[#183B2B]">US 6 / UK 10</td>
                  <td className="p-2 border border-[#183B2B]">38</td>
                  <td className="p-2 border border-[#183B2B]">90–92 cm</td>
                </tr>
                <tr>
                  <td className="p-2 border border-[#183B2B] font-medium text-white">L</td>
                  <td className="p-2 border border-[#183B2B]">US 8 / UK 12</td>
                  <td className="p-2 border border-[#183B2B]">40</td>
                  <td className="p-2 border border-[#183B2B]">94–98 cm</td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={() => setSizeGuideOpen(false)}
              className="mt-6 w-full py-2.5 bg-[#D4AF37] text-[#06110B] text-xs uppercase tracking-widest font-bold font-sans rounded-xs cursor-pointer"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. FULLSCREEN 4K LIGHTBOX MODAL                               */}
      {/* ------------------------------------------------------------- */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white bg-black/50 rounded-full border border-white/20 z-10 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X size={24} />
          </button>

          <div className="max-w-4xl max-h-[88vh] relative flex flex-col items-center">
            <img
              src={productGalleryImages[activeImageIndex] || productGalleryImages[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={e => handleImageError(e, product.category)}
              className="max-h-[80vh] w-auto object-contain border border-[#214D37] shadow-2xl rounded-xs"
            />
            <div className="mt-4 flex items-center gap-4 text-xs font-mono-luxury text-[#D4AF37]">
              <span>{product.name}</span>
              <span>•</span>
              <span>Plate {activeImageIndex + 1} of {productGalleryImages.length}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
