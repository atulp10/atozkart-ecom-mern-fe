import React from 'react'
import { Link, NavLink } from 'react-router'
import { FaAd, FaHome } from "react-icons/fa";
import { IoAddCircleOutline } from 'react-icons/io5';
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { BiSolidShoppingBag } from "react-icons/bi";
import { CiViewList } from "react-icons/ci";

export default function Sidebar({refProp,closeSidebar}) {

  const styles=({isActive})=>({
    backgroundColor:isActive?'gray':''
  })
 
  return (
    <div className='text-white bg-blue-950 w-[300px] transition-all duration-200 ease h-full fixed z-10 top-0 left-0 overflow-x-hidden ' ref={refProp}>
      <div className="flex items-center justify-between px-6">
      <span className='text-3xl py-4 text-center'>sidebar</span>
     <button onClick={closeSidebar}><AiOutlineClose className='text-3xl cursor-pointer'/></button>
      </div>
      <nav className="flex flex-col mt-4">
        <NavLink to='/admin' style={styles} className='flex items-center hover:bg-gray-700 p-4' end>
        <FaHome className='me-3'/>
        <span>Dashboard</span>
        </NavLink>
        <NavLink to='/admin/addproduct' style={styles} className='flex items-center hover:bg-gray-700 p-4' end>
        <IoAddCircleOutline className='me-3'/>
        <span>Add New Product</span>
        </NavLink>
        <NavLink to='/admin/viewproducts' style={styles} className='flex items-center hover:bg-gray-700 p-4' end>
        <CiViewList className='me-3'/>
        <span>View Products</span>
        </NavLink>
        <NavLink to='/admin/allorders' style={styles} className='flex items-center hover:bg-gray-700 p-4' end>
        <BiSolidShoppingBag className='me-3'/>
        <span>View All Orders</span>
        </NavLink>
      </nav>
    </div>
  )
}
