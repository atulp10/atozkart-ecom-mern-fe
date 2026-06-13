import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../redux/cartSlice';
import { SET_DETAILS } from '../redux/checkoutSLice';
import { useLocation, useNavigate } from 'react-router';
import { calculateOrderTotal } from '../utils/pricing';

export default function CheckoutSummary({ data, validate }) {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const totals = calculateOrderTotal(cartItems);

  const handleCheckout = () => {
    const result = validate?.();
    if (!result?.valid) return;
    dispatch(SET_DETAILS(result.data));
    navigate('/payment', { state: { checkout: true } });
  };

  return (
    <aside className="shadow-xl p-3 sm:p-8 h-fit m-1 mb-10 rounded-2xl flex-1">
      <h2 className="text-2xl text-gray-900 pb-1">Checkout Summary</h2>
      <hr className="text-gray-400" />
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead><tr><th className="text-left py-3 pr-2">Item</th><th>Price</th><th>Qty</th><th>Total</th></tr></thead>
          <tbody className="text-gray-700">
            {cartItems.map((product) => (
              <tr key={product._id}>
                <td className="pr-2"><img src={product.image} className="inline w-10 h-10 rounded mr-3" alt="" />{product.title}</td>
                <td className="text-center">${Number(product.price).toFixed(2)}</td>
                <td className="text-center">{product.qty}</td>
                <td className="text-center">${Number(product.price * product.qty).toFixed(2)}</td>
              </tr>
            ))}
            <tr className="border-t border-gray-300"><td colSpan={3} className="pt-3">Subtotal</td><td className="pt-3 text-center">${totals.subtotal.toFixed(2)}</td></tr>
            <tr><td colSpan={3}>Shipping</td><td className="text-center">${totals.shipping.toFixed(2)}</td></tr>
            <tr><td colSpan={3} className="font-bold">Total payable</td><td className="font-bold text-center">${totals.total.toFixed(2)}</td></tr>
          </tbody>
        </table>
      </div>
      {!location.state?.checkout && (
        <button type="button" className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xl rounded-md disabled:bg-gray-500" onClick={handleCheckout} disabled={!data || cartItems.length === 0}>
          Continue to payment
        </button>
      )}
    </aside>
  );
}

CheckoutSummary.propTypes = {
  data: PropTypes.object,
  validate: PropTypes.func,
};
