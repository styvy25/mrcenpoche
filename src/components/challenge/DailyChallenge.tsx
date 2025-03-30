
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createMatch } from "@/services/matchService";

interface Challenge {
  id: string;
  title: string;
  description: string;
  questions: any[];
}

interface DailyChallengeProps {
  onComplete?: () => void;
}

const defaultAvatar = 'https://ui-avatars.com/api/?name=User&background=random';

const DailyChallenge: React.FC<DailyChallengeProps> = ({ onComplete }) => {
  const { currentUser: user } = useAuth();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching a daily challenge
    const fetchChallenge = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockChallenge: Challenge = {
        id: "1",
        title: "Défi Quotidien MRC",
        description: "Testez vos connaissances sur le MRC avec ce défi quotidien.",
        questions: [
          {
            questionText: "Quelle est la date de création du MRC ?",
            options: ["2010", "2012", "2014", "2016"],
            correctAnswer: "2012",
          },
          {
            questionText: "Qui est le président du MRC ?",
            options: ["Paul Biya", "Maurice Kamto", "John Fru Ndi", "Akere Muna"],
            correctAnswer: "Maurice Kamto",
          },
        ],
      };

      setChallenge(mockChallenge);
      setLoading(false);
    };

    fetchChallenge();
  }, []);

  const handleStartChallenge = () => {
    if (!user) return;
    
    const participantData = {
      id: user.id,
      name: user.username || user.email?.split('@')[0] || 'User',
      displayName: user.displayName || user.email?.split('@')[0] || 'User',
      avatar: user.avatar || `https://ui-avatars.com/api/?name=${user.email?.split('@')[0] || 'User'}&background=random`,
    };

    if (challenge) {
      // Fix: providing title, category and questions as separate arguments
      const newMatch = createMatch(
        challenge.title, 
        "test", 
        user.username || user.email?.split('@')[0] || 'User'
      );

      if (newMatch) {
        toast.success("Défi lancé !");
        navigate(`/quiz-match/${newMatch.id}`);
        // Call onComplete if provided
        if (onComplete) {
          onComplete();
        }
      } else {
        toast.error("Erreur lors du lancement du défi.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Défi Quotidien</CardTitle>
          <CardDescription>Aucun défi disponible pour le moment.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{challenge.title}</CardTitle>
        <CardDescription>{challenge.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleStartChallenge}>Commencer le défi</Button>
      </CardContent>
    </Card>
  );
};

export default DailyChallenge;
