
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import CoursesGrid from "@/components/modules/CoursesGrid";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Award, ArrowUpRight } from "lucide-react";

const ModulesPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-2">
            Modules de Formation
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explorez nos modules de formation conçus pour vous aider à devenir un militant efficace et bien informé.
          </p>
        </div>
        
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Votre progression
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-3xl font-bold text-mrc-blue">1/5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Modules complétés</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-3xl font-bold text-mrc-blue">38%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Progression globale</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-3xl font-bold text-mrc-blue">3h 45m</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Temps d'étude</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-3xl font-bold text-mrc-blue">12</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Leçons terminées</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Tous les modules
          </h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Award className="h-4 w-4 mr-1" />
              Mes certifications
            </Button>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <BookOpen className="h-4 w-4 mr-1" />
              Modules suggérés
            </Button>
          </div>
        </div>
        
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="beginner">Débutant</TabsTrigger>
            <TabsTrigger value="intermediate">Intermédiaire</TabsTrigger>
            <TabsTrigger value="advanced">Avancé</TabsTrigger>
            <TabsTrigger value="completed">Complétés</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <CoursesGrid />
        
        <div className="mt-12 bg-mrc-blue/10 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-mrc-blue mb-2">Besoin d'aide pour votre formation ?</h3>
            <p className="text-gray-600 max-w-2xl">
              Notre équipe de formateurs est disponible pour vous guider dans votre parcours d'apprentissage. 
              N'hésitez pas à les contacter pour toute question ou clarification.
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-mrc-blue hover:bg-blue-700">
            Contacter un formateur
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModulesPage;
