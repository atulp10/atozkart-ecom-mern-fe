import { useEffect, useState } from 'react'
import { getLocalProducts } from '../../getProductsData'
import { useDispatch, useSelector } from 'react-redux'
import { selectProduct, SET_PRODUCTS_TO_VIEW } from '../../redux/productSlice';
import { Link } from 'react-router';
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import { getErrorMessage, request } from '../../api/client';

export default function ViewProducts() {

  const products = useSelector(selectProduct);
  const dispatch = useDispatch();
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getLocalProducts()
      .then(data => { dispatch(SET_PRODUCTS_TO_VIEW(data)) })
      .catch(err => toast.error(getErrorMessage(err)))
  }, [dispatch])

  const handleDelete = async (product) => {
      setDeleting(true);
      try {
        await request({ url: `/products/${product._id}`, method: 'DELETE' });

        const data = await getLocalProducts()
        dispatch(SET_PRODUCTS_TO_VIEW(data))

        toast.success('Product deleted');
        setPendingDelete(null);
      }
      catch (err) {
        toast.error(getErrorMessage(err, 'Unable to delete product'));
      }
      finally {
        setDeleting(false);
      }
  }

  return (
    <div>
      <div className="p-4">
        <h1 className='text-2xl font-bold mb-1'>View Products</h1>
        <hr className='text-gray-400 mb-8' />
        <div className="overflow-x-auto"><table className='min-w-full '>
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
              <tr key={p._id}>
                <td className="px-6 py-2 text-gray-700">{i + 1}</td>
                <td className="px-6 py-2 text-gray-700">{p.title}</td>
                <td className="px-6 py-2 text-gray-700">{p.price}</td>
                <td className="px-6 py-2 text-gray-700">{p.category}</td>
                <td className="px-6 py-2 text-gray-700">
                  <img src={p.image} alt={p.title} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="px-6 py-2 text-gray-700">{p.stock}</td>
                <td className='px-6 py-2'>
                  <Link to={`/admin/products/edit/${p._id}`}> <button><FiEdit3 className='size-5 text-gray-500 cursor-pointer' title='Edit' /></button></Link>&nbsp;&nbsp;
                  <button aria-label={`Delete ${p.title}`} onClick={() => setPendingDelete(p)}><MdOutlineDeleteOutline className='size-5 text-gray-500 cursor-pointer' title='Delete' /></button>
                </td>
              </tr>
            )}
          </tbody>
        </table></div>

        {pendingDelete && <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50" role="dialog" aria-modal="true" aria-labelledby="delete-title">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-4">
            <h2 id="delete-title" className="text-lg font-bold">Delete product?</h2>
            <p className="mt-2">This will permanently delete {pendingDelete.title}.</p>
            <div className="flex justify-end gap-3 mt-5">
              <button type="button" className="px-4 py-2 border rounded" disabled={deleting} onClick={() => setPendingDelete(null)}>Cancel</button>
              <button type="button" className="px-4 py-2 bg-red-600 text-white rounded disabled:bg-red-300" disabled={deleting} onClick={() => handleDelete(pendingDelete)}>{deleting ? 'Deleting...' : 'Delete'}</button>
            </div>
          </div>
        </div>}

      </div>
    </div>
  )
}
