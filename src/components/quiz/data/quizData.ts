
import { QuizQuestion } from "../types";
import { histoireQuestions } from "./histoireQuestions";
import { politiqueQuestions } from "./politiqueQuestions";
import { geographieQuestions } from "./geographieQuestions";
import { cultureQuestions } from "./cultureQuestions";

// Additional quiz categories
const economieQuestions: QuizQuestion[] = [
  {
    id: "econ1",
    text: "Économie Camerounaise",
    question: "Quel est le secteur qui contribue le plus au PIB du Cameroun ?",
    options: ["Agriculture", "Industrie", "Services", "Extraction minière"],
    correctAnswer: 2,
    answers: [],
    explanation: "Le secteur des services est devenu le plus grand contributeur au PIB camerounais, représentant environ 54% du PIB.",
    category: "economie",
    difficulty: "moyen"
  },
  {
    id: "econ2",
    text: "Économie Camerounaise",
    question: "Quelle est la principale culture d'exportation du Cameroun ?",
    options: ["Café", "Cacao", "Banane", "Coton"],
    correctAnswer: 1,
    answers: [],
    explanation: "Le cacao est la principale culture d'exportation du Cameroun, qui est l'un des principaux producteurs de cacao en Afrique.",
    category: "economie",
    difficulty: "facile",
    imageSrc: "https://images.unsplash.com/photo-1606913419164-6eed8ed8d621?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "econ3",
    text: "Économie Camerounaise",
    question: "Quel est l'objectif principal du plan 'Vision 2035' du gouvernement camerounais ?",
    options: [
      "Transformer le Cameroun en un pays développé",
      "Devenir le premier producteur de pétrole en Afrique",
      "Éliminer complètement la dette nationale",
      "Atteindre l'autosuffisance alimentaire"
    ],
    correctAnswer: 0,
    answers: [],
    explanation: "La 'Vision 2035' est un plan stratégique visant à transformer le Cameroun en un pays émergent, industrialisé et démocratique d'ici 2035.",
    category: "economie",
    difficulty: "difficile"
  }
];

const strategieQuestions: QuizQuestion[] = [
  {
    id: "strat1",
    text: "Stratégie Politique",
    question: "Quelle est la meilleure approche pour mobiliser les jeunes électeurs ?",
    options: [
      "Utiliser uniquement les médias traditionnels",
      "Se concentrer sur les réseaux sociaux et la communication numérique",
      "Ignorer les jeunes car ils votent peu",
      "Communiquer uniquement via les structures éducatives"
    ],
    correctAnswer: 1,
    answers: [],
    explanation: "Les jeunes électeurs sont plus facilement atteignables via les plateformes numériques et réseaux sociaux, qui permettent une communication ciblée et interactive.",
    category: "strategie",
    difficulty: "moyen"
  },
  {
    id: "strat2",
    text: "Stratégie Politique",
    question: "Quel est l'avantage principal d'une stratégie de campagne décentralisée ?",
    options: [
      "Elle coûte moins cher",
      "Elle permet une meilleure adaptation aux réalités locales",
      "Elle est plus facile à coordonner",
      "Elle nécessite moins de volontaires"
    ],
    correctAnswer: 1,
    answers: [],
    explanation: "Une stratégie décentralisée permet d'adapter les messages et actions aux spécificités et préoccupations de chaque région ou localité.",
    category: "strategie",
    difficulty: "difficile"
  }
];

export const allQuizQuestions = [
  ...histoireQuestions,
  ...politiqueQuestions,
  ...geographieQuestions,
  ...cultureQuestions,
  ...economieQuestions,
  ...strategieQuestions
];

export const getQuestionsByCategory = (category: string): QuizQuestion[] => {
  return allQuizQuestions.filter(q => q.category === category);
};

export const getQuestionById = (id: string): QuizQuestion | undefined => {
  return allQuizQuestions.find(q => q.id === id);
};
