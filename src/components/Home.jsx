import { FaAtlassian } from "react-icons/fa";
import { HiArrowLongRight } from 'react-icons/hi2';
import { Link } from 'react-router';
import { ShowLoginRegister } from './ShowHideLinks';

export default function Home() {
  return (
    <>
      <div className="p-8 mx-auto my-3 flex flex-col justify-center items-center">
        <FaAtlassian className='size-60 text-amber-400 mb-10 max-[500px]:size-50' />
        <div className=' text-4xl text-center'>Hello and Welcome to<span className='italic text-nowrap text-5xl text-blue-500 font-extrabold'> AtoZ Kart</span></div>
        <div className='flex flex-col sm:flex-row gap-x-4 mt-5'>
          <ShowLoginRegister>
          <div className="grid grid-cols-1 p-3 border-1 border-gray-400 rounded-xl sm:max-w-sm mt-3">
            <Link to='/login'><div className='flex items-center gap-2 active:bg-blue-200'>Login/Register <HiArrowLongRight className='ml-auto size-6' /></div></Link>
          </div>
          </ShowLoginRegister>
          <div className="grid grid-cols-1 p-3 border-1 border-gray-400 rounded-xl sm:max-w-sm mt-3">
            <Link to='/products'><div className='flex items-center gap-2 active:bg-blue-200'>Explore Products <HiArrowLongRight className='ml-auto size-6' /></div></Link>
          </div>
        </div>
      </div>
    </>
  )
}
