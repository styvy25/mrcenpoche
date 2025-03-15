
import { QuizQuestion } from "../../types";
import { mrcHistoryQuestions } from "./mrcHistoryQuestions";
import { mrcPrinciplesQuestions } from "./mrcPrinciplesQuestions";
import { cameroonGeographyQuestions } from "./cameroonGeographyQuestions";
import { mrcPoliciesQuestions } from "./mrcPoliciesQuestions";

// Combine all test questions from separate files
export const testQuestions: QuizQuestion[] = [
  ...mrcHistoryQuestions,
  ...mrcPrinciplesQuestions,
  ...cameroonGeographyQuestions,
  ...mrcPoliciesQuestions
];
