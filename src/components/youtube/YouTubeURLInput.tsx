
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Loader2, Youtube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface YouTubeURLInputProps {
  onVideoSelect: (videoId: string) => void;
  onSubmit?: (url: string) => Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  title?: string;
}

const YouTubeURLInput: React.FC<YouTubeURLInputProps> = ({
  onVideoSelect,
  onSubmit,
  isLoading = false,
  disabled = false,
  className = '',
  title = 'Analyser une vidéo YouTube'
}) => {
  const [url, setUrl] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  // Function to extract YouTube video ID from URL
  const extractVideoId = (url: string): string | null => {
    // Handle youtu.be links
    const shortMatch = /youtu\.be\/([a-zA-Z0-9_-]{11})/.exec(url);
    if (shortMatch) return shortMatch[1];
    
    // Handle youtube.com links
    const regularMatch = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/.exec(url);
    if (regularMatch) return regularMatch[1];
    
    // Handle embed links
    const embedMatch = /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/.exec(url);
    if (embedMatch) return embedMatch[1];
    
    // Handle already provided IDs (11 characters)
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const videoId = extractVideoId(url);
    
    if (!videoId) {
      toast({
        title: "URL invalide",
        description: "Veuillez entrer une URL YouTube valide",
        variant: "destructive"
      });
      return;
    }
    
    if (onSubmit) {
      await onSubmit(url);
    } else {
      onVideoSelect(videoId);
    }
    
    setUrl('');
  };

  const handleDownload = async () => {
    const videoId = extractVideoId(url);
    
    if (!videoId) {
      toast({
        title: "URL invalide",
        description: "Veuillez entrer une URL YouTube valide",
        variant: "destructive"
      });
      return;
    }

    setIsDownloading(true);
    
    try {
      // Simuler le téléchargement
      toast({
        title: "Téléchargement démarré",
        description: "La vidéo YouTube est en cours de téléchargement"
      });
      
      // Simuler un délai de téléchargement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Téléchargement terminé",
        description: "La vidéo a été téléchargée avec succès"
      });
    } catch (error) {
      toast({
        title: "Erreur de téléchargement",
        description: "Une erreur est survenue lors du téléchargement",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Youtube className="h-5 w-5 text-red-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Collez l'URL YouTube ici"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
            disabled={isLoading || disabled || isDownloading}
          />
          <Button type="submit" disabled={!url.trim() || isLoading || disabled || isDownloading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </Button>
          <Button 
            type="button" 
            disabled={!url.trim() || isDownloading}
            onClick={handleDownload}
            variant="outline"
          >
            {isDownloading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
          </Button>
        </form>
        {url && (
          <p className="mt-2 text-sm text-muted-foreground">
            Téléchargez facilement des vidéos YouTube pour une consultation hors-ligne.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default YouTubeURLInput;
