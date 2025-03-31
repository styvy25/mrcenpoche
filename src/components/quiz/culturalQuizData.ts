
import { QuizQuestion, Category } from "./types";
import { cultureQuestions } from "./data/cultureQuestions";
import { geographieQuestions } from "./data/geographieQuestions";
import { histoireQuestions } from "./data/histoireQuestions";
import { politiqueQuestions } from "./data/politiqueQuestions";
import { traditionsQuestions } from "./data/traditionsQuestions";
import { testQuestions } from "./data/test";
import { categories as categoryData } from "./data/categories";

// Format questions to match the QuizQuestion type
const formatQuestions = (questions: any[]): QuizQuestion[] => {
  return questions.map(q => ({
    id: q.id || String(Math.random().toString(36).substring(2)),
    question: q.question,
    options: q.options || (q.answers ? q.answers.map((a: any) => a.text) : []),
    correctAnswer: q.correctAnswer !== undefined 
      ? q.correctAnswer 
      : (q.answers 
          ? q.answers.findIndex((a: any) => a.isCorrect) 
          : 0),
    explanation: q.explanation || "",
    difficulty: q.difficulty || "moyen",
    imageSrc: q.imageSrc || undefined
  }));
};

// Combine all culture-related questions
export const culturalQuizQuestions: QuizQuestion[] = [
  ...formatQuestions(cultureQuestions),
  ...formatQuestions(geographieQuestions),
  ...formatQuestions(histoireQuestions),
  ...formatQuestions(politiqueQuestions),
  ...formatQuestions(traditionsQuestions),
  ...formatQuestions(testQuestions)
];

// Create category objects with their respective questions
const createCategory = (id: string, name: string, questions: any[], color: string, icon: string, description: string): Category => ({
  id,
  name,
  label: name,
  description,
  color,
  questions: formatQuestions(questions)
});

// Create formatted categories with questions
const formattedCategories = [
  createCategory("culture", "Culture", cultureQuestions, "green", "book", "Questions sur la culture camerounaise"),
  createCategory("geographie", "Géographie", geographieQuestions, "blue", "map", "Questions sur la géographie du Cameroun"),
  createCategory("histoire", "Histoire", histoireQuestions, "red", "clock", "Questions sur l'histoire du Cameroun"),
  createCategory("politique", "Politique", politiqueQuestions, "purple", "landmark", "Questions sur la politique camerounaise"),
  createCategory("traditions", "Traditions", traditionsQuestions, "yellow", "users", "Questions sur les traditions camerounaises"),
  createCategory("test", "Test", testQuestions, "gray", "check", "Questions de test")
];

// Export a combined object for better importing
export const culturalQuizData = {
  quizQuestions: culturalQuizQuestions,
  categories: formattedCategories
};

// Make sure to export the known category data from categories.ts for consistency
export { categoryData as categoriesData };

// Make sure to export the culturalQuizData as default as well
export default culturalQuizData;
