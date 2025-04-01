
import React from 'react';
import { BookOpen, Video, FileText, Award } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ModuleTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  showCertificateTab: boolean;
  children: React.ReactNode;
}

const ModuleTabs: React.FC<ModuleTabsProps> = ({ 
  activeTab, 
  onTabChange, 
  showCertificateTab, 
  children 
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="mb-6 bg-gray-800">
        <TabsTrigger value="content" className="data-[state=active]:bg-gray-700">
          <BookOpen className="h-4 w-4 mr-2" />
          Contenu
        </TabsTrigger>
        <TabsTrigger value="video" className="data-[state=active]:bg-gray-700">
          <Video className="h-4 w-4 mr-2" />
          Vidéos
        </TabsTrigger>
        <TabsTrigger value="quiz" className="data-[state=active]:bg-gray-700">
          <FileText className="h-4 w-4 mr-2" />
          Quiz
        </TabsTrigger>
        {showCertificateTab && (
          <TabsTrigger value="certificate" className="data-[state=active]:bg-gray-700">
            <Award className="h-4 w-4 mr-2" />
            Certificat
          </TabsTrigger>
        )}
      </TabsList>
      {children}
    </Tabs>
  );
};

export default ModuleTabs;
