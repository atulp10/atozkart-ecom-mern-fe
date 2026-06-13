import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';
import { selectMyOrders, SET_MY_ORDERS } from '../../redux/orderSlice';
import { getMyOrders } from '../../getProductsData';
import { getErrorMessage } from '../../api/client';
import OrderStatus from './OrderStatus';

export default function AdminViewOrder() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orders = useSelector(selectMyOrders);
  const order = orders.find((item) => item._id === id);
  const [loading, setLoading] = useState(!order);
  const [error, setError] = useState('');

  useEffect(() => {
    if (order) return;
    getMyOrders('/orders').then((data) => dispatch(SET_MY_ORDERS(data))).catch((err) => setError(getErrorMessage(err))).finally(() => setLoading(false));
  }, [dispatch, order]);

  if (loading) return <p className="p-6">Loading order...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!order) return <p className="p-6">Order not found.</p>;
  const shipping = order.shippingAddress || {};

  return <div className="p-4">
    <h1 className="text-2xl font-bold mb-1">Order Details</h1><hr className="text-gray-400 mb-5" />
    <div className="mb-5 flex gap-3 items-center"><span>Status: <b>{order.orderStatus}</b></span><OrderStatus order={order} /></div>
    <h3 className="font-bold text-lg">Shipping Information</h3>
    <p>{shipping.fullname} | {shipping.email} | {shipping.phone}</p><p>{[shipping.addressline1, shipping.addressline2, shipping.area, shipping.city, shipping.pincode, shipping.state].filter(Boolean).join(', ')}</p>
    <div className="overflow-x-auto mt-5"><table className="min-w-full border"><thead><tr><th>Item</th><th>Product ID</th><th>Price</th><th>Qty</th><th>Total</th></tr></thead><tbody>{order.orderedItems.map((item) => <tr key={item.itemId}><td><img src={item.image} className="inline w-10 h-10 m-2" alt={item.title} />{item.title}</td><td>{item.itemId}</td><td>${Number(item.price).toFixed(2)}</td><td>{item.qty}</td><td>${Number(item.price * item.qty).toFixed(2)}</td></tr>)}</tbody></table></div>
    <div className="mt-5"><p>Total: <b>${Number(order.totalAmount).toFixed(2)}</b></p><p>Payment: {order.paymentMode} ({order.paymentStatus})</p></div>
    <Link to="/admin/allorders" className="inline-block mt-5 px-3 py-1 bg-green-600 hover:bg-green-500 rounded-md text-white">Back to All Orders</Link>
  </div>;
}
