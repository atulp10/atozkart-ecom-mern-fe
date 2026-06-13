import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router'
import App from './App'
import Header from './components/Header'
import AdminLayout from './components/admin/AdminLayout'
import { CheckoutGuard, HideLoginIfUserLoggedIn, PaymentGuard, Protected, ProtectedAdmin } from './components/ShowHideLinks'
import { getLocalProducts} from './getProductsData'
import RouteError from './components/RouteError'

const Home = lazy(() => import('./components/Home'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const PageNotFound = lazy(() => import('./components/PageNotFound'));
const Products = lazy(() => import('./components/Products'));
const Cart = lazy(() => import('./components/Cart'));
const Checkout = lazy(() => import('./components/Checkout'));
const PaymentPage = lazy(() => import('./components/PaymentPage'));
const ThankYouPage = lazy(() => import('./components/ThankYouPage'));
const MyOrders = lazy(() => import('./components/MyOrders'));
const ViewOrder = lazy(() => import('./components/ViewOrder'));
const MyFavourites = lazy(() => import('./components/MyFavourites'));
const ShowProduct = lazy(() => import('./components/ShowProduct'));
const Contact = lazy(() => import('./components/Contact'));
const MyProfile = lazy(() => import('./components/MyProfile'));
const AddProduct = lazy(() => import('./components/admin/AddProduct'));
const Dashboard = lazy(() => import('./components/admin/Dashboard'));
const ViewProducts = lazy(() => import('./components/admin/ViewProducts'));
const AdminAllOrders = lazy(() => import('./components/admin/AdminAllOrders'));
const AdminViewOrder = lazy(() => import('./components/admin/AdminViewOrder'));

const render = (element) => <Suspense fallback={<p className="p-8">Loading...</p>}>{element}</Suspense>;

const Routing = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <RouteError />,
        children: [
            {
                path: '/', element: <Header />, loader: getLocalProducts,
                children: [
                    { path: '/', element: render(<Home />) },
                    { path: '/contact', element: render(<Contact/>) },
                    { path: 'login', element: <HideLoginIfUserLoggedIn>{render(<Login />)}</HideLoginIfUserLoggedIn> },
                    { path: 'register', element: <HideLoginIfUserLoggedIn>{render(<Register />)}</HideLoginIfUserLoggedIn> },
                    { path: 'products', element: render(<Products />), loader: getLocalProducts },
                    { path: 'products/:id', element: render(<ShowProduct/>),loader: getLocalProducts },
                    { path: 'cart', element: render(<Cart />) },
                    { path: 'checkout', element: <CheckoutGuard>{render(<Checkout/>)}</CheckoutGuard> },
                    { path: 'payment', element: <PaymentGuard>{render(<PaymentPage/>)}</PaymentGuard> },
                    { path: 'thankyou', element: <Protected>{render(<ThankYouPage/>)}</Protected> },
                    { path: 'myorders', element: <Protected>{render(<MyOrders/>)}</Protected> },
                    { path: 'myorders/:id', element: <Protected>{render(<ViewOrder/>)}</Protected> },
                    { path: 'myfavourites', element: <Protected>{render(<MyFavourites/>)}</Protected> },
                    { path: 'myprofile', element: <Protected>{render(<MyProfile/>)}</Protected> },
                ]
            },
            {
                path: '/admin', element: <ProtectedAdmin><AdminLayout /></ProtectedAdmin>,
                children: [
                    { index: true, element: render(<Dashboard />) },
                    { path: 'addproduct', element: render(<AddProduct />) },
                    {path:'viewproducts',element:render(<ViewProducts/>)},
                    {path:`products/edit/:id`,element:render(<AddProduct/>)},
                    {path:`allorders`,element:render(<AdminAllOrders/>)},
                    {path:`allorders/:id`,element:render(<AdminViewOrder/>)},
                ]
            },
        ]
    },

    { path: '*', element: render(<PageNotFound />) }
])

export default Routing
