
import { Module } from "../types";

export const enjeuxQuiz: Module = {
  id: "enjeux",
  title: "Enjeux Politiques au Cameroun",
  description: "Évaluez votre compréhension des défis politiques actuels du Cameroun",
  progress: 0,
  duration: "15 min",
  level: "Intermédiaire",
  isPdfAvailable: false,
  isCompleted: false,
  overview: "Ce quiz teste votre compréhension des défis politiques actuels du Cameroun",
  lessons: [],
  questions: [
    {
      id: 401,
      question: "Quel est l'un des principaux défis de la gouvernance au Cameroun selon le MRC ?",
      options: ["Excès de décentralisation", "Corruption systémique", "Trop de partis politiques", "Manque de ressources naturelles"],
      correctAnswer: 1,
      explanation: "La corruption systémique est identifiée par le MRC comme l'un des principaux défis de la gouvernance au Cameroun, affectant tous les secteurs de développement du pays.",
      category: "enjeux",
      difficulty: "moyen"
    },
    {
      id: 402,
      question: "Quelle crise affecte les régions du Nord-Ouest et du Sud-Ouest depuis 2016 ?",
      options: ["Crise économique", "Crise sanitaire", "Crise anglophone", "Crise alimentaire"],
      correctAnswer: 2,
      explanation: "La crise anglophone affecte les régions du Nord-Ouest et du Sud-Ouest du Cameroun depuis 2016, résultant de revendications liées à la marginalisation perçue des régions anglophones.",
      category: "enjeux",
      difficulty: "facile"
    },
    {
      id: 403,
      question: "Quel système électoral est actuellement en place au Cameroun ?",
      options: ["Proportionnel intégral", "Majoritaire à deux tours", "Mixte", "Vote unique transférable"],
      correctAnswer: 2,
      explanation: "Le Cameroun utilise un système électoral mixte, combinant des éléments du scrutin majoritaire et de la représentation proportionnelle selon les élections.",
      category: "enjeux",
      difficulty: "difficile"
    },
    {
      id: 404,
      question: "Quelle réforme électorale le MRC considère-t-il comme prioritaire ?",
      options: ["Biométrie et liste électorale fiable", "Vote par correspondance", "Réduction du nombre de députés", "Vote électronique"],
      correctAnswer: 0,
      explanation: "La mise en place d'un système biométrique fiable et d'une liste électorale transparente est considérée comme une réforme prioritaire par le MRC pour garantir des élections crédibles.",
      category: "enjeux",
      difficulty: "moyen"
    },
    {
      id: 405,
      question: "Quel est le défi principal pour l'unité nationale selon l'analyse du MRC ?",
      options: ["Diversité linguistique", "Tribalisme politique", "Influence étrangère", "Différences religieuses"],
      correctAnswer: 1,
      explanation: "Le tribalisme politique, l'exploitation des différences ethniques à des fins politiques, est considéré comme le principal défi pour l'unité nationale selon l'analyse du MRC.",
      category: "enjeux",
      difficulty: "moyen"
    }
  ]
};
