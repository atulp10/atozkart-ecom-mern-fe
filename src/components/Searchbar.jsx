import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { FILTER_BY_SEARCH } from '../redux/filterSlice';
import { IoSearchOutline } from 'react-icons/io5';

export default function Searchbar({ products }) {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FILTER_BY_SEARCH({ products, search }))
    }, [dispatch, products, search])

    return (
        <>
            <div className='relative p-2 min-[900px]:hidden'>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search'
                    className='text-gray-400 rounded-xl p-2 pl-8 outline-gray-400' />
                <IoSearchOutline className='text-gray-400 absolute top-5 left-5' />
            </div>
        </>
    )
}

Searchbar.propTypes = { products: PropTypes.arrayOf(PropTypes.object).isRequired };
