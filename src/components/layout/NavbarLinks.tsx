import React from 'react';
import { Home, Book, MessageSquare, Settings, Youtube, Download } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const NavbarLinks = () => {
  const navLinks: NavLink[] = [
    {
      label: 'Accueil',
      href: '/',
      icon: <Home className="h-5 w-5" />,
      description: 'Retourner au tableau de bord principal',
      color: 'text-gray-500',
    },
    {
      label: 'Formations',
      href: '/modules',
      icon: <Book className="h-5 w-5" />,
      description: 'Accéder aux modules de formation',
      color: 'text-mrc-blue',
    },
    {
      label: 'Assistant IA',
      href: '/chat',
      icon: <MessageSquare className="h-5 w-5" />,
      description: 'Discuter avec l\'assistant IA',
      color: 'text-green-500',
    },
    {
      label: 'Analyse YouTube',
      href: '/youtube-analysis',
      icon: <Youtube className="h-5 w-5" />,
      description: 'Analyser des vidéos YouTube du MRC',
      color: 'text-red-500',
    },
    {
      label: 'Téléchargement',
      href: '/youtube-downloader',
      icon: <Download className="h-5 w-5" />,
      description: 'Télécharger des vidéos YouTube du MRC',
      color: 'text-red-500',
    },
    {
      label: 'Paramètres',
      href: '/settings',
      icon: <Settings className="h-5 w-5" />,
      description: 'Modifier les paramètres de l\'application',
      color: 'text-gray-500',
    },
  ];

  return (
    <div className="flex flex-col space-y-4">
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="group flex items-center space-x-3 rounded-md p-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
        >
          <link.icon className={`${link.color} h-4 w-4`} />
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  );
};

export default NavbarLinks;
