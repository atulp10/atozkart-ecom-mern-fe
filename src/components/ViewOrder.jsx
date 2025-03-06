import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';
import { selectMyOrders } from '../redux/orderSlice';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";

export default function ViewOrder() {
    const { id } = useParams();
    const orders = useSelector(selectMyOrders);
    const order = orders.find(o => o._id === id);
    const shipAdd = order.shippingAddress;
    const cartItems = order.orderedItems;
    
    return (
        <div>
            <div className='p-3 m-1 sm:p-8 rounded-2xl shadow-2xl h-fit sm:mx-10 sm:max-w-lg mb-10 text-gray-800'>
                <h2 className='text-2xl pb-1'>Order Details</h2>
                <hr className='text-gray-400 mb-2' />
                <div className="grid grid-cols-2 p-3 mt-3 border-1 border-gray-400 rounded-xl">
                    <div>Order Date & Time</div>
                    <div>{order.orderDate} {order.orderTime}</div>
                    <div>Order ID</div>
                    <div className='break-words'>{order._id}</div>
                    <div>Order Total</div>
                    <div>${Number(order.totalAmount).toFixed(2)}</div>
                    <div>Order Status</div>
                    <div className='font-bold'>{order.orderStatus}</div>
                </div>
                <div className='mt-3'>
                    <h3 className='font-bold text-lg'>Shipping Information</h3>
                    <div className="grid grid-cols-2 p-3 mt-1 border-1 border-gray-400 rounded-xl">
                        <div>Name</div>
                        <div>{shipAdd.fullname}</div>
                        <div>Email</div>
                        <div>{shipAdd.email}</div>
                        <div>Phone</div>
                        <div>{shipAdd.phone}</div>
                        <div>Address</div>
                        <div>{shipAdd.addressline1}, {shipAdd.addressline2},{shipAdd.area}</div>
                        <div>City</div>
                        <div>{shipAdd.city}-{shipAdd.pincode} </div>
                        <div>State</div>
                        <div>{shipAdd.state}</div>
                    </div>

                </div>
                <div className='mt-3'>
                    <h3 className='font-bold text-lg'>Ordered Items</h3>
                    <div className="p-3 mt-1 border-1 border-gray-400 rounded-xl grid gap-y-3">
                        {cartItems.map((p, i) =>
                            <div className={`flex pb-2 ${(i===cartItems.length-1)?'':'border-b-1'} border-gray-400 `} key={i}>
                                <div className="flex-1">
                                    <img src={p.image} className='p-1' style={{}} alt="" />
                                </div>
                                <div className="flex-2 flex justify-between ">
                                    <div className="text-sm pl-2">
                                        <h3 className='font-bold'>{p.title}</h3>
                                            <div>Unit Price: ${p.price}</div>
                                            <div>Qty: {p.qty}</div>
                                    </div>
                                    
                                </div>
                            </div>
                        )}
                    </div>
                    {/* <table className='min-w-full border-1'>
                        <thead>
                            <tr className=''>
                                <th className='text-left py-3 pr-2'>Item</th>
                                <th className='text-left py-3 pr-2'>Price</th>
                                <th className='text-left py-3 pr-2'>Qty</th>
                                <th className='text-left py-3 pr-2'>Total</th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-700'>
                            {cartItems.map((p, i) => <tr key={i} className=''>
                                <td className=' mb-1 pr-2'><img src={p.image} className='inline w-10 h-10 rounded mr-3' alt="" />{p.title}</td>
                                <td className=' mb-1 pr-2'>${Number(p.price).toFixed(2)}</td>
                                <td className=' mb-1 pr-2'>{p.qty}</td>
                                <td className=' mb-1 pr-2'>${Number(p.price * p.qty).toFixed(2)}</td>
                            </tr>)}

                        </tbody>
                    </table> */}
                </div>
                <div className='mt-3'>
                    <h3 className='font-bold text-lg'>Order Summary</h3>
                    <div className="grid grid-cols-2 p-3 mt-1 border-1 border-gray-400 rounded-xl">
                        <div>Items Total</div>
                        <div className='text-right'>${Number(order.totalAmount).toFixed(2)}</div>
                        <div>Shipping Fees</div>
                        <div className='text-right'>${order.totalAmount<20?'5.00':'0.00'}</div>
                        <div>Promotion Applied</div>
                        <div className='text-right'>-$0.00</div>
                        <div className='font-bold text-lg'>Order Total</div>
                        <div className='font-bold text-right text-lg'>${Number(order.totalAmount).toFixed(2)}</div>
                    </div>
                </div>
                <div className='mt-3'>
                    <h3 className='font-bold text-lg'>Payment Information</h3>
                    <div className="grid grid-cols-2 p-3 mt-1 border-1 border-gray-400 rounded-xl">
                        <div>Payment Mode</div>
                        <div>{order.paymentMode}</div>
                        <div>Payment Status</div>
                        <div>{order.paymentStatus}</div>
                    </div>
                </div>
                <div className='mt-3'>
                    <div className="grid grid-cols-1 p-3 mt-1 border-1 border-gray-400 rounded-xl">
                        <Link to='/myorders'><div className='flex items-center gap-2 active:bg-blue-200'><GoArrowLeft className=''/> Back to My Orders</div></Link>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
