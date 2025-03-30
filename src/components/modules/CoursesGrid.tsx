
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseCard from './CourseCard';
import { usePlanLimits } from '@/hooks/usePlanLimits';
import { LockKeyhole, Sparkles } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  image?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lessons: number;
  premium: boolean;
}

export interface CoursesGridProps {
  courses: Course[];
  onCourseClick: (courseId: number) => void;
}

const CoursesGrid: React.FC<CoursesGridProps> = ({ courses, onCourseClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { canAccessAllModules } = usePlanLimits();

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'general', name: 'Général' },
    { id: 'chat', name: 'Discussions' },
    { id: 'pdf', name: 'Documents' },
    { id: 'quiz', name: 'Quiz' }
  ];

  const filteredCourses = courses.filter(course => {
    if (selectedCategory === 'all') return true;
    return course.category === selectedCategory;
  });

  return (
    <div>
      <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
        <TabsList className="grid" style={{ gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))` }}>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {filteredCourses.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Aucun cours disponible dans cette catégorie</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              image={course.image}
              level={course.level}
              lessons={course.lessons}
              duration={course.duration}
              progress={0}
              onClick={() => onCourseClick(course.id)}
              locked={course.premium && !canAccessAllModules()}
              badge={course.premium ? { 
                icon: canAccessAllModules() ? <Sparkles className="h-3 w-3" /> : <LockKeyhole className="h-3 w-3" />, 
                text: 'Premium'
              } : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesGrid;
