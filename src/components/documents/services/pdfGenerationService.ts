
import { toast } from "@/hooks/use-toast";
import { MODULE_PDF_URLS, MODULE_NAMES, generatePDFFilename, downloadPDF } from "../pdfUtils";

export interface PDFGenerationOptions {
  includeExercises: boolean;
  includeImages: boolean;
  includeSummary: boolean;
}

export const generateAndDownloadPDF = (
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

  // Get PDF URL and generate filename
  const pdfUrl = MODULE_PDF_URLS[selectedModule as keyof typeof MODULE_PDF_URLS];
  const fileName = generatePDFFilename(
    MODULE_NAMES[selectedModule as keyof typeof MODULE_NAMES],
    userName.trim() || undefined
  );
  
  // Download the PDF
  downloadPDF(pdfUrl, fileName);
  
  return true;
};

// Mock generation function that returns a promise
export const generatePDF = async (
  selectedModule: string,
  options: PDFGenerationOptions
): Promise<boolean> => {
  // This would connect to Perplexity API in a real implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
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
