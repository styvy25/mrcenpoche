
import { Button } from "@/components/ui/button";
import { Download, Wifi, WifiOff, Share2 } from "lucide-react";
import { useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface ChatHeaderProps {
  onGeneratePDF: () => void;
  isOnline?: boolean;
}

const ChatHeader = ({ onGeneratePDF, isOnline = true }: ChatHeaderProps) => {
  const { toast } = useToast();
  
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = "Assistant IA MRC LearnScape";
    const text = "Discutez avec l'assistant IA de MRC LearnScape pour en apprendre plus sur le MRC!";
    
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
  
  return (
    <div className="flex items-center justify-between p-4 border-b border-white/10">
      <div>
        <h2 className="text-lg font-bold text-white">Assistant IA - Styvy237</h2>
        <div className="flex items-center mt-1">
          <div className="flex items-center">
            {isOnline ? (
              <>
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                <span className="text-xs text-green-400 flex items-center">
                  <Wifi className="h-3 w-3 mr-1" />
                  En ligne
                </span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-xs text-yellow-400 flex items-center">
                  <WifiOff className="h-3 w-3 mr-1" />
                  Hors-ligne
                </span>
              </>
            )}
          </div>
          <span className="mx-2 text-gray-500">•</span>
          <span className="text-xs text-gray-400">Assistant politique MRC</span>
        </div>
      </div>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
            <DropdownMenuItem onClick={() => handleShare('facebook')} className="flex items-center cursor-pointer hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook mr-2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
              Facebook
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('twitter')} className="flex items-center cursor-pointer hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter mr-2">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
              Twitter
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('whatsapp')} className="flex items-center cursor-pointer hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-whatsapp mr-2">
              <path d="M5.3 12.3a10 10 0 1 1 14.3 8.8L13 21l1-4.4a9.8 9.8 0 0 1 5-10 10 10 0 0 1-10.5 5.7"/>
              <path d="M15 14.5c.5 1.5 0 3-1 3.5H7.9"/>
              <path d="M12 11v5.5"/>
              </svg>
              WhatsApp
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('copy')} className="flex items-center cursor-pointer hover:bg-gray-700">
              <Share2 className="h-4 w-4 mr-2" />
              Copier le lien
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onGeneratePDF}
          className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
