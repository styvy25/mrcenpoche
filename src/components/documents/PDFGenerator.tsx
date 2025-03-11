
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Settings, BookOpen } from "lucide-react";
import ModuleSelector from "./ModuleSelector";
import PDFActions from "./PDFActions";
import PDFPreview from "./pdf-preview/PDFPreview";
import ModuleMetadata from "./module-selection/ModuleMetadata";
import ContentTab from "./pdf-content/ContentTab";
import OptionsTab from "./pdf-options/OptionsTab";
import APIKeyDialog from "./dialogs/APIKeyDialog";
import AuthenticationNotice from "./AuthenticationNotice";
import { MODULE_PDF_URLS, MODULE_NAMES } from "./pdfUtils";
import { usePDFGenerator } from "./hooks/usePDFGenerator";
import { generateAndDownloadPDF } from "./services/pdfGenerationService";

const PDFGenerator = () => {
  const {
    selectedModule,
    setSelectedModule,
    isGenerating,
    showPreview,
    setShowPreview,
    pdfGenerated,
    activeTab,
    setActiveTab,
    userName,
    setUserName,
    options,
    setOptions,
    showAPIKeyDialog,
    setShowAPIKeyDialog,
    handleGeneratePDF,
    isAuthenticated
  } = usePDFGenerator();

  const handlePreviewPDF = () => {
    setShowPreview(true);
  };

  const handleDownloadPDF = () => {
    generateAndDownloadPDF(selectedModule, userName, options);
  };

  if (!isAuthenticated) {
    return <AuthenticationNotice />;
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader className="pb-2">
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

      <APIKeyDialog 
        showDialog={showAPIKeyDialog} 
        onClose={() => setShowAPIKeyDialog(false)} 
      />
    </>
  );
};

export default PDFGenerator;
