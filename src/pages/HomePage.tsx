import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Feather, Compass, Award, Maximize2 } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Hero3DStage } from '../components/Hero3DStage';
import { VeloraGalleryShowcase } from '../components/VeloraGalleryShowcase';
import { PRESS_REVIEWS } from '../data/editorial';
import { useStore } from '../context/StoreContext';
import { handleImageError } from '../utils/images';

import seasonalLayersImage from '../assets/images/seasonal_layers_look_1788344813085.jpg';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onSelectProduct: (productId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProduct }) => {
  const { products, formatPrice, setThreeDModalProduct } = useStore();
  const [activeCategoryTab, setActiveCategoryTab] = useState<'All' | 'Women' | 'Men' | 'Kids' | 'Footwear' | 'Jewelry'>('All');

  // STRICT category filtering
  const filteredFeatured = products
    .filter(p => {
      if (activeCategoryTab === 'All') return true;
      if (activeCategoryTab === 'Footwear') {
        return p.group === 'Footwear';
      }
      if (activeCategoryTab === 'Jewelry') {
        return p.group === 'Jewelry';
      }
      if (activeCategoryTab === 'Women') {
        return p.group === 'Women';
      }
      if (activeCategoryTab === 'Men') {
        return p.group === 'Men';
      }
      if (activeCategoryTab === 'Kids') {
        return p.group === 'Kids';
      }
      return true;
    })
    .slice(0, 20);

  return (
    <div id="home-page-container" className="space-y-16 sm:space-y-24 pb-20 text-[#FAF9F5] bg-[#06110B]">
      {/* 1. 3D 4K HAUTE ATELIER HERO EXPERIENCE */}
      <Hero3DStage
        onNavigate={onNavigate}
        onSelectProduct={onSelectProduct}
        onOpen3DModal={p => setThreeDModalProduct(p)}
      />

      {/* 2. SPLIT EDITORIAL DIALOGUES: "Women's Atelier Tailoring" & "Men's Sartorial Discipline" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Women's Tailoring Dialogue */}
          <div className="bg-[#0A1C14] border border-[#183C2A] overflow-hidden flex flex-col md:flex-row rounded-xs hover:border-[#D4AF37]/50 transition-all shadow-xl">
            <div className="w-full md:w-1/2 aspect-[3/4] overflow-hidden relative bg-[#07130D]">
              <span className="absolute top-3 left-3 z-10 bg-[#06110B]/90 backdrop-blur-xs text-[#E5C583] text-[9.5px] font-mono-luxury uppercase px-2 py-0.5 border border-[#1F4A34]">
                Womenswear Atelier
              </span>
              <img
                src={seasonalLayersImage}
                alt="Woman in tailored cashmere coat"
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
                  Women's Tailoring
                </h3>
                <p className="text-xs text-[#9DB4A7] mt-2.5 leading-relaxed font-sans">
                  Structured double-breasted trench coats and fluid silk trousers cut from Yorkshire wool, tailored to drape naturally with effortless poise.
                </p>
              </div>

              <button
                onClick={() => onNavigate('shop', { group: 'Women' })}
                className="mt-6 w-full py-2.5 bg-[#0E261B] hover:bg-[#153E2A] text-[#E5C583] border border-[#214D37] text-xs uppercase tracking-[0.16em] font-sans font-medium transition-colors flex items-center justify-center gap-1.5 rounded-xs"
              >
                <span>Explore Women's Archive</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* Men's Sartorial Dialogue */}
          <div className="bg-[#0A1C14] border border-[#183C2A] overflow-hidden flex flex-col md:flex-row rounded-xs hover:border-[#D4AF37]/50 transition-all shadow-xl">
            <div className="w-full md:w-1/2 aspect-[3/4] overflow-hidden relative bg-[#07130D]">
              <span className="absolute top-3 left-3 z-10 bg-[#06110B]/90 backdrop-blur-xs text-[#E5C583] text-[9.5px] font-mono-luxury uppercase px-2 py-0.5 border border-[#1F4A34]">
                Menswear Atelier
              </span>
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=85&w=1200&auto=format&fit=crop"
                alt="Man in Savile Row tailoring"
                referrerPolicy="no-referrer"
                onError={e => handleImageError(e, 'men')}
                className="w-full h-full object-cover object-top filter brightness-105"
              />
            </div>
            <div className="w-full md:w-1/2 p-6 sm:p-7 flex flex-col justify-between bg-[#0A1C14]">
              <div>
                <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37] block mb-1">
                  Savile Row Discipline
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-white font-normal">
                  Men's Architecture
                </h3>
                <p className="text-xs text-[#9DB4A7] mt-2.5 leading-relaxed font-sans">
                  Structured peaked-lapel coats, Sea Island cotton shirting, and relaxed pleated flannel trousers engineered for decades of wear.
                </p>
              </div>

              <button
                onClick={() => onNavigate('shop', { group: 'Men' })}
                className="mt-6 w-full py-2.5 bg-[#0E261B] hover:bg-[#153E2A] text-[#E5C583] border border-[#214D37] text-xs uppercase tracking-[0.16em] font-sans font-medium transition-colors flex items-center justify-center gap-1.5 rounded-xs"
              >
                <span>Explore Men's Archive</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEASONAL EDITORIAL SHOWCASE (4x5 Grid / 20 products) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-[#183C2A] gap-4">
          <div>
            <span className="text-[10px] font-mono-luxury uppercase tracking-[0.24em] text-[#D4AF37] block">
              Curated Catalog Edition
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal mt-1">
              {activeCategoryTab === 'All' ? 'Complete Atelier Showcase' : `${activeCategoryTab} Archive`}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {(['All', 'Women', 'Men', 'Kids', 'Footwear', 'Jewelry'] as const).map(tab => (
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
        </div>

        {/* 4x5 Showcase Display: ProductCard Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
            onClick={() => onNavigate('shop', { group: activeCategoryTab === 'All' ? '' : activeCategoryTab })}
            className="px-8 py-3 bg-[#0E261B] hover:bg-[#153E2A] text-[#E5C583] border border-[#214D37] text-xs uppercase tracking-[0.16em] font-sans font-medium transition-colors inline-flex items-center gap-2 shadow-lg rounded-xs"
          >
            <span>Open Complete {activeCategoryTab === 'All' ? 'Atelier' : activeCategoryTab} Archive</span>
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {products
              .filter(p => p.group === 'Jewelry')
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

      {/* 5. EXPLORE BY DISCIPLINE (Strict 4 Pillars: Women, Men, Footwear, Jewelry) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[10.5px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37]">
            Department Taxonomy
          </span>
          <h2 className="font-editorial text-3xl text-white font-normal mt-1">
            Explore by Discipline
          </h2>
          <p className="text-xs text-[#8BA496] mt-2">
            Curated disciplines, each backed by handcrafted heirloom pieces and tailored craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {[
            {
              name: "Women's Atelier",
              group: 'Women',
              count: '20 Designs',
              desc: 'Cashmere outerwear, silk evening wear, and fluid tailoring.',
              image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=85&w=1200&auto=format&fit=crop'
            },
            {
              name: "Men's Atelier",
              group: 'Men',
              count: '20 Designs',
              desc: 'Yorkshire wool coats, Sea Island shirting, and pleated flannels.',
              image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=85&w=1200&auto=format&fit=crop'
            },
            {
              name: "Kids & Junior",
              group: 'Kids',
              count: '12 Designs',
              desc: 'Junior cashmere trench coats, fine tailoring, and heirloom knits.',
              image: '/assets/images/kids_duffel_coat_1789410964492.jpg'
            },
            {
              name: 'Footwear Archive',
              group: 'Footwear',
              count: '20 Styles',
              desc: 'Goodyear-welted loafers, Chelsea boots, and evening pumps.',
              image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=85&w=1200&auto=format&fit=crop'
            },
            {
              name: 'Fine Jewelry',
              group: 'Jewelry',
              count: '20 Pieces',
              desc: '18k yellow gold vermeil, pavé signet rings, and Swiss movements.',
              image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=85&w=1200&auto=format&fit=crop'
            }
          ].map(discipline => (
            <div
              key={discipline.name}
              onClick={() => onNavigate('shop', { group: discipline.group })}
              className="group relative aspect-[3/4] overflow-hidden bg-[#07130D] border border-[#183C2A] cursor-pointer rounded-xs hover:border-[#D4AF37] transition-all shadow-lg"
            >
              <img
                src={discipline.image}
                alt={discipline.name}
                referrerPolicy="no-referrer"
                onError={e => handleImageError(e, discipline.group)}
                className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-700 ease-out filter brightness-95 group-hover:brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06110B] via-[#06110B]/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[9px] font-mono-luxury uppercase tracking-[0.18em] text-[#D4AF37] block">
                  {discipline.count}
                </span>
                <h3 className="font-editorial text-2xl font-normal mt-0.5 group-hover:text-[#E5C583] transition-colors">
                  {discipline.name}
                </h3>
                <p className="text-[11px] text-[#9DB4A7] font-sans mt-1 line-clamp-2">
                  {discipline.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CRAFTSMANSHIP & PROVENANCE MANIFESTO */}
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
                Cashmere, Mulberry silk, and virgin wool with zero synthetic blends.
              </p>
            </div>
            <div className="bg-[#07130D] p-4.5 border border-[#183C2A] rounded-xs">
              <span className="font-mono-luxury text-xs text-[#D4AF37]">02</span>
              <h4 className="font-sans font-semibold text-xs text-white mt-2">Limited Batching</h4>
              <p className="text-[11px] text-[#8FA89C] mt-1 leading-relaxed">
                Numbered atelier runs that eliminate overproduction and waste.
              </p>
            </div>
            <div className="bg-[#07130D] p-4.5 border border-[#183C2A] rounded-xs">
              <span className="font-mono-luxury text-xs text-[#D4AF37]">03</span>
              <h4 className="font-sans font-semibold text-xs text-white mt-2">Fair Living Wages</h4>
              <p className="text-[11px] text-[#8FA89C] mt-1 leading-relaxed">
                Direct partnerships with verified artisan master cooperatives in Europe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CRITICAL PRESS REVIEWS */}
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

      {/* 9. THE VELORA GALLERY: FULL-SCREEN INTERACTIVE FASHION ART INSTALLATION */}
      <VeloraGalleryShowcase 
        onNavigate={onNavigate}
        onSelectProduct={onSelectProduct}
      />
    </div>
  );
};
