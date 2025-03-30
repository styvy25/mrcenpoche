
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  date: Date;
  category: string;
}

interface AchievementsWidgetProps {
  badges: UserBadge[];
}

const AchievementsWidget = ({ badges }: AchievementsWidgetProps) => {
  return (
    <div className="space-y-4">
      {badges.length > 0 ? (
        badges.map(badge => (
          <div key={badge.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              {badge.icon}
            </div>
            <div className="flex-1">
              <div className="font-medium">{badge.name}</div>
              <div className="text-sm text-muted-foreground">{badge.description}</div>
            </div>
            <Badge variant="outline" className="text-xs">
              {badge.date.toLocaleDateString()}
            </Badge>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          Aucun badge obtenu pour le moment.
        </div>
      )}
    </div>
  );
};

export default AchievementsWidget;
