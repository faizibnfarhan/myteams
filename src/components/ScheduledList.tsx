// @ts-nocheck

"use client"

import React, { useEffect, useState } from 'react'
import useGetCalls from '../../hooks/useGetCalls'
import { useRouter } from 'next/navigation';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import MeetingCard from './MeetingCard';
import Loader from './Loader';

const ScheduledList = ({type}: { type: 'ended' | 'upcoming' | 'recordings' }) => {
    const { endedCalls,upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const router = useRouter()
    const [recordings, setRecordings ] = useState<CallRecording[]>([]);
    const getCalls = () => {
        switch (type) {
            case 'ended':
              return endedCalls;
            case 'recordings':
              return recordings;
            case 'upcoming':
              return upcomingCalls;
            default:
              return [];
          }
    }

    const getNoCalls = () => {
        switch (type) {
            case 'ended':
              return 'No Previous Calls';
            case 'upcoming':
              return 'No Upcoming Calls';
            case 'recordings':
              return 'No Recordings';
            default:
              return '';
          }
    }

    useEffect(() => {

      const fetchRecordings = async () => {
        try{
          const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()))
          const recordings = callData.filter(call => call.recordings.length > 0).flatMap(
            call => call.recordings
          )
  
          setRecordings(recordings)
        } catch(error){
        }        
      }

      if(type === 'recordings') fetchRecordings()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, callRecordings])

    const calls = getCalls();
    const noCalls = getNoCalls()
    return (
    <div className='grid w-full grid-cols-1 gap-4 xl:grid-cols-2'>
        {
            calls && calls.length > 0 ? calls.map((meeting: 
                Call | CallRecording) => (
                <MeetingCard 
                key={(meeting as Call).id} 
                isPreviousMeeting={type === 'ended'}
                buttonIcon={type === 'recordings' ? '/icons/recorded.svg' : undefined}
                buttonText={type === 'recordings' ? 'View Recording' : 'Start'}
                icon={
                    type === 'ended'
                    ? '/icons/completed.svg'
                    : type === 'upcoming'
                    ? '/icons/upcoming.svg'
                    : '/icons/recorded.svg'
                    
                }
                handleClick={
                    type === 'recordings'
                    ? () => router.push(`${(meeting as CallRecording).url}`)
                    : () => router.push(`/meeting/${(meeting as Call).id}`)
                  }
                link={
                    type === 'recordings'
                    ? (meeting as CallRecording).url
                    : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
                  }                
                title={(meeting as Call).state?.custom?.description?.substring(0, 26) || meeting?.filename?.substring(0, 20) || 'Personal Room'}
                date={meeting.state?.startsAt.toLocaleString() || (meeting.start_time.toLocaleString())}
                img={'/icons/schedule.svg'}
                />
            )) : (
                <h1>
                    {noCalls}
                </h1>
            
            )}
    </div>
  )
}

export default ScheduledList
