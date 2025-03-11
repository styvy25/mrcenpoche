
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MODULE_PDF_URLS, MODULE_NAMES, downloadPDF, generatePDFFilename } from "./pdfUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Settings, BookOpen } from "lucide-react";
import ModuleSelector from "./ModuleSelector";
import PDFActions from "./PDFActions";
import PDFPreview from "./pdf-preview/PDFPreview";
import ModuleMetadata from "./module-selection/ModuleMetadata";
import ContentTab from "./pdf-content/ContentTab";
import OptionsTab from "./pdf-options/OptionsTab";

const PDFGenerator = () => {
  const [selectedModule, setSelectedModule] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [userName, setUserName] = useState("");
  const [options, setOptions] = useState({
    includeExercises: true,
    includeImages: true,
    includeSummary: true
  });
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
    const pdfUrl = MODULE_PDF_URLS[selectedModule as keyof typeof MODULE_PDF_URLS];
    
    toast({
      title: "Téléchargement en cours",
      description: "Votre PDF est en cours de téléchargement...",
    });

    const fileName = generatePDFFilename(
      MODULE_NAMES[selectedModule as keyof typeof MODULE_NAMES],
      userName.trim() || undefined
    );
    
    downloadPDF(pdfUrl, fileName);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-mrc-blue">Générateur de Supports PDF</CardTitle>
          <CardDescription>
            Créez des supports de formation personnalisés adaptés à vos besoins
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ModuleSelector 
            selectedModule={selectedModule} 
            setSelectedModule={setSelectedModule} 
          />
          
          {selectedModule && <ModuleMetadata selectedModule={selectedModule} />}
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Contenu
              </TabsTrigger>
              <TabsTrigger value="options" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Options
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="content">
              <ContentTab selectedModule={selectedModule} />
            </TabsContent>
            
            <TabsContent value="options">
              <OptionsTab 
                userName={userName}
                setUserName={setUserName}
                options={options}
                setOptions={setOptions}
              />
            </TabsContent>
          </Tabs>
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
