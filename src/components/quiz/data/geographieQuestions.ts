
import { QuizQuestion } from "../types";

export const geographieQuestions: QuizQuestion[] = [
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
    id: 20,
    question: "Quel est ce fleuve important qui traverse le Cameroun ?",
    options: ["Fleuve Congo", "Fleuve Sanaga", "Fleuve Niger", "Fleuve Logone"],
    correctAnswer: 1,
    explanation: "Le fleuve Sanaga est le plus long fleuve du Cameroun, avec une longueur d'environ 918 km. Il est essentiel pour l'hydroélectricité du pays.",
    category: "geographie",
    difficulty: "moyen",
    imageSrc: "https://images.unsplash.com/photo-1546484475-7f7bd55792da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];
