
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

const DocumentsWidget = () => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="border rounded-lg p-3 text-center">
          <div className="text-2xl font-bold">5</div>
          <div className="text-xs text-muted-foreground">PDF générés</div>
        </div>
        <div className="border rounded-lg p-3 text-center">
          <div className="text-2xl font-bold">2</div>
          <div className="text-xs text-muted-foreground">Certificats</div>
        </div>
      </div>
      <Button variant="outline" size="sm" className="w-full">
        <FileText className="h-4 w-4 mr-2" />
        Gérer mes documents
      </Button>
    </div>
  );
};

export default DocumentsWidget;
