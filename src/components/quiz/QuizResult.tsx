
import React from "react";
import { motion } from "framer-motion";
import QuizNotification from "./QuizNotification";
import ResultHeader from "./components/ResultHeader";
import ScoreDisplay from "./components/ScoreDisplay";
import ProgressSection from "./components/ProgressSection";
import EarnedBadgesSection from "./components/EarnedBadgesSection";
import ResultActions from "./components/ResultActions";
import { useQuizResult } from "./hooks/useQuizResult";

const QuizResult = ({ score, totalQuestions, categoryName, onRestart, result, earnedBadges }) => {
  const { 
    showNotification,
    setShowNotification,
    newAchievements,
    performanceLevel,
    badgesToDisplay,
    currentUser,
    level,
    points
  } = useQuizResult({ score, totalQuestions, result, earnedBadges });

  return (
    <div className="relative">
      {showNotification && badgesToDisplay.length > 0 && (
        <QuizNotification
          type="achievement"
          title="Nouveau badge débloqué !"
          message={`Vous avez débloqué : ${badgesToDisplay[0].name}`}
          isVisible={showNotification}
          onClose={() => setShowNotification(false)}
          duration={5000}
        />
      )}
    
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md text-center"
      >
        <ResultHeader performanceLevel={performanceLevel} />
        
        <ScoreDisplay 
          score={score}
          totalQuestions={totalQuestions}
          categoryName={categoryName}
        />

        {currentUser && (
          <ProgressSection
            points={points}
            level={level}
          />
        )}

        <EarnedBadgesSection
          badges={badgesToDisplay}
          newAchievements={newAchievements}
        />
        
        <ResultActions
          onRestart={onRestart}
          score={score}
          totalQuestions={totalQuestions}
          categoryName={categoryName}
        />
      </motion.div>
    </div>
  );
};

export default QuizResult;
