
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "lucide-react";
import { useState } from "react";
import AppointmentScheduler from "./AppointmentScheduler";
import { Challenge } from "./types";

interface ChallengeActionsProps {
  challenge: Challenge | null;
  onStart: () => void;
  onComplete: () => void;
}

const ChallengeActions = ({ challenge, onStart, onComplete }: ChallengeActionsProps) => {
  const [showScheduler, setShowScheduler] = useState(false);
  
  if (!challenge) return null;

  return (
    <>
      {!challenge.completed ? (
        <>
          {challenge.progress && challenge.progress > 0 ? (
            <Button onClick={onComplete} className="w-full bg-mrc-blue hover:bg-blue-700">
              Terminer le défi
            </Button>
          ) : (
            <Button onClick={onStart} className="w-full bg-mrc-blue hover:bg-blue-700">
              Commencer le défi
            </Button>
          )}
        </>
      ) : (
        <Button disabled className="w-full">
          Défi complété
        </Button>
      )}
      
      <Dialog open={showScheduler} onOpenChange={setShowScheduler}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Réserver une formation avec Styvy-237</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px] p-0">
          <AppointmentScheduler onClose={() => setShowScheduler(false)} />
        </DialogContent>
      </Dialog>
      
    </>
  );
};

export default ChallengeActions;
