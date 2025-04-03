
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
      id: "101",
      text: "En quelle année le MRC a-t-il été créé ?",
      options: [
        { id: "0", text: "2008" },
        { id: "1", text: "2010" },
        { id: "2", text: "2012" },
        { id: "3", text: "2013" }
      ],
      correctOptionId: "2",
      explanation: "Le Mouvement pour la Renaissance du Cameroun (MRC) a été créé en 2012 par Maurice Kamto et d'autres personnalités.",
      category: "histoire",
      difficulty: "facile",
      question: "En quelle année le MRC a-t-il été créé ?"
    },
    {
      id: "102",
      text: "Qui est le fondateur principal du MRC ?",
      options: [
        { id: "0", text: "Paul Biya" },
        { id: "1", text: "Joshua Osih" },
        { id: "2", text: "Maurice Kamto" },
        { id: "3", text: "John Fru Ndi" }
      ],
      correctOptionId: "2",
      explanation: "Maurice Kamto est le fondateur principal et actuel président du MRC.",
      category: "histoire",
      difficulty: "facile",
      imageSrc: "/lovable-uploads/0a7e7325-0ab5-4f67-b830-1e1b22984ac8.png",
      question: "Qui est le fondateur principal du MRC ?"
    },
    {
      id: "103",
      text: "Quelle est la devise du MRC ?",
      options: [
        { id: "0", text: "Le Peuple D'abord" },
        { id: "1", text: "Unité, Progrès, Démocratie" },
        { id: "2", text: "Liberté, Égalité, Fraternité" },
        { id: "3", text: "Renaissance et Progrès" }
      ],
      correctOptionId: "0",
      explanation: "La devise du MRC est 'Le Peuple D'abord', reflétant son engagement envers les intérêts des citoyens camerounais.",
      category: "histoire",
      difficulty: "moyen",
      question: "Quelle est la devise du MRC ?"
    },
    {
      id: "104",
      text: "Quel est le symbole principal du MRC ?",
      options: [
        { id: "0", text: "Un lion" },
        { id: "1", text: "Un arbre" },
        { id: "2", text: "Une étoile" },
        { id: "3", text: "Une colombe" }
      ],
      correctOptionId: "1",
      explanation: "L'arbre est le symbole principal du MRC, représentant l'enracinement, la croissance et la renaissance.",
      category: "histoire",
      difficulty: "moyen",
      question: "Quel est le symbole principal du MRC ?"
    },
    {
      id: "105",
      text: "Quel poste gouvernemental Maurice Kamto a-t-il occupé avant de fonder le MRC ?",
      options: [
        { id: "0", text: "Ministre de la Justice" },
        { id: "1", text: "Ministre des Finances" },
        { id: "2", text: "Ministre des Relations Extérieures" },
        { id: "3", text: "Premier Ministre" }
      ],
      correctOptionId: "0",
      explanation: "Maurice Kamto a été Ministre Délégué à la Justice du Cameroun avant de fonder le MRC.",
      category: "histoire",
      difficulty: "difficile",
      question: "Quel poste gouvernemental Maurice Kamto a-t-il occupé avant de fonder le MRC ?"
    }
  ],
  category: "histoire",
  locked: false
};
