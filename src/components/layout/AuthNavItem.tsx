
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthDialog";
import { LogIn, LogOut, User, Share2, Settings, History } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";

const AuthNavItem = () => {
  const { isAuthenticated, user, logout, updateLastLogin } = useAuth();
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  // Pour éviter les erreurs d'hydratation
  useEffect(() => {
    setMounted(true);
    
    // Update last login time when component mounts
    if (isAuthenticated && updateLastLogin) {
      updateLastLogin();
    }
  }, [isAuthenticated, updateLastLogin]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = "MRC LearnScape - Plateforme de formation politique";
    const text = "Découvrez MRC LearnScape, la plateforme de formation politique interactive!";
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url)
          .then(() => {
            toast({
              title: "Lien copié!",
              description: "Le lien a été copié dans votre presse-papiers.",
            });
          })
          .catch(err => {
            console.error('Erreur lors de la copie du lien: ', err);
            toast({
              title: "Erreur",
              description: "Impossible de copier le lien.",
              variant: "destructive",
            });
          });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="md:mr-2 text-mrc-blue hover:text-mrc-blue/80 hover:bg-white/10"
        asChild
      >
        <a href="/auth">
          <LogIn className="h-4 w-4 mr-2" />
          Connexion
        </a>
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="md:mr-2 text-mrc-blue hover:text-mrc-blue/80 hover:bg-white/10"
        >
          <User className="h-4 w-4 mr-2" />
          <span className="hidden md:inline-block">{user?.username}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="end">
        <div className="space-y-3">
          <div className="border-b pb-2">
            <p className="font-medium">{user?.username}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
            <div className="flex items-center mt-1">
              <History className="h-3 w-3 mr-1 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                Dernière connexion: {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Inconnue'}
              </p>
            </div>
          </div>
          
          <div className="space-y-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <a href="/settings">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </a>
            </Button>
            
            <p className="text-xs text-muted-foreground mt-2 mb-1">Partager</p>
            <div className="flex items-center justify-between mb-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="w-8 h-8 p-0 bg-blue-500 text-white hover:bg-blue-600 border-none"
                onClick={() => handleShare('facebook')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="w-8 h-8 p-0 bg-blue-400 text-white hover:bg-blue-500 border-none"
                onClick={() => handleShare('twitter')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="w-8 h-8 p-0 bg-green-500 text-white hover:bg-green-600 border-none"
                onClick={() => handleShare('whatsapp')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-whatsapp">
                <path d="M5.3 12.3a10 10 0 1 1 14.3 8.8L13 21l1-4.4a9.8 9.8 0 0 1 5-10 10 10 0 0 1-10.5 5.7"/>
                <path d="M15 14.5c.5 1.5 0 3-1 3.5H7.9"/>
                <path d="M12 11v5.5"/>
                </svg>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="w-8 h-8 p-0 bg-gray-700 text-white hover:bg-gray-800 border-none"
                onClick={() => handleShare('copy')}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-red-500 hover:text-red-600"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AuthNavItem;
