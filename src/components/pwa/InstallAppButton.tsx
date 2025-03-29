
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed', platform: string }>;
}

const InstallAppButton = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }
    
    // Capture install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Store the event so it can be triggered later
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    
    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setInstallPrompt(null);
      console.log('MRC en Poche: Application installée avec succès!');
      toast({
        title: "Installation réussie",
        description: "L'application MRC en Poche a été installée avec succès.",
        duration: 5000,
      });
    });
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', () => {});
    };
  }, [toast]);
  
  const handleInstallClick = async () => {
    if (!installPrompt) return;
    
    // Show the install prompt
    await installPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const choiceResult = await installPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('MRC en Poche: Utilisateur a accepté l\'installation');
      toast({
        title: "Installation en cours",
        description: "L'application MRC en Poche est en cours d'installation.",
        duration: 3000,
      });
    } else {
      console.log('MRC en Poche: Utilisateur a refusé l\'installation');
      toast({
        title: "Installation annulée",
        description: "L'installation de l'application a été annulée.",
        variant: "destructive",
        duration: 3000,
      });
    }
    
    // Clear the saved prompt as it can't be used again
    setInstallPrompt(null);
  };
  
  if (isInstalled) {
    return (
      <Button variant="outline" size="sm" className="gap-2" disabled>
        <Check className="h-4 w-4" />
        Application installée
      </Button>
    );
  }
  
  if (!installPrompt) {
    return null; // Don't show button if install prompt is not available
  }
  
  return (
    <Button 
      variant="default" 
      size="sm" 
      className="gap-2 bg-gradient-to-r from-mrc-blue to-mrc-green hover:from-mrc-blue/90 hover:to-mrc-green/90 text-white"
      onClick={handleInstallClick}
    >
      <Download className="h-4 w-4" />
      Installer l'application
    </Button>
  );
};

export default InstallAppButton;
