
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import PDFPreview from "../documents/pdf-preview/PDFPreview";
import ModuleHeader from "./ModuleHeader";
import ModuleInfo from "./ModuleInfo";
import ModuleOverview from "./ModuleOverview";
import ModuleLessonsList from "./ModuleLessonsList";
import ModuleLessonContent from "./ModuleLessonContent";
import ModuleCertificateDialog from "./detail/ModuleCertificateDialog";
import ModuleDetailFooter from "./detail/ModuleDetailFooter";
import { Module, Lesson } from "./types";

interface ModuleDetailProps {
  module: Module;
  onBack: () => void;
}

const ModuleDetail = ({ module, onBack }: ModuleDetailProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const { toast } = useToast();

  const handleLessonClick = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setActiveTab("content");
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

  return (
    <div className="space-y-6">
      <ModuleHeader module={module} onBack={onBack} />

      <Card>
        <CardContent>
          <ModuleInfo module={module} />
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="lessons">Leçons</TabsTrigger>
              <TabsTrigger value="content">Contenu</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <ModuleOverview module={module} onTakeQuiz={() => {}} />
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
                onMarkComplete={() => {}}
              />
            </TabsContent>
          </Tabs>
        </CardContent>

        <ModuleDetailFooter 
          module={module}
          onOpenPdf={handleOpenPdf}
          onOpenCertificate={handleOpenCertificateDialog}
        />
      </Card>

      {showPdfPreview && module.pdfUrl && (
        <PDFPreview 
          pdfUrl={module.pdfUrl} 
          onClose={() => setShowPdfPreview(false)} 
          moduleName={module.title} 
        />
      )}

      <ModuleCertificateDialog
        module={module}
        open={showCertificateDialog}
        onOpenChange={setShowCertificateDialog}
      />
    </div>
  );
};

export default ModuleDetail;
