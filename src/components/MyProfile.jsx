import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { HiArrowLongRight } from "react-icons/hi2";

export default function MyProfile() {

    const user = JSON.parse(sessionStorage.getItem('userin'));
    const redirect = useNavigate();

    const logOutUser = async () => {
        try {
            let res = await axios.get(`${import.meta.env.VITE_NODE_SERVER}/users/logout`, { withCredentials: true });
            sessionStorage.removeItem('userin');
            toast.success('Logged out successfully');
            redirect('/');
        }
        catch (err) {
            console.log('Logout error: ', err);
            toast.error(err.message || 'Failed to logout');
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
