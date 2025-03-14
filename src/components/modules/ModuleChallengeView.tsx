
import React from 'react';
import DailyChallenge from '@/components/challenge/DailyChallenge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConnectedUsers from '@/components/challenge/ConnectedUsers';
import UpcomingEventsWidget from '@/components/challenge/UpcomingEventsWidget';

interface ModuleChallengeViewProps {
  onChallengeComplete: () => void;
}

const ModuleChallengeView: React.FC<ModuleChallengeViewProps> = ({ onChallengeComplete }) => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Défis et activités</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Participez à des défis quotidiens, interagissez avec d'autres militants et découvrez les prochains événements.
        </p>
        
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="daily">Défi du jour</TabsTrigger>
            <TabsTrigger value="community">Communauté</TabsTrigger>
            <TabsTrigger value="events">Événements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="space-y-4 min-h-[300px]">
            <DailyChallenge onComplete={onChallengeComplete} />
          </TabsContent>
          
          <TabsContent value="community" className="space-y-4 min-h-[300px]">
            <ConnectedUsers />
          </TabsContent>
          
          <TabsContent value="events" className="space-y-4 min-h-[300px]">
            <UpcomingEventsWidget />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ModuleChallengeView;
