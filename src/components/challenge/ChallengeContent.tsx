
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";
import { Challenge } from "./types";
import { getDifficultyColor } from "./challengeUtils";

interface ChallengeContentProps {
  challenge: Challenge | null;
}

const ChallengeContent = ({ challenge }: ChallengeContentProps) => {
  if (!challenge) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Aucun défi disponible aujourd'hui.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <h3 className="text-lg font-semibold">{challenge.title}</h3>
        <div className="flex gap-2">
          <Badge className={getDifficultyColor(challenge.difficulty)}>
            {challenge.difficulty}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {challenge.estimatedTime} min
          </Badge>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300">{challenge.description}</p>
      
      <div className="flex items-center gap-4">
        <div className="font-bold text-lg text-mrc-blue">+{challenge.points} pts</div>
        <Separator orientation="vertical" className="h-6" />
        <Badge variant="outline" className="capitalize">
          {challenge.type}
        </Badge>
      </div>
      
      {challenge.progress !== undefined && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progression</span>
            <span>{challenge.progress}%</span>
          </div>
          <Progress value={challenge.progress} className="h-2" />
        </div>
      )}
    </div>
  );
};

export default ChallengeContent;
