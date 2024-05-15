import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="absolute bg-dark-1  text-white lg:w-[680px] xl:w-[1350px] w-auto md:w-[540px] mr-8 h-[260px] flex flex-col rounded justify-center items-start pl-12 gap-7 p-4">
      <button
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={() => setIsVisible(false)}
      >
        &times;
      </button>
      <Image className='mb-2' src={'/favicon.svg'} width={50} height={50} alt={'Logo'}        
      />
      <p className="text-sm text-gray-300">Made by Muhammad Faiz Khan, Just for portfolio use only</p>
      <Link target='_blank' href="https://github.com/muhammadfaizkhan">
        <Button className='flex gap-3 items-center text-xs bg-black rounded'>
            <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12C2 16.41 4.87 20.17 8.84 21.54C9.34 21.63 9.5 21.35 9.5 21.12C9.5 20.93 9.49 20.37 9.48 19.61C6.73 20.13 6.14 18.47 6.14 18.47C5.7 17.24 5.03 16.92 5.03 16.92C4.07 16.31 5.11 16.32 5.11 16.32C6.17 16.4 6.7 17.41 6.7 17.41C7.65 19.03 9.23 18.59 9.8 18.35C9.89 17.72 10.13 17.3 10.41 17.05C7.82 16.8 5.09 15.8 5.09 11.64C5.09 10.33 5.54 9.27 6.27 8.46C6.16 8.21 5.77 7.06 6.38 5.4C6.38 5.4 7.33 5.13 9.5 6.44C10.4 6.18 11.38 6.05 12.36 6.05C13.34 6.05 14.32 6.18 15.22 6.44C17.38 5.13 18.33 5.4 18.33 5.4C18.94 7.06 18.55 8.21 18.45 8.46C19.18 9.27 19.63 10.33 19.63 11.64C19.63 15.81 16.89 16.8 14.3 17.04C14.7 17.39 15.06 18.05 15.06 19.03C15.06 20.36 15.04 21.32 15.04 21.12C15.04 21.35 15.2 21.63 15.7 21.54C19.67 20.17 22.54 16.41 22.54 12C22.54 6.48 18.06 2 12 2Z"
                />
            </svg>
            Support Me
        </Button>
      </Link>
      
        
        
    </div>
  );
};

export default Banner;
