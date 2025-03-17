
import { culturalQuizData } from "@/components/quiz/culturalQuizData";
import { modulesData } from "@/components/modules/data/modulesData";

// Sample opening questions
const openingQuestions = [
  "Bienvenue ! Que souhaitez-vous apprendre sur le MRC aujourd'hui ?",
  "Bonjour, je suis Styvy237, votre assistant politique du MRC. Comment puis-je vous aider ?",
  "Avez-vous des questions sur les positions politiques du MRC ?",
  "Bienvenue sur MRC en Poche ! Souhaitez-vous discuter des enjeux politiques actuels ?",
  "Bonjour ! Souhaitez-vous tester vos connaissances sur le Cameroun ou en apprendre davantage sur le MRC ?"
];

// Get a random quiz question
export const getRandomQuizQuestion = () => {
  const allQuestions = culturalQuizData.quizQuestions || [];
  if (allQuestions.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * allQuestions.length);
  return allQuestions[randomIndex];
};

// Get a random module lesson
export const getRandomModuleLesson = () => {
  if (modulesData.length === 0) return null;
  
  const randomModuleIndex = Math.floor(Math.random() * modulesData.length);
  const randomModule = modulesData[randomModuleIndex];
  
  if (!randomModule.lessons || randomModule.lessons.length === 0) return null;
  
  const randomLessonIndex = Math.floor(Math.random() * randomModule.lessons.length);
  return {
    module: randomModule.title,
    lesson: randomModule.lessons[randomLessonIndex]
  };
};

// Generate a proactive message
export const generateProactiveMessage = (): string => {
  // 50% chance to ask an opening question
  if (Math.random() < 0.5) {
    const randomIndex = Math.floor(Math.random() * openingQuestions.length);
    return openingQuestions[randomIndex];
  }
  
  // 25% chance to ask a quiz question
  if (Math.random() < 0.5) {
    const quizQuestion = getRandomQuizQuestion();
    if (quizQuestion) {
      return `Question quiz: ${quizQuestion.question}\n\nOptions: ${quizQuestion.options.join(', ')}`;
    }
  }
  
  // 25% chance to suggest a module lesson
  const moduleLesson = getRandomModuleLesson();
  if (moduleLesson) {
    return `Avez-vous étudié le module "${moduleLesson.module}" ? J'ai une leçon intéressante sur "${moduleLesson.lesson.title}" que vous pourriez aimer découvrir. Souhaitez-vous en savoir plus ?`;
  }
  
  // Fallback
  return "Comment puis-je vous aider aujourd'hui avec votre apprentissage sur le MRC ?";
};

// Check if a message is a question about modules
export const isModuleQuestion = (message: string): boolean => {
  const moduleKeywords = [
    'module', 'leçon', 'apprendre', 'formation', 'étudier', 'cours'
  ];
  
  return moduleKeywords.some(keyword => 
    message.toLowerCase().includes(keyword.toLowerCase())
  );
};

// Check if a message is a question about quizzes
export const isQuizQuestion = (message: string): boolean => {
  const quizKeywords = [
    'quiz', 'question', 'test', 'évaluation', 'connaissance', 'culture'
  ];
  
  return quizKeywords.some(keyword => 
    message.toLowerCase().includes(keyword.toLowerCase())
  );
};

// Generate a contextual response based on the user's message
export const generateContextualResponse = (message: string): string => {
  if (isModuleQuestion(message)) {
    const moduleLesson = getRandomModuleLesson();
    if (moduleLesson) {
      return `Dans le module "${moduleLesson.module}", vous pouvez apprendre sur "${moduleLesson.lesson.title}". Voici un extrait: ${moduleLesson.lesson.content ? moduleLesson.lesson.content.substring(0, 150) + "..." : "Contenu non disponible actuellement."}`;
    }
  }
  
  if (isQuizQuestion(message)) {
    const quizQuestion = getRandomQuizQuestion();
    if (quizQuestion) {
      return `Testons vos connaissances: ${quizQuestion.question}\n\nOptions: ${quizQuestion.options.join(', ')}`;
    }
  }
  
  return "";
};

// Suggestions for follow-up questions
export const getFollowUpSuggestions = (): string[] => {
  return [
    "Quelles sont les positions du MRC sur l'économie ?",
    "Comment le MRC compte-t-il améliorer le système éducatif ?",
    "Parlez-moi des valeurs fondamentales du MRC",
    "Quels sont les principaux défis politiques au Cameroun ?",
    "Comment puis-je m'impliquer dans le MRC ?",
    "Quels sont les projets du MRC pour la jeunesse ?",
    "Pouvez-vous me donner un quiz sur la politique camerounaise ?"
  ];
};
