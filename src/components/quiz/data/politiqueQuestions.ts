
import { QuizQuestion } from "../types";

export const politiqueQuestions: QuizQuestion[] = [
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
    id: 4,
    question: "Quelle est la devise du Cameroun ?",
    options: ["Unité, Progrès, Démocratie", "Paix, Travail, Patrie", "Liberté, Égalité, Fraternité", "Unité, Travail, Justice"],
    correctAnswer: 1,
    explanation: "La devise du Cameroun est « Paix, Travail, Patrie ».",
    category: "politique",
    difficulty: "moyen",
    imageSrc: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];
