
import React from 'react';

const AITypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-1">
      <div className="text-sm text-gray-300">Styvy237 est en train d'écrire</div>
      <div className="flex space-x-1">
        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce delay-0"></div>
        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default AITypingIndicator;
