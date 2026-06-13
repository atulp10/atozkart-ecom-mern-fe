import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaAtlassian } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router'
import { toast } from 'react-toastify';
import { storeUser } from '../utils/session';
import { getErrorMessage } from '../api/client';

const Login = () => {

  const [loading,setLoading]=useState(false);
  const location = useLocation()
  const redirect = useNavigate()
  const { register, trigger, handleSubmit, getValues, formState: { errors }, setFocus } = useForm();

  useEffect(() => { setFocus('email') }, [setFocus]);

  const loginUser = async () => {
    setLoading(true);
    try {
      let { email, password } = getValues()
      let res = await fetch(`${import.meta.env.VITE_NODE_SERVER}/users/login`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
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

      toast.success('You are logged in successfully!');
      storeUser(data);
      const destination = location.state?.path;
      if (data.role === "User") redirect(typeof destination === 'string' && destination.startsWith('/') && !destination.startsWith('//') ? destination : "/");
      else if (data.role === "Admin") redirect('/admin');
    }
    catch (err) {
      toast.error(getErrorMessage(err, 'Login failed'));
    }
    finally {
      setLoading(false);
    }
  }

  const onSubmit = () => {
    loginUser();
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        /> */}
        <FaAtlassian className='size-20 mx-auto text-amber-400' />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" noValidate className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                {...register('email', { required: { value: true, message: 'Email is required' } })}
                onBlur={() => trigger('email')}
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                {...register('password', { required: { value: true, message: 'Password is required' } })}
                onBlur={() => trigger('password')}
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.password && <span className='text-red-600'>{errors.password.message}</span>}

          </div>

          <div>
            <button
              type="submit"
              className={`flex w-full justify-center rounded-md ${loading?'bg-indigo-300':'bg-indigo-600 hover:bg-indigo-500'}  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs  `}
              disabled={loading}
            >
              {loading? <>
                <svg className=" inline size-5 animate-spin border-4 border-gray-100 border-t-gray-400 rounded-full" viewBox="0 0 24 24">
                </svg>
              </> : <>Sign in</>}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
