
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeProps } from '@/components/quiz/types';
import { useAuth } from "@/components/auth/AuthContext";
import { getUserBadges } from "@/services/gamificationService";
import { Award, Calendar, Clock } from "lucide-react";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const RecentAchievements = () => {
  const { currentUser } = useAuth();
  const [recentBadges, setRecentBadges] = useState<BadgeProps[]>([]);
  
  useEffect(() => {
    if (currentUser) {
      const allBadges = getUserBadges(currentUser.id);
      
      // Trier par date d'obtention et prendre les 5 plus récents
      const sortedBadges = [...allBadges]
        .filter(badge => badge.earnedAt)
        .sort((a, b) => {
          const dateA = a.earnedAt ? new Date(a.earnedAt).getTime() : 0;
          const dateB = b.earnedAt ? new Date(b.earnedAt).getTime() : 0;
          return dateB - dateA;
        })
        .slice(0, 5);
      
      setRecentBadges(sortedBadges);
    }
  }, [currentUser]);
  
  if (recentBadges.length === 0) {
    return null;
  }
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Award className="h-5 w-5 text-purple-500 mr-2" />
          Vos dernières réalisations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentBadges.map(badge => {
            const IconComponent = badge.icon && badge.icon.icon;
            
            return (
              <div key={badge.id} className="flex items-center p-2 bg-gray-50 rounded-lg">
                <div className="bg-white rounded-full p-2 mr-3">
                  {IconComponent ? (
                    <IconComponent className={badge.icon?.className || 'h-5 w-5 text-purple-500'} />
                  ) : (
                    <Award className="h-5 w-5 text-purple-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{badge.name}</h4>
                  {badge.description && (
                    <p className="text-gray-500 text-xs">{badge.description}</p>
                  )}
                </div>
                {badge.earnedAt && (
                  <div className="text-xs text-gray-500 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {format(new Date(badge.earnedAt), 'dd MMM', { locale: fr })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAchievements;
