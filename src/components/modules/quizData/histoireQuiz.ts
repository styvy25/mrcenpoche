
import { Module } from "../types";

export const histoireQuiz: Module = {
  id: "histoire",
  title: "Histoire et Valeurs du MRC",
  description: "Testez vos connaissances sur l'histoire et les valeurs fondamentales du MRC",
  progress: 0,
  duration: "15 min",
  level: "Débutant",
  isPdfAvailable: false,
  isCompleted: false,
  overview: "Ce quiz teste vos connaissances sur l'histoire et les valeurs du MRC",
  lessons: [],
  questions: [
    {
      id: 101,
      question: "En quelle année le MRC a-t-il été créé ?",
      options: ["2008", "2010", "2012", "2013"],
      correctAnswer: 2,
      explanation: "Le Mouvement pour la Renaissance du Cameroun (MRC) a été créé en 2012 par Maurice Kamto et d'autres personnalités.",
      category: "histoire",
      difficulty: "facile"
    },
    {
      id: 102,
      question: "Qui est le fondateur principal du MRC ?",
      options: ["Paul Biya", "Joshua Osih", "Maurice Kamto", "John Fru Ndi"],
      correctAnswer: 2,
      explanation: "Maurice Kamto est le fondateur principal et actuel président du MRC.",
      category: "histoire",
      difficulty: "facile",
      imageSrc: "/lovable-uploads/0a7e7325-0ab5-4f67-b830-1e1b22984ac8.png"
    },
    {
      id: 103,
      question: "Quelle est la devise du MRC ?",
      options: ["Le Peuple D'abord", "Unité, Progrès, Démocratie", "Liberté, Égalité, Fraternité", "Renaissance et Progrès"],
      correctAnswer: 0,
      explanation: "La devise du MRC est 'Le Peuple D'abord', reflétant son engagement envers les intérêts des citoyens camerounais.",
      category: "histoire",
      difficulty: "moyen"
    },
    {
      id: 104,
      question: "Quel est le symbole principal du MRC ?",
      options: ["Un lion", "Un arbre", "Une étoile", "Une colombe"],
      correctAnswer: 1,
      explanation: "L'arbre est le symbole principal du MRC, représentant l'enracinement, la croissance et la renaissance.",
      category: "histoire",
      difficulty: "moyen"
    },
    {
      id: 105,
      question: "Quel poste gouvernemental Maurice Kamto a-t-il occupé avant de fonder le MRC ?",
      options: ["Ministre de la Justice", "Ministre des Finances", "Ministre des Relations Extérieures", "Premier Ministre"],
      correctAnswer: 0,
      explanation: "Maurice Kamto a été Ministre Délégué à la Justice du Cameroun avant de fonder le MRC.",
      category: "histoire",
      difficulty: "difficile"
    }
  ]
};
