
import { Category } from "../types";
import { histoireQuestions } from "./histoireQuestions";
import { politiqueQuestions } from "./politiqueQuestions";
import { geographieQuestions } from "./geographieQuestions";
import { cultureQuestions } from "./cultureQuestions";

// Add some additional questions that will be imported from quizData.ts
const economieQuestions = [
  {
    id: "econ1",
    text: "Économie Camerounaise",
    question: "Quel est le secteur qui contribue le plus au PIB du Cameroun ?",
    options: ["Agriculture", "Industrie", "Services", "Extraction minière"],
    correctAnswer: "2",
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
    correctAnswer: "1",
    answers: [],
    explanation: "Le cacao est la principale culture d'exportation du Cameroun, qui est l'un des principaux producteurs de cacao en Afrique.",
    category: "economie",
    difficulty: "facile"
  }
];

const strategieQuestions = [
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
    correctAnswer: "1",
    answers: [],
    explanation: "Les jeunes électeurs sont plus facilement atteignables via les plateformes numériques et réseaux sociaux, qui permettent une communication ciblée et interactive.",
    category: "strategie",
    difficulty: "moyen"
  }
];

const testQuestions = [
  {
    id: "test1",
    text: "Test Officiel",
    question: "Quel est l'article de la Constitution camerounaise qui établit le caractère laïc de l'État ?",
    options: ["Article 1", "Article 2", "Article 4", "Article 6"],
    correctAnswer: "0",
    answers: [],
    explanation: "L'Article 1er de la Constitution du Cameroun stipule que 'La République du Cameroun est un État unitaire, décentralisé, démocratique et social. Elle est une et indivisible, laïque et démocratique...'.",
    category: "test",
    difficulty: "difficile"
  },
  {
    id: "test2",
    text: "Test Officiel",
    question: "Selon la loi électorale du Cameroun, quelle est la durée du mandat présidentiel ?",
    options: ["5 ans", "7 ans", "6 ans", "4 ans"],
    correctAnswer: "1",
    answers: [],
    explanation: "Selon la loi électorale camerounaise, le mandat présidentiel est de 7 ans, renouvelable une fois.",
    category: "test",
    difficulty: "moyen"
  }
];

export const categories: Category[] = [
  {
    id: "histoire",
    name: "Histoire du Cameroun",
    color: "bg-blue-500",
    label: "Histoire",
    icon: "BookOpen",
    questions: histoireQuestions
  },
  {
    id: "politique",
    name: "Science Politique",
    color: "bg-red-500",
    label: "Politique",
    icon: "Award",
    questions: politiqueQuestions
  },
  {
    id: "geographie",
    name: "Géographie du Cameroun",
    color: "bg-green-500",
    label: "Géographie",
    icon: "Map",
    questions: geographieQuestions
  },
  {
    id: "culture",
    name: "Culture Camerounaise",
    color: "bg-amber-500",
    label: "Culture",
    icon: "Music",
    questions: cultureQuestions
  },
  {
    id: "economie",
    name: "Économie du Cameroun",
    color: "bg-emerald-500",
    label: "Économie",
    icon: "TrendingUp",
    questions: economieQuestions
  },
  {
    id: "strategie",
    name: "Stratégie Politique",
    color: "bg-indigo-500",
    label: "Stratégie",
    icon: "Target",
    questions: strategieQuestions
  },
  {
    id: "test",
    name: "Test Officiel MRC",
    color: "bg-purple-500",
    label: "Examen",
    icon: "FileText",
    questions: testQuestions
  }
];
