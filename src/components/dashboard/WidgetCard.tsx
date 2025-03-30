
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoveVertical, Trash2 } from 'lucide-react';

interface WidgetCardProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  onRemove: (id: string) => void;
  dragHandleProps?: any;
  children: React.ReactNode;
}

const WidgetCard = ({ 
  id, 
  title, 
  icon, 
  onRemove, 
  dragHandleProps,
  children 
}: WidgetCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            {...dragHandleProps}
          >
            <MoveVertical className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-red-500"
            onClick={() => onRemove(id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {children}
      </CardContent>
    </Card>
  );
};

export default WidgetCard;
