import ScheduledList from '@/components/ScheduledList'
import React from 'react'

const Recorded = () => {
  return (
    <div className='text-white size-full flex flex-col gap-10'>
      <h1 className="font-bold text-lg">
        Recorded Meetings
      </h1>
      <ScheduledList type='recordings' />
 </div>
  )
}

export default Recorded
