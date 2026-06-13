import { calculateOrderTotal } from './pricing';

export function buildOrderDetails({ cartItems, user, shippingAddress, paymentMode, paymentStatus }) {
  const { subtotal, shipping, total } = calculateOrderTotal(cartItems);
  return {
    email: user.email,
    name: user.username,
    orderedItems: cartItems.map(({ _id, title, image, price, qty }) => ({
      itemId: _id,
      title,
      image,
      price: Number(price),
      qty: Number(qty),
    })),
    subtotal,
    shippingAmount: shipping,
    totalAmount: total,
    shippingAddress,
    paymentMode,
    orderStatus: 'placed',
    paymentStatus,
  };
}
