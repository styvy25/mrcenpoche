
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, BookOpen, Users, UserPlus, Rocket, Trophy, Clock } from "lucide-react";
import CoursesGrid from "./CoursesGrid";
import ModulesWelcome from "./ModulesWelcome";
import ModulesTabs from "./ModulesTabs";
import ModulesTrainingPath from "./ModulesTrainingPath";
import ModulesHelp from "./ModulesHelp";
import { useToast } from "@/hooks/use-toast";
import moduleData from "./data/moduleData";

interface ModulesHomeViewProps {
  onChallengeClick: () => void;
  onChatClick: () => void;
  onStartQuiz: (moduleId: string) => void;
  onChallengeComplete: () => void;
}

const ModulesHomeView: React.FC<ModulesHomeViewProps> = ({
  onChallengeClick,
  onChatClick,
  onStartQuiz,
  onChallengeComplete
}) => {
  const { toast } = useToast();
  
  const handleStartTraining = () => {
    toast({
      title: "Formation lancée",
      description: "Votre parcours de formation commence maintenant.",
    });
  };

  const handleQuickStart = () => {
    onStartQuiz("1");
    toast({
      title: "Quiz rapide",
      description: "Testez vos connaissances avec ce quiz rapide.",
    });
  };
  
  return (
    <div className="space-y-8">
      <ModulesWelcome />
      
      <ModulesTabs />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-mrc-blue" />
              Modules de formation
            </CardTitle>
            <CardDescription>
              Parcourez nos modules de formation pour approfondir vos connaissances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CoursesGrid modules={moduleData} onModuleClick={(module) => onStartQuiz(module.id)} />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={handleStartTraining}>
              <Clock className="h-4 w-4 mr-2" />
              Reprendre la formation
            </Button>
          </CardFooter>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-amber-500" />
                Défis quotidiens
              </CardTitle>
              <CardDescription>
                Relevez des défis pour gagner des points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Complétez des défis quotidiens pour améliorer vos compétences et gagner des récompenses.
              </p>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Quiz du jour</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">+50 pts</span>
                </div>
                <p className="text-xs text-muted-foreground">Répondez à 5 questions sur l'histoire du MRC</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={onChallengeClick} className="w-full">
                <Sparkles className="h-4 w-4 mr-2" />
                Voir les défis
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-indigo-500" />
                Communauté
              </CardTitle>
              <CardDescription>
                Interagissez avec d'autres membres
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-2">
                    <UserPlus className="h-4 w-4" />
                  </div>
                  <span className="text-sm">Groupe d'étude</span>
                </div>
                <span className="text-xs text-muted-foreground">12 membres</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-2">
                    <Rocket className="h-4 w-4" />
                  </div>
                  <span className="text-sm">Discussion politique</span>
                </div>
                <span className="text-xs text-muted-foreground">24 membres</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={onChatClick} className="w-full">
                Rejoindre une discussion
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Tabs defaultValue="training-path">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="training-path">Parcours d'apprentissage</TabsTrigger>
          <TabsTrigger value="help">Besoin d'aide ?</TabsTrigger>
        </TabsList>
        <TabsContent value="training-path" className="p-4 border rounded-md mt-2">
          <ModulesTrainingPath />
        </TabsContent>
        <TabsContent value="help" className="p-4 border rounded-md mt-2">
          <ModulesHelp />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModulesHomeView;
