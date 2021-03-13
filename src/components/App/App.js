import React, { useEffect, useState } from 'react';
import { getProducts } from '../../service/api';
import { Cart } from '../Cart/Cart';
import { ProductList } from '../ProductList/ProductList';
import styles from './App.module.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function fetchMyProducts() {
      const products = await getProducts();

      setProducts(products);
    }

    fetchMyProducts();
  }, []);

  const handleAddToCart = product => {
    const productInCart = cart.find(item => item.pid === product.pid);

    if(productInCart) {
      const isMaxInCart = productInCart.count >= product.max;

      if(isMaxInCart) {
        window.alert(`Maksymalna liczba ${product.name} w koszyku to ${product.max}!`)
      } else {
        const newCart = cart.map(item => {
          if(item.pid === product.pid) {
            return {
              ...item,
              count: item.count + 1,
            }
          } else {
            return item;
          }
        })

        setCart(newCart);
      }
    } else {
      setCart(prevCart => [...prevCart, { ...product, count: 1 }]);
    }
  };

  const handleAddOne = product => {
    const newCart = cart.map(item => item.pid === product.pid ? { ...item, count: item.count + 1 } : item);

    setCart(newCart);
  };

  const handleRemoveOne = product => {
    const newCart = cart.map(item => item.pid === product.pid ? { ...item, count: item.count - 1 } : item);

    setCart(newCart);
  };

  const handleRemoveFromCart = product => {
    const newCart = cart.filter(item => item.pid !== product.pid);

    setCart(newCart);
  };

  const setCount = (pid, count) => {
    const newCart = cart.map(item => item.pid === pid ? { ...item, count: count } : item);

    setCart(newCart);
  };

  return (
    <div className={styles.container}>
        <ProductList productList={products} addToCart={handleAddToCart} />
        <Cart
          cart={cart}
          addOne={handleAddOne}
          removeOne={handleRemoveOne}
          removeFromCart={handleRemoveFromCart}
          setCount={setCount}
        />
    </div>
  );
};

export {
    App
};
