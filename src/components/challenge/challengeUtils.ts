
export const formatTimeRemaining = (date: Date): string => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  
  if (diff <= 0) {
    return "maintenant";
  }
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h${minutes > 0 ? minutes : ''}`;
  }
  
  return `${minutes}m`;
};

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'facile':
      return 'bg-green-100 text-green-800';
    case 'moyen':
      return 'bg-yellow-100 text-yellow-800';
    case 'difficile':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
