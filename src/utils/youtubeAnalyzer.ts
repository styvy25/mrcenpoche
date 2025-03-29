
import { jsPDF } from "jspdf";
import { useToast } from "@/hooks/use-toast";
import { VideoInfo } from "@/components/assistant/services/youtube/types";
import { getVideoInfo } from "@/components/assistant/services/youtubeService";
import { usePlanLimits } from "@/hooks/usePlanLimits";

export const useYoutubeAnalyzer = () => {
  const { toast } = useToast();
  const { canAnalyzeYoutube, incrementYoutubeAnalysis } = usePlanLimits();
  
  const generateYouTubeAnalysisPDF = async (videoId: string, apiKey: string) => {
    // Check if user has permission to analyze YouTube videos
    if (!canAnalyzeYoutube()) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite d'analyses YouTube. Passez à Premium pour plus d'analyses.",
        variant: "destructive",
      });
      return null;
    }
    
    try {
      // Get video information
      const videoInfo = await getVideoInfo(apiKey, videoId);
      
      // Generate PDF
      const pdf = await createAnalysisPDF(videoInfo, videoId);
      
      // Update usage counter
      incrementYoutubeAnalysis();
      
      toast({
        title: "Analyse générée",
        description: "L'analyse de la vidéo YouTube a été générée avec succès.",
        variant: "default",
      });
      
      return pdf;
    } catch (error) {
      console.error("Error generating YouTube analysis:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'analyse de la vidéo YouTube.",
        variant: "destructive",
      });
      return null;
    }
  };
  
  const createAnalysisPDF = async (videoInfo: VideoInfo, videoId: string) => {
    // Create a new PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - (2 * margin);
    
    // Add title
    doc.setFontSize(16);
    doc.setTextColor(31, 87, 164); // MRC blue
    doc.text("Analyse de contenu YouTube", pageWidth / 2, margin, { align: "center" });
    
    // Add video ID
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`ID: ${videoId}`, pageWidth / 2, margin + 7, { align: "center" });
    
    // Add separator line
    doc.setDrawColor(200);
    doc.line(margin, margin + 10, pageWidth - margin, margin + 10);
    
    // Set position for content
    let y = margin + 20;
    
    // Add video title
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.setFont(undefined, 'bold');
    doc.text("Titre:", margin, y);
    y += 7;
    doc.setFont(undefined, 'normal');
    const titleLines = doc.splitTextToSize(videoInfo.title, contentWidth);
    doc.text(titleLines, margin, y);
    y += titleLines.length * 7 + 10;
    
    // Add description
    doc.setFont(undefined, 'bold');
    doc.text("Description:", margin, y);
    y += 7;
    doc.setFont(undefined, 'normal');
    const descriptionLines = doc.splitTextToSize(videoInfo.description, contentWidth);
    
    // Check if we need a new page
    if (y + descriptionLines.length * 5 > 270) {
      doc.addPage();
      y = margin;
    }
    
    doc.text(descriptionLines, margin, y);
    y += descriptionLines.length * 5 + 10;
    
    // Add transcript
    if (y > 270) {
      doc.addPage();
      y = margin;
    }
    
    doc.setFont(undefined, 'bold');
    doc.text("Transcription:", margin, y);
    y += 7;
    doc.setFont(undefined, 'normal');
    
    const transcriptLines = doc.splitTextToSize(videoInfo.transcript, contentWidth);
    
    // If transcript is very long, might need multiple pages
    let currentLine = 0;
    while (currentLine < transcriptLines.length) {
      // Check remaining space on current page
      const remainingLines = Math.min(
        Math.floor((270 - y) / 5),
        transcriptLines.length - currentLine
      );
      
      // Add as many lines as will fit
      const pageLines = transcriptLines.slice(currentLine, currentLine + remainingLines);
      doc.text(pageLines, margin, y);
      
      currentLine += remainingLines;
      
      // If more lines remain, add a new page
      if (currentLine < transcriptLines.length) {
        doc.addPage();
        y = margin;
      } else {
        y += pageLines.length * 5 + 10;
      }
    }
    
    // Add analysis date
    doc.setFontSize(10);
    doc.setTextColor(100);
    const today = new Date().toLocaleDateString('fr-FR');
    doc.text(`Analyse générée le ${today}`, pageWidth / 2, 287, { align: "center" });
    
    // Save the PDF
    const filename = `YouTube-Analyse-${videoId}.pdf`;
    doc.save(filename);
    
    return doc;
  };
  
  return { generateYouTubeAnalysisPDF };
};
