"use client"

import React from 'react'
import { sidebarLinks } from '../../constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const Sidebar = () => {
    const pathname = usePathname()
  return (
    <div className='fixed left-0 top-0 flex h-screen w-fit flex-col  justify-between  bg-dark-1 p-6 pt-28 text-white  lg:w-[264px]'>
        <div className="flex flex-col gap-6 ">
            {
                sidebarLinks.map((link) => {
                    const isActive = pathname === link.route
                    return (
                        <Link href={link.route} key={link.label} className={cn("flex gap-3 items-center p-4 rounded-lg justify-start", {"bg-blue-1": isActive})}>
                                <Image
                                    src={link.imgUrl}
                                    alt={link.label}
                                    width={18}
                                    height={18}
                                />
                                <p className='text-xs font-light hidden lg:flex'>
                                    {link.label}
                                </p>
                        </Link>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Sidebar
