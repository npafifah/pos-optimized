// src/components/CartSummary.jsx
import React from 'react';

const CartSummary = ({ cart }) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div style={{ background: '#060606ff', padding: '12px', borderRadius: '6px', marginBottom: '16px' }}>
      <strong>Keranjang:</strong> {totalItems} item • Rp{totalPrice.toLocaleString('id-ID')}
    </div>
  );
};

export default CartSummary;
