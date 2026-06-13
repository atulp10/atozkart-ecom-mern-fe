import { useEffect } from 'react'
import { useNavigate } from "react-router";
import { IoTrashOutline } from "react-icons/io5";
import { IoMdTrash } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { CALCULATE_TOTAL, DECREASE, EMPTY_CART, INCREASE, REMOVE_FROM_CART, selectCartItems } from '../redux/cartSlice';
import { GoPlus } from "react-icons/go";
import { HiMiniMinus } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import { calculateOrderTotal } from '../utils/pricing';
import { getStoredUser } from '../utils/session';

export default function Cart() {

    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    let redirect= useNavigate();    

    useEffect(() => { dispatch(CALCULATE_TOTAL()) }, [cartItems, dispatch])
    const totals = calculateOrderTotal(cartItems);

    let handleCheckout=()=>{
        if(cartItems.length===0){
            return toast.error('No items in your cart');
        }
        else if(!getStoredUser()){
            redirect('/login',{state:{path:'/cart'}});
            toast.warning('Please login to proceed')
        }
        else{
            redirect('/checkout');
        } 
    }

    return (
        <div className='mb-10 text-gray-800'>
            <div className=" w-full sm:w-4/5 sm:mt-2 mx-auto flex flex-col lg:flex-row gap-4">
                <div className='flex-2 flex flex-col p-3 m-1 sm:p-8 mb-1 rounded-2xl shadow-xl h-fit'>
                    <h2 className='text-2xl pb-1'>Your cart items</h2>
                    <hr className='text-gray-400 mb-2' />
                    {cartItems.length===0 && <span className='mt-2'>Nothing added yet.</span>}

                    {cartItems.map(item => (
                        <div className="flex p-1 gap-2 mt-2 bg-gray-100" key={item._id}>
                            <div className="flex-1">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className="flex-2 flex justify-between">
                                <div className="text-sm">
                                    <h3 className=''>{item.title}</h3>
                                    <p className=''>Unit price : ${Number(item.price).toFixed(2)}</p>
                                    <div className='flex '>
                                        <span className='me-3'>Qty :</span>
                                        <span className="flex border rounded-sm border-gray-300 items-center text-xs my-1">
                                            <button type="button" aria-label={`Decrease ${item.title} quantity`} className='border-r-2 px-1 border-gray-300 bg-gray-200 h-full items-center flex cursor-pointer'
                                                onClick={() => dispatch(DECREASE(item))}><HiMiniMinus /></button>
                                            <div className='px-3'>{item.qty}</div>
                                            <button type="button" aria-label={`Increase ${item.title} quantity`} className='border-l-2 px-1 border-gray-300 bg-gray-200 h-full items-center flex cursor-pointer disabled:opacity-50'
                                                disabled={item.qty >= item.stock} onClick={() => dispatch(INCREASE(item))}><GoPlus /></button>
                                        </span>
                                        <div className='ml-4'>
                                        <button type="button" aria-label={`Remove ${item.title} from cart`} onClick={() => dispatch(REMOVE_FROM_CART(item._id))}><IoTrashOutline className='size-5 text-gray-400 cursor-pointer' /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}

                    <div className='mt-7'>
                        <button 
                        className='text-gray-400 float-end cursor-pointer' 
                        onClick={() => dispatch(EMPTY_CART())}
                        disabled={cartItems.length===0}
                        >
                            <IoMdTrash className='inline' />
                            Empty cart
                            </button>
                    </div>

                </div>

                <div className='flex-1 p-3 sm:p-8 m-1 shadow-xl rounded-2xl h-fit'>
                    <h2 className='text-2xl pb-1'>Order Summary</h2>
                    <hr className='text-gray-400' />
                    <div className='py-3'>
                        <div className='flex justify-between mb-2'>
                            <span className=''>Sub total : </span>
                            <span className=''>${totals.subtotal.toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between mb-2'>
                            <span className=''>Shipping charges : </span>
                            <span className=''>${totals.shipping.toFixed(2)}</span>
                        </div>
                        <hr className='text-gray-400' />
                        <div className='flex justify-between'>
                            <span className=''>Total amount to pay: </span>
                            <span className='font-bold'>${totals.total.toFixed(2)}</span>
                        </div>
                    </div>
                    <button
                    className={`w-full mt-5 px-2 py-2 ${cartItems.length===0?'bg-gray-500':'bg-blue-600 cursor-pointer hover:bg-blue-500'}  text-white text-xl rounded-md`}
                    onClick={handleCheckout} disabled={cartItems.length===0}>Proceed to checkout</button>


                </div>
            </div>

        </div>
    )
}
