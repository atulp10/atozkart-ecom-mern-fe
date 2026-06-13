import { request } from './api/client';

export const getLocalProducts = () => request({ url: '/products', method: 'GET' });

export const placeOrder = (orderDetails, idempotencyKey) => request({
  url: '/orders',
  method: 'POST',
  data: orderDetails,
  headers: { 'Idempotency-Key': idempotencyKey },
});

export const getMyOrders = (url = '/orders') => request({ url, method: 'GET' });

export const logout = () => request({ url: '/users/logout', method: 'POST' });
