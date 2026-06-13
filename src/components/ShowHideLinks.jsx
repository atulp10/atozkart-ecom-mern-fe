import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../redux/cartSlice';
import { selectDetails } from '../redux/checkoutSLice';
import { getStoredUser } from '../utils/session';

export const ShowLoginRegister = ({children}) => {
    if(!getStoredUser()){
  return (
    <div>
        {children}
    </div>
  )
}}

export const ShowLogout = ({ children }) => {
    if (getStoredUser()) {
        return (
            <div className='flex flex-wrap'>
                {children}
            </div>
        )
    }
}

export const Protected=({children})=>{
    const location = useLocation();
    if(!getStoredUser()){
        return <Navigate to='/login' state={{ path: location.pathname }} replace />
    }
    else return children
}

export const ProtectedAdmin=({children})=>{
    const user = getStoredUser();
    if(!user){
        return <Navigate to='/login' replace />
    }
    else if(user.role!=='Admin'){
        return <Navigate to='/' replace />
    }
    else
     return children
}

export const HideLoginIfUserLoggedIn=({children})=>{
    const user = getStoredUser();
    if(user){
        if(user.role==='User') return <Navigate to='/' replace />
        if(user.role==='Admin') return <Navigate to='/admin' replace />
    }
    else
     return children;
}

export const CheckoutGuard = ({ children }) => {
    const user = getStoredUser();
    const cartItems = useSelector(selectCartItems);
    if (!user) return <Navigate to="/login" state={{ path: '/cart' }} replace />;
    if (cartItems.length === 0) return <Navigate to="/cart" replace />;
    return children;
};

export const PaymentGuard = ({ children }) => {
    const cartItems = useSelector(selectCartItems);
    const details = useSelector(selectDetails);
    if (!getStoredUser()) return <Navigate to="/login" replace />;
    if (cartItems.length === 0) return <Navigate to="/cart" replace />;
    if (!details) return <Navigate to="/checkout" replace />;
    return children;
};

const childrenProp = { children: PropTypes.node.isRequired };
ShowLoginRegister.propTypes = childrenProp;
ShowLogout.propTypes = childrenProp;
Protected.propTypes = childrenProp;
ProtectedAdmin.propTypes = childrenProp;
HideLoginIfUserLoggedIn.propTypes = childrenProp;
CheckoutGuard.propTypes = childrenProp;
PaymentGuard.propTypes = childrenProp;


