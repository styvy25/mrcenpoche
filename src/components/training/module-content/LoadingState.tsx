
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingState: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <Skeleton className="h-4 w-32 mb-4 bg-gray-800" />
        <Skeleton className="h-48 w-full rounded-xl bg-gray-800" />
      </div>
      
      <div className="mb-6">
        <Skeleton className="h-4 w-24 mb-4 bg-gray-800" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-8 w-20 rounded-full bg-gray-800" />
          ))}
        </div>
      </div>
      
      <div>
        <Skeleton className="h-4 w-40 mb-4 bg-gray-800" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Skeleton key={i} className="h-64 rounded-xl bg-gray-800" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
