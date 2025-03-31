
import React from 'react';
import { BadgeProps } from './types';
import { Award, Star, Medal, Trophy, Crown } from 'lucide-react';

interface QuizBadgesDisplayProps {
  badges: BadgeProps[];
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Award':
      return <Award className="h-5 w-5" />;
    case 'Star':
      return <Star className="h-5 w-5" />;
    case 'Medal':
      return <Medal className="h-5 w-5" />;
    case 'Trophy':
      return <Trophy className="h-5 w-5" />;
    case 'Crown':
      return <Crown className="h-5 w-5" />;
    default:
      return <Award className="h-5 w-5" />;
  }
};

const QuizBadgesDisplay: React.FC<QuizBadgesDisplayProps> = ({ badges }) => {
  if (!badges || badges.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {badges.map((badge) => (
        <div 
          key={badge.id}
          className="flex flex-col items-center p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="p-3 rounded-full mb-2 bg-blue-100">
            <span className="text-blue-500">
              {getIconComponent(badge.icon)}
            </span>
          </div>
          <span className="font-medium text-sm">{badge.name}</span>
          <p className="text-xs text-gray-500 text-center mt-1">{badge.description}</p>
        </div>
      ))}
    </div>
  );
};

export default QuizBadgesDisplay;
