
import React from "react";
import { Badge } from "@/components/ui/badge";
import { BadgeProps } from "./types";
import { motion } from "framer-motion";

const QuizBadgesDisplay = ({ badges }: { badges: BadgeProps[] }) => {
  if (!badges || badges.length === 0) {
    return null;
  }
  
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-4">
      {badges.map((badge, index) => (
        <motion.div 
          key={index} 
          className="flex flex-col items-center bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md border border-gray-100 max-w-[150px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15, duration: 0.5 }}
        >
          <div className="mb-2 p-2 rounded-full bg-gray-50 border border-gray-200">
            {badge.icon}
          </div>
          <Badge className="mb-2 px-3">{badge.name}</Badge>
          <p className="text-sm text-center text-gray-600">{badge.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default QuizBadgesDisplay;
