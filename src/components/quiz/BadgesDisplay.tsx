
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeProps } from "./types";
import { Award } from "lucide-react"; // Default icon

interface BadgesDisplayProps {
  badges: BadgeProps[];
}

const BadgesDisplay: React.FC<BadgesDisplayProps> = ({ badges }) => {
  if (badges.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {badges.map((badge) => {
        // Use default icon if not provided
        const IconComponent = badge.icon?.icon || Award;
        const iconClassName = badge.icon?.className || "text-yellow-400";
        
        return (
          <Card key={badge.id} className="overflow-hidden">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3 mt-2">
                <IconComponent className={iconClassName} />
              </div>
              <h3 className="font-semibold text-center">{badge.name}</h3>
              <p className="text-sm text-gray-500 text-center mt-1">
                {badge.description}
              </p>
              {badge.earnedAt && (
                <p className="text-xs text-gray-400 mt-2">
                  Gagné le {badge.earnedAt.toLocaleDateString()}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default BadgesDisplay;
