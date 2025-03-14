
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import QuizQuestion from '../QuizQuestion';
import MainLayout from '@/components/layout/MainLayout';
import { useToast } from '@/components/ui/use-toast';
import ScoreAnimation from './ScoreAnimation';
import ConnectedUsers from '@/components/challenge/ConnectedUsers';
import { quizData } from '../quizData';

const MatchGame = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showScoreAnimation, setShowScoreAnimation] = useState(false);
  const [scoreAnimationValue, setScoreAnimationValue] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [connectedUsers, setConnectedUsers] = useState([
    {
      user_id: '1',
      name: 'Jean Pierre',
      online_at: new Date().toISOString(),
      score: 320,
    },
    {
      user_id: '2',
      name: 'Marie Ngo',
      online_at: new Date().toISOString(),
      score: 280,
    },
    {
      user_id: '3',
      name: 'Paul Biya',
      online_at: new Date().toISOString(),
      score: 240,
    },
    {
      user_id: '4',
      name: 'Vous',
      online_at: new Date().toISOString(),
      score: score,
    }
  ]);

  // Get quiz questions based on matchId
  const questions = quizData.questions.slice(0, 10);
  const currentQuestion = questions[currentQuestionIndex];
  
  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleAnswerSubmit('');
    }
  }, [timeLeft]);

  // Update user score in connected users list
  useEffect(() => {
    setConnectedUsers(prev => {
      const updatedUsers = [...prev];
      const userIndex = updatedUsers.findIndex(u => u.user_id === '4');
      if (userIndex !== -1) {
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          score: score
        };
      }
      return updatedUsers.sort((a, b) => (b.score || 0) - (a.score || 0));
    });
  }, [score]);

  const handleAnswerSubmit = (selectedAnswer: string) => {
    // Save answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);
    
    // Calculate points based on correctness and time left
    let pointsEarned = 0;
    if (selectedAnswer === currentQuestion.correctAnswer) {
      pointsEarned = Math.max(10, timeLeft * 2); // Base 10 points + bonus for speed
      
      // Show score animation
      setScoreAnimationValue(pointsEarned);
      setShowScoreAnimation(true);
      setTimeout(() => setShowScoreAnimation(false), 1500);
      
      // Update score
      setScore(score + pointsEarned);
    }
    
    // Proceed to next question or end of game
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(15);
      }, 500);
    } else {
      // End of match
      setTimeout(() => {
        navigate(`/quiz-match/${matchId}/results`);
      }, 1000);
    }
    
    // Update other users' scores randomly
    setTimeout(() => {
      setConnectedUsers(prev => {
        return prev.map(user => {
          if (user.user_id !== '4') { // Not the current user
            const randomPoints = Math.floor(Math.random() * 20);
            return {
              ...user,
              score: (user.score || 0) + (Math.random() > 0.3 ? randomPoints : 0)
            };
          }
          return user;
        }).sort((a, b) => (b.score || 0) - (a.score || 0));
      });
    }, 300);
  };

  return (
    <MainLayout>
      <div className="pb-20">
        <Card className="w-full shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">
                Défi en cours
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="text-sm font-semibold">
                  Score: {score}
                </div>
                <div className="text-sm font-medium px-2 py-1 bg-amber-100 text-amber-800 rounded">
                  Question {currentQuestionIndex + 1}/{questions.length}
                </div>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Temps restant</span>
                <span>{timeLeft}s</span>
              </div>
              <Progress 
                value={(timeLeft / 15) * 100} 
                className="h-2" 
                indicatorClassName={timeLeft < 5 ? "bg-red-500" : ""}
              />
            </div>
          </CardHeader>
          
          <CardContent className="relative pt-4">
            {showScoreAnimation && (
              <ScoreAnimation points={scoreAnimationValue} />
            )}
            
            <QuizQuestion
              question={currentQuestion.question}
              options={currentQuestion.options}
              onAnswerSelected={handleAnswerSubmit}
              disabled={timeLeft === 0}
              key={currentQuestionIndex}
            />
          </CardContent>
          
          <CardFooter className="flex-col items-start pt-2">
            <div className="w-full mt-4">
              <h3 className="text-sm font-medium mb-2">Classement en direct</h3>
              <ConnectedUsers users={connectedUsers} />
            </div>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default MatchGame;
