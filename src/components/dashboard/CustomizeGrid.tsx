
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import WidgetSelector from './WidgetSelector';
import { Widget } from './types';

interface CustomizeGridProps {
  availableWidgets: Widget[];
  onAddWidget: (widget: Widget) => void;
}

const CustomizeGrid = ({ availableWidgets, onAddWidget }: CustomizeGridProps) => {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Personnaliser le Tableau de Bord</CardTitle>
          <CardDescription>
            Ajoutez, supprimez ou réorganisez les widgets de votre tableau de bord
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <WidgetSelector 
              availableWidgets={availableWidgets} 
              onAddWidget={onAddWidget} 
            />
            
            <div>
              <h3 className="text-sm font-medium mb-2">Conseils de personnalisation</h3>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                <li>Glissez-déposez les widgets pour les réorganiser</li>
                <li>Cliquez sur l'icône de corbeille pour supprimer un widget</li>
                <li>Ajoutez de nouveaux widgets depuis la liste ci-dessus</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomizeGrid;
