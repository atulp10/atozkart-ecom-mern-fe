import React, { useEffect, useState } from 'react'
import CheckoutSummary from './CheckoutSummary'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY_CART, selectCartItems, selectTotal } from '../redux/cartSlice';
import CardPayment from './CardPayment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import { placeOrder, sendEmail, updateProductStock } from '../getProductsData';
import { selectDetails } from '../redux/checkoutSLice';
import { useNavigate } from 'react-router';

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`);

export default function PaymentPage() {

    const [payMode, setPayMode] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);
    const total = useSelector(selectTotal);
    const cartItems = useSelector(selectCartItems);
    const user = JSON.parse(sessionStorage.getItem('userin'));
    const shippingAddress = useSelector(selectDetails);
    const redirect = useNavigate();
    const dispatch = useDispatch();

    const getClientSecret = async () => {
        try {
            let res = await axios.post(`${import.meta.env.VITE_NODE_SERVER}/create-payment-intent`, { amount: total }, { withCredentials: true });            
            setClientSecret(res.data.clientSecret);
        }
        catch (err) { console.error(err.message) }
    }

    useEffect(() => {
        if (payMode === 'online') {
            getClientSecret();
        }
    }, [payMode]);

    const handlePlaceOrder = async () => {
        try {
            setLoading(true);
            const itemAndQty = [];

            for (let item of cartItems) {
                itemAndQty.push({ itemId: item._id, title: item.title, image: item.image, price: item.price, qty: item.qty });
            }

            const orderDetails = {
                email: user.email, name: user.username, orderedItems: itemAndQty, totalAmount: total,
                shippingAddress, paymentMode: 'cod', orderStatus: 'placed', paymentStatus: 'unpaid',
                orderDate: new Date().toLocaleDateString(), orderTime: new Date().toLocaleTimeString(),
                createdAt: new Date()
            }

            await placeOrder(orderDetails)
            toast.success('Order placed');
            await updateProductStock(cartItems);
            await sendEmail(orderDetails);
            setLoading(false);
            dispatch(EMPTY_CART());
            redirect('/thankyou');
        }
        catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <>
            <Elements stripe={stripePromise}>
                <div className="bg-white flex flex-col gap-5 mx-auto md:flex-row sm:mt-2 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="shadow-xl p-3 sm:p-8 m-1 rounded-2xl flex-1">
                        <h2 className="text-2xl text-gray-900 mb-2">Payments</h2>
                        <hr className='text-gray-400' />

                        <div className="mt-5">
                            <div>Select mode of payment:</div>
                            <fieldset className='border-1 border-gray-400 rounded-sm p-2 mt-2'>
                                <input type="radio" name="paymode" id="cod" onClick={() => setPayMode('cod')} value='cod' />
                                <label htmlFor="cod" className='ml-1'>Cash On Delivery</label>
                                <br />
                                <input type="radio" name="paymode" id="online" onClick={() => setPayMode('online')} value='online' />
                                <label htmlFor="online" className='ml-1'>Online</label>
                                <br />
                                {(clientSecret !== '' && payMode === 'online') &&
                                    <CardPayment cs={clientSecret} />
                                }
                            </fieldset>

                            {(payMode === 'cod') &&
                                <div className="mt-3">
                                    <button
                                        className={`w-full py-3 rounded-sm ${loading ? 'bg-indigo-300' : 'bg-indigo-500 hover:bg-indigo-400'} text-white cursor-pointer`}
                                        disabled={loading ? true : ''}
                                        onClick={handlePlaceOrder}
                                    >
                                        {loading ? <>
                                            <svg class="mr-3 inline size-5 animate-spin border-4 border-gray-100 border-t-gray-400 rounded-full" viewBox="0 0 24 24">
                                            </svg>
                                            Processing…
                                        </> : <> Place Order</>}
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                    <CheckoutSummary />
                </div>
            </Elements>

        </>
    )
}
