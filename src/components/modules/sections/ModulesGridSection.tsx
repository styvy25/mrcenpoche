
// Import necessary components and types
import { Button } from "@/components/ui/button";
import CoursesGrid, { CoursesGridProps } from "../CoursesGrid";
import { useNavigate } from "react-router-dom";

// Sample courses data
const sampleCourses = [
  {
    id: 1,
    title: "Introduction au MRC",
    description: "Découvrez les fondamentaux du Mouvement pour la Renaissance du Cameroun",
    category: "general",
    image: "/lovable-uploads/e326c83f-f666-44e5-9da1-72639a1027e0.png",
    level: "beginner" as const,
    duration: "2h30",
    lessons: 5,
    premium: false
  },
  {
    id: 2,
    title: "Techniques de mobilisation",
    description: "Apprenez à mobiliser et organiser des événements efficaces",
    category: "general",
    level: "intermediate" as const,
    duration: "3h45",
    lessons: 8,
    premium: true
  },
  {
    id: 3,
    title: "Communication politique",
    description: "Maîtrisez la communication et le discours politique",
    category: "chat",
    level: "advanced" as const,
    duration: "4h20",
    lessons: 10,
    premium: true
  }
];

const ModulesGridSection = () => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId: number) => {
    navigate(`/modules/${courseId}`);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Modules de formation</h2>
        <Button variant="outline" onClick={() => navigate("/modules")}>
          Voir tous les modules
        </Button>
      </div>

      <CoursesGrid 
        courses={sampleCourses}
        onCourseClick={handleCourseClick}
      />
    </section>
  );
};

export default ModulesGridSection;
