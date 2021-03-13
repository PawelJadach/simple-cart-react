import PropTypes from 'prop-types';

export const ShopItemPropTypes = PropTypes.shape({
  pid: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  isBlocked: PropTypes.bool,
});

export const ShopItemInCartPropTypes = PropTypes.shape({
  pid: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  isBlocked: PropTypes.bool,
  count: PropTypes.number,
});