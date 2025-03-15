
import { QuizQuestion } from "./types";
import { cultureQuestions } from "./data/cultureQuestions";
import { geographieQuestions } from "./data/geographieQuestions";
import { histoireQuestions } from "./data/histoireQuestions";
import { politiqueQuestions } from "./data/politiqueQuestions";
import { traditionsQuestions } from "./data/traditionsQuestions";
import { testQuestions } from "./data/test";

// Combine all culture-related questions
export const culturalQuizQuestions: QuizQuestion[] = [
  ...cultureQuestions,
  ...geographieQuestions,
  ...histoireQuestions,
  ...politiqueQuestions,
  ...traditionsQuestions,
  ...testQuestions
];

// Export individual categories for specific quizzes
export const categories = {
  culture: cultureQuestions,
  geographie: geographieQuestions,
  histoire: histoireQuestions,
  politique: politiqueQuestions,
  traditions: traditionsQuestions,
  test: testQuestions
};
