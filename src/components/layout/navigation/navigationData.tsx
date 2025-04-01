
import { ReactNode } from 'react';
import { Home, Book, FileText, Bot, GraduationCap } from 'lucide-react';

export interface NavigationItem {
  path: string;
  label: string;
  getIcon: () => ReactNode;
  mobileOnly?: boolean;
}

export const navigationItems: NavigationItem[] = [
  {
    path: "/",
    label: "Accueil",
    getIcon: () => <Home className="h-4 w-4 mr-2" />
  },
  {
    path: "/modules",
    label: "Modules",
    getIcon: () => <Book className="h-4 w-4 mr-2" />
  },
  {
    path: "/training",
    label: "Formation",
    getIcon: () => <GraduationCap className="h-4 w-4 mr-2" />
  },
  {
    path: "/quiz",
    label: "Quiz",
    getIcon: () => <FileText className="h-4 w-4 mr-2" />
  },
  {
    path: "/chat",
    label: "Assistant IA",
    getIcon: () => <Bot className="h-4 w-4 mr-2" />
  }
];

// Export individual icons for expandable tabs
export const navIcons = {
  home: Home,
  book: Book,
  graduationCap: GraduationCap,
  fileText: FileText,
  bot: Bot
};
