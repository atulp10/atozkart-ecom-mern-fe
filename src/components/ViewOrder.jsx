import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';
import { selectMyOrders, SET_MY_ORDERS } from '../redux/orderSlice';
import { getMyOrders } from '../getProductsData';
import { getErrorMessage } from '../api/client';
import { getStoredUser } from '../utils/session';
import { GoArrowLeft } from 'react-icons/go';

export default function ViewOrder() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orders = useSelector(selectMyOrders);
  const order = orders.find((item) => item._id === id);
  const [loading, setLoading] = useState(!order);
  const [error, setError] = useState('');

  useEffect(() => {
    if (order) return;
    const user = getStoredUser();
    getMyOrders(`/orders?email=${encodeURIComponent(user.email)}`)
      .then((data) => dispatch(SET_MY_ORDERS(data)))
      .catch((err) => setError(getErrorMessage(err, 'Unable to load order')))
      .finally(() => setLoading(false));
  }, [dispatch, order]);

  if (loading) return <p className="p-8">Loading order...</p>;
  if (error) return <p className="p-8 text-red-600">{error}</p>;
  if (!order) return <p className="p-8">Order not found.</p>;

  const shipping = order.shippingAddress || {};
  return (
    <article className="p-3 m-1 sm:p-8 rounded-2xl shadow-2xl h-fit sm:mx-10 sm:max-w-lg mb-10 text-gray-800">
      <h2 className="text-2xl pb-1">Order Details</h2><hr className="text-gray-400 mb-2" />
      <dl className="grid grid-cols-2 gap-1 p-3 mt-3 border border-gray-400 rounded-xl">
        <dt>Order date and time</dt><dd>{order.orderDate} {order.orderTime}</dd>
        <dt>Order ID</dt><dd className="break-words">{order._id}</dd>
        <dt>Order total</dt><dd>${Number(order.totalAmount).toFixed(2)}</dd>
        <dt>Order status</dt><dd className="font-bold">{order.orderStatus}</dd>
      </dl>
      <h3 className="font-bold text-lg mt-3">Shipping Information</h3>
      <div className="p-3 mt-1 border border-gray-400 rounded-xl">
        <p>{shipping.fullname}</p><p>{shipping.email}</p><p>{shipping.phone}</p>
        <p>{[shipping.addressline1, shipping.addressline2, shipping.area].filter(Boolean).join(', ')}</p>
        <p>{shipping.city} {shipping.pincode} {shipping.state}</p>
      </div>
      <h3 className="font-bold text-lg mt-3">Ordered Items</h3>
      <div className="p-3 mt-1 border border-gray-400 rounded-xl grid gap-y-3">
        {order.orderedItems.map((item) => <div className="flex gap-3" key={item.itemId}><img src={item.image} className="w-20 h-20 object-cover" alt={item.title} /><div><b>{item.title}</b><p>Unit price: ${Number(item.price).toFixed(2)}</p><p>Qty: {item.qty}</p></div></div>)}
      </div>
      <div className="grid grid-cols-2 p-3 mt-3 border border-gray-400 rounded-xl"><span>Payment mode</span><span>{order.paymentMode}</span><span>Payment status</span><span>{order.paymentStatus}</span></div>
      <Link to="/myorders" className="flex items-center gap-2 p-3 mt-3 border border-gray-400 rounded-xl"><GoArrowLeft /> Back to My Orders</Link>
    </article>
  );
}
