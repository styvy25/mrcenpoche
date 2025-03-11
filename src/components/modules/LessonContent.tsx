
import React, { useRef, useEffect } from 'react';

interface LessonContentProps {
  title: string;
  content: string;
}

const LessonContent: React.FC<LessonContentProps> = ({ title, content }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Effect for animating content elements on load
  useEffect(() => {
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('h2, h3, p, ul, ol, blockquote');
      
      elements.forEach((element, index) => {
        // Add animation class
        element.classList.add('editorial-fade-in');
        // Add increasing delay for each element
        (element as HTMLElement).style.animationDelay = `${index * 0.1}s`;
      });
    }
  }, [content]);
  
  return (
    <>
      <h2 className="text-2xl font-bold text-mrc-blue dark:text-blue-400 mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">
        {title}
      </h2>
      <div 
        ref={contentRef}
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </>
  );
};

export default LessonContent;
