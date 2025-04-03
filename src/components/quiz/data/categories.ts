
import { Category } from "../types";
import { histoireQuestions } from "./histoireQuestions";
import { politiqueQuestions } from "./politiqueQuestions";
import { geographieQuestions } from "./geographieQuestions";
import { cultureQuestions } from "./cultureQuestions";

// Helper function to format string options to object format
const formatStringOptionsToObjects = (questions: any[]): any[] => {
  return questions.map(q => ({
    ...q,
    options: Array.isArray(q.options) 
      ? q.options.map((opt: any, idx: number) => 
          typeof opt === 'string' ? { id: idx.toString(), text: opt } : opt
        )
      : []
  }));
};

// Format the question options
const formattedHistoireQuestions = formatStringOptionsToObjects(histoireQuestions);
const formattedPolitiqueQuestions = formatStringOptionsToObjects(politiqueQuestions);
const formattedGeographieQuestions = formatStringOptionsToObjects(geographieQuestions);
const formattedCultureQuestions = formatStringOptionsToObjects(cultureQuestions);

// Add some additional questions that will be imported from quizData.ts
const economieQuestions = [
  {
    id: "econ1",
    text: "Économie Camerounaise",
    question: "Quel est le secteur qui contribue le plus au PIB du Cameroun ?",
    options: [
      { id: "0", text: "Agriculture" },
      { id: "1", text: "Industrie" },
      { id: "2", text: "Services" },
      { id: "3", text: "Extraction minière" }
    ],
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
    options: [
      { id: "0", text: "Café" },
      { id: "1", text: "Cacao" },
      { id: "2", text: "Banane" },
      { id: "3", text: "Coton" }
    ],
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
      { id: "0", text: "Utiliser uniquement les médias traditionnels" },
      { id: "1", text: "Se concentrer sur les réseaux sociaux et la communication numérique" },
      { id: "2", text: "Ignorer les jeunes car ils votent peu" },
      { id: "3", text: "Communiquer uniquement via les structures éducatives" }
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
    options: [
      { id: "0", text: "Article 1" },
      { id: "1", text: "Article 2" },
      { id: "2", text: "Article 4" },
      { id: "3", text: "Article 6" }
    ],
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
    options: [
      { id: "0", text: "5 ans" },
      { id: "1", text: "7 ans" },
      { id: "2", text: "6 ans" },
      { id: "3", text: "4 ans" }
    ],
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
    questions: formattedHistoireQuestions,
    badge: "Fondamental",
    description: "Histoire et développement du Cameroun à travers les époques"
  },
  {
    id: "politique",
    name: "Science Politique",
    color: "bg-red-500",
    label: "Politique",
    icon: "Award",
    questions: formattedPolitiqueQuestions,
    badge: "Essentiel",
    description: "Concepts politiques et applications au contexte camerounais"
  },
  {
    id: "geographie",
    name: "Géographie du Cameroun",
    color: "bg-green-500",
    label: "Géographie",
    icon: "Map",
    questions: formattedGeographieQuestions,
    badge: "Découverte",
    description: "Régions, ressources et caractéristiques territoriales du Cameroun"
  },
  {
    id: "culture",
    name: "Culture Camerounaise",
    color: "bg-amber-500",
    label: "Culture",
    icon: "Music",
    questions: formattedCultureQuestions,
    badge: "Culturel",
    description: "Arts, traditions et expressions culturelles du Cameroun"
  },
  {
    id: "economie",
    name: "Économie du Cameroun",
    color: "bg-emerald-500",
    label: "Économie",
    icon: "TrendingUp",
    questions: economieQuestions,
    badge: "Avancé",
    description: "Structure économique et développement du Cameroun"
  },
  {
    id: "strategie",
    name: "Stratégie Politique",
    color: "bg-indigo-500",
    label: "Stratégie",
    icon: "Target",
    questions: strategieQuestions,
    badge: "Expert",
    description: "Méthodes et stratégies pour l'action politique efficace"
  },
  {
    id: "test",
    name: "Test Officiel MRC",
    color: "bg-purple-500",
    label: "Examen",
    icon: "FileText",
    questions: testQuestions,
    badge: "Certification",
    description: "Évaluation officielle des connaissances sur le MRC"
  }
];
