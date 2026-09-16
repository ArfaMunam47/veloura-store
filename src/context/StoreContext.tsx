import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  Address,
  PaymentCard,
  UserProfile,
  CurrencyCode,
  CurrencyConfig,
  Category,
  Collection,
  AdminMetrics
} from '../types';
import { PRODUCTS } from '../data/products';
import { CATEGORIES, COLLECTIONS } from '../data/categories';

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
  JPY: { code: 'JPY', symbol: '¥', rate: 154.0 },
  CAD: { code: 'CAD', symbol: 'CA$', rate: 1.36 }
};

interface StoreContextType {
  products: Product[];
  categories: Category[];
  collections: Collection[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  addresses: Address[];
  paymentCards: PaymentCard[];
  user: UserProfile | null;
  currency: CurrencyCode;
  cartDrawerOpen: boolean;
  searchModalOpen: boolean;
  authModalOpen: boolean;
  authModalMode: 'signin' | 'register';
  quickViewProduct: Product | null;
  threeDModalProduct: Product | null;
  coupon: { code: string; discountPct: number } | null;
  toastMessage: string | null;
  adminMetrics: AdminMetrics | null;
  
  // Actions
  setCurrency: (c: CurrencyCode) => void;
  setCartDrawerOpen: (open: boolean) => void;
  setSearchModalOpen: (open: boolean) => void;
  setAuthModalOpen: (open: boolean) => void;
  setAuthModalMode: (mode: 'signin' | 'register') => void;
  openAuthModal: (mode?: 'signin' | 'register') => void;
  setQuickViewProduct: (product: Product | null) => void;
  setThreeDModalProduct: (product: Product | null) => void;
  showToast: (msg: string) => void;
  
  addToCart: (productId: string, size: string, color: string, colorName?: string, quantity?: number) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  toggleSaveForLater: (index: number) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  clearCart: () => void;
  
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveWishlistToCart: (productId: string) => void;
  
  placeOrder: (
    shippingInfo: { fullName: string; email: string; address: string; city: string; postal: string; country: string; phone: string },
    deliveryMethod: 'standard' | 'express',
    paymentMethod: 'card' | 'apple_pay' | 'klarna' | 'wire'
  ) => Promise<Order>;

  createOrder: (orderData: any) => Promise<any>;
  
  login: (email: string, password?: string) => Promise<boolean>;
  loginWithGoogle: (email?: string, name?: string) => Promise<boolean>;
  loginWithApple: (email?: string) => Promise<boolean>;
  register: (name: string, email: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addAddress: (addr: Omit<Address, 'id'>) => void;
  setDefaultAddress: (id: string) => void;
  removeAddress: (id: string) => void;

  // Admin Actions
  refreshAdminMetrics: () => Promise<void>;
  adminAddProduct: (product: Partial<Product>) => Promise<boolean>;
  adminUpdateProduct: (id: string, updates: Partial<Product>) => Promise<boolean>;
  adminDeleteProduct: (id: string) => Promise<boolean>;
  adminUpdateOrderStatus: (orderId: string, status: string, step: number) => Promise<boolean>;
  
  // Helpers
  formatPrice: (amountInUSD: number) => string;
  getCartSubtotal: () => number;
  getCartCount: () => number;
  getProductById: (id: string) => Product | undefined;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    label: 'Primary Residence',
    fullName: 'Genevieve Laurent',
    line: '14 Mayfair Square, Flat 3B',
    city: 'London',
    postal: 'W1J 8AJ',
    country: 'United Kingdom',
    phone: '+44 20 7946 0912',
    isDefault: true
  },
  {
    id: 'addr-2',
    label: 'Paris Pied-à-Terre',
    fullName: 'Genevieve Laurent',
    line: '742 Rue du Faubourg Saint-Honoré',
    city: 'Paris',
    postal: '75008',
    country: 'France',
    phone: '+33 1 42 68 00 00',
    isDefault: false
  }
];

const INITIAL_CARDS: PaymentCard[] = [
  {
    id: 'card-1',
    brand: 'Visa',
    last4: '8842',
    expiry: '09/28',
    holderName: 'GENEVIEVE LAURENT',
    isDefault: true
  },
  {
    id: 'card-2',
    brand: 'Amex',
    last4: '3009',
    expiry: '11/27',
    holderName: 'GENEVIEVE LAURENT',
    isDefault: false
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories] = useState<Category[]>(CATEGORIES);
  const [collections] = useState<Collection[]>(COLLECTIONS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('velora_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // If legacy default 2 items, clear it immediately
          if (parsed.length <= 2 && parsed.some(i => i.productId === 'vl-trench-01' || i.productId === 'vl-loafer-01')) {
            localStorage.removeItem('velora_cart');
            return [];
          }
          return parsed;
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('velora_wishlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // If the array has the legacy 3 demo items or 3 items, clear it
          if (parsed.length === 3) {
            localStorage.removeItem('velora_wishlist');
            return [];
          }
          return parsed;
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentCards, setPaymentCards] = useState<PaymentCard[]>([]);
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('velora_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Explicitly purge any legacy or placeholder 'Elena' account
        if (
          parsed &&
          parsed.email &&
          !parsed.name?.toLowerCase().includes('elena') &&
          !parsed.email?.toLowerCase().includes('elena')
        ) {
          return parsed;
        }
        localStorage.removeItem('velora_user');
      }
      return null;
    } catch {
      return null;
    }
  });

  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'register'>('signin');

