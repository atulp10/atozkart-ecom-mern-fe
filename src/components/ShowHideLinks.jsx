import React from 'react'
import { Navigate } from 'react-router'
import { toast } from 'react-toastify'

export const ShowLoginRegister = ({children}) => {
    if(!sessionStorage.getItem('userin')){
  return (
    <div>
        {children}
    </div>
  )
}}

export const ShowLogout = ({ children }) => {
    if (sessionStorage.getItem('userin')) {
        return (
            <div className='flex flex-wrap'>
                {children}
            </div>
        )
    }
}

export const Protected=({children})=>{
    if(!sessionStorage.getItem('userin')){
        toast.warning('You must login first');
        return <Navigate to='/login' replace={true}></Navigate>
    }
    else return children
}

// export const Protected = ({children})=>{
//     if(sessionStorage.getItem("userin") !=null){
//         let obj = JSON.parse(sessionStorage.userin)
//         if(obj.isLoggedIn && obj.role=="User") return children
//         else{
//             toast.warning('You must login first');
//             return <Navigate to='/login' replace={true}/> 
//         } 
//     }
//     else return <Navigate to='/login' replace={true}/>
// }

export const ProtectedAdmin=({children})=>{
    if(!sessionStorage.getItem('userin')){
        toast.warning('You must login first');
        return <Navigate to='/login' replace={true}></Navigate>
    }
    else if((JSON.parse(sessionStorage.userin)).role!=='Admin'){
        toast.error('Authorization failed');
        return <Navigate to='/' replace={true}></Navigate>
    }
    else
     return children
}

export const HideLoginIfUserLoggedIn=({children})=>{
    if(sessionStorage.getItem('userin')){
        toast.warning('You are already logged in');
        if(JSON.parse(sessionStorage.userin).role==='User')
            return <Navigate to='/' replace={true}></Navigate>
        else if(JSON.parse(sessionStorage.userin).role==='Admin')
            return <Navigate to='/admin' replace={true}></Navigate>
    }
    else
     return children;
}


