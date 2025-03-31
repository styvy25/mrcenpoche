import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircle, FileText, Newspaper, HelpCircle, Settings, AlertTriangle, ArrowRight, Users, Youtube } from 'lucide-react';
import { motion } from "framer-motion";

const HomeContent = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <main className="container mx-auto px-4 py-20 md:py-32">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section with gradient animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 mb-16 shadow-xl border border-white/5"
        >
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
          <motion.div 
            animate={{ 
              x: [0, 20, 0],
              y: [0, 10, 0], 
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror"
            }}
            className="absolute h-40 w-40 rounded-full bg-gradient-to-r from-mrc-blue to-purple-600 opacity-30 blur-3xl top-10 -right-10" 
          />
          <motion.div 
            animate={{ 
              x: [0, -20, 0],
              y: [0, -10, 0], 
              opacity: [0.2, 0.4, 0.2] 
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              repeatType: "mirror",
              delay: 1
            }}
            className="absolute h-40 w-40 rounded-full bg-gradient-to-r from-mrc-red to-amber-500 opacity-20 blur-3xl -bottom-10 -left-10" 
          />
          
          <div className="relative">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-6"
            >
              Bienvenue sur MRC en Poche
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-gray-300 mb-8 max-w-2xl"
            >
              Votre plateforme interactive pour rester informé et engagé en temps réel sur l'actualité politique et électorale au Cameroun.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="bg-mrc-blue hover:bg-mrc-blue/90 group" animation="shine">
                <Link to="/assistant">
                  <MessageCircle className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  Consulter l'assistant
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg" animation="shine">
                <Link to="/news">
                  <Newspaper className="mr-2 h-5 w-5" />
                  Voir les actualités
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Featured Content */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-mrc-blue to-mrc-green h-6 w-1 mr-3 rounded"></span>
            Fonctionnalités populaires
          </h2>
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <motion.div variants={item}>
              <AppCard 
                title="Assistant IA" 
                description="Posez vos questions à notre assistant intelligent pour obtenir des réponses personnalisées" 
                icon={<MessageCircle className="h-5 w-5" />}
                link="/assistant"
                color="bg-gradient-to-br from-blue-600 to-blue-800"
                imageSrc="/lovable-uploads/assistant-card.jpg"
              />
            </motion.div>
            
            <motion.div variants={item}>
              <AppCard 
                title="Documents" 
                description="Générez et consultez des documents officiels et des ressources importantes" 
                icon={<FileText className="h-5 w-5" />}
                link="/documents"
                color="bg-gradient-to-br from-green-600 to-green-800"
                imageSrc="/lovable-uploads/documents-card.jpg"
              />
            </motion.div>
            
            <motion.div variants={item}>
              <AppCard 
                title="Actualités" 
                description="Suivez les dernières informations et développements en temps réel" 
                icon={<Newspaper className="h-5 w-5" />}
                link="/news"
                color="bg-gradient-to-br from-amber-500 to-amber-700"
                imageSrc="/lovable-uploads/news-card.jpg"
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Urgent Update - Adapté à l'actualité */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-mrc-red/10 to-mrc-red/5 border border-mrc-red/20 rounded-xl p-6 relative overflow-hidden">
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: "mirror"
              }}
              className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-mrc-red/10 rounded-full blur-2xl"
            />
            <div className="flex items-start gap-4">
              <div className="bg-mrc-red/10 p-3 rounded-full flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-mrc-red animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Alerte électorale</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Des signalements de fraudes électorales ont été rapportés dans plusieurs régions. 
                  Restez vigilant et utilisez notre outil de signalement pour documenter toute irrégularité.
                </p>
                <Button variant="outline" className="text-mrc-red border-mrc-red/30 hover:bg-mrc-red/10 group">
                  <span>En savoir plus</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary Features */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 h-6 w-1 mr-3 rounded"></span>
            Autres ressources
          </h2>
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div variants={item}>
              <AppCard 
                title="Quiz" 
                description="Testez vos connaissances sur l'histoire politique et les enjeux actuels" 
                icon={<HelpCircle className="h-5 w-5" />}
                link="/quiz"
                color="bg-gradient-to-br from-purple-600 to-purple-800"
                small
                imageSrc="/lovable-uploads/quiz-card.jpg"
              />
            </motion.div>
            
            <motion.div variants={item}>
              <AppCard 
                title="Chat 237" 
                description="Échangez avec d'autres militants et sympathisants" 
                icon={<MessageCircle className="h-5 w-5" />}
                link="/chat-237"
                color="bg-gradient-to-br from-blue-600 to-blue-800"
                small
                imageSrc="/lovable-uploads/chat-card.jpg"
              />
            </motion.div>
            
            <motion.div variants={item}>
              <AppCard 
                title="Alerte Fraude" 
                description="Signalez les irrégularités électorales que vous constatez" 
                icon={<AlertTriangle className="h-5 w-5" />}
                link="/alerte-fraude"
                color="bg-gradient-to-br from-mrc-red to-rose-700"
                small
                imageSrc="/lovable-uploads/alert-card.jpg"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

interface AppCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color: string;
  delay?: number;
  small?: boolean;
  imageSrc?: string;
}

const AppCard = ({ title, description, icon, link, color, small = false, imageSrc }: AppCardProps) => {
  return (
    <Card 
      className={`${color} border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative h-full`}
    >
      {imageSrc && (
        <div className="absolute inset-0 opacity-20">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
      <CardContent className={`${small ? 'p-4' : 'p-6'} text-white relative z-10`}>
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className={`${small ? 'mb-3' : 'mb-4'} relative z-10 bg-white/20 p-3 rounded-full inline-block`}>{icon}</div>
        <h3 className={`${small ? 'text-lg' : 'text-xl'} font-semibold mb-2 relative z-10`}>{title}</h3>
        <p className={`text-sm text-gray-200 ${small ? 'mb-3' : 'mb-4'} relative z-10`}>{description}</p>
        <Button asChild variant="secondary" className="w-full group-hover:bg-white/90 group-hover:text-gray-800 relative z-10 group">
          <Link to={link}>
            Accéder
            <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default HomeContent;
