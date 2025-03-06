import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems, selectTotal } from '../redux/cartSlice'
import { SET_DETAILS } from '../redux/checkoutSLice';
import { useLocation, useNavigate } from 'react-router';

export default function CheckoutSummary({ data }) {

    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectTotal);
    const dispatch = useDispatch();
    const redirect = useNavigate();
    const location = useLocation();
    // console.log(location);

    const handleCheckout = e => {
        e.preventDefault();
        dispatch(SET_DETAILS(data));
        redirect('/payment', { state: { checkout1: true } });
    }

    return (
        <>
            <div className="shadow-xl p-3 sm:p-8 h-fit m-1 mb-10 rounded-2xl flex-1">
                <h2 className="text-2xl text-gray-900 pb-1">Checkout Summary</h2>
                <hr className='text-gray-400' />
                <div>
                    <table className='min-w-full'>
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
                            <tr className='border-t-gray-300 border-1 border-r-0 border-b-0 border-l-0 '>
                                <td colSpan={3} className='py-2'>Total Payabble Amount (Incl. of all taxes):</td>
                                <td><b>${Number(total).toFixed(2)}</b></td>
                            </tr>
                        </tbody>
                    </table>
                    {location.state?.checkout1 ||
                        <button
                            className={`w-full mt-2 py-2 ${cartItems.length === 0 ? 'bg-gray-500' : 'bg-blue-600 cursor-pointer hover:bg-blue-500'}  text-white text-xl rounded-md`}
                            onClick={handleCheckout} disabled={cartItems.length === 0 ? 'true' : ''}
                        >
                            Proceed to checkout
                        </button>
                    }

                </div>
            </div>

        </>
    )
}
