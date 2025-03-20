
interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface ModuleQuiz {
  title: string;
  description: string;
  questions: Question[];
}

export const moduleQuizzes: Record<number, ModuleQuiz> = {
  // Simplified quiz data
  1: {
    title: "Introduction au MRC",
    description: "Testez vos connaissances sur les fondamentaux du MRC",
    questions: [
      {
        question: "Quelle est la devise du MRC ?",
        options: [
          "Le Peuple D'abord",
          "Unité, Progrès, Démocratie",
          "Justice et Égalité",
          "Liberté et Développement"
        ],
        correctAnswer: "0",
        explanation: "La devise du MRC est 'Le Peuple D'abord', reflétant son engagement envers les citoyens."
      }
    ]
  }
};
