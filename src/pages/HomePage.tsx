
import React from 'react';
import Index from './Index';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, YoutubeIcon, FileText, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import SocialShareButtons from '@/components/shared/SocialShareButtons';

const HomePage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 pt-24">
        <h1 className="text-3xl font-bold text-center mb-8 text-mrc-blue">MRC en Poche - Nouveautés</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* YouTube Downloader Feature */}
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <YoutubeIcon className="h-5 w-5 text-red-600 mr-2" />
                Téléchargeur YouTube
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-gray-600 text-sm mb-4">
                Téléchargez vos vidéos YouTube préférées pour une utilisation hors ligne. 
                Accédez facilement à vos contenus MRC même sans connexion internet.
              </p>
              <img 
                src="/assets/youtube-download.png" 
                alt="YouTube Downloader"
                className="w-full h-48 object-cover rounded-md mb-2" 
              />
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                <Link to="/documents?tab=youtube">
                  Essayer maintenant <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Quiz Gamification Feature */}
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <Award className="h-5 w-5 text-purple-600 mr-2" />
                Quiz Améliorés
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-gray-600 text-sm mb-4">
                Testez vos connaissances avec nos quiz interactifs améliorés. 
                Gagnez des badges, suivez vos progrès et partagez vos résultats avec vos amis.
              </p>
              <img 
                src="/assets/quiz-gamification.png" 
                alt="Quiz Gamification"
                className="w-full h-48 object-cover rounded-md mb-2" 
              />
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                <Link to="/quiz">
                  Commencer un quiz <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Social Sharing Feature */}
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <FileText className="h-5 w-5 text-blue-600 mr-2" />
                Partage Social
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-gray-600 text-sm mb-4">
                Partagez facilement le contenu MRC sur vos réseaux sociaux préférés.
                Mobilisez votre entourage avec nos outils de partage améliorés.
              </p>
              <div className="flex flex-col items-center justify-center h-48 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md mb-2 p-4">
                <h3 className="font-semibold mb-4">Essayez nos boutons de partage</h3>
                <SocialShareButtons 
                  title="Découvrez MRC en Poche !"
                  description="L'application officielle du MRC avec des fonctionnalités interactives et éducatives."
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/dashboard">
                  Vers le tableau de bord <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" className="bg-mrc-blue">
            <Link to="/">
              Explorer toutes les fonctionnalités
            </Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
