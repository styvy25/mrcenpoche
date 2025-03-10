
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award, CheckCircle, Clock, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  type: "quiz" | "reading" | "video" | "practice";
  difficulty: "facile" | "moyen" | "difficile";
  estimatedTime: number; // in minutes
  completed?: boolean;
  progress?: number;
}

// Array of possible daily challenges
const challenges: Challenge[] = [
  {
    id: "challenge_1",
    title: "Quiz sur l'Histoire du MRC",
    description: "Complétez un quiz de 5 questions sur l'histoire et les valeurs fondamentales du MRC.",
    points: 20,
    type: "quiz",
    difficulty: "facile",
    estimatedTime: 5
  },
  {
    id: "challenge_2",
    title: "Techniques de Communication",
    description: "Étudiez les principes de base de la communication politique efficace.",
    points: 15,
    type: "reading",
    difficulty: "moyen",
    estimatedTime: 10
  },
  {
    id: "challenge_3",
    title: "Mobilisation Communautaire",
    description: "Apprenez les méthodes de mobilisation citoyenne à travers une vidéo explicative.",
    points: 25,
    type: "video",
    difficulty: "moyen",
    estimatedTime: 8
  },
  {
    id: "challenge_4",
    title: "Analyse des Enjeux Politiques",
    description: "Analysez un enjeu politique majeur au Cameroun et proposez des solutions.",
    points: 30,
    type: "practice",
    difficulty: "difficile",
    estimatedTime: 15
  },
  {
    id: "challenge_5",
    title: "Organisation de Campagne",
    description: "Découvrez les bases de l'organisation d'une campagne politique efficace.",
    points: 20,
    type: "reading",
    difficulty: "moyen",
    estimatedTime: 12
  }
];

