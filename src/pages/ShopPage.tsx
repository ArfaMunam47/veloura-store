import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Sparkles, ArrowRight, ArrowLeft, LayoutDashboard } from 'lucide-react';
import { ProductGrid } from '../components/ProductGrid';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { handleImageError } from '../utils/images';

import heroModelImage from '../assets/images/hero_editorial_look_1788344791123.jpg';
import luxuryShoeImage from '../assets/images/luxury_shoe_3d_turntable_1788796193676.jpg';

interface ShopPageProps {
  initialFilter?: {
    group?: string;
    cat?: string;
    filter?: string;
    q?: string;
  };
  onSelectProduct: (productId: string) => void;
  onNavigate?: (page: string, params?: Record<string, string>) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ initialFilter, onSelectProduct, onNavigate }) => {
  const { products, formatPrice } = useStore();

  const [selectedGroup, setSelectedGroup] = useState<string>(initialFilter?.group || 'All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedGenderFilter, setSelectedGenderFilter] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialFilter?.q || '');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Sync state if initialFilter prop changes (e.g. user clicked header nav)
  useEffect(() => {
    if (initialFilter?.group) {
      setSelectedGroup(initialFilter.group);
      setSelectedSubcategory('all');
      setSelectedGenderFilter('all');
    }
    if (initialFilter?.q) {
      setSearchQuery(initialFilter.q);
    }
  }, [initialFilter]);

  // Primary destinations matching core navigation
  const primaryGroups = [
    { label: 'All Archive', value: 'All' },
    { label: 'Women', value: 'Women' },
    { label: 'Men', value: 'Men' },
    { label: 'Kids', value: 'Kids' },
    { label: 'Footwear', value: 'Footwear' },
    { label: 'Jewelry', value: 'Jewelry' }
  ];

  // Editorial Slideshow Config for each section (auto-changes every 2 seconds, at least 6+ complete uncropped pictures each)
  const categoryEditorialMap: Record<string, {
    title: string;
    badge: string;
    description: string;
    countBadge: string;
    slides: { url: string; alt: string; label: string }[];
  }> = {
    Women: {
      title: "Women's Collection",
      badge: "WOMENSWEAR ATELIER",
      description: "Pure architectural silhouette and fluid drape. Handcrafted gabardine coats, silk evening wear, and double-faced cashmere.",
      countBadge: "20 Handcrafted Works",
      slides: [
        {
          url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=85&w=1200&auto=format&fit=crop",
          alt: "Woman in architectural haute trench coat",
          label: "Haute Outerwear"
        },
        {
          url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=85&w=1200&auto=format&fit=crop",
          alt: "Woman in tailored double-breasted wool overcoat",
          label: "Tailored Flannel"
        },
        {
          url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=85&w=1200&auto=format&fit=crop",
          alt: "Woman in mulberry silk evening gown",
          label: "Silk Evening Gown"
        },
        {
          url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=85&w=1200&auto=format&fit=crop",
          alt: "Woman in double-faced cashmere coat",
          label: "Cashmere Atelier"
        },
        {
          url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=85&w=1200&auto=format&fit=crop",
          alt: "High fashion editorial look",
          label: "Runway Silhouette"
        },
        {
          url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=85&w=1200&auto=format&fit=crop",
          alt: "Woman in sculpted atelier tailoring",
          label: "Sculpted Tailoring"
        },
        {
          url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=85&w=1200&auto=format&fit=crop",
          alt: "Flowing silk dress and seasonal attire",
          label: "Draped Silk"
        }
      ]
    },
    Men: {
      title: "Men's Collection",
      badge: "MENSWEAR ATELIER",
      description: "Savile Row tailoring discipline, Yorkshire virgin wool coats, and fine Sea Island cotton shirting.",
      countBadge: "20 Handcrafted Works",
      slides: [
        {
          url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=85&w=1200&auto=format&fit=crop",
          alt: "Man in bespoke British overcoat",
          label: "Savile Row Bespoke"
        },
        {
          url: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=85&w=1200&auto=format&fit=crop",
          alt: "Man in tailored peaked lapel suit",
          label: "Fresco Tailoring"
        },
        {
          url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=85&w=1200&auto=format&fit=crop",
          alt: "Man in heavy cashmere rollneck sweater",
          label: "Cashmere Knitwear"
        },
        {
          url: "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=85&w=1200&auto=format&fit=crop",
          alt: "Man in structured sport coat and trousers",
          label: "Atelier Suiting"
        },
        {
          url: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=85&w=1200&auto=format&fit=crop",
          alt: "Man in tailored classic trench",
          label: "Heritage Trench"
        },
        {
          url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=85&w=1200&auto=format&fit=crop",
          alt: "Man in fine cotton tailored shirting",
          label: "Sea Island Shirting"
        },
        {
          url: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=85&w=1200&auto=format&fit=crop",
          alt: "Man in contemporary relaxed tailoring",
          label: "Modern Silhouette"
        }
      ]
    },
    Kids: {
      title: "Kids & Junior Collection",
      badge: "JUNIOR ATELIER",
      description: "Heirloom craftsmanship for little wardrobes. Handcrafted wooden toy carts, pedal roadsters, rocking horses, and wooden cars.",
      countBadge: "12 Curated Pieces",
      slides: [
        {
          url: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=85&w=1200&auto=format&fit=crop",
          alt: "Vintage Grand Prix red metal model toy car",
          label: "Grand Prix Toy Roadster"
        },
        {
          url: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=85&w=1200&auto=format&fit=crop",
          alt: "Artisan handcrafted miniature toy sports car",
          label: "Artisan Toy Roadster"
        },
        {
          url: "https://images.unsplash.com/photo-1508175800969-525c72a047dd?q=85&w=1200&auto=format&fit=crop",
          alt: "Classic yellow and black die-cast toy car",
          label: "Classic Die-Cast Car"
        },
        {
          url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=85&w=1200&auto=format&fit=crop",
          alt: "Handcrafted wooden toy pull cart with building blocks",
          label: "Heirloom Toy Cart & Blocks"
        },
        {
          url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=85&w=1200&auto=format&fit=crop",
          alt: "Artisan solid wood rocking horse",
          label: "Artisan Rocking Horse"
        },
        {
          url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=85&w=1200&auto=format&fit=crop",
          alt: "Miniature handcrafted wooden railway train locomotive",
          label: "Wooden Railway Engine"
        },
        {
          url: "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?q=85&w=1200&auto=format&fit=crop",
          alt: "Wooden pull wagon with stacking blocks",
          label: "Pull Wagon & Blocks"
        },
        {
          url: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=85&w=1200&auto=format&fit=crop",
          alt: "Organic cotton nursery plush teddy bear",
          label: "Organic Plush Bear"
        }
      ]
    },
    Footwear: {
      title: "Master Footwear Archive",
      badge: "CORDWAINER ATELIER",
      description: "Goodyear-welted French boxcalf loafers, hand-burnished Chelsea boots, and sculpted Italian evening pumps.",
      countBadge: "20 Handcrafted Pairs",
      slides: [
        {
          url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=85&w=1200&auto=format&fit=crop",
          alt: "Sculptural Italian evening stiletto heels",
          label: "Sculpted Evening Stiletto"
        },
        {
          url: "https://images.unsplash.com/photo-1516651000622-7f32fe80a57a?q=85&w=1200&auto=format&fit=crop",
          alt: "Aurelia pointed stiletto high heels",
          label: "Pointed Stiletto Heels"
        },
        {
          url: "https://images.unsplash.com/photo-1468078809804-4c7b3e60a478?q=85&w=1200&auto=format&fit=crop",
          alt: "Luxury Italian stiletto high heel pumps",
          label: "Luxury Stiletto Pumps"
        },
        {
          url: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=85&w=1200&auto=format&fit=crop",
          alt: "Master cordwainer handcrafted Oxford shoes",
          label: "Goodyear Oxford"
        },
        {
          url: "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=85&w=1200&auto=format&fit=crop",
          alt: "Burnished calfskin Chelsea dress boots",
          label: "Chelsea Dress Boot"
        },
        {
          url: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=85&w=1200&auto=format&fit=crop",
          alt: "Fine leather penny loafers",
          label: "Boxcalf Penny Loafer"
        },
        {
          url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=85&w=1200&auto=format&fit=crop",
          alt: "Minimalist Italian calfskin sneakers",
          label: "Artisan Low Sneakers"
        }
      ]
    },
    Jewelry: {
      title: "Fine Jewelry & Horology",
      badge: "HAUTE JOAILLERIE",
      description: "18k yellow gold vermeil, conflict-free diamond pavé, and COSC-certified Swiss mechanical chronometry.",
      countBadge: "21 Rare Creations",
      slides: [
        {
          url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=85&w=1200&auto=format&fit=crop",
          alt: "Diamond pavé solitaire necklace",
          label: "Pavé Solitaire"
        },
        {
          url: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=85&w=1200&auto=format&fit=crop",
          alt: "18k gold vermeil signet ring and cuff",
          label: "Vermeil Signet & Cuff"
        },
        {
          url: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=85&w=1200&auto=format&fit=crop",
          alt: "COSC manufacture mechanical timepiece",
          label: "Manufacture Chronometer"
        },
        {
          url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=85&w=1200&auto=format&fit=crop",
          alt: "Sculptural fine earrings with pearls",
          label: "Sculptural Pearl Drops"
        },
        {
          url: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=85&w=1200&auto=format&fit=crop",
          alt: "Hand-engraved gold pendant necklace",
          label: "Engraved Gold Locket"
        },
        {
          url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=85&w=1200&auto=format&fit=crop",
          alt: "Brilliant cut solitaire diamond ring",
          label: "Pavé Diamond Solitaire"
        },
        {
          url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=85&w=1200&auto=format&fit=crop",
          alt: "Fine jewelry gemological stones and gold rings",
          label: "Haute Gemological Suite"
        }
      ]
    },
    All: {
      title: "Atelier Archive",
      badge: "COMPLETE REPERTOIRE",
      description: "Discover our full wardrobe spanning womenswear, menswear, junior atelier, footwear, and fine jewelry.",
      countBadge: "93 Curated Creations",
      slides: [
        {
          url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=85&w=1200&auto=format&fit=crop",
          alt: "Womenswear collection editorial",
          label: "Womenswear Atelier"
        },
        {
          url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=85&w=1200&auto=format&fit=crop",
          alt: "Menswear bespoke tailoring",
          label: "Menswear Atelier"
        },
        {
          url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=85&w=1200&auto=format&fit=crop",
          alt: "Kids and Junior collection toy cart",
          label: "Junior Atelier"
        },
        {
          url: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=85&w=1200&auto=format&fit=crop",
          alt: "Master footwear cordwaining",
          label: "Footwear Archive"
        },
        {
          url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=85&w=1200&auto=format&fit=crop",
          alt: "Haute joaillerie and horology",
          label: "Fine Jewelry"
        },
        {
          url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=85&w=1200&auto=format&fit=crop",
          alt: "Junior handcrafted wooden rocking horse",
          label: "Heirloom Toys"
        },
        {
          url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=85&w=1200&auto=format&fit=crop",
          alt: "Artisan handcrafted calfskin leather bag",
          label: "Leather Goods Archive"
        }
      ]
    }
  };

  const activeExperience = categoryEditorialMap[selectedGroup] || categoryEditorialMap.All;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Reset slide index when category changes
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [selectedGroup]);

  // Rotate picture every 2 seconds (2000ms) automatically
  useEffect(() => {
    const totalSlides = activeExperience.slides.length;
    if (totalSlides <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % totalSlides);
    }, 2000);

    return () => clearInterval(timer);
  }, [activeExperience.slides.length, selectedGroup]);

  // STRICT category data logic ensuring 100% product visibility and separation
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // 1. Group-level filtering
      if (selectedGroup === 'Women') {
        if (p.group !== 'Women') return false;
      } else if (selectedGroup === 'Men') {
        if (p.group !== 'Men') return false;
      } else if (selectedGroup === 'Kids') {
        if (p.group !== 'Kids') return false;
      } else if (selectedGroup === 'Footwear') {
        if (p.group !== 'Footwear') return false;
      } else if (selectedGroup === 'Jewelry') {
        if (p.group !== 'Jewelry') return false;
      }

      // 2. Initial filter flags (New drops / Best sellers)
      if (initialFilter?.filter === 'new' && !p.isNew) return false;
      if (initialFilter?.filter === 'bestseller' && !p.isBestSeller) return false;

      // 3. Search query match
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

      // 4. Price range filter
      if (priceRange === 'under300' && p.price >= 300) return false;
      if (priceRange === '300to600' && (p.price < 300 || p.price > 600)) return false;
      if (priceRange === 'over600' && p.price <= 600) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default
    });
  }, [products, selectedGroup, initialFilter, searchQuery, priceRange, sortBy]);

  const clearFilters = () => {
    setSelectedGroup('All');
    setSelectedSubcategory('all');
    setSelectedGenderFilter('all');
    setPriceRange('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div id="shop-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 text-[#FAF9F5] bg-[#06110B]">

      {/* ------------------------------------------------------------- */}
      {/* 0. NAVIGATION BAR: BACK TO MAIN WEBSITE & DASHBOARD           */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#143323]">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate?.('home')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0C2218] hover:bg-[#153B2B] text-[#E5C583] hover:text-white border border-[#1E4A35] hover:border-[#D4AF37] rounded-xs text-xs font-mono-luxury uppercase tracking-[0.14em] transition-all group shadow-sm cursor-pointer"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Main Website</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('dashboard')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#081710] hover:bg-[#0E271C] text-[#8EA79B] hover:text-[#E5C583] border border-[#173827] rounded-xs text-xs font-mono-luxury uppercase tracking-wider transition-all cursor-pointer"
          >
            <LayoutDashboard size={12} />
            <span className="hidden sm:inline">Client Dashboard</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-luxury text-[#6E8A7B]">
          <button
            type="button"
            onClick={() => onNavigate?.('home')}
            className="hover:text-[#E5C583] transition-colors cursor-pointer"
          >
            Velora Main
          </button>
          <span>/</span>
          <span className="text-[#D4AF37]">{selectedGroup === 'All' ? 'Atelier Archive' : `${selectedGroup} Section`}</span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. ART-DIRECTED CATEGORY EDITORIAL BANNER WITH 2S SLIDESHOW   */}
      {/* ------------------------------------------------------------- */}
      <div className="relative mb-8 rounded-xs overflow-hidden border border-[#173E2B] bg-[#081B12] shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[300px] sm:min-h-[360px]">
          {/* Left Editorial Copy - Clean, modern, uncluttered */}
          <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between z-10 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono-luxury uppercase tracking-[0.24em] text-[#D4AF37] font-semibold">
                  {activeExperience.badge}
                </span>
                <span className="text-[#1D4A34] text-xs">•</span>
                <span className="text-[10px] font-mono-luxury uppercase tracking-wider text-[#7E998C]">
                  {activeExperience.countBadge}
                </span>
              </div>
              <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-tight">
                {activeExperience.title}
              </h1>
              <p className="text-xs sm:text-[13px] text-[#9CB4A7] font-sans leading-relaxed max-w-lg mt-2">
                {activeExperience.description}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono-luxury bg-[#0D2418] border border-[#1B432F] text-[#E5C583]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                  <span>2s Auto Rotation</span>
                </span>
                <span className="text-[10.5px] font-mono-luxury text-[#688576]">
                  Slide {currentSlideIndex + 1} of {activeExperience.slides.length}: {activeExperience.slides[currentSlideIndex]?.label}
                </span>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate?.('home')}
                  className="text-[11.5px] font-mono-luxury text-[#A6C0B2] hover:text-[#E5C583] underline underline-offset-4 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>← Return to Main Website</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Editorial Hero Exhibition Picture Frame (Uniform frame across all sections, real product imagery) */}
          <div className="md:col-span-5 relative bg-[#05120B] p-4 sm:p-6 flex items-center justify-center border-t md:border-t-0 md:border-l border-[#173E2B]">
            {/* Standardized Architectural Picture Frame */}
            <div className="relative w-full aspect-[4/3] max-w-[460px] mx-auto rounded-xs overflow-hidden border border-[#234F38] bg-[#030A06] shadow-2xl p-2.5">
              {/* Gold Corner Precision Accents */}
              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#D4AF37]/70 pointer-events-none z-30" />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#D4AF37]/70 pointer-events-none z-30" />
              <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#D4AF37]/70 pointer-events-none z-30" />
              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#D4AF37]/70 pointer-events-none z-30" />

              {/* Inner Picture Matting Canvas */}
              <div className="relative w-full h-full overflow-hidden rounded-xs bg-[#07150E] flex items-center justify-center">
                {activeExperience.slides.map((slide, idx) => (
                  <div
                    key={slide.url}
                    className={`absolute inset-0 flex items-center justify-center p-2 transition-opacity duration-700 ease-in-out ${
                      idx === currentSlideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    {/* Atmospheric Ambient Blur Glow */}
                    <img
                      src={slide.url}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-25 scale-115 pointer-events-none"
                    />

                    {/* Exact Uniform Picture Frame - Complete, Pristine, Uncut View */}
                    <img
                      src={slide.url}
                      alt={slide.alt}
                      referrerPolicy="no-referrer"
                      onError={e => handleImageError(e, selectedGroup)}
                      className="relative z-10 max-h-full max-w-full object-contain filter brightness-100 contrast-105 rounded-xs drop-shadow-lg"
                    />

                    {/* Gallery Glass Border Overlay */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none z-20" />
                  </div>
                ))}
              </div>

              {/* Museum Label Plaque */}
              <div className="absolute top-3 left-3 z-30 bg-[#06110B]/90 backdrop-blur-md px-2.5 py-1 rounded-xs border border-[#1E4A35] text-[9px] font-mono-luxury tracking-widest text-[#E5C583] uppercase flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                <span>{activeExperience.slides[currentSlideIndex]?.label}</span>
              </div>

              {/* Slide Navigation Indicators */}
              <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1 bg-[#06110B]/90 backdrop-blur-md px-2 py-1 rounded-full border border-[#1A422F]">
                {activeExperience.slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`transition-all rounded-full cursor-pointer ${
                      idx === currentSlideIndex
                        ? 'w-4 h-1.5 bg-[#D4AF37]'
                        : 'w-1.5 h-1.5 bg-[#2B543D] hover:bg-[#8EA79B]'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. PRIMARY DESTINATIONS PILLS (Strict Category Navigation)    */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {primaryGroups.map(g => (
          <button
            key={g.value}
            type="button"
            onClick={() => {
              setSelectedGroup(g.value);
              setSelectedSubcategory('all');
              setSelectedGenderFilter('all');
            }}
            className={`px-5 py-2 text-xs uppercase tracking-[0.16em] font-sans transition-all rounded-xs border cursor-pointer ${
              selectedGroup === g.value
                ? 'bg-[#153E2A] text-[#E5C583] border-[#D4AF37] font-bold shadow-xs'
                : 'bg-[#0A1C14] text-[#8EA79B] border-[#183C2A] hover:border-[#D4AF37]/50 hover:text-white'
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. CONTROLS BAR: Search, Price, Sort & Active Results Count   */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#0A1C14] border border-[#163625] p-3.5 sm:p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 rounded-xs shadow-md">
        {/* Search Field */}
        <div className="relative w-full md:w-80">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7E998C]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={`Search ${selectedGroup === 'All' ? 'archive' : selectedGroup}...`}
            className="w-full pl-9 pr-8 py-2 bg-[#07130D] border border-[#183D2C] text-xs text-white placeholder:text-[#6C8578] focus:outline-hidden focus:border-[#D4AF37] rounded-xs font-sans"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7E998C] hover:text-white cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Controls Cluster */}
        <div className="flex flex-wrap items-center justify-between w-full md:w-auto gap-3">
          {/* Price Range Filter */}
          <div className="flex items-center gap-1.5 text-xs font-mono-luxury">
            <span className="text-[#7E998C]">Price:</span>
            <select
              value={priceRange}
              onChange={e => setPriceRange(e.target.value)}
              className="bg-[#07130D] border border-[#183D2C] py-2 px-3 text-xs text-[#E5C583] focus:outline-hidden focus:border-[#D4AF37] cursor-pointer rounded-xs"
            >
              <option value="all">All Prices</option>
              <option value="under300">Under {formatPrice(300)}</option>
              <option value="300to600">{formatPrice(300)} - {formatPrice(600)}</option>
              <option value="over600">Over {formatPrice(600)}</option>
            </select>
          </div>

          {/* Sort By Filter */}
          <div className="flex items-center gap-1.5 text-xs font-mono-luxury">
            <span className="text-[#7E998C]">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-[#07130D] border border-[#183D2C] py-2 px-3 text-xs text-[#E5C583] focus:outline-hidden focus:border-[#D4AF37] cursor-pointer rounded-xs"
            >
              <option value="featured">Featured Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="new">New Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filters Pill Bar & Results Count */}
      <div className="flex items-center justify-between text-xs text-[#8BA496] mb-6 pb-2 border-b border-[#143323] font-mono-luxury">
        <div className="flex items-center gap-2">
          <span>Displaying:</span>
          <span className="text-[#FAF9F5] font-semibold">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Creation' : 'Creations'}
          </span>
          {selectedGroup !== 'All' && (
            <span className="bg-[#0E261B] text-[#D4AF37] px-2 py-0.5 border border-[#1D4732] rounded-xs text-[10px]">
              {selectedGroup}
            </span>
          )}
          {selectedSubcategory !== 'all' && (
            <span className="bg-[#123624] text-[#E5C583] px-2 py-0.5 border border-[#1F4A34] rounded-xs text-[10px]">
              {selectedSubcategory}
            </span>
          )}
        </div>

        {(searchQuery || priceRange !== 'all' || selectedGroup !== 'All' || selectedSubcategory !== 'all' || selectedGenderFilter !== 'all') && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-[#D4AF37] hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
          >
            <X size={12} />
            <span>Reset Category View</span>
          </button>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. PRODUCT SHOWCASE GRID                                      */}
      {/* ------------------------------------------------------------- */}
      <ProductGrid
        products={filteredProducts}
        onSelectProduct={onSelectProduct}
        onClearFilters={clearFilters}
        emptyMessage={`No items found matching the selected criteria in ${selectedGroup}.`}
      />
    </div>
  );
};
