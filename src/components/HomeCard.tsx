import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'


function HomeCard(props: { img: string, title: string, slogan: string, className: string, handleClick: () => void }) {
    return (
        <div onClick={props.handleClick} className={`${props.className} rounded-[20px] w-100 cursor-pointer`}>
            <div className=" px-4  py-6 flex flex-col justify-between w-full lg:max-w-[270px] xl:max-w-[270px] min-h-[240px]">
                <div className="flex-center text-white size-12">
                    <Image className={props.className} src={props.img} width={30} height={30} alt='New Meeting' />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-md font-bold">
                        {props.title}
                    </h1>
                    <p className="text-sm font-light">
                        {props.slogan}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HomeCard
