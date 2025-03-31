
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { RefreshCcw, Trophy, Award, Share2 } from "lucide-react";
import SocialShareButtons from "../shared/SocialShareButtons";
import QuizAchievement from "./QuizAchievement";
import QuizNotification from "./QuizNotification";
import { BadgeProps } from "./types";
import GameProgressBar from "../gamification/GameProgressBar";
import { useAuth } from "@/components/auth/AuthContext";
import { useGamification } from "@/services/gamificationService";

const QuizResult = ({ score, totalQuestions, categoryName, onRestart, result, earnedBadges }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [showShareButtons, setShowShareButtons] = useState(false);
  const percentage = Math.round((score / totalQuestions) * 100);
  const [newAchievements, setNewAchievements] = useState([]);
  const { currentUser } = useAuth();
  const { level, points } = useGamification(currentUser?.id || 'anonymous');
  
  // Determine performance level
  const getPerformanceLevel = () => {
    if (percentage >= 90) return "excellent";
    if (percentage >= 70) return "good";
    if (percentage >= 50) return "average";
    return "needsImprovement";
  };
  
  const performanceLevel = getPerformanceLevel();
  
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

  // Show achievement notification when component mounts
  useEffect(() => {
    if (result?.unlockedBadges && result.unlockedBadges.length > 0) {
      // Track which achievements are new
      setNewAchievements(result.unlockedBadges.map(b => b.id));
      
      // Show notification for first achievement
      setShowNotification(true);
      
      // Also show toast notification
      toast.success("Nouveau badge débloqué !", {
        description: `Vous avez débloqué : ${result.unlockedBadges[0].name}`,
        duration: 4000,
      });
    } else if (earnedBadges && earnedBadges.length > 0) {
      // Use earnedBadges prop if result is not available
      setNewAchievements(earnedBadges.map(b => b.id));
      setShowNotification(true);
      
      toast.success("Nouveau badge débloqué !", {
        description: `Vous avez débloqué : ${earnedBadges[0].name}`,
        duration: 4000,
      });
    }
  }, [result?.unlockedBadges, earnedBadges]);

  const badgesToDisplay = result?.unlockedBadges || earnedBadges || [];

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
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">{messages[performanceLevel].title}</h2>
          <p className="text-gray-600 mb-4">{messages[performanceLevel].message}</p>
        </motion.div>
        
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

        {currentUser && (
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
        )}

        {badgesToDisplay.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <h3 className="font-semibold mb-3 flex items-center justify-center gap-2">
              <Award className="h-5 w-5 text-purple-500" />
              Badges débloqués
            </h3>
            <div className="space-y-2">
              {badgesToDisplay.map((badge) => (
                <QuizAchievement
                  key={badge.id}
                  type={badge.id.includes('perfect') ? 'perfect' : 
                        badge.id.includes('expert') ? 'master' : 
                        badge.id.includes('quick') ? 'fast' : 'streak'}
                  title={badge.name}
                  description={badge.description}
                  isNew={newAchievements.includes(badge.id)}
                  points={15}
                />
              ))}
            </div>
          </motion.div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button 
            onClick={onRestart} 
            variant="outline" 
            className="w-full sm:w-auto"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Recommencer
          </Button>
          
          {!showShareButtons && (
            <Button 
              onClick={() => setShowShareButtons(true)}
              className="w-full sm:w-auto bg-mrc-blue"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Partager mes résultats
            </Button>
          )}
        </div>
        
        {showShareButtons && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6"
          >
            <p className="mb-3 text-sm text-gray-600">
              Partagez votre score avec vos amis !
            </p>
            <SocialShareButtons 
              title={`J'ai obtenu ${score}/${totalQuestions} au quiz sur ${categoryName} !`}
              description={`Rejoignez MRC en Poche et testez vos connaissances !`}
              type="quiz"
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default QuizResult;
