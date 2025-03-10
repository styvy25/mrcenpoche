import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import ModuleDetail from "@/components/modules/ModuleDetail";
import ModuleQuiz from "@/components/modules/ModuleQuiz";
import { useToast } from "@/components/ui/use-toast";
import { getModuleQuiz } from "@/components/modules/moduleQuizData";
import ModulesTabs from "@/components/modules/ModulesTabs";
import ModulesHomeView from "@/components/modules/ModulesHomeView";
import ModuleProgressView from "@/components/modules/ModuleProgressView";
import ModuleChallengeView from "@/components/modules/ModuleChallengeView";
import ModuleChatView from "@/components/modules/ModuleChatView";

const demoModule = {
  id: 1,
  title: "Histoire et Valeurs du MRC",
  description: "Découvrez les fondements et principes du Mouvement pour la Renaissance du Cameroun",
  progress: 75,
  duration: "2h 30min",
  level: "Débutant" as const,
  isPdfAvailable: true,
  isCompleted: false,
  overview: "Ce module vous permettra de comprendre l'histoire du MRC, ses valeurs fondamentales et sa vision pour le Cameroun. Vous découvrirez pourquoi le parti a été créé, qui sont ses fondateurs et quels objectifs il poursuit. Cette formation est essentielle pour tout militant ou sympathisant désirant s'engager efficacement.",
  lessons: [
    {
      id: 1,
      title: "Origines et création du MRC",
      duration: "20 min",
      isCompleted: true,
      content: "Le Mouvement pour la Renaissance du Cameroun (MRC) a été fondé en août 2012 par Maurice Kamto, accompagné d'autres intellectuels et personnalités politiques camerounaises. La création du parti est survenue dans un contexte de besoin de renouveau politique et de propositions alternatives pour le développement du Cameroun. Les fondateurs partageaient une vision commune d'un Cameroun plus démocratique, plus juste et plus prospère."
    },
    {
      id: 2,
      title: "Valeurs fondamentales et idéologie",
      duration: "25 min",
      isCompleted: true,
      content: "Le MRC s'appuie sur plusieurs valeurs fondamentales: la démocratie participative, la justice sociale, la bonne gouvernance, la transparence et l'intégrité. Le parti prône une approche pragmatique de la politique, centrée sur les besoins réels des citoyens camerounais. L'idéologie du MRC peut être qualifiée de progressiste et sociale-démocrate, avec un accent particulier sur la redistribution équitable des ressources et la décentralisation du pouvoir."
    },
    {
      id: 3,
      title: "Structure et organisation",
      duration: "30 min",
      isCompleted: true,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 4,
      title: "Le MRC dans le paysage politique camerounais",
      duration: "40 min",
      isCompleted: false,
      isLocked: false,
    },
    {
      id: 5,
      title: "Vision et projet de société",
      duration: "35 min",
      isCompleted: false,
      isLocked: true,
    }
  ],
  quizLink: "/quiz",
  pdfUrl: "https://example.com/module1.pdf"
};

const ModulesPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("modules");
  const [selectedModule, setSelectedModule] = useState<typeof demoModule | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [currentQuizModule, setCurrentQuizModule] = useState("");
  const { toast } = useToast();

  const handleModuleSelect = (module: typeof demoModule) => {
    setSelectedModule(module);
    setShowQuiz(false);
    setShowChat(false);
    setShowChallenge(false);
  };

  const handleBackToModules = () => {
    setSelectedModule(null);
    setShowQuiz(false);
  };

  const handleStartQuiz = (moduleId: string) => {
    setCurrentQuizModule(moduleId);
    setShowQuiz(true);
    setShowChat(false);
    setShowChallenge(false);
  };

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    toast({
      title: "Quiz terminé !",
      description: `Vous avez obtenu ${score}/${totalQuestions} (${percentage}%)`,
    });
  };

  const handleChallengeComplete = () => {
    setShowChallenge(false);
    toast({
      title: "Défi quotidien complété !",
      description: "Revenez demain pour un nouveau défi.",
    });
  };

  const handleChallengeClick = () => {
    setShowChallenge(true);
    setActiveTab("challenge");
  };

  const handleChatClick = () => {
    setShowChat(true);
    setActiveTab("chat");
  };

  const renderModulesContent = () => {
    if (selectedModule) {
      if (showQuiz) {
        return (
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={handleBackToModules} 
              className="mb-4"
            >
              ← Retour au module
            </Button>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Quiz: {getModuleQuiz(currentQuizModule)?.title}
            </h2>
            <ModuleQuiz 
              moduleId={currentQuizModule}
              questions={getModuleQuiz(currentQuizModule)?.questions || []}
              onComplete={handleQuizComplete}
            />
          </div>
        );
      } else {
        return (
          <ModuleDetail 
            module={selectedModule} 
            onBack={handleBackToModules} 
          />
        );
      }
    } else {
      return (
        <ModulesHomeView 
          onChallengeClick={handleChallengeClick}
          onChatClick={handleChatClick}
          onStartQuiz={handleStartQuiz}
          onChallengeComplete={handleChallengeComplete}
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ModulesTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          modulesContent={renderModulesContent()}
          progressContent={<ModuleProgressView />}
          challengeContent={<ModuleChallengeView onChallengeComplete={handleChallengeComplete} />}
          chatContent={<ModuleChatView />}
        />
      </div>
    </div>
  );
};

export default ModulesPage;

import { Button } from "@/components/ui/button";
import { moduleQuizzes } from "@/components/modules/moduleQuizData";
