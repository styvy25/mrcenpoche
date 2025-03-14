
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lesson } from './types';
import { getLessonContent } from './utils/lessonContentUtil';
import LessonActionButtons from './LessonActionButtons';
import LessonEmptyState from './LessonEmptyState';
import { FileText, Video } from 'lucide-react';

export interface ModuleLessonContentProps {
  lesson?: Lesson;
  onComplete: () => void;
  moduleId: string;
}

const ModuleLessonContent: React.FC<ModuleLessonContentProps> = ({ 
  lesson, 
  onComplete,
  moduleId
}) => {
  const [videoError, setVideoError] = useState(false);
  const [completed, setCompleted] = useState(false);

  // If no lesson, show empty state
  if (!lesson) {
    return <LessonEmptyState />;
  }

  const { title, content, videoUrl, isCompleted } = lesson;

  const handleMarkAsComplete = () => {
    // Set local state
    setCompleted(true);
    // Call parent handler
    onComplete();
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  // Render based on content type
  const renderLessonContent = () => {
    if (videoUrl && !videoError) {
      return (
        <div className="aspect-video w-full mb-4">
          <iframe
            src={videoUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-md"
            onError={handleVideoError}
          />
        </div>
      );
    }

    return (
      <div className="prose dark:prose-invert max-w-none">
        {content ? (
          <div dangerouslySetInnerHTML={{ __html: getLessonContent(content) }} />
        ) : (
          <p>Cette leçon n'a pas encore de contenu.</p>
        )}
      </div>
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        {videoUrl ? (
          <Video className="h-5 w-5 text-blue-500" />
        ) : (
          <FileText className="h-5 w-5 text-green-500" />
        )}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      {renderLessonContent()}

      <div className="mt-6 space-y-4">
        <LessonActionButtons
          isCompleted={completed || isCompleted}
          onMarkComplete={handleMarkAsComplete}
        />
      </div>
    </Card>
  );
};

export default ModuleLessonContent;
