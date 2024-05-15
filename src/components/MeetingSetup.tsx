import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({setIsSetupComplete}: {setIsSetupComplete: (
    value: boolean
) => void}) => {
    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false)
    const call = useCall()
    useEffect(() => {
        if(isMicCamToggledOn){
            call?.camera.disable();
            call?.microphone.disable();
        } else{
            call?.camera.enable();
            call?.microphone.enable();
        }
    }, [isMicCamToggledOn, call?.camera, call?.microphone])
  return (
    <div className='flex justify-center items-center flex-col gap-3 text-white'>
        <h1 className="text-xl font-bold">
            Setup
        </h1>
        <div className="">
            <VideoPreview className='h-full w-full rounded-lg mt-8 mb-8'/>
        </div>
        <div className="flex flex-row items-center gap-3">
            <label className="flex items-center justify-center gap-2 font-medium">
                <input type="checkbox" checked={isMicCamToggledOn} onChange={(e) => {
                    setIsMicCamToggledOn(e.target.checked)
                }} />
                Join without microphone and camera
            </label>
            <DeviceSettings/>
        </div>
        <div className="">
            <Button className='rounded w-full bg-green-600 px-4 py-2.5' onClick={() => {
                call?.join()
                setIsSetupComplete(true)
            }}>
                Join meeting
            </Button>
        </div>
       
    </div>
  )
}

export default MeetingSetup
