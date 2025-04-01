
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-800 rounded w-1/4"></div>
      <div className="h-4 bg-gray-800 rounded w-full"></div>
      <div className="h-4 bg-gray-800 rounded w-full"></div>
      <div className="h-4 bg-gray-800 rounded w-3/4"></div>
      <div className="h-64 bg-gray-800 rounded w-full"></div>
    </div>
  );
};

export default LoadingState;
