
import { usePlanLimits } from "@/hooks/usePlanLimits";
import { useToast } from "@/hooks/use-toast";
import { getPerplexityResponse } from "@/components/assistant/services/perplexityService";
import { jsPDF } from "jspdf";

export const useYoutubeAnalyzer = () => {
  const { canAnalyzeYoutube, incrementYoutubeAnalysis } = usePlanLimits();
  const { toast } = useToast();
  
  const extractVideoId = (url: string): string | null => {
    // Handle youtu.be links
    const shortMatch = /youtu\.be\/([a-zA-Z0-9_-]{11})/.exec(url);
    if (shortMatch) return shortMatch[1];
    
    // Handle youtube.com links
    const regularMatch = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/.exec(url);
    if (regularMatch) return regularMatch[1];
    
    // Handle embed links
    const embedMatch = /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/.exec(url);
    if (embedMatch) return embedMatch[1];
    
    // Handle already provided IDs (11 characters)
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
    
    return null;
  };

  const analyzeYoutubeVideo = async (videoUrl: string): Promise<{
    success: boolean;
    analysis?: string;
    videoId?: string;
    title?: string;
  }> => {
    if (!canAnalyzeYoutube()) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite d'analyses YouTube. Passez à Premium pour un accès illimité.",
        variant: "destructive",
      });
      return { success: false };
    }

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      toast({
        title: "URL invalide",
        description: "Veuillez entrer une URL YouTube valide",
        variant: "destructive"
      });
      return { success: false };
    }

    try {
      toast({
        title: "Analyse en cours",
        description: "Nous analysons la vidéo YouTube...",
      });
      
      // Get YouTube API key
      const apiKeys = localStorage.getItem("api_keys");
      if (!apiKeys) {
        toast({
          title: "Configuration manquante",
          description: "Veuillez configurer vos clés API dans les paramètres",
          variant: "destructive"
        });
        return { success: false };
      }

      const { youtube, perplexity } = JSON.parse(apiKeys);
      if (!youtube || !perplexity) {
        toast({
          title: "Clés API manquantes",
          description: "Veuillez configurer les clés API YouTube et Perplexity",
          variant: "destructive"
        });
        return { success: false };
      }

      // Fetch video info
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${youtube}`);
      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        toast({
          title: "Vidéo non trouvée",
          description: "Impossible de trouver cette vidéo sur YouTube",
          variant: "destructive"
        });
        return { success: false };
      }
      
      const videoInfo = data.items[0].snippet;
      const title = videoInfo.title;
      const description = videoInfo.description;
      const channelTitle = videoInfo.channelTitle;
      
      // Generate analysis using Perplexity AI
      const prompt = `
        Analyse cette vidéo YouTube du MRC (Mouvement pour la Renaissance du Cameroun):
        
        Titre: "${title}"
        Chaîne: ${channelTitle}
        Description: ${description}
        
        Pour ton analyse:
        1. Résume les points clés de la vidéo
        2. Identifie les messages politiques principaux
        3. Explique comment cette vidéo s'inscrit dans la stratégie de communication du MRC
        4. Propose des questions de réflexion pertinentes
        5. Suggère des liens avec d'autres sujets politiques camerounais
        
        Format ton analyse de manière structurée avec des sections claires.
      `;
      
      const analysis = await getPerplexityResponse(perplexity, prompt);
      
      // Increment usage counter
      incrementYoutubeAnalysis();
      
      return {
        success: true,
        analysis,
        videoId,
        title
      };
    } catch (error) {
      console.error("Error analyzing YouTube video:", error);
      toast({
        title: "Erreur d'analyse",
        description: "Une erreur s'est produite lors de l'analyse de la vidéo",
        variant: "destructive"
      });
      return { success: false };
    }
  };

  const generateAnalysisPDF = async (videoId: string, title: string, analysis: string): Promise<string | null> => {
    try {
      // Create a new PDF document
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(22);
      doc.setTextColor(31, 87, 164); // MRC blue
      doc.text("Analyse Vidéo MRC", 105, 20, { align: "center" });
      
      // Add video title
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      const titleLines = doc.splitTextToSize(title, 180);
      doc.text(titleLines, 105, 35, { align: "center" });
      
      // Add YouTube preview
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text("Vidéo YouTube:", 20, 55);
      doc.setTextColor(0, 0, 255);
      doc.textWithLink("Ouvrir la vidéo sur YouTube", 70, 55, {
        url: `https://www.youtube.com/watch?v=${videoId}`
      });

      // Add video thumbnail if possible
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
      
      // Add analysis content
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("Analyse détaillée:", 20, 130);
      
      // Format analysis content
      const analysisLines = doc.splitTextToSize(analysis, 170);
      let yPosition = 140;
      
      // Add line break for readability
      for (let i = 0; i < analysisLines.length; i++) {
        // Check if we need to add a new page
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Add line of text
        doc.text(analysisLines[i], 20, yPosition);
        yPosition += 7; // Line spacing
      }
      
      // Add footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(`Analyse MRC | Page ${i} sur ${pageCount}`, 105, 290, { align: "center" });
      }
      
      // Generate PDF blob
      const pdfBlob = doc.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      
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

  return {
    analyzeYoutubeVideo,
    generateAnalysisPDF,
    extractVideoId
  };
};
