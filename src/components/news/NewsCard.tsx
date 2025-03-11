
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NewsArticle } from "@/services/newsService";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Clock, Tag } from "lucide-react";

interface NewsCardProps {
  article: NewsArticle;
  isHighlighted?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, isHighlighted = false }) => {
  return (
    <Card className={`overflow-hidden transition-all duration-300 ${
      isHighlighted ? 'border-mrc-blue shadow-lg hover:shadow-xl' : 'hover:shadow-md'
    }`}>
      <CardHeader className={`pb-2 ${isHighlighted ? 'bg-mrc-blue/5' : ''}`}>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg md:text-xl line-clamp-2">
            {article.title}
          </CardTitle>
        </div>
        <CardDescription className="flex items-center text-sm gap-1">
          <Clock className="h-3 w-3" />
          {format(new Date(article.timestamp), "d MMMM yyyy à HH'h'mm", { locale: fr })}
          {article.source && (
            <span className="ml-2 font-medium text-mrc-blue">
              Source: {article.source}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-2">
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {article.summary}
        </p>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start">
        {article.tags && article.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap mt-2">
            <Tag className="h-3 w-3 text-gray-500" />
            {article.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
