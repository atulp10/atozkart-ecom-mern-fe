import React from 'react'
import { createBrowserRouter } from 'react-router'
import App from './App'
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import PageNotFound from './components/PageNotFound'
import Products from './components/Products'
import AdminLayout from './components/admin/AdminLayout'
import AddProduct from './components/admin/AddProduct'
import Dashboard from './components/admin/Dashboard'
import { HideLoginIfUserLoggedIn, Protected, ProtectedAdmin } from './components/ShowHideLinks'
import Cart from './components/Cart'
import { getLocalProducts} from './getProductsData'
import ViewProduct from './components/admin/ViewProducts'
import ViewProducts from './components/admin/ViewProducts'
import Checkout from './components/Checkout'
import PaymentPage from './components/PaymentPage'
import ThankYouPage from './components/ThankYouPage'
import MyOrders from './components/MyOrders'
import ViewOrder from './components/ViewOrder'
import AdminAllOrders from './components/admin/AdminAllOrders'
import AdminViewOrder from './components/admin/AdminViewOrder'
import MyFavourites from './components/MyFavourites'
import ShowProduct from './components/ShowProduct'
import Contact from './components/Contact'
import MyProfile from './components/MyProfile'

const Routing = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/', element: <Header />, loader: getLocalProducts,
                children: [
                    { path: '/', element: <Home /> },
                    { path: '/contact', element: <Contact/> },
                    { path: 'login', element: <HideLoginIfUserLoggedIn><Login /></HideLoginIfUserLoggedIn> },
                    { path: 'register', element: <Register /> },
                    { path: 'products', element: <Products />, loader: getLocalProducts },
                    { path: 'products/:id', element: <ShowProduct/>,loader: getLocalProducts },
                    { path: 'cart', element: <Cart /> },
                    { path: 'checkout', element: <Checkout/> },
                    { path: 'payment', element: <PaymentPage/> },
                    { path: 'thankyou', element: <ThankYouPage/> },
                    { path: 'myorders', element: <Protected><MyOrders/></Protected> },
                    { path: 'myorders/:id', element: <Protected><ViewOrder/></Protected> },
                    { path: 'myfavourites', element: <Protected><MyFavourites/></Protected> },
                    { path: 'myprofile', element: <Protected><MyProfile/></Protected> },
                ]
            },
            {
                path: '/admin', element: <ProtectedAdmin><AdminLayout /></ProtectedAdmin>,
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: 'addproduct', element: <AddProduct /> },
                    {path:'viewproducts',element:<ViewProducts/>},
                    {path:`products/edit/:id`,element:<AddProduct/>},
                    {path:`allorders`,element:<AdminAllOrders/>},
                    {path:`allorders/:id`,element:<AdminViewOrder/>},
                ]
            },
        ]
    },

    { path: '*', element: <PageNotFound /> }
])

export default Routing
