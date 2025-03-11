
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMatches } from "@/services/matchService";
import { Match } from "@/components/quiz/types/match";
import { PlusCircle, Trophy, Calendar, Users, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateMatch from "./CreateMatch";
import { motion } from "framer-motion";

const MatchesList: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = () => {
    setLoading(true);
    const fetchedMatches = getMatches();
    setMatches(fetchedMatches);
    setLoading(false);
  };

  const onCreateMatchClose = () => {
    setOpen(false);
    loadMatches();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-24">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Matchs d'incollables</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Nouveau match
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <CreateMatch onClose={onCreateMatchClose} />
          </DialogContent>
        </Dialog>
      </div>
      
      {matches.length === 0 ? (
        <Card className="bg-gray-50">
          <CardContent className="py-8 text-center">
            <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun match disponible</h3>
            <p className="text-gray-500 mb-4">Créez un nouveau match pour commencer à jouer!</p>
            <Button onClick={() => setOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Créer un match
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {matches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{match.title}</CardTitle>
                      <CardDescription>
                        {match.category === "test" ? "MRC Test" : "Politique Camerounaise"}
                      </CardDescription>
                    </div>
                    <div className={`px-2 py-1 text-xs rounded-full ${
                      match.status === "completed" 
                        ? "bg-green-100 text-green-800"
                        : match.status === "active"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {match.status === "completed" 
                        ? "Terminé" 
                        : match.status === "active" 
                          ? "En cours" 
                          : "En attente"}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(match.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {match.participants.length} participant(s)
                    </div>
                  </div>
                  <p className="text-sm">
                    Créé par <span className="font-semibold">{match.creator}</span>
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(`/quiz-match/${match.id}${match.status === "completed" ? "/results" : ""}`)}
                  >
                    {match.status === "completed" ? "Voir les résultats" : "Rejoindre le match"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchesList;
