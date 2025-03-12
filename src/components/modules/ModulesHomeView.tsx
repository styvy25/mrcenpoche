
import { useState } from "react";
import ModulesWelcome from "./ModulesWelcome";
import ModulesHelp from "./ModulesHelp";
import ProgressGridSection from "./sections/ProgressGridSection";
import TrainingPathSection from "./sections/TrainingPathSection";
import DailyChallengeSection from "./sections/DailyChallengeSection";
import ModulesGridSection from "./sections/ModulesGridSection";

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
  
  const userRole = localStorage.getItem("user_role");

  return (
    <>
      <ModulesWelcome />
      
      <ProgressGridSection />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
        <TrainingPathSection userRole={userRole} />
        <DailyChallengeSection onChallengeComplete={onChallengeComplete} />
      </div>
      
      <ModulesGridSection 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onChallengeClick={onChallengeClick}
        onChatClick={onChatClick}
        onStartQuiz={onStartQuiz}
      />
      
      <ModulesHelp />
    </>
  );
};

export default ModulesHomeView;
