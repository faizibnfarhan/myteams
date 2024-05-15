import React, { ReactNode } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import Image from 'next/image'
import { Button } from './ui/button'

const MeetingModal = (props: {title: string, img: string, className: string, 
    buttonText: string,  buttonIcon: string , handleClick?: () => void, isOpen: boolean, 
    children?: ReactNode, onClose: () => void}) => {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
        <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white'>
            <div className="flex flex-col text-center gap-5">
                {props.img &&
                    <div className='justify-center inset-0 items-center flex'>
                        <Image
                            src={props.img}
                            alt='hello'
                            width={52}
                            height={52}
                        />
                    </div>
                }
                <h1 className="text-2xl font-bold">
                    {props.title}
                </h1>
                {props.children}
                <div className='flex pl-3 mt-8 items-center bg-blue-1 w-auto ml-auto mr-auto focus-visible:ring-0 rounded focus-visible:ring-offset-0'>
                    <Image
                                src={props.buttonIcon}
                                alt='hello' 
                                width={18}
                                height={18}
                            />
                <Button className='outline-none focus-visible:outline-none focus-within:outline-none border-none focus:outline-none' 
                onClick={props.handleClick}> {props.buttonText || "Schedule Meeting"}</Button>    
                </div>
            </div>       
        </DialogContent>
    </Dialog>
  )
}

export default MeetingModal
