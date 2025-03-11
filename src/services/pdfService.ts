
import { Course } from "./courseService";
import { jsPDF } from "jspdf";
import { getPerplexityResponse } from "@/components/assistant/services/perplexityService";

// Types
export interface PDFGenerationOptions {
  includeCover: boolean;
  includeTableOfContents: boolean;
  includeImages: boolean;
  includeFooter: boolean;
  authorName: string;
}

// Default options
export const DEFAULT_PDF_OPTIONS: PDFGenerationOptions = {
  includeCover: true,
  includeTableOfContents: true,
  includeImages: true,
  includeFooter: true,
  authorName: "MRC en Poche"
};

// Generate PDF from course
export const generatePDFFromCourse = async (
  course: Course,
  options: PDFGenerationOptions = DEFAULT_PDF_OPTIONS
): Promise<string> => {
  try {
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Set default font
    doc.setFont("helvetica", "normal");
    
    // Add cover page if requested
    if (options.includeCover) {
      doc.setFontSize(24);
      doc.setTextColor(0, 61, 143); // MRC blue
      doc.text(course.title, 105, 80, { align: "center" });
      
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(course.description, 105, 100, { align: "center", maxWidth: 150 });
      
      doc.setFontSize(10);
      doc.text(`Auteur: ${options.authorName || course.author}`, 105, 130, { align: "center" });
      doc.text(`Date: ${new Date().toLocaleDateString("fr-FR")}`, 105, 140, { align: "center" });
      
      // Add logo if available
      if (options.includeImages && course.imageUrl) {
        try {
          const imgData = course.imageUrl;
          doc.addImage(imgData, "JPEG", 70, 30, 70, 40);
        } catch (err) {
          console.error("Error adding image to PDF:", err);
        }
      }
      
      // Add new page
      doc.addPage();
    }
    
    // Add table of contents if requested
    if (options.includeTableOfContents) {
      doc.setFontSize(18);
      doc.setTextColor(0, 61, 143); // MRC blue
      doc.text("Table des matières", 105, 20, { align: "center" });
      
      // In a real implementation, analyze content to create TOC
      // Here we'll just add a simple placeholder
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("Introduction", 20, 40);
      doc.text("Développement", 20, 50);
      doc.text("Conclusion", 20, 60);
      
      // Add new page
      doc.addPage();
    }
    
    // Add content
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    // Split content into paragraphs
    const paragraphs = course.content.split("\n\n");
    
    // Add paragraphs with proper formatting
    let y = 20;
    paragraphs.forEach(paragraph => {
      // Simple text wrapping
      const lines = doc.splitTextToSize(paragraph, 170);
      
      // Check if we need a new page
      if (y + lines.length * 7 > 280) {
        doc.addPage();
        y = 20;
      }
      
      // Add text
      doc.text(lines, 20, y);
      y += lines.length * 7 + 10;
    });
    
    // Add footer if requested
    if (options.includeFooter) {
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `MRC en Poche - ${course.title} - Page ${i} sur ${pageCount}`,
          105,
          290,
          { align: "center" }
        );
      }
    }
    
    // Save the PDF and return dataURL
    const pdfOutput = doc.output("datauristring");
    
    return pdfOutput;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF");
  }
};

// Generate a summarized PDF from course content using AI
export const generateSummarizedPDF = async (
  course: Course,
  options: PDFGenerationOptions = DEFAULT_PDF_OPTIONS
): Promise<string> => {
  try {
    // First get a summary using Perplexity
    const apiKey = localStorage.getItem("api_keys") 
      ? JSON.parse(localStorage.getItem("api_keys")!).perplexity 
      : null;
      
    if (!apiKey) {
      throw new Error("Perplexity API key not found");
    }
    
    const prompt = `Résume le contenu suivant en conservant les points essentiels et en le structurant avec une introduction, 
    un développement en 3-4 points, et une conclusion:
    
    TITRE: ${course.title}
    
    CONTENU:
    ${course.content}
    
    Le résumé doit être concis mais informatif, environ 1/3 de la longueur originale.
    Structure le résumé avec des titres de section clairs.`;
    
    const summary = await getPerplexityResponse(apiKey, prompt);
    
    if (!summary) {
      throw new Error("Failed to generate summary");
    }
    
    // Create a summarized course object
    const summarizedCourse: Course = {
      ...course,
      content: summary,
      title: `Résumé: ${course.title}`
    };
    
    // Now generate the PDF using the summary
    return generatePDFFromCourse(summarizedCourse, options);
  } catch (error) {
    console.error("Error generating summarized PDF:", error);
    throw new Error("Failed to generate summarized PDF");
  }
};

// Save PDF (mock implementation)
export const savePDF = (pdfData: string, fileName: string): void => {
  // In a real implementation, we might save to server or just download
  const link = document.createElement("a");
  link.href = pdfData;
  link.download = fileName;
  link.click();
};
