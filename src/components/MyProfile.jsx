import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { HiArrowLongRight } from "react-icons/hi2";
import { getErrorMessage, request } from '../api/client';
import { clearStoredUser, getStoredUser } from '../utils/session';
import { useDispatch } from 'react-redux';
import { CLEAR_FAV } from '../redux/favSlice';

export default function MyProfile() {

    const user = getStoredUser();
    const redirect = useNavigate();
    const dispatch = useDispatch();

    const logOutUser = async () => {
        try {
            await request({ url: '/users/logout', method: 'GET' });
            clearStoredUser();
            dispatch(CLEAR_FAV());
            toast.success('Logged out successfully');
            redirect('/');
        }
        catch (err) {
            toast.error(getErrorMessage(err, 'Failed to logout'));
        }
    }

    return (
        <>
            <div className='p-3 sm:p-8 rounded-2xl shadow-xl h-fit sm:mx-10 text-gray-800'>
                <h2 className='text-2xl pb-1'>My Profile</h2>
                <hr className='text-gray-400 mb-2' />
                <div className="grid grid-cols-2 p-3 mt-3 border-1 border-gray-400 rounded-xl sm:max-w-sm">
                    <div>Username</div>
                    <div>{user.username}</div>
                    <div>Email</div>
                    <div>{user.email}</div>
                </div>
                <div className="grid grid-cols-1 p-3 border-1 border-gray-400 rounded-xl sm:max-w-sm mt-3">
                    <Link to='/myorders'><div className='flex items-center gap-2 active:bg-blue-200'>My Orders <HiArrowLongRight className='ml-auto size-6' /></div></Link>
                </div>
                <div className="grid grid-cols-1 p-3 border-1 border-gray-400 rounded-xl sm:max-w-sm mt-3">
                    <Link to='/myfavourites'><div className='flex items-center gap-2 active:bg-blue-200'>My Favourites <HiArrowLongRight className='ml-auto size-6' /></div></Link>
                </div>
                <div className="grid grid-cols-1 p-3 border-1 border-gray-400 rounded-xl sm:max-w-sm mt-3">
                    <Link to='/products'><div className='flex items-center gap-2 active:bg-blue-200'>All Products <HiArrowLongRight className='ml-auto size-6' /></div></Link>
                </div>
                <div>
                    <button className=" bg-indigo-500 hover:bg-indigo-400 block border-0 px-6 py-2 mt-3 text-white rounded-lg cursor-pointer"
                        onClick={logOutUser}>
                        Sign out
                    </button>
                </div>
            </div>
        </>
    )
}
