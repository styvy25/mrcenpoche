
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";
import { PdfGenerationOptions } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const usePdfGenerator = () => {
  const { toast } = useToast();
  const { currentUser } = useAuth();

  /**
   * Génère un document PDF à partir de l'analyse vidéo
   */
  const generateAnalysisPDF = async (options: PdfGenerationOptions): Promise<string | null> => {
    const { videoId, title, analysis } = options;
    
    if (!currentUser) {
      toast({
        title: "Authentification requise",
        description: "Veuillez vous connecter pour générer des PDF",
        variant: "destructive",
      });
      return null;
    }
    
    try {
      // Vérifier si l'utilisateur peut générer un PDF via l'edge function
      const { data: optimizeData, error: optimizeError } = await supabase.functions.invoke(
        'optimize-pdf',
        {
          body: {
            userId: currentUser.id,
            content: {
              videoId,
              title,
              analysis
            },
            options: {
              templateId: null
            }
          }
        }
      );
      
      if (optimizeError || !optimizeData?.success) {
        toast({
          title: "Erreur d'autorisation",
          description: optimizeError?.message || optimizeData?.error || "Limite de génération atteinte",
          variant: "destructive",
        });
        return null;
      }
      
      // Créer un nouveau document PDF
      const doc = new jsPDF();
      
      // Ajouter le titre
      doc.setFontSize(22);
      doc.setTextColor(31, 87, 164); // MRC blue
      doc.text("Analyse Vidéo MRC", 105, 20, { align: "center" });
      
      // Ajouter le titre de la vidéo
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      const titleLines = doc.splitTextToSize(title, 180);
      doc.text(titleLines, 105, 35, { align: "center" });
      
      // Ajouter l'aperçu YouTube
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text("Vidéo YouTube:", 20, 55);
      doc.setTextColor(0, 0, 255);
      doc.textWithLink("Ouvrir la vidéo sur YouTube", 70, 55, {
        url: `https://www.youtube.com/watch?v=${videoId}`
      });

      // Ajouter la vignette vidéo si possible
      try {
        const img = new Image();
        img.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        doc.addImage(img, 'JPEG', 55, 60, 100, 60);
      } catch (error) {
        console.error("Could not add thumbnail:", error);
      }
      
      // Ajouter le contenu de l'analyse
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("Analyse détaillée:", 20, 130);
      
      // Formater le contenu de l'analyse
      const analysisLines = doc.splitTextToSize(analysis, 170);
      let yPosition = 140;
      
      // Ajouter un saut de ligne pour la lisibilité
      for (let i = 0; i < analysisLines.length; i++) {
        // Vérifier si nous avons besoin d'ajouter une nouvelle page
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Ajouter une ligne de texte
        doc.text(analysisLines[i], 20, yPosition);
        yPosition += 7; // Espacement des lignes
      }
      
      // Ajouter un pied de page
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(`Analyse MRC | Page ${i} sur ${pageCount}`, 105, 290, { align: "center" });
      }
      
      // Générer le blob PDF
      const pdfBlob = doc.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      
      // Store the PDF document reference in Supabase
      const { data: docData, error: docError } = await supabase
        .from('pdf_documents')
        .insert({
          title: `Analyse de "${title}"`,
          document_type: 'youtube_analysis',
          user_id: currentUser.id,
          file_url: null, // On pourrait stocker le fichier dans un bucket storage
          content: {
            videoId,
            title,
            analysisExcerpt: analysis.substring(0, 200) + '...'
          }
        })
        .select()
        .single();
      
      if (docError) {
        console.error("Error storing PDF document reference:", docError);
      }
      
      return url;
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF d'analyse",
        variant: "destructive",
      });
      return null;
    }
  };

  return { generateAnalysisPDF };
};
