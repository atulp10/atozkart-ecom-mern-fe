import PropTypes from 'prop-types';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectCartItems } from '../redux/cartSlice';
import { selectDetails } from '../redux/checkoutSLice';
import { placeOrder } from '../getProductsData';
import { getErrorMessage } from '../api/client';
import { getStoredUser } from '../utils/session';
import { buildOrderDetails } from '../utils/orders';

export default function CardPayment({ clientSecret, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectDetails);

  const handlePayment = async () => {
    if (loading || !stripe || !elements) return;
    const user = getStoredUser();
    const card = elements.getElement(CardElement);
    if (!user || !shippingAddress || !card || cartItems.length === 0) return;

    setLoading(true);
    try {
      const result = await stripe.confirmCardPayment(clientSecret, { payment_method: { card } });
      if (result.error) throw result.error;
      if (result.paymentIntent?.status !== 'succeeded') throw new Error('Payment was not completed');

      const order = buildOrderDetails({ cartItems, user, shippingAddress, paymentMode: 'online', paymentStatus: 'paid' });
      await placeOrder({ ...order, paymentIntentId: result.paymentIntent.id }, result.paymentIntent.id);
      toast.success('Payment successful and order placed');
      onSuccess();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Payment failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3">
      <div className="border border-gray-400 p-3 rounded-sm"><CardElement /></div>
      <button type="button" className="w-full py-3 mt-3 rounded-sm bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-300 text-white" disabled={loading || !stripe} onClick={handlePayment}>
        {loading ? 'Processing...' : 'Pay now'}
      </button>
    </div>
  );
}

CardPayment.propTypes = {
  clientSecret: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
