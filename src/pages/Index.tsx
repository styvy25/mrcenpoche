
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import PricingSection from "@/components/home/PricingSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, BookMarked, News } from "lucide-react";
import { MOCK_COURSES, COURSE_CATEGORIES } from "@/services/courseService";
import { initializeLocalStorage } from "@/utils/localStorageUtils";

const Home = () => {
  const navigate = useNavigate();
  
  // Initialize localStorage with default data
  useEffect(() => {
    initializeLocalStorage(MOCK_COURSES, COURSE_CATEGORIES);
  }, []);
  
  return (
    <div className="overflow-hidden">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          Ressources de Formation
        </h2>
        
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="courses" className="flex items-center justify-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Cours
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center justify-center">
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center justify-center">
              <News className="h-4 w-4 mr-2" />
              Actualités
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-full md:col-span-1 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <BookMarked className="h-5 w-5 mr-2 text-mrc-blue" />
                  Nos cours
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Explorez nos cours éducatifs sur la politique camerounaise et le MRC,
                  conçus pour vous aider à mieux comprendre les enjeux et les positions du parti.
                </p>
                <ul className="space-y-2 mb-6">
                  {COURSE_CATEGORIES.slice(0, 4).map(category => (
                    <li key={category.id} className="flex items-start">
                      <div className="h-5 w-5 text-green-500 mr-2 flex-shrink-0">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>{category.name}</span>
                    </li>
                  ))}
                </ul>
                <Button onClick={() => navigate("/courses")} className="w-full">
                  Voir tous les cours
                </Button>
              </div>
              
              <div className="col-span-full md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_COURSES.slice(0, 4).map(course => (
                  <div key={course.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-lg mb-2">{course.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        {new Date(course.lastUpdated).toLocaleDateString('fr-FR')}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/courses`)}
                      >
                        Voir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="text-center py-8">
            <div className="max-w-md mx-auto">
              <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Documents et ressources</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Accédez à notre bibliothèque de documents, PDFs et ressources sur la politique camerounaise.
              </p>
              <Button onClick={() => navigate("/documents")}>
                Explorer les documents
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="news" className="text-center py-8">
            <div className="max-w-md mx-auto">
              <News className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Actualités politiques</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Restez informé avec les dernières nouvelles et analyses politiques du Cameroun et du MRC.
              </p>
              <Button onClick={() => navigate("/news")}>
                Voir les actualités
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <FeatureSection />
      <PricingSection />
    </div>
  );
};

export default Home;
