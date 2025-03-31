
import React, { useEffect, useState } from 'react';
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
  Download,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MRCLogoNew from '@/components/branding/MRCLogoNew';
import VoteCard from '@/components/electoral/VoteCard';
import { useMediaQuery } from '@/hooks/use-media-query';
import { motion } from 'framer-motion';

const Index = () => {
  const { isMobile } = useMediaQuery('(max-width: 768px)');
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Un petit délai pour permettre un chargement fluide
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <MainLayout>
      <div className="py-4 md:py-8 px-2 md:px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-10"
        >
          <MRCLogoNew size={isMobile ? "medium" : "large"} withTagline className="mx-auto" />
          <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-mrc-blue to-mrc-green">
            MRC en Poche
          </h1>
          <p className="text-muted-foreground">
            Votre assistant politique personnel
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-6 md:mb-10"
        >
          <VoteCard />
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
        >
          <motion.div variants={item}>
            <Card className="flex flex-col items-center p-4 md:p-6 hover:shadow-md transition-shadow border-blue-100 dark:border-blue-900 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 h-full">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-mrc-blue" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold mb-2">Assistant IA</h2>
              <p className="text-center mb-4 text-muted-foreground text-sm md:text-base">
                Posez vos questions sur le MRC et la politique camerounaise.
              </p>
              <img 
                src="/lovable-uploads/assistant-preview.png" 
                alt="Assistant AI" 
                className="w-full h-32 object-cover rounded-md mb-4 shadow-md"
              />
              <Link to="/assistant" className="mt-auto w-full">
                <Button className="w-full bg-mrc-blue hover:bg-mrc-blue/90 group">
                  Discuter avec l'assistant
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="flex flex-col items-center p-4 md:p-6 hover:shadow-md transition-shadow border-purple-100 dark:border-purple-900 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 h-full">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold mb-2">Chat 237</h2>
              <p className="text-center mb-4 text-muted-foreground text-sm md:text-base">
                Discutez en temps réel avec d'autres sympathisants du MRC.
              </p>
              <img 
                src="/lovable-uploads/chat-preview.png" 
                alt="Chat 237" 
                className="w-full h-32 object-cover rounded-md mb-4 shadow-md"
              />
              <Link to="/chat-237" className="mt-auto w-full">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 group">
                  Rejoindre le chat
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="flex flex-col items-center p-4 md:p-6 hover:shadow-md transition-shadow border-green-100 dark:border-green-900 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 h-full">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-4">
                <FileText className="h-8 w-8 text-mrc-green" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold mb-2">Documents</h2>
              <p className="text-center mb-4 text-muted-foreground text-sm md:text-base">
                Générez des documents officiels et des formulaires personnalisés.
              </p>
              <img 
                src="/lovable-uploads/document-preview.png" 
                alt="Documents" 
                className="w-full h-32 object-cover rounded-md mb-4 shadow-md"
              />
              <Link to="/documents" className="mt-auto w-full">
                <Button className="w-full group">
                  Créer un document
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="flex flex-col items-center p-4 md:p-6 hover:shadow-md transition-shadow border-amber-100 dark:border-amber-900 bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-900 h-full">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full mb-4">
                <Brain className="h-8 w-8 text-amber-500" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold mb-2">Quiz</h2>
              <p className="text-center mb-4 text-muted-foreground text-sm md:text-base">
                Testez vos connaissances sur le MRC et la politique camerounaise.
              </p>
              <img 
                src="/lovable-uploads/quiz-preview.png" 
                alt="Quiz" 
                className="w-full h-32 object-cover rounded-md mb-4 shadow-md"
              />
              <Link to="/quiz" className="mt-auto w-full">
                <Button className="w-full bg-amber-500 hover:bg-amber-600 group">
                  Commencer un quiz
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="flex flex-col items-center p-4 md:p-6 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-gray-900 border-red-100 dark:border-red-900 h-full">
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4">
                <Download className="h-8 w-8 text-red-500" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold mb-2">Téléchargeur YouTube</h2>
              <p className="text-center mb-4 text-muted-foreground text-sm md:text-base">
                Téléchargez facilement des vidéos YouTube pour un usage hors-ligne.
              </p>
              <img 
                src="/lovable-uploads/youtube-preview.png" 
                alt="YouTube Downloader" 
                className="w-full h-32 object-cover rounded-md mb-4 shadow-md"
              />
              <Link to="/youtube-download" className="mt-auto w-full">
                <Button variant="default" className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 group">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger des vidéos
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="flex flex-col items-center p-4 md:p-6 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border-blue-100 dark:border-blue-900 h-full">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
                <YoutubeIcon className="h-8 w-8 text-red-500" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold mb-2">Analyse Vidéos YouTube</h2>
              <p className="text-center mb-4 text-muted-foreground text-sm md:text-base">
                Analysez les vidéos du MRC pour extraire les points clés.
              </p>
              <img 
                src="/lovable-uploads/youtube-analyzer-preview.png" 
                alt="YouTube Analyzer" 
                className="w-full h-32 object-cover rounded-md mb-4 shadow-md"
              />
              <Link to="/youtube-analyzer" className="mt-auto w-full">
                <Button variant="default" className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 group">
                  Analyser une vidéo
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Index;
