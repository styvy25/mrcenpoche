
import { ReactNode } from 'react';
import { Home, Book, FileText, Bot, Graduation } from 'lucide-react';

export interface NavigationItem {
  path: string;
  label: string;
  icon: ReactNode;
  mobileOnly?: boolean;
}

export const navigationItems: NavigationItem[] = [
  {
    path: "/",
    label: "Accueil",
    icon: <Home className="h-4 w-4 mr-2" />
  },
  {
    path: "/modules",
    label: "Modules",
    icon: <Book className="h-4 w-4 mr-2" />
  },
  {
    path: "/training",
    label: "Formation",
    icon: <Graduation className="h-4 w-4 mr-2" />
  },
  {
    path: "/quiz",
    label: "Quiz",
    icon: <FileText className="h-4 w-4 mr-2" />
  },
  {
    path: "/chat",
    label: "Assistant IA",
    icon: <Bot className="h-4 w-4 mr-2" />
  }
];
