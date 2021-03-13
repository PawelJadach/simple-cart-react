import React, { useContext } from 'react';
import styles from './Cart.module.css';
import { CartItem } from './CartItem/CartItem';
import { formatPrice } from '../../utils';
import { CartContext } from '../../context/CartContext';

const Cart = () => {
  const cartContext = useContext(CartContext);
  const totalPrice = cartContext.cart.reduce((acc, currItem) => acc + (Number.parseFloat(currItem.price) * 100 * currItem.count) , 0) / 100;

  return (
    <div className={styles.container}>
      <h3>Koszyk</h3>
      <div className={styles.items}>
        {
          cartContext.cart.length > 0 ? (
            <div>
              <ul className={styles.list}>
                {cartContext.cart.map(item =>
                  <CartItem
                    key={item.pid}
                    item={item}
                    isBlocked={item.pid === "14cc426d-8db0-46c4-b579-3f61ff3568ca"}
                  />
                )}
              </ul>
              <b>SUMA: {formatPrice(totalPrice)}</b>
            </div>
          ) : (
            <p>Brak produktów w koszyku</p>
          )
        }
      </div>
    </div>
  );
};

export {
    Cart
};
