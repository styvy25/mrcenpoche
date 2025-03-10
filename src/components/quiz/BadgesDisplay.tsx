
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Lock, Medal, Trophy } from "lucide-react";
import { Badge as BadgeType } from "./types";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface BadgesDisplayProps {
  badges?: BadgeType[];
}

const BadgesDisplay = ({ badges: propBadges }: BadgesDisplayProps = {}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [badges, setBadges] = useState<BadgeType[]>([]);

  // Use prop badges if provided, otherwise use badges from localStorage
  useState(() => {
    if (propBadges && propBadges.length > 0) {
      setBadges(propBadges);
    } else {
      try {
        const savedBadges = localStorage.getItem("quiz_badges");
        if (savedBadges) {
          setBadges(JSON.parse(savedBadges));
        }
      } catch (error) {
        console.error("Failed to load badges:", error);
      }
    }
  });

  const filteredBadges = activeCategory === "all" 
    ? badges 
    : badges.filter(badge => badge.category === activeCategory);

  const unlockedCount = badges.filter(badge => badge.unlocked).length;
  const totalCount = badges.length;
  const progressPercentage = totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0;

  const renderBadgeIcon = (badge: BadgeType) => {
    switch (badge.level) {
      case "or":
        return <Trophy className="h-8 w-8" />;
      case "argent":
        return <Medal className="h-8 w-8" />;
      default:
        return <Award className="h-8 w-8" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Progression des Badges</h3>
              <p className="text-sm text-gray-500">
                {unlockedCount} sur {totalCount} badges débloqués
              </p>
            </div>
            <div className="h-16 w-16 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 text-xl font-bold">
              {Math.round(progressPercentage)}%
            </div>
          </div>

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="culture">Culture</TabsTrigger>
          <TabsTrigger value="histoire">Histoire</TabsTrigger>
          <TabsTrigger value="traditions">Traditions</TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBadges.length > 0 ? (
              filteredBadges.map(badge => (
                <Card 
                  key={badge.id} 
                  className={cn(
                    "overflow-hidden border-2 transition-all",
                    badge.unlocked 
                      ? "border-blue-500 shadow-md hover:shadow-lg" 
                      : "border-gray-200 opacity-75"
                  )}
                >
                  <div className="pb-2 p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-semibold">{badge.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        badge.level === 'or' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : badge.level === 'argent' 
                            ? 'bg-gray-100 text-gray-800' 
                            : 'bg-amber-100 text-amber-800'
                      }`}>
                        {badge.level === 'or' 
                          ? 'Or' 
                          : badge.level === 'argent' 
                            ? 'Argent' 
                            : 'Bronze'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{badge.description}</p>
                  </div>
                  <div className="pt-0 p-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mr-3 text-white",
                        badge.unlocked ? badge.colorClass : "bg-gray-300"
                      )}>
                        {badge.unlocked ? (
                          renderBadgeIcon(badge)
                        ) : (
                          <Lock className="h-6 w-6" />
                        )}
                      </div>
                      <div>
                        {badge.unlocked ? (
                          <p className="text-sm text-green-600 font-medium">Badge débloqué</p>
                        ) : (
                          <p className="text-sm text-gray-500">Badge verrouillé</p>
                        )}
                        {badge.dateUnlocked && (
                          <p className="text-xs text-gray-500">
                            Obtenu le {new Date(badge.dateUnlocked).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-gray-500 col-span-2 text-center py-8">
                Aucun badge disponible dans cette catégorie.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BadgesDisplay;
