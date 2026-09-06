import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { handleImageError } from '../utils/images';

interface SearchModalProps {
  onSelectProduct: (productId: string) => void;
  onNavigateToShopWithQuery: (q: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  onSelectProduct,
  onNavigateToShopWithQuery
}) => {
  const { searchModalOpen, setSearchModalOpen, formatPrice, products } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [searchModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchModalOpen]);

  if (!searchModalOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter(p => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.materials.toLowerCase().includes(q)
        );
      }).slice(0, 6)
    : [];

  const trendingTags = [
    'Trench Coat',
    'Double-Faced Cashmere',
    'Mulberry Silk Gown',
    'Japanese Selvedge Denim',
    'Tuscan Leather Tote',
    'Goodyear Welted Loafers',
    'Wool Flannel Blazer'
  ];

  return (
    <div id="search-modal-container" className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={() => setSearchModalOpen(false)}
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
        <div className="relative w-full max-w-3xl bg-[#06110B] shadow-2xl border border-[#183C2A] z-10 overflow-hidden text-[#FAF9F5] rounded-xs">
          {/* Top Search Input Bar */}
          <div className="p-6 border-b border-[#183C2A] flex items-center gap-3.5 bg-[#0A1C14]">
            <Search size={20} strokeWidth={1.5} className="text-[#D4AF37] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search garments, tailoring, silk, or accessories..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent font-sans text-lg sm:text-xl text-white placeholder:text-[#9DB4A7]/60 focus:outline-hidden"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-[#9DB4A7] hover:text-white"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            )}
            <button
              onClick={() => setSearchModalOpen(false)}
              className="px-2.5 py-1 text-[11px] uppercase font-mono-luxury tracking-wider text-[#9DB4A7] hover:text-white border border-[#183C2A] hover:bg-[#132A1E] transition-colors shrink-0 rounded-xs"
            >
              ESC
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Quick Trending Tags */}
            <div className="mb-6">
              <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37] block mb-2.5">
                Trending Explorations
              </span>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 bg-[#0A1C14] hover:bg-[#D4AF37] hover:text-[#06110B] text-[#FAF9F5] border border-[#183C2A] text-xs font-sans tracking-wide transition-colors rounded-xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            {query.trim() && (
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#183C2A] mb-4">
                  <span className="text-xs font-mono-luxury uppercase text-[#9DB4A7]">
                    Found {filteredProducts.length} results
                  </span>
                  {filteredProducts.length > 0 && (
                    <button
                      onClick={() => {
                        setSearchModalOpen(false);
                        onNavigateToShopWithQuery(query);
                      }}
                      className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>View all catalog results</span>
                      <ArrowRight size={12} />
                    </button>
                  )}
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="py-10 text-center text-[#9DB4A7]">
                    <p className="font-editorial text-xl text-white">No exact matches found for “{query}”</p>
                    <p className="text-xs mt-1">Explore our core edits: Outerwear, Cashmere, Tailoring, or Leather Goods.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {filteredProducts.map(product => (
                      <div
                        key={product.id}
                        onClick={() => {
                          setSearchModalOpen(false);
                          onSelectProduct(product.id);
                        }}
                        className="flex gap-3.5 p-2.5 bg-[#0A1C14] hover:bg-[#132A1E] transition-colors cursor-pointer border border-[#183C2A] rounded-xs group"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          onError={e => handleImageError(e, product.category)}
                          className="w-16 aspect-[3/4] object-cover object-top bg-black/40 shrink-0 border border-[#183C2A] rounded-xs"
                        />
                        <div className="flex-1 flex flex-col justify-center min-w-0">
                          <span className="text-[10px] font-mono-luxury uppercase text-[#D4AF37]">
                            {product.brand}
                          </span>
                          <h4 className="text-xs font-medium text-white truncate mt-0.5 group-hover:text-[#E5C583] transition-colors">
                            {product.name}
                          </h4>
                          <span className="text-xs font-mono-luxury font-medium text-[#E5C583] mt-1">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