  const openAuthModal = (mode: 'signin' | 'register' = 'signin') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [threeDModalProduct, setThreeDModalProduct] = useState<Product | null>(null);
  const [coupon, setCoupon] = useState<{ code: string; discountPct: number } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [adminMetrics, setAdminMetrics] = useState<AdminMetrics | null>(null);

  // Load products & orders from server on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await fetch('/api/products');
        if (prodRes.ok) {
          const data = await prodRes.json();
          if (data.products && data.products.length > 0) {
            setProducts(data.products);
          }
        }
      } catch (err) {
        console.warn('Using local product catalog fallback');
      }

      try {
        const orderRes = await fetch('/api/orders');
        if (orderRes.ok) {
          const data = await orderRes.json();
          setOrders(data);
        }
      } catch (err) {
        console.warn('Using local orders fallback');
      }
    };

    fetchData();
  }, []);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('velora_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('velora_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Persist user
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('velora_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('velora_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    showToast(`Currency adjusted to ${c}`);
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  };

  const formatPrice = (amountInUSD: number): string => {
    const config = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = amountInUSD * config.rate;

    if (currency === 'JPY') {
      return `${config.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${config.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const addToCart = (
    productId: string,
    size: string,
    color: string,
    colorName?: string,
    quantity: number = 1
  ) => {
    const prod = getProductById(productId);
    if (!prod) return;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.productId === productId && item.size === size && item.color === color
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prevCart,
        {
          productId,
          size,
          color,
          colorName: colorName || 'Standard',
          quantity,
          savedForLater: false
        }
      ];
    });

    showToast(`Added ${prod.name} to your shopping bag.`);
    setCartDrawerOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast('Item removed from shopping bag.');
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart(prev => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const toggleSaveForLater = (index: number) => {
    setCart(prev => {
      const updated = [...prev];
      updated[index].savedForLater = !updated[index].savedForLater;
      return updated;
    });
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'VELORA10') {
      setCoupon({ code: clean, discountPct: 10 });
      showToast('Offer code VELORA10 applied (10% VIP courtesy)');
      return true;
    }
    if (clean === 'ATELIER15' || clean === 'RUNWAY15') {
      setCoupon({ code: clean, discountPct: 15 });
      showToast('Exclusive 15% Runway Courtesy applied');
      return true;
    }
    showToast('Invalid or expired promotional code.');
    return false;
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Promotional code removed');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const prod = getProductById(productId);
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast(`Removed from saved items.`);
        return prev.filter(id => id !== productId);
      } else {
        showToast(`Saved ${prod?.name || 'piece'} to wishlist.`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const moveWishlistToCart = (productId: string) => {
    const prod = getProductById(productId);
    if (!prod) return;
    const defaultSize = prod.sizes[0] || 'One Size';
    const defaultColor = prod.colors[0]?.hex || '#000';
    const defaultColorName = prod.colors[0]?.name || 'Standard';

    addToCart(productId, defaultSize, defaultColor, defaultColorName, 1);
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  const getCartSubtotal = (): number => {
    return cart
      .filter(item => !item.savedForLater)
      .reduce((sum, item) => {
        const prod = getProductById(item.productId);
        return sum + (prod ? prod.price * item.quantity : 0);
      }, 0);
  };

  const getCartCount = (): number => {
    return cart
      .filter(item => !item.savedForLater)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  const placeOrder = async (
    shippingInfo: { fullName: string; email: string; address: string; city: string; postal: string; country: string; phone: string },
    deliveryMethod: 'standard' | 'express',
    paymentMethod: 'card' | 'apple_pay' | 'klarna' | 'wire'
  ): Promise<Order> => {
    const activeItems = cart.filter(i => !i.savedForLater);
    const subtotal = getCartSubtotal();
    const discountAmount = coupon ? (subtotal * coupon.discountPct) / 100 : 0;

    const payload = {
      items: activeItems,
      shippingAddress: shippingInfo,
      deliveryMethod,
      paymentMethod,
      discount: discountAmount
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const newOrder = await res.json();
        setOrders(prev => [newOrder, ...prev]);
        clearCart();
        showToast(`Order ${newOrder.id} placed successfully.`);
        return newOrder;
      }
    } catch (e) {
      console.warn('Falling back to client-generated order placement');
    }

    // Client-side fallback
    const shippingCost = deliveryMethod === 'express' ? 14 : subtotal >= 120 ? 0 : 9.5;
    const tax = (subtotal - discountAmount) * 0.07;
    const total = subtotal - discountAmount + tax + shippingCost;

    const fallbackOrder: Order = {
      id: `VL-${Math.floor(10000 + Math.random() * 89999)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'processing',
      step: 0,
      trackingNumber: `DHL-EU-${Math.floor(10000000 + Math.random() * 89999999)}`,
      courier: deliveryMethod === 'express' ? 'DHL Express Worldwide' : 'DHL Carbon Neutral Ground',
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: activeItems.map(item => {
        const prod = getProductById(item.productId);
        return {
          productId: item.productId,
          productName: prod ? prod.name : 'Velora Garment',
          image: prod ? prod.images[0] : '',
          price: prod ? prod.price : 100,
          quantity: item.quantity,
          size: item.size,
          color: item.colorName || 'Standard',
          sku: prod?.sku || 'VL-CUSTOM'
        };
      }),
      subtotal,
      discount: discountAmount,
      tax,
      shippingCost,
      total,
      deliveryMethod,
      paymentMethod,
      shippingAddress: shippingInfo
    };

    setOrders(prev => [fallbackOrder, ...prev]);
    clearCart();
    showToast(`Order ${fallbackOrder.id} confirmed.`);
    return fallbackOrder;
  };

  const login = async (email: string, password?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        showToast(`Welcome back, ${data.user.name}`);
        return true;
      }
    } catch (e) {
      console.warn('Local fallback login');
    }

    const fallbackUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      phone: '+44 20 7946 0912',
      role: email.includes('admin') ? 'admin' : 'customer',
      memberSince: '2025',
      preferredLanguage: 'English (UK)',
      preferredCurrency: 'USD'
    };
    setUser(fallbackUser);
    showToast(`Welcome, ${fallbackUser.name}`);
    return true;
  };

  const register = async (name: string, email: string, phone?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone })
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        showToast(`Account registered for ${data.user.name}`);
        return true;
      }
    } catch (e) {
      console.warn('Local fallback register');
    }

    const fallbackUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name || 'Valued Client',
      email,
      phone: phone || '+44 20 7946 0912',
      role: email.includes('admin') ? 'admin' : 'customer',
      memberSince: '2025',
      preferredLanguage: 'English (UK)',
      preferredCurrency: 'USD'
    };
    setUser(fallbackUser);
    showToast(`Welcome to Velora Atelier, ${fallbackUser.name}`);
    return true;
  };

  const loginWithGoogle = async (email?: string, name?: string): Promise<boolean> => {
    const targetEmail = email || 'user.atelier@gmail.com';
    const targetName = name || 'Maison Patron';
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: targetEmail,
          name: targetName,
          googleId: `g-${Date.now()}`
        })
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        showToast(`Authenticated via Google as ${data.user.name}`);
        return true;
      }
    } catch (e) {
      console.warn('Local fallback Google login');
    }

    const fallbackUser: UserProfile = {
      id: `usr-google-${Date.now()}`,
      name: targetName,
      email: targetEmail,
      phone: '+1 415 555 0199',
      role: targetEmail.includes('admin') ? 'admin' : 'customer',
      memberSince: new Date().getFullYear().toString(),
      preferredLanguage: 'English (US)',
      preferredCurrency: 'USD'
    };
    setUser(fallbackUser);
    showToast(`Authenticated via Google as ${fallbackUser.name}`);
    return true;
  };

  const loginWithApple = async (email?: string): Promise<boolean> => {
    const targetEmail = email || 'client.apple@privaterelay.appleid.com';
    try {
      const res = await fetch('/api/auth/apple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail, name: 'Apple VIP Client' })
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        showToast(`Signed in with Apple as ${data.user.name}`);
        return true;
      }
    } catch (e) {
      console.warn('Local fallback Apple login');
    }

    const fallbackUser: UserProfile = {
      id: `usr-apple-${Date.now()}`,
      name: 'Apple VIP Client',
      email: targetEmail,
      phone: '+1 408 555 0122',
      role: 'customer',
      memberSince: new Date().getFullYear().toString(),
      preferredLanguage: 'English (US)',
      preferredCurrency: 'USD'
    };
    setUser(fallbackUser);
    showToast('Signed in with Apple ID.');
    return true;
  };

  const createOrder = async (orderData: any): Promise<any> => {
    const activeItems = cart.filter(i => !i.savedForLater);
    const subtotal = getCartSubtotal();
    const discountAmount = coupon ? (subtotal * coupon.discountPct) / 100 : 0;

    const payload = {
      items: activeItems,
      shippingAddress: {
        fullName: orderData.customerName || `${orderData.shippingAddress?.firstName || ''} ${orderData.shippingAddress?.lastName || ''}`.trim() || user?.name || 'Valued Client',
        email: orderData.customerEmail || user?.email || 'client@velora.com',
        address: orderData.shippingAddress?.address || '14 Mayfair Square',
        city: orderData.shippingAddress?.city || 'London',
        postal: orderData.shippingAddress?.postalCode || 'W1J 8AJ',
        country: orderData.shippingAddress?.country || 'United Kingdom',
        phone: orderData.phone || user?.phone || '+44 20 7946 0912'
      },
      deliveryMethod: orderData.shippingMethod || 'standard',
      paymentMethod: 'card',
      discount: discountAmount
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const newOrder = await res.json();
        setOrders(prev => [newOrder, ...prev]);
        clearCart();
        showToast(`Order ${newOrder.id} placed successfully.`);
        return { ...newOrder, orderNumber: newOrder.id };
      }
    } catch (e) {
      console.warn('Local order fallback');
    }

    const orderId = `VL-${Math.floor(10000 + Math.random() * 89999)}`;
    const fallbackOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'processing',
      step: 0,
      trackingNumber: `DHL-EU-${Math.floor(10000000 + Math.random() * 89999999)}`,
      courier: 'DHL Express Worldwide',
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: activeItems.map(item => {
        const prod = getProductById(item.productId);
        return {
          productId: item.productId,
          productName: prod ? prod.name : 'Velora Garment',
          image: prod ? prod.images[0] : '',
          price: prod ? prod.price : 100,
          quantity: item.quantity,
          size: item.size,
          color: item.colorName || 'Standard',
          sku: prod?.sku || 'VL-CUSTOM'
        };
      }),
      subtotal,
      discount: discountAmount,
      tax: (subtotal - discountAmount) * 0.07,
      shippingCost: orderData.shippingFee || 0,
      total: orderData.total || subtotal - discountAmount,
      deliveryMethod: orderData.shippingMethod || 'standard',
      paymentMethod: 'card',
      shippingAddress: payload.shippingAddress
    };

    setOrders(prev => [fallbackOrder, ...prev]);
    clearCart();
    showToast(`Order ${orderId} confirmed.`);
    return { ...fallbackOrder, orderNumber: orderId };
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out of Velora Atelier.');
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...profile });
    showToast('Client profile updated.');
  };

  const addAddress = (addr: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addr,
      id: `addr-${Date.now()}`
    };
    setAddresses(prev => [...prev, newAddr]);
    showToast('New shipping address saved.');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev =>
      prev.map(a => ({
        ...a,
        isDefault: a.id === id
      }))
    );
  };

  const removeAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    showToast('Address removed.');
  };

  // Admin capabilities
  const refreshAdminMetrics = async () => {
    try {
      const res = await fetch('/api/admin/metrics');
      if (res.ok) {
        const data = await res.json();
        setAdminMetrics(data);
      }
    } catch (e) {
      console.warn('Local admin metrics computation');
      const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
      const activeOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length;
      const lowStockCount = products.filter(p => p.stockCount <= 6).length;
      setAdminMetrics({
        totalRevenue,
        activeOrders,
        totalProducts: products.length,
        lowStockCount,
        recentOrders: orders.slice(0, 5)
      });
    }
  };

  const adminAddProduct = async (prod: Partial<Product>): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prod)
      });
      if (res.ok) {
        const created = await res.json();
        setProducts(prev => [created, ...prev]);
        showToast(`Product "${created.name}" added to catalog.`);
        return true;
      }
    } catch (e) {
      console.warn('Local add product');
    }

    const created: Product = {
      id: prod.id || `vl-${Date.now()}`,
      sku: prod.sku || `VL-NEW-${Math.floor(100 + Math.random() * 900)}`,
      name: prod.name || 'New Creation',
      subtitle: prod.subtitle || '',
      brand: prod.brand || 'Velora Studio',
      category: prod.category || 'women-outerwear',
      group: prod.group || 'Women',
      price: prod.price || 300,
      stock: true,
      stockCount: prod.stockCount || 10,
      rating: 5.0,
      reviewsCount: 0,
      images: prod.images || ['https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop'],
      colors: prod.colors || [{ name: 'Noir', hex: '#111111' }],
      sizes: prod.sizes || ['S', 'M', 'L'],
      description: prod.description || 'Crafted with premium materials.',
      details: prod.details || ['Hand-finished tailoring'],
      materials: prod.materials || '100% Virgin Wool',
      origin: prod.origin || 'Made in Italy',
      careGuide: prod.careGuide || 'Dry clean only'
    };
    setProducts(prev => [created, ...prev]);
    showToast(`Product "${created.name}" added.`);
    return true;
  };

  const adminUpdateProduct = async (id: string, updates: Partial<Product>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts(prev => prev.map(p => (p.id === id ? updated : p)));
        showToast('Product updated successfully.');
        return true;
      }
    } catch (e) {
      console.warn('Local update product');
    }

    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product updated.');
    return true;
  };

  const adminDeleteProduct = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
        showToast('Product removed from catalog.');
        return true;
      }
    } catch (e) {
      console.warn('Local delete product');
    }

    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed.');
    return true;
  };

  const adminUpdateOrderStatus = async (orderId: string, status: string, step: number): Promise<boolean> => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, step })
      });
      if (res.ok) {
        const updated = await res.json();
        setOrders(prev => prev.map(o => (o.id === orderId ? updated : o)));
        showToast(`Order ${orderId} updated to ${status}.`);
        return true;
      }
    } catch (e) {
      console.warn('Local update order');
    }

    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: status as any, step } : o))
    );
    showToast(`Order ${orderId} updated.`);
    return true;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        collections,
        cart,
        wishlist,
        orders,
        addresses,
        paymentCards,
        user,
        currency,
        cartDrawerOpen,
        searchModalOpen,
        authModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        quickViewProduct,
        coupon,
        toastMessage,
        adminMetrics,
        setCurrency,
        setCartDrawerOpen,
        setSearchModalOpen,
        setAuthModalOpen,
        setQuickViewProduct,
        threeDModalProduct,
        setThreeDModalProduct,
        showToast,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleSaveForLater,
        applyCoupon,
        removeCoupon,
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,
        placeOrder,
        createOrder,
        login,
        loginWithGoogle,
        loginWithApple,
        register,
        logout,
        updateProfile,
        addAddress,
        setDefaultAddress,
        removeAddress,
        refreshAdminMetrics,
        adminAddProduct,
        adminUpdateProduct,
        adminDeleteProduct,
        adminUpdateOrderStatus,
        formatPrice,
        getCartSubtotal,
        getCartCount,
        getProductById
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
