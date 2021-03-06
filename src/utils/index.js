export const formatPrice = price =>
  price ? new Intl.NumberFormat('pl', { style: 'currency', currency: 'PLN' }).format(price) : null;