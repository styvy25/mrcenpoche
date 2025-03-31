
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Widget } from './types';

interface WidgetSelectorProps {
  availableWidgets: Widget[];
  onAddWidget: (widget: Widget) => void;
}

const WidgetSelector = ({ availableWidgets, onAddWidget }: WidgetSelectorProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Widgets disponibles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {availableWidgets.map(widget => (
          <Button
            key={widget.id}
            variant="outline"
            className="flex justify-start h-auto py-2"
            onClick={() => onAddWidget(widget)}
          >
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <div className="flex items-center gap-1">
                {React.createElement(widget.icon, { size: 16 })}
                <span>{widget.title}</span>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default WidgetSelector;
