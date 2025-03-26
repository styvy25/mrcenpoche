
import React, { useState, useEffect } from 'react';
import { Bell, X, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface DomainAnnouncementProps {
  customDomain: string;
}

const DomainAnnouncement = ({ customDomain }: DomainAnnouncementProps) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Vérifier si nous sommes sur le domaine netlify ou le domaine personnalisé
    const currentHost = window.location.hostname;
    const isNetlifyDomain = currentHost.includes('netlify');
    const isCustomDomain = currentHost === customDomain || currentHost.includes(customDomain);
    
    // N'afficher que sur le domaine netlify
    setVisible(isNetlifyDomain && !isCustomDomain);
    
    // Vérifier si l'utilisateur a déjà fermé cette annonce
    const hasDismissed = localStorage.getItem('domain_announcement_dismissed') === 'true';
    if (hasDismissed) {
      setVisible(false);
    }
  }, [customDomain]);
  
  if (!visible) return null;
  
  const handleDismiss = () => {
    localStorage.setItem('domain_announcement_dismissed', 'true');
    setVisible(false);
  };
  
  const handleVisit = () => {
    window.open(`https://${customDomain}`, '_blank');
  };
  
  return (
    <Alert className="bg-blue-500/10 border-blue-500/30 mb-6 relative">
      <Bell className="h-4 w-4 text-blue-500" />
      <AlertTitle className="text-blue-500">Nouveau domaine disponible</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="text-sm">
          Cette application est maintenant accessible via le domaine officiel{' '}
          <span className="font-semibold">{customDomain}</span>
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleVisit}
            className="bg-blue-500/10 border-blue-500/40 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20"
          >
            Visiter le site officiel <ExternalLink className="ml-2 h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDismiss}>
            Ne plus afficher
          </Button>
        </div>
      </AlertDescription>
      <Button 
        variant="ghost" 
        size="sm" 
        className="absolute top-3 right-3 h-6 w-6 p-0" 
        onClick={handleDismiss}
      >
        <X className="h-3 w-3" />
      </Button>
    </Alert>
  );
};

export default DomainAnnouncement;
