
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Badge, FileText, Video, Users, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DocumentsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Documents & Ressources</h1>
        
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl mb-6">
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Vidéos</span>
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Cours</span>
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Certificats</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Communauté</span>
            </TabsTrigger>
            <TabsTrigger value="configs" className="flex items-center gap-2">
              <Badge className="h-4 w-4" />
              <span className="hidden sm:inline">Configuration</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="videos">
            <Card>
              <CardHeader>
                <CardTitle>Vidéos</CardTitle>
                <CardDescription>Explorez nos vidéos éducatives sur le MRC et la politique camerounaise.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="p-4 text-center">
                  <p>Contenu des vidéos en cours de développement</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Cours</CardTitle>
                <CardDescription>Consultez nos cours politiques et formations.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="p-4 text-center">
                  <p>Contenu des cours en cours de développement</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>Certificats</CardTitle>
                <CardDescription>Vos certificats d'achèvement des cours du MRC.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="p-4 text-center">
                  <p>Aucun certificat disponible pour le moment</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="community">
            <Card>
              <CardHeader>
                <CardTitle>Communauté</CardTitle>
                <CardDescription>Connectez-vous avec d'autres militants du MRC.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="p-4 text-center">
                  <p>Fonctionnalités communautaires en cours de développement</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="configs">
            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
                <CardDescription>Paramétrez vos préférences et configurations.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="p-4 text-center">
                  <p>Options de configuration en cours de développement</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
