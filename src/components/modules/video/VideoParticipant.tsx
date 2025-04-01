
import React from 'react';
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, MicOff, Camera, CameraOff } from "lucide-react";

export interface Participant {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  speaking: boolean;
  isYou?: boolean;
}

interface VideoParticipantProps {
  participant: Participant;
  isMicOn: boolean;
  isCameraOn: boolean;
  toggleMicrophone?: () => void;
  toggleCamera?: () => void;
  videoRef?: React.RefObject<HTMLVideoElement>;
}

const VideoParticipant: React.FC<VideoParticipantProps> = ({
  participant,
  isMicOn,
  isCameraOn,
  toggleMicrophone,
  toggleCamera,
  videoRef
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-lg overflow-hidden ${
        participant.isYou ? "col-span-1 md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      {participant.isYou && isCameraOn ? (
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          playsInline
          className="w-full h-48 object-cover bg-black"
        />
      ) : (
        <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
          <Avatar className="h-24 w-24">
            {participant.avatar ? (
              <AvatarImage src={participant.avatar} />
            ) : (
              <AvatarFallback className="bg-mrc-blue/30 text-gray-100 text-2xl">
                {participant.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-white text-sm truncate max-w-[120px]">{participant.name}</span>
          {participant.speaking && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="h-2 w-2 rounded-full bg-green-500"
            />
          )}
        </div>
        
        {participant.isYou && toggleMicrophone && toggleCamera && (
          <div className="flex gap-1">
            <button 
              onClick={toggleMicrophone}
              className={`p-1 rounded-full ${isMicOn ? 'bg-mrc-blue' : 'bg-gray-700'}`}
            >
              {isMicOn ? <Mic size={14} /> : <MicOff size={14} />}
            </button>
            <button 
              onClick={toggleCamera}
              className={`p-1 rounded-full ${isCameraOn ? 'bg-mrc-green' : 'bg-gray-700'}`}
            >
              {isCameraOn ? <Camera size={14} /> : <CameraOff size={14} />}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VideoParticipant;
