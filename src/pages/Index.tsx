
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  FileText, 
  Brain, 
  CreditCard, 
  YoutubeIcon, 
  Users, 
  Download 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MRCLogoNew from '@/components/branding/MRCLogoNew';
import VoteCard from '@/components/electoral/VoteCard';
import { useMediaQuery } from '@/hooks/use-media-query';

const Index = () => {
  const { isMobile } = useMediaQuery('(max-width: 768px)');
  
  return (
    <MainLayout>
      <div className="py-4 md:py-8 px-2 md:px-4">
        <div className="text-center mb-6 md:mb-10">
          <MRCLogoNew size={isMobile ? "medium" : "large"} withTagline className="mx-auto" />
          <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-2">MRC en Poche</h1>
          <p className="text-muted-foreground">
            Votre assistant politique personnel
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-6 md:mb-10">
          <VoteCard />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <Card className="flex flex-col items-center p-4 md:p-6 hover:shadow-md transition-shadow border-blue-100 dark:border-blue-900">
            <MessageSquare className="h-10 w-10 text-mrc-blue mb-4" />
            <h2 className="text-lg md:text-xl font-semibold mb-2">Assistant IA</h2>
            <p className="text-center mb-4 text-muted-foreground text-sm md:text-base">
              Posez vos questions sur le MRC et la politique camerounaise.
            </p>
            <Link to="/assistant" className="mt-auto w-full">
              <Button className="w-full">
                Discuter avec l'assistant
              </Button>
            </Link>
          </Card>
          
          <Card className="flex flex-col items-center p-4 md:p-6 hover:shadow-md transition-shadow border-purple-100 dark:border-purple-900">
            <Users className="h-10 w-10 text-purple-600 mb-4" />
            <h2 className="text-lg md:text-xl font-semibold mb-2">Chat 237</h2>
            <p className="text-center mb-4 text-muted-foreground text-sm md:text-base">
              Discutez en temps réel avec d'autres sympathisants du MRC.
            </p>
            <Link to="/chat-237" className="mt-auto w-full">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Rejoindre le chat
              </Button>
            </Link>
          </Card>
          
          <Card className="flex flex-col items-center p-4 md:p-6 hover:shadow-md transition-shadow border-green-100 dark:border-green-900">
            <FileText className="h-10 w-10 text-mrc-green mb-4" />
            <h2 className="text-lg md:text-xl font-semibold mb-2">Documents</h2>
            <p className="text-center mb-4 text-muted-foreground text-sm md:text-base">
              Générez des documents officiels et des formulaires personnalisés.
            </p>
            <Link to="/documents" className="mt-auto w-full">
              <Button className="w-full">
                Créer un document
              </Button>
            </Link>
          </Card>
          
          <Card className="flex flex-col items-center p-4 md:p-6 hover:shadow-md transition-shadow border-purple-100 dark:border-purple-900">
            <Brain className="h-10 w-10 text-purple-500 mb-4" />
            <h2 className="text-lg md:text-xl font-semibold mb-2">Quiz</h2>
            <p className="text-center mb-4 text-muted-foreground text-sm md:text-base">
              Testez vos connaissances sur le MRC et la politique camerounaise.
            </p>
            <Link to="/quiz" className="mt-auto w-full">
              <Button className="w-full">
                Commencer un quiz
              </Button>
            </Link>
          </Card>
          
          <Card className="flex flex-col items-center p-4 md:p-6 hover:shadow-md transition-shadow bg-gradient-to-br from-red-50 to-white dark:from-red-950/30 dark:to-gray-900 border-red-100 dark:border-red-900">
            <Download className="h-10 w-10 text-red-500 mb-4" />
            <h2 className="text-lg md:text-xl font-semibold mb-2">Téléchargeur YouTube</h2>
            <p className="text-center mb-4 text-muted-foreground text-sm md:text-base">
              Téléchargez facilement des vidéos YouTube pour un usage hors-ligne.
            </p>
            <Link to="/youtube-download" className="mt-auto w-full">
              <Button variant="default" className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800">
                <Download className="mr-2 h-4 w-4" />
                Télécharger des vidéos
              </Button>
            </Link>
          </Card>
          
          <Card className="flex flex-col items-center p-4 md:p-6 hover:shadow-md transition-shadow bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-gray-900 border-blue-100 dark:border-blue-900">
            <YoutubeIcon className="h-10 w-10 text-red-500 mb-4" />
            <h2 className="text-lg md:text-xl font-semibold mb-2">Analyse Vidéos YouTube</h2>
            <p className="text-center mb-4 text-muted-foreground text-sm md:text-base">
              Analysez les vidéos du MRC pour extraire les points clés.
            </p>
            <Link to="/youtube-analyzer" className="mt-auto w-full">
              <Button variant="default" className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800">
                Analyser une vidéo
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
