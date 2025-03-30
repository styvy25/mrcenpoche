
import { Lightbulb } from "lucide-react";
import DailyChallenge from "@/components/challenge/DailyChallenge";
import { useAuth } from "@/components/auth/AuthContext";
import { useGamification, PointsActionType } from "@/services/gamificationService";
import { useToast } from "@/hooks/use-toast";

interface DailyChallengeSectionProps {
  onChallengeComplete?: () => void;
}

const DailyChallengeSection = ({ onChallengeComplete }: DailyChallengeSectionProps) => {
  const { currentUser } = useAuth();
  const { addPoints } = useGamification(currentUser?.id || 'anonymous');
  const { toast } = useToast();

  const handleChallengeComplete = () => {
    // Ajouter des points pour avoir complété le défi quotidien
    if (currentUser) {
      const newPoints = addPoints(PointsActionType.DAILY_CHALLENGE);
      
      toast({
        title: "Défi quotidien complété !",
        description: `+${PointsActionType.DAILY_CHALLENGE} points ! Vous avez maintenant ${newPoints} points.`,
      });
    }
    
    // Appeler le callback si fourni
    if (onChallengeComplete) {
      onChallengeComplete();
    }
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Défi Quotidien</h2>
      </div>
      <DailyChallenge onComplete={handleChallengeComplete} />
    </div>
  );
};

export default DailyChallengeSection;
