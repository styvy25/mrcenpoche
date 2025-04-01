
import { Module, ModuleCategory, ModuleContent, QuizSubmission, TrainingProgressData } from "@/components/training/types";
import { supabase } from "@/lib/supabase";
import { getUserPoints } from "./paymentService";
import { generateDocumentContent } from "@/services/documentService";

// Function to get modules based on user level and subscription
export async function getModules(userLevel: number, isPremium: boolean): Promise<{ modules: Module[], featuredModule: Module | null }> {
  try {
    // In a real implementation, we would fetch from Supabase
    // For now, simulate with example data
    
    // Example modules data
    const allModules: Module[] = [
      {
        id: "1",
        title: "Histoire et Valeurs du MRC",
        description: "Découvrez l'histoire et les valeurs fondamentales du Mouvement pour la Renaissance du Cameroun",
        image: "https://images.unsplash.com/photo-1496889472578-7cdf9d30f3b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNhbWVyb29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        duration: "2h 30min",
        difficulty: "beginner",
        category: "history",
        categoryName: "Histoire",
        type: "core",
        locked: false,
        progress: 75,
        rating: 4.8
      },
      {
        id: "2",
        title: "Stratégies de Communication Politique",
        description: "Apprenez les techniques efficaces de communication politique pour le MRC",
        image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbW11bmljYXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        duration: "3h 15min",
        difficulty: "intermediate",
        category: "strategy",
        categoryName: "Stratégie",
        type: "advanced",
        locked: false,
        progress: 30,
        rating: 4.5
      },
      {
        id: "3",
        title: "Mobilisation et Organisation Locale",
        description: "Techniques avancées pour la mobilisation et l'organisation des cellules locales",
        image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlJTIwbWVldGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        duration: "4h",
        difficulty: "advanced",
        category: "organizing",
        categoryName: "Organisation",
        type: "advanced",
        locked: !isPremium,
        progress: 0,
        rating: 4.9
      },
      {
        id: "4",
        title: "Leadership Politique",
        description: "Développez vos compétences de leadership pour guider efficacement les équipes politiques",
        image: "https://images.unsplash.com/photo-1551836022-b06985bceb24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGVhZGVyc2hpcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        duration: "5h 30min",
        difficulty: "advanced",
        category: "leadership",
        categoryName: "Leadership",
        type: "advanced",
        locked: !isPremium,
        progress: 0,
        rating: 4.7
      },
      {
        id: "5",
        title: "Examen de Certification MRC",
        description: "Passez l'examen pour obtenir votre certification officielle du MRC",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZXhhbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        duration: "1h 30min",
        difficulty: "advanced",
        category: "certification",
        categoryName: "Certification",
        type: "exam",
        locked: !isPremium || userLevel < 5,
        progress: 0,
        isNew: true,
        requiredLevel: 5
      },
      {
        id: "6",
        title: "Les Enjeux Politiques Actuels",
        description: "Analyse approfondie des enjeux politiques actuels au Cameroun",
        image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cG9saXRpY3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        duration: "3h",
        difficulty: "intermediate",
        category: "strategy",
        categoryName: "Stratégie",
        type: "core",
        locked: false,
        progress: 0,
        isNew: true,
        rating: 4.6
      }
    ];
    
    // Filter modules based on user level and premium status
    const modules = allModules.filter(module => {
      if (module.locked && !isPremium) {
        return false;
      }
      
      if (module.requiredLevel && userLevel < module.requiredLevel) {
        return false;
      }
      
      return true;
    });
    
    // Featured module (recommended based on progress or recent additions)
    const featuredModule = allModules.find(m => m.isNew && !m.locked && m.progress === 0) || 
      allModules.find(m => !m.locked && m.progress > 0 && m.progress < 100) ||
      allModules.find(m => !m.locked && m.progress === 0);
    
    return { modules, featuredModule: featuredModule || null };
  } catch (error) {
    console.error("Error fetching modules:", error);
    throw error;
  }
}

