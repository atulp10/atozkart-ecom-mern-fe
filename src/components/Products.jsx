import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData } from 'react-router';
import { FILTER_BY_CATEGORY, PRICE_FITER, RESET_FILTERS, selectCatVal, selectFilterProducts, selectPriceFilterVal, selectSearchVal } from '../redux/filterSlice';
import ProductsItems from './ProductsItems';
import { capitalizeFirstLetter } from '../capitalizeFirstLetter';
import Searchbar from './Searchbar';
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
// import products from '/src/productList'

export default function Products() {
    // const [products, setProducts] = useState([])
    // let getData = async () => {
    //     let res = await fetch('https://dummyjson.com/products')
    //     let data = await res.json()
    //     // console.log(data.products);
    //     setProducts(data.products)
    // }
    // useEffect(() => { getData() }, [])

    const products = useLoaderData();
    const [priceFilter, setPriceFilter] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('')
    const categories = Array.from(new Set(products.map(p => p.category)));
    const filterProducts = useSelector(selectFilterProducts);
    const searchVal = useSelector(selectSearchVal);
    const priceFilterVal = useSelector(selectPriceFilterVal);
    const catVal = useSelector(selectCatVal);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState(false);

    useEffect(() => { dispatch(PRICE_FITER({ priceFilter, products })) }, [dispatch, priceFilter, products])

    useEffect(() => { dispatch(FILTER_BY_CATEGORY({ selectedCategory, products })) }, [dispatch, selectedCategory, products]);

    const clearFilters = () => {
        setPriceFilter('');
        setSelectedCategory('');
        dispatch(RESET_FILTERS(products));
    };

    return (
        <>

            <div className="bg-white">
                <div className='flex justify-between'>
                    <Searchbar products={products} />
                    <div
                        className='flex items-center gap-1 sm:hidden p-2 border-1 border-gray-300 rounded-xl h-fit m-3 text-gray-500'
                        onClick={() => setFilter(!filter)}
                    >
                        <span>Filter</span>
                        {!filter? <IoMdArrowDropdown/>:<IoMdClose/>}
                        
                    </div>
                </div>
                <div
                    // className={`flex gap-10 sm:hidden overflow-y-hidden ${filter ? 'h-fit p-5 border-1 text-gray-300 rounded-xl ' : 'h-0'} transition-[height] duration-300 ease`}
                    className={`flex gap-10 mx-2 sm:hidden overflow-y-hidden transition-[height] duration-300 ease ${filter ? 'p-5 border text-gray-300 rounded-xl' : ''}`}
                    style={{ height: filter ? '230px' : '0px' }}
                >
                    <div>
                        <div className='text-gray-500 mb-1'>Filter by Categories</div>
                        <hr className='text-gray-300' />
                        {categories.map((c) =>
                            <div key={c} className='my-0.5 pl-1'>
                                <input type="radio" name="mobile-categories" id={`mobile-category-${c}`} value={c} checked={selectedCategory === c} onChange={e => setSelectedCategory(e.target.value)}
                                    className='me-1' />
                                <label htmlFor={`mobile-category-${c}`} className='text-gray-600'>{capitalizeFirstLetter(c)}</label>
                            </div>
                        )}
                    </div>
                    <div className=''>
                        <div className='text-gray-500 mb-1'>Filter by Price</div>
                        <hr className='text-gray-300 mb-1' />

                        <div className='my-0.5 pl-1'>
                            <input type="radio" name="pricefilter" id='hightolow'
                                checked={priceFilter === 'hightolow'} onChange={() => setPriceFilter('hightolow')}
                                className='me-1' />
                            <label htmlFor='hightolow' className='text-gray-600'>High to Low</label>
                        </div>
                        <div className='my-0.5 pl-1'>
                            <input type="radio" name="pricefilter" id='lowtohigh'
                                checked={priceFilter === 'lowtohigh'} onChange={() => setPriceFilter('lowtohigh')}
                                className='me-1' />
                            <label htmlFor='lowtohigh' className='text-gray-600'>Low to High</label>
                        </div>

                    </div>
                </div>

                <div className="px-4 py-4 sm:px-6 lg:max-w-auto lg:px-8">

                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">All Products</h2>

                    <div className="flex flex-col sm:flex-row my-2 gap-4 justify-center">
                        <div className="hidden sm:block sm:w-1/6 p-3  text-sm">
                            <div>
                                <div className='text-gray-500 mb-1'>Filter by Categories</div>
                                <hr className='text-gray-300' />
                                {categories.map((c) =>
                                    <div key={c} className='my-0.5 pl-1'>
                                        <input type="radio" name="desktop-categories" id={`desktop-category-${c}`} value={c} checked={selectedCategory === c} onChange={e => setSelectedCategory(e.target.value)}
                                            className='me-1' />
                                        <label htmlFor={`desktop-category-${c}`} className='text-gray-600'>{capitalizeFirstLetter(c)}</label>
                                    </div>
                                )}
                            </div>

                            <div className='mt-5'>
                                <div className='text-gray-500 mb-1'>Filter by Price</div>
                                <hr className='text-gray-300 mb-1' />

                                <div className='my-0.5 pl-1'>
                                    <input type="radio" name="pricefilter" id='hightolow'
                                        checked={priceFilter === 'hightolow'} onChange={() => setPriceFilter('hightolow')}
                                        className='me-1' />
                                    <label htmlFor='hightolow' className='text-gray-600'>High to Low</label>
                                </div>
                                <div className='my-0.5 pl-1'>
                                    <input type="radio" name="pricefilter" id='lowtohigh'
                                        checked={priceFilter === 'lowtohigh'} onChange={() => setPriceFilter('lowtohigh')}
                                        className='me-1' />
                                    <label htmlFor='lowtohigh' className='text-gray-600'>Low to High</label>
                                </div>

                            </div>

                            {(searchVal || catVal || priceFilterVal) && <button type="button" className="mt-4 text-indigo-600 underline" onClick={clearFilters}>Clear filters</button>}

                        </div>
                        <div className="w-full sm:w-5/6">

                            {((searchVal === '' || searchVal == undefined) && catVal === '' && priceFilterVal === '') ? <ProductsItems products={products} /> :
                                <>{filterProducts.length === 0 ? <div>No products found</div> :
                                    <ProductsItems products={filterProducts} />
                                }</>
                            }


                        </div>
                    </div>
                </div>

            </div>


        </>

    )
}
