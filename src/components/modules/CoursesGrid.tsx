import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CourseCard from "./CourseCard";
import ModuleDetail from "./ModuleDetail";
import { Module } from "./types";

// Define modules data with the correct type structure
const modulesData: Module[] = [
  {
    id: "mod1",
    title: "Histoire et Valeurs du MRC",
    description: "Découvrez l'histoire du MRC, sa création, ses fondateurs et les valeurs fondamentales qui guident le parti.",
    progress: 100,
    duration: "2h 30min",
    level: "Débutant",
    isPdfAvailable: true,
    isCompleted: true,
    coverImage: "/lovable-uploads/2f1f5377-df73-46bc-b7d2-0c3cafeb5dbb.png",
    author: "Équipe de formation du MRC",
    lessonCount: 4,
    overview: "Ce module vous présente l'histoire complète du MRC, depuis sa création jusqu'à aujourd'hui. Vous découvrirez les valeurs fondamentales qui sont au cœur de notre mouvement, les événements clés qui ont marqué notre parcours, et les principes qui continuent de guider nos actions. À travers des leçons interactives, des témoignages de membres fondateurs et des études de cas, vous comprendrez mieux la mission et la vision du MRC pour le Cameroun.",
    lessons: [
      { id: "101", title: "Les origines du MRC", duration: "25min", completed: true, type: "video", contentType: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isCompleted: true },
      { id: "102", title: "Les valeurs fondamentales", duration: "30min", completed: true, type: "text", contentType: "text", isCompleted: true },
      { id: "103", title: "Les figures historiques", duration: "45min", completed: true, type: "text", contentType: "text", isCompleted: true },
      { id: "104", title: "Évolution et perspectives", duration: "50min", completed: true, type: "text", contentType: "text", isCompleted: true }
    ],
    quizLink: "/quiz",
    category: "histoire",
    locked: false
  },
  {
    id: "mod2",
    title: "Techniques de Mobilisation",
    description: "Apprenez des techniques efficaces pour mobiliser et engager les citoyens autour des idées du MRC.",
    progress: 65,
    duration: "3h 15min",
    level: "Intermédiaire",
    isPdfAvailable: true,
    isCompleted: false,
    coverImage: "/lovable-uploads/13009c82-2883-46e9-8cda-afd9d8e16ade.jpg",
    author: "Département de mobilisation",
    lessonCount: 4,
    overview: "Ce module vous équipe des compétences nécessaires pour mobiliser efficacement les citoyens autour des idées et valeurs du MRC. Vous apprendrez à identifier les préoccupations des électeurs, à communiquer clairement les solutions proposées par notre parti, et à organiser des événements de sensibilisation. Des stratégies de porte-à-porte aux campagnes sur les réseaux sociaux, ce module couvre toutes les approches modernes de mobilisation politique.",
    lessons: [
      { id: "201", title: "Principes de base de la mobilisation", duration: "35min", completed: true, type: "text", contentType: "text", isCompleted: true },
      { id: "202", title: "Communication interpersonnelle", duration: "45min", completed: true, type: "text", contentType: "text", isCompleted: true },
      { id: "203", title: "Organisation d'événements", duration: "50min", completed: false, type: "text", contentType: "text", isCompleted: false },
      { id: "204", title: "Mobilisation numérique", duration: "65min", completed: false, type: "text", contentType: "text", isCompleted: false }
    ],
    quizLink: "/quiz",
    category: "mobilisation",
    locked: false
  },
  {
    id: "mod3",
    title: "Communication Politique",
    description: "Maîtrisez l'art de la communication politique pour mieux défendre et promouvoir les idées du MRC.",
    progress: 25,
    duration: "4h 45min",
    level: "Avancé",
    isPdfAvailable: false,
    isCompleted: false,
    coverImage: "/lovable-uploads/5487bb9e-3a94-44a0-833d-8875f1665691.png",
    author: "Équipe de communication",
    lessonCount: 4,
    overview: "La communication est l'une des compétences les plus cruciales en politique. Ce module vous enseigne les techniques avancées de communication politique utilisées par les professionnels. Vous apprendrez à formuler des messages percutants, à adapter votre discours à différents publics, et à gérer efficacement les situations de crise. Des exercices pratiques vous permettront de développer votre aisance à l'oral et d'affiner votre argumentaire pour défendre les positions du MRC.",
    lessons: [
      { id: "301", title: "Fondements de la communication politique", duration: "55min", completed: true, type: "text", contentType: "text", isCompleted: true },
      { id: "302", title: "Techniques de persuasion", duration: "60min", completed: false, type: "text", contentType: "text", isCompleted: false },
      { id: "303", title: "Gestion des médias", duration: "70min", completed: false, type: "text", contentType: "text", isCompleted: false },
      { id: "304", title: "Communication de crise", duration: "80min", completed: false, type: "text", contentType: "text", isCompleted: false }
    ],
    category: "communication",
    locked: false
  },
  {
    id: "mod4",
    title: "Enjeux Politiques au Cameroun",
    description: "Analyse approfondie des enjeux politiques, économiques et sociaux au Cameroun et propositions du MRC.",
    progress: 0,
    duration: "5h 30min",
    level: "Intermédiaire",
    isPdfAvailable: false,
    isCompleted: false,
    coverImage: "/lovable-uploads/0a7e7325-0ab5-4f67-b830-1e1b22984ac8.png",
    author: "Département d'analyse politique",
    lessonCount: 4,
    overview: "Ce module offre une analyse détaillée des défis actuels auxquels le Cameroun est confronté et présente les solutions proposées par le MRC. Vous étudierez les enjeux économiques, sociaux, environnementaux et de gouvernance qui façonnent notre pays. Chaque leçon examine un aspect spécifique de la situation nationale et explique comment les politiques du MRC visent à améliorer la vie des Camerounais et à construire un avenir plus prospère pour tous.",
    lessons: [
      { id: "401", title: "Situation économique actuelle", duration: "75min", completed: false, type: "text", contentType: "text", isCompleted: false },
      { id: "402", title: "Défis sociaux et solutions", duration: "80min", completed: false, type: "text", contentType: "text", isCompleted: false },
      { id: "403", title: "Gouvernance et institutions", duration: "85min", completed: false, type: "text", contentType: "text", isCompleted: false },
      { id: "404", title: "Politique étrangère et coopération", duration: "90min", completed: false, type: "text", contentType: "text", isCompleted: false }
    ],
    category: "politique",
    locked: false
  },
  {
    id: "mod5",
    title: "Organisation de Campagne",
    description: "Guide complet pour organiser et gérer efficacement une campagne politique locale pour le MRC.",
    progress: 0,
    duration: "6h",
    level: "Avancé",
    isPdfAvailable: false,
    isCompleted: false,
    coverImage: "/lovable-uploads/487ae071-af40-445e-b753-7fea7f39e90f.png",
    author: "Équipe de stratégie électorale",
    lessonCount: 4,
    overview: "Organiser une campagne politique efficace requiert une planification méticuleuse et une exécution précise. Ce module avancé vous guide à travers toutes les étapes d'une campagne réussie, de la constitution d'une équipe à la gestion des ressources, en passant par l'élaboration de stratégies de terrain. Vous apprendrez à définir des objectifs clairs, à cibler les électeurs clés, et à mettre en place un calendrier d'actions pour maximiser votre impact électoral.",
    lessons: [
      { id: "501", title: "Planification stratégique de campagne", duration: "85min", completed: false, type: "text", contentType: "text", isCompleted: false },
      { id: "502", title: "Constitution et gestion d'équipe", duration: "80min", completed: false, type: "text", contentType: "text", isCompleted: false },
      { id: "503", title: "Gestion des ressources", duration: "95min", completed: false, type: "text", contentType: "text", isCompleted: false },
      { id: "504", title: "Jour J et suivi post-électoral", duration: "100min", completed: false, type: "text", contentType: "text", isCompleted: false }
    ],
    category: "campagne",
    locked: false
  },
];

const CoursesGrid = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  
  const selectedModule = modulesData.find(module => module.id === selectedModuleId);
  
  const handleModuleClick = (id: string) => {
    setSelectedModuleId(id);
  };
  
  const handleBackClick = () => {
    setSelectedModuleId(null);
  };

  if (selectedModule) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ModuleDetail module={selectedModule} onBack={handleBackClick} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {modulesData.map((module, index) => (
          <motion.div 
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => handleModuleClick(module.id)}
          >
            <CourseCard
              title={module.title}
              description={module.description}
              progress={module.progress || 0}
              duration={module.duration}
              level={module.level}
              isPdfAvailable={module.isPdfAvailable}
              isCompleted={module.isCompleted}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CoursesGrid;
