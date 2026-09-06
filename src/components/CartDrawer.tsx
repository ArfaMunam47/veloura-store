import React, { useState } from 'react';
import { X, ShoppingBag, ArrowRight, Trash2, Bookmark, ShieldCheck, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { handleImageError } from '../utils/images';

interface CartDrawerProps {
  onNavigate: (page: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
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

  if (!cartDrawerOpen) return null;

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
    <div id="cart-drawer-container" className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={() => setCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#06110B] shadow-2xl flex flex-col z-10 border-l border-[#183C2A] text-[#FAF9F5]">
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#183C2A] flex items-center justify-between bg-[#0A1C14]">
            <div className="flex items-center gap-2">
              <ShoppingBag size={17} strokeWidth={1.5} className="text-[#D4AF37]" />
              <h2 className="font-editorial text-xl font-medium tracking-wide text-white">
                Shopping Bag
              </h2>
              <span className="text-xs font-mono-luxury text-[#9DB4A7]">
                ({activeItems.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </div>
            <button
              id="close-cart-drawer"
              onClick={() => setCartDrawerOpen(false)}
              className="p-1 text-[#9DB4A7] hover:text-white transition-colors"
              aria-label="Close bag"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Complimentary Shipping Meter */}
          <div className="px-5 py-3 bg-[#0A1C14]/60 border-b border-[#183C2A] text-xs">
            {remainingForFree > 0 ? (
              <p className="text-[#9DB4A7] mb-1.5 font-sans">
                Add <span className="font-mono-luxury font-medium text-[#E5C583]">{formatPrice(remainingForFree)}</span> for complimentary insured global shipping.
              </p>
            ) : (
              <p className="text-[#E5C583] font-medium mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                Complimentary insured worldwide delivery included.
              </p>
            )}
            <div className="w-full h-1 bg-[#132A1E] overflow-hidden rounded-full">
              <div
                className="h-full bg-linear-to-r from-[#B38F26] to-[#E5C583] transition-all duration-500 rounded-full"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {activeItems.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#0A1C14] border border-[#183C2A] flex items-center justify-center text-[#D4AF37] mb-3">
                  <ShoppingBag size={20} strokeWidth={1.5} />
                </div>
                <h3 className="font-editorial text-xl text-white">Your bag is empty</h3>
                <p className="text-xs text-[#9DB4A7] mt-1.5 max-w-xs mx-auto">
                  Explore tailored overcoats, pure cashmere knitwear, and handcrafted Tuscan leather accessories.
                </p>
                <button
                  onClick={() => {
                    setCartDrawerOpen(false);
                    onNavigate('shop');
                  }}
                  className="mt-5 px-6 py-2.5 bg-[#D4AF37] hover:bg-[#E5C583] text-[#06110B] text-xs uppercase tracking-widest font-bold transition-colors rounded-xs shadow-md"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {activeItems.map(item => {
                  const product = getProductById(item.productId);
                  if (!product) return null;
                  const itemIndex = cart.indexOf(item);

                  return (
                    <div
                      key={`${item.productId}-${item.size}-${item.color}`}
                      className="flex gap-4 pb-4 border-b border-[#183C2A]/60"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 aspect-[3/4] bg-[#0A1C14] border border-[#183C2A] overflow-hidden shrink-0 rounded-xs">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          onError={e => handleImageError(e, product.category)}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-medium text-white line-clamp-1 pr-2">
                              {product.name}
                            </h4>
                            <span className="text-xs font-mono-luxury font-medium shrink-0 text-[#E5C583]">
                              {formatPrice(product.price * item.quantity)}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#9DB4A7] mt-1 flex items-center gap-2">
                            <span>Size: {item.size}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <span
                                className="w-2 h-2 rounded-full border border-white/20"
                                style={{ backgroundColor: item.color }}
                              />
                              {item.colorName}
                            </span>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between mt-3 pt-2">
                          <div className="flex items-center border border-[#183C2A] bg-[#0A1C14] h-7 rounded-xs">
                            <button
                              onClick={() => updateQuantity(itemIndex, item.quantity - 1)}
                              className="px-2.5 text-xs text-[#9DB4A7] hover:text-white"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="px-2 text-[11px] font-mono-luxury text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(itemIndex, item.quantity + 1)}
                              className="px-2.5 text-xs text-[#9DB4A7] hover:text-white"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <div className="flex items-center gap-3 text-[11px] text-[#9DB4A7]">
                            <button
                              onClick={() => toggleSaveForLater(itemIndex)}
                              className="hover:text-[#D4AF37] flex items-center gap-1 transition-colors"
                              title="Save for later"
                            >
                              <Bookmark size={11} strokeWidth={1.5} />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={() => removeFromCart(itemIndex)}
                              className="hover:text-red-400 flex items-center gap-1 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 size={11} strokeWidth={1.5} />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Saved for Later Section */}
            {savedItems.length > 0 && (
              <div className="pt-2">
                <h4 className="text-xs font-mono-luxury uppercase tracking-wider text-[#9DB4A7] mb-3">
                  Saved For Later ({savedItems.length})
                </h4>
                <div className="space-y-2.5">
                  {savedItems.map(item => {
                    const product = getProductById(item.productId);
                    if (!product) return null;
                    const itemIndex = cart.indexOf(item);

                    return (
                      <div
                        key={`saved-${item.productId}`}
                        className="flex gap-3 p-2 bg-[#0A1C14] border border-[#183C2A] text-xs items-center justify-between rounded-xs"
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            onError={e => handleImageError(e, product.category)}
                            className="w-9 h-11 object-cover shrink-0 rounded-xs"
                          />
                          <div className="truncate">
                            <p className="font-medium text-white truncate">{product.name}</p>
                            <p className="text-[10px] text-[#E5C583] font-mono-luxury">{formatPrice(product.price)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => toggleSaveForLater(itemIndex)}
                            className="text-[10px] uppercase font-sans font-medium px-2.5 py-1 bg-[#D4AF37] text-[#06110B] hover:bg-[#E5C583] rounded-xs font-bold"
                          >
                            Move to Bag
                          </button>
                          <button
                            onClick={() => removeFromCart(itemIndex)}
                            className="text-[#9DB4A7] hover:text-red-400 p-1"
                          >
                            <X size={12} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer & Calculation */}
          {activeItems.length > 0 && (
            <div className="p-5 border-t border-[#183C2A] bg-[#0A1C14] space-y-3.5">
              {/* Promo Code Input */}
              <div>
                {coupon ? (
                  <div className="flex items-center justify-between text-xs bg-[#06110B] px-3 py-2 border border-[#183C2A] rounded-xs">
                    <div className="flex items-center gap-1.5 text-[#E5C583] font-mono-luxury">
                      <Tag size={12} strokeWidth={1.5} />
                      <span>{coupon.code} ({coupon.discountPct}% OFF)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[#9DB4A7] hover:text-white text-xs font-mono-luxury underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Courtesy code (VELORA10)"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      className="flex-1 bg-[#06110B] border border-[#183C2A] px-3 py-1.5 text-xs font-mono-luxury uppercase placeholder:normal-case placeholder:font-sans focus:outline-hidden focus:border-[#D4AF37] text-white rounded-xs"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-[#06110B] border border-[#183C2A] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#06110B] text-xs font-sans uppercase tracking-wider transition-colors rounded-xs"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Calculation Summary */}
              <div className="space-y-1.5 text-xs text-[#9DB4A7]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono-luxury text-white">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#E5C583]">
                    <span>Promotional Courtesy</span>
                    <span className="font-mono-luxury">−{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Courier</span>
                  <span className="font-mono-luxury text-white">
                    {shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#183C2A] text-sm font-semibold text-white">
                  <span>Total Due</span>
                  <span className="font-mono-luxury text-[#E5C583]">{formatPrice(estimatedTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  id="checkout-cta-button"
                  onClick={() => {
                    setCartDrawerOpen(false);
                    onNavigate('checkout');
                  }}
                  className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#E5C583] text-[#06110B] text-xs uppercase tracking-[0.16em] font-sans font-bold flex items-center justify-center gap-2 transition-colors shadow-md rounded-xs"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={13} strokeWidth={2} />
                </button>
                <button
                  onClick={() => {
                    setCartDrawerOpen(false);
                    onNavigate('cart');
                  }}
                  className="w-full py-2 bg-transparent text-[#9DB4A7] hover:text-white text-xs uppercase tracking-wider font-sans text-center transition-colors"
                >
                  View Full Bag Details
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10.5px] text-[#9DB4A7]/80">
                <ShieldCheck size={12} strokeWidth={1.5} className="text-[#D4AF37]" />
                <span>Complimentary Insured Courier & Atelier Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
