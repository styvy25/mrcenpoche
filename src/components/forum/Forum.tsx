
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import ForumCategories from './ForumCategories';
import ForumTopics from './ForumTopics';
import ForumDiscussion from './ForumDiscussion';
import ForumSidebar from './ForumSidebar';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ForumProps {
  containerClassName?: string;
}

export type ForumCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  topicsCount: number;
};

export type ForumTopic = {
  id: string;
  title: string;
  categoryId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: Date;
  lastActivityAt: Date;
  repliesCount: number;
  viewsCount: number;
  isPinned: boolean;
  isLocked: boolean;
  tags?: string[];
  excerpt?: string;
};

export type ForumPost = {
  id: string;
  topicId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole?: string;
  authorPoints?: number;
  authorBadges?: string[];
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  isEdited: boolean;
  reactions?: {
    type: string;
    count: number;
    userReacted: boolean;
  }[];
  attachments?: {
    id: string;
    type: 'image' | 'file' | 'link';
    url: string;
    name?: string;
  }[];
};

const Forum: React.FC<ForumProps> = ({ containerClassName = '' }) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('categories');
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  // Mock data for demo (would be fetched from API in production)
  const [categories, setCategories] = useState<ForumCategory[]>([
    {
      id: '1',
      name: 'Actualités MRC',
      description: 'Discussions sur les actualités et événements du MRC',
      icon: '📰',
      color: 'blue',
      topicsCount: 12
    },
    {
      id: '2',
      name: 'Propositions Politiques',
      description: 'Débattre des propositions politiques du MRC',
      icon: '🏛️',
      color: 'green',
      topicsCount: 8
    },
    {
      id: '3',
      name: 'Organisation Militante',
      description: 'Coordination des activités militantes',
      icon: '✊',
      color: 'red',
      topicsCount: 5
    },
    {
      id: '4',
      name: 'Questions & Réponses',
      description: 'Posez vos questions sur le MRC',
      icon: '❓',
      color: 'purple',
      topicsCount: 15
    }
  ]);

  const [topics, setTopics] = useState<ForumTopic[]>([
    {
      id: '1',
      title: 'Stratégie du MRC pour les élections de 2025',
      categoryId: '1',
      authorId: '1',
      authorName: 'Jean Dupont',
      authorAvatar: '',
      createdAt: new Date('2023-12-01'),
      lastActivityAt: new Date(),
      repliesCount: 24,
      viewsCount: 156,
      isPinned: true,
      isLocked: false,
      tags: ['Élections', 'Stratégie'],
      excerpt: 'Discussion sur les stratégies électorales pour les prochaines élections présidentielles au Cameroun.'
    },
    {
      id: '2',
      title: 'Organisation de la manifestation du 10 février',
      categoryId: '3',
      authorId: '2',
      authorName: 'Marie Kamga',
      createdAt: new Date('2023-12-15'),
      lastActivityAt: new Date('2023-12-20'),
      repliesCount: 18,
      viewsCount: 89,
      isPinned: false,
      isLocked: false,
      tags: ['Manifestation', 'Organisation'],
      excerpt: 'Planification et coordination de la manifestation pacifique prévue le 10 février.'
    },
    {
      id: '3',
      title: 'Propositions pour la décentralisation au Cameroun',
      categoryId: '2',
      authorId: '3',
      authorName: 'Pierre Mbarga',
      createdAt: new Date('2023-11-20'),
      lastActivityAt: new Date('2023-12-18'),
      repliesCount: 32,
      viewsCount: 214,
      isPinned: false,
      isLocked: false,
      tags: ['Décentralisation', 'Réformes'],
      excerpt: 'Discussion sur les propositions de réforme pour une véritable décentralisation au Cameroun.'
    }
  ]);

  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: '1',
      topicId: '1',
      authorId: '1',
      authorName: 'Jean Dupont',
      authorRole: 'Modérateur',
      authorPoints: 1250,
      authorBadges: ['Contributeur', 'Vétéran'],
      content: `
        # Stratégie du MRC pour les élections de 2025
        
        Je pense que le MRC devrait se concentrer sur les points suivants:
        
        1. Mobilisation des jeunes électeurs
        2. Développement de partenariats avec d'autres partis d'opposition
        3. Présence accrue sur les réseaux sociaux
        4. Élaboration d'un programme économique détaillé
        
        Qu'en pensez-vous?
      `,
      createdAt: new Date('2023-12-01T10:30:00'),
      isEdited: false
    },
    {
      id: '2',
      topicId: '1',
      authorId: '4',
      authorName: 'Sophie Ngo',
      authorRole: 'Membre',
      authorPoints: 750,
      authorBadges: ['Rédacteur'],
      content: `
        Je suis d'accord avec les points 1 et 3. La mobilisation des jeunes est cruciale car ils représentent plus de 60% de la population.
        
        Concernant les partenariats, je serais plus prudent. Il faut choisir des alliés qui partagent vraiment notre vision.
      `,
      createdAt: new Date('2023-12-01T11:45:00'),
      isEdited: false,
      reactions: [
        { type: '👍', count: 5, userReacted: true },
        { type: '❤️', count: 2, userReacted: false }
      ]
    },
    {
      id: '3',
      topicId: '1',
      authorId: '5',
      authorName: 'Paul Biya',
      authorRole: 'Membre',
      authorPoints: 320,
      content: `
        Pour le programme économique, je suggère de mettre l'accent sur:
        
        - L'entrepreneuriat des jeunes
        - Le développement des infrastructures rurales
        - La transparence dans la gestion des ressources naturelles
        - La diversification de l'économie
        
        ![Graphique économique](https://example.com/graph.png)
      `,
      createdAt: new Date('2023-12-02T09:15:00'),
      isEdited: true,
      updatedAt: new Date('2023-12-02T09:30:00'),
      reactions: [
        { type: '👍', count: 8, userReacted: false },
        { type: '🔥', count: 3, userReacted: true }
      ],
      attachments: [
        { id: '1', type: 'image', url: 'https://example.com/graph.png', name: 'Graphique économique' }
      ]
    }
  ]);

  // Initialize data
  useEffect(() => {
    try {
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load forum data'));
      setIsLoading(false);
    }
  }, []);

  // Navigation logic
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedTopic(null);
    setActiveTab('topics');
  };

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    setActiveTab('discussion');
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setActiveTab('categories');
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setActiveTab('topics');
  };

  // If we're still loading
  if (isLoading) {
    return (
      <Card className={`flex items-center justify-center h-96 ${containerClassName}`}>
        <div className="text-center p-4">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Chargement du forum...
          </p>
        </div>
      </Card>
    );
  }

  // If there was an error
  if (error) {
    return (
      <Card className={`flex items-center justify-center h-96 ${containerClassName}`}>
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur de connexion</AlertTitle>
          <AlertDescription>
            Impossible de charger les données du forum. Veuillez vérifier votre connexion réseau.
            <p className="text-sm mt-2 opacity-80">{error.message}</p>
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  return (
    <div className={`flex flex-col md:flex-row gap-4 ${containerClassName}`}>
      {/* Main forum content */}
      <div className="flex-grow">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="categories" onClick={handleBackToCategories}>
              Catégories
            </TabsTrigger>
            {selectedCategory && (
              <TabsTrigger value="topics" onClick={handleBackToTopics}>
                Sujets
              </TabsTrigger>
            )}
            {selectedTopic && (
              <TabsTrigger value="discussion">
                Discussion
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="categories">
            <ForumCategories 
              categories={categories} 
              onCategorySelect={handleCategorySelect} 
            />
          </TabsContent>

          <TabsContent value="topics">
            {selectedCategory && (
              <ForumTopics 
                topics={topics.filter(topic => topic.categoryId === selectedCategory)} 
                category={categories.find(c => c.id === selectedCategory)!} 
                onTopicSelect={handleTopicSelect}
                onBackToCategories={handleBackToCategories}
              />
            )}
          </TabsContent>

          <TabsContent value="discussion">
            {selectedTopic && (
              <ForumDiscussion 
                topic={topics.find(t => t.id === selectedTopic)!}
                posts={posts.filter(post => post.topicId === selectedTopic)}
                onBackToTopics={handleBackToTopics}
                currentUser={currentUser}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Sidebar */}
      <div className="w-full md:w-80">
        <ForumSidebar 
          currentUser={currentUser} 
          topUsers={[
            { id: '1', name: 'Jean Dupont', points: 1250, badges: ['Contributeur', 'Vétéran'] },
            { id: '4', name: 'Sophie Ngo', points: 750, badges: ['Rédacteur'] },
            { id: '3', name: 'Pierre Mbarga', points: 650, badges: ['Militant'] },
          ]}
          popularTopics={topics.sort((a, b) => b.viewsCount - a.viewsCount).slice(0, 3)}
        />
      </div>
    </div>
  );
};

export default Forum;
