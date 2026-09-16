export type GenderGroup = 'Women' | 'Men' | 'Kids' | 'Accessories' | 'Collections' | 'Jewelry' | 'Footwear' | 'All';

export interface Category {
  id: string;
  name: string;
  slug: string;
  group: GenderGroup;
  image: string;
  description: string;
  itemCount?: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  headline: string;
  description: string;
  coverImage: string;
  season: string;
  itemCount: number;
}

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  subtitle?: string;
  brand: string;
  category: string;
  group: GenderGroup;
  gender?: 'men' | 'women' | 'kids' | 'unisex';
  department?: 'clothing' | 'footwear' | 'jewelry' | 'accessories';
  subcategory?: string;
  availability?: boolean;
  collectionId?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  stock: boolean;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  details: string[];
  materials: string;
  origin: string;
  careGuide: string;
  modelInfo?: string;
}

export interface CartItem {
  productId: string;
  size: string;
  color: string;
  colorName?: string;
  quantity: number;
  savedForLater?: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  sku?: string;
}

export type OrderStatus = 'processing' | 'preparing' | 'in_transit' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  step: number; // 0: Placed, 1: Atelier Preparation, 2: In Transit, 3: Delivered
  trackingNumber?: string;
  courier?: string;
  estimatedDelivery?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shippingCost: number;
  total: number;
  deliveryMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'apple_pay' | 'klarna' | 'wire';
  shippingAddress: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postal: string;
    country: string;
    phone: string;
  };
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  line: string;
  city: string;
  postal: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface PaymentCard {
  id: string;
  brand: 'Visa' | 'Mastercard' | 'Amex';
  last4: string;
  expiry: string;
  holderName: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  memberSince: string;
  preferredLanguage: string;
  preferredCurrency: string;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number;
}

export interface AdminMetrics {
  totalRevenue: number;
  activeOrders: number;
  totalProducts: number;
  lowStockCount: number;
  recentOrders: Order[];
}
