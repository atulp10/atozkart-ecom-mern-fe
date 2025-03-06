import React, { createContext, useContext, useRef, useState } from 'react'
import Sidebar from './Sidebar'
import AdminNavbar from './AdminNavbar'
import { Outlet } from 'react-router'

const barsContext = createContext();
export const BarsContext = () => useContext(barsContext);

export default function AdminLayout() {

  const [bars, setBars] = useState(false);
  const sidebarRef = useRef();

  const closeSidebar = () => {
    sidebarRef.current.style.width = '0';
    setBars(true)
  }

  const openSidebar = () => {
    setBars(false);
    sidebarRef.current.style.width = '300px';
  }

  return (
    <barsContext.Provider value={{ bars: bars }}>
      <div>
        <div className="flex ">
          <div className='h-screen'><Sidebar refProp={sidebarRef} closeSidebar={closeSidebar} /></div>
          <div className={`flex flex-col flex-grow  ${bars ? '' : 'md:ml-[300px]'} transition-all duration-200 ease`}>
            <AdminNavbar bars={bars} openSidebar={openSidebar} />
            <main className='p-6'><Outlet /></main>
          </div>
        </div>

      </div>
    </barsContext.Provider>

  )
}
