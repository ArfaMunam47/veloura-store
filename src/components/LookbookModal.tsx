import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingBag, Maximize2, ShieldCheck, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { handleImageError } from '../utils/images';

interface LookbookModalProps {
  products: Product[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigateIndex: (newIndex: number) => void;
  onSelectProduct: (id: string) => void;
  albumTitle?: string;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  products,
  currentIndex,
  isOpen,
  onClose,
  onNavigateIndex,
  onSelectProduct,
  albumTitle = 'Editorial Album'
}) => {
  const { formatPrice, addToCart, setThreeDModalProduct } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onNavigateIndex((currentIndex + 1) % products.length);
      }
      if (e.key === 'ArrowLeft') {
        onNavigateIndex((currentIndex - 1 + products.length) % products.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, products.length, onClose, onNavigateIndex]);

  if (!isOpen || !products[currentIndex]) return null;

  const product = products[currentIndex];

  const handleNext = () => {
    onNavigateIndex((currentIndex + 1) % products.length);
  };

  const handlePrev = () => {
    onNavigateIndex((currentIndex - 1 + products.length) % products.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#07150E] border border-[#1E4D35] rounded-xs shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 bg-[#05110B]/80 hover:bg-[#D4AF37] text-white hover:text-black rounded-xs border border-[#1D4A34] transition-colors"
          title="Close Lightbox"
        >
          <X size={18} />
        </button>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-[#05110B]/80 hover:bg-[#143B28] text-[#E5C583] hover:text-white rounded-xs border border-[#1D4A34] transition-colors"
          title="Previous Photo"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 md:right-[380px] top-1/2 -translate-y-1/2 z-30 p-2.5 bg-[#05110B]/80 hover:bg-[#143B28] text-[#E5C583] hover:text-white rounded-xs border border-[#1D4A34] transition-colors"
          title="Next Photo"
        >
          <ChevronRight size={20} />
        </button>

        {/* Main High-Res Editorial Photography Stage */}
        <div className="relative flex-1 min-h-[360px] md:min-h-[540px] bg-[#040C08] flex items-center justify-center overflow-hidden p-6">
          <img
            src={product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={e => handleImageError(e, product.category)}
            className="max-h-[75vh] w-auto max-w-full object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] transition-all duration-300"
          />

          {/* Photo Counter Pill */}
          <div className="absolute top-4 left-4 bg-[#0A1811]/90 border border-[#1D4A34] px-3 py-1 text-[11px] font-mono-luxury text-[#E5C583] rounded-xs">
            {albumTitle} • Photo {currentIndex + 1} of {products.length}
          </div>
        </div>

        {/* Sidebar Dossier & Actions */}
        <div className="w-full md:w-[380px] p-6 sm:p-8 bg-[#0A1B13] border-t md:border-t-0 md:border-l border-[#183C2A] flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 text-[#D4AF37] text-[10px] font-mono-luxury uppercase tracking-[0.2em] mb-2">
              <Sparkles size={12} />
              <span>{product.brand}</span>
            </div>

            <h2 className="font-editorial text-2xl sm:text-3xl text-white font-normal leading-snug">
              {product.name}
            </h2>

            <p className="text-xs text-[#9DB4A7] mt-2 leading-relaxed font-sans">
              {product.subtitle || product.description}
            </p>

            <div className="my-5 p-3.5 bg-[#06120C] border border-[#163C29] rounded-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-luxury">
                <span className="text-[#7E998C]">Price</span>
                <span className="text-base text-[#E5C583] font-semibold">{formatPrice(product.price)}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono-luxury">
                <span className="text-[#7E998C]">Provenance</span>
                <span className="text-white">{product.origin}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono-luxury">
                <span className="text-[#7E998C]">Materials</span>
                <span className="text-[#D4AF37] truncate max-w-[200px] text-right">{product.materials}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#183C2A]">
            <button
              onClick={() => {
                setThreeDModalProduct(product);
                onClose();
              }}
              className="w-full py-2.5 bg-[#0D261B] hover:bg-[#153D2B] text-[#E5C583] border border-[#23533D] hover:border-[#D4AF37] text-xs font-sans uppercase tracking-[0.16em] font-medium transition-colors flex items-center justify-center gap-2 rounded-xs shadow-md"
            >
              <Maximize2 size={13} />
              <span>Inspect in 3D Turntable</span>
            </button>

            <button
              onClick={() => {
                addToCart(product, product.sizes[0], product.colors[0]?.name);
              }}
              className="w-full py-3 bg-[#D4AF37] hover:bg-[#E5C583] text-[#06110B] text-xs font-sans uppercase tracking-[0.16em] font-bold transition-colors flex items-center justify-center gap-2 rounded-xs shadow-lg"
            >
              <ShoppingBag size={14} />
              <span>Add to Atelier Bag</span>
            </button>

            <button
              onClick={() => {
                onSelectProduct(product.id);
                onClose();
              }}
              className="w-full py-2 text-center text-xs text-[#8FA89C] hover:text-[#D4AF37] font-sans transition-colors"
            >
              View Full Product Specifications →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
