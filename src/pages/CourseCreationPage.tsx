
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CourseGenerationForm from '@/components/courses/CourseGenerationForm';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const CourseCreationPage: React.FC = () => {
  const { toast } = useToast();

  const handleCourseSubmit = async (courseData: any) => {
    try {
      // This will only work if user is authenticated
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError || !userData.user) {
        toast({
          title: "Authentification requise",
          description: "Vous devez être connecté pour créer un cours.",
          variant: "destructive"
        });
        return;
      }

      // Insert into courses table
      const { error } = await supabase
        .from('courses')
        .insert([
          {
            title: courseData.title,
            description: courseData.description,
            content: courseData.content,
            category: courseData.category,
            keywords: courseData.keywords,
            author_id: userData.user.id
          }
        ]);

      if (error) {
        console.error("Error saving to Supabase:", error);
        toast({
          title: "Erreur lors de l'enregistrement",
          description: "Le cours n'a pas pu être enregistré dans la base de données.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Cours créé avec succès",
          description: "Le cours a été généré et enregistré dans la base de données.",
        });
      }
    } catch (error) {
      console.error("Error in submission:", error);
      toast({
        title: "Erreur inattendue",
        description: "Une erreur s'est produite lors de la création du cours.",
        variant: "destructive"
      });
    }
  };

  return (
    <MainLayout>
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-mrc-blue">Création de Cours</h1>
          <p className="mt-2 text-lg text-gray-600">
            Utilisez l'IA pour générer des cours et des supports pédagogiques sur le MRC et la politique camerounaise
          </p>
        </div>

        <CourseGenerationForm onSubmit={handleCourseSubmit} />
      </div>
    </MainLayout>
  );
};

export default CourseCreationPage;
