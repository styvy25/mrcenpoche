
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ForumTopic } from './Forum';
import { UserWithSubscription } from '@/components/auth/AuthContext';
import { ChevronRight, Crown, Award, MessageCircle, User, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ForumSidebarProps {
  currentUser: UserWithSubscription | null;
  topUsers: {
    id: string;
    name: string;
    points: number;
    badges: string[];
  }[];
  popularTopics: ForumTopic[];
}

const ForumSidebar: React.FC<ForumSidebarProps> = ({ currentUser, topUsers, popularTopics }) => {
  // Get time ago in French
  const getTimeAgo = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: fr });
  };

  return (
    <div className="space-y-4">
      {/* User Profile Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Votre profil</CardTitle>
        </CardHeader>
        <CardContent>
          {currentUser ? (
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-16 w-16 mb-2">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                  {currentUser.username?.substring(0, 2).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">{currentUser.username || currentUser.email?.split('@')[0]}</h3>
              <p className="text-xs text-muted-foreground mb-2">Membre depuis {currentUser.lastLogin ? getTimeAgo(new Date(currentUser.lastLogin)) : 'récemment'}</p>
              
              <div className="flex flex-wrap justify-center gap-1 mb-3">
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  Niveau 1
                </Badge>
                <Badge variant="outline">Nouveau</Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-2 w-full text-center mb-3">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">0</span>
                  <span className="text-xs text-muted-foreground">Sujets</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">0</span>
                  <span className="text-xs text-muted-foreground">Réponses</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">150</span>
                  <span className="text-xs text-muted-foreground">Points</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <User className="h-4 w-4" />
                  <span>Profil</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Settings className="h-4 w-4" />
                  <span>Paramètres</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-2">
              <p className="mb-2">Connectez-vous pour participer aux discussions</p>
              <Button variant="default" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Connexion / Inscription
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Users Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-1">
            <Crown className="h-4 w-4 text-yellow-500" />
            Classement des utilisateurs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topUsers.map((user, index) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-muted-foreground">{index + 1}</span>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <div className="flex gap-1">
                      {user.badges.map((badge, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                  {user.points} pts
                </Badge>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-3 gap-1">
            <span>Voir tout le classement</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Popular Topics Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-1">
            <MessageCircle className="h-4 w-4 text-blue-500" />
            Sujets populaires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {popularTopics.map((topic) => (
              <div key={topic.id} className="group">
                <a href="#" className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium">
                  {topic.title}
                </a>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{topic.repliesCount} réponses</span>
                  <span>•</span>
                  <span>{topic.viewsCount} vues</span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-3 gap-1">
            <span>Voir tous les sujets</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Notifications Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-1">
            <Bell className="h-4 w-4 text-red-500" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Nouveaux sujets</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Réponses à mes messages</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Mentions</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Nouvelles annonces</span>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForumSidebar;
