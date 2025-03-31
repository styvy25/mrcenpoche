
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { ArrowLeft, Share2 } from "lucide-react";
import { toast } from "sonner";

interface MatchResultsActionsProps {
  inviteLink?: string;
}

const MatchResultsActions: React.FC<MatchResultsActionsProps> = ({ inviteLink }) => {
  const navigate = useNavigate();

  const shareOnWhatsApp = () => {
    if (inviteLink) {
      window.open(inviteLink, '_blank');
    } else {
      toast.error("Lien d'invitation non disponible");
    }
  };

  return (
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
  );
};

export default MatchResultsActions;
