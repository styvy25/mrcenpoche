
import React from 'react';
import { NavigationProvider } from './navigation/NavigationContext';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from './AppSidebar';
import Footer from './Footer';
import ResponsiveContainer from './ResponsiveContainer';
import ApplicationStatus from './ApplicationStatus';
import AuthNavItem from './AuthNavItem';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <NavigationProvider>
      <SidebarProvider>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
          <div className="flex flex-1">
            <AppSidebar />
            <main className="flex-grow py-8 w-full">
              <div className="h-16"></div> {/* Spacer to push content below where navbar was */}
              <ResponsiveContainer>
                <ApplicationStatus />
                <div className="flex justify-end mb-4">
                  <AuthNavItem />
                </div>
                {children}
              </ResponsiveContainer>
            </main>
          </div>
          <Footer />
        </div>
      </SidebarProvider>
    </NavigationProvider>
  );
};

export default MainLayout;
