import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';

interface ShopPageProps {
  initialFilter?: {
    group?: string;
    cat?: string;
    filter?: string;
    q?: string;
  };
  onSelectProduct: (productId: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ initialFilter, onSelectProduct }) => {
  const { products } = useStore();

  const [selectedGroup, setSelectedGroup] = useState<string>(initialFilter?.group || 'All');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialFilter?.cat || 'all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialFilter?.q || '');
  const [sortBy, setSortBy] = useState<string>('featured');

  const groups = [
    { label: 'All Items', value: 'All' },
    { label: 'Women', value: 'Women' },
    { label: 'Men', value: 'Men' },
    { label: 'Footwear', value: 'Footwear' },
    { label: 'Bags & Leather', value: 'Accessories' },
    { label: 'Fine Jewelry', value: 'Jewelry' },
    { label: 'Pure Cashmere', value: 'Cashmere' }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Group filter
      if (selectedGroup === 'Footwear') {
        const isFootwear =
          p.group === 'Footwear' ||
          p.category.includes('footwear') ||
          p.category.includes('shoe') ||
          p.category.includes('boot') ||
          p.category.includes('loafer') ||
          p.category.includes('sneaker');
        if (!isFootwear) return false;
      } else if (selectedGroup === 'Jewelry') {
        const isJewel = p.category === 'acc-jewelry' || p.category === 'acc-watches' || p.category.includes('jewelry');
        if (!isJewel) return false;
      } else if (selectedGroup === 'Cashmere') {
        const isCashmere =
          p.name.toLowerCase().includes('cashmere') ||
          (p.materials && p.materials.toLowerCase().includes('cashmere')) ||
          p.category.includes('knitwear');
        if (!isCashmere) return false;
      } else if (selectedGroup === 'Accessories') {
        const isAcc = p.group === 'Accessories' || p.category.startsWith('acc-');
        if (!isAcc) return false;
      } else if (selectedGroup !== 'All') {
        if (p.group !== selectedGroup) return false;
      }

      // Category filter if specifically selected
      if (selectedCategory !== 'all') {
        if (p.category !== selectedCategory && !p.category.includes(selectedCategory)) {
          return false;
        }
      }

      // Special initial filter
      if (initialFilter?.filter === 'new' && !p.isNew) return false;
      if (initialFilter?.filter === 'bestseller' && !p.isBestSeller) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.materials && p.materials.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Price filter
      if (priceRange === 'under200' && p.price >= 200) return false;
      if (priceRange === '200to400' && (p.price < 200 || p.price > 400)) return false;
      if (priceRange === 'over400' && p.price <= 400) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured
    });
  }, [products, selectedGroup, selectedCategory, initialFilter, searchQuery, priceRange, sortBy]);

  const clearFilters = () => {
    setSelectedGroup('All');
    setSelectedCategory('all');
    setPriceRange('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div id="shop-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-[#FAF9F5] bg-[#06110B]">
      {/* Page Heading */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-[10.5px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37] block mb-1">
          Atelier Catalog
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
          {selectedGroup === 'All' ? 'Atelier Collection' : `${selectedGroup} Collection`}
        </h1>
        <p className="text-xs sm:text-sm text-[#9DB4A7] mt-2">
          Discover luxury everyday essentials and timeless pieces crafted with precision in European ateliers.
        </p>
      </div>

      {/* Clean Category Navigation Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {groups.map(g => (
          <button
            key={g.value}
            onClick={() => {
              setSelectedGroup(g.value);
              setSelectedCategory('all');
            }}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-sans transition-all rounded-xs border ${
              selectedGroup === g.value
                ? 'bg-[#143B28] text-[#E5C583] border-[#D4AF37] font-semibold shadow-xs'
                : 'bg-[#0A1C14] text-[#8FA89C] border-[#183C2A] hover:border-[#D4AF37]/50 hover:text-white'
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Top Filter & Search Controls */}
      <div className="bg-[#0A1C14] border border-[#183C2A] p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 rounded-xs shadow-lg">
        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7E998C]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search silhouettes, materials, codes..."
            className="w-full pl-9 pr-8 py-2 bg-[#07130D] border border-[#1B4230] text-xs text-white placeholder:text-[#6C8578] focus:outline-hidden focus:border-[#D4AF37] rounded-xs font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7E998C] hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center justify-between w-full md:w-auto gap-3">
          {/* Specific Category Sub-Filter */}
          <div className="flex items-center gap-1.5 text-xs font-mono-luxury">
            <span className="text-[#7E998C]">Category:</span>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="bg-[#07130D] border border-[#1B4230] py-2 px-3 text-xs text-[#E5C583] focus:outline-hidden focus:border-[#D4AF37] cursor-pointer rounded-xs"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="flex items-center gap-1.5 text-xs font-mono-luxury">
            <span className="text-[#7E998C]">Price:</span>
            <select
              value={priceRange}
              onChange={e => setPriceRange(e.target.value)}
              className="bg-[#07130D] border border-[#1B4230] py-2 px-3 text-xs text-[#E5C583] focus:outline-hidden focus:border-[#D4AF37] cursor-pointer rounded-xs"
            >
              <option value="all">All Tiers</option>
              <option value="under200">Under $200</option>
              <option value="200to400">$200 – $400</option>
              <option value="over400">$400 & Above</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs font-mono-luxury">
            <span className="text-[#7E998C]">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-[#07130D] border border-[#1B4230] py-2 px-3 text-xs text-[#E5C583] focus:outline-hidden focus:border-[#D4AF37] cursor-pointer rounded-xs"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Ascending</option>
              <option value="price-desc">Price: Descending</option>
              <option value="new">Latest Arrivals</option>
            </select>
          </div>

          {(selectedGroup !== 'All' || selectedCategory !== 'all' || priceRange !== 'all' || searchQuery) && (
            <button
              onClick={clearFilters}
              className="text-xs text-[#D4AF37] hover:underline font-sans ml-1"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Products Counter */}
      <div className="flex items-center justify-between text-xs text-[#7E998C] mb-6 font-mono-luxury">
        <span>Displaying <strong className="text-[#E5C583]">{filteredProducts.length}</strong> atelier creations</span>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-[#0A1C14] border border-[#183C2A] p-8 rounded-xs">
          <p className="text-sm font-medium text-white mb-2">No matching creations found</p>
          <p className="text-xs text-[#7E998C] mb-4">Try clearing your filters or search keywords.</p>
          <button
            onClick={clearFilters}
            className="px-5 py-2.5 bg-[#D4AF37] text-[#06110B] text-xs uppercase tracking-wider font-bold rounded-xs"
          >
            Show Complete Atelier Archive
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};
