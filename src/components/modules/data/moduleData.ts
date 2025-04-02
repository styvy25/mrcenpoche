
import { Module } from "../types";

export const modules: Module[] = [
  {
    id: "histoire",
    title: "Histoire et Valeurs du MRC",
    description: "Découvrez les fondements et principes du Mouvement pour la Renaissance du Cameroun",
    icon: "BookOpen",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    duration: "2h 30min",
    level: "Débutant",
    difficulty: "beginner",
    category: "fundamental",
    categoryName: "Fondamentaux",
    type: "core",
    locked: false,
    isNew: false,
    progress: 75,
    rating: 4.8,
    completed: false,
    requiredLevel: 1,
    featured: true,
    isPdfAvailable: true,
    isCompleted: false,
    lessons: [
      {
        id: 1,
        title: "Origines et création du MRC",
        duration: "20 min",
        isCompleted: true,
        content: "Le Mouvement pour la Renaissance du Cameroun (MRC) a été fondé en août 2012 par Maurice Kamto, accompagné d'autres intellectuels et personnalités politiques camerounaises. La création du parti est survenue dans un contexte de besoin de renouveau politique et de propositions alternatives pour le développement du Cameroun. Les fondateurs partageaient une vision commune d'un Cameroun plus démocratique, plus juste et plus prospère."
      },
      {
        id: 2,
        title: "Valeurs fondamentales et idéologie",
        duration: "25 min",
        isCompleted: true,
        content: "Le MRC s'appuie sur plusieurs valeurs fondamentales: la démocratie participative, la justice sociale, la bonne gouvernance, la transparence et l'intégrité. Le parti prône une approche pragmatique de la politique, centrée sur les besoins réels des citoyens camerounais. L'idéologie du MRC peut être qualifiée de progressiste et sociale-démocrate, avec un accent particulier sur la redistribution équitable des ressources et la décentralisation du pouvoir."
      },
      {
        id: 3,
        title: "Structure et organisation",
        duration: "30 min",
        isCompleted: true,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 4,
        title: "Le MRC dans le paysage politique camerounais",
        duration: "40 min",
        isCompleted: false,
        isLocked: false,
      },
      {
        id: 5,
        title: "Vision et projet de société",
        duration: "35 min",
        isCompleted: false,
        isLocked: true,
      }
    ]
  },
  {
    id: "mobilisation",
    title: "Techniques de mobilisation",
    description: "Apprenez à mobiliser efficacement les électeurs et sympathisants",
    icon: "Users",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    duration: "3h 15min",
    level: "Intermédiaire",
    difficulty: "intermediate",
    category: "strategy",
    categoryName: "Stratégie",
    type: "advanced",
    locked: false,
    isNew: true,
    progress: 30,
    rating: 4.5,
    completed: false,
    requiredLevel: 2,
    featured: false,
    isPdfAvailable: true,
    lessons: [
      {
        id: 1,
        title: "Stratégies de mobilisation locale",
        duration: "45 min",
        isCompleted: true,
      },
      {
        id: 2,
        title: "Organisation d'événements communautaires",
        duration: "40 min",
        isCompleted: false,
      },
      {
        id: 3,
        title: "Techniques de porte-à-porte",
        duration: "35 min",
        isCompleted: false,
      },
      {
        id: 4,
        title: "Mobilisation numérique et réseaux sociaux",
        duration: "50 min",
        isCompleted: false,
      },
      {
        id: 5,
        title: "Fidélisation des sympathisants",
        duration: "25 min",
        isCompleted: false,
      }
    ]
  },
  {
    id: "communication",
    title: "Communication politique",
    description: "Maîtrisez l'art de communiquer efficacement en politique",
    icon: "MessageSquare",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    duration: "2h 45min",
    level: "Intermédiaire",
    difficulty: "intermediate", 
    category: "communication",
    categoryName: "Communication",
    type: "core",
    locked: false,
    isNew: false,
    progress: 50,
    rating: 4.7,
    completed: false,
    requiredLevel: 2,
    lessons: [
      {
        id: 1,
        title: "Principes de communication politique",
        duration: "30 min",
        isCompleted: true,
      },
      {
        id: 2,
        title: "Construction d'un message efficace",
        duration: "35 min",
        isCompleted: true,
      },
      {
        id: 3,
        title: "Communication de crise",
        duration: "40 min",
        isCompleted: false,
      },
      {
        id: 4,
        title: "Relations avec les médias",
        duration: "30 min",
        isCompleted: false,
      },
      {
        id: 5,
        title: "Prise de parole en public",
        duration: "30 min",
        isCompleted: false,
      }
    ]
  },
  {
    id: "enjeux",
    title: "Enjeux nationaux",
    description: "Comprendre les défis majeurs auxquels fait face le Cameroun",
    icon: "Map",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    duration: "4h",
    level: "Avancé",
    difficulty: "advanced",
    category: "policy",
    categoryName: "Politiques",
    type: "special",
    locked: true,
    isNew: false,
    progress: 0,
    rating: 4.9,
    completed: false,
    requiredLevel: 3,
    lessons: [
      {
        id: 1,
        title: "Économie et développement",
        duration: "50 min",
        isCompleted: false,
      },
      {
        id: 2,
        title: "Éducation et formation",
        duration: "45 min",
        isCompleted: false,
      },
      {
        id: 3,
        title: "Santé publique",
        duration: "40 min",
        isCompleted: false,
      },
      {
        id: 4,
        title: "Gouvernance et décentralisation",
        duration: "50 min",
        isCompleted: false,
      },
      {
        id: 5,
        title: "Unité nationale et paix sociale",
        duration: "55 min",
        isCompleted: false,
      }
    ]
  },
  {
    id: "campagne",
    title: "Gestion de campagne",
    description: "Apprenez à organiser et gérer une campagne électorale efficace",
    icon: "TrendingUp",
    image: "https://images.unsplash.com/photo-1623517272043-cae1572afc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    duration: "5h 30min",
    level: "Expert",
    difficulty: "advanced",
    category: "campaign",
    categoryName: "Campagne",
    type: "exam",
    locked: true,
    isNew: true,
    progress: 0,
    rating: 5.0,
    completed: false,
    requiredLevel: 4,
    lessons: [
      {
        id: 1,
        title: "Planification stratégique de campagne",
        duration: "60 min",
        isCompleted: false,
      },
      {
        id: 2,
        title: "Financement et budget de campagne",
        duration: "55 min",
        isCompleted: false,
      },
      {
        id: 3,
        title: "Coordination des équipes sur le terrain",
        duration: "50 min",
        isCompleted: false,
      },
      {
        id: 4,
        title: "Stratégies de communication électorale",
        duration: "65 min",
        isCompleted: false,
      },
      {
        id: 5,
        title: "Jour J et mobilisation des électeurs",
        duration: "50 min",
        isCompleted: false,
      }
    ]
  }
];

export const categories = [
  {
    id: "all",
    name: "Tous les modules",
    color: "bg-gradient-to-r from-blue-500 to-purple-500"
  },
  {
    id: "fundamental",
    name: "Fondamentaux",
    color: "bg-gradient-to-r from-green-500 to-emerald-500"
  },
  {
    id: "strategy",
    name: "Stratégie",
    color: "bg-gradient-to-r from-blue-500 to-cyan-500"
  },
  {
    id: "communication",
    name: "Communication",
    color: "bg-gradient-to-r from-yellow-500 to-orange-500"
  },
  {
    id: "policy",
    name: "Politiques",
    color: "bg-gradient-to-r from-purple-500 to-pink-500"
  },
  {
    id: "campaign",
    name: "Campagne",
    color: "bg-gradient-to-r from-red-500 to-orange-500"
  }
];

export const featuredModule = modules.find(m => m.featured);

export const getModuleById = (id: string): Module | undefined => {
  return modules.find(m => m.id === id);
};

export const getModulesByCategory = (categoryId: string): Module[] => {
  if (categoryId === 'all') {
    return modules;
  }
  return modules.filter(m => m.category === categoryId);
};
