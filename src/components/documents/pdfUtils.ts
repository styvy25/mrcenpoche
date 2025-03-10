
// Shared constants and utilities for PDF generation and handling

export const MODULE_PDF_URLS = {
  histoire: "https://www.africau.edu/images/default/sample.pdf",
  mobilisation: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  communication: "https://www.orimi.com/pdf-test.pdf",
  enjeux: "https://www.africau.edu/images/default/sample.pdf",
  campagne: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
};

export const MODULE_NAMES = {
  histoire: "Histoire et Valeurs du MRC",
  mobilisation: "Techniques de Mobilisation",
  communication: "Communication Politique",
  enjeux: "Enjeux Politiques au Cameroun",
  campagne: "Organisation de Campagne"
};

export const checkIsMobile = (): boolean => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export const downloadPDF = (pdfUrl: string, fileName: string): void => {
  const isMobile = checkIsMobile();
  
  // Create an invisible link element
  const link = document.createElement('a');
  link.href = pdfUrl;
  
  // Set download attribute for desktop browsers
  if (!isMobile) {
    link.setAttribute('download', fileName);
  } else {
    // For mobile, open in a new tab
    link.setAttribute('target', '_blank');
  }
  
  // Trigger click
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
