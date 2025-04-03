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
}

export const navigationItems: NavigationItem[] = [
  {
    title: "Accueil",
    href: "/",
    icon: Home,
    description: "Retourner au tableau de bord principal",
  },
  {
    title: "Modules",
    href: "/modules",
    icon: Book,
    description: "Accéder aux modules de formation",
    requiresAuth: true,
    isActive: (pathname: string) => pathname.startsWith("/modules"),
  },
  {
    title: "Quiz",
    href: "/quiz",
    icon: Trophy,
    description: "Tester vos connaissances",
    requiresAuth: true,
  },
  {
    title: "Assistant IA",
    href: "/assistant",
    icon: MessageSquare,
    description: "Obtenir de l'aide de l'assistant IA",
    requiresAuth: true,
    isHot: true,
  },
  {
    title: "Actualités",
    href: "/news",
    icon: FileText,
    description: "Suivre les dernières actualités",
    requiresAuth: true,
  },
  {
    title: "Agenda",
    href: "/meetings",
    icon: Calendar,
    description: "Planifier et gérer vos événements",
    requiresAuth: true,
  },
  {
    title: "Paramètres",
    href: "/settings",
    icon: Settings,
    description: "Configurer l'application",
    requiresAuth: true,
  },
  {
    title: "Carte politique",
    href: "/political-map",
    icon: Map,
    description: "Analysez la répartition politique au Cameroun",
    isNew: true,
  },
];

export const getIsActive = (pathname: string, href: string): boolean => {
  return pathname === href;
};
