
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Award, Settings } from 'lucide-react';
import DashboardGrid from '@/components/dashboard/DashboardGrid';
import BadgesGrid from '@/components/dashboard/BadgesGrid';
import CustomizeGrid from '@/components/dashboard/CustomizeGrid';
import { useDashboard } from '@/hooks/useDashboard';

const DashboardPage = () => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    widgets,
    badges,
    availableWidgets,
    addWidget,
    removeWidget,
    handleDragEnd
  } = useDashboard();

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
