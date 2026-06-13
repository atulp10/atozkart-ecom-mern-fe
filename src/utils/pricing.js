export const FREE_SHIPPING_THRESHOLD = 20;
export const SHIPPING_FEE = 5;

export function calculateSubtotal(items = []) {
  return items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0);
}

export function calculateShipping(subtotal, hasItems = subtotal > 0) {
  return hasItems && subtotal < FREE_SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;
}

export function calculateOrderTotal(items = []) {
  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal, items.length > 0);
  return { subtotal, shipping, total: subtotal + shipping };
}
