
import { QuizQuestion } from "../types";

export const cultureQuestions: QuizQuestion[] = [
  {
    id: 3,
    question: "Combien d'étoiles figurent sur le drapeau camerounais ?",
    options: ["Une", "Deux", "Trois", "Quatre"],
    correctAnswer: 0,
    explanation: "Le drapeau camerounais comporte une étoile au centre, symbole de l'unité nationale.",
    category: "culture",
    difficulty: "facile",
    imageSrc: "https://images.unsplash.com/photo-1565791380709-49e529c11d62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    question: "Quelle danse traditionnelle est originaire de l'ouest du Cameroun ?",
    options: ["Assiko", "Makossa", "Nguon", "Bikutsi"],
    correctAnswer: 2,
    explanation: "Le Nguon est une danse traditionnelle originaire de l'ouest du Cameroun, particulièrement de la région de Foumban.",
    category: "culture",
    difficulty: "moyen",
    imageSrc: "https://images.unsplash.com/photo-1545128485-c400ce7b15ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
    id: 11,
    question: "Quelle est la principale langue véhiculaire des régions du Grand Nord camerounais ?",
    options: ["Bamiléké", "Fulfulde", "Douala", "Ewondo"],
    correctAnswer: 1,
    explanation: "Le Fulfulde est la principale langue véhiculaire dans les régions du Grand Nord camerounais (Adamaoua, Nord et Extrême-Nord).",
    category: "culture",
    difficulty: "moyen"
  },
  {
    id: 13,
    question: "De quel peuple traditionnel est originaire la danse du Bikutsi ?",
    options: ["Beti", "Bamiléké", "Douala", "Bassaa"],
    correctAnswer: 0,
    explanation: "Le Bikutsi est une danse traditionnelle du peuple Beti du centre et du sud du Cameroun.",
    category: "culture",
    difficulty: "moyen"
  }
];
