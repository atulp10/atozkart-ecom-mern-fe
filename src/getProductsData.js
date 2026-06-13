import { request } from './api/client';

export const getLocalProducts = () => request({ url: '/products', method: 'GET' });

export const placeOrder = (orderDetails) => request({ url: '/orders', method: 'POST', data: orderDetails });

export const getMyOrders = (url = '/orders') => request({ url, method: 'GET' });
