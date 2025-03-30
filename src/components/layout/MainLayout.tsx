
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { cn } from '@/lib/utils';
import Navbar from './Navbar';
import ResponsiveContainer from './ResponsiveContainer';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  fullWidth?: boolean;
  padBottom?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className = '',
  showHeader = true,
  showFooter = true,
  fullWidth = false,
  padBottom = true
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {showHeader && <Navbar />}
      
      <main className={cn('flex-1', className)}>
        <ResponsiveContainer fullWidth={fullWidth} padBottom={padBottom}>
          {children}
        </ResponsiveContainer>
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
