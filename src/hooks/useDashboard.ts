
import { useState, useEffect } from 'react';
import { Award, FileText, Activity, BarChart } from 'lucide-react';
import { Widget, UserBadge } from '@/components/dashboard/types';

export const useDashboard = () => {
  const [widgets, setWidgets] = useState<Widget[]>(() => {
    const saved = localStorage.getItem('dashboard_widgets');
    return saved ? JSON.parse(saved) : getDefaultWidgets();
  });

  const [badges, setBadges] = useState<UserBadge[]>([
    {
      id: '1',
      name: 'Premier quiz terminé',
      description: 'Vous avez terminé votre premier quiz',
      icon: <Award className="h-5 w-5 text-yellow-500" />,
      date: new Date(2024, 2, 15),
      category: 'quiz'
    },
    {
      id: '2',
      name: 'Contributeur actif',
      description: 'Vous avez participé activement au forum',
      icon: <Activity className="h-5 w-5 text-green-500" />,
      date: new Date(2024, 3, 10),
      category: 'engagement'
    },
    {
      id: '3',
      name: 'Lecteur assidu',
      description: 'Vous avez consulté plus de 10 documents',
      icon: <FileText className="h-5 w-5 text-blue-500" />,
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

  return {
    widgets,
    availableWidgets,
    addWidget,
    removeWidget,
    badges,
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
