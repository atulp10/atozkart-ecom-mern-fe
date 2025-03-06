import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router';
import { BarsContext } from './AdminLayout';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from "axios";
import { getLocalProducts } from '../../getProductsData';

export default function AddProduct() {

  const obj = { title: '', price: '', category: '', image: '', stock: '', brand: '', description: '' };
  const [product, setProduct] = useState({ ...obj });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getLocalProducts()
        .then(data => {
          let p = data.find(d => d._id === id);
          setProduct(p);
        })
        .catch(err => toast.error(err.message))
    }
    else {
      setProduct({ ...obj })
    }
  }, [])


  const barsContext = BarsContext();
  // console.log(barsContext);

  const categories = ['Electronics', 'Fashion', 'Beauty', 'Home', 'Books', 'Grocery', 'Art & Craft']

  const handleImage = async (e) => {
    const img = e.target.files[0];
    const ext = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp", "image/jfif"];
    if (!img) return toast.error('Select an image');
    else if (!ext.includes(img.type)) return toast.error('Invalid File Type');
    else if (img.size > 1048576) return toast.error('File size exceeded');
    else {
      setLoading(true);
      const data = new FormData();
      data.append('file', img);
      data.append('upload_preset', 'Project1');
      data.append('folder', 'tailwind-vite-react-crud');
      data.append('cloud_name', 'dqlnftw5r');
      try {
        let res = await axios.post('https://api.cloudinary.com/v1_1/dqlnftw5r/image/upload', data);
        // console.log(res.data);
        setProduct(prev => ({ ...prev, image: res.data.url }));
        setLoading(false);
      }
      catch (err) {
        console.error('Image upload error: ', err);
        toast.error(err.message)
      }
    }
  }

// const handleImageOnServer=async (e)=>{
//   const data=new FormData();
//   for(const image of e.target.files){
//     data.append('images',image);
//   }
//   data.append('a','atul');
//   try{
//     let res=await axios.post(`${import.meta.env.VITE_NODE_SERVER}/products/images`,data,{headers:{'Content-Type':'multipart/form-data'},withCredentials:true});
//     console.log(res.data);
//   }
//   catch(err){
//     console.log(err);
    
//   }
  
