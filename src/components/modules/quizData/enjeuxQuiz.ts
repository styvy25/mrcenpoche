
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
      id: "401",
      question: "Quel est l'un des principaux défis de la gouvernance au Cameroun selon le MRC ?",
      options: [
        { id: "0", text: "Excès de décentralisation" },
        { id: "1", text: "Corruption systémique" },
        { id: "2", text: "Trop de partis politiques" },
        { id: "3", text: "Manque de ressources naturelles" }
      ],
      correctOptionId: "1",
      explanation: "La corruption systémique est identifiée par le MRC comme l'un des principaux défis de la gouvernance au Cameroun, affectant tous les secteurs de développement du pays.",
      category: "enjeux",
      difficulty: "moyen"
    },
    {
      id: "402",
      question: "Quelle crise affecte les régions du Nord-Ouest et du Sud-Ouest depuis 2016 ?",
      options: [
        { id: "0", text: "Crise économique" },
        { id: "1", text: "Crise sanitaire" },
        { id: "2", text: "Crise anglophone" },
        { id: "3", text: "Crise alimentaire" }
      ],
      correctOptionId: "2",
      explanation: "La crise anglophone affecte les régions du Nord-Ouest et du Sud-Ouest du Cameroun depuis 2016, résultant de revendications liées à la marginalisation perçue des régions anglophones.",
      category: "enjeux",
      difficulty: "facile"
    },
    {
      id: "403",
      question: "Quel système électoral est actuellement en place au Cameroun ?",
      options: [
        { id: "0", text: "Proportionnel intégral" },
        { id: "1", text: "Majoritaire à deux tours" },
        { id: "2", text: "Mixte" },
        { id: "3", text: "Vote unique transférable" }
      ],
      correctOptionId: "2",
      explanation: "Le Cameroun utilise un système électoral mixte, combinant des éléments du scrutin majoritaire et de la représentation proportionnelle selon les élections.",
      category: "enjeux",
      difficulty: "difficile"
    },
    {
      id: "404",
      question: "Quelle réforme électorale le MRC considère-t-il comme prioritaire ?",
      options: [
        { id: "0", text: "Biométrie et liste électorale fiable" },
        { id: "1", text: "Vote par correspondance" },
        { id: "2", text: "Réduction du nombre de députés" },
        { id: "3", text: "Vote électronique" }
      ],
      correctOptionId: "0",
      explanation: "La mise en place d'un système biométrique fiable et d'une liste électorale transparente est considérée comme une réforme prioritaire par le MRC pour garantir des élections crédibles.",
      category: "enjeux",
      difficulty: "moyen"
    },
    {
      id: "405",
      question: "Quel est le défi principal pour l'unité nationale selon l'analyse du MRC ?",
      options: [
        { id: "0", text: "Diversité linguistique" },
        { id: "1", text: "Tribalisme politique" },
        { id: "2", text: "Influence étrangère" },
        { id: "3", text: "Différences religieuses" }
      ],
      correctOptionId: "1",
      explanation: "Le tribalisme politique, l'exploitation des différences ethniques à des fins politiques, est considéré comme le principal défi pour l'unité nationale selon l'analyse du MRC.",
      category: "enjeux",
      difficulty: "moyen"
    }
  ]
};
