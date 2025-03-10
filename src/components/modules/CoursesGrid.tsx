
import CourseCard from "./CourseCard";

const coursesData = [
  {
    id: 1,
    title: "Histoire et Valeurs du MRC",
    description: "Découvrez l'histoire du MRC, sa création, ses fondateurs et les valeurs fondamentales qui guident le parti.",
    progress: 100,
    duration: "2h 30min",
    level: "Débutant" as const,
    isPdfAvailable: true,
    isCompleted: true
  },
  {
    id: 2,
    title: "Techniques de Mobilisation",
    description: "Apprenez des techniques efficaces pour mobiliser et engager les citoyens autour des idées du MRC.",
    progress: 65,
    duration: "3h 15min",
    level: "Intermédiaire" as const,
    isPdfAvailable: true,
    isCompleted: false
  },
  {
    id: 3,
    title: "Communication Politique",
    description: "Maîtrisez l'art de la communication politique pour mieux défendre et promouvoir les idées du MRC.",
    progress: 25,
    duration: "4h 45min",
    level: "Avancé" as const,
    isPdfAvailable: false,
    isCompleted: false
  },
  {
    id: 4,
    title: "Enjeux Politiques au Cameroun",
    description: "Analyse approfondie des enjeux politiques, économiques et sociaux au Cameroun et propositions du MRC.",
    progress: 0,
    duration: "5h 30min",
    level: "Intermédiaire" as const,
    isPdfAvailable: false,
    isCompleted: false
  },
  {
    id: 5,
    title: "Organisation de Campagne",
    description: "Guide complet pour organiser et gérer efficacement une campagne politique locale pour le MRC.",
    progress: 0,
    duration: "6h",
    level: "Avancé" as const,
    isPdfAvailable: false,
    isCompleted: false
  },
];

const CoursesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coursesData.map((course) => (
        <CourseCard
          key={course.id}
          title={course.title}
          description={course.description}
          progress={course.progress}
          duration={course.duration}
          level={course.level}
          isPdfAvailable={course.isPdfAvailable}
          isCompleted={course.isCompleted}
        />
      ))}
    </div>
  );
};

export default CoursesGrid;
