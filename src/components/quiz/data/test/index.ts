
import { cameroonGeographyQuestions } from './cameroonGeographyQuestions';
import { mrcHistoryQuestions } from './mrcHistoryQuestions';
import { mrcPoliciesQuestions } from './mrcPoliciesQuestions';
import { mrcPrinciplesQuestions } from './mrcPrinciplesQuestions';

// Combined questions from all categories
const allQuestions = [
  ...cameroonGeographyQuestions,
  ...mrcHistoryQuestions,
  ...mrcPoliciesQuestions,
  ...mrcPrinciplesQuestions
];

/**
 * Get random questions from all available questions
 * @param count Number of questions to return
 * @returns Array of random questions
 */
export const getRandomQuestions = (count: number) => {
  // Shuffle all questions
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  
  // Return the requested number of questions (or all if count is greater than available)
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

/**
 * Get questions by category
 * @param category Category to filter by
 * @returns Array of questions in the category
 */
export const getQuestionsByCategory = (category: string) => {
  switch (category.toLowerCase()) {
    case 'geography':
    case 'géographie':
      return cameroonGeographyQuestions;
    case 'history':
    case 'histoire':
      return mrcHistoryQuestions;
    case 'policies':
    case 'politiques':
      return mrcPoliciesQuestions;
    case 'principles':
    case 'principes':
      return mrcPrinciplesQuestions;
    default:
      return allQuestions;
  }
};
