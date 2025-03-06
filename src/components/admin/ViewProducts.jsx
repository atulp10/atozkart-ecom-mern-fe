import React, { useEffect, useState } from 'react'
import { getLocalProducts } from '../../getProductsData'
import { useDispatch, useSelector } from 'react-redux'
import { selectProduct, SET_PRODUCTS_TO_VIEW } from '../../redux/productSlice';
import axios from 'axios';
import { Link } from 'react-router';
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDeleteForever, MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from 'react-toastify';

export default function ViewProducts() {

  const products = useSelector(selectProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    getLocalProducts()
      .then(data => { dispatch(SET_PRODUCTS_TO_VIEW(data)) })
      .catch(err => toast.error(err.message))
  }, [])

  const handleDelete = async (product) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_NODE_SERVER}/products/${product._id}`, { withCredentials: true });
        //  await fetch(`${import.meta.env.VITE_BASE_URL}/products/${product._id}`,{method:'delete'})

        const data = await getLocalProducts()
        dispatch(SET_PRODUCTS_TO_VIEW(data))

        toast.success('Product deleted');
      }
      catch (err) {
        console.error(err);
        toast.error(err.message);
      }
    }
  }

  return (
    <div>
      <div className="p-4">
        <h1 className='text-2xl font-bold mb-1'>View Products</h1>
        <hr className='text-gray-400 mb-8' />
        <table className='min-w-full '>
          <thead className='bg-green-100'>
            <tr className=''>
              <th className='px-6 py-3 text-left'>Sr no.</th>
              <th className='px-6 py-3 text-left'>Name</th>
              <th className='px-6 py-3 text-left'>Price</th>
              <th className='px-6 py-3 text-left'>Category</th>
              <th className='px-6 py-3 text-left'>Image</th>
              <th className='px-6 py-3 text-left'>Stock</th>
              <th className='px-6 py-3 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) =>
              <tr key={i}>
                <td className="px-6 py-2 text-gray-700">{i + 1}</td>
                <td className="px-6 py-2 text-gray-700">{p.title}</td>
                <td className="px-6 py-2 text-gray-700">{p.price}</td>
                <td className="px-6 py-2 text-gray-700">{p.category}</td>
                <td className="px-6 py-2 text-gray-700">
                  <img src={p.image} alt="" className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="px-6 py-2 text-gray-700">{p.stock}</td>
                <td className='px-6 py-2'>
                  <Link to={`/admin/products/edit/${p._id}`}> <button><FiEdit3 className='size-5 text-gray-500 cursor-pointer' title='Edit' /></button></Link>&nbsp;&nbsp;
                  <button onClick={() => handleDelete(p)}><MdOutlineDeleteOutline className='size-5 text-gray-500 cursor-pointer' title='Delete' /></button>
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </div>
  )
}
