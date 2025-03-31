
import { useState, useEffect } from 'react';
import { Award, FileText, Activity, BarChart } from 'lucide-react';
import { Widget, UserBadge } from '@/components/dashboard/types';
import React from 'react';

export const useDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(null);
  const [widgets, setWidgets] = useState<Widget[]>(() => {
    const saved = localStorage.getItem('dashboard_widgets');
    return saved ? JSON.parse(saved) : getDefaultWidgets();
  });

  const [badges, setBadges] = useState<UserBadge[]>([
    {
      id: '1',
      name: 'Premier quiz terminé',
      description: 'Vous avez terminé votre premier quiz',
      icon: React.createElement(Award, { className: "h-5 w-5 text-yellow-500" }),
      date: new Date(2024, 2, 15),
      category: 'quiz'
    },
    {
      id: '2',
      name: 'Contributeur actif',
      description: 'Vous avez participé activement au forum',
      icon: React.createElement(Activity, { className: "h-5 w-5 text-green-500" }),
      date: new Date(2024, 3, 10),
      category: 'engagement'
    },
    {
      id: '3',
      name: 'Lecteur assidu',
      description: 'Vous avez consulté plus de 10 documents',
      icon: React.createElement(FileText, { className: "h-5 w-5 text-blue-500" }),
      date: new Date(2024, 3, 22),
      category: 'learning'
    }
  ]);

  const availableWidgets = getAvailableWidgets().filter(
    widget => !widgets.some(w => w.type === widget.type)
  );

  useEffect(() => {
    localStorage.setItem('dashboard_widgets', JSON.stringify(widgets));
  }, [widgets]);

  const addWidget = (widget: Widget) => {
    setWidgets(prev => [...prev, {...widget, id: crypto.randomUUID()}]);
  };

  const removeWidget = (id: string) => {
    setWidgets(prev => prev.filter(widget => widget.id !== id));
  };
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setWidgets(items);
  };

  return {
    currentUser,
    activeTab,
    setActiveTab,
    widgets,
    availableWidgets,
    addWidget,
    removeWidget,
    badges,
    handleDragEnd
  };
};

function getDefaultWidgets(): Widget[] {
  return [
    {
      id: '1',
      type: 'achievements',
      title: 'Mes badges',
      icon: Award,
      height: 'md'
    },
    {
      id: '2',
      type: 'activity',
      title: 'Activité récente',
      icon: Activity,
      height: 'sm'
    },
    {
      id: '3',
      type: 'stats',
      title: 'Statistiques',
      icon: BarChart,
      height: 'sm'
    }
  ];
}

function getAvailableWidgets(): Widget[] {
  return [
    {
      id: 'available_1',
      type: 'achievements',
      title: 'Mes badges',
      icon: Award,
      height: 'md'
    },
    {
      id: 'available_2',
      type: 'videos',
      title: 'Vidéos récentes',
      icon: Activity,
      height: 'md'
    },
    {
      id: 'available_3',
      type: 'documents',
      title: 'Documents',
      icon: FileText,
      height: 'sm'
    },
    {
      id: 'available_4',
      type: 'activity',
      title: 'Activité récente',
      icon: Activity,
      height: 'sm'
    },
    {
      id: 'available_5',
      type: 'stats',
      title: 'Statistiques',
      icon: BarChart,
      height: 'lg'
    }
  ];
}
