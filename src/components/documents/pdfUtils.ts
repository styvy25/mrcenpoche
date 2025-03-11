// Shared constants and utilities for PDF generation and handling

// Use more reliable PDF examples that are CORS-friendly
export const MODULE_PDF_URLS = {
  histoire: "https://cors-anywhere.herokuapp.com/https://www.africau.edu/images/default/sample.pdf",
  mobilisation: "https://cors-anywhere.herokuapp.com/https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  communication: "https://cors-anywhere.herokuapp.com/https://www.orimi.com/pdf-test.pdf",
  enjeux: "https://drive.google.com/uc?export=download&id=1hvjS-Ec0QaJEBiXWJ4Sf-4_GrF59Keoh", 
  campagne: "https://drive.google.com/uc?export=download&id=1FBGYD-qlwZuDGwIGOTBRKqMClKwIxrYR"
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

export const MODULE_CONTENT = {
  histoire: [
    {
      title: "Fondation et Origines",
      content: "Le Mouvement pour la Renaissance du Cameroun (MRC) a été fondé en 2012 par Maurice Kamto et d'autres personnalités politiques et de la société civile camerounaise. Né dans un contexte de désir de renouveau politique, le MRC s'est rapidement positionné comme une alternative aux partis traditionnels."
    },
    {
      title: "Vision et Mission",
      content: "Le MRC prône une vision de modernisation et de développement inclusif du Cameroun, basée sur les principes de bonne gouvernance, de respect de l'État de droit et de justice sociale. Sa mission est de construire un Cameroun où chaque citoyen peut contribuer et bénéficier équitablement du développement national."
    },
    {
      title: "Valeurs Fondamentales",
      content: "Les valeurs centrales du MRC incluent l'intégrité, la transparence, la responsabilité, l'inclusion et le patriotisme. Le parti met l'accent sur le respect des droits humains, la démocratie participative et la lutte contre la corruption."
    }
  ],
  mobilisation: [
    {
      title: "Stratégies de Terrain",
      content: "Les stratégies de mobilisation efficaces incluent l'organisation de cellules locales, la formation de coordinateurs de terrain et l'établissement de réseaux de militants actifs. Ces approches permettent une présence constante et visible dans les communautés."
    },
    {
      title: "Communication avec les Citoyens",
      content: "Une mobilisation réussie repose sur une communication claire et adaptée aux différentes audiences. Cela implique l'utilisation de messages simples et percutants, la traduction dans les langues locales et l'adaptation aux contextes culturels spécifiques."
    },
    {
      title: "Organisation d'Événements",
      content: "Les rassemblements publics, les forums communautaires et les caravanes de sensibilisation sont des outils puissants pour mobiliser le soutien populaire. Ces événements doivent être soigneusement planifiés pour maximiser leur impact et assurer la sécurité des participants."
    }
  ],
  communication: [
    {
      title: "Principes de Communication Politique",
      content: "Une communication politique efficace repose sur la clarté, la cohérence et la crédibilité. Les messages doivent être simples mais puissants, adaptés à l'audience visée et soutenus par des faits vérifiables."
    },
    {
      title: "Gestion des Médias",
      content: "Les relations avec les médias traditionnels restent essentielles malgré l'essor du numérique. Il est crucial de cultiver des relations professionnelles avec les journalistes, de préparer soigneusement les interviews et de maîtriser l'art des communiqués de presse."
    },
    {
      title: "Stratégies Numériques",
      content: "Dans l'ère digitale, une présence en ligne forte est indispensable. Cela inclut l'utilisation stratégique des réseaux sociaux, la création de contenu viral et l'engagement direct avec les citoyens via les plateformes numériques."
    }
  ],
  enjeux: [
    {
      title: "Gouvernance et État de Droit",
      content: "Le renforcement des institutions démocratiques, la réforme du système judiciaire et la lutte contre la corruption sont des enjeux majeurs pour assurer une gouvernance transparente et équitable au Cameroun."
    },
    {
      title: "Développement Économique",
      content: "Les défis économiques incluent la diversification de l'économie, la création d'emplois pour les jeunes, l'amélioration des infrastructures et la réduction des disparités régionales en matière de développement."
    },
    {
      title: "Cohésion Sociale et Nationale",
      content: "Dans un pays caractérisé par sa diversité ethnique, linguistique et culturelle, la promotion de l'unité nationale tout en respectant les particularités régionales constitue un défi constant qui nécessite des politiques inclusives et équitables."
    }
  ],
  campagne: [
    {
      title: "Planification Stratégique",
      content: "Une campagne politique réussie commence par une planification minutieuse qui définit les objectifs, identifie les ressources nécessaires et établit un calendrier réaliste des activités. Cette phase inclut l'analyse du terrain politique et l'identification des messages clés."
    },
    {
      title: "Mobilisation des Ressources",
      content: "La gestion efficace des ressources humaines, financières et logistiques est cruciale pour soutenir les activités de campagne. Cela implique le recrutement et la formation des volontaires, la collecte de fonds et l'organisation logistique."
    },
    {
      title: "Engagement des Électeurs",
      content: "Les techniques pour engager les électeurs comprennent le porte-à-porte, les réunions communautaires, les débats publics et l'utilisation des médias sociaux. L'objectif est d'établir une connexion personnelle avec les citoyens et de les convaincre de soutenir votre candidat ou parti."
    }
  ]
};

// Check if the device is mobile
export const checkIsMobile = (): boolean => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

// Try to validate a PDF URL by making a HEAD request
export const validatePdfUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    const contentType = response.headers.get('content-type');
    return response.ok && contentType?.includes('pdf');
  } catch (error) {
    console.error('PDF validation error:', error);
    return false;
  }
};

// Download PDF with fallback options
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

// Function to generate a PDF filename based on module and user
export const generatePDFFilename = (moduleName: string, username?: string): string => {
  const dateStr = new Date().toLocaleDateString('fr-FR').replace(/\//g, '-');
  const userStr = username ? `-${username}` : '';
  
  return `MRC-Formation-${moduleName.replace(/\s+/g, '-')}${userStr}-${dateStr}.pdf`;
};

// Function to get content for a specific module
export const getModuleContent = (moduleId: string) => {
  return MODULE_CONTENT[moduleId as keyof typeof MODULE_CONTENT] || [];
};

// Get a fallback PDF URL if the primary one fails
export const getFallbackPdfUrl = (moduleId: string): string => {
  // These URLs should be more reliable and CORS-friendly
  const backups = [
    "https://drive.google.com/uc?export=download&id=1hvjS-Ec0QaJEBiXWJ4Sf-4_GrF59Keoh",
    "https://drive.google.com/uc?export=download&id=1FBGYD-qlwZuDGwIGOTBRKqMClKwIxrYR",
    "https://cors-anywhere.herokuapp.com/https://www.africau.edu/images/default/sample.pdf"
  ];
  
  // Return a different backup based on moduleId to provide variety
  const index = moduleId.length % backups.length;
  return backups[index];
};

// Function to use static PDF resources from public folder when external URLs fail
export const getLocalPdfUrl = (moduleId: string): string => {
  // Map module IDs to local PDF files in the public folder
  const localPdfMap: Record<string, string> = {
    histoire: "/pdf/histoire-mrc.pdf",
    mobilisation: "/pdf/techniques-mobilisation.pdf",
    communication: "/pdf/communication-politique.pdf",
    enjeux: "/pdf/enjeux-politiques.pdf",
    campagne: "/pdf/organisation-campagne.pdf"
  };
  
  return localPdfMap[moduleId] || "/pdf/sample.pdf";
};
