
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getMatch, updateScore, completeMatch } from "@/services/matchService";
import { Match, MatchParticipant } from "@/components/quiz/types/match";
import QuizQuestionComponent from "../QuizQuestion";
import { ArrowRight, Award, Users, Share2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import ScoreAnimation from "./ScoreAnimation";

const MatchGame: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined);
  const [score, setScore] = useState(0);
  const [participant, setParticipant] = useState<MatchParticipant | null>(null);
  const [showScoreAnimation, setShowScoreAnimation] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  useEffect(() => {
    if (!matchId) return;
    
    const fetchedMatch = getMatch(matchId);
    if (fetchedMatch) {
      setMatch(fetchedMatch);
      // For simplicity, take the first participant (who is the creator)
      setParticipant(fetchedMatch.participants[0]);
    } else {
      toast.error("Match introuvable");
      navigate("/quiz");
    }
    setLoading(false);
  }, [matchId, navigate]);

  const handleAnswer = (answerIndex: number) => {
    if (!match || selectedAnswer !== undefined) return;
    
    setSelectedAnswer(answerIndex);
    
    const currentQuestion = match.questions[currentQuestionIndex];
    const isCorrect = currentQuestion.correctAnswer === String(answerIndex);
    const earnedPoints = isCorrect ? 10 : 0;
    
    setPointsEarned(earnedPoints);
    setShowScoreAnimation(true);
    
    setTimeout(() => {
      setShowScoreAnimation(false);
    }, 1500);
    
    if (participant && matchId) {
      const updatedMatch = updateScore(
        matchId, 
        participant.id, 
        earnedPoints,
        isCorrect
      );
      
      if (updatedMatch) {
        setMatch(updatedMatch);
        // Update the current participant
        const updatedParticipant = updatedMatch.participants.find(p => p.id === participant.id);
        if (updatedParticipant) {
          setParticipant(updatedParticipant);
          setScore(updatedParticipant.score);
        }
      }
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(undefined);
    if (currentQuestionIndex < (match?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of game
      if (match && matchId) {
        completeMatch(matchId);
        navigate(`/quiz-match/${matchId}/results`);
      }
    }
  };

  const shareOnWhatsApp = () => {
    if (!match) return;
    
    if (match.inviteLink) {
      window.open(match.inviteLink, '_blank');
    } else {
      toast.error("Lien d'invitation non disponible");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold mb-4">Match introuvable</h2>
        <Button onClick={() => navigate("/quiz")}>Retour aux quiz</Button>
      </div>
    );
  }

  const currentQuestion = match.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / match.questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{match.title}</CardTitle>
            <Button variant="outline" size="sm" onClick={shareOnWhatsApp}>
              <Share2 className="h-4 w-4 mr-2" />
              Inviter
            </Button>
          </div>
          <CardDescription>
            {match.category === "test" ? "MRC Test" : "Politique Camerounaise"}
          </CardDescription>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="text-sm">{match.participants.length} participant(s)</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span className="text-sm font-semibold">{score} points</span>
            </div>
          </div>
          <Progress value={progress} className="h-2 mt-4" />
          <div className="text-right text-sm mt-1">
            Question {currentQuestionIndex + 1}/{match.questions.length}
          </div>
        </CardHeader>
        
        <CardContent>
          {showScoreAnimation && <ScoreAnimation points={pointsEarned} />}
          
          <QuizQuestionComponent
            question={currentQuestion}
            onAnswer={handleAnswer}
            selectedAnswer={selectedAnswer}
            showFeedback={selectedAnswer !== undefined}
          />
        </CardContent>
        
        <CardFooter className="flex justify-end">
          {selectedAnswer !== undefined && (
            <Button onClick={nextQuestion}>
              {currentQuestionIndex === match.questions.length - 1 ? "Voir les résultats" : "Question suivante"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default MatchGame;
