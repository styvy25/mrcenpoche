
import { LucideIcon, Home, Book, Trophy, MessageSquare, FileText, Calendar, Settings, Map } from "lucide-react";

export interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  requiresAuth?: boolean;
  isNew?: boolean;
  isHot?: boolean;
  isActive?: (pathname: string) => boolean;
  // Ajouter ces propriétés pour la compatibilité avec les composants existants
  path?: string;
  label?: string;
  getIcon?: () => React.ReactNode;
}

export const navigationItems: NavigationItem[] = [
  {
    title: "Accueil",
    href: "/",
    path: "/",
    label: "Accueil",
    icon: Home,
    description: "Retourner au tableau de bord principal",
    getIcon: () => <Home className="h-5 w-5" />
  },
  {
    title: "Modules",
    href: "/modules",
    path: "/modules",
    label: "Modules",
    icon: Book,
    description: "Accéder aux modules de formation",
    requiresAuth: true,
    isActive: (pathname: string) => pathname.startsWith("/modules"),
    getIcon: () => <Book className="h-5 w-5" />
  },
  {
    title: "Quiz",
    href: "/quiz",
    path: "/quiz",
    label: "Quiz",
    icon: Trophy,
    description: "Tester vos connaissances",
    requiresAuth: true,
    getIcon: () => <Trophy className="h-5 w-5" />
  },
  {
    title: "Assistant IA",
    href: "/assistant",
    path: "/assistant",
    label: "Assistant IA",
    icon: MessageSquare,
    description: "Obtenir de l'aide de l'assistant IA",
    requiresAuth: true,
    isHot: true,
    getIcon: () => <MessageSquare className="h-5 w-5" />
  },
  {
    title: "Actualités",
    href: "/news",
    path: "/news",
    label: "Actualités",
    icon: FileText,
    description: "Suivre les dernières actualités",
    requiresAuth: true,
    getIcon: () => <FileText className="h-5 w-5" />
  },
  {
    title: "Réunions",
    href: "/meetings",
    path: "/meetings",
    label: "Réunions",
    icon: Calendar,
    description: "Planifier et gérer vos événements",
    requiresAuth: true,
    getIcon: () => <Calendar className="h-5 w-5" />
  },
  {
    title: "Paramètres",
    href: "/settings",
    path: "/settings",
    label: "Paramètres",
    icon: Settings,
    description: "Configurer l'application",
    requiresAuth: true,
    getIcon: () => <Settings className="h-5 w-5" />
  },
  {
    title: "Carte politique",
    href: "/political-map",
    path: "/political-map",
    label: "Carte politique",
    icon: Map,
    description: "Analysez la répartition politique au Cameroun",
    isNew: true,
    getIcon: () => <Map className="h-5 w-5" />
  },
];

// Ajout de navIcons pour résoudre l'erreur dans Navbar.tsx
export const navIcons = {
  home: Home,
  modules: Book,
  quiz: Trophy,
  assistant: MessageSquare,
  news: FileText,
  meetings: Calendar,
  settings: Settings,
  "political-map": Map
};

export const getIsActive = (pathname: string, href: string): boolean => {
  return pathname === href;
};
