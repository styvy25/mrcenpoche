
import { TrainingScenario } from './TrainingScenarioCard';

export const scenarios: TrainingScenario[] = [
  {
    id: 1,
    title: "Initiation au porte-à-porte",
    level: 1,
    description: "Apprenez à présenter efficacement les idées du MRC lors de visites porte-à-porte.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    completed: true
  },
  {
    id: 2,
    title: "Argumentaire politique",
    level: 1,
    description: "Maîtrisez l'art de débattre et défendre les positions du MRC face à l'opposition.",
    image: "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
    completed: false
  },
  {
    id: 3,
    title: "Organisation d'événements locaux",
    level: 2,
    description: "Apprenez à planifier et exécuter des événements MRC dans votre communauté.",
    image: "https://images.unsplash.com/photo-1623517272043-cae1572afc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    completed: false,
    locked: true
  }
];
