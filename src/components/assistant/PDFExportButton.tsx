
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { Message } from "@/types/message";
import { useToast } from "@/hooks/use-toast";
import { Feature, usePlanLimits } from "@/hooks/usePlanLimits";
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAuth } from '@/hooks/useAuth';

export interface PDFExportButtonProps {
  messages: Message[];
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

// Function to generate and download PDF from messages
const generatePDF = async (messages: Message[], userId?: string): Promise<void> => {
  const doc = new jsPDF.default();
  
  // Add title
  doc.setFontSize(20);
  doc.text("Rapport de conversation MRC", 105, 15, { align: 'center' });
  
  // Add date
  doc.setFontSize(12);
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 105, 25, { align: 'center' });
  
  // Define table data
  const tableData = messages.map(msg => [
    msg.sender === 'user' ? 'Vous' : 'Assistant MRC',
    msg.content,
    new Date(msg.timestamp).toLocaleString('fr-FR')
  ]);
  
  // Add table
  autoTable(doc, {
    head: [['Auteur', 'Message', 'Heure']],
    body: tableData,
    startY: 35,
    headStyles: { fillColor: [75, 93, 255] },
    alternateRowStyles: { fillColor: [240, 240, 240] },
    styles: { 
      overflow: 'linebreak',
      font: 'helvetica',
      fontSize: 10
    },
    columnStyles: {
      0: { cellWidth: 30 }, 
      1: { cellWidth: 'auto' },
      2: { cellWidth: 40 }
    }
  });
  
  // Save the PDF
  doc.save(`conversation-mrc-${new Date().toISOString().split('T')[0]}.pdf`);
};

const PDFExportButton: React.FC<PDFExportButtonProps> = ({ 
  messages, 
  size = "default",
  className = ""
}) => {
  const [isExporting, setIsExporting] = React.useState(false);
  const { toast } = useToast();
  const { hasFeatureAccess, incrementPdfGenerations, canGeneratePdf } = usePlanLimits();
  const { currentUser } = useAuth();
  
  const handleExport = async () => {
    if (!currentUser) {
      toast({
        title: "Authentification requise",
        description: "Veuillez vous connecter pour exporter des PDF",
        variant: "destructive",
      });
      return;
    }
    
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
      // Vérifier si l'utilisateur peut générer un PDF
      const canGenerate = await canGeneratePdf();
      if (!canGenerate) {
        toast({
          title: "Limite atteinte",
          description: "Vous avez atteint votre limite d'exportations PDF. Passez à Premium pour plus.",
          variant: "destructive",
        });
        return;
      }
      
      // Générer le PDF
      await generatePDF(messages, currentUser.id);
      
      // Incrémenter le compteur de PDF
      await incrementPdfGenerations();
      
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
