
import React from "react";
import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { MatchParticipant } from "@/components/quiz/types/match";

interface PlayerRankingsProps {
  participants: MatchParticipant[];
}

const PlayerRankings: React.FC<PlayerRankingsProps> = ({ participants }) => {
  // Sort participants by score in descending order
  const sortedParticipants = [...participants].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="font-semibold flex items-center justify-center mb-4">
        <Users className="h-5 w-5 mr-2" />
        <span>Classement des joueurs</span>
      </h4>
      
      <div className="space-y-3">
        {sortedParticipants.map((participant, index) => (
          <motion.div
            key={participant.id}
            className={`p-3 border rounded-lg flex justify-between items-center ${
              index === 0 ? "bg-yellow-50 border-yellow-200" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center">
              <span className="font-bold mr-3">{index + 1}.</span>
              <span>{participant.name}</span>
            </div>
            <div className="text-right">
              <div className="font-semibold">{participant.score} pts</div>
              <div className="text-xs text-gray-500">
                {participant.correctAnswers}/{participant.totalAnswers} correctes
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PlayerRankings;
