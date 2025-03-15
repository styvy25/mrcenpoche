
import { Challenge } from './types';

// Available challenges for the application
export const challenges: Challenge[] = [
  {
    id: "daily-1",
    title: "Histoire du MRC",
    description: "Découvrez les origines et l'histoire du Mouvement pour la Renaissance du Cameroun à travers ce quiz éducatif.",
    points: 50,
    type: "quiz",
    difficulty: "facile",
    estimatedTime: 10,
    progress: 0
  },
  {
    id: "daily-2",
    title: "Principes fondamentaux",
    description: "Apprenez les valeurs et principes fondamentaux qui guident l'action politique du MRC.",
    points: 75,
    type: "reading",
    difficulty: "moyen",
    estimatedTime: 15,
    progress: 0
  },
  {
    id: "daily-3",
    title: "Discours emblématiques",
    description: "Écoutez et analysez les discours marquants du président Maurice Kamto.",
    points: 100,
    type: "video",
    difficulty: "moyen",
    estimatedTime: 20,
    progress: 0
  },
  {
    id: "daily-4",
    title: "Propositions économiques",
    description: "Étudiez en détail les propositions économiques du MRC pour relancer l'économie camerounaise.",
    points: 125,
    type: "practice",
    difficulty: "difficile",
    estimatedTime: 30,
    progress: 0
  }
];

// Function to get a random challenge
export const getRandomChallenge = (): Challenge => {
  const randomIndex = Math.floor(Math.random() * challenges.length);
  return challenges[randomIndex];
};

// Prizes and rewards
export interface Prize {
  id: string;
  name: string;
  points: number;
  description: string;
  image?: string;
}

export const availablePrizes: Prize[] = [
  {
    id: "badge-1",
    name: "Badge Militant",
    points: 200,
    description: "Récompense pour avoir complété 5 défis quotidiens"
  },
  {
    id: "certificate-1",
    name: "Certificat de Formation",
    points: 500,
    description: "Atteste de votre maîtrise des principes fondamentaux du MRC"
  },
  {
    id: "premium-1",
    name: "Accès Premium",
    points: 1000,
    description: "Débloque l'accès à des contenus exclusifs pendant 1 mois"
  }
];
