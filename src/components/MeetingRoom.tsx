"use client";

import {
  CallControls,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import { User2, Users, Users2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [layout, setLayout] = useState<CallLayoutType>("grid");
  const isPersonalRoom = !!searchParams.get("personal");
  const [showParticipants, setShowParticipants] = useState(false);

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden pt-4">
      <div className="absolute lg:mt-[-200px] lg:left-[-120px] z-100 block xl:flex lg:flex size-full items-center justify-center">
        <section className="block rounded flex-col lg:mz-18 xl:mb-18 lg:mr-52 mb-12 lg:w-full xl:w-full w-80 max-w-full max-h-full items-center">
          <CallLayout />
        </section>
        <div
          className={cn(
            "hidden absolute lg:bg-transparent xl:bg-transparent bg-[#19232d] right-0 top-0 h-[600px] px-4 py-8",
            { "block rounded-xl": showParticipants }
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bg-dark-1 bottom-0 ml-4 mr-8 left-0 xl:ml-auto lg:ml-auto flex w-full items-center justify-center -space-x-3 gap-5">
        <CallControls onLeave={() => router.push("/personal-room")} />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="rounded-full px-2.5 py-2.5 bg-[#19232d] hover:bg-[#4c535b]">
            <Users2 size={18} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </div>
  );
};

export default MeetingRoom;
