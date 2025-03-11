
import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { getNewsArticles, getLatestEditorial, NewsArticle } from "@/services/newsService";
import EditorialCard from "@/components/news/EditorialCard";
import NewsListSection from "@/components/news/NewsListSection";
import NewsApiKeyPrompt from "@/components/news/NewsApiKeyPrompt";
import { RefreshCw } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [editorial, setEditorial] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditorialLoading, setIsEditorialLoading] = useState(true);
  const [hasApiKey, setHasApiKey] = useState(false);
  const { toast } = useToast();
  const { isMobile } = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    checkApiKey();
    loadNewsArticles();
  }, []);

  const checkApiKey = () => {
    try {
      const apiKeys = localStorage.getItem("api_keys");
      if (apiKeys) {
        const keys = JSON.parse(apiKeys);
        setHasApiKey(!!keys.perplexity);
        if (keys.perplexity) {
          loadEditorial();
        } else {
          setIsEditorialLoading(false);
        }
      } else {
        setHasApiKey(false);
        setIsEditorialLoading(false);
      }
    } catch (error) {
      console.error("Error checking API key:", error);
      setHasApiKey(false);
      setIsEditorialLoading(false);
    }
  };

  const loadNewsArticles = () => {
    setIsLoading(true);
    try {
      const newsArticles = getNewsArticles();
      setArticles(newsArticles);
    } catch (error) {
      console.error("Error loading news articles:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les actualités",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadEditorial = async () => {
    setIsEditorialLoading(true);
    try {
      const latestEditorial = await getLatestEditorial();
      setEditorial(latestEditorial);
    } catch (error) {
      console.error("Error loading editorial:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger l'éditorial",
        variant: "destructive",
      });
    } finally {
      setIsEditorialLoading(false);
    }
  };

  const handleRefresh = () => {
    loadNewsArticles();
    
    if (hasApiKey) {
      // Clear the editorial timestamp to force a refresh
      localStorage.removeItem("lastEditorialTime");
      loadEditorial();
    }
  };

  const handleApiKeySubmit = () => {
    setHasApiKey(true);
    loadEditorial();
  };

  return (
    <MainLayout>
      <div className="pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-mrc-blue">Actualités</h1>
            <p className="text-muted-foreground mt-1">
              Les dernières nouvelles et analyses du MRC
            </p>
          </div>
          
          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            onClick={handleRefresh}
            className="mt-4 md:mt-0"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>
        </div>

        <Tabs defaultValue="editorial" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="editorial">Éditorial</TabsTrigger>
            <TabsTrigger value="news">Actualités</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editorial" className="space-y-4">
            {!hasApiKey ? (
              <NewsApiKeyPrompt onApiKeySubmit={handleApiKeySubmit} />
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <EditorialCard 
                  editorial={editorial} 
                  isLoading={isEditorialLoading}
                  onRefresh={loadEditorial}
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="news">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <NewsListSection 
                articles={articles}
                isLoading={isLoading}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default NewsPage;
