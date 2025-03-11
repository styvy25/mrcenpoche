
import React from "react";
import { Award } from "lucide-react";
import { motion } from "framer-motion";
import { MatchParticipant } from "@/components/quiz/types/match";

interface WinnerDisplayProps {
  winner: MatchParticipant;
}

const WinnerDisplay: React.FC<WinnerDisplayProps> = ({ winner }) => {
  return (
    <div className="text-center mb-6">
      <motion.div
        className="inline-block"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Award className="h-16 w-16 text-yellow-500 mx-auto" />
      </motion.div>
      <h3 className="text-xl font-bold mt-2">Gagnant: {winner.name}</h3>
      <p className="text-sm text-gray-500">avec {winner.score} points</p>
    </div>
  );
};

export default WinnerDisplay;
