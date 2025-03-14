
import React, { useEffect, useState } from "react";
import { getNewsArticles, getLatestEditorial, NewsArticle } from "@/services/newsService";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Newspaper, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NewsSection = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [editorial, setEditorial] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        const articles = getNewsArticles().slice(0, 3); // Just show 3 most recent articles
        setNews(articles);
        
        const latestEditorial = await getLatestEditorial();
        if (latestEditorial) {
          setEditorial(latestEditorial);
        }
      } catch (error) {
        console.error("Error loading news:", error);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Actualités</h2>
            <div className="mt-8 flex justify-center">
              <div className="animate-pulse flex space-x-4 w-full max-w-3xl">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center mb-4">
            <Newspaper className="h-6 w-6 text-mrc-blue mr-2" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Actualités</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Restez informé des dernières actualités du MRC et de la situation politique au Cameroun
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {editorial && (
            <Card className="col-span-1 lg:col-span-3 p-6 mb-6 border border-mrc-blue/20 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline" className="bg-mrc-blue/10 text-mrc-blue border-mrc-blue/30 px-3 py-1">
                  Éditorial
                </Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDistanceToNow(new Date(editorial.timestamp), { 
                    addSuffix: true,
                    locale: fr
                  })}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{editorial.title}</h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">{truncateText(editorial.content, 300)}</p>
              <div className="flex justify-end">
                <Link to="/news">
                  <Button variant="outline" size="sm" className="text-mrc-blue hover:text-mrc-blue/80">
                    Lire la suite <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          )}

          {news.map((article) => (
            <Card key={article.id} className="overflow-hidden border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    {article.tags && article.tags[0] && (
                      <Badge variant="secondary" className="text-xs mr-2">
                        {article.tags[0]}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDistanceToNow(new Date(article.timestamp), { 
                      addSuffix: true,
                      locale: fr
                    })}
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{article.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {truncateText(article.summary, 80)}
                </p>
                <div className="text-right">
                  <Link to="/news" className="text-sm text-mrc-blue hover:text-mrc-blue/80 inline-flex items-center">
                    En savoir plus <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/news">
            <Button className="bg-mrc-blue hover:bg-mrc-blue/90 text-white">
              Voir toutes les actualités
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
