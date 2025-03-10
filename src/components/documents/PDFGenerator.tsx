
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Download, FileText, CheckCircle } from "lucide-react";

const PDFGenerator = () => {
  const [selectedModule, setSelectedModule] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
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
      toast({
        title: "PDF généré avec succès",
        description: "Votre document a été généré et est prêt à être téléchargé.",
        variant: "default",
      });
    }, 3000);
  };

  return (
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
      <CardFooter>
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
              Générer et télécharger le PDF
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PDFGenerator;
