
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Feature, usePlanLimits } from "@/hooks/usePlanLimits";
import { supabase } from "@/integrations/supabase/client";

interface VideoDownloadButtonProps {
  videoId: string;
  title: string;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const VideoDownloadButton: React.FC<VideoDownloadButtonProps> = ({
  videoId,
  title,
  variant = "default",
  size = "default",
  className = ""
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const { hasFeatureAccess, incrementYoutubeDownloads } = usePlanLimits();

  const handleDownload = async () => {
    if (!hasFeatureAccess(Feature.YOUTUBE_DOWNLOAD)) {
      toast({
        title: "Fonctionnalité premium",
        description: "Le téléchargement de vidéos YouTube est disponible avec un abonnement premium",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);

    try {
      // Call our Supabase Edge Function to handle the download
      const { data, error } = await supabase.functions.invoke('youtube-downloader', {
        body: {
          videoId,
          title,
          userId: currentUser?.id
        }
      });

      if (error) throw error;

      if (data.success) {
        // Increment the download counter
        incrementYoutubeDownloads();
        
        // Create a temporary link to download the video
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = `${title.replace(/[^\w\s]/gi, '')}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setDownloadComplete(true);
        
        toast({
          title: "Téléchargement réussi",
          description: "La vidéo a été téléchargée sur votre appareil",
        });
      } else {
        throw new Error(data.message || "Échec du téléchargement");
      }
    } catch (error) {
      console.error("Erreur de téléchargement:", error);
      toast({
        title: "Erreur",
        description: "Impossible de télécharger la vidéo. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  if (downloadComplete) {
    return (
      <Button 
        variant="outline" 
        size={size} 
        className={`text-green-600 border-green-600 ${className}`}
        disabled
      >
        <CheckCircle className="h-4 w-4 mr-2" />
        Téléchargé
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleDownload}
      disabled={isDownloading}
    >
      {isDownloading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Download className="h-4 w-4 mr-2" />
      )}
      Télécharger la vidéo
    </Button>
  );
};

export default VideoDownloadButton;
