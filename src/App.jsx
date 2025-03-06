import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router'
import {ToastContainer} from 'react-toastify'

function App() {
 

  return (
   <>
   <ToastContainer position="bottom-left"
                  autoClose={3000}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable={false}
                  pauseOnHover={false}
                  theme="colored"
/>
   <Outlet/>
   </>
  )
}

export default App
