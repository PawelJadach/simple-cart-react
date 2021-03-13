import React from 'react';
import PropTypes from 'prop-types';
import { ShopItemInCartPropTypes } from '../../propTypes';
import styles from './Cart.module.css';
import { CartItem } from './CartItem/CartItem';
import { formatPrice } from '../../utils';

const Cart = ({ cart, addOne, removeOne, removeFromCart, setCount }) => {
  const totalPrice = cart.reduce((acc, currItem) => acc + (Number.parseFloat(currItem.price) * 100 * currItem.count) , 0) / 100;

  return (
    <div className={styles.container}>
      <h3>Koszyk</h3>
      <div className={styles.items}>
        {
          cart.length > 0 ? (
            <div>
              <ul className={styles.list}>
                {cart.map(item =>
                  <CartItem
                    key={item.pid}
                    item={item}
                    isBlocked={item.pid === "14cc426d-8db0-46c4-b579-3f61ff3568ca"}
                    addOne={addOne}
                    removeOne={removeOne}
                    removeFromCart={removeFromCart}
                    setCount={setCount}
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

Cart.propTypes = {
  cart: PropTypes.arrayOf(ShopItemInCartPropTypes),
  addOne: PropTypes.func,
  removeOne: PropTypes.func,
  removeFromCart: PropTypes.func,
  setCount: PropTypes.func,
}

export {
    Cart
};
