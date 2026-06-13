import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_FAV, REMOVE_FROM_FAV, selectFavProducts } from '../redux/favSlice'
import { ADD_TO_CART } from '../redux/cartSlice';
import { FaHeart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';

export default function MyFavourites() {
    const favProducts = useSelector(selectFavProducts);
    const dispatch = useDispatch();

    return (
        <>
            <div className="bg-white">
            <div className='p-3 m-1 sm:p-8 rounded-2xl shadow-xl sm:mx-10 h-fit text-gray-800'>
                <h2 className='text-2xl pb-1'>My Favourites</h2>
                <hr className='text-gray-400 mb-2' />

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {favProducts.length===0 && <div>No favourited products.</div>}
                        {favProducts.map((product) => (
                            <div key={product._id} className="relative border-1 rounded-xl text-gray-300 p-2" >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                />
                                <div className="mt-4 flex justify-between px-1">
                                    <div>
                                        <h3 className="text-sm text-gray-700 font-medium">

                                            <span aria-hidden="true" className="absolute inset-0 font-medium" />
                                            {product.title}

                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">$ {product.price}</p>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <button className="relative bg-indigo-500 hover:bg-indigo-400 block border-0 px-6 py-2 mt-2 text-white rounded-lg cursor-pointer"
                                        onClick={() => dispatch(ADD_TO_CART(product))}>Add to cart
                                    </button>
                                    <div>
                                        {(favProducts.findIndex(p => p._id === product._id) !== -1) ?
                                            <FaHeart
                                                className='size-5 mr-1 relative text-red-700 '
                                                onClick={() => dispatch(REMOVE_FROM_FAV(product))}
                                            />
                                            :
                                            <CiHeart
                                                className='size-7 relative'
                                                onClick={() => dispatch(ADD_TO_FAV(product))}
                                            />
                                        }


                                    </div>
                                </div>


                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}
