
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
      id: "201",
      question: "Quelle est la méthode la plus efficace pour mobiliser dans les zones rurales ?",
      options: [
        { id: "0", text: "Les réseaux sociaux" },
        { id: "1", text: "La radio locale" },
        { id: "2", text: "Les affiches" },
        { id: "3", text: "Les SMS" }
      ],
      correctOptionId: "1",
      explanation: "Dans les zones rurales camerounaises, la radio locale reste le moyen le plus efficace pour toucher un large public, car elle est accessible même dans les zones sans électricité via des postes à piles.",
      category: "mobilisation",
      difficulty: "moyen"
    },
    {
      id: "202",
      question: "Quel est le principe fondamental de la mobilisation politique ?",
      options: [
        { id: "0", text: "La confrontation" },
        { id: "1", text: "L'éducation" },
        { id: "2", text: "La persuasion" },
        { id: "3", text: "La participation" }
      ],
      correctOptionId: "3",
      explanation: "La participation est le principe fondamental de la mobilisation politique. Encourager les citoyens à participer activement est l'objectif principal de toute mobilisation efficace.",
      category: "mobilisation",
      difficulty: "moyen"
    },
    {
      id: "203",
      question: "Quelle stratégie est recommandée pour mobiliser les jeunes ?",
      options: [
        { id: "0", text: "Discours formels" },
        { id: "1", text: "Réseaux sociaux et activités culturelles" },
        { id: "2", text: "Distribution de tracts" },
        { id: "3", text: "Porte-à-porte uniquement" }
      ],
      correctOptionId: "1",
      explanation: "Les réseaux sociaux et les activités culturelles sont particulièrement efficaces pour mobiliser les jeunes, car ils correspondent à leurs modes de communication et centres d'intérêt.",
      category: "mobilisation",
      difficulty: "facile",
      imageSrc: "/lovable-uploads/e326c83f-f666-44e5-9da1-72639a1027e0.png"
    },
    {
      id: "204",
      question: "Comment gérer une opposition hostile lors d'une action de mobilisation ?",
      options: [
        { id: "0", text: "Répondre avec hostilité" },
        { id: "1", text: "Ignorer complètement" },
        { id: "2", text: "Dialoguer respectueusement" },
        { id: "3", text: "Quitter immédiatement les lieux" }
      ],
      correctOptionId: "2",
      explanation: "Le dialogue respectueux est la meilleure approche face à une opposition hostile. Il permet de désamorcer les tensions tout en maintenant l'intégrité de votre message.",
      category: "mobilisation",
      difficulty: "difficile"
    },
    {
      id: "205",
      question: "Quelle est la première étape d'une campagne de mobilisation efficace ?",
      options: [
        { id: "0", text: "Imprimer des affiches" },
        { id: "1", text: "Définir clairement les objectifs" },
        { id: "2", text: "Organiser un grand événement" },
        { id: "3", text: "Recruter des volontaires" }
      ],
      correctOptionId: "1",
      explanation: "Définir clairement les objectifs est la première étape cruciale de toute campagne de mobilisation. Sans objectifs précis, les autres activités manqueront de direction et d'efficacité.",
      category: "mobilisation",
      difficulty: "facile"
    }
  ]
};
