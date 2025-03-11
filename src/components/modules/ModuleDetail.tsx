
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Download, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PDFPreview from "../documents/pdf-preview/PDFPreview";
import ModuleHeader from "./ModuleHeader";
import ModuleInfo from "./ModuleInfo";
import ModuleOverview from "./ModuleOverview";
import ModuleLessonsList from "./ModuleLessonsList";
import ModuleLessonContent from "./ModuleLessonContent";
import { Module, Lesson } from "./types";
import { downloadCertificate } from "../documents/CertificateGenerator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ModuleDetailProps {
  module: Module;
  onBack: () => void;
}

const ModuleDetail = ({ module, onBack }: ModuleDetailProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [userName, setUserName] = useState("");
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

  const handleOpenCertificateDialog = () => {
    if (module.isCompleted) {
      setShowCertificateDialog(true);
    } else {
      toast({
        title: "Module non terminé",
        description: "Vous devez terminer ce module pour obtenir un certificat.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadCertificate = () => {
    downloadCertificate(module, userName || undefined);
    setShowCertificateDialog(false);
    toast({
      title: "Certificat téléchargé",
      description: "Votre certificat a été généré et téléchargé avec succès.",
    });
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
        <CardFooter className="flex flex-wrap gap-3 sm:flex-row justify-between">
          <div className="flex gap-2">
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
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleOpenCertificateDialog}
            className={module.isCompleted ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800" : ""}
          >
            <Award className="h-4 w-4 mr-1" />
            Certificat
          </Button>
        </CardFooter>
      </Card>

      {showPdfPreview && module.pdfUrl && (
        <PDFPreview 
          pdfUrl={module.pdfUrl} 
          onClose={() => setShowPdfPreview(false)} 
          moduleName={module.title} 
        />
      )}

      <Dialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Télécharger votre certificat</DialogTitle>
            <DialogDescription>
              Votre certificat sera personnalisé avec votre nom et les détails du module.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Votre nom
              </Label>
              <Input
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Entrez votre nom complet"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setShowCertificateDialog(false)}>
              Annuler
            </Button>
            <Button type="button" onClick={handleDownloadCertificate} className="bg-mrc-blue hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Télécharger
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModuleDetail;
