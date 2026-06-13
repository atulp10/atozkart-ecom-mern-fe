import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART } from '../redux/cartSlice';
import { FaHeart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { ADD_TO_FAV, REMOVE_FROM_FAV, selectFavProducts } from '../redux/favSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { getStoredUser } from '../utils/session';

export default function ProductsItems({ products }) {

    const dispatch = useDispatch();
    const favProducts = useSelector(selectFavProducts);
    const user = getStoredUser();
    const navigate=useNavigate();
    //Pagination
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        setItemOffset(0);
    }, [products]);

    useEffect(() => {
        const endOffset = itemOffset + 4;
        setPageCount(Math.ceil(products.length / 4));
        setCurrentItems(products.slice(itemOffset, endOffset));
    }, [itemOffset, products])

    const handlePageClick = (event) => {
        const newOffset = event.selected * 4;
        setItemOffset(newOffset);
    }


    const handleFav = (e,prod, action) => {
        e.stopPropagation();
        if (user === null) {
            toast.warn('Please login first');
            // redirect('/login');
        }
        else {
            if (action === 'add') dispatch(ADD_TO_FAV(prod));
            else if (action === 'remove') dispatch(REMOVE_FROM_FAV(prod));
        }
    }

    const handleAddToCart=(e,pr)=>{
        e.stopPropagation();
        dispatch(ADD_TO_CART(pr));
    }

    return (
        <>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {currentItems.map((product) => (
                    <div key={product._id} className="relative border-1 rounded-xl text-gray-300 p-2 cursor-pointer" onClick={()=>navigate(`/products/${product._id}`)}>
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
                            <button disabled={Number(product.stock) <= 0} className="relative bg-indigo-500 hover:bg-indigo-400 disabled:bg-gray-400 block border-0 px-6 py-2 mt-2 text-white rounded-lg cursor-pointer"
                                // onClick={() => dispatch(ADD_TO_CART(product))}>
                                onClick={(e) => handleAddToCart(e,product)}>
                                    {Number(product.stock) > 0 ? 'Add to cart' : 'Out of stock'}
                            </button>
                            <div>
                                {(favProducts.findIndex(p => p._id === product._id) !== -1) ?
                                    <FaHeart
                                        className='size-5 mr-1 relative text-red-700 '
                                        onClick={(e) => handleFav(e,product, 'remove')}
                                    />
                                    :
                                    <CiHeart
                                        className='size-7 relative'
                                        onClick={(e) => handleFav(e,product, 'add')}
                                    />
                                }
                            </div>
                        </div>


                    </div>
                ))}
            </div>
            <div className='mt-20'>
                <ReactPaginate
                    breakLabel="..."
                    containerClassName='isolate flex justify-center -space-x-px rounded-md shadow-xs mb-10'
                    nextLabel={<ChevronRightIcon className="size-5" />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    forcePage={Math.floor(itemOffset / 4)}
                    previousLabel={<ChevronLeftIcon className="size-5" />}
                    renderOnZeroPageCount={null}
                    pageLinkClassName='cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-200 focus:z-20 focus:outline-offset-0'
                    previousLinkClassName='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-200 focus:z-20 focus:outline-offset-0'
                    nextLinkClassName='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-200 focus:z-20 focus:outline-offset-0'
                    activeLinkClassName='relative z-10 inline-flex items-center bg-indigo-600 hover:bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                />
            </div>
        </>



    )
}

ProductsItems.propTypes = { products: PropTypes.arrayOf(PropTypes.object).isRequired };
