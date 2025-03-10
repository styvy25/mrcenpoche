
import { Challenge } from "./types";

// Array of possible daily challenges
export const challenges: Challenge[] = [
  {
    id: "challenge_1",
    title: "Quiz sur l'Histoire du MRC",
    description: "Complétez un quiz de 5 questions sur l'histoire et les valeurs fondamentales du MRC.",
    points: 20,
    type: "quiz",
    difficulty: "facile",
    estimatedTime: 5
  },
  {
    id: "challenge_2",
    title: "Techniques de Communication",
    description: "Étudiez les principes de base de la communication politique efficace.",
    points: 15,
    type: "reading",
    difficulty: "moyen",
    estimatedTime: 10
  },
  {
    id: "challenge_3",
    title: "Mobilisation Communautaire",
    description: "Apprenez les méthodes de mobilisation citoyenne à travers une vidéo explicative.",
    points: 25,
    type: "video",
    difficulty: "moyen",
    estimatedTime: 8
  },
  {
    id: "challenge_4",
    title: "Analyse des Enjeux Politiques",
    description: "Analysez un enjeu politique majeur au Cameroun et proposez des solutions.",
    points: 30,
    type: "practice",
    difficulty: "difficile",
    estimatedTime: 15
  },
  {
    id: "challenge_5",
    title: "Organisation de Campagne",
    description: "Découvrez les bases de l'organisation d'une campagne politique efficace.",
    points: 20,
    type: "reading",
    difficulty: "moyen",
    estimatedTime: 12
  }
];
