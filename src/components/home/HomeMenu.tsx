
import { FileText, MessageSquare, Brain, Users, Youtube, LayoutDashboard, Settings } from 'lucide-react';
import { MenuCard } from '@/components/ui/menu-card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const HomeMenu = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const menuItems = [
    {
      title: 'Assistant',
      value: 'AI',
      subtitle: 'Discussion Intelligente',
      icon: <MessageSquare size={20} />,
      color: 'purple',
      path: '/assistant',
    },
    {
      title: 'Documents',
      value: 'PDF',
      subtitle: 'Ressources MRC',
      icon: <FileText size={20} />,
      color: 'green',
      path: '/documents',
    },
    {
      title: 'Quiz',
      value: '40',
      subtitle: 'Questions disponibles',
      icon: <Brain size={20} />,
      color: 'yellow',
      path: '/quiz',
    },
    {
      title: 'YouTube',
      value: 'HD',
      subtitle: 'Téléchargez des vidéos',
      icon: <Youtube size={20} />,
      color: 'red',
      path: '/youtube-download',
    },
    {
      title: 'Chat 237',
      value: '24',
      subtitle: 'Utilisateurs connectés',
      icon: <Users size={20} />,
      color: 'blue',
      path: '/chat-237',
    },
    {
      title: 'Tableau de bord',
      value: '7',
      subtitle: 'Widgets personnalisables',
      icon: <LayoutDashboard size={20} />,
      color: 'orange',
      path: '/dashboard',
    },
  ];
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">MRC en Poche</h1>
        <p className="text-muted-foreground">Sélectionnez une option pour commencer</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menuItems.map((item, index) => (
          <MenuCard
            key={index}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            icon={item.icon}
            color={item.color as any}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
      
      {!isAuthenticated && (
        <div className="mt-6 text-center">
          <p className="text-muted-foreground mb-2">Connectez-vous pour accéder à toutes les fonctionnalités</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-palette-cyan-500 text-white rounded-md hover:bg-palette-cyan-600 transition-colors"
          >
            <Settings className="inline-block mr-2 h-4 w-4" />
            Paramètres
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeMenu;
