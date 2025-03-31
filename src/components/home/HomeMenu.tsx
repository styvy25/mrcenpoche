
import { FileText, MessageSquare, Brain, Users, Youtube, LayoutDashboard, Settings } from 'lucide-react';
import { MenuCard } from '@/components/ui/menu-card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const HomeMenu = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('applications');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Un petit délai pour permettre un chargement fluide
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    {
      title: 'Assistant',
      value: 'AI',
      subtitle: 'Discussion Intelligente',
      icon: <MessageSquare size={24} className="text-white" />,
      color: 'purple',
      path: '/assistant',
      tab: 'applications',
    },
    {
      title: 'Documents',
      value: 'PDF',
      subtitle: 'Ressources MRC',
      icon: <FileText size={24} className="text-white" />,
      color: 'green',
      path: '/documents',
      tab: 'applications',
    },
    {
      title: 'Quiz',
      value: '40+',
      subtitle: 'Questions disponibles',
      icon: <Brain size={24} className="text-white" />,
      color: 'yellow',
      path: '/quiz',
      tab: 'applications',
    },
    {
      title: 'YouTube',
      value: 'HD',
      subtitle: 'Téléchargez des vidéos',
      icon: <Youtube size={24} className="text-white" />,
      color: 'red',
      path: '/youtube-download',
      tab: 'applications',
    },
    {
      title: 'Chat 237',
      value: '24',
      subtitle: 'Utilisateurs connectés',
      icon: <Users size={24} className="text-white" />,
      color: 'blue',
      path: '/chat-237',
      tab: 'applications',
    },
    {
      title: 'Tableau de bord',
      value: '7',
      subtitle: 'Widgets personnalisables',
      icon: <LayoutDashboard size={24} className="text-white" />,
      color: 'orange',
      path: '/dashboard',
      tab: 'applications',
    },
    {
      title: 'Galerie',
      value: '150+',
      subtitle: 'Photos d\'événements',
      icon: <MessageSquare size={24} className="text-white" />,
      color: 'cyan',
      path: '/gallery',
      tab: 'multimedia',
    },
  ];
  
  const filteredItems = menuItems.filter(item => item.tab === activeTab);

  return (
    <div className="container mx-auto px-4 py-6 mb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-mrc-blue to-mrc-green">
          MRC en Poche
        </h1>
        <p className="text-muted-foreground">Votre plateforme complète pour rester informé et engagé</p>
      </motion.div>
      
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'applications' 
                ? 'bg-white dark:bg-gray-700 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('applications')}
          >
            Applications
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'multimedia' 
                ? 'bg-white dark:bg-gray-700 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('multimedia')}
          >
            Multimédia
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item, index) => (
          <MenuCard
            key={item.title}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            icon={item.icon}
            color={item.color as any}
            onClick={() => navigate(item.path)}
            index={index}
          />
        ))}
      </div>
      
      {!isAuthenticated && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground mb-2">Connectez-vous pour accéder à toutes les fonctionnalités</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2.5 bg-gradient-to-r from-mrc-blue to-mrc-green text-white rounded-md hover:shadow-lg transition-all duration-300"
          >
            <Settings className="inline-block mr-2 h-4 w-4" />
            Paramètres du compte
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default HomeMenu;
