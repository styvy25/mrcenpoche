
import React from 'react';
import { Card } from '@/components/ui/card';
import DailyChallenge from '@/components/challenge/DailyChallenge';

interface DailyChallengeSectionProps {
  onChallengeComplete: () => void;
}

const DailyChallengeSection: React.FC<DailyChallengeSectionProps> = ({ onChallengeComplete }) => {
  return (
    <Card className="p-6 h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-3">Défi du jour</h3>
      <div className="flex-grow">
        <DailyChallenge onComplete={onChallengeComplete} />
      </div>
    </Card>
  );
};

export default DailyChallengeSection;
