
import { jsPDF } from "jspdf";

/**
 * Generate a PDF analysis of a YouTube video
 */
export const generateAnalysisPDF = async (
  videoId: string, 
  title: string, 
  analysis: string
): Promise<string | null> => {
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
    return null;
  }
};
