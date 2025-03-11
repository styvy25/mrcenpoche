
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthDialog";
import { PDFGenerationOptions, generatePDF, checkAPIKeysConfigured } from "../services/pdfGenerationService";

export const usePDFGenerator = () => {
  const [selectedModule, setSelectedModule] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [userName, setUserName] = useState("");
  const [options, setOptions] = useState<PDFGenerationOptions>({
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
    if (isAuthenticated && !checkAPIKeysConfigured()) {
      setShowAPIKeyDialog(true);
    }
  }, [isAuthenticated]);

  const handleGeneratePDF = async () => {
    if (!selectedModule) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un module avant de générer un PDF.",
        variant: "destructive",
      });
      return;
    }

    // Vérifier les clés API
    if (!checkAPIKeysConfigured()) {
      setShowAPIKeyDialog(true);
      return;
    }

    setIsGenerating(true);
    toast({
      title: "Génération en cours",
      description: "Votre PDF est en cours de génération. Veuillez patienter...",
    });

    try {
      // Call the API service
      await generatePDF(selectedModule, options);
      
      setIsGenerating(false);
      setPdfGenerated(true);
      toast({
        title: "PDF généré avec succès",
        description: "Votre document a été généré et est prêt à être visualisé ou téléchargé.",
        variant: "default",
      });
    } catch (error) {
      setIsGenerating(false);
      toast({
        title: "Erreur de génération",
        description: "Une erreur s'est produite lors de la génération du PDF.",
        variant: "destructive",
      });
    }
  };

  return {
    selectedModule,
    setSelectedModule,
    isGenerating,
    setIsGenerating,
    showPreview,
    setShowPreview,
    pdfGenerated,
    setPdfGenerated,
    activeTab,
    setActiveTab,
    userName,
    setUserName,
    options,
    setOptions,
    showAPIKeyDialog,
    setShowAPIKeyDialog,
    handleGeneratePDF,
    isAuthenticated,
    user
  };
};
