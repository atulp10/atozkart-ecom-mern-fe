import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate, Link, useLoaderData } from 'react-router'

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { IoSearchOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import { ShowLoginRegister, ShowLogout } from './ShowHideLinks';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../redux/cartSlice';
import { FaAtlassian } from "react-icons/fa";
import { FILTER_BY_SEARCH } from '../redux/filterSlice';
import Footer from './Footer';
import { getErrorMessage } from '../api/client';
import { clearStoredUser, getStoredUser } from '../utils/session';
import { CLEAR_FAV } from '../redux/favSlice';
import { logout } from '../getProductsData';


const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Products', href: '/products', current: false },
    { name: 'Contact', href: '/contact', current: false },
]

export default function Header() {

    const [user, setUser] = useState(getStoredUser);
    const [search, setSearch] = useState('');
    const cartItems = useSelector(selectCartItems);
    const products = useLoaderData();
    const dispatch = useDispatch();
    const redirect = useNavigate();

    useEffect(() => {
        const syncUser = () => setUser(getStoredUser());
        window.addEventListener('authchange', syncUser);
        window.addEventListener('storage', syncUser);
        return () => {
            window.removeEventListener('authchange', syncUser);
            window.removeEventListener('storage', syncUser);
        };
    }, []);

    useEffect(() => {
        dispatch(FILTER_BY_SEARCH({ products, search }))
    }, [dispatch, products, search])

    const logOutUser = async () => {
        try {
            await logout();
            clearStoredUser();
            dispatch(CLEAR_FAV());
            toast.success('Logged out successfully');
            redirect('/');
        }
        catch (err) {
            toast.error(getErrorMessage(err, 'Failed to logout'));
        }
    }

    return (
        <div className='h-screen flex flex-col'>

            <Disclosure as="nav" className="bg-gray-800">
                <div className="mx-auto  px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                {/* <img
                                    alt="Your Company"
                                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                    className="h-8 w-auto"
                                /> */}
                                <FaAtlassian className='size-8 text-amber-400' />
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            to={item.href}
                                            aria-current={item.current ? 'page' : undefined}

                                            className={({ isActive }) => (
                                                isActive ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium' :
                                                    'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                                            )}

                                        // className={classNames(
                                        //     item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        //     'rounded-md px-3 py-2 text-sm font-medium',
                                        // )}
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="hidden min-[900px]:block">
                            <div className='relative'>
                                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                                    placeholder='Search'
                                    className='text-white rounded-xl focus:ring-amber-300 p-2 pl-8' />
                                <IoSearchOutline className='text-white absolute top-3 left-2' />
                            </div>
                        </div>

                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <ShowLoginRegister>

                                <div className="flex">
                                    <button
                                        type="button"
                                        className="relative me-4 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <NavLink to='/cart'
                                            className={({ isActive }) => (
                                                isActive ? ' text-white text-base font-medium relative' :
                                                    'text-gray-300 hover:bg-gray-700 hover:text-white relative rounded-md text-base font-medium'
                                            )}
                                        >
                                            <ShoppingBagIcon aria-hidden="true" className="size-7 me-2" />
                                        </NavLink>
                                        <span className='bg-red-700 text-white text-xs leading-none rounded-full py-1 px-2 font-bold inline-flex absolute top-0 right-0'>{cartItems.length}</span>

                                    </button>

                                    <div className="hidden  sm:block">
                                        <div className="flex space-x-4">

                                            <NavLink
                                                to='/login'
                                                className={({ isActive }) => (
                                                    isActive ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium' :
                                                        'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                            >
                                                Login
                                            </NavLink>

                                            <NavLink
                                                to='/register'
                                                className={({ isActive }) => (
                                                    isActive ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium' :
                                                        'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                            >
                                                Register
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>

                            </ShowLoginRegister>


                            <ShowLogout>
                                <span className='text-gray-200 mt-2 text-sm px-4 sm:block hidden font-medium'>Welcome, {user?.username}!</span>
                                <button
                                    type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <NavLink to='/cart'
                                        className={({ isActive }) => (
                                            isActive ? ' text-white text-base font-medium relative' :
                                                'text-gray-300 hover:bg-gray-700 hover:text-white relative rounded-md text-base font-medium'
                                        )}
                                    >
                                        <ShoppingBagIcon aria-hidden="true" className="size-7 me-2" />
                                    </NavLink>
                                    <span className='bg-red-700 text-white text-xs leading-none rounded-full py-1 px-2 font-bold inline-flex absolute top-0 right-0'>{cartItems.length}</span>

                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                alt=""
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                className="size-8 rounded-full"
                                            />
                                        </MenuButton>
                                    </div>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                    >
                                        <MenuItem>
                                        <Link
                                                to='/myprofile'
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                            >
                                                My Profile
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link
                                                to='/myorders'
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                            >
                                                My Orders
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link
                                                to='/myfavourites'
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                            >
                                                My Favourites
                                            </Link>
                                        </MenuItem>
                                        
                                        <MenuItem>

                                            <button
                                                onClick={logOutUser}
                                                className="block px-4 pr-31 cursor-pointer py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                            >
                                                Sign out
                                            </button>


                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </ShowLogout>
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="sm:hidden ">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <span className='text-white block sm:hidden rounded-md px-3 py-2 font-medium'>Welcome, {user?.username ? user.username : 'Guest'}!</span>
                        {navigation.map((item) => (
                            // <DisclosureButton
                            //     key={item.name}
                            //     as={NavLink}
                            //     to={item.href}
                            //     aria-current={item.current ? 'page' : undefined}

                            //     className={({isActive})=>(
                            //         isActive?'bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium' : 
                            //         'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                            //     )}

                            //     // className={classNames(
                            //     //     item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            //     //     'block rounded-md px-3 py-2 text-base font-medium',
                            //     // )}
                            // >
                            //     {item.name}
                            // </DisclosureButton>

                            <NavLink
                                key={item.name}
                                to={item.href}
                                aria-current={item.current ? 'page' : undefined}

                                className={({ isActive }) => (
                                    isActive ? 'bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium' :
                                        'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                                )}

                            // className={classNames(
                            //     item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            //     'block rounded-md px-3 py-2 text-base font-medium',
                            // )}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        <ShowLoginRegister>
                            <NavLink
                                to='/login'
                                className={({ isActive }) => (
                                    isActive ? 'bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium' :
                                        'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                                )}
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to='/register'
                                className={({ isActive }) => (
                                    isActive ? 'bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium' :
                                        'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                                )}
                            >
                                Register
                            </NavLink>
                        </ShowLoginRegister>

                    </div>
                </DisclosurePanel>
            </Disclosure>

            <div className=''>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