const DailyChallenge = () => {
  const [dailyChallenge, setDailyChallenge] = useState<Challenge | null>(null);
  const [streakCount, setStreakCount] = useState<number>(0);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [nextRefresh, setNextRefresh] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load challenge from localStorage or generate a new one
    const loadOrCreateChallenge = () => {
      setIsLoading(true);
      
      try {
        const storedChallenge = localStorage.getItem('dailyChallenge');
        const storedDate = localStorage.getItem('dailyChallengeDate');
        const storedStreak = localStorage.getItem('challengeStreak');
        const storedPoints = localStorage.getItem('challengePoints');
        
        const today = new Date().toDateString();

        if (storedChallenge && storedDate === today) {
          // Use the stored challenge for today
          setDailyChallenge(JSON.parse(storedChallenge));
          setStreakCount(storedStreak ? parseInt(storedStreak) : 0);
          setTotalPoints(storedPoints ? parseInt(storedPoints) : 0);
        } else {
          // Generate a new challenge
          const randomIndex = Math.floor(Math.random() * challenges.length);
          const newChallenge = { ...challenges[randomIndex], progress: 0 };
          
          setDailyChallenge(newChallenge);
          
          // Reset streak if more than a day has passed
          if (storedDate && new Date(storedDate).getTime() < new Date(today).getTime() - 86400000) {
            setStreakCount(0);
          } else {
            setStreakCount(storedStreak ? parseInt(storedStreak) : 0);
          }
          
          setTotalPoints(storedPoints ? parseInt(storedPoints) : 0);
          
          // Save the new challenge
          localStorage.setItem('dailyChallenge', JSON.stringify(newChallenge));
          localStorage.setItem('dailyChallengeDate', today);
          localStorage.setItem('challengeStreak', streakCount.toString());
          localStorage.setItem('challengePoints', totalPoints.toString());
        }
        
        // Calculate next refresh time (midnight)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        setNextRefresh(tomorrow);
      } catch (error) {
        console.error("Error loading challenge:", error);
        // Fallback to a default challenge
        setDailyChallenge(challenges[0]);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrCreateChallenge();
    
    // Set up timer to check for refresh
    const intervalId = setInterval(() => {
      const now = new Date();
      const storedDate = localStorage.getItem('dailyChallengeDate');
      
      if (storedDate !== now.toDateString()) {
        loadOrCreateChallenge();
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, []);

  const startChallenge = () => {
    if (!dailyChallenge) return;
    
    const updatedChallenge = { ...dailyChallenge, progress: 20 };
    setDailyChallenge(updatedChallenge);
    
    localStorage.setItem('dailyChallenge', JSON.stringify(updatedChallenge));
    
    // Simulate starting the challenge (in a real app, navigate to the challenge)
    alert(`Challenge "${dailyChallenge.title}" commencé!`);
  };

  const completeChallenge = () => {
    if (!dailyChallenge) return;
    
    const newStreak = streakCount + 1;
    const newPoints = totalPoints + dailyChallenge.points;
    
    const completedChallenge = { ...dailyChallenge, completed: true, progress: 100 };
    
    setDailyChallenge(completedChallenge);
    setStreakCount(newStreak);
    setTotalPoints(newPoints);
    
    localStorage.setItem('dailyChallenge', JSON.stringify(completedChallenge));
    localStorage.setItem('challengeStreak', newStreak.toString());
    localStorage.setItem('challengePoints', newPoints.toString());
  };

  const formatTimeRemaining = () => {
    const now = new Date();
    const diffMs = nextRefresh.getTime() - now.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHrs}h ${diffMins}m`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "facile": return "bg-green-500";
      case "moyen": return "bg-yellow-500";
      case "difficile": return "bg-red-500";
      default: return "bg-blue-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "quiz": return <i className="fas fa-question-circle"></i>;
      case "reading": return <i className="fas fa-book"></i>;
      case "video": return <i className="fas fa-video"></i>;
      case "practice": return <i className="fas fa-hands"></i>;
      default: return <i className="fas fa-star"></i>;
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mrc-blue"></div>
          <p className="text-sm text-gray-500">Chargement du défi quotidien...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-mrc-blue flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Défi Quotidien
            </CardTitle>
            <CardDescription>
              Complétez ce défi pour gagner des points et maintenir votre série
            </CardDescription>
          </div>
          <div className="flex flex-col items-end">
            <Badge variant="outline" className="flex gap-1 mb-1">
              <RefreshCw className="h-3 w-3" /> Nouveau dans {formatTimeRemaining()}
            </Badge>
            <div className="flex gap-2">
              <Badge variant="secondary" className="flex gap-1">
                <Award className="h-3 w-3" /> {totalPoints} pts
              </Badge>
              <Badge className="bg-mrc-blue flex gap-1">
                <CheckCircle className="h-3 w-3" /> Série: {streakCount}j
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {dailyChallenge ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <h3 className="text-lg font-semibold">{dailyChallenge.title}</h3>
              <div className="flex gap-2">
                <Badge className={getDifficultyColor(dailyChallenge.difficulty)}>
                  {dailyChallenge.difficulty}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {dailyChallenge.estimatedTime} min
                </Badge>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300">{dailyChallenge.description}</p>
            
            <div className="flex items-center gap-4">
              <div className="font-bold text-lg text-mrc-blue">+{dailyChallenge.points} pts</div>
              <Separator orientation="vertical" className="h-6" />
              <Badge variant="outline" className="capitalize">
                {dailyChallenge.type}
              </Badge>
            </div>
            
            {dailyChallenge.progress !== undefined && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progression</span>
                  <span>{dailyChallenge.progress}%</span>
                </div>
                <Progress value={dailyChallenge.progress} className="h-2" />
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">Aucun défi disponible aujourd'hui.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        {dailyChallenge && !dailyChallenge.completed ? (
          dailyChallenge.progress && dailyChallenge.progress > 0 ? (
            <Button onClick={completeChallenge} className="w-full bg-mrc-blue hover:bg-blue-700">
              Terminer le défi
            </Button>
          ) : (
            <Button onClick={startChallenge} className="w-full bg-mrc-blue hover:bg-blue-700">
              Commencer le défi
            </Button>
          )
        ) : (
          <Button disabled className="w-full">
            Défi complété
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DailyChallenge;
