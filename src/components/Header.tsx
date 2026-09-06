import React, { useState, useEffect } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CurrencyCode } from '../types';

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onSelectProduct?: (productId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const {
    getCartCount,
    currency,
    setCurrency,
    setCartDrawerOpen,
    setSearchModalOpen,
    openAuthModal,
    user,
    logout
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categoriesHover, setCategoriesHover] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currencies: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'CAD', 'JPY'];

  const navCategories = [
    {
      label: 'Women',
      page: 'shop',
      params: { group: 'Women' },
      featured: [
        { name: 'Outerwear & Trench', cat: 'women-outerwear' },
        { name: 'Tailored Blazers', cat: 'women-blazers' },
        { name: 'Silk Slip Dresses', cat: 'women-dresses' },
        { name: 'Pure Cashmere', cat: 'women-knitwear' }
      ]
    },
    {
      label: 'Men',
      page: 'shop',
      params: { group: 'Men' },
      featured: [
        { name: 'Overcoats & Tailoring', cat: 'men-outerwear' },
        { name: 'Minimal Zip Blousons', cat: 'men-jackets' },
        { name: 'Normandy Linen Shirts', cat: 'men-shirts' },
        { name: 'Zegna Merino Knitwear', cat: 'men-knitwear' }
      ]
    },
    {
      label: 'Footwear',
      page: 'shop',
      params: { group: 'Footwear' },
      featured: [
        { name: 'Chelsea Boots', cat: 'women-footwear' },
        { name: 'Goodyear Oxford Derbies', cat: 'men-footwear' },
        { name: 'Minimal Court Sneakers', cat: 'men-footwear' },
        { name: 'Sloane Penny Loafers', cat: 'acc-footwear' }
      ]
    },
    {
      label: 'Fine Jewelry',
      page: 'shop',
      params: { group: 'Jewelry' },
      featured: [
        { name: 'Architectural Vermeil Cuffs', cat: 'acc-jewelry' },
        { name: 'Pavé Diamond Signet Rings', cat: 'acc-jewelry' },
        { name: 'Twisted 18k Rope Chains', cat: 'acc-jewelry' },
        { name: 'Swiss Heritage Timepieces', cat: 'acc-watches' }
      ]
    },
    {
      label: 'Bags & Leather',
      page: 'shop',
      params: { group: 'Accessories', cat: 'acc-bags' }
    },
    {
      label: 'Atelier',
      page: 'about'
    }
  ];

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 font-sans ${
        scrolled
          ? 'bg-[#06120C]/95 backdrop-blur-md border-b border-[#1A3F2E] shadow-[0_8px_24px_rgba(0,0,0,0.5)] py-2.5'
          : 'bg-[#07150E] border-b border-[#153424] py-3'
      }`}
    >
      {/* 1. MINIMAL TOP ANNOUNCEMENT BAR */}
      <div className="border-b border-[#153424]/60 pb-1.5 mb-2 text-[10.5px] font-mono-luxury tracking-widest text-[#8FA89C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] inline-block" />
            <span className="text-[#C6D8CE] font-medium tracking-wider">
              COMPLIMENTARY INSURED WORLDWIDE DELIVERY & ARCHIVE CARE
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-5">
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-[#D4AF37] transition-colors"
            >
              VIP Concierge
            </button>
            <span className="text-[#254F38]">•</span>
            {/* Currency Selector */}
            <div className="relative">
              <button
                id="currency-dropdown-toggle"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-[11px] text-[#D4AF37] bg-[#0E2419] px-2 py-0.5 border border-[#1F4C36] rounded-xs hover:border-[#D4AF37]/60 transition-colors"
              >
                <span>{currency}</span>
                <ChevronDown size={11} strokeWidth={1.5} />
              </button>
              {currencyDropdownOpen && (
                <div
                  id="currency-dropdown-menu"
                  className="absolute right-0 top-full mt-1.5 bg-[#0B1C13] border border-[#214F38] shadow-2xl py-1 z-50 min-w-[90px] rounded-xs"
                  onMouseLeave={() => setCurrencyDropdownOpen(false)}
                >
                  {currencies.map(c => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-1.5 text-[11px] font-mono-luxury transition-colors ${
                        currency === c
                          ? 'bg-[#143B28] text-[#D4AF37] font-bold'
                          : 'text-[#9BB3A6] hover:bg-[#102C1E] hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION ROW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Mobile Toggle & Clean Desktop Categories */}
        <div className="flex items-center gap-6">
          <button
            id="mobile-menu-button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-1 -ml-1 text-[#FAF9F5] hover:text-[#D4AF37] transition-colors lg:hidden"
            aria-label="Open Navigation"
          >
            <Menu size={22} strokeWidth={1.6} />
          </button>

          {/* Desktop Nav Links - Clean, Uncluttered */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navCategories.map(link => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => setCategoriesHover(link.label)}
                onMouseLeave={() => setCategoriesHover(null)}
              >
                <button
                  onClick={() => onNavigate(link.page, link.params)}
                  className={`text-[12px] tracking-[0.16em] uppercase font-sans py-1.5 transition-all flex items-center gap-1 ${
                    activePage === link.page &&
                    (!link.params ||
                      (link.params.group === 'All' && activePage === 'shop'))
                      ? 'text-[#D4AF37] font-medium border-b border-[#D4AF37]'
                      : 'text-[#B8CEC3] hover:text-[#FAF9F5]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.featured && (
                    <ChevronDown size={10} className="opacity-60 group-hover:rotate-180 transition-transform" />
                  )}
                </button>

                {/* Micro Flyout on Hover */}
                {link.featured && categoriesHover === link.label && (
                  <div className="absolute left-0 top-full pt-2 z-50 min-w-[210px]">
                    <div className="bg-[#0A1A12] border border-[#1F4E37] p-3 shadow-2xl rounded-xs backdrop-blur-md">
                      <div className="text-[10px] font-mono-luxury uppercase tracking-wider text-[#D4AF37] pb-1.5 mb-1.5 border-b border-[#183D2B]">
                        {link.label} Collection
                      </div>
                      <div className="space-y-1">
                        {link.featured.map(sub => (
                          <button
                            key={sub.name}
                            onClick={() => {
                              setCategoriesHover(null);
                              onNavigate('shop', { group: link.label, cat: sub.cat });
                            }}
                            className="w-full text-left px-2 py-1.5 text-xs text-[#9BB3A6] hover:text-white hover:bg-[#123122] transition-colors rounded-xs flex items-center justify-between"
                          >
                            <span>{sub.name}</span>
                            <ArrowRight size={10} className="text-[#D4AF37] opacity-0 hover:opacity-100" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Center: Brand Logo */}
        <div
          id="brand-logo"
          className="text-center cursor-pointer select-none py-1 group"
          onClick={() => onNavigate('home')}
        >
          <span className="font-editorial text-2xl sm:text-3xl tracking-[0.24em] uppercase font-normal text-white group-hover:text-[#E5C583] transition-colors block">
            VELORA
          </span>
          <span className="hidden sm:block text-[8px] font-mono-luxury tracking-[0.3em] uppercase text-[#D4AF37]/90 -mt-0.5">
            HAUTE ATELIER
          </span>
        </div>

        {/* Right: Actions Cluster */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Search Button */}
          <button
            id="search-button"
            onClick={() => setSearchModalOpen(true)}
            className="p-1.5 text-[#B8CEC3] hover:text-[#D4AF37] transition-colors"
            aria-label="Search Collection"
          >
            <Search size={18} strokeWidth={1.6} />
          </button>

          {/* Wishlist Button - Clean heart icon with NO badge count */}
          <button
            id="wishlist-button"
            onClick={() => onNavigate('wishlist')}
            className="p-1.5 text-[#B8CEC3] hover:text-[#D4AF37] transition-colors"
            aria-label="Wishlist"
          >
            <Heart size={18} strokeWidth={1.6} />
          </button>

          {/* User Account or Proper Sign In / Sign Up */}
          <div className="relative">
            {user ? (
              <div className="relative">
                <button
                  id="account-button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="p-1.5 text-[#FAF9F5] hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 border border-[#1A422F] bg-[#0A1C14] px-2.5 py-1 rounded-xs"
                  aria-label="My Account"
                >
                  <User size={14} className="text-[#D4AF37]" />
                  <span className="text-xs font-medium text-white max-w-[85px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown size={11} className="text-[#7E998C]" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 bg-[#0A1A12] border border-[#1F4E37] shadow-2xl py-2 z-50 min-w-[180px] rounded-xs"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-3.5 py-2 border-b border-[#183D2B] mb-1">
                      <p className="text-xs font-medium text-white truncate">{user.name}</p>
                      <p className="text-[10px] text-[#7E998C] truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('dashboard');
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-[#B8CEC3] hover:text-white hover:bg-[#123122] flex items-center gap-2 transition-colors"
                    >
                      <User size={13} />
                      <span>Atelier Orders</span>
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-[#EF4444] hover:bg-[#123122] flex items-center gap-2 transition-colors"
                    >
                      <LogOut size={13} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  id="nav-signin-button"
                  onClick={() => openAuthModal('signin')}
                  className="text-xs uppercase tracking-[0.14em] font-sans text-[#FAF9F5] hover:text-[#D4AF37] transition-colors py-1 px-2 font-medium"
                >
                  Sign In
                </button>
                <span className="text-[#204934] text-xs select-none">/</span>
                <button
                  id="nav-signup-button"
                  onClick={() => openAuthModal('register')}
                  className="text-xs uppercase tracking-[0.14em] font-sans text-[#D4AF37] hover:text-[#FAF9F5] border border-[#D4AF37]/45 hover:border-[#D4AF37] bg-[#0A1C14] hover:bg-[#132E20] transition-all py-1 px-2.5 rounded-xs font-semibold shadow-xs"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Cart Bag Drawer Trigger */}
          <button
            id="cart-drawer-button"
            onClick={() => setCartDrawerOpen(true)}
            className="flex items-center gap-1.5 py-1.5 px-3 bg-[#D4AF37] text-[#08150F] hover:bg-[#E5C583] transition-colors font-medium rounded-xs shadow-[0_4px_15px_rgba(212,175,55,0.25)]"
            aria-label="Shopping Bag"
          >
            <ShoppingBag size={15} strokeWidth={2} />
            <span className="text-[12px] font-mono-luxury font-bold">
              {getCartCount()}
            </span>
          </button>
        </div>
      </div>

      {/* 3. CLEAN MOBILE SLIDE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#07150E] border-r border-[#1B4230] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-50">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#183D2B]">
                <div>
                  <span className="font-editorial text-2xl font-normal tracking-[0.2em] text-white">
                    VELORA
                  </span>
                  <span className="block text-[8.5px] font-mono-luxury tracking-widest text-[#D4AF37]">
                    HAUTE ATELIER
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#9BB3A6] hover:text-white"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Auth Quick Buttons if Guest */}
              {!user && (
                <div className="grid grid-cols-2 gap-2 mt-4 pb-4 border-b border-[#143324]">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('signin');
                    }}
                    className="py-2 text-center text-xs uppercase tracking-wider font-sans text-[#FAF9F5] border border-[#1A422F] bg-[#0A1C14] hover:border-[#D4AF37] rounded-xs"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('register');
                    }}
                    className="py-2 text-center text-xs uppercase tracking-wider font-sans font-semibold text-[#07150E] bg-[#D4AF37] hover:bg-[#E5C583] rounded-xs shadow-xs"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Nav Links List */}
              <nav className="mt-5 space-y-3">
                {navCategories.map(link => (
                  <div key={link.label} className="border-b border-[#143324] pb-2">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate(link.page, link.params);
                      }}
                      className="block w-full text-left text-xs font-sans uppercase tracking-[0.16em] text-white py-1 hover:text-[#D4AF37] font-medium"
                    >
                      {link.label}
                    </button>
                    {link.featured && (
                      <div className="pl-3 mt-1 space-y-1">
                        {link.featured.map(sub => (
                          <button
                            key={sub.name}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              onNavigate('shop', { group: link.label, cat: sub.cat });
                            }}
                            className="block w-full text-left text-[11px] text-[#8EA698] hover:text-white py-0.5"
                          >
                            • {sub.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="border-b border-[#143324] pb-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate('wishlist');
                    }}
                    className="block w-full text-left text-xs font-sans uppercase tracking-[0.16em] text-white py-1 hover:text-[#D4AF37] font-medium"
                  >
                    Wishlist
                  </button>
                </div>
              </nav>
            </div>

            {/* Mobile Footer Area */}
            <div className="pt-6 border-t border-[#183D2B] space-y-3">
              {/* Currency Selector Mobile */}
              <div className="flex items-center justify-between text-xs text-[#8EA698] pb-2">
                <span>Currency:</span>
                <div className="flex gap-1.5">
                  {currencies.map(c => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`px-1.5 py-0.5 text-[10px] font-mono-luxury rounded-xs ${
                        currency === c
                          ? 'bg-[#D4AF37] text-[#0A1811] font-bold'
                          : 'bg-[#0E2419] text-[#9BB3A6]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {user && (
                <div className="space-y-2">
                  <div className="text-xs text-[#8EA698]">
                    Welcome, <b className="text-white">{user.name}</b>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate('dashboard');
                    }}
                    className="w-full py-2 px-3 bg-[#0F281B] text-[#D4AF37] border border-[#224F38] text-xs uppercase tracking-wider text-center font-medium"
                  >
                    My Account & Orders
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full py-2 px-3 border border-[#234A35] text-[#EF4444] text-xs uppercase tracking-wider text-center"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
