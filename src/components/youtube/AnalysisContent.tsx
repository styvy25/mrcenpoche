
import React from 'react';

interface AnalysisContentProps {
  analysis: string | null;
}

const AnalysisContent: React.FC<AnalysisContentProps> = ({ analysis }) => {
  if (!analysis) {
    return <p>Aucune analyse disponible. Veuillez d'abord analyser une vidéo.</p>;
  }

  return (
    <div className="prose dark:prose-invert max-w-none">
      {analysis.split('\n').map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-2xl font-bold mt-4 mb-2">{line.replace('# ', '')}</h1>;
        } else if (line.startsWith('## ')) {
          return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{line.replace('## ', '')}</h2>;
        } else if (line.startsWith('- ')) {
          return <li key={index} className="ml-5">{line.replace('- ', '')}</li>;
        } else if (line.match(/^\d+\./)) {
          return <div key={index} className="flex gap-2 ml-2 mb-1">
            <span className="font-bold">{line.split('.')[0]}.</span>
            <span>{line.split('.').slice(1).join('.')}</span>
          </div>;
        } else if (line === '') {
          return <br key={index} />;
        } else {
          return <p key={index} className="my-2">{line}</p>;
        }
      })}
    </div>
  );
};

export default AnalysisContent;
