
import { QuizQuestion } from "../types";

export const histoireQuestions: QuizQuestion[] = [
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
    id: 12,
    question: "Quel est le nom du roi (sultan) qui a créé le royaume Bamoun ?",
    options: ["Njoya", "Mbouombouo", "Nchare Yen", "Ibrahim Njoya"],
    correctAnswer: 2,
    explanation: "Nchare Yen est le fondateur du royaume Bamoun au début du 16ème siècle.",
    category: "histoire",
    difficulty: "difficile"
  },
  {
    id: 14,
    question: "Quel écrivain camerounais a écrit 'Ville Cruelle' sous le pseudonyme d'Eza Boto ?",
    options: ["Ferdinand Oyono", "Calixthe Beyala", "Mongo Beti", "Francis Bebey"],
    correctAnswer: 2,
    explanation: "Mongo Beti (de son vrai nom Alexandre Biyidi-Awala) a écrit 'Ville Cruelle' sous le pseudonyme d'Eza Boto en 1954.",
    category: "culture",
    difficulty: "difficile"
  }
];
