
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { Message } from "@/types/message";
import { useToast } from "@/hooks/use-toast";
import { generatePDF } from "./utils/pdfUtils";
import { Feature, usePlanLimits } from "@/hooks/usePlanLimits";

export interface PDFExportButtonProps {
  messages: Message[];
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const PDFExportButton: React.FC<PDFExportButtonProps> = ({ 
  messages, 
  size = "default",
  className = ""
}) => {
  const [isExporting, setIsExporting] = React.useState(false);
  const { toast } = useToast();
  const { hasFeatureAccess } = usePlanLimits();
  
  const handleExport = async () => {
    if (!hasFeatureAccess(Feature.PDF_EXPORT)) {
      toast({
        title: "Fonctionnalité premium",
        description: "L'exportation PDF est disponible avec un abonnement premium",
        variant: "destructive",
      });
      return;
    }
    
    if (messages.length === 0) {
      toast({
        title: "Aucun message à exporter",
        description: "Commencez une conversation avant d'exporter",
        variant: "destructive",
      });
      return;
    }
    
    setIsExporting(true);
    
    try {
      await generatePDF(messages);
      toast({
        title: "Exportation réussie",
        description: "Le fichier PDF a été téléchargé",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Erreur d'exportation",
        description: "Impossible de générer le PDF. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <Button
      onClick={handleExport}
      size={size}
      variant="ghost"
      className={className}
      disabled={isExporting}
    >
      {isExporting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {size !== "icon" && <span className="ml-2">Exporter PDF</span>}
    </Button>
  );
};

export default PDFExportButton;
