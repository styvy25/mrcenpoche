
import React, { useState, useEffect } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  id: string;
  email: string;
  role?: string;
  region?: string;
  progress?: number;
  badges?: string[];
  full_name?: string;
  avatar_url?: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        // Get user metadata from auth
        const { data: userData } = await supabase.auth.getUser();
        
        setProfile({
          ...data,
          email: userData.user?.email || '',
          role: userData.user?.user_metadata?.role || 'citoyen',
          region: userData.user?.user_metadata?.region || '',
          progress: userData.user?.user_metadata?.progress || 0,
          badges: userData.user?.user_metadata?.badges || []
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger votre profil",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto p-4 pt-20">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-200 h-16 w-16"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-4 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.avatar_url || ''} />
                <AvatarFallback className="bg-mrc-blue text-white text-lg">
                  {profile?.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{profile?.full_name || profile?.email}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Badge variant="outline">{profile?.role || 'Citoyen'}</Badge>
                <span>•</span>
                <span>{profile?.region || 'Non spécifié'}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progression</span>
                  <span className="text-sm text-gray-500">{profile?.progress || 0}%</span>
                </div>
                <Progress value={profile?.progress || 0} className="h-2" />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Email</h3>
                <p className="text-gray-600">{profile?.email}</p>
              </div>
              
              <Button variant="outline" className="w-full">
                Modifier le profil
              </Button>
            </CardContent>
          </Card>
          
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="badges">
              <TabsList className="mb-6">
                <TabsTrigger value="badges">Badges</TabsTrigger>
                <TabsTrigger value="history">Historique</TabsTrigger>
                <TabsTrigger value="settings">Paramètres</TabsTrigger>
              </TabsList>
              
              <TabsContent value="badges" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Mes badges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!profile?.badges || profile.badges.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-gray-500">
                          Vous n'avez pas encore obtenu de badge. Complétez des formations et des quiz pour en gagner !
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {profile.badges.map((badge, index) => (
                          <div key={index} className="flex flex-col items-center p-3 border rounded-lg">
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                              <span className="text-2xl">🏆</span>
                            </div>
                            <h3 className="font-medium text-center">{badge}</h3>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Historique d'activités</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <p className="text-gray-500">
                        Votre historique d'activités s'affichera ici une fois que vous aurez commencé à utiliser l'application.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres du compte</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="destructive" className="w-full sm:w-auto">
                      Supprimer mon compte
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
