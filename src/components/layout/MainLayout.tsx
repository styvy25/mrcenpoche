
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { cn } from "@/lib/utils";
import Navbar from './Navbar';
import { useMediaQuery } from "@/hooks/use-media-query";

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
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {showHeader && <Navbar />}
      
      <main className={cn(
        'flex-1 w-full', 
        isMobile ? 'pt-14' : 'pt-0',
        className
      )}>
        <div className={cn(
          'mx-auto w-full',
          fullWidth ? 'max-w-none px-0' : 'container px-4',
          padBottom && 'pb-16'
        )}>
          {children}
        </div>
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
