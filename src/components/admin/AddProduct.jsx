import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import axios from "axios";
import { getLocalProducts } from '../../getProductsData';
import { getErrorMessage, request } from '../../api/client';
import { validateProduct } from '../../utils/validation';

const emptyProduct = { title: '', price: '', category: '', image: '', stock: '', brand: '', description: '' };
const categories = ['Electronics', 'Fashion', 'Beauty', 'Home', 'Books', 'Grocery', 'Art & Craft'];

export default function AddProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(emptyProduct);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(Boolean(id));
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getLocalProducts()
        .then(data => {
          const found = data.find(d => d._id === id);
          if (!found) throw new Error('Product not found');
          setProduct(found);
        })
        .catch(err => { toast.error(getErrorMessage(err)); navigate('/admin/viewproducts', { replace: true }); })
        .finally(() => setPageLoading(false));
    }
    else {
      setProduct(emptyProduct)
    }
  }, [id, navigate])

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
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dqlnftw5r';
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'Project1';
      data.append('upload_preset', uploadPreset);
      data.append('folder', 'atozkart');
      try {
        let res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data);
        setProduct(prev => ({ ...prev, image: res.data.secure_url }));
      }
      catch (err) {
        toast.error(getErrorMessage(err, 'Image upload failed'))
      }
      finally {
        setLoading(false);
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = validateProduct(product);
    setErrors(result.errors);
    if (!result.valid) return toast.error('Please correct the highlighted fields');
    setLoading(true);
    try {
      await request({ url: id ? `/products/${id}` : '/products', method: id ? 'PUT' : 'POST', data: result.data });
      toast.success(`Product ${id ? 'updated' : 'added'} successfully`);
      navigate('/admin/viewproducts');
    } catch (error) {
      toast.error(getErrorMessage(error, `Unable to ${id ? 'update' : 'add'} product`));
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) return <p className="p-6">Loading product...</p>;

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
              <input type="number" name="price" id="price" min="0.01" step="0.01"
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
                id='category'
                value={product.category} onChange={e => setProduct({ ...product, category: e.target.value })}
              >
                <option value='' name='category' disabled>Select a category</option>
                {categories.map((cat) => <option key={cat} value={cat} name='category'>{cat}</option>)}
              </select>
              {errors.category && <span className='text-red-600'>{errors.category}</span>}
            </div>
            <div className="flex-1 flex flex-col gap-y-1">
              <label htmlFor="image" className='pl-1'>Product Image</label>
              <input type="file" name="image" id="image" accept="image/jpeg,image/png,image/gif,image/webp"
                className='w-full border-1 rounded-sm p-2 border-gray-300 focus:outline-blue-400'
                onChange={handleImage}
              />
              {errors.image && <span className='text-red-600'>{errors.image}</span>}
              {product.image && <img src={product.image} alt="Product preview" className=" mt-3 w-16 h-16 object-cover rounded" />
              }

            </div>
          </div>
          <div className="flex max-[500px]:flex-col gap-4 mt-3">
            <div className="flex-1 flex flex-col gap-y-1">
              <label htmlFor="stock" className='pl-1'>Product Stock</label>
              <input type="number" name="stock" id="stock" min="0" step="1"
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
                maxLength={2000}
                value={product.description} onChange={e => setProduct({ ...product, description: e.target.value })}
              />
            </div>
          </div>
          <div className='mt-1 flex gap-3'>
            <button
              className={`px-4 py-3 flex-1 mt-3 rounded-sm bg-indigo-500 hover:bg-indigo-400  text-white`}
              type='submit'
              disabled={loading}
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
