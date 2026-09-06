import React, { useState } from 'react';
import { Package, User, Heart, Truck, LogOut } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { handleImageError } from '../utils/images';

interface DashboardPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onSelectProduct: (id: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, onSelectProduct }) => {
  const {
    user,
    orders,
    wishlist,
    formatPrice,
    getProductById,
    showToast,
    logout,
    setAuthModalOpen
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile'>('orders');

  // If not logged in, show a clean, friendly sign in card
  if (!user) {
    return (
      <div id="dashboard-guest" className="max-w-md mx-auto px-4 py-20 text-center text-[#FAF9F5] bg-[#06110B]">
        <div className="bg-[#0A1C14] border border-[#183C2A] p-8 rounded-xs shadow-xl">
          <div className="w-14 h-14 bg-[#06110B] border border-[#183C2A] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
            <User size={24} strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37] block mb-1">
            Velora Passport
          </span>
          <h1 className="font-editorial text-3xl text-white mb-2 font-normal">
            Client Account
          </h1>
          <p className="text-xs sm:text-sm text-[#9DB4A7] mb-6 leading-relaxed">
            Please sign in to view your orders, bespoke tailoring requests, and wardrobe archive.
          </p>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="w-full py-3 bg-[#D4AF37] hover:bg-[#E5C583] text-[#06110B] text-xs font-sans uppercase tracking-[0.16em] font-bold transition-colors mb-3 rounded-xs shadow-md"
          >
            Sign In / Register
          </button>
          <button
            onClick={() => onNavigate('shop')}
            className="w-full py-2.5 border border-[#183C2A] text-white hover:border-[#D4AF37] hover:text-[#D4AF37] text-xs font-sans uppercase tracking-wider transition-colors rounded-xs"
          >
            Explore Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="dashboard-page" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-[#FAF9F5] bg-[#06110B]">
      {/* Top Banner */}
      <div className="bg-[#0A1C14] p-6 sm:p-8 border border-[#183C2A] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xs shadow-xl">
        <div>
          <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37] block mb-1">
            Private Client Portal
          </span>
          <h1 className="font-editorial text-2xl sm:text-3xl text-white font-normal">
            Welcome, {user.name}
          </h1>
          <p className="text-xs text-[#9DB4A7] mt-0.5">
            {user.email}
          </p>
        </div>
        <button
          onClick={() => {
            logout();
            onNavigate('home');
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 border border-[#183C2A] hover:bg-[#132A1E] text-xs font-sans text-[#9DB4A7] hover:text-white self-start sm:self-auto transition-colors rounded-xs"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#183C2A] mb-8 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 text-xs uppercase tracking-wider font-mono-luxury flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'orders'
              ? 'border-[#D4AF37] text-[#D4AF37] font-semibold'
              : 'border-transparent text-[#9DB4A7] hover:text-white'
          }`}
        >
          <Package size={14} />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`px-4 py-2.5 text-xs uppercase tracking-wider font-mono-luxury flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'wishlist'
              ? 'border-[#D4AF37] text-[#D4AF37] font-semibold'
              : 'border-transparent text-[#9DB4A7] hover:text-white'
          }`}
        >
          <Heart size={14} />
          <span>Wardrobe Archive ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 text-xs uppercase tracking-wider font-mono-luxury flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-[#D4AF37] text-[#D4AF37] font-semibold'
              : 'border-transparent text-[#9DB4A7] hover:text-white'
          }`}
        >
          <User size={14} />
          <span>Profile Info</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-[#0A1C14] border border-[#183C2A] p-6 rounded-xs">
              <Package size={32} strokeWidth={1.2} className="mx-auto mb-2 text-[#D4AF37]" />
              <p className="text-base font-medium text-white mb-1">No orders yet</p>
              <p className="text-xs text-[#9DB4A7] mb-4">When you place an order, it will appear here with live tracking updates.</p>
              <button
                onClick={() => onNavigate('shop')}
                className="px-6 py-2.5 bg-[#D4AF37] text-[#06110B] hover:bg-[#E5C583] text-xs uppercase tracking-wider font-bold rounded-xs shadow-sm transition-colors"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-[#0A1C14] border border-[#183C2A] p-5 space-y-4 rounded-xs shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#183C2A] gap-2">
                    <div>
                      <span className="text-xs font-mono-luxury font-medium text-[#E5C583]">
                        Order #{order.id}
                      </span>
                      <span className="text-xs text-[#9DB4A7] ml-2">• Placed {order.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono-luxury font-bold text-white">
                        Total: {formatPrice(order.total)}
                      </span>
                      <span className="px-2.5 py-0.5 bg-[#132A1E] border border-[#183C2A] text-[#D4AF37] text-[11px] font-mono-luxury uppercase font-medium rounded-xs">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Delivery Status */}
                  <div className="bg-[#06110B] p-3 text-xs flex items-center gap-2 border border-[#183C2A] rounded-xs text-[#9DB4A7]">
                    <Truck size={16} className="text-[#D4AF37]" />
                    <span>
                      Estimated Delivery: <strong className="text-white">{order.estimatedDelivery}</strong> ({order.courier || 'DHL Express'})
                    </span>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3">
                    {order.items.map((item, idx) => {
                      const product = getProductById(item.productId);
                      const imgSrc = item.image || product?.images[0] || 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop';
                      return (
                        <div key={idx} className="flex gap-3 items-center">
                          <img
                            src={imgSrc}
                            alt={item.productName || product?.name || 'Product'}
                            className="w-12 aspect-[3/4] object-cover border border-[#183C2A] bg-black/40 rounded-xs"
                            referrerPolicy="no-referrer"
                            onError={e => handleImageError(e, product?.category || 'garment')}
                          />
                          <div className="flex-1 text-xs">
                            <h4
                              onClick={() => onSelectProduct(item.productId)}
                              className="font-medium text-white hover:text-[#E5C583] cursor-pointer transition-colors"
                            >
                              {item.productName || product?.name || 'Item'}
                            </h4>
                            <p className="text-[#9DB4A7] text-[11px]">
                              Size {item.size} • Qty {item.quantity}
                            </p>
                          </div>
                          <span className="text-xs font-mono-luxury font-medium text-[#E5C583]">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'wishlist' && (
        <div>
          {wishlist.length === 0 ? (
            <div className="text-center py-16 bg-[#0A1C14] border border-[#183C2A] p-6 rounded-xs">
              <Heart size={32} strokeWidth={1.2} className="mx-auto mb-2 text-[#D4AF37]" />
              <p className="text-base font-medium text-white mb-1">Your wardrobe archive is empty</p>
              <p className="text-xs text-[#9DB4A7] mb-4">Click the bookmark or heart icon on any piece to save it here.</p>
              <button
                onClick={() => onNavigate('shop')}
                className="px-6 py-2.5 bg-[#D4AF37] text-[#06110B] hover:bg-[#E5C583] text-xs uppercase tracking-wider font-bold rounded-xs shadow-sm transition-colors"
              >
                Explore Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishlist.map(id => {
                const product = getProductById(id);
                if (!product) return null;
                return (
                  <div key={id} className="bg-[#0A1C14] border border-[#183C2A] p-3 flex flex-col justify-between rounded-xs group">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      onError={e => handleImageError(e, product.category)}
                      className="w-full aspect-[3/4] object-cover mb-2 cursor-pointer bg-black/40 border border-[#183C2A] rounded-xs group-hover:border-[#D4AF37] transition-colors"
                      onClick={() => onSelectProduct(product.id)}
                    />
                    <div>
                      <h4
                        onClick={() => onSelectProduct(product.id)}
                        className="text-xs font-medium text-white line-clamp-1 hover:text-[#E5C583] cursor-pointer transition-colors"
                      >
                        {product.name}
                      </h4>
                      <p className="text-xs font-mono-luxury font-medium text-[#E5C583] mt-1">
                        {formatPrice(product.price)}
                      </p>
                      <button
                        onClick={() => onSelectProduct(product.id)}
                        className="mt-2 w-full py-1.5 bg-[#D4AF37] text-[#06110B] hover:bg-[#E5C583] text-[11px] uppercase tracking-wider font-bold rounded-xs transition-colors"
                      >
                        View Piece
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="bg-[#0A1C14] border border-[#183C2A] p-6 max-w-lg space-y-4 rounded-xs shadow-xl">
          <h2 className="text-base font-semibold text-white">Account Details</h2>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[#9DB4A7] block">Full Name:</span>
              <span className="text-sm font-medium text-white">{user.name}</span>
            </div>
            <div>
              <span className="text-[#9DB4A7] block">Email Address:</span>
              <span className="text-sm font-medium text-white">{user.email}</span>
            </div>
            {user.phone && (
              <div>
                <span className="text-[#9DB4A7] block">Phone Number:</span>
                <span className="text-sm font-medium text-white">{user.phone}</span>
              </div>
            )}
          </div>
          <button
            onClick={() => showToast('Profile settings saved')}
            className="mt-4 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C583] text-[#06110B] text-xs uppercase tracking-wider font-bold rounded-xs transition-colors shadow-md"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};
