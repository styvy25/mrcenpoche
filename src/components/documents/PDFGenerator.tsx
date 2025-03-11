
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import PDFPreview from "./pdf-preview/PDFPreview";
import ModuleSelector from "./ModuleSelector";
import PDFContent from "./PDFContent";
import PDFActions from "./PDFActions";
import { MODULE_PDF_URLS, MODULE_NAMES, MODULE_DESCRIPTIONS, MODULE_CONTENT, downloadPDF, generatePDFFilename, getModuleContent } from "./pdfUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Settings, BookOpen } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

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

  const moduleContent = selectedModule ? getModuleContent(selectedModule) : [];

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
          
          {selectedModule && (
            <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20 mb-4">
              <h3 className="text-sm font-medium text-mrc-blue mb-2">À propos de ce module</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {MODULE_DESCRIPTIONS[selectedModule as keyof typeof MODULE_DESCRIPTIONS]}
              </p>
            </div>
          )}
          
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
            
            <TabsContent value="content" className="space-y-4">
              {selectedModule ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Sections incluses dans le document</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto p-2">
                    {moduleContent.map((section, index) => (
                      <div key={index} className="border rounded-md p-3 bg-white dark:bg-gray-800">
                        <h4 className="font-medium text-mrc-blue">{section.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <PDFContent />
              )}
            </TabsContent>
            
            <TabsContent value="options" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="user-name" className="text-sm font-medium block mb-2">
                    Nom du destinataire
                  </label>
                  <Input 
                    id="user-name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Entrez votre nom (optionnel)"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ce nom sera inclus dans le titre du document
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium block">
                    Options du document
                  </label>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="include-exercises" 
                      checked={options.includeExercises}
                      onCheckedChange={(checked) => 
                        setOptions(prev => ({...prev, includeExercises: checked as boolean}))
                      }
                      className="mt-1"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="include-exercises"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Inclure les exercices pratiques
                      </label>
                      <p className="text-xs text-gray-500">
                        Ajoute des exercices pour mettre en pratique les concepts
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="include-images" 
                      checked={options.includeImages}
                      onCheckedChange={(checked) => 
                        setOptions(prev => ({...prev, includeImages: checked as boolean}))
                      }
                      className="mt-1"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="include-images"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Inclure les illustrations et schémas
                      </label>
                      <p className="text-xs text-gray-500">
                        Ajoute des visuels pour faciliter la compréhension
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="include-summary" 
                      checked={options.includeSummary}
                      onCheckedChange={(checked) => 
                        setOptions(prev => ({...prev, includeSummary: checked as boolean}))
                      }
                      className="mt-1"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="include-summary"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Inclure un résumé exécutif
                      </label>
                      <p className="text-xs text-gray-500">
                        Ajoute une synthèse des points clés à la fin du document
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
