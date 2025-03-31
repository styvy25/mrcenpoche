
import React from "react";
import { Progress } from "@/components/ui/progress";

interface ScoreDisplayProps {
  score: number;
  totalQuestions: number;
  categoryName: string;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ 
  score, 
  totalQuestions, 
  categoryName 
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-semibold">Votre score:</span>
        <span className="font-bold text-xl">{score}/{totalQuestions}</span>
      </div>
      <Progress value={percentage} className="h-3" />
      <p className="mt-2 text-sm text-gray-500">
        Catégorie: {categoryName}
      </p>
    </div>
  );
};

export default ScoreDisplay;
