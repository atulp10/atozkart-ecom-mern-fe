import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import CheckoutSummary from './CheckoutSummary';
import CardPayment from './CardPayment';
import { EMPTY_CART, selectCartItems } from '../redux/cartSlice';
import { CLEAR_DETAILS, selectDetails } from '../redux/checkoutSLice';
import { placeOrder } from '../getProductsData';
import { request, getErrorMessage } from '../api/client';
import { getStoredUser } from '../utils/session';
import { calculateOrderTotal } from '../utils/pricing';
import { buildOrderDetails } from '../utils/orders';
import { useNavigate } from 'react-router';

const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null;

export default function PaymentPage() {
  const [payMode, setPayMode] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectDetails);
  const user = getStoredUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totals = calculateOrderTotal(cartItems);

  const getClientSecret = useCallback(async () => {
    try {
      setClientSecret('');
      const data = await request({ url: '/create-payment-intent', method: 'POST', data: { amount: totals.total } });
      setClientSecret(data.clientSecret);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Unable to initialize payment'));
    }
  }, [totals.total]);

  useEffect(() => {
    if (payMode === 'online') getClientSecret();
  }, [getClientSecret, payMode]);

  const finishOrder = () => {
    dispatch(EMPTY_CART());
    dispatch(CLEAR_DETAILS());
    navigate('/thankyou', { replace: true, state: { orderPlaced: true } });
  };

  const handlePlaceOrder = async () => {
    if (loading || !user || !shippingAddress || cartItems.length === 0) return;
    setLoading(true);
    try {
      const order = buildOrderDetails({ cartItems, user, shippingAddress, paymentMode: 'cod', paymentStatus: 'unpaid' });
      await placeOrder(order);
      toast.success('Order placed');
      finishOrder();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Unable to place order'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="bg-white flex flex-col gap-5 mx-auto md:flex-row sm:mt-2 sm:px-6 lg:max-w-7xl lg:px-8">
        <section className="shadow-xl p-3 sm:p-8 m-1 rounded-2xl flex-1">
          <h2 className="text-2xl text-gray-900 mb-2">Payment</h2>
          <hr className="text-gray-400" />
          <fieldset className="border border-gray-400 rounded-sm p-3 mt-5">
            <legend className="px-1">Select payment method</legend>
            <label className="block"><input type="radio" name="paymode" checked={payMode === 'cod'} onChange={() => setPayMode('cod')} /> Cash on delivery</label>
            <label className="block mt-2"><input type="radio" name="paymode" checked={payMode === 'online'} onChange={() => setPayMode('online')} /> Online payment</label>
            {payMode === 'online' && !stripePromise && <p className="text-red-600 mt-3">Online payment is not configured.</p>}
            {payMode === 'online' && stripePromise && !clientSecret && <p className="mt-3">Initializing secure payment...</p>}
            {payMode === 'online' && clientSecret && <CardPayment clientSecret={clientSecret} onSuccess={finishOrder} />}
          </fieldset>
          {payMode === 'cod' && (
            <button type="button" className="w-full mt-3 py-3 rounded-sm bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-300 text-white" disabled={loading} onClick={handlePlaceOrder}>
              {loading ? 'Processing...' : 'Place order'}
            </button>
          )}
        </section>
        <CheckoutSummary />
      </div>
    </Elements>
  );
}
