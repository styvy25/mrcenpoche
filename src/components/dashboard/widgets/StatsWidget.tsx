
import React from 'react';

const StatsWidget = () => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="border rounded-lg p-3 text-center">
          <div className="text-2xl font-bold">{Math.floor(Math.random() * 100) + 1}</div>
          <div className="text-xs text-muted-foreground">Interactions</div>
        </div>
        <div className="border rounded-lg p-3 text-center">
          <div className="text-2xl font-bold">{Math.floor(Math.random() * 20) + 1}</div>
          <div className="text-xs text-muted-foreground">Contributions</div>
        </div>
      </div>
      <div className="h-32 border rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground">Graphique des activités</span>
      </div>
    </div>
  );
};

export default StatsWidget;
