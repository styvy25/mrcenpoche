
import React from 'react';
import { BadgeProps } from './types';
import { Award, Star, Book, History, Vote } from 'lucide-react';

interface QuizBadgesDisplayProps {
  badges: BadgeProps[];
}

const QuizBadgesDisplay: React.FC<QuizBadgesDisplayProps> = ({ badges }) => {
  // Function to get the appropriate icon based on the badge's icon name
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy':
      case 'Award':
        return <Award className="h-6 w-6" />;
      case 'Star':
        return <Star className="h-6 w-6" />;
      case 'Book':
        return <Book className="h-6 w-6" />;
      case 'History':
        return <History className="h-6 w-6" />;
      case 'Vote':
        return <Vote className="h-6 w-6" />;
      default:
        return <Award className="h-6 w-6" />;
    }
  };

  // Function to get the appropriate color based on the badge's color name
  const getColorClass = (colorName: string) => {
    switch (colorName) {
      case 'gold':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'silver':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'bronze':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'blue':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'green':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'red':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'purple':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-300';
    }
  };

  if (!badges || badges.length === 0) {
    return <div className="text-center text-gray-500">Aucun badge débloqué</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {badges.map((badge) => (
        <div 
          key={badge.id}
          className={`flex flex-col items-center p-4 rounded-lg border ${getColorClass(badge.color)} transition-all hover:shadow-md`}
        >
          <div className={`rounded-full p-3 mb-2 ${getColorClass(badge.color)}`}>
            {getIcon(badge.icon)}
          </div>
          <h3 className="font-medium text-center">{badge.name}</h3>
          <p className="text-xs text-center mt-1">{badge.description}</p>
        </div>
      ))}
    </div>
  );
};

export default QuizBadgesDisplay;
