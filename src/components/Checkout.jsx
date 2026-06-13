import { useState } from 'react';
import { useSelector } from 'react-redux';
import CheckoutSummary from './CheckoutSummary';
import { selectDetails } from '../redux/checkoutSLice';
import { validateShippingAddress } from '../utils/validation';

const emptyAddress = {
  fullname: '', phone: '', email: '', addressline1: '', addressline2: '',
  area: '', city: '', pincode: '', state: '',
};

const fields = [
  ['fullname', 'Full Name', 'text', 80],
  ['phone', 'Phone No', 'tel', 10],
  ['email', 'Email', 'email', 120],
  ['addressline1', 'Address Line 1', 'text', 150],
  ['addressline2', 'Address Line 2 (optional)', 'text', 150],
  ['area', 'Area', 'text', 80],
  ['city', 'City', 'text', 80],
  ['pincode', 'Pincode', 'text', 6],
  ['state', 'State', 'text', 80],
];

export default function Checkout() {
  const savedDetails = useSelector(selectDetails);
  const [data, setData] = useState(() => savedDetails || emptyAddress);
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setData((current) => ({ ...current, [target.name]: target.value }));
    setErrors((current) => ({ ...current, [target.name]: '' }));
  };

  return (
    <div className="bg-white flex flex-col gap-5 mx-auto md:flex-row sm:mt-2 sm:px-6 lg:max-w-7xl lg:px-8">
      <form id="shipping-form" className="shadow-xl p-3 m-1 rounded-2xl sm:p-8 mb-5 flex-1" noValidate>
        <h2 className="text-2xl text-gray-900 pb-1">Shipping Details</h2>
        <hr className="text-gray-400" />
        <div className="grid sm:grid-cols-2 gap-5 mt-5">
          {fields.map(([name, label, type, maxLength]) => (
            <div key={name} className={name.startsWith('addressline') ? 'sm:col-span-2' : ''}>
              <label htmlFor={name} className="block pb-1 px-1 text-gray-700">{label}</label>
              <input
                id={name}
                name={name}
                type={type}
                value={data[name]}
                maxLength={maxLength}
                inputMode={name === 'phone' || name === 'pincode' ? 'numeric' : undefined}
                onChange={handleChange}
                aria-invalid={Boolean(errors[name])}
                aria-describedby={errors[name] ? `${name}-error` : undefined}
                className="w-full px-3 py-2 rounded-md border-gray-300 border focus:outline-blue-300"
              />
              {errors[name] && <p id={`${name}-error`} className="text-sm text-red-600 mt-1">{errors[name]}</p>}
            </div>
          ))}
        </div>
        <img
          src="https://cdn.shopify.com/s/files/1/0869/9904/0290/files/payments_badge_final.png?v=1712136362"
          alt="Accepted payment methods"
          className="block w-full h-auto mt-5 sm:max-w-3/4 mx-auto"
        />
      </form>
      <CheckoutSummary
        data={data}
        validate={() => {
          const result = validateShippingAddress(data);
          setData(result.data);
          setErrors(result.errors);
          return result;
        }}
      />
    </div>
  );
}
