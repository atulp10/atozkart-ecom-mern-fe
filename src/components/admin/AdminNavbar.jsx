import React from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { HiBars3 } from 'react-icons/hi2'
import axios from 'axios';

export default function AdminNavbar({ bars, openSidebar }) {

  const redirect = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_NODE_SERVER}/users/logout`, { withCredentials: true });
      sessionStorage.removeItem('userin');
      toast.success('Logged out successfully');
      redirect('/');
    }
    catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  return (
    <div className='p-6 bg-gray-300 flex items-center'>
      {bars && <HiBars3 className='text-3xl cursor-pointer mr-5' onClick={openSidebar} />}
      <h1 className='text-2xl max-[500px]:hidden '>Admin Navbar</h1>
      <div className='ml-auto'>
        <span className='me-3'>Welcome Admin</span>
        <button
          className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'
          onClick={handleLogout}
        >Logout
        </button>
      </div>
    </div>
  )
}
