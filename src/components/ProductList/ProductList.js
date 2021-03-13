import React from 'react';
import styles from './ProductList.module.css';
import { AddToCartIcon } from '../../assets/shopping-cart.js';
import PropTypes from 'prop-types'
import { ShopItemPropTypes } from '../../propTypes';

const ProductList = ({ productList = null, addToCart }) => {
  const handleAddToCart = product => () => {
    addToCart(product);
  };

  if (!productList) {
    return <p className={styles.container}>Ładowanie produktów</p>
  }

  return (
    <div className={styles.container}>
      <h3>Lista produktów</h3>
      {productList.length > 0 ? (
        <ul className={styles.list}>
          {productList.map(product =>
            <li key={product.pid} className={styles.row}>
              <span className={styles.productName}>{product.name}</span>
              <span>
                <b className={styles.price}>{product.price}zł</b>
                <span onClick={handleAddToCart(product)} className={styles.icon}><AddToCartIcon /></span>
              </span>
            </li>
          )}
        </ul>
      ) : (
        <p>Brak produktów na liście.</p>
      )}
    </div>
  )
};

ProductList.propTypes = {
  productList: PropTypes.arrayOf(ShopItemPropTypes),
  addToCart: PropTypes.func,
}

export {
    ProductList
};
