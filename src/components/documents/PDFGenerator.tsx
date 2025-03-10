
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Download, FileText, CheckCircle, Eye } from "lucide-react";
import PDFPreview from "./PDFPreview";

// Simulate PDF URLs for each module
const MODULE_PDF_URLS = {
  histoire: "https://www.africau.edu/images/default/sample.pdf",
  mobilisation: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  communication: "https://www.orimi.com/pdf-test.pdf",
  enjeux: "https://www.africau.edu/images/default/sample.pdf",
  campagne: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
};

const MODULE_NAMES = {
  histoire: "Histoire et Valeurs du MRC",
  mobilisation: "Techniques de Mobilisation",
  communication: "Communication Politique",
  enjeux: "Enjeux Politiques au Cameroun",
  campagne: "Organisation de Campagne"
};

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
    // Check if it's a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const pdfUrl = MODULE_PDF_URLS[selectedModule as keyof typeof MODULE_PDF_URLS];
    
    toast({
      title: "Téléchargement en cours",
      description: "Votre PDF est en cours de téléchargement...",
    });

    // Create an invisible link element
    const link = document.createElement('a');
    link.href = pdfUrl;
    
    // Set download attribute for desktop browsers
    if (!isMobile) {
      link.setAttribute('download', `MRC-Support-${MODULE_NAMES[selectedModule as keyof typeof MODULE_NAMES].replace(/\s+/g, '-')}.pdf`);
    } else {
      // For mobile, open in a new tab which will usually trigger the browser's built-in PDF viewer
      link.setAttribute('target', '_blank');
      
      toast({
        title: "Téléchargement sur mobile",
        description: "Utilisez l'option 'Télécharger' de votre navigateur après l'ouverture du PDF.",
      });
    }
    
    // Trigger click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <div className="space-y-2">
            <label htmlFor="module-select" className="text-sm font-medium">
              Sélectionnez un module
            </label>
            <Select value={selectedModule} onValueChange={setSelectedModule}>
              <SelectTrigger id="module-select" className="w-full">
                <SelectValue placeholder="Choisir un module" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="histoire">Histoire et Valeurs du MRC</SelectItem>
                <SelectItem value="mobilisation">Techniques de Mobilisation</SelectItem>
                <SelectItem value="communication">Communication Politique</SelectItem>
                <SelectItem value="enjeux">Enjeux Politiques au Cameroun</SelectItem>
                <SelectItem value="campagne">Organisation de Campagne</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 className="font-medium mb-2 flex items-center">
              <FileText className="h-4 w-4 mr-2 text-mrc-blue" />
              Contenu du document
            </h3>
            <ul className="text-sm space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span>Présentation complète du module</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span>Points clés et résumés des leçons</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span>Exercices pratiques et questionnaires</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span>Ressources supplémentaires et bibliographie</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span>Certificat de suivi du module (si complété)</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 w-full">
          {!pdfGenerated ? (
            <Button 
              onClick={handleGeneratePDF} 
              disabled={isGenerating || !selectedModule}
              className="w-full bg-mrc-blue hover:bg-blue-700"
            >
              {isGenerating ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Génération en cours...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Générer le PDF
                </>
              )}
            </Button>
          ) : (
            <>
              <Button 
                onClick={handlePreviewPDF} 
                className="w-full sm:w-1/2 bg-mrc-blue hover:bg-blue-700"
              >
                <Eye className="mr-2 h-4 w-4" />
                Aperçu
              </Button>
              <Button 
                onClick={handleDownloadPDF} 
                className="w-full sm:w-1/2 border-mrc-blue text-mrc-blue hover:bg-mrc-blue/10"
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
            </>
          )}
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
