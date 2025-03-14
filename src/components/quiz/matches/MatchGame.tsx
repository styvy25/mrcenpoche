
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { getRandomQuestions } from '../data/test';
import { BadgeCheck, Clock, User, Users } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import ScoreAnimation from './ScoreAnimation';
import DuelVisualEffects from './components/DuelVisualEffects';
import { useToast } from '@/components/ui/use-toast';
import ConnectedUsers from '@/components/challenge/ConnectedUsers';

const MatchGame = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isAnswering, setIsAnswering] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationType, setAnimationType] = useState<'correct' | 'wrong'>('correct');
  const [playerNames] = useState(['Vous', 'Adversaire']);
  const [players, setPlayers] = useState([
    { id: 1, name: 'Vous', score: 0, isReady: true, isCurrentUser: true },
    { id: 2, name: 'Adversaire', score: 0, isReady: true, isCurrentUser: false }
  ]);
  
  // Initialize questions
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        // Get random questions from our test data
        const gameQuestions = getRandomQuestions(10);
        setQuestions(gameQuestions);
      } catch (error) {
        console.error('Error loading match data:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les questions du quiz.",
          variant: "destructive"
        });
      }
    };
    
    loadQuestions();
  }, [matchId, toast]);
  
  // Timer effect
  useEffect(() => {
    if (questions.length === 0 || currentQuestionIndex >= questions.length) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentQuestionIndex, questions]);
  
  const handleTimeout = () => {
    // Simulate opponent answering
    const isOpponentCorrect = Math.random() > 0.5;
    
    if (isOpponentCorrect) {
      // Update opponent score
      setPlayers((prevPlayers) => 
        prevPlayers.map(player => 
          player.isCurrentUser ? player : { ...player, score: player.score + 5 }
        )
      );
    }
    
    // Move to next question after timeout
    setTimeout(() => {
      goToNextQuestion();
    }, 1500);
  };
  
  const handleAnswerSelected = (selectedAnswer: string) => {
    if (isAnswering || currentQuestionIndex >= questions.length) return;
    
    setIsAnswering(true);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    // Show animation
    setAnimationType(isCorrect ? 'correct' : 'wrong');
    setShowAnimation(true);
    
    if (isCorrect) {
      // Calculate score based on time left
      const questionScore = Math.max(5, timeLeft);
      setScore((prevScore) => prevScore + questionScore);
      
      // Update player score
      setPlayers((prevPlayers) => 
        prevPlayers.map(player => 
          player.isCurrentUser ? { ...player, score: player.score + questionScore } : player
        )
      );
    }
    
    // Simulate opponent answering
    const opponentDelay = Math.floor(Math.random() * 3000) + 1000; // 1-4 seconds
    const isOpponentCorrect = Math.random() > 0.4; // 60% chance of correct
    
    setTimeout(() => {
      if (isOpponentCorrect) {
        const opponentScore = Math.max(5, Math.floor(Math.random() * 10) + 3);
        setPlayers((prevPlayers) => 
          prevPlayers.map(player => 
            !player.isCurrentUser ? { ...player, score: player.score + opponentScore } : player
          )
        );
      }
      
      // Hide animation and go to next question
      setTimeout(() => {
        setShowAnimation(false);
        setIsAnswering(false);
        goToNextQuestion();
      }, 1000);
    }, opponentDelay);
  };
  
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(15);
    } else {
      // End of game - navigate to results
      navigate(`/quiz-match/${matchId}/results`, { 
        state: { 
          score: players.find(p => p.isCurrentUser)?.score || 0,
          opponentScore: players.find(p => !p.isCurrentUser)?.score || 0,
          totalQuestions: questions.length
        } 
      });
    }
  };
  
  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };
  
  // If no questions, show loading
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="pt-20 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mrc-blue"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-20 pb-12 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Match Quiz</h2>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-mrc-blue" />
              <span>{players.length} joueurs</span>
            </div>
          </div>
          
          <Progress 
            value={getProgressPercentage()} 
            className="h-2 mt-4" 
          />
          
          <div className="flex justify-between text-sm mt-1">
            <span>Question {currentQuestionIndex + 1}/{questions.length}</span>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-red-500" />
              <span className="font-medium">{timeLeft}s</span>
            </div>
          </div>
        </div>
        
        {/* Connected users section */}
        <Card className="mb-6 p-4">
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <Users className="h-5 w-5 mr-2 text-mrc-blue" />
            Participants
          </h3>
          <ConnectedUsers />
        </Card>
        
        <Card className="mb-6">
          {questions.length > 0 && currentQuestionIndex < questions.length && (
            <QuizQuestion
              question={questions[currentQuestionIndex]}
              onAnswerSelected={handleAnswerSelected}
              disabled={isAnswering}
              key={currentQuestionIndex}
            />
          )}
        </Card>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {players.map((player) => (
            <Card key={player.id} className={`p-4 ${player.isCurrentUser ? 'border-mrc-blue' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-mrc-blue" />
                  <span className="font-medium">{player.name}</span>
                  {player.isCurrentUser && (
                    <BadgeCheck className="h-4 w-4 ml-1 text-green-500" />
                  )}
                </div>
                <div className="font-bold text-2xl">{player.score}</div>
              </div>
            </Card>
          ))}
        </div>
        
        <DuelVisualEffects 
          playerName={playerNames[0]} 
          opponentName={playerNames[1]}
          currentQuestion={currentQuestionIndex}
          showAnimation={showAnimation}
          animationType={animationType}
        />
        
        {showAnimation && (
          <ScoreAnimation 
            type={animationType} 
            score={animationType === 'correct' ? '+5' : '0'} 
          />
        )}
      </div>
    </div>
  );
};

export default MatchGame;
