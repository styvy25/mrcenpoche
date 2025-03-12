
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Lesson } from "../types";

export function useModuleDetail() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const { toast } = useToast();

  const handleLessonClick = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setActiveTab("content");
  };

  const handleOpenPdf = (isPdfAvailable: boolean, pdfUrl: string | undefined) => {
    if (isPdfAvailable) {
      if (pdfUrl) {
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

  const handleOpenCertificateDialog = (isCompleted: boolean) => {
    if (isCompleted) {
      setShowCertificateDialog(true);
    } else {
      toast({
        title: "Module non terminé",
        description: "Vous devez terminer ce module pour obtenir un certificat.",
        variant: "destructive",
      });
    }
  };

  return {
    activeTab,
    setActiveTab,
    activeLesson,
    showPdfPreview,
    setShowPdfPreview,
    showCertificateDialog,
    setShowCertificateDialog,
    handleLessonClick,
    handleOpenPdf,
    handleOpenCertificateDialog
  };
}
