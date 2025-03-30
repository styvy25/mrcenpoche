import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  LayoutDashboard, Award, Youtube, FileText, 
  Calendar, BarChart, Settings, Download, ThumbsUp
} from 'lucide-react';
import { Widget } from '@/components/dashboard/types';
import { UserBadge } from '@/components/dashboard/widgets/AchievementsWidget';
import DashboardGrid from '@/components/dashboard/DashboardGrid';
import BadgesGrid from '@/components/dashboard/BadgesGrid';
import CustomizeGrid from '@/components/dashboard/CustomizeGrid';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [availableWidgets, setAvailableWidgets] = useState<Widget[]>([]);

  // Initialize default widgets and demo badges
  useEffect(() => {
    // Default widgets
    const defaultWidgets: Widget[] = [
      { 
        id: '1', 
        type: 'achievements', 
        title: 'Mes Badges', 
        icon: <Award className="h-5 w-5" />, 
        height: 'md' 
      },
      { 
        id: '2', 
        type: 'videos', 
        title: 'Vidéos Téléchargées', 
        icon: <Youtube className="h-5 w-5" />, 
        height: 'sm' 
      },
      { 
        id: '3', 
        type: 'documents', 
        title: 'Mes Documents', 
        icon: <FileText className="h-5 w-5" />, 
        height: 'md' 
      },
    ];

    // Available widgets for addition
    const availableWidgetOptions: Widget[] = [
      { 
        id: 'activity', 
        type: 'activity', 
        title: 'Activité Récente', 
        icon: <Calendar className="h-5 w-5" />, 
        height: 'md' 
      },
      { 
        id: 'stats', 
        type: 'stats', 
        title: 'Statistiques', 
        icon: <BarChart className="h-5 w-5" />, 
        height: 'lg' 
      },
    ];

    // Demo badges
    const demoBadges: UserBadge[] = [
      {
        id: '1',
        name: 'Téléchargeur YouTube',
        description: 'A téléchargé sa première vidéo YouTube',
        icon: <Download className="h-5 w-5 text-red-500" />,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000),
        category: 'youtube'
      },
      {
        id: '2',
        name: 'Contributeur MRC',
        description: 'A partagé du contenu avec la communauté',
        icon: <ThumbsUp className="h-5 w-5 text-blue-500" />,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        category: 'community'
      },
    ];

    setWidgets(defaultWidgets);
    setAvailableWidgets(availableWidgetOptions);
    setBadges(demoBadges);
  }, []);

  // Add a widget
  const addWidget = (widgetType: Widget) => {
    const newWidget = {
      ...widgetType,
      id: `widget-${Date.now()}`,
    };
    setWidgets([...widgets, newWidget]);
    toast({
      title: "Widget ajouté",
      description: `Le widget "${widgetType.title}" a été ajouté au tableau de bord.`,
    });
  };

  // Remove a widget
  const removeWidget = (widgetId: string) => {
    setWidgets(widgets.filter(widget => widget.id !== widgetId));
    toast({
      title: "Widget supprimé",
      description: "Le widget a été supprimé du tableau de bord.",
    });
  };

  // Handle drag and drop of widgets
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setWidgets(items);
  };

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <LayoutDashboard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Tableau de Bord</h1>
            <p className="text-muted-foreground">
              {currentUser ? `Bienvenue, ${currentUser.email || 'Utilisateur'}` : 'Gérez vos activités et personnalisez votre espace'}
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Tableau de Bord
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Badges
            </TabsTrigger>
            <TabsTrigger value="customize" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Personnaliser
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <DashboardGrid 
              widgets={widgets} 
              badges={badges} 
              onRemoveWidget={removeWidget}
              onDragEnd={handleDragEnd}
            />
          </TabsContent>
          
          <TabsContent value="achievements">
            <BadgesGrid badges={badges} />
          </TabsContent>
          
          <TabsContent value="customize">
            <CustomizeGrid 
              availableWidgets={availableWidgets} 
              onAddWidget={addWidget} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
