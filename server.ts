import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { db } from './src/server/database';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // -------------------------------------------------------------
  // API ROUTES
  // -------------------------------------------------------------

  // Health check & DB status
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      database: 'connected',
      serverTime: new Date().toISOString()
    });
  });

  // Categories
  app.get('/api/categories', (req, res) => {
    res.json(db.getCategories());
  });

  // Collections
  app.get('/api/collections', (req, res) => {
    res.json(db.getCollections());
  });

  // Products with query filters
  app.get('/api/products', (req, res) => {
    const {
      group,
      category,
      collection,
      search,
      gender,
      isNew,
      isBestSeller,
      isFeatured,
      minPrice,
      maxPrice,
      sort
    } = req.query;

    const filtered = db.getProducts({
      group: (group as string) || (gender as string),
      category: category as string,
      collection: collection as string,
      search: search as string,
      isNew: isNew === 'true',
      isBestSeller: isBestSeller === 'true',
      isFeatured: isFeatured === 'true',
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      sort: sort as string
    });

    res.json({
      total: filtered.length,
      products: filtered
    });
  });

  // Single Product
  app.get('/api/products/:id', (req, res) => {
    const product = db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  });

  // Orders: Get list for user
  app.get('/api/orders', (req, res) => {
    res.json(db.getOrders());
  });

  // Orders: Create new order
  app.post('/api/orders', (req, res) => {
    const { items, shippingAddress, deliveryMethod, paymentMethod, discount = 0 } = req.body;

    if (!items || !items.length || !shippingAddress) {
      return res.status(400).json({ error: 'Invalid order payload' });
    }

    try {
      const newOrder = db.createOrder({
        items,
        shippingAddress,
        deliveryMethod: deliveryMethod || 'standard',
        paymentMethod: paymentMethod || 'card',
        discount
      });
      res.status(201).json(newOrder);
    } catch (e: any) {
      res.status(500).json({ error: e.message || 'Failed to create order' });
    }
  });

  // Single Order
  app.get('/api/orders/:id', (req, res) => {
    const order = db.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  });

  // Auth: Login
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email required' });
    }
    const user = db.authenticateUser(email, password);
    res.json({ user, token: `jwt-velora-${user.id}` });
  });

  // Auth: Google Sign-In
  app.post('/api/auth/google', (req, res) => {
    const { email, name, avatar, googleId } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Google email required' });
    }
    const user = db.authenticateWithGoogle({ email, name, avatar, googleId });
    res.json({
      user,
      token: `jwt-velora-google-${user.id}`,
      authProvider: 'google',
      message: 'Successfully authenticated via Google'
    });
  });

  // Auth: Apple Sign-In
  app.post('/api/auth/apple', (req, res) => {
    const { email, name } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Apple email required' });
    }
    const user = db.authenticateUser(email);
    res.json({
      user,
      token: `jwt-velora-apple-${user.id}`,
      authProvider: 'apple',
      message: 'Successfully authenticated via Apple'
    });
  });

  // Auth: Register
  app.post('/api/auth/register', (req, res) => {
    const { name, email, phone } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email required' });
    }
    const user = db.registerUser(name, email, phone);
    res.status(201).json({ user, token: `jwt-velora-${user.id}` });
  });

  // Auth: Current Session
  app.get('/api/auth/me', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ user: null });
    }
    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) {
      return res.status(401).json({ user: null });
    }
    const userIdMatch = token.match(/usr-[a-z0-9-]+/i);
    if (userIdMatch) {
      const foundUser = db.getUserById(userIdMatch[0]);
      if (foundUser) {
        return res.json({ user: foundUser });
      }
    }
    res.status(401).json({ user: null });
  });

  // Auth: Logout
  app.post('/api/auth/logout', (req, res) => {
    res.json({ success: true, message: 'Signed out successfully' });
  });

  // -------------------------------------------------------------
  // ADMIN API ROUTES
  // -------------------------------------------------------------
  app.get('/api/admin/metrics', (req, res) => {
    const metrics = db.getAdminMetrics();
    res.json(metrics);
  });

  // Admin Add Product
  app.post('/api/admin/products', (req, res) => {
    const newProduct = db.addProduct(req.body);
    res.status(201).json(newProduct);
  });

  // Admin Update Product
  app.put('/api/admin/products/:id', (req, res) => {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updated);
  });

  // Admin Delete Product
  app.delete('/api/admin/products/:id', (req, res) => {
    const success = db.deleteProduct(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ success: true });
  });

  // Admin Update Order Status
  app.put('/api/admin/orders/:id', (req, res) => {
    const { status, step } = req.body;
    const order = db.updateOrderStatus(req.params.id, status, step);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  });

  // Admin Seed Reset
  app.post('/api/admin/reset-db', (req, res) => {
    db.resetToSeed();
    res.json({ success: true, message: 'Database reset to verified seed state' });
  });

  // Static public assets (images, icons)
  app.use(express.static(path.join(process.cwd(), 'public')));

  // -------------------------------------------------------------
  // VITE MIDDLEWARE / STATIC ASSETS
  // -------------------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Velora Full-Stack Database Server running on http://localhost:${PORT}`);
  });
}

startServer();
