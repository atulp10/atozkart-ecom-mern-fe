import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useParams } from 'react-router'
import { ADD_TO_CART } from '../redux/cartSlice';
import { ADD_TO_FAV, REMOVE_FROM_FAV, selectFavProducts } from '../redux/favSlice';
import { FaHeart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { toast } from 'react-toastify';

export default function ShowProduct() {

    const [product, setProduct] = useState({});
    const { id } = useParams();
    const products = useLoaderData();
    const dispatch = useDispatch();
    const favProducts = useSelector(selectFavProducts);
    const user = JSON.parse(sessionStorage.getItem('userin'));

    useEffect(() => {
        let p = products.find(p => p._id === id);
        if (p !== undefined) { setProduct(p) }
    }, [])

    const handleFav = (prod, action) => {
        if (user === null) {
            toast.warn('Please login first');
            // redirect('/login');
        }
        else {
            if (action === 'add') {
                dispatch(ADD_TO_FAV(prod));
            }
            else if (action === 'remove') {
                dispatch(REMOVE_FROM_FAV(prod));
            }
        }
    }

    return (
        <>
            <div className='p-3 sm:p-8 rounded-2xl shadow-xl h-fit m-1 mb-20 sm:mx-10 text-gray-800'>
                <h2 className='text-2xl pb-1'>{product.title}</h2>
                <hr className='text-gray-400 mb-2' />
                <div className='flex flex-col sm:flex-row mt-2'>
                    <div className=''>
                        <img src={product.image} className='w-full sm:max-w-xs' alt="" />
                    </div>
                    <div className='p-3 sm:pl-10'>
                        <div className='flex gap-0.5'>
                            <span className='text-xl font-bold'>$</span>
                            <span className='text-4xl font-bold'>{Number(product.price).toFixed(2)}</span>
                        </div>
                        <div>
                            <button className=" bg-indigo-500 hover:bg-indigo-400 w-full block border-0 px-6 py-2 mt-2 text-white rounded-lg cursor-pointer"
                                onClick={() => dispatch(ADD_TO_CART(product))}>Add to cart
                            </button>
                        </div>
                        {(favProducts.findIndex(p => p._id === product._id) !== -1) ?
                            <div
                                className='flex items-center gap-2 my-3 border-1 p-2 rounded-lg cursor-pointer text-red-700  border-red-700 hover:bg-red-100'
                                onClick={() => handleFav(product, 'remove')}                                >
                                <FaHeart className='size-5 ml-1 cursor-pointer '  />
                                <div>Added to favourites</div>
                            </div>
                            :
                            <div
                                className='flex items-center gap-2 my-3 border-1 p-2 rounded-lg cursor-pointer border-gray-500 hover:bg-gray-200'
                                onClick={() => handleFav(product, 'add')}                                >
                                <CiHeart className='size-7 cursor-pointer' />
                                <div>Add to favourites</div>
                            </div>
                        }


                        <div className="grid grid-cols-2 p-3 mt-3 border-1 h-fit border-gray-400 rounded-xl">
                            <div>Brand</div>
                            <div className='font-bold'>{product.brand}</div>
                            <div>Category</div>
                            <div>{product.category}</div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}
