import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Compass,
  Clock,
  Eye,
  CheckCircle2,
  X
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
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

  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedSize(product.sizes?.[0] || 'One Size');
      setSelectedColor(product.colors?.[0]?.hex || '#111111');
      setSelectedColorName(product.colors?.[0]?.name || 'Standard');
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [productId, product]);

  if (!product) return null;

  const isWished = isInWishlist(product.id);
  const category = CATEGORIES.find(c => c.id === product.category);
  const relatedProducts = products
    .filter(p => (p.group === product.group || p.category === product.category) && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product.id, selectedSize, selectedColor, selectedColorName, quantity);
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

  return (
    <div id="pdp-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 text-[#FAF9F5]">
      {/* 1. BREADCRUMBS */}
      <nav className="text-[11px] font-mono-luxury uppercase tracking-wider text-[#7E998C] flex items-center gap-2">
        <button onClick={() => onNavigate('home')} className="hover:text-[#D4AF37] transition-colors">
          Atelier Home
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate('shop', { group: product.group })}
          className="hover:text-[#D4AF37] transition-colors"
        >
          {product.group}
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate('shop', { cat: product.category })}
          className="hover:text-[#D4AF37] transition-colors"
        >
          {category?.name || 'Collection'}
        </button>
        <span>/</span>
        <span className="text-white font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* 2. MAIN SHOWCASE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Multi-Image 4K Showcase */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails Strip */}
          {product.images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible shrink-0 pb-2 md:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-18 md:w-20 aspect-[3/4] overflow-hidden border transition-all shrink-0 bg-[#07150E] ${
                    activeImageIndex === idx
                      ? 'border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                      : 'border-[#183B2B] opacity-60 hover:opacity-100 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    onError={e => handleImageError(e, product.category)}
                    className="w-full h-full object-cover object-top"
                  />
                  {activeImageIndex === idx && (
                    <div className="absolute inset-0 border-2 border-[#D4AF37] pointer-events-none" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Primary Visual Stage with Lightbox & 3D Triggers */}
          <div className="flex-1 relative aspect-[3/4] bg-[#07150E] border border-[#183B2B] overflow-hidden group">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={e => handleImageError(e, product.category)}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 cursor-zoom-in"
              onClick={() => setLightboxOpen(true)}
            />

            {/* Badges Stack */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {product.isNew && (
                <span className="bg-[#0F2D1E] text-[#E5C583] text-[9.5px] font-mono-luxury uppercase px-2.5 py-1 tracking-wider border border-[#D4AF37]/60 shadow-md">
                  New Arrival • AW 2025
                </span>
              )}
              {product.isBestSeller && (
                <span className="bg-[#07130D] text-white text-[9.5px] font-mono-luxury uppercase px-2.5 py-1 tracking-wider border border-[#1F4A34]">
                  Atelier Icon Piece
                </span>
              )}
            </div>

            {/* Quick action triggers overlay */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
              <button
                onClick={() => setLightboxOpen(true)}
                className="px-3 py-1.5 bg-[#06110B]/85 hover:bg-[#06110B] text-white border border-[#1E4833] backdrop-blur-xs text-[10.5px] font-mono-luxury uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-lg transition-all"
                title="View in 4K Lightbox"
              >
                <Eye size={12} />
                <span>4K View</span>
              </button>

              <button
                onClick={() => setThreeDModalProduct(product)}
                className="px-3 py-1.5 bg-[#0F281B]/95 hover:bg-[#163E2A] text-[#D4AF37] border border-[#D4AF37]/60 backdrop-blur-xs text-[10.5px] font-mono-luxury uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.25)] transition-all"
              >
                <Maximize2 size={12} />
                <span>3D Turntable (4K)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Details, Selections & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            {/* Brand & Ratings */}
            <div className="flex items-center justify-between text-[10.5px] font-mono-luxury uppercase tracking-[0.16em] text-[#7E998C]">
              <span>{product.brand}</span>
              <div className="flex items-center gap-1 text-[#D4AF37]">
                <Star size={12} className="fill-current text-[#D4AF37]" />
                <span className="font-medium text-white">{product.rating}</span>
                <span className="text-[#7E998C]">({product.reviewsCount} Atelier Reviews)</span>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="font-editorial text-3xl sm:text-4xl text-white mt-2 font-normal leading-tight">
              {product.name}
            </h1>

            {/* Subtitle / Weave Origin */}
            <p className="text-xs sm:text-[13px] text-[#9DB4A7] mt-1 font-sans">
              {product.subtitle || `Hand-finished in ${product.origin}`}
            </p>

            {/* Price */}
            <div className="mt-4 pb-5 border-b border-[#183B2B] flex items-baseline gap-3 font-mono-luxury">
              <span className="text-2xl font-semibold text-[#E5C583]">
                {formatPrice(product.price)}
              </span>
              <span className="text-[11px] text-[#7E998C]">
                Import duties & taxes included
              </span>
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center justify-between text-[11px] font-mono-luxury uppercase tracking-wider text-white mb-2">
                  <span>Colorway: <span className="font-normal text-[#E5C583]">{selectedColorName}</span></span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map(c => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedColor(c.hex);
                        setSelectedColorName(c.name);
                        if (c.image) {
                          const idx = product.images.indexOf(c.image);
                          if (idx !== -1) setActiveImageIndex(idx);
                        }
                      }}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                        selectedColor === c.hex
                          ? 'ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-[#06110B] scale-105'
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
            <div className="mt-6">
              <div className="flex items-center justify-between text-[11px] font-mono-luxury uppercase tracking-wider text-white mb-2">
                <span>Select Size</span>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="flex items-center gap-1 text-[#D4AF37] hover:underline normal-case font-sans"
                >
                  <Ruler size={11} strokeWidth={1.5} />
                  <span>Size & Conversion Guide</span>
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2.5 px-3 text-xs font-sans tracking-wide border transition-all text-center rounded-xs ${
                      selectedSize === s
                        ? 'bg-[#143B28] text-[#E5C583] border-[#D4AF37] font-semibold shadow-xs'
                        : 'bg-[#0A1C14] text-[#9DB4A7] border-[#1B4230] hover:border-[#D4AF37]/50 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Stock Status */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center border border-[#1B4230] bg-[#0A1C14] h-10 px-2.5 rounded-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-full text-sm font-medium text-[#7E998C] hover:text-[#D4AF37]"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-8 text-center text-xs font-mono-luxury font-medium text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-full text-sm font-medium text-[#7E998C] hover:text-[#D4AF37]"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Stock Indicator */}
              <div className="text-xs font-mono-luxury text-[#E5C583] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>{product.stock ? 'In Stock • Ready for Atelier Dispatch' : 'Bespoke Waitlist Active'}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 space-y-2.5">
              <div className="flex gap-2.5">
                <button
                  id="pdp-add-to-bag"
                  onClick={handleAddToCart}
                  disabled={!product.stock}
                  className="flex-1 py-3.5 bg-[#D4AF37] hover:bg-[#E5C583] text-[#06110B] text-xs uppercase tracking-[0.16em] font-sans font-bold flex items-center justify-center gap-2 transition-colors shadow-[0_4px_20px_rgba(212,175,55,0.25)] disabled:opacity-40 rounded-xs"
                >
                  <span>Add to Shopping Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-12 border border-[#1B4230] flex items-center justify-center transition-colors rounded-xs ${
                    isWished ? 'bg-[#D4AF37] text-[#06110B]' : 'bg-[#0A1C14] text-white hover:border-[#D4AF37]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={16} className={isWished ? 'fill-current' : ''} />
                </button>

                <button
                  onClick={handleShare}
                  className="w-12 border border-[#1B4230] bg-[#0A1C14] hover:border-[#D4AF37] flex items-center justify-center transition-colors text-[#7E998C] hover:text-white rounded-xs"
                  aria-label="Share"
                >
                  <Share2 size={16} />
                </button>
              </div>

              <button
                id="pdp-buy-now"
                onClick={handleBuyNow}
                disabled={!product.stock}
                className="w-full py-3 bg-transparent hover:bg-[#0E291C] text-[#E5C583] text-xs uppercase tracking-[0.16em] font-sans font-medium border border-[#D4AF37]/60 transition-colors rounded-xs"
              >
                Instant Atelier Express Checkout
              </button>

              <button
                id="pdp-launch-3d-turntable"
                onClick={() => setThreeDModalProduct(product)}
                className="w-full py-3 bg-[#091C13] hover:bg-[#113524] text-[#D4AF37] text-xs uppercase tracking-[0.16em] font-sans font-semibold border border-[#214D37] transition-colors flex items-center justify-center gap-2 rounded-xs shadow-xs"
              >
                <Maximize2 size={13} />
                <span>Inspect in 3D 360° Studio & 4K Macro Zoom</span>
              </button>
            </div>
          </div>

          {/* Micro Trust Strip */}
          <div className="pt-6 border-t border-[#183B2B] grid grid-cols-2 gap-4 text-xs text-[#7E998C]">
            <div className="flex items-center gap-2">
              <Truck size={14} strokeWidth={1.5} className="text-[#D4AF37]" />
              <span>Complimentary insured air courier</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw size={14} strokeWidth={1.5} className="text-[#D4AF37]" />
              <span>30-Day Atelier return privilege</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ACCORDION / SPECIFICATIONS TABS */}
      <section className="bg-[#0A1C14] border border-[#183C2A] p-6 sm:p-9 rounded-xs">
        <div className="flex border-b border-[#183C2A] gap-6 text-xs uppercase font-mono-luxury tracking-wider overflow-x-auto pb-3">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-2 transition-colors relative whitespace-nowrap ${
              activeTab === 'details' ? 'font-semibold text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-[#7E998C] hover:text-white'
            }`}
          >
            Details & Cut
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`pb-2 transition-colors relative whitespace-nowrap ${
              activeTab === 'materials' ? 'font-semibold text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-[#7E998C] hover:text-white'
            }`}
          >
            Materials & Provenance
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`pb-2 transition-colors relative whitespace-nowrap ${
              activeTab === 'delivery' ? 'font-semibold text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-[#7E998C] hover:text-white'
            }`}
          >
            Delivery & Concierge
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`pb-2 transition-colors relative whitespace-nowrap ${
              activeTab === 'care' ? 'font-semibold text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-[#7E998C] hover:text-white'
            }`}
          >
            Garment Longevity & Care
          </button>
        </div>

        <div className="pt-6 text-xs sm:text-sm text-[#9DB4A7] font-sans leading-relaxed">
          {activeTab === 'details' && (
            <div className="space-y-4">
              <p className="text-[#FAF9F5] text-sm leading-relaxed">{product.description}</p>
              {product.details && (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 text-xs font-mono-luxury text-[#E5C583]">
                  {product.details.map((d, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="space-y-3">
              <div>
                <b className="text-white block mb-0.5">Composition:</b>
                <p>{product.materials}</p>
              </div>
              <div>
                <b className="text-white block mb-0.5">Atelier Origin & Mill:</b>
                <p>{product.origin}</p>
              </div>
              <div>
                <b className="text-white block mb-0.5">Environmental Standard:</b>
                <p>Constructed in small atelier batches conforming to OEKO-TEX natural fiber certifications with zero synthetic micro-plastics.</p>
              </div>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-3">
              <p>• <b className="text-white">Complimentary Insured Courier:</b> 2–4 business days worldwide with door-to-door signature tracking.</p>
              <p>• <b className="text-white">Express Air Freight:</b> 1–2 business days via carbon-neutral luxury logistics.</p>
              <p>• <b className="text-white">Complimentary Returns:</b> 30-day trial period with pre-paid return documentation included inside every box.</p>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="space-y-2">
              <p><b className="text-white">Recommended Maintenance:</b> {product.careGuide}</p>
              <p className="text-xs text-[#7E998C]">To ensure multi-generational longevity, store within the included Velora archival breathable cotton sleeve on a cedar wood hanger.</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. COMPLEMENTARY PIECES CAROUSEL */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-[#183B2B]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37] block">
                CURATED ENSEMBLE
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl text-white font-normal">
                Complementary Atelier Pieces
              </h2>
            </div>
            <button
              onClick={() => onNavigate('shop', { group: product.group })}
              className="text-xs font-sans uppercase font-medium text-[#E5C583] hover:underline flex items-center gap-1.5"
            >
              <span>Explore All {product.group}</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </section>
      )}

      {/* 5. SIZE GUIDE MODAL */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
            onClick={() => setSizeGuideOpen(false)}
          />
          <div className="relative bg-[#0A1C14] p-6 sm:p-8 max-w-lg w-full border border-[#214D37] shadow-2xl z-10 text-white rounded-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-editorial text-2xl text-white">Garment Measurement & Conversion</h3>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="p-1 text-[#7E998C] hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-xs text-[#7E998C] mb-4">Measured flat in centimeters (cm) with international size standards.</p>
            <table className="w-full text-xs text-left border border-[#183B2B]">
              <thead className="bg-[#07130D] font-mono-luxury uppercase text-[#D4AF37]">
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
              className="mt-6 w-full py-2.5 bg-[#D4AF37] text-[#06110B] text-xs uppercase tracking-widest font-bold font-sans rounded-xs"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

      {/* 6. FULLSCREEN 4K LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white bg-black/50 rounded-full border border-white/20 z-10"
            aria-label="Close Lightbox"
          >
            <X size={24} />
          </button>

          <div className="max-w-4xl max-h-[85vh] relative flex flex-col items-center">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={e => handleImageError(e, product.category)}
              className="max-h-[80vh] w-auto object-contain border border-[#214D37] shadow-2xl"
            />
            <div className="mt-4 flex items-center gap-4 text-xs font-mono-luxury text-[#D4AF37]">
              <span>{product.name}</span>
              <span>•</span>
              <span>Plate {activeImageIndex + 1} of {product.images.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
