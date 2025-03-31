
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Download, Youtube, FileVideo, Check } from "lucide-react";
import { useScreenSize } from '@/hooks/useScreenSize';

interface DownloadOption {
  id: string;
  label: string;
  quality: string;
  format: string;
  size: string;
}

const YouTubeDownloader = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [downloadOptions, setDownloadOptions] = useState<DownloadOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const { toast } = useToast();
  const { isMobile } = useScreenSize();

  const handleAnalyze = async () => {
    if (!url) {
      toast({
        title: "URL requise",
        description: "Veuillez entrer une URL YouTube valide",
        variant: "destructive"
      });
      return;
    }

    try {
      setAnalyzing(true);
      
      // Simulation de l'analyse de la vidéo YouTube
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Données simulées
      const mockVideoInfo = {
        title: "MRC - Discours important sur la situation politique",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        duration: "10:32",
        channel: "MRC Officiel",
        views: "245,302"
      };
      
      const mockOptions = [
        { id: "1", label: "720p MP4", quality: "720p", format: "mp4", size: "85 MB" },
        { id: "2", label: "480p MP4", quality: "480p", format: "mp4", size: "45 MB" },
        { id: "3", label: "360p MP4", quality: "360p", format: "mp4", size: "28 MB" },
        { id: "4", label: "Audio seulement (MP3)", quality: "128kbps", format: "mp3", size: "12 MB" }
      ];
      
      setVideoInfo(mockVideoInfo);
      setDownloadOptions(mockOptions);
      setSelectedOption(mockOptions[0].id);
      
    } catch (error) {
      console.error('Error analyzing YouTube video:', error);
      toast({
        title: "Erreur d'analyse",
        description: "Impossible d'analyser cette vidéo YouTube. Vérifiez l'URL et réessayez.",
        variant: "destructive"
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDownload = async () => {
    if (!selectedOption) {
      toast({
        title: "Option requise",
        description: "Veuillez sélectionner une option de téléchargement",
        variant: "destructive"
      });
      return;
    }

    try {
      setDownloading(true);
      
      // Simuler le téléchargement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setDownloadComplete(true);
      
      toast({
        title: "Téléchargement réussi",
        description: "Votre vidéo a été téléchargée avec succès",
      });
      
      // Réinitialiser après un certain temps
      setTimeout(() => {
        setDownloadComplete(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error downloading video:', error);
      toast({
        title: "Erreur de téléchargement",
        description: "Impossible de télécharger cette vidéo. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setDownloading(false);
    }
  };

  const handleReset = () => {
    setUrl('');
    setVideoInfo(null);
    setDownloadOptions([]);
    setSelectedOption(null);
    setDownloadComplete(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Téléchargeur YouTube</h2>
        <p className="text-muted-foreground">
          Téléchargez des vidéos YouTube pour un usage hors ligne
        </p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-2'}`}>
              <Input
                placeholder="Collez l'URL de la vidéo YouTube ici"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={analyzing || downloading}
                className="flex-grow"
              />
              <Button
                onClick={handleAnalyze}
                disabled={!url || analyzing || downloading}
                className={isMobile ? 'w-full' : ''}
              >
                {analyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Analyse en cours...
                  </>
                ) : (
                  <>Analyser</>
                )}
              </Button>
            </div>
            
            {videoInfo && (
              <div className="space-y-4 pt-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/3">
                    <img 
                      src={videoInfo.thumbnail} 
                      alt={videoInfo.title}
                      className="w-full h-auto rounded-md object-cover shadow-md"
                    />
                  </div>
                  <div className="md:w-2/3 space-y-2">
                    <h3 className="text-lg font-semibold">{videoInfo.title}</h3>
                    <div className="text-sm text-muted-foreground">
                      <p>{videoInfo.channel}</p>
                      <p>Durée: {videoInfo.duration} | Vues: {videoInfo.views}</p>
                    </div>
                    
                    <div className="space-y-3 pt-3">
                      <p className="text-sm font-medium">Sélectionnez une option de téléchargement:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {downloadOptions.map((option) => (
                          <Button
                            key={option.id}
                            variant={selectedOption === option.id ? "default" : "outline"}
                            className="justify-start text-left"
                            onClick={() => setSelectedOption(option.id)}
                          >
                            <FileVideo className="mr-2 h-4 w-4" />
                            <div className="flex flex-col items-start">
                              <span>{option.label}</span>
                              <span className="text-xs text-muted-foreground">{option.size}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 flex space-x-2">
                      <Button
                        onClick={handleDownload}
                        disabled={!selectedOption || downloading || downloadComplete}
                        className="flex-grow"
                      >
                        {downloadComplete ? (
                          <>
                            <Check className="mr-2 h-4 w-4" /> 
                            Téléchargement terminé
                          </>
                        ) : downloading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                            Téléchargement...
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-4 w-4" /> 
                            Télécharger
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleReset}
                        disabled={downloading}
                      >
                        Réinitialiser
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="rounded-lg border p-4 bg-muted/50">
        <div className="flex gap-3 items-start">
          <Youtube className="h-8 w-8 text-red-500 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium mb-1">Téléchargez vos vidéos YouTube préférées</h3>
            <p className="text-sm text-muted-foreground">
              Cet outil vous permet de télécharger des vidéos YouTube pour pouvoir les regarder hors ligne. 
              Idéal pour accéder aux discours et présentations du MRC même sans connexion internet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeDownloader;
