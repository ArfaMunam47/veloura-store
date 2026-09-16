import React, { useState, useMemo } from 'react';
import { ArrowLeft, Sparkles, SlidersHorizontal, Search, X } from 'lucide-react';
import { ThreeDStudio } from '../components/ThreeDStudio';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

interface Studio3DPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onSelectProduct: (id: string) => void;
}

export const Studio3DPage: React.FC<Studio3DPageProps> = ({
  onNavigate,
  onSelectProduct
}) => {
  const { products } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Men' | 'Women' | 'Footwear' | 'Jewelry'>('Men');
  const [searchQuery, setSearchQuery] = useState('');

  // Category filters
  const categories = [
    { label: "Men's Collection", value: 'Men', count: 20 },
    { label: "Women's Collection", value: 'Women', count: 20 },
    { label: 'Footwear Archive', value: 'Footwear', count: 20 },
    { label: 'Fine Jewelry', value: 'Jewelry', count: 20 },
    { label: 'All Creations', value: 'All', count: 80 }
  ] as const;

  // Strict filtering - Men shows only Men, Women shows only Women
  const displayedProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.group === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subtitle?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [products, selectedCategory, searchQuery]);

  return (
    <div id="velora-3d-studio-page" className="min-h-screen bg-[#06110B] text-[#FAF9F5] pb-24 selection:bg-[#D4AF37] selection:text-[#06110B]">
      {/* 1. TOP SUB-NAV HUD */}
      <div className="border-b border-[#163625] bg-[#07160F]/90 backdrop-blur-md sticky top-16 z-30 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 text-xs font-mono-luxury uppercase tracking-wider text-[#7E998B] hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Store</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[11px] uppercase font-mono-luxury tracking-[0.2em] text-[#D4AF37] font-medium">
              3D Virtual Showroom Engine
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono-luxury text-[#6B8576]">
            <span>ENGINE: <b className="text-[#E5C583]">Three.js WebGL</b></span>
            <span>PLATFORM: <b className="text-[#10B981]">Active</b></span>
          </div>
        </div>
      </div>

      {/* 2. THE 3D STUDIO EXPERIENCE (Central Circular Clay Platform + Fashion Model) */}
      <ThreeDStudio
        onExploreLook={lookId => {
          if (lookId === 'look-01') {
            setSelectedCategory('Women');
          } else {
            setSelectedCategory('Men');
          }
        }}
      />

      {/* 3. COMPLETE 4x5 PRODUCT ALBUM (After 3D Model, with strict category filtering) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#183C2A] gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono-luxury uppercase tracking-[0.24em] text-[#D4AF37] mb-1">
              <Sparkles size={11} />
              <span>Atelier Catalog • 4x5 Exhibition Grid</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-white font-normal">
              {selectedCategory === 'Men' && "Men's Sartorial Collection"}
              {selectedCategory === 'Women' && "Women's Atelier Collection"}
              {selectedCategory === 'Footwear' && 'Handcrafted Footwear Archive'}
              {selectedCategory === 'Jewelry' && 'Fine Jewelry & Horology'}
              {selectedCategory === 'All' && 'Complete Velora Archive'}
            </h2>
            <p className="text-xs text-[#8FA89C] mt-1.5 font-sans">
              Strictly verified creations from master artisans with zero image repetition and full product specifications.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7E998C]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name or style..."
              className="w-full pl-9 pr-8 py-2 bg-[#07130D] border border-[#183D2C] text-xs text-white placeholder:text-[#6C8578] focus:outline-hidden focus:border-[#D4AF37] rounded-xs font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7E998C] hover:text-white"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Bar (Section 19: Clean single row) */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedCategory(cat.value);
                setSearchQuery('');
              }}
              className={`px-4 py-2 text-xs uppercase tracking-[0.14em] font-sans transition-all rounded-xs border flex items-center gap-2 ${
                selectedCategory === cat.value
                  ? 'bg-[#143B28] text-[#E5C583] border-[#D4AF37] font-semibold shadow-md'
                  : 'bg-[#0A1C14] text-[#8FA89C] border-[#183C2A] hover:border-[#D4AF37]/50 hover:text-white'
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] font-mono-luxury opacity-70">
                ({cat.count})
              </span>
            </button>
          ))}
        </div>

        {/* Showing Count Indicator */}
        <div className="flex items-center justify-between text-xs text-[#8BA496] mb-6 pb-2 border-b border-[#143323] font-mono-luxury">
          <div className="flex items-center gap-2">
            <span>Displaying:</span>
            <span className="text-[#FAF9F5] font-semibold">
              {displayedProducts.length} {displayedProducts.length === 1 ? 'Creation' : 'Creations'}
            </span>
            <span className="bg-[#0E261B] text-[#D4AF37] px-2 py-0.5 border border-[#1D4732] rounded-xs text-[10px]">
              {selectedCategory}
            </span>
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#D4AF37] hover:underline flex items-center gap-1 text-[11px]"
            >
              <X size={12} />
              <span>Clear Search</span>
            </button>
          )}
        </div>

        {/* 4x5 PRODUCT GRID (4 columns on desktop, exactly 20 products for each category) */}
        <div
          id="studio-product-grid"
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 w-full"
        >
          {displayedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
