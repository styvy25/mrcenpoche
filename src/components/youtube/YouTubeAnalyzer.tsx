
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useYoutubeAnalyzer } from '@/utils/youtubeAnalyzer';
import YouTubeURLInput from './YouTubeURLInput';
import { Loader2, FileDown, FileText, YoutubeIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePlanLimits } from '@/hooks/usePlanLimits';
import PremiumBanner from '@/components/premium/PremiumBanner';

const YouTubeAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { userPlan } = usePlanLimits();
  const { toast } = useToast();
  const { analyzeYoutubeVideo, generateAnalysisPDF } = useYoutubeAnalyzer();

  const handleVideoSelect = async (selectedVideoId: string) => {
    setIsAnalyzing(true);
    setVideoId(selectedVideoId);
    
    const result = await analyzeYoutubeVideo(`https://www.youtube.com/watch?v=${selectedVideoId}`);
    
    if (result.success && result.analysis) {
      setAnalysis(result.analysis);
      if (result.title) {
        setVideoTitle(result.title);
      }
      
      toast({
        title: "Analyse terminée",
        description: "L'analyse de la vidéo a été générée avec succès",
      });
    }
    
    setIsAnalyzing(false);
  };

  const handleGeneratePDF = async () => {
    if (!videoId || !analysis) {
      toast({
        title: "Impossible de générer le PDF",
        description: "Veuillez d'abord analyser une vidéo",
        variant: "destructive"
      });
      return;
    }
    
    const url = await generateAnalysisPDF(videoId, videoTitle, analysis);
    if (url) {
      setPdfUrl(url);
      toast({
        title: "PDF généré",
        description: "Le PDF d'analyse a été généré avec succès",
      });
    }
  };

  const handleDownloadPDF = () => {
    if (!pdfUrl) return;
    
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `Analyse-Video-MRC-${videoId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {userPlan === 'free' && (
        <PremiumBanner type="youtube" />
      )}
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <YoutubeIcon className="h-5 w-5 text-red-500" />
            Analyseur de vidéos YouTube MRC
          </CardTitle>
          <CardDescription>
            Entrez l'URL d'une vidéo YouTube pour obtenir une analyse détaillée avec Styvy237
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <YouTubeURLInput 
            onVideoSelect={handleVideoSelect} 
            isLoading={isAnalyzing}
            title="Analyser une vidéo YouTube du MRC"
          />
          
          {videoId && !isAnalyzing && (
            <div className="mt-6 space-y-4">
              <Tabs defaultValue="video" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="video">Vidéo</TabsTrigger>
                  <TabsTrigger value="analysis">Analyse</TabsTrigger>
                </TabsList>
                
                <TabsContent value="video" className="space-y-4">
                  <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      className="h-full w-full"
                      title={videoTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold line-clamp-2">{videoTitle}</h3>
                  </div>
                </TabsContent>
                
                <TabsContent value="analysis" className="space-y-4">
                  <div className="prose dark:prose-invert max-w-none prose-sm sm:prose-base">
                    <div className="whitespace-pre-line bg-gray-50 dark:bg-gray-900 p-4 rounded-md border">
                      {analysis}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      onClick={handleGeneratePDF} 
                      disabled={!analysis || isAnalyzing}
                      className="flex-1"
                    >
                      {isAnalyzing ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <FileText className="h-4 w-4 mr-2" />
                      )}
                      Générer le PDF
                    </Button>
                    
                    {pdfUrl && (
                      <Button 
                        onClick={handleDownloadPDF} 
                        variant="outline" 
                        className="flex-1"
                      >
                        <FileDown className="h-4 w-4 mr-2" />
                        Télécharger le PDF
                      </Button>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          {isAnalyzing && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="h-8 w-8 mx-auto animate-spin text-mrc-blue mb-4" />
                <p>Analyse en cours avec Styvy237...</p>
                <p className="text-sm text-muted-foreground mt-2">Nous analysons le contenu et préparons votre rapport</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubeAnalyzer;
