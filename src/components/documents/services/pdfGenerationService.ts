
import { toast } from "@/hooks/use-toast";
import { MODULE_PDF_URLS, MODULE_NAMES, generatePDFFilename, downloadPDF, validatePdfUrl, getFallbackPdfUrl } from "../pdfUtils";
import { generateCourseContent } from "@/components/assistant/services/perplexityCourse";
import { jsPDF } from "jspdf";

export interface PDFGenerationOptions {
  includeExercises: boolean;
  includeImages: boolean;
  includeSummary: boolean;
}

export const generateAndDownloadPDF = async (
  selectedModule: string,
  userName: string,
  options: PDFGenerationOptions
) => {
  if (!selectedModule) {
    toast({
      title: "Erreur",
      description: "Veuillez sélectionner un module avant de générer un PDF.",
      variant: "destructive",
    });
    return false;
  }

  // Check API keys
  const apiKeys = localStorage.getItem("api_keys");
  if (!apiKeys || !JSON.parse(apiKeys).perplexity) {
    return false;
  }

  // Get PDF URL
  let pdfUrl = MODULE_PDF_URLS[selectedModule as keyof typeof MODULE_PDF_URLS];
  
  // Validate URL and try fallback if needed
  const isValidUrl = await validatePdfUrl(pdfUrl);
  if (!isValidUrl) {
    console.log("Primary PDF URL failed, trying fallback...");
    const fallbackUrl = getFallbackPdfUrl(selectedModule);
    pdfUrl = fallbackUrl;
  }
  
  // Generate filename
  const fileName = generatePDFFilename(
    MODULE_NAMES[selectedModule as keyof typeof MODULE_NAMES],
    userName.trim() || undefined
  );
  
  // Download the PDF
  downloadPDF(pdfUrl, fileName);
  
  return true;
};

// Generate PDF using Perplexity API
export const generatePDF = async (
  selectedModule: string,
  options: PDFGenerationOptions
): Promise<boolean> => {
  try {
    const moduleName = MODULE_NAMES[selectedModule as keyof typeof MODULE_NAMES];
    
    // Get API key from localStorage
    const apiKeys = localStorage.getItem("api_keys");
    if (!apiKeys) return false;
    
    const parsedKeys = JSON.parse(apiKeys);
    const apiKey = parsedKeys.perplexity;
    
    if (!apiKey) {
      toast({
        title: "Clé API manquante",
        description: "Veuillez configurer votre clé API Perplexity dans les paramètres.",
        variant: "destructive",
      });
      return false;
    }
    
    // Generate course content using Perplexity
    const courseContent = await generateCourseContent(
      apiKey,
      moduleName,
      "Intermédiaire"
    );
    
    // Create PDF from content
    await createPDFFromContent(courseContent, options, selectedModule);
    
    return true;
  } catch (error) {
    console.error("PDF generation error:", error);
    return false;
  }
};

// Create PDF from generated content
const createPDFFromContent = async (
  content: any, 
  options: PDFGenerationOptions,
  selectedModule: string
): Promise<void> => {
  try {
    const doc = new jsPDF();
    const moduleName = MODULE_NAMES[selectedModule as keyof typeof MODULE_NAMES];
    
    // Add title
    doc.setFontSize(22);
    doc.setTextColor(41, 98, 255); // MRC blue color
    doc.text(content.title || moduleName, 20, 20);
    
    // Add content with formatting
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    // Split content into multiple pages
    const contentText = content.content;
    const splitText = doc.splitTextToSize(contentText, 170);
    
    let yPosition = 40;
    const pageHeight = 280;
    
    for (let i = 0; i < splitText.length; i++) {
      if (yPosition > pageHeight) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.text(splitText[i], 20, yPosition);
      yPosition += 7;
    }
    
    // Add summary if option is enabled
    if (options.includeSummary && content.summary) {
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(41, 98, 255);
      doc.text("Résumé", 20, 20);
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      const summaryText = doc.splitTextToSize(content.summary, 170);
      yPosition = 30;
      
      for (let i = 0; i < summaryText.length; i++) {
        if (yPosition > pageHeight) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.text(summaryText[i], 20, yPosition);
        yPosition += 7;
      }
    }
    
    // Save the generated PDF
    const fileName = generatePDFFilename(moduleName);
    
    // Save locally
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    // Update the module PDF URL
    MODULE_PDF_URLS[selectedModule as keyof typeof MODULE_PDF_URLS] = pdfUrl;
    
    // Note: In a production app, we would also save this to a server
  } catch (error) {
    console.error("Error creating PDF:", error);
    throw error;
  }
};

export const checkAPIKeysConfigured = (): boolean => {
  const apiKeys = localStorage.getItem("api_keys");
  if (!apiKeys) return false;
  
  try {
    const parsedKeys = JSON.parse(apiKeys);
    return Boolean(parsedKeys.perplexity);
  } catch (e) {
    return false;
  }
};
