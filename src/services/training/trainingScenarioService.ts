
export interface TrainingScenario {
  id: string;
  title: string;
  description: string;
  level: number;
  image: string;
  completed: boolean;
  locked: boolean;
}

// Static data for training scenarios
const staticTrainingScenarios: TrainingScenario[] = [
  {
    id: "1",
    title: "Mobilisation de terrain",
    description: "Apprenez les techniques efficaces de mobilisation des électeurs sur le terrain. Maîtrisez l'art du porte-à-porte et des réunions communautaires.",
    level: 1,
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    completed: false,
    locked: false
  },
  {
    id: "2",
    title: "Communication politique",
    description: "Maîtrisez l'art de communiquer efficacement les idées politiques. Développez une rhétorique convaincante et apprenez à créer des messages impactants.",
    level: 2,
    image: "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
    completed: false,
    locked: false
  },
  {
    id: "3",
    title: "Gestion de crise",
    description: "Développez des compétences pour gérer les situations de crise politique. Apprenez à réagir efficacement face aux controverses et aux attaques des opposants.",
    level: 3,
    image: "https://images.unsplash.com/photo-1623517272043-cae1572afc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    completed: false,
    locked: true
  },
  {
    id: "4",
    title: "Débat électoral",
    description: "Techniques pour exceller lors des débats politiques face aux opposants. Préparez-vous à défendre vos positions et à contrer les arguments adverses.",
    level: 2,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    completed: false,
    locked: false
  },
  {
    id: "5",
    title: "Analyse stratégique",
    description: "Apprenez à analyser le paysage politique et à développer des stratégies gagnantes. Identifiez les opportunités et anticipez les mouvements de vos adversaires.",
    level: 3,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    completed: false,
    locked: true
  }
];

export const fetchTrainingScenarios = async (): Promise<TrainingScenario[]> => {
  try {
    // Simulating a network request
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(staticTrainingScenarios);
      }, 500);
    });
  } catch (error) {
    console.error("Failed to fetch training scenarios:", error);
    return [];
  }
};

export const updateScenarioProgress = async (id: string, completed: boolean): Promise<void> => {
  try {
    // Simulating a network request
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would update the database
        console.log(`Scenario ${id} marked as ${completed ? 'completed' : 'incomplete'}`);
        resolve();
      }, 300);
    });
  } catch (error) {
    console.error("Failed to update scenario progress:", error);
  }
};
