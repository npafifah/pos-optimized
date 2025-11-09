import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import ProductRow from './ProductRow';

const ProductList = ({ filteredProducts, onAddToCart }) => (
  <Virtuoso
    style={{ height:600 }}
    totalCount={filteredProducts.length}
    itemContent={index => (
      <ProductRow
        product={filteredProducts[index]}
        onAddToCart={onAddToCart}
      />
    )}
  />
);

export default ProductList;
