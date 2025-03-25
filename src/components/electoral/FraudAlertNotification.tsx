
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/custom-dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Circle } from "lucide-react";
import { subscribeToFraudAlerts } from './services/alertService';
import { useMediaQuery } from '@/hooks/use-media-query';

interface FraudAlert {
  id?: string;
  description: string;
  location: string;
  mediaUrl?: string | null;
  mediaType?: 'photo' | 'audio' | null;
  timestamp: string;
}

const FraudAlertNotification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<FraudAlert | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const { isMobile } = useMediaQuery();
  
  useEffect(() => {
    // Subscribe to realtime fraud alerts
    const unsubscribe = subscribeToFraudAlerts((alert) => {
      setCurrentAlert(alert);
      setIsOpen(true);
    });
      
    // Check for recording status
    const handleRecordingStart = () => setIsRecording(true);
    const handleRecordingStop = () => setIsRecording(false);
    
    document.addEventListener('start-fraud-recording', handleRecordingStart);
    document.addEventListener('stop-fraud-recording', handleRecordingStop);
    
    return () => {
      unsubscribe();
      document.removeEventListener('start-fraud-recording', handleRecordingStart);
      document.removeEventListener('stop-fraud-recording', handleRecordingStop);
    };
  }, []);
  
  if (!currentAlert) return null;
  
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={`${isMobile ? 'w-[calc(100%-2rem)] p-4' : 'sm:max-w-md'}`}>
          <DialogHeader>
            <DialogTitle className="flex items-center text-mrc-red">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Alerte de fraude électorale
            </DialogTitle>
            <DialogDescription>
              Un utilisateur a signalé une fraude électorale potentielle
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-3 py-2 bg-red-50 rounded-sm">
              <p className="font-medium">Description:</p>
              <p className={isMobile ? 'text-sm' : ''}>{currentAlert.description}</p>
            </div>
            
            <div>
              <p className="font-medium">Lieu:</p>
              <p className={isMobile ? 'text-sm' : ''}>{currentAlert.location}</p>
            </div>
            
            <div>
              <p className="font-medium">Date/Heure:</p>
              <p className={isMobile ? 'text-sm' : ''}>{new Date(currentAlert.timestamp).toLocaleString()}</p>
            </div>
            
            {currentAlert.mediaUrl && (
              <div>
                <p className="font-medium mb-2">Preuve:</p>
                {currentAlert.mediaType === 'photo' ? (
                  <img 
                    src={currentAlert.mediaUrl} 
                    alt="Fraud evidence" 
                    className="w-full rounded-md object-cover max-h-64"
                  />
                ) : currentAlert.mediaType === 'audio' ? (
                  <audio src={currentAlert.mediaUrl} controls className="w-full" />
                ) : null}
              </div>
            )}
          </div>
          
          <DialogFooter className="flex flex-col gap-2 sm:flex-row">
            {isRecording && (
              <div className="flex items-center text-red-500 gap-1 text-sm mr-auto">
                <Circle className="h-3 w-3 fill-red-500 animate-pulse" />
                <span>Enregistrement en cours</span>
              </div>
            )}
            <Button 
              onClick={() => setIsOpen(false)}
              className={isMobile ? 'w-full' : ''}
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FraudAlertNotification;
