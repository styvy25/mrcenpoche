
import { Module } from "../types";

export const mobilisationQuiz: Module = {
  id: "mobilisation",
  title: "Techniques de Mobilisation",
  description: "Évaluez vos compétences en mobilisation et sensibilisation politique",
  progress: 0,
  duration: "15 min",
  level: "Intermédiaire",
  isPdfAvailable: false,
  isCompleted: false,
  overview: "Ce quiz teste vos compétences en mobilisation et sensibilisation politique",
  lessons: [],
  questions: [
    {
      id: 201,
      question: "Quelle est la méthode la plus efficace pour mobiliser dans les zones rurales ?",
      options: ["Les réseaux sociaux", "La radio locale", "Les affiches", "Les SMS"],
      correctAnswer: 1,
      explanation: "Dans les zones rurales camerounaises, la radio locale reste le moyen le plus efficace pour toucher un large public, car elle est accessible même dans les zones sans électricité via des postes à piles.",
      category: "mobilisation",
      difficulty: "moyen"
    },
    {
      id: 202,
      question: "Quel est le principe fondamental de la mobilisation politique ?",
      options: ["La confrontation", "L'éducation", "La persuasion", "La participation"],
      correctAnswer: 3,
      explanation: "La participation est le principe fondamental de la mobilisation politique. Encourager les citoyens à participer activement est l'objectif principal de toute mobilisation efficace.",
      category: "mobilisation",
      difficulty: "moyen"
    },
    {
      id: 203,
      question: "Quelle stratégie est recommandée pour mobiliser les jeunes ?",
      options: ["Discours formels", "Réseaux sociaux et activités culturelles", "Distribution de tracts", "Porte-à-porte uniquement"],
      correctAnswer: 1,
      explanation: "Les réseaux sociaux et les activités culturelles sont particulièrement efficaces pour mobiliser les jeunes, car ils correspondent à leurs modes de communication et centres d'intérêt.",
      category: "mobilisation",
      difficulty: "facile",
      imageSrc: "/lovable-uploads/e326c83f-f666-44e5-9da1-72639a1027e0.png"
    },
    {
      id: 204,
      question: "Comment gérer une opposition hostile lors d'une action de mobilisation ?",
      options: ["Répondre avec hostilité", "Ignorer complètement", "Dialoguer respectueusement", "Quitter immédiatement les lieux"],
      correctAnswer: 2,
      explanation: "Le dialogue respectueux est la meilleure approche face à une opposition hostile. Il permet de désamorcer les tensions tout en maintenant l'intégrité de votre message.",
      category: "mobilisation",
      difficulty: "difficile"
    },
    {
      id: 205,
      question: "Quelle est la première étape d'une campagne de mobilisation efficace ?",
      options: ["Imprimer des affiches", "Définir clairement les objectifs", "Organiser un grand événement", "Recruter des volontaires"],
      correctAnswer: 1,
      explanation: "Définir clairement les objectifs est la première étape cruciale de toute campagne de mobilisation. Sans objectifs précis, les autres activités manqueront de direction et d'efficacité.",
      category: "mobilisation",
      difficulty: "facile"
    }
  ]
};
