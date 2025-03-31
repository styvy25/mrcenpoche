
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import SocialShareButtons from "@/components/shared/SocialShareButtons";

interface ResultActionsProps {
  onRestart: () => void;
  score: number;
  totalQuestions: number;
  categoryName: string;
}

const ResultActions: React.FC<ResultActionsProps> = ({ 
  onRestart, 
  score, 
  totalQuestions, 
  categoryName 
}) => {
  const [showShareButtons, setShowShareButtons] = useState(false);

  return (
    <div className="mt-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={onRestart} 
          variant="outline" 
          className="w-full sm:w-auto"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Recommencer
        </Button>
        
        {!showShareButtons && (
          <Button 
            onClick={() => setShowShareButtons(true)}
            className="w-full sm:w-auto bg-mrc-blue"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Partager mes résultats
          </Button>
        )}
      </div>
      
      {showShareButtons && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6"
        >
          <p className="mb-3 text-sm text-gray-600">
            Partagez votre score avec vos amis !
          </p>
          <SocialShareButtons 
            title={`J'ai obtenu ${score}/${totalQuestions} au quiz sur ${categoryName} !`}
            description={`Rejoignez MRC en Poche et testez vos connaissances !`}
            type="quiz"
          />
        </motion.div>
      )}
    </div>
  );
};

export default ResultActions;
