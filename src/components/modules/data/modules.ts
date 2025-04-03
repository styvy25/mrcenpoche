
import { Module } from '../types';

// Sample module data
export const modules: Module[] = [
  {
    id: "histoire",
    title: "Histoire et Valeurs du MRC",
    description: "Découvrez les fondements et principes du Mouvement pour la Renaissance du Cameroun",
    cover: "https://i.imgur.com/placeholder.jpg",
    author: "Équipe MRC",
    level: "Débutant",
    duration: "2h 30min",
    lessonCount: 5,
    category: "Fondamentaux",
    progress: 75,
    isLocked: false,
    isCompleted: false,
    isPdfAvailable: true,
    pdfUrl: "/pdfs/histoire-mrc.pdf",
    overview: "Ce module vous permettra de comprendre l'histoire du MRC, ses valeurs fondamentales et sa vision pour le Cameroun. Vous découvrirez pourquoi le parti a été créé, qui sont ses fondateurs et quels objectifs il poursuit. Cette formation est essentielle pour tout militant ou sympathisant désirant s'engager efficacement.",
    lessons: [
      {
        id: "1",
        title: "Origines et création du MRC",
        type: "video",
        completed: true,
        contentType: "text",
        content: "Le Mouvement pour la Renaissance du Cameroun (MRC) a été fondé en août 2012 par Maurice Kamto, accompagné d'autres intellectuels et personnalités politiques camerounaises. La création du parti est survenue dans un contexte de besoin de renouveau politique et de propositions alternatives pour le développement du Cameroun. Les fondateurs partageaient une vision commune d'un Cameroun plus démocratique, plus juste et plus prospère.",
        duration: "20 min"
      },
      {
        id: "2",
        title: "Valeurs fondamentales et idéologie",
        type: "text",
        completed: true,
        contentType: "text",
        content: "Le MRC s'appuie sur plusieurs valeurs fondamentales: la démocratie participative, la justice sociale, la bonne gouvernance, la transparence et l'intégrité. Le parti prône une approche pragmatique de la politique, centrée sur les besoins réels des citoyens camerounais. L'idéologie du MRC peut être qualifiée de progressiste et sociale-démocrate, avec un accent particulier sur la redistribution équitable des ressources et la décentralisation du pouvoir.",
        duration: "25 min"
      },
      {
        id: "3",
        title: "Structure et organisation",
        type: "video",
        completed: true,
        contentType: "video",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "30 min"
      },
      {
        id: "4",
        title: "Le MRC dans le paysage politique camerounais",
        type: "text",
        completed: false,
        contentType: "text",
        duration: "40 min",
        isLocked: false
      },
      {
        id: "5",
        title: "Vision et projet de société",
        type: "quiz",
        completed: false,
        contentType: "quiz",
        duration: "35 min",
        isLocked: true
      }
    ],
    quizLink: "/quiz/histoire"
  },
  {
    id: "mobilisation",
    title: "Techniques de Mobilisation",
    description: "Apprenez à mobiliser efficacement les citoyens pour soutenir les idées du MRC",
    cover: "https://i.imgur.com/placeholder2.jpg",
    author: "Département Mobilisation MRC",
    level: "Intermédiaire",
    duration: "3h 15min",
    lessonCount: 4,
    category: "Stratégie",
    progress: 30,
    isLocked: false,
    isCompleted: false,
    isPdfAvailable: true,
    pdfUrl: "/pdfs/mobilisation-mrc.pdf",
    overview: "Ce module présente les techniques et stratégies de mobilisation efficaces pour engager les citoyens dans l'action politique. Vous apprendrez comment organiser des événements, mener des campagnes de sensibilisation, et bâtir un réseau de militants engagés.",
    lessons: [
      {
        id: "1",
        title: "Principes de mobilisation citoyenne",
        type: "text",
        completed: true,
        contentType: "text",
        content: "La mobilisation citoyenne repose sur plusieurs principes fondamentaux : l'engagement émotionnel, la clarté du message, l'accessibilité de l'action proposée et le sentiment d'appartenance à une communauté. Le MRC place ces éléments au cœur de sa stratégie pour toucher efficacement les Camerounais de tous horizons.",
        duration: "45 min"
      },
      {
        id: "2",
        title: "Organisation d'événements politiques",
        type: "video",
        completed: false,
        contentType: "video",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "50 min"
      },
      {
        id: "3",
        title: "Communication persuasive",
        type: "text",
        completed: false,
        contentType: "text",
        duration: "40 min",
        isLocked: false
      },
      {
        id: "4",
        title: "Expansion du réseau militant",
        type: "quiz",
        completed: false,
        contentType: "quiz",
        duration: "60 min",
        isLocked: true
      }
    ],
    quizLink: "/quiz/mobilisation"
  },
  {
    id: "communication",
    title: "Communication Politique",
    description: "Maîtrisez l'art de la communication politique efficace pour le MRC",
    cover: "https://i.imgur.com/placeholder3.jpg",
    author: "Cellule Communication MRC",
    level: "Intermédiaire",
    duration: "3h 45min",
    lessonCount: 5,
    category: "Communication",
    progress: 15,
    isLocked: false,
    isCompleted: false,
    isPdfAvailable: true,
    pdfUrl: "/pdfs/communication-mrc.pdf",
    overview: "Ce module vous enseigne les fondamentaux de la communication politique adaptée au contexte camerounais. Vous apprendrez à formuler des messages percutants, à utiliser efficacement les médias traditionnels et numériques, et à adapter votre communication selon les publics visés.",
    lessons: [
      {
        id: "1",
        title: "Fondamentaux de la communication politique",
        type: "text",
        completed: true,
        contentType: "text",
        duration: "40 min"
      },
      {
        id: "2",
        title: "Stratégie de communication digitale",
        type: "video",
        completed: false,
        contentType: "video",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "55 min"
      },
      {
        id: "3",
        title: "Relation avec les médias",
        type: "text",
        completed: false,
        contentType: "text",
        duration: "45 min",
        isLocked: false
      },
      {
        id: "4",
        title: "Discours et prise de parole publique",
        type: "video",
        completed: false,
        contentType: "video",
        duration: "50 min",
        isLocked: false
      },
      {
        id: "5",
        title: "Gestion de crise médiatique",
        type: "quiz",
        completed: false,
        contentType: "quiz",
        duration: "35 min",
        isLocked: true
      }
    ],
    quizLink: "/quiz/communication"
  },
  {
    id: "enjeux",
    title: "Enjeux Politiques Actuels",
    description: "Analysez les défis politiques contemporains du Cameroun",
    cover: "https://i.imgur.com/placeholder4.jpg",
    author: "Comité Stratégique MRC",
    level: "Avancé",
    duration: "4h 20min",
    lessonCount: 6,
    category: "Analyse Politique",
    progress: 10,
    isLocked: false,
    isCompleted: false,
    isPdfAvailable: true,
    pdfUrl: "/pdfs/enjeux-mrc.pdf",
    overview: "Ce module propose une analyse approfondie des défis politiques, économiques et sociaux auxquels le Cameroun fait face aujourd'hui. Vous étudierez les questions de gouvernance, de développement économique, et les propositions du MRC pour adresser ces enjeux.",
    lessons: [
      {
        id: "1",
        title: "Contexte politique camerounais actuel",
        type: "text",
        completed: true,
        contentType: "text",
        duration: "45 min"
      },
      {
        id: "2",
        title: "Défis économiques et solutions",
        type: "video",
        completed: false,
        contentType: "video",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "50 min"
      },
      {
        id: "3",
        title: "Questions de gouvernance",
        type: "text",
        completed: false,
        contentType: "text",
        duration: "40 min",
        isLocked: false
      },
      {
        id: "4",
        title: "Politique étrangère et relations internationales",
        type: "video",
        completed: false,
        contentType: "video",
        duration: "45 min",
        isLocked: false
      },
      {
        id: "5",
        title: "Décentralisation et pouvoir local",
        type: "text",
        completed: false,
        contentType: "text",
        duration: "40 min",
        isLocked: true
      },
      {
        id: "6",
        title: "Perspectives d'avenir",
        type: "quiz",
        completed: false,
        contentType: "quiz",
        duration: "40 min",
        isLocked: true
      }
    ],
    quizLink: "/quiz/enjeux"
  },
  {
    id: "campagne",
    title: "Organisation de Campagne",
    description: "Apprenez à organiser et gérer efficacement une campagne politique",
    cover: "https://i.imgur.com/placeholder5.jpg",
    author: "Direction des Campagnes MRC",
    level: "Expert",
    duration: "5h 00min",
    lessonCount: 6,
    category: "Stratégie",
    progress: 5,
    isLocked: false,
    isCompleted: false,
    isPdfAvailable: true,
    pdfUrl: "/pdfs/campagne-mrc.pdf",
    overview: "Ce module vous forme aux méthodes d'organisation et de gestion d'une campagne politique efficace. De la planification stratégique à la coordination des équipes sur le terrain, vous maîtriserez toutes les étapes nécessaires pour mener une campagne réussie.",
    lessons: [
      {
        id: "1",
        title: "Planification stratégique de campagne",
        type: "text",
        completed: true,
        contentType: "text",
        duration: "50 min"
      },
      {
        id: "2",
        title: "Mobilisation des ressources",
        type: "video",
        completed: false,
        contentType: "video",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "45 min"
      },
      {
        id: "3",
        title: "Gestion d'équipe de campagne",
        type: "text",
        completed: false,
        contentType: "text",
        duration: "50 min",
        isLocked: false
      },
      {
        id: "4",
        title: "Communication de campagne",
        type: "video",
        completed: false,
        contentType: "video",
        duration: "45 min",
        isLocked: false
      },
      {
        id: "5",
        title: "Gestion du jour J",
        type: "text",
        completed: false,
        contentType: "text",
        duration: "55 min",
        isLocked: true
      },
      {
        id: "6",
        title: "Analyse post-électorale",
        type: "quiz",
        completed: false,
        contentType: "quiz",
        duration: "45 min",
        isLocked: true
      }
    ],
    quizLink: "/quiz/campagne"
  }
];

export const getModuleById = (id: string): Module | undefined => {
  return modules.find(module => module.id === id);
};
