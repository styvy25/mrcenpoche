
import { getPerplexityResponse } from "@/components/assistant/services/perplexityService";

// Types
export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  author: string;
  dateCreated: Date;
  lastUpdated: Date;
  pdfUrl?: string;
  imageUrl?: string;
  tags: string[];
}

export interface CourseCategory {
  id: string;
  name: string;
  description: string;
  count: number;
}

// Mock data for course categories
export const COURSE_CATEGORIES: CourseCategory[] = [
  {
    id: "histoire-mrc",
    name: "Histoire du MRC",
    description: "L'histoire et les origines du Mouvement pour la Renaissance du Cameroun",
    count: 3
  },
  {
    id: "politique-camerounaise",
    name: "Politique Camerounaise",
    description: "Le système politique et les institutions du Cameroun",
    count: 4
  },
  {
    id: "enjeux-electoraux",
    name: "Enjeux Électoraux",
    description: "Les défis et stratégies électorales au Cameroun",
    count: 2
  },
  {
    id: "droits-citoyens",
    name: "Droits des Citoyens",
    description: "Les droits et devoirs des citoyens camerounais",
    count: 2
  },
  {
    id: "reformes",
    name: "Réformes Politiques",
    description: "Propositions de réformes politiques et institutionnelles",
    count: 3
  }
];

// Mock data for courses
export const MOCK_COURSES: Course[] = [
  {
    id: "histoire-mrc-fondation",
    title: "Fondation du MRC",
    description: "Histoire de la création et des débuts du Mouvement pour la Renaissance du Cameroun",
    category: "histoire-mrc",
    content: "Le Mouvement pour la Renaissance du Cameroun (MRC) a été fondé en août 2012 par Maurice Kamto, ancien ministre délégué à la Justice...",
    author: "Équipe pédagogique MRC",
    dateCreated: new Date("2022-01-15"),
    lastUpdated: new Date("2023-06-20"),
    pdfUrl: "/courses/pdf/histoire-mrc-fondation.pdf",
    imageUrl: "/lovable-uploads/13009c82-2883-46e9-8cda-afd9d8e16ade.jpg",
    tags: ["Histoire", "MRC", "Kamto", "Fondation"]
  },
  {
    id: "politique-camerounaise-institutions",
    title: "Les Institutions Camerounaises",
    description: "Présentation et analyse des institutions politiques du Cameroun",
    category: "politique-camerounaise",
    content: "Le Cameroun est une république présidentielle où le Président est à la fois chef de l'État et chef du gouvernement...",
    author: "Équipe pédagogique MRC",
    dateCreated: new Date("2022-03-10"),
    lastUpdated: new Date("2023-07-15"),
    pdfUrl: "/courses/pdf/institutions-camerounaises.pdf",
    imageUrl: "/lovable-uploads/2f1f5377-df73-46bc-b7d2-0c3cafeb5dbb.png",
    tags: ["Institutions", "Politique", "Cameroun", "Gouvernement"]
  },
  {
    id: "enjeux-electoraux-processus",
    title: "Le Processus Électoral au Cameroun",
    description: "Analyse du processus électoral et des défis associés",
    category: "enjeux-electoraux",
    content: "Le processus électoral au Cameroun est encadré par ELECAM (Elections Cameroon), un organisme créé en 2006...",
    author: "Équipe pédagogique MRC",
    dateCreated: new Date("2022-05-20"),
    lastUpdated: new Date("2023-08-01"),
    pdfUrl: "/courses/pdf/processus-electoral.pdf",
    imageUrl: "/lovable-uploads/487ae071-af40-445e-b753-7fea7f39e90f.png",
    tags: ["Élections", "ELECAM", "Démocratie", "Vote"]
  }
];

// Get API key from localStorage
const getPerplexityApiKey = (): string | null => {
  try {
    const apiKeys = localStorage.getItem("api_keys");
    if (apiKeys) {
      const keys = JSON.parse(apiKeys);
      return keys.perplexity || null;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving Perplexity API key:", error);
    return null;
  }
};

// Get all courses
export const getAllCourses = (): Course[] => {
  // In a real app, this would fetch from a database
  return MOCK_COURSES;
};

// Get courses by category
export const getCoursesByCategory = (categoryId: string): Course[] => {
  return MOCK_COURSES.filter(course => course.category === categoryId);
};

// Get course by ID
export const getCourseById = (courseId: string): Course | undefined => {
  return MOCK_COURSES.find(course => course.id === courseId);
};

// Get all categories
export const getAllCategories = (): CourseCategory[] => {
  return COURSE_CATEGORIES;
};

// Generate course content with Perplexity AI
export const generateCourseContent = async (
  topic: string,
  context: string
): Promise<string | null> => {
  const apiKey = getPerplexityApiKey();
  
  if (!apiKey) {
    console.error("Perplexity API key not found");
    return null;
  }

  try {
    const prompt = `Rédige un cours éducatif sur le sujet suivant: "${topic}" 
    dans le contexte de "${context}".
    
    Le cours doit:
    - Faire entre 1000 et 1500 mots
    - Être structuré avec une introduction, des parties et sous-parties, et une conclusion
    - Inclure des faits historiques précis et datés
    - Présenter différentes perspectives politiques de manière objective
    - Être rédigé dans un style académique mais accessible
    - Mettre en évidence les positions et perspectives du MRC (Mouvement pour la Renaissance du Cameroun) sur ce sujet
    
    Écris en français avec un ton pédagogique et informatif.`;

    const response = await getPerplexityResponse(apiKey, prompt);
    return response;
  } catch (error) {
    console.error("Error generating course content:", error);
    return null;
  }
};

// Save a new course (mock implementation)
export const saveCourse = (course: Omit<Course, 'id' | 'dateCreated' | 'lastUpdated'>): Course => {
  // In a real app, this would save to a database
  const newCourse: Course = {
    ...course,
    id: `course-${Date.now()}`,
    dateCreated: new Date(),
    lastUpdated: new Date()
  };
  
  // Mock saving to database
  console.log("Course saved:", newCourse);
  
  // Return the new course with generated ID and dates
  return newCourse;
};
