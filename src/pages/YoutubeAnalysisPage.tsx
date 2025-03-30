
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import YouTubeAnalyzer from '@/components/youtube/YouTubeAnalyzer';
import { YoutubeIcon, BookOpen, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const YoutubeAnalysisPage = () => {
  const { toast } = useToast();

  return (
    <MainLayout>
      <div className="container py-6 max-w-6xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <YoutubeIcon className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Analyse de Vidéos YouTube MRC</h1>
            <p className="text-muted-foreground">
              Explorez et analysez les vidéos politiques du MRC pour une meilleure compréhension
            </p>
          </div>
        </div>

        <Tabs defaultValue="analyzer" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="analyzer" className="flex items-center gap-2">
              <YoutubeIcon className="h-4 w-4" />
              Analyser une vidéo
            </TabsTrigger>
            <TabsTrigger value="lessons" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Leçons politiques
            </TabsTrigger>
            <TabsTrigger value="discussion" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Discussions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="analyzer">
            <YouTubeAnalyzer />
          </TabsContent>
          
          <TabsContent value="lessons">
            <Card className="p-6">
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 mx-auto text-mrc-blue mb-3" />
                <h3 className="text-xl font-bold mb-2">Leçons Politiques</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Cette section proposera bientôt des leçons politiques basées sur les analyses de vidéos YouTube.
                </p>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="discussion">
            <Card className="p-6">
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 mx-auto text-mrc-blue mb-3" />
                <h3 className="text-xl font-bold mb-2">Espace de Discussion</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Bientôt, vous pourrez discuter des vidéos avec d'autres membres et partager vos analyses politiques.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default YoutubeAnalysisPage;
