import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { getErrorMessage, request } from '../../api/client';

const transitions = {
  placed: ['confirmed', 'cancelled'],
  confirmed: ['shipped', 'cancelled'],
  shipped: ['outfordelivery'],
  outfordelivery: ['delivered'],
  delivered: [],
  cancelled: [],
};

export default function OrderStatus({ order }) {
  const allowed = transitions[order.orderStatus] || [];
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!status || loading) return;
    setLoading(true);
    try {
      await request({ url: `/orders/${order._id}`, method: 'PUT', data: { orderStatus: status } });
      toast.success('Order status updated');
      navigate('/admin/allorders');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Unable to update order'));
    } finally {
      setLoading(false);
    }
  };

  if (allowed.length === 0) return <span>No further status changes available</span>;

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="orderstatus">New order status</label>
      <select id="orderstatus" value={status} onChange={(event) => setStatus(event.target.value)}>
        <option value="" disabled>Select status</option>
        {allowed.map((value) => <option key={value} value={value}>{value}</option>)}
      </select>
      <button className="px-3 py-0.5 bg-green-600 hover:bg-green-500 disabled:bg-gray-400 rounded-md text-white" disabled={loading || !status}>
        {loading ? 'Updating...' : 'Update'}
      </button>
    </form>
  );
}

OrderStatus.propTypes = { order: PropTypes.object.isRequired };
