import React, { useState, useEffect } from 'react';
import { X, Heart, Star, Check, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { handleImageError } from '../utils/images';

interface QuickViewModalProps {
  onNavigateToProduct: (productId: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ onNavigateToProduct }) => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    formatPrice,
    toggleWishlist,
    isInWishlist
  } = useStore();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedColorName, setSelectedColorName] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setActiveImgIndex(0);
      setSelectedSize(quickViewProduct.sizes[0] || 'One Size');
      setSelectedColor(quickViewProduct.colors[0]?.hex || '#111111');
      setSelectedColorName(quickViewProduct.colors[0]?.name || 'Standard');
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWished = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product.id, selectedSize, selectedColor, selectedColorName, quantity);
    setQuickViewProduct(null);
  };

  const handleInspectFull = () => {
    setQuickViewProduct(null);
    onNavigateToProduct(product.id);
  };

  return (
    <div id="quick-view-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Container */}
      <div className="relative bg-[#0A1C14] w-full max-w-4xl shadow-2xl border border-[#1E4A35] z-10 overflow-hidden my-auto max-h-[90vh] flex flex-col md:flex-row text-[#FAF9F5] rounded-xs">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#06110B] text-white hover:text-[#D4AF37] flex items-center justify-center shadow-md transition-colors border border-[#1E4A35]"
          aria-label="Close modal"
        >
          <X size={16} strokeWidth={1.5} />
        </button>

        {/* Left: Gallery Column */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-[#07150E] border-r border-[#183C2A]">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#040C07]">
            <img
              src={product.images[activeImgIndex] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={e => handleImageError(e, product.category)}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-2.5 mt-3 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImgIndex(i)}
                  className={`relative w-14 aspect-[3/4] overflow-hidden border transition-all shrink-0 bg-[#06110B] ${
                    activeImgIndex === i ? 'border-[#D4AF37]' : 'border-[#183C2A] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    referrerPolicy="no-referrer"
                    onError={e => handleImageError(e, product.category)}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details Column */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto max-h-[80vh] md:max-h-[90vh] justify-between">
          <div>
            <div className="flex items-center justify-between text-[10.5px] text-[#7E998C] uppercase tracking-[0.16em] font-mono-luxury mb-1">
              <span>{product.brand}</span>
              <div className="flex items-center gap-1 text-[#D4AF37]">
                <Star size={11} className="fill-current text-[#D4AF37]" />
                <span className="text-white">{product.rating} ({product.reviewsCount})</span>
              </div>
            </div>

            <h2 className="font-editorial text-2xl md:text-3xl font-normal text-white leading-tight">
              {product.name}
            </h2>

            <div className="mt-2 font-mono-luxury text-base text-[#E5C583]">
              <span>{formatPrice(product.price)}</span>
            </div>

            <p className="mt-3.5 text-xs text-[#9DB4A7] leading-relaxed font-sans border-t border-[#183C2A] pt-3.5">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-4">
                <label className="text-[11px] font-mono-luxury uppercase tracking-wider text-white block mb-2">
                  Color: <span className="text-[#E5C583] font-normal">{selectedColorName}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map(c => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedColor(c.hex);
                        setSelectedColorName(c.name);
                      }}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                        selectedColor === c.hex
                          ? 'ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-[#0A1C14] scale-105'
                          : 'border-white/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {selectedColor === c.hex && (
                        <Check size={10} className={c.hex === '#111111' || c.hex === '#181818' ? 'text-white' : 'text-black'} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-4">
                <label className="text-[11px] font-mono-luxury uppercase tracking-wider text-white block mb-2">
                  Size
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 text-xs font-sans tracking-wide border rounded-xs transition-colors ${
                        selectedSize === s
                          ? 'bg-[#143B28] text-[#E5C583] border-[#D4AF37] font-semibold'
                          : 'bg-[#07130D] text-[#9DB4A7] border-[#183C2A] hover:border-[#D4AF37]/50 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-6 pt-4 border-t border-[#183C2A] space-y-2.5">
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="flex-1 py-3 bg-[#D4AF37] hover:bg-[#E5C583] text-[#06110B] text-xs uppercase tracking-wider font-bold rounded-xs shadow-md transition-colors"
              >
                Add to Shopping Bag
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-11 border border-[#183C2A] rounded-xs flex items-center justify-center transition-colors ${
                  isWished ? 'bg-[#D4AF37] text-[#06110B]' : 'bg-[#07130D] text-white hover:border-[#D4AF37]'
                }`}
                aria-label="Wishlist"
              >
                <Heart size={16} className={isWished ? 'fill-current' : ''} />
              </button>
            </div>

            <button
              onClick={handleInspectFull}
              className="w-full py-2.5 bg-[#07130D] hover:bg-[#0E261B] text-[#C8D9D0] hover:text-white text-xs uppercase tracking-wider font-medium border border-[#183C2A] hover:border-[#D4AF37]/50 rounded-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Full Product Details</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
