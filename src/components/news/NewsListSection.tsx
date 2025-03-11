
import React from "react";
import NewsCard from "./NewsCard";
import { NewsArticle } from "@/services/newsService";
import { useMediaQuery } from "@/hooks/use-media-query";

interface NewsListSectionProps {
  articles: NewsArticle[];
  isLoading?: boolean;
}

const NewsListSection: React.FC<NewsListSectionProps> = ({ 
  articles,
  isLoading = false
}) => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className={`h-${isSmallScreen ? '24' : '32'} bg-gray-200 rounded-lg w-full`}></div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucune actualité disponible pour le moment</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {articles.map((article) => (
        <NewsCard 
          key={article.id} 
          article={article}
          isHighlighted={article.isHighlighted}
        />
      ))}
    </div>
  );
};

export default NewsListSection;
