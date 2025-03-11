
// This is a placeholder file to resolve TypeScript errors
// The actual quiz data is in the data directory
// This file is not used in the application

import { Question } from "./types";

const placeholderQuestions: Question[] = [
  {
    id: "1",
    text: "Placeholder question 1",
    answers: [
      { id: "1", text: "Option 1", isCorrect: false },
      { id: "2", text: "Option 2", isCorrect: false },
      { id: "3", text: "Option 3", isCorrect: false },
      { id: "4", text: "Option 4", isCorrect: true },
    ],
    explanation: "This is a placeholder"
  }
];

export default placeholderQuestions;
