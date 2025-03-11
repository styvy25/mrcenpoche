
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MODULE_PDF_URLS, MODULE_NAMES, downloadPDF, generatePDFFilename } from "./pdfUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Settings, BookOpen, Loader2, AlertTriangle } from "lucide-react";
import ModuleSelector from "./ModuleSelector";
import PDFActions from "./PDFActions";
import PDFPreview from "./pdf-preview/PDFPreview";
import ModuleMetadata from "./module-selection/ModuleMetadata";
import ContentTab from "./pdf-content/ContentTab";
import OptionsTab from "./pdf-options/OptionsTab";
import { useAuth } from "@/components/auth/AuthDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/custom-dialog";

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
  const [showAPIKeyDialog, setShowAPIKeyDialog] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();

  // Appliquer automatiquement le nom d'utilisateur s'il est connecté
  useEffect(() => {
    if (isAuthenticated && user) {
      setUserName(user.username);
    }
  }, [isAuthenticated, user]);

  // Vérifier si les clés API sont définies
  useEffect(() => {
    const apiKeys = localStorage.getItem("api_keys");
    if (isAuthenticated && (!apiKeys || !JSON.parse(apiKeys).perplexity)) {
      setShowAPIKeyDialog(true);
    }
  }, [isAuthenticated]);

  const handleGeneratePDF = () => {
    if (!selectedModule) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un module avant de générer un PDF.",
        variant: "destructive",
      });
      return;
    }

    // Vérifier les clés API
    const apiKeys = localStorage.getItem("api_keys");
    if (!apiKeys || !JSON.parse(apiKeys).perplexity) {
      setShowAPIKeyDialog(true);
      return;
    }

    setIsGenerating(true);
    toast({
      title: "Génération en cours",
      description: "Votre PDF est en cours de génération. Veuillez patienter...",
    });

    // Simuler la génération avec l'API de Perplexity
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

  if (!isAuthenticated) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-mrc-blue">Générateur de Supports PDF</CardTitle>
          <CardDescription>
            Vous devez être connecté pour utiliser cette fonctionnalité
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-8">
          <AlertTriangle className="text-yellow-500 h-16 w-16 mb-4" />
        </CardContent>
      </Card>
    );
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

      <Dialog open={showAPIKeyDialog} onOpenChange={setShowAPIKeyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clés API requises</DialogTitle>
            <DialogDescription>
              Pour générer des PDF avec l'IA, vous devez configurer vos clés API
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Veuillez configurer vos clés API YouTube et Perplexity dans les paramètres pour utiliser toutes les fonctionnalités.
          </p>
          <DialogFooter>
            <Button onClick={() => setShowAPIKeyDialog(false)}>
              Compris
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PDFGenerator;
