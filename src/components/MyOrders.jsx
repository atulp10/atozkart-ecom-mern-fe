import { useEffect, useState } from 'react'
import { getMyOrders } from '../getProductsData'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectMyOrders, SET_MY_ORDERS } from '../redux/orderSlice';
import { IoMdArrowDropright } from "react-icons/io";
import { clearStoredUser, getStoredUser } from '../utils/session';
import { getErrorMessage } from '../api/client';

export default function MyOrders() {
    const user = getStoredUser();
    const dispatch = useDispatch();
    const orders = useSelector(selectMyOrders);
    const navigate=useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyOrders(`/orders?email=${encodeURIComponent(user.email)}`)
            .then(res => { dispatch(SET_MY_ORDERS(res)) })
            .catch(err =>{
                if(err.response?.status === 401){
                    clearStoredUser();
                    navigate('/login');
                }
                toast.error(getErrorMessage(err, 'Unable to load orders'));
            })
            .finally(() => setLoading(false));
    }, [dispatch, navigate, user.email])

    return (
        <>
            <div className='p-3 sm:p-8 rounded-2xl shadow-xl h-fit sm:mx-10 text-gray-800'>
                <h2 className='text-2xl pb-1'>My Orders</h2>
                <hr className='text-gray-400 mb-2' />
                {/* <table className='min-w-full'>
                    <thead className='bg-green-100'>
                        <tr>
                            <th className='px-6 py-3 text-left'>Sr No</th>
                            <th className='px-6 py-3 text-left'>Order id</th>
                            <th className='px-6 py-3 text-left'>Amount</th>
                            <th className='px-6 py-3 text-left'>Payment Mode</th>
                            <th className='px-6 py-3 text-left'>Payment Status</th>
                            <th className='px-6 py-3 text-left'>Order Status</th>
                            <th className='px-6 py-3 text-left'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, i) => <tr key={i}>
                            <td className='px-6 py-3 text-left'>{i + 1}</td>
                            <td className='px-6 py-3 text-left'>{order.id}</td>
                            <td className='px-6 py-3 text-left'>{order.totalAmount}</td>
                            <td className='px-6 py-3 text-left'>{order.paymentMode}</td>
                            <td className='px-6 py-3 text-left'>{order.paymentStatus}</td>
                            <td className='px-6 py-3 text-left'>{order.orderStatus}</td>
                            <td className='px-6 py-3 text-left'>
                                <Link to={`/myorders/${order.id}`}>
                                    <button className='px-3 py-0.5 bg-green-600 hover:bg-green-500 rounded-md text-white'>View</button>
                                </Link>
                            </td>
                        </tr>)}
                    </tbody>
                </table> */}

                {loading && <p>Loading orders...</p>}
                {!loading && orders.length === 0 && <p>No orders found.</p>}
                {orders.map((order) => (
                    order.orderedItems.map((item) => (
                        <div className="flex p-1 mt-2 bg-gray-100 sm:w-1/2" key={`${order._id}-${item.itemId}`}>
                            <div className="flex-1">
                                <img src={item.image} className='p-1' alt={item.title} />
                            </div>
                            <div className="flex-2 flex justify-between ">
                                <div className="text-sm pl-2">
                                    <h3 className='font-bold'>{item.title}</h3>
                                    <div>Ordered on {order.orderDate}</div>
                                </div>
                                <div className='self-center'>
                                <Link to={`/myorders/${order._id}`}>
                                    <IoMdArrowDropright className='size-8 text-gray-500'/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ))}
            </div>
        </>
    )
}