// }

  const addProduct = async (p) => {
    try {
      let res = await fetch(`${import.meta.env.VITE_NODE_SERVER}/products`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...p, createdAt: new Date() }),
        credentials: 'include'
      });

      if (!res.ok) {
        const errData = await res.text();
        throw new Error(errData);
      }

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        throw new Error("Invalid server response");
      }

      if (!data) throw new Error("Something went wrong");

      return data;

    }
    catch (err) {
      console.error('Error in adding product: ', err);
      throw err;
    }
  }

  const updateProduct = async (p) => {
    try {
      let res = await fetch(`${import.meta.env.VITE_NODE_SERVER}/products/${id}`,
        {
          method: 'put',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ ...p, updatedAt: new Date() }),
          credentials: 'include'
        });

      if (!res.ok) {
        const errData = await res.text();
        throw new Error(errData);
      }

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        throw new Error("Invalid server response");
      }

      if (!data) throw new Error("Something went wrong");

      return data;

    }
    catch (err) {
      console.error('Error in updating product: ', err);
      throw err;
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    let { title, price, category, image } = product;
    if (!title || !price || !category || !image) {
      toast.error('Title,Price,Category and Image are required')
    }
    else {
      if (!id) {
        addProduct(product)
          .then(data => {
            console.log(data);
            toast.success('Product added successfully');
            navigate('/admin/viewproducts');
          })
          .catch(err => toast.error(err.message))
      }
      else {
        updateProduct(product)
          .then(data => {
            console.log(data);
            toast.success('Product updated successfully');
            navigate('/admin/viewproducts');
          })
          .catch(err => toast.error(err.message))
      }

    }
  }

  return (
    <div>
      <div className="p-4">
        <h1 className='text-2xl font-bold mb-1'>{id ? 'Update' : 'Add'} Product</h1>
        <hr className='text-gray-400 mb-8' />
        <form action="" onSubmit={handleSubmit} className='sm:mx-10 md:mx-20 lg:mx-30 xl:mx-40 2xl:mx-50 text-gray-800'>
          <div className="flex max-[500px]:flex-col gap-4 mt-3">
            <div className="flex-1 flex flex-col gap-y-1">
              <label htmlFor="title" className='pl-1'>Product Title</label>
              <input type="text" name="title" id="title"
                className='w-full border-1 rounded-sm p-2 border-gray-300 focus:outline-blue-400'
                value={product.title} onChange={e => setProduct({ ...product, title: e.target.value })}
              />
              {errors.title && <span className='text-red-600'>{errors.title}</span>}
            </div>
            <div className="flex-1 flex flex-col gap-y-1">
              <label htmlFor="price" className='pl-1'>Product Price</label>
              <input type="text" name="price" id="price"
                className='w-full border-1 rounded-sm p-2 border-gray-300 focus:outline-blue-400'
                value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })}
              />
              {errors.price && <span className='text-red-600'>{errors.price}</span>}

            </div>
          </div>
          <div className="flex max-[500px]:flex-col gap-4 mt-3">
            <div className="flex-1 flex flex-col gap-y-1">
              <label htmlFor="category" className='pl-1'>Product Category</label>
              <select
                className='w-full border-1 rounded-sm p-2 border-gray-300 focus:outline-blue-400'
                defaultValue=''
                id='category'
                value={product.category} onChange={e => setProduct({ ...product, category: e.target.value })}
              >
                <option value='' name='category' disabled>Select a category</option>
                {categories.map((cat, i) => <option key={i} value={cat} name='category'>{cat}</option>)}
              </select>
              {errors.category && <span className='text-red-600'>{errors.category}</span>}
            </div>
            <div className="flex-1 flex flex-col gap-y-1">
              <label htmlFor="image" className='pl-1'>Product Image</label>
              <input type="file" name="image" id="image" multiple
                className='w-full border-1 rounded-sm p-2 border-gray-300 focus:outline-blue-400'
                onChange={handleImage}
              />
              {errors.image && <span className='text-red-600'>{errors.image}</span>}
              {product.image && <img src={product.image} alt="" className=" mt-3 w-16 h-16 object-cover rounded" />
              }

            </div>
          </div>
          <div className="flex max-[500px]:flex-col gap-4 mt-3">
            <div className="flex-1 flex flex-col gap-y-1">
              <label htmlFor="stock" className='pl-1'>Product Stock</label>
              <input type="text" name="stock" id="stock"
                className='w-full border-1 rounded-sm p-2 border-gray-300 focus:outline-blue-400'
                value={product.stock} onChange={e => setProduct({ ...product, stock: e.target.value })}
              />
              {errors.stock && <span className='text-red-600'>{errors.stock}</span>}
            </div>
            <div className="flex-1 flex flex-col gap-y-1">
              <label htmlFor="brand" className='pl-1'>Product Brand</label>
              <input type="text" name="brand" id="brand"
                className='w-full border-1 rounded-sm p-2 border-gray-300 focus:outline-blue-400'
                value={product.brand} onChange={e => setProduct({ ...product, brand: e.target.value })}
              />
              {errors.brand && <span className='text-red-600'>{errors.brand}</span>}
            </div>
          </div>
          <div className="flex gap-4 mt-3">
            <div className="flex-1 flex flex-col gap-y-1">
              <label htmlFor="description" className='pl-1'>Description</label>
              <textarea
                className='w-full border-1 rounded-sm p-2 border-gray-300 focus:outline-blue-400'
                id='description'
                value={product.description} onChange={e => setProduct({ ...product, description: e.target.value })}
              />
            </div>
          </div>
          <div className='mt-1 flex gap-3'>
            <button
              className={`px-4 py-3 flex-1 mt-3 rounded-sm bg-indigo-500 hover:bg-indigo-400  text-white`}
              type='submit'
              disabled={loading ? true : ''}
            >
              {loading ? <>
                <svg className="mr-3 inline size-5 animate-spin border-4 border-gray-100 border-t-gray-400 rounded-full" viewBox="0 0 24 24">
                </svg>
                Processing…
              </> : <>{id ? 'Update' : 'Add'} Product</>}
            </button>

          </div>
        </form>

      </div>
    </div>
  )
}
