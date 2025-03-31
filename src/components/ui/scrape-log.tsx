
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, ExternalLink } from "lucide-react";

export type ScrapeLogItem = {
  id: string;
  url: string;
  status: 'success' | 'error' | 'processing';
  created_at: string;
  error_message?: string;
};

interface ScrapeLogProps {
  logs: ScrapeLogItem[];
  onRefresh: () => void;
  loading?: boolean;
}

export function ScrapeLog({ logs, onRefresh, loading = false }: ScrapeLogProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Historique des analyses</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableCaption>Liste des URLs analysées récemment</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                  Aucun historique d'analyse trouvé
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="max-w-[300px] truncate">
                    <a 
                      href={log.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {log.url}
                    </a>
                  </TableCell>
                  <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        log.status === 'success' ? 'success' : 
                        log.status === 'error' ? 'destructive' : 'outline'
                      }
                    >
                      {log.status === 'success' ? 'Succès' : 
                       log.status === 'error' ? 'Erreur' : 'En cours'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      asChild
                    >
                      <a 
                        href={log.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visiter
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
