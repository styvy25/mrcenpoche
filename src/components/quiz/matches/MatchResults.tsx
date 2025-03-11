import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMatch } from "@/services/matchService";
import { Match } from "@/components/quiz/types/match";
import { toast } from "sonner";

// Import our new components
import MatchResultsHeader from "./components/MatchResultsHeader";
import WinnerDisplay from "./components/WinnerDisplay";
import PlayerRankings from "./components/PlayerRankings";
import MatchResultsActions from "./components/MatchResultsActions";

const MatchResults: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!matchId) return;
    
    const fetchedMatch = getMatch(matchId);
    if (fetchedMatch) {
      setMatch(fetchedMatch);
    } else {
      toast.error("Match introuvable");
      navigate("/quiz");
    }
    setLoading(false);
  }, [matchId, navigate]);

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

  // Sort participants by score in descending order
  const sortedParticipants = [...match.participants].sort((a, b) => b.score - a.score);
  const winner = sortedParticipants[0];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="shadow-lg">
        <MatchResultsHeader title={match.title} category={match.category} />
        
        <CardContent>
          <div className="text-center mb-8">
            <WinnerDisplay winner={winner} />
            
            <PlayerRankings participants={match.participants} />
          </div>
        </CardContent>
        
        <MatchResultsActions inviteLink={match.inviteLink} />
      </Card>
    </div>
  );
};

export default MatchResults;
