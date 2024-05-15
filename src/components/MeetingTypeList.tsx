"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from './ui/use-toast'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Input } from './ui/input'

const MeetingTypeList = () => {
    const router = useRouter()
    const [details, setDetails] = useState<Call>()
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    })
    const meetingLink = `
        ${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${details?.id}
    `
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    const { user } = useUser()
    const client = useStreamVideoClient()
    const createMeeting = async () => {
        if (!client || !user) return;
        try {
            if (!values.dateTime) {
                toast
                    (
                        {
                            title: '❗️ Please select a valid date and time',
                            style: {
                                backgroundColor: "#FDCD00",
                                border: "none",
                                borderRadius: "10px",
                            }
                        }
                    )
                return;
            }
            const id = crypto.randomUUID();
            const call = client.call('default', id)
            if (!call) throw new Error("Failed to initiate a call");
            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
            const description = values.description || "Instant Meeting"
            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })
            setDetails(call)
            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }
            toast
                (
                    {
                        title: "🚀  Meeting Successfuly Created",
                        style: {
                            backgroundColor: "green",
                            border: "none",
                            borderRadius: "10px",
                        }
                    }
                )
        } catch (error) {
            toast
                (
                    {
                        title: '😢 Failed to create the meeting',
                        style: {
                            backgroundColor: "red",
                            border: "none",
                            borderRadius: "10px",
                        }
                    }
                )
        }
    }
    return (
        <section className="grid size-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
            <HomeCard className="bg-gold-1" img="/icons/plus.svg" title="New Meeting" slogan="Start a new meeting" handleClick={() => setMeetingState('isInstantMeeting')
            } />
            <HomeCard className='bg-blue-1' img="/icons/schedule.svg" title="Schedule Meeting" slogan="Plan your new meeting" handleClick={() => setMeetingState('isScheduleMeeting')
            } />
            <HomeCard className='bg-purple-1' img="/icons/recorded.svg" title="See Recordings" slogan="View recorded meetings" handleClick={() => router.push('/recordings')} />
            <HomeCard className='bg-red-1' img="/icons/avatar.svg" title="Join Meeting" slogan="Via meeting link" handleClick={() => setMeetingState('isJoiningMeeting')
            } />
            <div className='flex mx-4 py-4  mb-28 z-100'>
                {
                    !details ? (
                        <MeetingModal
                            isOpen={meetingState === 'isScheduleMeeting'}
                            onClose={() => setMeetingState(undefined)}
                            title="Schedule Meeting"
                            handleClick={createMeeting} img={''} className={''} buttonText={'Create Meeting'} buttonIcon='/icons/video.svg'>
                            <div className="flex  flex-col gap-3">
                                <label className="text-left text-sm text-gray-400 text-normal leading-[22px] text-sky-2">
                                    Add a description
                                </label>
                                <textarea
                                    className="border-none bg-dark-2 outline-none text-sm p-5 focus:none focus-visible:ring-0 focus-visible:ring-offset-0"
                                    onChange={(e) => {
                                        setValues({ ...values, description: e.target.value })
                                    }}

                                />
                            </div>
                            <div className="flex w-full flex-col gap-3">
                                <label className='text-sm text-left text-gray-400 text-normal leading-[22px]'>
                                    Select Date and Time
                                </label>
                                <ReactDatePicker
                                    selected={values.dateTime}
                                    onChange={(date: Date) => {
                                        setValues({ ...values, dateTime: date! })
                                    }}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeCaption="time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    className="w-full text-left rounded bg-dark-2 pl-5 pr-5 pt-3 pb-3 mt-4 focus:outline-none outline-none text-sm"
                                />
                            </div>
                        </MeetingModal>
                    ) : (
                        <MeetingModal
                            isOpen={meetingState === 'isScheduleMeeting'}
                            onClose={() => setMeetingState(undefined)}
                            title="Meeting Created"
                            buttonText='Copy Link'
                            handleClick={() => {
                                navigator.clipboard.writeText
                                toast({
                                    title: "📎  Link Copied",
                                    style: {
                                        backgroundColor: '#0B208F',
                                        color: 'white',
                                        borderRadius: '4px',
                                        border: 'none',

                                    }
                                })
                            }}
                            className={''} img='/icons/checked.svg' buttonIcon='/icons/copy.svg' />
                    )
                }
                <MeetingModal
                    isOpen={meetingState === 'isInstantMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Start a new meeting"
                    buttonText="New Meeting"
                    handleClick={createMeeting} img={''} className={''} buttonIcon={'/icons/video.svg'} />
                    
                <MeetingModal
                    isOpen={meetingState === 'isJoiningMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Enter the link here"
                    buttonText="Join Meeting"
                    handleClick={() => router.push(values.link)} img={''} className={'text-center'} buttonIcon={'/icons/video.svg'}>
                        <Input className='w-full p-2 mb-4 text-black text-xs border-none outline-none focus:ring-transparent focus-visible:ring-offset-0 rounded'
                            placeholder='Meeting Link'
                            onChange={(e) => setValues({
                                ...values, link: e.target.value
                            })}
                        />
                </MeetingModal>
            </div>
        </section>
    )
}

export default MeetingTypeList
