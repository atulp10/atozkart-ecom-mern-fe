import React, { useEffect, useRef, useState } from 'react'
import { FaAtlassian } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'

export default function Register() {
  const [user, setUser] = useState({ username: '', email: '', password: '', confpass: '' })
  const [errors, setErrors] = useState({})
  const usernameRef = useRef();
  const navigate = useNavigate()

  useEffect(() => { usernameRef.current.focus() }, [])

  const checkUsername = () => {
    if (user.username === '') {
      setErrors(prev => ({ ...prev, username: 'Username is required' })); return false
    }
    else {
      setErrors(prev => ({ ...prev, username: '' })); return true
    }
  }

  const checkEmail = () => {
    if (user.email === '') {
      setErrors(prev => ({ ...prev, email: 'Email is required' })); return false
    }
    else {
      setErrors(prev => ({ ...prev, email: '' })); return true
    }
  }

  const checkPassword = () => {
    if (user.password === '') {
      setErrors(prev => ({ ...prev, password: 'Password is required' })); return false
    }
    else {
      setErrors(prev => ({ ...prev, password: '' })); return true
    }
  }

  const checkConfPass = () => {
    if (user.confpass !== user.password || !user.password) {
      setErrors(prev => ({ ...prev, confpass: 'Password does not match' })); return false
    }
    else {
      setErrors(prev => ({ ...prev, confpass: '' })); return true
    }
  }


  const postUser = async () => {
    try {
      let res = await fetch(`${import.meta.env.VITE_NODE_SERVER}/users/register`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...user, createdAt: new Date(), role: 'User' }),
        credentials: 'include'
      });

      if (!res.ok) {
        let errData = await res.json();
        throw new Error(errData.message);
      }

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        throw new Error("Invalid server response");
      }

      if (!data) throw new Error("No data received from server");

      return data;
    }
    catch (err) {
      console.error('Error in user registration: ', err);
      throw err;
    }

  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    let u = checkUsername()
    let em = checkEmail()
    let p = checkPassword()
    let cp = checkConfPass()

    if (!u || !em || !p || !cp) toast.error('Missing Credentials');
    else {
      try {
        const res = await postUser();
        sessionStorage.setItem('userin', JSON.stringify(res));
        toast.success('Registration Successful');
        navigate('/');
      }
      catch (err) {
        toast.error(err.message);
      }
    }
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
          Create a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6" noValidate onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                ref={usernameRef}
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                onBlur={checkUsername}
                required
                autoComplete="username"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.username && <span className='text-red-600'>{errors.username}</span>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                onBlur={checkEmail}
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.email && <span className='text-red-600'>{errors.email}</span>}
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
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                onBlur={checkPassword}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.password && <span className='text-red-600'>{errors.password}</span>}

          </div>

          <div>
            <label htmlFor="confpass" className="block text-sm/6 font-medium text-gray-900">
              Confirm password
            </label>
            <div className="mt-2">
              <input
                id="confpass"
                name="confpass"
                type="confpass"
                value={user.confpass}
                onChange={(e) => setUser({ ...user, confpass: e.target.value })}
                onBlur={checkConfPass}
                required
                autoComplete="confpass"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.confpass && <span className='text-red-600'>{errors.confpass}</span>}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already a member?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Login to your account
          </Link>
        </p>
      </div>
    </div>
  )
}
