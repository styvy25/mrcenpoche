import { Challenge, Prize } from './types';

// Add this function if it doesn't exist
export const getRandomChallenge = (): Challenge => {
  // Return a sample challenge for now
  return {
    id: "daily-challenge-1",
    title: "Comprendre les principes du MRC",
    description: "Lisez l'article sur les principes fondamentaux du MRC et répondez aux questions.",
    difficulty: "medium",
    points: 50,
    completed: false,
    timeEstimate: "10 min",
    estimatedTime: "10",
    type: "lecture",
    steps: [
      "Lire l'article sur les principes du MRC",
      "Répondre aux 5 questions de compréhension",
      "Partager une réflexion personnelle"
    ],
    category: "politique",
    prize: {
      id: "badge-1",
      name: "Badge Initié",
      description: "Vous avez compris les principes fondamentaux du MRC"
    }
  };
};
