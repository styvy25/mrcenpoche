
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import CoursesGrid from "@/components/modules/CoursesGrid";
import ModuleDetail from "@/components/modules/ModuleDetail";
import ModuleQuiz from "@/components/modules/ModuleQuiz";
import UserChat from "@/components/chat/UserChat";
import DailyChallenge from "@/components/challenge/DailyChallenge";
import ModuleProgress from "@/components/modules/ModuleProgress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Award, ArrowUpRight, MessageCircle, LightbulbIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getModuleQuiz } from "@/components/modules/moduleQuizData";

// Module fictif pour la démonstration
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

    // Ici, vous pourriez mettre à jour la progression du module
  };

  const handleChallengeComplete = () => {
    setShowChallenge(false);
    toast({
      title: "Défi quotidien complété !",
      description: "Revenez demain pour un nouveau défi.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="modules" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Modules</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Progression</span>
            </TabsTrigger>
            <TabsTrigger value="challenge" className="flex items-center gap-1">
              <LightbulbIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Défi quotidien</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Discussion</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="modules" className="pt-4">
            {selectedModule ? (
              showQuiz ? (
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
              ) : (
                <ModuleDetail 
                  module={selectedModule} 
                  onBack={handleBackToModules} 
                />
              )
            ) : (
              <>
                <div className="text-center mb-10">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-2">
                    Modules de Formation
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Explorez nos modules de formation conçus pour vous aider à devenir un militant efficace et bien informé.
                  </p>
                </div>
                
                <ModuleProgress 
                  totalModules={5}
                  completedModules={1}
                  totalLessons={20}
                  completedLessons={7}
                  totalTime="5h 15m"
                  rank="Sympathisant"
                />
                
                <div className="my-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-mrc-blue" />
                    Parcours de formation
                  </h2>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <h3 className="font-medium text-lg mb-2">Parcours recommandé</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Suivez cette séquence de modules pour une formation optimale:
                        </p>
                        <ol className="space-y-2 list-decimal list-inside text-gray-700 dark:text-gray-300">
                          <li>Histoire et Valeurs du MRC</li>
                          <li>Techniques de Mobilisation</li>
                          <li>Communication Politique</li>
                          <li>Enjeux Politiques au Cameroun</li>
                          <li>Organisation de Campagne</li>
                        </ol>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-medium text-lg mb-2">Modules par niveau</h3>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <span className="w-24 text-sm">Sympathisant:</span>
                            <div className="ml-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full flex-grow">
                              <div className="h-2 bg-green-500 rounded-full" style={{ width: "100%" }}></div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="w-24 text-sm">Militant:</span>
                            <div className="ml-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full flex-grow">
                              <div className="h-2 bg-mrc-blue rounded-full" style={{ width: "35%" }}></div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="w-24 text-sm">Cadre:</span>
                            <div className="ml-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full flex-grow">
                              <div className="h-2 bg-mrc-red rounded-full" style={{ width: "0%" }}></div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="w-24 text-sm">Cadre Sup.:</span>
                            <div className="ml-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full flex-grow">
                              <div className="h-2 bg-purple-500 rounded-full" style={{ width: "0%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Tous les modules
                  </h2>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="hidden md:flex"
                      onClick={() => setShowChallenge(true)}
                    >
                      <LightbulbIcon className="h-4 w-4 mr-1" />
                      Défi du jour
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="hidden md:flex"
                      onClick={() => {
                        setShowChat(true);
                        setActiveTab("chat");
                      }}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Discussion
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
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-10">
                  {Object.entries(getModuleQuiz("mobilisation") ? moduleQuizzes : {}).map(([moduleId, quiz]) => (
                    <div key={moduleId} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                      <div className="p-4">
                        <h3 className="font-medium mb-2">{quiz.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{quiz.description}</p>
                        <Button 
                          className="w-full bg-mrc-blue text-white" 
                          onClick={() => handleStartQuiz(moduleId)}
                        >
                          Commencer le quiz
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
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
              </>
            )}
          </TabsContent>
          
          <TabsContent value="progress" className="pt-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-6">Votre progression</h2>
              <ModuleProgress 
                totalModules={5}
                completedModules={1}
                totalLessons={20}
                completedLessons={7}
                totalTime="5h 15m"
                rank="Sympathisant"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="challenge" className="pt-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-6">Défi quotidien</h2>
              <DailyChallenge onComplete={handleChallengeComplete} />
            </div>
          </TabsContent>
          
          <TabsContent value="chat" className="pt-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-6">Espace de discussion</h2>
              <UserChat />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ModulesPage;

// Importé de moduleQuizData.ts pour avoir accès aux données
import { moduleQuizzes } from "@/components/modules/moduleQuizData";
