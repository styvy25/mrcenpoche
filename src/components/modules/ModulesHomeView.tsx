import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, HelpCircle } from "lucide-react";
import CoursesGrid from "@/components/modules/CoursesGrid";
import ModuleProgressView from './ModuleProgressView';
import ModulesTrainingPath from './ModulesTrainingPath';
import { Module } from './types';
import { moduleData } from './data/modules';

const ModulesWelcome = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg font-semibold">Bienvenue sur la plateforme de formation du MRC</CardTitle>
      <CardDescription>Découvrez les modules de formation disponibles et suivez votre progression.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Commencez votre parcours d'apprentissage et développez vos compétences politiques.</p>
    </CardContent>
  </Card>
);

const ModulesTabs = ({ 
  activeTab, 
  setActiveTab,
  modulesContent,
  progressContent,
  showCompletedModules,
  setShowCompletedModules
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-md font-semibold">Vue d'ensemble</CardTitle>
      <CardDescription>Suivez votre progression et découvrez les modules complétés.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant={activeTab === 'progress' ? 'default' : 'outline'}
          onClick={() => setActiveTab('progress')}
        >
          Progression
        </Button>
        <Button 
          variant={activeTab === 'modules' ? 'default' : 'outline'}
          onClick={() => setActiveTab('modules')}
        >
          Modules
        </Button>
      </div>
      
      {activeTab === 'progress' && (
        <div className="space-y-2">
          <p>Modules complétés: {progressContent.completedModules} / {progressContent.totalModules}</p>
          <p>Points: {progressContent.points} / Prochain niveau: {progressContent.nextLevel}</p>
          <p>Niveau actuel: {progressContent.level}</p>
        </div>
      )}
      
      {activeTab === 'modules' && (
        <div className="space-y-2">
          <label className="inline-flex items-center">
            <input 
              type="checkbox" 
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={showCompletedModules}
              onChange={() => setShowCompletedModules(!showCompletedModules)}
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Afficher les modules complétés</span>
          </label>
          <ul>
            {modulesContent.map(module => (
              <li key={module.id}>
                {module.title} - {module.progress}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </CardContent>
  </Card>
);

const ModulesHelp = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-md font-semibold">Besoin d'aide ?</CardTitle>
      <CardDescription>Contactez notre équipe de support pour toute question.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>
        <Sparkles className="inline-block h-4 w-4 mr-1" />
        Consultez notre FAQ ou contactez-nous directement.
      </p>
    </CardContent>
    <CardFooter>
      <Button variant="outline">
        <HelpCircle className="h-4 w-4 mr-2" />
        Support
      </Button>
    </CardFooter>
  </Card>
);

const ModulesFeaturedCard = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-md font-semibold">Module en vedette</CardTitle>
      <CardDescription>Découvrez notre module le plus populaire du moment.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Explorez des sujets clés et approfondissez vos connaissances.</p>
    </CardContent>
    <CardFooter>
      <Button>
        <Sparkles className="h-4 w-4 mr-2" />
        Découvrir
      </Button>
    </CardFooter>
  </Card>
);

const ModulesHomeView = ({ 
  onChallengeClick, 
  onChatClick, 
  onStartQuiz, 
  onChallengeComplete 
}) => {
  const [modules, setModules] = useState<Module[]>(moduleData.map(module => ({...module})));
  const [activeTab, setActiveTab] = useState<string>('progress');
  const [showCompletedModules, setShowCompletedModules] = useState<boolean>(false);
  
  // Mock data for module progress
  const progressContent = {
    completedModules: modules.filter(m => m.progress === 100).length,
    totalModules: modules.length,
    points: 250,
    nextLevel: 500,
    level: 2,
  };
  
  // Mock data for adaptive training
  const adaptiveTrainingData = {
    nextModule: 'Module 3',
    reason: 'Recommandé pour améliorer vos compétences en communication.'
  };
  
  // Mock data for community challenges
  const communityChallengesData = {
    activeChallenges: 5,
    participants: 120
  };
  
  // Handle module click
  const handleModuleClick = (module: Module) => {
    console.log("Module clicked:", module);
    // Implementation would go here
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="w-full md:w-8/12 space-y-6">
          <ModulesWelcome />
          <ModulesTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            modulesContent={modules}
            progressContent={progressContent}
            showCompletedModules={showCompletedModules}
            setShowCompletedModules={setShowCompletedModules}
          />
        </div>
        <div className="w-full md:w-4/12">
          <ModulesHelp />
        </div>
      </div>
      
      <ModulesTrainingPath />
      
      <div className="grid gap-6 md:grid-cols-2">
        <ModulesFeaturedCard />
        <ModuleProgressView />
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold dark:text-white">Modules Recommandés</h3>
          <Button variant="outline" size="sm">Voir tout</Button>
        </div>
        
        <CoursesGrid 
          modules={modules}
          onModuleClick={handleModuleClick}
        />
      </div>
    </div>
  );
};

export default ModulesHomeView;
