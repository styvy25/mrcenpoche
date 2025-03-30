
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Loader2, FileDown, RefreshCw, Youtube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import YouTubeURLInput from './YouTubeURLInput';

// Create a new YouTube analyzer component
const YouTubeAnalyzer = ({ className = '' }: { className?: string }) => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [videoDescription, setVideoDescription] = useState<string>('');
  const [transcription, setTranscription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('info');
  const { toast } = useToast();

  const handleVideoSelect = async (id: string) => {
    setIsLoading(true);
    setVideoId(id);
    
    try {
      // Mock API call for now
      setTimeout(() => {
        setVideoTitle('Titre de la vidéo YouTube');
        setVideoDescription('Ceci est une description de la vidéo YouTube qui serait normalement récupérée via l\'API YouTube.');
        setTranscription('Transcription de la vidéo qui serait normalement générée par un service de transcription ou extraite des sous-titres YouTube.');
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error fetching video data:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de récupérer les données de la vidéo',
        variant: 'destructive'
      });
      setIsLoading(false);
    }
  };

  const handleGeneratePDF = () => {
    toast({
      title: 'PDF Généré',
      description: 'Votre PDF a été généré avec succès'
    });
  };

  const handleReset = () => {
    setVideoId(null);
    setVideoTitle('');
    setVideoDescription('');
    setTranscription('');
  };

  return (
    <div className={className}>
      {!videoId ? (
        <YouTubeURLInput onVideoSelect={handleVideoSelect} isLoading={isLoading} />
      ) : (
        <Card>
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <Loader2 className="h-10 w-10 text-muted-foreground animate-spin mb-4" />
                <p className="text-muted-foreground">Analyse de la vidéo en cours...</p>
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{videoTitle}</h2>
                    <p className="text-sm text-muted-foreground">ID: {videoId}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Analyser une autre vidéo
                    </Button>
                    <Button size="sm" onClick={handleGeneratePDF}>
                      <FileDown className="h-4 w-4 mr-2" />
                      Générer PDF
                    </Button>
                  </div>
                </div>

                <div className="aspect-video w-full mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    title={videoTitle}
                  ></iframe>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="info">Informations</TabsTrigger>
                    <TabsTrigger value="transcript">Transcription</TabsTrigger>
                  </TabsList>
                  <TabsContent value="info" className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Description</h3>
                      <p className="text-sm whitespace-pre-line">{videoDescription}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="transcript">
                    <div>
                      <h3 className="font-medium mb-2">Transcription</h3>
                      <div className="max-h-96 overflow-y-auto bg-muted/30 p-4 rounded-lg">
                        <p className="text-sm whitespace-pre-line">{transcription}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default YouTubeAnalyzer;
