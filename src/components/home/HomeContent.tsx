
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircle, FileText, Newspaper, HelpCircle, Settings } from "lucide-react";

const HomeContent = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black px-4 py-20 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Bienvenue sur MRC en Poche
        </h1>
        <p className="text-lg text-gray-300 mb-12">
          Votre application pour rester informé et engagé
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AppCard 
            title="Assistant IA" 
            description="Posez vos questions à notre assistant intelligent" 
            icon={<MessageCircle size={24} />}
            link="/assistant"
            color="bg-gradient-to-br from-blue-600 to-blue-800"
          />
          
          <AppCard 
            title="Documents" 
            description="Générez des documents personnalisés" 
            icon={<FileText size={24} />}
            link="/documents"
            color="bg-gradient-to-br from-green-600 to-green-800"
          />
          
          <AppCard 
            title="Actualités" 
            description="Restez à jour avec les dernières informations" 
            icon={<Newspaper size={24} />}
            link="/news"
            color="bg-gradient-to-br from-yellow-600 to-yellow-700"
          />

          <AppCard 
            title="Quiz" 
            description="Testez vos connaissances" 
            icon={<HelpCircle size={24} />}
            link="/quiz"
            color="bg-gradient-to-br from-purple-600 to-purple-800"
          />
          
          <AppCard 
            title="Paramètres" 
            description="Personnalisez votre expérience" 
            icon={<Settings size={24} />}
            link="/settings"
            color="bg-gradient-to-br from-gray-600 to-gray-800"
          />
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
}

const AppCard = ({ title, description, icon, link, color }: AppCardProps) => {
  return (
    <Card className={`${color} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
      <CardContent className="p-6 text-white">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-200 mb-4">{description}</p>
        <Button asChild variant="secondary" className="w-full">
          <Link to={link}>Accéder</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default HomeContent;
