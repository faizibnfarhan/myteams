"use client"

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React from 'react'

const HomeLayout = ({ children }) => {
  const { isLoaded, user } = useUser();
  const pathname = usePathname();

  const showSidebar = isLoaded && user && !["/", "/pricing", "/contact"].includes(pathname);

  return (
        <div className='flex flex-col min-h-screen'>
          <Navbar/>
          <div className="flex space-x-24 lg:space-x-72">
            {showSidebar && <Sidebar/>}
            <main className="flex-1 mt-24 p-6">
                {children}
            </main>
          </div>
        </div>
  );
};

export default HomeLayout;