// src/App.jsx
import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { products } from './data/products';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import CartSummary from './components/CartSummary';
import { getFromCache, setToCache } from './utils/searchCache';

const AboutPage = lazy(() => import('./components/AboutPage'));

const saveCartToStorage = (cart) => localStorage.setItem('pos-cart', JSON.stringify(cart));
const loadCartFromStorage = () => JSON.parse(localStorage.getItem('pos-cart')) || [];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState(() => loadCartFromStorage());
  const [view, setView] = useState('pos');
  const [cacheHit, setCacheHit] = useState(false);

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const filterProducts = (term) => {
    if (!term.trim()) {
      setCacheHit(false);
      return products;
    }

    const cacheKey = term.toLowerCase().trim();
    const cached = getFromCache(cacheKey);
    if (cached) {
      setCacheHit(true);
      return cached;
    }

    setCacheHit(false);
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(cacheKey) ||
        p.brand.toLowerCase().includes(cacheKey) ||
        p.category.toLowerCase().includes(cacheKey)
    );

    setToCache(cacheKey, filtered);
    return filtered;
  };

  const filteredProducts = useMemo(() => filterProducts(searchTerm), [searchTerm]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🛒 Point of Sales (POS) – Optimized</h1>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setView('pos')}>POS</button>
        <button onClick={() => setView('about')} style={{ marginLeft: '10px' }}>
          Tentang
        </button>
      </div>

      {view === 'pos' ? (
        <>
          <CartSummary cart={cart} />

          <SearchBar onSearch={setSearchTerm} />
          {searchTerm && (
            <small style={{ color: cacheHit ? 'green' : 'gray' }}>
              {cacheHit ? '✅ Hasil dari cache' : '🔍 Hasil baru dihitung'}
            </small>
          )}

          <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
            <ProductList filteredProducts={filteredProducts} onAddToCart={handleAddToCart} />
          </div>
        </>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <AboutPage />
        </Suspense>
      )}
    </div>
  );
}

export default App;
