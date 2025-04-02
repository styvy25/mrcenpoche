
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingState: React.FC = () => {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="space-y-2">
        <Skeleton className="h-8 w-3/4 bg-gray-800" />
        <Skeleton className="h-4 w-1/2 bg-gray-800" />
      </div>
      
      <Skeleton className="h-64 w-full rounded-lg bg-gray-800" />
      
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/3 bg-gray-800" />
        <Skeleton className="h-4 w-full bg-gray-800" />
        <Skeleton className="h-4 w-full bg-gray-800" />
        <Skeleton className="h-4 w-5/6 bg-gray-800" />
      </div>
      
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/4 bg-gray-800" />
        <Skeleton className="h-4 w-full bg-gray-800" />
        <Skeleton className="h-4 w-3/4 bg-gray-800" />
      </div>
    </div>
  );
};

export default LoadingState;
