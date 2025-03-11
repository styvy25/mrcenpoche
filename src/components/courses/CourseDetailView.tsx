
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, BookOpen, Calendar, User } from "lucide-react";
import { Course } from "@/services/courseService";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useMediaQuery } from "@/hooks/use-media-query";

interface CourseDetailViewProps {
  course: Course;
  onBack: () => void;
}

const CourseDetailView: React.FC<CourseDetailViewProps> = ({ course, onBack }) => {
  const { isMobile } = useMediaQuery("(max-width: 640px)");

  return (
    <div className="space-y-4">
      <Button 
        variant="outline" 
        size={isMobile ? "sm" : "default"} 
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux cours
      </Button>
      
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl md:text-2xl flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-mrc-blue" />
                {course.title}
              </CardTitle>
              <CardDescription className="mt-2">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {format(new Date(course.lastUpdated), "d MMMM yyyy", { locale: fr })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{course.author}</span>
                  </div>
                </div>
              </CardDescription>
            </div>
            
            {course.pdfUrl && (
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"}
                onClick={() => window.open(course.pdfUrl, '_blank')}
              >
                <Download className="mr-2 h-4 w-4" />
                Télécharger PDF
              </Button>
            )}
          </div>
          
          <div className="mt-4">
            <p className="text-gray-600 dark:text-gray-300">
              {course.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-3">
            {course.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert">
            {course.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          
          {course.pdfUrl && (
            <Button 
              variant="default"
              onClick={() => window.open(course.pdfUrl, '_blank')}
            >
              <Download className="mr-2 h-4 w-4" />
              Télécharger PDF
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CourseDetailView;
