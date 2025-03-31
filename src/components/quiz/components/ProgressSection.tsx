
import React from "react";
import GameProgressBar from "@/components/gamification/GameProgressBar";

interface ProgressSectionProps {
  points: number;
  level: {
    level: number;
    title: string;
  };
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ points, level }) => {
  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-mrc-blue">Votre progression</h3>
        <span className="font-medium">{points} pts</span>
      </div>
      <GameProgressBar />
      <p className="mt-2 text-sm text-gray-600">
        Niveau {level.level}: {level.title}
      </p>
    </div>
  );
};

export default ProgressSection;
