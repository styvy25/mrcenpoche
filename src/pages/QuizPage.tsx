
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout";
import QuizContainer from "@/components/quiz/QuizContainer";
import { categories } from "@/components/quiz/data/categories";
import { useToast } from "@/hooks/use-toast";
import { Category } from "@/components/quiz/types";

const QuizPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { moduleId } = useParams();
  
  useEffect(() => {
    if (moduleId) {
      toast({
        title: "Module de quiz chargé",
        description: `Chargement du quiz pour le module: ${moduleId}`,
      });
    }
  }, [moduleId, toast]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Quiz {moduleId ? `- Module ${moduleId}` : ""}</h1>
          <QuizContainer categories={categories as Category[]} />
        </div>
      </div>
    </MainLayout>
  );
};

export default QuizPage;
