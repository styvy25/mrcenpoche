
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

export const MODULE_DESCRIPTIONS = {
  histoire: "Découvrez l'histoire, les fondements et les valeurs qui ont façonné le Mouvement pour la Renaissance du Cameroun. Ce module explore les origines du parti, sa vision et sa mission pour le Cameroun.",
  mobilisation: "Apprenez les techniques efficaces pour mobiliser les citoyens et créer un mouvement de soutien. Ce module couvre les stratégies de terrain, l'organisation communautaire et l'engagement citoyen.",
  communication: "Maîtrisez l'art de la communication politique efficace. Ce module aborde les principes de la communication persuasive, la gestion des médias et l'utilisation des réseaux sociaux.",
  enjeux: "Analysez les défis politiques, économiques et sociaux actuels du Cameroun. Ce module examine les solutions proposées par le MRC pour adresser ces enjeux cruciaux.",
  campagne: "Développez les compétences nécessaires pour organiser et gérer une campagne politique réussie. Ce module couvre la planification stratégique, la gestion des ressources et la mobilisation des électeurs."
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
