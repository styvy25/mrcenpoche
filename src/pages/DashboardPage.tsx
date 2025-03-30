
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { 
  LayoutDashboard, Award, Users, Video, FileText, 
  Youtube, Calendar, BarChart, Settings, Plus, 
  Trash2, MoveVertical, Download, ThumbsUp
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Types pour les widgets et badges
interface Widget {
  id: string;
  type: 'achievements' | 'videos' | 'documents' | 'activity' | 'stats';
  title: string;
  icon: React.ReactNode;
  height: 'sm' | 'md' | 'lg';
}

interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  date: Date;
  category: string;
}

const DashboardPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [availableWidgets, setAvailableWidgets] = useState<Widget[]>([]);

  // Initialiser les widgets par défaut et les badges de démo
  useEffect(() => {
    // Widgets par défaut
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

    // Widgets disponibles pour ajout
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

    // Badges de démonstration
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

  // Ajouter un widget
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

  // Supprimer un widget
  const removeWidget = (widgetId: string) => {
    setWidgets(widgets.filter(widget => widget.id !== widgetId));
    toast({
      title: "Widget supprimé",
      description: "Le widget a été supprimé du tableau de bord.",
    });
  };

  // Gérer le drag and drop des widgets
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setWidgets(items);
  };

  // Rendu conditionnel des widgets
  const renderWidgetContent = (widget: Widget) => {
    switch (widget.type) {
      case 'achievements':
        return (
          <div className="space-y-4">
            {badges.length > 0 ? (
              badges.map(badge => (
                <div key={badge.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {badge.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{badge.name}</div>
                    <div className="text-sm text-muted-foreground">{badge.description}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {badge.date.toLocaleDateString()}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Aucun badge obtenu pour le moment.
              </div>
            )}
          </div>
        );
      
      case 'videos':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Vidéos téléchargées</span>
              <Badge variant="outline">{Math.floor(Math.random() * 10) + 1}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Espace utilisé</span>
              <Badge variant="outline">{(Math.random() * 500).toFixed(1)} MB</Badge>
            </div>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              <Youtube className="h-4 w-4 mr-2 text-red-500" />
              Télécharger une vidéo
            </Button>
          </div>
        );
      
      case 'documents':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="border rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">5</div>
                <div className="text-xs text-muted-foreground">PDF générés</div>
              </div>
              <div className="border rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">2</div>
                <div className="text-xs text-muted-foreground">Certificats</div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Gérer mes documents
            </Button>
          </div>
        );
      
      case 'activity':
        return (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 text-sm border-b pb-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <div className="flex-1">Action réalisée {i + 1}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'stats':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="border rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{Math.floor(Math.random() * 100) + 1}</div>
                <div className="text-xs text-muted-foreground">Interactions</div>
              </div>
              <div className="border rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{Math.floor(Math.random() * 20) + 1}</div>
                <div className="text-xs text-muted-foreground">Contributions</div>
              </div>
            </div>
            <div className="h-32 border rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">Graphique des activités</span>
            </div>
          </div>
        );
      
      default:
        return <div>Contenu non disponible</div>;
    }
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
              Gérez vos activités et personnalisez votre espace
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
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="widgets" direction="vertical">
                {(provided) => (
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {widgets.map((widget, index) => (
                      <Draggable key={widget.id} draggableId={widget.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`
                              ${widget.height === 'sm' ? 'h-auto' : ''} 
                              ${widget.height === 'md' ? 'h-auto' : ''} 
                              ${widget.height === 'lg' ? 'h-auto md:col-span-2' : ''}
                            `}
                          >
                            <Card className="h-full">
                              <CardHeader className="flex flex-row items-center justify-between p-4">
                                <div className="flex items-center gap-2">
                                  {widget.icon}
                                  <CardTitle className="text-base">{widget.title}</CardTitle>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    {...provided.dragHandleProps}
                                  >
                                    <MoveVertical className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-red-500"
                                    onClick={() => removeWidget(widget.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardContent className="p-4 pt-0">
                                {renderWidgetContent(widget)}
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </TabsContent>
          
          <TabsContent value="achievements">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mes Badges</CardTitle>
                  <CardDescription>
                    Les badges que vous avez obtenus en utilisant la plateforme
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {badges.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {badges.map(badge => (
                        <Card key={badge.id} className="overflow-hidden">
                          <div className="h-2 bg-primary"></div>
                          <CardContent className="p-4 pt-6">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                {badge.icon}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{badge.name}</div>
                                <div className="text-sm text-muted-foreground">{badge.description}</div>
                              </div>
                            </div>
                            <div className="mt-4 text-xs text-muted-foreground">
                              Obtenu le {badge.date.toLocaleDateString()}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Aucun badge obtenu pour le moment.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="customize">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personnaliser le Tableau de Bord</CardTitle>
                  <CardDescription>
                    Ajoutez, supprimez ou réorganisez les widgets de votre tableau de bord
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Widgets disponibles</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {availableWidgets.map(widget => (
                          <Button
                            key={widget.id}
                            variant="outline"
                            className="flex justify-start h-auto py-2"
                            onClick={() => addWidget(widget)}
                          >
                            <div className="flex items-center gap-2">
                              <Plus className="h-4 w-4" />
                              <div className="flex items-center gap-1">
                                {widget.icon}
                                <span>{widget.title}</span>
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Conseils de personnalisation</h3>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                        <li>Glissez-déposez les widgets pour les réorganiser</li>
                        <li>Cliquez sur l'icône de corbeille pour supprimer un widget</li>
                        <li>Ajoutez de nouveaux widgets depuis la liste ci-dessus</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
