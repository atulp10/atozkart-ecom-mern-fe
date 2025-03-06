import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { sendEmail } from '../../getProductsData';

export default function OrderStatus({ order }) {

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(order.orderStatus);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure?')) {
            try {
                setLoading(true);

                const res = await fetch(`${import.meta.env.VITE_NODE_SERVER}/orders/${order._id}`, {
                    method: 'put',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ ...order, orderStatus: status, updatedAt: new Date() }),
                    credentials: 'include'
                })

                if (!res.ok) {
                    const errData = await res.text();
                    throw new Error(errData);
                }

                toast.success('Order updated');

                const orderDetails = {
                    email: order.email, name: order.name, orderedItems: order.orderedItems, totalAmount: order.totalAmount,
                    shippingAddress: order.shippingAddress, paymentMode: order.paymentMode, orderStatus: status, paymentStatus: order.paymentStatus,
                    orderDate: order.orderDate, orderTime: order.orderTime
                }

                await sendEmail(orderDetails);
                toast.success('Mail sent');
                setLoading(false);
                navigate('/admin/allorders');
            }
            catch (err) {
                setLoading(false);
                console.error('Error updating order: ',err);
                toast.error(err.message);
            }
        }
    }

    return (
        <>
            <select name="orderstatus" id="orderstatus" value={status} className='' onChange={(e) => setStatus(e.target.value)}>
                <option value="" disabled>Update Status</option>
                <option value="placed">Placed</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="outfordelivery">Out For Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
            </select>
            <form action="" className='' onSubmit={handleSubmit}>
                <button className={`px-3 py-0.5 ${loading ? 'bg-green-200' : 'bg-green-600 hover:bg-green-500'}  rounded-md text-white`} disabled={loading ? 'true' : ''}>Update</button>
            </form>
            {loading && <div className='flex items-center'>
                <svg class="mr-1 size-5 animate-spin border-4 border-gray-400 border-t-gray-300 rounded-full" viewBox="0 0 24 24">
                </svg>
                Processing…
            </div>}
        </>
    )
}
