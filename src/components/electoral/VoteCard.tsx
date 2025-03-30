
import React from 'react';

interface VoteCardProps {
  className?: string;
  width?: number;
  height?: number;
}

const VoteCard: React.FC<VoteCardProps> = ({ className, width, height }) => {
  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className || ''}`}>
      <h2 className="text-lg font-bold mb-2">Carte d'électeur</h2>
      <p className="text-sm text-gray-600">Votre carte d'électeur numérique</p>
    </div>
  );
};

export default VoteCard;
