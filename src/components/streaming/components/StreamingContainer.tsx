
import React from "react";

interface StreamingContainerProps {
  children: React.ReactNode;
}

const StreamingContainer: React.FC<StreamingContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {children}
    </div>
  );
};

export default StreamingContainer;
