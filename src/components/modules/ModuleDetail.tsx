
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PDFPreview from "../documents/PDFPreview";
import ModuleHeader from "./ModuleHeader";
import ModuleInfo from "./ModuleInfo";
import ModuleOverview from "./ModuleOverview";
import ModuleLessonsList from "./ModuleLessonsList";
import ModuleLessonContent from "./ModuleLessonContent";
import { Module, Lesson } from "./types";

interface ModuleDetailProps {
  module: Module;
  onBack: () => void;
}

const ModuleDetail = ({ module, onBack }: ModuleDetailProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLessonClick = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setActiveTab("content");
  };

  const handleTakeQuiz = () => {
    if (module.quizLink) {
      navigate(module.quizLink);
    }
  };
  
  const handleMarkLessonComplete = (lessonId: number) => {
    toast({
      title: "Leçon terminée",
      description: "Votre progression a été enregistrée.",
    });
    // Dans une vraie application, nous mettrions à jour l'état ou enverrions une requête à l'API
  };
  
  const handleOpenPdf = () => {
    if (module.isPdfAvailable) {
      if (module.pdfUrl) {
        setShowPdfPreview(true);
      } else {
        toast({
          title: "PDF non disponible",
          description: "Le PDF pour ce module n'est pas encore disponible.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <ModuleHeader module={module} onBack={onBack} />

      <Card>
        <CardHeader className="pb-2">
          <ModuleInfo module={module} />
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="lessons">Leçons</TabsTrigger>
              <TabsTrigger value="content">Contenu</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <ModuleOverview module={module} onTakeQuiz={handleTakeQuiz} />
            </TabsContent>
            
            <TabsContent value="lessons" className="pt-4">
              <ModuleLessonsList 
                lessons={module.lessons} 
                onLessonClick={handleLessonClick}
              />
            </TabsContent>
            
            <TabsContent value="content" className="pt-4">
              <ModuleLessonContent 
                activeLesson={activeLesson}
                onMarkComplete={handleMarkLessonComplete}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              toast({
                title: module.isCompleted ? "Module déjà terminé" : "Module marqué comme terminé",
                description: module.isCompleted ? "Vous avez déjà terminé ce module." : "Votre progression a été enregistrée.",
              });
            }}
            disabled={module.isCompleted}
          >
            <BookOpen className="h-4 w-4 mr-1" />
            {module.isCompleted ? "Terminé" : "Marquer comme terminé"}
          </Button>
          
          {module.isPdfAvailable && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleOpenPdf}
            >
              <Download className="h-4 w-4 mr-1" />
              Support PDF
            </Button>
          )}
        </CardFooter>
      </Card>

      {showPdfPreview && module.pdfUrl && (
        <PDFPreview 
          pdfUrl={module.pdfUrl} 
          onClose={() => setShowPdfPreview(false)} 
          moduleName={module.title} 
        />
      )}
    </div>
  );
};

export default ModuleDetail;
