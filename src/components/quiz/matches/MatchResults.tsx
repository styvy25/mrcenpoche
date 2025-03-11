
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMatch } from "@/services/matchService";
import { Match } from "@/components/quiz/types/match";
import { Award, Users, ArrowLeft, Share2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

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

  // Sort participants by score in descending order
  const sortedParticipants = [...match.participants].sort((a, b) => b.score - a.score);
  const winner = sortedParticipants[0];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Résultats: {match.title}</CardTitle>
          <CardDescription>
            {match.category === "test" ? "MRC Test" : "Politique Camerounaise"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="text-center mb-8">
            <div className="mb-6">
              <motion.div
                className="inline-block"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Award className="h-16 w-16 text-yellow-500 mx-auto" />
              </motion.div>
              <h3 className="text-xl font-bold mt-2">Gagnant: {winner.name}</h3>
              <p className="text-sm text-gray-500">avec {winner.score} points</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold flex items-center justify-center mb-4">
                <Users className="h-5 w-5 mr-2" />
                <span>Classement des joueurs</span>
              </h4>
              
              <div className="space-y-3">
                {sortedParticipants.map((participant, index) => (
                  <motion.div
                    key={participant.id}
                    className={`p-3 border rounded-lg flex justify-between items-center ${
                      index === 0 ? "bg-yellow-50 border-yellow-200" : ""
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center">
                      <span className="font-bold mr-3">{index + 1}.</span>
                      <span>{participant.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{participant.score} pts</div>
                      <div className="text-xs text-gray-500">
                        {participant.correctAnswers}/{participant.totalAnswers} correctes
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/quiz")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <Button onClick={shareOnWhatsApp}>
            <Share2 className="h-4 w-4 mr-2" />
            Partager sur WhatsApp
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MatchResults;
