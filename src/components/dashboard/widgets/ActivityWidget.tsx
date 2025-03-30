
import React from 'react';

const ActivityWidget = () => {
  return (
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 text-sm border-b pb-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <div className="flex-1">Action réalisée {i + 1}</div>
          <div className="text-xs text-muted-foreground">
            {new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityWidget;
