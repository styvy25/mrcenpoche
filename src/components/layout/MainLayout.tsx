
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className = '',
  showHeader = true,
  showFooter = true
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {showHeader && <Header />}
      
      <main className={cn('flex-1 container mx-auto px-4 pb-24', className)}>
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
