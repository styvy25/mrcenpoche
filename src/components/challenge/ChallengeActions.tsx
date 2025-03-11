
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Play, CheckCircle, Star, Flame } from "lucide-react";
import { useState } from "react";
import AppointmentScheduler from "./AppointmentScheduler";
import { Challenge } from "./types";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ChallengeActionsProps {
  challenge: Challenge | null;
  onStart: () => void;
  onComplete: () => void;
}

const ChallengeActions = ({ challenge, onStart, onComplete }: ChallengeActionsProps) => {
  const [showScheduler, setShowScheduler] = useState(false);
  
  if (!challenge) return null;

  const handleStartClick = () => {
    onStart();
    toast.success("Défi commencé!", {
      description: "Bonne chance pour relever ce challenge!",
      icon: <Flame className="h-5 w-5 text-orange-500" />,
    });
  };
  
  const handleCompleteClick = () => {
    onComplete();
    toast.success("Défi complété!", {
      description: "Félicitations! Vous avez gagné des points MRC.",
      icon: <Star className="h-5 w-5 text-yellow-500" />,
    });
  };

  return (
    <>
      {!challenge.completed ? (
        <>
          {challenge.progress && challenge.progress > 0 ? (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleCompleteClick} 
                className="w-full bg-gradient-to-r from-mrc-blue to-mrc-green hover:from-mrc-green hover:to-mrc-blue"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Terminer le défi
              </Button>
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                onClick={handleStartClick} 
                className="w-full bg-gradient-to-r from-mrc-blue to-mrc-green hover:from-mrc-green hover:to-mrc-blue relative overflow-hidden"
              >
                <Play className="h-4 w-4 mr-2" />
                Commencer le défi
                
                {/* Effet de pulsation */}
                <span className="absolute inset-0 bg-white opacity-0 rounded-lg animate-pulse"></span>
              </Button>
            </motion.div>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Button disabled className="w-full">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            Défi complété
          </Button>
        </motion.div>
      )}
      
      <Dialog open={showScheduler} onOpenChange={setShowScheduler}>
        <DialogTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-3 w-full"
          >
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Réserver une formation avec Styvy-237</span>
            </Button>
          </motion.div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px] p-0">
          <AppointmentScheduler onClose={() => setShowScheduler(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChallengeActions;
