
import React from 'react';
import { Card } from "@/components/ui/card";

interface VoteCardProps {
  className?: string;
  width?: string;
  height?: string;
}

const VoteCard: React.FC<VoteCardProps> = ({ 
  className = '',
  width = 'w-64',
  height = 'h-80'
}) => {
  return (
    <Card className={`${width} ${height} flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0C2D57] text-white font-sans ${className}`}>
      <div className="flex flex-col items-center justify-between h-full w-full">
        {/* Top VOTE */}
        <div className="text-4xl font-bold tracking-wide mt-2">
          VOTE
        </div>
        
        {/* Middle CADE-SHARING */}
        <div className="text-xl font-semibold my-4">
          CADE-SHARING
        </div>
        
        {/* Bottom VOTEs */}
        <div className="flex flex-col items-center w-full mb-2 space-y-2">
          <div className="flex justify-between w-full px-2">
            <span className="text-lg font-semibold">VOTE</span>
            <span className="text-lg font-semibold">VOTE</span>
          </div>
          <div className="flex justify-between w-full px-2">
            <span className="text-lg font-semibold">VOTE</span>
            <span className="text-lg font-semibold">VOTE</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VoteCard;
