
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { ArrowLeft, Share2, Trophy, Plus } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface MatchResultsActionsProps {
  inviteLink?: string;
}

const MatchResultsActions: React.FC<MatchResultsActionsProps> = ({ inviteLink }) => {
  const navigate = useNavigate();

  const shareOnWhatsApp = () => {
    if (inviteLink) {
      window.open(inviteLink, '_blank');
      toast.success("Lien d'invitation copié!", {
        description: "Partagez ce lien avec vos amis pour les inviter au match",
        duration: 3000,
      });
    } else {
      toast.error("Lien d'invitation non disponible");
    }
  };
  
  const handleNewChallenge = () => {
    navigate("/quiz");
    toast.success("Créez un nouveau défi!");
  };

  return (
    <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button 
          variant="outline" 
          onClick={() => navigate("/quiz")}
          className="w-full sm:w-auto flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
      </motion.div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto"
        >
          <Button 
            onClick={handleNewChallenge}
            variant="secondary"
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nouveau défi
          </Button>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto"
        >
          <Button 
            onClick={shareOnWhatsApp}
            className="w-full sm:w-auto flex items-center gap-2 bg-gradient-to-r from-mrc-blue to-mrc-green"
          >
            <Share2 className="h-4 w-4" />
            Partager sur WhatsApp
          </Button>
        </motion.div>
      </div>
    </CardFooter>
  );
};

export default MatchResultsActions;
