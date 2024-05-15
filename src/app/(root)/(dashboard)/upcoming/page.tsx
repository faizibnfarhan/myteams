import ScheduledList from '@/components/ScheduledList'
import React from 'react'

const UpcomingPage = () => {
  return (
    <div className='text-white size-full flex flex-col gap-10'>
      <h1 className="font-bold text-lg">
        Upcoming Meetings
      </h1>
      <ScheduledList type={'upcoming'} />
    </div>
  )
}

export default UpcomingPage
