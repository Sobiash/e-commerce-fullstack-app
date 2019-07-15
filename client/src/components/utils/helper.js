export const calculateTotal = cartDetail => {
  let total = 0;

  cartDetail.forEach(item => {
    total += parseInt(item.product.price, 10) * item.quantity;
  });
  return total;
};
