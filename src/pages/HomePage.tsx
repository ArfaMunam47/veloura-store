import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Feather, Compass, Award, Maximize2, CheckCircle2 } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Hero3DStage } from '../components/Hero3DStage';
import { CATEGORIES } from '../data/categories';
import { PRESS_REVIEWS } from '../data/editorial';
import { useStore } from '../context/StoreContext';
import { handleImageError } from '../utils/images';

import seasonalLayersImage from '../assets/images/seasonal_layers_look_1788344813085.jpg';
import leatherBagImage from '../assets/images/leather_bag_editorial_1788344830123.jpg';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onSelectProduct: (productId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProduct }) => {
  const { products, formatPrice, setThreeDModalProduct } = useStore();
  const [activeCategoryTab, setActiveCategoryTab] = useState<'All' | 'Women' | 'Men' | 'Footwear' | 'Jewelry' | 'Accessories'>('All');

  const filteredFeatured = products
    .filter(p => {
      if (activeCategoryTab === 'All') return true;
      if (activeCategoryTab === 'Footwear') {
        return (
          p.group === 'Footwear' ||
          p.category.includes('footwear') ||
          p.category.includes('sneaker') ||
          p.category.includes('boot') ||
          p.category.includes('loafer') ||
          p.category.includes('shoe')
        );
      }
      if (activeCategoryTab === 'Jewelry') {
        return (
          p.group === 'Jewelry' ||
          p.category.includes('jewelry') ||
          p.category.includes('watches') ||
          p.category.includes('jewel') ||
          p.category.includes('watch')
        );
      }
      if (activeCategoryTab === 'Accessories') {
        return (
          p.group === 'Accessories' ||
          p.group === 'Bags' ||
          p.category.startsWith('acc-') ||
          p.category === 'bags'
        );
      }
      return p.group === activeCategoryTab;
    })
    .slice(0, 8);

  return (
    <div id="home-page-container" className="space-y-16 sm:space-y-24 pb-20 text-[#FAF9F5] bg-[#06110B]">
      {/* 1. 3D 4K HAUTE ATELIER HERO EXPERIENCE */}
      <Hero3DStage
        onNavigate={onNavigate}
        onSelectProduct={onSelectProduct}
        onOpen3DModal={p => setThreeDModalProduct(p)}
      />

      {/* 2. SPLIT EDITORIAL DIALOGUES: "Outerwear Discipline" & "Leather Craft" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Outerwear Dialogue */}
          <div className="bg-[#0A1C14] border border-[#183C2A] overflow-hidden flex flex-col md:flex-row rounded-xs hover:border-[#D4AF37]/50 transition-all shadow-xl">
            <div className="w-full md:w-1/2 aspect-[3/4] overflow-hidden relative bg-[#07130D]">
              <span className="absolute top-3 left-3 z-10 bg-[#06110B]/90 backdrop-blur-xs text-[#E5C583] text-[9.5px] font-mono-luxury uppercase px-2 py-0.5 border border-[#1F4A34]">
                Atelier Outerwear
              </span>
              <img
                src={seasonalLayersImage}
                alt="Model in tailored outerwear"
                referrerPolicy="no-referrer"
                onError={e => handleImageError(e, 'coat')}
                className="w-full h-full object-cover object-top filter brightness-105"
              />
            </div>
            <div className="w-full md:w-1/2 p-6 sm:p-7 flex flex-col justify-between bg-[#0A1C14]">
              <div>
                <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37] block mb-1">
                  Atelier Focus
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-white font-normal">
                  Seasonal Layers
                </h3>
                <p className="text-xs text-[#9DB4A7] mt-2.5 leading-relaxed font-sans">
                  Structured double-breasted overcoats cut from virgin Yorkshire wool, tailored to drape naturally with superior thermal comfort and clean silhouette.
                </p>
              </div>

              <button
                onClick={() => onNavigate('shop', { group: 'Women', cat: 'women-outerwear' })}
                className="mt-6 w-full py-2.5 bg-[#0E261B] hover:bg-[#153E2A] text-[#E5C583] border border-[#214D37] text-xs uppercase tracking-[0.16em] font-sans font-medium transition-colors flex items-center justify-center gap-1.5 rounded-xs"
              >
                <span>Explore Outerwear</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* Leather Goods Dialogue */}
          <div className="bg-[#0A1C14] border border-[#183C2A] overflow-hidden flex flex-col md:flex-row rounded-xs hover:border-[#D4AF37]/50 transition-all shadow-xl">
            <div className="w-full md:w-1/2 aspect-[3/4] overflow-hidden relative bg-[#07130D]">
              <span className="absolute top-3 left-3 z-10 bg-[#06110B]/90 backdrop-blur-xs text-[#E5C583] text-[9.5px] font-mono-luxury uppercase px-2 py-0.5 border border-[#1F4A34]">
                Tuscan Leather
              </span>
              <img
                src={leatherBagImage}
                alt="Model with artisan leather tote"
                referrerPolicy="no-referrer"
                onError={e => handleImageError(e, 'bag')}
                className="w-full h-full object-cover object-top filter brightness-105"
              />
            </div>
            <div className="w-full md:w-1/2 p-6 sm:p-7 flex flex-col justify-between bg-[#0A1C14]">
              <div>
                <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37] block mb-1">
                  Santa Croce Tanneries
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-white font-normal">
                  Vegetable Leather
                </h3>
                <p className="text-xs text-[#9DB4A7] mt-2.5 leading-relaxed font-sans">
                  Full-grain calfskins tanned with chestnut extracts in Tuscany. Hand-waxed to develop a rich, luminous personal patina over decades of carry.
                </p>
              </div>

              <button
                onClick={() => onNavigate('shop', { group: 'Accessories', cat: 'acc-bags' })}
                className="mt-6 w-full py-2.5 bg-[#0E261B] hover:bg-[#153E2A] text-[#E5C583] border border-[#214D37] text-xs uppercase tracking-[0.16em] font-sans font-medium transition-colors flex items-center justify-center gap-1.5 rounded-xs"
              >
                <span>Explore Leatherwork</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CURATED CATALOGUE WITH CATEGORY TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#183C2A] gap-4">
          <div>
            <span className="text-[10.5px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37]">
              Current Atelier Selection
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal mt-1">
              Seasonal Releases
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {(['All', 'Women', 'Men', 'Footwear', 'Jewelry', 'Accessories'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveCategoryTab(tab)}
                className={`px-3.5 py-1.5 text-xs font-sans tracking-wide transition-all border rounded-xs ${
                  activeCategoryTab === tab
                    ? 'bg-[#143B28] text-[#E5C583] border-[#D4AF37] font-semibold shadow-xs'
                    : 'bg-[#0A1C14] text-[#8FA89C] border-[#183C2A] hover:text-white hover:border-[#D4AF37]/40'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredFeatured.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => onNavigate('shop')}
            className="px-8 py-3 bg-[#0E261B] hover:bg-[#153E2A] text-[#E5C583] border border-[#214D37] text-xs uppercase tracking-[0.16em] font-sans font-medium transition-colors inline-flex items-center gap-2 shadow-lg rounded-xs"
          >
            <span>Explore All {products.length} Garments & Objects</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </section>

      {/* 4. FINE JEWELRY & HOROLOGY EDITORIAL SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xs overflow-hidden border border-[#D4AF37]/30 bg-gradient-to-b from-[#081810] via-[#0A1F15] to-[#06110B] p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-[#1A3F2E] gap-4">
            <div>
              <span className="text-[10px] font-mono-luxury uppercase tracking-[0.24em] text-[#D4AF37] block">
                Haute Joaillerie & Horology
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal mt-1">
                Precious Metal Sculptures & Swiss Complications
              </h2>
              <p className="text-xs sm:text-sm text-[#9DB4A7] mt-2 max-w-xl font-sans">
                Lost-wax cast 18k gold vermeil, conflict-free pavé stones, and Swiss automatic movements assembled by generational artisans in Valenza and Biel.
              </p>
            </div>
            <button
              onClick={() => onNavigate('shop', { group: 'Jewelry' })}
              className="px-5 py-2.5 bg-[#123624] hover:bg-[#1B4E34] text-[#E5C583] border border-[#D4AF37]/50 text-xs uppercase tracking-[0.16em] font-sans font-medium transition-all inline-flex items-center gap-2 rounded-xs whitespace-nowrap self-start md:self-auto"
            >
              <span>View All Jewelry</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Jewelry Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products
              .filter(p => p.group === 'Jewelry' || p.category.includes('jewelry') || p.category.includes('watch'))
              .slice(0, 4)
              .map(jewel => (
                <ProductCard
                  key={jewel.id}
                  product={jewel}
                  onSelect={onSelectProduct}
                />
              ))}
          </div>
        </div>
      </section>

      {/* 5. 3D VIRTUAL ATELIER STUDIO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xs overflow-hidden border border-[#23533D] bg-gradient-to-r from-[#07150E] via-[#0B2217] to-[#06120C] p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          {/* Ambient Lighting Orbs */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#1B4D36]/40 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#D4AF37]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E2A1E] border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-mono-luxury tracking-[0.2em] uppercase">
              <Sparkles size={12} />
              <span>Real-Time 3D & 4K Macro Turntable</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal leading-tight">
              Inspect Every Fiber in <span className="text-[#E5C583] italic">Ultra-Resolution 360°</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#9DB4A7] leading-relaxed font-sans">
              Rotate, illuminate, and zoom into hand-stitched welt seams, vegetable-tanned grains, and grade-A cashmere weaves with studio lighting precision.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  const spotlightProduct = products.find(p => p.id === 'vl-shoe-loafer-01') || products[0];
                  setThreeDModalProduct(spotlightProduct);
                }}
                className="px-6 py-3 bg-[#D4AF37] hover:bg-[#E5C583] text-[#06110B] text-xs uppercase tracking-[0.16em] font-sans font-bold transition-all inline-flex items-center gap-2 shadow-[0_10px_25px_rgba(212,175,55,0.3)] rounded-xs"
              >
                <Maximize2 size={14} />
                <span>Launch 3D Turntable</span>
              </button>

              <button
                onClick={() => onNavigate('shop', { group: 'Footwear' })}
                className="px-6 py-3 bg-transparent hover:bg-white/10 text-white text-xs uppercase tracking-[0.16em] font-sans font-medium border border-[#23533D] transition-all rounded-xs"
              >
                Explore Footwear
              </button>
            </div>
          </div>

          {/* Mini Interactive Preview Stage */}
          <div
            onClick={() => {
              const spotlightProduct = products.find(p => p.id === 'vl-shoe-loafer-01') || products[0];
              setThreeDModalProduct(spotlightProduct);
            }}
            className="relative z-10 w-64 sm:w-72 aspect-square flex items-center justify-center cursor-pointer group"
          >
            <div className="absolute inset-0 rounded-full border border-dashed border-[#D4AF37]/40 animate-spin-slow pointer-events-none" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-b from-[#113123] to-[#07130D] shadow-[0_0_40px_rgba(0,0,0,0.8)] flex items-center justify-center border border-[#1D4A34]">
              <img
                src={products.find(p => p.id === 'vl-shoe-loafer-01')?.images[0] || products[0].images[0]}
                alt="3D Turntable Preview"
                referrerPolicy="no-referrer"
                onError={e => handleImageError(e, 'footwear')}
                className="w-44 h-44 object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
              />
              <div className="absolute bottom-3 bg-[#0A1811]/90 border border-[#D4AF37]/60 px-2.5 py-1 text-[9.5px] font-mono-luxury text-[#E5C583] rounded-xs flex items-center gap-1 shadow-md">
                <Maximize2 size={10} />
                <span>CLICK TO ROTATE 360°</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL CATEGORY TILES (More categories shown!) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[10.5px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37]">
            Department Taxonomy
          </span>
          <h2 className="font-editorial text-3xl text-white font-normal mt-1">
            Explore by Discipline
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.slice(0, 8).map(cat => (
            <div
              key={cat.id}
              onClick={() => onNavigate('shop', { cat: cat.id })}
              className="group relative aspect-[4/5] overflow-hidden bg-[#07130D] border border-[#183C2A] cursor-pointer rounded-xs hover:border-[#D4AF37]/60 transition-all"
            >
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                onError={e => handleImageError(e, cat.name)}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06110B] via-[#06110B]/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[9.5px] font-mono-luxury uppercase tracking-[0.16em] text-[#E5C583] block">
                  {cat.itemCount} Pieces
                </span>
                <h3 className="font-editorial text-xl font-normal mt-0.5 group-hover:text-[#E5C583] transition-colors">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CRAFTSMANSHIP & PROVENANCE MANIFESTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A1C14] border border-[#183C2A] p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center rounded-xs shadow-xl">
          <div className="lg:col-span-6">
            <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37]">
              Maison Ethos
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal mt-1.5 leading-tight">
              Garments intended to endure decades, not trends.
            </h2>
            <p className="mt-3.5 text-xs sm:text-sm text-[#9DB4A7] leading-relaxed font-sans">
              We collaborate exclusively with small, generational ateliers across England, France, Italy, and Portugal. Every fabric is fully traceable from fleece to finished weave, utilizing heritage techniques that ensure exceptional structural integrity and comfort.
            </p>
            <button
              onClick={() => onNavigate('about')}
              className="mt-6 px-6 py-2.5 bg-[#143B28] hover:bg-[#1E5238] text-[#E5C583] border border-[#214D37] text-xs uppercase tracking-[0.16em] font-sans font-medium transition-colors rounded-xs flex items-center gap-2"
            >
              <span>Read Atelier Manifesto</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="bg-[#07130D] p-4.5 border border-[#183C2A] rounded-xs">
              <span className="font-mono-luxury text-xs text-[#D4AF37]">01</span>
              <h4 className="font-sans font-semibold text-xs text-white mt-2">Pure Natural Fibers</h4>
              <p className="text-[11px] text-[#8FA89C] mt-1 leading-relaxed">
                Cashmere, Mulberry silk, and virgin wool with zero synthetic polyester blends.
              </p>
            </div>
            <div className="bg-[#07130D] p-4.5 border border-[#183C2A] rounded-xs">
              <span className="font-mono-luxury text-xs text-[#D4AF37]">02</span>
              <h4 className="font-sans font-semibold text-xs text-white mt-2">Limited Batching</h4>
              <p className="text-[11px] text-[#8FA89C] mt-1 leading-relaxed">
                Numbered atelier runs that eliminate overproduction and seasonal waste.
              </p>
            </div>
            <div className="bg-[#07130D] p-4.5 border border-[#183C2A] rounded-xs">
              <span className="font-mono-luxury text-xs text-[#D4AF37]">03</span>
              <h4 className="font-sans font-semibold text-xs text-white mt-2">Fair Living Wages</h4>
              <p className="text-[11px] text-[#8FA89C] mt-1 leading-relaxed">
                Direct partnerships with verified artisan master-tailor cooperatives in Europe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CRITICAL PRESS REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37]">
            Editorial Commentary
          </span>
          <h2 className="font-editorial text-3xl text-white font-normal mt-1">
            Critical Reception
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PRESS_REVIEWS.map((r, i) => (
            <div
              key={i}
              className="bg-[#0A1C14] p-6 sm:p-7 border border-[#183C2A] flex flex-col justify-between rounded-xs"
            >
              <div>
                <span className="text-[10.5px] font-mono-luxury uppercase tracking-[0.16em] text-[#D4AF37] font-semibold">
                  {r.source}
                </span>
                <p className="font-editorial text-base text-[#FAF9F5] mt-3 leading-snug italic">
                  “{r.quote}”
                </p>
              </div>
              <span className="text-[11px] text-[#7E998C] font-sans mt-5 block border-t border-[#183C2A] pt-2.5">
                {r.author}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
