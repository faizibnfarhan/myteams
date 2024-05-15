"use client"

import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import React from 'react';

const Navbar = () => {
  const pathname = usePathname(); 
  const router = useRouter();
  const { isLoaded, user } = useUser();

  const showButton = () => {
    const pathsToShowDashboard = ['/pricing', '/contact', '/'];
    if (isLoaded && user && pathsToShowDashboard.includes(pathname)) {
      return (
        <Button
          className='rounded'
          size='sm'
          variant='default'
          onClick={() => router.push('/dashboard')}
          style={{ color: 'white', background: '#0B208F', textDecoration: 'none' }}
        >
          Dashboard
        </Button>
      );
    }
    return null;
  };

  const isActive = (href: string) => pathname === href;

  return (
    <nav className='flex-between flex text-white justify-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href='/' className='w-36 z-50 flex items-center gap-1'>
        <Image
          src='/Logo.svg'
          alt='Logo'
          width={148}
          height={142}
          className='hidden xl:flex lg:flex'
        />
        <Image src='/favicon.svg' alt='logo' width={36} height={36} className='flex xl:hidden lg:hidden' />
      </Link>
      {['/', '/pricing', '/contact'].includes(pathname) && (
        <div className='flex flex-row font-light text-sm gap-3 ml-auto space-x-4 mr-12 items-center'>
          <Link href='/'>
            <span className={isActive('/') ? 'font-semibold' : 'font-light'}>Home</span>
          </Link>
          <Link href='/pricing'>
            <span className={isActive('/pricing') ? 'font-semibold' : 'font-light'}>Pricing</span>
          </Link>
          <Link href='/contact'>
            <span className={isActive('/contact') ? 'font-semibold' : 'font-light'}>Contact</span>
          </Link>
        </div>
      )}
      <div className='flex items-center gap-5'>
        {isLoaded && user && <UserButton afterSignOutUrl='/' />}
        {
          showButton()
        }
      </div>
      {!user && (
        <div className='text-white space-x-8 no-underline'>
          <Button
            onClick={() => router.push('/sign-in')}
            style={{ color: 'white', textDecoration: 'none' }}
            variant='link'
          >
            Sign In
          </Button>
          <Button
            variant='default'
            onClick={() => router.push('/sign-up')}
            style={{ color: 'white', background: '#0B208F', textDecoration: 'none' }}
          >
            Sign Up
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
