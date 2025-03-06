import React from 'react'
import { FaAtlassian } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <div className="p-8 mx-auto my-3 flex flex-col justify-center items-center">
        <FaAtlassian className='size-60 text-amber-400 mb-10 max-[500px]:size-50'/>
        <div className=' text-4xl text-center'>Hello and Welcome to<span className='italic text-nowrap text-5xl text-blue-500 font-extrabold'> AtoZ Kart</span></div>
      </div>
    </>
  )
}
