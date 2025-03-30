
import React from 'react';
import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter } from 'lucide-react';
import { toast } from "sonner";

interface SocialShareButtonsProps {
  title?: string;
  description?: string;
  url?: string;
  type?: 'quiz' | 'video' | 'badge' | 'default';
  compact?: boolean;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  title = "MRC en Poche",
  description = "Découvrez l'application MRC en Poche",
  url,
  type = 'default',
  compact = false
}) => {
  const currentUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  
  // Default messages
  const messages = {
    quiz: "J'ai obtenu un excellent score sur ce quiz, essayez-le aussi !",
    video: "Regardez cette vidéo intéressante !",
    badge: "Je viens de gagner un nouveau badge sur MRC en Poche !",
    default: "Découvrez MRC en Poche"
  };
  
  const shareText = type !== 'default' ? messages[type] : description;
  const encodedShareText = encodeURIComponent(shareText);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedShareText}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedShareText}&url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedShareText}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedShareText}`,
  };

  const openShareWindow = (url: string, platform: string) => {
    window.open(url, '_blank', 'width=600,height=400');
    toast.success(`Partagé sur ${platform}`, {
      description: "Merci d'avoir partagé notre contenu !",
      duration: 3000,
    });
  };

  return (
    <div className={`flex ${compact ? 'gap-2' : 'gap-3'}`}>
      <Button 
        size={compact ? "sm" : "default"}
        variant="outline" 
        className="bg-[#1877F2] hover:bg-[#0e64d1] text-white" 
        onClick={() => openShareWindow(shareLinks.facebook, "Facebook")}
      >
        <Facebook className={`${compact ? 'h-4 w-4' : 'h-5 w-5 mr-2'}`} />
        {!compact && "Facebook"}
      </Button>
      
      <Button 
        size={compact ? "sm" : "default"}
        variant="outline" 
        className="bg-[#1DA1F2] hover:bg-[#0c85d0] text-white" 
        onClick={() => openShareWindow(shareLinks.twitter, "Twitter")}
      >
        <Twitter className={`${compact ? 'h-4 w-4' : 'h-5 w-5 mr-2'}`} />
        {!compact && "Twitter"}
      </Button>
      
      <Button 
        size={compact ? "sm" : "default"}
        variant="outline" 
        className="bg-[#25D366] hover:bg-[#12af4e] text-white" 
        onClick={() => openShareWindow(shareLinks.whatsapp, "WhatsApp")}
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className={`${compact ? 'h-4 w-4' : 'h-5 w-5 mr-2'}`}
        >
          <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"/>
        </svg>
        {!compact && "WhatsApp"}
      </Button>
      
      {!compact && (
        <Button 
          variant="outline" 
          className="bg-[#0088cc] hover:bg-[#0077b3] text-white" 
          onClick={() => openShareWindow(shareLinks.telegram, "Telegram")}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="h-5 w-5 mr-2"
          >
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          Telegram
        </Button>
      )}
    </div>
  );
};

export default SocialShareButtons;
