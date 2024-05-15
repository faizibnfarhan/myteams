import React from 'react'
import { useToast } from './ui/use-toast'
import Image from 'next/image'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { avatarImage } from '../../constants'

const MeetingCard = (props: {
    icon: string,
    title: string,
    date: string,
    img: string,
    isPreviousMeeting: boolean,
    buttonIcon: string,
    handleClick: () => void,
    link: string,
    buttonText: string,

}) => {
    const { toast } = useToast()
    return (
        <section className="flex max-h-[230px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 pb-16 pt-8 xl:max-w-[568px]">
        <article className="flex flex-col gap-5">
          <Image src={props.img} alt="upcoming" width={24} height={24} />
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-bold">{props.title}</h1>
              <p className="text-sm font-normal">{props.date}</p>
            </div>
          </div>
        </article>
        <article className={cn("flex mt-12 justify-center relative", {})}>
          <div className="relative flex w-full ">
              {
                avatarImage.map((img, index) => (
                    <Image
                        src={img}
                        alt="attendees"
                        key={index}
                        width={34}
                        height={12}
                        style={{ top: 0, left: index * 26 }}
                        className={cn("rounded-full", { absolute: index > -1 })}
                    />
                ))
              }
              
            <div className="flex-center absolute left-[120px] size-9 rounded-full border-[3px] border-dark-3 bg-dark-4">
              <p className='text-sm mt-1.5 ml-1'>
                +5
              </p>
            </div>
          </div>
          {!props.isPreviousMeeting && (
            <div className="flex gap-2">
              <Button onClick={props.handleClick} className="rounded bg-blue-1 px-6">
                {props.buttonIcon && (
                  <Image src={props.buttonIcon} alt="feature" width={20} height={20} />
                )}
                &nbsp; {props.buttonText}
              </Button>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(props.link);
                  toast({
                    title: "Link Copied",
                    style: {
                        backgroundColor: '#0B208F',
                        color: 'white',
                        borderRadius: '4px',
                        border: 'none',
                        
                    }
                  });
                }}
                className="bg-dark-4 px-6"
              >
                <Image
                  src="/icons/copy.svg"
                  alt="feature"
                  width={20}
                  height={20}
                />
                &nbsp; Copy Link
              </Button>
            </div>
          )}
        </article>
      </section>
  )
}

export default MeetingCard