// Function to get module categories
export async function getCategories(): Promise<ModuleCategory[]> {
  try {
    // In a real implementation, we would fetch from Supabase
    // For now, return example data
    return [
      { id: "history", name: "Histoire", color: "bg-red-600" },
      { id: "strategy", name: "Stratégie", color: "bg-blue-600" },
      { id: "organizing", name: "Organisation", color: "bg-green-600" },
      { id: "leadership", name: "Leadership", color: "bg-purple-600" },
      { id: "certification", name: "Certification", color: "bg-amber-600" }
    ];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

// Function to get module content
export async function getModuleContent(moduleId: string): Promise<ModuleContent> {
  try {
    // In a real implementation, we would fetch from Supabase
    // For now, simulate with example data based on the moduleId
    
    // Example data for module 1 (History)
    if (moduleId === "1") {
      return {
        content: `# Histoire et Valeurs du MRC

Le Mouvement pour la Renaissance du Cameroun (MRC) est un parti politique camerounais fondé en août 2012.

## Origine et création

Le MRC a été créé par Maurice Kamto et d'autres intellectuels camerounais dans un contexte de besoin de renouveau politique au Cameroun. La vision fondatrice était d'apporter une alternative crédible au paysage politique existant.

## Valeurs fondamentales

Les valeurs fondamentales du MRC incluent :

1. **La démocratie participative** - Impliquer tous les citoyens dans la prise de décision
2. **La justice sociale** - Promouvoir l'équité et l'égalité des chances
3. **La bonne gouvernance** - Assurer la transparence et l'efficacité dans la gestion des affaires publiques
4. **Le respect des droits humains** - Défendre les libertés fondamentales de tous les citoyens
5. **Le patriotisme** - L'amour et le service de la patrie

## Structure organisationnelle

Le MRC dispose d'une structure hiérarchique bien définie :

- Le Président National
- Le Bureau Exécutif National
- Les Coordinations Régionales
- Les Coordinations Départementales
- Les Comités de Base

Cette organisation permet une représentation à tous les niveaux du territoire national.

## Vision pour le Cameroun

Le MRC envisage un Cameroun démocratique, prospère et juste, où les institutions fonctionnent de manière efficace et où chaque citoyen a la possibilité de réaliser son potentiel.`,
        videos: [
          {
            videoId: "xmCt1Qh5_zo",
            title: "Présentation du MRC",
            description: "Vidéo de présentation officielle du Mouvement pour la Renaissance du Cameroun"
          },
          {
            videoId: "SyPVkuToYYo",
            title: "Discours de Maurice Kamto",
            description: "Discours prononcé lors de la création du parti en 2012"
          }
        ],
        quiz: {
          id: "quiz1",
          title: "Quiz sur l'histoire du MRC",
          description: "Testez vos connaissances sur l'histoire et les valeurs du MRC",
          questions: [
            {
              id: "q1",
              text: "En quelle année a été fondé le MRC ?",
              options: [
                { id: "a", text: "2010" },
                { id: "b", text: "2012" },
                { id: "c", text: "2014" },
                { id: "d", text: "2016" }
              ],
              correctOptionId: "b",
              explanation: "Le MRC a été fondé en août 2012 par Maurice Kamto et d'autres intellectuels camerounais."
            },
            {
              id: "q2",
              text: "Qui est le fondateur principal du MRC ?",
              options: [
                { id: "a", text: "John Fru Ndi" },
                { id: "b", text: "Maurice Kamto" },
                { id: "c", text: "Joshua Osih" },
                { id: "d", text: "Cabral Libii" }
              ],
              correctOptionId: "b",
              explanation: "Maurice Kamto est le fondateur principal et président du MRC."
            },
            {
              id: "q3",
              text: "Laquelle de ces valeurs n'est PAS une valeur fondamentale du MRC ?",
              options: [
                { id: "a", text: "La démocratie participative" },
                { id: "b", text: "La justice sociale" },
                { id: "c", text: "Le tribalisme" },
                { id: "d", text: "La bonne gouvernance" }
              ],
              correctOptionId: "c",
              explanation: "Le tribalisme est contraire aux valeurs du MRC qui prône l'unité nationale et combat le tribalisme."
            }
          ],
          passingScore: 70
        }
      };
    }
    
    // Example data for module 2 (Communication)
    if (moduleId === "2") {
      return {
        content: `# Stratégies de Communication Politique

La communication politique efficace est essentielle pour tout parti politique souhaitant avoir un impact significatif.

## Principes fondamentaux

Une bonne stratégie de communication politique repose sur plusieurs principes clés :

1. **Clarté du message** - Des messages simples, concis et cohérents
2. **Connaissance de l'audience** - Adapter le discours en fonction du public cible
3. **Cohérence** - Maintenir une ligne directrice dans toutes les communications
4. **Réactivité** - Savoir répondre rapidement aux événements et aux critiques
5. **Authenticité** - Rester fidèle aux valeurs et à l'identité du mouvement

## Canaux de communication

Pour une communication efficace, il est important d'utiliser divers canaux :

- **Médias traditionnels** - Télévision, radio, presse écrite
- **Médias sociaux** - Facebook, Twitter, WhatsApp, YouTube
- **Communication directe** - Meetings, porte-à-porte, réunions locales
- **Matériel imprimé** - Tracts, affiches, brochures

## Élaboration des messages clés

Les messages politiques efficaces doivent :
- Résonner avec les préoccupations des citoyens
- Proposer des solutions concrètes
- Être mémorables et faciles à répéter
- Différencier clairement le parti des autres formations politiques

## Gestion de crise

La capacité à gérer efficacement les crises de communication est cruciale :
- Réagir rapidement mais de manière réfléchie
- Être transparent et honnête
- Prendre ses responsabilités si nécessaire
- Proposer des actions correctives
- Maintenir une communication cohérente`,
        videos: [
          {
            videoId: "JgZvazr7Bk0",
            title: "Techniques de communication politique",
            description: "Les bases de la communication politique efficace"
          }
        ],
        quiz: {
          id: "quiz2",
          title: "Quiz sur la communication politique",
          description: "Testez vos connaissances sur les stratégies de communication politique",
          questions: [
            {
              id: "q1",
              text: "Quel élément n'est PAS un principe fondamental de la communication politique ?",
              options: [
                { id: "a", text: "La clarté du message" },
                { id: "b", text: "La manipulation de l'information" },
                { id: "c", text: "L'authenticité" },
                { id: "d", text: "La réactivité" }
              ],
              correctOptionId: "b",
              explanation: "La manipulation de l'information n'est pas un principe fondamental d'une communication politique éthique et efficace."
            },
            {
              id: "q2",
              text: "Parmi ces canaux, lequel n'est PAS un média traditionnel ?",
              options: [
                { id: "a", text: "La télévision" },
                { id: "b", text: "La radio" },
                { id: "c", text: "WhatsApp" },
                { id: "d", text: "La presse écrite" }
              ],
              correctOptionId: "c",
              explanation: "WhatsApp est un média social, non un média traditionnel."
            }
          ],
          passingScore: 70
        }
      };
    }
    
    // Default response for other modules
    return {
      content: "Contenu du module en cours de préparation...",
      videos: []
    };
  } catch (error) {
    console.error("Error fetching module content:", error);
    throw error;
  }
}

// Function to get module certificates
export async function getModuleCertificates(moduleId: string): Promise<any[]> {
  try {
    // In a real implementation, we would fetch from Supabase
    // For now, return example data
    return [
      {
        id: "cert1",
        title: `Certificat de réussite - Module ${moduleId}`,
        description: "Certificat officiel attestant de la réussite du module",
        issuedAt: new Date().toISOString()
      }
    ];
  } catch (error) {
    console.error("Error fetching certificates:", error);
    throw error;
  }
}

// Function to submit quiz results
export async function submitQuizResult(submission: QuizSubmission): Promise<{
  success: boolean;
  badges: any[];
}> {
  try {
    // In a real implementation, we would save to Supabase
    // For now, simulate processing
    
    // Simulate earning a badge
    const badges = [];
    
    // If the user passed, award a badge
    if (submission.passed) {
      badges.push({
        id: `badge_${Date.now()}`,
        name: "Expert du module",
        description: "Obtenu en réussissant le quiz avec excellence",
        gradient: "from-green-500 to-emerald-700",
        iconColor: "text-emerald-400",
        date: new Date().toISOString()
      });
    }
    
    return {
      success: true,
      badges
    };
  } catch (error) {
    console.error("Error submitting quiz result:", error);
    throw error;
  }
}

// Function to get training progress
export async function getTrainingProgress(): Promise<TrainingProgressData> {
  try {
    // In a real implementation, we would fetch from Supabase
    // For now, return example data
    return {
      completedModules: 2,
      totalModules: 6,
      achievements: [
        {
          id: "ach1",
          name: "Premier module terminé",
          description: "Vous avez terminé votre premier module de formation",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
          iconType: "module",
          color: "bg-green-600"
        },
        {
          id: "ach2",
          name: "Quiz parfait",
          description: "Vous avez obtenu un score parfait sur un quiz",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          iconType: "score",
          color: "bg-yellow-600"
        }
      ],
      sessions: [
        {
          id: "ses1",
          moduleId: "1",
          moduleTitle: "Histoire et Valeurs du MRC",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
          durationMinutes: 45,
          progress: 75
        },
        {
          id: "ses2",
          moduleId: "2",
          moduleTitle: "Stratégies de Communication Politique",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          durationMinutes: 60,
          progress: 30
        }
      ],
      badges: [
        {
          id: "badge1",
          name: "Lion du MRC",
          description: "Pour avoir complété la formation d'histoire du MRC",
          iconType: "award",
          gradient: "from-amber-500 to-yellow-700",
          iconColor: "text-amber-400",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
        },
        {
          id: "badge2",
          name: "Communicateur Émérite",
          description: "Pour vos excellentes compétences en communication politique",
          iconType: "award",
          gradient: "from-blue-500 to-indigo-700",
          iconColor: "text-blue-400",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
        }
      ]
    };
  } catch (error) {
    console.error("Error fetching training progress:", error);
    throw error;
  }
}

// Function to generate PDF for a module
export async function generateModulePDF(moduleId: string): Promise<string> {
  try {
    // In a real implementation, we would generate a PDF using a service
    // For now, return a placeholder URL
    
    try {
      // Get the content
      const moduleContent = await getModuleContent(moduleId);
      
      // Generate PDF content
      const pdfContent = await generateDocumentContent({
        title: `Module ${moduleId} - MRC Formation`,
        content: moduleContent.content || "",
        author: "MRC en Poche",
        type: "training-module"
      });
      
      // In a real app, we would use the PDF generation service
      // For now, simulate a PDF URL
      return `https://example.com/modules/${moduleId}/document.pdf`;
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}
