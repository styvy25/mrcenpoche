
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { UserBadge } from './widgets/AchievementsWidget';

interface BadgesGridProps {
  badges: UserBadge[];
}

const BadgesGrid = ({ badges }: BadgesGridProps) => {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Mes Badges</CardTitle>
          <CardDescription>
            Les badges que vous avez obtenus en utilisant la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent>
          {badges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map(badge => (
                <Card key={badge.id} className="overflow-hidden">
                  <div className="h-2 bg-primary"></div>
                  <CardContent className="p-4 pt-6">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        {badge.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{badge.name}</div>
                        <div className="text-sm text-muted-foreground">{badge.description}</div>
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-muted-foreground">
                      Obtenu le {badge.date.toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Aucun badge obtenu pour le moment.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BadgesGrid;
