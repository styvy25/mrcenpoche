
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import PDFPreview from "./PDFPreview";
import ModuleSelector from "./ModuleSelector";
import PDFContent from "./PDFContent";
import PDFActions from "./PDFActions";
import { MODULE_PDF_URLS, MODULE_NAMES, MODULE_DESCRIPTIONS, checkIsMobile, downloadPDF } from "./pdfUtils";

const PDFGenerator = () => {
  const [selectedModule, setSelectedModule] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const { toast } = useToast();

  const handleGeneratePDF = () => {
    if (!selectedModule) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un module avant de générer un PDF.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    toast({
      title: "Génération en cours",
      description: "Votre PDF est en cours de génération. Veuillez patienter...",
    });

    // Simulate PDF generation
    setTimeout(() => {
      setIsGenerating(false);
      setPdfGenerated(true);
      toast({
        title: "PDF généré avec succès",
        description: "Votre document a été généré et est prêt à être visualisé ou téléchargé.",
        variant: "default",
      });
    }, 3000);
  };

  const handlePreviewPDF = () => {
    setShowPreview(true);
  };

  const handleDownloadPDF = () => {
    const isMobile = checkIsMobile();
    const pdfUrl = MODULE_PDF_URLS[selectedModule as keyof typeof MODULE_PDF_URLS];
    
    toast({
      title: "Téléchargement en cours",
      description: "Votre PDF est en cours de téléchargement...",
    });

    const fileName = `MRC-Support-${MODULE_NAMES[selectedModule as keyof typeof MODULE_NAMES].replace(/\s+/g, '-')}.pdf`;
    downloadPDF(pdfUrl, fileName);
    
    if (isMobile) {
      toast({
        title: "Téléchargement sur mobile",
        description: "Utilisez l'option 'Télécharger' de votre navigateur après l'ouverture du PDF.",
      });
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-mrc-blue">Générateur de Supports PDF</CardTitle>
          <CardDescription>
            Créez des supports de formation personnalisés à partir des modules que vous avez suivis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ModuleSelector 
            selectedModule={selectedModule} 
            setSelectedModule={setSelectedModule} 
          />
          
          {selectedModule && (
            <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20 mb-4">
              <h3 className="text-sm font-medium text-mrc-blue mb-2">À propos de ce module</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {MODULE_DESCRIPTIONS[selectedModule as keyof typeof MODULE_DESCRIPTIONS]}
              </p>
            </div>
          )}
          
          <PDFContent />
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 w-full">
          <PDFActions 
            isGenerating={isGenerating}
            pdfGenerated={pdfGenerated}
            selectedModule={selectedModule}
            handleGeneratePDF={handleGeneratePDF}
            handlePreviewPDF={handlePreviewPDF}
            handleDownloadPDF={handleDownloadPDF}
          />
        </CardFooter>
      </Card>

      {showPreview && (
        <PDFPreview 
          pdfUrl={MODULE_PDF_URLS[selectedModule as keyof typeof MODULE_PDF_URLS]} 
          onClose={() => setShowPreview(false)} 
          moduleName={MODULE_NAMES[selectedModule as keyof typeof MODULE_NAMES]} 
        />
      )}
    </>
  );
};

export default PDFGenerator;
