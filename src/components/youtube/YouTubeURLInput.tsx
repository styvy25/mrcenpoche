
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2, Youtube } from 'lucide-react';
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
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="text"
          placeholder="Collez l'URL YouTube ici (ex: https://youtube.com/watch?v=...)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
          disabled={isLoading || disabled}
        />
        <Button 
          type="submit" a
          disabled={!url.trim() || isLoading || disabled}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
          <span className="ml-2 hidden sm:inline">Analyser</span>
        </Button>
      </form>
    </div>
  );
};

export default YouTubeURLInput;
