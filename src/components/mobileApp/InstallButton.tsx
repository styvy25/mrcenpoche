
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Smartphone, XCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallDialog, setShowInstallDialog] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop' | 'unknown'>('unknown');

  useEffect(() => {
    // Detect platform
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      setPlatform('ios');
    } else if (/android/i.test(userAgent)) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app is already installed
    const handleAppInstalled = () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
      console.log('MRC en Poche app installed successfully');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = () => {
    if (platform === 'ios') {
      // iOS devices need manual instructions since they don't support beforeinstallprompt
      setShowInstallDialog(true);
    } else if (deferredPrompt) {
      // Show the install prompt for Android and desktop
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          setIsInstallable(false);
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
      });
    } else {
      // Fallback if beforeinstallprompt isn't supported or was missed
      setShowInstallDialog(true);
    }
  };

  if (!isInstallable && platform !== 'ios') return null;

  return (
    <>
      <Button 
        onClick={handleInstallClick} 
        className="gap-2 bg-gradient-to-r from-mrc-blue to-purple-600 text-white"
        size="sm"
      >
        <Smartphone size={16} />
        <span>Installer l'application</span>
      </Button>

      <Dialog open={showInstallDialog} onOpenChange={setShowInstallDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Installer MRC en Poche</DialogTitle>
            <DialogDescription>
              Suivez ces instructions pour installer l'application sur votre appareil.
            </DialogDescription>
          </DialogHeader>

          {platform === 'ios' && (
            <div className="space-y-4">
              <p className="text-sm">Pour installer sur iOS:</p>
              <ol className="list-decimal ml-5 space-y-2 text-sm">
                <li>Appuyez sur <span className="inline-flex items-center"><Download size={14} className="mx-1" /> Partager</span> dans Safari</li>
                <li>Faites défiler et appuyez sur <span className="font-medium">Ajouter à l'écran d'accueil</span></li>
                <li>Appuyez sur <span className="font-medium">Ajouter</span> en haut à droite</li>
              </ol>
              <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-md p-3 mt-2">
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  Note: Cette fonctionnalité n'est disponible que dans le navigateur Safari.
                </p>
              </div>
            </div>
          )}

          {platform === 'android' && (
            <div className="space-y-4">
              <p className="text-sm">Pour installer sur Android:</p>
              <ol className="list-decimal ml-5 space-y-2 text-sm">
                <li>Appuyez sur les trois points (⋮) dans Chrome</li>
                <li>Sélectionnez <span className="font-medium">Installer l'application</span></li>
                <li>Suivez les instructions</li>
              </ol>
            </div>
          )}

          {platform === 'desktop' && (
            <div className="space-y-4">
              <p className="text-sm">Pour installer sur votre ordinateur:</p>
              <ol className="list-decimal ml-5 space-y-2 text-sm">
                <li>Cliquez sur l'icône d'installation dans la barre d'adresse (⊕)</li>
                <li>Cliquez sur <span className="font-medium">Installer</span></li>
              </ol>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInstallDialog(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InstallButton;
