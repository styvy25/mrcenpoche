
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Module } from "@/components/modules/types";

export function useModuleState() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("modules");
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [currentQuizModule, setCurrentQuizModule] = useState<number | null>(null); // Fix: Changed type from string to number|null
  const { toast } = useToast();

  const handleModuleSelect = (module: Module) => {
    setSelectedModule(module);
    setShowQuiz(false);
    setShowChat(false);
    setShowChallenge(false);
  };

  const handleBackToModules = () => {
    setSelectedModule(null);
    setShowQuiz(false);
  };

  const handleStartQuiz = (moduleId: number) => { // Fix: Changed type from string to number
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

  return {
    activeCategory,
    setActiveCategory,
    activeTab,
    setActiveTab,
    selectedModule,
    showChat,
    showQuiz,
    showChallenge,
    currentQuizModule,
    handleModuleSelect,
    handleBackToModules,
    handleStartQuiz,
    handleQuizComplete,
    handleChallengeComplete,
    handleChallengeClick,
    handleChatClick
  };
}
