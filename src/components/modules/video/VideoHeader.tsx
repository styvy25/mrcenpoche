
import React from 'react';
import { motion } from "framer-motion";
import { Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface VideoHeaderProps {
  roomCode: string;
  participantsCount: number;
  onCopyRoomCode: () => void;
  onEndMeeting: () => void;
}

const VideoHeader: React.FC<VideoHeaderProps> = ({
  roomCode,
  participantsCount,
  onCopyRoomCode,
  onEndMeeting
}) => {
  return (
    <div className="p-4 border-b border-gray-800 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-mrc-blue/20 rounded-full p-2"
        >
          <Video size={18} className="text-mrc-blue" />
        </motion.div>
        <div>
          <h3 className="font-semibold">Réunion locale MRC</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge 
              variant="outline" 
              className="text-xs bg-gray-800 gap-1 cursor-pointer hover:bg-gray-700 transition-colors" 
              onClick={onCopyRoomCode}
            >
              <span>{roomCode}</span>
              <span className="text-[10px] text-mrc-blue">Cliquez pour copier</span>
            </Badge>
            <Badge variant="outline" className="text-xs bg-mrc-blue/20 text-mrc-blue">
              {participantsCount} participants
            </Badge>
          </div>
        </div>
      </div>
      <Button variant="destructive" size="sm" className="h-8 gap-1" onClick={onEndMeeting}>
        <Video size={14} />
        <span className="hidden sm:inline">Quitter</span>
      </Button>
    </div>
  );
};

export default VideoHeader;
