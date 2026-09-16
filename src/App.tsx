import React, { useState } from 'react';
import { StoreProvider } from './context/StoreContext';
import { ToastContainer } from './components/Toast';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { AuthModal } from './components/AuthModal';
import { Product3DShowcaseModal } from './components/Product3DShowcaseModal';
import { useStore } from './context/StoreContext';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { DashboardPage } from './pages/DashboardPage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutPage } from './pages/AboutPage';
import { AuthPage } from './pages/AuthPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { PrivacyPage, TermsPage } from './pages/LegalPages';
import { Studio3DPage } from './pages/Studio3DPage';

function VeloraApp() {
  const { threeDModalProduct, setThreeDModalProduct } = useStore();
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('vl-trench-01');
  const [shopFilter, setShopFilter] = useState<{
    group?: string;
    cat?: string;
    filter?: string;
    q?: string;
  }>({});

  const handleNavigate = (page: string, params?: Record<string, string>) => {
    if (page === 'shop') {
      setShopFilter({
        group: params?.group,
        cat: params?.cat,
        filter: params?.filter,
        q: params?.q
      });
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSelectProduct = (productId: string) => {
    handleSelectProduct(productId);
  };

  const handleSearchNavigateToShop = (q: string) => {
    handleNavigate('shop', { q });
  };

  return (
    <div id="velora-app-root" className="min-h-screen flex flex-col bg-[#06110B] text-[#FAF9F5] selection:bg-[#D4AF37] selection:text-[#06110B]">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Global Navigation Header */}
      <Header
        activePage={currentPage}
        onNavigate={handleNavigate}
        onSelectProduct={handleSelectProduct}
      />

      {/* Main Page Stage */}
      <main id="main-content" className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            key={JSON.stringify(shopFilter)}
            initialFilter={shopFilter}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'product' && (
          <ProductDetailPage
            productId={selectedProductId}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'studio' && (
          <Studio3DPage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'wishlist' && (
          <WishlistPage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'dashboard' && (
          <DashboardPage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
          />
        )}

        {(currentPage === 'login' || currentPage === 'auth' || currentPage === 'register') && (
          <AuthPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'faq' && (
          <FAQPage />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPage />
        )}

        {currentPage === 'terms' && (
          <TermsPage />
        )}
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer onNavigate={handleNavigate} />

      {/* Live Search Modal */}
      <SearchModal
        onSelectProduct={handleSearchSelectProduct}
        onNavigateToShopWithQuery={handleSearchNavigateToShop}
      />

      {/* Quick View Lightbox Modal */}
      <QuickViewModal onNavigateToProduct={handleSelectProduct} />

      {/* 3D 4K Virtual Studio Turntable Modal */}
      {threeDModalProduct && (
        <Product3DShowcaseModal
          product={threeDModalProduct}
          onClose={() => setThreeDModalProduct(null)}
          onNavigateToProduct={handleSelectProduct}
        />
      )}

      {/* Global Client Authentication Modal */}
      <AuthModal onSuccessNavigate={handleNavigate} />

      {/* Global Luxury Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <VeloraApp />
    </StoreProvider>
  );
}
