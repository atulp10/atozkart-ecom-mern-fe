import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMyOrders, SET_MY_ORDERS } from '../../redux/orderSlice'
import { getMyOrders } from '../../getProductsData';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

export default function AdminAllOrders() {

    const orders = useSelector(selectMyOrders);
    const dispatch = useDispatch();

    useEffect(() => {
        getMyOrders('/orders')
            .then(res => { dispatch(SET_MY_ORDERS(res)) })
            .catch(err => { toast.error(err.message) });
    }, [dispatch])

    return (
        <>
            <div className="p-4">
                <h1 className='text-2xl font-bold mb-1'>All Orders</h1>
                <hr className='text-gray-400 mb-8' />
                <table className='min-w-full'>
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
                    {orders.length===0 && <tr><td colSpan='7' className='text-center'>No orders found</td></tr>}
                        {orders.map((order, i) => <tr key={order._id}>
                            <td className='px-6 py-3 text-left'>{i + 1}</td>
                            <td className='px-6 py-3 text-left'>{order._id}</td>
                            <td className='px-6 py-3 text-left'>${order.totalAmount}</td>
                            <td className='px-6 py-3 text-left'>{order.paymentMode}</td>
                            <td className='px-6 py-3 text-left'>{order.paymentStatus}</td>
                            <td className='px-6 py-3 text-left'>{order.orderStatus}</td>
                            <td className='px-6 py-3 text-left'>
                                <Link to={`/admin/allorders/${order._id}`}>
                                    <button className='px-3 py-0.5 bg-green-600 hover:bg-green-500 rounded-md text-white'>View</button>
                                </Link>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </>
    )
}
