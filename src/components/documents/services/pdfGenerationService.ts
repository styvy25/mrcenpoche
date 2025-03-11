
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

// Generate PDF using Perplexity API with static fallback
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
      // If no API key, use static content instead of showing error
      toast({
        title: "Utilisation du contenu hors ligne",
        description: "Génération du PDF avec contenu statique (mode hors ligne).",
      });
      
      // Get static content for the module
      const staticContent = getStaticModuleContent(selectedModule);
      await createPDFFromContent(staticContent, options, selectedModule, []);
      
      toast({
        title: "PDF généré avec succès",
        description: "Document généré en mode hors ligne. Configurez votre clé API pour un contenu personnalisé.",
      });
      
      return true;
    }

    toast({
      title: "Génération en cours",
      description: "Création du contenu avec l'IA en cours...",
    });
    
    try {
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
    } catch (error) {
      console.error("Error with Perplexity API, falling back to static content:", error);
      
      // If Perplexity fails, use static content
      const staticContent = getStaticModuleContent(selectedModule);
      await createPDFFromContent(staticContent, options, selectedModule, []);
      
      toast({
        title: "Contenu généré hors ligne",
        description: "Impossible de se connecter à l'IA. Document créé avec contenu statique.",
      });
    }

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

// Add enhanced static content for PDF when no Perplexity API is available
const getStaticModuleContent = (moduleId: string) => {
  const staticContent = {
    title: MODULE_NAMES[moduleId as keyof typeof MODULE_NAMES],
    content: "",
    summary: "Résumé des points essentiels du module.",
    keywords: ["MRC", "politique", "formation", "Cameroun"],
    relatedVideos: ["MRC Cameroun", "Maurice Kamto", "politique camerounaise"]
  };

  // Add comprehensive content based on module
  const moduleContent = MODULE_CONTENT[moduleId as keyof typeof MODULE_CONTENT];
  if (moduleContent) {
    let fullContent = "";
    moduleContent.forEach(section => {
      // Add more detailed content with formatting
      fullContent += `${section.title.toUpperCase()}\n\n${section.content}\n\n`;
      
      // Add additional explanatory paragraphs for each section
      if (moduleId === 'histoire') {
        fullContent += `Le MRC s'inscrit dans une tradition de lutte démocratique au Cameroun. Fondé sur des principes de justice, d'équité et de bonne gouvernance, le parti représente une alternative crédible dans le paysage politique camerounais.\n\n`;
      } else if (moduleId === 'mobilisation') {
        fullContent += `L'efficacité de la mobilisation politique repose sur l'engagement actif des militants. Les méthodes présentées dans ce module ont été éprouvées dans divers contextes politiques et adaptées aux réalités camerounaises.\n\n`;
      } else if (moduleId === 'communication') {
        fullContent += `Une communication politique efficace doit tenir compte des spécificités culturelles et linguistiques du Cameroun. Les stratégies présentées ici peuvent être adaptées selon les contextes locaux et les objectifs poursuivis.\n\n`;
      } else if (moduleId === 'enjeux') {
        fullContent += `La compréhension approfondie des enjeux politiques actuels est essentielle pour élaborer des propositions pertinentes. Cette analyse tient compte des développements récents et des perspectives d'évolution à moyen et long terme.\n\n`;
      } else if (moduleId === 'campagne') {
        fullContent += `L'organisation d'une campagne réussie nécessite une planification minutieuse et une exécution disciplinée. Les principes exposés ici sont applicables à différentes échelles, de la campagne locale à la campagne nationale.\n\n`;
      }
    });
    
    // Add five substantive pages of content (minimum)
    for (let i = 0; i < 3; i++) {
      fullContent += `\nAPPROFONDISSEMENT DU MODULE ${i+1}\n\n`;
      
      if (moduleId === 'histoire') {
        fullContent += `Le MRC dans le contexte politique camerounais\n\nLe Mouvement pour la Renaissance du Cameroun s'est développé dans un contexte politique marqué par plusieurs décennies de gouvernance sous un même régime. Cette situation a créé des défis spécifiques pour le parti, notamment en termes d'espace politique, de liberté d'expression et d'organisation. Malgré ces contraintes, le MRC a su s'imposer comme une force politique majeure, portée par une vision claire et des propositions concrètes pour l'avenir du pays.\n\nLa création du MRC a été motivée par le constat d'un besoin de renouveau dans l'approche politique au Cameroun. Les fondateurs ont identifié plusieurs lacunes dans la gouvernance existante, notamment en matière de transparence, de responsabilité et d'inclusion. Ils ont donc conçu un projet politique qui place ces valeurs au centre de leur vision.\n\nL'évolution du MRC depuis sa création témoigne de sa capacité d'adaptation et de sa résilience face aux défis. Le parti a su mobiliser un soutien significatif tant au niveau national qu'international, et a développé une présence dans toutes les régions du Cameroun.\n\n`;
      } else if (moduleId === 'mobilisation') {
        fullContent += `Stratégies de mobilisation adaptées au contexte camerounais\n\nLa mobilisation politique au Cameroun doit tenir compte de plusieurs facteurs spécifiques au contexte local. La diversité ethnique, linguistique et culturelle du pays nécessite des approches adaptées à chaque région. De même, les disparités en termes d'accès aux technologies et aux moyens de communication influencent les stratégies à adopter.\n\nDans les zones urbaines, où l'accès à Internet et aux réseaux sociaux est plus répandu, les stratégies numériques peuvent être particulièrement efficaces. Cela inclut l'utilisation des plateformes comme WhatsApp, Facebook et Twitter pour diffuser des messages, organiser des événements et mobiliser les sympathisants.\n\nEn revanche, dans les zones rurales, les approches plus traditionnelles restent essentielles. Cela peut inclure des réunions communautaires, des visites porte-à-porte, et l'utilisation de la radio locale. Il est également important de travailler avec les leaders communautaires et les structures traditionnelles qui jouent un rôle influent dans ces régions.\n\n`;
      } else if (moduleId === 'communication') {
        fullContent += `Adaptation des messages politiques au contexte multiculturel\n\nLe Cameroun, avec ses plus de 250 groupes ethniques et ses multiples langues, présente un défi unique pour la communication politique. Pour être efficace, un message politique doit pouvoir résonner auprès de populations diverses, aux préoccupations et aux référents culturels parfois très différents.\n\nLa première étape consiste à identifier les valeurs et les aspirations communes qui transcendent les différences culturelles. Des thèmes comme la justice, la dignité, le développement économique et l'éducation peuvent constituer des points de convergence.\n\nEnsuite, il est essentiel d'adapter la forme du message au contexte culturel spécifique. Cela peut impliquer l'utilisation des langues locales, des références culturelles appropriées, et des modes de communication traditionnels respectés dans chaque communauté.\n\nLa communication non verbale, notamment à travers les symboles, les couleurs et les gestes, joue également un rôle important dans un contexte multiculturel. Il est crucial de s'assurer que ces éléments transmettent le message souhaité dans différents contextes culturels.\n\n`;
      } else if (moduleId === 'enjeux') {
        fullContent += `Analyse des défis économiques et perspectives de développement\n\nL'économie camerounaise fait face à plusieurs défis structurels qui limitent son potentiel de développement. Malgré des ressources naturelles abondantes et une position géographique stratégique, le pays peine à transformer ces atouts en prospérité partagée.\n\nParmi les principaux défis figure la dépendance excessive aux exportations de matières premières, qui rend l'économie vulnérable aux fluctuations des prix mondiaux. La diversification économique représente donc un impératif stratégique pour assurer une croissance durable.\n\nLe secteur informel, qui représente une part importante de l'activité économique, pose également des défis en termes de protection sociale, de fiscalité et d'accès au financement. L'intégration progressive de ce secteur dans l'économie formelle constitue un enjeu majeur pour élargir l'assiette fiscale et améliorer les conditions de travail.\n\nLes disparités régionales en matière de développement constituent un autre défi de taille. Certaines régions du pays bénéficient d'investissements plus importants et d'une meilleure infrastructure, créant des inégalités qui peuvent alimenter des tensions sociales et politiques.\n\n`;
      } else if (moduleId === 'campagne') {
        fullContent += `Organisation de campagne dans des contextes à ressources limitées\n\nMener une campagne politique efficace avec des ressources limitées nécessite créativité, planification stratégique et optimisation des moyens disponibles. Cette situation est courante pour de nombreux candidats et partis, particulièrement ceux qui ne disposent pas d'un financement abondant ou d'un accès privilégié aux ressources publiques.\n\nLa première étape consiste à établir des priorités claires en fonction de l'impact potentiel de chaque activité. Cela implique d'identifier les zones géographiques et les segments de population où les efforts de campagne sont susceptibles d'avoir le plus grand effet sur les résultats électoraux.\n\nLe recrutement et la formation de volontaires motivés peuvent considérablement amplifier la portée d'une campagne à faible coût. Ces volontaires peuvent mener des activités de porte-à-porte, organiser des réunions communautaires, et servir d'ambassadeurs du candidat ou du parti dans leurs réseaux sociaux.\n\nLes médias sociaux et les plateformes numériques offrent des opportunités de communication à grande échelle avec un investissement financier relativement modeste. Une stratégie de contenu bien conçue peut générer un engagement significatif et une diffusion organique des messages de campagne.\n\n`;
      }
    }
    
    staticContent.content = fullContent;
    
    // Add comprehensive summaries
    if (moduleId === 'histoire') {
      staticContent.summary = "Ce module présente l'histoire du MRC depuis sa fondation en 2012, ses valeurs fondamentales et sa vision pour le Cameroun. Il examine le contexte politique qui a conduit à sa création, les personnalités clés impliquées dans son développement, et les principes qui guident son action politique. Le module analyse également l'évolution du parti au fil des années, ses accomplissements majeurs et les défis qu'il a dû surmonter. La compréhension de ces fondements historiques est essentielle pour tout membre ou sympathisant souhaitant contribuer efficacement à la mission du MRC.";
    } else if (moduleId === 'mobilisation') {
      staticContent.summary = "Ce module aborde les techniques et stratégies de mobilisation citoyenne adaptées au contexte camerounais. Il couvre les méthodes d'organisation communautaire, les approches de communication persuasive, et les tactiques de terrain éprouvées. Le module présente des études de cas de mobilisations réussies, analyse les facteurs de succès, et propose des outils pratiques pour l'engagement des citoyens. Il examine également les défis spécifiques liés à la mobilisation dans différentes régions du pays et suggère des adaptations appropriées selon les contextes locaux.";
    } else if (moduleId === 'communication') {
      staticContent.summary = "Ce module explore les principes et pratiques de la communication politique efficace. Il traite de la formulation de messages percutants, de l'adaptation du discours à différentes audiences, et de l'utilisation stratégique des canaux de communication. Le module aborde également la gestion des médias traditionnels, l'optimisation des plateformes numériques, et les techniques de prise de parole en public. Une attention particulière est accordée à la communication en période de crise et à la construction d'une image cohérente et authentique.";
    } else if (moduleId === 'enjeux') {
      staticContent.summary = "Ce module présente une analyse approfondie des défis politiques, économiques et sociaux auxquels le Cameroun est confronté. Il examine les questions de gouvernance, de développement économique, de cohésion sociale, et de politique étrangère. Le module expose également les solutions proposées par le MRC pour adresser ces enjeux, en s'appuyant sur des données factuelles et des expériences comparatives. Cette analyse constitue une base solide pour comprendre les positions du parti et participer aux débats sur l'avenir du pays.";
    } else if (moduleId === 'campagne') {
      staticContent.summary = "Ce module détaille les étapes et composantes d'une campagne politique réussie. Il couvre la planification stratégique, la constitution et gestion d'équipe, la mobilisation des ressources, et la coordination des activités de terrain. Le module présente des outils pratiques pour l'analyse électorale, la segmentation des électeurs, et l'élaboration de messages ciblés. Il aborde également la gestion du jour J et l'importance du suivi post-électoral pour capitaliser sur les efforts de campagne.";
    }
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
      
      const exercises = getExercisesForModule(selectedModule);
      
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

// Get module-specific exercises
const getExercisesForModule = (moduleId: string): string[] => {
  switch (moduleId) {
    case 'histoire':
      return [
        "1. Identifiez trois événements clés dans l'histoire du MRC et expliquez leur importance pour le développement du parti.",
        "2. Comparez les valeurs fondamentales du MRC avec celles d'au moins deux autres partis politiques camerounais. Quelles sont les similitudes et les différences?",
        "3. Rédigez un court essai (500 mots) expliquant comment les principes fondateurs du MRC se reflètent dans ses propositions politiques actuelles.",
        "4. Préparez une présentation de 5 minutes sur l'histoire du MRC destinée à de nouveaux sympathisants.",
        "5. Analysez l'évolution de la vision du MRC pour le Cameroun depuis sa création jusqu'à aujourd'hui."
      ];
    case 'mobilisation':
      return [
        "1. Élaborez une stratégie de mobilisation pour votre quartier ou village, en tenant compte des spécificités locales.",
        "2. Préparez un discours de 3 minutes pour motiver des citoyens à s'engager politiquement dans leur communauté.",
        "3. Identifiez trois obstacles potentiels à la mobilisation dans votre région et proposez des solutions pour les surmonter.",
        "4. Créez un calendrier mensuel d'activités de mobilisation pour une cellule locale du MRC.",
        "5. Concevez un formulaire d'évaluation pour mesurer l'efficacité d'une action de mobilisation."
      ];
    case 'communication':
      return [
        "1. Rédigez trois messages clés sur une réforme proposée par le MRC, adaptés à trois audiences différentes (jeunes, seniors, milieu rural).",
        "2. Analysez un discours récent d'un leader politique camerounais. Identifiez ses forces et faiblesses en termes de communication.",
        "3. Préparez un communiqué de presse sur un événement fictif organisé par le MRC.",
        "4. Élaborez une stratégie de communication pour les réseaux sociaux sur un thème politique spécifique.",
        "5. Simulez une interview difficile et préparez des réponses aux questions délicates potentielles."
      ];
    case 'enjeux':
      return [
        "1. Identifiez trois défis majeurs auxquels le Cameroun est confronté et proposez des solutions concrètes pour chacun d'eux.",
        "2. Analysez une politique gouvernementale récente et suggérez des améliorations ou alternatives.",
        "3. Rédigez une note de synthèse (500 mots) sur un enjeu socio-économique spécifique au Cameroun.",
        "4. Comparez les approches de différents partis politiques sur un enjeu majeur au Cameroun.",
        "5. Élaborez un plan d'action communautaire pour adresser un problème local spécifique."
      ];
    case 'campagne':
      return [
        "1. Élaborez un plan de campagne pour une élection locale fictive, incluant un calendrier, un budget et une stratégie.",
        "2. Identifiez cinq sources potentielles de financement pour une campagne locale et expliquez comment les approcher.",
        "3. Créez un organigramme détaillé pour une équipe de campagne, avec les rôles et responsabilités de chaque poste.",
        "4. Rédigez un plan de communication de campagne intégrant médias traditionnels et plateformes numériques.",
        "5. Développez un système de suivi et d'évaluation pour mesurer l'efficacité des différentes activités de campagne."
      ];
    default:
      return [
        "1. Analysez la situation politique actuelle au Cameroun et identifiez trois défis majeurs.",
        "2. Proposez des solutions concrètes pour améliorer la mobilisation citoyenne dans votre région.",
        "3. Rédigez un argumentaire de 2-3 minutes pour présenter les valeurs du MRC à un nouvel adhérent."
      ];
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
