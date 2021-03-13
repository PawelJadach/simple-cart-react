import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ShopItemInCartPropTypes } from '../../../propTypes';
import clsx from 'clsx';

import styles from './CartItem.module.css';
import { useDebounce } from '../../../hooks/useDebounce';
import { checkIsAvailable } from '../../../service/api';
import { CartContext } from '../../../context/CartContext';

const CartItem = ({ item, isBlocked }) => {
  const cartContext = useContext(CartContext);

  const debouncedItemCount = useDebounce(item.count, 500);

  useEffect(() => {
    async function fetchIsAvailable() {
      const response = await checkIsAvailable(item);

      if(response.isError && response.errorType === 'INCORRECT_QUANTITY') {
        window.alert(response.message)
        cartContext.setCount(item.pid, item.min);
      }
    }
    fetchIsAvailable();
  }, [debouncedItemCount]);

  const handleAddOne = product => () => {
    const isMaxInCart = product.count >= product.max;

    if(isMaxInCart) {
      window.alert(`Maksymalna liczba ${product.name} w koszyku to ${product.max}!`)
    } else {
      cartContext.addOne(product)
    }
  };

  const handleRemoveOne = product => () => {
    const isMinInCart = product.count <= product.min;

    if(isMinInCart) {
      window.alert(`Minimalna liczba produktu ${product.name} w koszyku to ${product.min}!`)
    } else {
      cartContext.removeOne(product)
    }
  };

  const handleRemoveFromCart = product => () => {
    cartContext.removeFromCart(product)
  };

  return (
    <li className={styles.item} key={item.pid}>
      <span>{item.name}</span>
      <span>
        {item.count}
        <button disabled={isBlocked} onClick={handleAddOne(item)} className={styles.button}>+</button>
        <button disabled={isBlocked} onClick={handleRemoveOne(item)} className={styles.button}>-</button>
        <button onClick={handleRemoveFromCart(item)} className={clsx(styles.button, styles.buttonRemove)}>x</button>
      </span>
    </li>
  )
};

CartItem.propTypes = {
  item: ShopItemInCartPropTypes,
  isBlocked: PropTypes.bool,
};

export {
    CartItem
}