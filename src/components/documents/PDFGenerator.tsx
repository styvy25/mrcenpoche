
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Download, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePlanLimits } from "@/hooks/usePlanLimits";
import PremiumDialog from "@/components/premium/PremiumDialog";
import PremiumBanner from "@/components/premium/PremiumBanner";
import { ModuleSelector } from './ModuleSelector';
import PDFActions from './PDFActions';
import { useScreenSize } from '@/hooks/useScreenSize';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface PDFGeneratorProps {
  onGenerate?: () => void;
  isGenerating?: boolean;
  isGenerateEnabled?: boolean;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ 
  onGenerate = () => {}, 
  isGenerating = false,
  isGenerateEnabled = true
}) => {
  const { toast } = useToast();
  const { canGeneratePdf, incrementPdfGenerations, userPlan } = usePlanLimits();
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState('');
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const { isMobile } = useScreenSize();

  const handleGeneratePDF = () => {
    if (!selectedModule) {
      toast({
        title: "Sélection requise",
        description: "Veuillez sélectionner un module avant de générer le PDF."
      });
      return;
    }
    
    if (!isGenerateEnabled) {
      toast({
        title: "Impossible de générer le PDF",
        description: "Veuillez remplir tous les champs obligatoires avant de générer le PDF."
      });
      return;
    }
    
    // Vérifier si l'utilisateur peut générer un PDF
    if (!canGeneratePdf()) {
      setIsPremiumDialogOpen(true);
      return;
    }
    
    // Incrémenter le compteur de PDF
    const canGenerate = incrementPdfGenerations();
    if (!canGenerate) return;
    
    onGenerate();
    setPdfGenerated(true);
    
    toast({
      title: "PDF généré avec succès",
      description: "Votre PDF a été généré et est prêt à être téléchargé."
    });
  };

  const handlePreviewPDF = () => {
    toast({
      title: "Aperçu du PDF",
      description: "Chargement de l'aperçu du PDF..."
    });
  };

  const handleDownloadPDF = () => {
    toast({
      title: "Téléchargement en cours",
      description: "Votre PDF est en cours de téléchargement..."
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
          <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          Générateur de PDF de formation
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Créez des documents PDF à partir du contenu de formation MRC
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {userPlan === 'free' && (
          <PremiumBanner type="pdf" />
        )}
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Sélectionnez un module</h3>
          <ModuleSelector onSelect={setSelectedModule} selected={selectedModule} />
        </div>
        
        <div className={`${isMobile ? 'space-y-2' : 'flex gap-2'} mt-4`}>
          <PDFActions 
            isGenerating={isGenerating}
            pdfGenerated={pdfGenerated}
            selectedModule={selectedModule}
            handleGeneratePDF={handleGeneratePDF}
            handlePreviewPDF={handlePreviewPDF}
            handleDownloadPDF={handleDownloadPDF}
          />
        </div>
      </CardContent>

      <PremiumDialog 
        isOpen={isPremiumDialogOpen} 
        onClose={() => setIsPremiumDialogOpen(false)} 
      />
    </Card>
  );
};

export default PDFGenerator;
