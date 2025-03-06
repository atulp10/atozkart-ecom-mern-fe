import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { EMPTY_CART, selectCartItems, selectTotal } from '../redux/cartSlice';
import { selectDetails } from '../redux/checkoutSLice';
import { placeOrder, sendEmail, updateProductStock } from '../getProductsData';
import { useNavigate } from 'react-router';

export default function CardPayment({ cs }) {
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const total = useSelector(selectTotal);
    const cartItems = useSelector(selectCartItems);
    const user = JSON.parse(sessionStorage.getItem('userin'));
    const shippingAddress = useSelector(selectDetails);
    const redirect = useNavigate();
    const dispatch = useDispatch();

    const handlePayment = async () => {
        if (!stripe || !elements) {
            toast.error("stripe is not initalized");
            return;
        }

        try {
            setLoading(true);
            const cardElement = elements.getElement(CardElement);
            const result = await stripe.confirmCardPayment(cs, { payment_method: { card: cardElement } })

            if (result.paymentIntent) {
                if (result.paymentIntent.status === 'succeeded') {
                    toast.success('Payment successful');

                    const itemAndQty = [];

                    for (let item of cartItems) {
                        itemAndQty.push({ itemId: item._id, title: item.title, image: item.image, price: item.price, qty: item.qty });
                    }

                    const orderDetails = {
                        email: user.email, name: user.username, orderedItems: itemAndQty, totalAmount: total,
                        shippingAddress, paymentMode: 'online', orderStatus: 'placed', paymentStatus: 'paid',
                        orderDate: new Date().toLocaleDateString(), orderTime: new Date().toLocaleTimeString(),
                        createdAt: new Date()
                    };

                    await placeOrder(orderDetails)
                    toast.success('Order placed');
                    await updateProductStock(cartItems);
                    await sendEmail(orderDetails);
                    setLoading(false);
                    dispatch(EMPTY_CART());
                    redirect('/thankyou');
                }
            }
            else if (result.error) {
                console.error(result.error);
                toast.error('Payment failed');
                setLoading(false);
            }
        }
        catch (err) {
            setLoading(false);
            toast.error(err.message);
        }
    }

    return (
        <div className='mt-2 border-gray-400  m-2'>
            <div className='border-1 border-gray-400 p-3 rounded-sm'>
                <CardElement ></CardElement>
            </div>
            <div className="mt-3">
                <button
                    className={`w-full py-3 rounded-sm ${loading ? 'bg-indigo-300' : 'bg-indigo-500 hover:bg-indigo-400'}  text-white cursor-pointer`}
                    disabled={loading ? true : ''}
                    onClick={handlePayment}
                >
                    {loading ? <>
                        <svg class="mr-3 inline size-5 animate-spin border-4 border-gray-100 border-t-gray-400 rounded-full" viewBox="0 0 24 24">
                        </svg>
                        Processing…
                    </> : <> Pay Now</>}
                </button>

            </div>
        </div>
    )
}
