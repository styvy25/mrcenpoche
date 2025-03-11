
import { toast } from "@/hooks/use-toast";
import { MODULE_PDF_URLS, MODULE_NAMES, generatePDFFilename, downloadPDF, validatePdfUrl, getFallbackPdfUrl, MODULE_CONTENT } from "../pdfUtils";
import { generateCourseContent, searchYouTubeVideos } from "@/components/assistant/services/perplexityService";
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
    toast({
      title: "Configuration requise",
      description: "Veuillez configurer votre clé API Perplexity dans les paramètres.",
      variant: "destructive",
    });
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
    if (!apiKeys) {
      toast({
        title: "Configuration requise",
        description: "Veuillez configurer vos clés API dans les paramètres.",
        variant: "destructive",
      });
      return false;
    }
    
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

    toast({
      title: "Génération en cours",
      description: "Création du contenu avec l'IA en cours...",
    });
    
    // Generate course content using Perplexity
    const courseContent = await generateCourseContent(
      apiKey,
      moduleName,
      "Intermédiaire"
    );

    // Search for YouTube videos if option is enabled
    let youtubeVideoIds = [];
    if (options.includeImages && courseContent.relatedVideos) {
      try {
        youtubeVideoIds = await searchYouTubeVideos(apiKey, courseContent.relatedVideos);
      } catch (error) {
        console.error("Erreur lors de la recherche de vidéos YouTube:", error);
      }
    }
    
    // Create PDF from content
    await createPDFFromContent(courseContent, options, selectedModule, youtubeVideoIds);

    toast({
      title: "PDF généré avec succès",
      description: "Le document a été créé et est prêt à être consulté.",
    });
    
    return true;
  } catch (error) {
    console.error("PDF generation error:", error);
    toast({
      title: "Erreur de génération",
      description: "Une erreur s'est produite lors de la génération du contenu. Veuillez réessayer.",
      variant: "destructive",
    });
    return false;
  }
};

// Add content for PDF when no Perplexity API is available
const getStaticModuleContent = (moduleId: string) => {
  const staticContent = {
    title: MODULE_NAMES[moduleId as keyof typeof MODULE_NAMES],
    content: "",
    summary: "Résumé des points essentiels du module.",
    keywords: ["MRC", "politique", "formation", "Cameroun"],
    relatedVideos: ["MRC Cameroun", "Maurice Kamto", "politique camerounaise"]
  };

  // Add relevant content based on module
  const moduleContent = MODULE_CONTENT[moduleId as keyof typeof MODULE_CONTENT];
  if (moduleContent) {
    let fullContent = "";
    moduleContent.forEach(section => {
      fullContent += `${section.title}\n\n${section.content}\n\n`;
    });
    staticContent.content = fullContent;
  } else {
    staticContent.content = "Contenu du module en cours de développement. Veuillez vous référer aux ressources complémentaires pour plus d'informations.";
  }

  return staticContent;
};

// Create PDF from generated content
const createPDFFromContent = async (
  content: any, 
  options: PDFGenerationOptions,
  selectedModule: string,
  youtubeVideoIds: string[] = []
): Promise<void> => {
  try {
    const doc = new jsPDF();
    const moduleName = MODULE_NAMES[selectedModule as keyof typeof MODULE_NAMES];
    
    // Add MRC header
    doc.setFontSize(22);
    doc.setTextColor(41, 98, 255); // MRC blue color
    doc.text("MRC - Formation Politique", 20, 20);
    
    // Add title
    doc.setFontSize(18);
    doc.text(content.title || moduleName, 20, 30);
    
    // Add content with formatting
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    // Main content
    let yPosition = 40;
    const pageHeight = 280;
    const pageWidth = 180;
    const margin = 20;
    
    // Split content into multiple pages with word wrapping
    const contentText = content.content || "Contenu non disponible";
    const splitText = doc.splitTextToSize(contentText, pageWidth);
    
    for (let i = 0; i < splitText.length; i++) {
      if (yPosition > pageHeight) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.text(splitText[i], margin, yPosition);
      yPosition += 7;
    }
    
    // Add YouTube recommendations if videos are available
    if (options.includeImages && youtubeVideoIds.length > 0) {
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(41, 98, 255);
      doc.text("Vidéos recommandées", margin, 20);
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      yPosition = 30;
      
      youtubeVideoIds.forEach((videoId, index) => {
        const text = `${index + 1}. Vidéo YouTube: https://www.youtube.com/watch?v=${videoId}`;
        const splitVideoText = doc.splitTextToSize(text, pageWidth);
        
        for (let i = 0; i < splitVideoText.length; i++) {
          if (yPosition > pageHeight) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.text(splitVideoText[i], margin, yPosition);
          yPosition += 7;
        }
        
        yPosition += 5; // Add extra space between video recommendations
      });
    }
    
    // Add summary if option is enabled
    if (options.includeSummary && content.summary) {
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      } else {
        yPosition += 10;
      }
      
      doc.setFontSize(16);
      doc.setTextColor(41, 98, 255);
      doc.text("Résumé", margin, yPosition);
      yPosition += 10;
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      const summaryText = doc.splitTextToSize(content.summary, pageWidth);
      
      for (let i = 0; i < summaryText.length; i++) {
        if (yPosition > pageHeight) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.text(summaryText[i], margin, yPosition);
        yPosition += 7;
      }
    }
    
    // Add exercises if option is enabled
    if (options.includeExercises) {
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      } else {
        yPosition += 10;
      }
      
      doc.setFontSize(16);
      doc.setTextColor(41, 98, 255);
      doc.text("Exercices pratiques", margin, yPosition);
      yPosition += 10;
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      const exercises = [
        "1. Analysez la situation politique actuelle au Cameroun et identifiez trois défis majeurs.",
        "2. Proposez des solutions concrètes pour améliorer la mobilisation citoyenne dans votre région.",
        "3. Rédigez un argumentaire de 2-3 minutes pour présenter les valeurs du MRC à un nouvel adhérent."
      ];
      
      exercises.forEach(exercise => {
        const exerciseText = doc.splitTextToSize(exercise, pageWidth);
        
        for (let i = 0; i < exerciseText.length; i++) {
          if (yPosition > pageHeight) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.text(exerciseText[i], margin, yPosition);
          yPosition += 7;
        }
        
        yPosition += 5; // Add space between exercises
      });
    }
    
    // Add keywords at the end
    if (content.keywords && content.keywords.length > 0) {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = 20;
      } else {
        yPosition += 10;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(41, 98, 255);
      doc.text("Mots-clés", margin, yPosition);
      yPosition += 7;
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      const keywordsText = content.keywords.join(", ");
      const splitKeywords = doc.splitTextToSize(keywordsText, pageWidth);
      
      for (let i = 0; i < splitKeywords.length; i++) {
        doc.text(splitKeywords[i], margin, yPosition);
        yPosition += 7;
      }
    }
    
    // Add footer with page numbers
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Page ${i} sur ${pageCount} | Formation MRC`, 105, 290, { align: 'center' });
    }
    
    // Save the generated PDF
    const fileName = generatePDFFilename(moduleName);
    
    // Save locally
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    // Update the module PDF URL
    MODULE_PDF_URLS[selectedModule as keyof typeof MODULE_PDF_URLS] = pdfUrl;
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
