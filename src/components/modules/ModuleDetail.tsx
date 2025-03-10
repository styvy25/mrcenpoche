
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, Check, Download, PlayCircle, Lock, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PDFPreview from "../documents/PDFPreview";

interface Lesson {
  id: number;
  title: string;
  duration: string;
  isCompleted: boolean;
  videoUrl?: string;
  content?: string;
  isLocked?: boolean;
}

interface Module {
  id: number;
  title: string;
  description: string;
  progress: number;
  duration: string;
  level: "Débutant" | "Intermédiaire" | "Avancé";
  isPdfAvailable: boolean;
  isCompleted: boolean;
  overview: string;
  lessons: Lesson[];
  quizLink?: string;
  pdfUrl?: string;
}

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
    if (lesson.isLocked) {
      toast({
        title: "Contenu verrouillé",
        description: "Veuillez compléter les leçons précédentes pour débloquer ce contenu.",
        variant: "destructive",
      });
      return;
    }
    
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
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour
        </Button>
        <h2 className="text-2xl font-bold">{module.title}</h2>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs rounded ${
                module.level === "Débutant" ? "bg-green-100 text-green-800" :
                module.level === "Intermédiaire" ? "bg-blue-100 text-blue-800" :
                "bg-red-100 text-red-800"
              }`}>
                {module.level}
              </span>
              <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
                {module.duration}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-1">
            <div className="flex justify-between text-sm">
              <span>Progression</span>
              <span>{module.progress}%</span>
            </div>
            <Progress value={module.progress} className="h-2" />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="lessons">Leçons</TabsTrigger>
              <TabsTrigger value="content">Contenu</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-4">
              <div className="prose prose-sm max-w-none">
                <p>{module.overview}</p>
              </div>
              {module.quizLink && (
                <div className="mt-4">
                  <Button onClick={handleTakeQuiz} className="w-full bg-mrc-blue">
                    Passer le quiz
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="lessons" className="pt-4">
              <div className="space-y-2">
                {module.lessons.map((lesson) => (
                  <div 
                    key={lesson.id}
                    onClick={() => handleLessonClick(lesson)}
                    className={`p-3 border rounded-lg hover:bg-gray-50 cursor-pointer flex justify-between items-center ${lesson.isLocked ? 'opacity-70' : ''}`}
                  >
                    <div className="flex items-center">
                      {lesson.isLocked ? (
                        <Lock className="h-4 w-4 mr-2 text-gray-400" />
                      ) : (
                        <PlayCircle className="h-4 w-4 mr-2 text-mrc-blue" />
                      )}
                      <span>{lesson.title}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-gray-500">{lesson.duration}</span>
                      {lesson.isCompleted ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="pt-4">
              {activeLesson ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{activeLesson.title}</h3>
                  {activeLesson.videoUrl ? (
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={activeLesson.videoUrl}
                        title={activeLesson.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Vidéo non disponible</p>
                    </div>
                  )}
                  <div className="prose prose-sm max-w-none">
                    {activeLesson.content ? (
                      <p>{activeLesson.content}</p>
                    ) : (
                      <p>Contenu de la leçon {activeLesson.title}...</p>
                    )}
                  </div>
                  
                  <Button
                    onClick={() => handleMarkLessonComplete(activeLesson.id)}
                    disabled={activeLesson.isCompleted}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {activeLesson.isCompleted ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Terminé
                      </>
                    ) : (
                      "Marquer comme terminé"
                    )}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 mx-auto text-gray-300" />
                  <p className="mt-2 text-gray-500">Sélectionnez une leçon pour voir son contenu</p>
                </div>
              )}
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

      {/* Aperçu PDF */}
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
