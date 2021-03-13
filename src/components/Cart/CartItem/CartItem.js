import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ShopItemInCartPropTypes } from '../../../propTypes';
import clsx from 'clsx';

import styles from './CartItem.module.css';
import { useDebounce } from '../../../hooks/useDebounce';
import { checkIsAvailable } from '../../../service/api';

const CartItem = ({ item, isBlocked, addOne, removeOne, removeFromCart, setCount }) => {
  const debouncedItemCount = useDebounce(item.count, 2000);

  useEffect(() => {
    async function fetchIsAvailable() {
      const response = await checkIsAvailable(item);

      if(response.isError && response.errorType === 'INCORRECT_QUANTITY') {
        window.alert(`Maksymalna liczba ${item.name} w koszyku to ${item.max}!`)
        setCount(item.pid, item.min);
      }
    }
    fetchIsAvailable();
  }, [debouncedItemCount]);

  const handleAddOne = product => () => {
    const isMaxInCart = product.count >= product.max;

    if(isMaxInCart) {
      window.alert(`Maksymalna liczba ${product.name} w koszyku to ${product.max}!`)
    } else {
      addOne(product)
    }
  };

  const handleRemoveOne = product => () => {
    const isMinInCart = product.count <= product.min;

    if(isMinInCart) {
      window.alert(`Minimalna liczba produktu ${product.name} w koszyku to ${product.min}!`)
    } else {
      removeOne(product)
    }
  };

  const handleRemoveFromCart = product => () => {
    removeFromCart(product)
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
  addOne: PropTypes.func,
  removeOne: PropTypes.func,
  removeFromCart: PropTypes.func,
  isBlocked: PropTypes.bool,
  setCount: PropTypes.func,
};

export {
    CartItem
}