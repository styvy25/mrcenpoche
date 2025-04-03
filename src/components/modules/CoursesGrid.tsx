
import { useState } from "react";
import CourseCard from "./CourseCard";
import ModuleDetail from "./ModuleDetail";

const modulesData = [
  {
    id: 1,
    title: "Histoire et Valeurs du MRC",
    description: "Découvrez l'histoire du MRC, sa création, ses fondateurs et les valeurs fondamentales qui guident le parti.",
    progress: 100,
    duration: "2h 30min",
    level: "Débutant" as const,
    isPdfAvailable: true,
    isCompleted: true,
    overview: "Ce module vous présente l'histoire complète du MRC, depuis sa création jusqu'à aujourd'hui. Vous découvrirez les valeurs fondamentales qui sont au cœur de notre mouvement, les événements clés qui ont marqué notre parcours, et les principes qui continuent de guider nos actions. À travers des leçons interactives, des témoignages de membres fondateurs et des études de cas, vous comprendrez mieux la mission et la vision du MRC pour le Cameroun.",
    lessons: [
      { id: 101, title: "Les origines du MRC", duration: "25min", isCompleted: true, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: 102, title: "Les valeurs fondamentales", duration: "30min", isCompleted: true },
      { id: 103, title: "Les figures historiques", duration: "45min", isCompleted: true },
      { id: 104, title: "Évolution et perspectives", duration: "50min", isCompleted: true }
    ],
    quizLink: "/quiz"
  },
  {
    id: 2,
    title: "Techniques de Mobilisation",
    description: "Apprenez des techniques efficaces pour mobiliser et engager les citoyens autour des idées du MRC.",
    progress: 65,
    duration: "3h 15min",
    level: "Intermédiaire" as const,
    isPdfAvailable: true,
    isCompleted: false,
    overview: "Ce module vous équipe des compétences nécessaires pour mobiliser efficacement les citoyens autour des idées et valeurs du MRC. Vous apprendrez à identifier les préoccupations des électeurs, à communiquer clairement les solutions proposées par notre parti, et à organiser des événements de sensibilisation. Des stratégies de porte-à-porte aux campagnes sur les réseaux sociaux, ce module couvre toutes les approches modernes de mobilisation politique.",
    lessons: [
      { id: 201, title: "Principes de base de la mobilisation", duration: "35min", isCompleted: true },
      { id: 202, title: "Communication interpersonnelle", duration: "45min", isCompleted: true },
      { id: 203, title: "Organisation d'événements", duration: "50min", isCompleted: false },
      { id: 204, title: "Mobilisation numérique", duration: "65min", isCompleted: false }
    ],
    quizLink: "/quiz"
  },
  {
    id: 3,
    title: "Communication Politique",
    description: "Maîtrisez l'art de la communication politique pour mieux défendre et promouvoir les idées du MRC.",
    progress: 25,
    duration: "4h 45min",
    level: "Avancé" as const,
    isPdfAvailable: false,
    isCompleted: false,
    overview: "La communication est l'une des compétences les plus cruciales en politique. Ce module vous enseigne les techniques avancées de communication politique utilisées par les professionnels. Vous apprendrez à formuler des messages percutants, à adapter votre discours à différents publics, et à gérer efficacement les situations de crise. Des exercices pratiques vous permettront de développer votre aisance à l'oral et d'affiner votre argumentaire pour défendre les positions du MRC.",
    lessons: [
      { id: 301, title: "Fondements de la communication politique", duration: "55min", isCompleted: true },
      { id: 302, title: "Techniques de persuasion", duration: "60min", isCompleted: false },
      { id: 303, title: "Gestion des médias", duration: "70min", isCompleted: false },
      { id: 304, title: "Communication de crise", duration: "80min", isCompleted: false }
    ]
  },
  {
    id: 4,
    title: "Enjeux Politiques au Cameroun",
    description: "Analyse approfondie des enjeux politiques, économiques et sociaux au Cameroun et propositions du MRC.",
    progress: 0,
    duration: "5h 30min",
    level: "Intermédiaire" as const,
    isPdfAvailable: false,
    isCompleted: false,
    overview: "Ce module offre une analyse détaillée des défis actuels auxquels le Cameroun est confronté et présente les solutions proposées par le MRC. Vous étudierez les enjeux économiques, sociaux, environnementaux et de gouvernance qui façonnent notre pays. Chaque leçon examine un aspect spécifique de la situation nationale et explique comment les politiques du MRC visent à améliorer la vie des Camerounais et à construire un avenir plus prospère pour tous.",
    lessons: [
      { id: 401, title: "Situation économique actuelle", duration: "75min", isCompleted: false },
      { id: 402, title: "Défis sociaux et solutions", duration: "80min", isCompleted: false },
      { id: 403, title: "Gouvernance et institutions", duration: "85min", isCompleted: false },
      { id: 404, title: "Politique étrangère et coopération", duration: "90min", isCompleted: false }
    ]
  },
  {
    id: 5,
    title: "Organisation de Campagne",
    description: "Guide complet pour organiser et gérer efficacement une campagne politique locale pour le MRC.",
    progress: 0,
    duration: "6h",
    level: "Avancé" as const,
    isPdfAvailable: false,
    isCompleted: false,
    overview: "Organiser une campagne politique efficace requiert une planification méticuleuse et une exécution précise. Ce module avancé vous guide à travers toutes les étapes d'une campagne réussie, de la constitution d'une équipe à la gestion des ressources, en passant par l'élaboration de stratégies de terrain. Vous apprendrez à définir des objectifs clairs, à cibler les électeurs clés, et à mettre en place un calendrier d'actions pour maximiser votre impact électoral.",
    lessons: [
      { id: 501, title: "Planification stratégique de campagne", duration: "85min", isCompleted: false },
      { id: 502, title: "Constitution et gestion d'équipe", duration: "80min", isCompleted: false },
      { id: 503, title: "Gestion des ressources", duration: "95min", isCompleted: false },
      { id: 504, title: "Jour J et suivi post-électoral", duration: "100min", isCompleted: false }
    ]
  },
];

const CoursesGrid = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  
  const selectedModule = modulesData.find(module => module.id === selectedModuleId);
  
  const handleModuleClick = (id: number) => {
    setSelectedModuleId(id);
  };
  
  const handleBackClick = () => {
    setSelectedModuleId(null);
  };

  if (selectedModule) {
    return <ModuleDetail module={selectedModule} onBack={handleBackClick} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modulesData.map((module) => (
        <div key={module.id} onClick={() => handleModuleClick(module.id)}>
          <CourseCard
            title={module.title}
            description={module.description}
            progress={module.progress}
            duration={module.duration}
            level={module.level}
            isPdfAvailable={module.isPdfAvailable}
            isCompleted={module.isCompleted}
          />
        </div>
      ))}
    </div>
  );
};

export default CoursesGrid;
