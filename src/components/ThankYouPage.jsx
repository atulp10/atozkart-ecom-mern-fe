import React from 'react'
import { Link } from 'react-router'

export default function ThankYouPage() {
  return (
    <div className='flex flex-col justify-center items-center text-3xl mt-10'>
      <h2>Thank you for your order.</h2>
      <Link to='/products'>
      <button className='p-4 bg-indigo-400 hover:bg-indigo-300 mt-4'>
        Continue Shopping
        </button>
        </Link>
    </div>
  )
}
