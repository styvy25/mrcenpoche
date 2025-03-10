
import { useState } from "react";
import ModuleProgress from "@/components/modules/ModuleProgress";
import UpcomingEventsWidget from "@/components/challenge/UpcomingEventsWidget";
import DailyChallenge from "@/components/challenge/DailyChallenge";
import CoursesGrid from "@/components/modules/CoursesGrid";
import ModulesWelcome from "./ModulesWelcome";
import ModulesTrainingPath from "./ModulesTrainingPath";
import ModuleCategoryTabs from "./ModuleCategoryTabs";
import ModuleActionButtons from "./ModuleActionButtons";
import QuizGrid from "./QuizGrid";
import ModulesHelp from "./ModulesHelp";
import { BookOpen } from "lucide-react";

interface ModulesHomeViewProps {
  onChallengeClick: () => void;
  onChatClick: () => void;
  onStartQuiz: (moduleId: string) => void;
  onChallengeComplete: () => void;
}

const ModulesHomeView = ({ 
  onChallengeClick, 
  onChatClick, 
  onStartQuiz,
  onChallengeComplete 
}: ModulesHomeViewProps) => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <>
      <ModulesWelcome />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ModuleProgress 
            totalModules={5}
            completedModules={1}
            totalLessons={20}
            completedLessons={7}
            totalTime="5h 15m"
            rank="Sympathisant"
          />
        </div>
        <div>
          <UpcomingEventsWidget />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
        <div className="lg:col-span-2">
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
        <div>
          <DailyChallenge onComplete={onChallengeComplete} />
        </div>
      </div>
      
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Tous les modules
        </h2>
        <ModuleActionButtons 
          onChallengeClick={onChallengeClick} 
          onChatClick={onChatClick} 
        />
      </div>
      
      <ModuleCategoryTabs 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />
      
      <CoursesGrid />
      
      <QuizGrid onStartQuiz={onStartQuiz} />
      
      <ModulesHelp />
    </>
  );
};

export default ModulesHomeView;
