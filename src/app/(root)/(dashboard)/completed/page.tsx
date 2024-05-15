import ScheduledList from '@/components/ScheduledList'
import React from 'react'

const CompletedPage = () => {
  return (
    <div className='text-white size-full flex flex-col gap-10'>
       <h1 className="font-bold text-lg">
        Completed Meetings
      </h1>
      <ScheduledList type='ended' />
    </div>
  )
}

export default CompletedPage
