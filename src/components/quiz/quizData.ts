
import { QuizQuestion } from "./types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Quelle est la capitale politique du Cameroun ?",
    options: ["Douala", "Yaoundé", "Garoua", "Bamenda"],
    correctAnswer: 1,
    explanation: "Yaoundé est la capitale politique du Cameroun, tandis que Douala est la capitale économique.",
    category: "politique",
    difficulty: "facile"
  },
  {
    id: 2,
    question: "En quelle année le Cameroun a-t-il obtenu son indépendance de la France ?",
    options: ["1957", "1960", "1962", "1970"],
    correctAnswer: 1,
    explanation: "Le Cameroun a obtenu son indépendance de la France le 1er janvier 1960.",
    category: "histoire",
    difficulty: "facile"
  },
  {
    id: 3,
    question: "Combien d'étoiles figurent sur le drapeau camerounais ?",
    options: ["Une", "Deux", "Trois", "Quatre"],
    correctAnswer: 0,
    explanation: "Le drapeau camerounais comporte une étoile au centre, symbole de l'unité nationale.",
    category: "culture",
    difficulty: "facile"
  },
  {
    id: 4,
    question: "Quelle est la devise du Cameroun ?",
    options: ["Unité, Progrès, Démocratie", "Paix, Travail, Patrie", "Liberté, Égalité, Fraternité", "Unité, Travail, Justice"],
    correctAnswer: 1,
    explanation: "La devise du Cameroun est « Paix, Travail, Patrie ».",
    category: "politique",
    difficulty: "moyen"
  },
  {
    id: 5,
    question: "Quelle danse traditionnelle est originaire de l'ouest du Cameroun ?",
    options: ["Bikutsi", "Assiko", "Makossa", "Nguon"],
    correctAnswer: 0,
    explanation: "Le Bikutsi est une danse traditionnelle originaire de la région de l'ouest du Cameroun, particulièrement populaire chez les Beti.",
    category: "culture",
    difficulty: "moyen"
  },
  {
    id: 6,
    question: "Quel est le plus grand lac naturel du Cameroun ?",
    options: ["Lac Tchad", "Lac Nyos", "Lac Ossa", "Lac Barombi Mbo"],
    correctAnswer: 0,
    explanation: "Le lac Tchad, bien que partagé avec d'autres pays, est le plus grand lac naturel touchant le Cameroun.",
    category: "geographie",
    difficulty: "moyen"
  },
  {
    id: 7,
    question: "Quel est le plat traditionnel camerounais à base de manioc fermenté ?",
    options: ["Ndolé", "Eru", "Bobolo", "Sanga"],
    correctAnswer: 2,
    explanation: "Le Bobolo est un plat traditionnel camerounais fait à base de manioc fermenté, enveloppé dans des feuilles de bananier.",
    category: "culture",
    difficulty: "moyen"
  },
  {
    id: 8,
    question: "Quel musicien camerounais est connu comme le 'Roi du Makossa' ?",
    options: ["Petit Pays", "Manu Dibango", "Lapiro de Mbanga", "Manu Ella"],
    correctAnswer: 1,
    explanation: "Manu Dibango, avec son tube 'Soul Makossa', est considéré comme le 'Roi du Makossa'.",
    category: "culture",
    difficulty: "moyen"
  },
  {
    id: 9,
    question: "Quelle langue est la plus parlée au Cameroun en termes de locuteurs natifs ?",
    options: ["Français", "Anglais", "Fulfulde", "Ewondo"],
    correctAnswer: 2,
    explanation: "Le Fulfulde est la langue avec le plus grand nombre de locuteurs natifs au Cameroun.",
    category: "culture",
    difficulty: "difficile"
  },
  {
    id: 10,
    question: "Quel est le nom de la cérémonie traditionnelle qui marque la succession des chefs Bamoun ?",
    options: ["Feymania", "Nguon", "Nyanga", "Mbaya"],
    correctAnswer: 1,
    explanation: "Le Nguon est la cérémonie traditionnelle qui marque la succession des chefs Bamoun.",
    category: "traditions",
    difficulty: "difficile"
  }
];

export const quizData = {
  categories: [
    { id: "culture", name: "Culture", color: "bg-mrc-blue" },
    { id: "histoire", name: "Histoire", color: "bg-mrc-red" },
    { id: "traditions", name: "Traditions", color: "bg-mrc-yellow" },
    { id: "politique", name: "Politique", color: "bg-mrc-green" },
    { id: "geographie", name: "Géographie", color: "bg-purple-500" }
  ],
  quizQuestions: quizQuestions
};

export const getQuizQuestions = async (): Promise<QuizQuestion[]> => {
  // Simuler un chargement asynchrone
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(quizQuestions);
    }, 1000);
  });
};

export default quizQuestions;
