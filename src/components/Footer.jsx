import React from 'react'
import { FaHeart } from 'react-icons/fa'

export default function Footer() {
    return (
        <div className='bg-gray-800 text-gray-300 px-8 py-6 mt-auto'>
            &copy; AtoZ Kart 2025.{' '}
            <div className='block sm:inline'>Developed with <FaHeart className='inline mx-1 text-red-700' /> by Atul</div>
        </div>
    )
}
