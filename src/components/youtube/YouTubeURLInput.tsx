
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2, YouTube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface YouTubeURLInputProps {
  onVideoSelect: (videoId: string) => void;
  isLoading?: boolean;
  className?: string;
  title?: string;
}

const YouTubeURLInput: React.FC<YouTubeURLInputProps> = ({
  onVideoSelect,
  isLoading = false,
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

  const handleSubmit = (e: React.FormEvent) => {
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
    
    onVideoSelect(videoId);
    setUrl('');
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <YouTube className="h-5 w-5 text-red-500" />
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
            disabled={isLoading}
          />
          <Button type="submit" disabled={!url.trim() || isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default YouTubeURLInput;
