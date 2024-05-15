import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const SignUpPage = () => {
  return (
    <div className='block overflow-hidden ml-24 lg:ml-0 xl:ml-0 xl:justify-center lg:justify-center xl:space-x-8 lg:space-x-8 xl:flex lg:flex lg:items-center xl:items-center min-h-screen sm:space-y-16 md:space-y-20'>
    <div className="block sm:mt-16 md:mt-16 sm:ml-16 md:ml-16 space-y-6 justify-start items-center">
    <Image className='mt-16 mb-8 md:ml-4 md:mb-12 sm:mb-12 xl:ml-1 lg:ml-1 sm:ml-12' src="/logo.svg" alt='Logo' width={160} height={10}/>
    <p className='font-light hidden lg:block xl:block text-left text-xs text-gray-400'>
    © Designed and Developed by<br/> <a target='_blank' className='text-white font-medium no-underline' href='https://github.com/muhammadfaizkhan'>Muhammad Faiz Khan</a> for portfolio<br/> usage only.
    </p>
    </div>
    <div className='mb-24'>
      <SignUp afterSignInUrl={"/sign-up"}/>
    </div>
    <p className='font-light block mt-20 lg:hidden xl:hidden text-xs text-gray-400'>
    © Designed and Developed by <a target='_blank' className='text-white font-medium no-underline' href='https://github.com/muhammadfaizkhan'>Muhammad Faiz Khan</a> for portfolio usage only.
    </p>
</div>
  )
}

export default SignUpPage
