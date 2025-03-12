
import { Lightbulb } from "lucide-react";
import DailyChallenge from "@/components/challenge/DailyChallenge";

interface DailyChallengeSectionProps {
  onChallengeComplete: () => void;
}

const DailyChallengeSection = ({ onChallengeComplete }: DailyChallengeSectionProps) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Défi Quotidien</h2>
      </div>
      <DailyChallenge onComplete={onChallengeComplete} />
    </div>
  );
};

export default DailyChallengeSection;
