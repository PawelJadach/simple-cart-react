export const getProducts = async () => {
  const res = await fetch('http://localhost:3030/api/cart');
  const products = await res.json();

  return products;
};

export const checkIsAvailable = async (product) => {
  const data = {
    pid: product.pid,
    quantity: product.count,
  };

  const res = await fetch('http://localhost:3030/api/product/check', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  const body = await res.json();

  return body;
};