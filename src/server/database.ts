import fs from 'fs';
import path from 'path';
import { Product, Order, UserProfile, Category, Collection, AdminMetrics } from '../types';
import { PRODUCTS } from '../data/products';
import { CATEGORIES, COLLECTIONS } from '../data/categories';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'velora_database.json');

export interface VeloraDatabaseSchema {
  products: Product[];
  categories: Category[];
  collections: Collection[];
  orders: Order[];
  users: UserProfile[];
  meta: {
    lastUpdated: string;
    version: string;
  };
}

// Initial seed data
const SEED_DATA: VeloraDatabaseSchema = {
  products: PRODUCTS,
  categories: CATEGORIES,
  collections: COLLECTIONS,
  orders: [
    {
      id: 'VL-84920',
      date: 'August 28, 2025',
      status: 'in_transit',
      step: 2,
      trackingNumber: 'DHL-EU-8921049281',
      courier: 'DHL Carbon Neutral Express',
      estimatedDelivery: 'September 5, 2025',
      items: [
        {
          productId: 'vl-trench-01',
          productName: 'Castleford Storm Gabardine Trench Coat',
          image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
          price: 680,
          quantity: 1,
          size: 'UK 8 / US 4',
          color: 'Honey Sand',
          sku: 'VL-W-OUT-001'
        }
      ],
      subtotal: 680,
      discount: 0,
      tax: 47.6,
      shippingCost: 0,
      total: 727.6,
      deliveryMethod: 'standard',
      paymentMethod: 'card',
      shippingAddress: {
        fullName: 'Genevieve Laurent',
        email: 'genevieve.laurent@velora.com',
        address: '14 Mayfair Square, Flat 3B',
        city: 'London',
        postal: 'W1J 8AJ',
        country: 'United Kingdom',
        phone: '+44 20 7946 0912'
      }
    }
  ],
  users: [
    {
      id: 'usr-1',
      name: 'Genevieve Laurent',
      email: 'genevieve.laurent@velora.com',
      phone: '+44 20 7946 0912',
      role: 'customer',
      memberSince: '2024',
      preferredLanguage: 'English (UK)',
      preferredCurrency: 'USD'
    },
    {
      id: 'usr-admin',
      name: 'Velora Atelier Director',
      email: 'admin@velora.com',
      phone: '+44 20 7946 0000',
      role: 'admin',
      memberSince: '2023',
      preferredLanguage: 'English (UK)',
      preferredCurrency: 'USD'
    }
  ],
  meta: {
    lastUpdated: new Date().toISOString(),
    version: '2.0.0'
  }
};

class DatabaseService {
  private data: VeloraDatabaseSchema;

  constructor() {
    this.ensureDbDir();
    this.data = this.readFromDisk();
  }

  private ensureDbDir() {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
  }

  private readFromDisk(): VeloraDatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        // Ensure products are synchronized with all rich categories
        if (parsed && Array.isArray(parsed.products) && parsed.products.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading database from disk, using seed:', e);
    }

