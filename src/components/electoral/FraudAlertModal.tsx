
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AlertTriangle } from "lucide-react";
import AlertForm from './form/AlertForm';
import MediaCapture from '../chat/MediaCapture';
import { useMediaQuery } from '@/hooks/use-media-query';
import BackButton from '../shared/BackButton';

export interface FraudAlertModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const FraudAlertModal: React.FC<FraudAlertModalProps> = ({ 
  isOpen, 
  onOpenChange 
}) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [mediaFile, setMediaFile] = useState<Blob | null>(null);
  const [mediaType, setMediaType] = useState<'photo' | 'audio' | null>(null);
  const [isCapturingMedia, setIsCapturingMedia] = useState(false);
  
  const { isMobile } = useMediaQuery();
  
  const handleCaptureComplete = async (file: Blob, type: 'photo' | 'audio') => {
    setMediaFile(file);
    setMediaType(type);
    setIsCapturingMedia(false);
    return Promise.resolve();
  };

  const handleCaptureCancel = () => {
    setIsCapturingMedia(false);
  };
  
  const handleStartCapture = (type: 'photo' | 'audio') => {
    setMediaType(type);
    setIsCapturingMedia(true);
  };
  
  // Utiliser Sheet sur mobile et Dialog sur desktop
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent className="pt-6 px-0">
          <SheetHeader className="px-4">
            <div className="flex items-center gap-2">
              <BackButton 
                label="Fermer" 
                className="mb-2"
                to="#"
                onClick={() => onOpenChange(false)}
              />
            </div>
            <SheetTitle className="flex items-center text-mrc-red">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Signaler une fraude électorale
            </SheetTitle>
          </SheetHeader>
          
          <div className="px-4 pt-3">
            {isCapturingMedia ? (
              <MediaCapture
                mediaType={mediaType || 'photo'}
                onCapture={handleCaptureComplete}
                onCancel={handleCaptureCancel}
              />
            ) : (
              <AlertForm
                onClose={() => onOpenChange(false)}
                description={description}
                setDescription={setDescription}
                location={location}
                setLocation={setLocation}
                mediaFile={mediaFile}
                setMediaFile={setMediaFile}
                mediaType={mediaType}
                setMediaType={setMediaType}
                onCaptureMedia={handleStartCapture}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    );
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-mrc-red">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Signaler une fraude électorale
          </DialogTitle>
        </DialogHeader>
        
        {isCapturingMedia ? (
          <MediaCapture
            mediaType={mediaType || 'photo'}
            onCapture={handleCaptureComplete}
            onCancel={handleCaptureCancel}
          />
        ) : (
          <AlertForm
            onClose={() => onOpenChange(false)}
            description={description}
            setDescription={setDescription}
            location={location}
            setLocation={setLocation}
            mediaFile={mediaFile}
            setMediaFile={setMediaFile}
            mediaType={mediaType}
            setMediaType={setMediaType}
            onCaptureMedia={handleStartCapture}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FraudAlertModal;
