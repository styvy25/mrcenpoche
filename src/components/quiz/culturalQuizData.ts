
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

// Export individual categories
export const categories = {
  culture: cultureQuestions,
  geographie: geographieQuestions,
  histoire: histoireQuestions,
  politique: politiqueQuestions,
  traditions: traditionsQuestions,
  test: testQuestions
};

// Export a combined object for better importing
export const culturalQuizData = {
  quizQuestions: culturalQuizQuestions,
  categories: [
    { id: "culture", name: "Culture", badge: "culture_expert", color: "green", icon: "book", description: "Questions sur la culture camerounaise" },
    { id: "geographie", name: "Géographie", badge: "geo_expert", color: "blue", icon: "map", description: "Questions sur la géographie du Cameroun" },
    { id: "histoire", name: "Histoire", badge: "history_expert", color: "red", icon: "clock", description: "Questions sur l'histoire du Cameroun" },
    { id: "politique", name: "Politique", badge: "politics_expert", color: "purple", icon: "landmark", description: "Questions sur la politique camerounaise" },
    { id: "traditions", name: "Traditions", badge: "traditions_expert", color: "yellow", icon: "users", description: "Questions sur les traditions camerounaises" },
    { id: "test", name: "Test", badge: "test_expert", color: "gray", icon: "check", description: "Questions de test" }
  ]
};

// Make sure to export the culturalQuizData as default as well
export default culturalQuizData;
