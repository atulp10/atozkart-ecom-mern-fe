import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { HiBars3 } from 'react-icons/hi2'
import { getErrorMessage, request } from '../../api/client';
import { clearStoredUser } from '../../utils/session';
import { useDispatch } from 'react-redux';
import { CLEAR_FAV } from '../../redux/favSlice';

export default function AdminNavbar({ bars, openSidebar }) {

  const redirect = useNavigate()
  const dispatch = useDispatch();

  const handleLogout = async () => {
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

AdminNavbar.propTypes = { bars: PropTypes.bool.isRequired, openSidebar: PropTypes.func.isRequired };
