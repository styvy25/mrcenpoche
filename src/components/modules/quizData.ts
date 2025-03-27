
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
  // Quiz data corrigé
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
        explanation: "La devise du MRC est 'Le Peuple D'abord', reflétant son engagement envers les citoyens camerounais."
      },
      {
        question: "En quelle année le MRC a-t-il été fondé ?",
        options: [
          "2008",
          "2010", 
          "2012",
          "2015"
        ],
        correctAnswer: "2",
        explanation: "Le Mouvement pour la Renaissance du Cameroun (MRC) a été fondé en 2012 par Maurice Kamto et d'autres personnalités."
      },
      {
        question: "Qui est le président fondateur du MRC ?",
        options: [
          "John Fru Ndi",
          "Paul Biya",
          "Maurice Kamto",
          "Cabral Libii"
        ],
        correctAnswer: "2",
        explanation: "Maurice Kamto est le président fondateur du MRC, ancien ministre délégué à la Justice."
      }
    ]
  },
  2: {
    title: "Mobilisation Politique",
    description: "Testez vos connaissances sur les techniques de mobilisation politique",
    questions: [
      {
        question: "Quelle méthode est la plus efficace pour mobiliser en zones rurales ?",
        options: [
          "Réseaux sociaux",
          "Radio locale",
          "Affiches publicitaires",
          "Journaux quotidiens"
        ],
        correctAnswer: "1",
        explanation: "La radio locale reste le moyen le plus efficace pour atteindre les populations rurales, particulièrement dans les zones avec accès limité à Internet."
      },
      {
        question: "Quel est le principe fondamental de la mobilisation politique ?",
        options: [
          "La confrontation",
          "L'endoctrinement",
          "La participation citoyenne",
          "La propagande"
        ],
        correctAnswer: "2",
        explanation: "La participation citoyenne est le principe fondamental de toute mobilisation politique efficace et durable."
      }
    ]
  }
};
