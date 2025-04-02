
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BadgeProps, QuizQuestion } from './types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { CheckCircle, XCircle, Award, Clock, Medal, Share2 } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  categoryName: string;
  onRestart: () => void;
  unlockedBadges?: BadgeProps[];
  timeSpent?: number;
  correctAnswers?: number;
  questions?: QuizQuestion[];
  selectedAnswers?: number[];
}

const QuizResult: React.FC<QuizResultProps> = ({
  score,
  totalQuestions,
  categoryName,
  onRestart,
  unlockedBadges = [],
  timeSpent = 0,
  correctAnswers = 0,
  questions = [],
  selectedAnswers = []
}) => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  
  // Calculate metrics
  const percentage = Math.round((score / 100) * totalQuestions);
  const isPerfectScore = percentage === totalQuestions;
  const isGoodScore = percentage >= Math.floor(totalQuestions * 0.7);
  const formattedTime = timeSpent ? `${Math.floor(timeSpent / 60000)}:${Math.floor((timeSpent % 60000) / 1000).toString().padStart(2, '0')}` : '0:00';
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="border-none shadow-xl bg-gradient-to-b from-blue-50 to-white">
        <CardHeader className="text-center pb-2">
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
          >
            {isPerfectScore ? (
              <Medal className="h-16 w-16 text-yellow-500" />
            ) : isGoodScore ? (
              <CheckCircle className="h-16 w-16 text-green-500" />
            ) : (
              <span className="text-5xl">🏆</span>
            )}
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-1">
              {isPerfectScore 
                ? "Score parfait !" 
                : isGoodScore 
                  ? "Excellent travail !" 
                  : "Quiz terminé"}
            </h2>
            
            <p className="text-gray-500 text-sm mb-3">
              {isPerfectScore 
                ? "Vous avez répondu correctement à toutes les questions !" 
                : isGoodScore 
                  ? "Vous maîtrisez bien ce sujet." 
                  : "Continuez à apprendre pour améliorer vos connaissances."}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center items-baseline"
          >
            <span className="text-5xl font-bold text-blue-600">
              {percentage}
            </span>
            <span className="text-gray-500 mx-1">/</span>
            <span className="text-2xl text-gray-500">
              {totalQuestions}
            </span>
            <span className="text-xl text-blue-600 font-medium ml-2">
              ({score}%)
            </span>
          </motion.div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="flex justify-center mb-1">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-sm text-gray-500">Temps</p>
              <p className="font-medium">{formattedTime}</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="flex justify-center mb-1">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-sm text-gray-500">Correctes</p>
              <p className="font-medium">{correctAnswers}/{totalQuestions}</p>
            </div>
          </div>
          
          {unlockedBadges && unlockedBadges.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-6"
            >
              <h3 className="text-center font-semibold mb-3 text-gray-700">
                Badges débloqués
              </h3>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {unlockedBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.2 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-0.5 flex-shrink-0"
                  >
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Award className="h-8 w-8 text-indigo-500" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {questions && questions.length > 0 && !isSmallScreen && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 border-t border-gray-100 pt-4"
            >
              <h3 className="text-center font-semibold mb-3 text-gray-700">
                Résumé des réponses
              </h3>
              
              <div className="space-y-2 max-h-40 overflow-y-auto px-2">
                {questions.map((question, index) => {
                  const userAnswer = selectedAnswers[index];
                  const correctAnswer = typeof question.correctAnswer === 'string' 
                    ? parseInt(question.correctAnswer) 
                    : question.correctAnswer;
                  const isCorrect = userAnswer === correctAnswer;
                  
                  return (
                    <div key={question.id} className="flex items-center text-sm">
                      {isCorrect ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                      )}
                      <span className="truncate">{question.question}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col gap-2">
          <Button 
            onClick={onRestart} 
            className="w-full bg-mrc-blue hover:bg-blue-700"
          >
            Refaire le quiz
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Partager mon score
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuizResult;
