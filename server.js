// server.js - Starter Express server for Week 2 assignment

// Import required modules
import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import { logger } from './middleware/logger.js';
import { authenticate } from './middleware/auth.js';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(logger);

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// ✅ GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// ✅ GET a specific product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// ✅ POST - Create a new product (Protected)
app.post('/api/products', authenticate, (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }

  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// ✅ PUT - Update a product (Protected)
app.put('/api/products/:id', authenticate, (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const { name, description, price, category, inStock } = req.body;

  product.name = name ?? product.name;
  product.description = description ?? product.description;
  product.price = price ?? product.price;
  product.category = category ?? product.category;
  product.inStock = inStock ?? product.inStock;

  res.json(product);
});

// ✅ DELETE - Remove a product (Protected)
app.delete('/api/products/:id', authenticate, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products.splice(index, 1);
  res.status(204).send();
});
// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

// ✅ Export app for testing (keep this LAST)
export default app;
