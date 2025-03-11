
import { QuizQuestion } from "./types";

export const culturalQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Quelle est la capitale politique du Cameroun ?",
    options: ["Douala", "Yaoundé", "Garoua", "Bamenda"],
    correctAnswer: 1,
    explanation: "Yaoundé est la capitale politique du Cameroun, tandis que Douala est la capitale économique.",
    category: "politique",
    difficulty: "facile",
    imageSrc: "https://images.unsplash.com/photo-1543161949-1f9193812ce8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    question: "En quelle année le Cameroun a-t-il obtenu son indépendance de la France ?",
    options: ["1957", "1960", "1962", "1970"],
    correctAnswer: 1,
    explanation: "Le Cameroun a obtenu son indépendance de la France le 1er janvier 1960.",
    category: "histoire",
    difficulty: "facile",
    imageSrc: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
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
    id: 4,
    question: "Quelle est la devise du Cameroun ?",
    options: ["Unité, Progrès, Démocratie", "Paix, Travail, Patrie", "Liberté, Égalité, Fraternité", "Unité, Travail, Justice"],
    correctAnswer: 1,
    explanation: "La devise du Cameroun est « Paix, Travail, Patrie ».",
    category: "politique",
    difficulty: "moyen",
    imageSrc: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
  },
  // Adding 10 more corrected questions
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
    id: 12,
    question: "Quel est le nom du roi (sultan) qui a créé le royaume Bamoun ?",
    options: ["Njoya", "Mbouombouo", "Nchare Yen", "Ibrahim Njoya"],
    correctAnswer: 2,
    explanation: "Nchare Yen est le fondateur du royaume Bamoun au début du 16ème siècle.",
    category: "histoire",
    difficulty: "difficile"
  },
  {
    id: 13,
    question: "De quel peuple traditionnel est originaire la danse du Bikutsi ?",
    options: ["Beti", "Bamiléké", "Douala", "Bassaa"],
    correctAnswer: 0,
    explanation: "Le Bikutsi est une danse traditionnelle du peuple Beti du centre et du sud du Cameroun.",
    category: "culture",
    difficulty: "moyen"
  },
  {
    id: 14,
    question: "Quel écrivain camerounais a écrit 'Ville Cruelle' sous le pseudonyme d'Eza Boto ?",
    options: ["Ferdinand Oyono", "Calixthe Beyala", "Mongo Beti", "Francis Bebey"],
    correctAnswer: 2,
    explanation: "Mongo Beti (de son vrai nom Alexandre Biyidi-Awala) a écrit 'Ville Cruelle' sous le pseudonyme d'Eza Boto en 1954.",
    category: "culture",
    difficulty: "difficile"
  },
  {
    id: 15,
    question: "Quel est le nom du masque traditionnel des Bamiléké représentant le chef ?",
    options: ["Kwi'fo", "Kuosi", "Mabu", "Kifwebe"],
    correctAnswer: 1,
    explanation: "Le Kuosi est un masque royal bamiléké représentant le chef et utilisé lors des cérémonies importantes.",
    category: "traditions",
    difficulty: "difficile"
  }
];

export const culturalQuizData = {
  categories: [
    { id: "culture", name: "Culture", color: "bg-mrc-blue" },
    { id: "histoire", name: "Histoire", color: "bg-mrc-red" },
    { id: "traditions", name: "Traditions", color: "bg-mrc-yellow" },
    { id: "politique", name: "Politique", color: "bg-mrc-green" },
    { id: "geographie", name: "Géographie", color: "bg-purple-500" }
  ],
  quizQuestions: culturalQuizQuestions
};

export const getCulturalQuizQuestions = async (): Promise<QuizQuestion[]> => {
  // Simuler un chargement asynchrone
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(culturalQuizQuestions);
    }, 1000);
  });
};

export default culturalQuizQuestions;
