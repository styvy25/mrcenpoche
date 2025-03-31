
import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

interface ResultHeaderProps {
  performanceLevel: "excellent" | "good" | "average" | "needsImprovement";
}

const ResultHeader: React.FC<ResultHeaderProps> = ({ performanceLevel }) => {
  // User-friendly messages based on performance
  const messages = {
    excellent: {
      title: "Félicitations !",
      message: "Vous avez excellé dans ce quiz. Votre connaissance est impressionnante !"
    },
    good: {
      title: "Bon travail !",
      message: "Vous avez une bonne maîtrise du sujet. Continuez comme ça !"
    },
    average: {
      title: "Pas mal !",
      message: "Vous avez une connaissance de base du sujet. Continuez à apprendre !"
    },
    needsImprovement: {
      title: "Continuez vos efforts !",
      message: "Avec plus de pratique, vous améliorerez vos résultats."
    }
  };

  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, type: "spring" }}
    >
      <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">{messages[performanceLevel].title}</h2>
      <p className="text-gray-600 mb-4">{messages[performanceLevel].message}</p>
    </motion.div>
  );
};

export default ResultHeader;
