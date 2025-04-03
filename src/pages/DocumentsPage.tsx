
import React, { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import PDFGenerator from "@/components/documents/PDFGenerator";
import TrainingStatistics from "@/components/documents/TrainingStatistics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Clock, BarChart2, Video, Certificate, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const recentDocuments = [
  { id: 1, title: "Histoire du MRC", module: "Histoire et Valeurs du MRC", date: "15/06/2023", pages: 12 },
  { id: 2, title: "Techniques de Mobilisation - Résumé", module: "Techniques de Mobilisation", date: "02/07/2023", pages: 8 },
  { id: 3, title: "Certificat de formation", module: "Histoire et Valeurs du MRC", date: "15/06/2023", pages: 1 },
];

const courseVideos = [
  { id: 1, title: "Histoire du MRC et ses fondateurs", duration: "15:24", thumbnail: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624" },
  { id: 2, title: "Techniques de mobilisation sur le terrain", duration: "23:10", thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87" },
  { id: 3, title: "Communication politique efficace", duration: "18:45", thumbnail: "https://images.unsplash.com/photo-1494172961521-33799ddd43a5" },
];

const certificates = [
  { id: 1, title: "Histoire et Valeurs du MRC", status: "Obtenu", date: "15/06/2023" },
  { id: 2, title: "Techniques de Mobilisation", status: "En cours", progress: 75 },
  { id: 3, title: "Communication Politique", status: "Non commencé", progress: 0 },
];

const DocumentsPage = () => {
  const [activeSection, setActiveSection] = useState('generate');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-2">
            Documents et Supports
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Générez, consultez et gérez vos supports de formation en format PDF, vidéos et certificats.
          </p>
        </div>
        
        <Tabs defaultValue={activeSection} onValueChange={(value) => setActiveSection(value)}>
          <TabsList className="mb-8 grid w-full md:w-[600px] grid-cols-5 mx-auto">
            <TabsTrigger value="generate" className="flex items-center text-xs md:text-sm">
              <FileText className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Générer</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center text-xs md:text-sm">
              <Video className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Vidéos</span>
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex items-center text-xs md:text-sm">
              <Certificate className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Certificats</span>
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center text-xs md:text-sm">
              <BarChart2 className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Statistiques</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center text-xs md:text-sm">
              <Clock className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Historique</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className="space-y-4">
            <div className="max-w-2xl mx-auto">
              <PDFGenerator />
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-mrc-blue">Vidéos de formation</CardTitle>
                  <CardDescription>
                    Accédez à nos vidéos de formation pour approfondir vos connaissances
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courseVideos.map(video => (
                      <div key={video.id} className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        <div className="aspect-video relative bg-gray-200 dark:bg-gray-700">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Button variant="outline" size="icon" className="rounded-full h-12 w-12 bg-white/80 hover:bg-white">
                              <Video className="h-6 w-6" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium mb-1">{video.title}</h3>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {video.duration}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-mrc-blue">Certificats de formation</CardTitle>
                  <CardDescription>
                    Consultez et téléchargez vos certificats de formation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Module
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Statut
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {certificates.map((cert) => (
                          <tr key={cert.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900 dark:text-gray-100">
                                {cert.title}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {cert.status === "Obtenu" ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                  {cert.status}
                                </span>
                              ) : cert.status === "En cours" ? (
                                <div>
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                    {cert.status}
                                  </span>
                                  <div className="mt-1 w-24 bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${cert.progress}%` }}></div>
                                  </div>
                                </div>
                              ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                  {cert.status}
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {cert.date || "—"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              {cert.status === "Obtenu" ? (
                                <Button variant="ghost" size="sm" className="text-mrc-blue">
                                  <Download className="h-4 w-4 mr-1" />
                                  Télécharger
                                </Button>
                              ) : cert.status === "En cours" ? (
                                <Button variant="ghost" size="sm" className="text-mrc-blue">
                                  Continuer
                                </Button>
                              ) : (
                                <Button variant="ghost" size="sm" className="text-mrc-blue">
                                  Commencer
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-4">
            <div className="max-w-3xl mx-auto">
              <TrainingStatistics />
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="space-y-4 max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Documents récents
              </h2>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Document
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Module
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Pages
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {recentDocuments.map((doc) => (
                      <tr key={doc.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-3" />
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {doc.title}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{doc.module}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="h-4 w-4 mr-1" />
                            {doc.date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{doc.pages} pages</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm" className="text-mrc-blue">
                            <Download className="h-4 w-4 mr-1" />
                            Télécharger
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DocumentsPage;
