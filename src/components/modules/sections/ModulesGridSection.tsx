
import { BookOpen } from "lucide-react";
import ModuleActionButtons from "@/components/modules/ModuleActionButtons";
import ModuleCategoryTabs from "@/components/modules/ModuleCategoryTabs";
import CoursesGrid from "@/components/modules/CoursesGrid";
import QuizGrid from "@/components/modules/QuizGrid";

interface ModulesGridSectionProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  onChallengeClick: () => void;
  onChatClick: () => void;
  onStartQuiz: (moduleId: number) => void; // Fix: Changed type from string to number
}

const ModulesGridSection = ({ 
  activeCategory, 
  setActiveCategory, 
  onChallengeClick, 
  onChatClick, 
  onStartQuiz 
}: ModulesGridSectionProps) => {
  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-mrc-blue" />
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
    </>
  );
};

export default ModulesGridSection;
