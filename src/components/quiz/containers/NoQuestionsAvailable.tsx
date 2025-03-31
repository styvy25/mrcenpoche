
import React from "react";

const NoQuestionsAvailable: React.FC = () => {
  return (
    <div className="p-8 text-center animate-fade-in">
      <h2 className="text-xl font-semibold text-mrc-blue mb-4">Aucune question disponible</h2>
      <p className="text-gray-600">Veuillez sélectionner une autre catégorie ou réessayer plus tard.</p>
    </div>
  );
};

export default NoQuestionsAvailable;
