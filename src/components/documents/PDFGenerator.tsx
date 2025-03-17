
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Crown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { usePlanLimits } from "@/hooks/usePlanLimits";
import PremiumDialog from "@/components/premium/PremiumDialog";
import PremiumBanner from "@/components/premium/PremiumBanner";

interface PDFGeneratorProps {
  onGenerate: () => void;
  isGenerating: boolean;
  isGenerateEnabled: boolean;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ 
  onGenerate, 
  isGenerating,
  isGenerateEnabled 
}) => {
  const { toast } = useToast();
  const { canGeneratePdf, incrementPdfGenerations, userPlan } = usePlanLimits();
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);

  const handleGeneratePDF = () => {
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
  };

  return (
    <div className="space-y-4">
      {userPlan === 'free' && (
        <PremiumBanner type="pdf" />
      )}
      
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Générer votre document</h3>
        
        <Button
          onClick={handleGeneratePDF}
          disabled={isGenerating || !isGenerateEnabled}
          className="gap-2"
        >
          {isGenerating ? (
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
          ) : (
            <FileText className="h-4 w-4" />
          )}
          Générer le PDF
        </Button>
      </div>
      
      <PremiumDialog 
        isOpen={isPremiumDialogOpen} 
        onClose={() => setIsPremiumDialogOpen(false)} 
      />
    </div>
  );
};

export default PDFGenerator;
