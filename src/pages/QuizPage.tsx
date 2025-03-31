
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Medal, Smartphone, Info, Trophy, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import QuizContainer from "@/components/quiz/QuizContainer";
import BadgesDisplay from "@/components/quiz/BadgesDisplay";
import MatchesList from "@/components/quiz/matches/MatchesList";
import { Category } from "@/components/quiz/types";
import { culturalQuizData } from "@/components/quiz/culturalQuizData";
import PremiumQuizFeatures from "@/components/premium/PremiumQuizFeatures";
import { motion } from "framer-motion";
import { useSubscription } from "@/hooks/useSubscription";
import "../quiz.css";

const QuizPage = () => {
  const [activeTab, setActiveTab] = useState("quiz");
  const [isLoading, setIsLoading] = useState(true);
  const { isPremium } = useSubscription();

  // Convert culturalQuizData.categories to match Category interface
  const categories: Category[] = culturalQuizData.categories.map((category: any) => ({
    id: category.id,
    name: category.name,
    badge: category.badge || "", // Add default values for required fields
    color: category.color || "",
    icon: category.icon || "",
    description: category.description || "",
    label: category.name,
    questions: culturalQuizData.quizQuestions?.filter((q: any) => q.category === category.id) || []
  }));

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mrc-blue/5 to-mrc-yellow/10">
      <main className="container mx-auto px-4 py-10 pt-24">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-mrc-blue gradient-text">Quiz Culturel Camerounais</h1>
          <p className="text-gray-600 mt-2">Testez vos connaissances et affrontez d'autres membres</p>
          
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <Badge className="bg-mrc-green text-white">Culture</Badge>
            <Badge className="bg-mrc-red text-white">Histoire</Badge>
            <Badge className="bg-mrc-yellow text-mrc-dark">Traditions</Badge>
            <Badge className="bg-purple-500 text-white">Épreuve Test</Badge>
            <Badge className="bg-blue-500 text-white flex items-center gap-1">
              <Smartphone size={12} />
              <span>Optimisé Mobile</span>
            </Badge>
          </div>
          
          {!isPremium && (
            <motion.div 
              className="max-w-md mx-auto mt-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <PremiumQuizFeatures variant="compact" />
            </motion.div>
          )}
          
          <motion.div 
            className="max-w-md mx-auto mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800 flex items-start gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-left">
              <span className="font-bold">Nouveau:</span> Affrontez vos amis dans des matchs d'incollables sur le MRC et la politique camerounaise. Invitez directement via WhatsApp!
            </p>
          </motion.div>
        </motion.div>

        <Tabs 
          defaultValue="quiz" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <TabsList className="grid grid-cols-3 w-full mb-8">
              <TabsTrigger value="quiz" className="flex items-center gap-2 data-[state=active]:bg-mrc-blue data-[state=active]:text-white">
                <Book className="h-4 w-4" />
                Quiz
              </TabsTrigger>
              <TabsTrigger value="matches" className="flex items-center gap-2 data-[state=active]:bg-mrc-blue data-[state=active]:text-white">
                <Trophy className="h-4 w-4" />
                Matchs
              </TabsTrigger>
              <TabsTrigger value="badges" className="flex items-center gap-2 data-[state=active]:bg-mrc-blue data-[state=active]:text-white">
                <Medal className="h-4 w-4" />
                Mes Badges
              </TabsTrigger>
            </TabsList>
          </motion.div>
          
          <TabsContent value="quiz" className="p-1">
            {isLoading ? (
              <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg animate-pulse flex flex-col items-center justify-center" style={{ height: "400px" }}>
                <Trophy className="h-12 w-12 text-mrc-blue/30 mb-4" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="space-y-3 w-full">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded w-full"></div>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <QuizContainer categories={categories} />
                </motion.div>
                
                {!isPremium && (
                  <motion.div 
                    variants={itemVariants}
                    className="mt-8"
                  >
                    <PremiumQuizFeatures variant="full" />
                  </motion.div>
                )}
              </motion.div>
            )}
          </TabsContent>
          
          <TabsContent value="matches" className="p-1">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <MatchesList />
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="badges" className="p-1">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <BadgesDisplay badges={[]} />
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default QuizPage;
