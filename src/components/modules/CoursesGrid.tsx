
import { useState } from "react";
import UserChat from "@/components/chat/UserChat";
import { News, NewsArticle } from "@/components/ui/News";

const CoursesGrid = () => {
  // Exemple d'articles d'actualités
  const newsArticles: NewsArticle[] = [
    {
      href: "https://example.com/news/1",
      title: "Maurice Kamto annonce une nouvelle stratégie pour les élections",
      summary: "Le président du MRC détaille sa vision pour une participation électorale plus effective lors des prochaines échéances.",
      image: "/lovable-uploads/762a9449-7e19-4f01-b898-dc8da4810f1a.png"
    },
    {
      href: "https://example.com/news/2", 
      title: "Mobilisation citoyenne à Douala : le MRC en première ligne",
      summary: "Les militants du MRC organisent une série d'ateliers sur l'éducation civique et électorale.",
      image: "/lovable-uploads/13009c82-2883-46e9-8cda-afd9d8e16ade.jpg"
    },
    {
      href: "https://example.com/news/3",
      title: "Nouveau module de formation disponible en ligne",
      summary: "La section numérique du MRC lance un outil interactif pour former les militants à la communication politique.",
      image: "/lovable-uploads/5487bb9e-3a94-44a0-833d-8875f1665691.png"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Actualités */}
      <div className="lg:col-span-1 space-y-6">
        <h2 className="text-2xl font-bold text-mrc-blue mb-4">Actualités</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 h-[500px] overflow-hidden">
          <News articles={newsArticles} />
        </div>
      </div>
      
      {/* Espace de discussion */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold text-mrc-blue mb-4">Espace de discussion</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
          <UserChat />
        </div>
      </div>
    </div>
  );
};

export default CoursesGrid;
