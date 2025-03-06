import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';
import { selectMyOrders } from '../../redux/orderSlice';
import { toast } from 'react-toastify';
import OrderStatus from './OrderStatus';

export default function AdminViewOrder() {

    const { id } = useParams();
    const orders = useSelector(selectMyOrders);
    const order = orders.find(o => o._id === id);
    const shipAdd = order.shippingAddress;
    const cartItems = order.orderedItems;

    return (
        <div>
            <div className="p-4">
                <h1 className='text-2xl font-bold mb-1'>Order Details</h1>
                <hr className='text-gray-400 mb-5' />
                <div className='mb-6'>
                    <div className='mb-5 flex gap-3 items-center'>
                        <span>Order status: </span>
                        <span className='font-bold'>{order.orderStatus} </span>
                        <OrderStatus order={order} />
                    </div>
                    <h3 className='font-bold text-lg'>Shipping Information</h3>
                    <div>{shipAdd.fullname}</div>
                    <div>{shipAdd.email}</div>
                    <div>{shipAdd.phone}</div>
                    <div>{shipAdd.addressline1}</div>
                    <div>{shipAdd.addressline2}</div>
                    <div>{shipAdd.area}, {shipAdd.city}-{shipAdd.pincode}, {shipAdd.state}</div>
                </div>
                <div>
                    <h3 className='font-bold text-lg mb-1'>Ordered Items</h3>
                    <table className='min-w-full border-1'>
                        <thead>
                            <tr className=''>
                                <th className='text-left py-3 pr-2 pl-2'>Item</th>
                                <th className='text-left py-3 pr-2'>ProductID</th>
                                <th className='text-left py-3 pr-2'>Price</th>
                                <th className='text-left py-3 pr-2'>Qty</th>
                                <th className='text-left py-3 pr-2'>Total</th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-700'>
                            {cartItems.map((p, i) => <tr key={i} className=''>
                                <td className=' mb-1 pr-2 pl-2 pb-2'><img src={p.image} className='inline w-10 h-10 rounded mr-3' alt="" />{p.title}</td>
                                <td className=' mb-1 pr-2'>{p.itemId}</td>
                                <td className=' mb-1 pr-2'>${Number(p.price).toFixed(2)}</td>
                                <td className=' mb-1 pr-2'>{p.qty}</td>
                                <td className=' mb-1 pr-2'>${Number(p.price * p.qty).toFixed(2)}</td>
                            </tr>)}

                        </tbody>
                    </table>
                    <div className='mt-5'>
                        <div>Total amount to be paid: <b>${order.totalAmount}</b></div>
                        <div>Payment Mode: {order.paymentMode}</div>
                        <div>Payment Status: {order.paymentStatus}</div>
                        <div>OrderID: {order._id}</div>
                        <div>Order Date & Time: {order.orderDate} {order.orderTime}</div>
                    </div>

                </div>
                <div className='mt-5'>
                    <Link to={`/admin/allorders`}>
                        <button className='px-3 py-0.5 bg-green-600 hover:bg-green-500 rounded-md text-white'>Back to All Orders</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
