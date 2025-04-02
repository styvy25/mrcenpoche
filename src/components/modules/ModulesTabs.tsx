
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Award, MessageCircle, LightbulbIcon } from "lucide-react";

interface ModulesTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  modulesContent: ReactNode;
  progressContent: ReactNode;
  challengeContent: ReactNode;
  chatContent: ReactNode;
}

const ModulesTabs = ({
  activeTab,
  setActiveTab,
  modulesContent,
  progressContent,
  challengeContent,
  chatContent
}: ModulesTabsProps) => {
  const tabVariants = {
    inactive: { 
      opacity: 0.7,
      scale: 0.95,
      transition: { duration: 0.2 }
    },
    active: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-mrc-blue/10 to-purple-500/10 blur-xl"></div>
        <TabsList className="grid grid-cols-4 relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg p-1">
          <motion.div
            className="absolute h-full bg-gradient-to-r from-mrc-blue to-blue-500 dark:from-mrc-blue/80 dark:to-blue-500/80 rounded-lg shadow-lg"
            style={{
              width: '25%',
              left: activeTab === 'modules' ? '0%' : 
                   activeTab === 'progress' ? '25%' : 
                   activeTab === 'challenge' ? '50%' : '75%'
            }}
            animate={{ 
              left: activeTab === 'modules' ? '0%' : 
                    activeTab === 'progress' ? '25%' : 
                    activeTab === 'challenge' ? '50%' : '75%' 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          
          <TabsTrigger 
            value="modules" 
            className="relative z-10 flex items-center gap-1 data-[state=active]:text-white"
          >
            <motion.div
              variants={tabVariants}
              animate={activeTab === 'modules' ? 'active' : 'inactive'}
              className="flex items-center gap-1"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Modules</span>
            </motion.div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="progress" 
            className="relative z-10 flex items-center gap-1 data-[state=active]:text-white"
          >
            <motion.div
              variants={tabVariants}
              animate={activeTab === 'progress' ? 'active' : 'inactive'}
              className="flex items-center gap-1"
            >
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Progression</span>
            </motion.div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="challenge" 
            className="relative z-10 flex items-center gap-1 data-[state=active]:text-white"
          >
            <motion.div
              variants={tabVariants}
              animate={activeTab === 'challenge' ? 'active' : 'inactive'}
              className="flex items-center gap-1"
            >
              <LightbulbIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Défi quotidien</span>
            </motion.div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="chat" 
            className="relative z-10 flex items-center gap-1 data-[state=active]:text-white"
          >
            <motion.div
              variants={tabVariants}
              animate={activeTab === 'chat' ? 'active' : 'inactive'}
              className="flex items-center gap-1"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Discussion</span>
            </motion.div>
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="modules" className="pt-4 focus-visible:outline-none focus-visible:ring-0">
        {modulesContent}
      </TabsContent>
      
      <TabsContent value="progress" className="pt-4 focus-visible:outline-none focus-visible:ring-0">
        {progressContent}
      </TabsContent>
      
      <TabsContent value="challenge" className="pt-4 focus-visible:outline-none focus-visible:ring-0">
        {challengeContent}
      </TabsContent>
      
      <TabsContent value="chat" className="pt-4 focus-visible:outline-none focus-visible:ring-0">
        {chatContent}
      </TabsContent>
    </Tabs>
  );
};

export default ModulesTabs;
