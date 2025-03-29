
import React, { useState } from 'react';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useYoutubeAnalyzer } from '@/utils/youtubeAnalyzer';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { YouTubeVideo as LucideYouTube, ArrowRight, FileText, Loader2 } from 'lucide-react';
import { usePlanLimits } from '@/hooks/usePlanLimits';
import PremiumBanner from '@/components/premium/PremiumBanner';

interface YouTubeAnalyzerProps {
  className?: string;
}

const YouTubeAnalyzer: React.FC<YouTubeAnalyzerProps> = ({ className }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { keys, keyStatus } = useApiKeys();
  const { generateYouTubeAnalysisPDF } = useYoutubeAnalyzer();
  const { getUsageStats } = usePlanLimits();
  
  // Extract YouTube video ID from URL
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
  
  const handleAnalyze = async () => {
    const videoId = extractVideoId(videoUrl);
    
    if (!videoId) {
      toast({
        title: "URL invalide",
        description: "Veuillez fournir une URL YouTube valide",
        variant: "destructive",
      });
      return;
    }
    
    if (!keys.youtube || !keyStatus.youtube) {
      toast({
        title: "Configuration requise",
        description: "Veuillez configurer une clé API YouTube valide dans les paramètres",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      await generateYouTubeAnalysisPDF(videoId, keys.youtube);
      setVideoUrl('');
    } catch (error) {
      console.error("Error analyzing YouTube video:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'analyse de la vidéo",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const stats = getUsageStats();
  const showBanner = stats.userPlan === 'free' && stats.youtubeAnalysisToday > 0;
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LucideYouTube className="h-5 w-5 text-red-500" />
          Analyser une vidéo YouTube
        </CardTitle>
        <CardDescription>
          Générez un rapport PDF d'analyse à partir d'une vidéo YouTube en fournissant son URL
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showBanner && <PremiumBanner type="general" className="mb-4" />}
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="youtube-url" className="text-sm font-medium">URL de la vidéo</label>
            <div className="flex gap-2">
              <Input
                id="youtube-url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="flex-1"
                disabled={isGenerating}
              />
              <Button 
                onClick={handleAnalyze}
                disabled={!videoUrl.trim() || isGenerating || !keyStatus.youtube}
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          {!keyStatus.youtube && (
            <div className="text-sm text-amber-500 flex items-center gap-1 mt-2">
              <span className="i-lucide-alert-circle h-4 w-4" />
              Vous devez configurer une clé API YouTube dans les paramètres
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Analysez {stats.youtubeAnalysisLimit} vidéos par jour
        </div>
        <div className="text-sm">
          Utilisés: {stats.youtubeAnalysisToday} / {stats.youtubeAnalysisLimit}
        </div>
      </CardFooter>
    </Card>
  );
};

export default YouTubeAnalyzer;