    // Initialize with seed
    this.writeToDisk(SEED_DATA);
    return SEED_DATA;
  }

  private writeToDisk(data: VeloraDatabaseSchema) {
    try {
      this.ensureDbDir();
      data.meta.lastUpdated = new Date().toISOString();
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error writing database to disk:', e);
    }
  }

  // --- PRODUCTS ---
  public getProducts(filters?: {
    group?: string;
    category?: string;
    collection?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    isNew?: boolean;
    isBestSeller?: boolean;
    isFeatured?: boolean;
    sort?: string;
  }): Product[] {
    let list = [...this.data.products];

    if (filters?.group && filters.group !== 'All') {
      list = list.filter(p => p.group.toLowerCase() === filters.group!.toLowerCase());
    }
    if (filters?.category) {
      list = list.filter(p => p.category.toLowerCase() === filters.category!.toLowerCase());
    }
    if (filters?.collection) {
      list = list.filter(p => p.collectionId?.toLowerCase() === filters.collection!.toLowerCase());
    }
    if (filters?.isNew) {
      list = list.filter(p => p.isNew);
    }
    if (filters?.isBestSeller) {
      list = list.filter(p => p.isBestSeller);
    }
    if (filters?.isFeatured) {
      list = list.filter(p => p.isFeatured);
    }
    if (typeof filters?.minPrice === 'number') {
      list = list.filter(p => p.price >= filters.minPrice!);
    }
    if (typeof filters?.maxPrice === 'number') {
      list = list.filter(p => p.price <= filters.maxPrice!);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.materials.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    if (filters?.sort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (filters?.sort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (filters?.sort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (filters?.sort === 'newest') {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return list;
  }

  public getProductById(id: string): Product | undefined {
    return this.data.products.find(p => p.id === id);
  }

  public addProduct(product: Partial<Product>): Product {
    const newProduct: Product = {
      id: product.id || `vl-${Date.now()}`,
      sku: product.sku || `VL-${Math.floor(1000 + Math.random() * 9000)}`,
      name: product.name || 'Velora Garment',
      subtitle: product.subtitle || '',
      brand: product.brand || 'Velora Studio',
      category: product.category || 'women-outerwear',
      group: product.group || 'Women',
      price: product.price || 350,
      stock: true,
      stockCount: product.stockCount || 12,
      rating: 5.0,
      reviewsCount: 0,
      images: product.images && product.images.length > 0 ? product.images : ['https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop'],
      colors: product.colors && product.colors.length > 0 ? product.colors : [{ name: 'Noir', hex: '#111111' }],
      sizes: product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L'],
      description: product.description || 'Crafted with premium materials.',
      details: product.details || ['Hand-finished artisan tailoring'],
      materials: product.materials || '100% Virgin Natural Fibers',
      origin: product.origin || 'Made in Europe',
      careGuide: product.careGuide || 'Dry clean only'
    };

    this.data.products.unshift(newProduct);
    this.writeToDisk(this.data);
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.data.products.findIndex(p => p.id === id);
    if (idx === -1) return null;

    this.data.products[idx] = { ...this.data.products[idx], ...updates };
    this.writeToDisk(this.data);
    return this.data.products[idx];
  }

  public deleteProduct(id: string): boolean {
    const initLen = this.data.products.length;
    this.data.products = this.data.products.filter(p => p.id !== id);
    if (this.data.products.length < initLen) {
      this.writeToDisk(this.data);
      return true;
    }
    return false;
  }

  // --- CATEGORIES & COLLECTIONS ---
  public getCategories(): Category[] {
    return this.data.categories;
  }

  public getCollections(): Collection[] {
    return this.data.collections;
  }

  // --- ORDERS ---
  public getOrders(): Order[] {
    return this.data.orders;
  }

  public getOrderById(id: string): Order | undefined {
    return this.data.orders.find(o => o.id === id);
  }

  public createOrder(orderPayload: {
    items: Array<{ productId: string; quantity: number; size: string; color: string; price?: number; image?: string }>;
    shippingAddress: any;
    deliveryMethod: 'standard' | 'express';
    paymentMethod: 'card' | 'apple_pay' | 'klarna' | 'wire';
    discount?: number;
  }): Order {
    let subtotal = 0;
    const orderItems = orderPayload.items.map(item => {
      const prod = this.getProductById(item.productId);
      const price = prod ? prod.price : item.price || 100;
      subtotal += price * item.quantity;
      return {
        productId: item.productId,
        productName: prod ? prod.name : 'Velora Garment',
        image: prod?.images[0] || item.image || 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
        price,
        quantity: item.quantity,
        size: item.size,
        color: item.color || 'Standard',
        sku: prod?.sku || 'VL-PIECE'
      };
    });

    const discount = orderPayload.discount || 0;
    const shippingCost = orderPayload.deliveryMethod === 'express' ? 14 : subtotal >= 120 ? 0 : 9.5;
    const tax = Math.round((subtotal - discount) * 0.07 * 100) / 100;
    const total = Math.round((subtotal - discount + tax + shippingCost) * 100) / 100;

    const newOrder: Order = {
      id: `VL-${Math.floor(10000 + Math.random() * 89999)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'processing',
      step: 0,
      trackingNumber: `DHL-EU-${Math.floor(10000000 + Math.random() * 89999999)}`,
      courier: orderPayload.deliveryMethod === 'express' ? 'DHL Express Worldwide' : 'DHL Carbon Neutral Ground',
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: orderItems,
      subtotal,
      discount,
      tax,
      shippingCost,
      total,
      deliveryMethod: orderPayload.deliveryMethod || 'standard',
      paymentMethod: orderPayload.paymentMethod || 'card',
      shippingAddress: orderPayload.shippingAddress
    };

    // Decrement stock
    orderPayload.items.forEach(item => {
      const prod = this.getProductById(item.productId);
      if (prod && typeof prod.stockCount === 'number') {
        prod.stockCount = Math.max(0, prod.stockCount - item.quantity);
        if (prod.stockCount === 0) prod.stock = false;
      }
    });

    this.data.orders.unshift(newOrder);
    this.writeToDisk(this.data);
    return newOrder;
  }

  public updateOrderStatus(orderId: string, status: string, step: number): Order | null {
    const order = this.data.orders.find(o => o.id === orderId);
    if (!order) return null;

    order.status = status as any;
    order.step = step;
    this.writeToDisk(this.data);
    return order;
  }

  // --- USERS & AUTHENTICATION ---
  public authenticateUser(email: string, password?: string): UserProfile {
    let user = this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      user = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].replace(/[\._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: email.toLowerCase(),
        phone: '+44 20 7946 0912',
        role: email.toLowerCase().includes('admin') ? 'admin' : 'customer',
        memberSince: new Date().getFullYear().toString(),
        preferredLanguage: 'English (US)',
        preferredCurrency: 'USD'
      };
      this.data.users.push(user);
      this.writeToDisk(this.data);
    }
    return user;
  }

  public authenticateWithGoogle(payload: { email: string; name?: string; avatar?: string; googleId?: string }): UserProfile {
    const cleanEmail = payload.email.toLowerCase().trim();
    let user = this.data.users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      const derivedName = payload.name || cleanEmail.split('@')[0].replace(/[\._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      user = {
        id: `usr-google-${Date.now()}`,
        name: derivedName,
        email: cleanEmail,
        phone: '+1 415 555 0199',
        role: cleanEmail.includes('admin') ? 'admin' : 'customer',
        memberSince: new Date().getFullYear().toString(),
        preferredLanguage: 'English (US)',
        preferredCurrency: 'USD'
      };
      this.data.users.push(user);
      this.writeToDisk(this.data);
    } else if (payload.name && user.name === 'Valued Client') {
      user.name = payload.name;
      this.writeToDisk(this.data);
    }
    return user;
  }

  public registerUser(name: string, email: string, phone?: string): UserProfile {
    const cleanEmail = email.toLowerCase().trim();
    let user = this.data.users.find(u => u.email.toLowerCase() === cleanEmail);
    if (user) return user;

    user = {
      id: `usr-${Date.now()}`,
      name: name.trim() || 'Valued Client',
      email: cleanEmail,
      phone: phone || '+44 20 7946 0912',
      role: cleanEmail.includes('admin') ? 'admin' : 'customer',
      memberSince: new Date().getFullYear().toString(),
      preferredLanguage: 'English (US)',
      preferredCurrency: 'USD'
    };
    this.data.users.push(user);
    this.writeToDisk(this.data);
    return user;
  }

  public getUserById(id: string): UserProfile | undefined {
    return this.data.users.find(u => u.id === id);
  }

  public getUserByEmail(email: string): UserProfile | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  // --- ADMIN METRICS ---
  public getAdminMetrics(): AdminMetrics {
    const totalRevenue = Math.round(this.data.orders.reduce((sum, o) => sum + o.total, 0) * 100) / 100;
    const activeOrders = this.data.orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length;
    const lowStockCount = this.data.products.filter(p => p.stockCount <= 6).length;

    return {
      totalRevenue,
      activeOrders,
      totalProducts: this.data.products.length,
      lowStockCount,
      recentOrders: this.data.orders.slice(0, 5)
    };
  }

  public resetToSeed(): void {
    this.data = { ...SEED_DATA, meta: { lastUpdated: new Date().toISOString(), version: '2.0.0' } };
    this.writeToDisk(this.data);
  }
}

export const db = new DatabaseService();
