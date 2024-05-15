"use client";

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useUser } from '@clerk/nextjs';
import React from 'react';
import { useGetCallById } from '../../../../../hooks/useGetCallById';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import Banner from '@/components/Banner';

const Table = ({
  title, 
  description
}: {
  title: string, 
  description: string
}) => (
  <div className='flex flex-col items-start gap-2'>
      <h1 className='font-semibold text-sm text-gray-300'>
          {title}:
      </h1>
      <h1 className='capitalize text-sm font-light'>
        {description}
      </h1>
  </div>    
);

const PersonalPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const meetingId = user?.id;
  const client = useStreamVideoClient();
  const { call } = useGetCallById(meetingId!);
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  const handleClick = async () => {
    if (!client || !user) return;
    const newCall = client.call('default', meetingId!);
    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString()
        }
      });
    }
    router.push(`/meeting/${meetingId}?personal=true`);
  };

  return (
    <div className='text-white size-full flex flex-col gap-10'>
      <h1 className="font-bold text-lg">
        Personal Room
      </h1>
      <div className="flex w-full flex-col gap-8 ">
        <Table title={'Room Name'} description={`${user?.username}'s Meeting Room`} />
        <Table title={'Meeting ID'} description={meetingId!} />
        <Table title={'Invitation Link'} description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-1 rounded" onClick={handleClick}>
          Start Meeting
        </Button>
        <Button className="bg-dark-1 border border-dark-1 rounded" onClick={() => {
          navigator.clipboard.writeText(meetingLink);
          toast({
            title: " 🔗 Link Successfully Copied",
            style: {
              background: 'rgb(4 10 44)',
              border: 'none',
              borderRadius: '10px'
            }
          });
        }}>
          Copy Link
        </Button>

      </div>
      <div className='mt-8'>
          <Banner/> 
        </div>
    </div>
  );
};

export default PersonalPage;
