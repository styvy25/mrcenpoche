
import { Card, CardContent } from "@/components/ui/card";
import PDFPreview from "../documents/pdf-preview/PDFPreview";
import ModuleHeader from "./ModuleHeader";
import ModuleInfo from "./ModuleInfo";
import ModuleCertificateDialog from "./detail/ModuleCertificateDialog";
import ModuleDetailFooter from "./detail/ModuleDetailFooter";
import ModuleDetailTabs from "./detail/ModuleDetailTabs";
import { useModuleDetail } from "./hooks/useModuleDetail";
import { Module } from "./types";

interface ModuleDetailProps {
  module: Module;
  onBack: () => void;
}

const ModuleDetail = ({ module, onBack }: ModuleDetailProps) => {
  const {
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
  } = useModuleDetail();

  return (
    <div className="space-y-6">
      <ModuleHeader module={module} onBack={onBack} />

      <Card>
        <CardContent>
          <ModuleInfo module={module} />
          
          <ModuleDetailTabs
            module={module}
            activeTab={activeTab}
            activeLesson={activeLesson}
            setActiveTab={setActiveTab}
            onLessonClick={handleLessonClick}
          />
        </CardContent>

        <ModuleDetailFooter 
          module={module}
          onOpenPdf={() => handleOpenPdf(module.isPdfAvailable, module.pdfUrl)}
          onOpenCertificate={() => handleOpenCertificateDialog(module.isCompleted)}
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
