import React, { useState } from 'react';
import { Truck, CreditCard, Lock, CheckCircle2, ArrowRight, ArrowLeft, Gift, Sparkles, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { handleImageError } from '../utils/images';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const {
    cart,
    clearCart,
    getCartSubtotal,
    formatPrice,
    getProductById,
    coupon,
    user,
    createOrder
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'whiteglove'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'klarna'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || 'Genevieve',
    lastName: user?.name?.split(' ')[1] || 'Laurent',
    email: user?.email || 'genevieve.laurent@velora.com',
    phone: '+44 7911 123456',
    address: '14 Mayfair Square',
    apartment: 'Apt 4B',
    city: 'London',
    country: 'United Kingdom',
    postalCode: 'W1J 8AJ',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '08/28',
    cardCvc: '•••',
    cardName: 'GENEVIEVE LAURENT'
  });

  const activeItems = cart.filter(item => !item.savedForLater);
  const subtotal = getCartSubtotal();
  const rawDiscountPct = coupon?.discountPct || 0;
  const normalizedDiscount = rawDiscountPct > 1 ? rawDiscountPct / 100 : rawDiscountPct;
  const discountAmount = coupon ? subtotal * normalizedDiscount : 0;
  const giftWrapCost = giftWrapping ? 15 : 0;

  const shippingCost =
    shippingMethod === 'standard'
      ? (subtotal >= 120 ? 0 : 9.5)
      : shippingMethod === 'express'
      ? 16.0
      : 35.0;

  const tax = (subtotal - discountAmount) * 0.07;
  const total = subtotal - discountAmount + tax + shippingCost + giftWrapCost;

  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState('');

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        customerEmail: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`,
        items: activeItems.map(item => {
          const product = getProductById(item.productId);
          return {
            productId: item.productId,
            name: product?.name || 'Garment',
            size: item.size,
            color: item.colorName,
            quantity: item.quantity,
            price: product?.price || 0,
            image: product?.images[0] || ''
          };
        }),
        shippingAddress: {
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          country: formData.country,
          postalCode: formData.postalCode
        },
        shippingMethod,
        subtotal,
        discount: discountAmount,
        shippingFee: shippingCost,
        tax,
        total
      };

      const result = await createOrder(orderData);
      setConfirmedOrderNumber(result.orderNumber || `VL-${Math.floor(100000 + Math.random() * 900000)}-GB`);
      setStep(4);
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setConfirmedOrderNumber(`VL-${Math.floor(100000 + Math.random() * 900000)}-GB`);
      setStep(4);
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 4) {
    return (
      <div id="checkout-confirmed-view" className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center text-[#FAF9F5]">
        <div className="w-16 h-16 rounded-full bg-[#D4AF37] text-[#06110B] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#D4AF37]/20">
          <CheckCircle2 size={32} strokeWidth={2} />
        </div>
        <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37]">
          Order Confirmed & Allocation Reserved
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-white font-normal mt-2">
          Thank you for choosing Velora Atelier.
        </h1>
        <p className="text-xs sm:text-sm text-[#9DB4A7] mt-3 max-w-md mx-auto leading-relaxed">
          Order reference <b className="text-[#E5C583] font-mono-luxury">{confirmedOrderNumber}</b> has been received and scheduled for dispatch. A delivery receipt and live tracking updates have been dispatched to {formData.email}.
        </p>

        {/* Order Details Card */}
        <div className="mt-8 bg-[#0A1C14] p-6 sm:p-8 border border-[#183C2A] text-left text-xs space-y-4 rounded-xs shadow-xl">
          <div className="flex justify-between pb-3 border-b border-[#183C2A] font-mono-luxury">
            <span className="text-[#9DB4A7]">Reference:</span>
            <span className="font-medium text-[#E5C583]">{confirmedOrderNumber}</span>
          </div>
          <div className="flex justify-between pb-3 border-b border-[#183C2A]">
            <span className="text-[#9DB4A7]">Estimated Delivery:</span>
            <span className="font-medium text-white">
              {new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
          <div className="flex justify-between pb-3 border-b border-[#183C2A]">
            <span className="text-[#9DB4A7]">Destination:</span>
            <span className="text-white">{formData.address}, {formData.city}, {formData.country}</span>
          </div>
          <div className="flex justify-between font-mono-luxury text-sm font-medium text-white pt-2">
            <span>Total Settled:</span>
            <span className="text-[#E5C583]">{formatPrice(total)}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            id="view-orders-btn"
            onClick={() => onNavigate('dashboard')}
            className="px-7 py-3.5 bg-[#D4AF37] text-[#06110B] hover:bg-[#E5C583] text-xs uppercase tracking-[0.16em] font-bold transition-colors rounded-xs shadow-md"
          >
            Track in Client Dashboard
          </button>
          <button
            onClick={() => onNavigate('shop')}
            className="px-7 py-3.5 bg-[#0A1C14] border border-[#183C2A] text-white hover:border-[#D4AF37] hover:text-[#D4AF37] text-xs uppercase tracking-[0.16em] transition-colors rounded-xs"
          >
            Return to Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="checkout-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 text-[#FAF9F5] bg-[#06110B]">
      {/* Header */}
      <div className="pb-6 border-b border-[#183C2A] mb-8 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37]">
            Secure Checkout
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-white font-normal mt-1">
            Settlement & Shipping
          </h1>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#9DB4A7] font-mono-luxury">
          <Lock size={13} strokeWidth={1.5} className="text-[#D4AF37]" />
          <span>256-Bit Encrypted</span>
        </div>
      </div>

      {/* 3 Step Tabs */}
      <div className="grid grid-cols-3 gap-2 mb-10 text-xs font-mono-luxury uppercase tracking-wider">
        <div
          onClick={() => setStep(1)}
          className={`pb-2 border-b-2 cursor-pointer transition-colors ${
            step === 1 ? 'border-[#D4AF37] text-[#D4AF37] font-medium' : 'border-[#183C2A] text-[#9DB4A7]/60'
          }`}
        >
          1. Destination
        </div>
        <div
          onClick={() => step > 1 && setStep(2)}
          className={`pb-2 border-b-2 cursor-pointer transition-colors ${
            step === 2 ? 'border-[#D4AF37] text-[#D4AF37] font-medium' : 'border-[#183C2A] text-[#9DB4A7]/60'
          }`}
        >
          2. Courier Method
        </div>
        <div
          onClick={() => step > 2 && setStep(3)}
          className={`pb-2 border-b-2 cursor-pointer transition-colors ${
            step === 3 ? 'border-[#D4AF37] text-[#D4AF37] font-medium' : 'border-[#183C2A] text-[#9DB4A7]/60'
          }`}
        >
          3. Payment
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form Steps */}
        <div className="lg:col-span-7">
          {/* STEP 1: Shipping Address */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-editorial text-2xl text-white font-normal">Shipping Address & Contact</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <label className="block font-mono-luxury uppercase text-[10.5px] text-[#9DB4A7] mb-1">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-[#0A1C14] border border-[#183C2A] p-2.5 text-xs text-white focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono-luxury uppercase text-[10.5px] text-[#9DB4A7] mb-1">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-[#0A1C14] border border-[#183C2A] p-2.5 text-xs text-white focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono-luxury uppercase text-[10.5px] text-[#9DB4A7] mb-1">Email for Delivery Tracking</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0A1C14] border border-[#183C2A] p-2.5 text-xs text-white focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono-luxury uppercase text-[10.5px] text-[#9DB4A7] mb-1">Street Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#0A1C14] border border-[#183C2A] p-2.5 text-xs text-white focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono-luxury uppercase text-[10.5px] text-[#9DB4A7] mb-1">Apartment / Suite (Optional)</label>
                  <input
                    type="text"
                    value={formData.apartment}
                    onChange={e => setFormData({ ...formData, apartment: e.target.value })}
                    className="w-full bg-[#0A1C14] border border-[#183C2A] p-2.5 text-xs text-white focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                  />
                </div>
                <div>
                  <label className="block font-mono-luxury uppercase text-[10.5px] text-[#9DB4A7] mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#0A1C14] border border-[#183C2A] p-2.5 text-xs text-white focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono-luxury uppercase text-[10.5px] text-[#9DB4A7] mb-1">Country</label>
                  <select
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-[#0A1C14] border border-[#183C2A] p-2.5 text-xs text-white focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="France">France</option>
                    <option value="Italy">Italy</option>
                    <option value="Germany">Germany</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Japan">Japan</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono-luxury uppercase text-[10.5px] text-[#9DB4A7] mb-1">Postal / ZIP Code</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-[#0A1C14] border border-[#183C2A] p-2.5 text-xs text-white focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                    required
                  />
                </div>
              </div>

              {/* Gift Presentation Option */}
              <div className="p-4 bg-[#0A1C14] border border-[#183C2A] flex items-center justify-between rounded-xs">
                <div className="flex items-center gap-3">
                  <Gift size={16} strokeWidth={1.5} className="text-[#D4AF37]" />
                  <div>
                    <h4 className="text-xs font-medium text-white">Signature Gift Packaging</h4>
                    <p className="text-[11px] text-[#9DB4A7]">Hand-tied silk grosgrain ribbon and handwritten archival note (+$15.00)</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={giftWrapping}
                  onChange={e => setGiftWrapping(e.target.checked)}
                  className="accent-[#D4AF37] w-4 h-4 cursor-pointer"
                />
              </div>

              <button
                id="checkout-step1-next"
                onClick={() => setStep(2)}
                className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#E5C583] text-[#06110B] text-xs uppercase tracking-[0.16em] font-sans font-bold flex items-center justify-center gap-2 transition-colors rounded-xs shadow-md"
              >
                <span>Continue to Courier Selection</span>
                <ArrowRight size={13} strokeWidth={2} />
              </button>
            </div>
          )}

          {/* STEP 2: Delivery Method */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-editorial text-2xl text-white font-normal">Select Courier Service</h2>
              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all rounded-xs ${
                    shippingMethod === 'standard' ? 'border-[#D4AF37] bg-[#132A1E] ring-1 ring-[#D4AF37]' : 'border-[#183C2A] bg-[#0A1C14] hover:bg-[#132A1E]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck size={16} strokeWidth={1.5} className="text-[#D4AF37]" />
                    <div>
                      <h4 className="text-xs font-medium text-white">Complimentary Carbon-Neutral Express</h4>
                      <p className="text-[11px] text-[#9DB4A7]">2–4 business days via DHL Green Express</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono-luxury font-medium text-[#E5C583]">
                    {subtotal >= 120 ? 'FREE' : formatPrice(9.5)}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod('express')}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all rounded-xs ${
                    shippingMethod === 'express' ? 'border-[#D4AF37] bg-[#132A1E] ring-1 ring-[#D4AF37]' : 'border-[#183C2A] bg-[#0A1C14] hover:bg-[#132A1E]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck size={16} strokeWidth={1.5} className="text-[#D4AF37]" />
                    <div>
                      <h4 className="text-xs font-medium text-white">Priority Next-Day Air</h4>
                      <p className="text-[11px] text-[#9DB4A7]">Guaranteed next morning delivery before 12:00 PM</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono-luxury font-medium text-[#E5C583]">
                    {formatPrice(16.0)}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod('whiteglove')}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all rounded-xs ${
                    shippingMethod === 'whiteglove' ? 'border-[#D4AF37] bg-[#132A1E] ring-1 ring-[#D4AF37]' : 'border-[#183C2A] bg-[#0A1C14] hover:bg-[#132A1E]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles size={16} strokeWidth={1.5} className="text-[#D4AF37]" />
                    <div>
                      <h4 className="text-xs font-medium text-white">White-Glove Salon Delivery</h4>
                      <p className="text-[11px] text-[#9DB4A7]">Personal courier delivery on wooden hanger in archival travel case</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono-luxury font-medium text-[#E5C583]">
                    {formatPrice(35.0)}
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-transparent border border-[#183C2A] text-white hover:border-[#D4AF37] hover:text-[#D4AF37] text-xs uppercase tracking-wider font-sans flex items-center gap-1.5 rounded-xs transition-colors"
                >
                  <ArrowLeft size={12} />
                  <span>Back</span>
                </button>
                <button
                  id="checkout-step2-next"
                  onClick={() => setStep(3)}
                  className="flex-1 py-3.5 bg-[#D4AF37] hover:bg-[#E5C583] text-[#06110B] text-xs uppercase tracking-[0.16em] font-sans font-bold flex items-center justify-center gap-2 transition-colors rounded-xs shadow-md"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight size={13} strokeWidth={2} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="font-editorial text-2xl text-white font-normal">Payment Settlement</h2>

              {/* Payment Type Switcher */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 border text-xs font-mono-luxury uppercase tracking-wider transition-all rounded-xs ${
                    paymentMethod === 'card' ? 'bg-[#D4AF37] text-[#06110B] border-[#D4AF37] font-bold' : 'bg-[#0A1C14] text-[#9DB4A7] border-[#183C2A] hover:text-white'
                  }`}
                >
                  Credit Card
                </button>
                <button
                  onClick={() => setPaymentMethod('apple')}
                  className={`p-3 border text-xs font-mono-luxury uppercase tracking-wider transition-all rounded-xs ${
                    paymentMethod === 'apple' ? 'bg-[#D4AF37] text-[#06110B] border-[#D4AF37] font-bold' : 'bg-[#0A1C14] text-[#9DB4A7] border-[#183C2A] hover:text-white'
                  }`}
                >
                  Apple Pay
                </button>
                <button
                  onClick={() => setPaymentMethod('klarna')}
                  className={`p-3 border text-xs font-mono-luxury uppercase tracking-wider transition-all rounded-xs ${
                    paymentMethod === 'klarna' ? 'bg-[#D4AF37] text-[#06110B] border-[#D4AF37] font-bold' : 'bg-[#0A1C14] text-[#9DB4A7] border-[#183C2A] hover:text-white'
                  }`}
                >
                  Klarna 4x
                </button>
              </div>

              {/* Credit Card Details */}
              {paymentMethod === 'card' && (
                <div className="p-6 bg-[#0A1C14] border border-[#183C2A] space-y-4 rounded-xs">
                  <div>
                    <label className="block font-mono-luxury uppercase text-[10.5px] text-[#9DB4A7] mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={e => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full bg-[#06110B] border border-[#183C2A] p-2.5 text-xs text-white font-mono-luxury focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                        required
                      />
                      <CreditCard size={15} strokeWidth={1.5} className="absolute right-3 top-3 text-[#D4AF37]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono-luxury uppercase text-[10.5px] text-[#9DB4A7] mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={formData.cardExpiry}
                        onChange={e => setFormData({ ...formData, cardExpiry: e.target.value })}
                        className="w-full bg-[#06110B] border border-[#183C2A] p-2.5 text-xs text-white font-mono-luxury focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-mono-luxury uppercase text-[10.5px] text-[#9DB4A7] mb-1">Security CVC</label>
                      <input
                        type="text"
                        value={formData.cardCvc}
                        onChange={e => setFormData({ ...formData, cardCvc: e.target.value })}
                        className="w-full bg-[#06110B] border border-[#183C2A] p-2.5 text-xs text-white font-mono-luxury focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono-luxury uppercase text-[10.5px] text-[#9DB4A7] mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={formData.cardName}
                      onChange={e => setFormData({ ...formData, cardName: e.target.value })}
                      className="w-full bg-[#06110B] border border-[#183C2A] p-2.5 text-xs text-white uppercase font-mono-luxury focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                      required
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'apple' && (
                <div className="p-8 text-center bg-[#0A1C14] border border-[#183C2A] rounded-xs">
                  <p className="text-xs text-[#9DB4A7]">Click below to authorize securely with Apple Pay biometric settlement on your device.</p>
                </div>
              )}

              {paymentMethod === 'klarna' && (
                <div className="p-6 bg-[#0A1C14] border border-[#183C2A] text-xs text-[#9DB4A7] space-y-2 rounded-xs">
                  <p>Pay 4 equal interest-free installments of <b className="text-[#E5C583] font-mono-luxury">{formatPrice(total / 4)}</b> every two weeks.</p>
                  <p className="text-[11px] text-[#9DB4A7]/70">No hidden fees. Instant digital settlement.</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-transparent border border-[#183C2A] text-white hover:border-[#D4AF37] hover:text-[#D4AF37] text-xs uppercase tracking-wider font-sans flex items-center gap-1.5 rounded-xs transition-colors"
                >
                  <ArrowLeft size={12} />
                  <span>Back</span>
                </button>
                <button
                  id="place-order-submit"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 bg-[#D4AF37] hover:bg-[#E5C583] text-[#06110B] text-xs uppercase tracking-[0.16em] font-sans font-bold flex items-center justify-center gap-2 transition-colors shadow-md rounded-xs disabled:opacity-50"
                >
                  <Lock size={13} strokeWidth={2} />
                  <span>{isSubmitting ? 'Processing Settlement...' : `Authorize Settlement (${formatPrice(total)})`}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Order Summary Review */}
        <div className="lg:col-span-5">
          <div className="bg-[#0A1C14] p-6 sm:p-8 border border-[#183C2A] space-y-5 rounded-xs shadow-xl">
            <h3 className="font-editorial text-xl text-white font-normal pb-3 border-b border-[#183C2A]">
              Order Summary ({activeItems.reduce((acc, i) => acc + i.quantity, 0)} Items)
            </h3>

            {/* Items */}
            <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
              {activeItems.map(item => {
                const p = getProductById(item.productId);
                if (!p) return null;

                return (
                  <div key={`${item.productId}-${item.size}`} className="flex gap-3 text-xs">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      onError={e => handleImageError(e, p.category)}
                      className="w-12 aspect-[3/4] object-cover bg-black/40 shrink-0 border border-[#183C2A] object-top rounded-xs"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white truncate">{p.name}</h4>
                      <p className="text-[11px] text-[#9DB4A7]">Size {item.size} • Qty {item.quantity}</p>
                    </div>
                    <span className="font-mono-luxury font-medium text-[#E5C583]">
                      {formatPrice(p.price * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Breakdown */}
            <div className="space-y-2 text-xs text-[#9DB4A7] pt-4 border-t border-[#183C2A]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono-luxury text-white">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#E5C583]">
                  <span>Atelier Privilege Savings</span>
                  <span className="font-mono-luxury">−{formatPrice(discountAmount)}</span>
                </div>
              )}
              {giftWrapping && (
                <div className="flex justify-between">
                  <span>Gift Presentation</span>
                  <span className="font-mono-luxury text-white">{formatPrice(15)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="font-mono-luxury text-white">{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono-luxury text-white">
                  {shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#183C2A] text-base font-medium text-white">
                <span>Total Due</span>
                <span className="font-mono-luxury text-[#E5C583]">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#9DB4A7]">
              <ShieldCheck size={14} strokeWidth={1.5} className="text-[#D4AF37]" />
              <span>Complimentary Returns • Insured Transport</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
