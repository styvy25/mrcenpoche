
import { Badge } from "@/components/ui/badge";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Award, Calendar, CheckCircle, RefreshCw } from "lucide-react";
import { formatTimeRemaining } from "./challengeUtils";

interface ChallengeHeaderProps {
  streakCount: number;
  totalPoints: number;
  nextRefresh: Date;
}

const ChallengeHeader = ({ streakCount, totalPoints, nextRefresh }: ChallengeHeaderProps) => {
  return (
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
          <RefreshCw className="h-3 w-3" /> Nouveau dans {formatTimeRemaining(nextRefresh)}
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
  );
};

export default ChallengeHeader;
