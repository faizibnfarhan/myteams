import MeetingTypeList from '@/components/MeetingTypeList'
import { currentUser } from '@clerk/nextjs'
import React from 'react'

async function DashboardPage() {
  const user = await currentUser()
  const now = new Date()
  const time = now.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })
  const date = (new Intl.DateTimeFormat('en-AU', { dateStyle: 'full' })).format(now)
  return (
    
    <section className='flex flex-col gap-16 text-white'>
        <p className="text-gray-300 font-extralight text-sm">
        👋 Welcome back, {user?.firstName} 
        </p>
      <div className="h-[303px] rounded-[20px] bg-hero bg-cover"></div>
      <div className='space-y-40 absolute mt-28 ml-10'>
        <h2 className='glassmorphism max-w-[210px] text-xs font-light rounded py-2 px-3'>
          Upcoming Meeting at: 12:30 PM
        </h2>
        <div>
          <h1 className='text-4xl font-bold uppercase'>
            {time}
          </h1>
          <p className='text-sm text-gray-300'>
            {date}
          </p>
        </div>

      </div>
        <MeetingTypeList />
    </section>
  )
}

export default DashboardPage
