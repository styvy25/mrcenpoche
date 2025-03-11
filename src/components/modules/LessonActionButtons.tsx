
import React from 'react';
import { Button } from "@/components/ui/button";
import { BookmarkIcon, CheckCircle2, Share2 } from 'lucide-react';

interface LessonActionButtonsProps {
  onBookmark: () => void;
  onComplete: () => void;
  onShare: () => void;
}

const LessonActionButtons: React.FC<LessonActionButtonsProps> = ({ 
  onBookmark, 
  onComplete, 
  onShare 
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={onBookmark}>
        <BookmarkIcon className="h-4 w-4 mr-1" />
        Sauvegarder
      </Button>
      <Button variant="outline" size="sm" onClick={onComplete}>
        <CheckCircle2 className="h-4 w-4 mr-1" />
        Marquer comme terminé
      </Button>
      <Button variant="outline" size="sm" onClick={onShare}>
        <Share2 className="h-4 w-4 mr-1" />
        Partager
      </Button>
    </div>
  );
};

export default LessonActionButtons;
