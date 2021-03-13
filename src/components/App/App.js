import React, { useEffect, useState } from 'react';
import { getProducts } from '../../service/api';
import { Cart } from '../Cart/Cart';
import { ProductList } from '../ProductList/ProductList';
import { CartContextProvider } from '../../context/CartContext';
import styles from './App.module.css';

const App = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function fetchMyProducts() {
      const products = await getProducts();

      setProducts(products);
    }

    fetchMyProducts();
  }, []);

  return (
    <div className={styles.container}>
      <CartContextProvider>
        <ProductList productList={products} />
        <Cart/>
      </CartContextProvider>
    </div>
  );
};

export {
    App
};
