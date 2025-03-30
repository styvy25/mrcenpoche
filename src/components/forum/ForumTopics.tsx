
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ChevronLeft, 
  MessageSquare, 
  Eye, 
  Clock, 
  Pin, 
  Lock, 
  Plus, 
  Filter,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ForumCategory, ForumTopic } from './Forum';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ForumTopicsProps {
  topics: ForumTopic[];
  category: ForumCategory;
  onTopicSelect: (topicId: string) => void;
  onBackToCategories: () => void;
}

const ForumTopics: React.FC<ForumTopicsProps> = ({ 
  topics, 
  category, 
  onTopicSelect, 
  onBackToCategories 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter topics based on search query
  const filteredTopics = topics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get time ago in French
  const getTimeAgo = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: fr });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <Button 
          variant="ghost" 
          className="flex items-center gap-1 -ml-2"
          onClick={onBackToCategories}
        >
          <ChevronLeft className="h-4 w-4" />
          Retour aux catégories
        </Button>
        <Button 
          variant="default" 
          className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Plus className="h-4 w-4" />
          Nouveau sujet
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{category.icon}</span>
              <div>
                <CardTitle className="mb-1">{category.name}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </div>
            </div>
            <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 border-purple-200 dark:border-purple-800">
              {topics.length} {topics.length > 1 ? 'sujets' : 'sujet'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
            <div className="relative w-full sm:w-auto sm:flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher dans les sujets..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filtrer
            </Button>
          </div>

          <div className="space-y-4">
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic) => (
                <Card 
                  key={topic.id} 
                  className={`transition-all hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700 cursor-pointer ${
                    topic.isPinned ? 'border-l-4 border-l-yellow-500' : 
                    topic.isLocked ? 'border-l-4 border-l-red-500' : ''
                  }`}
                  onClick={() => onTopicSelect(topic.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{topic.title}</h3>
                          {topic.isPinned && (
                            <Pin className="h-4 w-4 text-yellow-500" />
                          )}
                          {topic.isLocked && (
                            <Lock className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        
                        {topic.excerpt && (
                          <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                            {topic.excerpt}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {topic.tags?.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="bg-gray-100 dark:bg-gray-800">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center text-xs text-muted-foreground gap-4">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{topic.repliesCount} {topic.repliesCount > 1 ? 'réponses' : 'réponse'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{topic.viewsCount} vues</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Dernière activité {getTimeAgo(topic.lastActivityAt)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center ml-4">
                        <Avatar className="h-10 w-10 mb-1">
                          <AvatarImage src={topic.authorAvatar} />
                          <AvatarFallback>{topic.authorName.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs">{topic.authorName}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <MessageSquare className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium mb-1">Aucun sujet trouvé</h3>
                <p className="text-muted-foreground mb-4">Aucun sujet ne correspond à votre recherche.</p>
                <Button onClick={() => setSearchQuery('')}>Effacer la recherche</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForumTopics;
