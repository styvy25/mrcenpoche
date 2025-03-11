
import { QuizQuestion, Category } from "./types";
import { cultureQuestions } from "./data/cultureQuestions";
import { histoireQuestions } from "./data/histoireQuestions";
import { traditionsQuestions } from "./data/traditionsQuestions";
import { politiqueQuestions } from "./data/politiqueQuestions";
import { geographieQuestions } from "./data/geographieQuestions";
import { categories } from "./data/categories";

export const culturalQuizQuestions: QuizQuestion[] = [
  ...cultureQuestions,
  ...histoireQuestions,
  ...traditionsQuestions,
  ...politiqueQuestions,
  ...geographieQuestions
];

export const culturalQuizData = {
  categories: categories,
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
