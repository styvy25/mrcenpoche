
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import WidgetCard from './WidgetCard';
import AchievementsWidget from './widgets/AchievementsWidget';
import VideosWidget from './widgets/VideosWidget';
import DocumentsWidget from './widgets/DocumentsWidget';
import ActivityWidget from './widgets/ActivityWidget';
import StatsWidget from './widgets/StatsWidget';
import { Widget, UserBadge } from './types';

interface DashboardGridProps {
  widgets: Widget[];
  badges: UserBadge[];
  onRemoveWidget: (widgetId: string) => void;
  onDragEnd: (result: any) => void;
}

const DashboardGrid = ({ 
  widgets, 
  badges, 
  onRemoveWidget, 
  onDragEnd 
}: DashboardGridProps) => {
  
  const renderWidgetContent = (widget: Widget) => {
    switch (widget.type) {
      case 'achievements':
        return <AchievementsWidget badges={badges} />;
      case 'videos':
        return <VideosWidget />;
      case 'documents':
        return <DocumentsWidget />;
      case 'activity':
        return <ActivityWidget />;
      case 'stats':
        return <StatsWidget />;
      default:
        return <div>Contenu non disponible</div>;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="widgets" direction="vertical">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {widgets.map((widget, index) => (
              <Draggable key={widget.id} draggableId={widget.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`
                      ${widget.height === 'sm' ? 'h-auto' : ''} 
                      ${widget.height === 'md' ? 'h-auto' : ''} 
                      ${widget.height === 'lg' ? 'h-auto md:col-span-2' : ''}
                    `}
                  >
                    <WidgetCard
                      id={widget.id}
                      title={widget.title}
                      icon={React.createElement(widget.icon, { size: 16 })}
                      onRemove={onRemoveWidget}
                      dragHandleProps={provided.dragHandleProps}
                    >
                      {renderWidgetContent(widget)}
                    </WidgetCard>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DashboardGrid;
