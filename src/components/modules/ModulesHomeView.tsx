
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import PageTransitionWrapper from "@/components/ui/page-transition-wrapper";
import { 
  BookOpen, Award, FileText, Lightbulb, 
  Settings, Bell, Video, Users, GraduationCap 
} from "lucide-react";

// Component imports
import ModuleProgress from "@/components/modules/ModuleProgress";
import UpcomingEventsWidget from "@/components/challenge/UpcomingEventsWidget";
import DailyChallenge from "@/components/challenge/DailyChallenge";
import CoursesGrid from "@/components/modules/CoursesGrid";
import ModulesWelcome from "./ModulesWelcome";
import ModuleActionButtons from "./ModuleActionButtons";
import QuizGrid from "./QuizGrid";
import ModulesHelp from "./ModulesHelp";
import ModuleCategoryTabs from "./ModuleCategoryTabs";
import ModulesFeaturedCard from "./ModulesFeaturedCard";

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
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const { toast } = useToast();
  
  const showAdminButton = () => {
    const userRole = localStorage.getItem("user_role");
    return userRole === "admin" || userRole === "superadmin";
  };

  useEffect(() => {
    // Animation delay for stats
    const timer = setTimeout(() => {
      setIsStatsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleNotification = () => {
    toast({
      title: "Notification activée",
      description: "Vous recevrez des notifications pour les nouveaux contenus",
      variant: "default",
    });
  };

  return (
    <PageTransitionWrapper>
      <div className="space-y-6">
        <ModulesWelcome />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <AnimatePresence>
              {isStatsVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ModuleProgress 
                    totalModules={5}
                    completedModules={1}
                    totalLessons={20}
                    completedLessons={7}
                    totalTime="5h 15m"
                    rank="Sympathisant"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div>
            <AnimatePresence>
              {isStatsVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <UpcomingEventsWidget />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ModulesFeaturedCard />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-mrc-blue" />
                Accès rapide aux formations
              </h2>
              
              {/* Training options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Link to="/modules/training">
                  <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02] h-full">
                    <div className="p-6 flex items-start">
                      <div className="bg-mrc-blue rounded-full p-3 h-14 w-14 flex items-center justify-center">
                        <Video className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-lg mb-1">Formation Immersive</h3>
                        <p className="text-gray-300 text-sm">Scénarios interactifs et simulations de situations politiques</p>
                      </div>
                    </div>
                    <div className="bg-blue-900/30 p-3 text-xs font-medium text-blue-300 flex justify-between">
                      <span>3 scénarios disponibles</span>
                      <span>Gagnez 50 XP par exercice</span>
                    </div>
                  </Card>
                </Link>
                
                <Link to="/modules/reunions">
                  <Card className="bg-gradient-to-br from-indigo-900 to-indigo-800 text-white overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02] h-full">
                    <div className="p-6 flex items-start">
                      <div className="bg-indigo-600 rounded-full p-3 h-14 w-14 flex items-center justify-center">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-lg mb-1">Réunions Virtuelles</h3>
                        <p className="text-gray-300 text-sm">Participez à des réunions et formations en ligne</p>
                      </div>
                    </div>
                    <div className="bg-indigo-900/50 p-3 text-xs font-medium text-indigo-300 flex justify-between">
                      <span>3 réunions à venir</span>
                      <span>Prochaine: 15 Sept. 18:00</span>
                    </div>
                  </Card>
                </Link>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Défi Quotidien</h2>
            </div>
            <DailyChallenge onComplete={onChallengeComplete} />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
              <GraduationCap className="mr-2 h-5 w-5 text-mrc-blue" />
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
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <QuizGrid onStartQuiz={onStartQuiz} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <ModulesHelp />
        </motion.div>
        
        {showAdminButton() && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
          >
            <Link to="/settings">
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                <Settings className="mr-2 h-4 w-4" />
                Paramètres Admin (Configuration API)
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </PageTransitionWrapper>
  );
};

export default ModulesHomeView;
