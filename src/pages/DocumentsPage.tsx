
import React from "react";
import Navbar from "@/components/layout/Navbar";
import PDFGenerator from "@/components/documents/PDFGenerator";
import TrainingStatistics from "@/components/documents/TrainingStatistics";
import AuthenticationNotice from "@/components/documents/AuthenticationNotice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Clock, BarChart2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import ApplicationStatus from "@/components/layout/ApplicationStatus";

const recentDocuments = [
  { id: 1, title: "Histoire du MRC", module: "Histoire et Valeurs du MRC", date: "15/06/2023", pages: 12 },
  { id: 2, title: "Techniques de Mobilisation - Résumé", module: "Techniques de Mobilisation", date: "02/07/2023", pages: 8 },
  { id: 3, title: "Certificat de formation", module: "Histoire et Valeurs du MRC", date: "15/06/2023", pages: 1 },
];

const DocumentsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-2">
            Documents et Supports
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Générez et consultez vos supports de formation en format PDF.
          </p>
        </div>
        
        <ApplicationStatus />
        
        {isAuthenticated ? (
          <Tabs defaultValue="generate">
            <TabsList className="mb-8 grid w-full md:w-[400px] grid-cols-3 mx-auto">
              <TabsTrigger value="generate">Générer un PDF</TabsTrigger>
              <TabsTrigger value="statistics">Statistiques</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generate" className="space-y-4">
              <div className="max-w-2xl mx-auto">
                <PDFGenerator />
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
                            <a href="#" className="text-mrc-blue hover:text-blue-700 flex items-center justify-end">
                              <Download className="h-4 w-4 mr-1" />
                              Télécharger
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="max-w-md mx-auto">
            <AuthenticationNotice />
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;
