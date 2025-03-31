
import React from 'react';
import { GlowMenuDemo } from '@/components/ui/glow-menu-demo';
import MainLayout from '@/components/layout/MainLayout';

const GlowMenuDemoPage = () => {
  return (
    <MainLayout showHeader={true} showFooter={true}>
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Glow Menu Demo</h1>
        
        <div className="w-full max-w-3xl space-y-12">
          <div className="p-6 border rounded-lg bg-background/50 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4">Interactive Glow Menu</h2>
            <p className="text-muted-foreground mb-6">
              This menu features hover animations, glowing effects, and 3D transitions.
              Click on menu items to activate them.
            </p>
            
            <div className="flex justify-center mt-8">
              <GlowMenuDemo />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GlowMenuDemoPage;
