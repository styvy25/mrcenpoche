
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Download, FileText } from "lucide-react";
import { Course } from "@/services/courseService";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface CoursesListProps {
  courses: Course[];
  isLoading?: boolean;
  onCourseSelect: (courseId: string) => void;
}

const CoursesList: React.FC<CoursesListProps> = ({ 
  courses, 
  isLoading = false,
  onCourseSelect
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-full animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="text-center py-8">
          <FileText className="mx-auto h-10 w-10 text-gray-400 mb-2" />
          <p className="text-gray-500">Aucun cours disponible dans cette catégorie</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <Card key={course.id} className="w-full hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-start">
              <BookOpen className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-mrc-blue" />
              <span>{course.title}</span>
            </CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Calendar className="h-3 w-3 mr-1" />
              <span>
                Mis à jour le {format(new Date(course.lastUpdated), "d MMMM yyyy", { locale: fr })}
              </span>
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {course.description}
            </p>
            
            <div className="flex flex-wrap gap-1 mt-3">
              {course.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between pt-2 border-t">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-mrc-blue hover:text-mrc-blue/80"
              onClick={() => course.pdfUrl && window.open(course.pdfUrl, '_blank')}
              disabled={!course.pdfUrl}
            >
              <Download className="h-4 w-4 mr-1" />
              PDF
            </Button>
            
            <Button 
              variant="default" 
              size="sm"
              onClick={() => onCourseSelect(course.id)}
            >
              Consulter
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CoursesList;
