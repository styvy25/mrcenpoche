
import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import DynamicSurveyMap from '@/components/survey/DynamicSurveyMap';
import LivestreamComponent from '@/components/livestream/LivestreamComponent';
import AIScriptAssistant from '@/components/ai/AIScriptAssistant';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 pt-20">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-mrc-blue mb-6">MRC en Poche</h1>
          <p className="text-xl mb-8">Votre plateforme de formation politique pour le MRC (Mouvement pour la Renaissance du Cameroun)</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            <Link to="/modules">
              <Button className="w-full h-16 text-lg bg-mrc-blue hover:bg-blue-700">
                Formations Disponibles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/quiz">
              <Button className="w-full h-16 text-lg" variant="outline">
                Testez vos connaissances
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        
        <Tabs defaultValue="survey" className="w-full mb-12">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="survey">Top 20 Militants</TabsTrigger>
            <TabsTrigger value="livestream">Livestream</TabsTrigger>
            <TabsTrigger value="ai">Assistant IA</TabsTrigger>
          </TabsList>
          
          <TabsContent value="survey" className="mt-8">
            <DynamicSurveyMap />
          </TabsContent>
          
          <TabsContent value="livestream" className="mt-8">
            <LivestreamComponent />
          </TabsContent>
          
          <TabsContent value="ai" className="mt-8">
            <AIScriptAssistant />
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Formations Politiques</h2>
            <p className="text-gray-600">Découvrez nos modules de formation sur l'histoire et les valeurs du MRC.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Quiz Interactifs</h2>
            <p className="text-gray-600">Testez vos connaissances et gagnez des badges de progression.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Réunions Virtuelles</h2>
            <p className="text-gray-600">Participez à des webinaires et des discussions en ligne.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
