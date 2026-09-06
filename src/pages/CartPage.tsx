import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Trash2, Bookmark, ShieldCheck, Tag, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { handleImageError } from '../utils/images';

interface CartPageProps {
  onNavigate: (page: string) => void;
  onSelectProduct: (id: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate, onSelectProduct }) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    toggleSaveForLater,
    getCartSubtotal,
    formatPrice,
    getProductById,
    coupon,
    applyCoupon,
    removeCoupon
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  const activeItems = cart.filter(item => !item.savedForLater);
  const savedItems = cart.filter(item => item.savedForLater);
  const subtotal = getCartSubtotal();

  const freeShippingThreshold = 120;
  const progressPct = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);

  const discountAmount = coupon ? (subtotal * coupon.discountPct) / 100 : 0;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 9.5;
  const tax = (subtotal - discountAmount) * 0.07;
  const estimatedTotal = subtotal - discountAmount + tax + shippingCost;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  return (
    <div id="cart-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-[#FAF9F5] bg-[#06110B]">
      {/* Breadcrumb & Title */}
      <div className="pb-6 border-b border-[#183C2A] mb-8">
        <div className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37] mb-1">
          Review & Allocation
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl text-white font-normal">
          Shopping Bag ({activeItems.reduce((acc, i) => acc + i.quantity, 0)})
        </h1>
      </div>

      {activeItems.length === 0 && savedItems.length === 0 ? (
        <div className="py-20 text-center bg-[#0A1C14] border border-[#183C2A] p-8 max-w-2xl mx-auto rounded-xs shadow-xl">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#06110B] border border-[#183C2A] flex items-center justify-center text-[#D4AF37] mb-4">
            <ShoppingBag size={24} strokeWidth={1.5} />
          </div>
          <h2 className="font-editorial text-3xl text-white font-normal">Your shopping bag is empty</h2>
          <p className="text-xs text-[#9DB4A7] mt-2 max-w-sm mx-auto">
            Discover tailored trench coats, fine wool knitwear, and handcrafted Tuscan leather goods.
          </p>
          <button
            id="empty-cart-explore-btn"
            onClick={() => onNavigate('shop')}
            className="mt-6 px-8 py-3 bg-[#D4AF37] text-[#06110B] hover:bg-[#E5C583] text-xs uppercase tracking-[0.16em] font-bold transition-colors rounded-xs shadow-md"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Active Items Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free Shipping Progress bar */}
            <div className="p-4 bg-[#0A1C14] border border-[#183C2A] text-xs rounded-xs">
              {remainingForFree > 0 ? (
                <p className="text-[#9DB4A7] mb-2 font-sans">
                  Add <span className="font-mono-luxury font-medium text-[#E5C583]">{formatPrice(remainingForFree)}</span> more to unlock complimentary global express delivery.
                </p>
              ) : (
                <p className="text-[#E5C583] font-medium mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  Complimentary global express courier qualified.
                </p>
              )}
              <div className="w-full h-1 bg-[#132A1E] overflow-hidden rounded-full">
                <div
                  className="h-full bg-linear-to-r from-[#B38F26] to-[#E5C583] transition-all duration-500 rounded-full"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Table Header */}
            <div className="hidden sm:grid sm:grid-cols-12 text-[11px] font-mono-luxury uppercase tracking-wider text-[#9DB4A7] pb-3 border-b border-[#183C2A]">
              <div className="col-span-6">Garment</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* List of Items */}
            <div className="space-y-6">
              {activeItems.map((item, itemIndex) => {
                const product = getProductById(item.productId);
                if (!product) return null;

                return (
                  <div
                    key={`${item.productId}-${item.size}-${item.color}`}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-4 pb-6 border-b border-[#183C2A] items-center"
                  >
                    {/* Item Info */}
                    <div className="sm:col-span-6 flex gap-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        onError={e => handleImageError(e, product.category)}
                        className="w-20 aspect-[3/4] object-cover bg-[#0A1C14] border border-[#183C2A] shrink-0 cursor-pointer object-top rounded-xs hover:border-[#D4AF37] transition-colors"
                        onClick={() => onSelectProduct(product.id)}
                      />
                      <div className="flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-mono-luxury uppercase text-[#D4AF37]">
                            {product.brand}
                          </span>
                          <h3
                            onClick={() => onSelectProduct(product.id)}
                            className="text-sm font-medium text-white hover:text-[#E5C583] cursor-pointer transition-colors"
                          >
                            {product.name}
                          </h3>
                          <div className="text-xs text-[#9DB4A7] mt-1 flex items-center gap-2">
                            <span>Size: {item.size}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-white/20"
                                style={{ backgroundColor: item.color }}
                              />
                              {item.colorName}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-[#9DB4A7] mt-2">
                          <button
                            onClick={() => toggleSaveForLater(itemIndex)}
                            className="hover:text-[#D4AF37] flex items-center gap-1 underline transition-colors"
                          >
                            <Bookmark size={11} strokeWidth={1.5} />
                            <span>Save for later</span>
                          </button>
                          <button
                            onClick={() => removeFromCart(itemIndex)}
                            className="hover:text-red-400 flex items-center gap-1 underline transition-colors"
                          >
                            <Trash2 size={11} strokeWidth={1.5} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="sm:col-span-2 flex justify-start sm:justify-center">
                      <div className="flex items-center border border-[#183C2A] bg-[#0A1C14] h-8 rounded-xs">
                        <button
                          onClick={() => updateQuantity(itemIndex, item.quantity - 1)}
                          className="px-2.5 text-xs text-[#9DB4A7] hover:text-white"
                        >
                          −
                        </button>
                        <span className="px-2 text-xs font-mono-luxury text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(itemIndex, item.quantity + 1)}
                          className="px-2.5 text-xs text-[#9DB4A7] hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="sm:col-span-2 text-left sm:text-right text-xs font-mono-luxury text-[#9DB4A7]">
                      {formatPrice(product.price)}
                    </div>

                    {/* Line Total */}
                    <div className="sm:col-span-2 text-left sm:text-right text-sm font-mono-luxury font-medium text-[#E5C583]">
                      {formatPrice(product.price * item.quantity)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Saved for Later Section */}
            {savedItems.length > 0 && (
              <div className="pt-8">
                <h3 className="font-editorial text-2xl text-white font-normal mb-4">
                  Saved For Later ({savedItems.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedItems.map((item, itemIndex) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;

                    return (
                      <div
                        key={`saved-full-${item.productId}`}
                        className="flex gap-3 p-3 bg-[#0A1C14] border border-[#183C2A] rounded-xs"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          onError={e => handleImageError(e, product.category)}
                          className="w-16 aspect-[3/4] object-cover bg-black/40 shrink-0 object-top border border-[#183C2A] rounded-xs"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-medium text-white line-clamp-1">
                              {product.name}
                            </h4>
                            <span className="text-xs font-mono-luxury text-[#E5C583] font-medium mt-0.5 block">
                              {formatPrice(product.price)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => toggleSaveForLater(itemIndex)}
                              className="px-3 py-1 bg-[#D4AF37] text-[#06110B] text-[11px] uppercase font-sans font-bold tracking-wider hover:bg-[#E5C583] rounded-xs"
                            >
                              Move to Bag
                            </button>
                            <button
                              onClick={() => removeFromCart(itemIndex)}
                              className="text-xs text-[#9DB4A7] hover:text-red-400"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Order Summary Column */}
          <div className="lg:col-span-4">
            <div className="bg-[#0A1C14] p-6 sm:p-8 border border-[#183C2A] sticky top-24 space-y-6 rounded-xs shadow-xl">
              <h2 className="font-editorial text-2xl text-white font-normal pb-4 border-b border-[#183C2A]">
                Order Summary
              </h2>

              {/* Coupon Row */}
              <div>
                {coupon ? (
                  <div className="flex items-center justify-between text-xs bg-[#06110B] px-3.5 py-2.5 border border-[#183C2A] rounded-xs">
                    <div className="flex items-center gap-1.5 text-[#E5C583] font-mono-luxury">
                      <Tag size={13} strokeWidth={1.5} />
                      <span>{coupon.code} applied ({coupon.discountPct}% privilege)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[#9DB4A7] hover:text-white text-xs underline font-mono-luxury"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promotional code (VELORA10)"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      className="flex-1 bg-[#06110B] border border-[#183C2A] px-3 py-2 text-xs font-mono-luxury uppercase placeholder:normal-case placeholder:font-sans focus:outline-hidden focus:border-[#D4AF37] text-white rounded-xs"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#D4AF37] text-[#06110B] text-xs font-sans uppercase tracking-wider hover:bg-[#E5C583] font-bold transition-colors rounded-xs"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Financial Calculation */}
              <div className="space-y-3 text-xs text-[#9DB4A7]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-mono-luxury text-white font-medium">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#E5C583]">
                    <span>Atelier Privilege Savings</span>
                    <span className="font-mono-luxury">−{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tax (7%)</span>
                  <span className="font-mono-luxury text-white">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping & Handling</span>
                  <span className="font-mono-luxury text-white">
                    {shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#183C2A] text-base font-medium text-white">
                  <span>Total Due</span>
                  <span className="font-mono-luxury text-[#E5C583]">{formatPrice(estimatedTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-3 pt-2">
                <button
                  id="cart-proceed-checkout"
                  onClick={() => onNavigate('checkout')}
                  disabled={activeItems.length === 0}
                  className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#E5C583] text-[#06110B] text-xs uppercase tracking-[0.16em] font-sans font-bold flex items-center justify-center gap-2 transition-colors shadow-md rounded-xs disabled:opacity-40"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={13} strokeWidth={2} />
                </button>
                <button
                  onClick={() => onNavigate('shop')}
                  className="w-full py-2 text-xs text-[#9DB4A7] hover:text-white uppercase tracking-wider font-sans text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft size={12} />
                  <span>Continue Browsing</span>
                </button>
              </div>

              <div className="pt-4 border-t border-[#183C2A] flex items-center justify-center gap-2 text-[11px] text-[#9DB4A7]">
                <ShieldCheck size={14} strokeWidth={1.5} className="text-[#D4AF37]" />
                <span>30-Day Atelier Returns • Carbon-Neutral Delivery</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
