import React from 'react'
import { FaAtlassian } from 'react-icons/fa';

const Contact = () => {
  return (
    <>
      <div className="bg-white mx-auto sm:mt-2 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="shadow-xl p-3 m-1 rounded-2xl sm:p-8 mb-5">
          <h2 className="text-2xl text-gray-900 pb-1">Contact Us</h2>
          <hr className='text-gray-400' />
          <div className='mt-5 flex flex-col sm:flex-row gap-y-2 gap-x-10 justify-between'>
            <div className=''>
              <div>
                Have any questions? Please Get in touch with us. We are always happy to serve our customers!
              </div>
              <div className="grid grid-cols-2 p-3 mt-3 border-1 h-fit border-gray-400 rounded-xl sm:max-w-sm">
                <div>Call us on</div>
                <div className='font-bold'>99 99 99 8888</div>
                <div>Mail us at</div>
                <div>contact@atozkart.com</div>
              </div>
            </div>
            <div className='flex sm:flex-col gap-x-5 items-center justify-center'>
              <FaAtlassian className='size-20 text-amber-400 mb-1 max-[500px]:size-50' />
              <span className='italic text-nowrap text-5xl text-blue-500 font-extrabold'> AtoZ Kart</span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Contact;
