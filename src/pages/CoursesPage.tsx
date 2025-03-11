
import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getAllCourses, getAllCategories, getCourseById, getCoursesByCategory } from "@/services/courseService";
import CoursesList from "@/components/courses/CoursesList";
import CourseCategoryFilter from "@/components/courses/CourseCategoryFilter";
import CourseDetailView from "@/components/courses/CourseDetailView";
import CourseCreationForm from "@/components/courses/CourseCreationForm";

const CoursesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("browse");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [courses, setCourses] = useState<ReturnType<typeof getAllCourses>>([]);
  const [categories, setCategories] = useState<ReturnType<typeof getAllCategories>>([]);

  // Load data
  useEffect(() => {
    setIsLoading(true);
    // In a real app, this would be an async operation
    setCourses(getAllCourses());
    setCategories(getAllCategories());
    setIsLoading(false);
  }, []);

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = searchQuery === "" || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === null || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get selected course
  const selectedCourse = selectedCourseId ? getCourseById(selectedCourseId) : null;

  // Handle course creation success
  const handleCourseCreationSuccess = (courseId: string) => {
    // In a real app, we would fetch the updated list of courses
    setCourses(getAllCourses());
    setSelectedCourseId(courseId);
    setActiveTab("browse");
  };

  return (
    <MainLayout>
      <div className="pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-mrc-blue">Cours Politiques</h1>
            <p className="text-muted-foreground mt-1">
              Documentation et formation sur la politique camerounaise et le MRC
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="browse">Consulter les cours</TabsTrigger>
            <TabsTrigger value="create">Créer un cours</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse" className="space-y-4">
            {selectedCourse ? (
              <CourseDetailView 
                course={selectedCourse} 
                onBack={() => setSelectedCourseId(null)} 
              />
            ) : (
              <>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Rechercher des cours..."
                      className="pl-8 w-full sm:w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <Button onClick={() => setActiveTab("create")}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nouveau cours
                  </Button>
                </div>
                
                <CourseCategoryFilter 
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
                
                <CoursesList 
                  courses={filteredCourses}
                  isLoading={isLoading}
                  onCourseSelect={setSelectedCourseId}
                />
              </>
            )}
          </TabsContent>
          
          <TabsContent value="create">
            <CourseCreationForm onSuccess={handleCourseCreationSuccess} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CoursesPage;
